import { NextRequest, NextResponse } from 'next/server';
import { redis, incrementRateLimit } from './redis-client';
import { logger } from './logger';

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean;
  keyGenerator?: (req: NextRequest) => string;
  prefix?: string; // Key prefix for namespacing
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
  backoffMs?: number; // Exponential backoff time for repeated violations
  violationCount?: number; // Number of consecutive violations
}

// Track repeated violations for exponential backoff
const violationTracker = new Map<string, { count: number; lastViolation: number }>();

// Cleanup violation tracker every 30 minutes
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(violationTracker.entries());
  for (const [key, value] of entries) {
    // Remove entries older than 1 hour
    if (now - value.lastViolation > 60 * 60 * 1000) {
      violationTracker.delete(key);
    }
  }
}, 30 * 60 * 1000);

/**
 * Calculate exponential backoff time based on violation count
 * Base: 1 minute, doubles each time, max: 1 hour
 */
function calculateBackoff(violationCount: number): number {
  const baseMs = 60 * 1000; // 1 minute
  const maxMs = 60 * 60 * 1000; // 1 hour
  const backoffMs = Math.min(baseMs * Math.pow(2, violationCount - 1), maxMs);
  return backoffMs;
}

/**
 * Track a rate limit violation for exponential backoff
 */
function trackViolation(key: string): { count: number; backoffMs: number } {
  const existing = violationTracker.get(key);
  const now = Date.now();

  if (existing) {
    // Reset count if last violation was more than 30 minutes ago
    if (now - existing.lastViolation > 30 * 60 * 1000) {
      existing.count = 1;
    } else {
      existing.count++;
    }
    existing.lastViolation = now;
    violationTracker.set(key, existing);
    return { count: existing.count, backoffMs: calculateBackoff(existing.count) };
  }

  violationTracker.set(key, { count: 1, lastViolation: now });
  return { count: 1, backoffMs: calculateBackoff(1) };
}

/**
 * Clear violation tracking for a key (e.g., after successful request)
 */
export function clearViolation(key: string): void {
  violationTracker.delete(key);
}

// In-memory fallback store (used when Redis is unavailable)
const fallbackStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup fallback store every 5 minutes
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(fallbackStore.entries());
  for (const [key, value] of entries) {
    if (now > value.resetTime) {
      fallbackStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Check if Redis is available for distributed rate limiting
 */
async function isRedisHealthy(): Promise<boolean> {
  try {
    return await redis.ping();
  } catch {
    return false;
  }
}

/**
 * Distributed rate limiter using Redis (with in-memory fallback)
 * IMPORTANT: Use this for production to ensure rate limits work across multiple instances
 * Now includes exponential backoff for repeated violations
 */
export async function distributedRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const fullKey = config.prefix ? `ratelimit:${config.prefix}:${key}` : `ratelimit:${key}`;
  const windowSeconds = Math.ceil(config.windowMs / 1000);
  const now = Date.now();

  try {
    // Try Redis first for distributed rate limiting
    const redisHealthy = await isRedisHealthy();

    if (redisHealthy) {
      const count = await incrementRateLimit(fullKey, windowSeconds);
      const ttl = await redis.ttl(fullKey);
      const resetTime = now + (ttl > 0 ? ttl * 1000 : config.windowMs);

      if (count <= config.maxRequests) {
        // Success - clear any violation tracking
        clearViolation(fullKey);
        return {
          success: true,
          limit: config.maxRequests,
          remaining: Math.max(0, config.maxRequests - count),
          resetTime,
        };
      }

      // Rate limit exceeded - track violation and calculate backoff
      const violation = trackViolation(fullKey);
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        resetTime,
        backoffMs: violation.backoffMs,
        violationCount: violation.count,
      };
    }
  } catch (error) {
    logger.warn('Redis rate limit failed, falling back to in-memory', { error });
  }

  // Fallback to in-memory rate limiting
  let current = fallbackStore.get(fullKey);

  if (!current || current.resetTime <= now) {
    current = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    fallbackStore.set(fullKey, current);
    clearViolation(fullKey);

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - 1,
      resetTime: current.resetTime,
    };
  }

  if (current.count >= config.maxRequests) {
    // Rate limit exceeded - track violation and calculate backoff
    const violation = trackViolation(fullKey);
    return {
      success: false,
      limit: config.maxRequests,
      remaining: 0,
      resetTime: current.resetTime,
      backoffMs: violation.backoffMs,
      violationCount: violation.count,
    };
  }

  current.count++;
  fallbackStore.set(fullKey, current);
  clearViolation(fullKey);

  return {
    success: true,
    limit: config.maxRequests,
    remaining: config.maxRequests - current.count,
    resetTime: current.resetTime,
  };
}

/**
 * Synchronous rate limiter (in-memory only, for backwards compatibility)
 * WARNING: Does not work across multiple server instances
 */
export function rateLimit(config: RateLimitConfig) {
  return (req: NextRequest): RateLimitResult => {
    const key = config.keyGenerator ? config.keyGenerator(req) : getClientIP(req);
    const fullKey = config.prefix ? `ratelimit:${config.prefix}:${key}` : `ratelimit:${key}`;
    const now = Date.now();

    let current = fallbackStore.get(fullKey);

    if (!current || current.resetTime <= now) {
      // New window or expired
      current = {
        count: 1,
        resetTime: now + config.windowMs,
      };
      fallbackStore.set(fullKey, current);

      return {
        success: true,
        limit: config.maxRequests,
        remaining: config.maxRequests - 1,
        resetTime: current.resetTime,
      };
    }

    if (current.count >= config.maxRequests) {
      return {
        success: false,
        limit: config.maxRequests,
        remaining: 0,
        resetTime: current.resetTime,
      };
    }

    current.count++;
    fallbackStore.set(fullKey, current);

    return {
      success: true,
      limit: config.maxRequests,
      remaining: config.maxRequests - current.count,
      resetTime: current.resetTime,
    };
  };
}

export function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const real = req.headers.get('x-real-ip');
  const cf = req.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (real) {
    return real.trim();
  }

  if (cf) {
    return cf.trim();
  }

  return req.ip || 'unknown';
}

// ============================================================================
// DISTRIBUTED RATE LIMIT CONFIGS (use with distributedRateLimit function)
// These work across multiple server instances when Redis is configured
// ============================================================================

export const RATE_LIMIT_CONFIGS = {
  // General API rate limit
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    prefix: 'api',
  },

  // Authentication attempts (login, signup, password reset)
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    prefix: 'auth',
  },

  // Email sending
  email: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    prefix: 'email',
  },

  // Payment/purchase operations
  payment: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // Increased from 3 to allow retries
    prefix: 'payment',
  },

  // Community post creation (prevent spam)
  communityPost: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 posts per hour
    prefix: 'community-post',
  },

  // Community comments (prevent spam)
  communityComment: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 20, // 20 comments per 15 min
    prefix: 'community-comment',
  },

  // Lesson completion (prevent XP farming abuse)
  lessonComplete: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 50, // 50 lessons per hour (reasonable for power users)
    prefix: 'lesson-complete',
  },

  // Webhook endpoints (higher limit, verified by signature)
  webhook: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 per minute (Razorpay can send many)
    prefix: 'webhook',
  },

  // Admin SQL page access (strict limit for sensitive operations)
  adminSql: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 page loads per hour
    prefix: 'admin-sql',
  },

  // Admin actions (moderate limit)
  adminAction: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 50, // 50 admin actions per 15 min
    prefix: 'admin-action',
  },

  // Profile updates (prevent abuse)
  profileUpdate: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10, // 10 profile updates per hour
    prefix: 'profile-update',
  },

  // Settings updates
  settingsUpdate: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 20, // 20 settings updates per hour
    prefix: 'settings-update',
  },

  // Portfolio updates
  portfolioUpdate: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 50, // 50 portfolio updates per hour
    prefix: 'portfolio-update',
  },

  // Feedback submission
  feedback: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 feedback submissions per hour
    prefix: 'feedback',
  },

  // Support tickets
  supportTicket: {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 10, // 10 tickets per day
    prefix: 'support-ticket',
  },

  // Data export requests
  dataExport: {
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 3, // 3 exports per day
    prefix: 'data-export',
  },
} as const;

/**
 * Apply distributed rate limit to a request
 * Returns headers to include in the response
 */
export async function applyRateLimit(
  req: NextRequest,
  configKey: keyof typeof RATE_LIMIT_CONFIGS
): Promise<{
  allowed: boolean;
  result: RateLimitResult;
  headers: Record<string, string>;
}> {
  const config = RATE_LIMIT_CONFIGS[configKey];
  const ip = getClientIP(req);
  const result = await distributedRateLimit(ip, config);

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
  };

  if (!result.success) {
    headers['Retry-After'] = Math.ceil((result.resetTime - Date.now()) / 1000).toString();
  }

  return {
    allowed: result.success,
    result,
    headers,
  };
}

/**
 * Apply user-specific distributed rate limit (for authenticated routes)
 */
export async function applyUserRateLimit(
  userId: string,
  configKey: keyof typeof RATE_LIMIT_CONFIGS
): Promise<{
  allowed: boolean;
  result: RateLimitResult;
  headers: Record<string, string>;
}> {
  const config = RATE_LIMIT_CONFIGS[configKey];
  const result = await distributedRateLimit(`user:${userId}`, config);

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.resetTime.toString(),
  };

  if (!result.success) {
    headers['Retry-After'] = Math.ceil((result.resetTime - Date.now()) / 1000).toString();
  }

  return {
    allowed: result.success,
    result,
    headers,
  };
}

// ============================================================================
// LEGACY SYNCHRONOUS RATE LIMITERS (in-memory only, for backwards compatibility)
// WARNING: These do NOT work across multiple server instances
// ============================================================================

// Predefined rate limiters (synchronous, in-memory only)
export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
  prefix: 'api',
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 auth attempts per 15 minutes
  prefix: 'auth',
});

export const emailRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 emails per hour
  prefix: 'email',
});

export const paymentRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 payment attempts per hour
  prefix: 'payment',
});

// ============================================================================
// USER-FACING RATE LIMIT ERROR HELPERS
// ============================================================================

/**
 * Format time remaining for user display
 */
function formatTimeRemaining(ms: number): string {
  const seconds = Math.ceil(ms / 1000);
  if (seconds < 60) {
    return `${seconds} second${seconds === 1 ? '' : 's'}`;
  }
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  }
  const hours = Math.ceil(minutes / 60);
  return `${hours} hour${hours === 1 ? '' : 's'}`;
}

/**
 * Get user-friendly message for rate limit type
 */
function getRateLimitMessage(configKey: keyof typeof RATE_LIMIT_CONFIGS): string {
  const messages: Record<keyof typeof RATE_LIMIT_CONFIGS, string> = {
    api: 'Too many requests',
    auth: 'Too many login attempts',
    email: 'Too many email requests',
    payment: 'Too many payment attempts',
    communityPost: 'Too many posts',
    communityComment: 'Too many comments',
    lessonComplete: 'Too many lesson completions',
    webhook: 'Too many webhook requests',
    adminSql: 'Too many admin requests',
    adminAction: 'Too many admin actions',
    profileUpdate: 'Too many profile updates',
    settingsUpdate: 'Too many settings updates',
    portfolioUpdate: 'Too many portfolio updates',
    feedback: 'Too many feedback submissions',
    supportTicket: 'Too many support tickets',
    dataExport: 'Too many data export requests',
  };
  return messages[configKey] || 'Too many requests';
}

/**
 * Create a user-friendly rate limit error response
 */
export function createRateLimitResponse(
  result: RateLimitResult,
  configKey: keyof typeof RATE_LIMIT_CONFIGS
): NextResponse {
  const now = Date.now();
  const timeRemaining = result.resetTime - now;
  const retryAfterSeconds = Math.ceil(timeRemaining / 1000);

  const message = getRateLimitMessage(configKey);
  const timeStr = formatTimeRemaining(timeRemaining);

  // Build user-friendly error message
  let userMessage = `${message}. Please try again in ${timeStr}.`;

  // Add warning for repeated violations
  if (result.violationCount && result.violationCount > 1) {
    const backoffTimeStr = formatTimeRemaining(result.backoffMs || 0);
    userMessage += ` Warning: Repeated violations may result in longer wait times (currently ${backoffTimeStr}).`;
  }

  // Add specific guidance based on type
  const guidance: Partial<Record<keyof typeof RATE_LIMIT_CONFIGS, string>> = {
    auth: 'If you forgot your password, try the password reset option.',
    payment: 'If you are having payment issues, please contact support.',
    email: 'Check your inbox and spam folder for previous emails.',
    supportTicket: 'Our support team typically responds within 24 hours.',
    dataExport: 'Data exports are limited to 3 per day for security.',
  };

  if (guidance[configKey]) {
    userMessage += ` ${guidance[configKey]}`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': '0',
    'X-RateLimit-Reset': result.resetTime.toString(),
    'Retry-After': retryAfterSeconds.toString(),
  };

  // Add backoff header if applicable
  if (result.backoffMs) {
    headers['X-RateLimit-Backoff'] = Math.ceil(result.backoffMs / 1000).toString();
  }

  return new NextResponse(
    JSON.stringify({
      error: 'Rate limit exceeded',
      message: userMessage,
      retryAfter: retryAfterSeconds,
      resetTime: result.resetTime,
      violationCount: result.violationCount,
      backoffSeconds: result.backoffMs ? Math.ceil(result.backoffMs / 1000) : undefined,
    }),
    {
      status: 429,
      headers,
    }
  );
}

/**
 * Apply rate limit and return error response if exceeded
 * Returns null if rate limit not exceeded, NextResponse if exceeded
 */
export async function checkRateLimit(
  req: NextRequest,
  configKey: keyof typeof RATE_LIMIT_CONFIGS
): Promise<NextResponse | null> {
  const { allowed, result } = await applyRateLimit(req, configKey);

  if (!allowed) {
    return createRateLimitResponse(result, configKey);
  }

  return null;
}

/**
 * Apply user-specific rate limit and return error response if exceeded
 */
export async function checkUserRateLimit(
  userId: string,
  configKey: keyof typeof RATE_LIMIT_CONFIGS
): Promise<NextResponse | null> {
  const { allowed, result } = await applyUserRateLimit(userId, configKey);

  if (!allowed) {
    return createRateLimitResponse(result, configKey);
  }

  return null;
}
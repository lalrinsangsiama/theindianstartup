import { NextRequest } from 'next/server';
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

      return {
        success: count <= config.maxRequests,
        limit: config.maxRequests,
        remaining: Math.max(0, config.maxRequests - count),
        resetTime,
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
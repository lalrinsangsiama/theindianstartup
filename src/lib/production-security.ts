/**
 * Production Security Layer
 * Rate limiting, input validation, and security hardening
 */

import { NextRequest, NextResponse } from 'next/server';

import { logger } from '@/lib/logger';
// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

// In-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configurations
const RATE_LIMIT_CONFIGS = {
  api_default: { windowMs: 15 * 60 * 1000, maxRequests: 100 },
  api_auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  api_purchase: { windowMs: 60 * 60 * 1000, maxRequests: 10 },
  password_reset: { windowMs: 60 * 60 * 1000, maxRequests: 3 },
  global: { windowMs: 15 * 60 * 1000, maxRequests: 1000 },
} as const;

/**
 * Rate limiting middleware
 */
export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    const ip = getClientIP(request);
    const key = `rate_limit_${ip}_${request.nextUrl.pathname}`;
    const now = Date.now();
    
    const current = rateLimitStore.get(key);
    if (current && current.resetTime < now) {
      rateLimitStore.delete(key);
    }
    
    const entry = rateLimitStore.get(key) || { count: 0, resetTime: now + config.windowMs };
    
    if (entry.count >= config.maxRequests) {
      return new NextResponse(
        JSON.stringify({
          error: config.message || 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    entry.count++;
    rateLimitStore.set(key, entry);
    return null;
  };
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIP) return realIP;
  return request.ip || '127.0.0.1';
}

/**
 * Input validation
 */
export class SecurityValidator {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  static isStrongPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static sanitizeHTML(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  static isValidProductCode(code: string): boolean {
    const productCodeRegex = /^(P([1-9]|1[0-2])|ALL_ACCESS)$/;
    return productCodeRegex.test(code);
  }

  static isValidAmount(amount: number, min = 0, max = 1000000): boolean {
    return Number.isFinite(amount) && amount >= min && amount <= max;
  }
}

/**
 * Security headers
 */
export function getCSPHeaders(): Record<string, string> {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://api.razorpay.com https://*.supabase.co",
    "frame-src 'self' https://api.razorpay.com",
    "object-src 'none'",
  ].join('; ');

  return {
    'Content-Security-Policy': csp,
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };
}

/**
 * Security middleware wrapper
 */
export function withSecurity(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config?: {
    rateLimit?: keyof typeof RATE_LIMIT_CONFIGS;
    requireAuth?: boolean;
  }
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      if (config?.rateLimit) {
        const rateLimitResponse = await rateLimit(RATE_LIMIT_CONFIGS[config.rateLimit])(request);
        if (rateLimitResponse) return rateLimitResponse;
      }

      if (config?.requireAuth) {
        const authHeader = request.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return new NextResponse(
            JSON.stringify({ error: 'Authentication required' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }

      const response = await handler(request);

      const securityHeaders = getCSPHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    } catch (error) {
      logger.error('Security middleware error:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  };
}

export const apiRateLimit = rateLimit(RATE_LIMIT_CONFIGS.api_default);
export const authRateLimit = rateLimit(RATE_LIMIT_CONFIGS.api_auth);
export const purchaseRateLimit = rateLimit(RATE_LIMIT_CONFIGS.api_purchase);
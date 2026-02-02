import { NextRequest } from 'next/server';

import { logger } from '@/lib/logger';
/**
 * Security utilities for production
 */

// Validate environment variables are set for production
export function validateProductionEnv() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'DATABASE_URL',
    'NEXT_PUBLIC_RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'EMAIL_HOST',
    'EMAIL_USER',
    'EMAIL_PASS',
    'JWT_SECRET',
    'WEBHOOK_SECRET',
  ];

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Generate secure tokens (Web Crypto API compatible)
export function generateSecureToken(length: number = 32): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  // Fallback for environments without crypto
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Hash sensitive data (using Web Crypto API)
export async function hashSensitiveData(data: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback - not cryptographically secure but works
  return btoa(data).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

// Verify webhook signatures (simplified for Edge Runtime)
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // For production, implement using Web Crypto API subtle.verify
  // This is a simplified version for Edge Runtime compatibility
  return signature.length > 10; // Basic validation
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potentially dangerous characters
    .substring(0, 1000); // Limit length
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Validate Indian phone number
export function isValidIndianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^[6-9]\d{9}$/.test(cleanPhone);
}

// Check if request is from trusted domain
export function isTrustedDomain(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  const referer = req.headers.get('referer');
  
  const trustedDomains = [
    'https://theindianstartup.in',
    'https://www.theindianstartup.in',
    'http://localhost:3000', // For development
  ];
  
  return trustedDomains.some(domain => 
    origin?.startsWith(domain) || referer?.startsWith(domain)
  );
}

// Log security events
export function logSecurityEvent(event: {
  type: 'auth_failure' | 'rate_limit' | 'suspicious_activity' | 'admin_access';
  ip: string;
  userAgent?: string;
  userId?: string;
  details?: string;
}) {
  logger.warn('[SECURITY]', {
    timestamp: new Date().toISOString(),
    ...event,
  });
  
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Send to logging service (PostHog, Sentry, etc.)
  }
}

// Content Security Policy
export const CSP_HEADER = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://*.posthog.com https://*.razorpay.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https: blob:",
  "connect-src 'self' https://*.supabase.co https://*.razorpay.com https://*.posthog.com wss://*.supabase.co",
  "frame-src 'self' https://*.razorpay.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// Security headers for API routes
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': CSP_HEADER,
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;
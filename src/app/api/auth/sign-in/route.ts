import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, checkRequestBodySize, getClientIP } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { logSecurityEvent } from '@/lib/security';

/**
 * POST /api/auth/sign-in
 * Server-side sign-in with rate limiting
 * This provides an additional layer of security on top of client-side rate limiting
 */
export async function POST(request: NextRequest) {
  // Check request body size before parsing
  const bodySizeError = checkRequestBodySize(request);
  if (bodySizeError) {
    return bodySizeError;
  }

  // Apply server-side rate limiting
  const rateLimitResponse = await checkRateLimit(request, 'auth');
  if (rateLimitResponse) {
    const clientIP = getClientIP(request);
    logSecurityEvent({
      type: 'rate_limit',
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || undefined,
      details: 'Sign-in rate limit exceeded',
    });
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Attempt sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password,
    });

    if (error) {
      const clientIP = getClientIP(request);

      // Log failed login attempt
      logSecurityEvent({
        type: 'auth_failure',
        ip: clientIP,
        userAgent: request.headers.get('user-agent') || undefined,
        details: 'Failed sign-in attempt',
      });

      logger.warn('Sign-in failed', {
        errorCode: error.code,
        ip: clientIP,
      });

      // Return generic error message to prevent user enumeration
      if (error.message.includes('Email not confirmed')) {
        return NextResponse.json(
          { error: 'Email not confirmed', code: 'EMAIL_NOT_CONFIRMED' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Success - log the event (only user ID, not email)
    logger.info('Sign-in successful', {
      userId: data.user?.id,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
        emailConfirmedAt: data.user?.email_confirmed_at,
      },
      session: {
        accessToken: data.session?.access_token,
        refreshToken: data.session?.refresh_token,
        expiresAt: data.session?.expires_at,
      },
    });
  } catch (error) {
    logger.error('Sign-in error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

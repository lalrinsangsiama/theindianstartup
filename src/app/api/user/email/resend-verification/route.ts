import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { distributedRateLimit, createRateLimitResponse, RATE_LIMIT_CONFIGS, getClientIP } from '@/lib/rate-limit';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';

/**
 * POST /api/user/email/resend-verification
 * Resend email verification with rate limiting
 * Accepts email from body for unauthenticated users (post-signup)
 */
export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);

    // Apply strict rate limiting for email resend
    const rateLimitResult = await distributedRateLimit(clientIP, {
      ...RATE_LIMIT_CONFIGS.email,
      maxRequests: 3, // Only 3 verification emails per hour per IP
    });

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult, 'email');
    }

    const supabase = createClient();

    // Try to get email from authenticated user first
    let email: string | null = null;
    let userId: string | null = null;

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // User is authenticated
      email = user.email || null;
      userId = user.id;

      // Check if already verified
      if (user.email_confirmed_at) {
        return NextResponse.json(
          { error: 'Email is already verified' },
          { status: 400 }
        );
      }
    } else {
      // User not authenticated - try to get email from request body
      try {
        const body = await request.json();
        email = body.email;
      } catch {
        // No body or invalid JSON
      }
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Resend verification email
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      logger.error('Failed to resend verification email:', error);

      // Don't reveal if email exists or not for security
      if (error.message.includes('User not found') || error.message.includes('Email not found')) {
        return NextResponse.json({
          success: true,
          message: 'If an account exists with this email, a verification link will be sent.',
          rateLimit: {
            remaining: rateLimitResult.remaining,
            resetTime: rateLimitResult.resetTime,
          },
        });
      }

      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    // Audit log
    await createAuditLog({
      eventType: 'security_event',
      userId: userId || undefined,
      action: 'verification_email_resent',
      details: {
        email: email,
      },
      ipAddress: clientIP,
    });

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
      rateLimit: {
        remaining: rateLimitResult.remaining,
        resetTime: rateLimitResult.resetTime,
      },
    });
  } catch (error) {
    logger.error('Resend verification email error:', error);
    return NextResponse.json(
      { error: 'Failed to resend verification email' },
      { status: 500 }
    );
  }
}

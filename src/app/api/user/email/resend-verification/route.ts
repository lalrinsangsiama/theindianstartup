import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, createRateLimitResponse, RATE_LIMIT_CONFIGS, distributedRateLimit, getClientIP } from '@/lib/rate-limit';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';

/**
 * POST /api/user/email/resend-verification
 * Resend email verification with rate limiting
 */
export async function POST(request: NextRequest) {
  try {
    // Apply email rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = await distributedRateLimit(clientIP, {
      ...RATE_LIMIT_CONFIGS.email,
      maxRequests: 3, // Only 3 verification emails per hour
    });

    if (!rateLimitResult.success) {
      return createRateLimitResponse(rateLimitResult, 'email');
    }

    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Please sign in to resend verification email' },
        { status: 401 }
      );
    }

    // Check if already verified
    if (user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Email is already verified' },
        { status: 400 }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { error: 'No email address found. Please sign up again.' },
        { status: 400 }
      );
    }

    // Resend verification email
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
      options: {
        emailRedirectTo: `${request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (error) {
      logger.error('Failed to resend verification email:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Audit log
    await createAuditLog({
      eventType: 'security_event',
      userId: user.id,
      action: 'verification_email_resent',
      details: {
        email: user.email,
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

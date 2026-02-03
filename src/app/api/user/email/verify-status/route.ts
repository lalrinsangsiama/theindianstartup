import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

/**
 * GET /api/user/email/verify-status
 * Check if user's email is verified
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { verified: false, email: null },
        { status: 200 }
      );
    }

    return NextResponse.json({
      verified: !!user.email_confirmed_at,
      email: user.email,
      confirmedAt: user.email_confirmed_at,
    });
  } catch (error) {
    logger.error('Email verification status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check verification status' },
      { status: 500 }
    );
  }
}

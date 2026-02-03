import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { verifyTOTP, decryptSecret } from '@/lib/two-factor-auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const enableSchema = z.object({
  code: z.string().length(6).regex(/^\d+$/, 'Code must be 6 digits'),
});

/**
 * POST /api/user/2fa/enable
 * Verify TOTP code and enable 2FA
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const body = await request.json();
    const validation = enableSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid code format. Please enter a 6-digit code.' },
        { status: 400 }
      );
    }

    const { code } = validation.data;
    const supabase = createClient();

    // Get pending 2FA setup
    const { data: profile } = await supabase
      .from('User')
      .select('twoFactorEnabled, twoFactorSecret')
      .eq('id', user.id)
      .single();

    if (!profile?.twoFactorSecret) {
      return NextResponse.json(
        { error: 'Please set up 2FA first by calling the setup endpoint.' },
        { status: 400 }
      );
    }

    if (profile.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is already enabled.' },
        { status: 400 }
      );
    }

    // Decrypt and verify the TOTP code
    const secret = decryptSecret(profile.twoFactorSecret);
    const isValid = verifyTOTP(secret, code);

    if (!isValid) {
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: '2fa_enable_failed',
        details: { reason: 'invalid_code' },
        ipAddress: clientIP,
      });

      return NextResponse.json(
        { error: 'Invalid code. Please check your authenticator app and try again.' },
        { status: 400 }
      );
    }

    // Enable 2FA
    await supabase
      .from('User')
      .update({
        twoFactorEnabled: true,
        twoFactorEnabledAt: new Date().toISOString(),
        twoFactorMethod: 'totp',
        updatedAt: new Date().toISOString(),
      })
      .eq('id', user.id);

    // Audit log
    await createAuditLog({
      eventType: 'security_event',
      userId: user.id,
      action: '2fa_enabled',
      details: { method: 'totp' },
      ipAddress: clientIP,
    });

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication has been enabled successfully.',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('2FA enable error:', error);
    return NextResponse.json(
      { error: 'Failed to enable 2FA' },
      { status: 500 }
    );
  }
}

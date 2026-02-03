import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { verifyTOTP, decryptSecret } from '@/lib/two-factor-auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const disableSchema = z.object({
  code: z.string().length(6).regex(/^\d+$/, 'Code must be 6 digits'),
  password: z.string().min(1, 'Password is required'),
});

/**
 * POST /api/user/2fa/disable
 * Disable 2FA (requires current TOTP code and password)
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const body = await request.json();
    const validation = disableSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid code and password.' },
        { status: 400 }
      );
    }

    const { code, password } = validation.data;
    const supabase = createClient();

    // Verify password first
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (signInError) {
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: '2fa_disable_failed',
        details: { reason: 'invalid_password' },
        ipAddress: clientIP,
      });

      return NextResponse.json(
        { error: 'Invalid password.' },
        { status: 400 }
      );
    }

    // Get 2FA settings
    const { data: profile } = await supabase
      .from('User')
      .select('twoFactorEnabled, twoFactorSecret')
      .eq('id', user.id)
      .single();

    if (!profile?.twoFactorEnabled || !profile?.twoFactorSecret) {
      return NextResponse.json(
        { error: '2FA is not enabled.' },
        { status: 400 }
      );
    }

    // Verify TOTP code
    const secret = decryptSecret(profile.twoFactorSecret);
    const isValid = verifyTOTP(secret, code);

    if (!isValid) {
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: '2fa_disable_failed',
        details: { reason: 'invalid_code' },
        ipAddress: clientIP,
      });

      return NextResponse.json(
        { error: 'Invalid 2FA code.' },
        { status: 400 }
      );
    }

    // Disable 2FA
    await supabase
      .from('User')
      .update({
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorBackupCodes: null,
        twoFactorEnabledAt: null,
        twoFactorMethod: null,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', user.id);

    // Revoke all trusted devices
    await supabase
      .from('TrustedDevice')
      .update({
        revokedAt: new Date().toISOString(),
        revokedReason: '2fa_disabled',
      })
      .eq('userId', user.id)
      .is('revokedAt', null);

    // Audit log
    await createAuditLog({
      eventType: 'security_event',
      userId: user.id,
      action: '2fa_disabled',
      ipAddress: clientIP,
    });

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication has been disabled.',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('2FA disable error:', error);
    return NextResponse.json(
      { error: 'Failed to disable 2FA' },
      { status: 500 }
    );
  }
}

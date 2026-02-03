import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import {
  generateTOTPSecret,
  generateTOTPUri,
  generateBackupCodes,
  hashBackupCode,
  encryptSecret,
} from '@/lib/two-factor-auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';

/**
 * POST /api/user/2fa/setup
 * Generate TOTP secret and QR code URI for 2FA setup
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const supabase = createClient();

    // Check if 2FA is already enabled
    const { data: profile } = await supabase
      .from('User')
      .select('twoFactorEnabled, email')
      .eq('id', user.id)
      .single();

    if (profile?.twoFactorEnabled) {
      return NextResponse.json(
        { error: '2FA is already enabled. Disable it first to set up a new method.' },
        { status: 400 }
      );
    }

    // Generate new TOTP secret
    const secret = generateTOTPSecret();
    const uri = generateTOTPUri(secret, profile?.email || user.email);

    // Generate backup codes
    const backupCodes = generateBackupCodes();
    const hashedBackupCodes = backupCodes.map(hashBackupCode);

    // Store encrypted secret and hashed backup codes temporarily
    // They will be permanently saved when user verifies and enables 2FA
    const encryptedSecret = encryptSecret(secret);

    // Store pending 2FA setup in user record
    await supabase
      .from('User')
      .update({
        twoFactorSecret: encryptedSecret,
        twoFactorBackupCodes: hashedBackupCodes,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', user.id);

    // Audit log
    await createAuditLog({
      eventType: 'security_event',
      userId: user.id,
      action: '2fa_setup_initiated',
      ipAddress: clientIP,
    });

    return NextResponse.json({
      success: true,
      qrCodeUri: uri,
      secret, // User can manually enter this if QR doesn't work
      backupCodes, // Show these only once
      message: 'Scan the QR code with your authenticator app, then enter the code to verify.',
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('2FA setup error:', error);
    return NextResponse.json(
      { error: 'Failed to set up 2FA' },
      { status: 500 }
    );
  }
}

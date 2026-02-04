import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  verifyTOTP,
  decryptSecret,
  verifyBackupCode,
  generateDeviceFingerprint,
  parseDeviceName,
} from '@/lib/two-factor-auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { distributedRateLimit, createRateLimitResponse } from '@/lib/rate-limit';

const verifySchema = z.object({
  userId: z.string().min(1),
  code: z.string().min(6).max(10), // 6 for TOTP, up to 10 for backup codes
  rememberDevice: z.boolean().optional().default(false),
});

/**
 * POST /api/user/2fa/verify
 * Verify 2FA code during login
 */
export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';

    const body = await request.json();
    const validation = verifySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input.' },
        { status: 400 }
      );
    }

    const { userId, code, rememberDevice } = validation.data;

    // SECURITY: Rate limit 2FA verification attempts per userId to prevent brute forcing
    // 6-digit TOTP has only 1M combinations - without rate limiting, can be exhausted in ~10-20 min
    const rateLimitKey = `2fa-verify:${userId}`;
    const rateLimitResult = await distributedRateLimit(rateLimitKey, {
      maxRequests: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
      prefix: '2fa',
    });

    if (!rateLimitResult.success) {
      await createAuditLog({
        eventType: 'security_event',
        userId,
        action: '2fa_rate_limited',
        details: {
          reason: 'too_many_attempts',
          violationCount: rateLimitResult.violationCount,
        },
        ipAddress: clientIP,
      });
      return createRateLimitResponse(rateLimitResult, '2fa');
    }

    const supabase = createClient();

    // Get user's 2FA settings
    const { data: profile } = await supabase
      .from('User')
      .select('twoFactorEnabled, twoFactorSecret, twoFactorBackupCodes')
      .eq('id', userId)
      .single();

    if (!profile?.twoFactorEnabled || !profile?.twoFactorSecret) {
      return NextResponse.json(
        { error: '2FA is not enabled for this account.' },
        { status: 400 }
      );
    }

    // First try TOTP verification
    const secret = decryptSecret(profile.twoFactorSecret);
    let verified = false;
    let usedBackupCode = false;
    let backupCodeIndex = -1;

    // Clean the code (remove dashes for backup codes)
    const cleanCode = code.replace(/-/g, '');

    if (cleanCode.length === 6 && /^\d+$/.test(cleanCode)) {
      // Try TOTP
      verified = verifyTOTP(secret, cleanCode);
    }

    // If TOTP failed, try backup code
    if (!verified && profile.twoFactorBackupCodes) {
      backupCodeIndex = verifyBackupCode(code, profile.twoFactorBackupCodes);
      if (backupCodeIndex >= 0) {
        verified = true;
        usedBackupCode = true;
      }
    }

    if (!verified) {
      await createAuditLog({
        eventType: 'security_event',
        userId,
        action: '2fa_verify_failed',
        details: { reason: 'invalid_code' },
        ipAddress: clientIP,
      });

      return NextResponse.json(
        { error: 'Invalid code. Please try again.' },
        { status: 400 }
      );
    }

    // If backup code was used, mark it as used
    if (usedBackupCode && backupCodeIndex >= 0) {
      const updatedBackupCodes = [...profile.twoFactorBackupCodes];
      updatedBackupCodes[backupCodeIndex] = `USED:${Date.now()}`;

      await supabase
        .from('User')
        .update({ twoFactorBackupCodes: updatedBackupCodes })
        .eq('id', userId);

      // Create recovery attempt record
      await supabase.from('TwoFactorRecoveryAttempt').insert({
        userId,
        method: 'backup_code',
        status: 'approved',
        backupCodeIndex,
        ipAddress: clientIP,
        userAgent,
        resolvedAt: new Date().toISOString(),
      });
    }

    // If remember device is enabled, create trusted device record
    let trustedDeviceToken: string | undefined;
    if (rememberDevice) {
      const deviceFingerprint = generateDeviceFingerprint(userAgent, clientIP);
      const deviceName = parseDeviceName(userAgent);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

      // Upsert trusted device
      const { data: trustedDevice } = await supabase
        .from('TrustedDevice')
        .upsert({
          userId,
          deviceFingerprint,
          deviceName,
          userAgent,
          ipAddress: clientIP,
          trustedAt: new Date().toISOString(),
          expiresAt: expiresAt.toISOString(),
          lastUsedAt: new Date().toISOString(),
          revokedAt: null,
          revokedReason: null,
        }, {
          onConflict: 'userId,deviceFingerprint',
        })
        .select('id')
        .single();

      trustedDeviceToken = trustedDevice?.id;
    }

    // Audit log
    await createAuditLog({
      eventType: 'security_event',
      userId,
      action: '2fa_verified',
      details: {
        method: usedBackupCode ? 'backup_code' : 'totp',
        rememberDevice,
      },
      ipAddress: clientIP,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      trustedDeviceToken,
      usedBackupCode,
      backupCodesRemaining: usedBackupCode
        ? profile.twoFactorBackupCodes.filter(
            (c: string) => !c.startsWith('USED:')
          ).length - 1
        : undefined,
    });
  } catch (error) {
    logger.error('2FA verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify 2FA code' },
      { status: 500 }
    );
  }
}

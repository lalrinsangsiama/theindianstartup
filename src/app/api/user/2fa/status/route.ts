import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';

/**
 * GET /api/user/2fa/status
 * Get current 2FA status and trusted devices
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    // Get 2FA status
    const { data: profile } = await supabase
      .from('User')
      .select('twoFactorEnabled, twoFactorEnabledAt, twoFactorMethod, twoFactorBackupCodes')
      .eq('id', user.id)
      .single();

    // Get trusted devices
    const { data: trustedDevices } = await supabase
      .from('TrustedDevice')
      .select('id, deviceName, ipAddress, trustedAt, lastUsedAt, expiresAt')
      .eq('userId', user.id)
      .is('revokedAt', null)
      .gt('expiresAt', new Date().toISOString())
      .order('lastUsedAt', { ascending: false });

    // Count remaining backup codes
    const backupCodesRemaining = profile?.twoFactorBackupCodes?.filter(
      (code: string) => !code.startsWith('USED:')
    ).length || 0;

    return NextResponse.json({
      enabled: profile?.twoFactorEnabled || false,
      enabledAt: profile?.twoFactorEnabledAt,
      method: profile?.twoFactorMethod,
      backupCodesRemaining,
      trustedDevices: trustedDevices || [],
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('2FA status error:', error);
    return NextResponse.json(
      { error: 'Failed to get 2FA status' },
      { status: 500 }
    );
  }
}

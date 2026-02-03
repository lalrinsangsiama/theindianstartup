import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';

/**
 * GET /api/user/sessions
 * Get all active sessions for the user (trusted devices from 2FA)
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    // Get trusted devices (acts as session tracking for 2FA users)
    const { data: trustedDevices, error } = await supabase
      .from('TrustedDevice')
      .select('id, deviceName, deviceFingerprint, ipAddress, userAgent, trustedAt, lastUsedAt, expiresAt')
      .eq('userId', user.id)
      .is('revokedAt', null)
      .gt('expiresAt', new Date().toISOString())
      .order('lastUsedAt', { ascending: false });

    if (error) {
      logger.error('Failed to fetch sessions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      );
    }

    // Get current device fingerprint from request
    const userAgent = request.headers.get('user-agent') || '';
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    return NextResponse.json({
      sessions: trustedDevices || [],
      currentDevice: {
        userAgent,
        ipAddress: clientIP,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Get sessions error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/user/sessions
 * Sign out from all devices or a specific session
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const signOutAll = searchParams.get('all') === 'true';

    const supabase = createClient();

    if (signOutAll) {
      // Revoke all trusted devices
      const { error } = await supabase
        .from('TrustedDevice')
        .update({
          revokedAt: new Date().toISOString(),
          revokedReason: 'user_signed_out_all',
        })
        .eq('userId', user.id)
        .is('revokedAt', null);

      if (error) {
        logger.error('Failed to sign out all devices:', error);
        return NextResponse.json(
          { error: 'Failed to sign out all devices' },
          { status: 500 }
        );
      }

      // Audit log
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: 'signed_out_all_devices',
        ipAddress: clientIP,
      });

      return NextResponse.json({
        success: true,
        message: 'Signed out from all devices',
      });
    }

    if (sessionId) {
      // Revoke specific session
      const { data: session, error: fetchError } = await supabase
        .from('TrustedDevice')
        .select('id')
        .eq('id', sessionId)
        .eq('userId', user.id)
        .single();

      if (fetchError || !session) {
        return NextResponse.json(
          { error: 'Session not found' },
          { status: 404 }
        );
      }

      const { error } = await supabase
        .from('TrustedDevice')
        .update({
          revokedAt: new Date().toISOString(),
          revokedReason: 'user_revoked',
        })
        .eq('id', sessionId);

      if (error) {
        logger.error('Failed to revoke session:', error);
        return NextResponse.json(
          { error: 'Failed to revoke session' },
          { status: 500 }
        );
      }

      // Audit log
      await createAuditLog({
        eventType: 'security_event',
        userId: user.id,
        action: 'session_revoked',
        details: { sessionId },
        ipAddress: clientIP,
      });

      return NextResponse.json({
        success: true,
        message: 'Session revoked',
      });
    }

    return NextResponse.json(
      { error: 'Please provide sessionId or set all=true' },
      { status: 400 }
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Delete session error:', error);
    return NextResponse.json(
      { error: 'Failed to manage sessions' },
      { status: 500 }
    );
  }
}

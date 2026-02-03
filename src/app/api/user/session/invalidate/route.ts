import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';

/**
 * POST /api/user/session/invalidate
 * Records session invalidation for audit purposes
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const body = await request.json();
    const { sessionId, reason, deviceFingerprint } = body;

    const clientIP = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Log session invalidation
    await createAuditLog({
      eventType: 'security_event',
      userId: user?.id,
      action: 'session_invalidated',
      details: {
        sessionId,
        reason,
        deviceFingerprint,
        userAgent: request.headers.get('user-agent'),
      },
      ipAddress: clientIP,
    });

    logger.info('Session invalidated', {
      userId: user?.id,
      sessionId,
      reason,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Session invalidation logging error:', error);
    // Don't fail the request - this is just for logging
    return NextResponse.json({ success: true });
  }
}

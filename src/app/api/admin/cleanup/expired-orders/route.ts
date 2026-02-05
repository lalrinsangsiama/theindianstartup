import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { createAuditLog } from '@/lib/audit-log';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * POST /api/admin/cleanup/expired-orders
 * Marks pending orders older than 35 minutes as expired
 * Razorpay orders expire after 30 minutes, so 35 min gives buffer
 */
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting to prevent abuse
    const rateLimitError = await checkRateLimit(request, 'adminAction');
    if (rateLimitError) {
      return rateLimitError;
    }

    // Get client IP for audit logging
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip')
      || 'unknown';

    // Require admin access
    const admin = await requireAdmin({ ipAddress });

    const supabase = createClient();

    // Call the cleanup function
    const { data, error } = await supabase.rpc('cleanup_expired_pending_orders');

    if (error) {
      // If RPC doesn't exist, fall back to direct update
      if (error.code === 'PGRST202') {
        const { data: updated, error: updateError } = await supabase
          .from('Purchase')
          .update({
            status: 'expired',
            updatedAt: new Date().toISOString()
          })
          .eq('status', 'pending')
          .lt('createdAt', new Date(Date.now() - 35 * 60 * 1000).toISOString())
          .select('id');

        if (updateError) {
          logger.error('Failed to cleanup expired orders:', updateError);
          return NextResponse.json(
            { error: 'Failed to cleanup expired orders' },
            { status: 500 }
          );
        }

        const cleanedCount = updated?.length || 0;
        const cleanedIds = updated?.map(p => p.id) || [];

        // Audit log the cleanup
        await createAuditLog({
          eventType: 'admin_action',
          userId: admin.id,
          action: 'cleanup_expired_orders',
          details: {
            cleanedCount,
            cleanedIds,
            method: 'fallback',
            ipAddress,
          },
        });

        return NextResponse.json({
          success: true,
          message: `Marked ${cleanedCount} expired orders`,
          cleanedCount,
          cleanedIds,
        });
      }

      logger.error('Cleanup RPC error:', error);
      return NextResponse.json(
        { error: 'Failed to cleanup expired orders' },
        { status: 500 }
      );
    }

    const result = data?.[0] || { cleaned_count: 0, cleaned_ids: [] };

    // Audit log the cleanup
    await createAuditLog({
      eventType: 'admin_action',
      userId: admin.id,
      action: 'cleanup_expired_orders',
      details: {
        cleanedCount: result.cleaned_count,
        cleanedIds: result.cleaned_ids,
        method: 'rpc',
        ipAddress,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Marked ${result.cleaned_count} expired orders`,
      cleanedCount: result.cleaned_count,
      cleanedIds: result.cleaned_ids,
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (error instanceof Error && (
      error.message.includes('Admin access denied') ||
      error.message.includes('Insufficient permissions')
    )) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    logger.error('Cleanup expired orders error:', error);
    return NextResponse.json(
      { error: 'Failed to cleanup expired orders' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/cleanup/expired-orders
 * Returns count of pending orders that would be cleaned up
 */
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting to prevent abuse
    const rateLimitError = await checkRateLimit(request, 'adminAction');
    if (rateLimitError) {
      return rateLimitError;
    }

    // Get client IP for audit logging
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip')
      || 'unknown';

    // Require admin access
    await requireAdmin({ ipAddress });

    const supabase = createClient();

    // Count pending orders older than 35 minutes
    const { count, error } = await supabase
      .from('Purchase')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending')
      .lt('createdAt', new Date(Date.now() - 35 * 60 * 1000).toISOString());

    if (error) {
      logger.error('Failed to count expired orders:', error);
      return NextResponse.json(
        { error: 'Failed to count expired orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pendingExpiredCount: count || 0,
      message: `${count || 0} orders would be marked as expired`,
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Authentication required')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (error instanceof Error && (
      error.message.includes('Admin access denied') ||
      error.message.includes('Insufficient permissions')
    )) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    logger.error('Count expired orders error:', error);
    return NextResponse.json(
      { error: 'Failed to count expired orders' },
      { status: 500 }
    );
  }
}

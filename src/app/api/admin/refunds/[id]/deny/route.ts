import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const denySchema = z.object({
  denialReason: z.string().min(10, 'Please provide a reason for denial').max(1000),
  adminNotes: z.string().max(1000).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: refundId } = await params;
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const admin = await requireAdmin({ ipAddress: clientIP });

    const body = await request.json();
    const validationResult = denySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { denialReason, adminNotes } = validationResult.data;

    const supabase = createClient();

    // Fetch the refund request
    const { data: refundRequest, error: fetchError } = await supabase
      .from('RefundRequest')
      .select(`
        *,
        purchase:Purchase(
          id,
          productCode,
          userId
        )
      `)
      .eq('id', refundId)
      .single();

    if (fetchError || !refundRequest) {
      return NextResponse.json(
        { error: 'Refund request not found' },
        { status: 404 }
      );
    }

    if (refundRequest.status !== 'pending') {
      return NextResponse.json(
        { error: `Cannot deny refund with status: ${refundRequest.status}` },
        { status: 400 }
      );
    }

    const purchase = refundRequest.purchase;

    // Update refund request
    await supabase
      .from('RefundRequest')
      .update({
        status: 'denied',
        denialReason,
        adminNotes,
        reviewedBy: admin.id,
        reviewedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .eq('id', refundId);

    // Update purchase refund status
    await supabase
      .from('Purchase')
      .update({
        refundStatus: 'denied',
        refundReason: denialReason,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', purchase.id);

    // Audit log
    await createAuditLog({
      eventType: 'admin_action',
      userId: admin.id,
      targetUserId: purchase.userId,
      resourceType: 'refund_request',
      resourceId: refundId,
      action: 'refund_denied',
      details: {
        purchaseId: purchase.id,
        denialReason,
        productCode: purchase.productCode,
      },
      ipAddress: clientIP,
    });

    // TODO: Send email notification to user with denial reason

    return NextResponse.json({
      success: true,
      message: 'Refund request denied',
      refund: {
        id: refundId,
        status: 'denied',
        denialReason,
      },
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Admin access required')) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    logger.error('Refund denial error:', error);
    return NextResponse.json(
      { error: 'Failed to deny refund' },
      { status: 500 }
    );
  }
}

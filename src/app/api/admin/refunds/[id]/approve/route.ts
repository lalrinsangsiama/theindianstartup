import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit-log';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { sendRefundApprovedEmail } from '@/lib/email';

const approveSchema = z.object({
  approvedAmount: z.number().positive().optional(),
  adminNotes: z.string().max(1000).optional(),
});

// Razorpay refund API helper
async function processRazorpayRefund(paymentId: string, amount: number, notes: Record<string, string>) {
  const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

  const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}/refund`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      speed: 'normal',
      notes,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.description || 'Razorpay refund failed');
  }

  return response.json();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: refundId } = await params;
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const admin = await requireAdmin({ ipAddress: clientIP });

    const body = await request.json();
    const validationResult = approveSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { approvedAmount, adminNotes } = validationResult.data;

    const supabase = createClient();

    // Fetch the refund request with purchase details
    const { data: refundRequest, error: fetchError } = await supabase
      .from('RefundRequest')
      .select(`
        *,
        purchase:Purchase(
          id,
          amount,
          razorpayPaymentId,
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
        { error: `Cannot approve refund with status: ${refundRequest.status}` },
        { status: 400 }
      );
    }

    const purchase = refundRequest.purchase;
    const finalAmount = approvedAmount || refundRequest.requestedAmount;

    // Update to processing status
    await supabase
      .from('RefundRequest')
      .update({
        status: 'processing',
        approvedAmount: finalAmount,
        reviewedBy: admin.id,
        reviewedAt: new Date().toISOString(),
        adminNotes,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', refundId);

    // Process refund via Razorpay if payment ID exists
    let razorpayRefundId = null;
    let razorpayRefundStatus = null;

    if (purchase.razorpayPaymentId) {
      try {
        const refund = await processRazorpayRefund(
          purchase.razorpayPaymentId,
          finalAmount,
          {
            refund_request_id: refundId,
            admin_id: admin.id,
            reason: refundRequest.reason,
          }
        );

        razorpayRefundId = refund.id;
        razorpayRefundStatus = refund.status;

        logger.info('Razorpay refund initiated:', {
          refundId: refund.id,
          status: refund.status,
          amount: finalAmount,
        });
      } catch (razorpayError) {
        // Log the full error internally for debugging
        const errorMessage = razorpayError instanceof Error ? razorpayError.message : 'Unknown error';
        logger.error('Razorpay refund failed:', {
          refundId,
          paymentId: purchase.razorpayPaymentId,
          error: errorMessage,
        });

        // Update refund request to failed - store error internally but don't expose
        await supabase
          .from('RefundRequest')
          .update({
            status: 'failed',
            // Store error reference internally, not the actual error message
            adminNotes: `${adminNotes || ''}\n\nRefund processing failed. Check logs for details.`,
            updatedAt: new Date().toISOString(),
          })
          .eq('id', refundId);

        // Return generic error to client - don't expose internal payment gateway details
        return NextResponse.json(
          { error: 'Failed to process refund with payment gateway. Please try again or contact support.' },
          { status: 500 }
        );
      }
    }

    // Update refund request with Razorpay details
    const finalStatus = razorpayRefundId ? 'completed' : 'approved';

    await supabase
      .from('RefundRequest')
      .update({
        status: finalStatus,
        razorpayRefundId,
        razorpayRefundStatus,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', refundId);

    // Update purchase status
    await supabase
      .from('Purchase')
      .update({
        refundStatus: 'completed',
        refundCompletedAt: new Date().toISOString(),
        refundAmount: finalAmount,
        razorpayRefundId,
        status: 'refunded',
        isActive: false,
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
      action: 'refund_approved',
      details: {
        purchaseId: purchase.id,
        approvedAmount: finalAmount,
        razorpayRefundId,
        productCode: purchase.productCode,
      },
      ipAddress: clientIP,
    });

    // Fetch user info for email notification
    const { data: userData } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', purchase.userId)
      .single();

    // Fetch product info for email
    const { data: productData } = await supabase
      .from('products')
      .select('title')
      .eq('code', purchase.productCode)
      .single();

    // Send email notification to user
    if (userData?.email) {
      await sendRefundApprovedEmail({
        userName: userData.name || 'Valued Customer',
        userEmail: userData.email,
        productName: productData?.title || purchase.productCode,
        refundAmount: finalAmount,
        refundId,
        originalAmount: purchase.amount,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Refund approved and processed successfully',
      refund: {
        id: refundId,
        status: finalStatus,
        approvedAmount: finalAmount,
        razorpayRefundId,
      },
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Admin access required')) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    logger.error('Refund approval error:', error);
    return NextResponse.json(
      { error: 'Failed to approve refund' },
      { status: 500 }
    );
  }
}

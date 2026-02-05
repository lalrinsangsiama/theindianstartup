import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { createAuditLog, logPurchaseEvent } from '@/lib/audit-log';
import { applyUserRateLimit, checkRequestBodySize } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';
import { z } from 'zod';
import { sendRefundRequestConfirmationEmail, sendRefundRequestAdminNotification } from '@/lib/email';

const REFUND_WINDOW_DAYS = 3;

const refundRequestSchema = z.object({
  purchaseId: z.string().min(1, 'Purchase ID is required'),
  reason: z.enum([
    'not_as_expected',
    'duplicate_purchase',
    'technical_issues',
    'changed_mind',
    'other'
  ]),
  additionalInfo: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check request body size before parsing
    const bodySizeError = checkRequestBodySize(request);
    if (bodySizeError) {
      return bodySizeError;
    }

    // Authenticate user
    const user = await requireAuth();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    // Rate limit: 5 refund requests per hour
    const { allowed, headers } = await applyUserRateLimit(user.id, 'payment');
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many refund requests. Please try again later.' },
        { status: 429, headers }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = refundRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const { purchaseId, reason, additionalInfo } = validationResult.data;

    const supabase = createClient();

    // Fetch the purchase with product details
    const { data: purchase, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*, product:Product(id, code, title)')
      .eq('id', purchaseId)
      .eq('userId', user.id)
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    // Check if purchase is eligible for refund
    const purchaseDate = new Date(purchase.purchasedAt);
    const refundDeadline = new Date(purchaseDate.getTime() + REFUND_WINDOW_DAYS * 24 * 60 * 60 * 1000);
    const now = new Date();

    if (now > refundDeadline) {
      return NextResponse.json(
        {
          error: 'Refund window expired',
          message: `Refunds can only be requested within ${REFUND_WINDOW_DAYS} days of purchase. Your refund window ended on ${refundDeadline.toLocaleDateString('en-IN')}.`
        },
        { status: 400 }
      );
    }

    if (purchase.status !== 'completed') {
      return NextResponse.json(
        { error: 'Only completed purchases can be refunded' },
        { status: 400 }
      );
    }

    if (purchase.refundStatus && purchase.refundStatus !== 'none' && purchase.refundStatus !== 'denied') {
      return NextResponse.json(
        { error: 'A refund request already exists for this purchase' },
        { status: 400 }
      );
    }

    // Check for existing pending refund request
    const { data: existingRequest } = await supabase
      .from('RefundRequest')
      .select('id, status')
      .eq('purchaseId', purchaseId)
      .in('status', ['pending', 'approved', 'processing'])
      .single();

    if (existingRequest) {
      return NextResponse.json(
        { error: 'A refund request is already being processed for this purchase' },
        { status: 400 }
      );
    }

    // Create refund request
    const { data: refundRequest, error: createError } = await supabase
      .from('RefundRequest')
      .insert({
        purchaseId,
        userId: user.id,
        reason,
        additionalInfo,
        requestedAmount: purchase.amount,
        status: 'pending',
      })
      .select()
      .single();

    if (createError) {
      logger.error('Failed to create refund request:', createError);
      return NextResponse.json(
        { error: 'Failed to create refund request' },
        { status: 500 }
      );
    }

    // Update purchase refund status
    await supabase
      .from('Purchase')
      .update({
        refundStatus: 'requested',
        refundRequestedAt: new Date().toISOString(),
        refundReason: reason,
      })
      .eq('id', purchaseId);

    // Log the refund request
    await logPurchaseEvent('purchase_refund', user.id, purchaseId, {
      refundRequestId: refundRequest.id,
      reason,
      amount: purchase.amount,
    }, clientIP);

    await createAuditLog({
      eventType: 'purchase_refund',
      userId: user.id,
      resourceType: 'refund_request',
      resourceId: refundRequest.id,
      action: 'refund_requested',
      details: {
        purchaseId,
        reason,
        amount: purchase.amount,
        productCode: purchase.productCode,
      },
      ipAddress: clientIP,
    });

    // Get user details for email
    const { data: userData } = await supabase
      .from('User')
      .select('name, email')
      .eq('id', user.id)
      .single();

    const userName = userData?.name || user.email?.split('@')[0] || 'Customer';
    const userEmail = userData?.email || user.email || '';
    const productName = purchase.product?.title || 'Product';

    // Send confirmation email to user (fire and forget)
    sendRefundRequestConfirmationEmail({
      userName,
      userEmail,
      productName,
      amount: purchase.amount / 100, // Convert paise to rupees
      refundRequestId: refundRequest.id,
      reason,
      purchaseDate: purchase.purchasedAt,
    }).catch((err) => {
      logger.error('Failed to send refund request confirmation email:', err);
    });

    // Send notification to admin (fire and forget)
    sendRefundRequestAdminNotification({
      userName,
      userEmail,
      productName,
      amount: purchase.amount / 100, // Convert paise to rupees
      refundRequestId: refundRequest.id,
      reason,
      purchaseDate: purchase.purchasedAt,
    }).catch((err) => {
      logger.error('Failed to send refund request admin notification:', err);
    });

    return NextResponse.json({
      success: true,
      message: 'Refund request submitted successfully. We will process it within 2-3 business days.',
      refundRequest: {
        id: refundRequest.id,
        status: refundRequest.status,
        requestedAmount: refundRequest.requestedAmount,
        createdAt: refundRequest.createdAt,
      },
    });

  } catch (error) {
    logger.error('Refund request error:', error);

    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login to request a refund' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to process refund request' },
      { status: 500 }
    );
  }
}

// GET: List user's refund requests
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    const { data: refunds, error } = await supabase
      .from('RefundRequest')
      .select(`
        *,
        purchase:Purchase(
          id,
          productCode,
          productName,
          amount,
          purchasedAt
        )
      `)
      .eq('userId', user.id)
      .order('createdAt', { ascending: false });

    if (error) {
      logger.error('Failed to fetch refund requests:', error);
      return NextResponse.json(
        { error: 'Failed to fetch refund requests' },
        { status: 500 }
      );
    }

    return NextResponse.json({ refunds });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    return NextResponse.json(
      { error: 'Failed to fetch refund requests' },
      { status: 500 }
    );
  }
}

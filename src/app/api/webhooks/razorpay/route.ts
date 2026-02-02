import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;

interface RazorpayWebhookPayload {
  entity: string;
  account_id: string;
  event: string;
  contains: string[];
  payload: {
    payment?: {
      entity: {
        id: string;
        amount: number;
        currency: string;
        status: string;
        order_id: string;
        method: string;
        captured: boolean;
        description?: string;
        email?: string;
        contact?: string;
        notes?: {
          userId?: string;
          productCode?: string;
          productTitle?: string;
        };
        error_code?: string;
        error_description?: string;
        error_reason?: string;
      };
    };
    order?: {
      entity: {
        id: string;
        amount: number;
        status: string;
      };
    };
  };
  created_at: number;
}

/**
 * Verify Razorpay webhook signature using HMAC-SHA256
 */
function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Complete a purchase after successful payment
 */
async function completePurchase(
  orderId: string,
  paymentId: string,
  signature?: string
): Promise<boolean> {
  const supabase = createClient();

  // Find the purchase by Razorpay order ID
  const { data: purchase, error: findError } = await supabase
    .from('Purchase')
    .select('*, product:Product(*)')
    .eq('razorpayOrderId', orderId)
    .single();

  if (findError || !purchase) {
    logger.error('Purchase not found for webhook', { orderId, error: findError });
    return false;
  }

  // Check if already processed (idempotency)
  if (purchase.status === 'completed') {
    logger.info('Purchase already completed, skipping', { orderId, purchaseId: purchase.id });
    return true;
  }

  // Update purchase status
  const { error: updateError } = await supabase
    .from('Purchase')
    .update({
      status: 'completed',
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
      isActive: true,
      updatedAt: new Date().toISOString()
    })
    .eq('id', purchase.id);

  if (updateError) {
    logger.error('Failed to update purchase status', { purchaseId: purchase.id, error: updateError });
    return false;
  }

  // Mark coupon as used if applicable
  if (purchase.couponId) {
    await supabase
      .from('Coupon')
      .update({
        currentUses: supabase.rpc('increment', { row_id: purchase.couponId }),
        updatedAt: new Date().toISOString()
      })
      .eq('id', purchase.couponId);
  }

  // Award XP for purchase
  const xpAmount = 100; // Base XP for any purchase
  const xpEvent = {
    userId: purchase.userId,
    amount: xpAmount,
    eventType: 'purchase',
    description: `Purchased ${purchase.product?.title || 'product'}`,
    metadata: {
      purchaseId: purchase.id,
      productCode: purchase.product?.code
    },
    createdAt: new Date().toISOString()
  };

  await supabase.from('XPEvent').insert(xpEvent);

  // Update user's total XP
  await supabase.rpc('increment_user_xp', {
    user_id: purchase.userId,
    xp_amount: xpAmount
  });

  logger.info('Purchase completed successfully via webhook', {
    purchaseId: purchase.id,
    orderId,
    paymentId,
    productCode: purchase.product?.code
  });

  return true;
}

/**
 * Handle failed payment
 */
async function handleFailedPayment(
  orderId: string,
  paymentId: string,
  errorCode?: string,
  errorDescription?: string
): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('Purchase')
    .update({
      status: 'failed',
      razorpayPaymentId: paymentId,
      metadata: {
        errorCode,
        errorDescription,
        failedAt: new Date().toISOString()
      },
      updatedAt: new Date().toISOString()
    })
    .eq('razorpayOrderId', orderId)
    .eq('status', 'pending');

  if (error) {
    logger.error('Failed to update failed payment', { orderId, error });
    return false;
  }

  logger.info('Payment marked as failed', { orderId, paymentId, errorCode });
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature');

    // Verify webhook signature
    if (!WEBHOOK_SECRET) {
      logger.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    if (!signature) {
      logger.error('Missing webhook signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    const isValid = verifyWebhookSignature(body, signature, WEBHOOK_SECRET);
    if (!isValid) {
      logger.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload: RazorpayWebhookPayload = JSON.parse(body);
    const event = payload.event;

    logger.info('Received Razorpay webhook', { event, accountId: payload.account_id });

    switch (event) {
      case 'payment.captured': {
        const payment = payload.payload.payment?.entity;
        if (payment) {
          const success = await completePurchase(
            payment.order_id,
            payment.id,
            signature
          );
          if (!success) {
            return NextResponse.json(
              { error: 'Failed to process payment' },
              { status: 500 }
            );
          }
        }
        break;
      }

      case 'payment.authorized': {
        // Payment is authorized but not yet captured
        // For auto-capture, this is typically followed by payment.captured
        const payment = payload.payload.payment?.entity;
        logger.info('Payment authorized', {
          orderId: payment?.order_id,
          paymentId: payment?.id
        });
        break;
      }

      case 'payment.failed': {
        const payment = payload.payload.payment?.entity;
        if (payment) {
          await handleFailedPayment(
            payment.order_id,
            payment.id,
            payment.error_code,
            payment.error_description
          );
        }
        break;
      }

      case 'order.paid': {
        // Order is fully paid - can be used as backup for payment.captured
        const order = payload.payload.order?.entity;
        logger.info('Order paid', { orderId: order?.id });
        break;
      }

      default:
        logger.info('Unhandled webhook event', { event });
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    logger.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Razorpay only sends POST requests for webhooks
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { createFirstPurchaseCoupon, markCouponAsUsed } from '@/lib/coupon-utils';
import { logPurchaseEvent } from '@/lib/audit-log';
import crypto from 'crypto';

// Zod schema for verify payment request validation
const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string()
    .min(1, 'Order ID is required')
    .max(100, 'Order ID too long')
    .regex(/^order_[a-zA-Z0-9]+$/, 'Invalid order ID format'),
  razorpay_payment_id: z.string()
    .min(1, 'Payment ID is required')
    .max(100, 'Payment ID too long')
    .regex(/^pay_[a-zA-Z0-9]+$/, 'Invalid payment ID format'),
  razorpay_signature: z.string()
    .min(1, 'Signature is required')
    .max(256, 'Signature too long')
    .regex(/^[a-f0-9]+$/, 'Invalid signature format'),
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const validation = verifyPaymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = validation.data;

    // Verify Razorpay signature using constant-time comparison to prevent timing attacks
    const signaturePayload = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(signaturePayload)
      .digest('hex');

    // Use timingSafeEqual to prevent timing attacks
    const signatureBuffer = Buffer.from(razorpay_signature || '', 'utf8');
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

    if (signatureBuffer.length !== expectedBuffer.length ||
        !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // First, check if purchase exists and get its current status (for idempotency)
    const { data: existingPurchase, error: findError } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('razorpayOrderId', razorpay_order_id)
      .single();

    if (findError || !existingPurchase) {
      logger.error('Purchase not found:', findError);
      return NextResponse.json(
        { error: 'Purchase not found' },
        { status: 404 }
      );
    }

    // IDEMPOTENCY CHECK: If already completed, return success without re-processing
    if (existingPurchase.status === 'completed') {
      logger.info('Purchase already completed, returning cached response', {
        purchaseId: existingPurchase.id,
        orderId: razorpay_order_id
      });

      // Determine redirect URL based on product
      let redirectUrl = '/dashboard';
      if (existingPurchase.product?.code === 'P1') {
        redirectUrl = '/journey';
      } else if (existingPurchase.product?.code && existingPurchase.product.code !== 'ALL_ACCESS') {
        redirectUrl = `/products/${existingPurchase.product.code.toLowerCase()}`;
      }

      return NextResponse.json({
        success: true,
        message: 'Purchase already completed',
        purchase: {
          id: existingPurchase.id,
          productName: existingPurchase.product?.title,
          productCode: existingPurchase.product?.code,
          expiresAt: existingPurchase.expiresAt,
          status: existingPurchase.status
        },
        redirectUrl,
        coupon: null // Don't regenerate coupon on duplicate calls
      });
    }

    // Update purchase record (only if not already completed)
    const { data: purchase, error: updateError } = await supabase
      .from('Purchase')
      .update({
        status: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      })
      .eq('userId', user.id)
      .eq('razorpayOrderId', razorpay_order_id)
      .eq('status', 'pending') // Only update if still pending (prevents race conditions)
      .select('*, product:Product(*)')
      .single();

    if (updateError || !purchase) {
      // If update failed because status changed, re-fetch and return
      const { data: recheckPurchase } = await supabase
        .from('Purchase')
        .select('*, product:Product(*)')
        .eq('userId', user.id)
        .eq('razorpayOrderId', razorpay_order_id)
        .single();

      if (recheckPurchase?.status === 'completed') {
        // Race condition - another request completed it
        logger.info('Purchase completed by concurrent request', {
          purchaseId: recheckPurchase.id,
          orderId: razorpay_order_id
        });

        let redirectUrl = '/dashboard';
        if (recheckPurchase.product?.code === 'P1') {
          redirectUrl = '/journey';
        } else if (recheckPurchase.product?.code && recheckPurchase.product.code !== 'ALL_ACCESS') {
          redirectUrl = `/products/${recheckPurchase.product.code.toLowerCase()}`;
        }

        return NextResponse.json({
          success: true,
          message: 'Purchase completed successfully',
          purchase: {
            id: recheckPurchase.id,
            productName: recheckPurchase.product?.title,
            productCode: recheckPurchase.product?.code,
            expiresAt: recheckPurchase.expiresAt,
            status: recheckPurchase.status
          },
          redirectUrl,
          coupon: null
        });
      }

      logger.error('Update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update purchase' },
        { status: 500 }
      );
    }

    // Mark coupon as used if applicable
    if (purchase.couponId) {
      try {
        await markCouponAsUsed(purchase.couponId, purchase.id);
      } catch (couponError) {
        logger.error('Failed to mark coupon as used:', couponError);
        // Don't fail the purchase verification
      }
    }

    // Award XP for purchase
    try {
      await supabase
        .from('XPEvent')
        .insert({
          userId: user.id,
          type: 'product_purchase',
          points: 100,
          description: `Purchased ${purchase.product?.title || 'Product'}`
        });

      // Get current user XP
      const { data: currentUser } = await supabase
        .from('User')
        .select('totalXP')
        .eq('id', user.id)
        .single();

      // Update user's total XP
      await supabase
        .from('User')
        .update({
          totalXP: (currentUser?.totalXP || 0) + 100,
          updatedAt: new Date().toISOString()
        })
        .eq('id', user.id);
    } catch (xpError) {
      logger.error('Failed to award XP:', xpError);
      // Don't fail the purchase verification
    }

    // If this is P1 purchase, create initial lesson progress records
    if (purchase.product?.code === 'P1') {
      try {
        // No need to update currentDay in new schema
        // Progress is tracked through LessonProgress table
        logger.info('P1 product purchased, user can now access lessons');
      } catch (error) {
        logger.error('Failed to initialize P1 progress:', error);
      }
    }

    // Check if this is user's first purchase (excluding ALL_ACCESS)
    let newCoupon = null;
    if (purchase.product?.code !== 'ALL_ACCESS') {
      try {
        // Count user's completed purchases
        const { count } = await supabase
          .from('Purchase')
          .select('*', { count: 'exact', head: true })
          .eq('userId', user.id)
          .eq('status', 'completed')
          .neq('product.code', 'ALL_ACCESS');
        
        // If this is the first individual course purchase, create a coupon
        if (count === 1) {
          const userName = user.email?.split('@')[0] || 'USER';
          newCoupon = await createFirstPurchaseCoupon(user.id, userName);
        }
      } catch (couponError) {
        logger.error('Failed to check/create coupon:', couponError);
        // Don't fail the purchase verification
      }
    }

    // Get client IP for audit logging
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip')
      || 'unknown';

    // Audit log the successful purchase
    await logPurchaseEvent(
      'purchase_complete',
      user.id,
      purchase.id,
      {
        productCode: purchase.product?.code,
        amount: purchase.amount,
        paymentId: razorpay_payment_id,
      },
      ipAddress
    );

    // Determine redirect URL based on product
    let redirectUrl = '/dashboard';
    if (purchase.product?.code === 'P1') {
      redirectUrl = '/journey';
    } else if (purchase.product?.code && purchase.product.code !== 'ALL_ACCESS') {
      redirectUrl = `/products/${purchase.product.code.toLowerCase()}`;
    }

    return NextResponse.json({
      success: true,
      message: 'Purchase completed successfully',
      purchase: {
        id: purchase.id,
        productName: purchase.product?.title,
        productCode: purchase.product?.code,
        expiresAt: purchase.expiresAt,
        status: purchase.status
      },
      redirectUrl,
      coupon: newCoupon ? {
        code: newCoupon.code,
        discount: newCoupon.discountPercent,
        description: newCoupon.description,
        validUntil: newCoupon.validUntil
      } : null
    });

  } catch (error) {
    logger.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
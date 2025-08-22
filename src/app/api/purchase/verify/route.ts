import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { createFirstPurchaseCoupon, markCouponAsUsed } from '@/lib/coupon-utils';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature
    } = await request.json();

    // Verify Razorpay signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Update purchase record
    const { data: purchase, error: updateError } = await supabase
      .from('Purchase')
      .update({
        status: 'completed',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      })
      .eq('userId', user.id)
      .eq('razorpayOrderId', razorpay_order_id)
      .select('*, product:Product(*)')
      .single();

    if (updateError || !purchase) {
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
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const validateCouponSchema = z.object({
  code: z.string().min(1).max(50),
  productCodes: z.array(z.string()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    const validation = validateCouponSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { valid: false, message: 'Invalid request' },
        { status: 400 }
      );
    }

    const { code, productCodes } = validation.data;
    const supabase = createClient();

    // Find the coupon
    const { data: coupon, error } = await supabase
      .from('Coupon')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !coupon) {
      logger.debug('Coupon not found', { code });
      return NextResponse.json({
        valid: false,
        message: 'Invalid coupon code'
      });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json({
        valid: false,
        message: 'This coupon is no longer active'
      });
    }

    // Check expiration
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({
        valid: false,
        message: 'This coupon has expired'
      });
    }

    // Check if coupon is restricted to this user
    if (coupon.userId && coupon.userId !== user.id) {
      return NextResponse.json({
        valid: false,
        message: 'This coupon is not valid for your account'
      });
    }

    // Check if coupon has been used (single-use coupons)
    if (coupon.usedAt) {
      return NextResponse.json({
        valid: false,
        message: 'This coupon has already been used'
      });
    }

    // Check max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({
        valid: false,
        message: 'This coupon has reached its maximum uses'
      });
    }

    // Check minimum purchase amount if applicable
    if (coupon.minPurchaseAmount && productCodes) {
      // Get total cart amount
      const { data: products } = await supabase
        .from('Product')
        .select('price')
        .in('code', productCodes);

      const totalAmount = products?.reduce((sum, p) => sum + (p.price || 0), 0) || 0;

      if (totalAmount < coupon.minPurchaseAmount) {
        return NextResponse.json({
          valid: false,
          message: `Minimum purchase of ₹${coupon.minPurchaseAmount.toLocaleString()} required`
        });
      }
    }

    // Coupon is valid
    return NextResponse.json({
      valid: true,
      code: coupon.code,
      type: coupon.discountType || 'percentage',
      discount: coupon.discountValue,
      description: coupon.description || `${coupon.discountValue}${coupon.discountType === 'fixed' ? '₹' : '%'} off`,
      maxDiscount: coupon.maxDiscountAmount
    });

  } catch (error) {
    logger.error('Coupon validation error:', error);
    return NextResponse.json(
      { valid: false, message: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { validateCoupon } from '@/lib/coupon-utils';

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { couponCode, productCode, originalAmount } = await request.json();

    if (!couponCode || !productCode || !originalAmount) {
      return NextResponse.json(
        { valid: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await validateCoupon(
      couponCode,
      user.id,
      productCode,
      originalAmount
    );

    if (!result.valid) {
      return NextResponse.json({
        valid: false,
        error: result.error || 'Invalid coupon'
      });
    }

    return NextResponse.json({
      valid: true,
      discountPercent: result.coupon.discountPercent,
      discountAmount: result.discountAmount,
      finalAmount: result.finalAmount,
      description: result.coupon.description
    });

  } catch (error) {
    logger.error('Coupon validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Failed to validate coupon' },
      { status: 500 }
    );
  }
}
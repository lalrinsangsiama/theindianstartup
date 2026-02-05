import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAuth } from '@/lib/auth';
import { validateCoupon } from '@/lib/coupon-utils';
import { checkRequestBodySize, checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

// Zod schema for coupon validation request
const validateCouponSchema = z.object({
  couponCode: z.string().min(1, 'Coupon code is required').max(50, 'Coupon code too long'),
  productCode: z.string().min(1, 'Product code is required').max(20, 'Product code too long'),
  originalAmount: z.number().int().positive('Amount must be a positive integer')
});

export async function POST(request: NextRequest) {
  try {
    // Check request body size before parsing
    const bodySizeError = checkRequestBodySize(request);
    if (bodySizeError) {
      return bodySizeError;
    }

    // Rate limit to prevent coupon code enumeration/brute-force
    const rateLimitError = await checkRateLimit(request, 'payment');
    if (rateLimitError) {
      return rateLimitError;
    }

    const user = await requireAuth();

    // Parse and validate request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { valid: false, error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const validation = validateCouponSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { valid: false, error: 'Validation failed', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { couponCode, productCode, originalAmount } = validation.data;

    const result = await validateCoupon(
      couponCode,
      user.id,
      productCode,
      originalAmount
    );

    if (!result.valid) {
      return NextResponse.json(
        { valid: false, error: result.error || 'Invalid coupon' },
        { status: 400 }
      );
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
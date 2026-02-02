import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { validateCoupon } from '@/lib/coupon-utils';
import { checkIdempotency, storeIdempotencyResponse, checkPendingOrder } from '@/lib/idempotency';
import { checkPaymentFraud } from '@/lib/fraud-detection';
import { logPurchaseEvent } from '@/lib/audit-log';
import { applyRateLimit, getClientIP } from '@/lib/rate-limit';
import { capturePaymentError } from '@/lib/sentry';
import Razorpay from 'razorpay';
import { PRODUCTS } from '@/lib/product-access';

// Zod schema for create order request validation
const createOrderSchema = z.object({
  productType: z.string()
    .min(1, 'Product type is required')
    .max(20, 'Product type too long')
    .regex(/^[A-Z0-9_]+$/, 'Invalid product type format'),
  amount: z.number()
    .int('Amount must be an integer')
    .positive('Amount must be positive')
    .max(10000000, 'Amount exceeds maximum'), // Max 1 lakh INR in paise
  couponCode: z.string()
    .max(50, 'Coupon code too long')
    .regex(/^[A-Z0-9_-]*$/, 'Invalid coupon format')
    .optional()
    .nullable(),
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting first (before auth to prevent enumeration)
    const rateLimit = await applyRateLimit(request, 'payment');
    if (!rateLimit.allowed) {
      logger.warn('Payment rate limit exceeded', {
        ip: getClientIP(request),
        remaining: rateLimit.result.remaining,
      });
      return NextResponse.json(
        { error: 'Too many payment attempts. Please wait before trying again.' },
        {
          status: 429,
          headers: rateLimit.headers,
        }
      );
    }

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

    const validation = createOrderSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productType, amount, couponCode } = validation.data;

    // Validate product exists
    const product = PRODUCTS[productType];
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product type' },
        { status: 400 }
      );
    }

    // Check for idempotency (prevent rapid double-clicks)
    const idempotencyCheck = await checkIdempotency(user.id, 'create-order', {
      productType,
      amount,
      couponCode
    });

    if (!idempotencyCheck.isNew && idempotencyCheck.existingResponse) {
      logger.info('Returning cached idempotent response', {
        userId: user.id,
        productType
      });
      return NextResponse.json(idempotencyCheck.existingResponse);
    }

    // Check for existing pending orders for this product
    const pendingCheck = await checkPendingOrder(user.id, productType);
    if (pendingCheck.hasPending && pendingCheck.pendingOrder) {
      logger.info('Returning existing pending order', {
        userId: user.id,
        productType
      });
      return NextResponse.json(pendingCheck.pendingOrder);
    }

    // Get client IP for fraud detection
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || request.headers.get('cf-connecting-ip')
      || 'unknown';

    // Fraud detection check
    const fraudCheck = await checkPaymentFraud({
      userId: user.id,
      email: user.email || '',
      ipAddress,
      amount,
      productCode: productType,
      userAgent: request.headers.get('user-agent') || undefined,
    });

    if (!fraudCheck.allowed) {
      logger.warn('Payment blocked by fraud detection', {
        userId: user.id,
        riskScore: fraudCheck.riskScore,
        reasons: fraudCheck.reasons,
      });
      return NextResponse.json(
        { error: 'Payment could not be processed. Please contact support.' },
        { status: 403 }
      );
    }

    // Log if payment requires manual review
    if (fraudCheck.requiresReview) {
      logger.info('Payment flagged for review', {
        userId: user.id,
        riskScore: fraudCheck.riskScore,
        riskLevel: fraudCheck.riskLevel,
        reasons: fraudCheck.reasons,
      });
    }

    // Validate coupon if provided
    let finalAmount = product.price * 100; // Convert to paise
    let couponData = null;
    let discountAmount = 0;
    
    if (couponCode) {
      const couponResult = await validateCoupon(
        couponCode,
        user.id,
        productType,
        finalAmount
      );
      
      if (!couponResult.valid) {
        return NextResponse.json(
          { error: couponResult.error || 'Invalid coupon' },
          { status: 400 }
        );
      }
      
      couponData = couponResult.coupon;
      discountAmount = couponResult.discountAmount || 0;
      finalAmount = couponResult.finalAmount || finalAmount;
    }
    
    // Validate amount matches expected amount
    if (amount !== finalAmount) {
      return NextResponse.json(
        { error: 'Invalid amount for product' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // First, get or create the product in the database
    let { data: dbProduct } = await supabase
      .from('Product')
      .select('id')
      .eq('code', productType)
      .single();
    
    if (!dbProduct) {
      // Create product if it doesn't exist
      const { data: newProduct, error: createError } = await supabase
        .from('Product')
        .insert({
          code: productType,
          slug: productType.toLowerCase(),
          title: product.title,
          description: product.description,
          price: product.price * 100, // Convert to paise
          originalPrice: product.price * 100 * 2, // 50% discount
          features: [],
          outcomes: [],
          estimatedTime: 30 * 24 * 60, // 30 days in minutes
          isActive: true,
          isBundle: productType === 'ALL_ACCESS',
          bundleProducts: product.bundleProducts || []
        })
        .select('id')
        .single();
      
      if (createError || !newProduct) {
        logger.error('Failed to create product:', createError);
        return NextResponse.json(
          { error: 'Failed to create product record' },
          { status: 500 }
        );
      }
      dbProduct = newProduct;
    }

    // Check if user already has active access to this product or ALL_ACCESS bundle
    const { data: existingPurchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .or(`product.code.eq.${productType},product.code.eq.ALL_ACCESS`);

    if (existingPurchases && existingPurchases.length > 0) {
      const hasProduct = existingPurchases.some(p => p.product?.code === productType);
      const hasAllAccess = existingPurchases.some(p => p.product?.code === 'ALL_ACCESS');
      
      if (hasProduct || hasAllAccess) {
        return NextResponse.json(
          { error: 'You already have active access to this product' },
          { status: 400 }
        );
      }
    }

    // Create Razorpay order
    const orderOptions = {
      amount: amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: user.id,
        productCode: productType,
        productTitle: product.title
      }
    };

    const razorpayOrder = await razorpay.orders.create(orderOptions);

    // Calculate access end date (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Create purchase record
    const purchaseData: any = {
      userId: user.id,
      productId: dbProduct.id,
      amount: finalAmount,
      originalAmount: product.price * 100,
      status: 'pending',
      razorpayOrderId: razorpayOrder.id,
      expiresAt: expiresAt.toISOString(),
      purchasedAt: new Date().toISOString()
    };
    
    if (couponData) {
      purchaseData.couponId = couponData.id;
      purchaseData.discountAmount = discountAmount;
    }
    
    const { data: purchase, error: dbError } = await supabase
      .from('Purchase')
      .insert(purchaseData)
      .select()
      .single();

    if (dbError) {
      logger.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create purchase record' },
        { status: 500 }
      );
    }

    const responseData = {
      orderId: razorpayOrder.id,
      amount: amount,
      currency: 'INR',
      productName: product.title,
      purchaseId: purchase.id
    };

    // Store idempotency response for future duplicate requests
    if (idempotencyCheck.key) {
      await storeIdempotencyResponse(idempotencyCheck.key, responseData);
    }

    // Audit log the purchase creation
    await logPurchaseEvent(
      'purchase_create',
      user.id,
      purchase.id,
      {
        productCode: productType,
        amount: finalAmount,
        orderId: razorpayOrder.id,
        fraudRiskLevel: fraudCheck.riskLevel,
        fraudRiskScore: fraudCheck.riskScore,
      },
      ipAddress
    );

    return NextResponse.json(responseData);

  } catch (error) {
    logger.error('Create order error:', error);

    // Capture critical payment error in Sentry
    capturePaymentError(
      error instanceof Error ? error : new Error(String(error)),
      {
        userId: 'unknown', // User may not be available if auth failed
        stage: 'create-order',
      }
    );

    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
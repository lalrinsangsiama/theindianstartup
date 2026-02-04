import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { validateCoupon } from '@/lib/coupon-utils';
import { checkIdempotency, storeIdempotencyResponse, checkPendingOrder } from '@/lib/idempotency';
import { checkPaymentFraud } from '@/lib/fraud-detection';
import { logPurchaseEvent } from '@/lib/audit-log';
import { applyRateLimit, getClientIP, checkRequestBodySize, MAX_BODY_SIZES } from '@/lib/rate-limit';
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
    .max(15000000, 'Amount exceeds maximum'), // Max 1.5 lakh INR in paise (supports All-Access at ₹1,49,999)
  couponCode: z.string()
    .max(50, 'Coupon code too long')
    .regex(/^[A-Z0-9_-]*$/, 'Invalid coupon format')
    .optional()
    .nullable(),
});

// BE2 FIX: Define proper TypeScript interface for purchase data
interface PurchaseData {
  userId: string;
  productId: string;
  amount: number;
  originalAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  razorpayOrderId: string;
  expiresAt: string;
  purchasedAt: string;
  couponId?: string;
  discountAmount?: number;
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    // H14 FIX: Check request body size first (prevent DoS via large payloads)
    const bodySizeError = checkRequestBodySize(request, MAX_BODY_SIZES.json);
    if (bodySizeError) {
      return bodySizeError;
    }

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

    // Block purchases from unverified emails for consistency with checkout page
    // This prevents potential fraud and ensures we can contact the customer
    if (!user.email_confirmed_at) {
      logger.warn('Purchase blocked: unverified email', { userId: user.id, email: user.email });
      return NextResponse.json(
        { error: 'Please verify your email address before making a purchase.' },
        { status: 403 }
      );
    }

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

    // SECURITY FIX: Server-side price calculation
    // Calculate the expected price server-side first, then validate against frontend amount
    const catalogPriceInPaise = product.price * 100;
    let serverCalculatedAmount = catalogPriceInPaise;
    let couponData = null;
    let discountAmount = 0;

    // Validate coupon FIRST before accepting any amount (security fix for coupon bypass)
    if (couponCode) {
      const couponResult = await validateCoupon(
        couponCode,
        user.id,
        productType,
        catalogPriceInPaise
      );

      if (!couponResult.valid) {
        return NextResponse.json(
          { error: couponResult.error || 'Invalid coupon' },
          { status: 400 }
        );
      }

      couponData = couponResult.coupon;
      discountAmount = couponResult.discountAmount || 0;
      serverCalculatedAmount = couponResult.finalAmount || catalogPriceInPaise;
    }

    // SECURITY FIX: Compare frontend amount with server calculation
    // Allow small tolerance (₹1) for rounding differences
    const amountTolerance = 100; // 100 paise = ₹1
    if (Math.abs(amount - serverCalculatedAmount) > amountTolerance) {
      logger.warn('Price mismatch detected', {
        userId: user.id,
        productType,
        frontendAmount: amount,
        serverAmount: serverCalculatedAmount,
        couponCode,
      });
      return NextResponse.json(
        { error: 'Price mismatch. Please refresh and try again.' },
        { status: 400 }
      );
    }

    // Use server-calculated amount for the order (never trust frontend amount)
    const finalAmount = serverCalculatedAmount;

    // Validate that final amount is reasonable
    const minAllowedAmount = Math.floor(catalogPriceInPaise * 0.5); // Allow up to 50% discount
    if (finalAmount > catalogPriceInPaise) {
      return NextResponse.json(
        { error: 'Amount exceeds product price' },
        { status: 400 }
      );
    }
    if (finalAmount < minAllowedAmount && !couponData) {
      // Only block if no valid coupon (coupon can give > 50% discount if configured)
      return NextResponse.json(
        { error: 'Amount below minimum allowed' },
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

    // Create Razorpay order with server-calculated amount (not frontend amount)
    const orderOptions = {
      amount: finalAmount,
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

    // BE2 FIX: Create purchase record with proper typing
    const purchaseData: PurchaseData = {
      userId: user.id,
      productId: dbProduct.id,
      amount: finalAmount,
      originalAmount: catalogPriceInPaise,
      status: 'pending',
      razorpayOrderId: razorpayOrder.id,
      expiresAt: expiresAt.toISOString(),
      purchasedAt: new Date().toISOString(),
      ...(couponData && {
        couponId: couponData.id,
        discountAmount: discountAmount
      })
    };
    
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
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: finalAmount, // Use server-calculated amount
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
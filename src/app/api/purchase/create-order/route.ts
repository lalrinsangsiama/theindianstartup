import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { validateCoupon } from '@/lib/coupon-utils';
import Razorpay from 'razorpay';
import { PRODUCTS } from '@/lib/product-access';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { productType, amount, couponCode } = await request.json();

    // Validate product exists
    const product = PRODUCTS[productType];
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product type' },
        { status: 400 }
      );
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
        console.error('Failed to create product:', createError);
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
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to create purchase record' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: razorpayOrder.id,
      amount: amount,
      currency: 'INR',
      productName: product.title,
      purchaseId: purchase.id
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
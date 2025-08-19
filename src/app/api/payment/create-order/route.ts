import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/lib/supabase/server';
import { createId } from '@paralleldrive/cuid2';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { productCode, amount } = body;
    
    // Get product from database
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select('*')
      .eq('code', productCode)
      .single();
    
    if (productError || !product) {
      return NextResponse.json(
        { error: 'Invalid product' },
        { status: 400 }
      );
    }
    
    // Validate amount matches product price (convert from rupees to paise)
    const expectedAmount = product.price * 100;
    if (amount !== expectedAmount) {
      return NextResponse.json(
        { error: 'Invalid amount for product' },
        { status: 400 }
      );
    }
    
    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: `order_${createId()}`,
      notes: {
        userId: user.id,
        productCode: productCode,
        productId: product.id,
        productTitle: product.title,
        userEmail: user.email,
      },
    });

    // Calculate expiry date (1 year from now)
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Create pending purchase record
    const purchaseData = {
      id: createId(),
      userId: user.id,
      productId: product.id,
      amount: amount,
      currency: 'INR',
      status: 'pending',
      razorpayOrderId: order.id,
      expiresAt: expiresAt.toISOString(),
    };

    const { error: purchaseError } = await supabase
      .from('Purchase')
      .insert(purchaseData);

    if (purchaseError) {
      console.error('Error creating purchase record:', purchaseError);
      // Continue anyway - we'll create the record after payment
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: 'The Indian Startup',
      description: `${product.title} - ${productCode}`,
      prefill: {
        name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        email: user.email,
        contact: user.user_metadata?.phone || '',
      },
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
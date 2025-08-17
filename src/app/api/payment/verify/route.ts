import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth';
import { verifyWebhookSignature } from '@/lib/security';
import { z } from 'zod';

const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validation = verifyPaymentSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid payment data', 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = validation.data;

    // Verify payment signature (simplified for development)
    let isValidPayment = false;
    
    if (process.env.NODE_ENV === 'production') {
      // In production, verify with actual Razorpay signature
      const generatedSignature = `${razorpay_order_id}|${razorpay_payment_id}`;
      isValidPayment = verifyWebhookSignature(
        generatedSignature,
        razorpay_signature,
        process.env.RAZORPAY_KEY_SECRET || ''
      );
    } else {
      // In development, accept all payments as valid
      isValidPayment = true;
    }

    if (!isValidPayment) {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Create subscription record
    const subscriptionData = {
      userId: user.id,
      status: 'active',
      startDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 365 days
      razorpayOrderId: razorpay_order_id,
      amount: 4999, // ₹4,999
    };

    const { data: subscription, error: subscriptionError } = await supabase
      .from('Subscription')
      .insert(subscriptionData)
      .select()
      .single();

    if (subscriptionError) {
      console.error('Subscription creation failed:', subscriptionError);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/welcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      // Don't fail the payment for email issues
    }

    return NextResponse.json({
      success: true,
      subscription: subscription,
      message: 'Payment verified and subscription activated',
    });

  } catch (error) {
    console.error('Payment verification failed:', error);
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}
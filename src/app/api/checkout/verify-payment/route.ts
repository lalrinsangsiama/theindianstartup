import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, getPlanDetails } from '@/lib/razorpay';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/email';
import { generateInvoice } from '@/lib/invoice';
import { EmailAutomation } from '@/lib/email-automation';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    // Verify signature
    const isValidSignature = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get order details from database
    const { data: orderData, error: orderError } = await supabase
      .from('payment_orders')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', user.id)
      .single();

    if (orderError || !orderData) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('payment_orders')
      .update({
        status: 'completed',
        razorpay_payment_id,
        razorpay_signature,
        completed_at: new Date().toISOString(),
      })
      .eq('id', orderData.id);

    if (updateError) {
      console.error('Failed to update order:', updateError);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    // Create subscription
    const plan = getPlanDetails(orderData.plan_id);
    const now = new Date();
    const expiryDate = new Date(now);
    expiryDate.setDate(expiryDate.getDate() + plan.accessDays);

    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan_id: orderData.plan_id,
        status: 'active',
        start_date: now.toISOString(),
        expiry_date: expiryDate.toISOString(),
        amount: orderData.amount,
        razorpay_order_id,
        razorpay_payment_id,
        created_at: now.toISOString(),
      });

    if (subscriptionError) {
      console.error('Failed to create subscription:', subscriptionError);
      return NextResponse.json(
        { error: 'Failed to create subscription' },
        { status: 500 }
      );
    }

    // Award onboarding XP bonus
    const { error: xpError } = await supabase
      .from('users')
      .update({
        total_xp: supabase.rpc('increment_xp', { user_id: user.id, points: 100 })
      })
      .eq('id', user.id);

    // Create XP event
    await supabase
      .from('xp_events')
      .insert({
        user_id: user.id,
        type: 'subscription_purchase',
        points: 100,
        description: 'Welcome bonus for purchasing P1 subscription',
        created_at: new Date().toISOString(),
      });

    // Generate and send invoice (async, don't wait)
    generateInvoice({
      orderId: orderData.id,
      userEmail: user.email!,
      userName: user.user_metadata?.name || user.email!,
      planName: plan.name,
      amount: orderData.amount,
      paymentId: razorpay_payment_id,
      paymentDate: new Date(),
    }).then(async (invoiceBuffer) => {
      // Send payment confirmation email with professional template
      try {
        await EmailAutomation.sendPaymentConfirmation(
          user.id,
          orderData.amount / 100, // Convert from paise to rupees
          razorpay_order_id,
          `${process.env.NEXT_PUBLIC_SITE_URL}/invoice/${orderData.id}`
        );
      } catch (emailError) {
        console.error('Failed to send payment confirmation email:', emailError);
      }
    }).catch(error => {
      console.error('Failed to generate invoice:', error);
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
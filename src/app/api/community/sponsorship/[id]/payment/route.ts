import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../lib/supabase/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// POST - Create Razorpay order for sponsorship payment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get sponsorship order
    const { data: order, error: orderError } = await supabase
      .from('sponsorship_orders')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Sponsorship order not found' },
        { status: 404 }
      );
    }

    // Check if order is in correct state for payment
    if (order.payment_status !== 'pending' || order.status !== 'draft') {
      return NextResponse.json(
        { error: 'Order is not eligible for payment' },
        { status: 400 }
      );
    }

    // Get user profile for order details
    const { data: userProfile } = await supabase
      .from('users')
      .select('name, email, phone')
      .eq('id', user.id)
      .single();

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.total_amount, // Amount in paise
      currency: 'INR',
      receipt: `sponsorship_${order.id}`,
      notes: {
        sponsorship_order_id: order.id,
        user_id: user.id,
        sponsorship_type: order.type,
        duration: order.duration.toString(),
      },
    });

    // Update sponsorship order with Razorpay order ID
    const { error: updateError } = await supabase
      .from('sponsorship_orders')
      .update({
        razorpay_order_id: razorpayOrder.id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating sponsorship order:', updateError);
      return NextResponse.json(
        { error: 'Failed to update sponsorship order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: order.total_amount,
      currency: 'INR',
      name: 'The Indian Startup',
      description: `Sponsorship: ${order.title}`,
      prefill: {
        name: userProfile?.name || user.email,
        email: userProfile?.email || user.email,
        contact: userProfile?.phone || '',
      },
      notes: {
        sponsorship_order_id: order.id,
        sponsorship_type: order.type,
      },
    });

  } catch (error) {
    console.error('Create payment order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Verify payment and update order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { razorpay_payment_id, razorpay_signature } = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get sponsorship order
    const { data: order, error: orderError } = await supabase
      .from('sponsorship_orders')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Sponsorship order not found' },
        { status: 404 }
      );
    }

    // Verify Razorpay signature
    const crypto = require('crypto');
    const body = order.razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update sponsorship order with payment details
    const { error: updateError } = await supabase
      .from('sponsorship_orders')
      .update({
        razorpay_payment_id,
        payment_status: 'completed',
        status: 'pending_review', // Needs admin approval
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating payment status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update payment status' },
        { status: 500 }
      );
    }

    // Award XP for sponsorship payment
    await supabase.rpc('award_xp', {
      user_id: user.id,
      points: 100,
      event_type: 'sponsorship_payment',
      description: `Completed payment for ${order.type} sponsorship`
    });

    // TODO: Send email notification to admins about new sponsorship order
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully. Your sponsorship order is pending review.',
      order: {
        id: order.id,
        status: 'pending_review',
        paymentStatus: 'completed',
      },
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
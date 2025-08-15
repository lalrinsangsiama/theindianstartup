import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, getPlanDetails, type PricingPlanId } from '@/lib/razorpay';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { planId } = await request.json() as { planId: PricingPlanId };

    // Validate plan ID
    if (!planId || !getPlanDetails(planId)) {
      return NextResponse.json(
        { error: 'Invalid plan ID' },
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

    // Check if user already has an active subscription
    const { data: existingSubscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 400 }
      );
    }

    // Create Razorpay order
    const order = await createRazorpayOrder(planId, user.email!);
    const plan = getPlanDetails(planId);

    // Store order in database
    const { error: dbError } = await supabase
      .from('payment_orders')
      .insert({
        id: order.id,
        user_id: user.id,
        plan_id: planId,
        amount: order.amount,
        currency: order.currency,
        status: 'created',
        razorpay_order_id: order.id,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Failed to store order in database:', dbError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planName: plan.name,
    });

  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
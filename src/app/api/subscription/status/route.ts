import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get subscription details
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .select(`
        *,
        payment_orders!inner(
          plan_id,
          amount,
          created_at
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .single();

    if (subscriptionError || !subscription) {
      return NextResponse.json({
        hasSubscription: false,
        status: null,
        message: 'No subscription found'
      });
    }

    // Check if subscription is active and not expired
    const now = new Date();
    const expiryDate = new Date(subscription.expiry_date);
    const isExpired = expiryDate < now;
    const isActive = subscription.status === 'active' && !isExpired;

    // Calculate days remaining
    const daysRemaining = isExpired ? 0 : Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return NextResponse.json({
      hasSubscription: true,
      status: subscription.status,
      isActive,
      isExpired,
      planId: subscription.plan_id,
      startDate: subscription.start_date,
      expiryDate: subscription.expiry_date,
      daysRemaining,
      amount: subscription.amount,
      paymentDetails: {
        orderId: subscription.razorpay_order_id,
        paymentId: subscription.razorpay_payment_id,
        purchaseDate: subscription.created_at
      }
    });

  } catch (error) {
    console.error('Subscription status check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
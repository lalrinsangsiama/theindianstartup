import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Fetch sponsorship orders for user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Build query
    let query = supabase
      .from('sponsorship_orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching sponsorship orders:', error);
      return NextResponse.json(
        { error: 'Failed to fetch sponsorship orders' },
        { status: 500 }
      );
    }

    // Transform data to match frontend expectations
    const transformedOrders = orders?.map(order => ({
      id: order.id,
      type: order.type,
      duration: order.duration,
      targetAudience: order.target_audience || [],
      title: order.title,
      content: order.content,
      imageUrl: order.image_url,
      websiteUrl: order.website_url,
      basePrice: order.base_price,
      multiplier: order.multiplier,
      totalAmount: order.total_amount,
      razorpayOrderId: order.razorpay_order_id,
      razorpayPaymentId: order.razorpay_payment_id,
      paymentStatus: order.payment_status,
      status: order.status,
      approvalNotes: order.approval_notes,
      startDate: order.start_date,
      endDate: order.end_date,
      impressions: order.impressions,
      clicks: order.clicks,
      createdAt: order.created_at,
      updatedAt: order.updated_at,
    })) || [];

    return NextResponse.json({
      orders: transformedOrders,
    });

  } catch (error) {
    console.error('Sponsorship orders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new sponsorship order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    const { type, duration, title, content, websiteUrl } = orderData;
    
    if (!type || !duration || !title || !content || !websiteUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: type, duration, title, content, websiteUrl' },
        { status: 400 }
      );
    }

    // Calculate pricing based on type and duration
    const basePrices = {
      featured_post: 500000, // ₹5000 in paise
      banner_ad: 1000000,    // ₹10000 in paise
      promoted_listing: 300000, // ₹3000 in paise
    };

    const basePrice = basePrices[type as keyof typeof basePrices] || 500000;
    
    // Duration multiplier (weekly pricing)
    const durationMultiplier = Math.max(1, duration / 7);
    
    // Audience multiplier (broader audience costs more)
    const targetAudience = orderData.targetAudience || ['all'];
    const audienceMultiplier = targetAudience.includes('all') ? 1.5 : 1.0;
    
    const multiplier = durationMultiplier * audienceMultiplier;
    const totalAmount = Math.round(basePrice * multiplier);

    // Create sponsorship order
    const { data: order, error: orderError } = await supabase
      .from('sponsorship_orders')
      .insert({
        user_id: user.id,
        type,
        duration,
        target_audience: targetAudience,
        title,
        content,
        image_url: orderData.imageUrl,
        website_url: websiteUrl,
        base_price: basePrice,
        multiplier,
        total_amount: totalAmount,
        payment_status: 'pending',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating sponsorship order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create sponsorship order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        type: order.type,
        duration: order.duration,
        targetAudience: order.target_audience,
        title: order.title,
        content: order.content,
        imageUrl: order.image_url,
        websiteUrl: order.website_url,
        basePrice: order.base_price,
        multiplier: order.multiplier,
        totalAmount: order.total_amount,
        paymentStatus: order.payment_status,
        status: order.status,
        createdAt: order.created_at,
      },
      message: 'Sponsorship order created successfully',
    });

  } catch (error) {
    console.error('Create sponsorship order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
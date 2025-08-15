import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
  try {
    const { revenueStreams, pricingStrategy } = await request.json();

    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update portfolio with business model data
    const { data, error } = await supabase
      .from('startup_portfolios')
      .update({
        revenue_streams: revenueStreams,
        pricing_strategy: pricingStrategy,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating business model:', error);
      return NextResponse.json(
        { error: 'Failed to update business model' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error('Business model API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
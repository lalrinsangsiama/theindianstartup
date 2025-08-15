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

    // Get user's portfolio
    const { data: portfolio, error: portfolioError } = await supabase
      .from('startup_portfolios')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (portfolioError && portfolioError.code !== 'PGRST116') {
      console.error('Portfolio fetch error:', portfolioError);
      return NextResponse.json(
        { error: 'Failed to fetch portfolio' },
        { status: 500 }
      );
    }

    // If no portfolio exists, create one
    if (!portfolio) {
      const { data: newPortfolio, error: createError } = await supabase
        .from('startup_portfolios')
        .insert({
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (createError) {
        console.error('Portfolio creation error:', createError);
        return NextResponse.json(
          { error: 'Failed to create portfolio' },
          { status: 500 }
        );
      }

      return NextResponse.json(newPortfolio);
    }

    return NextResponse.json(portfolio);

  } catch (error) {
    console.error('Portfolio API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json();

    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update portfolio
    const { data: portfolio, error: updateError } = await supabase
      .from('startup_portfolios')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Portfolio update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update portfolio' },
        { status: 500 }
      );
    }

    return NextResponse.json(portfolio);

  } catch (error) {
    console.error('Portfolio update API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
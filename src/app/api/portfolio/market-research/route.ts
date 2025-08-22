import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(request: NextRequest) {
  try {
    const { targetMarket, competitors, marketSize } = await request.json();

    // Get user from session
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update portfolio with market research data
    const { data, error } = await supabase
      .from('StartupPortfolio')
      .update({
        targetMarket: targetMarket,
        competitors: competitors,
        marketSize: marketSize,
        updatedAt: new Date().toISOString(),
      })
      .eq('userId', user.id)
      .select()
      .single();

    if (error) {
      logger.error('Error updating market research:', error);
      return NextResponse.json(
        { error: 'Failed to update market research' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    logger.error('Market research API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
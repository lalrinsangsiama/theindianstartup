import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/investors/[id] - Get specific investor details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check P3 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .in('productCode', ['P3', 'ALL_ACCESS']);

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json(
        { 
          error: 'Access Denied', 
          message: 'Purchase P3: Funding Mastery to access investor details'
        },
        { status: 403 }
      );
    }

    const { data: investor, error } = await supabase
      .from('Investor')
      .select(`
        *,
        contacts:InvestorContact(*),
        insights:InvestorInsight(
          id,
          type,
          content,
          rating,
          isVerified,
          createdAt,
          user:User(name)
        )
      `)
      .eq('id', params.id)
      .eq('activeStatus', true)
      .single();

    if (error || !investor) {
      return NextResponse.json(
        { error: 'Investor not found' },
        { status: 404 }
      );
    }

    // Track the view
    await supabase.from('InvestorView').upsert({
      investorId: investor.id,
      userId: user.id,
      viewedAt: new Date().toISOString()
    }, { onConflict: 'investorId,userId' });

    // Filter insights to show only verified ones + user's own
    if (investor.insights) {
      investor.insights = investor.insights.filter((insight: any) => 
        insight.isVerified || insight.userId === user.id
      );
    }

    return NextResponse.json({ investor });

  } catch (error) {
    logger.error('Get investor error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
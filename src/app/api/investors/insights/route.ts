import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const insightSchema = z.object({
  investorId: z.string(),
  type: z.enum(['meeting_notes', 'feedback', 'tips', 'success_story']),
  content: z.string().min(10).max(2000),
  rating: z.number().min(1).max(5).optional()
});

// POST /api/investors/insights - Add investor insight
export async function POST(request: NextRequest) {
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
        { error: 'Access Denied' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validation = insightSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.error.errors
        },
        { status: 400 }
      );
    }

    const { investorId, type, content, rating } = validation.data;

    // Verify investor exists
    const { data: investor, error: investorError } = await supabase
      .from('Investor')
      .select('id')
      .eq('id', investorId)
      .single();

    if (investorError || !investor) {
      return NextResponse.json(
        { error: 'Investor not found' },
        { status: 404 }
      );
    }

    // Create insight
    const { data: insight, error: insertError } = await supabase
      .from('InvestorInsight')
      .insert({
        id: createId(),
        investorId,
        userId: user.id,
        type,
        content,
        rating,
        isVerified: false // Admin needs to verify
      })
      .select('*')
      .single();

    if (insertError) {
      logger.error('Error creating insight:', insertError);
      return NextResponse.json(
        { error: 'Failed to create insight' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      insight,
      message: 'Insight added successfully. It will be verified by our team before being published.'
    });

  } catch (error) {
    logger.error('Add insight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/investors/insights - Get user's insights
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data: insights, error } = await supabase
      .from('InvestorInsight')
      .select(`
        *,
        investor:Investor(
          name,
          firmName,
          type
        )
      `)
      .eq('userId', user.id)
      .order('createdAt', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch insights' },
        { status: 500 }
      );
    }

    return NextResponse.json({ insights });

  } catch (error) {
    logger.error('Get insights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
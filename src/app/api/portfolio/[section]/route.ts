import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const VALID_SECTIONS = [
  'idea-vision',
  'market-research', 
  'business-model',
  'brand-assets',
  'legal-compliance',
  'product',
  'go-to-market',
  'financials',
  'pitch'
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  try {
    const section = params.section;
    const updates = await request.json();

    // Validate section
    if (!VALID_SECTIONS.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
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

    // Map section to database fields
    const sectionFieldMap: Record<string, Record<string, any>> = {
      'idea-vision': {
        startup_name: updates.startupName,
        tagline: updates.tagline,
        problem_statement: updates.problemStatement,
        solution: updates.solution,
        value_proposition: updates.valueProposition,
      },
      'market-research': {
        target_market: updates.targetMarket,
        competitors: updates.competitors,
        market_size: updates.marketSize,
      },
      'business-model': {
        revenue_streams: updates.revenueStreams,
        pricing_strategy: updates.pricingStrategy,
      },
      'brand-assets': {
        startup_name: updates.startupName,
        logo: updates.logo,
        domain: updates.domain,
        social_handles: updates.socialHandles,
      },
      'legal-compliance': {
        entity_type: updates.entityType,
        compliance_status: updates.complianceStatus,
      },
      'product': {
        mvp_description: updates.mvpDescription,
        features: updates.features,
        user_feedback: updates.userFeedback,
      },
      'go-to-market': {
        sales_strategy: updates.salesStrategy,
        customer_personas: updates.customerPersonas,
      },
      'financials': {
        projections: updates.projections,
        funding_needs: updates.fundingNeeds,
      },
      'pitch': {
        pitch_deck: updates.pitchDeck,
        one_page_summary: updates.onePageSummary,
      },
    };

    const fieldsToUpdate = sectionFieldMap[section];
    if (!fieldsToUpdate) {
      return NextResponse.json(
        { error: 'Invalid section mapping' },
        { status: 400 }
      );
    }

    // Update portfolio
    const { data: portfolio, error: updateError } = await supabase
      .from('startup_portfolios')
      .update({
        ...fieldsToUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Portfolio section update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update portfolio section' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      section,
      portfolio,
    });

  } catch (error) {
    console.error('Portfolio section API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
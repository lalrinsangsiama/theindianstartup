import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
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
        startupName: updates.startupName,
        tagline: updates.tagline,
        problemStatement: updates.problemStatement,
        solution: updates.solution,
        valueProposition: updates.valueProposition,
      },
      'market-research': {
        targetMarket: updates.targetMarket,
        competitors: updates.competitors,
        marketSize: updates.marketSize,
      },
      'business-model': {
        revenueStreams: updates.revenueStreams,
        pricingStrategy: updates.pricingStrategy,
      },
      'brand-assets': {
        startupName: updates.startupName,
        logo: updates.logo,
        domain: updates.domain,
        socialHandles: updates.socialHandles,
      },
      'legal-compliance': {
        entityType: updates.entityType,
        complianceStatus: updates.complianceStatus,
      },
      'product': {
        mvpDescription: updates.mvpDescription,
        features: updates.features,
        userFeedback: updates.userFeedback,
      },
      'go-to-market': {
        salesStrategy: updates.salesStrategy,
        customerPersonas: updates.customerPersonas,
      },
      'financials': {
        projections: updates.projections,
        fundingNeeds: updates.fundingNeeds,
      },
      'pitch': {
        pitchDeck: updates.pitchDeck,
        onePageSummary: updates.onePageSummary,
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
      .from('StartupPortfolio')
      .update({
        ...fieldsToUpdate,
        updatedAt: new Date().toISOString(),
      })
      .eq('userId', user.id)
      .select()
      .single();

    if (updateError) {
      logger.error('Portfolio section update error:', updateError);
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
    logger.error('Portfolio section API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
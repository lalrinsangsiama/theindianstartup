import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface EligibilityRequest {
  sector: string;
  stage: string;
  location: string;
  teamSize: number;
  monthlyRevenue: number;
  fundingNeeded: number;
  hasMVP: boolean;
  preferredEquity: number;
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();

  try {
    const eligibilityData: EligibilityRequest = await request.json();

    // Validate required fields
    if (!eligibilityData.sector || !eligibilityData.stage || !eligibilityData.fundingNeeded) {
      return NextResponse.json(
        { error: 'Missing required fields: sector, stage, fundingNeeded' },
        { status: 400 }
      );
    }

    // Build query based on eligibility criteria
    let query = supabase
      .from('funding_resources')
      .select(`
        *,
        funding_categories(name, icon),
        incubator_schemes(*),
        government_schemes(*),
        investor_database(*)
      `)
      .eq('status', 'active');

    // Filter by sector
    query = query.contains('sectors', [eligibilityData.sector]);

    // Filter by stage
    query = query.contains('stage', [eligibilityData.stage]);

    // Filter by funding amount
    query = query
      .lte('min_funding', eligibilityData.fundingNeeded)
      .gte('max_funding', eligibilityData.fundingNeeded);

    // Location preference (if provided)
    if (eligibilityData.location) {
      query = query.or(`
        location_type.eq.india,
        location_type.eq.global,
        specific_location.ilike.%${eligibilityData.location}%
      `);
    }

    const { data: matchingFunding, error } = await query
      .order('success_rate', { ascending: false })
      .limit(50);

    if (error) {
      logger.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch matching funding options' },
        { status: 500 }
      );
    }

    // Score and rank the results
    const scoredResults = (matchingFunding || []).map(funding => {
      let score = 0;
      let reasons = [];

      // Base score from success rate
      score += (funding.success_rate || 0) * 0.3;

      // Sector match bonus
      if (funding.sectors?.includes(eligibilityData.sector)) {
        score += 20;
        reasons.push(`Perfect sector match: ${eligibilityData.sector}`);
      }

      // Stage match bonus  
      if (funding.stage?.includes(eligibilityData.stage)) {
        score += 15;
        reasons.push(`Stage alignment: ${eligibilityData.stage}`);
      }

      // Funding range score
      const fundingMid = (funding.min_funding + funding.max_funding) / 2;
      const fundingDiff = Math.abs(fundingMid - eligibilityData.fundingNeeded);
      const maxFunding = Math.max(funding.max_funding, eligibilityData.fundingNeeded);
      score += (1 - fundingDiff / maxFunding) * 10;

      // Revenue requirements
      if (funding.type === 'incubator' && eligibilityData.monthlyRevenue === 0) {
        score += 5;
        reasons.push('No revenue requirement');
      }

      // MVP requirement match
      if (funding.type === 'accelerator' && eligibilityData.hasMVP) {
        score += 5;
        reasons.push('MVP requirement satisfied');
      }

      // Equity preference
      if (funding.incubator_schemes?.[0]?.equity_taken) {
        const equityDiff = Math.abs(funding.incubator_schemes[0].equity_taken - eligibilityData.preferredEquity);
        score += (1 - equityDiff / 20) * 5; // Normalize equity diff
      }

      // Location bonus
      if (eligibilityData.location && funding.specific_location?.includes(eligibilityData.location)) {
        score += 8;
        reasons.push(`Located in ${eligibilityData.location}`);
      }

      // Premium programs bonus
      if (funding.is_premium) {
        score += 10;
        reasons.push('Premium program with higher success rate');
      }

      return {
        ...funding,
        eligibilityScore: Math.round(score),
        matchReasons: reasons,
        recommendation: score >= 70 ? 'Excellent Match' : 
                      score >= 50 ? 'Good Match' : 
                      score >= 30 ? 'Possible Match' : 'Limited Match'
      };
    });

    // Sort by eligibility score
    const sortedResults = scoredResults.sort((a, b) => b.eligibilityScore - a.eligibilityScore);

    // Generate personalized recommendations
    const topMatches = sortedResults.slice(0, 10);
    const recommendations = {
      immediate: topMatches.filter(r => r.eligibilityScore >= 70),
      consider: topMatches.filter(r => r.eligibilityScore >= 50 && r.eligibilityScore < 70),
      future: topMatches.filter(r => r.eligibilityScore < 50),
      summary: {
        totalMatches: sortedResults.length,
        excellentMatches: sortedResults.filter(r => r.eligibilityScore >= 70).length,
        averageSuccessRate: sortedResults.length > 0 ? 
          sortedResults.reduce((sum, r) => sum + (r.success_rate || 0), 0) / sortedResults.length : 0
      }
    };

    // Generate action plan
    const actionPlan = generateActionPlan(eligibilityData, topMatches);

    return NextResponse.json({
      success: true,
      eligibilityData,
      recommendations,
      actionPlan,
      allMatches: sortedResults
    });

  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateActionPlan(eligibility: EligibilityRequest, matches: any[]) {
  const plan = [];
  
  // Immediate actions
  if (matches.length === 0) {
    plan.push({
      priority: 'High',
      action: 'Expand your search criteria',
      description: 'Consider adjacent sectors or earlier/later stages',
      timeline: 'This week'
    });
  } else if (matches[0]?.eligibilityScore >= 70) {
    plan.push({
      priority: 'High',
      action: 'Apply to top 3 matches immediately',
      description: 'You have excellent matches - don\'t delay applications',
      timeline: 'Next 2 weeks'
    });
  }

  // Revenue building
  if (eligibility.monthlyRevenue === 0) {
    plan.push({
      priority: 'Medium',
      action: 'Focus on early revenue generation',
      description: 'Even small revenue greatly improves funding prospects',
      timeline: '1-3 months'
    });
  }

  // MVP development
  if (!eligibility.hasMVP) {
    plan.push({
      priority: 'High',
      action: 'Complete MVP development',
      description: 'Most accelerators require a working prototype',
      timeline: '1-2 months'
    });
  }

  // Network building
  plan.push({
    priority: 'Medium',
    action: 'Build relationships with alumni',
    description: 'Warm introductions significantly improve acceptance rates',
    timeline: 'Ongoing'
  });

  return plan;
}
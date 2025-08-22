import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/logger';

interface EligibilityResult {
  schemeId: string;
  schemeName: string;
  matchPercentage: number;
  eligibleAmount: {
    min: number;
    max: number;
  };
  recommendations: string[];
  missingRequirements: string[];
  nextSteps: string[];
  successProbability: number;
  category: string;
  processingTime: string;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P9 (Eligibility Assessment access)
    const supabase = createClient();
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', session.user.id)
      .or('productCode.eq.P9,productCode.eq.ALL_ACCESS')
      .eq('isActive', true)
      .gte('expiresAt', new Date().toISOString());

    const hasAccess = purchases && purchases.length > 0;
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied. Purchase P9 to access eligibility assessment.' }, { status: 403 });
    }

    const { answers } = await request.json();

    // Get all active government schemes
    const { data: schemes, error: schemesError } = await supabase
      .from('GovernmentScheme')
      .select('*')
      .eq('status', 'active');

    if (schemesError) {
      logger.error('Error fetching schemes for eligibility:', schemesError);
      return NextResponse.json({ error: 'Failed to fetch schemes' }, { status: 500 });
    }

    // Calculate eligibility for each scheme
    const eligibilityResults: EligibilityResult[] = schemes.map(scheme => {
      let matchScore = 0;
      let totalCriteria = 0;
      const missingRequirements: string[] = [];
      const recommendations: string[] = [];

      // Define eligibility mapping for each scheme
      const eligibilityMappings: Record<string, any> = {
        'sisfs-2024': {
          'dpiit-recognition': true,
          'company-stage': ['Idea stage (0-6 months)', 'MVP/Prototype stage (6-18 months)'],
          'annual-turnover': { max: 25 },
          'previous-funding': ['No previous funding', 'Government grant (₹1-10 lakhs)'],
          'incorporation-status': true
        },
        'msme-champions-2024': {
          'udyam-registration': true,
          'company-stage': ['Early revenue (18-36 months)', 'Growth stage (3+ years)'],
          'annual-turnover': { min: 5, max: 2500 },
          'gst-registration': true
        },
        'karnataka-idea2poc-2024': {
          'state-location': ['Karnataka'],
          'company-stage': ['MVP/Prototype stage (6-18 months)'],
          'sector': ['Information Technology', 'Healthcare & Biotechnology'],
          'innovation-type': ['Deep Technology/R&D', 'Digital Platform/Software']
        },
        'cgss-sidbi-2024': {
          'dpiit-recognition': true,
          'company-stage': ['Early revenue (18-36 months)', 'Growth stage (3+ years)'],
          'funding-purpose': ['Working Capital', 'Market Expansion', 'Infrastructure Setup'],
          'gst-registration': true
        },
        'aim-niti-aayog-2024': {
          'innovation-type': ['Deep Technology/R&D', 'Social Innovation'],
          'company-stage': ['Idea stage (0-6 months)', 'MVP/Prototype stage (6-18 months)'],
          'job-creation': ['11-25 jobs', '26-50 jobs', '51-100 jobs', '100+ jobs']
        }
      };

      const schemeEligibility = eligibilityMappings[scheme.schemeId] || {};

      // Calculate match score based on eligibility criteria
      Object.entries(schemeEligibility).forEach(([criterion, requirement]) => {
        totalCriteria++;
        const userAnswer = answers[criterion];

        if (typeof requirement === 'boolean') {
          if (userAnswer === requirement) {
            matchScore++;
          } else if (requirement && !userAnswer) {
            missingRequirements.push(`${criterion.replace('-', ' ')} required`);
          }
        } else if (Array.isArray(requirement)) {
          if (requirement.includes(userAnswer)) {
            matchScore++;
          } else if (userAnswer) {
            missingRequirements.push(`Current ${criterion.replace('-', ' ')}: ${userAnswer} not eligible`);
          }
        } else if (typeof requirement === 'object' && requirement !== null) {
          const numericAnswer = parseFloat(userAnswer) || 0;
          let meets = true;
          
          if ('min' in requirement && numericAnswer < requirement.min) {
            meets = false;
            missingRequirements.push(`Minimum ${criterion.replace('-', ' ')} of ₹${requirement.min} lakhs required`);
          }
          if ('max' in requirement && numericAnswer > requirement.max) {
            meets = false;
            missingRequirements.push(`Maximum ${criterion.replace('-', ' ')} of ₹${requirement.max} lakhs allowed`);
          }
          
          if (meets) matchScore++;
        }
      });

      const matchPercentage = totalCriteria > 0 ? Math.round((matchScore / totalCriteria) * 100) : 0;

      // Generate recommendations based on gaps
      if (matchPercentage < 100) {
        if (!answers['dpiit-recognition'] && scheme.schemeId === 'sisfs-2024') {
          recommendations.push('Apply for DPIIT Startup India recognition first');
        }
        if (!answers['udyam-registration'] && scheme.schemeId === 'msme-champions-2024') {
          recommendations.push('Complete Udyam (MSME) registration');
        }
        if (missingRequirements.length > 0) {
          recommendations.push('Address missing requirements to improve eligibility');
        }
      }

      // Adjust funding amount based on user needs
      const userFundingNeed = answers['funding-needed'];
      let adjustedMin = scheme.fundingMin / 100000; // Convert to lakhs
      let adjustedMax = scheme.fundingMax / 100000; // Convert to lakhs

      if (userFundingNeed) {
        if (userFundingNeed.includes('₹5-25')) {
          adjustedMax = Math.min(adjustedMax, 25);
        } else if (userFundingNeed.includes('₹25-50')) {
          adjustedMin = Math.max(adjustedMin, 25);
          adjustedMax = Math.min(adjustedMax, 50);
        }
      }

      // Calculate success probability
      let successProbability = scheme.successRate || 20;
      if (matchPercentage >= 90) successProbability += 10;
      if (matchPercentage >= 80) successProbability += 5;
      if (answers['export-potential']) successProbability += 5;
      if (answers['rural-focus']) successProbability += 5;
      if (answers['women-employment']) successProbability += 3;

      successProbability = Math.min(successProbability, 85); // Cap at 85%

      const nextSteps: string[] = [];
      if (matchPercentage >= 70) {
        nextSteps.push('Prepare detailed business plan');
        nextSteps.push('Gather required documentation');
        nextSteps.push('Submit application before deadline');
      } else {
        nextSteps.push('Improve eligibility criteria first');
        nextSteps.push('Consider applying to better-matched schemes');
      }

      return {
        schemeId: scheme.id,
        schemeName: scheme.name,
        matchPercentage,
        eligibleAmount: {
          min: Math.round(adjustedMin),
          max: Math.round(adjustedMax)
        },
        recommendations,
        missingRequirements,
        nextSteps,
        successProbability: Math.round(successProbability),
        category: scheme.category,
        processingTime: scheme.processingTime || 'Not specified'
      };
    });

    // Sort by match percentage and success probability
    const sortedResults = eligibilityResults.sort((a, b) => {
      if (a.matchPercentage !== b.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return b.successProbability - a.successProbability;
    });

    // Save assessment to database
    const { data: assessment, error: saveError } = await supabase
      .from('EligibilityAssessment')
      .insert({
        userId: session.user.id,
        answers,
        results: sortedResults,
        totalSchemes: sortedResults.length,
        highMatchCount: sortedResults.filter(r => r.matchPercentage >= 80).length,
        maxFundingAmount: Math.max(...sortedResults.map(r => r.eligibleAmount.max)) * 100000,
        bestSuccessRate: Math.max(...sortedResults.map(r => r.successProbability))
      })
      .select()
      .single();

    if (saveError) {
      logger.warn('Error saving assessment (continuing):', saveError);
    }

    return NextResponse.json({
      results: sortedResults,
      summary: {
        totalSchemes: sortedResults.length,
        highMatchCount: sortedResults.filter(r => r.matchPercentage >= 80).length,
        mediumMatchCount: sortedResults.filter(r => r.matchPercentage >= 60 && r.matchPercentage < 80).length,
        maxFundingAmount: Math.max(...sortedResults.map(r => r.eligibleAmount.max)),
        bestSuccessRate: Math.max(...sortedResults.map(r => r.successProbability)),
        assessmentId: assessment?.id
      }
    });

  } catch (error) {
    logger.error('Error in eligibility assessment API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get user's assessment history
    const { data: assessments, error } = await supabase
      .from('EligibilityAssessment')
      .select('*')
      .eq('userId', session.user.id)
      .order('completedAt', { ascending: false })
      .limit(limit);

    if (error) {
      logger.error('Error fetching assessment history:', error);
      return NextResponse.json({ error: 'Failed to fetch assessments' }, { status: 500 });
    }

    return NextResponse.json({ assessments });

  } catch (error) {
    logger.error('Error in eligibility assessment GET API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
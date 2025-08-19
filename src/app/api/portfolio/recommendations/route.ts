import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface Recommendation {
  type: 'course_purchase' | 'activity_completion' | 'section_focus';
  title: string;
  description: string;
  productCode?: string;
  activityTypeId?: string;
  sectionName?: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  ctaText: string;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's portfolio and activities
    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('id')
      .eq('userId', user.id)
      .single();

    if (!portfolio) {
      // New user - recommend P1 as starting point
      return NextResponse.json({
        recommendations: [{
          type: 'course_purchase',
          title: 'Start Your Journey with P1',
          description: 'Begin your startup education with our foundational 30-Day India Launch Sprint',
          productCode: 'P1',
          priority: 'high',
          impact: 'Launch your startup in 30 days',
          ctaText: 'Start P1 Course'
        }]
      });
    }

    // Get user's completed activities
    const { data: activities } = await supabase
      .from('PortfolioActivity')
      .select(`
        *,
        activityType:ActivityType(*)
      `)
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('isLatest', true);

    // Get portfolio sections
    const { data: sections } = await supabase
      .from('PortfolioSection')
      .select('*')
      .eq('isActive', true)
      .order('order');

    // Get user's owned products
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString()) as {
        data: Array<{
          product: { code: string; }
        }> | null;
      };

    const ownedProducts = purchases?.map(p => p.product.code) || [];
    const completedActivities = activities?.filter(a => a.status === 'completed') || [];
    const draftActivities = activities?.filter(a => a.status === 'draft') || [];

    const recommendations: Recommendation[] = [];

    // 1. Prioritize completing draft activities
    if (draftActivities.length > 0) {
      const topDraftActivity = draftActivities[0];
      recommendations.push({
        type: 'activity_completion',
        title: `Complete "${topDraftActivity.activityType?.name}"`,
        description: 'You have a draft activity that can be completed to improve your portfolio',
        activityTypeId: topDraftActivity.activityTypeId,
        priority: 'high',
        impact: 'Increase portfolio completion',
        ctaText: 'Complete Activity'
      });
    }

    // 2. Recommend courses based on missing sections
    if (sections) {
      // Calculate section completion
      const incompleteSections = sections.filter(section => {
        const requiredActivities = section.requiredActivities || [];
        const completedRequiredActivities = requiredActivities.filter((reqId: string) =>
          completedActivities.some(activity => 
            activity.activityType?.id === reqId
          )
        );
        return completedRequiredActivities.length < requiredActivities.length;
      });

      // Course recommendations based on incomplete sections
      const courseRecommendations: { [key: string]: string[] } = {
        'P2': ['legal_compliance'],
        'P3': ['financial_projections'],
        'P4': ['financial_projections', 'business_model'],
        'P5': ['legal_compliance'],
        'P6': ['go_to_market'],
        'P7': ['legal_compliance'],
        'P10': ['legal_compliance'],
        'P11': ['brand_identity', 'go_to_market']
      };

      // Find best course recommendations
      for (const [productCode, relevantSections] of Object.entries(courseRecommendations)) {
        if (!ownedProducts.includes(productCode)) {
          const hasIncompleteRelevantSections = incompleteSections.some(section =>
            relevantSections.includes(section.name)
          );

          if (hasIncompleteRelevantSections) {
            const productTitles: { [key: string]: string } = {
              'P2': 'Incorporation & Compliance Kit',
              'P3': 'Funding Mastery',
              'P4': 'Finance Stack - CFO Level',
              'P5': 'Legal Stack - Bulletproof Framework',
              'P6': 'Sales & GTM Master Course',
              'P7': 'State-wise Scheme Map',
              'P10': 'Patent Mastery',
              'P11': 'Branding & PR Mastery'
            };

            recommendations.push({
              type: 'course_purchase',
              title: `Unlock ${productTitles[productCode]}`,
              description: `Complete your ${relevantSections.join(' and ')} sections with expert guidance`,
              productCode,
              priority: 'medium',
              impact: `Complete ${relevantSections.length} portfolio section${relevantSections.length > 1 ? 's' : ''}`,
              ctaText: 'View Course'
            });
          }
        }
      }
    }

    // 3. Recommend next logical activities within owned courses
    if (ownedProducts.length > 0) {
      // Get activity types that user hasn't completed yet
      const { data: allActivityTypes } = await supabase
        .from('ActivityType')
        .select('*')
        .eq('isActive', true);

      const completedActivityTypeIds = completedActivities.map(a => a.activityType?.id);
      const incompleteActivityTypes = allActivityTypes?.filter(at => 
        !completedActivityTypeIds.includes(at.id)
      ) || [];

      // Recommend high-impact incomplete activities
      if (incompleteActivityTypes.length > 0) {
        const priorityActivities = incompleteActivityTypes.slice(0, 2);
        
        priorityActivities.forEach(activity => {
          recommendations.push({
            type: 'activity_completion',
            title: `Add ${activity.name}`,
            description: `Strengthen your ${activity.portfolioSection.replace('_', ' ')} section`,
            activityTypeId: activity.id,
            priority: 'medium',
            impact: 'Enhance portfolio depth',
            ctaText: 'Complete Activity'
          });
        });
      }
    }

    // 4. Bundle recommendation if user has 3+ individual products
    if (ownedProducts.length >= 3 && !ownedProducts.includes('ALL_ACCESS')) {
      recommendations.push({
        type: 'course_purchase',
        title: 'Upgrade to All-Access Bundle',
        description: 'Save ₹15,987 and get access to all courses with one purchase',
        productCode: 'ALL_ACCESS',
        priority: 'low',
        impact: 'Access all remaining courses',
        ctaText: 'Upgrade to Bundle'
      });
    }

    // Sort recommendations by priority
    const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
    recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    // Limit to top 5 recommendations
    const topRecommendations = recommendations.slice(0, 5);

    return NextResponse.json({
      recommendations: topRecommendations,
      stats: {
        totalRecommendations: topRecommendations.length,
        highPriority: topRecommendations.filter(r => r.priority === 'high').length,
        courseRecommendations: topRecommendations.filter(r => r.type === 'course_purchase').length,
        activityRecommendations: topRecommendations.filter(r => r.type === 'activity_completion').length
      }
    });

  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
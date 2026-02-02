import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check P11 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P11', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const hasP11Access = !purchaseError && purchases && purchases.length > 0;

    // Get P11-related activity types
    const { data: activityTypes, error: activityError } = await supabase
      .from('ActivityType')
      .select('*')
      .in('category', ['Brand Development', 'PR & Marketing', 'Content Marketing'])
      .eq('isActive', true);

    if (activityError) {
      throw new Error('Error fetching P11 activity types');
    }

    // Get user's portfolio activities for P11
    const { data: userActivities, error: userActError } = await supabase
      .from('PortfolioActivity')
      .select('*')
      .eq('userId', user.id)
      .in('activityTypeId', activityTypes.map(at => at.id));

    if (userActError) {
      console.error('Error fetching user activities:', userActError);
    }

    // Process activity types with user progress
    const activitiesWithProgress = activityTypes.map(activityType => {
      const userActivity = userActivities?.find(ua => ua.activityTypeId === activityType.id);
      
      return {
        id: activityType.id,
        name: activityType.name,
        category: activityType.category,
        portfolioSection: activityType.portfolioSection,
        portfolioField: activityType.portfolioField,
        description: getActivityDescription(activityType.name),
        schema: activityType.dataSchema,
        completed: !!userActivity,
        completedAt: userActivity?.updatedAt,
        data: userActivity?.data,
        relatedTools: getRelatedTools(activityType.name),
        estimatedTime: getEstimatedTime(activityType.name),
        xpReward: getXPReward(activityType.name),
        requiredForCertification: isRequiredForCertification(activityType.name)
      };
    });

    // Calculate portfolio completion for P11 activities
    const completedActivities = activitiesWithProgress.filter(a => a.completed).length;
    const totalActivities = activitiesWithProgress.length;
    const completionPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    // Get portfolio sections affected by P11 activities
    const portfolioSections = [...new Set(activitiesWithProgress.map(a => a.portfolioSection))];
    const sectionProgress: Record<string, { total: number; completed: number; percentage: number }> = {};
    
    for (const section of portfolioSections) {
      const sectionActivities = activitiesWithProgress.filter(a => a.portfolioSection === section);
      const sectionCompleted = sectionActivities.filter(a => a.completed).length;
      sectionProgress[section] = {
        total: sectionActivities.length,
        completed: sectionCompleted,
        percentage: sectionActivities.length > 0 ? Math.round((sectionCompleted / sectionActivities.length) * 100) : 0
      };
    }

    return NextResponse.json({
      success: true,
      hasP11Access,
      activities: activitiesWithProgress,
      progress: {
        completed: completedActivities,
        total: totalActivities,
        percentage: completionPercentage
      },
      portfolioSections: {
        affected: portfolioSections,
        progress: sectionProgress
      },
      recommendations: getActivityRecommendations(activitiesWithProgress),
      certification: {
        eligible: completionPercentage >= 80,
        requiredActivities: activitiesWithProgress.filter(a => a.requiredForCertification && !a.completed).length,
        progressToEligibility: Math.max(0, 80 - completionPercentage)
      }
    });

  } catch (error) {
    console.error('Error fetching P11 portfolio activities:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { activityTypeId, data, courseContext } = await request.json();

    if (!activityTypeId || !data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify P11 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P11', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'P11 access required' }, { status: 403 });
    }

    // Get activity type details
    const { data: activityType, error: activityError } = await supabase
      .from('ActivityType')
      .select('*')
      .eq('id', activityTypeId)
      .single();

    if (activityError) {
      return NextResponse.json({ error: 'Activity type not found' }, { status: 404 });
    }

    // Create or update portfolio activity
    const { data: portfolioActivity, error: portfolioError } = await supabase
      .from('PortfolioActivity')
      .upsert({
        userId: user.id,
        activityTypeId: activityTypeId,
        data: {
          ...data,
          courseContext: courseContext || 'P11',
          completedAt: new Date().toISOString(),
          source: 'P11_branding_pr_course'
        }
      }, {
        onConflict: 'userId,activityTypeId'
      })
      .select()
      .single();

    if (portfolioError) {
      throw new Error('Error saving portfolio activity');
    }

    // Award XP for activity completion
    const xpReward = getXPReward(activityType.name);
    if (xpReward > 0) {
      await supabase
        .from('XPEvent')
        .insert({
          userId: user.id,
          amount: xpReward,
          source: 'portfolio_activity',
          description: `Completed ${activityType.name} activity`,
          metadata: {
            activityTypeId: activityTypeId,
            activityName: activityType.name,
            courseCode: 'P11'
          }
        });
    }

    return NextResponse.json({
      success: true,
      activity: portfolioActivity,
      xpAwarded: xpReward,
      message: `Successfully saved ${activityType.name} to your portfolio`
    });

  } catch (error) {
    console.error('Error saving P11 portfolio activity:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper functions
function getActivityDescription(activityName: string): string {
  const descriptions: Record<string, string> = {
    'brand_identity_development': 'Create comprehensive brand identity including logo, colors, typography, and brand guidelines using professional tools.',
    'pr_media_coverage': 'Execute PR campaigns and track media coverage, building relationships with journalists and measuring impact.',
    'thought_leadership_content': 'Develop thought leadership content strategy and build personal/company brand through strategic content creation.',
    'brand_strategy_development': 'Develop comprehensive brand strategy using data-driven analysis and positioning frameworks.',
    'pr_campaign_execution': 'Plan and execute professional PR campaigns with media outreach and performance tracking.',
    'brand_asset_creation': 'Create professional brand assets including visual identity, templates, and marketing materials.'
  };
  return descriptions[activityName] || 'Complete this branding and PR activity to enhance your portfolio.';
}

function getRelatedTools(activityName: string): string[] {
  const toolMapping: Record<string, string[]> = {
    'brand_identity_development': ['Brand Strategy Calculator', 'Brand Asset Generator'],
    'pr_media_coverage': ['PR Campaign Manager', 'Media Relationship Manager'],
    'thought_leadership_content': ['PR Campaign Manager', 'Media Relationship Manager'],
    'brand_strategy_development': ['Brand Strategy Calculator'],
    'pr_campaign_execution': ['PR Campaign Manager', 'Media Relationship Manager'],
    'brand_asset_creation': ['Brand Asset Generator', 'Brand Strategy Calculator']
  };
  return toolMapping[activityName] || [];
}

function getEstimatedTime(activityName: string): number {
  const timeMapping: Record<string, number> = {
    'brand_identity_development': 120,
    'pr_media_coverage': 90,
    'thought_leadership_content': 75,
    'brand_strategy_development': 60,
    'pr_campaign_execution': 105,
    'brand_asset_creation': 90
  };
  return timeMapping[activityName] || 60;
}

function getXPReward(activityName: string): number {
  const xpMapping: Record<string, number> = {
    'brand_identity_development': 200,
    'pr_media_coverage': 250,
    'thought_leadership_content': 180,
    'brand_strategy_development': 150,
    'pr_campaign_execution': 220,
    'brand_asset_creation': 180
  };
  return xpMapping[activityName] || 100;
}

function isRequiredForCertification(activityName: string): boolean {
  const required = [
    'brand_identity_development',
    'pr_media_coverage', 
    'brand_strategy_development'
  ];
  return required.includes(activityName);
}

function getActivityRecommendations(activities: any[]): any[] {
  const recommendations = [];
  
  const brandActivities = activities.filter(a => a.category === 'Brand Development');
  const prActivities = activities.filter(a => a.category === 'PR & Marketing');
  const contentActivities = activities.filter(a => a.category === 'Content Marketing');
  
  if (brandActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'start_brand_foundation',
      priority: 'high',
      title: 'Start with Brand Foundation',
      description: 'Complete brand strategy development to establish a strong foundation for all marketing efforts.',
      suggestedActivity: 'brand_strategy_development'
    });
  }
  
  if (brandActivities.some(a => a.completed) && prActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'begin_pr_activities',
      priority: 'medium',
      title: 'Launch PR Activities',
      description: 'With your brand foundation set, start building media relationships and executing PR campaigns.',
      suggestedActivity: 'pr_campaign_execution'
    });
  }
  
  if (activities.filter(a => a.completed).length >= 2 && contentActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'develop_thought_leadership',
      priority: 'medium',
      title: 'Build Thought Leadership',
      description: 'Establish yourself as an industry expert through strategic content creation and speaking opportunities.',
      suggestedActivity: 'thought_leadership_content'
    });
  }
  
  return recommendations;
}
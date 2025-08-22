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

    // Check P6 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P6', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const hasP6Access = !purchaseError && purchases && purchases.length > 0;

    // Get P6-related activity types
    const { data: activityTypes, error: activityError } = await supabase
      .from('ActivityType')
      .select('*')
      .in('category', ['Sales Strategy', 'Customer Acquisition', 'Revenue Operations', 'Team Management', 'Market Analysis', 'Customer Success'])
      .eq('isActive', true);

    if (activityError) {
      throw new Error('Error fetching P6 activity types');
    }

    // Get user's portfolio activities for P6
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

    // Calculate portfolio completion for P6 activities
    const completedActivities = activitiesWithProgress.filter(a => a.completed).length;
    const totalActivities = activitiesWithProgress.length;
    const completionPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    // Get portfolio sections affected by P6 activities
    const portfolioSections = [...new Set(activitiesWithProgress.map(a => a.portfolioSection))];
    const sectionProgress = {};
    
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
      hasP6Access,
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
    console.error('Error fetching P6 portfolio activities:', error);
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

    // Verify P6 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P6', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'P6 access required' }, { status: 403 });
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
          courseContext: courseContext || 'P6',
          completedAt: new Date().toISOString(),
          source: 'P6_sales_gtm_course'
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
            courseCode: 'P6'
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
    console.error('Error saving P6 portfolio activity:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper functions
function getActivityDescription(activityName: string): string {
  const descriptions = {
    'sales_strategy_development': 'Develop comprehensive sales strategy including target markets, sales channels, pricing, and performance targets.',
    'customer_acquisition_execution': 'Execute customer acquisition campaigns across multiple channels with conversion tracking and optimization.',
    'revenue_operations_setup': 'Establish revenue operations framework with forecasting, billing systems, and retention strategies.',
    'sales_team_management': 'Build and manage high-performing sales teams with proper structure, compensation, and performance systems.',
    'competitive_analysis_execution': 'Conduct thorough competitive analysis with positioning strategy and differentiation planning.',
    'customer_success_implementation': 'Implement customer success programs with onboarding, support systems, and retention strategies.'
  };
  return descriptions[activityName] || 'Complete this sales and GTM activity to enhance your portfolio.';
}

function getRelatedTools(activityName: string): string[] {
  const toolMapping = {
    'sales_strategy_development': ['Sales Readiness Assessment', 'Pricing Calculator'],
    'customer_acquisition_execution': ['Lead Generation Machine', 'Pipeline Manager'],
    'revenue_operations_setup': ['Analytics Suite', 'Customer Success Dashboard'],
    'sales_team_management': ['Pipeline Manager', 'Analytics Suite'],
    'competitive_analysis_execution': ['Pricing Calculator', 'Analytics Suite'],
    'customer_success_implementation': ['Customer Success Dashboard', 'Analytics Suite']
  };
  return toolMapping[activityName] || [];
}

function getEstimatedTime(activityName: string): number {
  const timeMapping = {
    'sales_strategy_development': 180,
    'customer_acquisition_execution': 150,
    'revenue_operations_setup': 120,
    'sales_team_management': 135,
    'competitive_analysis_execution': 90,
    'customer_success_implementation': 105
  };
  return timeMapping[activityName] || 90;
}

function getXPReward(activityName: string): number {
  const xpMapping = {
    'sales_strategy_development': 300,
    'customer_acquisition_execution': 250,
    'revenue_operations_setup': 200,
    'sales_team_management': 220,
    'competitive_analysis_execution': 180,
    'customer_success_implementation': 200
  };
  return xpMapping[activityName] || 150;
}

function isRequiredForCertification(activityName: string): boolean {
  const required = [
    'sales_strategy_development',
    'customer_acquisition_execution', 
    'revenue_operations_setup'
  ];
  return required.includes(activityName);
}

function getActivityRecommendations(activities: any[]): any[] {
  const recommendations = [];
  
  const strategyActivities = activities.filter(a => a.category === 'Sales Strategy');
  const acquisitionActivities = activities.filter(a => a.category === 'Customer Acquisition');
  const revenueActivities = activities.filter(a => a.category === 'Revenue Operations');
  
  if (strategyActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'start_sales_strategy',
      priority: 'high',
      title: 'Start with Sales Strategy Foundation',
      description: 'Develop your comprehensive sales strategy to establish the foundation for all sales activities.',
      suggestedActivity: 'sales_strategy_development'
    });
  }
  
  if (strategyActivities.some(a => a.completed) && acquisitionActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'implement_acquisition',
      priority: 'medium',
      title: 'Implement Customer Acquisition',
      description: 'With your sales strategy defined, start executing customer acquisition campaigns.',
      suggestedActivity: 'customer_acquisition_execution'
    });
  }
  
  if (acquisitionActivities.some(a => a.completed) && revenueActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'setup_revenue_ops',
      priority: 'medium',
      title: 'Setup Revenue Operations',
      description: 'Scale your revenue operations with proper forecasting and billing systems.',
      suggestedActivity: 'revenue_operations_setup'
    });
  }
  
  return recommendations;
}
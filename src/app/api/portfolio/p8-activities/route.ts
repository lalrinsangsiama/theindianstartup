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

    // Check P8 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P8', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const hasP8Access = !purchaseError && purchases && purchases.length > 0;

    // Get P8-related activity types
    const { data: activityTypes, error: activityError } = await supabase
      .from('ActivityType')
      .select('*')
      .in('category', ['Data Room Management', 'Financial Documentation', 'Due Diligence', 'Investor Relations', 'Strategic Planning'])
      .eq('isActive', true);

    if (activityError) {
      throw new Error('Error fetching P8 activity types');
    }

    // Get user's portfolio activities for P8
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

    // Calculate portfolio completion for P8 activities
    const completedActivities = activitiesWithProgress.filter(a => a.completed).length;
    const totalActivities = activitiesWithProgress.length;
    const completionPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

    // Get portfolio sections affected by P8 activities
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
      hasP8Access,
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
      },
      investorReadiness: {
        dataRoomScore: calculateDataRoomScore(activitiesWithProgress),
        fundingReadiness: calculateFundingReadiness(activitiesWithProgress),
        nextSteps: getNextSteps(activitiesWithProgress)
      }
    });

  } catch (error) {
    console.error('Error fetching P8 portfolio activities:', error);
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

    // Verify P8 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P8', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'P8 access required' }, { status: 403 });
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
          courseContext: courseContext || 'P8',
          completedAt: new Date().toISOString(),
          source: 'P8_dataroom_mastery_course'
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
            courseCode: 'P8'
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
    console.error('Error saving P8 portfolio activity:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper functions
function getActivityDescription(activityName: string): string {
  const descriptions = {
    'data_room_architecture': 'Design and implement professional data room structure with investor-grade organization, security controls, and document categorization.',
    'financial_model_development': 'Build comprehensive financial models with projections, scenario analysis, and investor-ready documentation.',
    'due_diligence_preparation': 'Prepare for investor due diligence with document audits, Q&A preparation, and red flag remediation.',
    'investor_relations_setup': 'Establish investor relations framework with database management, pitch materials, and communication strategies.',
    'cap_table_management': 'Implement professional cap table management with equity tracking, vesting schedules, and dilution modeling.',
    'exit_strategy_planning': 'Develop comprehensive exit strategy with valuation planning, buyer identification, and IPO readiness assessment.'
  };
  return descriptions[activityName] || 'Complete this data room and investor relations activity to enhance your portfolio.';
}

function getRelatedTools(activityName: string): string[] {
  const toolMapping = {
    'data_room_architecture': ['Data Room Architecture Tool', 'Analytics Suite'],
    'financial_model_development': ['Financial Model Builder', 'Cap Table Manager'],
    'due_diligence_preparation': ['Due Diligence Q&A Generator', 'Analytics Suite'],
    'investor_relations_setup': ['Team Analytics', 'Customer Analytics'],
    'cap_table_management': ['Cap Table Manager', 'Financial Model Builder'],
    'exit_strategy_planning': ['Financial Model Builder', 'Analytics Suite']
  };
  return toolMapping[activityName] || [];
}

function getEstimatedTime(activityName: string): number {
  const timeMapping = {
    'data_room_architecture': 240,
    'financial_model_development': 300,
    'due_diligence_preparation': 180,
    'investor_relations_setup': 150,
    'cap_table_management': 120,
    'exit_strategy_planning': 200
  };
  return timeMapping[activityName] || 120;
}

function getXPReward(activityName: string): number {
  const xpMapping = {
    'data_room_architecture': 400,
    'financial_model_development': 500,
    'due_diligence_preparation': 350,
    'investor_relations_setup': 300,
    'cap_table_management': 250,
    'exit_strategy_planning': 450
  };
  return xpMapping[activityName] || 200;
}

function isRequiredForCertification(activityName: string): boolean {
  const required = [
    'data_room_architecture',
    'financial_model_development', 
    'due_diligence_preparation'
  ];
  return required.includes(activityName);
}

function getActivityRecommendations(activities: any[]): any[] {
  const recommendations = [];
  
  const dataRoomActivities = activities.filter(a => a.category === 'Data Room Management');
  const financialActivities = activities.filter(a => a.category === 'Financial Documentation');
  const ddActivities = activities.filter(a => a.category === 'Due Diligence');
  
  if (dataRoomActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'start_data_room',
      priority: 'high',
      title: 'Start with Data Room Architecture',
      description: 'Build your data room foundation first to organize all investor-facing documents.',
      suggestedActivity: 'data_room_architecture'
    });
  }
  
  if (dataRoomActivities.some(a => a.completed) && financialActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'develop_financial_models',
      priority: 'high',
      title: 'Develop Financial Models',
      description: 'Create comprehensive financial projections and cap table management systems.',
      suggestedActivity: 'financial_model_development'
    });
  }
  
  if (financialActivities.some(a => a.completed) && ddActivities.every(a => !a.completed)) {
    recommendations.push({
      type: 'prepare_due_diligence',
      priority: 'medium',
      title: 'Prepare for Due Diligence',
      description: 'Get ready for investor due diligence with comprehensive Q&A preparation.',
      suggestedActivity: 'due_diligence_preparation'
    });
  }
  
  return recommendations;
}

function calculateDataRoomScore(activities: any[]): number {
  const dataRoomActivity = activities.find(a => a.name === 'data_room_architecture');
  const financialActivity = activities.find(a => a.name === 'financial_model_development');
  const ddActivity = activities.find(a => a.name === 'due_diligence_preparation');
  
  let score = 0;
  if (dataRoomActivity?.completed) score += 40;
  if (financialActivity?.completed) score += 35;
  if (ddActivity?.completed) score += 25;
  
  return score;
}

function calculateFundingReadiness(activities: any[]): number {
  const completedActivities = activities.filter(a => a.completed).length;
  const totalActivities = activities.length;
  
  return Math.round((completedActivities / totalActivities) * 100);
}

function getNextSteps(activities: any[]): string[] {
  const steps = [];
  const dataRoomComplete = activities.find(a => a.name === 'data_room_architecture')?.completed;
  const financialComplete = activities.find(a => a.name === 'financial_model_development')?.completed;
  const ddComplete = activities.find(a => a.name === 'due_diligence_preparation')?.completed;
  
  if (!dataRoomComplete) {
    steps.push('Set up professional data room architecture');
  }
  if (!financialComplete) {
    steps.push('Build comprehensive financial models and projections');
  }
  if (!ddComplete) {
    steps.push('Prepare for investor due diligence process');
  }
  
  if (dataRoomComplete && financialComplete && ddComplete) {
    steps.push('Begin investor outreach and fundraising activities');
    steps.push('Schedule investor meetings and pitches');
  }
  
  return steps;
}
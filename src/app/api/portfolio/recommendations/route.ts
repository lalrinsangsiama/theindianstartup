import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Get user's purchases to determine accessible courses
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('productCode, status, expiresAt')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const accessibleCourses = new Set(purchases?.map(p => p.productCode) || []);
    const hasAllAccess = accessibleCourses.has('ALL_ACCESS');

    // Get user's portfolio activities
    const { data: activities, error: activitiesError } = await supabase
      .from('PortfolioActivity')
      .select(`
        id,
        activityTypeId,
        isCompleted,
        completedAt,
        activityType:ActivityType(
          id,
          name,
          category,
          portfolioSection
        )
      `)
      .eq('userId', user.id);

    // Create smart recommendations based on user progress
    const recommendations = [];

    // Check course progression recommendations
    const courseActivities = activities?.reduce((acc, activity: any) => {
      const courseCode = activity.activityType?.id?.substring(0, 2)?.toUpperCase();
      if (!acc[courseCode]) acc[courseCode] = { total: 0, completed: 0 };
      acc[courseCode].total++;
      if (activity.isCompleted) acc[courseCode].completed++;
      return acc;
    }, {} as Record<string, { total: number; completed: number }>);

    // P1 -> P2 progression
    const p1Progress = (courseActivities?.P1?.completed ?? 0) / (courseActivities?.P1?.total || 1);
    const p2Progress = (courseActivities?.P2?.completed ?? 0) / (courseActivities?.P2?.total || 1);
    if (p1Progress >= 0.7 && p2Progress < 0.3 && (hasAllAccess || accessibleCourses.has('P2'))) {
      recommendations.push({
        type: 'next_course',
        title: 'Start Incorporation & Compliance',
        description: 'Build on your foundation with legal entity setup and compliance systems',
        actionText: 'Begin P2 Course',
        actionUrl: '/products/P2',
        priority: 'high',
        estimatedTime: '2-3 weeks',
        xpReward: 250,
        reason: 'You\'ve made great progress on P1. Time to legally establish your startup.',
        relatedCourses: ['P2']
      });
    }

    // Default recommendation
    if (recommendations.length === 0) {
      recommendations.push({
        type: 'enhance_portfolio',
        title: 'Continue Building Your Portfolio',
        description: 'Keep working on activities to unlock personalized guidance',
        actionText: 'View Portfolio',
        actionUrl: '/portfolio',
        priority: 'medium',
        estimatedTime: '1-2 weeks',
        xpReward: 50,
        reason: 'Regular portfolio updates help us provide better recommendations.',
        relatedCourses: ['Multiple']
      });
    }

    return NextResponse.json({
      recommendations: recommendations.slice(0, 6),
      analysisDate: new Date().toISOString(),
      totalRecommendations: recommendations.length
    });

  } catch (error) {
    logger.error('Portfolio recommendations API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

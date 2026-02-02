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

    if (purchaseError) {
      logger.error('Error fetching purchases:', purchaseError);
      return NextResponse.json({
        error: 'Failed to fetch purchases'
      }, { status: 500 });
    }

    const accessibleCourses = new Set(purchases?.map(p => p.productCode) || []);
    const hasAllAccess = accessibleCourses.has('ALL_ACCESS');

    // Define all courses
    const allCourses = [
      { code: 'P1', name: '30-Day India Launch Sprint', totalActivities: 8 },
      { code: 'P2', name: 'Incorporation & Compliance Kit', totalActivities: 6 },
      { code: 'P3', name: 'Funding in India - Complete Mastery', totalActivities: 4 },
      { code: 'P4', name: 'Finance Stack - CFO-Level Mastery', totalActivities: 3 },
      { code: 'P5', name: 'Legal Stack - Bulletproof Framework', totalActivities: 3 },
      { code: 'P6', name: 'Sales & GTM in India - Master Course', totalActivities: 3 },
      { code: 'P7', name: 'State-wise Scheme Map', totalActivities: 20 },
      { code: 'P8', name: 'Investor-Ready Data Room Mastery', totalActivities: 2 },
      { code: 'P9', name: 'Government Schemes & Funding Mastery', totalActivities: 1 },
      { code: 'P10', name: 'Patent Mastery for Indian Startups', totalActivities: 1 },
      { code: 'P11', name: 'Branding & Public Relations Mastery', totalActivities: 2 },
      { code: 'P12', name: 'Marketing Mastery - Complete Growth Engine', totalActivities: 2 }
    ];

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

    if (activitiesError) {
      logger.error('Error fetching activities:', activitiesError);
      return NextResponse.json({
        error: 'Failed to fetch activities'
      }, { status: 500 });
    }

    // Calculate course progress
    const courseProgress = allCourses.map(course => {
      const courseActivities = activities?.filter((a: any) =>
        a.activityType?.id?.startsWith(course.code.toLowerCase() + '_')
      ) || [];
      
      const completedActivities = courseActivities.filter(a => a.isCompleted).length;
      const completionPercentage = course.totalActivities > 0 
        ? (completedActivities / course.totalActivities) * 100 
        : 0;

      const lastActivity = courseActivities
        .filter(a => a.completedAt)
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())[0];

      return {
        courseCode: course.code,
        courseName: course.name,
        completedActivities,
        totalActivities: course.totalActivities,
        completionPercentage,
        lastActivity: lastActivity?.completedAt || null,
        isAccessible: hasAllAccess || accessibleCourses.has(course.code)
      };
    });

    // Calculate portfolio stats
    const totalActivities = activities?.length || 0;
    const completedActivities = activities?.filter((a: any) => a.isCompleted).length || 0;
    
    // Get unique portfolio sections
    const portfolioSections = [...new Set(activities?.map((a: any) => a.activityType?.portfolioSection).filter(Boolean))];
    const completedSections = [...new Set(
      activities?.filter((a: any) => a.isCompleted).map((a: any) => a.activityType?.portfolioSection).filter(Boolean)
    )];

    const portfolioScore = totalActivities > 0 
      ? (completedActivities / totalActivities) * 100 
      : 0;

    // Analyze strengths and improvement areas based on categories
    const categoryStats = activities?.reduce((acc, activity: any) => {
      const category = activity.activityType?.category;
      if (!category) return acc;

      if (!acc[category]) {
        acc[category] = { total: 0, completed: 0 };
      }
      acc[category].total++;
      if (activity.isCompleted) {
        acc[category].completed++;
      }
      return acc;
    }, {} as Record<string, { total: number; completed: number }>);

    const strengthAreas = Object.entries(categoryStats || {})
      .filter(([_, stats]) => stats.completed / stats.total >= 0.8)
      .map(([category, _]) => category);

    const improvementAreas = Object.entries(categoryStats || {})
      .filter(([_, stats]) => stats.completed / stats.total < 0.3)
      .map(([category, _]) => category);

    const stats = {
      totalSections: 19, // Total portfolio sections available
      completedSections: completedSections.length,
      totalActivities,
      completedActivities,
      portfolioScore: Math.round(portfolioScore),
      strengthAreas,
      improvementAreas
    };

    return NextResponse.json({
      courses: courseProgress,
      stats,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Portfolio progress API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
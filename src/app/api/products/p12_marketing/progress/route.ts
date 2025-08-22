import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { checkProductAccess } from '@/lib/product-access';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has access to P12
    const access = await checkProductAccess(user.id, 'p12_marketing');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P12 Marketing Mastery course.' },
        { status: 403 }
      );
    }

    const supabase = createClient();

    // Get P12 modules and lessons
    const { data: modules, error: moduleError } = await supabase
      .from('Module')
      .select(`
        id,
        title,
        orderIndex,
        lessons:Lesson(
          id,
          day,
          title,
          xpReward,
          orderIndex
        )
      `)
      .eq('productId', (await supabase
        .from('Product')
        .select('id')
        .eq('code', 'p12_marketing')
        .single()
      ).data?.id)
      .order('orderIndex');

    if (moduleError) {
      logger.error('Error fetching P12 modules:', moduleError);
      return NextResponse.json(
        { error: 'Failed to fetch course modules' },
        { status: 500 }
      );
    }

    // Get user's progress
    const { data: lessonProgress, error: progressError } = await supabase
      .from('LessonProgress')
      .select('lessonId, completed, xpEarned')
      .eq('userId', user.id);

    if (progressError) {
      logger.error('Error fetching P12 progress:', progressError);
    }

    // Calculate progress statistics
    const totalLessons = modules?.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 60;
    const completedLessons = lessonProgress?.filter(p => p.completed).length || 0;
    const totalXP = lessonProgress?.reduce((acc, p) => acc + (p.xpEarned || 0), 0) || 0;

    // Calculate module progress
    const moduleProgress: Record<string, number> = {};
    modules?.forEach(module => {
      if (module.lessons) {
        const moduleLessonIds = module.lessons.map(l => l.id);
        const moduleCompletedCount = lessonProgress?.filter(p => 
          moduleLessonIds.includes(p.lessonId) && p.completed
        ).length || 0;
        moduleProgress[module.id] = (moduleCompletedCount / module.lessons.length) * 100;
      }
    });

    // Find current day (next incomplete lesson)
    let currentDay = 1;
    if (lessonProgress && modules) {
      for (const courseModule of modules) {
        if (courseModule.lessons) {
          for (const lesson of courseModule.lessons.sort((a, b) => a.orderIndex - b.orderIndex)) {
            const isCompleted = lessonProgress.some(p => p.lessonId === lesson.id && p.completed);
            if (!isCompleted) {
              currentDay = lesson.day;
              break;
            }
          }
          if (currentDay > 1) break;
        }
      }
    }

    // Get badges (placeholder - would be calculated based on achievements)
    const badges: string[] = [];
    if (completedLessons >= 10) badges.push('first_milestone');
    if (completedLessons >= 30) badges.push('halfway_hero');
    if (completedLessons >= 60) badges.push('marketing_master');
    if (totalXP >= 5000) badges.push('xp_champion');

    const progressData = {
      totalLessons,
      completedLessons,
      currentDay,
      totalXP,
      badges,
      moduleProgress,
      progressPercentage: Math.round((completedLessons / totalLessons) * 100),
      daysRemaining: access.daysRemaining || 0,
      hasAccess: true
    };

    return NextResponse.json(progressData);

  } catch (error) {
    logger.error('Error in P12 progress API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
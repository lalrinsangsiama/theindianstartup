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

    // Check if user has access to P7
    const access = await checkProductAccess(user.id, 'P7');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P7 State-wise Scheme Map course.' },
        { status: 403 }
      );
    }

    const supabase = createClient();

    // Get P7 modules and lessons
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
        .eq('code', 'P7')
        .single()
      ).data?.id)
      .order('orderIndex');

    if (moduleError) {
      logger.error('Error fetching P7 modules:', moduleError);
      return NextResponse.json(
        { error: 'Failed to fetch course modules' },
        { status: 500 }
      );
    }

    // Get user's progress from LessonProgress table
    let progressData: any[] = [];
    
    // Fetch all P7 lesson progress for this user
    const { data: lessonProgress, error: progressError } = await supabase
      .from('LessonProgress')
      .select('lessonId, completed, xpEarned, completedAt')
      .eq('userId', user.id)
      .eq('productCode', 'P7');

    if (!progressError && lessonProgress) {
      progressData = lessonProgress.map(p => ({
        lessonId: p.lessonId,
        completed: p.completed,
        xpEarned: p.xpEarned || 0,
        completedAt: p.completedAt
      }));
    }

    // Calculate progress statistics
    const totalLessons = modules?.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 30;
    const completedLessons = progressData.filter(p => p.completed).length || 0;
    const totalXP = progressData.reduce((acc, p) => acc + (p.xpEarned || 0), 0) || 0;

    // Calculate module progress
    const moduleProgress: Record<string, number> = {};
    modules?.forEach(module => {
      if (module.lessons) {
        const moduleLessonIds = module.lessons.map(l => l.id);
        const moduleCompletedCount = progressData.filter(p => 
          moduleLessonIds.includes(p.lessonId) && p.completed
        ).length || 0;
        moduleProgress[module.id] = (moduleCompletedCount / module.lessons.length) * 100;
      }
    });

    // Find current day (next incomplete lesson)
    let currentDay = 1;
    if (modules) {
      // Get all P7 lessons in order
      const allLessons: any[] = [];
      modules.forEach(module => {
        if (module.lessons) {
          module.lessons.forEach((lesson: any) => {
            allLessons.push({
              id: lesson.id,
              day: lesson.day,
              completed: progressData.some(p => p.lessonId === lesson.id && p.completed)
            });
          });
        }
      });
      
      // Sort by day and find first incomplete
      allLessons.sort((a, b) => a.day - b.day);
      const firstIncomplete = allLessons.find(l => !l.completed);
      currentDay = firstIncomplete ? firstIncomplete.day : 30;
    }

    // Get badges (placeholder - would be calculated based on achievements)
    const badges: string[] = [];
    if (completedLessons >= 5) badges.push('state_explorer');
    if (completedLessons >= 15) badges.push('regional_master');
    if (completedLessons >= 30) badges.push('state_ecosystem_expert');
    if (totalXP >= 3000) badges.push('benefit_optimizer');

    const progressResponse = {
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

    return NextResponse.json(progressResponse);

  } catch (error) {
    logger.error('Error in P7 progress API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
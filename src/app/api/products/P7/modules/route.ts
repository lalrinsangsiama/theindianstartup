import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;

    // Check if user has access to P7
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', userId)
      .in('productCode', ['P7', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({ 
        error: 'Access denied', 
        requiresPurchase: true,
        productCode: 'P7' 
      }, { status: 403 });
    }

    const hasAccess = purchases[0];

    // Fetch P7 modules with lessons
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        id,
        code,
        title,
        description,
        modules:Module(
          id,
          title,
          description,
          orderIndex,
          lessons:Lesson(
            id,
            day,
            title,
            briefContent,
            estimatedTime,
            xpReward,
            actionItems,
            resources,
            orderIndex
          )
        )
      `)
      .eq('code', 'P7')
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get user's progress for P7
    const { data: lessonProgress } = await supabase
      .from('LessonProgress')
      .select('lessonId, completed, xpEarned')
      .eq('userId', userId)
      .eq('purchaseId', hasAccess.id);

    // Create a map of lesson progress
    const progressMap = new Map(
      (lessonProgress || []).map(p => [p.lessonId, p])
    );

    // Calculate module progress and format response
    const modules = (product.modules || []).map((module, moduleIndex) => {
      const moduleLessons = (module.lessons || []).map(lesson => ({
        id: lesson.id,
        day: lesson.day,
        title: lesson.title,
        briefContent: lesson.briefContent,
        estimatedTime: lesson.estimatedTime,
        xpReward: lesson.xpReward,
        actionItems: lesson.actionItems,
        resources: lesson.resources,
        isCompleted: progressMap.get(lesson.id)?.completed || false
      }));

      const completedLessons = moduleLessons.filter(l => l.isCompleted).length;
      const totalLessons = moduleLessons.length;
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      const totalXP = moduleLessons.reduce((sum, l) => sum + l.xpReward, 0);

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        orderIndex: module.orderIndex,
        lessons: moduleLessons,
        totalXP,
        isUnlocked: moduleIndex === 0 || modules[moduleIndex - 1]?.progress >= 50, // Unlock when previous module is 50% complete
        isCompleted: progress === 100,
        progress
      };
    });

    // Calculate overall course progress
    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = modules.reduce(
      (sum, m) => sum + m.lessons.filter(l => l.isCompleted).length, 
      0
    );
    const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    // Calculate total XP earned
    const totalXPEarned = lessonProgress.reduce((sum, p) => sum + (p.xpEarned || 0), 0);

    return NextResponse.json({
      success: true,
      modules,
      progress: courseProgress,
      totalXP: totalXPEarned,
      stats: {
        totalModules: modules.length,
        completedModules: modules.filter(m => m.isCompleted).length,
        totalLessons,
        completedLessons,
        totalPossibleXP: modules.reduce((sum, m) => sum + m.totalXP, 0),
        earnedXP: totalXPEarned
      }
    });

  } catch (error) {
    logger.error('Error fetching P7 modules:', error);
    return NextResponse.json(
      { error: 'Failed to fetch course modules' },
      { status: 500 }
    );
  }
}
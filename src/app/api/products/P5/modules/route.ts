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

    // Check if user has access to P5
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P5', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get P5 product
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select('*')
      .eq('code', 'P5')
      .single();

    if (productError) {
      throw new Error('Product not found');
    }

    // Get modules with lesson counts and progress
    const { data: modules, error: modulesError } = await supabase
      .from('Module')
      .select(`
        *,
        lessons:Lesson(
          id,
          day,
          title,
          briefContent,
          estimatedTime,
          xpReward,
          orderIndex
        )
      `)
      .eq('productId', product.id)
      .order('orderIndex');

    if (modulesError) {
      throw new Error('Error fetching modules');
    }

    // Get user progress for each module
    const { data: userProgress, error: progressError } = await supabase
      .from('LessonProgress')
      .select('lessonId, completed')
      .eq('userId', user.id);

    const progressMap = new Map(
      (userProgress || []).map(p => [p.lessonId, p.completed])
    );

    // Process modules with progress
    const modulesWithProgress = modules.map((module: any) => {
      const lessons = module.lessons || [];
      const completedLessons = lessons.filter((lesson: any) =>
        progressMap.get(lesson.id) === true
      ).length;

      return {
        id: module.id,
        title: module.title,
        description: module.description,
        orderIndex: module.orderIndex,
        lessonCount: lessons.length,
        completedLessons,
        estimatedTime: lessons.reduce((sum: number, lesson: any) => sum + lesson.estimatedTime, 0),
        progress: lessons.length > 0 ? Math.round((completedLessons / lessons.length) * 100) : 0
      };
    });

    return NextResponse.json({
      success: true,
      modules: modulesWithProgress,
      totalModules: modules.length,
      totalLessons: modules.reduce((sum: number, module: any) => sum + (module.lessons?.length || 0), 0),
      completedLessons: modulesWithProgress.reduce((sum, module) => sum + module.completedLessons, 0)
    });

  } catch (error) {
    console.error('Error fetching P5 modules:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
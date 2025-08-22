import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { moduleId: string } }
) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P11
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P11', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get lessons for the module
    const { data: lessons, error: lessonsError } = await supabase
      .from('Lesson')
      .select('*')
      .eq('moduleId', params.moduleId)
      .order('orderIndex');

    if (lessonsError) {
      throw new Error('Error fetching lessons');
    }

    // Get user progress for lessons
    const { data: userProgress, error: progressError } = await supabase
      .from('LessonProgress')
      .select('lessonId, completed, completedAt')
      .eq('userId', user.id)
      .in('lessonId', lessons.map(l => l.id));

    const progressMap = new Map(
      (userProgress || []).map(p => [p.lessonId, { completed: p.completed, completedAt: p.completedAt }])
    );

    // Process lessons with progress and lock status
    const lessonsWithProgress = lessons.map((lesson, index) => {
      const progress = progressMap.get(lesson.id);
      const isCompleted = progress?.completed || false;
      
      // Simple lock logic: lesson is locked if previous lesson is not completed
      // (except for the first lesson which is always unlocked)
      const previousLesson = index > 0 ? lessons[index - 1] : null;
      const previousProgress = previousLesson ? progressMap.get(previousLesson.id) : null;
      const isLocked = index > 0 && (!previousProgress?.completed);

      return {
        id: lesson.id,
        day: lesson.day,
        title: lesson.title,
        briefContent: lesson.briefContent,
        actionItems: lesson.actionItems,
        resources: lesson.resources,
        estimatedTime: lesson.estimatedTime,
        xpReward: lesson.xpReward,
        orderIndex: lesson.orderIndex,
        completed: isCompleted,
        completedAt: progress?.completedAt,
        locked: isLocked,
        metadata: lesson.metadata
      };
    });

    return NextResponse.json({
      success: true,
      lessons: lessonsWithProgress,
      moduleId: params.moduleId,
      totalLessons: lessons.length,
      completedLessons: lessonsWithProgress.filter(l => l.completed).length
    });

  } catch (error) {
    console.error('Error fetching module lessons:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
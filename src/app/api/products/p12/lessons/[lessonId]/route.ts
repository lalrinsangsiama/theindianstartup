import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { checkProductAccess } from '@/lib/product-access';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check if user has access to P12
    const access = await checkProductAccess(user.id, 'P12');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P12 Marketing Mastery course.' },
        { status: 403 }
      );
    }

    const supabase = createClient();
    const lessonDay = parseInt(params.lessonId);

    // Get the lesson by day number
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        id,
        day,
        title,
        briefContent,
        actionItems,
        resources,
        estimatedTime,
        xpReward,
        module:Module(
          id,
          title,
          product:Product(code)
        )
      `)
      .eq('day', lessonDay)
      .eq('module.product.code', 'P12')
      .single();

    if (lessonError || !lesson) {
      logger.error('Error fetching P12 lesson:', lessonError);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Get user's progress for this lesson
    const { data: progress, error: progressError } = await supabase
      .from('LessonProgress')
      .select('completed, tasksCompleted, reflection, xpEarned')
      .eq('userId', user.id)
      .eq('lessonId', lesson.id)
      .maybeSingle();

    if (progressError) {
      logger.error('Error fetching lesson progress:', progressError);
    }

    // Parse JSON fields safely
    const actionItems = Array.isArray(lesson.actionItems) 
      ? lesson.actionItems 
      : (typeof lesson.actionItems === 'string' 
        ? JSON.parse(lesson.actionItems || '[]') 
        : []);

    const resources = typeof lesson.resources === 'object' && lesson.resources !== null
      ? lesson.resources
      : (typeof lesson.resources === 'string' 
        ? JSON.parse(lesson.resources || '{}')
        : {});

    const lessonData = {
      id: lesson.id,
      day: lesson.day,
      title: lesson.title,
      briefContent: lesson.briefContent,
      actionItems,
      resources,
      estimatedTime: lesson.estimatedTime,
      xpReward: lesson.xpReward,
      completed: progress?.completed || false
    };

    const progressData = {
      completed: progress?.completed || false,
      tasksCompleted: Array.isArray(progress?.tasksCompleted) 
        ? progress.tasksCompleted 
        : [],
      reflection: progress?.reflection || '',
      xpEarned: progress?.xpEarned || 0
    };

    return NextResponse.json({
      lesson: lessonData,
      progress: progressData
    });

  } catch (error) {
    logger.error('Error in P12 lesson API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
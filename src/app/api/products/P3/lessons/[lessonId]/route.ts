import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P3
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P3', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get lesson data with module info
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        *,
        module:Module (
          id,
          title,
          description,
          product:Product (
            code,
            title
          )
        )
      `)
      .eq('id', params.lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Verify lesson belongs to P3 product
    if (lesson.module.product.code !== 'P3') {
      return NextResponse.json({ error: 'Invalid lesson' }, { status: 400 });
    }

    // Get user progress for this lesson
    const { data: progress } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('lessonId', params.lessonId)
      .maybeSingle();

    // Check if lesson is unlocked (previous lessons completed or first lesson)
    let isUnlocked = true;
    if (lesson.day > 1) {
      const { data: previousLessons } = await supabase
        .from('Lesson')
        .select(`
          id,
          progress:LessonProgress!inner (
            completed,
            userId
          )
        `)
        .eq('moduleId', lesson.moduleId)
        .eq('progress.userId', user.id)
        .lt('day', lesson.day)
        .order('day');

      const incompletePrevious = previousLessons?.some(
        (prevLesson: any) => !prevLesson.progress?.some((p: any) => p.completed)
      );

      isUnlocked = !incompletePrevious;
    }

    // Get P3-specific resources for this lesson based on day/stage
    const { data: templates } = await supabase
      .from('p3_templates')
      .select('*')
      .eq('is_active', true)
      .contains('tags', [`lesson-${lesson.day}`])
      .limit(10);

    // Get relevant P3 tools based on lesson content
    const { data: tools } = await supabase
      .from('p3_tools')
      .select('*')
      .eq('is_active', true)
      .limit(5);

    const lessonData = {
      lesson: {
        ...lesson,
        moduleTitle: lesson.module.title,
        moduleId: lesson.module.id,
        productTitle: lesson.module.product.title,
        isUnlocked,
        completed: progress?.completed || false,
        tasksCompleted: progress?.tasksCompleted || [],
        reflection: progress?.reflection || '',
        xpEarned: progress?.xpEarned || 0,
        completedAt: progress?.completedAt
      },
      templates: templates || [],
      tools: tools || [],
      navigation: {
        nextLessonId: null,
        previousLessonId: null
      }
    };

    // Get next and previous lesson IDs for navigation
    const { data: nextLesson } = await supabase
      .from('Lesson')
      .select('id')
      .eq('moduleId', lesson.moduleId)
      .eq('day', lesson.day + 1)
      .maybeSingle();

    const { data: previousLesson } = await supabase
      .from('Lesson')
      .select('id')
      .eq('moduleId', lesson.moduleId)
      .eq('day', lesson.day - 1)
      .maybeSingle();

    lessonData.navigation.nextLessonId = nextLesson?.id || null;
    lessonData.navigation.previousLessonId = previousLesson?.id || null;

    return NextResponse.json(lessonData);

  } catch (error) {
    logger.error('Error fetching P3 lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P3
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P3', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { tasksCompleted, reflection, xpEarned } = body;

    // Update lesson progress
    const { data: progressUpdate, error: progressError } = await supabase
      .from('LessonProgress')
      .upsert({
        userId: user.id,
        lessonId: params.lessonId,
        purchaseId: purchase.id,
        completed: true,
        completedAt: new Date().toISOString(),
        tasksCompleted: tasksCompleted || [],
        reflection: reflection || null,
        xpEarned: xpEarned || 0,
        updatedAt: new Date().toISOString()
      }, {
        onConflict: 'userId,lessonId'
      });

    if (progressError) throw progressError;

    // Award XP if lesson completed
    if (xpEarned) {
      await supabase
        .from('XPEvent')
        .insert({
          userId: user.id,
          type: 'lesson_complete',
          points: xpEarned,
          description: 'Completed P3 lesson',
          metadata: { lessonId: params.lessonId, productCode: 'P3' }
        });

      // Update user's total XP
      await supabase
        .from('User')
        .update({
          totalXP: supabase.rpc('increment_user_xp', { user_id: user.id, xp_amount: xpEarned })
        })
        .eq('id', user.id);
    }

    return NextResponse.json({ 
      success: true,
      xpEarned: xpEarned || 0,
      message: 'Lesson completed successfully!'
    });

  } catch (error) {
    logger.error('Error completing P3 lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
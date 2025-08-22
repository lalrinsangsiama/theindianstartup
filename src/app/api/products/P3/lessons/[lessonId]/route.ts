import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

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
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P3', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get lesson data with module info
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select(`
        *,
        module:modules (
          id,
          title,
          description,
          product:products (
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
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('lesson_id', params.lessonId)
      .maybeSingle();

    // Check if lesson is unlocked (previous lessons completed or first lesson)
    let isUnlocked = true;
    if (lesson.day > 1) {
      const { data: previousLessons } = await supabase
        .from('lessons')
        .select(`
          id,
          lesson_progress!inner (
            completed,
            user_id
          )
        `)
        .eq('module_id', lesson.module_id)
        .eq('lesson_progress.user_id', user.id)
        .lt('day', lesson.day)
        .order('day');

      const incompletePrevious = previousLessons?.some(
        (prevLesson: any) => !prevLesson.lesson_progress?.some((p: any) => p.completed)
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
        tasksCompleted: progress?.tasks_completed || [],
        reflection: progress?.reflection || '',
        xpEarned: progress?.xp_earned || 0,
        completedAt: progress?.completed_at
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
      .from('lessons')
      .select('id')
      .eq('module_id', lesson.module_id)
      .eq('day', lesson.day + 1)
      .maybeSingle();

    const { data: previousLesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('module_id', lesson.module_id)
      .eq('day', lesson.day - 1)
      .maybeSingle();

    lessonData.navigation.nextLessonId = nextLesson?.id || null;
    lessonData.navigation.previousLessonId = previousLesson?.id || null;

    return NextResponse.json(lessonData);

  } catch (error) {
    console.error('Error fetching P3 lesson:', error);
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
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P3', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { tasksCompleted, reflection, xpEarned } = body;

    // Update lesson progress
    const { data: progressUpdate, error: progressError } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: user.id,
        lesson_id: params.lessonId,
        purchase_id: purchase.id,
        completed: true,
        completed_at: new Date().toISOString(),
        tasks_completed: tasksCompleted || [],
        reflection: reflection || null,
        xp_earned: xpEarned || 0,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      });

    if (progressError) throw progressError;

    // Award XP if lesson completed
    if (xpEarned) {
      await supabase
        .from('p3_xp_events')
        .insert({
          user_id: user.id,
          event_type: 'lesson_complete',
          event_id: params.lessonId,
          xp_earned: xpEarned
        });

      // Update user's total XP (if you have a users table)
      await supabase
        .from('users')
        .update({ 
          total_xp: 'total_xp + ' + xpEarned,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
    }

    return NextResponse.json({ 
      success: true,
      xpEarned: xpEarned || 0,
      message: 'Lesson completed successfully!'
    });

  } catch (error) {
    console.error('Error completing P3 lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
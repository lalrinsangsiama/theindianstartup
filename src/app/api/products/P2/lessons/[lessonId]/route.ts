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

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P2', 'ALL_ACCESS'])
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

    // Verify lesson belongs to P2 product
    if (lesson.module.product.code !== 'P2') {
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
          lesson_progress (
            completed
          )
        `)
        .eq('module_id', lesson.module_id)
        .lt('day', lesson.day)
        .order('day');

      const incompletePrevious = previousLessons?.some(
        (prevLesson: any) => !prevLesson.lesson_progress?.some((p: any) => p.completed && p.user_id === user.id)
      );

      isUnlocked = !incompletePrevious;
    }

    // Get related P2 resources for this lesson
    const { data: resources } = await supabase
      .from('p2_templates')
      .select('*')
      .contains('tags', [`lesson-${lesson.day}`]);

    // Get P2 tools relevant to this lesson
    const { data: tools } = await supabase
      .from('p2_tools')
      .select('*')
      .eq('is_active', true);

    const lessonData = {
      ...lesson,
      moduleTitle: lesson.module.title,
      moduleId: lesson.module.id,
      productTitle: lesson.module.product.title,
      isUnlocked,
      userProgress: progress,
      isCompleted: progress?.completed || false,
      resources: resources || [],
      tools: tools || [],
      nextLessonId: null, // Will be populated if needed
      previousLessonId: null // Will be populated if needed
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

    lessonData.nextLessonId = nextLesson?.id || null;
    lessonData.previousLessonId = previousLesson?.id || null;

    return NextResponse.json(lessonData);

  } catch (error) {
    console.error('Error fetching P2 lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
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

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'update_progress':
        // Update lesson progress
        const { data: progressUpdate, error: progressError } = await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: params.lessonId,
            purchase_id: purchase.id,
            completed: data.completed || false,
            completed_at: data.completed ? new Date().toISOString() : null,
            tasks_completed: data.tasksCompleted || null,
            proof_uploads: data.proofUploads || [],
            reflection: data.reflection || null,
            xp_earned: data.xpEarned || 0,
            updated_at: new Date().toISOString()
          });

        if (progressError) throw progressError;

        // Award XP if lesson completed
        if (data.completed && data.xpEarned) {
          await supabase
            .from('p2_xp_events')
            .insert({
              user_id: user.id,
              event_type: 'lesson_complete',
              event_id: params.lessonId,
              xp_earned: data.xpEarned
            });
        }

        return NextResponse.json({ success: true });

      case 'save_notes':
        // Save lesson notes
        const { data: notesUpdate, error: notesError } = await supabase
          .from('lesson_progress')
          .upsert({
            user_id: user.id,
            lesson_id: params.lessonId,
            purchase_id: purchase.id,
            reflection: data.notes,
            updated_at: new Date().toISOString()
          });

        if (notesError) throw notesError;
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error updating P2 lesson:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
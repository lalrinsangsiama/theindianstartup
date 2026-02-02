import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function POST(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { completed, tasksCompleted, reflection, proofUploads } = body;

    // Check if user has access to P5
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P5', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied to P5' }, { status: 403 });
    }

    const purchase = purchases[0];

    // Get lesson details
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select('*, module:Module(*)')
      .eq('id', params.lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Verify lesson belongs to P5
    if (lesson.module.productId !== 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462') {
      return NextResponse.json({ error: 'Invalid lesson for P5' }, { status: 403 });
    }

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('lessonId', params.lessonId)
      .single();

    let progressData;
    const xpEarned = completed && !existingProgress?.completed ? (lesson.xpReward || 100) : 0;

    if (existingProgress) {
      // Update existing progress
      const { data, error } = await supabase
        .from('LessonProgress')
        .update({
          completed,
          completedAt: completed ? new Date().toISOString() : null,
          tasksCompleted,
          reflection,
          proofUploads,
          xpEarned: existingProgress.xpEarned + xpEarned,
          updatedAt: new Date().toISOString()
        })
        .eq('id', existingProgress.id)
        .select()
        .single();

      if (error) throw error;
      progressData = data;
    } else {
      // Create new progress
      const { data, error } = await supabase
        .from('LessonProgress')
        .insert({
          userId: user.id,
          lessonId: params.lessonId,
          purchaseId: purchase.id,
          completed,
          completedAt: completed ? new Date().toISOString() : null,
          tasksCompleted,
          reflection,
          proofUploads,
          xpEarned
        })
        .select()
        .single();

      if (error) throw error;
      progressData = data;
    }

    // Update user's total XP if lesson was completed
    if (xpEarned > 0) {
      // Get current XP first
      const { data: currentUser } = await supabase
        .from('User')
        .select('totalXP')
        .eq('id', user.id)
        .single();

      const { error: xpError } = await supabase
        .from('User')
        .update({
          totalXP: (currentUser?.totalXP || 0) + xpEarned
        })
        .eq('id', user.id);

      if (xpError) {
        logger.error('Failed to update user XP', { error: xpError, userId: user.id });
      }

      // Track XP event for P5
      await supabase
        .from('XPEvent')
        .insert({
          userId: user.id,
          xpAmount: xpEarned,
          eventType: 'lesson_completed',
          eventId: params.lessonId,
          metadata: {
            lessonTitle: lesson.title,
            moduleTitle: lesson.module.title,
            productCode: 'P5',
            day: lesson.day
          }
        });
    }

    // Update module progress
    const { data: moduleProgress } = await supabase
      .from('LessonProgress')
      .select('completed')
      .eq('userId', user.id)
      .eq('purchaseId', purchase.id)
      .in('lessonId', (
        await supabase
          .from('Lesson')
          .select('id')
          .eq('moduleId', lesson.moduleId)
      ).data?.map(l => l.id) || []);

    const completedInModule = moduleProgress?.filter(p => p.completed).length || 0;
    const totalInModule = (await supabase
      .from('Lesson')
      .select('id')
      .eq('moduleId', lesson.moduleId)).data?.length || 0;

    // Update or create module progress
    const { data: existingModuleProgress } = await supabase
      .from('ModuleProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('moduleId', lesson.moduleId)
      .eq('purchaseId', purchase.id)
      .single();

    if (existingModuleProgress) {
      await supabase
        .from('ModuleProgress')
        .update({
          completedLessons: completedInModule,
          totalLessons: totalInModule,
          progressPercentage: Math.round((completedInModule / totalInModule) * 100),
          completedAt: completedInModule === totalInModule ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString()
        })
        .eq('id', existingModuleProgress.id);
    } else {
      await supabase
        .from('ModuleProgress')
        .insert({
          userId: user.id,
          moduleId: lesson.moduleId,
          purchaseId: purchase.id,
          completedLessons: completedInModule,
          totalLessons: totalInModule,
          progressPercentage: Math.round((completedInModule / totalInModule) * 100),
          completedAt: completedInModule === totalInModule ? new Date().toISOString() : null
        });
    }

    // Check for achievements
    if (completed) {
      // Check if completed all lessons in P5
      const { data: allP5Lessons } = await supabase
        .from('Lesson')
        .select('id')
        .in('moduleId', (
          await supabase
            .from('Module')
            .select('id')
            .eq('productId', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462')
        ).data?.map(m => m.id) || []);

      const { data: allP5Progress } = await supabase
        .from('LessonProgress')
        .select('lessonId')
        .eq('userId', user.id)
        .eq('completed', true)
        .in('lessonId', allP5Lessons?.map(l => l.id) || []);

      if (allP5Progress?.length === allP5Lessons?.length && allP5Lessons?.length > 0) {
        // Award P5 completion badge
        const { data: userBadges } = await supabase
          .from('User')
          .select('badges')
          .eq('id', user.id)
          .single();

        const badges = userBadges?.badges || [];
        if (!badges.includes('p5_legal_master')) {
          badges.push('p5_legal_master');

          // Get current XP for bonus award
          const { data: currentUserData } = await supabase
            .from('User')
            .select('totalXP')
            .eq('id', user.id)
            .single();

          await supabase
            .from('User')
            .update({
              badges,
              totalXP: (currentUserData?.totalXP || 0) + 500
            })
            .eq('id', user.id);

          await supabase
            .from('XPEvent')
            .insert({
              userId: user.id,
              xpAmount: 500,
              eventType: 'course_completed',
              eventId: 'P5',
              metadata: {
                productCode: 'P5',
                productName: 'Legal Stack - Bulletproof Legal Framework',
                completionDate: new Date().toISOString()
              }
            });
        }
      }
    }

    return NextResponse.json({
      success: true,
      progress: progressData,
      xpEarned,
      moduleProgress: {
        completedLessons: completedInModule,
        totalLessons: totalInModule,
        percentage: Math.round((completedInModule / totalInModule) * 100)
      }
    });

  } catch (error) {
    logger.error('Error updating P5 lesson progress:', error);
    return NextResponse.json({ 
      error: 'Failed to update progress',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get lesson progress
    const { data: progress, error } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('lessonId', params.lessonId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      throw error;
    }

    return NextResponse.json({
      success: true,
      progress: progress || {
        completed: false,
        tasksCompleted: null,
        reflection: null,
        proofUploads: [],
        xpEarned: 0
      }
    });

  } catch (error) {
    logger.error('Error fetching P5 lesson progress:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch progress',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
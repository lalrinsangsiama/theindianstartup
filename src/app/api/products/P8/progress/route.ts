import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check P8 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P8', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'P8 access required' }, { status: 403 });
    }

    // Get overall P8 progress
    const { data: productProgress, error: productError } = await supabase
      .from('ProductProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('productCode', 'P8')
      .single();

    // Get module progress
    const { data: moduleProgress, error: moduleError } = await supabase
      .from('ProductModuleProgress')
      .select(`
        *,
        module:Module!inner(
          id,
          title,
          orderIndex
        )
      `)
      .eq('userId', user.id)
      .eq('productCode', 'P8')
      .order('module(orderIndex)');

    // Get lesson progress
    const { data: lessonProgress, error: lessonError } = await supabase
      .from('ProductLessonProgress')
      .select(`
        *,
        lesson:Lesson!inner(
          id,
          title,
          day,
          xpReward,
          moduleId
        )
      `)
      .eq('userId', user.id)
      .eq('productCode', 'P8');

    // Calculate statistics
    const stats = {
      totalLessons: 16,
      completedLessons: lessonProgress?.filter(lp => lp.completed).length || 0,
      totalModules: 8,
      completedModules: moduleProgress?.filter(mp => mp.completed).length || 0,
      totalXP: lessonProgress?.reduce((sum, lp) => sum + (lp.xpEarned || 0), 0) || 0,
      totalTimeSpent: lessonProgress?.reduce((sum, lp) => sum + (lp.timeSpent || 0), 0) || 0,
      overallProgress: productProgress?.progressPercentage || 0,
      certificateEligible: (productProgress?.progressPercentage || 0) >= 80,
      lastAccessed: productProgress?.lastAccessedAt || null
    };

    // Get next lesson to complete
    const completedLessonIds = lessonProgress?.filter(lp => lp.completed).map(lp => lp.lessonId) || [];
    const { data: nextLesson } = await supabase
      .from('Lesson')
      .select(`
        *,
        module:Module!inner(
          id,
          title,
          productId
        )
      `)
      .eq('module.productId', (await supabase.from('Product').select('id').eq('code', 'P8').single()).data?.id)
      .not('id', 'in', completedLessonIds.length > 0 ? `(${completedLessonIds.join(',')})` : '(null)')
      .order('module.orderIndex')
      .order('orderIndex')
      .limit(1)
      .single();

    return NextResponse.json({
      success: true,
      progress: {
        overall: productProgress || {
          productCode: 'P8',
          progressPercentage: 0,
          completedLessons: 0,
          totalLessons: 16,
          completedModules: 0,
          totalModules: 8
        },
        modules: moduleProgress || [],
        lessons: lessonProgress || [],
        stats,
        nextLesson: nextLesson || null,
        achievements: {
          firstLessonComplete: stats.completedLessons >= 1,
          halfwayThere: stats.overallProgress >= 50,
          almostDone: stats.overallProgress >= 80,
          courseComplete: stats.overallProgress === 100,
          dataRoomMaster: stats.completedModules >= 4,
          investorReady: stats.overallProgress >= 80
        }
      }
    });

  } catch (error) {
    logger.error('Error fetching P8 progress:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, action, data } = await request.json();

    if (!lessonId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check P8 access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P8', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'P8 access required' }, { status: 403 });
    }

    // Get lesson details
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        *,
        module:Module!inner(
          id,
          title,
          productId
        )
      `)
      .eq('id', lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    // Verify this is a P8 lesson
    const { data: product } = await supabase
      .from('Product')
      .select('code')
      .eq('id', lesson.module.productId)
      .single();

    if (product?.code !== 'P8') {
      return NextResponse.json({ error: 'Invalid lesson for P8' }, { status: 400 });
    }

    let result;

    switch (action) {
      case 'start':
        // Start or resume lesson
        result = await supabase
          .from('ProductLessonProgress')
          .upsert({
            userId: user.id,
            lessonId: lessonId,
            productCode: 'P8',
            startedAt: new Date().toISOString(),
            completed: false
          }, {
            onConflict: 'userId,lessonId'
          })
          .select()
          .single();
        break;

      case 'complete':
        // Complete lesson
        const xpReward = lesson.xpReward || 100;
        
        result = await supabase
          .from('ProductLessonProgress')
          .upsert({
            userId: user.id,
            lessonId: lessonId,
            productCode: 'P8',
            completed: true,
            completedAt: new Date().toISOString(),
            xpEarned: xpReward,
            tasksCompleted: data?.tasksCompleted || [],
            notes: data?.notes || null
          }, {
            onConflict: 'userId,lessonId'
          })
          .select()
          .single();

        // Award XP
        if (result.data) {
          await supabase
            .from('XPEvent')
            .insert({
              userId: user.id,
              amount: xpReward,
              source: 'lesson_completion',
              description: `Completed P8 lesson: ${lesson.title}`,
              metadata: {
                lessonId: lessonId,
                lessonTitle: lesson.title,
                productCode: 'P8'
              }
            });
        }
        break;

      case 'updateTime':
        // Update time spent
        const { data: currentProgress } = await supabase
          .from('ProductLessonProgress')
          .select('timeSpent')
          .eq('userId', user.id)
          .eq('lessonId', lessonId)
          .single();

        const currentTime = currentProgress?.timeSpent || 0;
        const additionalTime = data?.timeSpent || 0;

        result = await supabase
          .from('ProductLessonProgress')
          .update({
            timeSpent: currentTime + additionalTime,
            updatedAt: new Date().toISOString()
          })
          .eq('userId', user.id)
          .eq('lessonId', lessonId)
          .select()
          .single();
        break;

      case 'saveNotes':
        // Save lesson notes
        result = await supabase
          .from('ProductLessonProgress')
          .update({
            notes: data?.notes || '',
            updatedAt: new Date().toISOString()
          })
          .eq('userId', user.id)
          .eq('lessonId', lessonId)
          .select()
          .single();
        break;

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    if (result.error) {
      throw result.error;
    }

    // Get updated overall progress
    const { data: updatedProgress } = await supabase
      .from('ProductProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('productCode', 'P8')
      .single();

    return NextResponse.json({
      success: true,
      action,
      lessonProgress: result.data,
      overallProgress: updatedProgress,
      message: `Lesson ${action === 'complete' ? 'completed' : 'updated'} successfully`
    });

  } catch (error) {
    logger.error('Error updating P8 progress:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
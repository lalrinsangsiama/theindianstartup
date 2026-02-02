import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { checkProductAccess } from '@/lib/product-access';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
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
    const body = await request.json();

    // Get the lesson by day number
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        id,
        day,
        xpReward,
        module:Module(
          id,
          product:Product(code)
        )
      `)
      .eq('day', lessonDay)
      .eq('module.product.code', 'P12')
      .single();

    if (lessonError || !lesson) {
      logger.error('Error fetching P12 lesson for completion:', lessonError);
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Find the user's purchase for this product
    const { data: purchase, error: purchaseError } = await supabase
      .from('Purchase')
      .select('id')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .or(`productCode.eq.P12,productCode.eq.ALL_ACCESS`)
      .limit(1)
      .single();

    if (purchaseError || !purchase) {
      logger.error('Error finding active purchase:', purchaseError);
      return NextResponse.json(
        { error: 'No active purchase found' },
        { status: 403 }
      );
    }

    // Upsert lesson progress
    const { data: progressData, error: progressError } = await supabase
      .from('LessonProgress')
      .upsert({
        userId: user.id,
        lessonId: lesson.id,
        purchaseId: purchase.id,
        completed: true,
        completedAt: new Date().toISOString(),
        tasksCompleted: body.tasksCompleted || [],
        reflection: body.reflection || '',
        xpEarned: lesson.xpReward
      }, {
        onConflict: 'userId,lessonId'
      })
      .select()
      .single();

    if (progressError) {
      logger.error('Error updating lesson progress:', progressError);
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    // Update user's total XP using RPC function or manual increment
    try {
      await supabase.rpc('increment_user_xp', {
        user_id: user.id,
        xp_amount: lesson.xpReward
      });
    } catch (xpError) {
      // If RPC doesn't exist, try manual update
      const { data: currentUser } = await supabase
        .from('User')
        .select('totalXP')
        .eq('id', user.id)
        .single();

      if (currentUser) {
        await supabase
          .from('User')
          .update({ totalXP: (currentUser.totalXP || 0) + lesson.xpReward })
          .eq('id', user.id);
      }
    }

    // Cast lesson to access nested relations
    const lessonData = lesson as any;

    // Check for module completion - get module lessons first
    const { data: moduleLessons } = await supabase
      .from('Lesson')
      .select('id')
      .eq('moduleId', lessonData.module?.id);

    const { data: moduleProgress, error: moduleError } = await supabase
      .from('LessonProgress')
      .select('lessonId, completed')
      .eq('userId', user.id)
      .in('lessonId', moduleLessons?.map((l: any) => l.id) || []);

    if (moduleError) {
      logger.error('Error checking module progress:', moduleError);
    } else if (moduleProgress) {
      const completedInModule = moduleProgress.filter((p: any) => p.completed).length;
      const totalInModule = moduleProgress.length;

      // Update module progress
      await supabase
        .from('ModuleProgress')
        .upsert({
          userId: user.id,
          moduleId: lessonData.module?.id,
          purchaseId: purchase.id,
          completedLessons: completedInModule,
          totalLessons: totalInModule,
          progressPercentage: Math.round((completedInModule / totalInModule) * 100),
          completedAt: completedInModule === totalInModule ? new Date().toISOString() : null
        }, {
          onConflict: 'userId,moduleId'
        });
    }

    // Log completion for analytics
    logger.info(`P12 Lesson ${lessonDay} completed by user ${user.id}`);

    return NextResponse.json({
      success: true,
      xpEarned: lesson.xpReward,
      message: `Day ${lessonDay} completed! +${lesson.xpReward} XP earned.`
    });

  } catch (error) {
    logger.error('Error in P12 lesson completion API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
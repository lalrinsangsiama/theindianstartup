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

    // Check if user has access to P27
    const access = await checkProductAccess(user.id, 'P27');
    if (!access.hasAccess) {
      return NextResponse.json(
        { error: 'Access denied. Please purchase P27 Startup Exit Strategies course.' },
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
      .eq('module.product.code', 'P27')
      .single();

    if (lessonError || !lesson) {
      logger.error('Error fetching P27 lesson for completion:', lessonError);
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
      .or(`productCode.eq.P27,productCode.eq.ALL_ACCESS`)
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

    // Update user's total XP
    const { error: xpError } = await supabase.rpc('increment_user_xp', {
      user_id: user.id,
      xp_amount: lesson.xpReward
    });

    if (xpError) {
      logger.error('Error updating user XP:', xpError);
      // Try alternative method
      const { data: currentUser } = await supabase
        .from('User')
        .select('totalXP')
        .eq('id', user.id)
        .single();

      await supabase
        .from('User')
        .update({ totalXP: (currentUser?.totalXP || 0) + lesson.xpReward })
        .eq('id', user.id);
    }

    // Log completion for analytics
    logger.info(`P27 Lesson ${lessonDay} completed by user ${user.id}`);

    return NextResponse.json({
      success: true,
      xpEarned: lesson.xpReward,
      message: `Day ${lessonDay} completed! +${lesson.xpReward} XP earned.`
    });

  } catch (error) {
    logger.error('Error in P27 lesson completion API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

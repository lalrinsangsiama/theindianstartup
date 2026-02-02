import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/product-access';
import { applyUserRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

interface LessonCompletionRequest {
  tasksCompleted?: string[];
  reflection?: string;
  proofUploads?: string[];
  timeSpent?: number;
}

// POST - Mark lesson as completed with full gamification integration
export async function POST(
  request: NextRequest,
  { params }: { params: { productCode: string; lessonId: string } }
) {
  try {
    const supabase = createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Apply rate limiting (50 lessons per hour per user to prevent XP farming)
    const rateLimit = await applyUserRateLimit(user.id, 'lessonComplete');
    if (!rateLimit.allowed) {
      logger.warn('Lesson completion rate limit exceeded', {
        userId: user.id,
        lessonId: params.lessonId,
      });
      return NextResponse.json({
        error: 'Too many lesson completions. Please slow down.'
      }, {
        status: 429,
        headers: rateLimit.headers,
      });
    }

    const { tasksCompleted, reflection, proofUploads, timeSpent }: LessonCompletionRequest = await request.json();

    // Check access to product
    const product = PRODUCTS[params.productCode];
    if (!product) {
      return NextResponse.json({
        error: 'Product not found'
      }, { status: 404 });
    }

    // Get user's active purchases
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const directAccess = purchases?.find(p => p.product?.code === params.productCode);
    const bundleAccess = purchases?.find(p => p.product?.code === 'ALL_ACCESS');
    
    if (!directAccess && !bundleAccess) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    const activePurchase = directAccess || bundleAccess;

    // Get lesson details
    const { data: lesson, error: lessonError } = await supabase
      .from('Lesson')
      .select(`
        id,
        day,
        title,
        xpReward,
        estimatedTime,
        moduleId,
        module:Module!inner(
          id,
          title,
          orderIndex,
          productId,
          product:Product!inner(
            code,
            title
          )
        )
      `)
      .eq('id', params.lessonId)
      .single();

    if (lessonError || !lesson) {
      return NextResponse.json({
        error: 'Lesson not found'
      }, { status: 404 });
    }

    // Cast lesson to any to handle Supabase's nested relation typing
    const lessonData = lesson as any;

    // Verify lesson belongs to the requested product
    if (lessonData.module?.product?.code !== params.productCode) {
      return NextResponse.json({
        error: 'Lesson does not belong to this product'
      }, { status: 404 });
    }

    // Check if already completed
    const { data: existingProgress } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('userId', user.id)
      .eq('lessonId', params.lessonId)
      .single();

    const isFirstCompletion = !existingProgress?.completedAt;
    const xpEarned = isFirstCompletion ? (lesson.xpReward || 50) : 0;

    // Update lesson progress
    const progressData = {
      userId: user.id,
      lessonId: params.lessonId,
      purchaseId: activePurchase.id,
      completed: true,
      completedAt: new Date().toISOString(),
      tasksCompleted: tasksCompleted || [],
      reflection: reflection || '',
      proofUploads: proofUploads || [],
      xpEarned,
      timeSpent: timeSpent || 0,
    };

    const { error: progressError } = await supabase
      .from('LessonProgress')
      .upsert(progressData, {
        onConflict: 'userId,lessonId'
      });

    if (progressError) {
      logger.error('Error updating lesson progress:', progressError);
      return NextResponse.json({
        error: 'Failed to update progress'
      }, { status: 500 });
    }

    // Award XP only for first completion
    let xpResponse = null;
    if (isFirstCompletion && xpEarned > 0) {
      try {
        const xpAwardResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/xp/award`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || '',
          },
          body: JSON.stringify({
            eventType: 'DAILY_LESSON_COMPLETE',
            metadata: {
              day: lesson.day,
              lessonId: params.lessonId,
              productCode: params.productCode,
              moduleId: lesson.moduleId,
            },
          }),
        });

        if (xpAwardResponse.ok) {
          xpResponse = await xpAwardResponse.json();
        }
      } catch (xpError) {
        logger.error('Error awarding XP:', xpError);
        // Don't fail the whole operation for XP issues
      }
    }

    // Update module progress
    await updateModuleProgress(supabase, user.id, lesson.moduleId, activePurchase.id);

    // Get updated user stats
    const { data: userStats } = await supabase
      .from('users')
      .select('total_xp, current_streak, current_day, badges')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      success: true,
      lesson: {
        id: lesson.id,
        title: lesson.title,
        completed: true,
        completedAt: progressData.completedAt,
        xpEarned,
        isFirstCompletion,
      },
      progress: progressData,
      gamification: {
        xp: xpResponse?.xp || null,
        level: xpResponse?.level || null,
        badges: xpResponse?.badges || null,
        streak: xpResponse?.streak || null,
      },
      user: {
        totalXP: userStats?.total_xp || 0,
        currentStreak: userStats?.current_streak || 0,
        currentDay: userStats?.current_day || 1,
        totalBadges: (userStats?.badges as string[])?.length || 0,
      },
    });

  } catch (error) {
    logger.error('Lesson completion error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Helper function to update module progress
async function updateModuleProgress(
  supabase: any, 
  userId: string, 
  moduleId: string, 
  purchaseId: string
) {
  try {
    // Get total lessons in module
    const { data: moduleLessons } = await supabase
      .from('Lesson')
      .select('id')
      .eq('moduleId', moduleId);

    // Get completed lessons in module
    const { data: completedLessons } = await supabase
      .from('LessonProgress')
      .select('lessonId')
      .eq('userId', userId)
      .eq('purchaseId', purchaseId)
      .not('completedAt', 'is', null)
      .in('lessonId', moduleLessons?.map((l: { id: string }) => l.id) || []);

    const totalLessons = moduleLessons?.length || 0;
    const completedCount = completedLessons?.length || 0;
    const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
    const isCompleted = completedCount === totalLessons && totalLessons > 0;

    // Update or create module progress
    await supabase
      .from('ModuleProgress')
      .upsert({
        userId,
        moduleId,
        purchaseId,
        completedLessons: completedCount,
        totalLessons,
        progressPercentage,
        completedAt: isCompleted ? new Date().toISOString() : null,
      }, {
        onConflict: 'userId,moduleId'
      });

    // If module is completed for the first time, award bonus XP
    if (isCompleted) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/xp/award`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventType: 'WEEK_COMPLETE', // Using week complete for module completion
            metadata: {
              moduleId,
            },
          }),
        });
      } catch (xpError) {
        logger.error('Error awarding module completion XP:', xpError);
      }
    }

  } catch (error) {
    logger.error('Error updating module progress:', error);
    // Don't throw - this is not critical to the main operation
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's P1 purchase and progress
    const { data: purchase, error: purchaseError } = await supabase
      .from('Purchase')
      .select(`
        *,
        product:Product!inner(*),
        lessonsProgress:LessonProgress(
          *,
          lesson:Lesson(*)
        )
      `)
      .eq('userId', user.id)
      .eq('product.code', 'P1')
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (purchaseError) {
      logger.error('Error fetching P1 progress:', purchaseError);
      return NextResponse.json(
        { error: 'Failed to fetch progress' },
        { status: 500 }
      );
    }

    if (!purchase) {
      return NextResponse.json({
        hasAccess: false,
        progress: null
      });
    }

    // Calculate progress metrics
    const completedLessons = purchase.lessonsProgress?.filter(
      (lp: any) => lp.completedAt !== null
    ) || [];
    
    const completedDays = completedLessons.map((lp: any) => lp.lesson.order);
    const currentDay = Math.max(...completedDays, 0) + 1;
    const todayCompleted = completedDays.includes(currentDay - 1);

    // Get user's streak data
    const { data: userData } = await supabase
      .from('User')
      .select('currentStreak, longestStreak, totalXP')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      hasAccess: true,
      progress: {
        currentDay: Math.min(currentDay, 30),
        completedDays,
        completedLessonsCount: completedLessons.length,
        totalLessons: 30,
        currentStreak: userData?.currentStreak || 0,
        longestStreak: userData?.longestStreak || 0,
        totalXP: userData?.totalXP || 0,
        todayCompleted,
        lessonsProgress: purchase.lessonsProgress || []
      }
    });
  } catch (error) {
    logger.error('P1 progress error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}
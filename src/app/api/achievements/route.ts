import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { ACHIEVEMENT_SYSTEM, checkAchievementUnlocked } from '@/lib/achievements';
import { createId } from '@paralleldrive/cuid2';

async function getCompletedCourses(userId: string): Promise<string[]> {
  const supabase = createClient();

  const { data: moduleProgress } = await supabase
    .from('module_progress')
    .select(`
      module_id,
      progress_percentage,
      modules (
        product_id,
        products (
          code
        )
      )
    `)
    .eq('user_id', userId)
    .eq('progress_percentage', 100);

  if (!moduleProgress) return [];

  // Group by product and check if all modules are complete
  const productModules: Record<string, number> = {};
  const completedModules: Record<string, number> = {};

  // Count total modules per product
  const { data: allModules } = await supabase
    .from('modules')
    .select('product_id, products(code)');

  if (allModules) {
    allModules.forEach((module: any) => {
      const productCode = module.products?.code;
      if (productCode) {
        productModules[productCode] = (productModules[productCode] || 0) + 1;
      }
    });
  }

  // Count completed modules per product
  moduleProgress.forEach((module: any) => {
    const productCode = module.modules?.products?.code;
    if (productCode) {
      completedModules[productCode] = (completedModules[productCode] || 0) + 1;
    }
  });

  // Return products where all modules are completed
  return Object.keys(completedModules).filter(
    productCode => completedModules[productCode] === productModules[productCode]
  );
}

export const dynamic = 'force-dynamic';

// GET /api/achievements - Get user's achievements
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

    // Get user data with achievements
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select(`
        *,
        purchases:Purchase(
          productCode,
          status
        ),
        portfolio:StartupPortfolio(
          completionPercentage
        )
      `)
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get lesson progress
    const { data: lessonProgress } = await supabase
      .from('LessonProgress')
      .select('completed')
      .eq('userId', user.id)
      .eq('completed', true);

    // Get community stats (if we have a community posts table)
    // For now, we'll use placeholder data
    const communityPosts = 0;
    const referrals = 0;

    // Calculate user stats
    const userStats = {
      lessonsCompleted: lessonProgress?.length || 0,
      streakDays: userData.currentStreak || 0,
      coursesCompleted: await getCompletedCourses(user.id),
      portfolioCompletion: userData.portfolio?.[0]?.completionPercentage || 0,
      totalXP: userData.totalXP || 0,
      productsOwned: userData.purchases
        ?.filter((p: any) => p.status === 'completed')
        .map((p: any) => p.productCode) || [],
      communityPosts,
      referrals
    };

    // Check all achievements
    const unlockedAchievements: string[] = userData.badges || [];
    const achievements = Object.values(ACHIEVEMENT_SYSTEM).map(achievement => {
      const isUnlocked = unlockedAchievements.includes(achievement.id) || 
                        checkAchievementUnlocked(achievement, userStats);
      
      return {
        ...achievement,
        isUnlocked,
        unlockedAt: isUnlocked ? new Date().toISOString() : null
      };
    });

    // Separate by status
    const unlocked = achievements.filter(a => a.isUnlocked);
    const locked = achievements.filter(a => !a.isUnlocked && !a.isSecret);
    const secret = achievements.filter(a => !a.isUnlocked && a.isSecret);

    return NextResponse.json({
      achievements: {
        unlocked,
        locked,
        secret: secret.length // Don't reveal secret achievements details
      },
      stats: userStats,
      totalXP: userData.totalXP || 0,
      level: Math.floor((userData.totalXP || 0) / 1000) + 1,
      nextLevelXP: ((Math.floor((userData.totalXP || 0) / 1000) + 1) * 1000)
    });
  } catch (error) {
    logger.error('Get achievements error:', error);
    
    return NextResponse.json(
      { error: 'Failed to get achievements' },
      { status: 500 }
    );
  }
}

// POST /api/achievements/check - Check and unlock new achievements
export async function POST(request: NextRequest) {
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

    // Get current user data
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { trigger, metadata } = body;

    // Get full user stats (similar to GET endpoint)
    const { data: lessonProgress } = await supabase
      .from('LessonProgress')
      .select('completed')
      .eq('userId', user.id)
      .eq('completed', true);

    const { data: purchases } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed');

    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('completionPercentage')
      .eq('userId', user.id)
      .single();

    const userStats = {
      lessonsCompleted: lessonProgress?.length || 0,
      streakDays: userData.currentStreak || 0,
      coursesCompleted: await getCompletedCourses(user.id),
      portfolioCompletion: portfolio?.completionPercentage || 0,
      totalXP: userData.totalXP || 0,
      productsOwned: purchases?.map(p => p.productCode) || [],
      communityPosts: 0,
      referrals: 0,
      customData: metadata
    };

    // Check for newly unlocked achievements
    const currentBadges = userData.badges || [];
    const newlyUnlocked = [];
    let totalXPEarned = 0;
    const currentTotalXP = userData.totalXP || 0;

    for (const achievement of Object.values(ACHIEVEMENT_SYSTEM)) {
      if (!currentBadges.includes(achievement.id) && 
          checkAchievementUnlocked(achievement, userStats)) {
        newlyUnlocked.push(achievement);
        totalXPEarned += achievement.xp;
      }
    }

    const newTotalXP = currentTotalXP + totalXPEarned;

    if (newlyUnlocked.length > 0) {
      // Update user badges and XP
      const newBadges = [...currentBadges, ...newlyUnlocked.map(a => a.id)];

      const { error: updateError } = await supabase
        .from('User')
        .update({
          badges: newBadges,
          totalXP: newTotalXP
        })
        .eq('id', user.id);

      if (updateError) {
        throw new Error('Failed to update achievements');
      }

      // Create XP events for each achievement
      const xpEvents = newlyUnlocked.map(achievement => ({
        id: createId(),
        userId: user.id,
        type: 'achievement_unlocked',
        points: achievement.xp,
        description: `Unlocked achievement: ${achievement.title}`,
        metadata: { achievementId: achievement.id }
      }));

      await supabase.from('XPEvent').insert(xpEvents);
    }

    return NextResponse.json({
      newlyUnlocked,
      totalXPEarned,
      newLevel: Math.floor(newTotalXP / 1000) + 1
    });
  } catch (error) {
    logger.error('Check achievements error:', error);
    
    return NextResponse.json(
      { error: 'Failed to check achievements' },
      { status: 500 }
    );
  }
}
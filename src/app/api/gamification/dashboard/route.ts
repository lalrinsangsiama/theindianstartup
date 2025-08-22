import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { calculateLevel, calculateXPForNextLevel, getLevelTitle } from '@/lib/xp';
import { BADGES, BadgeId } from '@/lib/badges';

export const dynamic = 'force-dynamic';

// GET - Comprehensive gamification dashboard data
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Get user's current stats
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('total_xp, current_streak, longest_streak, current_day, badges, created_at')
      .eq('id', user.id)
      .single();

    if (userError) {
      logger.error('Error fetching user data:', userError);
      return NextResponse.json({
        error: 'Failed to fetch user data'
      }, { status: 500 });
    }

    const totalXP = userData?.total_xp || 0;
    const currentLevel = calculateLevel(totalXP);
    const levelProgress = calculateXPForNextLevel(totalXP);
    const levelTitle = getLevelTitle(currentLevel);
    const userBadges = (userData?.badges as string[]) || [];

    // Get recent XP events (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentXPEvents } = await supabase
      .from('xp_events')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(50);

    // Calculate XP by type
    const xpByType = recentXPEvents?.reduce((acc, event) => {
      if (!acc[event.type]) {
        acc[event.type] = 0;
      }
      acc[event.type] += event.points;
      return acc;
    }, {} as Record<string, number>) || {};

    // Calculate daily XP for last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailyXP = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayStart = new Date(date.setHours(0, 0, 0, 0));
      const dayEnd = new Date(date.setHours(23, 59, 59, 999));
      
      const dayXP = recentXPEvents?.filter(event => {
        const eventDate = new Date(event.created_at);
        return eventDate >= dayStart && eventDate <= dayEnd;
      }).reduce((sum, event) => sum + event.points, 0) || 0;
      
      return {
        date: dayStart.toISOString().split('T')[0],
        xp: dayXP,
      };
    }).reverse();

    // Get course progress
    const { data: courseProgress } = await supabase
      .from('LessonProgress')
      .select(`
        lessonId,
        completed,
        completedAt,
        xpEarned,
        lesson:Lesson!inner(
          id,
          title,
          day,
          module:Module!inner(
            id,
            title,
            product:Product!inner(
              code,
              title
            )
          )
        )
      `)
      .eq('userId', user.id)
      .not('completedAt', 'is', null);

    // Group progress by product
    const progressByProduct = courseProgress?.reduce((acc, progress) => {
      const productCode = progress.lesson.module.product.code;
      if (!acc[productCode]) {
        acc[productCode] = {
          productCode,
          productTitle: progress.lesson.module.product.title,
          completedLessons: 0,
          totalXP: 0,
          lastActivity: null as string | null,
        };
      }
      acc[productCode].completedLessons += 1;
      acc[productCode].totalXP += progress.xpEarned || 0;
      if (!acc[productCode].lastActivity || progress.completedAt > acc[productCode].lastActivity) {
        acc[productCode].lastActivity = progress.completedAt;
      }
      return acc;
    }, {} as Record<string, any>) || {};

    // Get badge progress
    const badgeProgress = Object.entries(BADGES).map(([badgeId, badge]) => {
      const isUnlocked = userBadges.includes(badgeId);
      
      let progress = 0;
      let total = 0;
      
      // Calculate progress based on badge criteria
      switch (badge.criteria.type) {
        case 'day_complete':
          progress = userData?.current_day || 0;
          total = badge.criteria.value as number;
          break;
        case 'streak':
          progress = userData?.current_streak || 0;
          total = badge.criteria.value as number;
          break;
        case 'xp':
          progress = totalXP;
          total = badge.criteria.value as number;
          break;
        default:
          progress = isUnlocked ? 1 : 0;
          total = 1;
      }

      return {
        id: badgeId,
        name: badge.name,
        description: badge.description,
        color: badge.color,
        unlocked: isUnlocked,
        progress: Math.min(progress, total),
        total,
        percentage: Math.min(100, Math.round((progress / total) * 100)),
      };
    });

    // Get leaderboard position (approximate)
    const { data: higherXPUsers, count: higherCount } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true })
      .gt('total_xp', totalXP);

    const leaderboardPosition = (higherCount || 0) + 1;

    // Calculate achievements this week
    const weeklyXP = recentXPEvents?.filter(event => {
      const eventDate = new Date(event.created_at);
      return eventDate >= sevenDaysAgo;
    }).reduce((sum, event) => sum + event.points, 0) || 0;

    const weeklyBadges = userBadges.length; // Simplified - would need badge award dates for accurate count

    // Calculate next milestone
    let nextMilestone = null;
    const nextLevel = currentLevel + 1;
    const nextLevelTitle = getLevelTitle(nextLevel);
    const xpForNextLevel = levelProgress.required - levelProgress.current;
    
    nextMilestone = {
      type: 'level',
      title: `Reach ${nextLevelTitle}`,
      description: `Level ${nextLevel}`,
      progress: levelProgress.current,
      total: levelProgress.required,
      remaining: xpForNextLevel,
    };

    // Check for next badge milestone
    const nextBadge = badgeProgress
      .filter(badge => !badge.unlocked && badge.total > 0)
      .sort((a, b) => (a.total - a.progress) - (b.total - b.progress))[0];

    if (nextBadge && nextBadge.total - nextBadge.progress < xpForNextLevel) {
      nextMilestone = {
        type: 'badge',
        title: nextBadge.name,
        description: nextBadge.description,
        progress: nextBadge.progress,
        total: nextBadge.total,
        remaining: nextBadge.total - nextBadge.progress,
      };
    }

    return NextResponse.json({
      user: {
        totalXP,
        currentLevel,
        levelTitle,
        levelProgress,
        currentStreak: userData?.current_streak || 0,
        longestStreak: userData?.longest_streak || 0,
        currentDay: userData?.current_day || 1,
        totalBadges: userBadges.length,
        memberSince: userData?.created_at,
      },
      activity: {
        dailyXP,
        weeklyXP,
        xpByType,
        recentEvents: recentXPEvents?.slice(0, 10) || [],
      },
      progress: {
        courses: Object.values(progressByProduct),
        badges: badgeProgress,
      },
      achievements: {
        weeklyXP,
        weeklyBadges,
        leaderboardPosition,
      },
      nextMilestone,
    });

  } catch (error) {
    logger.error('Gamification dashboard error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
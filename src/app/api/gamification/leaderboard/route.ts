import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { calculateLevel, getLevelTitle } from '@/lib/xp';

export const dynamic = 'force-dynamic';

// GET - Leaderboard data with different time periods and categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all_time'; // all_time, weekly, monthly
    const category = searchParams.get('category') || 'xp'; // xp, streak, badges
    const limit = parseInt(searchParams.get('limit') || '50');
    
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    let leaderboard = [];
    let userPosition = null;

    if (category === 'xp') {
      if (period === 'all_time') {
        // All-time XP leaderboard
        const { data: users } = await supabase
          .from('users')
          .select('id, name, email, total_xp, current_streak, badges, created_at')
          .not('total_xp', 'is', null)
          .order('total_xp', { ascending: false })
          .limit(limit);

        leaderboard = users?.map((userData, index) => ({
          rank: index + 1,
          userId: userData.id,
          name: userData.name || userData.email?.split('@')[0] || 'Anonymous',
          email: userData.email,
          totalXP: userData.total_xp || 0,
          level: calculateLevel(userData.total_xp || 0),
          levelTitle: getLevelTitle(calculateLevel(userData.total_xp || 0)),
          currentStreak: userData.current_streak || 0,
          badgeCount: (userData.badges as string[])?.length || 0,
          memberSince: userData.created_at,
          isCurrentUser: userData.id === user.id,
        })) || [];

        // Find current user's position
        userPosition = leaderboard.find(entry => entry.isCurrentUser)?.rank || null;

      } else {
        // Weekly/Monthly XP leaderboard from xp_events
        const timeFrame = period === 'weekly' ? 7 : 30;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - timeFrame);

        // Get XP events within time frame, grouped by user
        const { data: xpEvents } = await supabase
          .from('xp_events')
          .select('user_id, points, users!inner(id, name, email, total_xp, current_streak, badges, created_at)')
          .gte('created_at', startDate.toISOString())
          .order('points', { ascending: false });

        // Group by user and sum XP
        const userXPMap = new Map();
        
        xpEvents?.forEach(event => {
          const userId = event.user_id;
          const userData = event.users;
          
          if (!userXPMap.has(userId)) {
            userXPMap.set(userId, {
              userId,
              userData,
              periodXP: 0,
            });
          }
          
          userXPMap.get(userId).periodXP += event.points;
        });

        // Sort by period XP and create leaderboard
        const sortedUsers = Array.from(userXPMap.values())
          .sort((a, b) => b.periodXP - a.periodXP)
          .slice(0, limit);

        leaderboard = sortedUsers.map((entry, index) => ({
          rank: index + 1,
          userId: entry.userId,
          name: entry.userData.name || entry.userData.email?.split('@')[0] || 'Anonymous',
          email: entry.userData.email,
          periodXP: entry.periodXP,
          totalXP: entry.userData.total_xp || 0,
          level: calculateLevel(entry.userData.total_xp || 0),
          levelTitle: getLevelTitle(calculateLevel(entry.userData.total_xp || 0)),
          currentStreak: entry.userData.current_streak || 0,
          badgeCount: (entry.userData.badges as string[])?.length || 0,
          memberSince: entry.userData.created_at,
          isCurrentUser: entry.userId === user.id,
        }));

        userPosition = leaderboard.find(entry => entry.isCurrentUser)?.rank || null;
      }

    } else if (category === 'streak') {
      // Streak leaderboard
      const { data: users } = await supabase
        .from('users')
        .select('id, name, email, total_xp, current_streak, longest_streak, badges, created_at')
        .not('current_streak', 'is', null)
        .order('current_streak', { ascending: false })
        .order('longest_streak', { ascending: false })
        .limit(limit);

      leaderboard = users?.map((userData, index) => ({
        rank: index + 1,
        userId: userData.id,
        name: userData.name || userData.email?.split('@')[0] || 'Anonymous',
        email: userData.email,
        currentStreak: userData.current_streak || 0,
        longestStreak: userData.longest_streak || 0,
        totalXP: userData.total_xp || 0,
        level: calculateLevel(userData.total_xp || 0),
        levelTitle: getLevelTitle(calculateLevel(userData.total_xp || 0)),
        badgeCount: (userData.badges as string[])?.length || 0,
        memberSince: userData.created_at,
        isCurrentUser: userData.id === user.id,
      })) || [];

      userPosition = leaderboard.find(entry => entry.isCurrentUser)?.rank || null;

    } else if (category === 'badges') {
      // Badge leaderboard
      const { data: users } = await supabase
        .from('users')
        .select('id, name, email, total_xp, current_streak, badges, created_at')
        .not('badges', 'is', null);

      const usersWithBadgeCounts = users?.map(userData => ({
        ...userData,
        badgeCount: (userData.badges as string[])?.length || 0,
      }))
      .filter(userData => userData.badgeCount > 0)
      .sort((a, b) => b.badgeCount - a.badgeCount)
      .slice(0, limit) || [];

      leaderboard = usersWithBadgeCounts.map((userData, index) => ({
        rank: index + 1,
        userId: userData.id,
        name: userData.name || userData.email?.split('@')[0] || 'Anonymous',
        email: userData.email,
        badgeCount: userData.badgeCount,
        totalXP: userData.total_xp || 0,
        level: calculateLevel(userData.total_xp || 0),
        levelTitle: getLevelTitle(calculateLevel(userData.total_xp || 0)),
        currentStreak: userData.current_streak || 0,
        memberSince: userData.created_at,
        isCurrentUser: userData.id === user.id,
      }));

      userPosition = leaderboard.find(entry => entry.isCurrentUser)?.rank || null;
    }

    // Get total user count for context
    const { count: totalUsers } = await supabase
      .from('users')
      .select('id', { count: 'exact', head: true });

    // Get leaderboard stats
    const stats = {
      totalUsers: totalUsers || 0,
      period,
      category,
      userPosition,
      topUser: leaderboard[0] || null,
    };

    return NextResponse.json({
      leaderboard,
      stats,
      meta: {
        period,
        category,
        limit,
        count: leaderboard.length,
      },
    });

  } catch (error) {
    logger.error('Leaderboard API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
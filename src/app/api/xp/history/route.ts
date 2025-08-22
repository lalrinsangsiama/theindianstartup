import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { calculateLevel, calculateXPForNextLevel, getLevelTitle } from '@/lib/xp';

export const dynamic = 'force-dynamic';

// GET - Fetch user's XP history and stats
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's current XP stats
    const { data: userData, error: userDataError } = await supabase
      .from('users')
      .select('total_xp, current_streak, current_day, badges')
      .eq('id', user.id)
      .single();

    if (userDataError || !userData) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    // Get XP history
    const { data: xpEvents, error: eventsError } = await supabase
      .from('xp_events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (eventsError) {
      logger.error('Error fetching XP events:', eventsError);
      return NextResponse.json(
        { error: 'Failed to fetch XP history' },
        { status: 500 }
      );
    }

    // Calculate level and progress
    const totalXP = userData.total_xp || 0;
    const currentLevel = calculateLevel(totalXP);
    const levelProgress = calculateXPForNextLevel(totalXP);
    const levelTitle = getLevelTitle(currentLevel);

    // Get XP stats by type
    const { data: xpStats } = await supabase
      .from('xp_events')
      .select('type, points')
      .eq('user_id', user.id);

    const xpByType = xpStats?.reduce((acc, event) => {
      if (!acc[event.type]) {
        acc[event.type] = 0;
      }
      acc[event.type] += event.points;
      return acc;
    }, {} as Record<string, number>) || {};

    // Get recent achievements (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentXP } = await supabase
      .from('xp_events')
      .select('points')
      .eq('user_id', user.id)
      .gte('created_at', sevenDaysAgo.toISOString());

    const xpLastWeek = recentXP?.reduce((sum, event) => sum + event.points, 0) || 0;

    // Transform events for frontend
    const transformedEvents = xpEvents?.map(event => ({
      id: event.id,
      type: event.type,
      points: event.points,
      description: event.description,
      createdAt: event.created_at,
    })) || [];

    return NextResponse.json({
      events: transformedEvents,
      stats: {
        totalXP,
        currentLevel,
        levelTitle,
        levelProgress,
        currentStreak: userData.current_streak || 0,
        currentDay: userData.current_day || 1,
        totalBadges: userData.badges?.length || 0,
        xpLastWeek,
        xpByType,
      },
      pagination: {
        offset,
        limit,
        hasMore: xpEvents?.length === limit,
      },
    });

  } catch (error) {
    logger.error('XP history API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
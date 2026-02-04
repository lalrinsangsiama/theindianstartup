import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Require authentication to view stats
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get total members count
    const { count: totalMembers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get active users today (users who created posts/comments today)
    // BE1 FIX: Refactored from invalid .then() chain to proper await syntax
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch post authors and comment authors in parallel
    const [postsResult, commentsResult] = await Promise.all([
      supabase
        .from('posts')
        .select('author_id')
        .gte('created_at', today.toISOString()),
      supabase
        .from('comments')
        .select('author_id')
        .gte('created_at', today.toISOString())
    ]);

    // Combine and deduplicate user IDs
    const postUsers = postsResult.data?.map(p => p.author_id) || [];
    const commentUserIds = commentsResult.data?.map(c => c.author_id) || [];
    const activeUsers = Array.from(new Set([...postUsers, ...commentUserIds]));

    // Get posts this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const { count: postsThisWeek } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    // Get upcoming expert sessions
    const { count: expertSessions } = await supabase
      .from('expert_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'upcoming')
      .gte('scheduled_at', new Date().toISOString());

    const stats = {
      totalMembers: totalMembers || 0,
      activeToday: activeUsers?.length || 0,
      postsThisWeek: postsThisWeek || 0,
      expertSessions: expertSessions || 0,
    };

    return NextResponse.json(stats);

  } catch (error) {
    logger.error('Community stats error:', error);

    // Return zeros on error instead of fake data
    return NextResponse.json({
      totalMembers: 0,
      activeToday: 0,
      postsThisWeek: 0,
      expertSessions: 0,
    });
  }
}
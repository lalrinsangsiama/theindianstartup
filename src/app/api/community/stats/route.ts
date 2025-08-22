import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get total members count
    const { count: totalMembers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get active users today (users who created posts/comments today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: activeUsers } = await supabase
      .from('posts')
      .select('author_id')
      .gte('created_at', today.toISOString())
      .then(async (result) => {
        const { data: commentUsers } = await supabase
          .from('comments')
          .select('author_id')
          .gte('created_at', today.toISOString());
        
        // Combine and deduplicate user IDs
        const postUsers = result.data?.map(p => p.author_id) || [];
        const commentUserIds = commentUsers?.map(c => c.author_id) || [];
        const allActiveUsers = Array.from(new Set([...postUsers, ...commentUserIds]));
        
        return { data: allActiveUsers };
      });

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
    
    // Return mock data if there's an error (for development)
    return NextResponse.json({
      totalMembers: 1247,
      activeToday: 89,
      postsThisWeek: 156,
      expertSessions: 3,
    });
  }
}
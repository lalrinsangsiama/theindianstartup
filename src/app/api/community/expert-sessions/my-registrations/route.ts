import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

// GET - Get sessions the current user is registered for
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'upcoming';
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);

    // Get user's registrations with session details
    const { data: registrations, error } = await supabase
      .from('expert_session_registrations')
      .select(`
        id,
        registered_at,
        attended,
        session:expert_sessions!expert_session_registrations_session_id_fkey (
          id,
          title,
          description,
          host_id,
          scheduled_at,
          duration_minutes,
          max_attendees,
          status,
          meeting_url,
          host:User!expert_sessions_host_id_fkey (
            name
          )
        )
      `)
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false })
      .limit(limit);

    if (error) {
      logger.error('Error fetching registrations:', error);
      return NextResponse.json(
        { error: 'Failed to fetch registrations' },
        { status: 500 }
      );
    }

    // Filter by status and get registration count for each session
    // Note: Supabase returns single related records, but the type system expects arrays
    // We use 'unknown' to handle this type mismatch
    const sessionsWithCounts = await Promise.all(
      (registrations || [])
        .filter(reg => {
          const session = reg.session as unknown as { status?: string } | null;
          if (!session) return false;
          if (status === 'all') return true;
          return session.status === status;
        })
        .map(async reg => {
          const session = reg.session as unknown as {
            id: string;
            title: string;
            description: string;
            host_id: string;
            scheduled_at: string;
            duration_minutes: number;
            max_attendees: number;
            status: string;
            meeting_url: string;
            host: { name?: string } | null;
          };

          // Get registration count
          const { count } = await supabase
            .from('expert_session_registrations')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', session.id);

          return {
            id: session.id,
            title: session.title,
            description: session.description,
            hostId: session.host_id,
            hostName: session.host?.name || 'Host',
            scheduledAt: session.scheduled_at,
            durationMinutes: session.duration_minutes,
            maxAttendees: session.max_attendees,
            registeredCount: count || 0,
            status: session.status,
            meetingUrl: session.meeting_url,
            registeredAt: reg.registered_at,
            attended: reg.attended,
          };
        })
    );

    return NextResponse.json({
      sessions: sessionsWithCounts,
      total: sessionsWithCounts.length,
    });

  } catch (error) {
    logger.error('My registrations API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

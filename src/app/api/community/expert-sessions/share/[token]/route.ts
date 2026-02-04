import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

// GET - Get session details via shareable link (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;
    const supabase = createClient();

    // Find session by share token
    const { data: session, error } = await supabase
      .from('expert_sessions_with_counts')
      .select('*')
      .eq('share_token', token)
      .single();

    if (error || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Don't expose draft sessions
    if (session.status === 'draft') {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Check if current user is registered (if logged in)
    const { data: { user } } = await supabase.auth.getUser();
    let isRegistered = false;
    let isHost = false;

    if (user) {
      isHost = session.host_id === user.id;

      const { data: registration } = await supabase
        .from('expert_session_registrations')
        .select('id')
        .eq('session_id', session.id)
        .eq('user_id', user.id)
        .single();

      isRegistered = !!registration;
    }

    // Return public session info
    return NextResponse.json({
      session: {
        id: session.id,
        title: session.title,
        description: session.description,
        hostName: session.host_name,
        scheduledAt: session.scheduled_at,
        durationMinutes: session.duration_minutes,
        maxAttendees: session.max_attendees,
        registeredCount: session.registered_count || 0,
        topicTags: session.topic_tags || [],
        status: session.status,
        // Only show recording URL for completed sessions
        recordingUrl: session.status === 'completed' ? session.recording_url : undefined,
        // Only show meeting URL if registered
        meetingUrl: isRegistered ? session.meeting_url : undefined,
      },
      isAuthenticated: !!user,
      isRegistered,
      isHost,
      spotsAvailable: session.max_attendees - (session.registered_count || 0),
    });

  } catch (error) {
    logger.error('Get shared session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

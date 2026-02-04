import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

// POST - Register for a session
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in to register for sessions' },
        { status: 401 }
      );
    }

    // Get session details
    const { data: session, error: sessionError } = await supabase
      .from('expert_sessions_with_counts')
      .select('*')
      .eq('id', id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Check session is upcoming
    if (session.status !== 'upcoming') {
      return NextResponse.json(
        { error: 'This session is no longer accepting registrations' },
        { status: 400 }
      );
    }

    // Check capacity
    if (session.registered_count >= session.max_attendees) {
      return NextResponse.json(
        { error: 'This session is full' },
        { status: 400 }
      );
    }

    // Check if already registered
    const { data: existingReg } = await supabase
      .from('expert_session_registrations')
      .select('id')
      .eq('session_id', id)
      .eq('user_id', user.id)
      .single();

    if (existingReg) {
      return NextResponse.json(
        { error: 'You are already registered for this session' },
        { status: 400 }
      );
    }

    // Check if this came from an invite
    const body = await request.json().catch(() => ({}));
    const inviteToken = body.inviteToken;

    // Create registration
    const { error: registerError } = await supabase
      .from('expert_session_registrations')
      .insert({
        session_id: id,
        user_id: user.id,
      });

    if (registerError) {
      logger.error('Error registering for session:', registerError);
      return NextResponse.json(
        { error: 'Failed to register for session' },
        { status: 500 }
      );
    }

    // If from invite, update invite status
    if (inviteToken) {
      await supabase
        .from('expert_session_invites')
        .update({
          status: 'accepted',
          accepted_at: new Date().toISOString(),
          accepted_by: user.id,
        })
        .eq('invite_token', inviteToken)
        .eq('session_id', id);
    }

    // Award XP for registering (non-critical, ignore errors)
    try {
      await supabase.rpc('award_xp', {
        user_id: user.id,
        points: 10,
        event_type: 'session_registration',
        description: 'Registered for an expert session'
      });
    } catch {
      // XP award is non-critical
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for session',
      meetingUrl: session.meeting_url,
    });

  } catch (error) {
    logger.error('Register for session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Unregister from a session
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if registered
    const { data: registration } = await supabase
      .from('expert_session_registrations')
      .select('id')
      .eq('session_id', id)
      .eq('user_id', user.id)
      .single();

    if (!registration) {
      return NextResponse.json(
        { error: 'You are not registered for this session' },
        { status: 400 }
      );
    }

    // Remove registration
    const { error: deleteError } = await supabase
      .from('expert_session_registrations')
      .delete()
      .eq('session_id', id)
      .eq('user_id', user.id);

    if (deleteError) {
      logger.error('Error unregistering from session:', deleteError);
      return NextResponse.json(
        { error: 'Failed to unregister from session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unregistered from session',
    });

  } catch (error) {
    logger.error('Unregister from session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

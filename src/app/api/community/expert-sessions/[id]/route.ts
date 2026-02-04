import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { updateSessionSchema, validateRequest } from '@/lib/validation-schemas';
import { sanitizeText } from '@/lib/sanitize';

// GET - Get session details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = createClient();

    // Get session with host info and registration count
    const { data: session, error } = await supabase
      .from('expert_sessions_with_counts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Check if current user is registered
    const { data: { user } } = await supabase.auth.getUser();
    let isRegistered = false;
    let isHost = false;

    if (user) {
      isHost = session.host_id === user.id;

      const { data: registration } = await supabase
        .from('expert_session_registrations')
        .select('id')
        .eq('session_id', id)
        .eq('user_id', user.id)
        .single();

      isRegistered = !!registration;
    }

    // Get list of registrations if host
    let registrations: Array<{ userId: string; userName: string; registeredAt: string }> = [];
    if (isHost) {
      const { data: regs } = await supabase
        .from('expert_session_registrations')
        .select(`
          user_id,
          registered_at,
          user:User!expert_session_registrations_user_id_fkey(name)
        `)
        .eq('session_id', id)
        .order('registered_at', { ascending: false });

      registrations = (regs || []).map(r => ({
        userId: r.user_id,
        userName: (r.user as { name?: string })?.name || 'Anonymous',
        registeredAt: r.registered_at,
      }));
    }

    return NextResponse.json({
      session: {
        id: session.id,
        title: session.title,
        description: session.description,
        hostId: session.host_id,
        hostName: session.host_name,
        hostEmail: isHost ? session.host_email : undefined,
        scheduledAt: session.scheduled_at,
        durationMinutes: session.duration_minutes,
        maxAttendees: session.max_attendees,
        registeredCount: session.registered_count || 0,
        topicTags: session.topic_tags || [],
        status: session.status,
        meetingUrl: (isHost || isRegistered) ? session.meeting_url : undefined,
        recordingUrl: session.recording_url,
        shareToken: session.share_token,
        createdAt: session.created_at,
      },
      isRegistered,
      isHost,
      registrations: isHost ? registrations : undefined,
    });

  } catch (error) {
    logger.error('Get session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH - Update session (host only)
export async function PATCH(
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

    // Verify user is the host
    const { data: session } = await supabase
      .from('expert_sessions')
      .select('host_id, status')
      .eq('id', id)
      .single();

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (session.host_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the host can update this session' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input with Zod schema (partial updates)
    const validation = validateRequest(updateSessionSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const validatedData = validation.data;
    const updates: Record<string, unknown> = {};

    // Build updates from validated data with sanitization
    if (validatedData.title !== undefined) {
      updates.title = sanitizeText(validatedData.title);
    }
    if (validatedData.description !== undefined) {
      updates.description = validatedData.description ? sanitizeText(validatedData.description) : null;
    }
    if (validatedData.topicTags !== undefined) {
      updates.topic_tags = validatedData.topicTags?.map(tag => sanitizeText(tag).substring(0, 30)) || [];
    }
    if (validatedData.scheduledAt !== undefined) {
      updates.scheduled_at = validatedData.scheduledAt;
    }
    if (validatedData.durationMinutes !== undefined) {
      updates.duration_minutes = validatedData.durationMinutes;
    }
    if (validatedData.maxAttendees !== undefined) {
      updates.max_attendees = validatedData.maxAttendees;
    }
    if (validatedData.meetingUrl !== undefined) {
      updates.meeting_url = validatedData.meetingUrl || null;
    }
    if (validatedData.recordingUrl !== undefined) {
      updates.recording_url = validatedData.recordingUrl || null;
    }
    if (validatedData.status !== undefined) {
      updates.status = validatedData.status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const { data: updatedSession, error: updateError } = await supabase
      .from('expert_sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      logger.error('Error updating session:', updateError);
      return NextResponse.json(
        { error: 'Failed to update session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      session: updatedSession,
    });

  } catch (error) {
    logger.error('Update session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Cancel/delete session (host only)
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

    // Verify user is the host
    const { data: session } = await supabase
      .from('expert_sessions')
      .select('host_id')
      .eq('id', id)
      .single();

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (session.host_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the host can cancel this session' },
        { status: 403 }
      );
    }

    // Soft delete by setting status to cancelled
    const { error: deleteError } = await supabase
      .from('expert_sessions')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (deleteError) {
      logger.error('Error cancelling session:', deleteError);
      return NextResponse.json(
        { error: 'Failed to cancel session' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Session cancelled',
    });

  } catch (error) {
    logger.error('Delete session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

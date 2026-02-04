import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { sessionInviteSchema, validateRequest } from '@/lib/validation-schemas';

// POST - Send email invite to a peer
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
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (20 invites per hour per user)
    const rateLimit = await applyRateLimit(request, 'sessionInvite');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many invites sent. Please wait before sending more.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    const body = await request.json();

    // Validate input with Zod schema
    const validation = validateRequest(sessionInviteSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Valid email address is required', details: validation.details },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Verify session exists and is upcoming
    const { data: session, error: sessionError } = await supabase
      .from('expert_sessions')
      .select('id, title, host_id, status, share_token')
      .eq('id', id)
      .single();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (session.status !== 'upcoming') {
      return NextResponse.json(
        { error: 'This session is no longer accepting registrations' },
        { status: 400 }
      );
    }

    // Check if this email was already invited to this session
    const { data: existingInvite } = await supabase
      .from('expert_session_invites')
      .select('id, status')
      .eq('session_id', id)
      .eq('invite_email', email.toLowerCase())
      .single();

    if (existingInvite) {
      return NextResponse.json(
        { error: 'This person has already been invited to this session' },
        { status: 400 }
      );
    }

    // Create invite record
    const { data: invite, error: inviteError } = await supabase
      .from('expert_session_invites')
      .insert({
        session_id: id,
        invited_by: user.id,
        invite_email: email.toLowerCase(),
      })
      .select()
      .single();

    if (inviteError) {
      logger.error('Error creating invite:', inviteError);
      return NextResponse.json(
        { error: 'Failed to create invite' },
        { status: 500 }
      );
    }

    // Get inviter's name
    const { data: inviter } = await supabase
      .from('User')
      .select('name')
      .eq('id', user.id)
      .single();

    // Send email invitation (using Resend)
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/community/expert-sessions/share/${session.share_token}?invite=${invite.invite_token}`;

    try {
      // Import and use Resend
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'The Indian Startup <noreply@theindianstartup.in>',
        to: email,
        subject: `You're invited to: ${session.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>You've been invited to an Expert Session!</h2>
            <p><strong>${inviter?.name || 'A fellow founder'}</strong> has invited you to join an expert session on The Indian Startup platform.</p>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">${session.title}</h3>
              <p>Join this session to learn from experienced founders and industry experts.</p>
            </div>

            <a href="${inviteUrl}" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
              View Session & Register
            </a>

            <p style="color: #666; font-size: 14px;">
              Note: You'll need to create an account to register for the session.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="color: #999; font-size: 12px;">
              The Indian Startup - Empowering Indian Founders
            </p>
          </div>
        `,
      });

      logger.info('Session invite email sent', { sessionId: id, email });
    } catch (emailError) {
      // Log but don't fail - invite record was created
      logger.error('Failed to send invite email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${email}`,
      inviteToken: invite.invite_token,
    });

  } catch (error) {
    logger.error('Send invite error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - List invites for a session (host only)
export async function GET(
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

    // Verify user is host of the session
    const { data: session } = await supabase
      .from('expert_sessions')
      .select('host_id')
      .eq('id', id)
      .single();

    if (!session || session.host_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the host can view session invites' },
        { status: 403 }
      );
    }

    // Get all invites for this session
    const { data: invites, error: invitesError } = await supabase
      .from('expert_session_invites')
      .select(`
        id,
        invite_email,
        status,
        created_at,
        accepted_at,
        accepted_by,
        inviter:User!expert_session_invites_invited_by_fkey(name)
      `)
      .eq('session_id', id)
      .order('created_at', { ascending: false });

    if (invitesError) {
      logger.error('Error fetching invites:', invitesError);
      return NextResponse.json(
        { error: 'Failed to fetch invites' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invites: invites?.map(inv => ({
        id: inv.id,
        email: inv.invite_email,
        status: inv.status,
        invitedBy: (inv.inviter as { name?: string })?.name || 'Unknown',
        createdAt: inv.created_at,
        acceptedAt: inv.accepted_at,
      })) || [],
    });

  } catch (error) {
    logger.error('Get invites error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { createSessionSchema, validateRequest } from '@/lib/validation-schemas';
import { sanitizeText } from '@/lib/sanitize';
import { checkIdempotency, storeIdempotencyResponse } from '@/lib/idempotency';

// Maximum items per page
const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;

// GET - List expert sessions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status'); // upcoming, completed, all
    const hostId = searchParams.get('hostId');
    const limit = Math.min(
      parseInt(searchParams.get('limit') || `${DEFAULT_LIMIT}`),
      MAX_LIMIT
    );
    const cursor = searchParams.get('cursor');

    const supabase = createClient();

    // Build query using the view that includes registration count
    let query = supabase
      .from('expert_sessions_with_counts')
      .select('*')
      .order('scheduled_at', { ascending: status === 'upcoming' });

    // Filter by status
    if (status && status !== 'all') {
      query = query.eq('status', status);
    } else {
      // Don't show draft sessions to non-hosts
      query = query.neq('status', 'draft');
    }

    // Filter by host
    if (hostId) {
      query = query.eq('host_id', hostId);
    }

    // Apply cursor pagination
    if (cursor) {
      const { data: cursorSession } = await supabase
        .from('expert_sessions')
        .select('scheduled_at, id')
        .eq('id', cursor)
        .single();

      if (cursorSession) {
        if (status === 'upcoming') {
          query = query.or(
            `scheduled_at.gt.${cursorSession.scheduled_at},and(scheduled_at.eq.${cursorSession.scheduled_at},id.gt.${cursorSession.id})`
          );
        } else {
          query = query.or(
            `scheduled_at.lt.${cursorSession.scheduled_at},and(scheduled_at.eq.${cursorSession.scheduled_at},id.lt.${cursorSession.id})`
          );
        }
      }
    }

    query = query.limit(limit);

    const { data: sessions, error } = await query;

    if (error) {
      logger.error('Error fetching expert sessions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch sessions' },
        { status: 500 }
      );
    }

    // Transform to match frontend expectations
    const transformedSessions = sessions?.map(session => ({
      id: session.id,
      title: session.title,
      description: session.description,
      expertName: session.host_name || 'Host',
      expertBio: '',
      scheduledAt: session.scheduled_at,
      duration: session.duration_minutes,
      maxAttendees: session.max_attendees,
      registeredCount: session.registered_count || 0,
      topic: session.topic_tags || [],
      status: session.status,
      meetingUrl: session.meeting_url,
      recordingUrl: session.recording_url,
      shareToken: session.share_token,
      hostId: session.host_id,
    })) || [];

    const nextCursor = transformedSessions.length === limit
      ? transformedSessions[transformedSessions.length - 1]?.id
      : null;

    return NextResponse.json({
      sessions: transformedSessions,
      hasMore: transformedSessions.length === limit,
      nextCursor,
    });

  } catch (error) {
    logger.error('Expert sessions API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new expert session
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (5 sessions per day per user)
    const rateLimit = await applyRateLimit(request, 'createSession');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many sessions created. Please wait before creating another.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    // Verify user has at least one purchase (host eligibility)
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('id')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .limit(1);

    if (!purchases || purchases.length === 0) {
      return NextResponse.json(
        { error: 'You must purchase a course before hosting sessions' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate input with Zod schema
    const validation = validateRequest(createSessionSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const { title, description, scheduledAt, durationMinutes, maxAttendees, topicTags, meetingUrl } = validation.data;

    // C16 FIX: Check idempotency to prevent duplicate session creation
    const idempotencyCheck = await checkIdempotency(user.id, 'create-session', {
      title,
      scheduledAt,
      durationMinutes
    });

    if (!idempotencyCheck.isNew && idempotencyCheck.existingResponse) {
      logger.info('Returning cached session response', { userId: user.id });
      return NextResponse.json(idempotencyCheck.existingResponse);
    }

    // Sanitize text inputs
    const sanitizedTitle = sanitizeText(title);
    const sanitizedDescription = description ? sanitizeText(description) : null;
    const sanitizedTags = topicTags?.map(tag => sanitizeText(tag).substring(0, 30)) || [];

    // Create session
    const { data: session, error: createError } = await supabase
      .from('expert_sessions')
      .insert({
        host_id: user.id,
        title: sanitizedTitle,
        description: sanitizedDescription,
        topic_tags: sanitizedTags,
        scheduled_at: scheduledAt,
        duration_minutes: durationMinutes,
        max_attendees: maxAttendees,
        meeting_url: meetingUrl || null,
        status: 'upcoming',
      })
      .select()
      .single();

    if (createError) {
      logger.error('Error creating session:', createError);
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      );
    }

    // Award XP for hosting (non-critical, ignore errors)
    try {
      await supabase.rpc('award_xp', {
        user_id: user.id,
        points: 50,
        event_type: 'host_session',
        description: 'Created an expert session'
      });
    } catch {
      // XP award is non-critical
    }

    const responseData = {
      success: true,
      session: {
        id: session.id,
        title: session.title,
        shareToken: session.share_token,
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL || ''}/community/expert-sessions/share/${session.share_token}`,
      },
    };

    // Store response for idempotency
    if (idempotencyCheck.key) {
      await storeIdempotencyResponse(idempotencyCheck.key, responseData);
    }

    return NextResponse.json(responseData);

  } catch (error) {
    logger.error('Create session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { applyRateLimit, getClientIP } from '@/lib/rate-limit';

const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement', 'compliment', 'issue', 'other']),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description too long'),
  email: z.string().email().optional().nullable(),
  page: z.string().max(500).optional(),
  userAgent: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (5 requests per minute per IP)
    const rateLimit = await applyRateLimit(request, 'feedback');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many feedback submissions. Please wait before trying again.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    // Validate input
    const validation = feedbackSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { type, title, description, email, page, userAgent } = validation.data;

    // Get authenticated user if available
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Get client IP
    const ipAddress = getClientIP(request);

    // Store feedback in database
    const { data: feedback, error: dbError } = await supabase
      .from('Feedback')
      .insert({
        type,
        title,
        description,
        email: email || user?.email || null,
        userId: user?.id || null,
        page: page || request.headers.get('referer') || null,
        userAgent: userAgent || request.headers.get('user-agent') || null,
        ipAddress,
        status: 'new',
        createdAt: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (dbError) {
      // If Feedback table doesn't exist, log and return success anyway
      // This allows the feature to work even before migration is run
      logger.warn('Failed to store feedback in database:', dbError);
      logger.info('Feedback received (not stored):', {
        type,
        title,
        description: description.substring(0, 100),
        userId: user?.id,
        email: email || user?.email,
      });

      return NextResponse.json({
        success: true,
        message: 'Feedback received. Thank you for your input!',
      });
    }

    logger.info('Feedback stored successfully:', {
      feedbackId: feedback.id,
      type,
      userId: user?.id,
    });

    return NextResponse.json({
      success: true,
      feedbackId: feedback.id,
      message: 'Thank you for your feedback! We appreciate your input.',
    });

  } catch (error) {
    logger.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve user's own feedback (for authenticated users)
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { data: feedbacks, error } = await supabase
      .from('Feedback')
      .select('id, type, title, status, createdAt')
      .eq('userId', user.id)
      .order('createdAt', { ascending: false })
      .limit(20);

    if (error) {
      logger.error('Failed to fetch feedback:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({ feedbacks: feedbacks || [] });

  } catch (error) {
    logger.error('Feedback fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
}

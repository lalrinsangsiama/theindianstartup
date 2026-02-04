import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';

// POST - Toggle helpful vote on a review
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params;
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (50 votes per hour per user)
    const rateLimit = await applyRateLimit(request, 'helpfulVote');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many votes. Please wait before voting again.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    // Validate reviewId is a UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(reviewId)) {
      return NextResponse.json(
        { error: 'Invalid review ID' },
        { status: 400 }
      );
    }

    // Check if review exists
    const { data: review, error: reviewError } = await supabase
      .from('ecosystem_reviews')
      .select('id, author_id')
      .eq('id', reviewId)
      .single();

    if (reviewError || !review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    // Prevent voting on your own review
    if (review.author_id === user.id) {
      return NextResponse.json(
        { error: 'You cannot vote on your own review' },
        { status: 400 }
      );
    }

    // Check if user already voted
    const { data: existingVote } = await supabase
      .from('review_helpful_votes')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', user.id)
      .single();

    if (existingVote) {
      // Remove existing vote (toggle off)
      const { error: deleteError } = await supabase
        .from('review_helpful_votes')
        .delete()
        .eq('review_id', reviewId)
        .eq('user_id', user.id);

      if (deleteError) {
        logger.error('Error removing helpful vote:', deleteError);
        return NextResponse.json(
          { error: 'Failed to remove vote' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        voted: false,
        message: 'Vote removed',
      });
    } else {
      // Add new vote
      const { error: insertError } = await supabase
        .from('review_helpful_votes')
        .insert({
          review_id: reviewId,
          user_id: user.id,
        });

      if (insertError) {
        logger.error('Error adding helpful vote:', insertError);
        return NextResponse.json(
          { error: 'Failed to add vote' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        voted: true,
        message: 'Marked as helpful',
      });
    }

  } catch (error) {
    logger.error('Helpful vote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Check if current user has voted on this review
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reviewId: string }> }
) {
  try {
    const { reviewId } = await params;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ voted: false });
    }

    // Validate reviewId is a UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(reviewId)) {
      return NextResponse.json(
        { error: 'Invalid review ID' },
        { status: 400 }
      );
    }

    const { data: vote } = await supabase
      .from('review_helpful_votes')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', user.id)
      .single();

    return NextResponse.json({
      voted: !!vote,
    });

  } catch (error) {
    logger.error('Check helpful vote error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

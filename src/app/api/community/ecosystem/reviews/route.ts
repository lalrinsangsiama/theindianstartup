import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { ecosystemReviewSchema, validateRequest } from '@/lib/validation-schemas';
import { sanitizeText, sanitizeHTML } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

// POST - Create a new review
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Apply rate limiting (10 reviews per day per user)
    const rateLimit = await applyRateLimit(request, 'createReview');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many reviews. Please wait before submitting another.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    const body = await request.json();

    // Validate input with Zod schema
    const validation = validateRequest(ecosystemReviewSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const {
      listingId,
      rating,
      title,
      content,
      experienceType,
      applicationDate,
      responseTime,
      isAnonymous,
      anonymousName,
    } = validation.data;

    // Sanitize text inputs
    const sanitizedTitle = sanitizeText(title);
    const sanitizedContent = sanitizeHTML(content, { allowLinks: true });
    const sanitizedAnonName = anonymousName ? sanitizeText(anonymousName) : null;

    // Check if listing exists
    const { data: listing, error: listingError } = await supabase
      .from('ecosystem_listings')
      .select('id')
      .eq('id', listingId)
      .single();

    if (listingError || !listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Check if user already reviewed this listing
    const { data: existingReview } = await supabase
      .from('ecosystem_reviews')
      .select('id')
      .eq('listing_id', listingId)
      .eq('author_id', user.id)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this listing' },
        { status: 400 }
      );
    }

    // Create review
    const { data: review, error: reviewError } = await supabase
      .from('ecosystem_reviews')
      .insert({
        listing_id: listingId,
        author_id: isAnonymous ? null : user.id,
        rating,
        title: sanitizedTitle,
        content: sanitizedContent,
        experience_type: experienceType,
        application_date: applicationDate || null,
        response_time: responseTime || null,
        is_anonymous: isAnonymous,
        anonymous_name: sanitizedAnonName,
        is_approved: true, // Auto-approve for now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (reviewError) {
      logger.error('Error creating review:', reviewError);
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      );
    }

    // Update listing stats (in a real app, this would be done via database triggers)
    const { data: allReviews } = await supabase
      .from('ecosystem_reviews')
      .select('rating')
      .eq('listing_id', listingId)
      .eq('is_approved', true);

    if (allReviews) {
      const totalReviews = allReviews.length;
      const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

      await supabase
        .from('ecosystem_listings')
        .update({
          average_rating: averageRating,
          total_reviews: totalReviews,
          updated_at: new Date().toISOString(),
        })
        .eq('id', listingId);
    }

    // Award XP for writing a review
    await supabase.rpc('award_xp', {
      user_id: user.id,
      points: 25,
      event_type: 'ecosystem_review',
      description: 'Wrote a helpful review in ecosystem directory'
    });

    return NextResponse.json({
      success: true,
      review,
    });

  } catch (error) {
    logger.error('Create review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Fetch reviews for a listing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const filter = searchParams.get('filter') || 'all'; // all, positive, negative, recent
    
    if (!listingId) {
      return NextResponse.json(
        { error: 'Listing ID is required' },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;
    const supabase = createClient();

    // Build query
    let query = supabase
      .from('ecosystem_reviews')
      .select(`
        *,
        author:users!ecosystem_reviews_author_id_fkey(
          id,
          name,
          avatar
        )
      `)
      .eq('listing_id', listingId)
      .eq('is_approved', true)
      .range(offset, offset + limit - 1);

    // Apply filters
    if (filter === 'positive') {
      query = query.gte('rating', 4);
    } else if (filter === 'negative') {
      query = query.lte('rating', 3);
    }

    // Apply sorting
    if (filter === 'recent') {
      query = query.order('created_at', { ascending: false });
    } else {
      query = query.order('helpful_count', { ascending: false });
    }

    const { data: reviews, error } = await query;

    if (error) {
      logger.error('Error fetching reviews:', error);
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    // Transform data
    const transformedReviews = reviews?.map(review => ({
      id: review.id,
      rating: review.rating,
      title: review.title,
      content: review.content,
      experienceType: review.experience_type,
      applicationDate: review.application_date,
      responseTime: review.response_time,
      isAnonymous: review.is_anonymous,
      anonymousName: review.anonymous_name,
      author: review.is_anonymous ? null : {
        name: review.author?.name,
        avatar: review.author?.avatar,
      },
      helpfulCount: review.helpful_count,
      createdAt: review.created_at,
      isVerified: review.is_verified,
    })) || [];

    return NextResponse.json({
      reviews: transformedReviews,
      hasMore: reviews?.length === limit,
      page,
    });

  } catch (error) {
    logger.error('Fetch reviews error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
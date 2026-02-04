import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { applyRateLimit } from '@/lib/rate-limit';
import { ecosystemListingSchema, validateRequest } from '@/lib/validation-schemas';
import { escapeLikePattern, sanitizeText, sanitizeHTML } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

// GET - Fetch ecosystem listings with filtering and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');

    // Parse and validate pagination params with bounds
    const rawPage = parseInt(searchParams.get('page') || '1');
    const rawLimit = parseInt(searchParams.get('limit') || '20');
    const page = Math.max(1, Math.min(1000, isNaN(rawPage) ? 1 : rawPage)); // 1-1000
    const limit = Math.max(1, Math.min(100, isNaN(rawLimit) ? 20 : rawLimit)); // 1-100

    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';

    // Validate minRating bounds (0-5)
    const rawMinRating = parseFloat(searchParams.get('minRating') || '0');
    const minRating = Math.max(0, Math.min(5, isNaN(rawMinRating) ? 0 : rawMinRating));

    const sortBy = searchParams.get('sortBy') || 'rating'; // rating, reviews, recent, name

    const offset = (page - 1) * limit;
    const supabase = createClient();

    // Build query
    let query = supabase
      .from('ecosystem_listings')
      .select(`
        id,
        name,
        description,
        category,
        sub_category,
        logo_url,
        website,
        city,
        state,
        tags,
        average_rating,
        total_reviews,
        total_views,
        is_verified,
        funding_amount,
        equity_taken,
        program_duration,
        loan_types,
        interest_rates,
        eligibility_info
      `)
      .eq('is_active', true);

    // If fetching by ID, return single listing
    if (listingId) {
      query = query.eq('id', listingId);
    } else {
      query = query.range(offset, offset + limit - 1);
    }

    // Apply filters (only when not fetching by ID)
    if (!listingId && category !== 'all') {
      query = query.eq('category', category);
    }

    if (search) {
      const escapedSearch = escapeLikePattern(search);
      query = query.or(`name.ilike.%${escapedSearch}%,description.ilike.%${escapedSearch}%`);
    }

    if (location && location !== 'All India') {
      const escapedLocation = escapeLikePattern(location);
      query = query.or(`city.ilike.%${escapedLocation}%,state.ilike.%${escapedLocation}%`);
    }

    if (minRating > 0) {
      query = query.gte('average_rating', minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        query = query.order('average_rating', { ascending: false });
        break;
      case 'reviews':
        query = query.order('total_reviews', { ascending: false });
        break;
      case 'recent':
        query = query.order('created_at', { ascending: false });
        break;
      case 'name':
        query = query.order('name', { ascending: true });
        break;
      default:
        query = query.order('average_rating', { ascending: false });
    }

    const { data: listings, error } = await query;

    if (error) {
      logger.error('Error fetching listings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: 500 }
      );
    }

    // Transform data to match frontend expectations
    const transformedListings = listings?.map(listing => ({
      id: listing.id,
      name: listing.name,
      description: listing.description,
      category: listing.category,
      subCategory: listing.sub_category,
      logoUrl: listing.logo_url,
      website: listing.website,
      city: listing.city,
      state: listing.state,
      tags: listing.tags || [],
      averageRating: listing.average_rating || 0,
      totalReviews: listing.total_reviews || 0,
      totalViews: listing.total_views || 0,
      isVerified: listing.is_verified || false,
      fundingAmount: listing.funding_amount,
      equityTaken: listing.equity_taken,
      programDuration: listing.program_duration,
      loanTypes: listing.loan_types,
      interestRates: listing.interest_rates,
      eligibilityInfo: listing.eligibility_info,
    })) || [];

    return NextResponse.json({
      listings: transformedListings,
      hasMore: listings?.length === limit,
      page,
      total: transformedListings.length,
    });

  } catch (error) {
    logger.error('Listings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new listing (for admin/verified users)
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

    // Apply rate limiting (5 listings per day per user)
    const rateLimit = await applyRateLimit(request, 'createListing');
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait before submitting another.' },
        { status: 429, headers: rateLimit.headers }
      );
    }

    const listingData = await request.json();

    // Validate input with Zod schema
    const validation = validateRequest(ecosystemListingSchema, listingData);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.details },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Sanitize text inputs
    const sanitizedName = sanitizeText(validatedData.name);
    const sanitizedDescription = validatedData.description ? sanitizeHTML(validatedData.description, { allowLinks: true }) : null;
    const sanitizedTags = validatedData.tags?.map(tag => sanitizeText(tag).substring(0, 30)) || [];
    const sanitizedEligibility = validatedData.eligibilityInfo ? sanitizeText(validatedData.eligibilityInfo) : null;
    const sanitizedProcess = validatedData.applicationProcess ? sanitizeText(validatedData.applicationProcess) : null;

    // Create listing (will need approval)
    const { data: listing, error: listingError } = await supabase
      .from('ecosystem_listings')
      .insert({
        name: sanitizedName,
        description: sanitizedDescription,
        category: validatedData.category,
        sub_category: validatedData.subCategory,
        website: validatedData.website,
        email: validatedData.email,
        phone: validatedData.phone,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        country: 'India',
        tags: sanitizedTags,
        eligibility_info: sanitizedEligibility,
        application_process: sanitizedProcess,
        documents_required: validatedData.documentsRequired || [],
        funding_amount: validatedData.fundingAmount,
        equity_taken: validatedData.equityTaken,
        program_duration: validatedData.programDuration,
        batch_size: validatedData.batchSize,
        loan_types: validatedData.loanTypes || [],
        interest_rates: validatedData.interestRates,
        submitted_by: user.id,
        is_verified: false, // Requires manual verification
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (listingError) {
      logger.error('Error creating listing:', listingError);
      return NextResponse.json(
        { error: 'Failed to create listing' },
        { status: 500 }
      );
    }

    // Award XP for contributing to the directory
    await supabase.rpc('award_xp', {
      user_id: user.id,
      points: 50,
      event_type: 'ecosystem_contribution',
      description: 'Added a new listing to the ecosystem directory'
    });

    return NextResponse.json({
      success: true,
      listing,
      message: 'Listing submitted for review. It will be published after verification.',
    });

  } catch (error) {
    logger.error('Create listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
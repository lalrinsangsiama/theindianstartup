import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { escapeLikePattern } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

/**
 * Main ecosystem API endpoint
 * Forwards to listings API for backward compatibility
 * GET /api/community/ecosystem - Returns ecosystem listings with filtering
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate pagination params with bounds
    const rawPage = parseInt(searchParams.get('page') || '1');
    const rawLimit = parseInt(searchParams.get('limit') || '20');
    const page = Math.max(1, Math.min(1000, isNaN(rawPage) ? 1 : rawPage));
    const limit = Math.max(1, Math.min(100, isNaN(rawLimit) ? 20 : rawLimit));

    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';

    // Validate minRating bounds (0-5)
    const rawMinRating = parseFloat(searchParams.get('minRating') || '0');
    const minRating = Math.max(0, Math.min(5, isNaN(rawMinRating) ? 0 : rawMinRating));

    const sortBy = searchParams.get('sortBy') || 'rating';
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
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category !== 'all') {
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
      logger.error('Error fetching ecosystem listings:', error);
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: 500 }
      );
    }

    // Transform data to match frontend expectations (camelCase)
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
    logger.error('Ecosystem API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

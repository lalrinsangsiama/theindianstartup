import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Fetch ecosystem listings with filtering and search
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const minRating = parseFloat(searchParams.get('minRating') || '0');
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
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category !== 'all') {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%, description.ilike.%${search}%, tags.cs.{${search}}`);
    }

    if (location && location !== 'All India') {
      query = query.or(`city.ilike.%${location}%, state.ilike.%${location}%`);
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
      console.error('Error fetching listings:', error);
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
    console.error('Listings API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new listing (for admin/verified users)
export async function POST(request: NextRequest) {
  try {
    const listingData = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate required fields
    const { name, description, category, website, city, state } = listingData;
    
    if (!name || !description || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, category' },
        { status: 400 }
      );
    }

    // Create listing (will need approval)
    const { data: listing, error: listingError } = await supabase
      .from('ecosystem_listings')
      .insert({
        name,
        description,
        category,
        sub_category: listingData.subCategory,
        website,
        email: listingData.email,
        phone: listingData.phone,
        address: listingData.address,
        city,
        state,
        country: 'India',
        tags: listingData.tags || [],
        eligibility_info: listingData.eligibilityInfo,
        application_process: listingData.applicationProcess,
        documents_required: listingData.documentsRequired || [],
        funding_amount: listingData.fundingAmount,
        equity_taken: listingData.equityTaken,
        program_duration: listingData.programDuration,
        batch_size: listingData.batchSize,
        loan_types: listingData.loanTypes || [],
        interest_rates: listingData.interestRates,
        is_verified: false, // Requires manual verification
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (listingError) {
      console.error('Error creating listing:', listingError);
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
    console.error('Create listing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
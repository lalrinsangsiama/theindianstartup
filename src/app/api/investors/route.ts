import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET /api/investors - Get comprehensive investor database with real, current data
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has access to P3 course (Funding Mastery)
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .in('productCode', ['P3', 'ALL_ACCESS']);

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json(
        { 
          error: 'Access Denied', 
          message: 'Purchase P3: Funding Mastery or All-Access Bundle to access the investor database with 37+ verified investors'
        },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    
    // Search and filter parameters
    const query = url.searchParams.get('query') || '';
    const category = url.searchParams.get('category') || '';
    const city = url.searchParams.get('city') || '';
    const stage = url.searchParams.get('stage') || '';
    const sector = url.searchParams.get('sector') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);

    // Use our comprehensive search function
    const { data: investors, error } = await supabase
      .rpc('search_investors', {
        p_query: query || null,
        p_category: category || null,
        p_city: city || null,
        p_investment_stage: stage || null,
        p_sector: sector || null,
        p_limit: limit
      });

    if (error) {
      logger.error('Error searching investors:', error);
      return NextResponse.json(
        { error: 'Failed to fetch investors' },
        { status: 500 }
      );
    }

    // Get categories for filters
    const { data: categories, error: categoriesError } = await supabase
      .from('investor_categories')
      .select('name, description')
      .order('name');

    if (categoriesError) {
      logger.error('Error fetching categories:', categoriesError);
    }

    // Get unique cities, stages, and sectors for filters
    const { data: filterData, error: filterError } = await supabase
      .from('investors')
      .select('city, investment_stage, sectors')
      .eq('is_active', true);

    let uniqueCities: string[] = [];
    let uniqueStages: string[] = [];
    let uniqueSectors: string[] = [];

    if (!filterError && filterData) {
      uniqueCities = [...new Set(filterData.map(i => i.city).filter(Boolean))];
      uniqueStages = [...new Set(filterData.flatMap(i => i.investment_stage || []))];
      uniqueSectors = [...new Set(filterData.flatMap(i => i.sectors || []))];
    }

    return NextResponse.json({
      success: true,
      data: {
        investors: investors || [],
        total: investors?.length || 0,
        categories: categories || [],
        filters: {
          cities: uniqueCities.sort(),
          stages: uniqueStages.sort(),
          sectors: uniqueSectors.sort()
        },
        appliedFilters: {
          query,
          category,
          city,
          stage,
          sector,
          limit
        }
      }
    });

  } catch (error) {
    logger.error('Investor API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/investors - Get detailed investor information by ID
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user has access to P3 course
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .in('productCode', ['P3', 'ALL_ACCESS']);

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json(
        { 
          error: 'Access Denied', 
          message: 'Purchase P3: Funding Mastery to access detailed investor information'
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { investorId } = body;

    if (!investorId) {
      return NextResponse.json(
        { error: 'Investor ID is required' },
        { status: 400 }
      );
    }

    const { data: investor, error } = await supabase
      .rpc('get_investor_details', {
        p_investor_id: investorId
      });

    if (error) {
      logger.error('Error fetching investor details:', error);
      return NextResponse.json(
        { error: 'Failed to fetch investor details' },
        { status: 500 }
      );
    }

    if (!investor || investor.length === 0) {
      return NextResponse.json(
        { error: 'Investor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: investor[0]
    });

  } catch (error) {
    logger.error('Investor details API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
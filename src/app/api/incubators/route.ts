import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { errorResponse } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

// GET /api/incubators - Get comprehensive incubator database with real, current data
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

    // Check if user has access to P3 course (Funding Mastery) or any startup course with incubator access
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .in('productCode', ['P3', 'P7', 'P8', 'ALL_ACCESS']); // P3 Funding, P7 State Schemes, P8 Data Room, or All Access

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json(
        { 
          error: 'Access Denied', 
          message: 'Purchase P3: Funding Mastery, P7: State Schemes, P8: Data Room, or All-Access Bundle to access the incubator database with 18+ verified programs'
        },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    
    // Search and filter parameters
    const query = url.searchParams.get('query') || '';
    const category = url.searchParams.get('category') || '';
    const city = url.searchParams.get('city') || '';
    const sector = url.searchParams.get('sector') || '';
    const stage = url.searchParams.get('stage') || '';
    const type = url.searchParams.get('type') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);

    // Use our comprehensive search function
    const { data: incubators, error } = await supabase
      .rpc('search_incubators', {
        p_query: query || null,
        p_category: category || null,
        p_city: city || null,
        p_sector: sector || null,
        p_stage: stage || null,
        p_type: type || null,
        p_limit: limit
      });

    if (error) {
      console.error('Error searching incubators:', error);
      return errorResponse('Failed to fetch incubators', 500, error);
    }

    // Get categories for filters
    const { data: categories, error: categoriesError } = await supabase
      .from('incubator_categories')
      .select('name, description')
      .order('name');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
    }

    // Get unique cities, sectors, and stages for filters
    const { data: filterData, error: filterError } = await supabase
      .from('incubators')
      .select('city, sectors, stage_focus, type')
      .eq('is_active', true);

    let uniqueCities: string[] = [];
    let uniqueSectors: string[] = [];
    let uniqueStages: string[] = [];
    let uniqueTypes: string[] = [];

    if (!filterError && filterData) {
      uniqueCities = [...new Set(filterData.map(i => i.city).filter(Boolean))];
      uniqueSectors = [...new Set(filterData.flatMap(i => i.sectors || []))];
      uniqueStages = [...new Set(filterData.flatMap(i => i.stage_focus || []))];
      uniqueTypes = [...new Set(filterData.map(i => i.type).filter(Boolean))];
    }

    return NextResponse.json({
      success: true,
      data: {
        incubators: incubators || [],
        total: incubators?.length || 0,
        categories: categories || [],
        filters: {
          cities: uniqueCities.sort(),
          sectors: uniqueSectors.sort(),
          stages: uniqueStages.sort(),
          types: uniqueTypes.sort()
        },
        appliedFilters: {
          query,
          category,
          city,
          sector,
          stage,
          type,
          limit
        }
      }
    });

  } catch (error) {
    console.error('Incubator API error:', error);
    return errorResponse('Internal server error', 500, error);
  }
}

// POST /api/incubators - Get detailed incubator information by ID
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

    // Check if user has access to incubator database
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('productCode')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .in('productCode', ['P3', 'P7', 'P8', 'ALL_ACCESS']);

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json(
        { 
          error: 'Access Denied', 
          message: 'Purchase required courses to access detailed incubator information'
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { incubatorId } = body;

    if (!incubatorId) {
      return NextResponse.json(
        { error: 'Incubator ID is required' },
        { status: 400 }
      );
    }

    const { data: incubator, error } = await supabase
      .rpc('get_incubator_details', {
        p_incubator_id: incubatorId
      });

    if (error) {
      console.error('Error fetching incubator details:', error);
      return errorResponse('Failed to fetch incubator details', 500, error);
    }

    if (!incubator || incubator.length === 0) {
      return NextResponse.json(
        { error: 'Incubator not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: incubator[0]
    });

  } catch (error) {
    console.error('Incubator details API error:', error);
    return errorResponse('Internal server error', 500, error);
  }
}
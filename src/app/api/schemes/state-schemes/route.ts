import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { checkRateLimit } from '@/lib/rate-limit';

// State Schemes API - Comprehensive database access for P7 course
export async function GET(request: NextRequest) {
  // SECURITY: Apply rate limiting to prevent data scraping
  const rateLimitResponse = await checkRateLimit(request, 'api');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const { searchParams } = new URL(request.url);
    const stateCode = searchParams.get('state');
    const sector = searchParams.get('sector');
    const schemeType = searchParams.get('type');
    const minAmount = searchParams.get('min_amount');
    const maxAmount = searchParams.get('max_amount');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Build query with filters
    let query = supabase
      .from('state_schemes')
      .select(`
        id,
        scheme_name,
        state_code,
        state_name,
        department,
        ministry,
        scheme_type,
        sector,
        min_grant_amount,
        max_grant_amount,
        subsidy_percentage,
        interest_subvention,
        eligibility_criteria,
        application_process,
        documents_required,
        processing_time,
        online_application,
        application_portal,
        contact_person,
        contact_email,
        contact_phone,
        office_address,
        success_stories,
        recent_updates,
        special_provisions,
        scheme_start_date,
        scheme_end_date,
        application_start,
        application_end,
        created_at,
        updated_at
      `)
      .eq('is_active', true);

    // Apply filters
    if (stateCode) {
      query = query.eq('state_code', stateCode.toUpperCase());
    }
    
    if (sector) {
      query = query.or(`sector.eq.${sector},sector.eq.all`);
    }
    
    if (schemeType) {
      query = query.eq('scheme_type', schemeType);
    }
    
    if (minAmount) {
      query = query.gte('min_grant_amount', parseInt(minAmount));
    }
    
    if (maxAmount) {
      query = query.lte('max_grant_amount', parseInt(maxAmount));
    }

    // Apply pagination
    const offset = (page - 1) * limit;
    query = query.range(offset, offset + limit - 1);
    
    // Order by grant amount (highest first)
    query = query.order('max_grant_amount', { ascending: false });
    
    const { data: schemes, error } = await query;
    
    if (error) {
      console.error('State schemes fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch state schemes' }, 
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('state_schemes')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true);

    // Apply same filters for count
    if (stateCode) countQuery = countQuery.eq('state_code', stateCode.toUpperCase());
    if (sector) countQuery = countQuery.or(`sector.eq.${sector},sector.eq.all`);
    if (schemeType) countQuery = countQuery.eq('scheme_type', schemeType);
    if (minAmount) countQuery = countQuery.gte('min_grant_amount', parseInt(minAmount));
    if (maxAmount) countQuery = countQuery.lte('max_grant_amount', parseInt(maxAmount));

    const { count } = await countQuery;

    // Get aggregated statistics
    const statsQuery = supabase
      .from('state_schemes')
      .select('scheme_type, sector, max_grant_amount')
      .eq('is_active', true);
      
    const { data: statsData } = await statsQuery;
    
    const stats = {
      total_schemes: count || 0,
      scheme_types: [...new Set(statsData?.map(s => s.scheme_type))],
      sectors: [...new Set(statsData?.map(s => s.sector))],
      total_funding: statsData?.reduce((sum, s) => sum + (s.max_grant_amount || 0), 0) || 0,
      states_covered: [...new Set(schemes?.map(s => s.state_name))].length
    };

    return NextResponse.json({
      schemes: schemes || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      },
      stats,
      filters: {
        state: stateCode,
        sector,
        type: schemeType,
        min_amount: minAmount,
        max_amount: maxAmount
      }
    });

  } catch (error) {
    console.error('State schemes API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get state-wise summary statistics
export async function POST(request: NextRequest) {
  // SECURITY: Apply rate limiting to prevent data scraping
  const rateLimitResponse = await checkRateLimit(request, 'api');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body = await request.json();
    const { states = [], sectors = [] } = body;
    
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Use the database function for advanced filtering
    const { data, error } = await supabase
      .rpc('get_schemes_by_criteria', {
        p_state_code: states.length === 1 ? states[0] : null,
        p_sector: sectors.length === 1 ? sectors[0] : null,
        p_scheme_type: null,
        p_min_amount: null,
        p_max_amount: null
      });

    if (error) {
      console.error('State schemes RPC error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch scheme analysis' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({
      analysis: data || [],
      summary: {
        total_schemes: data?.length || 0,
        total_funding: data?.reduce((sum: number, scheme: any) => 
          sum + (scheme.max_amount || 0), 0) || 0,
        avg_subsidy: data?.reduce((sum: number, scheme: any) => 
          sum + (scheme.subsidy_percentage || 0), 0) / (data?.length || 1) || 0
      }
    });

  } catch (error) {
    console.error('State schemes analysis API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
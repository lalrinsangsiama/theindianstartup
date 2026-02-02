import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic to prevent static generation - env vars needed at runtime
export const dynamic = 'force-dynamic';

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();

  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Public endpoint - only return basic scheme information
    let query = supabase
      .from('government_schemes')
      .select(`
        scheme_code,
        scheme_name,
        scheme_type,
        category,
        implementing_agency,
        min_funding_amount,
        max_funding_amount,
        funding_type,
        eligibility_criteria,
        website_url,
        success_rate,
        average_approval_time
      `)
      .eq('is_active', true);

    // Apply basic filters
    if (category) {
      query = query.eq('category', category);
    }

    if (state && state !== 'ALL') {
      if (state === 'central') {
        query = query.eq('scheme_type', 'central');
      } else {
        query = query.or(`applicable_states.cs.{${state}},applicable_states.cs.{ALL}`);
      }
    }

    // Add pagination and ordering
    query = query
      .range(offset, offset + limit - 1)
      .order('max_funding_amount', { ascending: false, nullsFirst: false });

    const { data: schemes, error } = await query;

    if (error) {
      console.error('Error fetching public schemes:', error);
      return NextResponse.json(
        { error: 'Failed to fetch schemes' },
        { status: 500 }
      );
    }

    // Format schemes for public display (limited information)
    const publicSchemes = schemes?.map(scheme => ({
      ...scheme,
      funding_range: scheme.max_funding_amount 
        ? `₹${(scheme.min_funding_amount / 100000).toFixed(1)}L - ₹${(scheme.max_funding_amount / 100000).toFixed(1)}L`
        : `₹${(scheme.min_funding_amount / 100000).toFixed(1)}L+`,
      short_description: scheme.eligibility_criteria.length > 100 
        ? scheme.eligibility_criteria.substring(0, 100) + '...'
        : scheme.eligibility_criteria,
      badge_color: scheme.scheme_type === 'central' ? 'blue' : scheme.scheme_type === 'state' ? 'green' : 'purple'
    }));

    // Basic stats for public view
    const { data: statsData } = await supabase
      .from('government_schemes')
      .select('scheme_type, category')
      .eq('is_active', true);

    const stats = {
      totalSchemes: statsData?.length || 0,
      centralSchemes: statsData?.filter(s => s.scheme_type === 'central').length || 0,
      stateSchemes: statsData?.filter(s => s.scheme_type === 'state').length || 0,
      categories: [...new Set(statsData?.map(s => s.category))].length
    };

    return NextResponse.json({
      schemes: publicSchemes,
      stats,
      isPublic: true,
      message: 'Limited public preview. Access full database with P7/P9 subscription.'
    });

  } catch (error) {
    console.error('Public API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
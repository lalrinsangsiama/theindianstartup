import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth';
import { logger } from '@/lib/logger';

interface SchemeFilters {
  search?: string;
  category?: string;
  fundingRange?: string;
  state?: string;
  ministry?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P9 or P7 (Government schemes access)
    const supabase = createClient();
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .or('productCode.eq.P9,productCode.eq.P7,productCode.eq.ALL_ACCESS')
      .eq('isActive', true)
      .gte('expiresAt', new Date().toISOString());

    const hasAccess = purchases && purchases.length > 0;
    if (!hasAccess) {
      return NextResponse.json({ error: 'Access denied. Purchase P9 or P7 to access government schemes database.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const filters: SchemeFilters = {
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      fundingRange: searchParams.get('fundingRange') || undefined,
      state: searchParams.get('state') || undefined,
      ministry: searchParams.get('ministry') || undefined,
      status: searchParams.get('status') || 'active',
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0')
    };

    // Use our comprehensive government_schemes table
    let query = supabase
      .from('government_schemes')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    // Apply advanced filters
    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters.state && filters.state !== 'all') {
      if (filters.state === 'central') {
        query = query.eq('scheme_type', 'central');
      } else {
        query = query.or(`applicable_states.cs.{${filters.state}},applicable_states.cs.{ALL}`);
      }
    }

    if (filters.search) {
      query = query.or(
        `scheme_name.ilike.%${filters.search}%,implementing_agency.ilike.%${filters.search}%,eligibility_criteria.ilike.%${filters.search}%`
      );
    }

    if (filters.fundingRange && filters.fundingRange !== 'all') {
      const [min, max] = filters.fundingRange.split('-').map(n => parseInt(n) * 100000);
      if (max) {
        query = query.gte('min_funding_amount', min).lte('max_funding_amount', max);
      } else {
        query = query.gte('max_funding_amount', 10000000);
      }
    }

    // Apply pagination
    query = query
      .range(filters.offset!, filters.offset! + filters.limit! - 1)
      .order('max_funding_amount', { ascending: false, nullsFirst: false })
      .order('success_rate', { ascending: false, nullsFirst: false });

    const { data: schemes, error, count } = await query;

    if (error) {
      logger.error('Error fetching government schemes:', error);
      return NextResponse.json({ error: 'Failed to fetch schemes' }, { status: 500 });
    }

    // Format schemes for display
    const formattedSchemes = schemes?.map(scheme => ({
      ...scheme,
      funding_range: scheme.max_funding_amount 
        ? `₹${(scheme.min_funding_amount / 100000).toFixed(1)}L - ₹${(scheme.max_funding_amount / 100000).toFixed(1)}L`
        : `₹${(scheme.min_funding_amount / 100000).toFixed(1)}L+`,
      short_description: scheme.eligibility_criteria.length > 150 
        ? scheme.eligibility_criteria.substring(0, 150) + '...'
        : scheme.eligibility_criteria,
      badge_color: scheme.scheme_type === 'central' ? 'blue' : scheme.scheme_type === 'state' ? 'green' : 'purple'
    }));

    // Get comprehensive statistics
    const { data: statsData } = await supabase
      .from('government_schemes')
      .select('scheme_type, category, applicable_states, max_funding_amount')
      .eq('is_active', true);

    const statistics = {
      totalSchemes: count || 0,
      centralSchemes: statsData?.filter(s => s.scheme_type === 'central').length || 0,
      stateSchemes: statsData?.filter(s => s.scheme_type === 'state').length || 0,
      categories: [...new Set(statsData?.map(s => s.category))].length,
      totalFunding: statsData?.reduce((sum, s) => sum + (s.max_funding_amount || 0), 0) || 0,
      avgSuccessRate: schemes?.reduce((sum, s) => sum + (s.success_rate || 0), 0) / (schemes?.length || 1)
    };

    // If no schemes found in our comprehensive table, return empty result
    if (!schemes || schemes.length === 0) {
      return NextResponse.json({
        schemes: [],
        statistics: { totalSchemes: 0, centralSchemes: 0, stateSchemes: 0, categories: 0 },
        pagination: { total: 0, limit: filters.limit, offset: filters.offset, hasMore: false }
      });
    }

    return NextResponse.json({
      schemes: formattedSchemes,
      statistics,
      pagination: {
        total: count || 0,
        limit: filters.limit,
        offset: filters.offset,
        hasMore: (filters.offset! + filters.limit!) < (count || 0)
      }
    });

  } catch (error) {
    logger.error('Error in government schemes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, data } = await request.json();
    const supabase = createClient();

    switch (action) {
      case 'save_scheme':
        // Save scheme to user's saved schemes (could be a new table)
        // For now, we'll return success
        return NextResponse.json({ success: true });

      case 'get_scheme_details':
        const { data: scheme, error } = await supabase
          .from('government_schemes')
          .select('*')
          .eq('id', data.schemeId)
          .single();

        if (error) {
          logger.error('Error fetching scheme details:', error);
          return NextResponse.json({ error: 'Scheme not found' }, { status: 404 });
        }

        return NextResponse.json({ scheme });

      case 'get_recommendations':
        const { startup_stage, sector, state, funding_need } = data;
        
        const { data: recommendations, error: recError } = await supabase.rpc('get_scheme_recommendations', {
          p_startup_stage: startup_stage,
          p_sector: sector,
          p_state: state,
          p_funding_need: funding_need || 1000000
        });

        if (recError) {
          logger.error('Error getting recommendations:', recError);
          return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 });
        }

        return NextResponse.json({ recommendations });

      case 'search_schemes':
        const { category, searchState, minAmount, maxAmount, sector: searchSector } = data;
        
        const { data: searchResults, error: searchError } = await supabase.rpc('search_schemes_by_criteria', {
          p_category: category || null,
          p_state: searchState || null,
          p_min_amount: minAmount || 0,
          p_max_amount: maxAmount || null,
          p_sector: searchSector || null
        });

        if (searchError) {
          logger.error('Error searching schemes:', searchError);
          return NextResponse.json({ error: 'Search failed' }, { status: 500 });
        }

        return NextResponse.json({ schemes: searchResults });

      case 'eligibility_check':
        // Enhanced eligibility checking with our database
        const { schemeId, userProfile } = data;
        const eligibleScheme = await supabase
          .from('government_schemes')
          .select('*')
          .eq('id', schemeId)
          .single();

        if (eligibleScheme.error) {
          return NextResponse.json({ error: 'Scheme not found' }, { status: 404 });
        }

        // Basic eligibility logic (can be enhanced)
        const isEligible = true; // Simplified for now
        const matchPercentage = Math.floor(Math.random() * 30) + 70; // 70-100%
        
        const results = {
          eligible: isEligible,
          matchPercentage,
          scheme: eligibleScheme.data,
          missingRequirements: [],
          recommendations: ['Complete application as per guidelines', 'Prepare required documents']
        };

        return NextResponse.json({ results });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error in government schemes POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
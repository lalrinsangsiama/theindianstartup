import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@supabase/supabase-js';

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
    const type = searchParams.get('type'); // 'incubator', 'government', 'angel', 'vc'
    const sector = searchParams.get('sector');
    const stage = searchParams.get('stage');
    const location = searchParams.get('location');
    const minFunding = searchParams.get('minFunding');
    const maxFunding = searchParams.get('maxFunding');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build the query
    let query = supabase
      .from('funding_resources')
      .select(`
        *,
        funding_categories(name, icon),
        incubator_schemes(*),
        government_schemes(*),
        investor_database(*)
      `);

    // Apply filters
    if (type) {
      query = query.eq('type', type);
    }

    if (sector) {
      query = query.contains('sectors', [sector]);
    }

    if (stage) {
      query = query.contains('stage', [stage]);
    }

    if (location) {
      query = query.ilike('specific_location', `%${location}%`);
    }

    if (minFunding) {
      query = query.gte('min_funding', minFunding);
    }

    if (maxFunding) {
      query = query.lte('max_funding', maxFunding);
    }

    if (search) {
      query = query.or(`
        name.ilike.%${search}%,
        description.ilike.%${search}%,
        search_keywords.ilike.%${search}%
      `);
    }

    // Apply pagination and ordering
    query = query
      .eq('status', 'active')
      .order('success_rate', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data: fundingResources, error } = await query;

    if (error) {
      logger.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch funding resources' },
        { status: 500 }
      );
    }

    // Get summary statistics
    const { data: stats } = await supabase
      .from('funding_resources')
      .select('type, min_funding, max_funding')
      .eq('status', 'active');

    const summary = {
      totalResources: stats?.length || 0,
      byType: stats?.reduce((acc: Record<string, number>, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {}),
      fundingRange: {
        min: Math.min(...(stats?.map(s => s.min_funding) || [0])),
        max: Math.max(...(stats?.map(s => s.max_funding) || [0]))
      }
    };

    return NextResponse.json({
      success: true,
      data: fundingResources || [],
      summary,
      pagination: {
        offset,
        limit,
        total: stats?.length || 0
      }
    });

  } catch (error) {
    logger.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
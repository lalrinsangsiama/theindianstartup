import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get('sector');
    const location = searchParams.get('location');
    const fundingRange = searchParams.get('fundingRange');
    const equityRange = searchParams.get('equityRange');
    const programDuration = searchParams.get('programDuration');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';

    let query = supabase
      .from('funding_resources')
      .select(`
        *,
        funding_categories(name, icon),
        incubator_schemes(
          incubator_name,
          program_name,
          program_duration,
          batch_size,
          batches_per_year,
          seed_funding,
          office_space,
          mentorship,
          legal_support,
          tech_credits,
          lab_access,
          equity_taken,
          program_fee,
          demo_day,
          application_deadline,
          next_batch_date,
          selection_process,
          alumni_count,
          successful_exits,
          total_funding_raised,
          min_team_size,
          max_team_size,
          mvp_required,
          revenue_required,
          min_revenue
        )
      `)
      .in('type', ['incubator', 'accelerator'])
      .eq('status', 'active');

    // Apply filters
    if (sector) {
      query = query.contains('sectors', [sector]);
    }

    if (location) {
      query = query.ilike('specific_location', `%${location}%`);
    }

    if (fundingRange) {
      const [min, max] = fundingRange.split('-').map(Number);
      query = query.gte('min_funding', min).lte('max_funding', max);
    }

    if (search) {
      query = query.or(`
        name.ilike.%${search}%,
        description.ilike.%${search}%
      `);
    }

    if (featured) {
      query = query.eq('is_premium', true);
    }

    const { data: incubators, error } = await query
      .order('success_rate', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch incubators' },
        { status: 500 }
      );
    }

    // Get filter options
    const { data: allIncubators } = await supabase
      .from('funding_resources')
      .select('sectors, specific_location, min_funding, max_funding')
      .in('type', ['incubator', 'accelerator'])
      .eq('status', 'active');

    const sectors = [...new Set(allIncubators?.flatMap(i => i.sectors) || [])];
    const locations = [...new Set(allIncubators?.map(i => i.specific_location).filter(Boolean) || [])];
    
    const fundingRanges = [
      { label: 'Under ₹10L', value: '0-1000000' },
      { label: '₹10L - ₹50L', value: '1000000-5000000' },
      { label: '₹50L - ₹2Cr', value: '5000000-20000000' },
      { label: '₹2Cr+', value: '20000000-999999999' }
    ];

    return NextResponse.json({
      success: true,
      data: incubators || [],
      filters: {
        sectors: sectors.sort(),
        locations: locations.sort(),
        fundingRanges
      },
      stats: {
        totalIncubators: incubators?.length || 0,
        averageFunding: incubators?.length ? 
          incubators.reduce((sum, inc) => sum + (inc.max_funding || 0), 0) / incubators.length : 0,
        topSectors: sectors.slice(0, 5)
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
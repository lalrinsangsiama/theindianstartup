// Optimized dashboard API route with caching and performance monitoring
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getUserDashboardData } from '@/lib/db-queries';
import { cache, cacheKeys } from '@/lib/cache';
import { monitorApiRoute } from '@/lib/performance';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  return monitorApiRoute('dashboard-optimized', async () => {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      
      // Get authenticated user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // Try cache first
      const cacheKey = cacheKeys.userDashboard(user.id);
      const cachedData = cache.get(cacheKey);
      
      if (cachedData) {
        return NextResponse.json(
          { 
            data: cachedData,
            cached: true,
            performance: { source: 'cache' }
          },
          { 
            status: 200,
            headers: {
              'X-Cache': 'HIT',
              'Cache-Control': 'private, max-age=60',
            }
          }
        );
      }

      // Fetch from database with optimized query
      const dashboardData = await getUserDashboardData(user.id);

      // Cache the result
      cache.set(cacheKey, dashboardData, CACHE_DURATION);

      // Return response with cache headers
      return NextResponse.json(
        { 
          data: dashboardData,
          cached: false,
          performance: { source: 'database' }
        },
        { 
          status: 200,
          headers: {
            'X-Cache': 'MISS',
            'Cache-Control': 'private, max-age=60',
            'ETag': `"${Buffer.from(JSON.stringify(dashboardData)).toString('base64').substring(0, 20)}"`,
          }
        }
      );

    } catch (error) {
      logger.error('Dashboard API error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}

// Prefetch endpoint for warming cache
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Warm up cache
    const dashboardData = await getUserDashboardData(user.id);
    cache.set(cacheKeys.userDashboard(user.id), dashboardData, CACHE_DURATION * 2); // 10 minutes for warm cache

    return NextResponse.json({ success: true, message: 'Cache warmed' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to warm cache' }, { status: 500 });
  }
}
// Redis-cached dashboard API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getCachedDashboardData, warmUserCaches } from '@/lib/cache-strategies';
import { monitorApiRoute } from '@/lib/performance';

export async function GET(request: NextRequest) {
  return monitorApiRoute('dashboard-cached', async () => {
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

      // Get cached dashboard data
      const { data, source } = await getCachedDashboardData(user.id);
      
      // Set cache headers based on source
      const headers: HeadersInit = {
        'X-Cache': source === 'cache' ? 'HIT' : 'MISS',
        'Cache-Control': 'private, max-age=60',
      };
      
      // Add performance timing
      if (source === 'cache') {
        headers['X-Cache-TTL'] = '300'; // 5 minutes
        headers['Server-Timing'] = 'cache;desc="Redis Cache Hit"';
      } else {
        headers['Server-Timing'] = 'db;desc="Database Query"';
      }

      return NextResponse.json(
        { 
          data,
          meta: {
            cached: source === 'cache',
            timestamp: new Date().toISOString(),
          }
        },
        { status: 200, headers }
      );

    } catch (error) {
      logger.error('Cached dashboard API error:', error);
      
      // Fallback to database on cache failure
      try {
        const supabase = createRouteHandlerClient({ cookies });
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Try direct database query
          const { getUserDashboardData } = await import('@/lib/db-queries');
          const data = await getUserDashboardData(user.id);
          
          return NextResponse.json(
            { 
              data,
              meta: {
                cached: false,
                fallback: true,
                timestamp: new Date().toISOString(),
              }
            },
            { 
              status: 200,
              headers: {
                'X-Cache': 'BYPASS',
                'X-Fallback': 'true',
              }
            }
          );
        }
      } catch (fallbackError) {
        logger.error('Fallback failed:', fallbackError);
      }
      
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  });
}

// Cache warming endpoint
export async function POST(request: NextRequest) {
  return monitorApiRoute('dashboard-warm-cache', async () => {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Parse request body
      const body = await request.json();
      const { aggressive = false } = body;
      
      if (aggressive) {
        // Warm all user caches
        await warmUserCaches(user.id);
        
        return NextResponse.json({ 
          success: true, 
          message: 'All caches warmed',
          caches: ['dashboard', 'products', 'progress']
        });
      } else {
        // Just warm dashboard cache
        await getCachedDashboardData(user.id);
        
        return NextResponse.json({ 
          success: true, 
          message: 'Dashboard cache warmed',
          caches: ['dashboard']
        });
      }
    } catch (error) {
      logger.error('Cache warming error:', error);
      return NextResponse.json(
        { error: 'Failed to warm cache' },
        { status: 500 }
      );
    }
  });
}

// Cache invalidation endpoint
export async function DELETE(request: NextRequest) {
  return monitorApiRoute('dashboard-invalidate-cache', async () => {
    try {
      const supabase = createRouteHandlerClient({ cookies });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Import cache invalidation
      const { cacheInvalidation } = await import('@/lib/redis');
      
      // Invalidate user caches
      await cacheInvalidation.onUserUpdate(user.id);
      
      return NextResponse.json({ 
        success: true, 
        message: 'User cache invalidated',
        userId: user.id
      });
    } catch (error) {
      logger.error('Cache invalidation error:', error);
      return NextResponse.json(
        { error: 'Failed to invalidate cache' },
        { status: 500 }
      );
    }
  });
}
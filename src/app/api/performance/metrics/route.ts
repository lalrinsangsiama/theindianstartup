// API endpoint for performance metrics collection
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { perfMonitor } from '@/lib/performance';
import { prisma } from '@/lib/prisma';

// Performance metrics collection endpoint
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    // Parse metrics from request
    const body = await request.json();
    const { metrics, type = 'client' } = body;
    
    if (!metrics || !Array.isArray(metrics)) {
      return NextResponse.json(
        { error: 'Invalid metrics format' },
        { status: 400 }
      );
    }
    
    // Store metrics for analysis (in production, use a time-series DB)
    if (process.env.NODE_ENV === 'production') {
      // Log to monitoring service
      logger.info('Performance metrics received:', {
        userId: user?.id,
        type,
        count: metrics.length,
        timestamp: new Date().toISOString(),
      });
    }
    
    // Process and aggregate metrics
    const aggregated = metrics.reduce((acc, metric) => {
      const key = metric.name || 'unknown';
      if (!acc[key]) {
        acc[key] = {
          count: 0,
          totalDuration: 0,
          minDuration: Infinity,
          maxDuration: -Infinity,
        };
      }
      
      acc[key].count += 1;
      acc[key].totalDuration += metric.duration || 0;
      acc[key].minDuration = Math.min(acc[key].minDuration, metric.duration || 0);
      acc[key].maxDuration = Math.max(acc[key].maxDuration, metric.duration || 0);
      
      return acc;
    }, {} as Record<string, any>);
    
    // Calculate averages
    Object.keys(aggregated).forEach(key => {
      aggregated[key].avgDuration = aggregated[key].totalDuration / aggregated[key].count;
    });
    
    return NextResponse.json({
      success: true,
      received: metrics.length,
      aggregated,
    });
  } catch (error) {
    logger.error('Performance metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to process metrics' },
      { status: 500 }
    );
  }
}

// Get performance metrics summary
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if user is admin
    const isAdmin = user?.email?.endsWith('@theindianstartup.in') || false;
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Get server-side metrics
    const serverMetrics = perfMonitor.getSummary();
    
    // Get database performance stats
    const dbStats = await prisma.$queryRaw<any[]>`
      SELECT 
        'total_users' as metric,
        COUNT(*) as value
      FROM "User"
      UNION ALL
      SELECT 
        'active_sessions' as metric,
        COUNT(*) as value
      FROM "User"
      WHERE "updatedAt" > NOW() - INTERVAL '15 minutes'
      UNION ALL
      SELECT 
        'total_purchases' as metric,
        COUNT(*) as value
      FROM "Purchase"
      WHERE status = 'completed'
      UNION ALL
      SELECT 
        'daily_active_users' as metric,
        COUNT(DISTINCT "userId") as value
      FROM "LessonProgress"
      WHERE "updatedAt" > NOW() - INTERVAL '24 hours'
    `;
    
    // Format database stats
    const dbMetrics = dbStats.reduce((acc, stat) => {
      acc[stat.metric] = parseInt(stat.value);
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate cache stats
    const cacheStats = {
      // This would come from Redis in production
      hitRate: 85, // Mock value
      missRate: 15,
      totalKeys: 150,
    };
    
    return NextResponse.json({
      server: serverMetrics,
      database: dbMetrics,
      cache: cacheStats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Performance metrics fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
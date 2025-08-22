// Cache statistics API endpoint
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getCacheStats } from '@/lib/cache-strategies';
import { redis } from '@/lib/redis';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    // Only allow authenticated users
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get cache statistics
    const stats = await getCacheStats();
    
    // Additional Redis info if available
    let redisInfo = null;
    try {
      const isConnected = await redis.ping();
      if (isConnected) {
        // Get sample of keys by pattern
        const userKeys = await redis.keys(`user:*`);
        const productKeys = await redis.keys(`product:*`);
        const sessionKeys = await redis.keys(`session:*`);
        
        redisInfo = {
          patterns: {
            user: userKeys.length,
            product: productKeys.length,
            session: sessionKeys.length,
          },
        };
      }
    } catch (error) {
      logger.error('Redis info error:', error);
    }
    
    return NextResponse.json({
      ...stats,
      redis: redisInfo,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Cache stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get cache statistics' },
      { status: 500 }
    );
  }
}

// Clear cache endpoint (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check if user is admin
    const isAdmin = user?.email?.endsWith('@theindianstartup.in') || false;
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }
    
    // Parse query params
    const { searchParams } = new URL(request.url);
    const pattern = searchParams.get('pattern') || '*';
    
    // Safety check - don't allow clearing all keys in production
    if (pattern === '*' && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Cannot clear all keys in production' },
        { status: 400 }
      );
    }
    
    // Clear keys matching pattern
    const deletedCount = await redis.delPattern(pattern);
    
    return NextResponse.json({
      success: true,
      pattern,
      deletedCount,
      message: `Cleared ${deletedCount} keys matching pattern: ${pattern}`,
    });
  } catch (error) {
    logger.error('Cache clear error:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
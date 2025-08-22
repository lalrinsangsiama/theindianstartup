// Advanced caching strategies for different data types
import { redis, CACHE_TTL, cacheKeys, cacheAside } from './redis';
import { logger } from '@/lib/logger';
import { 
  getUserDashboardData, 
  checkProductAccess,
  getProductLessons,
  getPortfolioWithActivities 
} from './db-queries';
import { perfMonitor } from './performance';

// Dashboard caching with cache warming
export async function getCachedDashboardData(userId: string) {
  return perfMonitor.measure('cache:dashboard', async () => {
    const key = cacheKeys.dashboard(userId);
    
    // Try cache first
    const cached = await redis.get(key);
    if (cached) {
      // Async cache refresh if TTL < 60s
      const ttl = await redis.ttl(key);
      if (ttl > 0 && ttl < 60) {
        warmDashboardCache(userId); // Non-blocking
      }
      return { data: cached, source: 'cache' };
    }
    
    // Fetch from database
    const data = await getUserDashboardData(userId);
    
    // Cache with appropriate TTL
    await redis.setex(key, CACHE_TTL.MEDIUM, data);
    
    return { data, source: 'database' };
  });
}

// Product access with write-through cache
export async function getCachedProductAccess(
  userId: string, 
  productCode: string
): Promise<{ hasAccess: boolean; expiresAt: Date | null; source: string }> {
  const key = cacheKeys.productAccess(userId, productCode);
  
  // Cache check
  const cached = await redis.get<{ hasAccess: boolean; expiresAt: string | null }>(key);
  if (cached) {
    return {
      hasAccess: cached.hasAccess,
      expiresAt: cached.expiresAt ? new Date(cached.expiresAt) : null,
      source: 'cache',
    };
  }
  
  // Database check
  const access = await checkProductAccess(userId, productCode);
  
  // Cache the result (shorter TTL for access control)
  await redis.setex(key, CACHE_TTL.SHORT, {
    hasAccess: access.hasAccess,
    expiresAt: access.expiresAt?.toISOString() || null,
  });
  
  return { ...access, source: 'database' };
}

// Lessons with lazy loading and partial caching
export async function getCachedProductLessons(
  productCode: string,
  userId: string
) {
  const cacheKey = cacheKeys.productLessons(productCode);
  const userProgressKey = `${cacheKey}:${userId}`;
  
  // Try to get lessons structure from cache
  let lessons = await redis.get(cacheKey);
  
  if (!lessons) {
    // Fetch and cache lesson structure (without user progress)
    lessons = await getProductLessons(productCode, userId);
    await redis.setex(cacheKey, CACHE_TTL.LONG, lessons);
  }
  
  // Merge with user-specific progress (shorter cache)
  const userProgress = await cacheAside(
    userProgressKey,
    () => fetchUserLessonProgress(userId, productCode),
    CACHE_TTL.SHORT
  );
  
  return mergeLessonsWithProgress(lessons, userProgress);
}

// Portfolio with cache priming
export async function getCachedPortfolio(userId: string) {
  const portfolioKey = cacheKeys.portfolio(userId);
  const recsKey = cacheKeys.portfolioRecs(userId);
  
  // Parallel cache checks
  const [cachedPortfolio, cachedRecs] = await Promise.all([
    redis.get(portfolioKey),
    redis.get(recsKey),
  ]);
  
  if (cachedPortfolio && cachedRecs) {
    return {
      portfolio: cachedPortfolio,
      recommendations: cachedRecs,
      source: 'cache',
    };
  }
  
  // Fetch from database
  const data = await getPortfolioWithActivities(userId);
  
  if (data) {
    // Split and cache separately for granular invalidation
    const { recommendations, ...portfolio } = data;
    
    await Promise.all([
      redis.setex(portfolioKey, CACHE_TTL.MEDIUM, portfolio),
      redis.setex(recsKey, CACHE_TTL.SHORT, recommendations || []),
    ]);
  }
  
  return { ...data, source: 'database' };
}

// Global data with stale-while-revalidate
export async function getCachedGlobalData<T>(
  key: string,
  factory: () => Promise<T>,
  ttl: number = CACHE_TTL.LONG,
  staleTime: number = ttl * 1.5
): Promise<T> {
  const cached = await redis.get<T>(key);
  const currentTtl = await redis.ttl(key);
  
  // Serve stale data while revalidating
  if (cached && currentTtl > -1) {
    // If TTL is low, trigger background refresh
    if (currentTtl < ttl * 0.2) {
      refreshInBackground(key, factory, ttl);
    }
    return cached;
  }
  
  // No cache or expired
  const data = await factory();
  await redis.setex(key, ttl, data);
  
  return data;
}

// Batch caching for multiple entities
export async function batchGetCached<T>(
  ids: string[],
  keyGenerator: (id: string) => string,
  factory: (missingIds: string[]) => Promise<Record<string, T>>,
  ttl: number = CACHE_TTL.MEDIUM
): Promise<Record<string, T>> {
  // Build keys
  const keys = ids.map(keyGenerator);
  const keyToId = Object.fromEntries(ids.map((id, i) => [keys[i], id]));
  
  // Batch get from cache
  const cachedValues = await redis.pipeline(
    keys.map(key => ['get', key])
  );
  
  // Find hits and misses
  const result: Record<string, T> = {};
  const missingIds: string[] = [];
  
  cachedValues.forEach((value, index) => {
    const id = ids[index];
    if (value) {
      result[id] = JSON.parse(value as string);
    } else {
      missingIds.push(id);
    }
  });
  
  // Fetch missing data
  if (missingIds.length > 0) {
    const missingData = await factory(missingIds);
    
    // Cache missing data
    const cacheOps = missingIds.map(id => {
      const key = keyGenerator(id);
      const value = missingData[id];
      if (value) {
        result[id] = value;
        return ['setex', key, ttl, JSON.stringify(value)];
      }
      return null;
    }).filter(Boolean) as Array<[string, ...any[]]>;
    
    if (cacheOps.length > 0) {
      await redis.pipeline(cacheOps);
    }
  }
  
  return result;
}

// Cache warming strategies
export async function warmDashboardCache(userId: string): Promise<void> {
  try {
    const data = await getUserDashboardData(userId);
    await redis.setex(cacheKeys.dashboard(userId), CACHE_TTL.MEDIUM, data);
  } catch (error) {
    logger.error('Dashboard cache warming failed:', error);
  }
}

export async function warmUserCaches(userId: string): Promise<void> {
  // Warm multiple caches in parallel
  const warmingTasks = [
    warmDashboardCache(userId),
    cacheAside(
      cacheKeys.products(userId),
      () => fetchUserProducts(userId),
      CACHE_TTL.LONG
    ),
    cacheAside(
      cacheKeys.progress(userId),
      () => fetchUserProgress(userId),
      CACHE_TTL.MEDIUM
    ),
  ];
  
  await Promise.allSettled(warmingTasks);
}

// Rate limiting with Redis
export async function checkRateLimit(
  identifier: string,
  action: string,
  limit: number = 100,
  window: number = 3600 // 1 hour
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = cacheKeys.rateLimit(identifier, action);
  const now = Date.now();
  const windowStart = now - window * 1000;
  
  // Use sorted set for sliding window
  const operations: Array<[string, ...any[]]> = [
    ['zremrangebyscore', key, '-inf', windowStart],
    ['zadd', key, now, `${now}-${Math.random()}`],
    ['zcard', key],
    ['expire', key, window]
  ];
  
  const results = await redis.pipeline(operations);
  const count = results?.[2] as number || 0;
  
  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    resetAt: now + window * 1000,
  };
}

// Session management
export async function setSession(
  sessionId: string,
  data: any,
  ttl: number = CACHE_TTL.DAY
): Promise<void> {
  await redis.setex(cacheKeys.session(sessionId), ttl, data);
}

export async function getSession(sessionId: string): Promise<any | null> {
  return redis.get(cacheKeys.session(sessionId));
}

export async function extendSession(
  sessionId: string,
  ttl: number = CACHE_TTL.DAY
): Promise<boolean> {
  return redis.expire(cacheKeys.session(sessionId), ttl);
}

// Helper functions
async function fetchUserLessonProgress(userId: string, productCode: string) {
  // Implementation would fetch from database
  return {};
}

async function fetchUserProducts(userId: string) {
  // Implementation would fetch from database
  return [];
}

async function fetchUserProgress(userId: string) {
  // Implementation would fetch from database
  return {};
}

function mergeLessonsWithProgress(lessons: any, progress: any) {
  // Implementation would merge lesson data with user progress
  return lessons;
}

async function refreshInBackground<T>(
  key: string,
  factory: () => Promise<T>,
  ttl: number
): Promise<void> {
  // Non-blocking background refresh
  setImmediate(async () => {
    try {
      const data = await factory();
      await redis.setex(key, ttl, data);
    } catch (error) {
      logger.error(`Background refresh failed for ${key}:`, error);
    }
  });
}

// Export cache statistics
export async function getCacheStats(): Promise<{
  connected: boolean;
  keyCount: number;
  hitRate: number;
  memoryUsage: string;
}> {
  try {
    const isConnected = await redis.ping();
    const keys = await redis.keys('*');
    
    // Calculate hit rate from recent operations
    const stats = perfMonitor.getSummary();
    const cacheOps = stats.recentMetrics.filter(m => m.name.startsWith('cache:'));
    const hits = cacheOps.filter(m => m.metadata?.source === 'cache').length;
    const hitRate = cacheOps.length > 0 ? (hits / cacheOps.length) * 100 : 0;
    
    return {
      connected: isConnected,
      keyCount: keys.length,
      hitRate: Math.round(hitRate),
      memoryUsage: 'N/A', // Would need Redis INFO command
    };
  } catch (error) {
    logger.error('Failed to get cache stats:', error);
    return {
      connected: false,
      keyCount: 0,
      hitRate: 0,
      memoryUsage: 'N/A',
    };
  }
}
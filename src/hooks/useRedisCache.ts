// React hooks for Redis caching
import { useState, useEffect, useCallback, useRef } from 'react';
import { logger } from '@/lib/logger';
import { redis, CACHE_TTL, cacheKeys } from '@/lib/redis';
import { useAuthContext } from '@/contexts/AuthContext';

interface CacheOptions {
  ttl?: number;
  staleWhileRevalidate?: boolean;
  fallback?: any;
  onError?: (error: Error) => void;
}

interface CacheResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isFromCache: boolean;
  refresh: () => Promise<void>;
  invalidate: () => Promise<void>;
}

// Hook for cached data fetching
export function useRedisCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
): CacheResult<T> {
  const {
    ttl = CACHE_TTL.MEDIUM,
    staleWhileRevalidate = true,
    fallback = null,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFromCache, setIsFromCache] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async (skipCache = false) => {
    try {
      setIsLoading(true);
      setError(null);

      // Try cache first unless skipping
      if (!skipCache) {
        const cached = await redis.get<T>(key);
        if (cached !== null && isMountedRef.current) {
          setData(cached);
          setIsFromCache(true);
          setIsLoading(false);

          // Check TTL for stale-while-revalidate
          if (staleWhileRevalidate) {
            const remainingTtl = await redis.ttl(key);
            if (remainingTtl > 0 && remainingTtl < ttl * 0.2) {
              // Refresh in background if TTL is low
              fetcher().then(freshData => {
                if (isMountedRef.current) {
                  redis.setex(key, ttl, freshData);
                }
              }).catch(err => logger.error('Background refresh failed:', err));
            }
          }
          
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetcher();
      
      if (!isMountedRef.current) return;

      setData(freshData);
      setIsFromCache(false);
      
      // Cache the data
      await redis.setex(key, ttl, freshData);
    } catch (err) {
      if (!isMountedRef.current) return;
      
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      onError?.(error);
      
      // Try to use cached data as fallback
      const cached = await redis.get<T>(key);
      if (cached !== null) {
        setData(cached);
        setIsFromCache(true);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [key, fetcher, ttl, staleWhileRevalidate, onError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  const invalidate = useCallback(async () => {
    await redis.del(key);
    setData(fallback);
    setIsFromCache(false);
  }, [key, fallback]);

  return {
    data,
    isLoading,
    error,
    isFromCache,
    refresh,
    invalidate,
  };
}

// Hook for user dashboard with caching
export function useCachedDashboard() {
  const { user } = useAuthContext();
  const key = user ? cacheKeys.dashboard(user.id) : '';
  const abortControllerRef = useRef<AbortController | null>(null);

  // Create abort-aware fetcher
  const fetcher = useCallback(async () => {
    if (!user) throw new Error('User not authenticated');

    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const response = await fetch('/api/dashboard/cached', {
      signal: abortControllerRef.current.signal,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard');
    }

    const result = await response.json();
    return result.data;
  }, [user]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return useRedisCache(
    key,
    fetcher,
    {
      ttl: CACHE_TTL.MEDIUM,
      staleWhileRevalidate: true,
    }
  );
}

// Hook for product access check with caching
export function useCachedProductAccess(productCode: string) {
  const { user } = useAuthContext();
  const key = user ? cacheKeys.productAccess(user.id, productCode) : '';
  const abortControllerRef = useRef<AbortController | null>(null);

  // Create abort-aware fetcher
  const fetcher = useCallback(async () => {
    if (!user) return { hasAccess: false, expiresAt: null };

    // Abort previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const response = await fetch(`/api/products/${productCode}/access`, {
      signal: abortControllerRef.current.signal,
    });
    if (!response.ok) {
      throw new Error('Failed to check product access');
    }

    return response.json();
  }, [user, productCode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return useRedisCache(
    key,
    fetcher,
    {
      ttl: CACHE_TTL.SHORT, // Shorter TTL for access control
      fallback: { hasAccess: false, expiresAt: null },
    }
  );
}

// Hook for batch caching multiple items
export function useBatchCache<T>(
  ids: string[],
  keyGenerator: (id: string) => string,
  fetcher: (missingIds: string[]) => Promise<Record<string, T>>,
  options: CacheOptions = {}
): Record<string, CacheResult<T>> {
  const [results, setResults] = useState<Record<string, CacheResult<T>>>({});
  const { ttl = CACHE_TTL.MEDIUM } = options;

  useEffect(() => {
    const fetchBatch = async () => {
      const newResults: Record<string, CacheResult<T>> = {};
      const missingIds: string[] = [];
      
      // Check cache for each ID
      for (const id of ids) {
        const key = keyGenerator(id);
        const cached = await redis.get<T>(key);
        
        if (cached !== null) {
          newResults[id] = {
            data: cached,
            isLoading: false,
            error: null,
            isFromCache: true,
            refresh: async (): Promise<void> => {},
            invalidate: async (): Promise<void> => { await redis.del(key); },
          };
        } else {
          missingIds.push(id);
          newResults[id] = {
            data: null,
            isLoading: true,
            error: null,
            isFromCache: false,
            refresh: async (): Promise<void> => {},
            invalidate: async (): Promise<void> => {},
          };
        }
      }
      
      setResults(newResults);
      
      // Fetch missing data
      if (missingIds.length > 0) {
        try {
          const missingData = await fetcher(missingIds);
          
          // Update results and cache
          for (const id of missingIds) {
            const data = missingData[id];
            if (data) {
              const key = keyGenerator(id);
              await redis.setex(key, ttl, data);
              
              setResults(prev => ({
                ...prev,
                [id]: {
                  ...prev[id],
                  data,
                  isLoading: false,
                  isFromCache: false,
                },
              }));
            }
          }
        } catch (error) {
          // Update error state for missing items
          for (const id of missingIds) {
            setResults(prev => ({
              ...prev,
              [id]: {
                ...prev[id],
                error: error instanceof Error ? error : new Error('Unknown error'),
                isLoading: false,
              },
            }));
          }
        }
      }
    };

    fetchBatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(','), keyGenerator, fetcher, ttl]);

  return results;
}

// Hook for cache statistics
export function useCacheStats() {
  const [stats, setStats] = useState({
    connected: false,
    keyCount: 0,
    hitRate: 0,
    memoryUsage: 'N/A',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/cache/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        logger.error('Failed to fetch cache stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30s
    
    return () => clearInterval(interval);
  }, []);

  return stats;
}

// Hook for cache invalidation
export function useCacheInvalidation() {
  const { user } = useAuthContext();
  
  const invalidateUserCache = useCallback(async () => {
    if (!user) return;
    
    try {
      await fetch('/api/dashboard/cached', { method: 'DELETE' });
    } catch (error) {
      logger.error('Failed to invalidate cache:', error);
    }
  }, [user]);
  
  const invalidateProductCache = useCallback(async (productCode: string) => {
    if (!user) return;
    
    const { cacheInvalidation } = await import('@/lib/redis');
    await cacheInvalidation.onProductUpdate(productCode);
  }, [user]);
  
  const invalidatePortfolioCache = useCallback(async () => {
    if (!user) return;
    
    const { cacheInvalidation } = await import('@/lib/redis');
    await cacheInvalidation.onPortfolioUpdate(user.id);
  }, [user]);
  
  return {
    invalidateUserCache,
    invalidateProductCache,
    invalidatePortfolioCache,
  };
}
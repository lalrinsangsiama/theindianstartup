/**
 * Client-side caching utilities for The Indian Startup
 * Implements various caching strategies for better performance
 */

import React from 'react';

// Cache configuration
interface CacheConfig {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items to store
  version?: string; // Cache version for invalidation
}

// Default cache configuration
const DEFAULT_CONFIG: Required<CacheConfig> = {
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 100,
  version: '1.0.0',
};

// Cache item interface
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
}

/**
 * In-memory cache implementation
 */
class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private config: Required<CacheConfig>;

  constructor(config: CacheConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  set<T>(key: string, data: T, ttl?: number): void {
    // Clean up expired items if cache is getting large
    if (this.cache.size >= this.config.maxSize) {
      this.cleanup();
    }

    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.ttl,
      version: this.config.version,
    };

    this.cache.set(key, item);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    // Check if item has expired
    if (this.isExpired(item)) {
      this.cache.delete(key);
      return null;
    }

    // Check version compatibility
    if (item.version !== this.config.version) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    return item !== undefined && !this.isExpired(item) && item.version === this.config.version;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private isExpired(item: CacheItem<any>): boolean {
    return Date.now() - item.timestamp > item.ttl;
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    for (const [key, item] of entries) {
      if (this.isExpired(item) || item.version !== this.config.version) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    const now = Date.now();
    let expired = 0;
    let valid = 0;

    const values = Array.from(this.cache.values());
    for (const item of values) {
      if (this.isExpired(item)) {
        expired++;
      } else {
        valid++;
      }
    }

    return {
      total: this.cache.size,
      valid,
      expired,
      hitRate: valid / (valid + expired) || 0,
    };
  }
}

/**
 * LocalStorage cache implementation
 */
class LocalStorageCache {
  private prefix: string;
  private config: Required<CacheConfig>;

  constructor(prefix: string = 'tis_cache_', config: CacheConfig = {}) {
    this.prefix = prefix;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  set<T>(key: string, data: T, ttl?: number): void {
    if (typeof window === 'undefined') return;

    try {
      const item: CacheItem<T> = {
        data,
        timestamp: Date.now(),
        ttl: ttl || this.config.ttl,
        version: this.config.version,
      };

      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to set localStorage cache:', error);
    }
  }

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const itemStr = localStorage.getItem(this.prefix + key);
      if (!itemStr) return null;

      const item: CacheItem<T> = JSON.parse(itemStr);

      // Check if expired
      if (Date.now() - item.timestamp > item.ttl) {
        this.delete(key);
        return null;
      }

      // Check version
      if (item.version !== this.config.version) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to get localStorage cache:', error);
      return null;
    }
  }

  delete(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }
}

/**
 * Request cache with automatic deduplication
 */
class RequestCache {
  private pendingRequests = new Map<string, Promise<any>>();
  private cache: MemoryCache;

  constructor(config?: CacheConfig) {
    this.cache = new MemoryCache(config);
  }

  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl?: number
  ): Promise<T> {
    // Check cache first
    const cached = this.cache.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    // Make the request
    const promise = fetcher().then(
      (data) => {
        this.cache.set(key, data, ttl);
        this.pendingRequests.delete(key);
        return data;
      },
      (error) => {
        this.pendingRequests.delete(key);
        throw error;
      }
    );

    this.pendingRequests.set(key, promise);
    return promise;
  }

  invalidate(key: string): void {
    this.cache.delete(key);
    this.pendingRequests.delete(key);
  }
}

// Create global cache instances
export const memoryCache = new MemoryCache();
export const localStorageCache = new LocalStorageCache();
export const requestCache = new RequestCache();

// Cache key generators
export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  userProfile: (userId: string) => `user_profile:${userId}`,
  dailyLesson: (day: number) => `daily_lesson:${day}`,
  userProgress: (userId: string) => `user_progress:${userId}`,
  badges: (userId: string) => `badges:${userId}`,
  communityPosts: (page: number) => `community_posts:${page}`,
  ecosystemListings: (filters: string) => `ecosystem:${filters}`,
};

// React hook for cached data
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    enabled?: boolean;
    refetchOnMount?: boolean;
  } = {}
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const {
    ttl,
    enabled = true,
    refetchOnMount = false,
  } = options;

  React.useEffect(() => {
    if (!enabled) return;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check cache first (unless refetchOnMount is true)
        if (!refetchOnMount) {
          const cached = memoryCache.get<T>(key);
          if (cached !== null) {
            setData(cached);
            setLoading(false);
            return;
          }
        }

        // Fetch data with request deduplication
        const result = await requestCache.get(key, fetcher, ttl);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [key, enabled, refetchOnMount, ttl, fetcher]);

  const invalidate = React.useCallback(() => {
    requestCache.invalidate(key);
    setData(null);
  }, [key]);

  return { data, loading, error, invalidate };
}

// Service Worker cache helpers (for production)
export const swCache = {
  // Cache static assets
  cacheAssets: async (urls: string[]) => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const cache = await caches.open('tis-assets-v1');
        await cache.addAll(urls);
      } catch (error) {
        console.warn('Failed to cache assets:', error);
      }
    }
  },

  // Cache API responses
  cacheResponse: async (request: Request, response: Response) => {
    if ('caches' in window) {
      try {
        const cache = await caches.open('tis-api-v1');
        await cache.put(request, response.clone());
      } catch (error) {
        console.warn('Failed to cache response:', error);
      }
    }
  },

  // Get cached response
  getCachedResponse: async (request: Request): Promise<Response | null> => {
    if ('caches' in window) {
      try {
        const cache = await caches.open('tis-api-v1');
        const response = await cache.match(request);
        return response || null;
      } catch (error) {
        console.warn('Failed to get cached response:', error);
      }
    }
    return null;
  },
};

// Performance monitoring
export const cacheMetrics = {
  logCacheHit: (key: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Cache HIT: ${key}`);
    }
  },

  logCacheMiss: (key: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Cache MISS: ${key}`);
    }
  },

  getStats: () => {
    return {
      memory: memoryCache.getStats(),
      localStorage: {
        // Implementation for localStorage stats
      },
    };
  },
};
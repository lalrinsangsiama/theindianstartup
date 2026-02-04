// Redis caching implementation for performance optimization
// Note: This is a simplified in-memory cache for now
// For production, use Redis with ioredis package

interface CacheEntry<T> {
  data: T;
  expiry: number;
  lastAccess: number; // For LRU tracking
}

// Maximum cache entries to prevent memory leaks
const MAX_CACHE_SIZE = 10000;
const MAX_TIMER_SIZE = 10000;

class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private timers: Map<string, NodeJS.Timeout> = new Map();

  // Enforce max cache size with LRU eviction
  private enforceCacheSizeLimit(): void {
    if (this.cache.size <= MAX_CACHE_SIZE) return;

    // Find and remove oldest entries (LRU eviction)
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].lastAccess - b[1].lastAccess);

    // Remove oldest 10% of entries
    const removeCount = Math.ceil(MAX_CACHE_SIZE * 0.1);
    for (let i = 0; i < removeCount && i < entries.length; i++) {
      this.delete(entries[i][0]);
    }
  }

  // Enforce max timer size
  private enforceTimerSizeLimit(): void {
    if (this.timers.size <= MAX_TIMER_SIZE) return;

    // Clear oldest timers (they will re-create if needed)
    const keysToRemove: string[] = [];
    let count = 0;
    const targetRemove = Math.ceil(MAX_TIMER_SIZE * 0.1);

    for (const key of this.timers.keys()) {
      if (count >= targetRemove) break;
      keysToRemove.push(key);
      count++;
    }

    keysToRemove.forEach(key => this.clearTimer(key));
  }

  // Set cache with TTL in seconds
  set<T>(key: string, data: T, ttl: number): void {
    const now = Date.now();
    const expiry = now + ttl * 1000;

    // Clear existing timer if any
    this.clearTimer(key);

    // Enforce size limits before adding new entry
    this.enforceCacheSizeLimit();
    this.enforceTimerSizeLimit();

    // Set new cache entry with LRU tracking
    this.cache.set(key, { data, expiry, lastAccess: now });

    // Set auto-cleanup timer
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl * 1000);

    this.timers.set(key, timer);
  }

  // Get from cache
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if expired
    if (Date.now() > entry.expiry) {
      this.delete(key);
      return null;
    }

    // Update lastAccess for LRU tracking
    entry.lastAccess = Date.now();

    return entry.data as T;
  }

  // Get or set pattern
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    // Try to get from cache first
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    // Generate data
    const data = await factory();
    
    // Cache it
    this.set(key, data, ttl);
    
    return data;
  }

  // Delete from cache
  delete(key: string): void {
    this.cache.delete(key);
    this.clearTimer(key);
  }

  // Delete by pattern
  deletePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    const keysToDelete: string[] = [];
    
    this.cache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.delete(key));
  }

  // Clear all cache
  flush(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.cache.clear();
    this.timers.clear();
  }

  // Get cache stats
  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  // Private helper to clear timer
  private clearTimer(key: string): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }
}

// Singleton instance
export const cache = new CacheManager();

// Cache key generators
export const cacheKeys = {
  // User related
  userDashboard: (userId: string) => `user:dashboard:${userId}`,
  userProducts: (userId: string) => `user:products:${userId}`,
  userProgress: (userId: string) => `user:progress:${userId}`,
  
  // Product related
  productAccess: (userId: string, productCode: string) => `product:access:${userId}:${productCode}`,
  productDetails: (productCode: string) => `product:details:${productCode}`,
  productLessons: (productCode: string) => `product:lessons:${productCode}`,
  productAnalytics: (productCode: string) => `product:analytics:${productCode}`,
  
  // Portfolio related
  portfolio: (userId: string) => `portfolio:${userId}`,
  portfolioRecommendations: (userId: string) => `portfolio:recommendations:${userId}`,
  
  // Lesson related
  lesson: (lessonId: string) => `lesson:${lessonId}`,
  lessonProgress: (userId: string, lessonId: string) => `lesson:progress:${userId}:${lessonId}`,
  
  // Global
  allProducts: () => 'products:all',
  bundles: () => 'bundles:all',
  stats: () => 'stats:global',
};

// Cache invalidation helpers
export const cacheInvalidation = {
  // Invalidate user cache when purchase is made
  onPurchase: (userId: string) => {
    cache.deletePattern(`user:.*:${userId}`);
    cache.deletePattern(`product:access:${userId}:.*`);
  },
  
  // Invalidate progress cache when lesson is completed
  onLessonComplete: (userId: string, lessonId: string) => {
    cache.delete(cacheKeys.userDashboard(userId));
    cache.delete(cacheKeys.userProgress(userId));
    cache.delete(cacheKeys.lessonProgress(userId, lessonId));
  },
  
  // Invalidate portfolio cache on update
  onPortfolioUpdate: (userId: string) => {
    cache.delete(cacheKeys.portfolio(userId));
    cache.delete(cacheKeys.portfolioRecommendations(userId));
  },
  
  // Invalidate product cache on update
  onProductUpdate: (productCode: string) => {
    cache.delete(cacheKeys.productDetails(productCode));
    cache.delete(cacheKeys.productLessons(productCode));
    cache.delete(cacheKeys.productAnalytics(productCode));
    cache.delete(cacheKeys.allProducts());
  },
};

// Redis-compatible interface for future migration
export interface ICacheManager {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string | string[]): Promise<void>;
  exists(key: string): Promise<boolean>;
  expire(key: string, ttl: number): Promise<void>;
  ttl(key: string): Promise<number>;
  keys(pattern: string): Promise<string[]>;
  flushall(): Promise<void>;
}

// Wrapper for Redis migration readiness
export class RedisCacheAdapter implements ICacheManager {
  private manager: CacheManager;
  
  constructor(manager: CacheManager) {
    this.manager = manager;
  }
  
  async get<T>(key: string): Promise<T | null> {
    return this.manager.get<T>(key);
  }
  
  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    this.manager.set(key, value, ttl);
  }
  
  async del(keys: string | string[]): Promise<void> {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    keyArray.forEach(key => this.manager.delete(key));
  }
  
  async exists(key: string): Promise<boolean> {
    return this.manager.get(key) !== null;
  }
  
  async expire(key: string, ttl: number): Promise<void> {
    const data = this.manager.get(key);
    if (data !== null) {
      this.manager.set(key, data, ttl);
    }
  }
  
  async ttl(key: string): Promise<number> {
    // Not implemented in memory cache
    return -1;
  }
  
  async keys(pattern: string): Promise<string[]> {
    const { keys } = this.manager.stats();
    const regex = new RegExp(pattern.replace('*', '.*'));
    return keys.filter(key => regex.test(key));
  }
  
  async flushall(): Promise<void> {
    this.manager.flush();
  }
}

// Export Redis-ready adapter
export const redisCache = new RedisCacheAdapter(cache);

// Performance monitoring middleware
export function cacheMiddleware(cacheDuration: number = 300) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      // Generate cache key based on method name and arguments
      const cacheKey = `method:${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;
      
      // Try cache first
      const cached = cache.get(cacheKey);
      if (cached !== null) {
        return cached;
      }
      
      // Execute original method
      const result = await originalMethod.apply(this, args);
      
      // Cache result
      cache.set(cacheKey, result, cacheDuration);
      
      return result;
    };
    
    return descriptor;
  };
}
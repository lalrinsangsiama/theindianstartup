// Redis client configuration and utilities
import { Redis } from 'ioredis';

import { logger } from '@/lib/logger';
// Redis connection configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  enableOfflineQueue: true,
  maxRetriesPerRequest: 3,
};

// Create Redis client with lazy initialization
class RedisClient {
  private client: Redis | null = null;
  private isConnected = false;

  private getClient(): Redis {
    if (!this.client) {
      this.client = new Redis(redisConfig);
      
      this.client.on('connect', () => {
        logger.info('Redis connected');
        this.isConnected = true;
      });
      
      this.client.on('error', (error) => {
        logger.error('Redis error:', error);
        this.isConnected = false;
      });
      
      this.client.on('close', () => {
        logger.info('Redis connection closed');
        this.isConnected = false;
      });
    }
    
    return this.client;
  }

  // Get with fallback
  async get<T>(key: string): Promise<T | null> {
    try {
      const client = this.getClient();
      const value = await client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Redis GET error for key ${key}:`, error);
      return null;
    }
  }

  // Set with expiry
  async setex<T>(key: string, seconds: number, value: T): Promise<boolean> {
    try {
      const client = this.getClient();
      const result = await client.setex(key, seconds, JSON.stringify(value));
      return result === 'OK';
    } catch (error) {
      logger.error(`Redis SETEX error for key ${key}:`, error);
      return false;
    }
  }

  // Set without expiry
  async set<T>(key: string, value: T): Promise<boolean> {
    try {
      const client = this.getClient();
      const result = await client.set(key, JSON.stringify(value));
      return result === 'OK';
    } catch (error) {
      logger.error(`Redis SET error for key ${key}:`, error);
      return false;
    }
  }

  // Delete key(s)
  async del(keys: string | string[]): Promise<number> {
    try {
      const client = this.getClient();
      const keysArray = Array.isArray(keys) ? keys : [keys];
      return await client.del(...keysArray);
    } catch (error) {
      logger.error(`Redis DEL error:`, error);
      return 0;
    }
  }

  // Check if key exists
  async exists(key: string): Promise<boolean> {
    try {
      const client = this.getClient();
      const result = await client.exists(key);
      return result === 1;
    } catch (error) {
      logger.error(`Redis EXISTS error for key ${key}:`, error);
      return false;
    }
  }

  // Get TTL
  async ttl(key: string): Promise<number> {
    try {
      const client = this.getClient();
      return await client.ttl(key);
    } catch (error) {
      logger.error(`Redis TTL error for key ${key}:`, error);
      return -1;
    }
  }

  // Set expiry
  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      const client = this.getClient();
      const result = await client.expire(key, seconds);
      return result === 1;
    } catch (error) {
      logger.error(`Redis EXPIRE error for key ${key}:`, error);
      return false;
    }
  }

  // Pattern-based key search
  async keys(pattern: string): Promise<string[]> {
    try {
      const client = this.getClient();
      return await client.keys(pattern);
    } catch (error) {
      logger.error(`Redis KEYS error for pattern ${pattern}:`, error);
      return [];
    }
  }

  // Delete by pattern
  async delPattern(pattern: string): Promise<number> {
    try {
      const keys = await this.keys(pattern);
      if (keys.length === 0) return 0;
      return await this.del(keys);
    } catch (error) {
      logger.error(`Redis DEL pattern error:`, error);
      return 0;
    }
  }

  // Increment counter
  async incr(key: string): Promise<number> {
    try {
      const client = this.getClient();
      return await client.incr(key);
    } catch (error) {
      logger.error(`Redis INCR error for key ${key}:`, error);
      return 0;
    }
  }

  // Hash operations
  async hset(key: string, field: string, value: any): Promise<boolean> {
    try {
      const client = this.getClient();
      const result = await client.hset(key, field, JSON.stringify(value));
      return result === 1;
    } catch (error) {
      logger.error(`Redis HSET error:`, error);
      return false;
    }
  }

  async hget<T>(key: string, field: string): Promise<T | null> {
    try {
      const client = this.getClient();
      const value = await client.hget(key, field);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error(`Redis HGET error:`, error);
      return null;
    }
  }

  async hgetall<T>(key: string): Promise<Record<string, T>> {
    try {
      const client = this.getClient();
      const hash = await client.hgetall(key);
      const result: Record<string, T> = {};
      
      for (const [field, value] of Object.entries(hash)) {
        try {
          result[field] = JSON.parse(value);
        } catch {
          result[field] = value as any;
        }
      }
      
      return result;
    } catch (error) {
      logger.error(`Redis HGETALL error:`, error);
      return {};
    }
  }

  // Pipeline for batch operations
  async pipeline(operations: Array<[string, ...any[]]>): Promise<any[]> {
    try {
      const client = this.getClient();
      const pipeline = client.pipeline();
      
      operations.forEach(([command, ...args]) => {
        (pipeline as any)[command](...args);
      });
      
      const results = await pipeline.exec();
      return results ? results.map(([err, result]) => err ? null : result) : [];
    } catch (error) {
      logger.error('Redis pipeline error:', error);
      return [];
    }
  }

  // Health check
  async ping(): Promise<boolean> {
    try {
      const client = this.getClient();
      const result = await client.ping();
      return result === 'PONG';
    } catch (error) {
      logger.error('Redis ping error:', error);
      return false;
    }
  }

  // Close connection
  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      this.isConnected = false;
    }
  }

  // Get connection status
  getStatus(): boolean {
    return this.isConnected;
  }
}

// Export singleton instance
export const redis = new RedisClient();

// Cache duration constants
export const CACHE_TTL = {
  SHORT: 60,        // 1 minute - rapidly changing data
  MEDIUM: 300,      // 5 minutes - user dashboard
  LONG: 3600,       // 1 hour - product data
  DAY: 86400,       // 24 hours - static content
  WEEK: 604800,     // 7 days - rarely changing data
} as const;

// Cache key generators
export const cacheKeys = {
  // User related
  dashboard: (userId: string) => `dashboard:${userId}`,
  profile: (userId: string) => `user:profile:${userId}`,
  products: (userId: string) => `user:products:${userId}`,
  progress: (userId: string) => `user:progress:${userId}`,
  
  // Product related
  product: (code: string) => `product:${code}`,
  productAccess: (userId: string, code: string) => `access:${userId}:${code}`,
  productLessons: (code: string) => `lessons:${code}`,
  productAnalytics: (code: string) => `analytics:${code}`,
  
  // Portfolio
  portfolio: (userId: string) => `portfolio:${userId}`,
  portfolioRecs: (userId: string) => `portfolio:recs:${userId}`,
  
  // Global
  allProducts: () => 'products:all',
  bundles: () => 'bundles:all',
  stats: () => 'stats:global',
  
  // Session
  session: (sessionId: string) => `session:${sessionId}`,
  
  // Rate limiting
  rateLimit: (identifier: string, action: string) => `rate:${identifier}:${action}`,
} as const;

// Helper function for cache-aside pattern
export async function cacheAside<T>(
  key: string,
  factory: () => Promise<T>,
  ttl: number = CACHE_TTL.MEDIUM
): Promise<T> {
  // Try cache first
  const cached = await redis.get<T>(key);
  if (cached !== null) {
    return cached;
  }
  
  // Generate data
  const data = await factory();
  
  // Cache it
  await redis.setex(key, ttl, data);
  
  return data;
}

// Cache invalidation patterns
export const cacheInvalidation = {
  // Invalidate user-related cache
  async onUserUpdate(userId: string): Promise<void> {
    await redis.delPattern(`*:${userId}:*`);
    await redis.del([
      cacheKeys.dashboard(userId),
      cacheKeys.profile(userId),
      cacheKeys.products(userId),
      cacheKeys.progress(userId),
    ]);
  },
  
  // Invalidate on purchase
  async onPurchase(userId: string, productCode: string): Promise<void> {
    await redis.del([
      cacheKeys.dashboard(userId),
      cacheKeys.products(userId),
      cacheKeys.productAccess(userId, productCode),
    ]);
  },
  
  // Invalidate on lesson completion
  async onLessonComplete(userId: string, lessonId: string): Promise<void> {
    await redis.del([
      cacheKeys.dashboard(userId),
      cacheKeys.progress(userId),
    ]);
  },
  
  // Invalidate product cache
  async onProductUpdate(productCode: string): Promise<void> {
    await redis.del([
      cacheKeys.product(productCode),
      cacheKeys.productLessons(productCode),
      cacheKeys.productAnalytics(productCode),
      cacheKeys.allProducts(),
    ]);
    
    // Also invalidate user access cache
    const accessKeys = await redis.keys(`access:*:${productCode}`);
    if (accessKeys.length > 0) {
      await redis.del(accessKeys);
    }
  },
  
  // Invalidate portfolio
  async onPortfolioUpdate(userId: string): Promise<void> {
    await redis.del([
      cacheKeys.portfolio(userId),
      cacheKeys.portfolioRecs(userId),
    ]);
  },
};
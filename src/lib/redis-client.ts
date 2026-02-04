/**
 * Redis client for distributed rate limiting and caching
 * Uses Upstash Redis REST API for serverless compatibility
 * Falls back to in-memory store for development/testing
 */

import { logger } from '@/lib/logger';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RedisConfig {
  url?: string;
  token?: string;
}

class RedisClient {
  private config: RedisConfig;
  private inMemoryStore: Map<string, RateLimitEntry>;
  private isRedisAvailable: boolean;

  constructor() {
    this.config = {
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    };
    this.inMemoryStore = new Map();
    this.isRedisAvailable = !!(this.config.url && this.config.token);

    // Cleanup in-memory store periodically
    if (!this.isRedisAvailable) {
      setInterval(() => this.cleanupInMemory(), 5 * 60 * 1000);
    }
  }

  private cleanupInMemory(): void {
    const now = Date.now();
    for (const [key, value] of this.inMemoryStore.entries()) {
      if (now > value.resetTime) {
        this.inMemoryStore.delete(key);
      }
    }
  }

  private async fetchRedis(
    command: string,
    ...args: (string | number)[]
  ): Promise<unknown> {
    if (!this.isRedisAvailable) {
      throw new Error('Redis not configured');
    }

    const url = `${this.config.url}/${command}/${args.join('/')}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.config.token}`,
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Redis request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      logger.error('Redis fetch error:', error);
      throw error;
    }
  }

  /**
   * Get a value from Redis or in-memory store
   */
  async get(key: string): Promise<string | null> {
    if (this.isRedisAvailable) {
      try {
        const result = await this.fetchRedis('get', key);
        return result as string | null;
      } catch {
        // Fall back to in-memory on Redis error
        const entry = this.inMemoryStore.get(key);
        return entry ? JSON.stringify(entry) : null;
      }
    }

    const entry = this.inMemoryStore.get(key);
    return entry ? JSON.stringify(entry) : null;
  }

  /**
   * Set a value in Redis or in-memory store with optional TTL
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (this.isRedisAvailable) {
      try {
        if (ttlSeconds) {
          await this.fetchRedis('setex', key, ttlSeconds, value);
        } else {
          await this.fetchRedis('set', key, value);
        }
        return;
      } catch {
        // Fall back to in-memory on Redis error
      }
    }

    const entry: RateLimitEntry = JSON.parse(value);
    this.inMemoryStore.set(key, entry);
  }

  /**
   * Increment a counter and set TTL if it's a new key
   * Returns the new count
   */
  async incr(key: string, ttlSeconds?: number): Promise<number> {
    if (this.isRedisAvailable) {
      try {
        const count = await this.fetchRedis('incr', key) as number;
        if (count === 1 && ttlSeconds) {
          await this.fetchRedis('expire', key, ttlSeconds);
        }
        return count;
      } catch {
        // Fall back to in-memory on Redis error
      }
    }

    const existing = this.inMemoryStore.get(key);
    const now = Date.now();

    if (existing && existing.resetTime > now) {
      existing.count++;
      return existing.count;
    }

    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + (ttlSeconds || 900) * 1000,
    };
    this.inMemoryStore.set(key, newEntry);
    return 1;
  }

  /**
   * Get TTL (time to live) in seconds for a key
   */
  async ttl(key: string): Promise<number> {
    if (this.isRedisAvailable) {
      try {
        return await this.fetchRedis('ttl', key) as number;
      } catch {
        // Fall back to in-memory on Redis error
      }
    }

    const entry = this.inMemoryStore.get(key);
    if (!entry) return -2; // Key doesn't exist

    const remaining = Math.ceil((entry.resetTime - Date.now()) / 1000);
    return remaining > 0 ? remaining : -2;
  }

  /**
   * Delete a key
   */
  async del(key: string): Promise<void> {
    if (this.isRedisAvailable) {
      try {
        await this.fetchRedis('del', key);
        return;
      } catch {
        // Fall back to in-memory on Redis error
      }
    }

    this.inMemoryStore.delete(key);
  }

  /**
   * Check if Redis is available and healthy
   */
  async ping(): Promise<boolean> {
    if (!this.isRedisAvailable) {
      return false;
    }

    try {
      const result = await this.fetchRedis('ping');
      return result === 'PONG';
    } catch {
      return false;
    }
  }

  /**
   * Get connection status
   */
  getStatus(): { isRedis: boolean; inMemorySize: number } {
    return {
      isRedis: this.isRedisAvailable,
      inMemorySize: this.inMemoryStore.size,
    };
  }
}

// Singleton instance
export const redis = new RedisClient();

// Export for rate limiting integration
export async function getRateLimitEntry(
  key: string
): Promise<RateLimitEntry | null> {
  const data = await redis.get(key);
  if (!data) return null;

  try {
    return JSON.parse(data) as RateLimitEntry;
  } catch {
    return null;
  }
}

export async function setRateLimitEntry(
  key: string,
  entry: RateLimitEntry,
  ttlSeconds: number
): Promise<void> {
  await redis.set(key, JSON.stringify(entry), ttlSeconds);
}

export async function incrementRateLimit(
  key: string,
  ttlSeconds: number
): Promise<number> {
  return redis.incr(key, ttlSeconds);
}

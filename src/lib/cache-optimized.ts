'use client';

import { logger } from '@/lib/logger';

// Enhanced caching system for better performance
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
  lastAccessed: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache size
  serialize?: boolean; // Whether to serialize complex objects
  prefix?: string; // Cache key prefix
}

class OptimizedCache {
  private cache = new Map<string, CacheEntry<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes
  private maxSize = 1000;
  private hitCount = 0;
  private missCount = 0;
  private cleanupInterval?: NodeJS.Timeout;

  constructor(options: CacheOptions = {}) {
    this.defaultTTL = options.ttl || this.defaultTTL;
    this.maxSize = options.maxSize || this.maxSize;
    
    // Auto cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  // Get cached data
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      this.missCount++;
      return null;
    }

    const now = Date.now();
    
    // Check if expired
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.missCount++;
      return null;
    }

    // Update access stats
    entry.hits++;
    entry.lastAccessed = now;
    this.hitCount++;

    return entry.data;
  }

  // Set cached data
  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    
    // Enforce size limit
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      ttl: ttl || this.defaultTTL,
      hits: 0,
      lastAccessed: now,
    };

    this.cache.set(key, entry);
  }

  // Delete cached data
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  // Get cache statistics
  getStats() {
    const total = this.hitCount + this.missCount;
    return {
      size: this.cache.size,
      hits: this.hitCount,
      misses: this.missCount,
      hitRate: total > 0 ? this.hitCount / total : 0,
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  // Cleanup expired entries
  private cleanup(): void {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      logger.info(`Cache cleanup: removed ${cleaned} expired entries`);
    }
  }

  // Evict least recently used entry
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  // Estimate memory usage (rough calculation)
  private estimateMemoryUsage(): number {
    let size = 0;
    for (const [key, entry] of this.cache.entries()) {
      size += key.length * 2; // UTF-16
      size += JSON.stringify(entry.data).length * 2;
      size += 64; // Entry overhead
    }
    return size;
  }

  // Destroy cache and cleanup
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
  }
}

// Singleton cache instance
export const cache = new OptimizedCache({
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 500,
});

// Cached API fetch wrapper
export async function cachedFetch<T>(
  url: string,
  options: RequestInit & { 
    cacheKey?: string;
    cacheTTL?: number;
    skipCache?: boolean;
  } = {}
): Promise<T> {
  const { cacheKey, cacheTTL, skipCache, ...fetchOptions } = options;
  const key = cacheKey || `fetch:${url}:${JSON.stringify(fetchOptions)}`;

  // Check cache first
  if (!skipCache) {
    const cached = cache.get<T>(key);
    if (cached) {
      return cached;
    }
  }

  try {
    const response = await fetch(url, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache successful responses
    if (!skipCache) {
      cache.set(key, data, cacheTTL);
    }

    return data;
  } catch (error) {
    logger.error('Cached fetch error:', { url, error });
    throw error;
  }
}

// Cached API call with automatic retries
export async function cachedApiCall<T>(
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    cacheKey?: string;
    cacheTTL?: number;
    skipCache?: boolean;
    retries?: number;
    retryDelay?: number;
  } = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    cacheKey,
    cacheTTL,
    skipCache,
    retries = 2,
    retryDelay = 1000,
  } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  const key = cacheKey || `api:${method}:${endpoint}:${JSON.stringify(body || {})}`;

  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await cachedFetch<T>(endpoint, {
        ...fetchOptions,
        cacheKey: key,
        cacheTTL,
        skipCache: skipCache || method !== 'GET', // Only cache GET requests by default
      });
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError!;
}

// Batch API calls for better performance
export class BatchApiCaller {
  private pendingCalls = new Map<string, {
    resolve: (value: any) => void;
    reject: (error: any) => void;
    endpoint: string;
    options: any;
  }>();
  private batchTimer?: NodeJS.Timeout;
  private batchDelay = 50; // 50ms batch window

  async call<T>(endpoint: string, options: any = {}): Promise<T> {
    const key = `${endpoint}:${JSON.stringify(options)}`;

    return new Promise((resolve, reject) => {
      this.pendingCalls.set(key, { resolve, reject, endpoint, options });
      this.scheduleBatch();
    });
  }

  private scheduleBatch(): void {
    if (this.batchTimer) return;

    this.batchTimer = setTimeout(() => {
      this.processBatch();
    }, this.batchDelay);
  }

  private async processBatch(): Promise<void> {
    this.batchTimer = undefined;
    
    if (this.pendingCalls.size === 0) return;

    const calls = Array.from(this.pendingCalls.entries());
    this.pendingCalls.clear();

    // Group calls by endpoint
    const groups = new Map<string, typeof calls>();
    calls.forEach(([key, call]) => {
      const group = groups.get(call.endpoint) || [];
      group.push([key, call]);
      groups.set(call.endpoint, group);
    });

    // Process each group
    for (const [endpoint, groupCalls] of groups) {
      try {
        // For batch endpoints, send all at once
        if (endpoint.includes('/batch')) {
          const data = await this.callBatchEndpoint(endpoint, groupCalls);
          groupCalls.forEach(([key, call], index) => {
            call.resolve(data[index]);
          });
        } else {
          // For regular endpoints, call individually but in parallel
          const promises = groupCalls.map(([key, call]) =>
            cachedApiCall(call.endpoint, call.options)
          );
          
          const results = await Promise.allSettled(promises);
          results.forEach((result, index) => {
            const [key, call] = groupCalls[index];
            if (result.status === 'fulfilled') {
              call.resolve(result.value);
            } else {
              call.reject(result.reason);
            }
          });
        }
      } catch (error) {
        groupCalls.forEach(([key, call]) => {
          call.reject(error);
        });
      }
    }
  }

  private async callBatchEndpoint(endpoint: string, calls: any[]): Promise<any[]> {
    const requests = calls.map(([key, call]) => ({
      key,
      endpoint: call.endpoint,
      options: call.options,
    }));

    return cachedApiCall(endpoint, {
      method: 'POST',
      body: { requests },
      skipCache: true,
    });
  }
}

export const batchApiCaller = new BatchApiCaller();

// Local storage cache for persistent data
export class PersistentCache {
  private prefix: string;
  private maxAge: number;

  constructor(prefix = 'app_cache_', maxAge = 24 * 60 * 60 * 1000) {
    this.prefix = prefix;
    this.maxAge = maxAge;
  }

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      const now = Date.now();

      if (now - parsed.timestamp > this.maxAge) {
        this.delete(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      logger.error('Persistent cache get error:', error);
      return null;
    }
  }

  set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;

    try {
      const item = {
        data,
        timestamp: Date.now(),
      };

      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      logger.error('Persistent cache set error:', error);
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

export const persistentCache = new PersistentCache();

// React hook for cached data
export function useCachedData<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: {
    ttl?: number;
    persistent?: boolean;
    refreshInterval?: number;
  } = {}
) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const { ttl, persistent = false, refreshInterval } = options;
  const cacheInstance = persistent ? persistentCache : cache;

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check cache first
      const cached = cacheInstance.get<T>(key);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      // Fetch fresh data
      const result = await fetcher();
      cacheInstance.set(key, result);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, cacheInstance]);

  React.useEffect(() => {
    fetchData();

    // Set up refresh interval if specified
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// React import for the hook
import React from 'react';

// Preload critical resources
export function preloadResources(resources: string[]) {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    
    if (resource.endsWith('.js')) {
      link.rel = 'preload';
      link.as = 'script';
    } else if (resource.endsWith('.css')) {
      link.rel = 'preload';
      link.as = 'style';
    } else if (resource.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
      link.rel = 'preload';
      link.as = 'image';
    } else {
      link.rel = 'prefetch';
    }
    
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Service Worker integration for advanced caching
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
      logger.info('ServiceWorker registered:', registration);
    })
    .catch(error => {
      logger.error('ServiceWorker registration failed:', error);
    });
}
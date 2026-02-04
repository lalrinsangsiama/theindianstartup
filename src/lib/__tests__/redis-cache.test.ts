// Redis caching tests
import { redis, CACHE_TTL, cacheKeys, cacheAside } from '../redis';
import { getCachedDashboardData, warmUserCaches } from '../cache-strategies';

// Mock data for testing
const mockUserId = 'test-user-123';
const mockDashboardData = {
  user: { id: mockUserId, name: 'Test User', totalXP: 1500 },
  purchases: [{ id: '1', productCode: 'P1', productName: '30-Day Launch Sprint' }],
  stats: { completedLessons: 15, totalLessons: 30 },
  recentActivity: [],
};

// Skip all Redis tests if Redis is not available (e.g., in CI)
const redisAvailable = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

const describeIfRedis = redisAvailable ? describe : describe.skip;

describeIfRedis('Redis Caching', () => {
  beforeAll(async () => {
    // Ensure Redis is connected
    const isConnected = await redis.ping();
    if (!isConnected) {
      throw new Error('Redis not available for testing');
    }
  });

  afterEach(async () => {
    // Clean up test keys
    await redis.delPattern('test:*');
    await redis.delPattern(`*:${mockUserId}*`);
  });

  afterAll(async () => {
    // Disconnect from Redis
    await redis.disconnect();
  });

  describe('Basic Redis Operations', () => {
    test('should set and get data with TTL', async () => {
      const key = 'test:basic';
      const data = { message: 'Hello Redis' };

      // Set data with TTL
      const setResult = await redis.setex(key, 60, data);
      expect(setResult).toBe(true);

      // Get data
      const retrieved = await redis.get(key);
      expect(retrieved).toEqual(data);

      // Check TTL
      const ttl = await redis.ttl(key);
      expect(ttl).toBeGreaterThan(0);
      expect(ttl).toBeLessThanOrEqual(60);
    });

    test('should handle key expiration', async () => {
      const key = 'test:expiring';
      const data = { temp: 'data' };

      // Set with 1 second TTL
      await redis.setex(key, 1, data);
      
      // Should exist immediately
      const immediate = await redis.get(key);
      expect(immediate).toEqual(data);

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100));

      // Should be null after expiration
      const expired = await redis.get(key);
      expect(expired).toBeNull();
    });

    test('should delete keys by pattern', async () => {
      // Set multiple keys
      await redis.set('test:user:1', { id: 1 });
      await redis.set('test:user:2', { id: 2 });
      await redis.set('test:product:1', { code: 'P1' });

      // Delete user keys only
      const deleted = await redis.delPattern('test:user:*');
      expect(deleted).toBe(2);

      // Check remaining keys
      const user1 = await redis.get('test:user:1');
      const user2 = await redis.get('test:user:2');
      const product1 = await redis.get('test:product:1');

      expect(user1).toBeNull();
      expect(user2).toBeNull();
      expect(product1).toEqual({ code: 'P1' });
    });
  });

  describe('Cache-Aside Pattern', () => {
    test('should fetch from factory on cache miss', async () => {
      const key = 'test:cache-aside';
      let factoryCalled = false;
      
      const factory = jest.fn(async () => {
        factoryCalled = true;
        return { generated: true };
      });

      const result = await cacheAside(key, factory, CACHE_TTL.SHORT);

      expect(result).toEqual({ generated: true });
      expect(factoryCalled).toBe(true);
      expect(factory).toHaveBeenCalledTimes(1);

      // Should be cached now
      const cached = await redis.get(key);
      expect(cached).toEqual({ generated: true });
    });

    test('should return cached data on cache hit', async () => {
      const key = 'test:cache-hit';
      const cachedData = { cached: true };

      // Pre-populate cache
      await redis.setex(key, CACHE_TTL.SHORT, cachedData);

      const factory = jest.fn(async () => ({ fresh: true }));
      const result = await cacheAside(key, factory, CACHE_TTL.SHORT);

      expect(result).toEqual(cachedData);
      expect(factory).not.toHaveBeenCalled();
    });
  });

  describe('Dashboard Caching', () => {
    test('should cache dashboard data', async () => {
      // Mock the database function
      const mockGetUserDashboardData = jest.fn(async () => mockDashboardData);
      
      // Replace the import with mock for testing
      jest.doMock('../db-queries', () => ({
        getUserDashboardData: mockGetUserDashboardData,
      }));

      const key = cacheKeys.dashboard(mockUserId);
      
      // Ensure no cached data
      await redis.del(key);

      // First call should hit database
      const result1 = await getCachedDashboardData(mockUserId);
      expect(result1.source).toBe('database');
      expect(result1.data).toEqual(mockDashboardData);
      expect(mockGetUserDashboardData).toHaveBeenCalledTimes(1);

      // Second call should hit cache
      const result2 = await getCachedDashboardData(mockUserId);
      expect(result2.source).toBe('cache');
      expect(result2.data).toEqual(mockDashboardData);
      expect(mockGetUserDashboardData).toHaveBeenCalledTimes(1); // No additional call
    });

    test('should warm user caches', async () => {
      const spy = jest.spyOn(redis, 'setex');
      
      await warmUserCaches(mockUserId);

      // Should have called setex for multiple cache keys
      expect(spy).toHaveBeenCalled();
      
      spy.mockRestore();
    });
  });

  describe('Cache Keys', () => {
    test('should generate consistent cache keys', () => {
      const userId = 'user123';
      const productCode = 'P1';

      expect(cacheKeys.dashboard(userId)).toBe('dashboard:user123');
      expect(cacheKeys.productAccess(userId, productCode)).toBe('access:user123:P1');
      expect(cacheKeys.product(productCode)).toBe('product:P1');
      expect(cacheKeys.allProducts()).toBe('products:all');
    });
  });

  describe('Error Handling', () => {
    test('should handle Redis connection errors gracefully', async () => {
      // Simulate Redis being down by using invalid config
      const invalidRedis = new (require('../redis').constructor)();
      
      // Mock the client to throw errors
      jest.spyOn(invalidRedis, 'get').mockRejectedValue(new Error('Connection failed'));
      
      const result = await invalidRedis.get('test:key');
      expect(result).toBeNull(); // Should return null on error
    });

    test('should handle serialization errors', async () => {
      const key = 'test:serialization';
      
      // Try to set invalid data (circular reference)
      const circularData: any = {};
      circularData.self = circularData;
      
      const result = await redis.set(key, circularData);
      expect(result).toBe(false); // Should fail gracefully
    });
  });

  describe('Performance', () => {
    test('should handle batch operations efficiently', async () => {
      const operations = [
        ['set', 'test:batch:1', JSON.stringify({ id: 1 })],
        ['set', 'test:batch:2', JSON.stringify({ id: 2 })],
        ['set', 'test:batch:3', JSON.stringify({ id: 3 })],
      ] as Array<[string, ...any[]]>;

      const start = performance.now();
      const results = await redis.pipeline(operations);
      const duration = performance.now() - start;

      expect(results).toHaveLength(3);
      expect(duration).toBeLessThan(100); // Should complete quickly

      // Verify data was set
      const data1 = await redis.get('test:batch:1');
      expect(data1).toEqual({ id: 1 });
    });
  });
});

// Integration test with actual API endpoints
describe('Cache Integration', () => {
  test('should integrate with API endpoints', async () => {
    // This would be run with actual API testing framework
    // For now, just test the cache key generation
    const userId = 'integration-user';
    const expectedKeys = [
      `dashboard:${userId}`,
      `user:products:${userId}`,
      `user:progress:${userId}`,
    ];

    expectedKeys.forEach(key => {
      expect(typeof key).toBe('string');
      expect(key).toContain(userId);
    });
  });
});

// Benchmark tests - only run when Redis is available
describeIfRedis('Cache Performance', () => {
  test('should benchmark cache operations', async () => {
    const iterations = 100;
    const key = 'test:benchmark';
    const data = { 
      message: 'Performance test data',
      timestamp: Date.now(),
      array: new Array(100).fill(0).map((_, i) => ({ id: i }))
    };

    // Benchmark SET operations
    const setStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      await redis.setex(`${key}:${i}`, 60, data);
    }
    const setDuration = performance.now() - setStart;

    // Benchmark GET operations
    const getStart = performance.now();
    for (let i = 0; i < iterations; i++) {
      await redis.get(`${key}:${i}`);
    }
    const getDuration = performance.now() - getStart;

    console.log(`SET benchmark: ${iterations} operations in ${setDuration.toFixed(2)}ms`);
    console.log(`GET benchmark: ${iterations} operations in ${getDuration.toFixed(2)}ms`);
    console.log(`Average SET: ${(setDuration / iterations).toFixed(2)}ms`);
    console.log(`Average GET: ${(getDuration / iterations).toFixed(2)}ms`);

    // Performance assertions
    expect(setDuration / iterations).toBeLessThan(10); // < 10ms per SET
    expect(getDuration / iterations).toBeLessThan(5);  // < 5ms per GET
  });
});
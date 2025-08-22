import { logger } from '@/lib/logger';

// Performance monitoring and optimization utilities

interface PerformanceMetric {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private timers: Map<string, number> = new Map();
  private enabled: boolean = process.env.NODE_ENV === 'development';

  // Start timing an operation
  startTimer(name: string): void {
    if (!this.enabled) return;
    this.timers.set(name, performance.now());
  }

  // End timing and record metric
  endTimer(name: string, metadata?: Record<string, any>): number {
    if (!this.enabled) return 0;
    
    const startTime = this.timers.get(name);
    if (!startTime) {
      logger.warn(`Timer ${name} was not started`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    this.metrics.push({
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    });
    
    // Log slow operations
    if (duration > 1000) {
      logger.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`, metadata);
    }
    
    return duration;
  }

  // Measure async function performance
  async measure<T>(
    name: string,
    fn: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    this.startTimer(name);
    try {
      const result = await fn();
      this.endTimer(name, metadata);
      return result;
    } catch (error) {
      this.endTimer(name, { ...metadata, error: true });
      throw error;
    }
  }

  // Get performance summary
  getSummary(): {
    totalMetrics: number;
    averageDuration: number;
    slowestOperations: PerformanceMetric[];
    recentMetrics: PerformanceMetric[];
  } {
    const sortedByDuration = [...this.metrics].sort((a, b) => b.duration - a.duration);
    const totalDuration = this.metrics.reduce((sum, m) => sum + m.duration, 0);
    
    return {
      totalMetrics: this.metrics.length,
      averageDuration: this.metrics.length > 0 ? totalDuration / this.metrics.length : 0,
      slowestOperations: sortedByDuration.slice(0, 10),
      recentMetrics: this.metrics.slice(-20),
    };
  }

  // Clear metrics
  clear(): void {
    this.metrics = [];
    this.timers.clear();
  }

  // Export metrics for analysis
  exportMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }
}

// Singleton instance
export const perfMonitor = new PerformanceMonitor();

// Database query monitoring wrapper
export async function monitorQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>,
  metadata?: Record<string, any>
): Promise<T> {
  return perfMonitor.measure(`db:${queryName}`, queryFn, metadata);
}

// API route monitoring wrapper
export async function monitorApiRoute<T>(
  routeName: string,
  handler: () => Promise<T>
): Promise<T> {
  return perfMonitor.measure(`api:${routeName}`, handler);
}

// Component render monitoring (for client-side)
export function usePerformanceMonitor(componentName: string) {
  if (typeof window === 'undefined') return;
  
  const startTime = performance.now();
  
  // Use effect to measure mount time
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    window.requestAnimationFrame(() => {
      const mountTime = performance.now() - startTime;
      if (mountTime > 100) {
        logger.warn(`Slow component mount: ${componentName} took ${mountTime.toFixed(2)}ms`);
      }
    });
  }
}

// Performance optimization decorators
export function measurePerformance(prefix: string = '') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      const methodName = `${prefix}${target.constructor.name}.${propertyKey}`;
      return perfMonitor.measure(methodName, () => originalMethod.apply(this, args));
    };
    
    return descriptor;
  };
}

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle utility for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Batch operations for performance
export class BatchProcessor<T, R> {
  private queue: Array<{ item: T; resolve: (value: R) => void; reject: (error: any) => void }> = [];
  private timer: NodeJS.Timeout | null = null;
  
  constructor(
    private processFn: (items: T[]) => Promise<R[]>,
    private batchSize: number = 50,
    private delay: number = 100
  ) {}
  
  async add(item: T): Promise<R> {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject });
      this.scheduleBatch();
    });
  }
  
  private scheduleBatch() {
    if (this.timer) return;
    
    this.timer = setTimeout(() => this.processBatch(), this.delay);
  }
  
  private async processBatch() {
    this.timer = null;
    
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0, this.batchSize);
    const items = batch.map(b => b.item);
    
    try {
      const results = await this.processFn(items);
      batch.forEach((b, i) => b.resolve(results[i]));
    } catch (error) {
      batch.forEach(b => b.reject(error));
    }
    
    // Process remaining items
    if (this.queue.length > 0) {
      this.scheduleBatch();
    }
  }
}

// Resource loading optimization
export class ResourceLoader {
  private static preloadedResources = new Set<string>();
  
  static preloadImage(src: string): void {
    if (typeof window === 'undefined' || this.preloadedResources.has(src)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
    
    this.preloadedResources.add(src);
  }
  
  static prefetchRoute(href: string): void {
    if (typeof window === 'undefined' || this.preloadedResources.has(href)) return;
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
    
    this.preloadedResources.add(href);
  }
}

// Memory leak detection (development only)
export class MemoryMonitor {
  private static instances = new WeakMap<object, string>();
  
  static track(instance: object, name: string): void {
    if (process.env.NODE_ENV !== 'development') return;
    this.instances.set(instance, name);
  }
  
  static checkLeaks(): void {
    if (process.env.NODE_ENV !== 'development') return;
    
    // This is a simplified version
    // In production, use proper memory profiling tools
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      logger.info('Memory usage:', {
        usedJSHeapSize: (memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
        totalJSHeapSize: (memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
        jsHeapSizeLimit: (memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
      });
    }
  }
}

// Performance best practices checker
export function checkPerformance() {
  const warnings: string[] = [];
  
  // Check bundle size (simplified)
  if (typeof window !== 'undefined') {
    const scripts = document.querySelectorAll('script');
    let totalSize = 0;
    
    scripts.forEach(script => {
      if (script.src) {
        // This is a rough estimate
        totalSize += script.innerHTML.length;
      }
    });
    
    if (totalSize > 1000000) {
      warnings.push('Bundle size might be too large');
    }
  }
  
  // Check for memory leaks
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    if (memory.usedJSHeapSize / memory.jsHeapSizeLimit > 0.9) {
      warnings.push('High memory usage detected');
    }
  }
  
  return warnings;
}

// Export performance middleware for Next.js
export function performanceMiddleware(req: any, res: any, next: () => void) {
  const start = Date.now();
  
  // Override res.end to measure response time
  const originalEnd = res.end;
  res.end = function (...args: any[]) {
    const duration = Date.now() - start;
    
    // Log slow requests
    if (duration > 1000) {
      logger.warn(`Slow request: ${req.method} ${req.url} took ${duration}ms`);
    }
    
    // Add performance headers
    res.setHeader('X-Response-Time', `${duration}ms`);
    res.setHeader('X-Performance-Monitor', 'active');
    
    originalEnd.apply(res, args);
  };
  
  next();
}
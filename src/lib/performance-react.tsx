// React performance monitoring utilities
import React, { useEffect, useRef, ComponentType, PropsWithChildren } from 'react';
import { logger } from '@/lib/logger';
import { perfMonitor } from './performance';

// HOC for component performance tracking
export function withPerformance<P extends object>(
  Component: ComponentType<P>,
  componentName?: string
) {
  const displayName = componentName || Component.displayName || Component.name || 'Component';
  
  const WrappedComponent = (props: P) => {
    const renderStartTime = useRef(performance.now());
    const mountStartTime = useRef<number | null>(null);
    const hasMounted = useRef(false);
    
    // Track mount time
    useEffect(() => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        mountStartTime.current = performance.now();
        
        // Use requestAnimationFrame to measure after paint
        requestAnimationFrame(() => {
          const mountTime = performance.now() - renderStartTime.current;
          
          if (process.env.NODE_ENV === 'development') {
            if (mountTime > 100) {
              logger.warn(
                `⚠️ Slow mount: ${displayName} took ${mountTime.toFixed(2)}ms`
              );
            } else if (mountTime > 50) {
              logger.info(
                `⏱️ ${displayName} mounted in ${mountTime.toFixed(2)}ms`
              );
            }
          }
          
          // Track in performance monitor
          perfMonitor.endTimer(`react:mount:${displayName}`, {
            component: displayName,
            mountTime,
          });
        });
      }
    }, []);
    
    // Track re-renders
    useEffect(() => {
      if (hasMounted.current && mountStartTime.current) {
        const rerenderTime = performance.now() - mountStartTime.current;
        
        if (process.env.NODE_ENV === 'development' && rerenderTime > 50) {
          logger.info(
            `🔄 ${displayName} re-rendered in ${rerenderTime.toFixed(2)}ms`
          );
        }
      }
    });
    
    // Start timing for next render
    useEffect(() => {
      renderStartTime.current = performance.now();
    });
    
    return <Component {...props} />;
  };
  
  WrappedComponent.displayName = `withPerformance(${displayName})`;
  
  return WrappedComponent;
}

// Hook for manual performance tracking
export function usePerformance(metricName: string) {
  const startTimeRef = useRef<number | null>(null);
  
  const startMeasure = () => {
    startTimeRef.current = performance.now();
    perfMonitor.startTimer(metricName);
  };
  
  const endMeasure = (metadata?: Record<string, any>) => {
    if (startTimeRef.current === null) {
      logger.warn(`Performance measure ${metricName} was not started`);
      return;
    }
    
    const duration = performance.now() - startTimeRef.current;
    perfMonitor.endTimer(metricName, { ...metadata, duration });
    startTimeRef.current = null;
    
    return duration;
  };
  
  return { startMeasure, endMeasure };
}

// Component for tracking render performance
export function PerformanceTracker({ 
  name, 
  children 
}: PropsWithChildren<{ name: string }>) {
  const renderStart = useRef(performance.now());
  
  useEffect(() => {
    const renderTime = performance.now() - renderStart.current;
    
    if (process.env.NODE_ENV === 'development' && renderTime > 50) {
      logger.info(`⏱️ ${name} rendered in ${renderTime.toFixed(2)}ms`);
    }
    
    perfMonitor.endTimer(`react:render:${name}`, { renderTime });
  });
  
  return <>{children}</>;
}

// Hook for tracking expensive operations
export function useExpensiveOperation<T>(
  operationName: string,
  operation: () => T,
  dependencies: React.DependencyList
): T {
  const resultRef = useRef<T>();
  const { startMeasure, endMeasure } = usePerformance(`operation:${operationName}`);
  
  useEffect(() => {
    startMeasure();
    resultRef.current = operation();
    const duration = endMeasure();
    
    if (duration && duration > 100) {
      logger.warn(
        `⚠️ Expensive operation: ${operationName} took ${duration.toFixed(2)}ms`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
  
  return resultRef.current as T;
}

// React Profiler integration
export function ProfilerWrapper({
  id,
  children,
}: PropsWithChildren<{ id: string }>) {
  const onRenderCallback: React.ProfilerOnRenderCallback = (
    id: string,
    phase: 'mount' | 'update' | 'nested-update',
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    if (process.env.NODE_ENV === 'development') {
      const data = {
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactionCount: 0,
      };
      
      // Log slow renders
      if (actualDuration > 16) { // Over 1 frame at 60fps
        logger.warn(`⚠️ Slow ${phase}: ${id} took ${actualDuration.toFixed(2)}ms`, data);
      }
      
      // Track in performance monitor
      perfMonitor.endTimer(`react:${phase}:${id}`, data);
    }
  };
  
  return (
    <React.Profiler id={id} onRender={onRenderCallback}>
      {children}
    </React.Profiler>
  );
}

// Performance boundary for error tracking
export class PerformanceBoundary extends React.Component<
  PropsWithChildren<{ name: string }>,
  { hasError: boolean; error?: Error }
> {
  constructor(props: PropsWithChildren<{ name: string }>) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error(`Performance boundary ${this.props.name} caught error:`, error);
    
    // Track error in performance monitor
    perfMonitor.endTimer(`react:error:${this.props.name}`, {
      error: error.message,
      componentStack: errorInfo.componentStack,
    });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-800 font-semibold">
            Performance Error in {this.props.name}
          </h3>
          <p className="text-red-600 text-sm mt-1">
            {this.state.error?.message || 'An error occurred'}
          </p>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Lazy loading with performance tracking
export function lazyWithPerformance<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  componentName: string
) {
  const LazyComponent = React.lazy(async () => {
    perfMonitor.startTimer(`react:lazy:${componentName}`);
    
    try {
      const moduleResult = await importFn();
      perfMonitor.endTimer(`react:lazy:${componentName}`, { success: true });
      return moduleResult;
    } catch (error) {
      perfMonitor.endTimer(`react:lazy:${componentName}`, { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  });
  
  return LazyComponent;
}

// Performance context for app-wide metrics
interface PerformanceContextValue {
  trackEvent: (eventName: string, data?: Record<string, any>) => void;
  getMetrics: () => any;
}

const PerformanceContext = React.createContext<PerformanceContextValue | null>(null);

export function PerformanceProvider({ children }: PropsWithChildren) {
  const trackEvent = (eventName: string, data?: Record<string, any>) => {
    perfMonitor.startTimer(eventName);
    perfMonitor.endTimer(eventName, data);
  };
  
  const getMetrics = () => {
    return perfMonitor.getSummary();
  };
  
  return (
    <PerformanceContext.Provider value={{ trackEvent, getMetrics }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformanceContext() {
  const context = React.useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within PerformanceProvider');
  }
  return context;
}

// Utility to measure component render count
export function useRenderCount(componentName: string) {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV === 'development' && renderCount.current > 10) {
      logger.warn(
        `⚠️ ${componentName} has rendered ${renderCount.current} times. Consider optimization.`
      );
    }
  });
  
  return renderCount.current;
}

// Performance debugging helper
export function PerformanceDebugger({ show = false }: { show?: boolean }) {
  const metrics = perfMonitor.getSummary();
  
  if (!show || process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-lg max-w-md z-50">
      <h3 className="font-bold mb-2">Performance Metrics</h3>
      <div className="text-xs space-y-1">
        <div>Total operations: {metrics.totalMetrics}</div>
        <div>Avg duration: {metrics.averageDuration.toFixed(2)}ms</div>
        <div className="mt-2">
          <div className="font-semibold">Slowest Operations:</div>
          {metrics.slowestOperations.slice(0, 5).map((op, i) => (
            <div key={i} className="ml-2">
              {op.name}: {op.duration.toFixed(2)}ms
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Optimized Image component with lazy loading and performance tracking
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = React.memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const { startMeasure, endMeasure } = usePerformance(`image-load:${src}`);

  const handleLoad = React.useCallback(() => {
    setIsLoaded(true);
    endMeasure({ success: true, src, alt });
    onLoad?.();
  }, [onLoad, endMeasure, src, alt]);

  const handleError = React.useCallback(() => {
    setHasError(true);
    endMeasure({ success: false, error: 'load_failed', src, alt });
    onError?.();
  }, [src, alt, onError, endMeasure]);

  // Intersection observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    startMeasure();
    const img = imgRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetImg = entry.target as HTMLImageElement;
            if (targetImg.dataset.src) {
              targetImg.src = targetImg.dataset.src;
              targetImg.removeAttribute('data-src');
              observer.unobserve(targetImg);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, [priority, startMeasure]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={priority ? src : undefined}
      data-src={priority ? undefined : src}
      alt={alt}
      width={width}
      height={height}
      className={`transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
});

// Virtual scroll for large datasets
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  overscan?: number;
}

export function VirtualScroll({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
}: VirtualScrollProps) {
  const [scrollTop, setScrollTop] = React.useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length - 1
  );

  const paddingTop = visibleStart * itemHeight;
  const paddingBottom = (items.length - visibleEnd - 1) * itemHeight;

  const visibleItems = React.useMemo(() => {
    const start = Math.max(0, visibleStart - overscan);
    const end = Math.min(items.length - 1, visibleEnd + overscan);
    return items.slice(start, end + 1).map((item, index) => ({
      item,
      index: start + index,
    }));
  }, [items, visibleStart, visibleEnd, overscan]);

  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      ref={scrollRef}
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ paddingTop, paddingBottom }}>
        {visibleItems.map(({ item, index }) => (
          <div key={index} style={{ height: itemHeight }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Debounced value hook for expensive operations
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Web Vitals tracking
export function useWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    import('web-vitals').then(({ onLCP, onINP, onCLS, onFCP, onTTFB }) => {
      onLCP((metric: any) => {
        perfMonitor.endTimer('web-vitals:LCP', { value: metric.value, name: 'LCP' });
      });
      
      onINP((metric: any) => {
        perfMonitor.endTimer('web-vitals:INP', { value: metric.value, name: 'INP' });
      });
      
      onCLS((metric: any) => {
        perfMonitor.endTimer('web-vitals:CLS', { value: metric.value, name: 'CLS' });
      });
      
      onFCP((metric: any) => {
        perfMonitor.endTimer('web-vitals:FCP', { value: metric.value, name: 'FCP' });
      });
      
      onTTFB((metric: any) => {
        perfMonitor.endTimer('web-vitals:TTFB', { value: metric.value, name: 'TTFB' });
      });
    }).catch(() => {
      // Fallback for environments without web-vitals
      logger.info('Web Vitals not available');
    });
  }, []);
}
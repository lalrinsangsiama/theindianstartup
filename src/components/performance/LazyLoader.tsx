'use client';

import React, { Suspense, lazy, ComponentType } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/Skeleton';

interface LazyLoaderProps {
  loading?: React.ComponentType;
  error?: React.ComponentType<{ error: Error; retry: () => void }>;
  delay?: number;
}

// Higher-order component for lazy loading
export function withLazyLoading<T extends object = object>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: LazyLoaderProps = {}
) {
  const LazyComponent = lazy(importFn as () => Promise<{ default: ComponentType<T> }>);

  return function LazyWrappedComponent(props: T) {
    const LoadingComponent = options.loading || DefaultLoadingComponent;
    const ErrorComponent = options.error || DefaultErrorComponent;

    return (
      <ErrorBoundary ErrorComponent={ErrorComponent}>
        <Suspense fallback={<LoadingComponent />}>
          {/* @ts-expect-error - Props type mismatch with lazy component */}
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

// Default loading component
const DefaultLoadingComponent = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

// Default error component
const DefaultErrorComponent = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
    <h3 className="text-red-800 font-medium mb-2">Failed to load component</h3>
    <p className="text-red-600 text-sm mb-3">{error.message}</p>
    <button
      onClick={retry}
      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
    >
      Retry
    </button>
  </div>
);

// Error boundary for lazy loaded components
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; ErrorComponent: React.ComponentType<{ error: Error; retry: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return <this.props.ErrorComponent error={this.state.error} retry={this.retry} />;
    }

    return this.props.children;
  }
}

// Intersection Observer based lazy loader for non-critical components
export function LazyIntersectionLoader({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  fallback = <DefaultLoadingComponent />,
}: {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {isIntersecting ? children : fallback}
    </div>
  );
}

// Preload component data on hover
export function PreloadOnHover({
  children,
  preloadFn,
}: {
  children: React.ReactNode;
  preloadFn: () => Promise<any>;
}) {
  const [preloaded, setPreloaded] = React.useState(false);

  const handleMouseEnter = React.useCallback(() => {
    if (!preloaded) {
      preloadFn().catch(console.error);
      setPreloaded(true);
    }
  }, [preloaded, preloadFn]);

  return (
    <div onMouseEnter={handleMouseEnter}>
      {children}
    </div>
  );
}

// Utility for chunked loading of large lists
export function ChunkedLoader<T>({
  items,
  renderItem,
  chunkSize = 20,
  loadMoreText = "Load More",
  className = "",
}: {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  chunkSize?: number;
  loadMoreText?: string;
  className?: string;
}) {
  const [loadedCount, setLoadedCount] = React.useState(chunkSize);
  
  const visibleItems = items.slice(0, loadedCount);
  const hasMore = loadedCount < items.length;

  const loadMore = () => {
    setLoadedCount(prev => Math.min(prev + chunkSize, items.length));
  };

  return (
    <div className={className}>
      {visibleItems.map(renderItem)}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            {loadMoreText}
          </button>
        </div>
      )}
    </div>
  );
}

// Progressive image loader
export function ProgressiveImage({
  src,
  placeholder,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  placeholder?: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  return (
    <div className={`relative ${className}`}>
      {placeholder && !isLoaded && !isError && (
        <Image
          src={placeholder}
          alt=""
          fill
          className="absolute inset-0 object-cover blur-sm"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
      {isError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
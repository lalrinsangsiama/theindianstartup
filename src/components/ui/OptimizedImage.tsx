'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/Skeleton';
import { logger } from '@/lib/logger';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: (error: string | React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallbackSrc?: string;
  skeleton?: boolean;
  lazyBoundary?: string;
}

// Generate a simple blur placeholder
function generateBlurDataURL(width = 10, height = 10): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Create a simple gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

// Intersection Observer hook for lazy loading
function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '50px' }: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return isIntersecting;
}

// Optimized Image Component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  fill = false,
  sizes,
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError,
  fallbackSrc,
  skeleton = true,
  lazyBoundary = '50px',
  ...props
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLDivElement>(null);
  
  // Always call the hook, but conditionally use its result
  const isIntersecting = useIntersectionObserver(imgRef, { rootMargin: lazyBoundary });
  
  // Only load if priority, eager loading, or intersecting
  const shouldLoad = priority || loading === 'eager' || isIntersecting;

  // Generate blur placeholder if not provided
  const blurPlaceholder = blurDataURL || 
    (typeof window !== 'undefined' && placeholder === 'blur' 
      ? generateBlurDataURL(width, height) 
      : undefined);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = (error: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    
    // Try fallback image if provided
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setImageError(false);
      return;
    }
    
    logger.error('Image failed to load:', { src: currentSrc, alt });
    onError?.(error);
  };

  // Reset state when src changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setCurrentSrc(src);
  }, [src]);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {shouldLoad ? (
        <>
          {/* Show skeleton while loading */}
          {skeleton && !imageLoaded && !imageError && (
            <Skeleton 
              className={`absolute inset-0 ${width ? `w-[${width}px]` : 'w-full'} ${height ? `h-[${height}px]` : 'h-full'}`} 
            />
          )}
          
          {/* Actual image */}
          {!imageError && (
            <Image
              src={currentSrc}
              alt={alt}
              width={fill ? undefined : width}
              height={fill ? undefined : height}
              fill={fill}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurPlaceholder}
              sizes={sizes}
              quality={quality}
              className={`transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleLoad}
              onError={handleError}
              {...props}
            />
          )}
          
          {/* Error fallback */}
          {imageError && (
            <div className={`bg-gray-100 flex items-center justify-center ${
              fill ? 'absolute inset-0' : `w-[${width}px] h-[${height}px]`
            }`}>
              <div className="text-center text-gray-500 p-4">
                <svg
                  className="w-8 h-8 mx-auto mb-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs">Image unavailable</span>
              </div>
            </div>
          )}
        </>
      ) : (
        // Placeholder while waiting for intersection
        skeleton && (
          <Skeleton 
            className={`${width ? `w-[${width}px]` : 'w-full'} ${height ? `h-[${height}px]` : 'h-full'}`} 
          />
        )
      )}
    </div>
  );
}

// Avatar component with optimizations
export function OptimizedAvatar({
  src,
  alt,
  size = 40,
  fallbackText,
  className = '',
  ...props
}: {
  src?: string;
  alt: string;
  size?: number;
  fallbackText?: string;
  className?: string;
} & Omit<OptimizedImageProps, 'width' | 'height' | 'fill'>) {
  const [imageError, setImageError] = useState(false);

  // Generate initials from alt text or fallbackText
  const initials = (fallbackText || alt)
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  if (!src || imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-300 text-gray-600 font-medium rounded-full ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`rounded-full overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        {...props}
      />
    </div>
  );
}

// Gallery component with lazy loading
export function OptimizedGallery({
  images,
  columns = 3,
  gap = 4,
  className = '',
}: {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
    caption?: string;
  }>;
  columns?: number;
  gap?: number;
  className?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(Math.min(6, images.length));
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 6, images.length));
  };

  return (
    <div className={className}>
      <div 
        className={`grid gap-${gap}`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {images.slice(0, visibleCount).map((image, index) => (
          <div key={index} className="aspect-square">
            <OptimizedImage
              src={image.src}
              alt={image.alt}
              fill
              sizes={`(max-width: 768px) 50vw, (max-width: 1200px) ${100/columns}vw, ${100/columns}vw`}
              className="rounded-lg"
              priority={index < 3} // Prioritize first row
            />
            {image.caption && (
              <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
            )}
          </div>
        ))}
      </div>
      
      {visibleCount < images.length && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Load More ({images.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}

// Responsive image component
export function ResponsiveImage({
  src,
  alt,
  aspectRatio = '16/9',
  className = '',
  ...props
}: OptimizedImageProps & {
  aspectRatio?: string;
}) {
  return (
    <div 
      className={`relative w-full ${className}`}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
}

// Preload images for better UX
export function preloadImages(srcs: string[]) {
  if (typeof window === 'undefined') return;

  srcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Image optimization utilities
export const imageUtils = {
  // Generate responsive image URLs (if using a CDN)
  getResponsiveUrl: (src: string, width: number, quality = 75) => {
    // This would integrate with your CDN's image optimization
    // For now, return the original URL
    return src;
  },

  // Generate WebP version
  getWebPUrl: (src: string) => {
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  },

  // Calculate optimal dimensions
  calculateOptimalSize: (containerWidth: number, devicePixelRatio = 1) => {
    return Math.ceil(containerWidth * devicePixelRatio);
  },

  // Generate blur data URL from image
  generateBlurDataURL: (src: string, width = 10, height = 10) => {
    // This would generate a blur placeholder from the actual image
    // For now, return a simple placeholder
    return generateBlurDataURL(width, height);
  },
};
import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    className, 
    src, 
    alt, 
    fallback,
    size = 'md',
    shape = 'circle',
    ...props 
  }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
    };
    
    const shapes = {
      circle: 'rounded-full',
      square: 'rounded-md',
    };
    
    const showFallback = !src || imageError;
    const fallbackText = fallback || alt?.charAt(0).toUpperCase() || '?';
    
    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-gray-200',
          sizes[size],
          shapes[shape],
          className
        )}
        {...props}
      >
        {!showFallback && (
          <Image
            src={src!}
            alt={alt || 'Avatar'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            className="object-cover"
          />
        )}
        
        {showFallback && (
          <span className="font-heading font-semibold text-gray-600 uppercase">
            {fallbackText}
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max = 3, size = 'md', children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - visibleChildren.length;
    
    const overlapClasses = {
      xs: '-space-x-2',
      sm: '-space-x-2.5',
      md: '-space-x-3',
      lg: '-space-x-3.5',
      xl: '-space-x-4',
    };
    
    return (
      <div
        ref={ref}
        className={cn('flex items-center', overlapClasses[size], className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative border-2 border-white rounded-full">
            {React.isValidElement(child) && React.cloneElement(child as any, { size })}
          </div>
        ))}
        
        {remainingCount > 0 && (
          <Avatar
            size={size}
            fallback={`+${remainingCount}`}
            className="relative border-2 border-white"
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarGroup };
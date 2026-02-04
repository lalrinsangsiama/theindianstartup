import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = 'rectangular',
    width,
    height,
    style,
    ...props 
  }, ref) => {
    const variants = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    };
    
    const defaultHeights = {
      text: '1em',
      circular: '40px',
      rectangular: '20px',
    };
    
    const defaultWidths = {
      text: '100%',
      circular: '40px',
      rectangular: '100%',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-muted',
          variants[variant],
          className
        )}
        style={{
          width: width || defaultWidths[variant],
          height: height || defaultHeights[variant],
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Card Skeleton
export const CardSkeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('border-2 border-gray-200 p-6', className)}
    {...props}
  >
    <Skeleton variant="text" height="24px" width="60%" className="mb-3" />
    <Skeleton variant="text" height="16px" width="100%" className="mb-2" />
    <Skeleton variant="text" height="16px" width="80%" className="mb-4" />
    <div className="flex gap-2">
      <Skeleton variant="rectangular" height="32px" width="80px" />
      <Skeleton variant="rectangular" height="32px" width="80px" />
    </div>
  </div>
);

// List Skeleton
export const ListSkeleton: React.FC<{ 
  count?: number;
  className?: string;
}> = ({ count = 5, className }) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3">
        <Skeleton variant="circular" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height="16px" width="30%" />
          <Skeleton variant="text" height="14px" width="50%" />
        </div>
      </div>
    ))}
  </div>
);

// Table Skeleton
export const TableSkeleton: React.FC<{ 
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className }) => (
  <div className={cn('w-full', className)}>
    <div className="mb-4">
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton 
            key={i} 
            variant="text" 
            height="16px" 
            width={`${100 / columns}%`} 
          />
        ))}
      </div>
    </div>
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={colIndex} 
              variant="text" 
              height="14px" 
              width={`${100 / columns}%`} 
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Form Skeleton
export const FormSkeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn('space-y-6', className)} {...props}>
    <div>
      <Skeleton variant="text" height="14px" width="120px" className="mb-2" />
      <Skeleton variant="rectangular" height="40px" />
    </div>
    <div>
      <Skeleton variant="text" height="14px" width="100px" className="mb-2" />
      <Skeleton variant="rectangular" height="40px" />
    </div>
    <div>
      <Skeleton variant="text" height="14px" width="140px" className="mb-2" />
      <Skeleton variant="rectangular" height="80px" />
    </div>
    <Skeleton variant="rectangular" height="40px" width="120px" />
  </div>
);

export { Skeleton };
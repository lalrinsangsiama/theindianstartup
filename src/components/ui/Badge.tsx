import * as React from 'react';
import { cn } from '@/lib/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'badge-base font-heading uppercase tracking-wider border';
    
    const variants = {
      default: 'bg-gray-900 text-white border-gray-900',
      success: 'bg-emerald-600 text-white border-emerald-600',
      warning: 'bg-amber-600 text-white border-amber-600',
      error: 'bg-red-600 text-white border-red-600',
      outline: 'bg-transparent text-black border-black',
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Achievement Badge Component for Gamification
export interface AchievementBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  name: string;
  description?: string;
  unlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AchievementBadge = React.forwardRef<HTMLDivElement, AchievementBadgeProps>(
  ({ className, icon, name, description, unlocked = false, size = 'md', ...props }, ref) => {
    const sizeStyles = {
      sm: 'w-16 h-16',
      md: 'w-20 h-20',
      lg: 'w-24 h-24',
    };
    
    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-2 group cursor-pointer',
          className
        )}
        {...props}
      >
        <div className={cn(
          'relative flex items-center justify-center border-2 transition-all duration-300',
          sizeStyles[size],
          unlocked 
            ? 'bg-black text-white border-black' 
            : 'bg-gray-100 text-gray-400 border-gray-300 grayscale'
        )}>
          {icon && (
            <div className={cn(
              'transition-transform duration-300',
              unlocked && 'group-hover:scale-110'
            )}>
              {icon}
            </div>
          )}
          {!unlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>
        <div className="text-center">
          <p className={cn(
            'font-heading font-semibold',
            textSizes[size],
            unlocked ? 'text-black' : 'text-gray-500'
          )}>
            {name}
          </p>
          {description && (
            <p className={cn(
              'text-gray-600 mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }
);

AchievementBadge.displayName = 'AchievementBadge';

export { Badge, AchievementBadge };
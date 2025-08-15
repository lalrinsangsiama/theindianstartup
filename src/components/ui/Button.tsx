import * as React from 'react';
import { cn } from '@/lib/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    loadingText,
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'btn-base font-heading uppercase tracking-wider relative overflow-hidden group';
    
    const variants = {
      primary: 'bg-black text-white hover:bg-gray-900 border-2 border-black',
      secondary: 'bg-white text-black hover:bg-gray-50 border-2 border-black',
      outline: 'bg-transparent text-black hover:bg-black hover:text-white border-2 border-black',
      ghost: 'bg-transparent text-black hover:bg-gray-100 border-2 border-transparent',
    };
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && 'cursor-wait',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className={cn(
          'relative z-10 flex items-center justify-center gap-2',
          isLoading && 'opacity-0'
        )}>
          {children}
        </span>
        
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText && <span>{loadingText}</span>}
          </span>
        )}
        
        {/* Typewriter-style hover effect for outline variant */}
        {variant === 'outline' && (
          <span 
            className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
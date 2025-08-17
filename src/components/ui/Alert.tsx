'use client';

import * as React from 'react';
import { cn } from '../lib/cn';
import { AlertCircle, CheckCircle, Info, XCircle, X as XIcon } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = 'default', 
    title,
    icon,
    showIcon = true,
    children,
    ...props 
  }, ref) => {
    const variants = {
      default: {
        container: 'bg-gray-50 border-gray-200',
        icon: 'text-gray-600',
        title: 'text-gray-900',
        content: 'text-gray-700',
      },
      success: {
        container: 'bg-emerald-50 border-emerald-200',
        icon: 'text-emerald-600',
        title: 'text-emerald-900',
        content: 'text-emerald-700',
      },
      warning: {
        container: 'bg-amber-50 border-amber-200',
        icon: 'text-amber-600',
        title: 'text-amber-900',
        content: 'text-amber-700',
      },
      error: {
        container: 'bg-red-50 border-red-200',
        icon: 'text-red-600',
        title: 'text-red-900',
        content: 'text-red-700',
      },
      info: {
        container: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-900',
        content: 'text-blue-700',
      },
    };
    
    const defaultIcons = {
      default: <Info className="h-5 w-5" />,
      success: <CheckCircle className="h-5 w-5" />,
      warning: <AlertCircle className="h-5 w-5" />,
      error: <XCircle className="h-5 w-5" />,
      info: <Info className="h-5 w-5" />,
    };
    
    const styles = variants[variant];
    const displayIcon = icon || defaultIcons[variant];
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative border p-4',
          styles.container,
          className
        )}
        {...props}
      >
        <div className="flex">
          {showIcon && (
            <div className={cn('flex-shrink-0', styles.icon)}>
              {displayIcon}
            </div>
          )}
          
          <div className={cn('flex-1', showIcon && 'ml-3')}>
            {title && (
              <h3 className={cn('font-heading font-semibold text-sm', styles.title)}>
                {title}
              </h3>
            )}
            
            <div className={cn(
              'text-sm',
              styles.content,
              title && 'mt-1'
            )}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

// Toast Component for temporary notifications
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  onClose?: () => void;
  duration?: number;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ 
    className, 
    variant = 'default',
    title,
    description,
    onClose,
    duration = 5000,
    ...props 
  }, ref) => {
    React.useEffect(() => {
      if (duration && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);
    
    const variants = {
      default: 'bg-white border-gray-200',
      success: 'bg-white border-emerald-200',
      warning: 'bg-white border-amber-200',
      error: 'bg-white border-red-200',
    };
    
    const icons = {
      default: <Info className="h-5 w-5 text-gray-600" />,
      success: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      warning: <AlertCircle className="h-5 w-5 text-amber-600" />,
      error: <XCircle className="h-5 w-5 text-red-600" />,
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'pointer-events-auto w-full max-w-sm overflow-hidden bg-white shadow-lg border-2',
          variants[variant],
          'animate-fade-in',
          className
        )}
        {...props}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {icons[variant]}
            </div>
            <div className="ml-3 w-0 flex-1">
              {title && (
                <p className="font-heading font-semibold text-sm text-gray-900">
                  {title}
                </p>
              )}
              {description && (
                <p className={cn('text-sm text-gray-600', title && 'mt-1')}>
                  {description}
                </p>
              )}
            </div>
            {onClose && (
              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export { Alert, Toast };
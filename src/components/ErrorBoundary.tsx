'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: 'page' | 'section' | 'component';
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: NodeJS.Timeout | null = null;
  private errorCounter = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: undefined,
      errorCount: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError, level = 'component' } = this.props;
    
    // Increment error counter
    this.errorCounter++;
    
    // Log error with context
    logger.error(`ErrorBoundary caught error at ${level} level`, error, {
      componentStack: errorInfo.componentStack,
      errorBoundaryLevel: level,
      errorCount: this.errorCounter,
      props: this.props,
    });

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // Update state with error info
    this.setState({
      errorInfo,
      errorCount: this.errorCounter,
    });

    // Auto-reset after 10 seconds if it's a component-level error
    if (level === 'component' && !this.resetTimeoutId) {
      this.resetTimeoutId = setTimeout(() => {
        this.resetErrorBoundary();
      }, 10000);
    }

    // Send error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.reportErrorToService(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;
    
    // Reset error boundary if resetKeys changed
    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys?.some((key, idx) => key !== prevProps.resetKeys?.[idx])) {
        this.resetErrorBoundary();
      }
    }
    
    // Reset if props changed and resetOnPropsChange is true
    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }
    
    this.errorCounter = 0;
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorCount: 0,
    });
  };

  reportErrorToService(error: Error, errorInfo: ErrorInfo) {
    // This would integrate with Sentry, LogRocket, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    };

    // Send to error tracking service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorReport),
    }).catch(() => {
      // Silently fail - don't throw errors in error boundary
    });
  }

  render() {
    const { hasError, error, errorInfo, errorCount } = this.state;
    const { children, fallback, isolate, level = 'component', showDetails } = this.props;

    if (hasError && error) {
      // Custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      // Different UI based on error boundary level
      switch (level) {
        case 'page':
          return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
              <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Something went wrong
                  </h1>
                  
                  <p className="text-gray-600 mb-6">
                    We encountered an unexpected error. The issue has been logged and we'll look into it.
                  </p>

                  {errorCount > 2 && (
                    <p className="text-sm text-orange-600 mb-4">
                      Multiple errors detected. Please refresh the page.
                    </p>
                  )}

                  {showDetails && process.env.NODE_ENV === 'development' && (
                    <details className="w-full mb-6 text-left">
                      <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                        Error details (Development only)
                      </summary>
                      <div className="mt-2 p-3 bg-gray-100 rounded text-xs">
                        <p className="font-mono text-red-600 mb-2">{error.message}</p>
                        <pre className="whitespace-pre-wrap text-gray-600">
                          {error.stack}
                        </pre>
                      </div>
                    </details>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={this.resetErrorBoundary}
                      variant="primary"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    
                    <Link href="/">
                      <Button variant="outline">
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );

        case 'section':
          return (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">
                    Section Error
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    This section encountered an error and cannot be displayed.
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={this.resetErrorBoundary}
                    className="text-red-600 border-red-300 hover:bg-red-100"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            </div>
          );

        case 'component':
        default:
          if (isolate) {
            // Minimal UI for isolated component errors
            return (
              <div className="p-4 text-center text-gray-500">
                <p className="text-sm">Component unavailable</p>
                <button
                  onClick={this.resetErrorBoundary}
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  Retry
                </button>
              </div>
            );
          }

          return (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  Component error - 
                  <button
                    onClick={this.resetErrorBoundary}
                    className="ml-1 text-yellow-600 hover:underline"
                  >
                    Retry
                  </button>
                </span>
              </div>
            </div>
          );
      }
    }

    return children;
  }
}

// Higher-order component for easy error boundary wrapping
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook for error handling (to be used with nearest error boundary)
export function useErrorHandler() {
  return (error: Error) => {
    throw error; // This will be caught by nearest error boundary
  };
}
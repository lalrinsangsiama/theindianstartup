import React from 'react';
import { logger } from '@/lib/logger';
import posthog from 'posthog-js';

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Error categories for better organization
export type ErrorCategory = 
  | 'authentication'
  | 'payment'
  | 'api'
  | 'database'
  | 'ui'
  | 'validation'
  | 'network'
  | 'performance'
  | 'unknown';

// Error context interface
interface ErrorContext {
  userId?: string;
  userEmail?: string;
  currentPage?: string;
  userAgent?: string;
  timestamp?: string;
  sessionId?: string;
  buildVersion?: string;
  environment?: string;
  componentStack?: string;
  errorBoundary?: boolean;
  userFeedback?: boolean;
  endpoint?: string;
  statusCode?: number;
  field?: string;
  component?: string;
  url?: string;
  operation?: string;
  metric?: string;
  value?: number;
  filename?: string;
  lineno?: number;
  colno?: number;
  type?: string;
  reason?: any;
  user_reported?: boolean;
  additionalData?: Record<string, any>;
}

// Error tracking interface
interface ErrorEvent {
  message: string;
  stack?: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  context?: ErrorContext;
  fingerprint?: string; // For grouping similar errors
}

// Enhanced error class for better tracking
export class TrackableError extends Error {
  public category: ErrorCategory;
  public severity: ErrorSeverity;
  public context?: ErrorContext;
  public fingerprint?: string;

  constructor(
    message: string,
    category: ErrorCategory = 'unknown',
    severity: ErrorSeverity = 'medium',
    context?: ErrorContext
  ) {
    super(message);
    this.name = 'TrackableError';
    this.category = category;
    this.severity = severity;
    this.context = context;
    this.fingerprint = this.generateFingerprint();
  }

  private generateFingerprint(): string {
    // Create a unique fingerprint for grouping similar errors
    const base = `${this.category}-${this.name}-${this.message.slice(0, 50)}`;
    return btoa(base).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
  }
}

// Core error tracking functions
export const trackError = (error: Error | TrackableError, additionalContext?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  try {
    const isTrackableError = error instanceof TrackableError;
    const category = isTrackableError ? error.category : 'unknown';
    const severity = isTrackableError ? error.severity : 'medium';
    const fingerprint = isTrackableError ? error.fingerprint : generateErrorFingerprint(error);

    const context: ErrorContext = {
      currentPage: window.location.pathname,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      buildVersion: process.env.NEXT_PUBLIC_APP_VERSION || 'unknown',
      ...(isTrackableError ? error.context : {}),
      ...additionalContext,
    };

    // Track with PostHog
    posthog?.capture('error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      error_name: error.name,
      error_category: category,
      error_severity: severity,
      error_fingerprint: fingerprint,
      error_context: context,
      $exception_message: error.message,
      $exception_type: error.name,
      $exception_stack_trace_raw: error.stack,
    });

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Tracked');
      logger.error('Error:', { error });
      logger.info('Category:', { category });
      logger.info('Severity:', { severity });
      logger.info('Context:', { context });
      console.groupEnd();
    }
  } catch (trackingError) {
    logger.error('Failed to track error:', trackingError);
  }
};

// Generate fingerprint for regular errors
const generateErrorFingerprint = (error: Error): string => {
  const base = `${error.name}-${error.message.slice(0, 50)}`;
  return btoa(base).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16);
};

// Specific error tracking functions for different categories
export const trackAuthError = (message: string, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'authentication', 'high', context);
  trackError(error);
};

export const trackPaymentError = (message: string, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'payment', 'critical', context);
  trackError(error);
};

export const trackAPIError = (message: string, endpoint: string, statusCode?: number, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'api', 'medium', {
    endpoint,
    statusCode,
    ...context,
  });
  trackError(error);
};

export const trackValidationError = (message: string, field?: string, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'validation', 'low', {
    field,
    ...context,
  });
  trackError(error);
};

export const trackUIError = (message: string, component?: string, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'ui', 'medium', {
    component,
    ...context,
  });
  trackError(error);
};

export const trackNetworkError = (message: string, url?: string, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'network', 'medium', {
    url,
    ...context,
  });
  trackError(error);
};

export const trackDatabaseError = (message: string, operation?: string, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'database', 'high', {
    operation,
    ...context,
  });
  trackError(error);
};

export const trackPerformanceError = (message: string, metric?: string, value?: number, context?: Record<string, any>) => {
  const error = new TrackableError(message, 'performance', 'low', {
    metric,
    value,
    ...context,
  });
  trackError(error);
};

// Global error handler setup
export const setupGlobalErrorTracking = () => {
  if (typeof window === 'undefined') return;

  // Handle unhandled JavaScript errors
  window.addEventListener('error', (event) => {
    trackError(new TrackableError(
      event.message,
      'unknown',
      'high',
      {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }
    ));
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    
    trackError(new TrackableError(
      error.message,
      'unknown',
      'high',
      {
        type: 'unhandled_promise_rejection',
        reason: event.reason,
      }
    ));
  });

  // Track console errors (optional, for debugging)
  if (process.env.NODE_ENV === 'development') {
    const originalError = console.error;
    console.error = (...args) => {
      originalError.apply(console, args);
      
      if (args[0] instanceof Error) {
        trackError(args[0]);
      } else if (typeof args[0] === 'string') {
        trackError(new TrackableError(args[0], 'unknown', 'low'));
      }
    };
  }
};

// Performance monitoring
export const trackPerformanceMetrics = () => {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  const trackWebVital = (name: string, value: number) => {
    posthog?.capture('performance_metric', {
      metric_name: name,
      metric_value: value,
      page: window.location.pathname,
    });

    // Track as error if performance is poor
    if (name === 'CLS' && value > 0.25) {
      trackPerformanceError('High Cumulative Layout Shift', name, value);
    } else if (name === 'FCP' && value > 3000) {
      trackPerformanceError('Slow First Contentful Paint', name, value);
    } else if (name === 'LCP' && value > 4000) {
      trackPerformanceError('Slow Largest Contentful Paint', name, value);
    } else if (name === 'FID' && value > 300) {
      trackPerformanceError('High First Input Delay', name, value);
    }
  };

  // Use Web Vitals library if available, otherwise track basic metrics
  if (typeof window.performance !== 'undefined') {
    // Track page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        
        trackWebVital('page_load_time', loadTime);
        
        if (loadTime > 5000) {
          trackPerformanceError('Slow page load', 'page_load_time', loadTime);
        }
      }, 0);
    });
  }
};

// User feedback and error reporting
export const reportUserError = (description: string, category: ErrorCategory = 'ui', context?: Record<string, any>) => {
  const error = new TrackableError(
    `User reported: ${description}`,
    category,
    'medium',
    {
      user_reported: true,
      ...context,
    }
  );
  trackError(error);
};

// Error boundary helper
export function withErrorTracking<T extends object>(
  Component: React.ComponentType<T>,
  componentName?: string
): React.ComponentType<T> {
  const WrappedComponent = (props: T) => {
    try {
      return <Component {...props} />;
    } catch (error) {
      trackUIError(
        `Component error in ${componentName || Component.name}`,
        componentName || Component.name,
        { props }
      );
      throw error; // Re-throw to trigger error boundary
    }
  };

  WrappedComponent.displayName = `withErrorTracking(${componentName || Component.displayName || Component.name})`;
  return WrappedComponent;
}

// API error helper
export async function handleAPIError<T>(
  apiCall: () => Promise<T>,
  endpoint: string,
  context?: Record<string, any>
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown API error';
    const statusCode = (error as any)?.status || (error as any)?.statusCode;
    
    trackAPIError(errorMessage, endpoint, statusCode, context);
    throw error;
  }
}

// Export for easier usage
export const ErrorTracking = {
  track: trackError,
  auth: trackAuthError,
  payment: trackPaymentError,
  api: trackAPIError,
  validation: trackValidationError,
  ui: trackUIError,
  network: trackNetworkError,
  database: trackDatabaseError,
  performance: trackPerformanceError,
  userReport: reportUserError,
  setup: setupGlobalErrorTracking,
  // withTracking: withErrorTracking, // Commented out due to TypeScript issues
  handleAPI: handleAPIError,
  TrackableError,
};
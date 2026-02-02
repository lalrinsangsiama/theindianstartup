/**
 * Sentry error tracking configuration
 * Provides centralized error monitoring for production
 */

import * as Sentry from '@sentry/nextjs';

// Initialize Sentry (called from sentry.client.config.ts and sentry.server.config.ts)
export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!dsn) {
    console.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV || 'development',
    enabled: process.env.NODE_ENV === 'production',

    // Performance monitoring
    tracesSampleRate: 0.1, // Sample 10% of transactions

    // Error sampling
    sampleRate: 1.0, // Capture all errors

    // Release tracking
    release: process.env.npm_package_version || '1.0.0',

    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Session replay sample rate
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // Before send hook for filtering
    beforeSend(event, hint) {
      // Don't send errors in development
      if (process.env.NODE_ENV === 'development') {
        return null;
      }

      // Filter out known non-critical errors
      const error = hint?.originalException;
      if (error instanceof Error) {
        // Skip rate limit errors (expected behavior)
        if (error.message.includes('Rate limit exceeded')) {
          return null;
        }

        // Skip auth redirect errors (expected behavior)
        if (error.message.includes('Unauthorized - Please login')) {
          return null;
        }
      }

      return event;
    },

    // Ignore specific errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'originalCreateNotification',
      'canvas.contentDocument',
      'MyApp_RemoveAllHighlights',
      'http://tt.telewebion.com',
      // Known third-party errors
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      // Network errors that are often transient
      'Network request failed',
      'Failed to fetch',
      'Load failed',
    ],
  });
}

/**
 * Capture an error with additional context
 */
export function captureError(
  error: Error,
  context?: {
    userId?: string;
    extra?: Record<string, unknown>;
    tags?: Record<string, string>;
    level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  }
) {
  if (context?.userId) {
    Sentry.setUser({ id: context.userId });
  }

  if (context?.tags) {
    Sentry.setTags(context.tags);
  }

  if (context?.extra) {
    Sentry.setExtras(context.extra);
  }

  Sentry.captureException(error, {
    level: context?.level || 'error',
  });
}

/**
 * Capture a message for tracking
 */
export function captureMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info',
  context?: Record<string, unknown>
) {
  if (context) {
    Sentry.setExtras(context);
  }

  Sentry.captureMessage(message, level);
}

/**
 * Set user context for error tracking
 */
export function setUserContext(user: {
  id: string;
  email?: string;
  name?: string;
}) {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.name,
  });
}

/**
 * Clear user context (on logout)
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(
  message: string,
  category: string,
  data?: Record<string, unknown>,
  level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' = 'info'
) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Start a performance transaction
 */
export function startTransaction(
  name: string,
  operation: string
): Sentry.Span | undefined {
  return Sentry.startInactiveSpan({
    name,
    op: operation,
  });
}

/**
 * Wrap an async function with error capture
 */
export function withSentry<T extends (...args: unknown[]) => Promise<unknown>>(
  fn: T,
  context?: { operation?: string; tags?: Record<string, string> }
): T {
  return (async (...args: unknown[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error) {
        captureError(error, {
          tags: context?.tags,
          extra: { args: JSON.stringify(args).slice(0, 1000) },
        });
      }
      throw error;
    }
  }) as T;
}

// Export Sentry for direct access if needed
export { Sentry };

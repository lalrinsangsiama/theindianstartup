/**
 * Sentry error tracking configuration
 * Provides centralized error monitoring for production
 *
 * CRITICAL ENDPOINTS that trigger immediate alerts:
 * - /api/purchase/* (payment failures)
 * - /api/webhooks/razorpay (webhook failures)
 * - /api/auth/* (authentication failures)
 */

import * as Sentry from '@sentry/nextjs';

// Critical endpoints that need immediate alerting
export const CRITICAL_ENDPOINTS = [
  '/api/purchase',
  '/api/webhooks/razorpay',
  '/api/auth',
] as const;

// Error categories for better grouping
export const ERROR_CATEGORIES = {
  PAYMENT: 'payment',
  WEBHOOK: 'webhook',
  AUTH: 'auth',
  DATABASE: 'database',
  RATE_LIMIT: 'rate_limit',
  VALIDATION: 'validation',
  EXTERNAL_SERVICE: 'external_service',
} as const;

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

    // Performance monitoring - increased from 10% to 30% for better coverage
    tracesSampleRate: 0.3,

    // Error sampling - capture all errors
    sampleRate: 1.0,

    // Release tracking with git commit hash if available
    release: process.env.SENTRY_RELEASE
      || process.env.VERCEL_GIT_COMMIT_SHA
      || process.env.npm_package_version
      || '1.0.0',

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

    // Before send hook for filtering and enrichment
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

      // Add custom fingerprinting for better error grouping
      if (event.exception?.values?.[0]?.value) {
        const errorMessage = event.exception.values[0].value;

        // Group payment errors together
        if (errorMessage.includes('Razorpay') || errorMessage.includes('payment')) {
          event.fingerprint = ['payment-error', '{{ default }}'];
          event.tags = { ...event.tags, category: ERROR_CATEGORIES.PAYMENT };
        }

        // Group database errors
        if (errorMessage.includes('Supabase') || errorMessage.includes('database') || errorMessage.includes('PGRST')) {
          event.fingerprint = ['database-error', '{{ default }}'];
          event.tags = { ...event.tags, category: ERROR_CATEGORIES.DATABASE };
        }

        // Group webhook errors
        if (errorMessage.includes('webhook') || errorMessage.includes('signature')) {
          event.fingerprint = ['webhook-error', '{{ default }}'];
          event.tags = { ...event.tags, category: ERROR_CATEGORIES.WEBHOOK };
        }
      }

      // Mark critical endpoint errors for immediate alerting
      const requestUrl = event.request?.url || '';
      const isCritical = CRITICAL_ENDPOINTS.some(endpoint => requestUrl.includes(endpoint));
      if (isCritical) {
        event.tags = { ...event.tags, critical: 'true' };
        event.level = 'error'; // Ensure it's marked as error level
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
 * Capture a CRITICAL error from payment/webhook/auth endpoints
 * These errors trigger immediate alerts in Sentry
 */
export function captureCriticalError(
  error: Error,
  endpoint: 'payment' | 'webhook' | 'auth',
  context?: {
    userId?: string;
    orderId?: string;
    amount?: number;
    extra?: Record<string, unknown>;
  }
) {
  Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setTag('critical', 'true');
    scope.setTag('endpoint', endpoint);
    scope.setTag('category', ERROR_CATEGORIES[endpoint.toUpperCase() as keyof typeof ERROR_CATEGORIES] || endpoint);

    if (context?.userId) {
      scope.setUser({ id: context.userId });
    }

    if (context?.orderId) {
      scope.setTag('orderId', context.orderId);
    }

    if (context?.amount) {
      scope.setExtra('amount', context.amount);
    }

    if (context?.extra) {
      Object.entries(context.extra).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }

    Sentry.captureException(error);
  });
}

/**
 * Capture a payment-specific error with full context
 */
export function capturePaymentError(
  error: Error,
  context: {
    userId: string;
    orderId?: string;
    razorpayOrderId?: string;
    amount?: number;
    productCode?: string;
    stage: 'create-order' | 'verify' | 'webhook' | 'refund';
  }
) {
  Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setTag('critical', 'true');
    scope.setTag('category', ERROR_CATEGORIES.PAYMENT);
    scope.setTag('payment_stage', context.stage);

    scope.setUser({ id: context.userId });

    if (context.orderId) scope.setTag('orderId', context.orderId);
    if (context.razorpayOrderId) scope.setTag('razorpayOrderId', context.razorpayOrderId);
    if (context.productCode) scope.setTag('productCode', context.productCode);
    if (context.amount) scope.setExtra('amount', context.amount);

    // Custom fingerprint for payment errors
    scope.setFingerprint(['payment-error', context.stage, '{{ default }}']);

    Sentry.captureException(error);
  });
}

/**
 * Capture a webhook processing error
 */
export function captureWebhookError(
  error: Error,
  context: {
    webhookType: 'razorpay' | 'other';
    eventType?: string;
    orderId?: string;
    signatureValid?: boolean;
  }
) {
  Sentry.withScope((scope) => {
    scope.setLevel('error');
    scope.setTag('critical', 'true');
    scope.setTag('category', ERROR_CATEGORIES.WEBHOOK);
    scope.setTag('webhook_type', context.webhookType);

    if (context.eventType) scope.setTag('webhook_event', context.eventType);
    if (context.orderId) scope.setTag('orderId', context.orderId);
    if (context.signatureValid !== undefined) {
      scope.setExtra('signatureValid', context.signatureValid);
    }

    // Custom fingerprint for webhook errors
    scope.setFingerprint(['webhook-error', context.webhookType, context.eventType || 'unknown']);

    Sentry.captureException(error);
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

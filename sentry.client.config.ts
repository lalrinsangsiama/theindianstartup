// Sentry client-side configuration
// This file configures the initialization of Sentry on the client
// The config you add here will be used whenever a users loads a page in their browser

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Enable only in production
  enabled: process.env.NODE_ENV === 'production',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,

  // Replay configuration for session recording
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Don't track errors from these URLs
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /^moz-extension:\/\//i,
  ],

  // Ignore specific errors
  ignoreErrors: [
    // Browser-specific errors
    'ResizeObserver loop limit exceeded',
    'ResizeObserver loop completed with undelivered notifications',
    // Network errors
    'Network request failed',
    'Failed to fetch',
    'Load failed',
    // Expected behaviors
    'Rate limit exceeded',
    'Unauthorized',
  ],

  // Before send hook
  beforeSend(event) {
    // Filter out development errors
    if (process.env.NODE_ENV === 'development') {
      return null;
    }
    return event;
  },
});

// Sentry server-side configuration
// This file configures the initialization of Sentry on the server
// The config you add here will be used whenever the server handles a request

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Enable only in production
  enabled: process.env.NODE_ENV === 'production',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',

  // Before send hook for filtering
  beforeSend(event, hint) {
    const error = hint?.originalException;

    // Filter out expected errors
    if (error instanceof Error) {
      // Skip rate limit errors
      if (error.message.includes('Rate limit exceeded')) {
        return null;
      }

      // Skip auth redirect errors
      if (error.message.includes('Unauthorized - Please login')) {
        return null;
      }

      // Skip validation errors (user input issues, not bugs)
      if (error.message.includes('Validation failed')) {
        return null;
      }
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    'Rate limit exceeded',
    'Unauthorized',
    'Validation failed',
    'Access required',
    'NEXT_NOT_FOUND',
  ],
});

// Sentry edge runtime configuration
// This file configures the initialization of Sentry for edge features (Middleware, Edge Routers)

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Enable only in production
  enabled: process.env.NODE_ENV === 'production',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry
  debug: false,

  // Before send hook for filtering
  beforeSend(event, hint) {
    const error = hint?.originalException;

    // Filter out expected errors
    if (error instanceof Error) {
      if (error.message.includes('Rate limit exceeded')) {
        return null;
      }
      if (error.message.includes('CORS policy violation')) {
        return null;
      }
    }

    return event;
  },
});

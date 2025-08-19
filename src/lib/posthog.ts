import posthog from 'posthog-js';

// PostHog configuration for The Indian Startup
export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

    if (apiKey) {
      posthog.init(apiKey, {
        api_host: apiHost,
        // Enable session recordings for better user experience analysis
        session_recording: {
          recordCrossOriginIframes: true,
        },
        // Capture page views automatically
        capture_pageview: true,
        // Capture performance metrics
        capture_performance: true,
        // Respect user privacy
        respect_dnt: true,
        // Custom configuration for Indian startup platform
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('PostHog loaded successfully');
          }
        },
      });
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog API key not found. Add NEXT_PUBLIC_POSTHOG_KEY to your environment variables.');
    }
  }
};

// Custom event tracking for The Indian Startup platform
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture(eventName, {
      ...properties,
      platform: 'The Indian Startup',
      timestamp: new Date().toISOString(),
    });
  }
};

// Track user registration
export const trackUserRegistration = (userId: string, method: 'email' | 'google') => {
  trackEvent('user_registered', {
    user_id: userId,
    registration_method: method,
  });
};


// Track daily lesson progress
export const trackLessonProgress = (userId: string, day: number, action: 'started' | 'completed') => {
  trackEvent('lesson_progress', {
    user_id: userId,
    day,
    action,
  });
};

// Track XP events
export const trackXPEarned = (userId: string, xpAmount: number, source: string) => {
  trackEvent('xp_earned', {
    user_id: userId,
    xp_amount: xpAmount,
    source,
  });
};

// Track badge unlocks
export const trackBadgeUnlocked = (userId: string, badgeId: string, badgeName: string) => {
  trackEvent('badge_unlocked', {
    user_id: userId,
    badge_id: badgeId,
    badge_name: badgeName,
  });
};

// Track community engagement
export const trackCommunityEngagement = (userId: string, action: 'post_created' | 'comment_added' | 'like_given') => {
  trackEvent('community_engagement', {
    user_id: userId,
    action,
  });
};

// Track portfolio progress
export const trackPortfolioProgress = (userId: string, section: string, completion: number) => {
  trackEvent('portfolio_progress', {
    user_id: userId,
    section,
    completion_percentage: completion,
  });
};

// Track feature usage
export const trackFeatureUsage = (userId: string, feature: string, action: string) => {
  trackEvent('feature_usage', {
    user_id: userId,
    feature,
    action,
  });
};

// Identify user for better tracking
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, {
      ...properties,
      platform: 'The Indian Startup',
    });
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.people.set(properties);
  }
};

// Page view tracking (manual)
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture('$pageview', {
      page_name: pageName,
      ...properties,
    });
  }
};

// Feature flag utilities
export const isFeatureEnabled = (flagKey: string): boolean => {
  if (typeof window !== 'undefined' && posthog) {
    return posthog.isFeatureEnabled(flagKey) || false;
  }
  return false;
};

export const getFeatureFlag = (flagKey: string): string | boolean | undefined => {
  if (typeof window !== 'undefined' && posthog) {
    return posthog.getFeatureFlag(flagKey);
  }
  return undefined;
};

// Reset user session (on logout)
export const resetUser = () => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.reset();
  }
};

export default posthog;
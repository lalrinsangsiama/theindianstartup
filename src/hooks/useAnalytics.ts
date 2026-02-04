import { useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  trackEvent,
  trackUserRegistration,
  trackLessonProgress,
  trackXPEarned,
  trackBadgeUnlocked,
  trackCommunityEngagement,
  trackPortfolioProgress,
  trackFeatureUsage,
  trackPageView,
  isFeatureEnabled,
  getFeatureFlag,
} from '@/lib/posthog';
import { 
  trackError,
  trackAuthError,
  trackPaymentError,
  trackAPIError,
  trackValidationError,
  trackUIError,
  trackNetworkError,
  trackDatabaseError,
  trackPerformanceError,
  reportUserError,
  TrackableError,
  type ErrorCategory,
  type ErrorSeverity,
} from '@/lib/error-tracking';

export function useAnalytics() {
  const { user } = useAuth();

  // Generic event tracking
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackEvent(eventName, {
      ...properties,
      user_id: user?.id,
    });
  }, [user?.id]);

  // Page view tracking
  const trackPage = useCallback((pageName: string, properties?: Record<string, any>) => {
    trackPageView(pageName, {
      ...properties,
      user_id: user?.id,
    });
  }, [user?.id]);

  // User registration tracking
  const trackRegistration = useCallback((method: 'email' | 'google') => {
    if (user?.id) {
      trackUserRegistration(user.id, method);
    }
  }, [user?.id]);


  // Lesson progress tracking
  const trackLesson = useCallback((day: number, action: 'started' | 'completed') => {
    if (user?.id) {
      trackLessonProgress(user.id, day, action);
    }
  }, [user?.id]);

  // XP earned tracking
  const trackXP = useCallback((xpAmount: number, source: string) => {
    if (user?.id) {
      trackXPEarned(user.id, xpAmount, source);
    }
  }, [user?.id]);

  // Badge unlock tracking
  const trackBadge = useCallback((badgeId: string, badgeName: string) => {
    if (user?.id) {
      trackBadgeUnlocked(user.id, badgeId, badgeName);
    }
  }, [user?.id]);

  // Community engagement tracking
  const trackCommunity = useCallback((action: 'post_created' | 'comment_added' | 'like_given') => {
    if (user?.id) {
      trackCommunityEngagement(user.id, action);
    }
  }, [user?.id]);

  // Portfolio progress tracking
  const trackPortfolio = useCallback((section: string, completion: number) => {
    if (user?.id) {
      trackPortfolioProgress(user.id, section, completion);
    }
  }, [user?.id]);

  // Feature usage tracking
  const trackFeature = useCallback((feature: string, action: string) => {
    if (user?.id) {
      trackFeatureUsage(user.id, feature, action);
    }
  }, [user?.id]);

  // Feature flag checking
  const isFeatureActive = useCallback((flagKey: string): boolean => {
    return isFeatureEnabled(flagKey);
  }, []);

  const getFlag = useCallback((flagKey: string): string | boolean | undefined => {
    return getFeatureFlag(flagKey);
  }, []);

  // Common startup journey events
  const trackJourneyEvent = useCallback((event: {
    type: 'day_started' | 'day_completed' | 'task_completed' | 'week_completed' | 'journey_completed';
    day?: number;
    taskId?: string;
    week?: number;
  }) => {
    track('journey_event', {
      event_type: event.type,
      day: event.day,
      task_id: event.taskId,
      week: event.week,
    });
  }, [track]);

  // Business milestone tracking
  const trackBusinessMilestone = useCallback((milestone: {
    type: 'idea_validated' | 'mvp_launched' | 'first_customer' | 'revenue_generated' | 'team_hired';
    value?: number;
    description?: string;
  }) => {
    track('business_milestone', {
      milestone_type: milestone.type,
      value: milestone.value,
      description: milestone.description,
    });
  }, [track]);

  // Engagement metrics
  const trackEngagement = useCallback((engagement: {
    type: 'session_start' | 'session_end' | 'feature_discovery' | 'help_accessed' | 'support_contacted';
    duration?: number;
    feature?: string;
  }) => {
    track('user_engagement', {
      engagement_type: engagement.type,
      session_duration: engagement.duration,
      feature_name: engagement.feature,
    });
  }, [track]);

  // Conversion funnel tracking
  const trackConversion = useCallback((step: {
    funnel: 'signup' | 'onboarding' | 'purchase' | 'activation';
    step: string;
    success: boolean;
    error?: string;
  }) => {
    track('conversion_event', {
      funnel_name: step.funnel,
      step_name: step.step,
      success: step.success,
      error_message: step.error,
    });
  }, [track]);

  // Error tracking methods - renamed to avoid shadowing imported functions
  const trackErrorEvent = useCallback((error: Error | string, category?: ErrorCategory, severity?: ErrorSeverity, context?: Record<string, any>) => {
    if (typeof error === 'string') {
      trackError(new TrackableError(error, category, severity, { userId: user?.id, ...context }));
    } else {
      trackError(error, { userId: user?.id, ...context });
    }
  }, [user?.id]);

  const handleAuthError = useCallback((message: string, context?: Record<string, any>) => {
    trackAuthError(message, { userId: user?.id, ...context });
  }, [user?.id]);

  const handlePaymentError = useCallback((message: string, context?: Record<string, any>) => {
    trackPaymentError(message, { userId: user?.id, ...context });
  }, [user?.id]);

  const handleAPIError = useCallback((message: string, endpoint: string, statusCode?: number, context?: Record<string, any>) => {
    trackAPIError(message, endpoint, statusCode, { userId: user?.id, ...context });
  }, [user?.id]);

  const handleValidationError = useCallback((message: string, field?: string, context?: Record<string, any>) => {
    trackValidationError(message, field, { userId: user?.id, ...context });
  }, [user?.id]);

  const handleUIError = useCallback((message: string, component?: string, context?: Record<string, any>) => {
    trackUIError(message, component, { userId: user?.id, ...context });
  }, [user?.id]);

  const reportUserIssue = useCallback((description: string, category: ErrorCategory = 'ui', context?: Record<string, any>) => {
    reportUserError(description, category, { userId: user?.id, ...context });
  }, [user?.id]);

  return {
    // Core tracking functions
    track,
    trackPage,
    
    // Specific event trackers
    trackRegistration,
    trackLesson,
    trackXP,
    trackBadge,
    trackCommunity,
    trackPortfolio,
    trackFeature,
    
    // Journey-specific trackers
    trackJourneyEvent,
    trackBusinessMilestone,
    trackEngagement,
    trackConversion,
    
    // Error tracking
    trackError: trackErrorEvent,
    trackAuthError: handleAuthError,
    trackPaymentError: handlePaymentError,
    trackAPIError: handleAPIError,
    trackValidationError: handleValidationError,
    trackUIError: handleUIError,
    reportUserIssue,
    
    // Feature flags
    isFeatureActive,
    getFlag,
    
    // User context
    isAuthenticated: !!user,
    userId: user?.id,
  };
}
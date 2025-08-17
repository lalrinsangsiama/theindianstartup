'use client';

import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { initPostHog, identifyUser, setUserProperties, resetUser } from '../lib/posthog';
import { setupGlobalErrorTracking, trackPerformanceMetrics } from '../lib/error-tracking';

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize PostHog
    initPostHog();
    
    // Setup global error tracking
    setupGlobalErrorTracking();
    
    // Setup performance monitoring
    trackPerformanceMetrics();
  }, []);

  useEffect(() => {
    if (user) {
      // Identify user when they log in
      identifyUser(user.id, {
        email: user.email,
        created_at: user.created_at,
        last_sign_in: user.last_sign_in_at,
      });

      // Set user properties
      setUserProperties({
        email: user.email,
        user_id: user.id,
        signup_date: user.created_at,
        platform: 'The Indian Startup',
      });
    } else {
      // Reset user session when they log out
      resetUser();
    }
  }, [user]);

  return <>{children}</>;
}
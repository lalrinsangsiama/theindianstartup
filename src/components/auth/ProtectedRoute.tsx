'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';
import { AuthLoading } from './AuthLoading';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
  /** @deprecated Onboarding flow removed - this prop has no effect */
  skipOnboardingCheck?: boolean;
}

// Timeout in milliseconds to prevent infinite loading
const ACCESS_CHECK_TIMEOUT = 8000; // 8 seconds - longer than profile fetch timeout (5s)

export function ProtectedRoute({
  children,
  redirectTo = '/login',
  allowedRoles = [],
  skipOnboardingCheck: _skipOnboardingCheck = false // deprecated, no effect
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, session, loading: authLoading, initialized } = useAuthContext();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectHandled = useRef(false);
  const mounted = useRef(true);
  const checkStartTime = useRef<number>(Date.now());

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  // Timeout to prevent infinite loading - SECURITY: redirect to login on timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (mounted.current && checkingAccess && !hasAccess) {
        logger.warn('ProtectedRoute: Access check timeout - redirecting to login for security');
        // SECURITY FIX: On timeout, deny access and redirect to login
        // Network issues should not bypass authentication
        if (!redirectHandled.current) {
          redirectHandled.current = true;
          setCheckingAccess(false);
          router.push(`${redirectTo}?error=timeout`);
        }
      }
    }, ACCESS_CHECK_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [checkingAccess, hasAccess, redirectTo, router]);

  // Safety timeout: If user is authenticated but profile check is slow, grant access
  // This is safe because we've verified the user has a valid session
  useEffect(() => {
    if (initialized && user && session && checkingAccess) {
      const safetyTimeout = setTimeout(() => {
        if (mounted.current && checkingAccess && !hasAccess) {
          // Only grant access if we have a verified session
          // This is safe because Supabase has verified the JWT
          logger.info('ProtectedRoute: Safety timeout - user has valid session, granting access');
          setHasAccess(true);
          setCheckingAccess(false);
        }
      }, 3000);
      return () => clearTimeout(safetyTimeout);
    }
  }, [initialized, user, session, checkingAccess, hasAccess]);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Reset state on each check
        if (!mounted.current) return;

        setError(null);
        checkStartTime.current = Date.now();

        // If auth context not initialized yet, wait
        if (!initialized) {
          logger.debug('ProtectedRoute: Auth context not initialized, waiting...');
          return;
        }

        // If still loading auth, wait (but with timeout protection)
        if (authLoading) {
          logger.debug('ProtectedRoute: Auth still loading, waiting...');
          return;
        }

        // If no session, redirect to login (only once)
        if (!session || !user) {
          logger.info('ProtectedRoute: No session found, redirecting to login');
          if (!redirectHandled.current && mounted.current) {
            redirectHandled.current = true;

            // Save the attempted URL for redirect after login (exclude login/signup pages)
            if (typeof window !== 'undefined' && !pathname.includes('/login') && !pathname.includes('/signup')) {
              sessionStorage.setItem('redirectAfterLogin', pathname);
            }

            // Set states before redirect
            setCheckingAccess(false);
            router.push(redirectTo);
          }
          return;
        }

        // Fetch profile for role checking
        // SECURITY: Always use server-side profile data for role, not client metadata
        let profileData: { role?: string } | null = null;

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          const response = await fetch('/api/user/profile', {
            cache: 'no-store',
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (response.ok) {
            profileData = await response.json();
          } else if (response.status === 401) {
            // Session expired
            if (!redirectHandled.current && mounted.current) {
              redirectHandled.current = true;
              logger.info('ProtectedRoute: Session expired, redirecting to login');
              setCheckingAccess(false);
              router.push(redirectTo);
            }
            return;
          } else {
            // For other errors (500, etc), log but continue with basic access
            logger.warn('ProtectedRoute: Profile check returned error status', { status: response.status });
          }
        } catch (profileError) {
          // Check if it's an abort error (timeout)
          if (profileError instanceof Error && profileError.name === 'AbortError') {
            logger.warn('ProtectedRoute: Profile check timed out');
          } else {
            logger.error('ProtectedRoute: Profile check failed', profileError);
          }
          // Continue without profile data - role-based routes will be denied
        }

        // Check role-based access using server-side profile data
        // SECURITY FIX: Use profile data role, not user_metadata which can be client-set
        if (allowedRoles.length > 0) {
          const userRole = profileData?.role || 'user';
          if (!allowedRoles.includes(userRole)) {
            logger.warn('ProtectedRoute: User lacks required role', { userRole, allowedRoles });
            if (!redirectHandled.current && mounted.current) {
              redirectHandled.current = true;
              setCheckingAccess(false);
              router.push('/unauthorized');
            }
            return;
          }
        }

        // Onboarding check removed - users go straight to dashboard

        // All checks passed
        if (mounted.current) {
          setHasAccess(true);
          setCheckingAccess(false);
          logger.debug('ProtectedRoute: Access granted');
        }
      } catch (error) {
        logger.error('ProtectedRoute: Unexpected error during access check', error);
        if (mounted.current) {
          // SECURITY FIX: On unexpected error, redirect to login
          // Errors should not bypass authentication
          if (!redirectHandled.current) {
            redirectHandled.current = true;
            setCheckingAccess(false);
            router.push(`${redirectTo}?error=access_check_failed`);
          }
        }
      }
    };

    // Reset redirect flag when key dependencies change
    if (session !== null || user !== null) {
      redirectHandled.current = false;
    }
    checkAccess();
  }, [user, session, authLoading, initialized, pathname, router, redirectTo, allowedRoles]);

  // Show loading state while checking authentication (with timeout protection)
  if ((authLoading || checkingAccess || !initialized) && !hasAccess) {
    const loadingMessage = !initialized
      ? "Initializing..."
      : authLoading
      ? "Authenticating your session..."
      : "Verifying your access permissions...";

    return <AuthLoading message={loadingMessage} />;
  }

  // Show error state if there was an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Error</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // If user doesn't have access after checks are done, force redirect to login
  if (!hasAccess && !checkingAccess && initialized && !authLoading) {
    // Force redirect if somehow we got here without being redirected
    if (!redirectHandled.current) {
      redirectHandled.current = true;
      router.push(redirectTo);
    }
    return <AuthLoading message="Redirecting to login..." />;
  }

  // Still checking - show loading
  if (!hasAccess) {
    return <AuthLoading message="Verifying your access..." />;
  }

  // User has access, render children
  return <>{children}</>;
}

// HOC version for pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    redirectTo?: string;
    allowedRoles?: string[];
  }
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
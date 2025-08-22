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
  skipOnboardingCheck?: boolean;
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/login',
  allowedRoles = [],
  skipOnboardingCheck = false
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, session, loading: authLoading, initialized } = useAuthContext();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectHandled = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Reset state on each check
        if (!mounted.current) return;
        
        setError(null);
        
        // If still loading auth, wait
        if (authLoading) {
          logger.debug('ProtectedRoute: Auth still loading, waiting...');
          return;
        }

        // If no session, redirect to login (only once)
        if (!session || !user) {
          if (!redirectHandled.current && mounted.current) {
            redirectHandled.current = true;
            logger.info('ProtectedRoute: No session found, redirecting to login');
            
            // Save the attempted URL for redirect after login (exclude login/signup pages)
            if (typeof window !== 'undefined' && !pathname.includes('/login') && !pathname.includes('/signup')) {
              sessionStorage.setItem('redirectAfterLogin', pathname);
            }
            
            router.push(redirectTo);
          }
          return;
        }

        // Check role-based access
        if (allowedRoles.length > 0) {
          const userRole = user.user_metadata?.role || 'user';
          if (!allowedRoles.includes(userRole)) {
            logger.warn('ProtectedRoute: User lacks required role', { userRole, allowedRoles });
            if (!redirectHandled.current && mounted.current) {
              redirectHandled.current = true;
              router.push('/unauthorized');
            }
            return;
          }
        }

        // Check onboarding status (unless explicitly skipped)
        if (!skipOnboardingCheck && !pathname.includes('/onboarding')) {
          try {
            const response = await fetch('/api/user/profile', {
              cache: 'no-store'
            });
            
            if (response.ok) {
              const data = await response.json();
              
              // If user needs onboarding and we're not already on onboarding page
              if (!data.hasCompletedOnboarding && !redirectHandled.current && mounted.current) {
                redirectHandled.current = true;
                logger.info('ProtectedRoute: User needs onboarding, redirecting');
                router.push('/onboarding');
                return;
              }
            } else if (response.status === 401) {
              // Session expired
              if (!redirectHandled.current && mounted.current) {
                redirectHandled.current = true;
                logger.info('ProtectedRoute: Session expired, redirecting to login');
                router.push(redirectTo);
              }
              return;
            }
            // For other errors (500, etc), continue without redirect - user can still access the app
          } catch (profileError) {
            logger.error('ProtectedRoute: Profile check failed', profileError);
            // Don't block access on profile check errors
          }
        }

        // All checks passed
        if (mounted.current) {
          setHasAccess(true);
          setCheckingAccess(false);
          logger.debug('ProtectedRoute: Access granted');
        }
      } catch (error) {
        logger.error('ProtectedRoute: Unexpected error during access check', error);
        if (mounted.current) {
          setError('An error occurred while checking access. Please refresh the page.');
          setCheckingAccess(false);
        }
      }
    };

    // Reset redirect flag when dependencies change
    redirectHandled.current = false;
    checkAccess();
  }, [user, session, authLoading, pathname, router, redirectTo, allowedRoles, skipOnboardingCheck]);

  // Show loading state while checking authentication
  if (authLoading || checkingAccess || !initialized) {
    const loadingMessage = authLoading 
      ? "Authenticating your session..." 
      : checkingAccess 
      ? "Verifying your access permissions..." 
      : "Initializing your founder dashboard...";
      
    return <AuthLoading message={loadingMessage} showStats={true} />;
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

  // If user doesn't have access, don't render children (they should be redirected)
  if (!hasAccess) {
    return <AuthLoading message="Redirecting you to continue your journey..." showStats={false} />;
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
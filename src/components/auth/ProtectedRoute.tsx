'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { logger } from '@/lib/logger';
import { AuthLoading } from './AuthLoading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
  unauthorizedRedirect?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
  allowedRoles = [],
  unauthorizedRedirect = '/dashboard',
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, session, loading: authLoading, initialized } = useAuthContext();
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingRole, setCheckingRole] = useState(false);
  const redirected = useRef(false);

  useEffect(() => {
    // Wait for auth to initialize
    if (!initialized || authLoading) {
      return;
    }

    // No session - redirect to login
    if (!session || !user) {
      if (!redirected.current) {
        redirected.current = true;
        logger.info('ProtectedRoute: No session, redirecting to login');

        // Save intended destination
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('redirectAfterLogin', pathname);
        }

        router.replace(redirectTo);
      }
      return;
    }

    // C5: Implement role-based access control
    if (allowedRoles.length > 0) {
      setCheckingRole(true);

      // Get user role from user_metadata or app_metadata
      const userRole = user.user_metadata?.role || user.app_metadata?.role || 'user';

      // Check if user has one of the allowed roles
      const hasRequiredRole = allowedRoles.some(role => {
        // Support hierarchical roles: admin has access to all roles
        if (userRole === 'admin') return true;
        // Support moderator having access to user routes
        if (userRole === 'moderator' && role === 'user') return true;
        return userRole === role;
      });

      if (!hasRequiredRole) {
        if (!redirected.current) {
          redirected.current = true;
          logger.warn('ProtectedRoute: User lacks required role', {
            userRole,
            requiredRoles: allowedRoles,
            path: pathname
          });
          router.replace(unauthorizedRedirect);
        }
        setCheckingRole(false);
        return;
      }
      setCheckingRole(false);
    }

    setHasAccess(true);
  }, [initialized, authLoading, session, user, pathname, router, redirectTo, allowedRoles, unauthorizedRedirect]);

  // Still initializing auth or checking roles
  if (!initialized || authLoading || checkingRole) {
    return <AuthLoading message="Loading..." />;
  }

  // No session and not yet redirected
  if (!session || !user) {
    return <AuthLoading message="Redirecting to login..." />;
  }

  // Has access - render children
  if (hasAccess) {
    return <>{children}</>;
  }

  // Default loading state (waiting for redirect)
  return <AuthLoading message="Checking permissions..." />;
}

// HOC version for pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    redirectTo?: string;
    allowedRoles?: string[];
    unauthorizedRedirect?: string;
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

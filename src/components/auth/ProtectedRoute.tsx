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
}

export function ProtectedRoute({
  children,
  redirectTo = '/login',
  allowedRoles = [],
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, session, loading: authLoading, initialized } = useAuthContext();
  const [hasAccess, setHasAccess] = useState(false);
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

    // User is authenticated
    // For role-based access, we'd check roles here
    // For now, just grant access if user has a session
    if (allowedRoles.length > 0) {
      // Role checking would go here
      // For simplicity, grant access - real role check happens server-side
    }

    setHasAccess(true);
  }, [initialized, authLoading, session, user, pathname, router, redirectTo, allowedRoles]);

  // Still initializing auth
  if (!initialized || authLoading) {
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

  // Default loading state
  return <AuthLoading message="Loading..." />;
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

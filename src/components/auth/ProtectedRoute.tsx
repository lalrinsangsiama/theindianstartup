'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
}

export function ProtectedRoute({ 
  children, 
  requireSubscription = false,
  redirectTo = '/login',
  allowedRoles = []
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, session, loading: authLoading } = useAuthContext();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const checkAccess = async () => {
      // If still loading auth, wait
      if (authLoading) return;

      // If no session, redirect to login
      if (!session || !user) {
        // Save the attempted URL for redirect after login
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('redirectAfterLogin', pathname);
        }
        router.push(redirectTo);
        return;
      }

      // Check role-based access
      if (allowedRoles.length > 0) {
        const userRole = user.user_metadata?.role || 'user';
        if (!allowedRoles.includes(userRole)) {
          router.push('/unauthorized');
          return;
        }
      }

      // Check subscription if required
      if (requireSubscription) {
        try {
          const { data: subscription, error } = await supabase
            .from('Subscription')
            .select('*')
            .eq('userId', user.id)
            .eq('status', 'active')
            .single();

          if (error || !subscription) {
            router.push('/pricing');
            return;
          }

          // Check if subscription is expired
          if (new Date(subscription.expiryDate) < new Date()) {
            router.push('/subscription/expired');
            return;
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
          router.push('/pricing');
          return;
        }
      }

      // All checks passed
      setHasAccess(true);
      setCheckingAccess(false);
    };

    checkAccess();
  }, [user, session, authLoading, pathname, router, redirectTo, requireSubscription, allowedRoles, supabase]);

  // Show loading state while checking authentication
  if (authLoading || checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user doesn't have access, don't render children
  if (!hasAccess) {
    return null;
  }

  // User has access, render children
  return <>{children}</>;
}

// HOC version for pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireSubscription?: boolean;
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
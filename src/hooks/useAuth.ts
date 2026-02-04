/**
 * useAuth hook - Re-exports from AuthContext for backwards compatibility
 *
 * IMPORTANT: This file exists for backwards compatibility.
 * New code should import directly from '@/contexts/AuthContext'.
 *
 * The auth state is managed by AuthContext to prevent duplicate
 * auth subscriptions and race conditions.
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

/**
 * @deprecated Use useAuthContext from '@/contexts/AuthContext' directly
 */
export function useAuth() {
  const auth = useAuthContext();

  return {
    user: auth.user,
    session: auth.session,
    loading: auth.loading,
    error: auth.error,
    isAuthenticated: auth.isAuthenticated,
    signOut: auth.signOut,
    updateProfile: auth.updateProfile,
  };
}

/**
 * Hook to require authentication - redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo: string = '/login') {
  const { user, loading, isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [loading, isAuthenticated, router, redirectTo]);

  return { user, loading };
}

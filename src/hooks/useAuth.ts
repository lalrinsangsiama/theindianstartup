import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        setAuthState({
          user: session?.user ?? null,
          session: session,
          loading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          session: null,
          loading: false,
          error: error as Error,
        });
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState({
          user: session?.user ?? null,
          session: session,
          loading: false,
          error: null,
        });

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            // User signed in
            break;
          case 'SIGNED_OUT':
            // Clear any cached data
            router.push('/');
            break;
          case 'TOKEN_REFRESHED':
            // Token was refreshed
            break;
          case 'USER_UPDATED':
            // User data was updated
            break;
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear any local storage or cached data
      localStorage.removeItem('startupData');
      
      // Redirect to home
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setAuthState(prev => ({ ...prev, error: error as Error }));
    }
  };

  const updateProfile = async (data: { name?: string; phone?: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data,
      });
      
      if (error) throw error;
      
      // Refresh session to get updated user data
      const { data: { session } } = await supabase.auth.refreshSession();
      
      setAuthState({
        user: session?.user ?? null,
        session: session,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, error: error as Error }));
      throw error;
    }
  };

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.session,
    signOut,
    updateProfile,
  };
}

// Hook to require authentication
export function useRequireAuth(redirectTo: string = '/login') {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [loading, isAuthenticated, router, redirectTo]);

  return { user, loading };
}


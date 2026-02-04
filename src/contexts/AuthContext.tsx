'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string }) => Promise<void>;
  checkOnboardingStatus: () => Promise<{ hasCompletedOnboarding: boolean; needsOnboarding: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoize Supabase client to prevent recreation on each render (memory leak fix)
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        logger.info('AuthProvider: Initializing auth state...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError);
        }

        setSession(session);
        setUser(session?.user ?? null);
        logger.info('AuthProvider: Auth state initialized', {
          hasSession: !!session,
          userId: session?.user?.id
        });
      } catch (err) {
        logger.error('Error getting session:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.info('AuthProvider: Auth state changed', { event, userId: session?.user?.id });
        setSession(session);
        setUser(session?.user ?? null);
        setError(null);
        setLoading(false);
        if (!initialized) {
          setInitialized(true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, initialized]);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      // SECURITY FIX: Selectively clear only auth-related localStorage keys
      // Preserves cart, preferences, and other user data
      if (typeof window !== 'undefined') {
        const authKeyPrefixes = ['sb-', 'supabase', 'auth', 'loginAttempts', 'loginLockoutUntil'];
        const keysToRemove: string[] = [];

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && authKeyPrefixes.some((prefix) => key.startsWith(prefix) || key === prefix)) {
            keysToRemove.push(key);
          }
        }

        keysToRemove.forEach((key) => localStorage.removeItem(key));
      }
    } catch (err) {
      logger.error('Error signing out:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  const refreshSession = useCallback(async () => {
    try {
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;

      setSession(session);
      setUser(session?.user ?? null);
      setError(null);
    } catch (err) {
      logger.error('Error refreshing session:', err);
      setError(err as Error);
      throw err;
    }
  }, [supabase]);

  const updateProfile = useCallback(async (data: { name?: string; phone?: string }) => {
    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data,
      });

      if (updateError) throw updateError;

      // Refresh session to get updated user data
      const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();

      setSession(refreshedSession);
      setUser(refreshedSession?.user ?? null);
      setError(null);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [supabase]);

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const profileData = await response.json();

      return {
        hasCompletedOnboarding: profileData.hasCompletedOnboarding || false,
        needsOnboarding: !profileData.hasCompletedOnboarding
      };
    } catch (err) {
      logger.error('Error checking onboarding status:', err);
      return {
        hasCompletedOnboarding: false,
        needsOnboarding: true
      };
    }
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    initialized,
    error,
    isAuthenticated: !!session,
    signOut,
    refreshSession,
    updateProfile,
    checkOnboardingStatus,
  }), [user, session, loading, initialized, error, signOut, refreshSession, updateProfile, checkOnboardingStatus]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
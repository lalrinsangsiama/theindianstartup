'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  checkOnboardingStatus: () => Promise<{ hasCompletedOnboarding: boolean; needsOnboarding: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        logger.info('AuthProvider: Initializing auth state...');
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        logger.info('AuthProvider: Auth state initialized', { 
          hasSession: !!session, 
          userId: session?.user?.id 
        });
      } catch (error) {
        logger.error('Error getting session:', error);
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
        setLoading(false);
        if (!initialized) {
          setInitialized(true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

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
    } catch (error) {
      logger.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      logger.error('Error refreshing session:', error);
      throw error;
    }
  };

  const checkOnboardingStatus = async () => {
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
    } catch (error) {
      logger.error('Error checking onboarding status:', error);
      return {
        hasCompletedOnboarding: false,
        needsOnboarding: true
      };
    }
  };

  const value = {
    user,
    session,
    loading,
    initialized,
    signOut,
    refreshSession,
    checkOnboardingStatus,
  };

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
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface SubscriptionStatus {
  hasSubscription: boolean;
  status: string | null;
  isActive: boolean;
  isExpired: boolean;
  planId?: string;
  startDate?: string;
  expiryDate?: string;
  daysRemaining?: number;
  amount?: number;
  paymentDetails?: {
    orderId?: string;
    paymentId?: string;
    purchaseDate?: string;
  };
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const fetchSubscriptionStatus = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/subscription/status');
        
        if (!response.ok) {
          throw new Error('Failed to fetch subscription status');
        }

        const data = await response.json();
        setSubscription(data);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setSubscription({
          hasSubscription: false,
          status: null,
          isActive: false,
          isExpired: false,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [user]);

  const refetch = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await fetch('/api/subscription/status');
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      console.error('Error refetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    subscription,
    loading,
    error,
    refetch,
    // Convenience properties
    hasActiveSubscription: subscription?.isActive || false,
    isExpired: subscription?.isExpired || false,
    daysRemaining: subscription?.daysRemaining || 0,
    planId: subscription?.planId,
  };
}
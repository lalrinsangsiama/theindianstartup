import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useAuthContext } from '@/contexts/AuthContext';

interface UserCoupon {
  id: string;
  code: string;
  discountPercent: number;
  description: string;
  validUntil: string;
  usedAt?: string;
  isValid: boolean;
}

export function useUserCoupons() {
  const { user } = useAuthContext();
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!user) {
        setCoupons([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/coupons');
        if (response.ok) {
          const data = await response.json();
          // Validate response structure - ensure coupons is an array
          const rawCoupons = data?.coupons;
          if (Array.isArray(rawCoupons)) {
            // Filter to only valid coupon objects
            const validCoupons = rawCoupons.filter(
              (c: unknown): c is UserCoupon =>
                typeof c === 'object' &&
                c !== null &&
                'id' in c &&
                'code' in c &&
                typeof (c as UserCoupon).code === 'string'
            );
            setCoupons(validCoupons);
          } else {
            setCoupons([]);
          }
        }
      } catch (error) {
        logger.error('Failed to fetch coupons:', error);
        setCoupons([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, [user]);

  const activeCoupons = coupons.filter(c => c.isValid && !c.usedAt);
  const usedCoupons = coupons.filter(c => c.usedAt);

  return { 
    coupons,
    activeCoupons,
    usedCoupons,
    isLoading
  };
}
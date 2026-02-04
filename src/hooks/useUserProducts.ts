import { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { useAuthContext } from '@/contexts/AuthContext';

interface UserProduct {
  productCode: string;
  productId: string;
  hasAccess: boolean;
  expiresAt?: string;
}

export function useUserProducts() {
  const { user } = useAuthContext();
  const [userProducts, setUserProducts] = useState<UserProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use AbortController to cancel fetch on unmount/user change (prevents race conditions)
    const abortController = new AbortController();

    const fetchUserProducts = async () => {
      if (!user) {
        setUserProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile', {
          signal: abortController.signal,
        });

        // Check if request was aborted before processing response
        if (abortController.signal.aborted) return;

        if (response.ok) {
          const data = await response.json();
          const purchases = data.user?.activePurchases || [];

          // Map purchases to a simple product list
          const products = purchases
            .filter((p: { status: string; expiresAt: string }) =>
              p.status === 'completed' && new Date(p.expiresAt) > new Date()
            )
            .map((p: { product?: { code: string }; productId: string; expiresAt: string }) => ({
              productCode: p.product?.code,
              productId: p.productId,
              hasAccess: true,
              expiresAt: p.expiresAt
            }));

          setUserProducts(products);
        }
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === 'AbortError') return;
        logger.error('Failed to fetch user products:', error);
        setUserProducts([]);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchUserProducts();

    return () => {
      abortController.abort();
    };
  }, [user]);

  const hasProduct = (productCode: string) => {
    return userProducts.some(p => 
      p.productCode === productCode || p.productCode === 'ALL_ACCESS'
    );
  };

  const hasAllAccess = () => {
    return userProducts.some(p => p.productCode === 'ALL_ACCESS');
  };

  return {
    userProducts,
    isLoading,
    hasProduct,
    hasAllAccess,
    // Aliases for backward compatibility
    hasAccess: hasProduct,
    loading: isLoading,
    products: userProducts
  };
}
import { useState, useEffect } from 'react';
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
    const fetchUserProducts = async () => {
      if (!user) {
        setUserProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          const purchases = data.user?.activePurchases || [];
          
          // Map purchases to a simple product list
          const products = purchases
            .filter((p: any) => p.status === 'completed' && new Date(p.expiresAt) > new Date())
            .map((p: any) => ({
              productCode: p.product?.code,
              productId: p.productId,
              hasAccess: true,
              expiresAt: p.expiresAt
            }));
          
          setUserProducts(products);
        }
      } catch (error) {
        logger.error('Failed to fetch user products:', error);
        setUserProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProducts();
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
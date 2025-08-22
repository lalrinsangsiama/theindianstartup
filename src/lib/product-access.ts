import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { PRODUCTS } from '@/lib/products-catalog';
import type { Product } from '@/lib/products-catalog';

export interface ProductAccess {
  hasAccess: boolean;
  expiresAt?: Date;
  purchaseId?: string;
  daysRemaining?: number;
}

// Re-export for backward compatibility
export { Product, PRODUCTS };

/**
 * Check if user has access to a specific product
 */
export async function checkProductAccess(userId: string, productCode: string): Promise<ProductAccess> {
  try {
    const supabase = createClient();
    
    // Check for direct product purchase or ALL_ACCESS bundle
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', userId)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .or(`product.code.eq.${productCode},product.code.eq.ALL_ACCESS`);

    if (!purchases || purchases.length === 0) {
      return { hasAccess: false };
    }

    // Check if user has direct access to the product or ALL_ACCESS
    const directAccess = purchases.find(p => p.product?.code === productCode);
    const bundleAccess = purchases.find(p => p.product?.code === 'ALL_ACCESS');
    
    const activePurchase = directAccess || bundleAccess;
    
    if (!activePurchase) {
      return { hasAccess: false };
    }

    const expiresAt = new Date(activePurchase.expiresAt);
    const now = new Date();
    const hasAccess = expiresAt > now;
    const daysRemaining = hasAccess ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    return {
      hasAccess,
      expiresAt,
      purchaseId: activePurchase.id,
      daysRemaining
    };
  } catch (error) {
    logger.error('Error checking product access:', error);
    return { hasAccess: false };
  }
}

/**
 * Check if user has access to any product (for bundle access)
 */
export async function checkAnyProductAccess(userId: string): Promise<boolean> {
  const productCodes = Object.keys(PRODUCTS).filter(code => code !== 'ALL_ACCESS');
  
  for (const code of productCodes) {
    const access = await checkProductAccess(userId, code);
    if (access.hasAccess) {
      return true;
    }
  }
  
  return false;
}

/**
 * Get all products user has access to
 */
export async function getUserProducts(userId: string): Promise<Array<Product & ProductAccess>> {
  const products = [];
  
  for (const [code, product] of Object.entries(PRODUCTS)) {
    if (code === 'ALL_ACCESS') continue; // Skip bundle product
    
    const access = await checkProductAccess(userId, code);
    
    products.push({
      ...product,
      ...access
    });
  }
  
  return products;
}
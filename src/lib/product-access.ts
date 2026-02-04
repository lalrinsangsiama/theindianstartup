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

// Products included in SECTOR_MASTERY bundle
const SECTOR_MASTERY_PRODUCTS = ['P13', 'P14', 'P15'];

/**
 * Check if user has access to a specific product
 */
export async function checkProductAccess(userId: string, productCode: string): Promise<ProductAccess> {
  try {
    const supabase = createClient();

    // Build OR conditions for access check
    // Include SECTOR_MASTERY bundle for P13, P14, P15
    const includeSectorMastery = SECTOR_MASTERY_PRODUCTS.includes(productCode);
    const orConditions = includeSectorMastery
      ? `product.code.eq.${productCode},product.code.eq.ALL_ACCESS,product.code.eq.SECTOR_MASTERY`
      : `product.code.eq.${productCode},product.code.eq.ALL_ACCESS`;

    // Check for direct product purchase, ALL_ACCESS bundle, or SECTOR_MASTERY bundle
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', userId)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .or(orConditions);

    if (!purchases || purchases.length === 0) {
      return { hasAccess: false };
    }

    // Check if user has direct access, ALL_ACCESS, or SECTOR_MASTERY bundle
    const directAccess = purchases.find(p => p.product?.code === productCode);
    const allAccessBundle = purchases.find(p => p.product?.code === 'ALL_ACCESS');
    const sectorMasteryBundle = includeSectorMastery
      ? purchases.find(p => p.product?.code === 'SECTOR_MASTERY')
      : null;

    const activePurchase = directAccess || allAccessBundle || sectorMasteryBundle;

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
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

// Products included in SECTOR_MASTERY bundle (courses + toolkits)
const SECTOR_MASTERY_PRODUCTS = ['P13', 'P14', 'P15', 'T13', 'T14', 'T15'];

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

/**
 * Result of bundle upgrade price calculation
 */
export interface UpgradePriceResult {
  originalPrice: number;      // Full ALL_ACCESS price (149999)
  creditedAmount: number;     // Total credit from owned courses
  upgradePrice: number;       // Final price user pays
  creditedCourses: Array<{    // Course details being credited
    code: string;
    title: string;
    price: number;
  }>;
  ownsAllCourses: boolean;    // True if user owns all 30 courses
  hasAllAccess: boolean;      // True if user already has ALL_ACCESS
}

// All individual courses in the ALL_ACCESS bundle (P1-P30)
const ALL_ACCESS_COURSES = [
  'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10',
  'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20',
  'P21', 'P22', 'P23', 'P24', 'P25', 'P26', 'P27', 'P28', 'P29', 'P30'
];

/**
 * Calculate the upgrade price for ALL_ACCESS bundle based on courses user already owns.
 * Users get credit for courses they've already purchased (at catalog price).
 */
export async function calculateBundleUpgradePrice(userId: string): Promise<UpgradePriceResult> {
  const allAccessProduct = PRODUCTS['ALL_ACCESS'];
  const originalPrice = allAccessProduct.price; // 149999

  try {
    const supabase = createClient();

    // First check if user already has ALL_ACCESS
    const { data: allAccessPurchase } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', userId)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString())
      .eq('product.code', 'ALL_ACCESS')
      .single();

    if (allAccessPurchase) {
      return {
        originalPrice,
        creditedAmount: originalPrice,
        upgradePrice: 0,
        creditedCourses: [],
        ownsAllCourses: false,
        hasAllAccess: true
      };
    }

    // Get all user's completed purchases for individual courses
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(code)')
      .eq('userId', userId)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (!purchases || purchases.length === 0) {
      return {
        originalPrice,
        creditedAmount: 0,
        upgradePrice: originalPrice,
        creditedCourses: [],
        ownsAllCourses: false,
        hasAllAccess: false
      };
    }

    // Collect all owned course codes (expanding SECTOR_MASTERY bundle)
    const ownedCourseCodes = new Set<string>();

    for (const purchase of purchases) {
      const productCode = purchase.product?.code;
      if (!productCode) continue;

      if (productCode === 'SECTOR_MASTERY') {
        // Expand SECTOR_MASTERY to its individual courses (only P13-P15, not toolkits)
        ownedCourseCodes.add('P13');
        ownedCourseCodes.add('P14');
        ownedCourseCodes.add('P15');
      } else if (ALL_ACCESS_COURSES.includes(productCode)) {
        ownedCourseCodes.add(productCode);
      }
    }

    // Calculate credit for owned courses
    const creditedCourses: UpgradePriceResult['creditedCourses'] = [];
    let creditedAmount = 0;

    for (const code of ownedCourseCodes) {
      const product = PRODUCTS[code];
      if (product) {
        creditedCourses.push({
          code: product.code,
          title: product.title,
          price: product.price
        });
        creditedAmount += product.price;
      }
    }

    // Sort credited courses by code for consistent display
    creditedCourses.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));

    // Calculate upgrade price (minimum 0)
    const upgradePrice = Math.max(0, originalPrice - creditedAmount);

    // Check if user owns all 30 courses
    const ownsAllCourses = ownedCourseCodes.size >= ALL_ACCESS_COURSES.length;

    return {
      originalPrice,
      creditedAmount,
      upgradePrice,
      creditedCourses,
      ownsAllCourses,
      hasAllAccess: false
    };
  } catch (error) {
    logger.error('Error calculating bundle upgrade price:', error);
    // Return full price on error (fail-safe)
    return {
      originalPrice,
      creditedAmount: 0,
      upgradePrice: originalPrice,
      creditedCourses: [],
      ownsAllCourses: false,
      hasAllAccess: false
    };
  }
}
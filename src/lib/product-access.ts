import { createClient } from '@/lib/supabase/server';

export interface ProductAccess {
  hasAccess: boolean;
  expiresAt?: Date;
  purchaseId?: string;
  daysRemaining?: number;
}

export interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  isBundle?: boolean;
  bundleProducts?: string[];
  comingSoon?: boolean;
  waitlistEnabled?: boolean;
}

// Product catalog - this would come from database in production
export const PRODUCTS: Record<string, Product> = {
  P1: {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    description: 'Learn to build a startup from idea to launch with daily lessons, action plans and India-specific guidance.',
    price: 4999
  },
  P2: {
    code: 'P2', 
    title: 'Incorporation & Compliance Kit - Complete',
    description: 'Learn Indian business incorporation and compliance requirements. 40-day comprehensive course covering entity selection, filing processes, tax registrations, and legal compliance with 150+ educational templates.',
    price: 4999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P3: {
    code: 'P3',
    title: 'Funding in India - Complete Mastery',
    description: 'Learn about the Indian funding ecosystem from government grants to venture capital. 45-day comprehensive course covering funding sources, negotiation strategies, and deal processes with 200+ educational templates.',
    price: 5999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P4: {
    code: 'P4',
    title: 'Finance Stack - CFO-Level Mastery',
    description: 'Learn to design financial systems and processes including accounting, GST compliance, reporting, and strategic finance. 45-day comprehensive educational course with 250+ templates.',
    price: 6999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P5: {
    code: 'P5',
    title: 'Legal Stack - Bulletproof Legal Framework',
    description: 'Learn legal frameworks and documentation including contracts, IP protection, employment law, and compliance systems. 45-day comprehensive course with 300+ educational templates and expert guidance.',
    price: 7999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P6: {
    code: 'P6',
    title: 'Sales & GTM in India - Master Course',
    description: 'Transform your startup into a revenue-generating machine with India-specific sales strategies. 60-day intensive course with 75+ templates and real case studies.',
    price: 6999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P7: {
    code: 'P7',
    title: 'State-wise Scheme Map - Complete Navigation',
    description: 'Master India\'s state-level business ecosystem with comprehensive coverage of all 28 states and UTs. 30-day course covering schemes, subsidies, and location optimization strategies.',
    price: 4999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P8: {
    code: 'P8',
    title: 'Investor-Ready Data Room Mastery',
    description: 'Transform your startup with a professional data room that accelerates fundraising and increases valuation. 45-day intensive with expert insights.',
    price: 9999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P9: {
    code: 'P9',
    title: 'Government Schemes & Funding Mastery',
    description: 'Master access to ₹50L-₹5Cr government funding through 100+ schemes with detailed case studies and proven templates.',
    price: 4999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P10: {
    code: 'P10',
    title: 'Patent Mastery for Indian Startups',
    description: 'Master intellectual property from filing to monetization. 60-day comprehensive course covering patent strategy, prosecution, portfolio management, and commercialization with 100+ templates.',
    price: 7999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P11: {
    code: 'P11',
    title: 'Branding & Public Relations Mastery',
    description: 'Transform into a recognized industry leader through powerful brand building and strategic PR. 54-day intensive course with 300+ templates, media training, award strategies, and crisis management.',
    price: 7999,
    comingSoon: true,
    waitlistEnabled: true
  },
  P12: {
    code: 'P12',
    title: 'Marketing Mastery - Complete Growth Engine',
    description: 'Build a data-driven marketing machine generating predictable growth. 60-day comprehensive course covering all channels, tactics, and strategies with 500+ templates and tools.',
    price: 9999,
    comingSoon: true,
    waitlistEnabled: true
  },
  ALL_ACCESS: {
    code: 'ALL_ACCESS',
    title: 'All-Access Bundle',
    description: 'Get lifetime access to all 12 products - complete startup mastery from idea to scale. Save ₹15,987 with the bundle!',
    price: 54999,
    isBundle: true,
    bundleProducts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12']
  }
};

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
    console.error('Error checking product access:', error);
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
 * Check if user needs to purchase access (middleware helper)
 */
export async function requireProductAccess(userId: string, productCode: string): Promise<{ success: boolean; redirectTo?: string }> {
  const access = await checkProductAccess(userId, productCode);
  
  if (!access.hasAccess) {
    return {
      success: false,
      redirectTo: `/pricing?required=${productCode}`
    };
  }
  
  if (access.daysRemaining && access.daysRemaining <= 7) {
    // Show renewal notice but allow access
    return {
      success: true,
      redirectTo: `/renewal-notice?product=${productCode}&days=${access.daysRemaining}`
    };
  }
  
  return { success: true };
}

/**
 * Get product by code
 */
export function getProduct(code: string): Product | null {
  return PRODUCTS[code] || null;
}

/**
 * Calculate bundle savings
 */
export function calculateBundleSavings(): number {
  const individualTotal = Object.values(PRODUCTS)
    .filter(p => !p.isBundle)
    .reduce((sum, p) => sum + p.price, 0);
  
  const bundlePrice = PRODUCTS.ALL_ACCESS.price;
  return individualTotal - bundlePrice;
}

/**
 * Check if user owns specific products for upgrade pricing
 */
export async function getUpgradePrice(userId: string): Promise<{ price: number; discount: number }> {
  const userProducts = await getUserProducts(userId);
  const ownedProductsValue = userProducts
    .filter(p => p.hasAccess)
    .reduce((sum, p) => sum + p.price, 0);
  
  const bundlePrice = PRODUCTS.ALL_ACCESS.price;
  const discountedPrice = Math.max(bundlePrice - ownedProductsValue, 0);
  
  return {
    price: discountedPrice,
    discount: ownedProductsValue
  };
}
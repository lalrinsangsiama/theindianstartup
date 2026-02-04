import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

// Products included in SECTOR_MASTERY bundle
const SECTOR_MASTERY_PRODUCTS = ['P13', 'P14', 'P15'];

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    // Normalize product code to uppercase for consistent comparison
    const productCode = params.productCode.toUpperCase();
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        hasAccess: false,
        productTitle: PRODUCTS[productCode]?.title,
        productPrice: PRODUCTS[productCode]?.price
      });
    }

    // Check for purchases (direct product, ALL_ACCESS bundle, or SECTOR_MASTERY bundle)
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        hasAccess: false,
        productTitle: PRODUCTS[productCode]?.title,
        productPrice: PRODUCTS[productCode]?.price
      });
    }

    // Check if user has direct access, ALL_ACCESS, or SECTOR_MASTERY bundle
    const directAccess = purchases.find(p => p.product?.code === productCode);
    const allAccessBundle = purchases.find(p => p.product?.code === 'ALL_ACCESS');
    const sectorMasteryBundle = SECTOR_MASTERY_PRODUCTS.includes(productCode)
      ? purchases.find(p => p.product?.code === 'SECTOR_MASTERY')
      : null;

    const activePurchase = directAccess || allAccessBundle || sectorMasteryBundle;

    if (!activePurchase) {
      return NextResponse.json({
        hasAccess: false,
        productTitle: PRODUCTS[productCode]?.title,
        productPrice: PRODUCTS[productCode]?.price
      });
    }

    // Calculate days remaining
    const expiresAt = new Date(activePurchase.expiresAt);
    const now = new Date();
    const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return NextResponse.json({
      hasAccess: true,
      expiresAt: activePurchase.expiresAt,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
      productTitle: activePurchase.product?.title || PRODUCTS[productCode]?.title,
      productPrice: PRODUCTS[productCode]?.price
    });

  } catch (error) {
    logger.error('Product access check error:', error);
    return NextResponse.json({
      hasAccess: false,
      error: 'Failed to check access'
    });
  }
}
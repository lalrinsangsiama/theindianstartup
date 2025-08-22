import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        hasAccess: false,
        productTitle: PRODUCTS[params.productCode]?.title,
        productPrice: PRODUCTS[params.productCode]?.price
      });
    }

    // Check for purchases (direct product or ALL_ACCESS bundle)
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        hasAccess: false,
        productTitle: PRODUCTS[params.productCode]?.title,
        productPrice: PRODUCTS[params.productCode]?.price
      });
    }

    // Check if user has direct access to the product or ALL_ACCESS
    const directAccess = purchases.find(p => p.product?.code === params.productCode);
    const bundleAccess = purchases.find(p => p.product?.code === 'ALL_ACCESS');
    
    const activePurchase = directAccess || bundleAccess;
    
    if (!activePurchase) {
      return NextResponse.json({
        hasAccess: false,
        productTitle: PRODUCTS[params.productCode]?.title,
        productPrice: PRODUCTS[params.productCode]?.price
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
      productTitle: activePurchase.product?.title || PRODUCTS[params.productCode]?.title,
      productPrice: PRODUCTS[params.productCode]?.price
    });

  } catch (error) {
    logger.error('Product access check error:', error);
    return NextResponse.json({
      hasAccess: false,
      error: 'Failed to check access'
    });
  }
}
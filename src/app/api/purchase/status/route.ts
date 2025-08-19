import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const productType = searchParams.get('productType') || '30_day_guide';

    const supabase = createClient();

    // Get user's purchases for this product
    const { data: purchases, error } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .eq('productType', productType)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      
      // If table doesn't exist, return no access
      if (error.code === 'PGRST205') {
        return NextResponse.json({
          hasAccess: false,
          activePurchase: null,
          allPurchases: [],
          warning: 'Purchase tracking not yet configured'
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch purchase status' },
        { status: 500 }
      );
    }

    // Find active purchase
    const activePurchase = purchases?.find(p => 
      p.status === 'completed' && 
      p.isActive && 
      new Date(p.accessEndDate) > new Date()
    );

    return NextResponse.json({
      hasAccess: !!activePurchase,
      activePurchase: activePurchase ? {
        id: activePurchase.id,
        productName: activePurchase.productName,
        purchaseDate: activePurchase.purchaseDate,
        accessEndDate: activePurchase.accessEndDate,
        status: activePurchase.status
      } : null,
      allPurchases: purchases?.map(p => ({
        id: p.id,
        productName: p.productName,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
        purchaseDate: p.purchaseDate,
        accessEndDate: p.accessEndDate
      })) || []
    });

  } catch (error) {
    console.error('Purchase status error:', error);
    return NextResponse.json(
      { error: 'Failed to check purchase status' },
      { status: 500 }
    );
  }
}
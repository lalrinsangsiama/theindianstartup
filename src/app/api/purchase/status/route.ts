import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const productType = searchParams.get('productType') || '30_day_guide';

    const supabase = createClient();

    // If orderId is provided, get specific order
    if (orderId) {
      const { data: purchase, error } = await supabase
        .from('Purchase')
        .select(`
          *,
          product:Product(*)
        `)
        .eq('userId', user.id)
        .eq('razorpayOrderId', orderId)
        .single();

      if (error || !purchase) {
        logger.error('Failed to fetch order:', error);
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        orderId: purchase.razorpayOrderId,
        paymentId: purchase.razorpayPaymentId,
        status: purchase.status,
        amount: purchase.amount,
        currency: purchase.currency,
        productName: purchase.productName,
        productCode: purchase.productCode,
        purchaseDate: purchase.createdAt,
        expiresAt: purchase.expiresAt,
        product: purchase.product,
        isActive: purchase.isActive
      });
    }

    // Otherwise get all purchases for product type
    const { data: purchases, error } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .eq('productType', productType)
      .order('createdAt', { ascending: false });

    if (error) {
      logger.error('Database error:', error);
      
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
      new Date(p.expiresAt) > new Date()
    );

    return NextResponse.json({
      hasAccess: !!activePurchase,
      activePurchase: activePurchase ? {
        id: activePurchase.id,
        productName: activePurchase.productName,
        purchaseDate: activePurchase.purchaseDate,
        expiresAt: activePurchase.expiresAt,
        status: activePurchase.status
      } : null,
      allPurchases: purchases?.map(p => ({
        id: p.id,
        productName: p.productName,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
        purchaseDate: p.purchaseDate,
        expiresAt: p.expiresAt
      })) || []
    });

  } catch (error) {
    logger.error('Purchase status error:', error);
    return NextResponse.json(
      { error: 'Failed to check purchase status' },
      { status: 500 }
    );
  }
}
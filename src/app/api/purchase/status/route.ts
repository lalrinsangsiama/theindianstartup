import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const productCode = searchParams.get('productCode') || searchParams.get('productType');

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
        currency: 'INR',
        productName: purchase.product?.title || 'Course',
        productCode: purchase.product?.code || purchase.productId,
        purchaseDate: purchase.createdAt,
        expiresAt: purchase.expiresAt,
        product: purchase.product,
        isActive: purchase.status === 'completed' && new Date(purchase.expiresAt) > new Date()
      });
    }

    // Otherwise get all purchases (optionally filtered by product code)
    let query = supabase
      .from('Purchase')
      .select(`
        *,
        product:Product(*)
      `)
      .eq('userId', user.id)
      .order('createdAt', { ascending: false });

    // Filter by product code if provided
    if (productCode) {
      // First get the product ID
      const { data: product } = await supabase
        .from('Product')
        .select('id')
        .eq('code', productCode)
        .single();

      if (product) {
        query = query.eq('productId', product.id);
      }
    }

    const { data: purchases, error } = await query;

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
      new Date(p.expiresAt) > new Date()
    );

    return NextResponse.json({
      hasAccess: !!activePurchase,
      activePurchase: activePurchase ? {
        id: activePurchase.id,
        productName: activePurchase.product?.title || 'Course',
        productCode: activePurchase.product?.code,
        purchaseDate: activePurchase.createdAt,
        expiresAt: activePurchase.expiresAt,
        status: activePurchase.status
      } : null,
      allPurchases: purchases?.map(p => ({
        id: p.id,
        productName: p.product?.title || 'Course',
        productCode: p.product?.code,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt,
        purchaseDate: p.createdAt,
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

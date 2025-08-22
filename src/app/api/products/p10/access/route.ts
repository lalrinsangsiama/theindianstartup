// P10 Access Check API Endpoint
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/server';
import { auth } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const user = await auth();
    
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Check if user has access to P10
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P10', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError) {
      logger.error('Error checking P10 purchase:', purchaseError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const hasAccess = purchases && purchases.length > 0;
    
    if (!hasAccess) {
      return NextResponse.json({ 
        hasAccess: false,
        message: 'Purchase P10: Patent Mastery to access this course',
        redirectUrl: '/pricing?product=P10'
      }, { status: 403 });
    }

    // User has access
    const purchase = purchases[0];
    return NextResponse.json({
      hasAccess: true,
      productCode: purchase.productCode,
      purchaseDate: purchase.purchaseDate,
      expiresAt: purchase.expiresAt,
      isBundle: purchase.productCode === 'ALL_ACCESS'
    });

  } catch (error) {
    logger.error('Error in P10 access check:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
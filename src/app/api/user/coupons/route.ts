import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();
    
    // Get user's coupons
    const { data: coupons, error } = await supabase
      .from('Coupon')
      .select('*')
      .eq('userId', user.id)
      .order('createdAt', { ascending: false });

    if (error) {
      logger.error('Error fetching coupons:', error);
      return NextResponse.json(
        { error: 'Failed to fetch coupons' },
        { status: 500 }
      );
    }

    // Process coupons to add validity status
    const now = new Date();
    const processedCoupons = coupons.map(coupon => ({
      ...coupon,
      isValid: new Date(coupon.validUntil) > now && coupon.usedCount < coupon.maxUses
    }));

    return NextResponse.json({
      coupons: processedCoupons
    });

  } catch (error) {
    logger.error('Coupons fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coupons' },
      { status: 500 }
    );
  }
}
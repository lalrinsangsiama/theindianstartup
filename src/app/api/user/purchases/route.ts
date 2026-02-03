import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    const { data: purchases, error } = await supabase
      .from('Purchase')
      .select(`
        id,
        productCode,
        productName,
        productType,
        amount,
        originalAmount,
        discountAmount,
        status,
        purchasedAt,
        expiresAt,
        refundStatus,
        refundRequestedAt,
        refundCompletedAt,
        refundAmount,
        createdAt
      `)
      .eq('userId', user.id)
      .order('purchasedAt', { ascending: false });

    if (error) {
      logger.error('Failed to fetch user purchases:', error);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    return NextResponse.json({ purchases });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('User purchases error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}

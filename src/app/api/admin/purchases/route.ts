import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    const { data: purchases, error } = await supabase
      .from('Purchase')
      .select(`
        id,
        productCode,
        productName,
        amount,
        currency,
        status,
        isActive,
        purchaseDate,
        expiresAt,
        razorpayOrderId,
        razorpayPaymentId,
        createdAt,
        user:User!inner(
          id,
          name,
          email
        )
      `)
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return NextResponse.json(purchases || []);
  } catch (error) {
    logger.error('Error fetching purchases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    );
  }
}
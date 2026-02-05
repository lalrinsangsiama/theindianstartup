import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    // Distinguish between authentication failure and authorization failure
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('Admin access required')) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    const { data: purchases, error } = await supabase
      .from('Purchase')
      .select(`
        id,
        amount,
        currency,
        status,
        purchasedAt,
        expiresAt,
        razorpayOrderId,
        razorpayPaymentId,
        createdAt,
        product:Product(
          id,
          code,
          title
        ),
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
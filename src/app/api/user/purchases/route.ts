import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  // Apply rate limiting (100 requests per 15 minutes)
  const rateLimitResponse = await checkRateLimit(request, 'api');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const user = await requireAuth();
    const supabase = createClient();

    // H7: Parse pagination parameters
    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
    const offset = (page - 1) * limit;

    // Get total count for pagination
    const { count: totalCount, error: countError } = await supabase
      .from('Purchase')
      .select('*', { count: 'exact', head: true })
      .eq('userId', user.id);

    if (countError) {
      logger.error('Failed to count user purchases:', countError);
    }

    // H7: Get paginated purchases
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
      .order('purchasedAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      logger.error('Failed to fetch user purchases:', error);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    const totalPages = Math.ceil((totalCount || 0) / limit);

    return NextResponse.json({
      purchases,
      pagination: {
        page,
        limit,
        totalCount: totalCount || 0,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

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

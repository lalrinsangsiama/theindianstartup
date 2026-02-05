import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { z } from 'zod';

// Valid status values for refund requests
const VALID_STATUSES = ['pending', 'approved', 'processing', 'completed', 'denied', 'failed', 'all'] as const;

// Zod schema for query parameters validation
const refundsQuerySchema = z.object({
  status: z.enum(VALID_STATUSES).optional().default('all'),
  page: z.coerce.number().int().min(1).max(1000).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20)
});

export async function GET(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    await requireAdmin({ ipAddress: clientIP });

    const supabase = createClient();
    const { searchParams } = new URL(request.url);

    // Validate query parameters with Zod BEFORE using them
    const queryValidation = refundsQuerySchema.safeParse({
      status: searchParams.get('status') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined
    });

    if (!queryValidation.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: queryValidation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { status, page, limit } = queryValidation.data;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('RefundRequest')
      .select(`
        *,
        purchase:Purchase(
          id,
          productCode,
          productName,
          amount,
          purchasedAt,
          razorpayPaymentId
        ),
        user:User!RefundRequest_userId_fkey(
          id,
          name,
          email
        ),
        reviewer:User!RefundRequest_reviewedBy_fkey(
          id,
          name,
          email
        )
      `, { count: 'exact' })
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: refunds, error, count } = await query;

    if (error) {
      logger.error('Failed to fetch refunds:', error);
      return NextResponse.json(
        { error: 'Failed to fetch refunds' },
        { status: 500 }
      );
    }

    // Get summary stats
    const { data: stats } = await supabase
      .from('RefundRequest')
      .select('status')
      .then(({ data }) => {
        const summary = {
          pending: 0,
          approved: 0,
          processing: 0,
          completed: 0,
          denied: 0,
          failed: 0,
          total: data?.length || 0,
        };
        data?.forEach((r: { status: string }) => {
          if (r.status in summary) {
            summary[r.status as keyof typeof summary]++;
          }
        });
        return { data: summary };
      });

    return NextResponse.json({
      refunds,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
      stats,
    });

  } catch (error) {
    if (error instanceof Error && error.message.includes('Admin access required')) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    logger.error('Admin refunds list error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch refunds' },
      { status: 500 }
    );
  }
}

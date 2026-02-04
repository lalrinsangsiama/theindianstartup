import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  // Apply rate limiting for admin actions
  const rateLimitResponse = await checkRateLimit(request, 'adminAction');
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    // 401 for auth issues, 403 for permission issues
    const status = message === 'Authentication required' ? 401 : 403;
    return NextResponse.json({ error: message }, { status });
  }

  const supabase = createClient();

  // Parse pagination parameters
  const searchParams = request.nextUrl.searchParams;
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
  const offset = (page - 1) * limit;

  try {
    // Get total count for pagination info
    const { count: totalCount, error: countError } = await supabase
      .from('User')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // Get paginated users
    const { data: users, error } = await supabase
      .from('User')
      .select(`
        id,
        email,
        name,
        phone,
        createdAt,
        currentDay,
        totalXP,
        currentStreak
      `)
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    const totalPages = Math.ceil((totalCount || 0) / limit);

    return NextResponse.json({
      users: users || [],
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
    logger.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
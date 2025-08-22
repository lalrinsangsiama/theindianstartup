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
    // Get basic stats
    const [
      { count: totalUsers },
      { count: totalProducts },
      { count: totalPurchases },
      { data: purchases }
    ] = await Promise.all([
      supabase.from('User').select('*', { count: 'exact', head: true }),
      supabase.from('Product').select('*', { count: 'exact', head: true }),
      supabase.from('Purchase').select('*', { count: 'exact', head: true }),
      supabase.from('Purchase')
        .select('amount, status, createdAt')
        .eq('status', 'completed')
    ]);

    // Calculate revenue and active users
    const totalRevenue = purchases?.reduce((sum: number, p: any) => sum + p.amount, 0) || 0;
    
    // Active users (users with purchases in last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: recentPurchases } = await supabase
      .from('Purchase')
      .select('userId')
      .gte('createdAt', thirtyDaysAgo)
      .eq('status', 'completed');
    
    const activeUsers = new Set(recentPurchases?.map(p => p.userId) || []).size;

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      totalProducts: totalProducts || 0,
      totalPurchases: totalPurchases || 0,
      totalRevenue,
      activeUsers
    });
  } catch (error) {
    logger.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
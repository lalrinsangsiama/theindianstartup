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
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return NextResponse.json(users || []);
  } catch (error) {
    logger.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
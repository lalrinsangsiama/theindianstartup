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
    const { data: products, error } = await supabase
      .from('Product')
      .select(`
        id,
        code,
        title,
        modules:Module(
          id,
          title,
          description,
          orderIndex,
          lessons:Lesson(
            id,
            day,
            title,
            briefContent,
            actionItems,
            resources,
            estimatedTime,
            xpReward,
            orderIndex
          )
        )
      `)
      .order('createdAt', { ascending: true });

    if (error) throw error;

    return NextResponse.json(products || []);
  } catch (error) {
    logger.error('Error fetching content products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
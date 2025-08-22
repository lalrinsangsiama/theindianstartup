import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const lessonData = await request.json();

  try {
    const { data: lesson, error } = await supabase
      .from('Lesson')
      .insert([lessonData])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(lesson);
  } catch (error) {
    logger.error('Error creating lesson:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 }
    );
  }
}
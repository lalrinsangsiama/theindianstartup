import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { adminLessonSchema, validateRequest, validationErrorResponse } from '@/lib/validation-schemas';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  let rawData;
  try {
    rawData = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate input
  const validation = validateRequest(adminLessonSchema, rawData);
  if (!validation.success) {
    return NextResponse.json(validationErrorResponse(validation), { status: 400 });
  }

  try {
    const { data: lesson, error } = await supabase
      .from('Lesson')
      .insert([validation.data])
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
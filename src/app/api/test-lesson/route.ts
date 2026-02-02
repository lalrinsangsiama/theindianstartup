import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Use service role for testing
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Test database connection and check for lesson data
    const { data: lessons, error: lessonError } = await supabase
      .from('DailyLesson')
      .select('day, title')
      .order('day', { ascending: true });

    if (lessonError) {
      logger.error('Database error:', lessonError);
      return NextResponse.json({
        error: 'Database connection failed',
        details: lessonError.message,
        suggestions: [
          'Check if DailyLesson table exists',
          'Verify database connection',
          'Run seed script if no data exists'
        ]
      }, { status: 500 });
    }

    // Check if we have lesson data
    if (!lessons || lessons.length === 0) {
      return NextResponse.json({
        error: 'No lesson data found',
        message: 'DailyLesson table is empty',
        suggestions: [
          'Run: npm run seed',
          'Or manually add lesson data to database',
          'Check prisma/seed.ts file'
        ]
      }, { status: 404 });
    }

    // Test Day 1 specifically
    const { data: day1, error: day1Error } = await supabase
      .from('DailyLesson')
      .select('*')
      .eq('day', 1)
      .single();

    return NextResponse.json({
      success: true,
      message: 'Database connection working',
      lessonCount: lessons.length,
      lessons: lessons,
      day1Available: !!day1,
      day1Data: day1 ? {
        title: day1.title,
        hasContent: !!day1.briefContent,
        hasActionItems: !!(day1.actionItems && day1.actionItems.length > 0),
        hasResources: !!(day1.resources && day1.resources.length > 0)
      } : null
    });

  } catch (error) {
    logger.error('Test lesson API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      suggestions: [
        'Check database configuration',
        'Verify Supabase connection',
        'Check if tables exist'
      ]
    }, { status: 500 });
  }
}
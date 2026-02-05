import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { contentSeeder } from '@/lib/admin-seeding';

// Zod schema for seed action validation
const seedActionSchema = z.object({
  action: z.enum(['seed_all', 'validate', 'clear_content'], {
    errorMap: () => ({ message: 'Invalid action. Must be one of: seed_all, validate, clear_content' })
  })
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate action parameter using Zod
  const validation = seedActionSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors[0]?.message || 'Invalid action' },
      { status: 400 }
    );
  }

  const { action } = validation.data;

  try {
    switch (action) {
      case 'seed_all': {
        const progress = await contentSeeder.seedAllCourses();
        return NextResponse.json({
          success: true,
          message: 'All courses seeded successfully',
          progress
        });
      }

      case 'validate': {
        const validationResult = await contentSeeder.validateSeededContent();
        return NextResponse.json({
          success: true,
          validation: validationResult
        });
      }

      case 'clear_content': {
        await contentSeeder.clearAllContent();
        return NextResponse.json({
          success: true,
          message: 'All content cleared successfully'
        });
      }
    }
  } catch (error) {
    logger.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Seeding operation failed. Check server logs for details.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const validation = await contentSeeder.validateSeededContent();
    return NextResponse.json(validation);
  } catch (error) {
    logger.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Validation operation failed. Check server logs for details.' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { contentSeeder, SeedingProgress } from '@/lib/admin-seeding';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { action } = await request.json();

  try {
    switch (action) {
      case 'seed_all':
        const progress = await contentSeeder.seedAllCourses();
        return NextResponse.json({ 
          success: true, 
          message: 'All courses seeded successfully',
          progress 
        });

      case 'validate':
        const validation = await contentSeeder.validateSeededContent();
        return NextResponse.json({ 
          success: true, 
          validation 
        });

      case 'clear_content':
        await contentSeeder.clearAllContent();
        return NextResponse.json({ 
          success: true, 
          message: 'All content cleared successfully' 
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    logger.error('Seeding error:', error);
    return NextResponse.json(
      { error: `Seeding failed: ${error}` },
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
      { error: `Validation failed: ${error}` },
      { status: 500 }
    );
  }
}
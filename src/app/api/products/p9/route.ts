import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient();

    // Get P9 product details with modules and lessons
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        *,
        modules:Module(
          *,
          lessons:Lesson(*)
        )
      `)
      .eq('code', 'P9')
      .single();

    if (productError) {
      logger.error('Error fetching P9 product:', productError);
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }

    // Check user access to P9
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', session.user.id)
      .or('productCode.eq.P9,productCode.eq.ALL_ACCESS')
      .eq('isActive', true)
      .gte('expiresAt', new Date().toISOString());

    const hasAccess = purchases && purchases.length > 0;

    // Get user's progress for P9 lessons
    let userProgress = {};
    if (hasAccess) {
      const { data: progress } = await supabase
        .from('LessonProgress')
        .select('*')
        .eq('userId', session.user.id)
        .in('lessonId', product.modules.flatMap((m: any) => m.lessons.map((l: any) => l.id)));

      userProgress = progress?.reduce((acc: any, p: any) => {
        acc[p.lessonId] = p;
        return acc;
      }, {}) || {};
    }

    return NextResponse.json({
      product,
      hasAccess,
      userProgress
    });

  } catch (error) {
    logger.error('Error in P9 product API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action, data } = await request.json();
    const supabase = createClient();

    switch (action) {
      case 'track_progress':
        // Update lesson progress
        const { data: progressData, error: progressError } = await supabase
          .from('LessonProgress')
          .upsert({
            userId: session.user.id,
            lessonId: data.lessonId,
            completed: data.completed || false,
            completedAt: data.completed ? new Date().toISOString() : null,
            tasksCompleted: data.tasksCompleted || {},
            reflection: data.reflection || '',
            xpEarned: data.xpEarned || 0
          }, {
            onConflict: 'userId,lessonId'
          })
          .select()
          .single();

        if (progressError) {
          logger.error('Error updating progress:', progressError);
          return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
        }

        return NextResponse.json({ success: true, progress: progressData });

      case 'get_templates':
        // Get P9 templates and resources
        const { data: templates, error: templatesError } = await supabase
          .from('CourseTemplate')
          .select('*')
          .eq('productCode', 'P9')
          .eq('isActive', true)
          .order('category', { ascending: true });

        if (templatesError) {
          logger.error('Error fetching templates:', templatesError);
          return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
        }

        return NextResponse.json({ templates });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    logger.error('Error in P9 product POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
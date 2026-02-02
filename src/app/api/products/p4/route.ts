import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { checkProductAccess } from '@/lib/product-access';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const supabase = createClient();

    // Get P4 product details with modules and lessons
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        *,
        modules:Module(
          *,
          lessons:Lesson(*)
        )
      `)
      .eq('code', 'P4')
      .single();

    if (productError) {
      logger.error('Error fetching P4 product:', productError);
      return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }

    // Sort modules and lessons by order
    if (product?.modules) {
      product.modules.sort((a: any, b: any) => (a.orderIndex || a.order || 0) - (b.orderIndex || b.order || 0));
      product.modules.forEach((module: any) => {
        if (module.lessons) {
          module.lessons.sort((a: any, b: any) => (a.day || a.order || 0) - (b.day || b.order || 0));
        }
      });
    }

    // Check user access if logged in
    let hasAccess = false;
    let userProgress: Record<string, any> = {};

    if (user) {
      const access = await checkProductAccess(user.id, 'P4');
      hasAccess = access.hasAccess;

      if (hasAccess && product?.modules) {
        // Get user's progress for P4 lessons
        const lessonIds = product.modules.flatMap((m: any) =>
          m.lessons?.map((l: any) => l.id) || []
        );

        if (lessonIds.length > 0) {
          const { data: progress } = await supabase
            .from('LessonProgress')
            .select('*')
            .eq('userId', user.id)
            .in('lessonId', lessonIds);

          userProgress = progress?.reduce((acc: any, p: any) => {
            acc[p.lessonId] = p;
            return acc;
          }, {}) || {};
        }
      }
    }

    return NextResponse.json({
      product,
      hasAccess,
      userProgress
    });

  } catch (error) {
    logger.error('Error in P4 product API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

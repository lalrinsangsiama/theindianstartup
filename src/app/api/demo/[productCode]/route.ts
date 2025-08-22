import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    const supabase = createClient();
    const { productCode } = params;

    // Get authenticated user (required for demo access)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required for demo access' }, { status: 401 });
    }

    // Get product info
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select('*')
      .eq('code', productCode)
      .single();

    if (productError || !product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get first 2 lessons (Day 1 & Day 2) for demo
    const { data: modules, error: modulesError } = await supabase
      .from('Module')
      .select(`
        *,
        lessons:Lesson(*)
      `)
      .eq('productId', product.id)
      .order('order', { ascending: true })
      .limit(1); // Get first module

    if (modulesError) {
      return NextResponse.json({ error: 'Failed to fetch demo content' }, { status: 500 });
    }

    // Get first 2 lessons from the first module
    const demoLessons = modules[0]?.lessons
      ?.sort((a: any, b: any) => a.order - b.order)
      ?.slice(0, 2) || [];

    // Transform lessons for demo (remove some premium content)
    const demoContent = demoLessons.map((lesson: any) => ({
      id: lesson.id,
      order: lesson.order,
      title: lesson.title,
      briefContent: lesson.briefContent,
      // Show limited action items for demo
      actionItems: Array.isArray(lesson.actionItems) 
        ? lesson.actionItems.slice(0, 3).map((item: any) => ({
            ...item,
            isDemo: true
          }))
        : [],
      // Show limited resources for demo  
      resources: Array.isArray(lesson.resources)
        ? lesson.resources.slice(0, 3).map((resource: any) => ({
            ...resource,
            isDemo: true
          }))
        : [],
      estimatedTime: lesson.estimatedTime,
      isDemo: true
    }));

    return NextResponse.json({
      product: {
        code: product.code,
        title: product.title,
        description: product.description,
        price: product.price
      },
      module: modules[0] ? {
        title: modules[0].title,
        description: modules[0].description
      } : null,
      demoLessons: demoContent,
      totalLessons: modules[0]?.lessons?.length || 0,
      demoMessage: "This demo includes Day 1 & Day 2 content. Purchase the full course to access all lessons, templates, and resources."
    });

  } catch (error) {
    logger.error('Demo API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch demo content' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Check if product exists in catalog
    const productCatalog = PRODUCTS[params.productCode];
    if (!productCatalog) {
      return NextResponse.json({
        error: 'Product not found'
      }, { status: 404 });
    }

    // Check for purchases (direct product or ALL_ACCESS bundle)
    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    // Check if user has direct access to the product or ALL_ACCESS
    const directAccess = purchases.find(p => p.product?.code === params.productCode);
    const bundleAccess = purchases.find(p => p.product?.code === 'ALL_ACCESS');
    
    if (!directAccess && !bundleAccess) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    // First get the product by code
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select('id')
      .eq('code', params.productCode)
      .single() as { data: { id: string } | null; error: any };

    if (productError || !product) {
      return NextResponse.json({
        error: 'Product not found'
      }, { status: 404 });
    }

    // Get modules for the product
    const { data: modules, error: modulesError } = await supabase
      .from('Module')
      .select(`
        id,
        title,
        description,
        order,
        estimatedTime,
        xpReward,
        lessons:Lesson(
          id,
          order,
          title,
          briefContent,
          estimatedTime,
          xpReward
        )
      `)
      .eq('productId', product.id)
      .order('order', { ascending: true });

    if (modulesError) {
      console.error('Error fetching modules:', modulesError);
      return NextResponse.json({
        error: 'Failed to fetch modules'
      }, { status: 500 });
    }

    // Get user's purchase for this product to track progress
    const activePurchase = directAccess || bundleAccess;

    // Get lesson progress for the user's purchase
    const { data: lessonProgress } = await supabase
      .from('LessonProgress')
      .select('lessonId, completedAt')
      .eq('purchaseId', activePurchase.id);

    // Create progress map
    const lessonProgressMap = new Map(
      (lessonProgress || []).map(lp => [lp.lessonId, { completed: !!lp.completedAt }])
    );

    // Add progress data to modules
    const modulesWithProgress = (modules || []).map(module => {
      const lessonsWithProgress = (module.lessons || []).map(lesson => ({
        ...lesson,
        orderIndex: lesson.order, // Map to expected field name
        completed: lessonProgressMap.get(lesson.id)?.completed || false,
        isLocked: false // For now, don't lock lessons - can be implemented later
      }));

      const completedLessons = lessonsWithProgress.filter(l => l.completed).length;
      const totalLessons = lessonsWithProgress.length;
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        ...module,
        orderIndex: module.order, // Map to expected field name
        progress,
        completedLessons,
        totalLessons,
        lessons: lessonsWithProgress
      };
    });

    return NextResponse.json({
      hasAccess: true,
      product: {
        code: params.productCode,
        title: productCatalog.title,
        description: productCatalog.description
      },
      modules: modulesWithProgress,
      totalModules: modulesWithProgress.length,
      totalLessons: modulesWithProgress.reduce((sum, m) => sum + (m.lessons?.length || 0), 0)
    });

  } catch (error) {
    console.error('Modules API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
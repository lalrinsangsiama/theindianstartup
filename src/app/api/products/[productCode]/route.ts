import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { PRODUCTS } from '@/lib/products-catalog';

export const dynamic = 'force-dynamic';

/**
 * Generic product API route that handles all products (P1-P30)
 * Normalizes product codes to uppercase for case-insensitive handling
 * Returns full product details with modules, lessons, and user progress
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string } }
) {
  try {
    const supabase = createClient();

    // Normalize product code to uppercase for case-insensitive handling
    const productCode = params.productCode.toUpperCase();

    // Check if product exists in catalog
    const productCatalog = PRODUCTS[productCode];
    if (!productCatalog) {
      return NextResponse.json({
        error: 'Product not found'
      }, { status: 404 });
    }

    // Get authenticated user (optional - product info is public, access is not)
    const { data: { user } } = await supabase.auth.getUser();

    // Get product details with modules and lessons from database
    const { data: product, error: productError } = await supabase
      .from('Product')
      .select(`
        id,
        code,
        title,
        description,
        price,
        isBundle,
        bundleProducts,
        modules:Module(
          id,
          title,
          description,
          orderIndex,
          lessons:Lesson(
            id,
            title,
            briefContent,
            actionItems,
            resources,
            estimatedTime,
            xpReward,
            order
          )
        )
      `)
      .eq('code', productCode)
      .single();

    if (productError) {
      logger.error(`Error fetching product ${productCode}:`, productError);
      // Fall back to catalog data if database entry doesn't exist
      return NextResponse.json({
        product: {
          code: productCode,
          title: productCatalog.title,
          description: productCatalog.description,
          price: productCatalog.price,
          modules: []
        },
        hasAccess: false,
        userProgress: {}
      });
    }

    // Sort modules by orderIndex and lessons by order/day
    if (product?.modules) {
      product.modules.sort((a: { orderIndex?: number }, b: { orderIndex?: number }) =>
        (a.orderIndex || 0) - (b.orderIndex || 0)
      );
      product.modules.forEach((module: { lessons?: Array<{ order?: number }> }) => {
        if (module.lessons) {
          module.lessons.sort((a: { order?: number }, b: { order?: number }) =>
            (a.order || 0) - (b.order || 0)
          );
        }
      });
    }

    // Transform modules for response - map order to day for backward compatibility
    const transformedModules = product?.modules?.map((module: {
      id: string;
      title: string;
      description: string;
      orderIndex?: number;
      lessons?: Array<{
        id: string;
        title: string;
        briefContent: string;
        actionItems?: string[];
        resources?: Record<string, string[]> | string[];
        estimatedTime?: number;
        xpReward?: number;
        order?: number;
      }>;
    }) => ({
      ...module,
      lessons: module.lessons?.map((lesson) => ({
        ...lesson,
        day: lesson.order || 1 // Map order to day for backward compatibility
      }))
    })) || [];

    // Check user access if logged in
    let hasAccess = false;
    let userProgress: Record<string, { completed: boolean; xpEarned?: number }> = {};

    if (user) {
      // Check for direct product purchase or ALL_ACCESS bundle
      const { data: purchases } = await supabase
        .from('Purchase')
        .select('id, product:Product(code)')
        .eq('userId', user.id)
        .eq('status', 'completed')
        .gte('expiresAt', new Date().toISOString());

      if (purchases && purchases.length > 0) {
        // Helper to get product code - handles both single object and array from join
        const getProductCode = (p: { id: string; product: { code: string } | { code: string }[] | null }) => {
          if (!p.product) return null;
          if (Array.isArray(p.product)) return p.product[0]?.code;
          return p.product.code;
        };

        const directAccess = purchases.find(p => getProductCode(p) === productCode);
        const bundleAccess = purchases.find(p => getProductCode(p) === 'ALL_ACCESS');
        const sectorBundleAccess = ['P13', 'P14', 'P15'].includes(productCode)
          ? purchases.find(p => getProductCode(p) === 'SECTOR_MASTERY')
          : null;

        hasAccess = !!(directAccess || bundleAccess || sectorBundleAccess);

        // Get user's progress for this product's lessons
        if (hasAccess && transformedModules.length > 0) {
          const lessonIds = transformedModules.flatMap((m: { lessons?: Array<{ id: string }> }) =>
            m.lessons?.map((l: { id: string }) => l.id) || []
          );

          if (lessonIds.length > 0) {
            const activePurchase = directAccess || bundleAccess || sectorBundleAccess;

            const { data: progress } = await supabase
              .from('LessonProgress')
              .select('lessonId, completedAt, xpEarned')
              .eq('purchaseId', activePurchase?.id)
              .in('lessonId', lessonIds);

            userProgress = (progress || []).reduce((acc: Record<string, { completed: boolean; xpEarned?: number }>, p: { lessonId: string; completedAt?: string; xpEarned?: number }) => {
              acc[p.lessonId] = {
                completed: !!p.completedAt,
                xpEarned: p.xpEarned
              };
              return acc;
            }, {});
          }
        }
      }
    }

    // H19 FIX: Add caching headers - product content rarely changes
    // Cache for 1 hour on CDN, but allow revalidation
    const response = NextResponse.json({
      product: {
        ...product,
        code: productCode,
        title: productCatalog.title, // Use catalog title as source of truth
        description: productCatalog.description, // Use catalog description
        price: productCatalog.price, // Use catalog price
        modules: transformedModules
      },
      hasAccess,
      userProgress
    });

    // Only cache if user is not logged in (public product info)
    // Authenticated responses contain user-specific progress
    if (!user) {
      response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400');
    } else {
      // For authenticated users, use private cache with shorter TTL
      response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=600');
    }

    return response;

  } catch (error) {
    logger.error('Product API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

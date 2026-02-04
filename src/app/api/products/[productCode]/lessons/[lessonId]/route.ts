import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/product-access';
import { getNewBadges, BadgeId } from '@/lib/badges';

export const dynamic = 'force-dynamic';

/**
 * Check if a string is a valid UUID
 */
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

/**
 * Check if a string is numeric (for day/order number lookup)
 */
function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string; lessonId: string } }
) {
  try {
    const supabase = createClient();

    // Normalize product code to uppercase for case-insensitive handling
    const productCode = params.productCode.toUpperCase();
    const lessonId = params.lessonId;

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    // Check if product exists
    const product = PRODUCTS[productCode];
    if (!product) {
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

    // Check if user has direct access to the product or ALL_ACCESS or SECTOR_MASTERY
    const directAccess = purchases.find((p: { product?: { code: string } | null }) =>
      p.product?.code === productCode
    );
    const bundleAccess = purchases.find((p: { product?: { code: string } | null }) =>
      p.product?.code === 'ALL_ACCESS'
    );
    const sectorBundleAccess = ['P13', 'P14', 'P15'].includes(productCode)
      ? purchases.find((p: { product?: { code: string } | null }) =>
          p.product?.code === 'SECTOR_MASTERY'
        )
      : null;

    if (!directAccess && !bundleAccess && !sectorBundleAccess) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    // Get user's purchase for this product
    const activePurchase = directAccess || bundleAccess || sectorBundleAccess;

    // First get the product ID from database
    const { data: dbProduct } = await supabase
      .from('Product')
      .select('id')
      .eq('code', productCode)
      .single();

    if (!dbProduct) {
      return NextResponse.json({
        error: 'Product not found in database'
      }, { status: 404 });
    }

    // Build query based on lesson ID type (UUID or day number)
    let lessonQuery = supabase
      .from('Lesson')
      .select(`
        id,
        order,
        title,
        briefContent,
        actionItems,
        resources,
        estimatedTime,
        xpReward,
        moduleId,
        module:Module!inner(
          id,
          title,
          productId,
          product:Product!inner(
            code
          )
        )
      `);

    if (isUUID(lessonId)) {
      // Query by UUID
      lessonQuery = lessonQuery.eq('id', lessonId);
    } else if (isNumeric(lessonId)) {
      // Query by day/order number - need to filter by product
      lessonQuery = lessonQuery
        .eq('order', parseInt(lessonId, 10))
        .eq('module.productId', dbProduct.id);
    } else {
      return NextResponse.json({
        error: 'Invalid lesson ID format'
      }, { status: 400 });
    }

    const { data: lesson, error: lessonError } = await lessonQuery.single() as {
      data: {
        id: string;
        order: number;
        title: string;
        briefContent: string;
        actionItems: string[];
        resources: Record<string, string[]> | string[];
        estimatedTime: number;
        xpReward: number;
        moduleId: string;
        module: {
          id: string;
          title: string;
          productId: string;
          product: {
            code: string;
          };
        };
      } | null;
      error: Error | null;
    };

    if (lessonError || !lesson) {
      return NextResponse.json({
        error: 'Lesson not found'
      }, { status: 404 });
    }

    // Verify lesson belongs to the requested product
    if (lesson.module?.product?.code !== productCode) {
      return NextResponse.json({
        error: 'Lesson does not belong to this product'
      }, { status: 404 });
    }

    // Get user progress for this lesson
    const { data: progress } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('purchaseId', activePurchase?.id)
      .eq('lessonId', lesson.id)
      .single();

    // Get total lessons count for navigation
    const { count: totalLessons } = await supabase
      .from('Lesson')
      .select('id', { count: 'exact', head: true })
      .eq('module.productId', dbProduct.id);

    return NextResponse.json({
      hasAccess: true,
      lesson: {
        ...lesson,
        day: lesson.order, // Map order to day for backward compatibility
        completed: !!progress?.completedAt,
        tasksCompleted: progress?.tasksCompleted || [],
        reflection: progress?.reflection || '',
        xpEarned: progress?.xpEarned || 0
      },
      totalLessons: totalLessons || 0
    });

  } catch (error) {
    logger.error('Lesson API error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Mark lesson as completed
export async function POST(
  request: NextRequest,
  { params }: { params: { productCode: string; lessonId: string } }
) {
  try {
    const supabase = createClient();

    // Normalize product code to uppercase
    const productCode = params.productCode.toUpperCase();
    const lessonId = params.lessonId;

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({
        error: 'Unauthorized'
      }, { status: 401 });
    }

    const body = await request.json();
    const { tasksCompleted, reflection, xpEarned } = body;

    // Check access (same as GET)
    const product = PRODUCTS[productCode];
    if (!product) {
      return NextResponse.json({
        error: 'Product not found'
      }, { status: 404 });
    }

    const { data: purchases } = await supabase
      .from('Purchase')
      .select('*, product:Product(*)')
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    const directAccess = purchases?.find((p: { product?: { code: string } | null }) =>
      p.product?.code === productCode
    );
    const bundleAccess = purchases?.find((p: { product?: { code: string } | null }) =>
      p.product?.code === 'ALL_ACCESS'
    );
    const sectorBundleAccess = ['P13', 'P14', 'P15'].includes(productCode)
      ? purchases?.find((p: { product?: { code: string } | null }) =>
          p.product?.code === 'SECTOR_MASTERY'
        )
      : null;

    if (!directAccess && !bundleAccess && !sectorBundleAccess) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    const activePurchase = directAccess || bundleAccess || sectorBundleAccess;

    // Resolve lesson ID if it's a day number
    let resolvedLessonId = lessonId;

    if (isNumeric(lessonId)) {
      // Get the product ID first
      const { data: dbProduct } = await supabase
        .from('Product')
        .select('id')
        .eq('code', productCode)
        .single();

      if (!dbProduct) {
        return NextResponse.json({
          error: 'Product not found'
        }, { status: 404 });
      }

      // Get lesson by order number
      const { data: lesson } = await supabase
        .from('Lesson')
        .select('id, module:Module!inner(productId)')
        .eq('order', parseInt(lessonId, 10))
        .eq('module.productId', dbProduct.id)
        .single();

      if (!lesson) {
        return NextResponse.json({
          error: 'Lesson not found'
        }, { status: 404 });
      }

      resolvedLessonId = lesson.id;
    }

    // Update lesson progress
    const { data, error } = await supabase
      .from('LessonProgress')
      .upsert({
        purchaseId: activePurchase?.id,
        lessonId: resolvedLessonId,
        completedAt: new Date().toISOString(),
        tasksCompleted: tasksCompleted || [],
        reflection: reflection || '',
        xpEarned: xpEarned || 0
      }, {
        onConflict: 'purchaseId,lessonId'
      })
      .select()
      .single();

    if (error) {
      logger.error('Error updating lesson progress:', error);
      return NextResponse.json({
        error: 'Failed to update progress'
      }, { status: 500 });
    }

    // Get current user data including badges
    const { data: userData } = await supabase
      .from('User')
      .select('totalXP, currentStreak, badges')
      .eq('id', user.id)
      .single();

    const newTotalXP = (userData?.totalXP || 0) + (xpEarned || 0);
    const currentBadges: string[] = userData?.badges || [];

    // Update user total XP
    await supabase
      .from('User')
      .update({
        totalXP: newTotalXP
      })
      .eq('id', user.id);

    // Get lesson order to check day-based badges
    const { data: lessonData } = await supabase
      .from('Lesson')
      .select('order')
      .eq('id', resolvedLessonId)
      .single();

    // Check for new badge unlocks
    const userStats = {
      currentDay: lessonData?.order || 0,
      currentStreak: userData?.currentStreak || 0,
      totalXP: newTotalXP
    };

    const newBadgeIds = getNewBadges(currentBadges, userStats);

    // If new badges were unlocked, update the user's badges array
    if (newBadgeIds.length > 0) {
      await supabase
        .from('User')
        .update({
          badges: [...currentBadges, ...newBadgeIds]
        })
        .eq('id', user.id);
    }

    return NextResponse.json({
      success: true,
      progress: data,
      newBadges: newBadgeIds,
      totalXP: newTotalXP
    });

  } catch (error) {
    logger.error('Lesson completion error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { PRODUCTS } from '@/lib/product-access';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { productCode: string; lessonId: string } }
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

    // Check if product exists
    const product = PRODUCTS[params.productCode];
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

    // Check if user has direct access to the product or ALL_ACCESS
    const directAccess = purchases.find(p => p.product?.code === params.productCode);
    const bundleAccess = purchases.find(p => p.product?.code === 'ALL_ACCESS');
    
    if (!directAccess && !bundleAccess) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    // Get user's purchase for this product
    const activePurchase = directAccess || bundleAccess;

    // Get the specific lesson
    const { data: lesson, error: lessonError } = await supabase
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
      `)
      .eq('id', params.lessonId)
      .single() as { 
        data: {
          id: string;
          order: number;
          title: string;
          briefContent: string;
          actionItems: any;
          resources: any;
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
        error: any;
      };

    if (lessonError || !lesson) {
      return NextResponse.json({
        error: 'Lesson not found'
      }, { status: 404 });
    }

    // Verify lesson belongs to the requested product
    if (lesson.module?.product?.code !== params.productCode) {
      return NextResponse.json({
        error: 'Lesson does not belong to this product'
      }, { status: 404 });
    }

    // Get user progress for this lesson
    const { data: progress } = await supabase
      .from('LessonProgress')
      .select('*')
      .eq('purchaseId', activePurchase.id)
      .eq('lessonId', params.lessonId)
      .single();

    return NextResponse.json({
      hasAccess: true,
      lesson: {
        ...lesson,
        day: lesson.order, // Map order to day for backward compatibility
        completed: !!progress?.completedAt,
        tasksCompleted: progress?.tasksCompleted || [],
        reflection: progress?.reflection || '',
        xpEarned: progress?.xpEarned || 0
      }
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
    const product = PRODUCTS[params.productCode];
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

    const directAccess = purchases?.find(p => p.product?.code === params.productCode);
    const bundleAccess = purchases?.find(p => p.product?.code === 'ALL_ACCESS');
    
    if (!directAccess && !bundleAccess) {
      return NextResponse.json({
        hasAccess: false,
        error: 'No access to this product'
      }, { status: 403 });
    }

    // Update lesson progress
    const { data, error } = await supabase
      .from('LessonProgress')
      .upsert({
        purchaseId: directAccess?.id || bundleAccess?.id,
        lessonId: params.lessonId,
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

    // Get current user XP
    const { data: userData } = await supabase
      .from('User')
      .select('totalXP')
      .eq('id', user.id)
      .single();

    // Update user total XP
    await supabase
      .from('User')
      .update({
        totalXP: (userData?.totalXP || 0) + (xpEarned || 0)
      })
      .eq('id', user.id);

    return NextResponse.json({
      success: true,
      progress: data
    });

  } catch (error) {
    logger.error('Lesson completion error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse } from '@/lib/api-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return errorResponse('Unauthorized', 401);
    }

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!userProfile) {
      return successResponse({
        user: null,
        hasCompletedOnboarding: false,
        needsOnboarding: true,
      });
    }

    // Get all products from database
    const { data: allProducts, error: productsError } = await supabase
      .from('Product')
      .select('*')
      .order('code');

    if (productsError) {
      return errorResponse('Failed to fetch products', 500, productsError);
    }

    // Get user's purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('Purchase')
      .select(`
        *,
        product:Product(*)
      `)
      .eq('userId', user.id)
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString());

    if (purchasesError) {
      logger.error('Purchases fetch error:', purchasesError);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    // Get module progress for owned products
    const ownedProductCodes = purchases?.map(p => p.productCode) || [];
    let moduleProgress = [];
    
    if (ownedProductCodes.length > 0) {
      const { data: progress } = await supabase
        .from('ModuleProgress')
        .select(`
          *,
          module:Module(*)
        `)
        .eq('userId', user.id)
        .in('module.product.code', ownedProductCodes);
      
      moduleProgress = progress || [];
    }

    // Get lesson progress for XP calculation
    const { data: lessonProgress } = await supabase
      .from('LessonProgress')
      .select('xpEarned')
      .eq('userId', user.id)
      .eq('completed', true);

    // Calculate total XP from lessons
    const totalXPFromLessons = lessonProgress?.reduce((sum, lesson) => sum + (lesson.xpEarned || 0), 0) || 0;
    
    // Update user XP if needed
    if (totalXPFromLessons !== userProfile.totalXP) {
      await supabase
        .from('User')
        .update({ totalXP: totalXPFromLessons })
        .eq('id', user.id);
      userProfile.totalXP = totalXPFromLessons;
    }

    // Build owned products array with real progress
    const ownedProducts = purchases?.map(purchase => {
      const product = purchase.product;
      const productProgress = moduleProgress.filter(mp => 
        mp.module?.productId === product?.id
      );
      
      const completedModules = productProgress.filter(mp => mp.completedAt).length;
      const totalModules = productProgress.length || product?.modules || 0;
      const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

      return {
        id: product?.id,
        code: product?.code,
        title: product?.title,
        description: product?.description,
        price: product?.price,
        modules: product?.modules || totalModules,
        estimatedDays: product?.estimatedDays || 30,
        hasAccess: true,
        expiresAt: purchase.expiresAt,
        progress,
        completedModules,
        totalModules,
        purchasedAt: purchase.createdAt
      };
    }) || [];

    // Find recommended next product
    const ownedCodes = ownedProducts.map(p => p.code);
    const unownedProducts = allProducts?.filter(p => !ownedCodes.includes(p.code)) || [];
    
    // Recommend P1 first if not owned, then sequential products
    let recommendedProduct = null;
    if (!ownedCodes.includes('P1')) {
      recommendedProduct = allProducts?.find(p => p.code === 'P1');
    } else {
      // Find the next sequential product
      const nextProductNumbers = ['P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'];
      for (const code of nextProductNumbers) {
        if (!ownedCodes.includes(code)) {
          recommendedProduct = allProducts?.find(p => p.code === code);
          break;
        }
      }
    }

    // Get user portfolio
    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('*')
      .eq('userId', user.id)
      .maybeSingle();

    // Build all products array with access status
    const allProductsWithAccess = allProducts?.map(product => ({
      id: product.id,
      code: product.code,
      title: product.title,
      description: product.description,
      price: product.price,
      modules: product.modules,
      estimatedDays: product.estimatedDays,
      hasAccess: ownedCodes.includes(product.code),
      // Add progress for owned products
      ...(ownedCodes.includes(product.code) && {
        progress: ownedProducts.find(op => op.code === product.code)?.progress || 0,
        completedModules: ownedProducts.find(op => op.code === product.code)?.completedModules || 0,
        totalModules: ownedProducts.find(op => op.code === product.code)?.totalModules || product.modules || 0
      })
    })) || [];

    // Calculate dashboard metrics
    const totalInvestedTime = ownedProducts.reduce((acc, p) => {
      const progress = p.progress / 100;
      return acc + Math.round((p.estimatedDays || 30) * progress);
    }, 0);

    const skillsMapping = {
      'P1': 'Launch Strategy',
      'P2': 'Legal Compliance', 
      'P3': 'Funding Mastery',
      'P4': 'Financial Management',
      'P5': 'Legal Framework',
      'P6': 'Sales & Marketing',
      'P7': 'Government Benefits',
      'P8': 'Investor Relations',
      'P9': 'Grant Applications',
      'P10': 'IP Management',
      'P11': 'Brand Building',
      'P12': 'Growth Marketing'
    };

    const skillsAcquired = ownedProducts
      .filter(p => p.progress >= 50) // Only count skills where 50%+ progress
      .map(p => skillsMapping[p.code as keyof typeof skillsMapping])
      .filter(Boolean);

    // Calculate user level based on XP
    const userLevel = Math.floor(userProfile.totalXP / 100) + 1;
    const nextLevelXP = (userLevel * 100) - userProfile.totalXP;

    // Build dashboard data
    const dashboardData = {
      userName: userProfile.name || user.email?.split('@')[0] || 'Founder',
      totalXP: userProfile.totalXP || 0,
      currentStreak: userProfile.currentStreak || 0,
      longestStreak: userProfile.longestStreak || 0,
      badges: userProfile.badges || [],
      userLevel,
      nextLevelXP,
      startupName: portfolio?.startupName || userProfile.startupName || 'Your Startup',
      startupIdea: portfolio?.startupIdea || userProfile.startupIdea || null,
      ownedProducts,
      allProducts: allProductsWithAccess,
      totalInvestedTime,
      skillsAcquired,
      totalProductsOwned: ownedProducts.length,
      averageProgress: ownedProducts.length > 0 
        ? Math.round(ownedProducts.reduce((acc, p) => acc + p.progress, 0) / ownedProducts.length)
        : 0,
      recommendedProduct: recommendedProduct ? {
        id: recommendedProduct.id,
        code: recommendedProduct.code,
        title: recommendedProduct.title,
        description: recommendedProduct.description,
        price: recommendedProduct.price,
        modules: recommendedProduct.modules,
        estimatedDays: recommendedProduct.estimatedDays,
        hasAccess: false
      } : null,
      portfolioCompletion: portfolio ? {
        hasPortfolio: true,
        completionPercentage: 0 // This would be calculated based on portfolio activities
      } : {
        hasPortfolio: false,
        completionPercentage: 0
      }
    };

    const response = NextResponse.json(dashboardData);
    response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    logger.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { calculateLevel, calculateXPForNextLevel } from '@/lib/xp';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return errorResponse('Unauthorized', 401);
    }

    // OPTIMIZED: Run ALL independent queries in parallel to eliminate N+1 pattern
    // ModuleProgress is now included in the initial batch and filtered in memory
    const [
      { data: userProfile },
      { data: allProducts, error: productsError },
      { data: purchases, error: purchasesError },
      { data: lessonProgress },
      { data: portfolio },
      { data: allModuleProgress },
      { data: portfolioActivities }
    ] = await Promise.all([
      // User profile
      supabase
        .from('User')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(),

      // All products
      supabase
        .from('Product')
        .select('*')
        .order('code'),

      // User's active purchases with product details
      supabase
        .from('Purchase')
        .select(`
          *,
          product:Product(*)
        `)
        .eq('userId', user.id)
        .eq('status', 'completed')
        .gt('expiresAt', new Date().toISOString()),

      // Lesson progress for XP calculation and progress tracking - LessonProgress has direct userId column
      supabase
        .from('LessonProgress')
        .select('lessonId, xpEarned, completedAt, productCode')
        .eq('userId', user.id)
        .not('completedAt', 'is', null)
        .order('completedAt', { ascending: false }),

      // User portfolio
      supabase
        .from('StartupPortfolio')
        .select('*')
        .eq('userId', user.id)
        .maybeSingle(),

      // ALL module progress for user (filtered in memory to avoid N+1)
      supabase
        .from('ModuleProgress')
        .select(`
          *,
          module:Module(*, product:Product(code))
        `)
        .eq('userId', user.id),

      // Portfolio activities for completion calculation
      supabase
        .from('PortfolioActivity')
        .select('activityType, completedAt')
        .eq('userId', user.id)
    ]);

    if (!userProfile) {
      return successResponse({
        user: null,
        hasCompletedOnboarding: false,
        needsOnboarding: true,
      });
    }

    // Check if user has completed onboarding (has startedAt timestamp or portfolio)
    const hasPortfolio = userProfile.StartupPortfolio && userProfile.StartupPortfolio?.length > 0;
    const hasStartedAt = !!userProfile.startedAt;
    const hasCompletedOnboarding = hasStartedAt || hasPortfolio;

    if (!hasCompletedOnboarding) {
      return successResponse({
        user: null,
        hasCompletedOnboarding: false,
        needsOnboarding: true,
      });
    }

    if (productsError) {
      return errorResponse('Failed to fetch products', 500, productsError);
    }

    if (purchasesError) {
      logger.error('Purchases fetch error:', purchasesError);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    // Filter module progress for owned products (already fetched in parallel)
    const ownedProductCodes = purchases?.map(p => p.product?.code) || [];

    // Filter pre-fetched module progress by owned product codes (O(n) in memory, not O(n) DB queries)
    const moduleProgress = (allModuleProgress || []).filter(mp =>
      mp.module?.product?.code && ownedProductCodes.includes(mp.module.product.code)
    );

    // Calculate total XP from lessons
    const totalXPFromLessons = lessonProgress?.reduce((sum, lesson) => sum + (lesson.xpEarned || 0), 0) || 0;

    // H1: Update user XP if needed with proper error handling
    if (totalXPFromLessons !== userProfile.totalXP) {
      try {
        const { error: xpUpdateError } = await supabase
          .from('User')
          .update({ totalXP: totalXPFromLessons })
          .eq('id', user.id);

        if (xpUpdateError) {
          logger.error('Failed to update user XP:', { error: xpUpdateError, userId: user.id });
          // Don't fail the entire response, just log the error
        }
      } catch (err) {
        logger.error('Failed to update user XP:', { error: err, userId: user.id });
      }
      // Update local value regardless to show correct XP in this response
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

    // Recommend P1 first if not owned, then sequential products including P13-P30
    let recommendedProduct = null;
    if (!ownedCodes.includes('P1')) {
      recommendedProduct = allProducts?.find(p => p.code === 'P1');
    } else {
      // Foundation courses (P1-P12)
      const foundationCodes = ['P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'];

      // Find the next sequential foundation product
      for (const code of foundationCodes) {
        if (!ownedCodes.includes(code)) {
          recommendedProduct = allProducts?.find(p => p.code === code);
          break;
        }
      }

      // If all foundation courses owned, recommend sector-specific courses (P13-P30)
      if (!recommendedProduct) {
        const sectorCodes = [
          'P13', 'P14', 'P15',  // Sector-Specific
          'P16', 'P17', 'P18', 'P19',  // Core Functions
          'P20', 'P21', 'P22', 'P23', 'P24',  // High-Growth Sectors
          'P25', 'P26', 'P27', 'P28',  // Emerging Sectors
          'P29', 'P30'  // Advanced & Global
        ];

        for (const code of sectorCodes) {
          if (!ownedCodes.includes(code)) {
            recommendedProduct = allProducts?.find(p => p.code === code);
            break;
          }
        }
      }
    }

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

    const skillsMapping: Record<string, string> = {
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
      'P12': 'Growth Marketing',
      'P13': 'Food Processing',
      'P14': 'Impact & CSR',
      'P15': 'Sustainability',
      'P16': 'HR & Team Building',
      'P17': 'Product Development',
      'P18': 'Operations Excellence',
      'P19': 'Technology Leadership',
      'P20': 'FinTech Mastery',
      'P21': 'HealthTech Innovation',
      'P22': 'E-commerce & D2C',
      'P23': 'EV & Clean Mobility',
      'P24': 'Manufacturing',
      'P25': 'EdTech Innovation',
      'P26': 'AgriTech',
      'P27': 'PropTech',
      'P28': 'Biotech & Life Sciences',
      'P29': 'SaaS & B2B',
      'P30': 'Global Expansion'
    };

    const skillsAcquired = ownedProducts
      .filter(p => p.progress >= 50) // Only count skills where 50%+ progress
      .map(p => skillsMapping[p.code as string])
      .filter(Boolean);

    // Calculate user level based on XP using the same progressive formula as xp.ts
    const userLevel = calculateLevel(userProfile.totalXP || 0);
    const levelProgress = calculateXPForNextLevel(userProfile.totalXP || 0);
    const nextLevelXP = levelProgress.required - levelProgress.current;

    // Calculate value metrics for dashboard
    const ALL_ACCESS_PRICE = 149999;

    // Calculate total invested (sum of purchased product prices)
    const totalInvested = ownedProducts.reduce((sum, p) => sum + (p.price || 0), 0);

    // Calculate average product progress
    const averageProductProgress = ownedProducts.length > 0
      ? ownedProducts.reduce((sum, p) => sum + p.progress, 0) / ownedProducts.length
      : 0;

    // Calculate Founder Readiness Score (0-100)
    // Based on: courses owned (40%), completion progress (30%), skills acquired (20%), XP (10%)
    const coursesScore = Math.min(40, (ownedProducts.length / 30) * 40);
    const completionScore = (averageProductProgress / 100) * 30;
    const skillsScore = Math.min(20, (skillsAcquired.length / 15) * 20);
    const xpScore = Math.min(10, (userProfile.totalXP / 5000) * 10);
    const founderReadinessScore = Math.round(coursesScore + completionScore + skillsScore + xpScore);

    // Calculate bundle savings available (if not ALL_ACCESS owner)
    const hasAllAccess = ownedCodes.includes('ALL_ACCESS');
    const allCoursesTotal = allProducts?.filter(p => p.code !== 'ALL_ACCESS').reduce((sum, p) => sum + (p.price || 0), 0) || 0;
    const bundleSavingsAvailable = hasAllAccess ? 0 : Math.max(0, allCoursesTotal - ALL_ACCESS_PRICE);

    const valueMetrics = {
      totalInvested,
      coursesOwned: ownedProducts.length,
      totalCourses: 30,
      founderReadinessScore,
      bundleSavingsAvailable,
      hasAllAccess
    };

    // Build user display name with proper fallbacks - always ensure a non-empty string
    let userName = 'Founder'; // Default fallback
    try {
      const profileName = userProfile?.name?.trim();
      const emailPrefix = user?.email?.split('@')[0]?.trim();

      if (profileName && profileName.length > 0) {
        userName = profileName;
      } else if (emailPrefix && emailPrefix.length > 0) {
        userName = emailPrefix;
      }
    } catch (e) {
      logger.error('Error building userName:', e);
    }

    const dashboardData = {
      userName,
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
      portfolioCompletion: (() => {
        // Calculate actual portfolio completion based on activities
        const requiredActivities = ['idea_vision', 'market_research', 'business_model', 'product', 'go_to_market', 'pitch'];
        const completedActivitiesCount = portfolioActivities?.filter(a => a.completedAt).length || 0;
        const portfolioCompletionPercentage = Math.round((completedActivitiesCount / requiredActivities.length) * 100);

        return portfolio ? {
          hasPortfolio: true,
          completionPercentage: portfolioCompletionPercentage,
          activitiesCompleted: completedActivitiesCount,
          totalActivities: requiredActivities.length
        } : {
          hasPortfolio: false,
          completionPercentage: 0,
          activitiesCompleted: 0,
          totalActivities: requiredActivities.length
        };
      })(),
      valueMetrics,
      // C8 FIX: Include lesson progress for tracking completed lessons
      lessonProgress: {
        completedLessons: lessonProgress?.length || 0,
        totalXPFromLessons,
        recentCompletions: (lessonProgress || []).slice(0, 5).map(lp => ({
          lessonId: lp.lessonId,
          xpEarned: lp.xpEarned,
          completedAt: lp.completedAt,
          productCode: lp.productCode
        })),
        lastCompletedAt: lessonProgress?.[0]?.completedAt || null
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

// Optimized database queries for performance
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// Cache duration constants
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
};

// ============================================
// USER QUERIES
// ============================================

export async function getUserDashboardData(userId: string) {
  // Single optimized query to get all dashboard data
  const [user, purchases, progress, recentActivity] = await Promise.all([
    // User data with XP stats
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        totalXP: true,
        currentStreak: true,
        longestStreak: true,
        badges: true,
      },
    }),

    // Active purchases with product details
    prisma.purchase.findMany({
      where: {
        userId,
        status: 'completed',
        expiresAt: { gt: new Date() },
      },
      select: {
        id: true,
        purchasedAt: true,
        expiresAt: true,
        product: {
          select: {
            code: true,
            title: true,
          },
        },
      },
      orderBy: { purchasedAt: 'desc' },
    }),

    // Aggregated progress stats
    prisma.$queryRaw<{
      totalLessons: number;
      completedLessons: number;
      totalModules: number;
      totalXpEarned: number;
    }[]>`
      SELECT 
        COUNT(DISTINCT l.id) as "totalLessons",
        COUNT(DISTINCT lp.id) FILTER (WHERE lp."completedAt" IS NOT NULL) as "completedLessons",
        COUNT(DISTINCT m.id) as "totalModules",
        COALESCE(SUM(lp."xpEarned"), 0) as "totalXpEarned"
      FROM "Purchase" p
      INNER JOIN "Product" prod ON p."productId" = prod.id
      INNER JOIN "Module" m ON prod.id = m."productId"
      INNER JOIN "Lesson" l ON m.id = l."moduleId"
      LEFT JOIN "LessonProgress" lp ON l.id = lp."lessonId" AND lp."purchaseId" = p.id
      WHERE p."userId" = ${userId}
        AND p.status = 'completed'
        AND p."expiresAt" > NOW()
    `,

    // Recent activity
    prisma.lessonProgress.findMany({
      where: {
        purchase: {
          userId,
        },
        completedAt: { not: null },
      },
      select: {
        completedAt: true,
        lesson: {
          select: {
            title: true,
            module: {
              select: {
                title: true,
                product: {
                  select: {
                    code: true,
                    title: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { completedAt: 'desc' },
      take: 5,
    }),
  ]);

  return {
    user,
    purchases,
    stats: progress[0] || {
      totalLessons: 0,
      completedLessons: 0,
      totalModules: 0,
      totalXpEarned: 0,
    },
    recentActivity,
  };
}

// ============================================
// PRODUCT ACCESS QUERIES
// ============================================

export async function checkProductAccess(userId: string, productCode: string) {
  // Check direct purchase or bundle access
  const access = await prisma.purchase.findFirst({
    where: {
      userId,
      product: {
        OR: [
          { code: productCode },
          { code: 'ALL_ACCESS' },
          { code: 'bundle_all_access' },
        ],
      },
      status: 'completed',
      expiresAt: { gt: new Date() },
    },
    select: {
      id: true,
      expiresAt: true,
    },
  });

  if (access) return { hasAccess: true, expiresAt: access.expiresAt };

  // Check bundle access
  const bundleAccess = await prisma.$queryRaw<{ hasAccess: boolean }[]>`
    SELECT EXISTS (
      SELECT 1 
      FROM "Purchase" p
      INNER JOIN "Product" prod ON p."productId" = prod.id
      WHERE p."userId" = ${userId}
        AND p.status = 'completed'
        AND p."expiresAt" > NOW()
        AND prod."isBundle" = true
        AND ${productCode} = ANY(
          SELECT jsonb_array_elements_text(prod."bundleProducts")
        )
    ) as "hasAccess"
  `;

  return { 
    hasAccess: bundleAccess[0]?.hasAccess || false, 
    expiresAt: null 
  };
}

// ============================================
// LESSON QUERIES
// ============================================

export async function getLessonWithProgress(
  lessonId: string,
  userId: string,
  purchaseId?: string
) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        select: {
          id: true,
          title: true,
          product: {
            select: {
              id: true,
              code: true,
              title: true,
            },
          },
        },
      },
      progress: {
        where: {
          purchase: {
            userId,
          },
          ...(purchaseId && { purchaseId }),
        },
        take: 1,
      },
    },
  });

  return lesson;
}

export async function getProductLessons(productCode: string, userId: string) {
  // Get all lessons for a product with user progress
  const lessons = await prisma.$queryRaw<any[]>`
    SELECT 
      l.id,
      l."order" as day,
      l.title,
      l."briefContent",
      l."estimatedTime",
      l."xpReward",
      m.id as "moduleId",
      m.title as "moduleTitle",
      m."order" as "moduleOrder",
      CASE WHEN lp."completedAt" IS NOT NULL THEN true ELSE false END as completed,
      lp."completedAt",
      lp."xpEarned"
    FROM "Product" p
    INNER JOIN "Module" m ON p.id = m."productId"
    INNER JOIN "Lesson" l ON m.id = l."moduleId"
    LEFT JOIN "Purchase" pur ON p.id = pur."productId" AND pur."userId" = ${userId}
    LEFT JOIN "LessonProgress" lp ON l.id = lp."lessonId" AND lp."purchaseId" = pur.id
    WHERE p.code = ${productCode}
    ORDER BY m."order", l."order"
  `;

  // Group by modules
  const moduleMap = new Map();
  lessons.forEach(lesson => {
    if (!moduleMap.has(lesson.moduleId)) {
      moduleMap.set(lesson.moduleId, {
        id: lesson.moduleId,
        title: lesson.moduleTitle,
        orderIndex: lesson.moduleOrder,
        lessons: [],
      });
    }
    moduleMap.get(lesson.moduleId).lessons.push(lesson);
  });

  return Array.from(moduleMap.values());
}

// ============================================
// PORTFOLIO QUERIES
// ============================================

export async function getPortfolioWithActivities(userId: string) {
  const portfolio = await prisma.startupPortfolio.findUnique({
    where: { userId },
    include: {
      activities: {
        include: {
          activityType: true,
        },
        orderBy: { updatedAt: 'desc' },
      },
    },
  });

  // Get recommendations if portfolio exists
  if (portfolio) {
    const recommendations = await prisma.$queryRaw<any[]>`
      SELECT 
        at.id,
        at.name,
        at.description,
        at."sectionName",
        at."relatedProductCode",
        p.title as "productTitle",
        p.price,
        CASE 
          WHEN pur.id IS NOT NULL THEN true 
          ELSE false 
        END as "hasProduct"
      FROM "ActivityType" at
      LEFT JOIN "Product" p ON at."relatedProductCode" = p.code
      LEFT JOIN "Purchase" pur ON p.id = pur."productId" 
        AND pur."userId" = ${userId}
        AND pur.status = 'completed'
      WHERE at."isActive" = true
        AND at.id NOT IN (
          SELECT "activityTypeId" 
          FROM "PortfolioActivity" 
          WHERE "portfolioId" = ${portfolio.id}
        )
      ORDER BY at."recommendationPriority" DESC
      LIMIT 5
    `;

    return { ...portfolio, recommendations };
  }

  return null;
}

// ============================================
// ANALYTICS QUERIES
// ============================================

export async function getProductAnalytics(productCode: string) {
  const analytics = await prisma.$queryRaw<any[]>`
    WITH purchase_stats AS (
      SELECT 
        COUNT(DISTINCT p."userId") as total_purchases,
        COUNT(DISTINCT p."userId") FILTER (WHERE p."expiresAt" > NOW()) as active_users
      FROM "Purchase" p
      INNER JOIN "Product" prod ON p."productId" = prod.id
      WHERE prod.code = ${productCode}
        AND p.status = 'completed'
    ),
    progress_stats AS (
      SELECT 
        AVG(
          CASE 
            WHEN total_lessons > 0 THEN (completed_lessons::float / total_lessons * 100)
            ELSE 0 
          END
        ) as avg_progress,
        COUNT(DISTINCT pur."userId") FILTER (
          WHERE completed_lessons = total_lessons AND total_lessons > 0
        ) as completions
      FROM "Product" prod
      INNER JOIN "Purchase" pur ON prod.id = pur."productId"
      LEFT JOIN (
        SELECT 
          pur.id as purchase_id,
          COUNT(l.id) as total_lessons,
          COUNT(lp.id) FILTER (WHERE lp."completedAt" IS NOT NULL) as completed_lessons
        FROM "Purchase" pur
        INNER JOIN "Product" p ON pur."productId" = p.id
        INNER JOIN "Module" m ON p.id = m."productId"
        INNER JOIN "Lesson" l ON m.id = l."moduleId"
        LEFT JOIN "LessonProgress" lp ON l.id = lp."lessonId" AND lp."purchaseId" = pur.id
        WHERE p.code = ${productCode}
        GROUP BY pur.id
      ) lesson_stats ON pur.id = lesson_stats.purchase_id
      WHERE prod.code = ${productCode}
    )
    SELECT 
      ps.total_purchases,
      ps.active_users,
      COALESCE(pr.avg_progress, 0) as avg_progress,
      COALESCE(pr.completions, 0) as completions
    FROM purchase_stats ps
    CROSS JOIN progress_stats pr
  `;

  return analytics[0];
}

// ============================================
// BATCH OPERATIONS
// ============================================

export async function batchUpdateLessonProgress(
  updates: Array<{
    lessonId: string;
    completedAt?: Date | null;
    xpEarned?: number;
    userId: string;
  }>
) {
  // Use transaction for consistency
  return await prisma.$transaction(async (tx) => {
    const results = [];

    for (const update of updates) {
      const result = await tx.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: update.userId,
            lessonId: update.lessonId,
          },
        },
        update: {
          completedAt: update.completedAt,
          xpEarned: update.xpEarned || 0,
        },
        create: {
          userId: update.userId,
          lessonId: update.lessonId,
          completedAt: update.completedAt,
          xpEarned: update.xpEarned || 0,
        },
      });

      results.push(result);
    }

    // Update user XP
    if (updates.some(u => u.xpEarned)) {
      const totalXP = updates.reduce((sum, u) => sum + (u.xpEarned || 0), 0);
      const userId = updates[0].userId;

      await tx.user.update({
        where: { id: userId },
        data: {
          totalXP: { increment: totalXP },
        },
      });
    }

    return results;
  });
}

// ============================================
// SEARCH QUERIES
// ============================================

export async function searchProducts(query: string) {
  return await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { code: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      code: true,
      title: true,
      description: true,
      price: true,
      estimatedTime: true,
      isBundle: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

// ============================================
// ADMIN QUERIES
// ============================================

export async function getAdminDashboardStats() {
  const stats = await prisma.$queryRaw<any[]>`
    SELECT 
      (SELECT COUNT(*) FROM "User") as total_users,
      (SELECT COUNT(*) FROM "User" WHERE "createdAt" > NOW() - INTERVAL '7 days') as new_users_week,
      (SELECT COUNT(*) FROM "Purchase" WHERE status = 'completed') as total_purchases,
      (SELECT SUM(amount) FROM "Purchase" WHERE status = 'completed') as total_revenue,
      (SELECT COUNT(DISTINCT "userId") FROM "Purchase" WHERE status = 'completed') as paying_users,
      (SELECT COUNT(*) FROM "LessonProgress" WHERE "completedAt" IS NOT NULL) as total_completions
  `;

  return stats[0];
}

// ============================================
// PERFORMANCE HELPERS
// ============================================

export function buildPaginationQuery(
  page: number = 1,
  limit: number = 20
): { skip: number; take: number } {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}

export function buildSortQuery(
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
): Prisma.SortOrder {
  return sortOrder;
}
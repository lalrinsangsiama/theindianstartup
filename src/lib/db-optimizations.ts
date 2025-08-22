import { createClient } from '@/lib/supabase/server';
import { logger } from './logger';

/**
 * Optimized database queries with proper indexing and minimal data fetching
 */

export interface OptimizedDashboardData {
  user: {
    id: string;
    email: string;
    name: string;
    totalXP: number;
    currentStreak: number;
    hasCompletedOnboarding: boolean;
  };
  products: Array<{
    code: string;
    title: string;
    description: string;
    price: number;
    hasAccess: boolean;
    progressPercentage: number;
  }>;
  recentProgress: Array<{
    lessonTitle: string;
    moduleTitle: string;
    completedAt: string;
    xpEarned: number;
  }>;
  stats: {
    totalProducts: number;
    completedLessons: number;
    totalXP: number;
    currentStreak: number;
  };
}

/**
 * Single optimized query for dashboard data
 * Reduces multiple round trips to database
 */
export async function getOptimizedDashboardData(userId: string): Promise<OptimizedDashboardData | null> {
  const supabase = createClient();
  
  try {
    // Single query to get all dashboard data with proper joins
    const { data, error } = await supabase
      .rpc('get_dashboard_data_optimized', { user_id: userId });

    if (error) {
      logger.error('Dashboard data fetch error:', error);
      return null;
    }

    return data;
  } catch (error) {
    logger.error('Dashboard optimization error:', error);
    return null;
  }
}

/**
 * Optimized user progress query with aggregations
 */
export async function getUserProgressSummary(userId: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .rpc('get_user_progress_summary', { user_id: userId });

  if (error) {
    logger.error('Progress summary error:', error);
    return null;
  }

  return data;
}

/**
 * Batch query for multiple users (admin dashboard)
 */
export async function getUsersBatch(limit = 50, offset = 0) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('User')
    .select(`
      id,
      email,
      name,
      totalXP,
      currentStreak,
      createdAt,
      purchases:Purchase!inner(
        productCode,
        status,
        createdAt
      )
    `)
    .range(offset, offset + limit - 1)
    .order('createdAt', { ascending: false });

  if (error) {
    logger.error('Users batch fetch error:', error);
    return null;
  }

  return data;
}

/**
 * Optimized product access check with caching hints
 */
export async function checkProductAccessOptimized(userId: string, productCode: string): Promise<boolean> {
  const supabase = createClient();
  
  // Use count query for existence check (faster than select)
  const { count, error } = await supabase
    .from('Purchase')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId)
    .eq('productCode', productCode)
    .eq('status', 'completed')
    .gt('expiresAt', new Date().toISOString());

  if (error) {
    logger.error('Product access check error:', error);
    return false;
  }

  return (count || 0) > 0;
}

/**
 * Bulk lesson progress update for better performance
 */
export async function updateLessonProgressBatch(
  updates: Array<{
    userId: string;
    lessonId: string;
    completed: boolean;
    xpEarned: number;
    completedAt?: string;
  }>
) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('LessonProgress')
    .upsert(updates, {
      onConflict: 'userId,lessonId',
      ignoreDuplicates: false
    });

  if (error) {
    logger.error('Batch lesson progress update error:', error);
    return false;
  }

  return true;
}

/**
 * Optimized search query with full-text search
 */
export async function searchContentOptimized(query: string, limit = 20) {
  const supabase = createClient();
  
  // Use Postgres full-text search for better performance
  const { data, error } = await supabase
    .from('Lesson')
    .select(`
      id,
      title,
      briefContent,
      module:Module(
        title,
        product:Product(
          code,
          title
        )
      )
    `)
    .textSearch('title_content_fts', query, {
      type: 'websearch',
      config: 'english'
    })
    .limit(limit);

  if (error) {
    logger.error('Content search error:', error);
    return [];
  }

  return data || [];
}

/**
 * Database query performance monitoring
 */
export class QueryPerformanceMonitor {
  private static instance: QueryPerformanceMonitor;
  private queries: Map<string, { count: number; totalTime: number; avgTime: number }> = new Map();

  static getInstance(): QueryPerformanceMonitor {
    if (!QueryPerformanceMonitor.instance) {
      QueryPerformanceMonitor.instance = new QueryPerformanceMonitor();
    }
    return QueryPerformanceMonitor.instance;
  }

  startTimer(queryName: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      this.recordQuery(queryName, duration);
      
      // Log slow queries
      if (duration > 1000) {
        logger.warn(`Slow query detected: ${queryName} took ${duration.toFixed(2)}ms`);
      }
    };
  }

  private recordQuery(queryName: string, duration: number): void {
    const existing = this.queries.get(queryName) || { count: 0, totalTime: 0, avgTime: 0 };
    
    existing.count += 1;
    existing.totalTime += duration;
    existing.avgTime = existing.totalTime / existing.count;
    
    this.queries.set(queryName, existing);
  }

  getStats(): Record<string, { count: number; totalTime: number; avgTime: number }> {
    return Object.fromEntries(this.queries);
  }

  reset(): void {
    this.queries.clear();
  }
}

/**
 * Wrapper for monitoring query performance
 */
export function withQueryMonitoring<T>(queryName: string, queryFn: () => Promise<T>): Promise<T> {
  const monitor = QueryPerformanceMonitor.getInstance();
  const stopTimer = monitor.startTimer(queryName);
  
  return queryFn().finally(() => {
    stopTimer();
  });
}

/**
 * Index recommendations for better query performance
 */
export const RECOMMENDED_INDEXES = [
  {
    table: 'Purchase',
    columns: ['userId', 'productCode', 'status', 'expiresAt'],
    reason: 'Product access checks'
  },
  {
    table: 'LessonProgress', 
    columns: ['userId', 'completed', 'lessonId'],
    reason: 'Progress tracking and XP calculations'
  },
  {
    table: 'ModuleProgress',
    columns: ['userId', 'moduleId', 'progressPercentage'],
    reason: 'Dashboard progress display'
  },
  {
    table: 'User',
    columns: ['email'],
    reason: 'Authentication lookups'
  },
  {
    table: 'Lesson',
    columns: ['moduleId', 'day'],
    reason: 'Course navigation'
  },
  {
    table: 'Module',
    columns: ['productId', 'orderIndex'],
    reason: 'Product content loading'
  }
];

/**
 * SQL for creating recommended indexes
 */
export const CREATE_INDEXES_SQL = `
-- Product access optimization
CREATE INDEX IF NOT EXISTS idx_purchase_user_product_status 
ON "Purchase" (userId, productCode, status, expiresAt);

-- Lesson progress optimization  
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_completed
ON "LessonProgress" (userId, completed, lessonId);

-- Module progress optimization
CREATE INDEX IF NOT EXISTS idx_module_progress_user_module
ON "ModuleProgress" (userId, moduleId, progressPercentage);

-- User authentication optimization
CREATE INDEX IF NOT EXISTS idx_user_email
ON "User" (email);

-- Course navigation optimization
CREATE INDEX IF NOT EXISTS idx_lesson_module_day
ON "Lesson" (moduleId, day);

-- Product content optimization
CREATE INDEX IF NOT EXISTS idx_module_product_order
ON "Module" (productId, orderIndex);

-- Full-text search optimization
CREATE INDEX IF NOT EXISTS idx_lesson_fts
ON "Lesson" USING gin(to_tsvector('english', title || ' ' || coalesce(briefContent, '')));
`;

/**
 * Performance analysis query
 */
export const PERFORMANCE_ANALYSIS_SQL = `
SELECT 
  schemaname,
  tablename,
  attname as column_name,
  n_distinct,
  correlation,
  most_common_vals,
  most_common_freqs
FROM pg_stats 
WHERE schemaname = 'public' 
  AND tablename IN ('User', 'Purchase', 'LessonProgress', 'ModuleProgress', 'Lesson', 'Module')
ORDER BY tablename, attname;
`;
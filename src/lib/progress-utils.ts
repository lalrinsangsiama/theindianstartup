/**
 * Utility functions for calculating user progress
 */

export interface LessonProgressItem {
  completed?: boolean;
  completedAt?: string | null;
}

/**
 * Calculate weekly progress from lesson completion data
 * Returns an array of 7 booleans representing Mon-Sun
 */
export function getLast7DaysProgress(lessonProgress: LessonProgressItem[]): boolean[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i)); // Start from 6 days ago to today
    const dateString = date.toDateString();

    return lessonProgress.some(lp => {
      if (!lp.completed || !lp.completedAt) return false;
      const completedDate = new Date(lp.completedAt);
      return completedDate.toDateString() === dateString;
    });
  });
}

/**
 * Calculate current day based on completed lessons
 */
export function calculateCurrentDay(completedLessons: number, totalLessons: number): number {
  // Current day is completed lessons + 1, capped at total
  return Math.min(completedLessons + 1, totalLessons);
}

/**
 * Calculate total lessons from products
 * Uses product module count as proxy when detailed lesson data unavailable
 */
export function calculateTotalLessons(products: { modules?: number }[]): number {
  return products.reduce((total, product) => {
    // Estimate lessons based on modules (average ~3 lessons per module)
    const modulesCount = product.modules || 0;
    return total + (modulesCount * 3);
  }, 0);
}

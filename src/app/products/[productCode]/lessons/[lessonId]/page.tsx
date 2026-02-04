'use client';

import { GenericLessonPage } from '@/components/GenericLessonPage';

/**
 * Dynamic lesson page that handles all products (P1-P30)
 * Uses the GenericLessonPage component for consistent lesson experience
 *
 * URL pattern: /products/[productCode]/lessons/[lessonId]
 * Examples:
 *   - /products/p1/lessons/1 (day number)
 *   - /products/p13/lessons/abc123-uuid (UUID)
 */
export default function LessonPage() {
  return <GenericLessonPage />;
}

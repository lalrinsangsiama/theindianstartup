// Social Proof Components
// Centralized exports for all social proof related components

export {
  TestimonialCard,
  TestimonialsSection,
  getTestimonialsForCourse,
  TESTIMONIALS
} from './FounderTestimonials';

export type { Testimonial } from './FounderTestimonials';

export {
  TrustBadges,
  SocialProofBanner,
  MetricsSection,
  AsSeenWith,
  PLATFORM_METRICS
} from './PlatformMetrics';

// Re-export course outcomes for convenience
export {
  COURSE_OUTCOMES,
  AGGREGATE_OUTCOMES,
  getCourseOutcome,
  getTopOutcomes,
  getOutcomesByCategory
} from '@/lib/course-outcomes';

export type { CourseOutcome } from '@/lib/course-outcomes';

/**
 * Comprehensive Zod validation schemas for API routes
 * Provides type-safe input validation with standardized error responses
 */

import { z } from 'zod';

// ============================================================================
// COMMON VALIDATORS
// ============================================================================

// Indian phone number validation
export const indianPhoneSchema = z.string()
  .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number')
  .optional()
  .nullable();

// URL validation
export const urlSchema = z.string()
  .url('Please enter a valid URL')
  .max(500, 'URL is too long')
  .optional()
  .nullable();

// Email validation
export const emailSchema = z.string()
  .email('Please enter a valid email address')
  .max(255, 'Email is too long')
  .toLowerCase();

// Name validation
export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s\-'.]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// Safe text validation (prevents XSS)
export const safeTextSchema = (maxLength: number = 5000) => z.string()
  .max(maxLength, `Text must be less than ${maxLength} characters`)
  .transform(val => val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''))
  .transform(val => val.replace(/javascript:/gi, ''))
  .transform(val => val.replace(/on\w+=/gi, ''));

// ============================================================================
// USER PROFILE SCHEMAS
// ============================================================================

export const userProfileUpdateSchema = z.object({
  name: nameSchema.optional(),
  phone: indianPhoneSchema,
  bio: safeTextSchema(500).optional().nullable(),
  linkedinUrl: urlSchema,
  twitterUrl: urlSchema,
  websiteUrl: urlSchema,
  avatar: z.string().url().max(500).optional().nullable(),
});

export type UserProfileUpdate = z.infer<typeof userProfileUpdateSchema>;

// ============================================================================
// STARTUP PORTFOLIO SCHEMAS
// ============================================================================

export const startupPortfolioSchema = z.object({
  startupName: z.string().max(100).optional().nullable(),
  tagline: safeTextSchema(200).optional().nullable(),
  logo: z.string().url().max(500).optional().nullable(),
  problemStatement: safeTextSchema(2000).optional().nullable(),
  solution: safeTextSchema(2000).optional().nullable(),
  valueProposition: safeTextSchema(1000).optional().nullable(),
  domain: z.string().max(100).optional().nullable(),
  entityType: z.enum(['pvt_ltd', 'llp', 'partnership', 'proprietorship', 'opc', 'not_registered']).optional().nullable(),

  // Social handles
  socialHandles: z.object({
    linkedin: urlSchema,
    twitter: urlSchema,
    instagram: urlSchema,
    facebook: urlSchema,
  }).optional().nullable(),

  // Target market
  targetMarket: z.object({
    geography: z.array(z.string().max(50)).max(10).optional(),
    demographics: safeTextSchema(500).optional(),
    segments: z.array(z.string().max(100)).max(10).optional(),
  }).optional().nullable(),

  // Competitors
  competitors: z.array(z.object({
    name: z.string().max(100),
    website: urlSchema,
    differentiator: safeTextSchema(500).optional(),
  })).max(10).optional().nullable(),

  // Market size
  marketSize: z.object({
    tam: z.number().positive().optional(),
    sam: z.number().positive().optional(),
    som: z.number().positive().optional(),
    currency: z.enum(['INR', 'USD']).default('INR'),
  }).optional().nullable(),

  // Revenue streams
  revenueStreams: z.array(z.object({
    name: z.string().max(100),
    description: safeTextSchema(500).optional(),
    percentage: z.number().min(0).max(100).optional(),
  })).max(10).optional().nullable(),

  // MVP details
  mvpDescription: safeTextSchema(2000).optional().nullable(),
  features: z.array(z.object({
    name: z.string().max(100),
    description: safeTextSchema(500).optional(),
    status: z.enum(['planned', 'in_progress', 'completed']).optional(),
  })).max(20).optional().nullable(),

  // Funding
  fundingNeeds: z.number().positive().max(1000000000).optional().nullable(), // Max 100 Cr
  projections: z.object({
    year1Revenue: z.number().positive().optional(),
    year2Revenue: z.number().positive().optional(),
    year3Revenue: z.number().positive().optional(),
  }).optional().nullable(),
});

export type StartupPortfolio = z.infer<typeof startupPortfolioSchema>;

// ============================================================================
// COMMUNITY SCHEMAS
// ============================================================================

export const communityPostSchema = z.object({
  title: safeTextSchema(200),
  content: safeTextSchema(5000),
  category: z.enum([
    'general',
    'question',
    'discussion',
    'announcement',
    'resource',
    'success_story',
    'feedback',
  ]).default('general'),
  tags: z.array(z.string().max(30)).max(5).optional(),
});

export type CommunityPost = z.infer<typeof communityPostSchema>;

export const communityCommentSchema = z.object({
  content: safeTextSchema(2000),
  postId: z.string().min(1),
  parentId: z.string().optional().nullable(),
});

export type CommunityComment = z.infer<typeof communityCommentSchema>;

// ============================================================================
// EXPERT SESSION SCHEMAS
// ============================================================================

export const createSessionSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: safeTextSchema(2000).optional().nullable(),
  scheduledAt: z.string()
    .datetime({ message: 'Please provide a valid ISO 8601 datetime' })
    .refine((val) => new Date(val) > new Date(), {
      message: 'Session must be scheduled in the future',
    }),
  durationMinutes: z.number()
    .int('Duration must be a whole number')
    .min(15, 'Session must be at least 15 minutes')
    .max(180, 'Session cannot exceed 3 hours'),
  maxAttendees: z.number()
    .int('Attendee count must be a whole number')
    .min(2, 'Session must allow at least 2 attendees')
    .max(500, 'Session cannot exceed 500 attendees'),
  topicTags: z.array(z.string().max(30, 'Tag too long')).max(10, 'Maximum 10 tags allowed').optional(),
  meetingUrl: urlSchema,
});

export type CreateSession = z.infer<typeof createSessionSchema>;

export const updateSessionSchema = createSessionSchema.partial().extend({
  status: z.enum(['draft', 'upcoming', 'live', 'completed', 'cancelled']).optional(),
  recordingUrl: urlSchema,
});

export type UpdateSession = z.infer<typeof updateSessionSchema>;

export const sessionInviteSchema = z.object({
  email: emailSchema,
});

export type SessionInvite = z.infer<typeof sessionInviteSchema>;

// ============================================================================
// ECOSYSTEM LISTING SCHEMAS
// ============================================================================

export const ecosystemListingSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  description: safeTextSchema(1000).optional().nullable(),
  category: z.enum([
    'incubator',
    'accelerator',
    'investor',
    'mentor',
    'service_provider',
    'coworking',
    'government',
    'bank',
    'nbfc',
    'law_firm',
    'ca_firm',
    'other',
  ]),
  subCategory: z.string().max(50).optional().nullable(),
  website: urlSchema,
  email: z.string().email().optional().nullable(),
  phone: indianPhoneSchema,
  address: z.string().max(500).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(100).optional().nullable(),
  tags: z.array(z.string().max(30)).max(10).optional(),
  fundingAmount: z.string().max(50).optional().nullable(),
  equityTaken: z.string().max(20).optional().nullable(),
  programDuration: z.string().max(50).optional().nullable(),
  batchSize: z.number().int().positive().max(1000).optional().nullable(),
  loanTypes: z.array(z.string().max(50)).max(10).optional(),
  interestRates: z.string().max(50).optional().nullable(),
  eligibilityInfo: safeTextSchema(2000).optional().nullable(),
  applicationProcess: safeTextSchema(2000).optional().nullable(),
  documentsRequired: z.array(z.string().max(100)).max(20).optional(),
});

export type EcosystemListing = z.infer<typeof ecosystemListingSchema>;

// ============================================================================
// ECOSYSTEM REVIEW SCHEMAS
// ============================================================================

export const ecosystemReviewSchema = z.object({
  listingId: z.string().uuid('Invalid listing ID'),
  rating: z.number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot exceed 5'),
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be less than 100 characters'),
  content: safeTextSchema(2000),
  experienceType: z.enum(['applied', 'accepted', 'rejected', 'participated', 'client', 'other']),
  applicationDate: z.string().date().optional().nullable(),
  responseTime: z.string().max(50).optional().nullable(),
  isAnonymous: z.boolean().default(false),
  anonymousName: z.string().max(50).optional().nullable(),
}).refine((data) => {
  // If anonymous, require anonymousName
  if (data.isAnonymous && !data.anonymousName) {
    return false;
  }
  return true;
}, {
  message: 'Anonymous name is required for anonymous reviews',
  path: ['anonymousName'],
});

export type EcosystemReview = z.infer<typeof ecosystemReviewSchema>;

// ============================================================================
// ANNOUNCEMENT SCHEMAS
// ============================================================================

export const announcementSchema = z.object({
  title: safeTextSchema(200),
  content: safeTextSchema(10000),
  excerpt: safeTextSchema(300).optional(),
  type: z.enum(['general', 'event', 'opportunity', 'funding', 'news', 'milestone', 'partnership']),
  category: z.string().max(50),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  targetAudience: z.array(z.string().max(50)).max(10).optional(),
  industries: z.array(z.string().max(50)).max(10).optional(),
  imageUrl: urlSchema,
  externalLinks: z.array(z.object({
    label: z.string().max(100),
    url: z.string().url(),
  })).max(5).optional(),
  applicationDeadline: z.string().datetime().optional().nullable(),
  eventDate: z.string().datetime().optional().nullable(),
  validUntil: z.string().datetime().optional().nullable(),
  isSponsored: z.boolean().default(false),
  sponsorName: z.string().max(100).optional().nullable(),
  sponsorLogo: urlSchema,
  sponsorWebsite: urlSchema,
  sponsorshipType: z.enum(['banner', 'featured', 'promoted']).optional().nullable(),
  isPinned: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  tags: z.array(z.string().max(30)).max(10).optional(),
});

export type Announcement = z.infer<typeof announcementSchema>;

// ============================================================================
// SETTINGS SCHEMAS
// ============================================================================

export const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  productUpdates: z.boolean().default(true),
  communityDigest: z.enum(['daily', 'weekly', 'never']).default('weekly'),
  smsNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(true),
});

export type NotificationSettings = z.infer<typeof notificationSettingsSchema>;

export const privacySettingsSchema = z.object({
  profileVisibility: z.enum(['public', 'registered', 'private']).default('registered'),
  showEmail: z.boolean().default(false),
  showPhone: z.boolean().default(false),
  showPortfolio: z.boolean().default(true),
  allowDirectMessages: z.boolean().default(true),
});

export type PrivacySettings = z.infer<typeof privacySettingsSchema>;

// ============================================================================
// PAYMENT SCHEMAS
// ============================================================================

export const purchaseOrderSchema = z.object({
  productType: z.string()
    .min(1, 'Product type is required')
    .max(20, 'Product type too long')
    .regex(/^[A-Z0-9_]+$/, 'Invalid product type format'),
  amount: z.number()
    .int('Amount must be an integer')
    .positive('Amount must be positive')
    .max(10000000, 'Amount exceeds maximum'), // Max 1 lakh INR in paise
  couponCode: z.string()
    .max(50, 'Coupon code too long')
    .regex(/^[A-Z0-9_-]*$/, 'Invalid coupon format')
    .optional()
    .nullable(),
});

export type PurchaseOrder = z.infer<typeof purchaseOrderSchema>;

export const refundRequestSchema = z.object({
  purchaseId: z.string().min(1, 'Purchase ID is required'),
  reason: z.enum([
    'not_as_expected',
    'duplicate_purchase',
    'technical_issues',
    'changed_mind',
    'other'
  ]),
  additionalInfo: safeTextSchema(1000).optional(),
});

export type RefundRequest = z.infer<typeof refundRequestSchema>;

// ============================================================================
// FEEDBACK SCHEMAS
// ============================================================================

export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'improvement', 'praise', 'other']),
  message: safeTextSchema(2000),
  url: z.string().url().optional(),
  screenshot: z.string().url().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export type Feedback = z.infer<typeof feedbackSchema>;

// ============================================================================
// SUPPORT TICKET SCHEMAS
// ============================================================================

export const supportTicketSchema = z.object({
  subject: safeTextSchema(200),
  description: safeTextSchema(5000),
  category: z.enum([
    'billing',
    'technical',
    'account',
    'content',
    'refund',
    'other',
  ]),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  attachments: z.array(z.string().url()).max(5).optional(),
});

export type SupportTicket = z.infer<typeof supportTicketSchema>;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Validate request body with a schema and return standardized error response
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string; details: Record<string, string[]> } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};

    result.error.errors.forEach(err => {
      const path = err.path.join('.');
      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(err.message);
    });

    return {
      success: false,
      error: 'Validation failed',
      details: fieldErrors,
    };
  }

  return { success: true, data: result.data };
}

/**
 * Create a validation error response for Next.js API routes
 */
export function validationErrorResponse(
  error: { error: string; details: Record<string, string[]> }
) {
  return {
    error: error.error,
    details: error.details,
    code: 'VALIDATION_ERROR',
  };
}

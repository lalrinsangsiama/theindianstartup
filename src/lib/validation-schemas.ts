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

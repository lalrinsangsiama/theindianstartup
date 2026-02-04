// Application-wide constants

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_VERIFY: '/api/auth/verify',
  
  // Dashboard
  DASHBOARD: '/api/dashboard',
  DASHBOARD_CACHED: '/api/dashboard/cached',
  DASHBOARD_OPTIMIZED: '/api/dashboard/optimized',
  
  // Products
  PRODUCTS: '/api/products',
  PRODUCT_ACCESS: (code: string) => `/api/products/${code}/access`,
  PRODUCT_MODULES: (code: string) => `/api/products/${code}/modules`,
  PRODUCT_LESSONS: (code: string) => `/api/products/${code}/lessons`,
  
  // Purchase
  CREATE_ORDER: '/api/purchase/create-order',
  VERIFY_PAYMENT: '/api/purchase/verify',
  PURCHASE_STATUS: '/api/purchase/status',
  
  // Portfolio
  PORTFOLIO: '/api/portfolio',
  PORTFOLIO_ACTIVITIES: '/api/portfolio/activities',
  PORTFOLIO_EXPORT: '/api/portfolio/export',
  PORTFOLIO_RECOMMENDATIONS: '/api/portfolio/recommendations',
  
  // User
  USER_PROFILE: '/api/user/profile',
  USER_RESOURCES: '/api/user/resources',
  USER_COUPONS: '/api/user/coupons',
  USER_ONBOARDING: '/api/user/onboarding',
  
  // Admin
  ADMIN_STATS: '/api/admin/stats',
  ADMIN_USERS: '/api/admin/users',
  ADMIN_PRODUCTS: '/api/admin/products',
  ADMIN_PURCHASES: '/api/admin/purchases',
} as const;

// Product codes
export const PRODUCT_CODES = {
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
  P4: 'P4',
  P5: 'P5',
  P6: 'P6',
  P7: 'P7',
  P8: 'P8',
  P9: 'P9',
  P10: 'P10',
  P11: 'P11',
  P12: 'P12',
  ALL_ACCESS: 'ALL_ACCESS',
} as const;

// Product prices (in INR)
export const PRODUCT_PRICES = {
  [PRODUCT_CODES.P1]: 4999,
  [PRODUCT_CODES.P2]: 4999,
  [PRODUCT_CODES.P3]: 5999,
  [PRODUCT_CODES.P4]: 6999,
  [PRODUCT_CODES.P5]: 7999,
  [PRODUCT_CODES.P6]: 6999,
  [PRODUCT_CODES.P7]: 4999,
  [PRODUCT_CODES.P8]: 9999,
  [PRODUCT_CODES.P9]: 4999,
  [PRODUCT_CODES.P10]: 7999,
  [PRODUCT_CODES.P11]: 7999,
  [PRODUCT_CODES.P12]: 9999,
  [PRODUCT_CODES.ALL_ACCESS]: 54999,
} as const;

// Status types
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Purchase status
export const PURCHASE_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator',
} as const;

// SECURITY: Admin email allowlist - ONLY used as a secondary check when DB role is already 'admin'
// This is NOT a fallback to grant admin access. It's a safeguard to prevent rogue DB entries.
// If a user has role='admin' in DB but their email is NOT in this list, access is DENIED.
// Shared between auth.ts and middleware.ts to avoid duplicating parsing logic.
export const ADMIN_EMAIL_ALLOWLIST = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim().toLowerCase())
  : [];

// Time constants
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

// Cache durations
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800, // 7 days
} as const;

// Rate limiting
export const RATE_LIMITS = {
  API_DEFAULT: { limit: 100, window: TIME.MINUTE },
  API_AUTH: { limit: 5, window: TIME.MINUTE },
  API_PURCHASE: { limit: 10, window: TIME.HOUR },
  API_EXPORT: { limit: 5, window: TIME.HOUR },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;

// XP rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  MODULE_COMPLETE: 200,
  COURSE_COMPLETE: 1000,
  DAILY_LOGIN: 10,
  STREAK_BONUS: 20,
  ACHIEVEMENT_UNLOCK: 100,
} as const;

// Achievement thresholds
export const ACHIEVEMENT_THRESHOLDS = {
  LESSONS: [1, 5, 10, 25, 50, 100],
  MODULES: [1, 3, 5, 10, 20],
  COURSES: [1, 2, 3, 5, 8, 12],
  STREAK: [3, 7, 14, 30, 60, 100],
  XP: [100, 500, 1000, 5000, 10000, 50000],
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  SESSION_EXPIRED: 'Your session has expired. Please login again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully.',
  DELETED: 'Deleted successfully.',
  CREATED: 'Created successfully.',
  UPDATED: 'Updated successfully.',
  PAYMENT_SUCCESS: 'Payment completed successfully.',
  EMAIL_SENT: 'Email sent successfully.',
  COPIED: 'Copied to clipboard.',
} as const;

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_INDIA: /^[6-9]\d{9}$/,
  GST: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  AADHAAR: /^\d{12}$/,
  PINCODE: /^[1-9]\d{5}$/,
  URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
} as const;

// Social media URLs
export const SOCIAL_MEDIA = {
  TWITTER: 'https://twitter.com/theindianstartup',
  LINKEDIN: 'https://linkedin.com/company/theindianstartup',
  FACEBOOK: 'https://facebook.com/theindianstartup',
  INSTAGRAM: 'https://instagram.com/theindianstartup',
  YOUTUBE: 'https://youtube.com/@theindianstartup',
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  TITLE_SUFFIX: ' | The Indian Startup',
  DEFAULT_DESCRIPTION: 'Empower your startup journey with India-specific playbooks, from idea to scale.',
  DEFAULT_IMAGE: '/og-image.jpg',
  SITE_URL: 'https://theindianstartup.in',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_CHAT: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  ENABLE_REFERRAL: process.env.NEXT_PUBLIC_ENABLE_REFERRAL === 'true',
  ENABLE_COMMUNITY: process.env.NEXT_PUBLIC_ENABLE_COMMUNITY === 'true',
  MAINTENANCE_MODE: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
} as const;

// Environment
export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  CART_ITEMS: 'cart_items',
  RECENT_SEARCHES: 'recent_searches',
} as const;

// Query parameter keys
export const QUERY_PARAMS = {
  PAGE: 'page',
  LIMIT: 'limit',
  SORT: 'sort',
  ORDER: 'order',
  SEARCH: 'q',
  FILTER: 'filter',
  TAB: 'tab',
  VIEW: 'view',
} as const;

// Animation durations (ms)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (px)
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 10,
  STICKY: 20,
  MODAL_BACKDROP: 30,
  MODAL: 40,
  POPOVER: 50,
  TOOLTIP: 60,
  TOAST: 70,
} as const;
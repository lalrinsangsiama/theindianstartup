// Common types used across the application

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// User related types
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  bio?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  badges: string[];
  createdAt: string;
}

// Product related types
export interface Product {
  id: string;
  code: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  outcomes: string[];
  estimatedTime: number;
  xpReward: number;
  isActive: boolean;
  isBundle: boolean;
  bundleProducts: string[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Purchase related types
export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  amount: number;
  originalAmount?: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  purchasedAt: string;
  expiresAt: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}

// Lesson/Module types
export interface Module {
  id: string;
  productId: string;
  order: number;
  title: string;
  description?: string;
  content: any;
  estimatedTime: number;
  xpReward: number;
  prerequisites: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  briefContent: string;
  actionItems: any;
  resources: any;
  estimatedTime: number;
  xpReward: number;
}

export interface LessonProgress {
  id: string;
  purchaseId: string;
  lessonId: string;
  startedAt: string;
  completedAt?: string;
  tasksCompleted: string[];
  proofUploads: string[];
  xpEarned: number;
  reflection?: string;
}

// Portfolio types
export interface PortfolioActivity {
  id: string;
  userId: string;
  activityTypeId: string;
  lessonId?: string;
  courseCode?: string;
  title: string;
  description?: string;
  data: any;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StartupPortfolio {
  id: string;
  userId: string;
  companyName?: string;
  tagline?: string;
  logo?: string;
  website?: string;
  linkedinCompany?: string;
  twitterHandle?: string;
  industry?: string;
  stage?: string;
  foundingDate?: string;
  teamSize?: number;
  location?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dashboard types
export interface DashboardData {
  user: UserProfile;
  purchases: Purchase[];
  products: Product[];
  progress: {
    totalLessons: number;
    completedLessons: number;
    totalXP: number;
    currentStreak: number;
  };
  recentActivity: LessonProgress[];
  recommendations: Product[];
}

// Form field types
export interface FormField<T = string> {
  value: T;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

// Filter and Sort types
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Modal types
export interface ModalState {
  isOpen: boolean;
  data?: any;
  type?: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Table types
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableState<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading: boolean;
  error?: string;
  pagination?: PaginationParams;
  sorting?: {
    field: string;
    order: 'asc' | 'desc';
  };
  selection?: Set<string>;
}

// Chart/Analytics types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface AnalyticsMetric {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
}

// File upload types
export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Search types
export interface SearchParams {
  query: string;
  filters?: Record<string, any>;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  facets?: Record<string, FilterOption[]>;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface Breadcrumb {
  label: string;
  href?: string;
  isActive?: boolean;
}

// Settings types
export interface UserSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  currency: string;
}

// Validation types
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
}

export interface ValidationSchema {
  [field: string]: ValidationRule | ValidationRule[];
}
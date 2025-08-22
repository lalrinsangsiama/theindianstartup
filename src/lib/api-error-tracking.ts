import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { trackAPIError, trackPaymentError, trackAuthError, trackDatabaseError, TrackableError } from '@/lib/error-tracking';

// API error types
export type APIErrorType = 
  | 'validation'
  | 'authentication' 
  | 'authorization'
  | 'not_found'
  | 'payment'
  | 'database'
  | 'external_api'
  | 'rate_limit'
  | 'server_error'
  | 'unknown';

// Enhanced API error class
export class APIError extends Error {
  public statusCode: number;
  public type: APIErrorType;
  public context?: Record<string, any>;
  public userId?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    type: APIErrorType = 'unknown',
    context?: Record<string, any>
  ) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.type = type;
    this.context = context;
  }
}

// Common API error responses
export const APIErrors = {
  // 400 errors
  InvalidInput: (message = 'Invalid input provided', context?: Record<string, any>) => 
    new APIError(message, 400, 'validation', context),
  
  InvalidPlan: (planId?: string) => 
    new APIError('Invalid subscription plan', 400, 'validation', { planId }),
  
  MissingFields: (fields: string[]) => 
    new APIError('Required fields missing', 400, 'validation', { missingFields: fields }),

  // 401 errors
  Unauthorized: (context?: Record<string, any>) => 
    new APIError('Authentication required', 401, 'authentication', context),
  
  InvalidCredentials: () => 
    new APIError('Invalid credentials provided', 401, 'authentication'),
  
  TokenExpired: () => 
    new APIError('Authentication token expired', 401, 'authentication'),

  // 403 errors
  Forbidden: (resource?: string) => 
    new APIError('Access denied', 403, 'authorization', { resource }),
  
  InsufficientPermissions: (action?: string) => 
    new APIError('Insufficient permissions', 403, 'authorization', { action }),

  // 404 errors
  NotFound: (resource?: string) => 
    new APIError('Resource not found', 404, 'not_found', { resource }),
  
  UserNotFound: (userId?: string) => 
    new APIError('User not found', 404, 'not_found', { userId }),

  // 409 errors
  AlreadyExists: (resource?: string) => 
    new APIError('Resource already exists', 409, 'validation', { resource }),
  
  PaymentAlreadyProcessed: (orderId?: string) => 
    new APIError('Payment already processed', 409, 'payment', { orderId }),

  // 429 errors
  RateLimit: (limit?: number, window?: string) => 
    new APIError('Rate limit exceeded', 429, 'rate_limit', { limit, window }),

  // 500 errors
  DatabaseError: (operation?: string, details?: string) => 
    new APIError('Database operation failed', 500, 'database', { operation, details }),
  
  PaymentError: (provider?: string, details?: string) => 
    new APIError('Payment processing failed', 500, 'payment', { provider, details }),
  
  ExternalAPIError: (service?: string, details?: string) => 
    new APIError('External service unavailable', 500, 'external_api', { service, details }),
  
  InternalError: (details?: string) => 
    new APIError('Internal server error', 500, 'server_error', { details }),
};

// API error handler wrapper
export function handleAPIError(error: unknown, request?: NextRequest): NextResponse {
  let apiError: APIError;
  let trackingCategory: 'api' | 'payment' | 'authentication' | 'database' = 'api';

  if (error instanceof APIError) {
    apiError = error;
  } else if (error instanceof Error) {
    apiError = new APIError(error.message, 500, 'server_error');
  } else {
    apiError = new APIError('Unknown error occurred', 500, 'unknown');
  }

  // Determine tracking category based on error type
  switch (apiError.type) {
    case 'payment':
      trackingCategory = 'payment';
      break;
    case 'authentication':
    case 'authorization':
      trackingCategory = 'authentication';
      break;
    case 'database':
      trackingCategory = 'database';
      break;
    default:
      trackingCategory = 'api';
  }

  // Get request context
  const requestContext = {
    method: request?.method,
    url: request?.url,
    userAgent: request?.headers.get('user-agent'),
    ip: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip'),
    timestamp: new Date().toISOString(),
    ...apiError.context,
  };

  // Track the error based on category
  switch (trackingCategory) {
    case 'payment':
      trackPaymentError(apiError.message, requestContext);
      break;
    case 'authentication':
      trackAuthError(apiError.message, requestContext);
      break;
    case 'database':
      trackDatabaseError(apiError.message, 'unknown', requestContext);
      break;
    default:
      trackAPIError(apiError.message, request?.url || 'unknown', apiError.statusCode, requestContext);
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    logger.error('API Error:', {
      message: apiError.message,
      type: apiError.type,
      statusCode: apiError.statusCode,
      context: requestContext,
      stack: apiError.stack,
    });
  }

  // Return appropriate response
  return NextResponse.json(
    {
      error: apiError.message,
      type: apiError.type,
      ...(process.env.NODE_ENV === 'development' && { 
        stack: apiError.stack,
        context: requestContext 
      }),
    },
    { status: apiError.statusCode }
  );
}

// Wrapper for API route handlers with automatic error tracking
export function withErrorTracking<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse> | NextResponse
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return handleAPIError(error, request);
    }
  };
}

// Database operation wrapper with error tracking
export async function withDatabaseErrorTracking<T>(
  operation: () => Promise<T>,
  operationName: string,
  context?: Record<string, any>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Database operation failed';
    trackDatabaseError(message, operationName, context);
    throw error;
  }
}

// External API call wrapper with error tracking
export async function withExternalAPIErrorTracking<T>(
  apiCall: () => Promise<T>,
  serviceName: string,
  context?: Record<string, any>
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'External API call failed';
    trackAPIError(message, serviceName, (error as any)?.status || 500, {
      service: serviceName,
      ...context,
    });
    throw error;
  }
}

// Validation helper with error tracking
export function validateRequired(data: Record<string, any>, requiredFields: string[]): void {
  const missing = requiredFields.filter(field => !data[field] || data[field] === '');
  
  if (missing.length > 0) {
    throw APIErrors.MissingFields(missing);
  }
}

// User authentication helper with error tracking
export async function requireAuth(request: NextRequest, supabase: any): Promise<any> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw APIErrors.Unauthorized({ supabaseError: error.message });
    }
    
    if (!user) {
      throw APIErrors.Unauthorized();
    }
    
    return user;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw APIErrors.Unauthorized({ originalError: error });
  }
}

// Admin authorization helper
export function requireAdmin(user: any): void {
  const adminEmails = [
    'admin@theindianstartup.in',
    'support@theindianstartup.in'
  ];
  
  if (!adminEmails.includes(user.email)) {
    throw APIErrors.Forbidden('admin_access');
  }
}

// Rate limiting helper (placeholder for future implementation)
export async function checkRateLimit(
  key: string, 
  limit: number, 
  window: string
): Promise<void> {
  // Simple in-memory rate limiting - production should use Redis
  const now = Date.now();
  const windowMs = parseInt(window) * 1000; // Convert seconds to milliseconds
  
  if (!rateLimitStore.has(key)) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return;
  }
  
  const record = rateLimitStore.get(key)!;
  
  if (now > record.resetTime) {
    // Window expired, reset
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return;
  }
  
  if (record.count >= limit) {
    throw APIErrors.RateLimit(limit, window);
  }
  
  record.count++;
  rateLimitStore.set(key, record);
}

// Simple in-memory store - replace with Redis in production
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Success response helper
export function successResponse(data?: any, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

// Pagination helper
export function getPaginationParams(request: NextRequest) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '10')));
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
}

// Export common utilities
export const APIUtils = {
  handleError: handleAPIError,
  withErrorTracking,
  withDatabaseErrorTracking,
  withExternalAPIErrorTracking,
  validateRequired,
  requireAuth,
  requireAdmin,
  checkRateLimit,
  successResponse,
  getPaginationParams,
  Errors: APIErrors,
};
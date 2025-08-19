import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string[]>;
}

/**
 * Create a standardized API response
 */
export function createApiResponse<T>(
  data?: T,
  error?: string | Error | ZodError,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  if (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          errors 
        },
        { status: 422 }
      );
    }
    
    // Handle regular errors
    const errorMessage = error instanceof Error ? error.message : error;
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status }
    );
  }
  
  return NextResponse.json(
    { success: true, data },
    { status }
  );
}

/**
 * Standard error handler for API routes
 */
export function handleApiError(error: unknown, context?: string): NextResponse {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error);
  
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production') {
    return createApiResponse(
      undefined,
      'An unexpected error occurred',
      500
    );
  }
  
  // In development, provide more details
  if (error instanceof Error) {
    return createApiResponse(undefined, error.message, 500);
  }
  
  return createApiResponse(undefined, 'Unknown error', 500);
}

/**
 * Validate request method
 */
export function validateMethod(
  method: string,
  allowedMethods: string[]
): NextResponse | null {
  if (!allowedMethods.includes(method)) {
    return createApiResponse(
      undefined,
      `Method ${method} not allowed`,
      405
    );
  }
  return null;
}

/**
 * Create success response with proper caching headers
 */
export function createCachedResponse<T>(
  data: T,
  maxAge: number = 60 // seconds
): NextResponse<ApiResponse<T>> {
  const response = createApiResponse(data);
  response.headers.set(
    'Cache-Control',
    `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 2}`
  );
  return response;
}
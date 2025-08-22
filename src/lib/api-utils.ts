import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

// Standard API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Standard error response
export function errorResponse(
  message: string,
  status: number = 500,
  error?: any
): NextResponse {
  logger.error(`API Error: ${message}`, error);
  
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && error && { 
        details: error?.message || error 
      })
    },
    { status }
  );
}

// Standard success response
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message })
    },
    { status }
  );
}

// Auth validation helper
export async function validateAuth(): Promise<{ userId: string | null; error?: NextResponse }> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const headersList = headers();
    const authorization = headersList.get('authorization');

    if (!authorization) {
      return { 
        userId: null, 
        error: errorResponse('Unauthorized', 401) 
      };
    }

    const token = authorization.replace('Bearer ', '');
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return { 
        userId: null, 
        error: errorResponse('Invalid authentication', 401) 
      };
    }

    return { userId: user.id };
  } catch (error) {
    return { 
      userId: null, 
      error: errorResponse('Authentication failed', 500, error) 
    };
  }
}

// Request body validation helper
export async function validateBody<T>(
  request: Request,
  requiredFields: string[]
): Promise<{ body: T | null; error?: NextResponse }> {
  try {
    const body = await request.json() as T;
    
    const missingFields = requiredFields.filter(field => 
      !(field in (body as any)) || (body as any)[field] === undefined
    );

    if (missingFields.length > 0) {
      return {
        body: null,
        error: errorResponse(
          `Missing required fields: ${missingFields.join(', ')}`,
          400
        )
      };
    }

    return { body };
  } catch (error) {
    return {
      body: null,
      error: errorResponse('Invalid request body', 400, error)
    };
  }
}

// Rate limiting helper (basic in-memory implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): { allowed: boolean; error?: NextResponse } {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || record.resetTime < now) {
    requestCounts.set(identifier, { 
      count: 1, 
      resetTime: now + windowMs 
    });
    return { allowed: true };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      error: errorResponse(
        'Rate limit exceeded. Please try again later.',
        429
      )
    };
  }

  record.count++;
  return { allowed: true };
}

// CORS headers helper
export function corsHeaders(origin?: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

// Pagination helper
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export function getPaginationParams(
  searchParams: URLSearchParams
): PaginationParams {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    offset: Math.max(0, offset)
  };
}

// Standard error handler wrapper
export function withErrorHandler<T extends (...args: any[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      return errorResponse('Internal server error', 500, error);
    }
  }) as T;
}

// Cache control headers
export function cacheHeaders(maxAge: number = 60): HeadersInit {
  return {
    'Cache-Control': `public, max-age=${maxAge}, stale-while-revalidate=${maxAge * 2}`,
  };
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const key in input) {
      sanitized[key] = sanitizeInput(input[key]);
    }
    return sanitized;
  }
  
  return input;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (Indian format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Parse and validate JSON safely
export function parseJSON<T>(json: string): { data: T | null; error?: string } {
  try {
    const data = JSON.parse(json) as T;
    return { data };
  } catch (error) {
    return { 
      data: null, 
      error: 'Invalid JSON format' 
    };
  }
}
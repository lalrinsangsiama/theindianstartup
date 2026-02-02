import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { redis } from '@/lib/redis-client';

export const dynamic = 'force-dynamic';

interface HealthCheck {
  status: boolean;
  latencyMs?: number;
  error?: string;
}

export async function GET() {
  const startTime = Date.now();

  try {
    const checks: Record<string, HealthCheck> = {};

    // Check database connectivity with latency
    const dbStart = Date.now();
    try {
      const supabase = createClient();
      const { error } = await supabase.from('User').select('count').limit(1);
      checks.database = {
        status: !error,
        latencyMs: Date.now() - dbStart,
        error: error?.message,
      };
    } catch (err) {
      checks.database = {
        status: false,
        latencyMs: Date.now() - dbStart,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Check Supabase auth
    const authStart = Date.now();
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.getSession();
      checks.supabase_auth = {
        status: !error,
        latencyMs: Date.now() - authStart,
        error: error?.message,
      };
    } catch (err) {
      checks.supabase_auth = {
        status: false,
        latencyMs: Date.now() - authStart,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Check Redis connectivity
    const redisStart = Date.now();
    try {
      const isHealthy = await redis.ping();
      const redisStatus = redis.getStatus();
      checks.redis = {
        status: isHealthy || redisStatus.inMemorySize >= 0, // In-memory fallback is OK
        latencyMs: Date.now() - redisStart,
        error: !isHealthy && !redisStatus.isRedis ? 'Using in-memory fallback' : undefined,
      };
    } catch (err) {
      checks.redis = {
        status: false,
        latencyMs: Date.now() - redisStart,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Check Razorpay API (lightweight check)
    const razorpayStart = Date.now();
    try {
      const hasConfig = !!(
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
        process.env.RAZORPAY_KEY_SECRET
      );
      checks.razorpay = {
        status: hasConfig,
        latencyMs: Date.now() - razorpayStart,
        error: !hasConfig ? 'Missing Razorpay credentials' : undefined,
      };
    } catch (err) {
      checks.razorpay = {
        status: false,
        latencyMs: Date.now() - razorpayStart,
        error: err instanceof Error ? err.message : 'Unknown error',
      };
    }

    // Check environment variables
    const envVarsValid = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.DATABASE_URL
    );
    checks.env_vars = {
      status: envVarsValid,
      error: !envVarsValid ? 'Missing required environment variables' : undefined,
    };

    // Check email configuration
    const emailConfigValid = !!(
      process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    );
    checks.email_config = {
      status: emailConfigValid,
      error: !emailConfigValid ? 'Missing email configuration' : undefined,
    };
    
    // Determine overall health - critical checks must pass
    const criticalChecks = ['database', 'supabase_auth', 'env_vars'];
    const criticalHealthy = criticalChecks.every(
      key => checks[key]?.status === true
    );
    const allHealthy = Object.values(checks).every(check => check.status);

    const status = criticalHealthy ? (allHealthy ? 'healthy' : 'degraded') : 'unhealthy';
    const totalLatencyMs = Date.now() - startTime;

    const health = {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: Object.fromEntries(
        Object.entries(checks).map(([key, value]) => [
          key,
          {
            healthy: value.status,
            ...(value.latencyMs !== undefined && { latencyMs: value.latencyMs }),
            ...(value.error && { error: value.error }),
          },
        ])
      ),
      totalLatencyMs,
      uptime: process.uptime(),
      memory: {
        heapUsedMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        heapTotalMB: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };

    return NextResponse.json(health, {
      status: criticalHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
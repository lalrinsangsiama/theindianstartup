import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { healthCheck } from '@/lib/monitoring';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const checks: Record<string, boolean> = {};
    
    // Check database connectivity
    try {
      const supabase = createClient();
      const { error } = await supabase.from('User').select('count').limit(1);
      checks.database = !error;
    } catch {
      checks.database = false;
    }
    
    // Check Supabase auth
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.getSession();
      checks.supabase_auth = !error;
    } catch {
      checks.supabase_auth = false;
    }
    
    // Check environment variables
    checks.env_vars = !!(
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.DATABASE_URL
    );
    
    // Check email configuration
    checks.email_config = !!(
      process.env.EMAIL_HOST &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    );
    
    // Check payment configuration
    checks.payment_config = !!(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET
    );
    
    const allHealthy = Object.values(checks).every(check => check);
    const status = allHealthy ? 'healthy' : 'unhealthy';
    
    const health = {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks,
      uptime: process.uptime(),
    };
    
    return NextResponse.json(health, {
      status: allHealthy ? 200 : 503,
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
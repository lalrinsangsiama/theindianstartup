/**
 * Production monitoring and logging utilities
 */

// Extend Window interface for PostHog
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, any>) => void;
    };
  }
}

export interface LogEvent {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  userId?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export interface MetricEvent {
  name: string;
  value: number;
  tags?: Record<string, string>;
  timestamp?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  info(message: string, metadata?: Record<string, any>, userId?: string) {
    this.log({ level: 'info', message, metadata, userId });
  }

  warn(message: string, metadata?: Record<string, any>, userId?: string) {
    this.log({ level: 'warn', message, metadata, userId });
  }

  error(message: string, error?: Error, metadata?: Record<string, any>, userId?: string) {
    this.log({ 
      level: 'error', 
      message, 
      metadata: { 
        ...metadata, 
        error: error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        } : undefined 
      }, 
      userId 
    });
  }

  debug(message: string, metadata?: Record<string, any>, userId?: string) {
    if (this.isDevelopment) {
      this.log({ level: 'debug', message, metadata, userId });
    }
  }

  private log(event: LogEvent) {
    const logData = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    // Console logging
    switch (event.level) {
      case 'error':
        console.error('[ERROR]', logData);
        break;
      case 'warn':
        console.warn('[WARN]', logData);
        break;
      case 'info':
        console.info('[INFO]', logData);
        break;
      case 'debug':
        console.debug('[DEBUG]', logData);
        break;
    }

    // In production, send to monitoring service
    if (!this.isDevelopment) {
      this.sendToMonitoringService(logData);
    }
  }

  private async sendToMonitoringService(logData: LogEvent) {
    try {
      // Send to PostHog, Sentry, or other monitoring service
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('log_event', {
          level: logData.level,
          message: logData.message,
          metadata: logData.metadata,
        });
      }
    } catch (error) {
      console.error('Failed to send log to monitoring service:', error);
    }
  }
}

class Metrics {
  private isDevelopment = process.env.NODE_ENV === 'development';

  counter(name: string, value: number = 1, tags?: Record<string, string>) {
    this.record({ name, value, tags });
  }

  gauge(name: string, value: number, tags?: Record<string, string>) {
    this.record({ name, value, tags });
  }

  timing(name: string, durationMs: number, tags?: Record<string, string>) {
    this.record({ name, value: durationMs, tags: { ...tags, unit: 'ms' } });
  }

  private record(event: MetricEvent) {
    const metricData = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    if (this.isDevelopment) {
      console.debug('[METRIC]', metricData);
    }

    // In production, send to monitoring service
    if (!this.isDevelopment) {
      this.sendToMonitoringService(metricData);
    }
  }

  private async sendToMonitoringService(metricData: MetricEvent) {
    try {
      // Send to PostHog or other metrics service
      if (typeof window !== 'undefined' && window.posthog) {
        window.posthog.capture('metric_event', {
          metric_name: metricData.name,
          metric_value: metricData.value,
          tags: metricData.tags,
        });
      }
    } catch (error) {
      console.error('Failed to send metric to monitoring service:', error);
    }
  }
}

// Performance monitoring
export function withPerformanceMonitoring<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  metricName: string
): T {
  return (async (...args: any[]) => {
    const startTime = Date.now();
    
    try {
      const result = await fn(...args);
      const duration = Date.now() - startTime;
      
      metrics.timing(metricName, duration, { status: 'success' });
      logger.debug(`${metricName} completed in ${duration}ms`);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      metrics.timing(metricName, duration, { status: 'error' });
      logger.error(`${metricName} failed after ${duration}ms`, error as Error);
      
      throw error;
    }
  }) as T;
}

// Error tracking
export function trackError(error: Error, context?: Record<string, any>, userId?: string) {
  logger.error('Unhandled error', error, context, userId);
  
  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry or other error tracking service
  }
}

// Business metrics tracking
export const BusinessMetrics = {
  userSignup: (userId: string) => {
    metrics.counter('user.signup', 1, { type: 'new_user' });
    logger.info('User signed up', { userId });
  },

  userLogin: (userId: string) => {
    metrics.counter('user.login', 1);
    logger.info('User logged in', { userId });
  },

  lessonCompleted: (userId: string, day: number) => {
    metrics.counter('lesson.completed', 1, { day: day.toString() });
    logger.info('Lesson completed', { userId, day });
  },

  paymentAttempt: (userId: string, amount: number) => {
    metrics.counter('payment.attempt', 1);
    metrics.gauge('payment.amount', amount);
    logger.info('Payment attempted', { userId, amount });
  },

  paymentSuccess: (userId: string, amount: number) => {
    metrics.counter('payment.success', 1);
    logger.info('Payment successful', { userId, amount });
  },

  paymentFailure: (userId: string, amount: number, reason: string) => {
    metrics.counter('payment.failure', 1, { reason });
    logger.warn('Payment failed', { userId, amount, reason });
  },

  apiError: (endpoint: string, statusCode: number, error: string) => {
    metrics.counter('api.error', 1, { endpoint, status_code: statusCode.toString() });
    logger.error('API error', new Error(error), { endpoint, statusCode });
  },
};

// Export singleton instances
export const logger = new Logger();
export const metrics = new Metrics();

// Health check utilities
export async function healthCheck(): Promise<{
  status: 'healthy' | 'unhealthy';
  checks: Record<string, boolean>;
  timestamp: string;
}> {
  const checks: Record<string, boolean> = {};
  
  // Check database connectivity
  try {
    // Add database health check here
    checks.database = true;
  } catch {
    checks.database = false;
  }
  
  // Check Supabase connectivity
  try {
    // Add Supabase health check here
    checks.supabase = true;
  } catch {
    checks.supabase = false;
  }
  
  // Check email service
  try {
    // Add email service health check here
    checks.email = true;
  } catch {
    checks.email = false;
  }
  
  const allHealthy = Object.values(checks).every(check => check);
  
  return {
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date().toISOString(),
  };
}
import { logger } from '@/lib/logger';

/**
 * Production Monitoring and Analytics
 * Comprehensive tracking for performance, errors, and user behavior
 */

// Types for monitoring events
interface MonitoringEvent {
  type: 'error' | 'performance' | 'user_action' | 'business_metric';
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp: number;
}

interface ErrorEvent extends MonitoringEvent {
  type: 'error';
  error: Error;
  stackTrace?: string;
  userAgent?: string;
  url?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface PerformanceEvent extends MonitoringEvent {
  type: 'performance';
  metric: 'page_load' | 'api_response' | 'bundle_size' | 'core_vitals';
  duration?: number;
  size?: number;
}

class ProductionMonitoring {
  private static instance: ProductionMonitoring;
  private isProduction: boolean;
  private sessionId: string;
  private userId?: string;
  private eventQueue: MonitoringEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  private constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
    this.startEventFlushing();
  }

  static getInstance(): ProductionMonitoring {
    if (!ProductionMonitoring.instance) {
      ProductionMonitoring.instance = new ProductionMonitoring();
    }
    return ProductionMonitoring.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  // Error tracking
  trackError(error: Error, context?: { severity?: ErrorEvent['severity']; metadata?: Record<string, any> }) {
    const errorEvent: ErrorEvent = {
      type: 'error',
      category: 'application',
      action: 'error_occurred',
      error,
      stackTrace: error.stack,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      severity: context?.severity || 'medium',
      metadata: context?.metadata,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
    };

    this.queueEvent(errorEvent);

    // Send critical errors immediately
    if (context?.severity === 'critical') {
      this.flushEvents();
    }
  }

  // Performance tracking
  trackPerformance(metric: PerformanceEvent['metric'], data: { duration?: number; size?: number; metadata?: Record<string, any> }) {
    const performanceEvent: PerformanceEvent = {
      type: 'performance',
      category: 'performance',
      action: metric,
      metric,
      duration: data.duration,
      size: data.size,
      metadata: data.metadata,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
    };

    this.queueEvent(performanceEvent);
  }

  // User action tracking
  trackUserAction(action: string, data?: { label?: string; value?: number; metadata?: Record<string, any> }) {
    const userActionEvent: MonitoringEvent = {
      type: 'user_action',
      category: 'user_interaction',
      action,
      label: data?.label,
      value: data?.value,
      metadata: data?.metadata,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
    };

    this.queueEvent(userActionEvent);
  }

  // Page view tracking
  trackPageView(path: string, metadata?: Record<string, any>) {
    this.trackUserAction('page_view', {
      label: path,
      metadata: {
        ...metadata,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // Purchase tracking
  trackPurchase(productCode: string, amount: number, currency = 'INR') {
    const businessEvent: MonitoringEvent = {
      type: 'business_metric',
      category: 'business',
      action: 'revenue',
      value: amount,
      label: productCode,
      metadata: {
        currency,
        productCode,
        timestamp: new Date().toISOString(),
      },
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
    };

    this.queueEvent(businessEvent);

    this.trackUserAction('purchase', {
      label: productCode,
      value: amount,
      metadata: {
        currency,
        productCode,
      },
    });
  }

  // API performance tracking
  trackAPICall(endpoint: string, method: string, duration: number, statusCode: number, error?: Error) {
    this.trackPerformance('api_response', {
      duration,
      metadata: {
        endpoint,
        method,
        statusCode,
        success: statusCode < 400,
        error: error?.message,
      },
    });

    // Track API errors separately
    if (error) {
      this.trackError(error, {
        severity: statusCode >= 500 ? 'high' : 'medium',
        metadata: {
          endpoint,
          method,
          statusCode,
          type: 'api_error',
        },
      });
    }
  }

  private queueEvent(event: MonitoringEvent) {
    this.eventQueue.push(event);
    
    // Prevent memory leaks by limiting queue size
    if (this.eventQueue.length > 1000) {
      this.eventQueue = this.eventQueue.slice(-500);
    }
  }

  private setupEventListeners() {
    if (typeof window === 'undefined') return;

    // Global error handler
    window.addEventListener('error', (event) => {
      this.trackError(new Error(event.message), {
        severity: 'medium',
        metadata: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          type: 'javascript_error',
        },
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError(new Error(event.reason), {
        severity: 'high',
        metadata: {
          type: 'unhandled_promise_rejection',
          reason: event.reason,
        },
      });
    });

    // Page unload - flush remaining events
    window.addEventListener('beforeunload', () => {
      this.flushEvents();
    });
  }

  private startEventFlushing() {
    // Flush events every 30 seconds
    this.flushInterval = setInterval(() => {
      this.flushEvents();
    }, 30000);
  }

  private async flushEvents() {
    if (this.eventQueue.length === 0) return;

    const eventsToFlush = [...this.eventQueue];
    this.eventQueue = [];

    try {
      if (this.isProduction) {
        // Send to analytics endpoint
        await fetch('/api/analytics/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ events: eventsToFlush }),
        }).catch(() => {}); // Silent fail to prevent blocking
      } else {
        // Development mode - log to console
        console.group('📊 Monitoring Events');
        eventsToFlush.forEach(event => {
          const emoji = event.type === 'error' ? '🚨' : 
                       event.type === 'performance' ? '⚡' : 
                       event.type === 'business_metric' ? '💰' : '👤';
          logger.info(`${emoji} ${event.category}:${event.action}`, event);
        });
        console.groupEnd();
      }
    } catch (error) {
      logger.error('Failed to flush monitoring events:', error);
      // Re-queue events if sending failed (with limit)
      if (this.eventQueue.length < 500) {
        this.eventQueue.unshift(...eventsToFlush.slice(-100));
      }
    }
  }

  // Cleanup
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flushEvents();
  }
}

// Create singleton instance
export const monitoring = ProductionMonitoring.getInstance();

// Convenience functions
export const trackError = (error: Error, context?: Parameters<typeof monitoring.trackError>[1]) => 
  monitoring.trackError(error, context);

export const trackPageView = (path: string, metadata?: Record<string, any>) => 
  monitoring.trackPageView(path, metadata);

export const trackPurchase = (productCode: string, amount: number, currency?: string) => 
  monitoring.trackPurchase(productCode, amount, currency);

export const trackAPICall = (endpoint: string, method: string, duration: number, statusCode: number, error?: Error) => 
  monitoring.trackAPICall(endpoint, method, duration, statusCode, error);

export const setUserId = (userId: string) => monitoring.setUserId(userId);
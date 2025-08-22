/**
 * Production-ready logging service
 * Replaces console.log statements with structured logging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  userId?: string;
  requestId?: string;
  module?: string;
  action?: string;
  [key: string]: any;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isTest = process.env.NODE_ENV === 'test';
  private logLevel: LogLevel = (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || 'info';
  
  private logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    // Don't log in test environment unless it's an error
    if (this.isTest && level !== 'error') {
      return false;
    }
    
    return this.logLevels[level] >= this.logLevels[this.logLevel];
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): any {
    const timestamp = new Date().toISOString();
    
    return {
      timestamp,
      level,
      message,
      environment: process.env.NODE_ENV,
      ...context,
    };
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const logData = this.formatMessage(level, message, context);

    // In development, use console for readability
    if (this.isDevelopment) {
      const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
      console[consoleMethod](`[${level.toUpperCase()}]`, message, context || '');
      return;
    }

    // In production, send to logging service (can be integrated with services like Datadog, Sentry, etc.)
    if (typeof window === 'undefined') {
      // Server-side logging
      this.sendToLoggingService(logData);
    } else {
      // Client-side logging - be more selective
      if (level === 'error' || level === 'warn') {
        this.sendToLoggingService(logData);
      }
    }
  }

  private sendToLoggingService(logData: any): void {
    // In production, this would send to your logging service
    // For now, we'll use a silent approach to avoid console pollution
    
    // Example integration points:
    // - Sentry.captureMessage(logData.message, logData.level);
    // - datadogLogs.logger.log(logData);
    // - Custom API endpoint for centralized logging
    
    if (process.env.NEXT_PUBLIC_LOGGING_ENDPOINT) {
      // Fire and forget - don't await to avoid blocking
      fetch(process.env.NEXT_PUBLIC_LOGGING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData),
      }).catch(() => {
        // Silently fail - don't create infinite loop
      });
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error | any, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      errorMessage: error?.message || String(error),
      errorStack: error?.stack,
      errorName: error?.name,
    };
    
    this.log('error', message, errorContext);
  }

  // Special method for API route logging
  api(method: string, path: string, statusCode: number, duration?: number, context?: LogContext): void {
    this.info('API Request', {
      ...context,
      method,
      path,
      statusCode,
      duration,
      module: 'api',
    });
  }

  // Special method for database query logging
  db(operation: string, table: string, duration?: number, context?: LogContext): void {
    this.debug('Database Query', {
      ...context,
      operation,
      table,
      duration,
      module: 'database',
    });
  }

  // Special method for performance logging
  perf(metric: string, value: number, context?: LogContext): void {
    this.info('Performance Metric', {
      ...context,
      metric,
      value,
      module: 'performance',
    });
  }

  // Special method for user action logging
  user(action: string, userId: string, context?: LogContext): void {
    this.info('User Action', {
      ...context,
      action,
      userId,
      module: 'user',
    });
  }

  // Create a child logger with persistent context
  child(context: LogContext): Logger {
    const childLogger = new Logger();
    const originalLog = childLogger.log.bind(childLogger);
    
    childLogger.log = (level: LogLevel, message: string, additionalContext?: LogContext) => {
      originalLog(level, message, { ...context, ...additionalContext });
    };
    
    return childLogger;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for testing purposes
export { Logger };

// Convenience exports
export const { debug, info, warn, error, api, db, perf, user } = logger;
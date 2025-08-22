'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 2;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    logger.error('Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId
    });

    this.setState({
      error,
      errorInfo
    });

    // Report to external service if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        error_id: this.state.errorId
      });
    }
  }

  handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      logger.info(`Error Boundary: Retrying (${this.retryCount}/${this.maxRetries})`);
      this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    } else {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const subject = `Error Report - ${this.state.errorId}`;
    const body = `Error ID: ${this.state.errorId}\nError: ${this.state.error?.message}\nURL: ${window.location.href}\nUser Agent: ${navigator.userAgent}\nTimestamp: ${new Date().toISOString()}`;
    const mailtoUrl = `mailto:support@theindianstartup.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isNetworkError = this.state.error?.message?.includes('fetch') || 
                            this.state.error?.message?.includes('network') ||
                            this.state.error?.message?.includes('Failed to load');

      const isChunkError = this.state.error?.message?.includes('Loading chunk') ||
                          this.state.error?.message?.includes('ChunkLoadError');

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full border-2 border-red-200 shadow-xl">
            <div className="p-8 text-center">
              {/* Error Icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>

              {/* Error Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                {isChunkError ? 'Update Required' : 
                 isNetworkError ? 'Connection Issue' : 
                 'Something Went Wrong'}
              </h1>

              {/* Error Description */}
              <Text className="text-gray-600 mb-6">
                {isChunkError ? 
                  'The application has been updated. Please refresh to get the latest version.' :
                 isNetworkError ? 
                  'Unable to connect to our servers. Please check your internet connection and try again.' :
                  'An unexpected error occurred. Our team has been notified and is working on a fix.'}
              </Text>

              {/* Error ID for support */}
              {this.state.errorId && (
                <div className="bg-gray-100 rounded-lg p-3 mb-6">
                  <Text size="sm" color="muted">Error ID: {this.state.errorId}</Text>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="primary"
                  onClick={this.handleRetry}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {this.retryCount >= this.maxRetries ? 'Reload Page' : 'Try Again'}
                </Button>

                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </div>

              {/* Report Error Link */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={this.handleReportError}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1 mx-auto"
                >
                  <Mail className="w-4 h-4" />
                  Report this error to support
                </button>
              </div>

              {/* Development Info */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    Show Error Details (Development)
                  </summary>
                  <div className="mt-3 p-4 bg-gray-100 rounded-lg text-xs font-mono text-left overflow-auto">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    {this.state.error.stack && (
                      <div className="mb-2">
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                      </div>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    logger.error('useErrorHandler: Error caught', { error: error.message, stack: error.stack });
    
    // Could trigger a global error state or notification
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-error', { 
        detail: { error, errorInfo } 
      }));
    }
  };
}
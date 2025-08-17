'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackError, TrackableError } from '@/lib/error-tracking';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/CardContent';
import { CardHeader } from '@/components/ui/CardHeader';
import { CardTitle } from '@/components/ui/CardTitle';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { AlertTriangle, RefreshCw, Home, MessageCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId: Math.random().toString(36).substr(2, 9),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track the error with PostHog
    const trackableError = new TrackableError(
      error.message,
      'ui',
      'high',
      {
        componentStack: errorInfo.componentStack || '',
        errorBoundary: true,
      }
    );
    
    trackError(trackableError, {
      errorInfo,
      stackTrace: error.stack,
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportError = () => {
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      errorId: this.state.errorId,
    };
    
    // You could integrate with a feedback system here
    const subject = `Error Report - ID: ${this.state.errorId}`;
    const body = `Error Details:\n${JSON.stringify(errorDetails, null, 2)}`;
    const mailto = `mailto:support@theindianstartup.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailto);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle>
                <Heading>Something went wrong</Heading>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Text className="text-center text-gray-600">
                We&apos;re sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
              </Text>

              {this.state.errorId && (
                <div className="bg-gray-100 p-3 rounded text-center">
                  <Text size="sm" className="text-gray-600">
                    Error ID: <code className="font-mono text-xs">{this.state.errorId}</code>
                  </Text>
                </div>
              )}

              {/* Show error details in development */}
              {this.props.showErrorDetails && process.env.NODE_ENV === 'development' && (
                <details className="bg-red-50 p-3 rounded border border-red-200">
                  <summary className="cursor-pointer text-sm font-medium text-red-800 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="text-xs text-red-700 space-y-2">
                    <div>
                      <strong>Message:</strong> {this.state.error?.message}
                    </div>
                    {this.state.error?.stack && (
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                    {this.state.errorInfo?.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 text-xs bg-red-100 p-2 rounded overflow-auto">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              <div className="space-y-3">
                <div className="flex gap-3">
                  <Button 
                    onClick={this.handleRetry}
                    className="flex-1"
                    variant="primary"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  
                  <Button 
                    onClick={this.handleReload}
                    variant="outline"
                    className="flex-1"
                  >
                    Reload Page
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={this.handleGoHome}
                    variant="ghost"
                    className="flex-1"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                  
                  <Button 
                    onClick={this.handleReportError}
                    variant="ghost"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </div>

              <Text size="sm" className="text-center text-gray-500">
                If this problem persists, please contact our support team at{' '}
                <a 
                  href="mailto:support@theindianstartup.in" 
                  className="text-blue-600 hover:underline"
                >
                  support@theindianstartup.in
                </a>
              </Text>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// React Hook for error reporting
export function useErrorReporting() {
  const reportError = React.useCallback((error: Error, context?: Record<string, any>) => {
    trackError(error, context);
  }, []);

  const reportUserFeedback = React.useCallback((message: string, context?: Record<string, any>) => {
    trackError(new TrackableError(
      `User feedback: ${message}`,
      'ui',
      'low',
      { ...context }
    ));
  }, []);

  return {
    reportError,
    reportUserFeedback,
  };
}
'use client';

import React from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface PortfolioErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface PortfolioErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class PortfolioErrorBoundary extends React.Component<
  PortfolioErrorBoundaryProps,
  PortfolioErrorBoundaryState
> {
  constructor(props: PortfolioErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): PortfolioErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Portfolio Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      hasError: true,
      error,
      errorInfo
    });

    // Log to external error service if available
    // errorService.logError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <Card className="max-w-md w-full border-red-200">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              
              <Heading as="h3" variant="h3" className="mb-4">
                Portfolio Loading Error
              </Heading>
              
              <Text color="muted" className="mb-6">
                We encountered an issue loading your portfolio. This might be a temporary problem.
              </Text>

              <Alert variant="warning" className="mb-6 text-left">
                <AlertCircle className="w-4 h-4" />
                <div>
                  <Text size="sm" weight="medium">Error Details:</Text>
                  <Text size="sm" className="font-mono">
                    {this.state.error?.message || 'Unknown error occurred'}
                  </Text>
                </div>
              </Alert>

              <div className="flex flex-col gap-3">
                <Button 
                  variant="primary" 
                  onClick={this.handleRetry}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/dashboard'}
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                    View Technical Details
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                    {this.state.error?.stack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
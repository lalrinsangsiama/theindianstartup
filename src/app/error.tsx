'use client';

import React from 'react';
import { logger } from '@/lib/logger';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Logo } from '@/components/icons/Logo';
import { AlertTriangle, Home, RefreshCw, Mail } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  // Log error to monitoring system in production
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Send to monitoring service
      logger.error('Global error caught:', error);
      
      // You can integrate with services like Sentry here
      if (typeof window !== 'undefined' && (window as any).Sentry) {
        (window as any).Sentry.captureException(error);
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container py-4">
          <Link href="/" className="text-black hover:opacity-80 transition-opacity">
            <Logo variant="full" className="h-8" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <div className="space-y-1">
              <Heading as="h1" className="text-4xl font-bold text-gray-900">
                Something went wrong
              </Heading>
              <Text size="lg" color="muted">
                We encountered an unexpected error
              </Text>
            </div>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-red-50 rounded-lg text-left">
              <Text size="sm" className="text-red-800 font-mono">
                <strong>Error:</strong> {error.message}
              </Text>
              {error.digest && (
                <Text size="xs" className="text-red-600 mt-2">
                  Error ID: {error.digest}
                </Text>
              )}
            </div>
          )}

          {/* Message */}
          <div className="mb-8 space-y-3">
            <Heading as="h2" variant="h4" className="text-gray-900">
              Don't worry, even the best startups face challenges.
            </Heading>
            <Text color="muted" className="max-w-md mx-auto">
              Our team has been notified and is working on a fix. 
              You can try refreshing the page or return to the homepage.
            </Text>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" onClick={reset} className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
            </div>
            
            {/* Quick Links */}
            <div className="pt-6 border-t border-gray-200">
              <Text size="sm" color="muted" className="mb-3">
                Or try these pages:
              </Text>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
                  Dashboard
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/pricing" className="text-sm text-blue-600 hover:underline">
                  Courses
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/community" className="text-sm text-blue-600 hover:underline">
                  Community
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/resources" className="text-sm text-blue-600 hover:underline">
                  Resources
                </Link>
              </div>
            </div>
          </div>

          {/* Report Error */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <Text size="sm" className="text-gray-700 mb-2">
              If this problem persists, please let us know:
            </Text>
            <a 
              href={`mailto:support@theindianstartup.in?subject=Error Report&body=Error: ${encodeURIComponent(error.message)}%0A%0AError ID: ${error.digest || 'N/A'}%0A%0APlease describe what you were doing when this error occurred:`}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Mail className="w-4 h-4 mr-1" />
              Report This Error
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="container">
          <div className="text-center">
            <Text size="sm" color="muted">
              Error occurred at {new Date().toLocaleString()}
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
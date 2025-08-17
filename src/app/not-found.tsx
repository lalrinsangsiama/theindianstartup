'use client';

import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { Heading } from '../components/ui/Typography';
import { Text } from '../components/ui/Typography';
import { Logo } from '../components/icons/Logo';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
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
        <div className="max-w-md mx-auto text-center">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <div className="space-y-1">
              <Heading as="h1" className="font-mono text-6xl font-bold text-gray-900">
                404
              </Heading>
              <Text size="lg" color="muted">
                Page not found
              </Text>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8 space-y-3">
            <Heading as="h2" variant="h4" className="text-gray-900">
              Oops! This page went on its own startup journey.
            </Heading>
            <Text color="muted" className="max-w-sm mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. 
              Let&apos;s get you back on track to building your startup.
            </Text>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button variant="primary" className="w-full sm:w-auto">
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()} 
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            {/* Quick Links */}
            <div className="pt-6 border-t border-gray-200">
              <Text size="sm" color="muted" className="mb-3">
                Popular pages:
              </Text>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/pricing" className="text-sm text-accent hover:underline">
                  Pricing
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/dashboard" className="text-sm text-accent hover:underline">
                  Dashboard
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/community" className="text-sm text-accent hover:underline">
                  Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="container">
          <div className="text-center">
            <Text size="sm" color="muted">
              Need help?{' '}
              <a 
                href="mailto:support@theindianstartup.in" 
                className="text-accent hover:underline"
              >
                Contact Support
              </a>
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import Link from 'next/link';
import { Logo } from '../../components/icons/Logo';
import { Heading } from '../../components/ui/Typography';
import { Text } from '../../components/ui/Typography';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle,
  showBackButton = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8" />
            </Link>
            
            {showBackButton && (
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Back to home</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white border-2 border-black p-8">
            {/* Title Section */}
            <div className="text-center mb-8">
              <Heading as="h1" variant="h3" className="mb-2">
                {title}
              </Heading>
              {subtitle && (
                <Text color="muted" size="sm">
                  {subtitle}
                </Text>
              )}
            </div>

            {/* Form Content */}
            {children}
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <Text size="sm" color="muted">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-black underline hover:no-underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-black underline hover:no-underline">
                Privacy Policy
              </Link>
            </Text>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>
  );
}
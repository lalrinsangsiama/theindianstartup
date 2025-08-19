'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2, Lock, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import Link from 'next/link';

interface PurchaseProtectedRouteProps {
  children: React.ReactNode;
  productType?: string;
  redirectTo?: string;
}

export function PurchaseProtectedRoute({ 
  children, 
  productType = '30_day_guide',
  redirectTo = '/purchase'
}: PurchaseProtectedRouteProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuthContext();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [purchaseInfo, setPurchaseInfo] = useState<any>(null);

  useEffect(() => {
    const checkAccess = async () => {
      // If still loading auth, wait
      if (authLoading) return;

      // If no user, redirect to login first
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        // Check purchase status
        const response = await fetch(`/api/purchase/status?productType=${productType}`);
        const data = await response.json();

        if (response.ok) {
          setHasAccess(data.hasAccess);
          setPurchaseInfo(data.activePurchase);
          
          // Temporary bypass for testing if Purchase table doesn't exist
          if (data.warning && data.warning.includes('Purchase tracking not yet configured')) {
            console.warn('Purchase table not configured - allowing access for testing');
            setHasAccess(true); // Allow access for testing
          }
        } else {
          console.error('Failed to check purchase status:', data.error);
          setHasAccess(false);
        }
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
      } finally {
        setCheckingAccess(false);
      }
    };

    checkAccess();
  }, [user, authLoading, productType, router]);

  // Show loading state while checking
  if (authLoading || checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  // If user doesn't have access, show purchase required page
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          
          <Heading as="h2" variant="h3" className="mb-4">
            Access Required
          </Heading>
          
          <Text color="muted" className="mb-6">
            You need to purchase the 30-Day India Launch Sprint to access this content.
          </Text>
          
          <div className="space-y-3">
            <Link href={redirectTo}>
              <Button variant="primary" className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase Access (₹1 Test)
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button variant="outline" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
            
            {/* Development only - bypass for testing */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Text size="xs" color="muted" className="mb-2">
                  Development Mode Only:
                </Text>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full text-xs"
                  onClick={async () => {
                    const res = await fetch('/api/test-access', { method: 'POST' });
                    if (res.ok) {
                      window.location.reload();
                    }
                  }}
                >
                  Grant Test Access (Dev Only)
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // User has access, render children
  return <>{children}</>;
}

// HOC version for pages that require purchase
export function withPurchaseAccess<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    productType?: string;
    redirectTo?: string;
  }
) {
  return function PurchaseProtectedComponent(props: P) {
    return (
      <PurchaseProtectedRoute {...options}>
        <Component {...props} />
      </PurchaseProtectedRoute>
    );
  };
}
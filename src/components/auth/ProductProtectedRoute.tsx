'use client';

import { useEffect, useState } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Loader2, Lock, ShoppingCart, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface ProductAccess {
  hasAccess: boolean;
  expiresAt?: string;
  daysRemaining?: number;
  productTitle?: string;
  productPrice?: number;
}

interface ProductProtectedRouteProps {
  productCode: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProductProtectedRoute({ 
  productCode, 
  children, 
  fallback 
}: ProductProtectedRouteProps) {
  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [access, setAccess] = useState<ProductAccess | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`/api/products/${productCode}/access`);
        const accessData = await response.json();
        setAccess(accessData);
      } catch (error) {
        logger.error('Error checking product access:', error);
        setAccess({ hasAccess: false });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAccess();
    }
  }, [user, authLoading, productCode, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (!access?.hasAccess) {
    return fallback || (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
            
            <Heading as="h2" variant="h4" className="mb-2">
              Access Required
            </Heading>
            
            <Text color="muted" className="mb-6">
              You need to purchase {access?.productTitle || productCode} to access this content.
            </Text>
            
            {access?.productPrice && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <Text size="sm" color="muted" className="mb-1">Price</Text>
                <Text className="text-2xl font-bold">
                  ₹{access.productPrice.toLocaleString('en-IN')}
                </Text>
              </div>
            )}
            
            <div className="space-y-3">
              <Link href={`/pricing?highlight=${productCode}`} className="block">
                <Button variant="primary" className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase {productCode}
                </Button>
              </Link>
              
              <Link href="/pricing" className="block">
                <Button variant="outline" className="w-full">
                  View All Products
                </Button>
              </Link>
              
              <Link href="/dashboard" className="block">
                <Button variant="ghost" size="sm" className="w-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Show renewal warning if expiring soon
  if (access.daysRemaining && access.daysRemaining <= 7) {
    return (
      <div className="min-h-screen bg-white">
        {/* Renewal Warning Banner */}
        <div className="bg-yellow-50 border-b border-yellow-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-yellow-600" />
              <div>
                <Text weight="medium" className="text-yellow-800">
                  Your access expires in {access.daysRemaining} day{access.daysRemaining !== 1 ? 's' : ''}
                </Text>
                <Text size="sm" className="text-yellow-700">
                  Renew now to continue your progress
                </Text>
              </div>
            </div>
            <Link href={`/renewal?product=${productCode}`}>
              <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                Renew Access
              </Button>
            </Link>
          </div>
        </div>
        
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

// Simplified version for checking access without UI
export function useProductAccess(productCode: string) {
  const { user } = useAuthContext();
  const [access, setAccess] = useState<ProductAccess | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setAccess({ hasAccess: false });
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/products/${productCode}/access`);
        const accessData = await response.json();
        setAccess(accessData);
      } catch (error) {
        logger.error('Error checking product access:', error);
        setAccess({ hasAccess: false });
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [user, productCode]);

  return { access, loading };
}
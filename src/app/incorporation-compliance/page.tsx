'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import P2CourseInterface from '@/components/P2CourseInterface';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IncorporationCompliancePage() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const response = await fetch('/api/products/P2/access');
      const data = await response.json();
      setHasAccess(data.hasAccess);
    } catch (error) {
      console.error('Error checking access:', error);
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center pb-8">
              <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <CardTitle className="text-3xl mb-3">
                Unlock P2: Incorporation & Compliance Kit
              </CardTitle>
              <p className="text-lg text-gray-600">
                Master Indian business incorporation and build bulletproof legal infrastructure
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">What You'll Get:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    '40 days of comprehensive content',
                    '300+ legal templates & documents',
                    '8 interactive calculators & tools',
                    'Live weekly Q&A sessions',
                    'Expert mentorship included',
                    'Lifetime updates on law changes',
                    'Private community access',
                    'Completion certificate'
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">Course Investment</h3>
                  <Badge className="bg-orange-500 text-white">LIMITED OFFER</Badge>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold">₹4,999</span>
                  <span className="text-gray-500 line-through">₹9,999</span>
                  <span className="text-green-600 text-sm font-medium">50% OFF</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Save ₹1.5L+ in professional fees • Avoid ₹10L+ in penalties
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => router.push('/purchase?product=P2')}
                    className="flex-1"
                  >
                    Get Instant Access
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/pricing')}
                  >
                    View All Courses
                  </Button>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  🔒 Secure payment • 📱 Mobile access • 💯 14-day money-back guarantee
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <ProductProtectedRoute productCode="P2">
      <P2CourseInterface />
    </ProductProtectedRoute>
  );
}
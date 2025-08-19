'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Rocket
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PurchaseSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-2xl mx-auto p-8">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>

            {/* Success Message */}
            <Heading as="h1" className="mb-4">
              Welcome to Your Startup Journey! 🎉
            </Heading>
            
            <Text size="lg" color="muted" className="mb-8">
              Your purchase was successful. You now have full access to the 30-Day India Launch Sprint.
            </Text>

            {/* Access Details */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Text weight="medium">Product</Text>
                    <Text>30-Day India Launch Sprint</Text>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text weight="medium">Access Period</Text>
                    <Badge variant="success">1 Year Access</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Text weight="medium">Amount Paid</Text>
                    <Text>₹1.00</Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="space-y-4">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => router.push('/journey')}
              >
                <Rocket className="w-5 h-5 mr-2" />
                Start Day 1 Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => router.push('/dashboard')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </div>

            {/* Tips */}
            <Card className="mt-8 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <Text weight="medium" className="mb-1">
                      Pro Tip: Start Today!
                    </Text>
                    <Text size="sm" color="muted">
                      The best time to start is now. Day 1 takes only 45 minutes and will help you clarify your startup vision.
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
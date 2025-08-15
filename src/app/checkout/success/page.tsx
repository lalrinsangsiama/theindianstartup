'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { 
  CheckCircle, 
  Sparkles, 
  Mail, 
  Calendar, 
  Users, 
  BookOpen,
  ArrowRight,
  Download,
  Trophy
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function CheckoutSuccessPage() {
  const { user } = useAuth();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 to-green-100/20 animate-pulse" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle className="w-24 h-24 text-green-600" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
          </div>
          
          <Badge variant="success" size="lg" className="mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Payment Successful!
          </Badge>
          
          <Heading as="h1" className="mb-4">
            Welcome to Your Entrepreneurial Journey! 🚀
          </Heading>
          
          <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! You&apos;re now part of an exclusive community of founders 
            building amazing startups. Your 30-day transformation starts now.
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What's Next */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-blue-600" />
                <Heading as="h2" variant="h4">What&apos;s Next?</Heading>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Text weight="bold" size="sm">1</Text>
                  </div>
                  <div>
                    <Text weight="medium">Check Your Email</Text>
                    <Text size="sm" color="muted">
                      You&apos;ll receive your welcome email with access details and invoice within 5 minutes
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Text weight="bold" size="sm">2</Text>
                  </div>
                  <div>
                    <Text weight="medium">Start Day 1</Text>
                    <Text size="sm" color="muted">
                      Begin your journey with &quot;Start Your Entrepreneurial Journey&quot; lesson
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Text weight="bold" size="sm">3</Text>
                  </div>
                  <div>
                    <Text weight="medium">Join the Community</Text>
                    <Text size="sm" color="muted">
                      Connect with other founders and share your progress
                    </Text>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Access */}
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <Heading as="h2" variant="h4">Your Access</Heading>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text>Program Access</Text>
                  <Badge variant="success">365 Days</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Text>Daily Lessons</Text>
                  <Badge variant="success">30 Days</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Text>Community Access</Text>
                  <Badge variant="success">Lifetime</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <Text>Support</Text>
                  <Badge variant="success">Premium</Badge>
                </div>
                
                <div className="border-t border-green-200 pt-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <Text size="sm">Invoice sent to {user?.email}</Text>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <Link href="/journey/day/1">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <BookOpen className="w-5 h-5 mr-2" />
              Start Day 1
            </Button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <Users className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <Text weight="medium" className="mb-2">Join the Community</Text>
            <Text size="sm" color="muted">
              Connect with 2,847+ founders on the same journey
            </Text>
          </div>
          
          <div>
            <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <Text weight="medium" className="mb-2">Weekly Office Hours</Text>
            <Text size="sm" color="muted">
              Get expert guidance every Tuesday at 7 PM IST
            </Text>
          </div>
          
          <div>
            <Download className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <Text weight="medium" className="mb-2">Resource Library</Text>
            <Text size="sm" color="muted">
              Access 50+ templates and Indian startup guides
            </Text>
          </div>
        </div>

        {/* Support */}
        <div className="mt-16 text-center">
          <Text color="muted">
            Questions or need help?{' '}
            <a 
              href="mailto:support@theindianstartup.in" 
              className="text-black underline hover:no-underline"
            >
              Contact our support team
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
}
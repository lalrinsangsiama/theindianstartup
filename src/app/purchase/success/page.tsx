'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
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
  Rocket,
  Mail,
  Trophy,
  Users,
  Calendar,
  Star,
  Gift,
  PartyPopper,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  ExternalLink,
  Clock,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuthContext();
  
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  useEffect(() => {
    // Enhanced confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    const text = "Just started my 30-day startup journey with @TheIndianStartup! 🚀 From idea to launch in 30 days. Join me! 🇮🇳";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://theindianstartup.in')}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = 'https://theindianstartup.in';
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        {/* Success Animation Card */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
          <CardContent className="p-8 lg:p-12 text-center">
            {/* Success Icon */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
              </div>
            </div>

            {/* Success Message */}
            <Heading as="h1" className="mb-3 text-3xl lg:text-4xl">
              🎉 Payment Successful!
            </Heading>
            <Text size="lg" className="mb-6 max-w-2xl mx-auto">
              Welcome to India's fastest-growing founder community! Your startup journey begins now.
            </Text>

            {/* Email Confirmation */}
            <div className="flex items-center justify-center gap-2 text-green-700 bg-green-100 px-4 py-3 rounded-lg inline-flex mb-8">
              <Mail className="w-5 h-5" />
              <Text size="sm">
                Order confirmation sent to <strong>{user?.email}</strong>
              </Text>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push('/journey')}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Day 1
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* What's Next Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Text weight="bold" className="mb-2">Your 30-Day Journey</Text>
                  <Text size="sm" color="muted" className="mb-3">
                    Follow our structured daily lessons to transform your idea into a launch-ready startup.
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/journey')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Journey <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <Text weight="bold" className="mb-2">Join the Community</Text>
                  <Text size="sm" color="muted" className="mb-3">
                    Connect with 2,500+ founders, share progress, and get help when you need it.
                  </Text>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/community')}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Join Community <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-8 p-6">
          <PartyPopper className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <Text size="lg" className="italic text-gray-700 mb-2">
            "The journey of a thousand miles begins with a single step"
          </Text>
          <Text size="sm" color="muted">
            You've just taken yours. Let's build something amazing together! 🚀
          </Text>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <Text color="muted">Loading your success...</Text>
            </div>
          </div>
        </DashboardLayout>
      }>
        <SuccessContent />
      </Suspense>
    </ProtectedRoute>
  );
}
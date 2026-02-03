'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, Gift, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

interface OnboardingReminderBannerProps {
  className?: string;
}

export function OnboardingReminderBanner({ className }: OnboardingReminderBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [onboardingStatus, setOnboardingStatus] = useState<{
    needsOnboarding: boolean;
    currentStep: number;
    totalSteps: number;
  } | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();

          // Check if onboarding is incomplete
          if (data.needsOnboarding || !data.hasCompletedOnboarding) {
            setOnboardingStatus({
              needsOnboarding: true,
              currentStep: data.onboardingStep || 0,
              totalSteps: 5, // Updated total steps
            });
            setIsVisible(true);
          }
        }
      } catch {
        // Ignore errors
      }
    };

    checkOnboarding();
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember dismissal for this session
    sessionStorage.setItem('onboardingBannerDismissed', 'true');
  };

  // Check if already dismissed this session
  useEffect(() => {
    if (sessionStorage.getItem('onboardingBannerDismissed') === 'true') {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible || !onboardingStatus?.needsOnboarding) {
    return null;
  }

  const progress = Math.round(
    (onboardingStatus.currentStep / onboardingStatus.totalSteps) * 100
  );

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Text weight="semibold" className="text-white">
                  Complete your profile
                </Text>
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
                  {progress}% done
                </span>
              </div>
              <Text size="sm" className="text-white/90 hidden sm:block">
                Finish setting up to earn 100 bonus XP and get personalized recommendations
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/onboarding">
              <Button
                size="sm"
                className="bg-white text-purple-700 hover:bg-white/90 gap-1"
              >
                <Gift className="w-4 h-4" />
                Continue Setup
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/80 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { Loader2, ArrowRight, Sparkles, Target, Rocket } from 'lucide-react';

const ONBOARDING_STEPS = [
  {
    id: 'founder',
    title: 'Tell us about yourself',
    subtitle: 'Let\'s get to know the founder behind the startup',
    icon: Sparkles,
  },
  {
    id: 'startup',
    title: 'What\'s your startup idea?',
    subtitle: 'Share your vision - we\'ll help you make it real',
    icon: Target,
  },
  {
    id: 'complete',
    title: 'You\'re all set!',
    subtitle: 'Your 30-day journey begins now',
    icon: Rocket,
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Form data - initialize from localStorage if available
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('onboarding_form_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Invalid JSON, use defaults
        }
      }
    }
    return {
      founderName: '',
      phone: '',
      startupName: '',
      startupIdea: '',
      targetMarket: '',
    };
  });

  // Persist form data to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_form_data', JSON.stringify(formData));
    }
  }, [formData]);

  // Combined effect for auth check and onboarding status (prevents race conditions)
  useEffect(() => {
    // Don't do anything while auth is still loading
    if (authLoading) return;

    // If not authenticated, redirect to login
    if (!user) {
      router.push('/login');
      return;
    }

    // User is authenticated, check onboarding status
    const abortController = new AbortController();

    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          signal: abortController.signal,
        });

        // Check if request was aborted
        if (abortController.signal.aborted) return;

        // If response is ok, check the data
        if (response.ok) {
          const data = await response.json();

          logger.info('Onboarding check response:', {
            hasCompletedOnboarding: data.hasCompletedOnboarding,
            needsOnboarding: data.needsOnboarding,
            userName: data.user?.name
          });

          if (data.hasCompletedOnboarding && !data.needsOnboarding) {
            // User has already completed onboarding, redirect to dashboard
            logger.info('User has completed onboarding, redirecting to dashboard');
            router.push('/dashboard');
            return;
          }
        } else {
          // If response is not ok, user likely doesn't exist in DB yet
          logger.info('Profile API response not ok - user needs onboarding');
        }
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === 'AbortError') return;
        logger.error('Failed to check onboarding status:', error);
        // Don't redirect on error, let user proceed with onboarding
      } finally {
        if (!abortController.signal.aborted) {
          setCheckingOnboarding(false);
        }
      }
    };

    checkOnboardingStatus();

    return () => {
      abortController.abort();
    };
  }, [user, authLoading, router]);

  const handleNext = async () => {
    setError('');

    // Validation
    if (currentStep === 0) {
      if (!formData.founderName.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!formData.phone.trim()) {
        setError('Please enter your phone number');
        return;
      }
      if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
        setError('Please enter a valid Indian phone number');
        return;
      }
    }

    if (currentStep === 1) {
      if (!formData.startupName.trim()) {
        setError('Please enter your startup name');
        return;
      }
      if (!formData.startupIdea.trim()) {
        setError('Please describe your startup idea');
        return;
      }
      if (formData.startupIdea.length < 50) {
        setError('Please provide more details about your idea (at least 50 characters)');
        return;
      }
    }

    // Save data on the last step before complete
    if (currentStep === 1) {
      setLoading(true);
      try {
        const response = await fetch('/api/user/onboarding', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to save onboarding data');
        }

        const result = await response.json();
        logger.info('Onboarding data saved successfully:', result);

        // Move to complete step
        setCurrentStep(currentStep + 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      // Final step - redirect to dashboard
      setLoading(true);
      try {
        // Verify that onboarding is complete before redirecting
        let attempts = 0;
        const maxAttempts = 5;
        
        while (attempts < maxAttempts) {
          const response = await fetch('/api/user/profile', {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache' }
          });
          
          if (response.ok) {
            const data = await response.json();
            logger.info(`Onboarding verification attempt ${attempts + 1}:`, {
              hasCompletedOnboarding: data.hasCompletedOnboarding,
              userName: data.user?.name,
              needsOnboarding: data.needsOnboarding
            });
            
            if (data.hasCompletedOnboarding && !data.needsOnboarding) {
              logger.info('Onboarding verified as complete, redirecting to dashboard');
              // Clear persisted form data on successful completion
              localStorage.removeItem('onboarding_form_data');
              router.push('/dashboard');
              return;
            }
          }
          
          attempts++;
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        // If verification failed, still redirect but with a flag
        logger.info('Onboarding verification failed after max attempts, forcing redirect');
        
        // Clear persisted form data even if verification incomplete
        localStorage.removeItem('onboarding_form_data');

        // Check if user has pending cart from signup
        const pendingCart = localStorage.getItem('preSignupCart');
        if (pendingCart) {
          // Redirect to pricing page with cart data
          router.push('/pricing?fromOnboarding=true');
        } else {
          router.push('/dashboard?onboarding=complete');
        }
      } catch (error) {
        logger.error('Error during final redirect:', error);
        localStorage.removeItem('onboarding_form_data');
        router.push('/dashboard?onboarding=complete');
      } finally {
        setLoading(false);
      }
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (authLoading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;
  const CurrentIcon = ONBOARDING_STEPS[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <Logo variant="full" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar value={progress} className="mb-2" />
          <Text size="sm" color="muted" className="text-center">
            Step {currentStep + 1} of {ONBOARDING_STEPS.length}
          </Text>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-gray-100 rounded-full mb-4">
              <CurrentIcon className="w-8 h-8" />
            </div>
            <Heading as="h1" variant="h3" className="mb-2">
              {ONBOARDING_STEPS[currentStep].title}
            </Heading>
            <Text color="muted">
              {ONBOARDING_STEPS[currentStep].subtitle}
            </Text>
          </div>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          {/* Step Forms */}
          <div className="space-y-6">
            {currentStep === 0 && (
              <>
                <div>
                  <label htmlFor="founderName" className="block text-sm font-medium mb-2">
                    Your Full Name *
                  </label>
                  <Input
                    id="founderName"
                    type="text"
                    placeholder="Ratan Tata"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    We'll use this for important updates about your journey
                  </Text>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <>
                <div>
                  <label htmlFor="startupName" className="block text-sm font-medium mb-2">
                    Startup Name *
                  </label>
                  <Input
                    id="startupName"
                    type="text"
                    placeholder="My Awesome Startup"
                    value={formData.startupName}
                    onChange={(e) => setFormData({ ...formData, startupName: e.target.value })}
                    disabled={loading}
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    Don't worry, you can change this later
                  </Text>
                </div>

                <div>
                  <label htmlFor="startupIdea" className="block text-sm font-medium mb-2">
                    Describe Your Idea *
                  </label>
                  <textarea
                    id="startupIdea"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    rows={4}
                    placeholder="What problem are you solving? How does your solution work?"
                    value={formData.startupIdea}
                    onChange={(e) => setFormData({ ...formData, startupIdea: e.target.value })}
                    disabled={loading}
                  />
                  <Text size="xs" color="muted" className="mt-1">
                    {formData.startupIdea.length}/50 characters minimum
                  </Text>
                </div>

                <div>
                  <label htmlFor="targetMarket" className="block text-sm font-medium mb-2">
                    Target Market (Optional)
                  </label>
                  <Input
                    id="targetMarket"
                    type="text"
                    placeholder="e.g., Small businesses in India, College students"
                    value={formData.targetMarket}
                    onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </>
            )}

            {currentStep === 2 && (
              <div className="text-center py-8">
                <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                  <Rocket className="w-12 h-12 text-green-600" />
                </div>
                <Heading as="h2" variant="h4" className="mb-2">
                  Welcome to The Indian Startup!
                </Heading>
                <Text color="muted" className="mb-6">
                  Your 30-day journey to launch your startup begins now. 
                  Let's turn your idea into reality!
                </Text>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <Text size="sm">✓ Daily lessons unlocked</Text>
                  <Text size="sm">✓ Access to templates and resources</Text>
                  <Text size="sm">✓ Community support activated</Text>
                  <Text size="sm">✓ Portfolio builder ready to grow with your progress</Text>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && currentStep < 2 && (
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </Button>
            )}
            
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={loading}
              className={currentStep === 0 ? 'ml-auto' : ''}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : currentStep === 2 ? (
                <>
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Help Text */}
        {currentStep < 2 && (
          <Text size="sm" color="muted" className="text-center mt-6">
            All information is kept secure and private. 
            <br />
            Need help? Contact{' '}
            <a 
              href="mailto:support@theindianstartup.in" 
              className="text-black font-medium underline hover:no-underline"
            >
              support@theindianstartup.in
            </a>
          </Text>
        )}
      </main>
    </div>
  );
}
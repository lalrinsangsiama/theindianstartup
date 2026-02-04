'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { X, ArrowRight, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { validateEmail, validatePhone } from '@/lib/validation';

interface OnboardingStep {
  step: number;
  required: string[];
  optional: string[];
  title: string;
  skipLabel?: string;
}

const OnboardingFlow: OnboardingStep[] = [
  { 
    step: 1, 
    required: ["email"], 
    optional: [],
    title: "Let's get started"
  },
  { 
    step: 2, 
    required: ["name"], 
    optional: ["phone"],
    title: "Tell us about yourself",
    skipLabel: "Skip for now"
  },
  { 
    step: 3, 
    required: [], 
    optional: ["goals", "experience"],
    title: "What are your goals?",
    skipLabel: "I'll do this later"
  }
];

interface ProgressiveOnboardingProps {
  onComplete?: () => void;
  onSkip?: () => void;
  initialData?: Partial<OnboardingData>;
}

interface OnboardingData {
  email: string;
  name: string;
  phone: string;
  goals: string;
  experience: string;
}

export function ProgressiveOnboarding({ 
  onComplete, 
  onSkip,
  initialData = {} 
}: ProgressiveOnboardingProps) {
  const router = useRouter();
  const supabase = createClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(true);
  
  const [formData, setFormData] = useState<OnboardingData>({
    email: initialData.email || '',
    name: initialData.name || '',
    phone: initialData.phone || '',
    goals: initialData.goals || '',
    experience: initialData.experience || ''
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Get current step configuration
  const currentStepConfig = OnboardingFlow.find(s => s.step === currentStep);

  // Validate a specific field
  const validateField = useCallback((field: string, value: string): string | null => {
    if (!value || !value.trim()) return null; // Empty is handled by required check

    switch (field) {
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      default:
        return null;
    }
  }, []);

  // Check if step is complete (required fields filled + validation passes)
  const isStepComplete = () => {
    if (!currentStepConfig) return false;

    // Check required fields are present
    const requiredFilled = currentStepConfig.required.every(field => {
      const value = formData[field as keyof OnboardingData];
      return value && value.trim().length > 0;
    });

    if (!requiredFilled) return false;

    // Check validation passes for required fields
    const allValid = currentStepConfig.required.every(field => {
      const value = formData[field as keyof OnboardingData];
      if (!value) return true; // Empty handled above
      return validateField(field, value) === null;
    });

    return allValid;
  };

  // Save progress to backend
  const saveProgress = async (skipCurrent = false) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Only save fields that have been filled
      const dataToSave: any = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value && value.trim().length > 0) {
          dataToSave[key] = value;
        }
      });

      // Add onboarding progress metadata
      dataToSave.onboardingStep = currentStep;
      dataToSave.onboardingSkipped = skipCurrent;
      dataToSave.completedSteps = [...completedSteps, currentStep];

      const response = await fetch('/api/user/progressive-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave)
      });

      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
    } catch (err) {
      logger.error('Error saving onboarding progress:', err);
    }
  };

  const handleNext = async () => {
    setError('');

    // Validate required fields
    if (!isStepComplete()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    await saveProgress();
    
    // Mark step as completed
    setCompletedSteps([...completedSteps, currentStep]);

    // Move to next step or complete
    if (currentStep < OnboardingFlow.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
    
    setIsLoading(false);
  };

  const handleSkip = async () => {
    setIsLoading(true);
    await saveProgress(true);
    
    // Mark step as skipped but move forward
    if (currentStep < OnboardingFlow.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
    
    setIsLoading(false);
  };

  const handleComplete = () => {
    setShowModal(false);
    if (onComplete) {
      onComplete();
    } else {
      router.push('/dashboard');
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (onSkip) {
      onSkip();
    }
  };

  // Auto-fill email if user is logged in
  useEffect(() => {
    const loadUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email && !formData.email) {
        setFormData(prev => ({ ...prev, email: user.email! }));
      }
    };
    loadUserEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showModal || !currentStepConfig) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Progress indicator */}
          <div className="flex justify-center mb-6">
            {OnboardingFlow.map((step) => (
              <div
                key={step.step}
                className={`w-2 h-2 rounded-full mx-1 ${
                  step.step === currentStep
                    ? 'bg-black w-8'
                    : completedSteps.includes(step.step)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Step title */}
          <h2 className="text-xl font-bold text-center mb-6">
            {currentStepConfig.title}
          </h2>

          {error && (
            <Alert variant="error" className="mb-4">
              {error}
            </Alert>
          )}

          {/* Step 1: Email (usually pre-filled) */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                required
                disabled={!!initialData.email}
              />
              {initialData.email && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <Text size="sm">Email verified</Text>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Name and Phone */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <Input
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
              <Input
                label="Phone Number (Optional)"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
              />
            </div>
          )}

          {/* Step 3: Goals and Experience */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  What are your startup goals? (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  rows={3}
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="I want to build a tech startup that..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your experience level (Optional)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                >
                  <option value="">Select your experience</option>
                  <option value="beginner">I'm new to startups</option>
                  <option value="intermediate">I've worked in startups</option>
                  <option value="experienced">I've founded a startup before</option>
                </select>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between mt-6">
            {currentStepConfig.skipLabel && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                disabled={isLoading}
              >
                {currentStepConfig.skipLabel}
              </Button>
            )}
            
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={isLoading || !isStepComplete()}
              className={!currentStepConfig.skipLabel ? 'ml-auto' : ''}
            >
              {currentStep === OnboardingFlow.length ? 'Complete' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Help text */}
          <Text size="xs" color="muted" className="text-center mt-4">
            You can complete or update this information anytime from your profile
          </Text>
        </div>
      </Card>
    </div>
  );
}
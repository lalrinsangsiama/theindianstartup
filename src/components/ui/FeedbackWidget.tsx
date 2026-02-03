'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Modal } from '@/components/ui/Modal';
import { ModalHeader, ModalTitle, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Alert } from '@/components/ui/Alert';
import { useAnalytics } from '@/hooks/useAnalytics';
import { MessageCircle, Send, Bug, Lightbulb, Heart, Frown } from 'lucide-react';

type FeedbackType = 'bug' | 'feature' | 'improvement' | 'compliment' | 'complaint';

interface FeedbackData {
  type: FeedbackType;
  title: string;
  description: string;
  email?: string;
  page: string;
  userAgent: string;
  timestamp: string;
}

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedType, setSelectedType] = useState<FeedbackType>('improvement');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const analytics = useAnalytics();

  const feedbackTypes = [
    { 
      id: 'bug' as FeedbackType, 
      label: 'Bug Report', 
      icon: Bug, 
      color: 'text-red-600',
      description: 'Something isn\'t working correctly'
    },
    { 
      id: 'feature' as FeedbackType, 
      label: 'Feature Request', 
      icon: Lightbulb, 
      color: 'text-yellow-600',
      description: 'Suggest a new feature or enhancement'
    },
    { 
      id: 'improvement' as FeedbackType, 
      label: 'Improvement', 
      icon: MessageCircle, 
      color: 'text-blue-600',
      description: 'Suggest how we can improve'
    },
    { 
      id: 'compliment' as FeedbackType, 
      label: 'Compliment', 
      icon: Heart, 
      color: 'text-green-600',
      description: 'Share what you love'
    },
    { 
      id: 'complaint' as FeedbackType, 
      label: 'Issue', 
      icon: Frown, 
      color: 'text-orange-600',
      description: 'Something frustrating or confusing'
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!title.trim() || !description.trim()) {
        setError('Please fill in all required fields');
        return;
      }

      // Prepare feedback data
      const feedbackData: FeedbackData = {
        type: selectedType,
        title: title.trim(),
        description: description.trim(),
        email: email.trim() || undefined,
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      };

      // Track with analytics
      analytics.track('feedback_submitted', {
        feedback_type: selectedType,
        feedback_title: title,
        page: window.location.pathname,
        has_email: !!email,
      });

      // Report as user feedback to error tracking
      analytics.reportUserIssue(
        `${feedbackTypes.find(t => t.id === selectedType)?.label}: ${title}`,
        selectedType === 'bug' ? 'ui' : 'ui',
        feedbackData
      );

      // Submit to API (you can implement this endpoint)
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setIsSubmitted(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setTitle('');
        setDescription('');
        setEmail('');
        setSelectedType('improvement');
      }, 2000);

    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      analytics.trackError(err instanceof Error ? err : new Error('Feedback submission failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    analytics.track('feedback_widget_opened', {
      page: window.location.pathname,
    });
  };

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Thank You!</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="text-center py-6">
            <div className="mb-4">
              <Heart className="h-12 w-12 text-green-600 mx-auto" />
            </div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Feedback Submitted Successfully
            </p>
            <p className="text-gray-600">
              We appreciate your input and will review it carefully. If you provided an email, 
              we'll get back to you soon.
            </p>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  return (
    <>
      {/* Floating feedback button */}
      <Button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 shadow-lg hover:shadow-xl transition-shadow"
        size="sm"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Feedback
      </Button>

      {/* Feedback modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <ModalTitle>Share Your Feedback</ModalTitle>
            <p className="text-sm text-gray-600 mt-2">
              Help us improve The Indian Startup platform. Your feedback is valuable to us.
            </p>
          </ModalHeader>

          <ModalBody className="space-y-6">
            {error && (
              <Alert variant="error" title="Error">
                {error}
              </Alert>
            )}

            {/* Feedback type selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What type of feedback is this?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {feedbackTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 border-2 rounded-lg text-left transition-colors ${
                        selectedType === type.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent className={`h-5 w-5 mt-0.5 ${type.color}`} />
                        <div>
                          <div className="font-medium text-sm">{type.label}</div>
                          <div className="text-xs text-gray-600 mt-1">{type.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <Input
              label="Title *"
              placeholder={`Brief summary of your ${feedbackTypes.find(t => t.id === selectedType)?.label.toLowerCase()}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Description */}
            <Textarea
              label="Description *"
              placeholder="Please provide detailed information about your feedback. The more specific you are, the better we can help."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />

            {/* Email (optional) */}
            <Input
              type="email"
              label="Email (optional)"
              placeholder="your.email@example.com"
              helper="Leave your email if you'd like us to follow up with you"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Context info */}
            <div className="bg-gray-50 p-3 rounded text-xs text-gray-600">
              <strong>Context:</strong> This feedback is for page: {typeof window !== 'undefined' ? window.location.pathname : ''}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              disabled={!title.trim() || !description.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

// Compact feedback button for specific components
export function QuickFeedbackButton({ 
  component, 
  className = '' 
}: { 
  component?: string; 
  className?: string; 
}) {
  const analytics = useAnalytics();

  const handleQuickFeedback = () => {
    const feedback = prompt('Quick feedback about this feature:');
    if (feedback && feedback.trim()) {
      analytics.reportUserIssue(
        `Quick feedback for ${component}: ${feedback}`,
        'ui',
        { component, quickFeedback: true }
      );
      toast.success('Thank you for your feedback!');
    }
  };

  return (
    <button
      onClick={handleQuickFeedback}
      className={`text-gray-400 hover:text-gray-600 transition-colors ${className}`}
      title="Quick feedback"
    >
      <MessageCircle className="h-4 w-4" />
    </button>
  );
}
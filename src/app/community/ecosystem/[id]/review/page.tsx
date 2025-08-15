'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft,
  Star,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Users,
  Building,
  Shield
} from 'lucide-react';

interface ReviewForm {
  rating: number;
  title: string;
  content: string;
  experienceType: string;
  applicationDate: string;
  responseTime: string;
  isAnonymous: boolean;
  anonymousName: string;
}

interface ListingBasicInfo {
  id: string;
  name: string;
  category: string;
  logoUrl?: string;
}

export default function WriteReviewPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [listing, setListing] = useState<ListingBasicInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<ReviewForm>({
    rating: 0,
    title: '',
    content: '',
    experienceType: 'applied',
    applicationDate: '',
    responseTime: '',
    isAnonymous: false,
    anonymousName: '',
  });

  const experienceTypes = [
    { value: 'applied', label: 'Applied but waiting for response' },
    { value: 'rejected', label: 'Applied and got rejected' },
    { value: 'accepted', label: 'Got accepted into program' },
    { value: 'ongoing', label: 'Currently in the program' },
    { value: 'completed', label: 'Completed the program' },
  ];

  const anonymousNames = [
    'Startup Founder',
    'Tech Entrepreneur', 
    'First-time Founder',
    'SaaS Founder',
    'E-commerce Entrepreneur',
    'FinTech Founder',
    'B2B Startup Founder',
    'EdTech Entrepreneur',
    'HealthTech Founder',
    'AI/ML Entrepreneur',
  ];

  const fetchListingInfo = useCallback(async () => {
    try {
      setLoading(true);
      
      // Mock data for demonstration
      const mockListing: ListingBasicInfo = {
        id: listingId,
        name: 'T-Hub Hyderabad',
        category: 'incubator',
        logoUrl: '/logos/t-hub.png',
      };
      
      setListing(mockListing);
    } catch (error) {
      console.error('Error fetching listing info:', error);
      setError('Failed to load listing information');
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  useEffect(() => {
    if (listingId) {
      fetchListingInfo();
    }
  }, [listingId, fetchListingInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (form.rating === 0) {
      setError('Please provide a rating');
      return;
    }
    if (!form.title.trim()) {
      setError('Please provide a title for your review');
      return;
    }
    if (!form.content.trim()) {
      setError('Please write your review');
      return;
    }
    if (form.isAnonymous && !form.anonymousName.trim()) {
      setError('Please select an anonymous name');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const reviewData = {
        ...form,
        listingId,
        title: form.title.trim(),
        content: form.content.trim(),
        applicationDate: form.applicationDate || null,
        responseTime: form.responseTime || null,
        anonymousName: form.isAnonymous ? form.anonymousName : null,
      };

      // In real app, call API
      const response = await fetch('/api/community/ecosystem/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      setSuccess(true);
      
      // Redirect after a delay
      setTimeout(() => {
        router.push(`/community/ecosystem/${listingId}`);
      }, 2000);

    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReviewForm, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const renderStars = (interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-8 h-8 cursor-pointer transition-colors ${
          i < form.rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 hover:text-yellow-200'
        }`}
        onClick={interactive ? () => handleInputChange('rating', i + 1) : undefined}
      />
    ));
  };

  if (loading) {
    return (
      <ProtectedRoute requireSubscription={true}>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading review form...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (success) {
    return (
      <ProtectedRoute requireSubscription={true}>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-2">
                  Review Submitted Successfully!
                </Heading>
                <Text color="muted" className="mb-4">
                  Thank you for sharing your experience. Your review will help other founders make informed decisions.
                </Text>
                <div className="animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  <Text size="sm" color="muted" className="mt-2">Redirecting...</Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (!listing) {
    return (
      <ProtectedRoute requireSubscription={true}>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Card className="max-w-md w-full mx-4">
              <CardContent className="p-8 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <Heading as="h2" variant="h4" className="mb-2">
                  Listing Not Found
                </Heading>
                <Text color="muted" className="mb-6">
                  The listing you want to review doesn&apos;t exist or has been removed.
                </Text>
                <Button variant="primary" onClick={() => router.push('/community/ecosystem')}>
                  Back to Directory
                </Button>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireSubscription={true}>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push(`/community/ecosystem/${listingId}`)}
              className="flex items-center gap-2 mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {listing.name}
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                {listing.logoUrl ? (
                  <Image 
                    src={listing.logoUrl} 
                    alt={listing.name} 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 rounded object-cover" 
                  />
                ) : (
                  <Building className="w-8 h-8" />
                )}
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Write Review for {listing.name}
                </Heading>
                <Text className="text-gray-600">
                  Share your experience to help other founders make informed decisions
                </Text>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Rating *</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex gap-1">
                    {renderStars(true)}
                  </div>
                  <Text className="text-lg font-medium">
                    {form.rating === 0 ? 'Click to rate' : `${form.rating} out of 5 stars`}
                  </Text>
                </div>
                <Text size="sm" color="muted">
                  Rate your overall experience with this organization
                </Text>
              </CardContent>
            </Card>

            {/* Experience Type */}
            <Card>
              <CardHeader>
                <CardTitle>Your Experience *</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {experienceTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`
                        flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                        ${form.experienceType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="experienceType"
                        value={type.value}
                        checked={form.experienceType === type.value}
                        onChange={(e) => handleInputChange('experienceType', e.target.value)}
                        className="sr-only"
                      />
                      <Text size="sm">{type.label}</Text>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline Details */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      Application Date
                    </label>
                    <Input
                      type="date"
                      value={form.applicationDate}
                      onChange={(e) => handleInputChange('applicationDate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                      Response Time
                    </label>
                    <Input
                      value={form.responseTime}
                      onChange={(e) => handleInputChange('responseTime', e.target.value)}
                      placeholder="e.g., 2 weeks, 1 month"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review Content */}
            <Card>
              <CardHeader>
                <CardTitle>Review Details *</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Review Title *
                  </label>
                  <Input
                    value={form.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Summarize your experience in one line..."
                    maxLength={100}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <Text size="sm" color="muted">
                      Make it descriptive and helpful
                    </Text>
                    <Text size="sm" color="muted">
                      {form.title.length}/100
                    </Text>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Detailed Review *
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Share your detailed experience, what went well, what could be improved, and any advice for other founders..."
                    className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={8}
                    maxLength={2000}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <Text size="sm" color="muted">
                      Be honest and constructive. Your review helps the community.
                    </Text>
                    <Text size="sm" color="muted">
                      {form.content.length}/2000
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anonymous Option */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={form.isAnonymous}
                        onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="anonymous" className="flex items-center gap-2 cursor-pointer">
                        {form.isAnonymous ? (
                          <EyeOff className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-600" />
                        )}
                        <Text weight="medium">Post anonymously</Text>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pl-7">
                    <Text size="sm" color="muted" className="mb-3">
                      {form.isAnonymous
                        ? 'Your name will be hidden and you\'ll appear with the selected anonymous identity.'
                        : 'Your review will be posted with your name and profile.'
                      }
                    </Text>
                    
                    {form.isAnonymous && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Choose your anonymous identity
                        </label>
                        <select
                          value={form.anonymousName}
                          onChange={(e) => handleInputChange('anonymousName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        >
                          <option value="">Select an identity...</option>
                          {anonymousNames.map((name) => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <Text weight="medium" className="mb-2 text-blue-900">
                      Review Guidelines
                    </Text>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li>• Be honest and constructive in your feedback</li>
                      <li>• Focus on your actual experience with the organization</li>
                      <li>• Avoid sharing confidential or sensitive information</li>
                      <li>• Be respectful and professional in your language</li>
                      <li>• Reviews are moderated and may take time to appear</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Error Message */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <Text className="text-red-700">{error}</Text>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/community/ecosystem/${listingId}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={submitting || form.rating === 0 || !form.title.trim() || !form.content.trim()}
                className="flex items-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
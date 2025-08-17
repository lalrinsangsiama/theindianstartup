'use client';

import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui';
import { Heading, Text } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Checkbox } from '@/components/ui';
import { Alert } from '@/components/ui';
import { CheckCircle, X, Settings, Mail } from 'lucide-react';

interface EmailPreferences {
  dailyReminders: boolean;
  weeklyReports: boolean;
  achievements: boolean;
  milestones: boolean;
  communityDigest: boolean;
  productUpdates: boolean;
  marketingEmails: boolean;
  unsubscribedAll: boolean;
}

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [preferences, setPreferences] = useState<EmailPreferences>({
    dailyReminders: true,
    weeklyReports: true,
    achievements: true,
    milestones: true,
    communityDigest: true,
    productUpdates: true,
    marketingEmails: true,
    unsubscribedAll: false,
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

  const loadPreferences = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/email-preferences?token=${token}`);
      const data = await response.json();
      
      if (response.ok) {
        setPreferences(prev => data.preferences || prev);
        setUserInfo({ name: data.userName, email: data.userEmail });
      } else {
        setError(data.error || 'Failed to load preferences');
      }
    } catch (err) {
      setError('Failed to load email preferences');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      loadPreferences();
    } else {
      setError('Invalid unsubscribe link');
      setLoading(false);
    }
  }, [token, loadPreferences]);

  const handlePreferenceChange = (key: keyof EmailPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
      // If unsubscribing from all, turn off all individual preferences
      ...(key === 'unsubscribedAll' && value ? {
        dailyReminders: false,
        weeklyReports: false,
        achievements: false,
        milestones: false,
        communityDigest: false,
        productUpdates: false,
        marketingEmails: false,
      } : {}),
      // If subscribing to any individual preference, turn off unsubscribe all
      ...(key !== 'unsubscribedAll' && value ? {
        unsubscribedAll: false,
      } : {}),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    setError('');
    
    try {
      const response = await fetch('/api/user/email-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, preferences }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Email preferences updated successfully!');
      } else {
        setError(data.error || 'Failed to update preferences');
      }
    } catch (err) {
      setError('Failed to update email preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribeAll = () => {
    handlePreferenceChange('unsubscribedAll', true);
    handleSave();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <Text>Loading email preferences...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container py-4">
          <Link href="/" className="text-black hover:opacity-80 transition-opacity">
            <Logo variant="full" className="h-8" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-gray-600" />
            </div>
            <Heading as="h1" variant="h2" className="mb-2">
              Email Preferences
            </Heading>
            {userInfo && (
              <Text color="muted">
                Managing email preferences for {userInfo.name} ({userInfo.email})
              </Text>
            )}
          </div>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          {message && (
            <Alert variant="success" className="mb-6">
              <CheckCircle className="w-5 h-5 mr-2" />
              {message}
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Choose Your Email Preferences
              </CardTitle>
              <Text size="sm" color="muted">
                Control which emails you receive from The Indian Startup
              </Text>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Quick Unsubscribe */}
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="font-medium text-red-900">
                      Unsubscribe from all emails
                    </Text>
                    <Text size="sm" className="text-red-700">
                      You&apos;ll stop receiving all email communications
                    </Text>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUnsubscribeAll}
                    disabled={saving}
                    className="border-red-300 text-red-700 hover:bg-red-100"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Unsubscribe All
                  </Button>
                </div>
              </div>

              {/* Individual Preferences */}
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <Text className="font-medium mb-3">Learning & Progress</Text>
                  <div className="space-y-4">
                    <div>
                      <Checkbox
                        name="dailyReminders"
                        checked={preferences.dailyReminders}
                        onChange={(e) => handlePreferenceChange('dailyReminders', e.target.checked)}
                        label="Daily lesson reminders"
                      />
                      <Text size="sm" color="muted" className="ml-6">
                        Get reminded when your next lesson is ready
                      </Text>
                    </div>
                    <div>
                      <Checkbox
                        name="weeklyReports"
                        checked={preferences.weeklyReports}
                        onChange={(e) => handlePreferenceChange('weeklyReports', e.target.checked)}
                        label="Weekly progress reports"
                      />
                      <Text size="sm" color="muted" className="ml-6">
                        Summary of your weekly achievements and progress
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <Text className="font-medium mb-3">Achievements & Milestones</Text>
                  <div className="space-y-3">
                    <Checkbox
                      name="achievements"
                      checked={preferences.achievements}
                      onChange={(e) => handlePreferenceChange('achievements', e.target.checked)}
                      label="Achievement notifications"
                      
                    />
                    <Checkbox
                      name="milestones"
                      checked={preferences.milestones}
                      onChange={(e) => handlePreferenceChange('milestones', e.target.checked)}
                      label="Milestone celebrations"
                      
                    />
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <Text className="font-medium mb-3">Community & Updates</Text>
                  <div className="space-y-3">
                    <Checkbox
                      name="communityDigest"
                      checked={preferences.communityDigest}
                      onChange={(e) => handlePreferenceChange('communityDigest', e.target.checked)}
                      label="Community digest"
                      
                    />
                    <Checkbox
                      name="productUpdates"
                      checked={preferences.productUpdates}
                      onChange={(e) => handlePreferenceChange('productUpdates', e.target.checked)}
                      label="Product updates"
                      
                    />
                  </div>
                </div>

                <div>
                  <Text className="font-medium mb-3">Marketing</Text>
                  <Checkbox
                    name="marketingEmails"
                    checked={preferences.marketingEmails}
                    onChange={(e) => handlePreferenceChange('marketingEmails', e.target.checked)}
                    label="Marketing emails"
                    
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full"
                >
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="text-center mt-8">
            <Text size="sm" color="muted">
              Changes may take up to 24 hours to take effect. You can update these preferences anytime.
            </Text>
            <Text size="sm" className="mt-2">
              Questions?{' '}
              <a 
                href="mailto:support@theindianstartup.in" 
                className="text-accent hover:underline"
              >
                Contact support
              </a>
            </Text>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <Text className="mt-4">Loading...</Text>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UnsubscribeContent />
    </Suspense>
  );
}
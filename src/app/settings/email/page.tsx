'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { 
  Mail, 
  Bell, 
  Calendar, 
  Trophy, 
  Target, 
  Users, 
  Zap, 
  CheckCircle,
  Clock 
} from 'lucide-react';

interface EmailPreferences {
  dailyReminders: boolean;
  weeklyReports: boolean;
  achievements: boolean;
  milestones: boolean;
  communityDigest: boolean;
  productUpdates: boolean;
  marketingEmails: boolean;
  unsubscribedAll: boolean;
  preferredTime: string;
  timezone: string;
}

export default function EmailSettingsPage() {
  const [preferences, setPreferences] = useState<EmailPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/emails/preferences');
      const data = await response.json();
      
      if (data.preferences) {
        setPreferences(data.preferences);
      }
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
      setMessage({ type: 'error', text: 'Failed to load email preferences' });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (updates: Partial<EmailPreferences>) => {
    setSaving(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/emails/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      const data = await response.json();
      
      if (data.success) {
        setPreferences(data.preferences);
        setMessage({ type: 'success', text: 'Email preferences updated successfully' });
      } else {
        throw new Error(data.error || 'Failed to update preferences');
      }
    } catch (error) {
      console.error('Failed to update preferences:', error);
      setMessage({ type: 'error', text: 'Failed to update email preferences' });
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = (key: keyof EmailPreferences, value: boolean) => {
    if (preferences) {
      const newPreferences = { ...preferences, [key]: value };
      setPreferences(newPreferences);
      updatePreferences({ [key]: value });
    }
  };

  const emailTypes = [
    {
      key: 'dailyReminders' as keyof EmailPreferences,
      title: 'Daily Reminders',
      description: 'Get notified when your next lesson is ready',
      icon: Calendar,
      badge: '9:00 AM IST',
      frequency: 'Daily',
    },
    {
      key: 'weeklyReports' as keyof EmailPreferences,
      title: 'Weekly Progress Reports',
      description: 'Summary of your progress, XP earned, and achievements',
      icon: Trophy,
      frequency: 'Weekly',
    },
    {
      key: 'achievements' as keyof EmailPreferences,
      title: 'Achievement Notifications',
      description: 'Celebrate when you unlock new badges and milestones',
      icon: Trophy,
      frequency: 'When earned',
    },
    {
      key: 'milestones' as keyof EmailPreferences,
      title: 'Milestone Celebrations',
      description: 'Special emails when you reach journey milestones',
      icon: Target,
      frequency: 'When reached',
    },
    {
      key: 'communityDigest' as keyof EmailPreferences,
      title: 'Community Digest',
      description: 'Weekly roundup of community activity and discussions',
      icon: Users,
      frequency: 'Weekly',
    },
    {
      key: 'productUpdates' as keyof EmailPreferences,
      title: 'Product Updates',
      description: 'New features, improvements, and platform announcements',
      icon: Zap,
      frequency: 'Monthly',
    },
    {
      key: 'marketingEmails' as keyof EmailPreferences,
      title: 'Marketing & Promotions',
      description: 'Special offers, new programs, and partner opportunities',
      icon: Mail,
      frequency: 'Occasional',
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <Heading as="h1" variant="h2">Email Preferences</Heading>
            <Text color="muted" className="mt-2">
              Choose which emails you'd like to receive from The Indian Startup
            </Text>
          </div>

          {/* Status Message */}
          {message && (
            <Alert 
              variant={message.type === 'success' ? 'success' : 'error'}
              className="mb-6"
            >
              {message.text}
            </Alert>
          )}

          {/* Global Unsubscribe Warning */}
          {preferences?.unsubscribedAll && (
            <Alert variant="warning">
              <Mail className="w-4 h-4" />
              <div>
                <Text weight="medium">All emails are disabled</Text>
                <Text size="sm" color="muted">
                  You've unsubscribed from all emails. Enable specific types below or contact support if this was a mistake.
                </Text>
              </div>
              <Button 
                size="sm" 
                onClick={() => togglePreference('unsubscribedAll', false)}
                disabled={saving}
              >
                Re-enable emails
              </Button>
            </Alert>
          )}

          {/* Email Type Preferences */}
          <Card>
            <div className="p-6">
              <Heading as="h3" variant="h4" className="mb-6">Email Types</Heading>
              
              <div className="space-y-6">
                {emailTypes.map((emailType) => {
                  const Icon = emailType.icon;
                  const isEnabled = preferences?.[emailType.key] && !preferences.unsubscribedAll;
                  
                  return (
                    <div 
                      key={emailType.key}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Text weight="medium">{emailType.title}</Text>
                          {emailType.badge && (
                            <Badge size="sm" variant="outline">
                              {emailType.badge}
                            </Badge>
                          )}
                          <Badge size="sm" variant="default">
                            {emailType.frequency}
                          </Badge>
                        </div>
                        <Text size="sm" color="muted">
                          {emailType.description}
                        </Text>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <Switch
                          checked={!!isEnabled}
                          onChange={(checked) => togglePreference(emailType.key, checked)}
                          disabled={saving || preferences?.unsubscribedAll}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Email Schedule */}
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-gray-600" />
                <Heading as="h3" variant="h4">Email Schedule</Heading>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text weight="medium" className="mb-2">Daily Reminders</Text>
                    <Text size="sm" color="muted">
                      Sent at 9:00 AM IST every day
                    </Text>
                  </div>
                  <div>
                    <Text weight="medium" className="mb-2">Weekly Reports</Text>
                    <Text size="sm" color="muted">
                      Sent every Sunday at 10:00 AM IST
                    </Text>
                  </div>
                  <div>
                    <Text weight="medium" className="mb-2">Achievements</Text>
                    <Text size="sm" color="muted">
                      Sent immediately when earned
                    </Text>
                  </div>
                  <div>
                    <Text weight="medium" className="mb-2">Community Digest</Text>
                    <Text size="sm" color="muted">
                      Sent every Monday at 6:00 PM IST
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Unsubscribe All */}
          <Card>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <Heading as="h3" variant="h4" className="text-red-600">Unsubscribe from All Emails</Heading>
                  <Text color="muted" className="mt-2">
                    This will stop all emails from The Indian Startup. You can re-enable them anytime.
                  </Text>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => togglePreference('unsubscribedAll', !preferences?.unsubscribedAll)}
                  disabled={saving}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  {preferences?.unsubscribedAll ? 'Re-enable All' : 'Unsubscribe All'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Help */}
          <Card className="bg-blue-50 border-blue-200">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <Text weight="medium" className="text-blue-900">
                    Need help with email preferences?
                  </Text>
                  <Text size="sm" className="text-blue-700 mt-1">
                    Contact our support team at support@theindianstartup.in or use the chat widget.
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
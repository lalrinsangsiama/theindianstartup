'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Tabs } from '@/components/ui/Tabs';
import { TabsContent } from '@/components/ui/Tabs';
import { TabsList } from '@/components/ui/Tabs';
import { TabsTrigger } from '@/components/ui/Tabs';
import { useAuthContext } from '@/contexts/AuthContext';
import { 
  Bell, 
  Shield, 
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Save,
  Key,
  Smartphone,
  FileText,
  Loader2,
  Mail
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('notifications');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Notification preferences
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    weeklyProgress: true,
    achievements: true,
    communityUpdates: false,
    expertSessions: true,
    marketing: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    progressVisible: false,
    portfolioVisible: false,
    activityVisible: false
  });

  // Email preferences
  const [emailPrefs, setEmailPrefs] = useState({
    emailFrequency: 'daily', // daily, weekly, never
    emailTime: '09:00',
    unsubscribeAll: false
  });

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      // Save notification preferences
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      // Save privacy settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEmailPrefs = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/email-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailPrefs)
      });
      
      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save email preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setExportLoading(true);
    try {
      // Fetch user's complete data
      const response = await fetch('/api/user/export-data');
      
      if (!response.ok) throw new Error('Failed to export data');
      
      // The API should return a PDF blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `theindianstartup-data-${new Date().toISOString().split('T')[0]}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
      // Fallback to HTML export if PDF generation fails
      handleExportAsHTML();
    } finally {
      setExportLoading(false);
    }
  };

  const handleExportAsHTML = async () => {
    try {
      // Fetch user data
      const profileRes = await fetch('/api/user/profile');
      const profileData = await profileRes.json();
      
      // Generate HTML report
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>My Startup Journey - Data Export</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1, h2 { color: #333; }
            .section { margin-bottom: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px; }
            .stat { display: inline-block; margin: 10px 20px 10px 0; }
            .label { font-weight: bold; color: #666; }
            .value { font-size: 1.2em; color: #333; }
            .footer { margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
          </style>
        </head>
        <body>
          <h1>The Indian Startup - Your Journey Data</h1>
          <p>Export Date: ${new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          
          <div class="section">
            <h2>Personal Information</h2>
            <div class="stat">
              <div class="label">Name:</div>
              <div class="value">${profileData.user?.name || 'Not provided'}</div>
            </div>
            <div class="stat">
              <div class="label">Email:</div>
              <div class="value">${profileData.user?.email || ''}</div>
            </div>
            <div class="stat">
              <div class="label">Member Since:</div>
              <div class="value">${new Date(profileData.user?.createdAt).toLocaleDateString('en-IN')}</div>
            </div>
          </div>
          
          <div class="section">
            <h2>Journey Progress</h2>
            <div class="stat">
              <div class="label">Current Day:</div>
              <div class="value">${profileData.user?.currentDay || 1} of 30</div>
            </div>
            <div class="stat">
              <div class="label">Total XP:</div>
              <div class="value">${profileData.user?.totalXP || 0}</div>
            </div>
            <div class="stat">
              <div class="label">Badges Earned:</div>
              <div class="value">${profileData.user?.badges?.length || 0}</div>
            </div>
            <div class="stat">
              <div class="label">Current Streak:</div>
              <div class="value">${profileData.user?.currentStreak || 0} days</div>
            </div>
          </div>
          
          <div class="section">
            <h2>Startup Information</h2>
            <div class="stat">
              <div class="label">Startup Name:</div>
              <div class="value">${profileData.user?.portfolio?.startupName || 'Not set'}</div>
            </div>
            <div class="stat">
              <div class="label">Problem Statement:</div>
              <div class="value">${profileData.user?.portfolio?.problemStatement || 'Not defined'}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This data export was generated from The Indian Startup platform.</p>
            <p>For any questions, contact support@theindianstartup.in</p>
          </div>
        </body>
        </html>
      `;
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `theindianstartup-data-${new Date().toISOString().split('T')[0]}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export HTML:', error);
    }
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="mb-2">
              Settings
            </Heading>
            <Text color="muted">
              Manage your notification preferences, privacy, and account settings
            </Text>
          </div>

          {saved && (
            <Alert variant="success" className="mb-6">
              <CheckCircle className="w-4 h-4" />
              Settings saved successfully!
            </Alert>
          )}

          {/* Settings Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Preferences
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Key className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Data & Export
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Daily Lesson Reminders</Text>
                        <Text size="sm" color="muted">Get notified when new daily lessons are available</Text>
                      </div>
                      <Checkbox
                        checked={notifications.dailyReminders}
                        onChange={(e) => setNotifications({ ...notifications, dailyReminders: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Weekly Progress Reports</Text>
                        <Text size="sm" color="muted">Receive weekly summaries of your progress</Text>
                      </div>
                      <Checkbox
                        checked={notifications.weeklyProgress}
                        onChange={(e) => setNotifications({ ...notifications, weeklyProgress: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Achievement Notifications</Text>
                        <Text size="sm" color="muted">Get notified when you earn new badges</Text>
                      </div>
                      <Checkbox
                        checked={notifications.achievements}
                        onChange={(e) => setNotifications({ ...notifications, achievements: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Community Updates</Text>
                        <Text size="sm" color="muted">New posts and discussions in the community</Text>
                      </div>
                      <Checkbox
                        checked={notifications.communityUpdates}
                        onChange={(e) => setNotifications({ ...notifications, communityUpdates: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Expert Sessions</Text>
                        <Text size="sm" color="muted">Notifications about upcoming expert sessions</Text>
                      </div>
                      <Checkbox
                        checked={notifications.expertSessions}
                        onChange={(e) => setNotifications({ ...notifications, expertSessions: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Marketing & Promotions</Text>
                        <Text size="sm" color="muted">Updates about new features and special offers</Text>
                      </div>
                      <Checkbox
                        checked={notifications.marketing}
                        onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      variant="primary"
                      onClick={handleSaveNotifications}
                      isLoading={loading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Preferences Tab */}
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Email Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Frequency</label>
                    <select
                      value={emailPrefs.emailFrequency}
                      onChange={(e) => setEmailPrefs({ ...emailPrefs, emailFrequency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="daily">Daily Digest</option>
                      <option value="weekly">Weekly Summary</option>
                      <option value="never">No Email Notifications</option>
                    </select>
                  </div>

                  {emailPrefs.emailFrequency === 'daily' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Time</label>
                      <Input
                        type="time"
                        value={emailPrefs.emailTime}
                        onChange={(e) => setEmailPrefs({ ...emailPrefs, emailTime: e.target.value })}
                      />
                      <Text size="xs" color="muted" className="mt-1">
                        All times are in IST (Indian Standard Time)
                      </Text>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Unsubscribe from all emails</Text>
                        <Text size="sm" color="muted">Stop receiving all email communications</Text>
                      </div>
                      <Checkbox
                        checked={emailPrefs.unsubscribeAll}
                        onChange={(e) => setEmailPrefs({ ...emailPrefs, unsubscribeAll: e.target.checked })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      variant="primary"
                      onClick={handleSaveEmailPrefs}
                      isLoading={loading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Email Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Profile Visibility</Text>
                        <Text size="sm" color="muted">Allow other members to see your profile</Text>
                      </div>
                      <Checkbox
                        checked={privacy.profileVisible}
                        onChange={(e) => setPrivacy({ ...privacy, profileVisible: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Journey Progress</Text>
                        <Text size="sm" color="muted">Show your progress publicly</Text>
                      </div>
                      <Checkbox
                        checked={privacy.progressVisible}
                        onChange={(e) => setPrivacy({ ...privacy, progressVisible: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Startup Portfolio</Text>
                        <Text size="sm" color="muted">Allow others to view your startup portfolio</Text>
                      </div>
                      <Checkbox
                        checked={privacy.portfolioVisible}
                        onChange={(e) => setPrivacy({ ...privacy, portfolioVisible: e.target.checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">Community Activity</Text>
                        <Text size="sm" color="muted">Show your posts and comments to others</Text>
                      </div>
                      <Checkbox
                        checked={privacy.activityVisible}
                        onChange={(e) => setPrivacy({ ...privacy, activityVisible: e.target.checked })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      variant="primary"
                      onClick={handleSavePrivacy}
                      isLoading={loading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Text weight="medium" className="mb-2">Change Password</Text>
                      <Text size="sm" color="muted" className="mb-3">
                        Update your password to keep your account secure
                      </Text>
                      <Button variant="outline">
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium">2FA Status</Text>
                        <Text size="sm" color="muted">Add an extra layer of security to your account</Text>
                      </div>
                      <Badge variant="outline">Not Enabled</Badge>
                    </div>
                    <Button variant="outline" className="mt-4">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Enable 2FA
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" color="muted" className="mb-4">
                      Manage devices where you&apos;re currently logged in
                    </Text>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <Text weight="medium">Current Device</Text>
                          <Text size="sm" color="muted">Last active: Just now</Text>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Data & Export Tab */}
            <TabsContent value="data">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Export Your Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text color="muted" className="mb-4">
                      Download a complete copy of your data including profile, progress, and portfolio information in a readable format.
                    </Text>
                    <div className="flex gap-3">
                      <Button 
                        variant="primary" 
                        onClick={handleExportData}
                        isLoading={exportLoading}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export as PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleExportAsHTML}
                        disabled={exportLoading}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export as HTML
                      </Button>
                    </div>
                    <Text size="xs" color="muted" className="mt-2">
                      Your data will be compiled and downloaded to your device
                    </Text>
                  </CardContent>
                </Card>

                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert variant="warning" className="mb-4">
                      <AlertTriangle className="w-4 h-4" />
                      These actions cannot be undone. Please proceed with caution.
                    </Alert>
                    
                    <div className="space-y-4">
                      <div>
                        <Text weight="medium" className="mb-2">Delete Account</Text>
                        <Text size="sm" color="muted" className="mb-3">
                          Permanently delete your account and all associated data. This action cannot be reversed.
                        </Text>
                        <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
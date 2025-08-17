'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { Tabs } from '@/components/ui/Tabs';
import { TabsContent } from '@/components/ui/Tabs';
import { TabsList } from '@/components/ui/TabsList';
import { TabsTrigger } from '@/components/ui/Tabs';
import { useAuthContext } from '@/contexts/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile form data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    linkedinUrl: '',
    twitterUrl: '',
    websiteUrl: ''
  });

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

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        if (data.user) {
          setProfileData({
            name: data.user.name || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
            bio: data.user.bio || '',
            linkedinUrl: data.user.linkedinUrl || '',
            twitterUrl: data.user.twitterUrl || '',
            websiteUrl: data.user.websiteUrl || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    // Mock data export functionality
    const data = {
      profile: profileData,
      subscription: 'P1: 30-Day India Launch Sprint',
      progress: {
        currentDay: 7,
        completedDays: 6,
        totalXP: 850,
        badges: ['Starter', 'Researcher']
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-startup-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="mb-2">
              Account Settings
            </Heading>
            <Text color="muted">
              Manage your profile, preferences, and account settings
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
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Data & Export
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        value={profileData.email}
                        disabled
                        className="bg-gray-50"
                        icon={<Mail className="w-4 h-4" />}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      icon={<Phone className="w-4 h-4" />}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself and your startup journey..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <Heading as="h3" variant="h5">Social Links</Heading>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                      <Input
                        value={profileData.linkedinUrl}
                        onChange={(e) => setProfileData({ ...profileData, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/yourprofile"
                        icon={<Linkedin className="w-4 h-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter Profile</label>
                      <Input
                        value={profileData.twitterUrl}
                        onChange={(e) => setProfileData({ ...profileData, twitterUrl: e.target.value })}
                        placeholder="https://twitter.com/yourusername"
                        icon={<Twitter className="w-4 h-4" />}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <Input
                        value={profileData.websiteUrl}
                        onChange={(e) => setProfileData({ ...profileData, websiteUrl: e.target.value })}
                        placeholder="https://yourstartup.com"
                        icon={<Globe className="w-4 h-4" />}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      variant="primary" 
                      onClick={handleSaveProfile}
                      isLoading={loading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

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
                    <Button variant="primary">
                      <Save className="w-4 h-4 mr-2" />
                      Save Preferences
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
                        <Text size="sm" color="muted">Show your progress on leaderboards</Text>
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
                    <Button variant="primary">
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Text weight="medium" className="text-green-800">P1: 30-Day India Launch Sprint</Text>
                        <Text size="sm" className="text-green-600">Active subscription</Text>
                      </div>
                      <Badge variant="success">Active</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Text weight="medium" className="mb-1">Plan</Text>
                      <Text color="muted">30-Day India Launch Sprint</Text>
                    </div>
                    <div>
                      <Text weight="medium" className="mb-1">Access Period</Text>
                      <Text color="muted">365 days from purchase</Text>
                    </div>
                    <div>
                      <Text weight="medium" className="mb-1">Amount Paid</Text>
                      <Text color="muted">₹999 (Launch Offer)</Text>
                    </div>
                    <div>
                      <Text weight="medium" className="mb-1">Purchase Date</Text>
                      <Text color="muted">January 15, 2025</Text>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <Button variant="outline">
                      View Invoice
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
                      Download a complete copy of your data including profile, progress, and portfolio information.
                    </Text>
                    <Button variant="primary" onClick={handleExportData}>
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
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
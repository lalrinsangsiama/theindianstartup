'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
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
  Mail,
  CreditCard,
  Package,
  Calendar,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Clock,
  Gift,
  AlertCircle,
  ExternalLink,
  User,
  Building,
  MapPin,
  Phone,
  Edit2,
  Camera,
  BookOpen
} from 'lucide-react';
import { PaymentButton, BuyNowButton, AllAccessButton, UpgradeButton } from '@/components/payment/PaymentButton';
import Link from 'next/link';
import { PageBreadcrumbs } from '@/components/ui/Breadcrumbs';

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('billing');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [billingData, setBillingData] = useState<any>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
  const [loadingBilling, setLoadingBilling] = useState(true);

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

  // Profile editing state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    startupName: '',
    industry: ''
  });
  const [profileSaving, setProfileSaving] = useState(false);

  // Initialize profile data from user
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.user_metadata?.name || '',
        phone: user.user_metadata?.phone || '',
        startupName: user.user_metadata?.startupName || '',
        industry: user.user_metadata?.industry || ''
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'profile',
          data: profileData
        })
      });

      if (response.ok) {
        setIsEditingProfile(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        logger.error('Failed to save profile');
      }
    } catch (error) {
      logger.error('Failed to save profile:', error);
    } finally {
      setProfileSaving(false);
    }
  };

  // Fetch billing data on component mount
  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoadingBilling(true);
        
        // Fetch purchase history
        const historyRes = await fetch('/api/purchase/history');
        if (historyRes.ok) {
          const history = await historyRes.json();
          setPurchaseHistory(history.purchases || []);
        }
        
        // Fetch current subscriptions
        const subscriptionsRes = await fetch('/api/user/subscriptions');
        if (subscriptionsRes.ok) {
          const subs = await subscriptionsRes.json();
          setBillingData(subs);
        }
      } catch (error) {
        logger.error('Failed to fetch billing data:', error);
      } finally {
        setLoadingBilling(false);
      }
    };
    
    fetchBillingData();
  }, []);

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'notifications',
          data: notifications
        })
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        logger.error('Failed to save notifications');
      }
    } catch (error) {
      logger.error('Failed to save notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrivacy = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'privacy',
          data: privacy
        })
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        logger.error('Failed to save privacy settings');
      }
    } catch (error) {
      logger.error('Failed to save privacy settings:', error);
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
      logger.error('Failed to save email preferences:', error);
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
      logger.error('Failed to export data:', error);
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
      logger.error('Failed to export HTML:', error);
    }
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <PageBreadcrumbs />

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
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex-wrap">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
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
                Data
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-6">
                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                      </span>
                      {isEditingProfile ? (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditingProfile(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={handleSaveProfile}
                            isLoading={profileSaving}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingProfile(true)}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <button className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full hover:bg-gray-800">
                            <Camera className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
                          <Text size="lg" weight="bold">{profileData.name || user?.user_metadata?.name || 'Founder'}</Text>
                          <Text color="muted">Member since {new Date(user?.created_at || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</Text>
                        </div>
                      </div>

                      {/* Personal Details */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name</label>
                          <Input
                            type="text"
                            value={isEditingProfile ? profileData.name : (user?.user_metadata?.name || '')}
                            onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your name"
                            disabled={!isEditingProfile}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address</label>
                          <Input
                            type="email"
                            value={user?.email || ''}
                            disabled
                          />
                          <Text size="xs" color="muted" className="mt-1">Email cannot be changed</Text>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number</label>
                          <Input
                            type="tel"
                            value={isEditingProfile ? profileData.phone : (user?.user_metadata?.phone || '')}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+91 98765 43210"
                            disabled={!isEditingProfile}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                          <Input 
                            type="url" 
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Startup Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Startup Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Startup Name</label>
                        <Input
                          type="text"
                          value={isEditingProfile ? profileData.startupName : (user?.user_metadata?.startupName || '')}
                          onChange={(e) => setProfileData(prev => ({ ...prev, startupName: e.target.value }))}
                          placeholder="Your Startup Name"
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Industry</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                          value={isEditingProfile ? profileData.industry : (user?.user_metadata?.industry || '')}
                          onChange={(e) => setProfileData(prev => ({ ...prev, industry: e.target.value }))}
                          disabled={!isEditingProfile}
                        >
                          <option value="">Select Industry</option>
                          <option value="tech">Technology</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="fintech">Fintech</option>
                          <option value="healthtech">Healthtech</option>
                          <option value="edtech">Edtech</option>
                          <option value="agritech">Agritech</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Stage</label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                          disabled={!isEditingProfile}
                        >
                          <option value="">Select Stage</option>
                          <option value="idea">Idea Stage</option>
                          <option value="mvp">MVP Built</option>
                          <option value="early">Early Revenue</option>
                          <option value="growth">Growth Stage</option>
                          <option value="scale">Scaling</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <Input
                          type="text"
                          placeholder="City, State"
                          disabled={!isEditingProfile}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Brief Description</label>
                        <textarea
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                          rows={3}
                          placeholder="What does your startup do?"
                          disabled={!isEditingProfile}
                        />
                      </div>
                    </div>
                    {!isEditingProfile && (
                      <div className="mt-4 pt-4 border-t">
                        <Text size="sm" color="muted">
                          Click &quot;Edit Profile&quot; above to modify startup information
                        </Text>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Learning Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Learning Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Primary Goal</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                          <option value="">Select your primary goal</option>
                          <option value="launch">Launch my first startup</option>
                          <option value="funding">Raise funding</option>
                          <option value="scale">Scale existing business</option>
                          <option value="learn">Learn startup fundamentals</option>
                          <option value="network">Build network</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Time Commitment</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
                          <option value="">How much time can you dedicate daily?</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="180">3+ hours</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Learning Style</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <Checkbox /> 
                            <span>Video Tutorials</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <Checkbox /> 
                            <span>Written Guides</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <Checkbox /> 
                            <span>Interactive Exercises</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <Checkbox /> 
                            <span>Community Discussions</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Billing & Subscription Tab */}
            <TabsContent value="billing">
              <div className="space-y-6">
                {/* Current Subscriptions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Your Products & Subscriptions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loadingBilling ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin" />
                      </div>
                    ) : purchaseHistory.filter(p => p.status === 'completed' && p.isActive).length > 0 ? (
                      <div className="space-y-4">
                        {purchaseHistory
                          .filter(p => p.status === 'completed' && p.isActive)
                          .map((purchase, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Text weight="bold" size="lg">{purchase.productName}</Text>
                                    <Badge variant="success" size="sm">Active</Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <Text color="muted">Purchased:</Text>
                                      <Text>{new Date(purchase.purchaseDate).toLocaleDateString('en-IN')}</Text>
                                    </div>
                                    <div>
                                      <Text color="muted">Expires:</Text>
                                      <Text className={
                                        new Date(purchase.expiresAt) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                          ? 'text-orange-600 font-medium'
                                          : ''
                                      }>
                                        {new Date(purchase.expiresAt).toLocaleDateString('en-IN')}
                                      </Text>
                                    </div>
                                  </div>
                                  {new Date(purchase.expiresAt) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                                    <Alert variant="warning" className="mt-3">
                                      <AlertCircle className="w-4 h-4" />
                                      Expires in {Math.ceil((new Date(purchase.expiresAt).getTime() - Date.now()) / (24 * 60 * 60 * 1000))} days
                                    </Alert>
                                  )}
                                </div>
                                <div className="ml-4">
                                  <Text weight="bold" size="lg">₹{purchase.amount?.toLocaleString('en-IN')}</Text>
                                </div>
                              </div>
                              {purchase.productCode !== 'ALL_ACCESS' && (
                                <div className="mt-4 pt-4 border-t">
                                  <UpgradeButton
                                    productCode="ALL_ACCESS"
                                    size="sm"
                                    className="w-full"
                                    showSavings={true}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <Text color="muted" className="mb-4">No active subscriptions</Text>
                        <AllAccessButton size="md" showSavings={true} />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Upgrade Options */}
                {purchaseHistory.filter(p => p.status === 'completed' && p.isActive && p.productCode !== 'ALL_ACCESS').length > 0 && (
                  <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        Upgrade to All-Access
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text className="mb-4">
                        You currently own {purchaseHistory.filter(p => p.status === 'completed' && p.isActive).length} individual product(s). 
                        Upgrade to All-Access and save big!
                      </Text>
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <Text size="xl" weight="bold">30</Text>
                            <Text size="sm" color="muted">Total Products</Text>
                          </div>
                          <div>
                            <Text size="xl" weight="bold" className="text-green-600">₹74,971</Text>
                            <Text size="sm" color="muted">You Save</Text>
                          </div>
                          <div>
                            <Text size="xl" weight="bold">1 Year</Text>
                            <Text size="sm" color="muted">Full Access</Text>
                          </div>
                        </div>
                      </div>
                      <AllAccessButton size="lg" className="w-full" showSavings={false} />
                    </CardContent>
                  </Card>
                )}

                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text color="muted" className="mb-4">
                      We use Razorpay for secure payment processing. Your payment information is never stored on our servers.
                    </Text>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <Text weight="medium">Credit/Debit Cards</Text>
                          <Text size="sm" color="muted">Visa, Mastercard, Rupay</Text>
                        </div>
                        <Badge variant="success">Accepted</Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <Text weight="medium">UPI</Text>
                          <Text size="sm" color="muted">Google Pay, PhonePe, Paytm</Text>
                        </div>
                        <Badge variant="success">Accepted</Badge>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Shield className="w-5 h-5 text-gray-600" />
                        <div className="flex-1">
                          <Text weight="medium">Net Banking</Text>
                          <Text size="sm" color="muted">All major Indian banks</Text>
                        </div>
                        <Badge variant="success">Accepted</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Purchase History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="w-5 h-5" />
                      Purchase History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {purchaseHistory.length > 0 ? (
                      <div className="space-y-3">
                        {purchaseHistory.map((purchase, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div>
                              <Text weight="medium">{purchase.productName}</Text>
                              <Text size="sm" color="muted">
                                {new Date(purchase.createdAt).toLocaleDateString('en-IN', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Text>
                            </div>
                            <div className="text-right">
                              <Text weight="bold">₹{purchase.amount?.toLocaleString('en-IN')}</Text>
                              <Badge 
                                variant={purchase.status === 'completed' ? 'success' : 'default'} 
                                size="sm"
                              >
                                {purchase.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <Text color="muted">No purchase history</Text>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Referral Program */}
                <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-600" />
                      Referral Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text className="mb-4">
                      Earn ₹500 for every friend who purchases a course using your referral code!
                    </Text>
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <Text size="sm" color="muted" className="mb-2">Your Referral Code:</Text>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 bg-gray-100 rounded font-mono text-lg">
                          {user?.id ? `REF${user.id.substring(0, 6).toUpperCase()}` : 'LOADING...'}
                        </code>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(`REF${user?.id?.substring(0, 6).toUpperCase()}`);
                            setSaved(true);
                            setTimeout(() => setSaved(false), 2000);
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                    <Link href="/referral">
                      <Button variant="primary" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Referral Dashboard
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
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
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Two-Factor Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Text weight="medium">2FA Status</Text>
                        <Text size="sm" color="muted">Add an extra layer of security using an authenticator app</Text>
                      </div>
                    </div>
                    <Link href="/settings/security/2fa">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Shield className="w-4 h-4 mr-2" />
                        Manage 2FA Settings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Active Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text size="sm" color="muted" className="mb-4">
                      Manage devices that have been trusted for 2FA bypass. Revoke sessions you don&apos;t recognize.
                    </Text>
                    <Link href="/settings/security/sessions">
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Shield className="w-4 h-4 mr-2" />
                        View Active Sessions
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                      <AlertTriangle className="w-5 h-5" />
                      Security Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>Enable 2FA for an extra layer of security</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>Use a strong, unique password</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>Regularly review your active sessions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>Never share your backup codes with anyone</span>
                      </li>
                    </ul>
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
'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Alert } from '@/components/ui/Alert';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  Linkedin, 
  Twitter,
  Edit3,
  Save,
  X,
  Trophy,
  Zap,
  Calendar,
  Target,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface ProfileData {
  name: string;
  phone: string;
  bio: string;
  linkedinUrl: string;
  twitterUrl: string;
  websiteUrl: string;
}

function ProfileContent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    phone: '',
    bio: '',
    linkedinUrl: '',
    twitterUrl: '',
    websiteUrl: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        
        setUserProfile(data.user);
        setProfileData({
          name: data.user.name || '',
          phone: data.user.phone || '',
          bio: data.user.bio || '',
          linkedinUrl: data.user.linkedinUrl || '',
          twitterUrl: data.user.twitterUrl || '',
          websiteUrl: data.user.websiteUrl || ''
        });
      } catch (error) {
        logger.error('Failed to fetch profile:', error);
        setMessage({ type: 'error', text: 'Failed to load profile data' });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const data = await response.json();
      setUserProfile(data.user);
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      logger.error('Failed to update profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      name: userProfile?.name || '',
      phone: userProfile?.phone || '',
      bio: userProfile?.bio || '',
      linkedinUrl: userProfile?.linkedinUrl || '',
      twitterUrl: userProfile?.twitterUrl || '',
      websiteUrl: userProfile?.websiteUrl || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        </div>
      </DashboardLayout>
    );
  }

  const userInitial = profileData.name?.charAt(0).toUpperCase() || 'F';
  const memberSince = new Date(userProfile?.createdAt).toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long' 
  });

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Heading as="h1" className="mb-2">My Profile</Heading>
          <Text color="muted">Manage your personal information and startup details</Text>
        </div>

        {/* Message Alert */}
        {message.text && (
          <Alert 
            variant={message.type === 'error' ? 'error' : 'success'} 
            className="mb-6"
          >
            {message.text}
          </Alert>
        )}

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar and Basic Info */}
            <div className="flex items-start gap-6">
              <Avatar 
                size="xl" 
                fallback={userInitial}
                src={user?.user_metadata?.avatar_url}
              />
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        placeholder="Your full name"
                      />
                    ) : (
                      <Text>{profileData.name || 'Not provided'}</Text>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email
                    </label>
                    <Text color="muted">{user?.email}</Text>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="Your phone number"
                      />
                    ) : (
                      <Text>{profileData.phone || 'Not provided'}</Text>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Member Since
                    </label>
                    <Text color="muted">{memberSince}</Text>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Tell us about yourself and your entrepreneurial journey..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                      rows={4}
                    />
                  ) : (
                    <Text>{profileData.bio || 'No bio added yet'}</Text>
                  )}
                </div>

                {/* Social Links */}
                <div>
                  <label className="block text-sm font-medium mb-2">Social Links</label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-gray-600" />
                      {isEditing ? (
                        <Input
                          value={profileData.linkedinUrl}
                          onChange={(e) => setProfileData({ ...profileData, linkedinUrl: e.target.value })}
                          placeholder="LinkedIn profile URL"
                          className="flex-1"
                        />
                      ) : (
                        <Text>{profileData.linkedinUrl || 'Not connected'}</Text>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Twitter className="w-4 h-4 text-gray-600" />
                      {isEditing ? (
                        <Input
                          value={profileData.twitterUrl}
                          onChange={(e) => setProfileData({ ...profileData, twitterUrl: e.target.value })}
                          placeholder="Twitter profile URL"
                          className="flex-1"
                        />
                      ) : (
                        <Text>{profileData.twitterUrl || 'Not connected'}</Text>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-600" />
                      {isEditing ? (
                        <Input
                          value={profileData.websiteUrl}
                          onChange={(e) => setProfileData({ ...profileData, websiteUrl: e.target.value })}
                          placeholder="Personal website URL"
                          className="flex-1"
                        />
                      ) : (
                        <Text>{profileData.websiteUrl || 'Not added'}</Text>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Startup Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Startup Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Startup Name
                </label>
                <Text>{userProfile?.portfolio?.startupName || 'Not set yet'}</Text>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Target Market
                </label>
                <Text>{userProfile?.portfolio?.targetMarket?.description || 'Not defined yet'}</Text>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline"
                onClick={() => router.push('/portfolio')}
              >
                View Full Portfolio →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Journey Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle>Journey Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <Text className="font-heading text-2xl font-bold">
                  {userProfile?.totalXP || 0}
                </Text>
                <Text size="sm" color="muted">Total XP</Text>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <Text className="font-heading text-2xl font-bold">
                  {userProfile?.badges?.length || 0}
                </Text>
                <Text size="sm" color="muted">Badges Earned</Text>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <Text className="font-heading text-2xl font-bold">
                  Day {userProfile?.currentDay || 1}
                </Text>
                <Text size="sm" color="muted">Current Progress</Text>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <Text className="font-heading text-2xl font-bold">
                  {userProfile?.currentStreak || 0}
                </Text>
                <Text size="sm" color="muted">Day Streak</Text>
              </div>
            </div>
            
            {/* Badges Display */}
            {userProfile?.badges && userProfile.badges.length > 0 && (
              <div className="mt-6">
                <Text weight="medium" className="mb-3">Recent Badges</Text>
                <div className="flex flex-wrap gap-2">
                  {userProfile.badges.slice(0, 5).map((badge: string) => (
                    <Badge key={badge} variant="outline" size="lg">
                      {badge}
                    </Badge>
                  ))}
                  {userProfile.badges.length > 5 && (
                    <Badge variant="default" size="lg">
                      +{userProfile.badges.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
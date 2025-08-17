'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Heading } from '../components/ui/Typography';
import { Text } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';
import { CardContent } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { TabsContent } from '../components/ui/Tabs';
import { TabsList } from '../components/ui/Tabs';
import { TabsTrigger } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { XPHistoryView } from '../components/gamification/XPHistoryView';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { XPAnimation } from '../components/gamification/XPAnimation';
import { BadgeUnlockNotification } from '../components/gamification/BadgeUnlockNotification';
import { useXPSystem } from '../hooks/useXPSystem';
import { 
  Zap, 
  Trophy,
  TrendingUp,
  Award,
  Star,
  Target,
  Calendar,
  Users
} from 'lucide-react';
import { calculateLevel, getLevelTitle } from '../lib/xp';
import { Badge } from '../components/ui/Badge';

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [xpHistory, setXPHistory] = useState<any>(null);
  const [showBadgeNotification, setShowBadgeNotification] = useState(false);
  const [currentBadgeNotification, setCurrentBadgeNotification] = useState<string | null>(null);
  
  const {
    loading,
    xpAnimation,
    fetchXPHistory,
    hideXPAnimation,
    getNextBadgeNotification,
    hasPendingBadges,
  } = useXPSystem();

  const loadXPHistory = useCallback(async () => {
    try {
      const data = await fetchXPHistory();
      setXPHistory(data);
    } catch (error) {
      console.error('Error loading XP history:', error);
    }
  }, [fetchXPHistory]);

  useEffect(() => {
    loadXPHistory();
  }, [loadXPHistory]);

  useEffect(() => {
    // Check for pending badge notifications
    if (!showBadgeNotification && hasPendingBadges) {
      const nextBadge = getNextBadgeNotification();
      if (nextBadge) {
        setCurrentBadgeNotification(nextBadge);
        setShowBadgeNotification(true);
      }
    }
  }, [showBadgeNotification, hasPendingBadges, getNextBadgeNotification]);

  const handleBadgeNotificationClose = () => {
    setShowBadgeNotification(false);
    setCurrentBadgeNotification(null);
  };

  if (!xpHistory && loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <Text>Loading gamification data...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const stats = xpHistory?.stats || {
    totalXP: 0,
    currentLevel: 1,
    levelTitle: 'Startup Dreamer',
    levelProgress: { current: 0, required: 100, percentage: 0 },
    currentStreak: 0,
    currentDay: 1,
    totalBadges: 0,
    xpLastWeek: 0,
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Gamification & Achievements
                </Heading>
                <Text className="text-gray-600">
                  Track your progress, earn XP, and unlock achievement badges
                </Text>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <Badge variant="warning">
                    Level {stats.currentLevel}
                  </Badge>
                </div>
                <Text className="text-3xl font-bold mb-1">
                  {stats.totalXP.toLocaleString()}
                </Text>
                <Text size="sm" color="muted">Total XP Earned</Text>
                <Text size="xs" className="text-yellow-600 font-medium mt-1">
                  {stats.levelTitle}
                </Text>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <Text size="sm" color="muted">Streak</Text>
                </div>
                <Text className="text-3xl font-bold mb-1">
                  {stats.currentStreak}
                </Text>
                <Text size="sm" color="muted">Day Streak</Text>
                <Text size="xs" className="text-orange-600 font-medium mt-1">
                  +{stats.xpLastWeek} XP this week
                </Text>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                  <Text size="sm" color="muted">Badges</Text>
                </div>
                <Text className="text-3xl font-bold mb-1">
                  {stats.totalBadges}
                </Text>
                <Text size="sm" color="muted">Badges Earned</Text>
                <Text size="xs" className="text-purple-600 font-medium mt-1">
                  {20 - stats.totalBadges} more to unlock
                </Text>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <Text size="sm" color="muted">Progress</Text>
                </div>
                <Text className="text-3xl font-bold mb-1">
                  Day {stats.currentDay}
                </Text>
                <Text size="sm" color="muted">Current Day</Text>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.currentDay / 30) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for different views */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="history">XP History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Level Progress */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardContent className="p-6">
                      <Heading as="h3" variant="h5" className="mb-4">
                        Level Progress
                      </Heading>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                                {stats.currentLevel}
                              </div>
                              <div>
                                <Text className="font-bold text-lg">
                                  {stats.levelTitle}
                                </Text>
                                <Text size="sm" color="muted">
                                  Level {stats.currentLevel}
                                </Text>
                              </div>
                            </div>
                            <div className="text-right">
                              <Text className="font-bold">
                                {stats.levelProgress.current} / {stats.levelProgress.required} XP
                              </Text>
                              <Text size="sm" color="muted">
                                To next level
                              </Text>
                            </div>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                              style={{ width: `${stats.levelProgress.percentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Recent XP gains */}
                        <div>
                          <Text className="font-medium mb-3">Recent XP Gains</Text>
                          <div className="space-y-2">
                            {xpHistory?.events.slice(0, 5).map((event: any) => (
                              <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <Text size="sm">{event.description}</Text>
                                <Badge variant="warning" size="sm">
                                  +{event.points} XP
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <Heading as="h3" variant="h5" className="mb-4">
                        Quick Stats
                      </Heading>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Text size="sm" color="muted">XP This Week</Text>
                          <Text className="font-bold">{stats.xpLastWeek}</Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text size="sm" color="muted">Longest Streak</Text>
                          <Text className="font-bold">{stats.currentStreak} days</Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text size="sm" color="muted">Badges Earned</Text>
                          <Text className="font-bold">{stats.totalBadges} / 20</Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <Text size="sm" color="muted">Journey Progress</Text>
                          <Text className="font-bold">{Math.round((stats.currentDay / 30) * 100)}%</Text>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="badges" className="mt-6">
              <BadgeGrid
                earnedBadges={xpHistory?.stats.badges || []}
                userStats={{
                  currentDay: stats.currentDay,
                  currentStreak: stats.currentStreak,
                  totalXP: stats.totalXP,
                  communityPosts: 0, // TODO: Get from API
                  helpGiven: 0, // TODO: Get from API
                  perfectDays: 0, // TODO: Get from API
                  joinedAt: new Date(), // TODO: Get from API
                }}
                variant="full"
              />
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <XPHistoryView
                events={xpHistory?.events || []}
                totalXP={stats.totalXP}
                currentLevel={stats.currentLevel}
                levelProgress={stats.levelProgress}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* XP Animation */}
        <XPAnimation
          show={xpAnimation.show}
          points={xpAnimation.points}
          description={xpAnimation.description}
          levelUp={xpAnimation.levelUp}
          onComplete={hideXPAnimation}
        />

        {/* Badge Unlock Notification */}
        <BadgeUnlockNotification
          show={showBadgeNotification}
          badgeId={currentBadgeNotification as any}
          onClose={handleBadgeNotificationClose}
          onComplete={handleBadgeNotificationClose}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
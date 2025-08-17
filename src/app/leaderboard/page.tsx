'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { 
  Trophy, 
  Medal, 
  Award, 
  Zap, 
  Calendar, 
  TrendingUp,
  Crown,
  Star,
  Target,
  Users
} from 'lucide-react';

// Mock data - in real app, fetch from API
const mockLeaderboardData = {
  xp: [
    { rank: 1, name: 'Rahul Sharma', xp: 2450, level: 12, badge: 'Launch Legend', streak: 28 },
    { rank: 2, name: 'Priya Patel', xp: 2380, level: 11, badge: 'MVP Master', streak: 25 },
    { rank: 3, name: 'Arjun Kumar', xp: 2250, level: 11, badge: 'Researcher', streak: 22 },
    { rank: 4, name: 'Sneha Gupta', xp: 2100, level: 10, badge: 'Brand Builder', streak: 20 },
    { rank: 5, name: 'Vikram Singh', xp: 1950, level: 9, badge: 'Compliance Hero', streak: 18 },
  ],
  streak: [
    { rank: 1, name: 'Rahul Sharma', streak: 28, xp: 2450, completion: 93 },
    { rank: 2, name: 'Priya Patel', streak: 25, xp: 2380, completion: 83 },
    { rank: 3, name: 'Arjun Kumar', streak: 22, xp: 2250, completion: 73 },
    { rank: 4, name: 'Sneha Gupta', streak: 20, xp: 2100, completion: 67 },
    { rank: 5, name: 'Vikram Singh', streak: 18, xp: 1950, completion: 60 },
  ],
  completion: [
    { rank: 1, name: 'Rahul Sharma', completion: 93, daysCompleted: 28, xp: 2450 },
    { rank: 2, name: 'Priya Patel', completion: 83, daysCompleted: 25, xp: 2380 },
    { rank: 3, name: 'Arjun Kumar', completion: 73, daysCompleted: 22, xp: 2250 },
    { rank: 4, name: 'Sneha Gupta', completion: 67, daysCompleted: 20, xp: 2100 },
    { rank: 5, name: 'Vikram Singh', completion: 60, daysCompleted: 18, xp: 1950 },
  ]
};

const currentUser = {
  rank: 12,
  name: 'You',
  xp: 850,
  level: 4,
  streak: 6,
  completion: 20
};

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('xp');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="mb-2">
              Leaderboard
            </Heading>
            <Text color="muted">
              See how you rank against other founders in the community
            </Text>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <Heading as="h3" variant="h4" className="mb-1">
                  #{currentUser.rank}
                </Heading>
                <Text color="muted">Your Current Rank</Text>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <Heading as="h3" variant="h4" className="mb-1">
                  {currentUser.xp} XP
                </Heading>
                <Text color="muted">Total Experience</Text>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <Heading as="h3" variant="h4" className="mb-1">
                  {currentUser.completion}%
                </Heading>
                <Text color="muted">Journey Complete</Text>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Tabs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Community Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="xp" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Experience Points
                  </TabsTrigger>
                  <TabsTrigger value="streak" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Daily Streak
                  </TabsTrigger>
                  <TabsTrigger value="completion" className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Journey Progress
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="xp" className="space-y-4">
                  {mockLeaderboardData.xp.map((user) => (
                    <Card key={user.rank} className={`transition-all hover:shadow-md ${getBackgroundColor(user.rank)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {getRankIcon(user.rank)}
                              <Avatar fallback={user.name.charAt(0)} />
                            </div>
                            <div>
                              <Text weight="medium">{user.name}</Text>
                              <Text size="sm" color="muted">Level {user.level}</Text>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <Text weight="bold" className="text-lg">{user.xp.toLocaleString()}</Text>
                              <Text size="sm" color="muted">XP</Text>
                            </div>
                            <div className="text-center">
                              <Text weight="bold" className="text-lg">{user.streak}</Text>
                              <Text size="sm" color="muted">Day Streak</Text>
                            </div>
                            <Badge variant="outline">{user.badge}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="streak" className="space-y-4">
                  {mockLeaderboardData.streak.map((user) => (
                    <Card key={user.rank} className={`transition-all hover:shadow-md ${getBackgroundColor(user.rank)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {getRankIcon(user.rank)}
                              <Avatar fallback={user.name.charAt(0)} />
                            </div>
                            <div>
                              <Text weight="medium">{user.name}</Text>
                              <Text size="sm" color="muted">{user.completion}% Complete</Text>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="flex items-center gap-1">
                                <span className="text-2xl">🔥</span>
                                <Text weight="bold" className="text-lg">{user.streak}</Text>
                              </div>
                              <Text size="sm" color="muted">Day Streak</Text>
                            </div>
                            <div className="text-center">
                              <Text weight="bold" className="text-lg">{user.xp.toLocaleString()}</Text>
                              <Text size="sm" color="muted">Total XP</Text>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="completion" className="space-y-4">
                  {mockLeaderboardData.completion.map((user) => (
                    <Card key={user.rank} className={`transition-all hover:shadow-md ${getBackgroundColor(user.rank)}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {getRankIcon(user.rank)}
                              <Avatar fallback={user.name.charAt(0)} />
                            </div>
                            <div>
                              <Text weight="medium">{user.name}</Text>
                              <Text size="sm" color="muted">{user.daysCompleted}/30 Days</Text>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <Text weight="bold" className="text-lg">{user.completion}%</Text>
                              <Text size="sm" color="muted">Complete</Text>
                            </div>
                            <div className="text-center">
                              <Text weight="bold" className="text-lg">{user.xp.toLocaleString()}</Text>
                              <Text size="sm" color="muted">Total XP</Text>
                            </div>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${user.completion}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>

              {/* Current User Position */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Text weight="medium" className="mb-4">Your Position</Text>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 flex items-center justify-center font-bold text-blue-600">#{currentUser.rank}</span>
                          <Avatar fallback={currentUser.name.charAt(0)} />
                        </div>
                        <div>
                          <Text weight="medium">{currentUser.name}</Text>
                          <Text size="sm" color="muted">Level {currentUser.level}</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <Text weight="bold" className="text-lg">{currentUser.xp.toLocaleString()}</Text>
                          <Text size="sm" color="muted">XP</Text>
                        </div>
                        <div className="text-center">
                          <Text weight="bold" className="text-lg">{currentUser.streak}</Text>
                          <Text size="sm" color="muted">Day Streak</Text>
                        </div>
                        <Badge variant="outline">Keep Going!</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
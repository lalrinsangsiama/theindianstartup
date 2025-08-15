'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SessionManager } from '@/components/auth/SessionManager';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { JourneyProgress, XPProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, BookOpen, Trophy, Users, Loader2, TrendingUp, Calendar, Zap, Target } from 'lucide-react';

function DashboardContent() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        
        if (!data.hasCompletedOnboarding) {
          router.push('/onboarding');
          return;
        }
        
        setUserProfile(data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  const userName = userProfile.name || user?.email?.split('@')[0] || 'Founder';
  const currentDay = userProfile.currentDay || 1;
  const totalXP = userProfile.totalXP || 0;
  const currentStreak = userProfile.currentStreak || 0;
  const badges = userProfile.badges || [];
  const completedDays = []; // This would come from progress data

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Heading as="h1" className="mb-2">
            Welcome back, {userName}!
          </Heading>
          <Text color="muted">
            {userProfile.portfolio?.startupName || 'Your Startup'} • Day {currentDay} of 30
          </Text>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-gray-600" />
                <Badge size="sm" variant="default">Progress</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {currentDay}/30
              </Text>
              <Text size="sm" color="muted">Days Completed</Text>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-black transition-all duration-500"
                    style={{ width: `${(currentDay / 30) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <Text className="font-heading text-lg font-bold text-yellow-500">+{totalXP}</Text>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {totalXP}
              </Text>
              <Text size="sm" color="muted">Total XP</Text>
              <div className="mt-3">
                <Text size="xs" color="muted">Level {Math.floor(totalXP / 100) + 1}</Text>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <div className="text-2xl">🔥</div>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {currentStreak}
              </Text>
              <Text size="sm" color="muted">Day Streak</Text>
              <div className="mt-3">
                <Text size="xs" color="muted">
                  {currentStreak > 0 ? 'Keep it up!' : 'Start today!'}
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 hover:border-black transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-purple-500" />
                <Badge size="sm" variant="secondary">{badges.length} Total</Badge>
              </div>
              <Text className="font-heading text-3xl font-bold mb-1">
                {badges.length}
              </Text>
              <Text size="sm" color="muted">Badges Earned</Text>
              <div className="mt-3">
                <div className="flex -space-x-2">
                  {badges.slice(0, 3).map((badge, i) => (
                    <div key={i} className="w-6 h-6 bg-gray-200 rounded-full border-2 border-white" />
                  ))}
                  {badges.length > 3 && (
                    <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                      <Text size="xs">+{badges.length - 3}</Text>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Focus & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Journey Progress */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-black shadow-lg">
              <CardHeader className="bg-black text-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Today's Mission: Day {currentDay}</CardTitle>
                  <Badge variant="secondary" size="lg">
                    {currentStreak > 0 ? `🔥 ${currentStreak} day streak` : '🎯 Start today'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-6">
                  <Heading as="h3" variant="h5" className="mb-2">
                    Market Research & Competitor Analysis
                  </Heading>
                  <Text color="muted" className="mb-4">
                    Deep dive into your market landscape and identify key competitors. 
                    This research forms the foundation of your go-to-market strategy.
                  </Text>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <Text size="sm">3 key tasks</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <Text size="sm">45-60 minutes</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <Text size="sm">+50 XP reward</Text>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <Text weight="medium" className="mb-3">Your 30-Day Progress</Text>
                  <JourneyProgress 
                    currentDay={currentDay}
                    completedDays={completedDays}
                    onDayClick={(day) => router.push(`/journey/day/${day}`)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Link href={`/journey/day/${currentDay}`} className="flex-1">
                    <Button variant="primary" className="w-full group" size="lg">
                      <span>Start Today's Lesson</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/journey">
                    <Button variant="outline" size="lg">
                      View Full Journey
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* XP & Achievements */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>XP Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <XPProgressBar 
                  currentXP={totalXP}
                  levelXP={Math.ceil(totalXP / 100) * 100 + 100}
                  level={Math.floor(totalXP / 100) + 1}
                />
                <Text size="sm" color="muted" className="mt-2">
                  {Math.ceil(totalXP / 100) * 100 + 100 - totalXP} XP to reach Level {Math.floor(totalXP / 100) + 2}
                </Text>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🚀</div>
                      <div>
                        <Text weight="medium">Starter</Text>
                        <Text size="sm" color="muted">Completed Day 1</Text>
                      </div>
                    </div>
                    <Badge size="sm">NEW</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">📚</div>
                      <div>
                        <Text weight="medium">Researcher</Text>
                        <Text size="sm" color="muted">Completed market research</Text>
                      </div>
                    </div>
                    <Badge size="sm">NEW</Badge>
                  </div>
                </div>
                
                <Link href="/achievements" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Badges
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Heading as="h2" variant="h4" className="mb-4">
            Quick Actions
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="interactive" className="h-full group">
              <Link href="/community" className="block h-full">
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <Text weight="medium" className="mb-1">Join Community</Text>
                  <Text size="sm" color="muted">Connect with other founders</Text>
                </CardContent>
              </Link>
            </Card>
            
            <Card variant="interactive" className="h-full group">
              <Link href="/portfolio" className="block h-full">
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <Text weight="medium" className="mb-1">View Portfolio</Text>
                  <Text size="sm" color="muted">Track your startup progress</Text>
                </CardContent>
              </Link>
            </Card>
            
            <Card variant="interactive" className="h-full group">
              <Link href="/resources" className="block h-full">
                <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <Text weight="medium" className="mb-1">Resources</Text>
                  <Text size="sm" color="muted">Templates & tools</Text>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </div>
      <SessionManager />
    </DashboardLayout>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute requireSubscription={true}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
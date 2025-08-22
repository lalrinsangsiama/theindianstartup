'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { logger } from '@/lib/logger';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Alert } from '@/components/ui/Alert';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { JourneyProgress, StreakCounter } from '@/components/progress';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/lib/utils';
import { JourneySearchParams } from '@/components/journey/JourneySearchParams';
import { 
  Calendar,
  ChevronRight,
  Clock,
  Zap,
  Lock,
  CheckCircle2,
  PlayCircle,
  BookOpen,
  Target,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Loader2,
} from 'lucide-react';

// Fallback data structure for when API is loading or fails
const DEFAULT_JOURNEY_DATA = {
  currentDay: 7,
  completedDays: [1, 2, 3, 4, 5, 6],
  currentStreak: 6,
  longestStreak: 6,
  totalXP: 350,
  todayCompleted: false,
  weeks: [
    {
      week: 1,
      title: "Foundation Week",
      description: "Set goals, validate ideas, and understand the market",
      days: [
        { day: 1, title: "Start Your Journey", xp: 50, duration: "45 min", completed: true },
        { day: 2, title: "Market Research", xp: 50, duration: "60 min", completed: true },
        { day: 3, title: "Customer Discovery", xp: 50, duration: "45 min", completed: true },
        { day: 4, title: "Value Proposition", xp: 50, duration: "30 min", completed: true },
        { day: 5, title: "Business Model", xp: 50, duration: "45 min", completed: true },
        { day: 6, title: "Brand Identity", xp: 50, duration: "60 min", completed: true },
        { day: 7, title: "Week Review & Legal", xp: 100, duration: "30 min", completed: false },
      ]
    },
    {
      week: 2,
      title: "Building Blocks",
      description: "Create your MVP and set up business foundations",
      days: [
        { day: 8, title: "Logo & Visual Identity", xp: 50, duration: "45 min", completed: false },
        { day: 9, title: "Legal Entity Deep Dive", xp: 50, duration: "60 min", completed: false },
        { day: 10, title: "Compliance Roadmap", xp: 50, duration: "45 min", completed: false },
        { day: 11, title: "MVP Planning", xp: 50, duration: "45 min", completed: false },
        { day: 12, title: "MVP Development I", xp: 50, duration: "90 min", completed: false },
        { day: 13, title: "MVP Development II", xp: 50, duration: "90 min", completed: false },
        { day: 14, title: "Week Review & Testing", xp: 100, duration: "30 min", completed: false },
      ]
    },
    {
      week: 3,
      title: "Making it Real",
      description: "Test with users and handle registrations",
      days: [
        { day: 15, title: "User Testing Setup", xp: 50, duration: "45 min", completed: false },
        { day: 16, title: "Gather Feedback", xp: 50, duration: "60 min", completed: false },
        { day: 17, title: "Business Registration", xp: 50, duration: "90 min", completed: false },
        { day: 18, title: "GST & Tax Planning", xp: 50, duration: "60 min", completed: false },
        { day: 19, title: "Banking Setup", xp: 50, duration: "45 min", completed: false },
        { day: 20, title: "Pricing Strategy", xp: 50, duration: "45 min", completed: false },
        { day: 21, title: "Week Review & Launch Prep", xp: 100, duration: "30 min", completed: false },
      ]
    },
    {
      week: 4,
      title: "Launch Ready",
      description: "Go live and prepare for growth",
      days: [
        { day: 22, title: "Digital Presence", xp: 50, duration: "60 min", completed: false },
        { day: 23, title: "First Customer Outreach", xp: 50, duration: "45 min", completed: false },
        { day: 24, title: "Sales Process", xp: 50, duration: "45 min", completed: false },
        { day: 25, title: "DPIIT Registration", xp: 50, duration: "60 min", completed: false },
        { day: 26, title: "Startup India Benefits", xp: 50, duration: "45 min", completed: false },
        { day: 27, title: "Investor Pitch Basics", xp: 50, duration: "60 min", completed: false },
        { day: 28, title: "Financial Projections", xp: 50, duration: "45 min", completed: false },
        { day: 29, title: "Pitch Deck Creation", xp: 75, duration: "90 min", completed: false },
        { day: 30, title: "Launch Day!", xp: 150, duration: "60 min", completed: false },
      ]
    }
  ]
};

export default function P1JourneyPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [journeyData, setJourneyData] = useState(DEFAULT_JOURNEY_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPurchaseSuccess, setShowPurchaseSuccess] = useState(false);

  const handlePurchaseSuccess = (success: boolean) => {
    if (success) {
      setShowPurchaseSuccess(true);
      // Remove the parameter from URL
      router.replace('/journey/p1');
    }
  };

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError('');
        
        // Fetch P1 progress using new API
        const response = await fetch('/api/products/p1/progress', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch P1 progress: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.hasAccess || !data.progress) {
          // User doesn't have P1 access, use default data
          setJourneyData(DEFAULT_JOURNEY_DATA);
          return;
        }
        
        const progress = data.progress;
        
        // Update weeks data with actual completion status
        const updatedWeeks = DEFAULT_JOURNEY_DATA.weeks.map(week => ({
          ...week,
          days: week.days.map(day => ({
            ...day,
            completed: progress.completedDays.includes(day.day)
          }))
        }));
        
        // Transform API data to match our journey data structure
        const transformedData = {
          currentDay: progress.currentDay,
          completedDays: progress.completedDays,
          currentStreak: progress.currentStreak,
          longestStreak: progress.longestStreak,
          totalXP: progress.totalXP,
          todayCompleted: progress.todayCompleted,
          weeks: updatedWeeks
        };
        
        setJourneyData(transformedData);
      } catch (err) {
        logger.error('Failed to fetch user progress:', err);
        setError('Failed to load your progress. Using default data.');
        // Keep default data on error - don't block the UI
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we have a user and haven't loaded yet
    if (user && isLoading) {
      fetchUserProgress();
    } else if (!user) {
      setIsLoading(false);
    }
  }, [user, isLoading]);

  const handleDayClick = (day: number) => {
    if (day <= journeyData.currentDay || journeyData.completedDays.includes(day)) {
      router.push(`/journey/day/${day}`);
    }
  };

  const getWeekProgress = (week: typeof DEFAULT_JOURNEY_DATA.weeks[0]) => {
    const completedDays = week.days.filter(d => d.completed).length;
    return (completedDays / week.days.length) * 100;
  };

  if (isLoading) {
    return (
      <ProductProtectedRoute productCode="P1">
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
              <Skeleton className="h-10 w-96 mb-2" />
              <Skeleton className="h-6 w-80" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
              <Text className="ml-2">Loading your journey...</Text>
            </div>
          </div>
        </DashboardLayout>
      </ProductProtectedRoute>
    );
  }

  return (
    <ProductProtectedRoute productCode="P1">
      <DashboardLayout>
        <Suspense fallback={null}>
          <JourneySearchParams onPurchaseSuccess={handlePurchaseSuccess} />
        </Suspense>
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" className="mb-2">
              Your 30-Day Journey
            </Heading>
            <Text color="muted">
              Transform your idea into a launch-ready startup with daily guidance
            </Text>
            {showPurchaseSuccess && (
              <Alert variant="success" className="mt-4">
                🎉 Purchase successful! You now have full access to the 30-Day India Launch Sprint. Let's start your journey!
              </Alert>
            )}
            {error && (
              <Alert variant="warning" className="mt-4">
                {error}
              </Alert>
            )}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="w-8 h-8 text-blue-500" />
                  <Badge variant="default" size="lg">
                    Day {journeyData.currentDay}
                  </Badge>
                </div>
                <Heading as="h3" variant="h4" className="mb-1">
                  Current Progress
                </Heading>
                <Text color="muted">
                  {journeyData.completedDays.length} of 30 days completed
                </Text>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <StreakCounter
                  currentStreak={journeyData.currentStreak}
                  longestStreak={journeyData.longestStreak}
                  todayCompleted={journeyData.todayCompleted}
                  variant="compact"
                />
                <div className="mt-4">
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleDayClick(journeyData.currentDay)}
                  >
                    {journeyData.todayCompleted ? 'Review Today' : 'Continue Streak'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Zap className="w-8 h-8 text-yellow-500" />
                  <Text className="font-heading text-2xl font-bold">
                    {journeyData.totalXP}
                  </Text>
                </div>
                <Heading as="h3" variant="h4" className="mb-1">
                  Total XP Earned
                </Heading>
                <Text color="muted">
                  +{1500 - journeyData.totalXP} XP available
                </Text>
              </CardContent>
            </Card>
          </div>

          {/* Journey Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Journey Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <JourneyProgress
                currentDay={journeyData.currentDay}
                completedDays={journeyData.completedDays}
                onDayClick={handleDayClick}
                showDetails={false}
              />
            </CardContent>
          </Card>

          {/* Weekly Breakdown */}
          <div className="space-y-6">
            <Heading as="h2" variant="h3">
              Weekly Breakdown
            </Heading>
            
            {journeyData.weeks.map((week) => (
              <Card
                key={week.week}
                className={cn(
                  "transition-all cursor-pointer",
                  selectedWeek === week.week && "ring-2 ring-black"
                )}
                onClick={() => setSelectedWeek(week.week === selectedWeek ? null : week.week)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        Week {week.week}: {week.title}
                        {getWeekProgress(week) === 100 && (
                          <Badge variant="success" size="sm">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </CardTitle>
                      <Text color="muted" className="mt-1">
                        {week.description}
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text className="font-heading text-xl font-bold">
                        {Math.round(getWeekProgress(week))}%
                      </Text>
                      <Text size="sm" color="muted">
                        Complete
                      </Text>
                    </div>
                  </div>
                </CardHeader>

                {selectedWeek === week.week && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {week.days.map((day) => (
                        <DayCard
                          key={day.day}
                          day={day}
                          isAccessible={day.day <= journeyData.currentDay || day.completed}
                          onClick={() => handleDayClick(day.day)}
                        />
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Milestones */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Journey Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <MilestoneCard
                  title="Foundation Set"
                  description="Complete Week 1"
                  icon={Target}
                  completed={journeyData.completedDays.filter(d => d <= 7).length === 7}
                  xp={100}
                />
                <MilestoneCard
                  title="MVP Ready"
                  description="Complete Week 2"
                  icon={BookOpen}
                  completed={journeyData.completedDays.filter(d => d > 7 && d <= 14).length === 7}
                  xp={150}
                />
                <MilestoneCard
                  title="Business Registered"
                  description="Complete Week 3"
                  icon={Award}
                  completed={journeyData.completedDays.filter(d => d > 14 && d <= 21).length === 7}
                  xp={200}
                />
                <MilestoneCard
                  title="Launch Legend"
                  description="Complete all 30 days"
                  icon={Sparkles}
                  completed={journeyData.completedDays.length === 30}
                  xp={500}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProductProtectedRoute>
  );
}

function DayCard({ 
  day, 
  isAccessible, 
  onClick 
}: { 
  day: any; 
  isAccessible: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={isAccessible ? onClick : undefined}
      disabled={!isAccessible}
      className={cn(
        "p-4 rounded-lg border-2 text-left transition-all",
        isAccessible
          ? "border-gray-200 hover:border-black hover:shadow-md cursor-pointer"
          : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed",
        day.completed && "bg-green-50 border-green-200"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
            day.completed ? "bg-black text-white" : "bg-gray-200"
          )}>
            {day.day}
          </div>
          {day.completed && <CheckCircle2 className="w-5 h-5 text-green-600" />}
          {!isAccessible && <Lock className="w-5 h-5 text-gray-400" />}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <Text size="sm" color="muted">{day.duration}</Text>
        </div>
      </div>
      
      <Text weight="medium" className="mb-1">
        {day.title}
      </Text>
      
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-yellow-500" />
        <Text size="sm" color="muted">+{day.xp} XP</Text>
      </div>
    </button>
  );
}

function MilestoneCard({ 
  title, 
  description, 
  icon: Icon, 
  completed, 
  xp 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  completed: boolean; 
  xp: number;
}) {
  return (
    <div className={cn(
      "p-6 rounded-lg border-2 text-center transition-all",
      completed 
        ? "bg-black text-white border-black" 
        : "border-gray-200"
    )}>
      <Icon className={cn(
        "w-12 h-12 mx-auto mb-3",
        completed ? "text-white" : "text-gray-400"
      )} />
      <Text weight="medium" className="mb-1">
        {title}
      </Text>
      <Text size="sm" className={completed ? "text-gray-300" : "text-gray-500"}>
        {description}
      </Text>
      <div className="mt-3">
        <Badge 
          variant={completed ? "outline" : "default"} 
          size="sm"
        >
          +{xp} XP
        </Badge>
      </div>
    </div>
  );
}
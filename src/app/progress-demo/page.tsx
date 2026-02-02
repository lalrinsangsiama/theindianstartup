'use client';

import React from 'react';
import { logger } from '@/lib/logger';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { JourneyProgress, StreakCounter, XPDisplay, BadgesShowcase } from '@/components/progress';

export default function ProgressDemoPage() {
  // Mock data for demonstration
  const mockData = {
    currentDay: 7,
    completedDays: [1, 2, 3, 4, 5, 6],
    currentStreak: 6,
    longestStreak: 10,
    totalXP: 350,
    level: 3,
    levelProgress: 50,
    nextLevelXP: 100,
    todayCompleted: false,
    lastActiveDate: new Date().toISOString(),
    recentXPGains: [
      {
        id: '1',
        amount: 50,
        description: 'Completed Day 6 lesson',
        timestamp: new Date().toISOString(),
        type: 'daily' as const,
      },
      {
        id: '2',
        amount: 100,
        description: 'Week 1 Milestone',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        type: 'milestone' as const,
      },
      {
        id: '3',
        amount: 25,
        description: '5-day streak bonus',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        type: 'bonus' as const,
      },
    ],
    badges: [
      {
        id: 'starter',
        name: 'Starter',
        description: 'Complete your first day',
        icon: Rocket,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        earned: true,
        earnedDate: '2024-01-01',
        rarity: 'common' as const,
      },
      {
        id: 'researcher',
        name: 'Researcher',
        description: 'Complete market research',
        icon: BookOpen,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        earned: true,
        earnedDate: '2024-01-03',
        rarity: 'common' as const,
      },
      {
        id: 'week-warrior',
        name: 'Week Warrior',
        description: 'Complete 7 days in a row',
        icon: Trophy,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        earned: false,
        progress: 6,
        maxProgress: 7,
        rarity: 'rare' as const,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Heading as="h1" className="mb-2">
            Progress Components Showcase
          </Heading>
          <Text color="muted">
            Beautiful progress tracking components for The Indian Startup platform
          </Text>
        </div>

        {/* Journey Progress Section */}
        <section className="mb-12">
          <Heading as="h2" variant="h3" className="mb-6">
            Journey Progress
          </Heading>
          
          <div className="grid gap-8">
            {/* Grid Variant */}
            <Card>
              <CardHeader>
                <CardTitle>Grid Variant (Default)</CardTitle>
              </CardHeader>
              <CardContent>
                <JourneyProgress
                  currentDay={mockData.currentDay}
                  completedDays={mockData.completedDays}
                  onDayClick={(day) => logger.info('Clicked day:', { day })}
                />
              </CardContent>
            </Card>

            {/* Linear Variant */}
            <Card>
              <CardHeader>
                <CardTitle>Linear Variant</CardTitle>
              </CardHeader>
              <CardContent>
                <JourneyProgress
                  currentDay={mockData.currentDay}
                  completedDays={mockData.completedDays}
                  variant="linear"
                  onDayClick={(day) => logger.info('Clicked day:', { day })}
                />
              </CardContent>
            </Card>

            {/* Compact Variant */}
            <Card>
              <CardHeader>
                <CardTitle>Compact Variant</CardTitle>
              </CardHeader>
              <CardContent>
                <JourneyProgress
                  currentDay={mockData.currentDay}
                  completedDays={mockData.completedDays}
                  variant="compact"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Streak Counter Section */}
        <section className="mb-12">
          <Heading as="h2" variant="h3" className="mb-6">
            Streak Counter
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Default Variant */}
            <div>
              <Text weight="medium" className="mb-3">Default Variant</Text>
              <StreakCounter
                currentStreak={mockData.currentStreak}
                longestStreak={mockData.longestStreak}
                todayCompleted={mockData.todayCompleted}
              />
            </div>

            {/* Compact Variant */}
            <div>
              <Text weight="medium" className="mb-3">Compact Variant</Text>
              <StreakCounter
                currentStreak={mockData.currentStreak}
                longestStreak={mockData.longestStreak}
                variant="compact"
              />
            </div>

            {/* With Today Completed */}
            <div>
              <Text weight="medium" className="mb-3">Today Completed</Text>
              <StreakCounter
                currentStreak={7}
                longestStreak={mockData.longestStreak}
                todayCompleted={true}
              />
            </div>
          </div>

          {/* Detailed Variant */}
          <div className="mt-8">
            <Text weight="medium" className="mb-3">Detailed Variant</Text>
            <div className="max-w-md">
              <StreakCounter
                currentStreak={mockData.currentStreak}
                longestStreak={mockData.longestStreak}
                lastActiveDate={mockData.lastActiveDate}
                todayCompleted={mockData.todayCompleted}
                variant="detailed"
              />
            </div>
          </div>
        </section>

        {/* XP Display Section */}
        <section className="mb-12">
          <Heading as="h2" variant="h3" className="mb-6">
            XP Display
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Default Variant */}
            <div>
              <Text weight="medium" className="mb-3">Default Variant</Text>
              <XPDisplay
                currentXP={mockData.levelProgress}
                totalXP={mockData.totalXP}
                level={mockData.level}
                levelProgress={mockData.levelProgress}
                nextLevelXP={mockData.nextLevelXP}
                recentXPGains={mockData.recentXPGains}
              />
            </div>

            {/* Compact Variant */}
            <div>
              <Text weight="medium" className="mb-3">Compact Variant</Text>
              <XPDisplay
                currentXP={mockData.levelProgress}
                totalXP={mockData.totalXP}
                level={mockData.level}
                variant="compact"
              />
            </div>

            {/* Without Recent Gains */}
            <div>
              <Text weight="medium" className="mb-3">Without Recent Activity</Text>
              <XPDisplay
                currentXP={mockData.levelProgress}
                totalXP={mockData.totalXP}
                level={mockData.level}
                levelProgress={mockData.levelProgress}
                nextLevelXP={mockData.nextLevelXP}
              />
            </div>
          </div>

          {/* Detailed Variant */}
          <div className="mt-8">
            <Text weight="medium" className="mb-3">Detailed Variant</Text>
            <div className="max-w-2xl">
              <XPDisplay
                currentXP={mockData.levelProgress}
                totalXP={mockData.totalXP}
                level={mockData.level}
                levelProgress={mockData.levelProgress}
                nextLevelXP={mockData.nextLevelXP}
                recentXPGains={mockData.recentXPGains}
                variant="detailed"
              />
            </div>
          </div>
        </section>

        {/* Badges Showcase Section */}
        <section className="mb-12">
          <Heading as="h2" variant="h3" className="mb-6">
            Badges Showcase
          </Heading>
          
          {/* Grid Variant */}
          <div className="mb-8">
            <Text weight="medium" className="mb-3">Grid Variant (Default)</Text>
            <BadgesShowcase badges={mockData.badges} />
          </div>

          {/* List Variant */}
          <div className="mb-8">
            <Text weight="medium" className="mb-3">List Variant</Text>
            <div className="max-w-2xl">
              <BadgesShowcase 
                badges={mockData.badges} 
                variant="list"
              />
            </div>
          </div>

          {/* Compact Variant */}
          <div className="mb-8">
            <Text weight="medium" className="mb-3">Compact Variant</Text>
            <BadgesShowcase 
              badges={mockData.badges} 
              variant="compact"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

// Import icons used in badges
import { Rocket, BookOpen, Trophy } from 'lucide-react';
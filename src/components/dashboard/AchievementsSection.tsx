'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Trophy, Star, TrendingUp, ChevronRight, Loader2 } from 'lucide-react';
import { AchievementCard } from '@/components/achievements/AchievementCard';
import { getNextAchievements, Achievement } from '@/lib/achievements';

interface DisplayAchievement extends Achievement {
  isUnlocked: boolean;
  progress?: number;
  target?: number;
}

interface AchievementsSectionProps {
  userId: string;
  totalXP: number;
  currentLevel: number;
  badges: string[];
}

export function AchievementsSection({ 
  userId, 
  totalXP, 
  currentLevel,
  badges 
}: AchievementsSectionProps) {
  const [achievements, setAchievements] = useState<{
    unlocked: DisplayAchievement[];
    nextUp: DisplayAchievement[];
    stats: any;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      if (response.ok) {
        const data = await response.json();
        
        // Get next 3 achievable achievements
        const nextAchievements = getNextAchievements(data.stats, badges);
        
        setAchievements({
          unlocked: data.achievements.unlocked.slice(0, 3) as DisplayAchievement[],
          nextUp: nextAchievements as DisplayAchievement[],
          stats: data.stats
        });
      }
    } catch (error) {
      logger.error('Failed to fetch achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextLevelXP = (currentLevel + 1) * 1000;
  const currentLevelXP = currentLevel * 1000;
  const progressToNextLevel = ((totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* XP and Level Progress */}
      <Card className="border-2 border-yellow-500 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Level {currentLevel} Founder</CardTitle>
                <Text size="sm" color="muted">
                  {totalXP.toLocaleString()} XP Total
                </Text>
              </div>
            </div>
            <Badge className="bg-yellow-100 text-yellow-800" size="lg">
              {badges.length} Achievements
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <Text size="sm" weight="medium">Progress to Level {currentLevel + 1}</Text>
              <Text size="sm" color="muted">
                {totalXP - currentLevelXP} / {nextLevelXP - currentLevelXP} XP
              </Text>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full h-3 transition-all duration-500"
                style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              />
            </div>
          </div>

          {/* Recent Achievements */}
          {achievements?.unlocked && achievements.unlocked.length > 0 && (
            <div className="mt-6">
              <Text weight="medium" className="mb-3">Recent Achievements</Text>
              <div className="flex gap-3">
                {achievements.unlocked.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="flex flex-col items-center gap-1 p-3 bg-white rounded-lg border-2 border-yellow-300"
                  >
                    <div className="text-2xl">{achievement.badge}</div>
                    <Text size="xs" weight="medium" className="text-center">
                      {achievement.title}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Achievements */}
      {achievements?.nextUp && achievements.nextUp.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <Text weight="semibold">Next Achievements</Text>
            </div>
            <Link href="/achievements">
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.nextUp.map((achievement: DisplayAchievement) => (
              <AchievementCard
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                badge={achievement.badge}
                xp={achievement.xp}
                isUnlocked={false}
                progress={achievement.progress}
                target={achievement.target}
                category={achievement.category}
              />
            ))}
          </div>
        </div>
      )}

      {/* Achievement Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <Text size="xl" weight="bold">{badges.length}</Text>
            <Text size="sm" color="muted">Achievements</Text>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
            <Text size="xl" weight="bold">{totalXP.toLocaleString()}</Text>
            <Text size="sm" color="muted">Total XP</Text>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 text-2xl">🔥</div>
            <Text size="xl" weight="bold">{achievements?.stats?.streakDays || 0}</Text>
            <Text size="sm" color="muted">Day Streak</Text>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-6 h-6 mx-auto mb-2 text-2xl">📚</div>
            <Text size="xl" weight="bold">{achievements?.stats?.lessonsCompleted || 0}</Text>
            <Text size="sm" color="muted">Lessons Done</Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AchievementsSection;
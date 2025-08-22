'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Text } from '@/components/ui/Typography';
import { Heading } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Flame, 
  Calendar, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  AlertCircle,
  Trophy,
  Circle,
  CheckCircle2
} from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: string;
  todayCompleted?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export function StreakCounter({
  currentStreak,
  longestStreak,
  lastActiveDate,
  todayCompleted = false,
  variant = 'default',
  className,
}: StreakCounterProps) {
  const isStreakActive = currentStreak > 0;
  const isNewRecord = currentStreak === longestStreak && currentStreak > 0;
  
  if (variant === 'compact') {
    return <CompactStreak currentStreak={currentStreak} isActive={isStreakActive} />;
  }

  if (variant === 'detailed') {
    return (
      <DetailedStreak 
        currentStreak={currentStreak}
        longestStreak={longestStreak}
        lastActiveDate={lastActiveDate}
        todayCompleted={todayCompleted}
        isNewRecord={isNewRecord}
        className={className}
      />
    );
  }

  // Default variant
  return (
    <Card className={cn("border-2", isStreakActive ? "border-orange-400" : "border-gray-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center",
              isStreakActive ? "bg-orange-100" : "bg-gray-100"
            )}>
              <Flame className={cn(
                "w-6 h-6",
                isStreakActive ? "text-orange-500" : "text-gray-400"
              )} />
            </div>
            <div>
              <Text weight="medium">Daily Streak</Text>
              {isNewRecord && (
                <Badge size="sm" variant="warning">New Record!</Badge>
              )}
            </div>
          </div>
          {todayCompleted && (
            <Badge variant="success" size="sm">
              <Zap className="w-3 h-3 mr-1" />
              Today Done
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <Text className="font-heading text-4xl font-bold">
                {currentStreak}
              </Text>
              <Text color="muted">
                {currentStreak === 1 ? 'day' : 'days'}
              </Text>
            </div>
            {!isStreakActive && (
              <Text size="sm" color="muted" className="mt-1">
                Start today to begin your streak!
              </Text>
            )}
          </div>

          {longestStreak > 0 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <Text size="sm" color="muted">Longest streak</Text>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <Text weight="medium">{longestStreak} days</Text>
              </div>
            </div>
          )}

          {/* Streak visualization */}
          {isStreakActive && (
            <StreakVisualizer streak={currentStreak} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CompactStreak({ currentStreak, isActive }: { currentStreak: number; isActive: boolean }) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
      isActive ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"
    )}>
      <Flame className={cn("w-4 h-4", isActive && "animate-pulse")} />
      <Text size="sm" weight="medium">
        {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
      </Text>
    </div>
  );
}

function DetailedStreak({
  currentStreak,
  longestStreak,
  lastActiveDate,
  todayCompleted,
  isNewRecord,
  className,
}: StreakCounterProps & { isNewRecord: boolean }) {
  const streakMilestones = [3, 7, 14, 21, 30];
  const nextMilestone = streakMilestones.find(m => m > currentStreak) || 30;
  const daysToNextMilestone = nextMilestone - currentStreak;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Streak Card */}
      <Card className="border-2 border-black">
        <CardContent className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50">
          <div className="text-center">
            <div className="inline-flex p-4 bg-white rounded-full shadow-lg mb-4">
              <Flame className="w-12 h-12 text-orange-500" />
            </div>
            
            <Heading as="h2" className="font-heading text-6xl mb-2">
              {currentStreak}
            </Heading>
            <Text color="muted" className="mb-4">
              Day Streak
            </Text>

            {isNewRecord && (
              <Badge variant="warning" size="lg" className="mb-4">
                🎉 New Personal Record!
              </Badge>
            )}

            {todayCompleted ? (
              <Badge variant="success" size="lg">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Today's lesson completed
              </Badge>
            ) : (
              <Badge variant="default" size="lg">
                <AlertCircle className="w-4 h-4 mr-1" />
                Complete today's lesson to maintain streak
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
            <Text className="font-heading text-xl font-bold">{longestStreak}</Text>
            <Text size="xs" color="muted">Best Streak</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <Text className="font-heading text-xl font-bold">{daysToNextMilestone}</Text>
            <Text size="xs" color="muted">To {nextMilestone} days</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <Text className="font-heading text-xl font-bold">
              {Math.round((currentStreak / 30) * 100)}%
            </Text>
            <Text size="xs" color="muted">Of Journey</Text>
          </CardContent>
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <CardContent className="p-4">
          <Text weight="medium" className="mb-3">Streak Milestones</Text>
          <div className="space-y-2">
            {streakMilestones.map((milestone) => {
              const achieved = currentStreak >= milestone;
              const isCurrent = milestone === nextMilestone;
              
              return (
                <div
                  key={milestone}
                  className={cn(
                    "flex items-center justify-between p-2 rounded",
                    achieved && "bg-green-50",
                    isCurrent && "bg-blue-50 border border-blue-200"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {achieved ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400" />
                    )}
                    <Text size="sm" weight={isCurrent ? "medium" : "normal"}>
                      {milestone} Day Streak
                    </Text>
                  </div>
                  {achieved && (
                    <Badge size="sm" variant="success">Achieved</Badge>
                  )}
                  {isCurrent && (
                    <Text size="xs" color="muted">
                      {daysToNextMilestone} days to go
                    </Text>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StreakVisualizer({ streak }: { streak: number }) {
  const days = Math.min(streak, 7); // Show last 7 days
  
  return (
    <div className="flex gap-1 justify-center">
      {Array.from({ length: days }, (_, i) => (
        <div
          key={i}
          className={cn(
            "w-6 h-6 rounded-sm",
            i === days - 1 ? "bg-orange-500" : "bg-orange-300"
          )}
          style={{
            opacity: 1 - (i * 0.1),
          }}
        />
      ))}
      {streak > 7 && (
        <div className="flex items-center">
          <Text size="xs" color="muted" className="ml-1">
            +{streak - 7}
          </Text>
        </div>
      )}
    </div>
  );
}


'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Text, Heading } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { ProgressBar } from '@/components/ui';
import { 
  Zap, 
  TrendingUp, 
  Star,
  Award,
  Target,
  Sparkles,
  ChevronUp,
  Rocket,
  Trophy
} from 'lucide-react';

interface XPDisplayProps {
  currentXP: number;
  totalXP: number;
  level: number;
  levelProgress?: number;
  nextLevelXP?: number;
  recentXPGains?: XPGain[];
  variant?: 'default' | 'compact' | 'detailed';
  showAnimation?: boolean;
  className?: string;
}

interface XPGain {
  id: string;
  amount: number;
  description: string;
  timestamp: string;
  type: 'daily' | 'bonus' | 'achievement' | 'milestone';
}

export function XPDisplay({
  currentXP,
  totalXP,
  level,
  levelProgress,
  nextLevelXP,
  recentXPGains = [],
  variant = 'default',
  showAnimation = true,
  className,
}: XPDisplayProps) {
  const currentLevelXP = levelProgress || (totalXP % 100);
  const xpForNextLevel = nextLevelXP || 100;
  const progressPercentage = (currentLevelXP / xpForNextLevel) * 100;

  if (variant === 'compact') {
    return <CompactXP totalXP={totalXP} level={level} />;
  }

  if (variant === 'detailed') {
    return (
      <DetailedXP
        currentXP={currentXP}
        totalXP={totalXP}
        level={level}
        levelProgress={currentLevelXP}
        nextLevelXP={xpForNextLevel}
        recentXPGains={recentXPGains}
        showAnimation={showAnimation}
        className={className}
      />
    );
  }

  // Default variant
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Experience Points
          </CardTitle>
          <Badge variant="warning" size="sm">
            Level {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Total XP Display */}
        <div className="text-center py-2">
          <div className="inline-flex items-baseline gap-2">
            <Text className="font-heading text-4xl font-bold">
              {totalXP.toLocaleString()}
            </Text>
            <Text color="muted">XP</Text>
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <Text color="muted">Level {level}</Text>
            <Text color="muted">Level {level + 1}</Text>
          </div>
          <div className="relative">
            <ProgressBar 
              value={progressPercentage} 
              className="h-3"
              showAnimation={showAnimation}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Text size="xs" weight="medium" className="text-white mix-blend-difference">
                {currentLevelXP} / {xpForNextLevel}
              </Text>
            </div>
          </div>
          <Text size="xs" color="muted" className="text-center">
            {xpForNextLevel - currentLevelXP} XP to next level
          </Text>
        </div>

        {/* Recent XP Gains */}
        {(recentXPGains?.length || 0) > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <Text size="sm" weight="medium" className="mb-2">Recent Activity</Text>
            <div className="space-y-1">
              {recentXPGains.slice(0, 3).map((gain) => (
                <XPGainItem key={gain.id} gain={gain} />
              ))}
            </div>
          </div>
        )}

        {/* Next Milestone */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-500" />
            <Text size="sm">Next milestone</Text>
          </div>
          <Text size="sm" weight="medium">
            {Math.ceil((level + 1) / 5) * 500} XP
          </Text>
        </div>
      </CardContent>
    </Card>
  );
}

function CompactXP({ totalXP, level }: { totalXP: number; level: number }) {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-yellow-50 rounded-lg">
      <Zap className="w-5 h-5 text-yellow-500" />
      <div className="flex items-baseline gap-2">
        <Text weight="bold" className="text-lg">
          {totalXP.toLocaleString()}
        </Text>
        <Text size="sm" color="muted">XP</Text>
      </div>
      <Badge variant="warning" size="sm">Lvl {level}</Badge>
    </div>
  );
}

function DetailedXP({
  currentXP,
  totalXP,
  level,
  levelProgress,
  nextLevelXP,
  recentXPGains,
  showAnimation,
  className,
}: XPDisplayProps) {
  const progressPercentage = (levelProgress! / nextLevelXP!) * 100;
  const xpToday = (recentXPGains || [])
    .filter(g => new Date(g.timestamp).toDateString() === new Date().toDateString())
    .reduce((sum, g) => sum + g.amount, 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main XP Card */}
      <Card className="border-2 border-black overflow-hidden">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Heading as="h3" variant="h4" className="mb-1">
                Total Experience
              </Heading>
              <Text color="muted">
                Keep earning XP to unlock new achievements
              </Text>
            </div>
            <div className="text-right">
              <Badge variant="warning" size="lg" className="mb-2">
                <Star className="w-4 h-4 mr-1" />
                Level {level}
              </Badge>
              <Text size="xs" color="muted">
                Rank #{Math.floor(totalXP / 1000) + 1}
              </Text>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-4">
              <Zap className="w-12 h-12 text-yellow-500" />
            </div>
            <Text className="font-heading text-5xl font-bold mb-2">
              {totalXP.toLocaleString()}
            </Text>
            <Text color="muted">Experience Points</Text>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <Text size="sm" weight="medium">Level Progress</Text>
              <Text size="sm" color="muted">
                {levelProgress} / {nextLevelXP} XP
              </Text>
            </div>
            <ProgressBar 
              value={progressPercentage} 
              className="h-4 mb-2"
              showAnimation
            />
            <div className="flex justify-between items-center">
              <Text size="xs" color="muted">
                {Math.round(progressPercentage)}% complete
              </Text>
              <Text size="xs" weight="medium" className="text-yellow-600">
                {nextLevelXP! - levelProgress!} XP to level {level + 1}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <Text className="font-heading text-xl font-bold">+{xpToday}</Text>
            <Text size="xs" color="muted">Today</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Sparkles className="w-5 h-5 text-purple-500 mx-auto mb-2" />
            <Text className="font-heading text-xl font-bold">
              {Math.floor(totalXP / 7)}
            </Text>
            <Text size="xs" color="muted">Daily Avg</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Rocket className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <Text className="font-heading text-xl font-bold">
              {Math.ceil((level + 1) / 5) * 5}
            </Text>
            <Text size="xs" color="muted">Next Rank</Text>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {(recentXPGains?.length || 0) > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent XP Gains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(recentXPGains || []).map((gain, index) => (
                <div
                  key={gain.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-all",
                    "hover:bg-gray-50",
                    index === 0 && showAnimation && "animate-slide-down"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      gain.type === 'milestone' && "bg-purple-100",
                      gain.type === 'achievement' && "bg-blue-100",
                      gain.type === 'bonus' && "bg-green-100",
                      gain.type === 'daily' && "bg-yellow-100"
                    )}>
                      {gain.type === 'milestone' && <Trophy className="w-5 h-5 text-purple-600" />}
                      {gain.type === 'achievement' && <Award className="w-5 h-5 text-blue-600" />}
                      {gain.type === 'bonus' && <Star className="w-5 h-5 text-green-600" />}
                      {gain.type === 'daily' && <Zap className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{gain.description}</Text>
                      <Text size="xs" color="muted">
                        {new Date(gain.timestamp).toLocaleTimeString()}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronUp className="w-4 h-4 text-green-500" />
                    <Text weight="bold" className="text-green-600">
                      +{gain.amount}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* XP Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>XP Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <XPSource 
              label="Daily Lessons" 
              xp={Math.floor(totalXP * 0.6)} 
              percentage={60}
              icon={BookOpen}
            />
            <XPSource 
              label="Achievements" 
              xp={Math.floor(totalXP * 0.25)} 
              percentage={25}
              icon={Award}
            />
            <XPSource 
              label="Streaks & Bonuses" 
              xp={Math.floor(totalXP * 0.15)} 
              percentage={15}
              icon={Flame}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function XPGainItem({ gain }: { gain: XPGain }) {
  return (
    <div className="flex items-center justify-between py-1">
      <Text size="sm" color="muted">
        {gain.description}
      </Text>
      <Text size="sm" weight="medium" className="text-green-600">
        +{gain.amount} XP
      </Text>
    </div>
  );
}

function XPSource({ 
  label, 
  xp, 
  percentage, 
  icon: Icon 
}: { 
  label: string; 
  xp: number; 
  percentage: number; 
  icon: React.ElementType;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-500" />
          <Text size="sm">{label}</Text>
        </div>
        <Text size="sm" weight="medium">{xp.toLocaleString()} XP</Text>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Add missing imports
import { BookOpen, Flame } from 'lucide-react';
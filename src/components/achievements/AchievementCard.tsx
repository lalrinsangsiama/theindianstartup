'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar as Progress } from '@/components/ui/ProgressBar';
import { Lock, CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/cn';

interface AchievementCardProps {
  title: string;
  description: string;
  badge: string;
  xp: number;
  isUnlocked: boolean;
  isSecret?: boolean;
  progress?: number;
  target?: number;
  category: string;
  onClick?: () => void;
}

export function AchievementCard({
  title,
  description,
  badge,
  xp,
  isUnlocked,
  isSecret,
  progress,
  target,
  category,
  onClick
}: AchievementCardProps) {
  const getCategoryColor = (cat: string) => {
    const colors = {
      learning: 'bg-blue-100 text-blue-700',
      streak: 'bg-red-100 text-red-700',
      completion: 'bg-green-100 text-green-700',
      social: 'bg-purple-100 text-purple-700',
      milestone: 'bg-yellow-100 text-yellow-700'
    };
    return colors[cat as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  if (isSecret && !isUnlocked) {
    return (
      <Card 
        className={cn(
          "relative overflow-hidden transition-all cursor-pointer",
          "hover:shadow-lg hover:scale-105",
          "bg-gray-50 border-gray-200"
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gray-400" />
            </div>
            <Badge size="sm" className="bg-gray-200 text-gray-600">
              Secret
            </Badge>
          </div>
          
          <Text weight="semibold" className="mb-1 text-gray-600">
            ???
          </Text>
          <Text size="sm" color="muted">
            Complete special requirements to unlock
          </Text>
          
          <div className="mt-4 flex items-center justify-between">
            <Text size="sm" className="text-gray-500">
              <Star className="w-4 h-4 inline mr-1" />
              ??? XP
            </Text>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all cursor-pointer",
        isUnlocked 
          ? "bg-white border-green-500 shadow-md" 
          : "hover:shadow-lg hover:scale-105 bg-gray-50"
      )}
      onClick={onClick}
    >
      {isUnlocked && (
        <div className="absolute top-2 right-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-3xl",
            isUnlocked ? "bg-yellow-100" : "bg-gray-100"
          )}>
            {badge}
          </div>
          <Badge size="sm" className={getCategoryColor(category)}>
            {category}
          </Badge>
        </div>
        
        <Text weight="semibold" className="mb-1">
          {title}
        </Text>
        <Text size="sm" color="muted">
          {description}
        </Text>
        
        {!isUnlocked && progress !== undefined && target !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <Text size="xs" color="muted">Progress</Text>
              <Text size="xs" weight="medium">{progress}/{target}</Text>
            </div>
            <Progress value={(progress / target) * 100} className="h-2" />
          </div>
        )}
        
        <div className="mt-4 flex items-center justify-between">
          <Text size="sm" className={isUnlocked ? "text-green-600 font-medium" : "text-gray-600"}>
            <Star className="w-4 h-4 inline mr-1" />
            {xp} XP
          </Text>
          {isUnlocked && (
            <Text size="xs" color="muted">
              Unlocked!
            </Text>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
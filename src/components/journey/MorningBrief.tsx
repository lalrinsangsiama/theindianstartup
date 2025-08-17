'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { 
  Sunrise, 
  Clock, 
  Target, 
  Zap, 
  TrendingUp 
} from 'lucide-react';

interface MorningBriefProps {
  day: number;
  briefContent: string;
  estimatedTime: number;
  xpReward: number;
  successMetrics?: string[];
  focus?: string;
  className?: string;
}

export function MorningBrief({
  day,
  briefContent,
  estimatedTime,
  xpReward,
  successMetrics = [],
  focus,
  className = ''
}: MorningBriefProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} mins`;
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  };

  return (
    <Card className={`bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <Sunrise className="w-5 h-5 text-yellow-600" />
          Morning Brief
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <Text size="sm" className="text-gray-700">
              {formatTime(estimatedTime)}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <Text size="sm" className="text-gray-700">
              +{xpReward} XP
            </Text>
          </div>
          <Badge variant="outline" size="sm">
            Day {day}
          </Badge>
        </div>

        {/* Focus */}
        {focus && (
          <div className="bg-white/70 rounded-lg p-3 border border-yellow-200">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text size="sm" weight="medium" className="text-orange-900 mb-1">
                  Today&apos;s Focus
                </Text>
                <Text size="sm" className="text-orange-800">
                  {focus}
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Brief Content */}
        <div className="leading-relaxed">
          <Text className="text-gray-800">
            {briefContent}
          </Text>
        </div>

        {/* Success Metrics */}
        {successMetrics.length > 0 && (
          <div className="bg-white/70 rounded-lg p-3 border border-yellow-200">
            <div className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <Text size="sm" weight="medium" className="text-gray-900 mb-2">
                  Success Metrics
                </Text>
                <ul className="space-y-1">
                  {successMetrics.map((metric, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <Text size="sm" className="text-gray-700">
                        {metric}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
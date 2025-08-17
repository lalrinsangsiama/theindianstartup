'use client';

import React from 'react';
import { cn } from '../lib/utils';
import { Text } from '../../components/ui/Typography';
import { Heading } from '../../components/ui/Typography';
import { Badge } from '../../components/ui/Badge';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Star, 
  Zap,
  Trophy,
  Target,
  Calendar
} from 'lucide-react';

interface DayStatus {
  day: number;
  status: 'completed' | 'current' | 'locked' | 'available';
  title?: string;
  xpEarned?: number;
}

interface JourneyProgressProps {
  currentDay: number;
  completedDays: number[];
  totalDays?: number;
  onDayClick?: (day: number) => void;
  variant?: 'grid' | 'linear' | 'compact';
  showDetails?: boolean;
}

export function JourneyProgress({
  currentDay,
  completedDays,
  totalDays = 30,
  onDayClick,
  variant = 'grid',
  showDetails = true,
}: JourneyProgressProps) {
  const getDayStatus = (day: number): DayStatus['status'] => {
    if (completedDays.includes(day)) return 'completed';
    if (day === currentDay) return 'current';
    if (day === currentDay + 1 || completedDays.includes(day - 1)) return 'available';
    return 'locked';
  };

  const completionPercentage = Math.round((completedDays.length / totalDays) * 100);

  if (variant === 'linear') {
    return <LinearProgress {...{ currentDay, completedDays, totalDays, onDayClick }} />;
  }

  if (variant === 'compact') {
    return <CompactProgress {...{ currentDay, completedDays, totalDays }} />;
  }

  // Grid variant (default)
  const weeks = Array.from({ length: Math.ceil(totalDays / 7) }, (_, weekIndex) => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const day = weekIndex * 7 + dayIndex + 1;
      return day <= totalDays ? day : null;
    });
  });

  return (
    <div className="space-y-4">
      {showDetails && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <Heading as="h3" variant="h5" className="mb-1">
              Your 30-Day Journey
            </Heading>
            <Text size="sm" color="muted">
              {completedDays.length} of {totalDays} days completed
            </Text>
          </div>
          <div className="text-right">
            <Text className="font-heading text-2xl font-bold">
              {completionPercentage}%
            </Text>
            <Text size="xs" color="muted">Complete</Text>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-6">
        <div 
          className="absolute inset-y-0 left-0 bg-black transition-all duration-500 ease-out"
          style={{ width: `${completionPercentage}%` }}
        />
        {/* Milestone markers */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
              style={{ left: `${milestone}%` }}
            />
          ))}
        </div>
      </div>

      {/* Day Grid */}
      <div className="space-y-3">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex}>
            {weekIndex === 0 && (
              <Text size="xs" color="muted" className="mb-2 font-medium">
                Week {weekIndex + 1}: Foundation
              </Text>
            )}
            {weekIndex === 1 && (
              <Text size="xs" color="muted" className="mb-2 font-medium">
                Week {weekIndex + 1}: Building
              </Text>
            )}
            {weekIndex === 2 && (
              <Text size="xs" color="muted" className="mb-2 font-medium">
                Week {weekIndex + 1}: Validation
              </Text>
            )}
            {weekIndex === 3 && (
              <Text size="xs" color="muted" className="mb-2 font-medium">
                Week {weekIndex + 1}: Launch Ready
              </Text>
            )}
            
            <div className="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => {
                if (!day) return <div key={dayIndex} />;
                
                const status = getDayStatus(day);
                const isClickable = status !== 'locked' && onDayClick;
                
                return (
                  <button
                    key={day}
                    onClick={() => isClickable && onDayClick(day)}
                    disabled={!isClickable}
                    className={cn(
                      "relative aspect-square rounded-lg flex items-center justify-center transition-all",
                      "text-sm font-medium",
                      {
                        'bg-black text-white hover:bg-gray-800': status === 'completed',
                        'bg-yellow-100 text-yellow-800 border-2 border-yellow-400 hover:bg-yellow-200': status === 'current',
                        'bg-gray-100 text-gray-600 hover:bg-gray-200': status === 'available',
                        'bg-gray-50 text-gray-400 cursor-not-allowed': status === 'locked',
                      },
                      isClickable && 'cursor-pointer'
                    )}
                  >
                    {status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    {status === 'current' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-lg animate-pulse bg-yellow-400/20" />
                        <span className="relative z-10">{day}</span>
                      </div>
                    )}
                    {(status === 'available' || status === 'locked') && day}
                    
                    {/* Special day badges */}
                    {day === 7 && status === 'completed' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                    {day === 30 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                        <Trophy className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Achievements */}
      {showDetails && (
        <div className="grid grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200">
          <MilestoneCard
            week={1}
            title="Foundation"
            completed={completedDays.filter(d => d <= 7).length === 7}
            icon={Target}
          />
          <MilestoneCard
            week={2}
            title="Building"
            completed={completedDays.filter(d => d > 7 && d <= 14).length === 7}
            icon={Zap}
          />
          <MilestoneCard
            week={3}
            title="Validation"
            completed={completedDays.filter(d => d > 14 && d <= 21).length === 7}
            icon={CheckCircle2}
          />
          <MilestoneCard
            week={4}
            title="Launch"
            completed={completedDays.filter(d => d > 21 && d <= 30).length >= 9}
            icon={Trophy}
          />
        </div>
      )}
    </div>
  );
}

function MilestoneCard({ 
  week, 
  title, 
  completed, 
  icon: Icon 
}: { 
  week: number; 
  title: string; 
  completed: boolean; 
  icon: React.ElementType;
}) {
  return (
    <div className={cn(
      "p-3 rounded-lg text-center transition-all",
      completed ? "bg-black text-white" : "bg-gray-100"
    )}>
      <Icon className={cn(
        "w-5 h-5 mx-auto mb-1",
        completed ? "text-white" : "text-gray-400"
      )} />
      <Text size="xs" weight="medium">Week {week}</Text>
      <Text size="xs" className={completed ? "text-gray-300" : "text-gray-500"}>
        {title}
      </Text>
    </div>
  );
}

function LinearProgress({ currentDay, completedDays, totalDays, onDayClick }: JourneyProgressProps) {
  return (
    <div className="relative">
      {/* Progress Line */}
      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200" />
      <div 
        className="absolute top-4 left-0 h-1 bg-black transition-all duration-500"
        style={{ width: `${(completedDays.length / (totalDays || 30)) * 100}%` }}
      />
      
      {/* Day Markers */}
      <div className="relative flex justify-between">
        {[1, 7, 14, 21, 30].map((day) => {
          const status = completedDays.includes(day) ? 'completed' : 
                        day === currentDay ? 'current' : 
                        day < currentDay ? 'available' : 'locked';
          
          return (
            <button
              key={day}
              onClick={() => onDayClick && status !== 'locked' && onDayClick(day)}
              disabled={status === 'locked'}
              className={cn(
                "relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all",
                {
                  'bg-black text-white': status === 'completed',
                  'bg-yellow-400 text-black': status === 'current',
                  'bg-white border-2 border-gray-300': status === 'available',
                  'bg-gray-100 text-gray-400': status === 'locked',
                }
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2">
        <Text size="xs" color="muted">Start</Text>
        <Text size="xs" color="muted">Week 1</Text>
        <Text size="xs" color="muted">Week 2</Text>
        <Text size="xs" color="muted">Week 3</Text>
        <Text size="xs" color="muted">Launch!</Text>
      </div>
    </div>
  );
}

function CompactProgress({ currentDay, completedDays, totalDays }: JourneyProgressProps) {
  const percentage = Math.round((completedDays.length / (totalDays || 30)) * 100);
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <Text size="sm" weight="medium">Journey Progress</Text>
          <Text size="sm" color="muted">{percentage}%</Text>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="text-center">
        <Text className="font-heading text-xl font-bold">{currentDay}</Text>
        <Text size="xs" color="muted">Day</Text>
      </div>
    </div>
  );
}
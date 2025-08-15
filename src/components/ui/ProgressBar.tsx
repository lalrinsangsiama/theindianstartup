import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'striped';
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    showLabel = false, 
    label,
    size = 'md',
    variant = 'default',
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
    
    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    };
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(showLabel || label) && (
          <div className="flex justify-between items-center mb-2">
            {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
            {showLabel && (
              <span className="text-sm font-heading font-semibold">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div className={cn(
          'w-full bg-gray-200 overflow-hidden relative',
          sizes[size]
        )}>
          <div
            className={cn(
              'h-full bg-black transition-all duration-500 ease-out relative',
              variant === 'striped' && 'progress-striped'
            )}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

// Journey Progress Component for 30-day tracking
export interface JourneyProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  currentDay: number;
  totalDays?: number;
  completedDays: number[];
  onDayClick?: (day: number) => void;
}

const JourneyProgress = React.forwardRef<HTMLDivElement, JourneyProgressProps>(
  ({ 
    className, 
    currentDay, 
    totalDays = 30, 
    completedDays = [],
    onDayClick,
    ...props 
  }, ref) => {
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className="mb-4">
          <h4 className="font-heading text-lg font-semibold mb-1">
            Day {currentDay} of {totalDays}
          </h4>
          <p className="text-sm text-gray-600">
            {completedDays.length} days completed
          </p>
        </div>
        
        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
            const isCompleted = completedDays.includes(day);
            const isCurrent = day === currentDay;
            const isClickable = day <= currentDay || isCompleted;
            
            return (
              <button
                key={day}
                onClick={() => isClickable && onDayClick?.(day)}
                disabled={!isClickable}
                className={cn(
                  'aspect-square border-2 flex items-center justify-center font-heading text-sm font-semibold transition-all duration-200',
                  isCompleted && 'bg-black text-white border-black',
                  isCurrent && !isCompleted && 'border-black text-black animate-pulse',
                  !isCompleted && !isCurrent && day <= currentDay && 'border-gray-400 text-gray-600 hover:border-black',
                  day > currentDay && !isCompleted && 'border-gray-300 text-gray-400 cursor-not-allowed',
                  isClickable && !isCompleted && 'hover:bg-gray-50'
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
        
        {/* Week indicators */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {['Week 1', 'Week 2', 'Week 3', 'Week 4+'].map((week, index) => (
            <div
              key={week}
              className="text-center text-xs font-heading font-medium text-gray-600 uppercase tracking-wider"
            >
              {week}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

JourneyProgress.displayName = 'JourneyProgress';

// XP Progress Bar
export interface XPProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  currentXP: number;
  levelXP: number;
  level: number;
}

const XPProgressBar = React.forwardRef<HTMLDivElement, XPProgressBarProps>(
  ({ className, currentXP, levelXP, level, ...props }, ref) => {
    const percentage = (currentXP / levelXP) * 100;
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className="flex justify-between items-center mb-2">
          <span className="font-heading text-sm font-semibold uppercase">
            Level {level}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {currentXP} / {levelXP} XP
          </span>
        </div>
        <div className="h-2 bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gray-600 to-black transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

XPProgressBar.displayName = 'XPProgressBar';

export { ProgressBar, JourneyProgress, XPProgressBar };
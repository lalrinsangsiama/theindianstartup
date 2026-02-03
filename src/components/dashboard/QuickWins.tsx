'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import {
  Zap,
  CheckCircle,
  Circle,
  User,
  Target,
  Users,
  BookOpen,
  Star,
  Clock,
  Trophy,
  Gift,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { fireCelebration } from '@/components/ui/Confetti';
import { cn } from '@/lib/cn';

interface QuickWin {
  id: string;
  title: string;
  description: string;
  xp: number;
  icon: React.ElementType;
  href?: string;
  checkKey: string;
  action?: string;
}

const QUICK_WINS: QuickWin[] = [
  {
    id: 'complete-profile',
    title: 'Complete Your Profile',
    description: 'Add your name, startup info, and goals',
    xp: 25,
    icon: User,
    href: '/settings?tab=profile',
    checkKey: 'profileComplete',
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Tell us what you want to achieve',
    xp: 25,
    icon: Target,
    href: '/onboarding?step=goals',
    checkKey: 'goalsSet',
  },
  {
    id: 'join-community',
    title: 'Join a Discussion',
    description: 'Introduce yourself to the community',
    xp: 25,
    icon: Users,
    href: '/community',
    checkKey: 'joinedCommunity',
  },
  {
    id: 'view-course',
    title: 'Explore a Course',
    description: 'Check out what you can learn',
    xp: 15,
    icon: BookOpen,
    href: '/products/p1',
    checkKey: 'viewedCourse',
  },
  {
    id: 'create-portfolio',
    title: 'Start Your Portfolio',
    description: 'Add your startup details',
    xp: 25,
    icon: Star,
    href: '/portfolio',
    checkKey: 'portfolioStarted',
  },
  {
    id: 'first-lesson',
    title: 'Complete First Lesson',
    description: 'Start learning and earn XP',
    xp: 35,
    icon: Trophy,
    href: '/journey/day/1',
    checkKey: 'firstLessonComplete',
  },
];

const TOTAL_XP = QUICK_WINS.reduce((sum, win) => sum + win.xp, 0);
const BONUS_XP = 200;
const BONUS_HOURS = 24;

interface QuickWinsProps {
  userId: string;
  onXPEarned?: (xp: number) => void;
}

export function QuickWins({ userId, onXPEarned }: QuickWinsProps) {
  const [loading, setLoading] = useState(true);
  const [completedWins, setCompletedWins] = useState<Set<string>>(new Set());
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [bonusEarned, setBonusEarned] = useState(false);
  const [allComplete, setAllComplete] = useState(false);

  useEffect(() => {
    fetchQuickWinsStatus();
  }, [userId]);

  const fetchQuickWinsStatus = async () => {
    try {
      const res = await fetch('/api/user/quick-wins');
      if (res.ok) {
        const data = await res.json();
        setCompletedWins(new Set(data.completedWins || []));
        setStartedAt(data.startedAt ? new Date(data.startedAt) : null);
        setBonusEarned(data.bonusEarned || false);
        setAllComplete(data.allComplete || false);
      }
    } catch {
      // Ignore errors
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteWin = async (winId: string) => {
    if (completedWins.has(winId)) return;

    const win = QUICK_WINS.find(w => w.id === winId);
    if (!win) return;

    try {
      const res = await fetch('/api/user/quick-wins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ winId }),
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedWins(prev => new Set([...prev, winId]));

        toast.success(`+${win.xp} XP earned!`, {
          description: win.title,
        });

        onXPEarned?.(win.xp);

        // Check if all complete and bonus earned
        if (data.bonusEarned && !bonusEarned) {
          setBonusEarned(true);
          setAllComplete(true);
          fireCelebration(3000);
          toast.success(`Bonus: +${BONUS_XP} XP!`, {
            description: 'Fast Starter badge earned!',
            duration: 5000,
          });
          onXPEarned?.(BONUS_XP);
        } else if (data.allComplete && !allComplete) {
          setAllComplete(true);
          fireCelebration(2000);
          toast.success('All Quick Wins complete!', {
            description: `You earned ${TOTAL_XP} XP total`,
          });
        }
      }
    } catch {
      toast.error('Failed to record progress');
    }
  };

  const getTimeRemaining = () => {
    if (!startedAt || allComplete) return null;

    const deadline = new Date(startedAt.getTime() + BONUS_HOURS * 60 * 60 * 1000);
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) return null;

    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

    return { hours, minutes };
  };

  const completedCount = completedWins.size;
  const progress = (completedCount / QUICK_WINS.length) * 100;
  const timeRemaining = getTimeRemaining();

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Don't show if all complete and bonus was earned (or time expired)
  if (allComplete && bonusEarned) {
    return null;
  }

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            Quick Wins
            <Badge variant="warning" size="sm">
              {TOTAL_XP + (timeRemaining ? BONUS_XP : 0)} XP
            </Badge>
          </CardTitle>

          {timeRemaining && !allComplete && (
            <div className="flex items-center gap-2 text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              <Text size="sm" weight="medium">
                {timeRemaining.hours}h {timeRemaining.minutes}m left for bonus
              </Text>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">{completedCount}/{QUICK_WINS.length} completed</span>
            <span className="text-yellow-700 font-medium">
              {completedCount * 25} / {TOTAL_XP} XP
            </span>
          </div>
          <div className="h-3 bg-yellow-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bonus Info */}
        {timeRemaining && !allComplete && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-600" />
              <Text size="sm" weight="medium" className="text-purple-700">
                Complete all 6 before time runs out for +{BONUS_XP} bonus XP & Fast Starter badge!
              </Text>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {QUICK_WINS.map((win) => {
            const isComplete = completedWins.has(win.id);
            const Icon = win.icon;

            return (
              <div
                key={win.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border transition-all',
                  isComplete
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-yellow-400 hover:shadow-sm'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                    isComplete ? 'bg-green-100' : 'bg-yellow-100'
                  )}
                >
                  {isComplete ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Icon className="w-5 h-5 text-yellow-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Text
                      weight="medium"
                      size="sm"
                      className={cn(isComplete && 'line-through text-gray-500')}
                    >
                      {win.title}
                    </Text>
                    <Badge
                      size="sm"
                      variant={isComplete ? 'success' : 'default'}
                      className={cn(!isComplete && 'bg-yellow-100 text-yellow-700')}
                    >
                      +{win.xp} XP
                    </Badge>
                  </div>
                  <Text size="xs" color="muted" className="truncate">
                    {win.description}
                  </Text>
                </div>

                {!isComplete && win.href && (
                  <Link href={win.href} onClick={() => handleCompleteWin(win.id)}>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {allComplete && !bonusEarned && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
            <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <Text weight="medium" className="text-purple-700">
              All Quick Wins Complete!
            </Text>
            <Text size="sm" color="muted">
              You earned {TOTAL_XP} XP. Keep going!
            </Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

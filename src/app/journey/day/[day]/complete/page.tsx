'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BadgesShowcase } from '@/components/progress';
import confetti from 'canvas-confetti';
import { 
  Trophy,
  Zap,
  Calendar,
  ArrowRight,
  Share2,
  Twitter,
  Linkedin,
  CheckCircle2,
  Star,
  Target,
  Sparkles,
} from 'lucide-react';

export default function LessonCompletePage() {
  const params = useParams();
  const router = useRouter();
  const day = parseInt(params.day as string);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    if (showConfetti) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Stop confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [showConfetti]);

  const handleShare = (platform: 'twitter' | 'linkedin') => {
    const text = `Just completed Day ${day} of my 30-day startup journey with @TheIndianStartup! 🚀`;
    const url = 'https://theindianstartup.in';
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
    }
  };

  // Mock data for achievements
  const achievements = {
    xpEarned: 50,
    streakMaintained: true,
    currentStreak: 7,
    newBadge: day === 7 ? {
      id: 'week-warrior',
      name: 'Week Warrior',
      description: 'Completed your first week!',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      rarity: 'rare' as const,
    } : null,
    nextDayUnlocked: day < 30,
    milestone: day % 7 === 0,
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl w-full">
            {/* Success Card */}
            <Card className="border-2 border-black shadow-xl mb-8">
              <CardContent className="p-8 text-center">
                {/* Success Icon */}
                <div className="inline-flex p-4 bg-green-100 rounded-full mb-6">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>

                {/* Congratulations */}
                <Heading as="h1" className="mb-3">
                  Congratulations! 🎉
                </Heading>
                <Text className="text-xl mb-8">
                  You&apos;ve completed Day {day} of your startup journey
                </Text>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {/* XP Earned */}
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <Text className="font-heading text-2xl font-bold mb-1">
                      +{achievements.xpEarned}
                    </Text>
                    <Text size="sm" color="muted">XP Earned</Text>
                  </div>

                  {/* Streak */}
                  {achievements.streakMaintained && (
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-3xl mb-2">🔥</div>
                      <Text className="font-heading text-2xl font-bold mb-1">
                        {achievements.currentStreak}
                      </Text>
                      <Text size="sm" color="muted">Day Streak</Text>
                    </div>
                  )}

                  {/* Progress */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <Text className="font-heading text-2xl font-bold mb-1">
                      {Math.round((day / 30) * 100)}%
                    </Text>
                    <Text size="sm" color="muted">Complete</Text>
                  </div>
                </div>

                {/* New Badge */}
                {achievements.newBadge && (
                  <div className="mb-8">
                    <Badge variant="warning" size="lg" className="mb-4">
                      <Sparkles className="w-4 h-4 mr-1" />
                      New Badge Unlocked!
                    </Badge>
                    <div className="inline-flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center",
                        achievements.newBadge.bgColor
                      )}>
                        <achievements.newBadge.icon className={cn(
                          "w-8 h-8",
                          achievements.newBadge.color
                        )} />
                      </div>
                      <div className="text-left">
                        <Text weight="medium">{achievements.newBadge.name}</Text>
                        <Text size="sm" color="muted">
                          {achievements.newBadge.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                )}

                {/* Milestone Message */}
                {achievements.milestone && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <Text weight="medium" className="text-purple-800">
                      Week {Math.ceil(day / 7)} Complete! You&apos;re making incredible progress.
                    </Text>
                  </div>
                )}

                {/* Share Section */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <Text weight="medium" className="mb-3">
                    Share your progress
                  </Text>
                  <div className="flex justify-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Tweet
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                    >
                      <Linkedin className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => router.push('/journey')}
                  >
                    View Journey
                  </Button>
                  {achievements.nextDayUnlocked && (
                    <Button
                      variant="primary"
                      className="flex-1 group"
                      onClick={() => router.push(`/journey/day/${day + 1}`)}
                    >
                      Start Day {day + 1}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            {achievements.nextDayUnlocked && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <Text weight="medium" className="mb-1">
                        Tomorrow: Day {day + 1}
                      </Text>
                      <Text size="sm" color="muted">
                        Market Research Deep Dive - Validate your idea with real data
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

// Import cn utility
import { cn } from '@/lib/utils';
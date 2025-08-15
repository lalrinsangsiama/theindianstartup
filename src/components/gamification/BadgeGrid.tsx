import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge as UIBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { BADGES, BadgeId, getBadgeProgress, sortBadges } from '@/lib/badges';
import { cn } from '@/lib/cn';
import { Lock, Star, Info } from 'lucide-react';

interface BadgeGridProps {
  earnedBadges: string[];
  userStats: {
    currentDay: number;
    currentStreak: number;
    totalXP: number;
    communityPosts?: number;
    helpGiven?: number;
    perfectDays?: number;
    joinedAt?: Date;
  };
  variant?: 'full' | 'compact';
}

export const BadgeGrid: React.FC<BadgeGridProps> = ({
  earnedBadges,
  userStats,
  variant = 'full',
}) => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeId | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sort all badges and separate earned vs unearned
  const allBadgeIds = Object.keys(BADGES) as BadgeId[];
  const sortedBadgeIds = sortBadges(allBadgeIds);
  
  const earnedBadgeIds = sortedBadgeIds.filter(id => earnedBadges.includes(id));
  const unearnedBadgeIds = sortedBadgeIds.filter(id => !earnedBadges.includes(id));

  const handleBadgeClick = (badgeId: BadgeId) => {
    setSelectedBadge(badgeId);
    setShowModal(true);
  };

  const renderBadge = (badgeId: BadgeId, isEarned: boolean) => {
    const badge = BADGES[badgeId];
    const Icon = badge.icon;
    const progress = !isEarned ? getBadgeProgress(badgeId, userStats) : null;
    
    return (
      <div
        key={badgeId}
        onClick={() => handleBadgeClick(badgeId)}
        className={cn(
          "relative group cursor-pointer transition-all duration-200",
          variant === 'compact' ? 'p-2' : 'p-4',
          isEarned ? 'hover:scale-105' : 'hover:scale-95 opacity-60'
        )}
      >
        <div className={cn(
          "relative rounded-full flex items-center justify-center transition-all",
          variant === 'compact' ? 'w-16 h-16' : 'w-20 h-20',
          isEarned ? badge.color : 'bg-gray-200',
          isEarned && 'shadow-lg'
        )}>
          {isEarned ? (
            <>
              <Icon className={cn(
                "text-white",
                variant === 'compact' ? 'w-8 h-8' : 'w-10 h-10'
              )} />
              {/* Shine effect for earned badges */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          ) : (
            <Lock className={cn(
              "text-gray-400",
              variant === 'compact' ? 'w-6 h-6' : 'w-8 h-8'
            )} />
          )}
          
          {/* Progress ring for unearned badges */}
          {!isEarned && progress && progress.percentage > 0 && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-orange-400"
                strokeDasharray={`${progress.percentage * 3.14 * 2 * 0.48} 999`}
              />
            </svg>
          )}
        </div>
        
        {variant === 'full' && (
          <div className="mt-2 text-center">
            <Text size="sm" weight="medium" className={cn(
              "line-clamp-1",
              !isEarned && "text-gray-500"
            )}>
              {badge.name}
            </Text>
            {!isEarned && progress && (
              <Text size="xs" color="muted">
                {progress.current}/{progress.required}
              </Text>
            )}
          </div>
        )}
        
        {/* Earned indicator */}
        {isEarned && (
          <div className="absolute -top-1 -right-1">
            <div className="bg-yellow-400 rounded-full p-1">
              <Star className="w-3 h-3 text-yellow-900 fill-current" />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-6">
        {/* Earned Badges */}
        {earnedBadgeIds.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <Heading as="h3" variant="h6">
                Earned Badges
              </Heading>
              <UIBadge variant="success">
                {earnedBadgeIds.length} / {allBadgeIds.length}
              </UIBadge>
            </div>
            <div className={cn(
              "grid gap-4",
              variant === 'compact' 
                ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' 
                : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
            )}>
              {earnedBadgeIds.map(badgeId => renderBadge(badgeId, true))}
            </div>
          </div>
        )}
        
        {/* Unearned Badges */}
        {unearnedBadgeIds.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <Heading as="h3" variant="h6">
                Locked Badges
              </Heading>
              <Text size="sm" color="muted">
                Complete challenges to unlock
              </Text>
            </div>
            <div className={cn(
              "grid gap-4",
              variant === 'compact' 
                ? 'grid-cols-6 sm:grid-cols-8 md:grid-cols-10' 
                : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
            )}>
              {unearnedBadgeIds.map(badgeId => renderBadge(badgeId, false))}
            </div>
          </div>
        )}
        
        {/* Empty state */}
        {earnedBadgeIds.length === 0 && (
          <Card className="text-center py-12">
            <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <Heading as="h3" variant="h5" className="mb-2">
              No badges earned yet
            </Heading>
            <Text color="muted">
              Start your journey to unlock achievement badges!
            </Text>
          </Card>
        )}
      </div>

      {/* Badge Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedBadge(null);
        }}
      >
        {selectedBadge && (() => {
          const badge = BADGES[selectedBadge];
          const Icon = badge.icon;
          const isEarned = earnedBadges.includes(selectedBadge);
          const progress = !isEarned ? getBadgeProgress(selectedBadge, userStats) : null;
          
          return (
            <div className="space-y-6">
              <div className="text-center">
                <div className={cn(
                  "w-32 h-32 rounded-full mx-auto flex items-center justify-center mb-4",
                  isEarned ? badge.color : 'bg-gray-200',
                  isEarned && 'shadow-xl'
                )}>
                  {isEarned ? (
                    <Icon className="w-16 h-16 text-white" />
                  ) : (
                    <Lock className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                
                <Heading as="h3" variant="h4" className="mb-2">
                  {badge.name}
                </Heading>
                
                <Text className="mb-4">
                  {badge.description}
                </Text>
                
                {isEarned ? (
                  <UIBadge variant="success" size="lg">
                    <Star className="w-4 h-4 mr-1" />
                    Earned!
                  </UIBadge>
                ) : (
                  progress && (
                    <div className="space-y-3">
                      <ProgressBar
                        value={progress.percentage}
                        className="w-full"
                      />
                      <Text color="muted">
                        Progress: {progress.current} / {progress.required}
                      </Text>
                    </div>
                  )
                )}
                
                {badge.xpReward > 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                    <Text size="sm" className="text-yellow-800">
                      <strong>Reward:</strong> {badge.xpReward} bonus XP when earned
                    </Text>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBadge(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </>
  );
};
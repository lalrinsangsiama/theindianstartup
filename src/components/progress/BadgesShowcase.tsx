'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from '../../components/ui/Typography';
import { Heading } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/Card';
import { CardHeader } from "../../components/ui/Card";
import { CardTitle } from '../../components/ui/Card';
import { Badge as UIBadge } from '../../components/ui/Badge as UIBadge';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { 
  Trophy, 
  Star,
  Award,
  Target,
  Zap,
  Users,
  BookOpen,
  Rocket,
  TrendingUp,
  CheckCircle,
  Lock,
  Info,
  Sparkles,
  Medal,
  Crown
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgesShowcaseProps {
  badges: Badge[];
  variant?: 'grid' | 'list' | 'compact';
  showProgress?: boolean;
  showLocked?: boolean;
  className?: string;
}

const DEFAULT_BADGES: Badge[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Complete your first day',
    icon: Rocket,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    earned: true,
    earnedDate: '2024-01-01',
    rarity: 'common',
  },
  {
    id: 'researcher',
    name: 'Researcher',
    description: 'Complete market research',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    earned: true,
    earnedDate: '2024-01-03',
    rarity: 'common',
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Complete 7 days in a row',
    icon: Trophy,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    earned: false,
    progress: 5,
    maxProgress: 7,
    rarity: 'rare',
  },
  {
    id: 'mvp-master',
    name: 'MVP Master',
    description: 'Launch your first MVP',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    earned: false,
    rarity: 'epic',
  },
  {
    id: 'launch-legend',
    name: 'Launch Legend',
    description: 'Complete all 30 days',
    icon: Crown,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    earned: false,
    rarity: 'legendary',
  },
];

export function BadgesShowcase({
  badges = DEFAULT_BADGES,
  variant = 'grid',
  showProgress = true,
  showLocked = true,
  className,
}: BadgesShowcaseProps) {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);
  const displayBadges = showLocked ? badges : earnedBadges;

  if (variant === 'compact') {
    return <CompactBadges badges={earnedBadges} />;
  }

  if (variant === 'list') {
    return (
      <ListBadges 
        badges={displayBadges}
        showProgress={showProgress}
        onBadgeClick={setSelectedBadge}
        className={className}
      />
    );
  }

  // Grid variant (default)
  return (
    <>
      <div className={cn("space-y-6", className)}>
        {/* Stats Overview */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Text className="font-heading text-3xl font-bold">
                  {earnedBadges.length}
                </Text>
                <Text size="sm" color="muted">Earned</Text>
              </div>
              <div>
                <Text className="font-heading text-3xl font-bold">
                  {badges.length}
                </Text>
                <Text size="sm" color="muted">Total</Text>
              </div>
              <div>
                <Text className="font-heading text-3xl font-bold">
                  {Math.round((earnedBadges.length / badges.length) * 100)}%
                </Text>
                <Text size="sm" color="muted">Complete</Text>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Grid */}
        <div>
          <Heading as="h3" variant="h5" className="mb-4">
            Your Achievements
          </Heading>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                onClick={() => setSelectedBadge(badge)}
                showProgress={showProgress}
              />
            ))}
          </div>
        </div>

        {/* Rarity Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Badge Rarity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <RarityIndicator rarity="common" label="Common" />
              <RarityIndicator rarity="rare" label="Rare" />
              <RarityIndicator rarity="epic" label="Epic" />
              <RarityIndicator rarity="legendary" label="Legendary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badge Detail Modal */}
      <BadgeDetailModal
        badge={selectedBadge}
        isOpen={!!selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </>
  );
}

function BadgeCard({ 
  badge, 
  onClick, 
  showProgress 
}: { 
  badge: Badge; 
  onClick: () => void; 
  showProgress: boolean;
}) {
  const Icon = badge.icon;
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-lg border-2 transition-all",
        "hover:shadow-lg hover:-translate-y-0.5",
        "focus:outline-none focus:ring-2 focus:ring-black",
        badge.earned 
          ? "bg-white border-gray-200 hover:border-black" 
          : "bg-gray-50 border-gray-200 opacity-75"
      )}
    >
      {/* Rarity Indicator */}
      <div className={cn(
        "absolute top-2 right-2 w-2 h-2 rounded-full",
        badge.rarity === 'common' && "bg-gray-400",
        badge.rarity === 'rare' && "bg-blue-500",
        badge.rarity === 'epic' && "bg-purple-500",
        badge.rarity === 'legendary' && "bg-orange-500"
      )} />

      {/* Badge Icon */}
      <div className={cn(
        "w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center",
        badge.earned ? badge.bgColor : "bg-gray-200"
      )}>
        <Icon className={cn(
          "w-8 h-8",
          badge.earned ? badge.color : "text-gray-400"
        )} />
        {!badge.earned && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="w-5 h-5 text-gray-500" />
          </div>
        )}
      </div>

      {/* Badge Info */}
      <Text weight="medium" className="mb-1">
        {badge.name}
      </Text>
      
      {/* Progress */}
      {showProgress && badge.progress !== undefined && badge.maxProgress && !badge.earned && (
        <div className="mt-2">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
            />
          </div>
          <Text size="xs" color="muted" className="mt-1">
            {badge.progress}/{badge.maxProgress}
          </Text>
        </div>
      )}

      {badge.earned && (
        <CheckCircle className="absolute top-2 left-2 w-4 h-4 text-green-500" />
      )}
    </button>
  );
}

function CompactBadges({ badges }: { badges: Badge[] }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {badges.slice(0, 4).map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 border-white",
                badge.bgColor
              )}
            >
              <Icon className={cn("w-5 h-5", badge.color)} />
            </div>
          );
        })}
        {badges.length > 4 && (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
            <Text size="xs" weight="medium">+{badges.length - 4}</Text>
          </div>
        )}
      </div>
      <Text size="sm" weight="medium">
        {badges.length} Badges
      </Text>
    </div>
  );
}

function ListBadges({ 
  badges, 
  showProgress, 
  onBadgeClick,
  className 
}: { 
  badges: Badge[]; 
  showProgress: boolean; 
  onBadgeClick: (badge: Badge) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {badges.map((badge) => {
        const Icon = badge.icon;
        return (
          <Card
            key={badge.id}
            variant={badge.earned ? "default" : "bordered"}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              !badge.earned && "opacity-75"
            )}
            onClick={() => onBadgeClick(badge)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  badge.earned ? badge.bgColor : "bg-gray-200"
                )}>
                  <Icon className={cn(
                    "w-6 h-6",
                    badge.earned ? badge.color : "text-gray-400"
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Text weight="medium">{badge.name}</Text>
                    <RarityBadge rarity={badge.rarity} />
                    {badge.earned && <CheckCircle className="w-4 h-4 text-green-500" />}
                  </div>
                  <Text size="sm" color="muted" className="truncate">
                    {badge.description}
                  </Text>
                  
                  {showProgress && badge.progress !== undefined && badge.maxProgress && !badge.earned && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {badge.earned && badge.earnedDate && (
                  <Text size="xs" color="muted">
                    {new Date(badge.earnedDate).toLocaleDateString()}
                  </Text>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function BadgeDetailModal({ 
  badge, 
  isOpen, 
  onClose 
}: { 
  badge: Badge | null; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  if (!badge) return null;
  
  const Icon = badge.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        {/* Badge Icon */}
        <div className={cn(
          "w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center",
          badge.earned ? badge.bgColor : "bg-gray-200"
        )}>
          <Icon className={cn(
            "w-12 h-12",
            badge.earned ? badge.color : "text-gray-400"
          )} />
        </div>

        {/* Badge Info */}
        <Heading as="h3" variant="h4" className="mb-2">
          {badge.name}
        </Heading>
        
        <RarityBadge rarity={badge.rarity} size="lg" />
        
        <Text color="muted" className="mt-4 mb-6">
          {badge.description}
        </Text>

        {/* Status */}
        {badge.earned ? (
          <div className="space-y-2">
            <UIBadge variant="success" size="lg">
              <CheckCircle className="w-4 h-4 mr-1" />
              Earned
            </UIBadge>
            {badge.earnedDate && (
              <Text size="sm" color="muted">
                Earned on {new Date(badge.earnedDate).toLocaleDateString()}
              </Text>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <UIBadge variant="default" size="lg">
              <Lock className="w-4 h-4 mr-1" />
              Locked
            </UIBadge>
            
            {badge.progress !== undefined && badge.maxProgress && (
              <div className="max-w-xs mx-auto">
                <Text size="sm" weight="medium" className="mb-2">
                  Progress: {badge.progress}/{badge.maxProgress}
                </Text>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500"
                    style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function RarityIndicator({ rarity, label }: { rarity: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn(
        "w-3 h-3 rounded-full",
        rarity === 'common' && "bg-gray-400",
        rarity === 'rare' && "bg-blue-500",
        rarity === 'epic' && "bg-purple-500",
        rarity === 'legendary' && "bg-orange-500"
      )} />
      <Text size="sm">{label}</Text>
    </div>
  );
}

function RarityBadge({ rarity, size = 'sm' }: { rarity: string; size?: 'sm' | 'lg' }) {
  const colors = {
    common: 'bg-gray-100 text-gray-700',
    rare: 'bg-blue-100 text-blue-700',
    epic: 'bg-purple-100 text-purple-700',
    legendary: 'bg-orange-100 text-orange-700',
  };

  return (
    <UIBadge 
      variant="outline" 
      size={size}
      className={cn(colors[rarity as keyof typeof colors])}
    >
      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
    </UIBadge>
  );
}
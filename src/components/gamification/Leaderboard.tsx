'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { logger } from '@/lib/logger';
import {
  Trophy,
  Medal,
  Award,
  Flame,
  Star,
  Crown,
  ChevronDown,
  ChevronUp,
  User,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  totalXP: number;
  periodXP?: number;
  level: number;
  levelTitle: string;
  currentStreak: number;
  longestStreak?: number;
  badgeCount: number;
  isCurrentUser: boolean;
}

interface LeaderboardStats {
  totalUsers: number;
  period: string;
  category: string;
  userPosition: number | null;
  topUser: LeaderboardEntry | null;
}

interface LeaderboardProps {
  className?: string;
  initialPeriod?: 'all_time' | 'weekly' | 'monthly';
  initialCategory?: 'xp' | 'streak' | 'badges';
  showFilters?: boolean;
  limit?: number;
  compact?: boolean;
}

export function Leaderboard({
  className,
  initialPeriod = 'all_time',
  initialCategory = 'xp',
  showFilters = true,
  limit = 10,
  compact = false
}: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<LeaderboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState(initialPeriod);
  const [category, setCategory] = useState(initialCategory);
  const [expanded, setExpanded] = useState(!compact);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/gamification/leaderboard?period=${period}&category=${category}&limit=${limit}`
        );

        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data.leaderboard || []);
          setStats(data.stats || null);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load leaderboard');
        }
      } catch (err) {
        logger.error('Leaderboard fetch error:', err);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [period, category, limit]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-gray-500">{rank}</span>;
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case 'xp':
        return <Star className="w-5 h-5" />;
      case 'streak':
        return <Flame className="w-5 h-5" />;
      case 'badges':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getCategoryValue = (entry: LeaderboardEntry) => {
    switch (category) {
      case 'xp':
        return period === 'all_time'
          ? `${entry.totalXP.toLocaleString()} XP`
          : `${(entry.periodXP || 0).toLocaleString()} XP`;
      case 'streak':
        return `${entry.currentStreak} day${entry.currentStreak !== 1 ? 's' : ''}`;
      case 'badges':
        return `${entry.badgeCount} badge${entry.badgeCount !== 1 ? 's' : ''}`;
      default:
        return `${entry.totalXP.toLocaleString()} XP`;
    }
  };

  if (loading) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="text-center py-8 text-gray-500">
          <Trophy className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      {/* Header */}
      <div
        className={cn(
          'p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
          compact && 'cursor-pointer'
        )}
        onClick={() => compact && setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <h3 className="font-bold">Leaderboard</h3>
            {stats?.userPosition && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                You: #{stats.userPosition}
              </Badge>
            )}
          </div>
          {compact && (
            expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />
          )}
        </div>
      </div>

      {(expanded || !compact) && (
        <>
          {/* Filters */}
          {showFilters && (
            <div className="p-4 border-b bg-gray-50">
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-1">
                  {(['all_time', 'weekly', 'monthly'] as const).map((p) => (
                    <Button
                      key={p}
                      size="sm"
                      variant={period === p ? 'default' : 'outline'}
                      onClick={() => setPeriod(p)}
                    >
                      {p === 'all_time' ? 'All Time' : p.charAt(0).toUpperCase() + p.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-1 ml-auto">
                  {(['xp', 'streak', 'badges'] as const).map((c) => (
                    <Button
                      key={c}
                      size="sm"
                      variant={category === c ? 'default' : 'outline'}
                      onClick={() => setCategory(c)}
                    >
                      {c === 'xp' ? 'XP' : c.charAt(0).toUpperCase() + c.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard List */}
          <div className="divide-y">
            {leaderboard.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No entries yet. Start learning to join the leaderboard!</p>
              </div>
            ) : (
              leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={cn(
                    'flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors',
                    entry.isCurrentUser && 'bg-yellow-50 border-l-4 border-yellow-500'
                  )}
                >
                  {/* Rank */}
                  <div className="w-8 flex-shrink-0 flex items-center justify-center">
                    {getRankIcon(entry.rank)}
                  </div>

                  {/* Avatar Placeholder */}
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0',
                    entry.rank === 1 ? 'bg-yellow-500' :
                    entry.rank === 2 ? 'bg-gray-400' :
                    entry.rank === 3 ? 'bg-amber-600' :
                    'bg-blue-500'
                  )}>
                    {entry.name.charAt(0).toUpperCase()}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'font-medium truncate',
                        entry.isCurrentUser && 'text-yellow-700'
                      )}>
                        {entry.name}
                        {entry.isCurrentUser && ' (You)'}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Lv.{entry.level}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-500" />
                        {entry.currentStreak} streak
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-yellow-500" />
                        {entry.badgeCount} badges
                      </span>
                    </div>
                  </div>

                  {/* Category Value */}
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                    {getCategoryIcon()}
                    {getCategoryValue(entry)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Stats Footer */}
          {stats && stats.totalUsers > 0 && (
            <div className="p-3 bg-gray-50 border-t text-center text-xs text-gray-500">
              {stats.totalUsers.toLocaleString()} total founders
            </div>
          )}
        </>
      )}
    </Card>
  );
}

export default Leaderboard;

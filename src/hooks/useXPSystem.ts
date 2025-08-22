import { useState, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { XPEventType, prepareXPAnimation } from '@/lib/xp';
import { BadgeId } from '@/lib/badges';

interface XPAwardResponse {
  success: boolean;
  xp: {
    points: number;
    description: string;
    previousTotal: number;
    newTotal: number;
    bonusXP: number;
  };
  level: {
    previous: number;
    current: number;
    isLevelUp: boolean;
    title: string;
  };
  badges: {
    unlocked: Array<{
      id: string;
      name: string;
      description: string;
      xpReward: number;
    }>;
    total: number;
  };
}

interface XPHistoryResponse {
  events: Array<{
    id: string;
    type: string;
    points: number;
    description: string;
    createdAt: string;
  }>;
  stats: {
    totalXP: number;
    currentLevel: number;
    levelTitle: string;
    levelProgress: {
      current: number;
      required: number;
      percentage: number;
    };
    currentStreak: number;
    currentDay: number;
    totalBadges: number;
    xpLastWeek: number;
    xpByType: Record<string, number>;
  };
  pagination: {
    offset: number;
    limit: number;
    hasMore: boolean;
  };
}

export const useXPSystem = () => {
  const [loading, setLoading] = useState(false);
  const [xpAnimation, setXPAnimation] = useState<{
    show: boolean;
    points: number;
    description: string;
    levelUp?: {
      before: number;
      after: number;
      title: string;
    };
  }>({ show: false, points: 0, description: '' });
  
  const [badgeNotifications, setBadgeNotifications] = useState<Array<{
    badgeId: BadgeId;
    timestamp: number;
  }>>([]);

  // Award XP
  const awardXP = useCallback(async (eventType: XPEventType, metadata?: any) => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/xp/award', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventType, metadata }),
      });

      if (!response.ok) {
        throw new Error('Failed to award XP');
      }

      const data: XPAwardResponse = await response.json();

      // Prepare XP animation
      const animationData = prepareXPAnimation(
        eventType,
        data.xp.previousTotal,
        data.xp.newTotal
      );

      // Show XP animation
      setXPAnimation({
        show: true,
        points: data.xp.points + data.xp.bonusXP,
        description: data.xp.description,
        levelUp: data.level.isLevelUp ? {
          before: data.level.previous,
          after: data.level.current,
          title: data.level.title,
        } : undefined,
      });

      // Queue badge notifications
      if (data.badges.unlocked.length > 0) {
        const newNotifications = data.badges.unlocked.map((badge, index) => ({
          badgeId: badge.id as BadgeId,
          timestamp: Date.now() + (index * 1000), // Stagger notifications
        }));
        setBadgeNotifications(prev => [...prev, ...newNotifications]);
      }

      return data;
    } catch (error) {
      logger.error('Error awarding XP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch XP history
  const fetchXPHistory = useCallback(async (limit = 50, offset = 0) => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/xp/history?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch XP history');
      }

      const data: XPHistoryResponse = await response.json();
      return data;
    } catch (error) {
      logger.error('Error fetching XP history:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Hide XP animation
  const hideXPAnimation = useCallback(() => {
    setXPAnimation(prev => ({ ...prev, show: false }));
  }, []);

  // Process badge notification queue
  const getNextBadgeNotification = useCallback(() => {
    const now = Date.now();
    const next = badgeNotifications.find(n => n.timestamp <= now);
    
    if (next) {
      setBadgeNotifications(prev => prev.filter(n => n.badgeId !== next.badgeId));
      return next.badgeId;
    }
    
    return null;
  }, [badgeNotifications]);

  return {
    loading,
    xpAnimation,
    awardXP,
    fetchXPHistory,
    hideXPAnimation,
    getNextBadgeNotification,
    hasPendingBadges: badgeNotifications.length > 0,
  };
};
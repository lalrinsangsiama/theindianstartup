'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { AchievementNotification } from '@/components/achievements/AchievementNotification';

interface Achievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  xp: number;
}

export function useAchievements() {
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]);

  // Check for new achievements
  const checkAchievements = useCallback(async (trigger: string, metadata?: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/achievements/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger, metadata })
      });

      if (response.ok) {
        const data = await response.json();

        // Validate response structure before using
        if (data?.newlyUnlocked && Array.isArray(data.newlyUnlocked) && data.newlyUnlocked.length > 0) {
          // Validate each achievement has required fields
          const validAchievements = data.newlyUnlocked.filter(
            (a: unknown): a is Achievement =>
              typeof a === 'object' &&
              a !== null &&
              'id' in a &&
              'title' in a &&
              'description' in a &&
              'badge' in a &&
              'xp' in a
          );

          if (validAchievements.length > 0) {
            setAchievementQueue(prev => [...prev, ...validAchievements]);
          }
        }
      }
    } catch (error) {
      logger.error('Failed to check achievements:', error);
    }
  }, []);

  // Process achievement queue
  useEffect(() => {
    if (achievementQueue.length > 0 && !currentAchievement) {
      const [next, ...rest] = achievementQueue;
      setCurrentAchievement(next);
      setAchievementQueue(rest);
    }
  }, [achievementQueue, currentAchievement]);

  // Achievement triggers
  const triggerLessonComplete = useCallback((lessonId: string) => {
    checkAchievements('lesson_complete', { lessonId });
  }, [checkAchievements]);

  const triggerCourseComplete = useCallback((courseCode: string) => {
    checkAchievements('course_complete', { courseCode });
  }, [checkAchievements]);

  const triggerStreakUpdate = useCallback((streakDays: number) => {
    checkAchievements('streak_update', { streakDays });
  }, [checkAchievements]);

  const triggerPortfolioUpdate = useCallback((completionPercent: number) => {
    checkAchievements('portfolio_update', { completionPercent });
  }, [checkAchievements]);

  const triggerProductPurchase = useCallback((productCode: string) => {
    checkAchievements('product_purchase', { productCode });
  }, [checkAchievements]);

  return {
    currentAchievement,
    clearCurrentAchievement: () => setCurrentAchievement(null),
    triggerLessonComplete,
    triggerCourseComplete,
    triggerStreakUpdate,
    triggerPortfolioUpdate,
    triggerProductPurchase,
    checkAchievements
  };
}

// Achievement context provider component
export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const { currentAchievement, clearCurrentAchievement } = useAchievements();

  return (
    <>
      {children}
      <AchievementNotification 
        achievement={currentAchievement}
        onClose={clearCurrentAchievement}
      />
    </>
  );
}
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { X, Trophy, Star } from 'lucide-react';
// Canvas-confetti will be dynamically imported when needed

interface Achievement {
  id: string;
  title: string;
  description: string;
  badge: string;
  xp: number;
}

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementNotification({ achievement, onClose }: AchievementNotificationProps) {
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  }, [onClose]);

  useEffect(() => {
    if (achievement) {
      setShow(true);

      // Dynamic import and trigger confetti
      import('canvas-confetti').then((confettiModule) => {
        const confetti = confettiModule.default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });
      }).catch(() => {});

      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement, handleClose]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-4 right-4 z-50 max-w-md"
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl">
            <div className="p-6">
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                    {achievement.badge}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-5 h-5" />
                    <Text className="font-bold text-white">
                      Achievement Unlocked!
                    </Text>
                  </div>
                  
                  <Text className="text-xl font-semibold text-white mb-1">
                    {achievement.title}
                  </Text>
                  
                  <Text size="sm" className="text-white/90">
                    {achievement.description}
                  </Text>

                  <div className="mt-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <Text className="font-semibold text-white">
                      +{achievement.xp} XP
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
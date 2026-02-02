'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BADGES, BadgeId } from '@/lib/badges';
import { Star, X } from 'lucide-react';
import { cn } from '@/lib/cn';

interface BadgeUnlockNotificationProps {
  show: boolean;
  badgeId: BadgeId | null;
  onClose: () => void;
  onComplete?: () => void;
}

export const BadgeUnlockNotification: React.FC<BadgeUnlockNotificationProps> = ({
  show,
  badgeId,
  onClose,
  onComplete,
}) => {
  useEffect(() => {
    if (show && badgeId) {
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onComplete?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, badgeId, onComplete]);

  if (!badgeId) return null;

  const badge = BADGES[badgeId];
  const Icon = badge.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 2,
                    repeatType: "loop",
                  }}
                >
                  <Star className="w-8 h-8 fill-current" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold">New Badge Unlocked!</h3>
                  <p className="text-sm opacity-90">Achievement earned</p>
                </div>
              </div>
            </div>
            
            {/* Badge content */}
            <div className="p-6">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center shadow-lg relative",
                    badge.color
                  )}
                >
                  <Icon className="w-10 h-10 text-white" />
                  
                  {/* Sparkle effects */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        x: [0, (i % 2 === 0 ? 1 : -1) * 30],
                        y: [0, (i < 2 ? -1 : 1) * 30],
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.1,
                        repeat: 1,
                      }}
                    />
                  ))}
                </motion.div>
                
                <div className="flex-1">
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold mb-1"
                  >
                    {badge.name}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600"
                  >
                    {badge.description}
                  </motion.p>
                  
                  {badge.xpReward > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-2 inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      <Star className="w-3 h-3" />
                      +{badge.xpReward} Bonus XP
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Progress bar animation */}
            <motion.div
              className="h-1 bg-gradient-to-r from-yellow-400 to-orange-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 5,
                ease: "linear",
              }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
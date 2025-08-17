import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import { cn } from '../lib/cn';

interface XPAnimationProps {
  show: boolean;
  points: number;
  description: string;
  levelUp?: {
    before: number;
    after: number;
    title: string;
  };
  onComplete?: () => void;
}

export const XPAnimation: React.FC<XPAnimationProps> = ({
  show,
  points,
  description,
  levelUp,
  onComplete,
}) => {
  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    if (show && levelUp) {
      // Show level up animation after XP animation
      const timer = setTimeout(() => {
        setShowLevelUp(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, levelUp]);

  useEffect(() => {
    if (show) {
      // Auto-hide after animation completes
      const timer = setTimeout(() => {
        onComplete?.();
        setShowLevelUp(false);
      }, levelUp ? 4000 : 2500);
      return () => clearTimeout(timer);
    }
  }, [show, levelUp, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {/* XP Points Animation */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="pointer-events-auto"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl px-8 py-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-10 h-10" />
                </motion.div>
                
                <div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl font-bold mb-1"
                  >
                    +{points} XP
                  </motion.div>
                  <div className="text-sm opacity-90">
                    {description}
                  </div>
                </div>
              </div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 100,
                    y: -Math.random() * 50 - 20,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Level Up Animation */}
          <AnimatePresence>
            {showLevelUp && levelUp && (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0, opacity: 0, rotateY: 180 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="absolute pointer-events-auto"
              >
                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white rounded-3xl px-10 py-8 shadow-2xl">
                  <div className="text-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="inline-block mb-4"
                    >
                      <TrendingUp className="w-16 h-16" />
                    </motion.div>
                    
                    <motion.h2
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-bold mb-2"
                    >
                      LEVEL UP!
                    </motion.h2>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg"
                    >
                      Level {levelUp.before} → Level {levelUp.after}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold mt-2"
                    >
                      {levelUp.title}
                    </motion.div>
                  </div>

                  {/* Confetti effect */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={cn(
                        "absolute w-3 h-3 rounded-sm",
                        i % 3 === 0 ? "bg-yellow-300" : i % 3 === 1 ? "bg-pink-300" : "bg-purple-300"
                      )}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 1,
                        rotate: 0,
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 200,
                        y: Math.random() * 100 + 50,
                        opacity: 0,
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.05,
                        ease: "easeOut",
                      }}
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};
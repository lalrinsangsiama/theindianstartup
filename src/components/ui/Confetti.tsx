'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger?: boolean;
  duration?: number;
  particleCount?: number;
  spread?: number;
}

export function Confetti({
  trigger = false,
  duration = 3000,
  particleCount = 100,
  spread = 70,
}: ConfettiProps) {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (trigger && !hasTriggered.current) {
      hasTriggered.current = true;

      const end = Date.now() + duration;

      // Launch confetti from both sides
      const frame = () => {
        confetti({
          particleCount: Math.floor(particleCount / 10),
          angle: 60,
          spread,
          origin: { x: 0, y: 0.6 },
          colors: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'],
        });

        confetti({
          particleCount: Math.floor(particleCount / 10),
          angle: 120,
          spread,
          origin: { x: 1, y: 0.6 },
          colors: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [trigger, duration, particleCount, spread]);

  return null;
}

/**
 * Fire confetti programmatically
 */
export function fireConfetti(options?: {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
}) {
  const defaults = {
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'],
  };

  confetti({
    ...defaults,
    ...options,
  });
}

/**
 * Fire celebration confetti from both sides
 */
export function fireCelebration(duration: number = 3000) {
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'],
    });

    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

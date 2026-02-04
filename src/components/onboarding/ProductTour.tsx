'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ACTIONS, EVENTS, STATUS, type CallBackProps } from 'react-joyride';
import { logger } from '@/lib/logger';

// Dynamically import Joyride to avoid SSR issues
const Joyride = dynamic(() => import('react-joyride').then(mod => mod.default), { ssr: false });

export interface TourStep {
  target: string;
  content: string;
  title?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  disableBeacon?: boolean;
}

// Dashboard tour steps
const dashboardTourSteps: TourStep[] = [
  {
    target: 'body',
    content: 'Welcome to The Indian Startup Platform! Let us show you around your new dashboard.',
    title: 'Welcome, Founder!',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '[data-tour="user-stats"]',
    content: 'Here you can see your XP, current day in the journey, and badges earned. Keep learning to level up!',
    title: 'Your Progress',
    placement: 'right',
  },
  {
    target: '[data-tour="courses-section"]',
    content: 'Access all your purchased courses here. Each course is designed to help you build a successful startup.',
    title: 'Your Courses',
    placement: 'top',
  },
  {
    target: '[data-tour="portfolio-link"]',
    content: 'Build your startup portfolio as you complete lessons. This becomes your pitch deck and investor-ready profile.',
    title: 'Startup Portfolio',
    placement: 'right',
  },
  {
    target: '[data-tour="community-link"]',
    content: 'Connect with other founders, ask questions, and share your journey with the community.',
    title: 'Join the Community',
    placement: 'right',
  },
  {
    target: '[data-tour="continue-journey"]',
    content: 'Click here to continue your startup journey! Complete daily lessons to earn XP and build your business.',
    title: 'Continue Your Journey',
    placement: 'top',
  },
  {
    target: '[data-tour="cart-button"]',
    content: 'Your cart shows courses ready for purchase. Upgrade anytime to access more content.',
    title: 'Your Cart',
    placement: 'bottom',
  },
];

// Course/Lesson tour steps
const lessonTourSteps: TourStep[] = [
  {
    target: '[data-tour="lesson-content"]',
    content: 'Read through the lesson content carefully. Each lesson is packed with actionable insights for Indian founders.',
    title: 'Lesson Content',
    placement: 'right',
    disableBeacon: true,
  },
  {
    target: '[data-tour="lesson-tasks"]',
    content: 'Complete these tasks to apply what you learned. Tasks help you build your startup step by step.',
    title: 'Action Tasks',
    placement: 'top',
  },
  {
    target: '[data-tour="upload-proof"]',
    content: 'Upload proof of your completed work to earn full XP. This builds your portfolio and tracks your progress.',
    title: 'Upload Proof',
    placement: 'top',
  },
  {
    target: '[data-tour="resources"]',
    content: 'Download templates, checklists, and resources to help you execute what you learned.',
    title: 'Resources',
    placement: 'left',
  },
  {
    target: '[data-tour="mark-complete"]',
    content: 'Mark the lesson complete when you have finished. You will earn XP and unlock the next lesson!',
    title: 'Complete Lesson',
    placement: 'top',
  },
];

interface ProductTourProps {
  tourType?: 'dashboard' | 'lesson';
  forceShow?: boolean;
}

const TOUR_STORAGE_KEY = 'productTourCompleted';

export function ProductTour({ tourType = 'dashboard', forceShow = false }: ProductTourProps) {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = tourType === 'lesson' ? lessonTourSteps : dashboardTourSteps;

  useEffect(() => {
    // Check if tour should run
    if (forceShow) {
      setRun(true);
      return;
    }

    // Check localStorage for tour completion
    try {
      const completedTours = JSON.parse(localStorage.getItem(TOUR_STORAGE_KEY) || '{}');
      if (!completedTours[tourType]) {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => setRun(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      logger.error('Error checking tour status:', error);
    }
  }, [forceShow, tourType]);

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { action, index, status, type } = data;

    // Handle step progression on STEP_AFTER event
    if (type === EVENTS.STEP_AFTER) {
      if (action === ACTIONS.NEXT) {
        setStepIndex(index + 1);
      } else if (action === ACTIONS.PREV) {
        setStepIndex(index - 1);
      }
    }

    // Handle target not found - skip to next step
    if (type === EVENTS.TARGET_NOT_FOUND) {
      setStepIndex(index + 1);
    }

    // Handle tour completion (finished all steps or clicked skip)
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      try {
        const completedTours = JSON.parse(localStorage.getItem(TOUR_STORAGE_KEY) || '{}');
        completedTours[tourType] = new Date().toISOString();
        localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(completedTours));
      } catch (error) {
        logger.error('Error saving tour status:', error);
      }
    }

    // Handle close button click
    if (action === ACTIONS.CLOSE) {
      setRun(false);
    }
  }, [tourType]);

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      disableOverlayClose
      callback={handleJoyrideCallback}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Get Started!',
        next: 'Next',
        skip: 'Skip Tour',
      }}
      styles={{
        options: {
          primaryColor: '#000000',
          textColor: '#333333',
          backgroundColor: '#ffffff',
          arrowColor: '#ffffff',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#000000',
          color: '#ffffff',
          borderRadius: '6px',
          padding: '8px 16px',
        },
        buttonBack: {
          color: '#666666',
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#999999',
        },
        tooltip: {
          borderRadius: '8px',
          padding: '20px',
        },
        tooltipTitle: {
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '8px',
        },
        tooltipContent: {
          fontSize: '14px',
          lineHeight: '1.5',
        },
        spotlight: {
          borderRadius: '8px',
        },
      }}
      floaterProps={{
        disableAnimation: true,
      }}
    />
  );
}

// Hook to manually trigger tour
export function useTour() {
  const resetTour = (tourType: 'dashboard' | 'lesson' = 'dashboard') => {
    try {
      const completedTours = JSON.parse(localStorage.getItem(TOUR_STORAGE_KEY) || '{}');
      delete completedTours[tourType];
      localStorage.setItem(TOUR_STORAGE_KEY, JSON.stringify(completedTours));
      window.location.reload();
    } catch (error) {
      logger.error('Error resetting tour:', error);
    }
  };

  const hasCompletedTour = (tourType: 'dashboard' | 'lesson' = 'dashboard'): boolean => {
    try {
      const completedTours = JSON.parse(localStorage.getItem(TOUR_STORAGE_KEY) || '{}');
      return !!completedTours[tourType];
    } catch {
      return false;
    }
  };

  return { resetTour, hasCompletedTour };
}

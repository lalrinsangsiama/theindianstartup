'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Clock, AlertTriangle } from 'lucide-react';
import {
  sessionSecurity,
  listenForSessionInvalidation,
  SECURITY_EVENTS,
  SecurityEvent,
} from '@/lib/session-security';

interface SessionTimeoutWarningProps {
  isAdmin?: boolean;
}

export function SessionTimeoutWarning({ isAdmin = false }: SessionTimeoutWarningProps) {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isExtending, setIsExtending] = useState(false);

  // Initialize session security
  useEffect(() => {
    sessionSecurity.initialize(isAdmin);

    // Register timeout callback
    const unsubscribe = sessionSecurity.onSessionTimeout(() => {
      router.push('/login?reason=session_expired');
    });

    return () => {
      unsubscribe();
      sessionSecurity.cleanup();
    };
  }, [isAdmin, router]);

  // Listen for session timeout warnings
  useEffect(() => {
    const handleTimeoutWarning = (event: CustomEvent<{ timeRemaining: number }>) => {
      setTimeRemaining(event.detail.timeRemaining);
      setShowWarning(true);
    };

    window.addEventListener('session-timeout-warning', handleTimeoutWarning as EventListener);

    return () => {
      window.removeEventListener('session-timeout-warning', handleTimeoutWarning as EventListener);
    };
  }, []);

  // Listen for session invalidation from other tabs
  useEffect(() => {
    const unsubscribe = listenForSessionInvalidation((event: SecurityEvent) => {
      // Handle different security events
      switch (event) {
        case SECURITY_EVENTS.PASSWORD_CHANGE:
          router.push('/login?reason=password_changed');
          break;
        case SECURITY_EVENTS.EMAIL_CHANGE:
          router.push('/login?reason=email_changed');
          break;
        case SECURITY_EVENTS.ADMIN_FORCED_LOGOUT:
          router.push('/login?reason=forced_logout');
          break;
        case SECURITY_EVENTS.SUSPICIOUS_ACTIVITY:
          router.push('/login?reason=security_alert');
          break;
        default:
          router.push('/login?reason=session_ended');
      }
    });

    return unsubscribe;
  }, [router]);

  // Update countdown timer
  useEffect(() => {
    if (!showWarning || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          setShowWarning(false);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showWarning, timeRemaining]);

  // Extend session by updating activity
  const handleExtendSession = useCallback(async () => {
    setIsExtending(true);
    try {
      sessionSecurity.updateActivity();
      setShowWarning(false);
    } finally {
      setIsExtending(false);
    }
  }, []);

  // Logout
  const handleLogout = useCallback(async () => {
    await sessionSecurity.invalidateSession(SECURITY_EVENTS.MANUAL_LOGOUT);
    router.push('/login');
  }, [router]);

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-100 rounded-full">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <Heading as="h3" className="text-lg">Session Expiring Soon</Heading>
        </div>

        <Text color="muted" className="mb-4">
          Your session will expire in <span className="font-bold text-amber-600">{formatTime(timeRemaining)}</span> due to inactivity.
          {isAdmin && (
            <span className="block mt-2 text-sm text-red-600">
              Admin sessions have shorter timeouts for security.
            </span>
          )}
        </Text>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Clock className="w-4 h-4" />
          <span>Click "Stay Logged In" to continue working</span>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex-1"
          >
            Logout
          </Button>
          <Button
            variant="primary"
            onClick={handleExtendSession}
            disabled={isExtending}
            className="flex-1"
          >
            {isExtending ? 'Extending...' : 'Stay Logged In'}
          </Button>
        </div>
      </div>
    </div>
  );
}

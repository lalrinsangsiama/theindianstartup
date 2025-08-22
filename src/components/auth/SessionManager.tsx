'use client';

import { useEffect, useRef, useState } from 'react';
import { logger } from '@/lib/logger';
import { useAuthContext } from '@/contexts/AuthContext';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { AlertCircle } from 'lucide-react';

const SESSION_WARNING_TIME = 5 * 60 * 1000; // 5 minutes before expiry
const SESSION_CHECK_INTERVAL = 60 * 1000; // Check every minute

export function SessionManager() {
  const { session, refreshSession } = useAuthContext();
  const [showWarning, setShowWarning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const warningTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!session) {
      setShowWarning(false);
      return;
    }

    const checkSession = () => {
      if (!session.expires_at) return;

      const expiresAt = new Date(session.expires_at * 1000);
      const now = new Date();
      const timeUntilExpiry = expiresAt.getTime() - now.getTime();

      // If session is about to expire, show warning
      if (timeUntilExpiry <= SESSION_WARNING_TIME && timeUntilExpiry > 0) {
        setShowWarning(true);
        
        // Set timeout to hide warning when session expires
        if (warningTimeoutRef.current) {
          clearTimeout(warningTimeoutRef.current);
        }
        warningTimeoutRef.current = setTimeout(() => {
          setShowWarning(false);
        }, timeUntilExpiry);
      } else if (timeUntilExpiry > SESSION_WARNING_TIME) {
        setShowWarning(false);
      }
    };

    // Check immediately
    checkSession();

    // Set up interval to check periodically
    intervalRef.current = setInterval(checkSession, SESSION_CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, [session]);

  const handleRefreshSession = async () => {
    setIsRefreshing(true);
    try {
      await refreshSession();
      setShowWarning(false);
    } catch (error) {
      logger.error('Failed to refresh session:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!showWarning) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-fade-up">
      <Alert 
        variant="warning" 
        title="Session Expiring Soon"
        icon={<AlertCircle className="w-5 h-5" />}
      >
        <div className="space-y-3">
          <p className="text-sm">
            Your session will expire in less than 5 minutes. 
            Refresh now to continue without interruption.
          </p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="primary"
              onClick={handleRefreshSession}
              isLoading={isRefreshing}
              loadingText="Refreshing..."
            >
              Refresh Session
            </Button>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowWarning(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
}
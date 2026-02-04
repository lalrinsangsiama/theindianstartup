'use client';

import { createClient } from '@/lib/supabase/client';
import { secureStorage, STORAGE_KEYS } from '@/lib/secure-storage';

// Session security configuration
const SESSION_CONFIG = {
  // Idle timeout: 30 minutes for regular users, 15 minutes for admin
  IDLE_TIMEOUT_MS: 30 * 60 * 1000,
  ADMIN_IDLE_TIMEOUT_MS: 15 * 60 * 1000,
  // Activity check interval: every minute
  ACTIVITY_CHECK_INTERVAL_MS: 60 * 1000,
  // Session extension threshold: extend if less than 5 minutes remaining
  EXTENSION_THRESHOLD_MS: 5 * 60 * 1000,
  // Max sessions per user (0 = unlimited)
  MAX_CONCURRENT_SESSIONS: 3,
};

// Session state
interface SessionState {
  lastActivity: number;
  deviceFingerprint: string;
  sessionId: string;
  isAdmin: boolean;
}

// Device fingerprint for suspicious activity detection
function generateDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server';

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 'unknown',
    navigator.platform,
  ];

  // Simple hash function
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// Generate unique session ID
function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${random}`;
}

// Session security manager
class SessionSecurityManager {
  private state: SessionState | null = null;
  private activityCheckInterval: ReturnType<typeof setInterval> | null = null;
  private activityListeners: (() => void)[] = [];
  private timeoutCallbacks: (() => void)[] = [];

  /**
   * Initialize session security
   */
  initialize(isAdmin: boolean = false): void {
    if (typeof window === 'undefined') return;

    // Load or create session state
    const savedState = secureStorage.getItem<SessionState>(STORAGE_KEYS.SESSION_STATE);
    const currentFingerprint = generateDeviceFingerprint();

    if (savedState && savedState.deviceFingerprint === currentFingerprint) {
      // Restore session
      this.state = {
        ...savedState,
        lastActivity: Date.now(),
        isAdmin,
      };
    } else {
      // New session
      this.state = {
        lastActivity: Date.now(),
        deviceFingerprint: currentFingerprint,
        sessionId: generateSessionId(),
        isAdmin,
      };
    }

    this.saveState();
    this.startActivityTracking();
    this.setupActivityListeners();
  }

  /**
   * Update last activity timestamp
   */
  updateActivity(): void {
    if (!this.state) return;

    this.state.lastActivity = Date.now();
    this.saveState();
  }

  /**
   * Check if session is still valid (not idle)
   */
  isSessionValid(): boolean {
    if (!this.state) return false;

    const timeout = this.state.isAdmin
      ? SESSION_CONFIG.ADMIN_IDLE_TIMEOUT_MS
      : SESSION_CONFIG.IDLE_TIMEOUT_MS;

    const elapsed = Date.now() - this.state.lastActivity;
    return elapsed < timeout;
  }

  /**
   * Get time until session expires
   */
  getTimeUntilExpiry(): number {
    if (!this.state) return 0;

    const timeout = this.state.isAdmin
      ? SESSION_CONFIG.ADMIN_IDLE_TIMEOUT_MS
      : SESSION_CONFIG.IDLE_TIMEOUT_MS;

    const remaining = timeout - (Date.now() - this.state.lastActivity);
    return Math.max(0, remaining);
  }

  /**
   * Check if device fingerprint matches
   */
  isDeviceValid(): boolean {
    if (!this.state) return false;
    return this.state.deviceFingerprint === generateDeviceFingerprint();
  }

  /**
   * Get current session ID
   */
  getSessionId(): string | null {
    return this.state?.sessionId || null;
  }

  /**
   * Register callback for session timeout
   */
  onSessionTimeout(callback: () => void): () => void {
    this.timeoutCallbacks.push(callback);
    return () => {
      this.timeoutCallbacks = this.timeoutCallbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Invalidate current session
   */
  async invalidateSession(reason: string = 'manual'): Promise<void> {
    if (typeof window === 'undefined') return;

    // Log security event
    try {
      await fetch('/api/user/session/invalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.state?.sessionId,
          reason,
          deviceFingerprint: this.state?.deviceFingerprint,
        }),
      });
    } catch {
      // Ignore errors - best effort
    }

    // Clear local state
    this.cleanup();

    // Sign out from Supabase
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  /**
   * Cleanup session resources
   */
  cleanup(): void {
    if (this.activityCheckInterval) {
      clearInterval(this.activityCheckInterval);
      this.activityCheckInterval = null;
    }

    this.removeActivityListeners();
    this.state = null;
    secureStorage.removeItem(STORAGE_KEYS.SESSION_STATE);
  }

  /**
   * Save session state to secure storage
   */
  private saveState(): void {
    if (!this.state) return;
    secureStorage.setItem(STORAGE_KEYS.SESSION_STATE, this.state, {
      encrypt: true,
      expiryHours: 24, // Max session duration
    });
  }

  /**
   * Start periodic activity checking
   */
  private startActivityTracking(): void {
    if (this.activityCheckInterval) {
      clearInterval(this.activityCheckInterval);
    }

    this.activityCheckInterval = setInterval(() => {
      if (!this.isSessionValid()) {
        this.handleSessionTimeout();
      } else if (this.getTimeUntilExpiry() < SESSION_CONFIG.EXTENSION_THRESHOLD_MS) {
        // Warn user about impending timeout
        this.warnAboutTimeout();
      }
    }, SESSION_CONFIG.ACTIVITY_CHECK_INTERVAL_MS);
  }

  /**
   * Setup user activity listeners
   */
  private setupActivityListeners(): void {
    if (typeof window === 'undefined') return;

    const updateActivity = () => this.updateActivity();

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true });
      this.activityListeners.push(() => window.removeEventListener(event, updateActivity));
    });
  }

  /**
   * Remove activity listeners
   */
  private removeActivityListeners(): void {
    this.activityListeners.forEach(cleanup => cleanup());
    this.activityListeners = [];
  }

  /**
   * Handle session timeout
   */
  private handleSessionTimeout(): void {
    this.timeoutCallbacks.forEach(callback => {
      try {
        callback();
      } catch {
        // Silently ignore callback errors in client-side code
      }
    });

    this.invalidateSession('idle_timeout');
  }

  /**
   * Warn user about impending timeout
   */
  private warnAboutTimeout(): void {
    // Dispatch custom event for UI components to handle
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('session-timeout-warning', {
        detail: {
          timeRemaining: this.getTimeUntilExpiry(),
        },
      });
      window.dispatchEvent(event);
    }
  }
}

// Singleton instance
export const sessionSecurity = new SessionSecurityManager();

// Session security hook for React components
export function useSessionSecurity() {
  return {
    initialize: (isAdmin?: boolean) => sessionSecurity.initialize(isAdmin),
    updateActivity: () => sessionSecurity.updateActivity(),
    isValid: () => sessionSecurity.isSessionValid(),
    getTimeRemaining: () => sessionSecurity.getTimeUntilExpiry(),
    getSessionId: () => sessionSecurity.getSessionId(),
    invalidate: (reason?: string) => sessionSecurity.invalidateSession(reason),
    onTimeout: (callback: () => void) => sessionSecurity.onSessionTimeout(callback),
    cleanup: () => sessionSecurity.cleanup(),
  };
}

// Security event types that should invalidate sessions
export const SECURITY_EVENTS = {
  PASSWORD_CHANGE: 'password_change',
  EMAIL_CHANGE: 'email_change',
  ROLE_CHANGE: 'role_change',
  SUSPICIOUS_ACTIVITY: 'suspicious_activity',
  MANUAL_LOGOUT: 'manual_logout',
  ADMIN_FORCED_LOGOUT: 'admin_forced_logout',
} as const;

export type SecurityEvent = typeof SECURITY_EVENTS[keyof typeof SECURITY_EVENTS];

/**
 * Broadcast session invalidation to other tabs
 */
export function broadcastSessionInvalidation(event: SecurityEvent): void {
  if (typeof window === 'undefined') return;

  // Use BroadcastChannel API if available
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel('session_security');
    channel.postMessage({
      type: 'invalidate',
      event,
      timestamp: Date.now(),
    });
    channel.close();
  }

  // Also use storage event as fallback
  const key = `session_invalidation_${Date.now()}`;
  localStorage.setItem(key, JSON.stringify({ event, timestamp: Date.now() }));
  localStorage.removeItem(key);
}

/**
 * Listen for session invalidation from other tabs
 */
export function listenForSessionInvalidation(callback: (event: SecurityEvent) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const cleanups: (() => void)[] = [];

  // BroadcastChannel listener
  if ('BroadcastChannel' in window) {
    const channel = new BroadcastChannel('session_security');
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'invalidate') {
        callback(event.data.event);
      }
    };
    channel.addEventListener('message', handler);
    cleanups.push(() => {
      channel.removeEventListener('message', handler);
      channel.close();
    });
  }

  // Storage event listener (fallback)
  const storageHandler = (event: StorageEvent) => {
    if (event.key?.startsWith('session_invalidation_') && event.newValue) {
      try {
        const data = JSON.parse(event.newValue);
        callback(data.event);
      } catch {
        // Ignore parse errors
      }
    }
  };
  window.addEventListener('storage', storageHandler);
  cleanups.push(() => window.removeEventListener('storage', storageHandler));

  return () => cleanups.forEach(cleanup => cleanup());
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Mail, X, RefreshCw, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';

interface EmailVerificationBannerProps {
  email: string;
  isVerified: boolean;
  onVerified?: () => void;
  className?: string;
}

const COOLDOWN_DURATION = 60; // 60 seconds
const STORAGE_KEY = 'email_verification_banner_dismissed';
const LAST_RESEND_KEY = 'email_verification_last_resend';

export function EmailVerificationBanner({
  email,
  isVerified,
  onVerified,
  className,
}: EmailVerificationBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Check if banner was dismissed in this session
  useEffect(() => {
    const dismissedUntil = sessionStorage.getItem(STORAGE_KEY);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      setDismissed(true);
    }
  }, []);

  // Check cooldown on mount
  useEffect(() => {
    const lastResend = localStorage.getItem(LAST_RESEND_KEY);
    if (lastResend) {
      const elapsed = Math.floor((Date.now() - parseInt(lastResend, 10)) / 1000);
      const remaining = Math.max(0, COOLDOWN_DURATION - elapsed);
      setCooldownRemaining(remaining);
    }
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownRemaining]);

  const handleResendVerification = useCallback(async () => {
    if (sending || cooldownRemaining > 0) return;

    setSending(true);
    setResendSuccess(false);

    try {
      const res = await fetch('/api/user/email/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        setResendSuccess(true);
        setCooldownRemaining(COOLDOWN_DURATION);
        localStorage.setItem(LAST_RESEND_KEY, Date.now().toString());
        toast.success('Verification email sent! Check your inbox.');
      } else if (res.status === 429) {
        // Rate limited
        const resetTime = data.rateLimit?.resetTime;
        if (resetTime) {
          const waitSeconds = Math.ceil((resetTime - Date.now()) / 1000);
          setCooldownRemaining(waitSeconds);
        }
        toast.error(data.error || 'Too many requests. Please wait before trying again.');
      } else {
        toast.error(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      logger.error('Failed to resend verification email:', error);
      toast.error('Failed to send verification email. Please try again.');
    } finally {
      setSending(false);
    }
  }, [sending, cooldownRemaining]);

  const handleDismiss = useCallback(() => {
    // Dismiss for 1 hour in this session
    const dismissUntil = Date.now() + 60 * 60 * 1000;
    sessionStorage.setItem(STORAGE_KEY, dismissUntil.toString());
    setDismissed(true);
  }, []);

  // Don't show if verified or dismissed
  if (isVerified || dismissed) {
    return null;
  }

  return (
    <Alert
      variant="warning"
      className={`relative ${className || ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-yellow-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Text weight="semibold" className="text-yellow-800">
              Verify your email address
            </Text>
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          </div>

          <Text size="sm" className="text-yellow-700 mb-3">
            We sent a verification link to <strong>{email}</strong>.
            Please check your inbox and spam folder to verify your email.
          </Text>

          {resendSuccess && (
            <div className="flex items-center gap-2 mb-3 p-2 bg-green-50 rounded-md border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <Text size="sm" className="text-green-700">
                Email sent! Check your inbox and spam folder.
              </Text>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={handleResendVerification}
              disabled={sending || cooldownRemaining > 0}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {sending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : cooldownRemaining > 0 ? (
                <>
                  <Clock className="w-4 h-4 mr-2" />
                  Wait {cooldownRemaining}s
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Resend Email
                </>
              )}
            </Button>

            <Text size="xs" className="text-yellow-600">
              Not in inbox? Check your spam folder
            </Text>
          </div>

          {/* Important note about email verification */}
          <div className="mt-3 p-2 bg-yellow-50 rounded-md border border-yellow-200">
            <Text size="xs" className="text-yellow-700">
              <strong>Note:</strong> You need to verify your email before making purchases.
              This helps us secure your account and send important updates.
            </Text>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-yellow-200 rounded-full transition-colors"
          aria-label="Dismiss for now"
        >
          <X className="w-4 h-4 text-yellow-600" />
        </button>
      </div>
    </Alert>
  );
}

/**
 * Compact version for use in headers or other constrained spaces
 */
export function EmailVerificationBadge({
  email,
  isVerified,
  className,
}: Omit<EmailVerificationBannerProps, 'onVerified'>) {
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    if (sending) return;
    setSending(true);

    try {
      const res = await fetch('/api/user/email/resend-verification', {
        method: 'POST',
      });

      if (res.ok) {
        toast.success('Verification email sent!');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to send email');
      }
    } catch (error) {
      toast.error('Failed to send email');
    } finally {
      setSending(false);
    }
  };

  if (isVerified) return null;

  return (
    <button
      onClick={handleResend}
      disabled={sending}
      className={`
        inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium
        bg-yellow-100 text-yellow-800 rounded-full
        hover:bg-yellow-200 transition-colors
        ${className || ''}
      `}
      title={`Verify ${email}`}
    >
      {sending ? (
        <RefreshCw className="w-3 h-3 animate-spin" />
      ) : (
        <AlertTriangle className="w-3 h-3" />
      )}
      <span>Verify Email</span>
    </button>
  );
}

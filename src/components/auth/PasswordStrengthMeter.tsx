'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Check, X, AlertTriangle, Shield, ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';
import { Text } from '@/components/ui/Typography';
import { cn } from '@/lib/cn';

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  feedback: string[];
  isAcceptable: boolean;
}

interface PasswordStrengthMeterProps {
  password: string;
  onValidationChange?: (isValid: boolean) => void;
  showBreachCheck?: boolean;
}

// Common passwords to check locally (top 50)
const COMMON_PASSWORDS = new Set([
  'password', 'password123', '123456', '12345678', '123456789', '1234567890',
  'qwerty', 'abc123', 'password1', 'admin', 'welcome', 'letmein',
  'football', 'iloveyou', 'monkey', 'dragon', 'master', 'sunshine',
  'princess', 'trustno1', 'superman', 'batman', 'passw0rd', 'login',
  'hello', 'shadow', 'baseball', 'qwerty123', 'admin123', 'root',
  'test', 'guest', 'changeme', 'default', 'secret', 'access', 'love',
  'startup', 'founder', 'business', 'company', 'india', 'indian',
  'Password@123', 'Password123!', 'Admin@123', 'Welcome@123',
]);

export function PasswordStrengthMeter({
  password,
  onValidationChange,
  showBreachCheck = true,
}: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [isBreached, setIsBreached] = useState(false);
  const [breachCount, setBreachCount] = useState<number | null>(null);
  const [checkingBreach, setCheckingBreach] = useState(false);
  const [isCommon, setIsCommon] = useState(false);

  // Calculate strength locally
  const calculateStrength = useCallback((pwd: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[a-z]/.test(pwd)) score += 0.5;
    if (/[A-Z]/.test(pwd)) score += 0.5;
    if (/\d/.test(pwd)) score += 0.5;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 1;

    if (pwd.length < 8) feedback.push('Use at least 8 characters');
    if (!/[A-Z]/.test(pwd)) feedback.push('Add uppercase letters');
    if (!/[a-z]/.test(pwd)) feedback.push('Add lowercase letters');
    if (!/\d/.test(pwd)) feedback.push('Add numbers');
    if (!/[!@#$%^&*()]/.test(pwd)) feedback.push('Add special characters');

    if (/(.)\1{2,}/.test(pwd)) score -= 0.5;
    if (/^[0-9]+$/.test(pwd)) score -= 1;

    score = Math.max(0, Math.min(4, Math.round(score)));

    const labels: Record<number, string> = {
      0: 'Very Weak',
      1: 'Weak',
      2: 'Fair',
      3: 'Strong',
      4: 'Very Strong',
    };

    const colors: Record<number, string> = {
      0: '#ef4444',
      1: '#f97316',
      2: '#eab308',
      3: '#22c55e',
      4: '#10b981',
    };

    return {
      score,
      label: labels[score],
      color: colors[score],
      feedback: feedback.slice(0, 3),
      isAcceptable: score >= 2,
    };
  }, []);

  // Check for breaches (debounced)
  const checkBreach = useCallback(async (pwd: string) => {
    if (!showBreachCheck || pwd.length < 8) return;

    setCheckingBreach(true);
    try {
      const res = await fetch('/api/auth/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsBreached(data.isBreached || false);
        setBreachCount(data.breachCount || null);
      }
    } catch {
      // Ignore errors - don't block user
    } finally {
      setCheckingBreach(false);
    }
  }, [showBreachCheck]);

  // Update on password change
  useEffect(() => {
    if (!password) {
      setStrength(null);
      setIsBreached(false);
      setBreachCount(null);
      setIsCommon(false);
      onValidationChange?.(false);
      return;
    }

    // Calculate strength immediately
    const newStrength = calculateStrength(password);
    setStrength(newStrength);

    // Check if common
    const common = COMMON_PASSWORDS.has(password.toLowerCase());
    setIsCommon(common);

    // Debounce breach check
    const timer = setTimeout(() => {
      checkBreach(password);
    }, 500);

    // Update parent validation state
    const isValid =
      newStrength.isAcceptable &&
      !common &&
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password);

    onValidationChange?.(isValid);

    return () => clearTimeout(timer);
  }, [password, calculateStrength, checkBreach, onValidationChange]);

  if (!password) return null;

  const requirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /\d/.test(password), text: 'One number' },
    { met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password), text: 'One special character', optional: true },
  ];

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      {strength && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Text size="sm" weight="medium">Password Strength</Text>
            <Text
              size="sm"
              weight="medium"
              style={{ color: strength.color }}
            >
              {strength.label}
            </Text>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(strength.score / 4) * 100}%`,
                backgroundColor: strength.color,
              }}
            />
          </div>
        </div>
      )}

      {/* Requirements Checklist */}
      <div className="space-y-1.5">
        {requirements.map((req, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center gap-2 text-sm',
              req.met ? 'text-green-600' : 'text-gray-500'
            )}
          >
            <div
              className={cn(
                'w-4 h-4 rounded-full flex items-center justify-center',
                req.met
                  ? 'bg-green-100'
                  : 'bg-gray-100'
              )}
            >
              {req.met ? (
                <Check className="w-3 h-3" />
              ) : (
                <X className="w-3 h-3" />
              )}
            </div>
            <span>{req.text}</span>
            {req.optional && <span className="text-gray-400">(optional)</span>}
          </div>
        ))}
      </div>

      {/* Common Password Warning */}
      {isCommon && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <Text size="sm" weight="medium" className="text-red-700">
              This password is too common
            </Text>
            <Text size="xs" className="text-red-600">
              Choose a more unique password for better security.
            </Text>
          </div>
        </div>
      )}

      {/* Breach Warning */}
      {showBreachCheck && (
        <div className="flex items-center gap-2">
          {checkingBreach ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <Text size="sm">Checking password security...</Text>
            </div>
          ) : isBreached ? (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg w-full">
              <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <Text size="sm" weight="medium" className="text-red-700">
                  Password found in data breach
                </Text>
                <Text size="xs" className="text-red-600">
                  This password appeared in {breachCount?.toLocaleString()} known data breaches.
                  Choose a different password.
                </Text>
              </div>
            </div>
          ) : password.length >= 8 && strength?.score && strength.score >= 2 ? (
            <div className="flex items-center gap-2 text-green-600">
              <ShieldCheck className="w-4 h-4" />
              <Text size="sm">Password not found in known breaches</Text>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

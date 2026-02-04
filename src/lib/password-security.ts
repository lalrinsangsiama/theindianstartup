/**
 * Password Security Utilities
 * - Strength calculation
 * - Breach database check (Have I Been Pwned)
 * - Common password detection
 */

import crypto from 'crypto';
import { logger } from '@/lib/logger';

// Top 100 common passwords to block
const COMMON_PASSWORDS = new Set([
  'password', 'password123', '123456', '12345678', '123456789', '1234567890',
  'qwerty', 'abc123', 'password1', 'admin', 'welcome', 'monkey', 'dragon',
  'master', 'login', 'hello', 'shadow', 'sunshine', 'princess', 'letmein',
  'football', 'baseball', 'iloveyou', 'trustno1', 'welcome1', 'superman',
  'batman', 'passw0rd', 'password!', 'Password1', 'password12', 'password2',
  '123qwe', 'qwerty123', 'qwertyuiop', 'admin123', 'root', 'toor', 'pass',
  'test', 'guest', 'master123', 'changeme', 'default', 'secret', 'access',
  'love', 'god', 'sex', 'war', 'peace', 'freedom', 'money', 'biteme',
  'whatever', 'asshole', 'fuckyou', 'computer', 'internet', 'server',
  'startup', 'founder', 'business', 'company', 'india', 'indian', 'mumbai',
  'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 'kolkata', 'jaipur',
  'entrepreneur', 'success', 'money123', 'startup123', 'founder123',
  'Password@123', 'Password123!', 'Admin@123', 'Welcome@123', 'Qwerty@123',
  'abcd1234', 'abcd@1234', '1234abcd', 'test1234', 'test@1234', 'user1234',
]);

export interface PasswordStrength {
  score: number; // 0-4 (0=weak, 4=strong)
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Strong' | 'Very Strong';
  color: string;
  feedback: string[];
  isAcceptable: boolean;
}

/**
 * Calculate password strength score
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  // Length checks
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 0.5;

  if (password.length < 8) {
    feedback.push('Use at least 8 characters');
  }

  // Character variety
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (hasLowercase) score += 0.5;
  if (hasUppercase) score += 0.5;
  if (hasNumbers) score += 0.5;
  if (hasSpecial) score += 1;

  if (!hasLowercase) feedback.push('Add lowercase letters');
  if (!hasUppercase) feedback.push('Add uppercase letters');
  if (!hasNumbers) feedback.push('Add numbers');
  if (!hasSpecial) feedback.push('Add special characters (!@#$%^&*)');

  // Penalize common patterns
  if (/^[0-9]+$/.test(password)) {
    score -= 1;
    feedback.push('Don\'t use only numbers');
  }
  if (/^[a-zA-Z]+$/.test(password)) {
    score -= 0.5;
    feedback.push('Mix letters with numbers and symbols');
  }
  if (/(.)\1{2,}/.test(password)) {
    score -= 0.5;
    feedback.push('Avoid repeating characters');
  }
  if (/^(123|abc|qwe|pass|admin)/i.test(password)) {
    score -= 1;
    feedback.push('Avoid common sequences');
  }

  // Check for sequential patterns
  if (/(?:012|123|234|345|456|567|678|789|890)/.test(password) ||
      /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
    score -= 0.5;
    feedback.push('Avoid sequential characters');
  }

  // Normalize score to 0-4
  score = Math.max(0, Math.min(4, Math.round(score)));

  const labels: Record<number, PasswordStrength['label']> = {
    0: 'Very Weak',
    1: 'Weak',
    2: 'Fair',
    3: 'Strong',
    4: 'Very Strong',
  };

  const colors: Record<number, string> = {
    0: '#ef4444', // red
    1: '#f97316', // orange
    2: '#eab308', // yellow
    3: '#22c55e', // green
    4: '#10b981', // emerald
  };

  return {
    score,
    label: labels[score],
    color: colors[score],
    feedback: feedback.slice(0, 3), // Show max 3 suggestions
    isAcceptable: score >= 2,
  };
}

/**
 * Check if password is in the common passwords list
 */
export function isCommonPassword(password: string): boolean {
  const normalized = password.toLowerCase();
  return COMMON_PASSWORDS.has(normalized);
}

/**
 * Check if password has been breached using Have I Been Pwned API
 * Uses k-anonymity - only sends first 5 chars of SHA1 hash
 */
export async function checkPasswordBreach(password: string): Promise<{
  breached: boolean;
  count?: number;
}> {
  try {
    // Generate SHA1 hash
    const hash = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex')
      .toUpperCase();

    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    // Query HIBP API with k-anonymity
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${prefix}`,
      {
        headers: {
          'Add-Padding': 'true', // Adds padding to prevent timing attacks
        },
      }
    );

    if (!response.ok) {
      // Don't block user if API is down
      return { breached: false };
    }

    const text = await response.text();
    const lines = text.split('\n');

    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix.trim() === suffix) {
        return {
          breached: true,
          count: parseInt(count.trim(), 10),
        };
      }
    }

    return { breached: false };
  } catch (error) {
    // Don't block user if check fails
    logger.error('Password breach check failed:', error);
    return { breached: false };
  }
}

/**
 * Full password validation
 */
export async function validatePassword(password: string): Promise<{
  valid: boolean;
  strength: PasswordStrength;
  isCommon: boolean;
  isBreached: boolean;
  breachCount?: number;
  errors: string[];
}> {
  const errors: string[] = [];
  const strength = calculatePasswordStrength(password);
  const isCommon = isCommonPassword(password);
  const breachResult = await checkPasswordBreach(password);

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain an uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain a lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain a number');
  }

  if (isCommon) {
    errors.push('This password is too common');
  }

  if (breachResult.breached) {
    errors.push(
      `This password has been exposed in ${breachResult.count?.toLocaleString()} data breaches`
    );
  }

  return {
    valid: errors.length === 0 && strength.isAcceptable,
    strength,
    isCommon,
    isBreached: breachResult.breached,
    breachCount: breachResult.count,
    errors,
  };
}

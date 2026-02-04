/**
 * Payment fraud detection system
 * Implements velocity checks, amount validation, and IP-based risk scoring
 */

import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { logSuspiciousActivity } from '@/lib/audit-log';

export interface FraudCheckResult {
  allowed: boolean;
  riskScore: number; // 0-100, higher is riskier
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
  requiresReview: boolean;
}

interface FraudCheckContext {
  userId: string;
  email: string;
  ipAddress: string;
  amount: number; // in paise
  productCode: string;
  userAgent?: string;
}

// Risk thresholds
const RISK_THRESHOLDS = {
  low: 25,
  medium: 50,
  high: 75,
  critical: 100,
};

// Velocity limits
const VELOCITY_LIMITS = {
  ordersPerHour: 3,
  ordersPerDay: 10,
  totalAmountPerDay: 10000000, // ₹1 lakh in paise
  failedAttemptsPerHour: 5,
};

// Suspicious amounts (in paise)
const SUSPICIOUS_AMOUNTS = {
  minAmount: 100, // ₹1 minimum
  maxAmount: 10000000, // ₹1 lakh maximum per transaction
  unusualAmounts: [999900, 9999900], // ₹9,999 and ₹99,999 (max amounts)
};

/**
 * Main fraud check function
 * Returns risk assessment for a payment attempt
 */
export async function checkPaymentFraud(
  context: FraudCheckContext
): Promise<FraudCheckResult> {
  const reasons: string[] = [];
  let riskScore = 0;

  try {
    // 1. Velocity checks
    const velocityRisk = await checkVelocity(context);
    riskScore += velocityRisk.score;
    reasons.push(...velocityRisk.reasons);

    // 2. Amount validation
    const amountRisk = checkAmount(context.amount);
    riskScore += amountRisk.score;
    reasons.push(...amountRisk.reasons);

    // 3. IP-based checks
    const ipRisk = await checkIPRisk(context.ipAddress, context.userId);
    riskScore += ipRisk.score;
    reasons.push(...ipRisk.reasons);

    // 4. Account age check
    const accountRisk = await checkAccountAge(context.userId);
    riskScore += accountRisk.score;
    reasons.push(...accountRisk.reasons);

    // 5. Email domain check
    const emailRisk = checkEmailDomain(context.email);
    riskScore += emailRisk.score;
    reasons.push(...emailRisk.reasons);

    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100);

    // Determine risk level
    const riskLevel = getRiskLevel(riskScore);

    // Log suspicious activity if risk is high
    if (riskLevel === 'high' || riskLevel === 'critical') {
      await logSuspiciousActivity(
        'high_risk_payment_attempt',
        {
          riskScore,
          riskLevel,
          reasons,
          amount: context.amount,
          productCode: context.productCode,
        },
        context.userId,
        context.ipAddress
      );
    }

    return {
      allowed: riskScore < RISK_THRESHOLDS.critical,
      riskScore,
      riskLevel,
      reasons,
      requiresReview: riskLevel === 'high',
    };
  } catch (error) {
    logger.error('Fraud check error:', error);
    // On error, fail closed for security - block transaction and require review
    return {
      allowed: false,
      riskScore: 75,
      riskLevel: 'high',
      reasons: ['Fraud check failed - transaction blocked for security review'],
      requiresReview: true,
    };
  }
}

/**
 * Check transaction velocity (orders per time period)
 */
async function checkVelocity(
  context: FraudCheckContext
): Promise<{ score: number; reasons: string[] }> {
  const reasons: string[] = [];
  let score = 0;

  try {
    const supabase = createClient();
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Orders in last hour
    const { count: ordersLastHour } = await supabase
      .from('Purchase')
      .select('*', { count: 'exact', head: true })
      .eq('userId', context.userId)
      .gte('createdAt', oneHourAgo.toISOString());

    if ((ordersLastHour || 0) >= VELOCITY_LIMITS.ordersPerHour) {
      score += 30;
      reasons.push(`High velocity: ${ordersLastHour} orders in last hour`);
    }

    // Orders in last day
    const { count: ordersLastDay } = await supabase
      .from('Purchase')
      .select('*', { count: 'exact', head: true })
      .eq('userId', context.userId)
      .gte('createdAt', oneDayAgo.toISOString());

    if ((ordersLastDay || 0) >= VELOCITY_LIMITS.ordersPerDay) {
      score += 25;
      reasons.push(`High daily volume: ${ordersLastDay} orders in last 24 hours`);
    }

    // Total amount in last day
    const { data: dayPurchases } = await supabase
      .from('Purchase')
      .select('amount')
      .eq('userId', context.userId)
      .eq('status', 'completed')
      .gte('createdAt', oneDayAgo.toISOString());

    const totalAmountToday =
      (dayPurchases || []).reduce((sum, p) => sum + (p.amount || 0), 0) +
      context.amount;

    if (totalAmountToday > VELOCITY_LIMITS.totalAmountPerDay) {
      score += 35;
      reasons.push(
        `High daily spend: ₹${Math.round(totalAmountToday / 100)} today`
      );
    }

    // Failed attempts in last hour
    const { count: failedAttempts } = await supabase
      .from('Purchase')
      .select('*', { count: 'exact', head: true })
      .eq('userId', context.userId)
      .eq('status', 'failed')
      .gte('createdAt', oneHourAgo.toISOString());

    if ((failedAttempts || 0) >= VELOCITY_LIMITS.failedAttemptsPerHour) {
      score += 40;
      reasons.push(`Multiple failed attempts: ${failedAttempts} in last hour`);
    }
  } catch (error) {
    logger.error('Velocity check error:', error);
  }

  return { score, reasons };
}

/**
 * Check amount for suspicious patterns
 */
function checkAmount(amount: number): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  // Below minimum
  if (amount < SUSPICIOUS_AMOUNTS.minAmount) {
    score += 50;
    reasons.push(`Amount below minimum: ₹${amount / 100}`);
  }

  // Above maximum
  if (amount > SUSPICIOUS_AMOUNTS.maxAmount) {
    score += 60;
    reasons.push(`Amount above maximum: ₹${amount / 100}`);
  }

  // Unusual amount patterns (testing fraud)
  if (amount === 100) {
    // Exactly ₹1
    score += 15;
    reasons.push('Unusually small test amount');
  }

  return { score, reasons };
}

/**
 * Check IP address for risk factors
 */
async function checkIPRisk(
  ipAddress: string,
  userId: string
): Promise<{ score: number; reasons: string[] }> {
  const reasons: string[] = [];
  let score = 0;

  try {
    const supabase = createClient();

    // Check if IP has been used by other users recently
    const { data: otherUsers } = await supabase
      .from('AuditLog')
      .select('user_id')
      .eq('ip_address', ipAddress)
      .neq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .limit(10);

    const uniqueUsers = new Set((otherUsers || []).map(u => u.user_id));
    if (uniqueUsers.size > 3) {
      score += 25;
      reasons.push(`IP used by ${uniqueUsers.size} different users recently`);
    }

    // Check for VPN/proxy indicators (basic check)
    if (ipAddress === 'unknown' || !ipAddress) {
      score += 15;
      reasons.push('IP address not available');
    }
  } catch (error) {
    logger.error('IP risk check error:', error);
  }

  return { score, reasons };
}

/**
 * Check account age - new accounts are riskier
 */
async function checkAccountAge(
  userId: string
): Promise<{ score: number; reasons: string[] }> {
  const reasons: string[] = [];
  let score = 0;

  try {
    const supabase = createClient();
    const { data: user } = await supabase
      .from('User')
      .select('createdAt')
      .eq('id', userId)
      .single();

    if (user?.createdAt) {
      const accountAge = Date.now() - new Date(user.createdAt).getTime();
      const hoursOld = accountAge / (1000 * 60 * 60);

      if (hoursOld < 1) {
        score += 30;
        reasons.push('Account less than 1 hour old');
      } else if (hoursOld < 24) {
        score += 15;
        reasons.push('Account less than 24 hours old');
      }
    }
  } catch (error) {
    logger.error('Account age check error:', error);
  }

  return { score, reasons };
}

/**
 * Check email domain for disposable/risky domains
 */
function checkEmailDomain(email: string): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const disposableDomains = [
    'tempmail.com',
    'throwaway.com',
    'guerrillamail.com',
    'mailinator.com',
    '10minutemail.com',
    'temp-mail.org',
    'fakeinbox.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();

  if (domain && disposableDomains.some(d => domain.includes(d))) {
    score += 40;
    reasons.push('Disposable email domain detected');
  }

  // Check for suspicious patterns in email
  if (email.includes('+') && email.includes('@gmail')) {
    // Gmail aliases are legitimate but sometimes used for abuse
    score += 5;
  }

  return { score, reasons };
}

/**
 * Get risk level from score
 */
function getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= RISK_THRESHOLDS.critical) return 'critical';
  if (score >= RISK_THRESHOLDS.high) return 'high';
  if (score >= RISK_THRESHOLDS.medium) return 'medium';
  return 'low';
}

/**
 * Record a failed payment for velocity tracking
 */
export async function recordFailedPayment(
  userId: string,
  reason: string,
  ipAddress?: string
): Promise<void> {
  await logSuspiciousActivity(
    'payment_failed',
    { reason },
    userId,
    ipAddress
  );
}

/**
 * Block a user from making payments
 */
export async function blockUserPayments(
  userId: string,
  reason: string,
  adminUserId?: string
): Promise<void> {
  try {
    const supabase = createClient();
    await supabase
      .from('User')
      .update({
        paymentBlocked: true,
        paymentBlockedReason: reason,
        paymentBlockedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .eq('id', userId);

    await logSuspiciousActivity(
      'user_payment_blocked',
      { reason, blockedBy: adminUserId },
      userId
    );
  } catch (error) {
    logger.error('Failed to block user payments:', error);
    throw error;
  }
}

import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Pricing plans
export const PRICING_PLANS = {
  '30_day_journey': {
    id: '30_day_journey',
    name: '30-Day Startup Launch System',
    amount: 499900, // ₹4,999 in paise
    originalAmount: 999900, // ₹9,999 in paise
    currency: 'INR',
    description: 'Complete implementation system to launch your startup in 30 days',
    features: [
      '150+ hours of structured content',
      '500+ step-by-step action items',
      '100+ downloadable templates & tools',
      'India-specific compliance guidance',
      'Legal entity formation walkthrough',
      'GST & tax compliance guidance',
      'DPIIT & Startup India benefits',
      'Market research frameworks',
      'Business model canvas',
      'MVP development roadmap',
      'Pitch deck templates',
      'Financial projections tools',
      'Gamified progress tracking',
      'Founder community access',
      'Weekly expert office hours',
      '365 days platform access',
      'Lifetime content updates'
    ],
    accessDays: 365,
  },
} as const;

export type PricingPlanId = keyof typeof PRICING_PLANS;

// Create Razorpay order
export async function createRazorpayOrder(planId: PricingPlanId, userEmail: string) {
  const plan = PRICING_PLANS[planId];
  
  const options = {
    amount: plan.amount,
    currency: plan.currency,
    receipt: `receipt_${Date.now()}`,
    notes: {
      plan_id: planId,
      user_email: userEmail,
      plan_name: plan.name,
    },
  };

  const order = await razorpay.orders.create(options);
  return order;
}

// Verify Razorpay payment signature
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
}

// Get plan details
export function getPlanDetails(planId: PricingPlanId) {
  return PRICING_PLANS[planId];
}

// Get the default plan (for single product focus)
export function getDefaultPlan() {
  return PRICING_PLANS['30_day_journey'];
}

// Format amount for display
export function formatAmount(amountInPaise: number): string {
  const amount = amountInPaise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Calculate GST (18% for digital services in India)
export function calculateGST(amountInPaise: number) {
  const gstRate = 0.18;
  const baseAmount = Math.round(amountInPaise / (1 + gstRate));
  const gstAmount = amountInPaise - baseAmount;
  
  return {
    baseAmount,
    gstAmount,
    totalAmount: amountInPaise,
    gstRate: gstRate * 100,
  };
}

// Razorpay script loader for client-side
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}
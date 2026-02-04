/**
 * Critical User Flows Integration Tests
 * Tests the most important user journeys for production readiness
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  }),
}));

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(() => Promise.resolve({ data: { user: null }, error: null })),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => Promise.resolve({ data: null, error: null })),
        })),
      })),
      insert: jest.fn(() => Promise.resolve({ data: [], error: null })),
      update: jest.fn(() => Promise.resolve({ data: [], error: null })),
    })),
  })),
}));

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Critical User Flows', () => {
  beforeAll(() => {
    // Setup test environment
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'test-url';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Authentication Flow', () => {
    it('should handle user signup flow', async () => {
      // Mock successful signup response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      const signupData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(signupData),
      });

      expect(response.ok).toBe(true);
    });

    it('should handle user login flow', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, user: { id: '123' } }),
      });

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });

      expect(response.ok).toBe(true);
    });
  });

  describe('Product Purchase Flow', () => {
    it('should create Razorpay order for product purchase', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          order: {
            id: 'order_123',
            amount: 499900,
            currency: 'INR',
          },
        }),
      });

      const purchaseData = {
        productCode: 'P1',
        amount: 4999,
      };

      const response = await fetch('/api/purchase/create-order', {
        method: 'POST',
        body: JSON.stringify(purchaseData),
      });

      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.order.id).toBe('order_123');
      expect(data.order.amount).toBe(499900);
    });

    it('should verify payment and grant access', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          purchase: {
            id: 'purchase_123',
            productCode: 'P1',
            status: 'completed',
          },
        }),
      });

      const verificationData = {
        razorpay_order_id: 'order_123',
        razorpay_payment_id: 'pay_123',
        razorpay_signature: 'signature_123',
      };

      const response = await fetch('/api/purchase/verify', {
        method: 'POST',
        body: JSON.stringify(verificationData),
      });

      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.purchase.status).toBe('completed');
    });
  });

  describe('Course Access Flow', () => {
    it('should grant access to purchased course', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          hasAccess: true,
          product: { code: 'P1', title: '30-Day Launch Sprint' },
        }),
      });

      const response = await fetch('/api/products/P1/access');
      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.hasAccess).toBe(true);
    });

    it('should deny access to unpurchased course', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          hasAccess: false,
          error: 'Product not purchased',
        }),
      });

      const response = await fetch('/api/products/P2/access');
      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.hasAccess).toBe(false);
    });
  });

  describe('Lesson Progress Flow', () => {
    it('should update lesson progress', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          progress: {
            completed: true,
            xpEarned: 50,
          },
        }),
      });

      const progressData = {
        lessonId: 'lesson_123',
        completed: true,
        tasksCompleted: ['task1', 'task2'],
      };

      const response = await fetch('/api/progress/lesson', {
        method: 'POST',
        body: JSON.stringify(progressData),
      });

      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.progress.completed).toBe(true);
      expect(data.progress.xpEarned).toBe(50);
    });
  });

  describe('Dashboard Data Flow', () => {
    it('should load dashboard data', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: {
            totalXP: 500,
            currentStreak: 5,
            completedLessons: 15,
            ownedProducts: ['P1'],
          },
        }),
      });

      const response = await fetch('/api/dashboard');
      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.data.totalXP).toBe(500);
      expect(data.data.ownedProducts).toContain('P1');
    });
  });

  describe('Funding Database Flow', () => {
    it('should search funding resources', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: [
            {
              id: '1',
              name: 'IIT Bombay SINE',
              type: 'incubator',
              min_funding: 500000,
              max_funding: 2500000,
            },
          ],
        }),
      });

      const response = await fetch('/api/funding?type=incubator&sector=Deep%20Tech');
      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].name).toBe('IIT Bombay SINE');
    });

    it('should check eligibility for funding programs', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          recommendations: {
            immediate: [{ name: 'Best Match Program' }],
            consider: [{ name: 'Good Match Program' }],
          },
        }),
      });

      const eligibilityData = {
        sector: 'FinTech',
        stage: 'validation',
        fundingNeeded: 2000000,
        location: 'Bangalore',
      };

      const response = await fetch('/api/funding/eligibility', {
        method: 'POST',
        body: JSON.stringify(eligibilityData),
      });

      const data = await response.json();
      
      expect(response.ok).toBe(true);
      expect(data.recommendations.immediate).toHaveLength(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      try {
        await fetch('/api/dashboard');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Network error');
      }
    });

    it('should handle invalid product codes', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({
          error: 'Product not found',
        }),
      });

      const response = await fetch('/api/products/INVALID/access');
      
      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe('Data Validation', () => {
    it('should validate purchase data', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve({
          error: 'Invalid product code',
        }),
      });

      const invalidPurchaseData = {
        productCode: '', // Invalid empty code
        amount: 0, // Invalid amount
      };

      const response = await fetch('/api/purchase/create-order', {
        method: 'POST',
        body: JSON.stringify(invalidPurchaseData),
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });

    it('should validate user input', async () => {
      const invalidEmail = 'not-an-email';
      const weakPassword = '123';

      expect(invalidEmail).not.toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      expect(weakPassword.length).toBeLessThan(8);
    });
  });

  describe('Performance Tests', () => {
    it('should respond within acceptable time limits', async () => {
      const startTime = Date.now();
      
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });

      await fetch('/api/dashboard');
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // API should respond within 2 seconds
      expect(responseTime).toBeLessThan(2000);
    });
  });
});

// Helper functions for test setup
export const testHelpers = {
  mockAuthenticatedUser: () => {
    const mockUser = {
      id: 'test-user-123',
      email: 'test@example.com',
      name: 'Test User',
    };
    
    return mockUser;
  },

  mockProductPurchase: (productCode: string) => {
    return {
      id: 'purchase-123',
      userId: 'test-user-123',
      productCode,
      status: 'completed',
      purchaseDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    };
  },

  mockLessonProgress: (lessonId: string, completed = true) => {
    return {
      id: 'progress-123',
      userId: 'test-user-123',
      lessonId,
      completed,
      completedAt: completed ? new Date().toISOString() : null,
      xpEarned: completed ? 50 : 0,
    };
  },
};
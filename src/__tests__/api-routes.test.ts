/**
 * API Routes Integration Tests
 * Tests all critical API endpoints for production readiness
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { NextRequest } from 'next/server';

// Mock environment variables
process.env.RAZORPAY_KEY_ID = 'test_key';
process.env.RAZORPAY_KEY_SECRET = 'test_secret';
process.env.NEXT_PUBLIC_SUPABASE_URL = 'test_url';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test_service_key';

// Mock Razorpay
jest.mock('razorpay', () => {
  return jest.fn().mockImplementation(() => ({
    orders: {
      create: jest.fn().mockResolvedValue({
        id: 'order_test123',
        amount: 499900,
        currency: 'INR',
        status: 'created',
      }),
    },
    payments: {
      fetch: jest.fn().mockResolvedValue({
        id: 'pay_test123',
        order_id: 'order_test123',
        status: 'captured',
        amount: 499900,
      }),
    },
  }));
});

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-user', email: 'test@example.com' } },
        error: null,
      }),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({
            data: { id: 'test-product', code: 'P1', price: 4999 },
            error: null,
          }),
        })),
        order: jest.fn(() => ({
          limit: jest.fn().mockResolvedValue({
            data: [{ id: '1', name: 'Test Resource' }],
            error: null,
          }),
        })),
      })),
      insert: jest.fn().mockResolvedValue({
        data: [{ id: 'new-record' }],
        error: null,
      }),
      update: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({
          data: [{ id: 'updated-record' }],
          error: null,
        }),
      })),
    })),
  })),
}));

// Import API handlers
import { GET as dashboardGET } from '@/app/api/dashboard/route';
import { POST as purchaseCreatePOST } from '@/app/api/purchase/create-order/route';
import { POST as purchaseVerifyPOST } from '@/app/api/purchase/verify/route';
import { GET as fundingGET } from '@/app/api/funding/route';
import { POST as fundingEligibilityPOST } from '@/app/api/funding/eligibility/route';

describe('API Routes Tests', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('/api/dashboard', () => {
    it('should return dashboard data for authenticated user', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/dashboard');
      
      const response = await dashboardGET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success');
    });

    it('should handle unauthenticated requests', async () => {
      // Mock unauthenticated state
      const { createClient } = require('@supabase/supabase-js');
      createClient().auth.getUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Not authenticated' },
      });

      mockRequest = new NextRequest('http://localhost:3000/api/dashboard');
      
      const response = await dashboardGET(mockRequest);

      expect(response.status).toBe(401);
    });
  });

  describe('/api/purchase/create-order', () => {
    it('should create Razorpay order for valid product', async () => {
      const requestBody = {
        productCode: 'P1',
        amount: 4999,
      };

      mockRequest = new NextRequest('http://localhost:3000/api/purchase/create-order', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await purchaseCreatePOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(data.order).toHaveProperty('id');
      expect(data.order.amount).toBe(499900); // Amount in paise
    });

    it('should reject invalid product codes', async () => {
      const requestBody = {
        productCode: 'INVALID',
        amount: 4999,
      };

      // Mock product not found
      const { createClient } = require('@supabase/supabase-js');
      createClient().from().select().eq().single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Product not found' },
      });

      mockRequest = new NextRequest('http://localhost:3000/api/purchase/create-order', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await purchaseCreatePOST(mockRequest);

      expect(response.status).toBe(404);
    });

    it('should validate request body', async () => {
      const requestBody = {
        // Missing required fields
      };

      mockRequest = new NextRequest('http://localhost:3000/api/purchase/create-order', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await purchaseCreatePOST(mockRequest);

      expect(response.status).toBe(400);
    });
  });

  describe('/api/purchase/verify', () => {
    it('should verify valid payment signature', async () => {
      const requestBody = {
        razorpay_order_id: 'order_test123',
        razorpay_payment_id: 'pay_test123',
        razorpay_signature: 'valid_signature',
      };

      mockRequest = new NextRequest('http://localhost:3000/api/purchase/verify', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await purchaseVerifyPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
    });

    it('should reject invalid signatures', async () => {
      const requestBody = {
        razorpay_order_id: 'order_test123',
        razorpay_payment_id: 'pay_test123',
        razorpay_signature: 'invalid_signature',
      };

      mockRequest = new NextRequest('http://localhost:3000/api/purchase/verify', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await purchaseVerifyPOST(mockRequest);

      expect(response.status).toBe(400);
    });
  });

  describe('/api/funding', () => {
    it('should return funding resources with filters', async () => {
      const url = new URL('http://localhost:3000/api/funding?type=incubator&sector=FinTech');
      mockRequest = new NextRequest(url);

      const response = await fundingGET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBe(true);
    });

    it('should handle search parameters', async () => {
      const url = new URL('http://localhost:3000/api/funding?search=IIT&location=Mumbai');
      mockRequest = new NextRequest(url);

      const response = await fundingGET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('summary');
    });

    it('should implement pagination', async () => {
      const url = new URL('http://localhost:3000/api/funding?limit=10&offset=20');
      mockRequest = new NextRequest(url);

      const response = await fundingGET(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('pagination');
      expect(data.pagination.limit).toBe(10);
      expect(data.pagination.offset).toBe(20);
    });
  });

  describe('/api/funding/eligibility', () => {
    it('should provide eligibility recommendations', async () => {
      const requestBody = {
        sector: 'FinTech',
        stage: 'validation',
        location: 'Bangalore',
        teamSize: 3,
        monthlyRevenue: 100000,
        fundingNeeded: 2000000,
        hasMVP: true,
        preferredEquity: 10,
      };

      mockRequest = new NextRequest('http://localhost:3000/api/funding/eligibility', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await fundingEligibilityPOST(mockRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('success', true);
      expect(data).toHaveProperty('recommendations');
      expect(data.recommendations).toHaveProperty('immediate');
      expect(data.recommendations).toHaveProperty('consider');
      expect(data).toHaveProperty('actionPlan');
    });

    it('should validate required eligibility fields', async () => {
      const requestBody = {
        // Missing required fields
        sector: 'FinTech',
      };

      mockRequest = new NextRequest('http://localhost:3000/api/funding/eligibility', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await fundingEligibilityPOST(mockRequest);

      expect(response.status).toBe(400);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      // Mock database error
      const { createClient } = require('@supabase/supabase-js');
      createClient().from().select.mockImplementationOnce(() => {
        throw new Error('Database connection failed');
      });

      mockRequest = new NextRequest('http://localhost:3000/api/dashboard');
      
      const response = await dashboardGET(mockRequest);

      expect(response.status).toBe(500);
    });

    it('should handle malformed JSON requests', async () => {
      mockRequest = new NextRequest('http://localhost:3000/api/purchase/create-order', {
        method: 'POST',
        body: 'invalid json',
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await purchaseCreatePOST(mockRequest);

      expect(response.status).toBe(400);
    });
  });

  describe('Security Tests', () => {
    it('should sanitize user input', async () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const requestBody = {
        sector: maliciousInput,
        stage: 'validation',
        fundingNeeded: 1000000,
      };

      mockRequest = new NextRequest('http://localhost:3000/api/funding/eligibility', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await fundingEligibilityPOST(mockRequest);
      const data = await response.json();

      // Should either sanitize the input or reject it
      expect([200, 400]).toContain(response.status);
      if (response.status === 200) {
        expect(JSON.stringify(data)).not.toContain('<script>');
      }
    });

    it('should enforce rate limiting (when implemented)', async () => {
      // This test would verify rate limiting is working
      // For now, we'll just ensure the endpoint responds
      mockRequest = new NextRequest('http://localhost:3000/api/dashboard');
      
      const response = await dashboardGET(mockRequest);
      
      expect(response.status).toBeLessThan(500);
    });
  });
});

// Custom Jest matcher
expect.extend({
  toBeOneOf(received, expected) {
    const pass = expected.includes(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be one of ${expected.join(', ')}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be one of ${expected.join(', ')}`,
        pass: false,
      };
    }
  },
});
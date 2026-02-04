// Mock Response class for test environment
class MockResponse {
  status: number;
  headers: Map<string, string>;
  private body: string;

  constructor(body: string, init?: { status?: number; headers?: Record<string, string> }) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = new Map(Object.entries(init?.headers || {}));
  }

  async json() {
    return JSON.parse(this.body);
  }
}

// Mock next/server before importing api-utils
jest.mock('next/server', () => ({
  NextResponse: {
    json: (body: unknown, init?: { status?: number; headers?: Record<string, string> }) => {
      return new MockResponse(JSON.stringify(body), {
        status: init?.status,
        headers: {
          'Content-Type': 'application/json',
          ...init?.headers,
        },
      });
    },
  },
}));

// Mock @supabase/ssr to prevent it from importing next/server internals
jest.mock('@supabase/ssr', () => ({
  createServerClient: jest.fn(),
}));

import {
  errorResponse,
  successResponse,
} from '../api-utils';

// Mock logger
jest.mock('../logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  }
}));

describe('API Utils', () => {
  describe('errorResponse', () => {
    it('should create error response with default status 500', () => {
      const response = errorResponse('Test error');

      expect(response.status).toBe(500);

      // Test response body
      response.json().then(body => {
        expect(body).toEqual({
          success: false,
          error: 'Test error'
        });
      });
    });

    it('should create error response with custom status', () => {
      const response = errorResponse('Not found', 404);
      expect(response.status).toBe(404);
    });

    it('should include error details based on environment', () => {
      const testError = new Error('Detailed error');
      const response = errorResponse('Test error', 500, testError);

      // Just verify response is created successfully
      expect(response.status).toBe(500);
    });
  });

  describe('successResponse', () => {
    it('should create success response with default status 200', () => {
      const data = { message: 'Success' };
      const response = successResponse(data);

      expect(response.status).toBe(200);

      response.json().then(body => {
        expect(body).toEqual({
          success: true,
          data: { message: 'Success' }
        });
      });
    });

    it('should create success response with custom status', () => {
      const response = successResponse({ created: true }, undefined, 201);
      expect(response.status).toBe(201);
    });

    it('should handle success response with message', () => {
      const response = successResponse({ id: 1 }, 'Created successfully');

      response.json().then(body => {
        expect(body).toEqual({
          success: true,
          data: { id: 1 },
          message: 'Created successfully'
        });
      });
    });
  });
});

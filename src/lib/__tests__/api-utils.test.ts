import { 
  errorResponse, 
  successResponse, 
  validateRequestMethod, 
  getAuthenticatedUser,
  handleAsyncError 
} from '../api-utils';
import { NextRequest } from 'next/server';

// Mock logger
jest.mock('../logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  }
}));

// Mock Next.js server session only if it exists
const mockGetServerSession = jest.fn();
jest.mock('next-auth/next', () => ({
  getServerSession: mockGetServerSession
}), { virtual: true });

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

    it('should include error details in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const testError = new Error('Detailed error');
      const response = errorResponse('Test error', 500, testError);
      
      response.json().then(body => {
        expect(body.details).toBe('Detailed error');
      });
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should not include error details in production', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const testError = new Error('Detailed error');
      const response = errorResponse('Test error', 500, testError);
      
      response.json().then(body => {
        expect(body.details).toBeUndefined();
      });
      
      process.env.NODE_ENV = originalEnv;
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
      const response = successResponse({ created: true }, 201);
      expect(response.status).toBe(201);
    });

    it('should handle success response without data', () => {
      const response = successResponse();
      
      response.json().then(body => {
        expect(body).toEqual({
          success: true
        });
      });
    });
  });

  describe('validateRequestMethod', () => {
    it('should pass for allowed method', () => {
      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST'
      });
      
      expect(() => validateRequestMethod(request, ['POST', 'GET'])).not.toThrow();
    });

    it('should throw for disallowed method', () => {
      const request = new NextRequest('http://localhost/api/test', {
        method: 'DELETE'
      });
      
      expect(() => validateRequestMethod(request, ['POST', 'GET'])).toThrow();
    });

    it('should create appropriate error response for wrong method', () => {
      const request = new NextRequest('http://localhost/api/test', {
        method: 'PUT'
      });
      
      try {
        validateRequestMethod(request, ['POST']);
      } catch (error: any) {
        expect(error.message).toContain('Method PUT not allowed');
      }
    });
  });

  describe('getAuthenticatedUser', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return user when authenticated', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User'
      };
      
      mockGetServerSession.mockResolvedValue({
        user: mockUser
      });

      const user = await getAuthenticatedUser();
      expect(user).toEqual(mockUser);
    });

    it('should throw error when not authenticated', async () => {
      mockGetServerSession.mockResolvedValue(null);

      await expect(getAuthenticatedUser()).rejects.toThrow();
    });

    it('should throw error when session exists but no user', async () => {
      mockGetServerSession.mockResolvedValue({});

      await expect(getAuthenticatedUser()).rejects.toThrow();
    });
  });

  describe('handleAsyncError', () => {
    it('should catch and format async errors', async () => {
      const asyncFunction = async () => {
        throw new Error('Async error');
      };

      const wrappedFunction = handleAsyncError(asyncFunction);
      const response = await wrappedFunction();

      expect(response.status).toBe(500);
      
      response.json().then(body => {
        expect(body.success).toBe(false);
        expect(body.error).toContain('Async error');
      });
    });

    it('should pass through successful responses', async () => {
      const asyncFunction = async () => {
        return successResponse({ message: 'Success' });
      };

      const wrappedFunction = handleAsyncError(asyncFunction);
      const response = await wrappedFunction();

      expect(response.status).toBe(200);
    });

    it('should handle validation errors specifically', async () => {
      const asyncFunction = async () => {
        const error = new Error('Validation failed');
        error.name = 'ValidationError';
        throw error;
      };

      const wrappedFunction = handleAsyncError(asyncFunction);
      const response = await wrappedFunction();

      expect(response.status).toBe(400);
    });
  });

  describe('Integration scenarios', () => {
    it('should handle complete API request flow', async () => {
      const request = new NextRequest('http://localhost/api/test', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      });

      // Simulate successful flow
      expect(() => validateRequestMethod(request, ['POST'])).not.toThrow();
      
      const response = successResponse({ created: true }, 201);
      expect(response.status).toBe(201);
    });

    it('should handle error scenarios gracefully', () => {
      const request = new NextRequest('http://localhost/api/test', {
        method: 'DELETE'
      });

      expect(() => validateRequestMethod(request, ['POST'])).toThrow();
      
      const errorResp = errorResponse('Method not allowed', 405);
      expect(errorResp.status).toBe(405);
    });
  });
});
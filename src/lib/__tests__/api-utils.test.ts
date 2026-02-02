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
});

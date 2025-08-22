import { logger } from '../logger';

describe('Logger', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe('Basic functionality', () => {
    it('should have all required methods', () => {
      expect(typeof logger.debug).toBe('function');
      expect(typeof logger.info).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.error).toBe('function');
    });

    it('should handle error logging without throwing', () => {
      expect(() => logger.error('Test error')).not.toThrow();
    });

    it('should handle context objects', () => {
      const context = { userId: '123', action: 'test' };
      expect(() => logger.error('Test with context', context)).not.toThrow();
    });

    it('should handle Error objects', () => {
      const error = new Error('Test error');
      expect(() => logger.error('Error occurred', error)).not.toThrow();
    });
  });

  describe('Environment handling', () => {
    it('should handle production environment', () => {
      process.env.NODE_ENV = 'production';
      expect(() => logger.error('Production error')).not.toThrow();
    });

    it('should handle test environment', () => {
      process.env.NODE_ENV = 'test';
      expect(() => logger.error('Test error')).not.toThrow();
    });
  });

  describe('Edge cases', () => {
    it('should handle null and undefined values', () => {
      expect(() => logger.error('Error with null', null)).not.toThrow();
      expect(() => logger.error('Error with undefined', undefined)).not.toThrow();
    });

    it('should handle circular references', () => {
      const circular: any = { name: 'test' };
      circular.self = circular;
      expect(() => logger.error('Circular reference', circular)).not.toThrow();
    });

    it('should handle large objects', () => {
      const large = { data: new Array(1000).fill('test') };
      expect(() => logger.error('Large object', large)).not.toThrow();
    });
  });
});
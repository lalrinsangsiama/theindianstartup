import { 
  validateActivityData, 
  validatePortfolioActivity,
  problemStatementSchema,
  businessModelSchema 
} from '../portfolio-validation';

describe('Portfolio Validation', () => {
  describe('validateActivityData', () => {
    it('should validate problem statement data correctly', () => {
      const validData = {
        problemDescription: 'This is a valid problem description',
        targetAudience: 'Startup founders',
        painPoints: ['Lack of funding', 'Market research complexity'],
        currentSolutions: ['Traditional banks'],
        marketSize: '100M+ TAM'
      };

      const result = validateActivityData('define_problem_statement', validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid problem statement data', () => {
      const invalidData = {
        problemDescription: 'Short',
        targetAudience: 'X',
        painPoints: [],
      };

      const result = validateActivityData('define_problem_statement', invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors).toContain('problemDescription: Problem description must be at least 10 characters');
      expect(result.errors).toContain('targetAudience: Target audience must be specified');
      expect(result.errors).toContain('painPoints: At least one pain point is required');
    });

    it('should validate business model data correctly', () => {
      const validData = {
        valueProposition: 'We provide comprehensive startup guidance',
        customerSegments: ['First-time founders', 'Tech entrepreneurs'],
        channels: ['Online platform', 'Mobile app'],
        revenueStreams: ['Course sales', 'Consulting fees'],
        keyResources: ['Content library'],
        keyPartners: ['Incubators'],
        costStructure: ['Content development', 'Platform maintenance']
      };

      const result = validateActivityData('business_model_canvas', validData);
      expect(result.isValid).toBe(true);
    });

    it('should accept unknown activity types', () => {
      const result = validateActivityData('unknown_activity', { any: 'data' });
      expect(result.isValid).toBe(true);
    });
  });

  describe('validatePortfolioActivity', () => {
    it('should validate complete portfolio activity', () => {
      const validActivity = {
        activityTypeId: 'define_problem_statement',
        data: {
          problemDescription: 'This is a valid problem description',
          targetAudience: 'Startup founders',
          painPoints: ['Lack of funding', 'Market research complexity']
        },
        notes: 'Some additional notes',
        files: ['file1.pdf', 'file2.png'],
        completionStatus: 'completed' as const,
        metadata: { version: 1 }
      };

      const result = validatePortfolioActivity(validActivity);
      expect(result.isValid).toBe(true);
    });

    it('should reject activity with missing required fields', () => {
      const invalidActivity = {
        data: { some: 'data' },
        notes: 'Some notes'
      };

      const result = validatePortfolioActivity(invalidActivity);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('activityTypeId: Required');
    });

    it('should validate activity with invalid nested data', () => {
      const invalidActivity = {
        activityTypeId: 'define_problem_statement',
        data: {
          problemDescription: 'Short',
          targetAudience: 'X',
          painPoints: []
        }
      };

      const result = validatePortfolioActivity(invalidActivity);
      expect(result.isValid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should default completion status to draft', () => {
      const activity = {
        activityTypeId: 'test_activity'
      };

      // This should pass validation even without explicit completionStatus
      const result = validatePortfolioActivity(activity);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Schema validation', () => {
    it('should validate problem statement schema directly', () => {
      const validData = {
        problemDescription: 'This is a valid problem description',
        targetAudience: 'Startup founders',
        painPoints: ['Lack of funding']
      };

      expect(() => problemStatementSchema.parse(validData)).not.toThrow();
    });

    it('should validate business model schema directly', () => {
      const validData = {
        valueProposition: 'We provide comprehensive startup guidance',
        customerSegments: ['First-time founders'],
        channels: ['Online platform'],
        revenueStreams: ['Course sales']
      };

      expect(() => businessModelSchema.parse(validData)).not.toThrow();
    });

    it('should reject invalid business model data', () => {
      const invalidData = {
        valueProposition: 'Short',
        customerSegments: [],
        channels: [],
        revenueStreams: []
      };

      expect(() => businessModelSchema.parse(invalidData)).toThrow();
    });
  });
});
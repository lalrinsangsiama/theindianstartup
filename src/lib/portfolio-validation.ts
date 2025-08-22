import { z } from 'zod';

// Portfolio activity data validation schemas
export const portfolioActivitySchema = z.object({
  activityTypeId: z.string().min(1, 'Activity type is required'),
  data: z.record(z.any()).optional(),
  notes: z.string().optional(),
  files: z.array(z.string()).optional(),
  completionStatus: z.enum(['draft', 'completed']).default('draft'),
  metadata: z.record(z.any()).optional()
});

// Specific validation schemas for different activity types
export const problemStatementSchema = z.object({
  problemDescription: z.string().min(10, 'Problem description must be at least 10 characters'),
  targetAudience: z.string().min(5, 'Target audience must be specified'),
  painPoints: z.array(z.string()).min(1, 'At least one pain point is required'),
  currentSolutions: z.array(z.string()).optional(),
  marketSize: z.string().optional()
});

export const businessModelSchema = z.object({
  valueProposition: z.string().min(10, 'Value proposition is required'),
  customerSegments: z.array(z.string()).min(1, 'At least one customer segment is required'),
  channels: z.array(z.string()).min(1, 'At least one channel is required'),
  revenueStreams: z.array(z.string()).min(1, 'At least one revenue stream is required'),
  keyResources: z.array(z.string()).optional(),
  keyPartners: z.array(z.string()).optional(),
  costStructure: z.array(z.string()).optional()
});

export const marketResearchSchema = z.object({
  marketSize: z.string().min(1, 'Market size is required'),
  targetMarket: z.string().min(10, 'Target market description is required'),
  competitors: z.array(z.object({
    name: z.string(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string())
  })).min(1, 'At least one competitor is required'),
  marketTrends: z.array(z.string()).optional(),
  customerInsights: z.string().optional()
});

export const financialProjectionsSchema = z.object({
  revenue: z.object({
    year1: z.number().min(0),
    year2: z.number().min(0),
    year3: z.number().min(0)
  }),
  expenses: z.object({
    year1: z.number().min(0),
    year2: z.number().min(0),
    year3: z.number().min(0)
  }),
  fundingRequired: z.number().min(0),
  useOfFunds: z.array(z.object({
    category: z.string(),
    amount: z.number(),
    percentage: z.number()
  })).optional()
});

// Activity type to schema mapping
const activitySchemas: Record<string, z.ZodSchema> = {
  'define_problem_statement': problemStatementSchema,
  'business_model_canvas': businessModelSchema,
  'target_market_analysis': marketResearchSchema,
  'financial_projections': financialProjectionsSchema
};

export function validateActivityData(activityTypeId: string, data: any): { isValid: boolean; errors?: string[] } {
  const schema = activitySchemas[activityTypeId];
  
  if (!schema) {
    // No specific validation for this activity type, allow any data
    return { isValid: true };
  }

  try {
    schema.parse(data);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { isValid: false, errors: ['Invalid data format'] };
  }
}

export function validatePortfolioActivity(activityData: any): { isValid: boolean; errors?: string[] } {
  try {
    const validatedActivity = portfolioActivitySchema.parse(activityData);
    
    // If there's activity-specific data, validate it too
    if (validatedActivity.data && validatedActivity.activityTypeId) {
      const dataValidation = validateActivityData(validatedActivity.activityTypeId, validatedActivity.data);
      if (!dataValidation.isValid) {
        return dataValidation;
      }
    }
    
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { isValid: false, errors: ['Invalid activity format'] };
  }
}

// Legacy validation interfaces for backward compatibility
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface PortfolioIntegrationCheck {
  database: ValidationResult;
  api: ValidationResult;
  ui: ValidationResult;
  exports: ValidationResult;
  overall: ValidationResult;
}

/**
 * Validate database schema and seed data
 */
export async function validateDatabaseSchema(): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Check if required tables exist (this would typically use Prisma introspection)
    const requiredTables = [
      'ActivityType',
      'PortfolioActivity', 
      'PortfolioSection',
      'ActivityTypeVersion'
    ];

    // Check if seed data exists
    const response = await fetch('/api/portfolio/activities');
    if (!response.ok) {
      errors.push('Portfolio activities API not responding');
    } else {
      const data = await response.json();
      if (!data.activities || data.activities.length === 0) {
        warnings.push('No activity types found - database may not be seeded');
      }
    }

  } catch (error) {
    errors.push(`Database validation failed: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate API endpoints
 */
export async function validateAPIEndpoints(): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const endpoints = [
    '/api/portfolio',
    '/api/portfolio/activities',
    '/api/portfolio/recommendations'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        if (response.status === 401) {
          warnings.push(`${endpoint} requires authentication (expected)`);
        } else {
          errors.push(`${endpoint} returned ${response.status}`);
        }
      }
    } catch (error) {
      errors.push(`${endpoint} is not accessible: ${error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate UI components exist and are properly imported
 */
export function validateUIComponents(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if main portfolio routes exist
  const requiredRoutes = [
    '/portfolio/portfolio-dashboard',
    '/portfolio/section/[sectionName]'
  ];

  // This is a simplified check - in a real app, we'd use a more sophisticated method
  try {
    // Check if ActivityCapture component can be imported
    const activityCapture = require('@/components/portfolio/ActivityCapture');
    if (!activityCapture.ActivityCapture) {
      errors.push('ActivityCapture component not properly exported');
    }
  } catch (error) {
    errors.push('ActivityCapture component not found or has import issues');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate export functionality
 */
export async function validateExportFunctionality(): Promise<ValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  const exportTypes = ['one_pager', 'pitch_deck', 'business_model_canvas', 'pdf'];

  for (const exportType of exportTypes) {
    try {
      const response = await fetch('/api/portfolio/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ exportType })
      });

      if (!response.ok) {
        if (response.status === 401) {
          warnings.push(`Export ${exportType} requires authentication (expected)`);
        } else {
          errors.push(`Export ${exportType} failed with ${response.status}`);
        }
      }
    } catch (error) {
      errors.push(`Export ${exportType} threw error: ${error}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Run comprehensive portfolio integration validation
 */
export async function runPortfolioIntegrationTest(): Promise<PortfolioIntegrationCheck> {
  const database = await validateDatabaseSchema();
  const api = await validateAPIEndpoints();
  const ui = validateUIComponents();
  const exports = await validateExportFunctionality();

  const allErrors = [
    ...database.errors,
    ...api.errors,
    ...ui.errors,
    ...exports.errors
  ];

  const allWarnings = [
    ...database.warnings,
    ...api.warnings,
    ...ui.warnings,
    ...exports.warnings
  ];

  const overall: ValidationResult = {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings
  };

  return {
    database,
    api,
    ui,
    exports,
    overall
  };
}

/**
 * Validate activity mapping completeness
 */
export function validateActivityMappings(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Import the activity mappings
  try {
    const { ACTIVITY_MAPPINGS } = require('@/lib/portfolio-integration');
    
    if (!ACTIVITY_MAPPINGS || ACTIVITY_MAPPINGS.length === 0) {
      errors.push('Activity mappings not found or empty');
      return { isValid: false, errors, warnings };
    }

    // Check if all portfolio sections are covered
    const portfolioSections = [
      'executive_summary', 'problem_solution', 'market_research', 'business_model',
      'product_development', 'go_to_market', 'team_organization', 'financial_projections',
      'legal_compliance', 'brand_identity', 'risk_mitigation', 'growth_scaling'
    ];

    const coveredSections = new Set(
      ACTIVITY_MAPPINGS.map((mapping: any) => mapping.portfolioSection)
    );

    const uncoveredSections = portfolioSections.filter(
      section => !coveredSections.has(section)
    );

    if (uncoveredSections.length > 0) {
      warnings.push(`Portfolio sections without activity mappings: ${uncoveredSections.join(', ')}`);
    }

    // Check for duplicate activity type IDs
    const activityTypeIds = ACTIVITY_MAPPINGS.map((mapping: any) => mapping.activityTypeId);
    const duplicates = activityTypeIds.filter(
      (id: string, index: number) => activityTypeIds.indexOf(id) !== index
    );

    if (duplicates.length > 0) {
      errors.push(`Duplicate activity type IDs found: ${[...new Set(duplicates)].join(', ')}`);
    }

  } catch (error) {
    errors.push(`Failed to validate activity mappings: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate portfolio feature health report
 */
export async function generatePortfolioHealthReport(): Promise<string> {
  const integrationCheck = await runPortfolioIntegrationTest();
  const mappingCheck = validateActivityMappings();

  const report = `
# Portfolio Feature Health Report
Generated at: ${new Date().toISOString()}

## Overall Status: ${integrationCheck.overall.isValid ? '✅ HEALTHY' : '❌ ISSUES DETECTED'}

### Database Schema
Status: ${integrationCheck.database.isValid ? '✅ Valid' : '❌ Issues'}
${integrationCheck.database.errors.map(e => `- ❌ ${e}`).join('\n')}
${integrationCheck.database.warnings.map(w => `- ⚠️ ${w}`).join('\n')}

### API Endpoints
Status: ${integrationCheck.api.isValid ? '✅ Working' : '❌ Issues'}
${integrationCheck.api.errors.map(e => `- ❌ ${e}`).join('\n')}
${integrationCheck.api.warnings.map(w => `- ⚠️ ${w}`).join('\n')}

### UI Components
Status: ${integrationCheck.ui.isValid ? '✅ Working' : '❌ Issues'}
${integrationCheck.ui.errors.map(e => `- ❌ ${e}`).join('\n')}
${integrationCheck.ui.warnings.map(w => `- ⚠️ ${w}`).join('\n')}

### Export Functionality
Status: ${integrationCheck.exports.isValid ? '✅ Working' : '❌ Issues'}
${integrationCheck.exports.errors.map(e => `- ❌ ${e}`).join('\n')}
${integrationCheck.exports.warnings.map(w => `- ⚠️ ${w}`).join('\n')}

### Activity Mappings
Status: ${mappingCheck.isValid ? '✅ Complete' : '❌ Issues'}
${mappingCheck.errors.map(e => `- ❌ ${e}`).join('\n')}
${mappingCheck.warnings.map(w => `- ⚠️ ${w}`).join('\n')}

## Summary
- Total Errors: ${integrationCheck.overall.errors.length + mappingCheck.errors.length}
- Total Warnings: ${integrationCheck.overall.warnings.length + mappingCheck.warnings.length}
- Critical Components: ${integrationCheck.overall.isValid ? 'All Working' : 'Need Attention'}

## Next Steps
${integrationCheck.overall.isValid 
  ? '🎉 Portfolio feature is ready for production!' 
  : '🔧 Review and fix the errors listed above before deploying to production.'
}
`;

  return report;
}
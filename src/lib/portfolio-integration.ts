// Portfolio Integration Utilities
// Helper functions to integrate portfolio activities with course lessons

export interface ActivityMapping {
  activityTypeId: string;
  activityName: string;
  portfolioSection: string;
  trigger: 'keyword' | 'lesson_number' | 'explicit';
  keywords?: string[];
  lessonNumbers?: number[];
}

// Mapping of course activities to portfolio activities
export const ACTIVITY_MAPPINGS: ActivityMapping[] = [
  // P1 Course Activities
  {
    activityTypeId: 'define_problem_statement',
    activityName: 'Problem Statement Definition',
    portfolioSection: 'problem_solution',
    trigger: 'keyword',
    keywords: ['problem statement', 'problem you solve', 'pain point']
  },
  {
    activityTypeId: 'solution_design',
    activityName: 'Solution Design',
    portfolioSection: 'problem_solution',
    trigger: 'keyword',
    keywords: ['solution', 'product idea', 'how you solve']
  },
  {
    activityTypeId: 'value_proposition_canvas',
    activityName: 'Value Proposition Canvas',
    portfolioSection: 'problem_solution',
    trigger: 'keyword',
    keywords: ['value proposition', 'unique value', 'benefits']
  },
  {
    activityTypeId: 'customer_persona_development',
    activityName: 'Customer Persona Development',
    portfolioSection: 'problem_solution',
    trigger: 'keyword',
    keywords: ['target customer', 'customer persona', 'ideal customer']
  },
  {
    activityTypeId: 'market_sizing',
    activityName: 'Market Sizing Analysis',
    portfolioSection: 'market_research',
    trigger: 'keyword',
    keywords: ['market size', 'TAM', 'SAM', 'SOM', 'addressable market']
  },
  {
    activityTypeId: 'competitor_analysis',
    activityName: 'Competitive Analysis',
    portfolioSection: 'market_research',
    trigger: 'keyword',
    keywords: ['competitor', 'competitive analysis', 'competition']
  },
  {
    activityTypeId: 'revenue_model_design',
    activityName: 'Revenue Model Design',
    portfolioSection: 'business_model',
    trigger: 'keyword',
    keywords: ['revenue model', 'monetization', 'how you make money']
  },
  {
    activityTypeId: 'pricing_strategy',
    activityName: 'Pricing Strategy Development',
    portfolioSection: 'business_model',
    trigger: 'keyword',
    keywords: ['pricing', 'price point', 'pricing strategy']
  },
  {
    activityTypeId: 'product_roadmap',
    activityName: 'Product Roadmap Planning',
    portfolioSection: 'product_development',
    trigger: 'keyword',
    keywords: ['product roadmap', 'feature list', 'development plan']
  },
  {
    activityTypeId: 'feature_prioritization',
    activityName: 'Feature Prioritization',
    portfolioSection: 'product_development',
    trigger: 'keyword',
    keywords: ['features', 'MVP features', 'core features']
  },
  {
    activityTypeId: 'marketing_strategy',
    activityName: 'Marketing Strategy Development',
    portfolioSection: 'go_to_market',
    trigger: 'keyword',
    keywords: ['marketing strategy', 'customer acquisition', 'marketing channels']
  },
  {
    activityTypeId: 'sales_process_design',
    activityName: 'Sales Process Design',
    portfolioSection: 'go_to_market',
    trigger: 'keyword',
    keywords: ['sales process', 'sales funnel', 'sales strategy']
  },
  {
    activityTypeId: 'team_structure_planning',
    activityName: 'Team Structure Planning',
    portfolioSection: 'team_organization',
    trigger: 'keyword',
    keywords: ['team', 'hiring', 'co-founder', 'team structure']
  },
  {
    activityTypeId: 'financial_modeling',
    activityName: 'Financial Model Creation',
    portfolioSection: 'financial_projections',
    trigger: 'keyword',
    keywords: ['financial projections', 'financial model', 'revenue forecast']
  },
  {
    activityTypeId: 'funding_requirements',
    activityName: 'Funding Requirements Analysis',
    portfolioSection: 'financial_projections',
    trigger: 'keyword',
    keywords: ['funding', 'investment', 'capital requirements']
  },
  // P2 Course Legal Activities - Enhanced
  {
    activityTypeId: 'entity_selection_decision',
    activityName: 'Entity Selection Decision',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['business structure', 'entity selection', 'private limited', 'LLP', 'incorporation choice']
  },
  {
    activityTypeId: 'incorporation_setup',
    activityName: 'Business Incorporation Setup',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['incorporation', 'business registration', 'legal entity', 'SPICe+', 'company formation']
  },
  {
    activityTypeId: 'incorporation_document_completion',
    activityName: 'Incorporation Document Completion',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['incorporation certificate', 'CIN', 'MOA', 'AOA', 'incorporation documents']
  },
  {
    activityTypeId: 'tax_registration_completion',
    activityName: 'Tax Registration Completion',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['PAN', 'TAN', 'GST', 'tax registration', 'tax compliance']
  },
  {
    activityTypeId: 'labor_law_compliance_setup',
    activityName: 'Labor Law Compliance Setup',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['EPF', 'ESI', 'labor laws', 'employment compliance', 'shop act']
  },
  {
    activityTypeId: 'ip_protection_setup',
    activityName: 'IP Protection Setup',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['trademark', 'copyright', 'IP protection', 'intellectual property', 'brand protection']
  },
  {
    activityTypeId: 'compliance_calendar_creation',
    activityName: 'Compliance Calendar Creation',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['compliance calendar', 'filing deadlines', 'regulatory compliance', 'annual filings']
  },
  {
    activityTypeId: 'compliance_checklist',
    activityName: 'Compliance Checklist Creation',
    portfolioSection: 'legal_compliance',
    trigger: 'keyword',
    keywords: ['compliance', 'legal requirements', 'regulations', 'compliance management']
  },
  {
    activityTypeId: 'brand_positioning',
    activityName: 'Brand Positioning Strategy',
    portfolioSection: 'brand_identity',
    trigger: 'keyword',
    keywords: ['brand', 'branding', 'brand identity', 'logo']
  },
  {
    activityTypeId: 'risk_assessment',
    activityName: 'Risk Assessment Analysis',
    portfolioSection: 'risk_mitigation',
    trigger: 'keyword',
    keywords: ['risk', 'challenges', 'potential problems']
  },
  {
    activityTypeId: 'growth_strategy_planning',
    activityName: 'Growth Strategy Planning',
    portfolioSection: 'growth_scaling',
    trigger: 'keyword',
    keywords: ['growth', 'scaling', 'expansion']
  },
  {
    activityTypeId: 'elevator_pitch_development',
    activityName: 'Elevator Pitch Development',
    portfolioSection: 'executive_summary',
    trigger: 'keyword',
    keywords: ['elevator pitch', 'pitch', 'summary']
  },
  {
    activityTypeId: 'mission_vision_definition',
    activityName: 'Mission & Vision Definition',
    portfolioSection: 'executive_summary',
    trigger: 'keyword',
    keywords: ['mission', 'vision', 'purpose']
  }
];

/**
 * Find relevant activities for a lesson based on content keywords
 */
export function findRelevantActivities(
  lessonContent: string, 
  lessonTitle: string, 
  courseCode: string
): ActivityMapping[] {
  const content = (lessonContent + ' ' + lessonTitle).toLowerCase();
  
  return ACTIVITY_MAPPINGS.filter(mapping => {
    if (mapping.trigger === 'keyword' && mapping.keywords) {
      return mapping.keywords.some(keyword => 
        content.includes(keyword.toLowerCase())
      );
    }
    return false;
  });
}

/**
 * Get activity suggestions for a specific lesson number in a course
 */
export function getActivitySuggestionsForLesson(
  dayNumber: number, 
  courseCode: string
): ActivityMapping[] {
  // Course-specific lesson mappings
  const courseLessonMappings: Record<string, Record<number, string[]>> = {
    'P1': {
      1: ['elevator_pitch_development', 'mission_vision_definition'],
      2: ['define_problem_statement'],
      3: ['solution_design'],
      4: ['value_proposition_canvas'],
      5: ['customer_persona_development'],
      6: ['market_sizing'],
      7: ['competitor_analysis'],
      8: ['revenue_model_design'],
      9: ['pricing_strategy'],
      10: ['product_roadmap'],
      12: ['feature_prioritization'],
      15: ['marketing_strategy'],
      18: ['sales_process_design'],
      20: ['team_structure_planning'],
      22: ['financial_modeling'],
      25: ['funding_requirements'],
      27: ['incorporation_setup'],
      28: ['compliance_checklist'],
      30: ['growth_strategy_planning']
    },
    'P2': {
      1: ['entity_selection_decision'],
      3: ['entity_selection_decision'], 
      8: ['incorporation_setup', 'incorporation_document_completion'],
      10: ['incorporation_document_completion'],
      12: ['incorporation_document_completion'],
      15: ['tax_registration_completion'],
      18: ['tax_registration_completion'],
      22: ['labor_law_compliance_setup'],
      25: ['labor_law_compliance_setup'],
      28: ['ip_protection_setup'],
      32: ['ip_protection_setup'],
      35: ['compliance_calendar_creation'],
      38: ['compliance_calendar_creation'],
      40: ['compliance_checklist']
    },
    'P3': {
      1: ['funding_requirements'],
      10: ['financial_modeling'],
      20: ['risk_assessment']
    }
    // Add more course mappings as needed
  };
  
  const lessonMappings = courseLessonMappings[courseCode];
  if (!lessonMappings || !lessonMappings[dayNumber]) {
    return [];
  }
  
  const activityIds = lessonMappings[dayNumber];
  return ACTIVITY_MAPPINGS.filter(mapping => 
    activityIds.includes(mapping.activityTypeId)
  );
}

/**
 * Check if a lesson should automatically include portfolio activities
 */
export function shouldIncludePortfolioActivities(
  lessonContent: string,
  lessonTitle: string,
  courseCode: string
): boolean {
  const relevantActivities = findRelevantActivities(lessonContent, lessonTitle, courseCode);
  return relevantActivities.length > 0;
}

/**
 * Get portfolio section completion status for cross-selling
 */
export async function getPortfolioRecommendations(userId: string): Promise<{
  incompleteSections: string[];
  suggestedCourses: string[];
}> {
  // This would typically make an API call to get portfolio status
  // For now, we'll return mock data
  return {
    incompleteSections: ['financial_projections', 'legal_compliance'],
    suggestedCourses: ['P3', 'P2']
  };
}

/**
 * Format activity data for display in portfolio
 */
export function formatActivityDataForPortfolio(
  activityTypeId: string,
  data: any
): string {
  // Simple formatting - in a real implementation, this would be more sophisticated
  if (typeof data === 'string') {
    return data;
  }
  
  if (typeof data === 'object') {
    // Extract meaningful content from structured data
    if (data.problem) return data.problem;
    if (data.solution) return data.solution;
    if (data.pitch) return data.pitch;
    if (data.mission) return data.mission;
    
    // Fallback to JSON string
    return JSON.stringify(data, null, 2);
  }
  
  return String(data);
}

/**
 * Validate activity data against schema (simplified)
 */
export function validateActivityData(
  activityTypeId: string, 
  data: any, 
  schema: any
): { isValid: boolean; errors: string[] } {
  // Simplified validation - in a real implementation, use a proper JSON schema validator
  const errors: string[] = [];
  
  if (!data) {
    errors.push('Activity data is required');
  }
  
  // Basic type checking
  if (schema.type === 'string' && typeof data !== 'string') {
    errors.push('Data must be a string');
  }
  
  if (schema.minLength && typeof data === 'string' && data.length < schema.minLength) {
    errors.push(`Data must be at least ${schema.minLength} characters long`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Get activity progress across all sections
 */
export function calculatePortfolioCompletion(activities: any[]): {
  totalSections: number;
  completedSections: number;
  overallPercentage: number;
  sectionProgress: Record<string, number>;
} {
  const sections = [
    'executive_summary', 'problem_solution', 'market_research', 'business_model',
    'product_development', 'go_to_market', 'team_organization', 'financial_projections',
    'legal_compliance', 'brand_identity', 'risk_mitigation', 'growth_scaling'
  ];
  
  const sectionProgress: Record<string, number> = {};
  
  // Calculate progress for each section
  sections.forEach(section => {
    const sectionActivities = activities.filter(a => 
      a.activityType?.portfolioSection === section && a.status === 'completed'
    );
    
    const requiredActivities = ACTIVITY_MAPPINGS.filter(m => 
      m.portfolioSection === section
    ).length;
    
    sectionProgress[section] = requiredActivities > 0 
      ? Math.round((sectionActivities.length / requiredActivities) * 100)
      : 0;
  });
  
  const completedSections = Object.values(sectionProgress).filter(p => p === 100).length;
  const overallPercentage = Object.values(sectionProgress).reduce((sum, p) => sum + p, 0) / sections.length;
  
  return {
    totalSections: sections.length,
    completedSections,
    overallPercentage: Math.round(overallPercentage),
    sectionProgress
  };
}
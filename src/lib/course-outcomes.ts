// Course outcomes definitions
// These are the INTENDED outcomes from completing courses, not fabricated user data

export interface CourseOutcome {
  code: string;
  outcomes: string[];
  metrics?: {
    timeframe: string;
    deliverables: string[];
  };
}

export const COURSE_OUTCOMES: Record<string, CourseOutcome> = {
  P1: {
    code: 'P1',
    outcomes: [
      'Validated business idea with market research',
      'Complete business plan and pitch deck',
      'Incorporated company with all registrations',
      'Go-to-market strategy ready to execute'
    ],
    metrics: {
      timeframe: '30 days',
      deliverables: ['Business plan', 'Pitch deck', 'Incorporation documents', 'MVP roadmap']
    }
  },
  P2: {
    code: 'P2',
    outcomes: [
      'Fully incorporated business entity',
      'All statutory registrations complete',
      'Compliance calendar for the year',
      'Employment contracts and HR policies'
    ],
    metrics: {
      timeframe: '40 days',
      deliverables: ['Company registration', 'GST/PAN/TAN', 'Compliance calendar', 'HR policies']
    }
  },
  P3: {
    code: 'P3',
    outcomes: [
      'Active investor pipeline with meetings',
      '18-month funding roadmap',
      'Professional financial models',
      'Investor-ready pitch deck'
    ],
    metrics: {
      timeframe: '45 days',
      deliverables: ['Financial models', 'Investor database', 'Pitch deck', 'Term sheet templates']
    }
  },
  P4: {
    code: 'P4',
    outcomes: [
      'Complete accounting infrastructure',
      'Real-time financial dashboards',
      'Investor-grade financial reports',
      'Tax-optimized structure'
    ],
    metrics: {
      timeframe: '45 days',
      deliverables: ['Accounting system', 'Financial dashboards', 'MIS templates', 'Tax planning']
    }
  },
  P5: {
    code: 'P5',
    outcomes: [
      'Complete contract library',
      'IP portfolio strategy',
      'POSH compliance setup',
      'Litigation-prevention systems'
    ],
    metrics: {
      timeframe: '45 days',
      deliverables: ['Contract templates', 'IP documentation', 'POSH policy', 'Legal framework']
    }
  },
  P6: {
    code: 'P6',
    outcomes: [
      'Predictable sales pipeline',
      'Scalable sales processes',
      'High-performing sales team structure',
      'Optimized conversion funnels'
    ],
    metrics: {
      timeframe: '60 days',
      deliverables: ['CRM setup', 'Sales scripts', 'Pipeline templates', 'Training modules']
    }
  },
  P7: {
    code: 'P7',
    outcomes: [
      'Identified schemes across all states',
      'Applications prepared for top schemes',
      'State relationship building strategy',
      'Multi-state expansion plan'
    ],
    metrics: {
      timeframe: '30 days',
      deliverables: ['Scheme database', 'Application templates', 'State contact list', 'Eligibility matrix']
    }
  },
  P8: {
    code: 'P8',
    outcomes: [
      'Professional investor data room',
      'Due diligence ready documentation',
      'Organized legal and financial documents',
      'Investor update templates'
    ],
    metrics: {
      timeframe: '45 days',
      deliverables: ['Data room structure', 'DD checklist', 'Document templates', 'Investor updates']
    }
  },
  P9: {
    code: 'P9',
    outcomes: [
      'Government funding pipeline identified',
      'Applications prepared for multiple schemes',
      'Higher approval rate methodology',
      'Ongoing scheme monitoring system'
    ],
    metrics: {
      timeframe: '21 days',
      deliverables: ['Scheme applications', 'Eligibility calculators', 'Document checklists', 'Tracking system']
    }
  },
  P10: {
    code: 'P10',
    outcomes: [
      'Complete IP audit',
      'Patent applications prepared',
      'IP portfolio strategy',
      'Licensing and monetization plan'
    ],
    metrics: {
      timeframe: '60 days',
      deliverables: ['IP audit report', 'Patent drafts', 'Portfolio plan', 'Licensing templates']
    }
  },
  P11: {
    code: 'P11',
    outcomes: [
      'Complete brand identity system',
      'Media relations strategy',
      'Award application templates',
      'Founder thought leadership plan'
    ],
    metrics: {
      timeframe: '54 days',
      deliverables: ['Brand guidelines', 'PR templates', 'Award applications', 'Content calendar']
    }
  },
  P12: {
    code: 'P12',
    outcomes: [
      'Multi-channel marketing engine',
      'Predictable CAC and LTV metrics',
      'Marketing automation setup',
      'Data-driven optimization system'
    ],
    metrics: {
      timeframe: '60 days',
      deliverables: ['Marketing strategy', 'Ad templates', 'Automation workflows', 'Analytics dashboard']
    }
  }
};

// Helper function to get outcomes for a product
export function getCourseOutcomes(productCode: string): string[] {
  return COURSE_OUTCOMES[productCode]?.outcomes || [];
}

// Helper function to get metrics for a product
export function getCourseMetrics(productCode: string): CourseOutcome['metrics'] | undefined {
  return COURSE_OUTCOMES[productCode]?.metrics;
}

export default COURSE_OUTCOMES;

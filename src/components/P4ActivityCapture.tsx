'use client';

import React, { useState, useEffect } from 'react';
import { ActivityCapture } from '@/components/portfolio/ActivityCapture';

interface P4ActivityCaptureProps {
  lessonId: string;
  courseCode: string;
  moduleId: string;
  dayNumber: number;
}

export default function P4ActivityCapture({ 
  lessonId, 
  courseCode, 
  moduleId, 
  dayNumber 
}: P4ActivityCaptureProps) {
  const [activities, setActivities] = useState<any[]>([]);

  // Define P4-specific activity mappings based on day
  const getActivitiesForDay = (day: number) => {
    const activityMappings: Record<number, any[]> = {
      // Day 1: Financial Foundation
      1: [
        {
          activityTypeId: 'financial_health_assessment',
          activityName: 'Complete Financial Health Assessment',
          description: 'Evaluate your current financial infrastructure maturity',
          category: 'Financial Planning'
        },
        {
          activityTypeId: 'finance_vision_statement',
          activityName: 'Create Finance Vision Statement',
          description: 'Define your 3-year financial transformation goals',
          category: 'Financial Planning'
        }
      ],
      
      // Day 2: Finance Architecture
      2: [
        {
          activityTypeId: 'finance_architecture_design',
          activityName: 'Design Finance Architecture',
          description: 'Create your complete 7-layer finance technology stack',
          category: 'Financial Planning'
        },
        {
          activityTypeId: 'system_selection_matrix',
          activityName: 'Complete System Selection Matrix',
          description: 'Evaluate and select accounting and finance tools',
          category: 'Financial Planning'
        }
      ],
      
      // Day 3: Chart of Accounts
      3: [
        {
          activityTypeId: 'chart_of_accounts_design',
          activityName: 'Design Custom Chart of Accounts',
          description: 'Create your business-specific chart of accounts structure',
          category: 'Financial Planning'
        }
      ],
      
      // Day 4: Accounting Policies
      4: [
        {
          activityTypeId: 'accounting_policies_manual',
          activityName: 'Create Accounting Policies Manual',
          description: 'Document comprehensive accounting policies for your startup',
          category: 'Legal Compliance'
        }
      ],
      
      // Day 5: Systems Architecture
      5: [
        {
          activityTypeId: 'financial_systems_implementation',
          activityName: 'Financial Systems Implementation Plan',
          description: 'Create detailed plan for implementing your finance tech stack',
          category: 'Financial Planning'
        }
      ],
      
      // Day 11: GST Fundamentals
      11: [
        {
          activityTypeId: 'gst_compliance_framework',
          activityName: 'GST Compliance Framework Setup',
          description: 'Establish comprehensive GST compliance processes',
          category: 'Legal Compliance'
        }
      ],
      
      // Day 22: Financial Modeling
      22: [
        {
          activityTypeId: 'financial_projections',
          activityName: 'Build Dynamic Financial Model',
          description: 'Create comprehensive 3-year financial projections',
          category: 'Financial Planning'
        },
        {
          activityTypeId: 'business_model_canvas',
          activityName: 'Financial Model Business Canvas',
          description: 'Map your financial model to business model canvas',
          category: 'Business Model'
        }
      ],
      
      // Day 28: Investor Reporting
      28: [
        {
          activityTypeId: 'investor_reporting_framework',
          activityName: 'Investor Reporting Framework',
          description: 'Create professional investor update templates',
          category: 'Financial Planning'
        }
      ],
      
      // Day 43: Team Building
      43: [
        {
          activityTypeId: 'finance_team_structure',
          activityName: 'Finance Team Organization Design',
          description: 'Design your finance team structure and hiring plan',
          category: 'Financial Planning'
        }
      ],
      
      // Day 60: IPO Readiness
      60: [
        {
          activityTypeId: 'ipo_readiness_assessment',
          activityName: 'IPO Readiness Assessment',
          description: 'Evaluate your finance function readiness for public markets',
          category: 'Financial Planning'
        }
      ]
    };

    return activityMappings[day] || [];
  };

  useEffect(() => {
    setActivities(getActivitiesForDay(dayNumber));
  }, [dayNumber]);

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              📊 Portfolio Integration
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Complete the activities below to automatically build your startup portfolio as you progress through P4.</p>
            </div>
          </div>
        </div>
      </div>

      {activities.map((activity, index) => (
        <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {activity.activityName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                {activity.category}
              </span>
            </div>
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          <ActivityCapture
            activityTypeId={activity.activityTypeId}
            activityName={activity.activityName}
            lessonId={lessonId}
            courseCode={courseCode}
            moduleId={moduleId}
          />
        </div>
      ))}

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Portfolio Building in Progress
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Your responses are automatically building your startup's financial infrastructure portfolio. 
                Visit <a href="/portfolio" className="font-medium underline">your portfolio dashboard</a> to see how these activities 
                contribute to your overall startup profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility component for specific P4 financial activities
export function FinancialHealthAssessment({ lessonId, courseCode, moduleId }: P4ActivityCaptureProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">📊 Financial Health Assessment</h3>
      <p className="text-gray-600 mb-6">
        Complete our comprehensive 100-point assessment to understand your current financial maturity level.
      </p>
      
      <div className="space-y-4">
        <a 
          href="/templates/p4-financial-health-assessment.html" 
          target="_blank"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Complete Assessment
        </a>
      </div>
      
      <ActivityCapture
        activityTypeId="financial_health_assessment"
        activityName="Financial Health Assessment Results"
        lessonId={lessonId}
        courseCode={courseCode}
        moduleId={moduleId}
      />
    </div>
  );
}

export function FinancialModelBuilder({ lessonId, courseCode, moduleId }: P4ActivityCaptureProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">📈 Financial Model Builder</h3>
      <p className="text-gray-600 mb-6">
        Build comprehensive financial models with real-time calculations and scenario analysis.
      </p>
      
      <div className="space-y-4">
        <a 
          href="/templates/p4-financial-model-builder.html" 
          target="_blank"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Build Financial Model
        </a>
      </div>
      
      <ActivityCapture
        activityTypeId="financial_projections"
        activityName="3-Year Financial Model"
        lessonId={lessonId}
        courseCode={courseCode}
        moduleId={moduleId}
      />
    </div>
  );
}

export function GSTComplianceTracker({ lessonId, courseCode, moduleId }: P4ActivityCaptureProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">📋 GST Compliance Tracker</h3>
      <p className="text-gray-600 mb-6">
        Stay compliant with automated tracking and alerts for all GST requirements.
      </p>
      
      <div className="space-y-4">
        <a 
          href="/templates/p4-gst-compliance-tracker.html" 
          target="_blank"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Setup GST Tracking
        </a>
      </div>
      
      <ActivityCapture
        activityTypeId="gst_compliance_framework"
        activityName="GST Compliance System"
        lessonId={lessonId}
        courseCode={courseCode}
        moduleId={moduleId}
      />
    </div>
  );
}

export function ImplementationChecklist({ lessonId, courseCode, moduleId }: P4ActivityCaptureProps) {
  return (
    <div className="bg-white border-2 border-black rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">✅ Implementation Checklist</h3>
      <p className="text-gray-600 mb-6">
        Track your progress through the complete P4 implementation roadmap.
      </p>
      
      <div className="space-y-4">
        <a 
          href="/templates/p4-implementation-checklist.html" 
          target="_blank"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          View Checklist
        </a>
      </div>
      
      <ActivityCapture
        activityTypeId="financial_systems_implementation"
        activityName="Implementation Progress Tracking"
        lessonId={lessonId}
        courseCode={courseCode}
        moduleId={moduleId}
      />
    </div>
  );
}
import { Suspense } from 'react';
import PortfolioRecommendations from '@/components/portfolio/PortfolioRecommendations';
import UniversalActivityCapture from '@/components/portfolio/UniversalActivityCapture';

export default function PortfolioTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Test Activity Capture */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Activity Capture</h2>
          <Suspense fallback={
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading activity...</p>
            </div>
          }>
            <UniversalActivityCapture
              activityTypeId="p2_company_registration"
              courseCode="P2"
              moduleId="module-1"
              lessonId="lesson-1"
              title="Company Registration Process"
              description="Complete your company registration with MCA"
              showProgress={true}
              autoSave={true}
            />
          </Suspense>
        </div>

        {/* Test Portfolio Recommendations */}
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading recommendations...</p>
          </div>
        }>
          <PortfolioRecommendations />
        </Suspense>
      </div>
    </div>
  );
}
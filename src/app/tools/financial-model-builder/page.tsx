import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FinancialModelBuilder = dynamic(() => import('@/components/dataroom/FinancialModelBuilder'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Financial Model Builder...</p>
      </div>
    </div>
  )
});

export const metadata = {
  title: 'Advanced Financial Model Builder | The Indian Startup',
  description: 'Build comprehensive 5-year financial projections with revenue streams, scenario analysis, and investor-ready exports.',
  keywords: 'financial modeling, startup projections, revenue forecasting, scenario analysis, financial planning'
};

export default function FinancialModelBuilderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Financial Model Builder...</p>
            </div>
          </div>
        }>
          <FinancialModelBuilder />
        </Suspense>
      </div>
    </div>
  );
}
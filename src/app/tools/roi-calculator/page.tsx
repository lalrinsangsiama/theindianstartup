import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ROICalculator = dynamic(() => import('@/components/funding/ROICalculator'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading ROI Calculator...</p>
      </div>
    </div>
  )
});

export const metadata = {
  title: 'Advanced ROI Calculator | The Indian Startup',
  description: 'Calculate comprehensive return on investment metrics including NPV, IRR, payback period, and break-even analysis.',
  keywords: 'ROI calculator, return on investment, NPV, IRR, payback period, investment analysis'
};

export default function ROICalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading ROI Calculator...</p>
            </div>
          </div>
        }>
          <ROICalculator />
        </Suspense>
      </div>
    </div>
  );
}
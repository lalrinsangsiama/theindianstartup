import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FundingEligibilityChecker = dynamic(() => import('@/components/funding/FundingEligibilityChecker'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Funding Eligibility Checker...</p>
      </div>
    </div>
  )
});

export const metadata = {
  title: 'Funding Eligibility Checker | The Indian Startup',
  description: 'Find government and private funding opportunities that match your startup profile with detailed eligibility analysis.',
  keywords: 'funding eligibility, government grants, startup funding, MUDRA loan, SIDBI, funding opportunities India'
};

export default function FundingEligibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Funding Eligibility Checker...</p>
            </div>
          </div>
        }>
          <FundingEligibilityChecker />
        </Suspense>
      </div>
    </div>
  );
}
import { Suspense } from 'react';
import UniversalResourceHub from '@/components/resources/UniversalResourceHub';

export default function ResourcesTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading resources...</p>
          </div>
        }>
          <UniversalResourceHub
            title="All Resources & Templates"
            description="Access all available resources, templates, and tools from your purchased courses"
            showFilters={true}
            showStats={true}
            limit={100}
          />
        </Suspense>
      </div>
    </div>
  );
}
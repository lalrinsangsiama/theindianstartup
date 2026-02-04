'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResourcesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to community page with resources filter
    router.replace('/community/new-post?type=resource_share');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500">Redirecting to share a resource...</p>
      </div>
    </div>
  );
}

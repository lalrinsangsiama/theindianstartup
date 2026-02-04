'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuestionsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to community page with questions filter
    router.replace('/community/new-post?type=question');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500">Redirecting to ask a question...</p>
      </div>
    </div>
  );
}

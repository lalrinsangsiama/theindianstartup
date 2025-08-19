'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface JourneySearchParamsProps {
  onPurchaseSuccess: (success: boolean) => void;
}

export function JourneySearchParams({ onPurchaseSuccess }: JourneySearchParamsProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for purchase success parameter
    if (searchParams.get('purchased') === 'true') {
      onPurchaseSuccess(true);
    }
  }, [searchParams, onPurchaseSuccess]);

  return null; // This component doesn't render anything
}
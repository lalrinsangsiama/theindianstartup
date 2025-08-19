import { useEffect, useState } from 'react';

/**
 * Hook to prevent hydration mismatches by ensuring components only render on client
 * This prevents server/client rendering differences that cause hydration errors
 */
export function useClientOnly() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
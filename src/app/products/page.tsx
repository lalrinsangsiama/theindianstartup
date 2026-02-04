'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProductsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to pricing page where users can see all products
    router.replace('/pricing');
  }, [router]);

  return null;
}
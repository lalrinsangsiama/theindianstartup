'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PortfolioPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new portfolio dashboard
    router.replace('/portfolio/portfolio-dashboard');
  }, [router]);

  return null;
}
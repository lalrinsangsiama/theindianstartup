'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function ProductsPage() {
  useEffect(() => {
    // Redirect to pricing page where users can see all products
    redirect('/pricing');
  }, []);

  return null;
}
'use client';

import React from 'react';
import { useParams, redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';

// Map product codes to their corresponding routes
const PRODUCT_ROUTES: Record<string, string> = {
  p1: '/journey',  // 30-Day Launch Sprint
  p2: '/incorporation-compliance',  // Incorporation & Compliance Kit
  p3: '/funding-mastery',  // Funding Mastery
  p4: '/finance-mastery',  // Finance Stack
  p5: '/legal-mastery',  // Legal Stack
  p6: '/sales-mastery',  // Sales & GTM
  p7: '/state-schemes',  // State-wise Scheme Map
  p8: '/investor-ready',  // Data Room Mastery
  p9: '/government-schemes',  // Government Schemes
  p10: '/patent-mastery',  // Patent Mastery
  p11: '/branding-mastery',  // Branding & PR Mastery
  p12: '/marketing-mastery'  // Marketing Mastery
};

export default function ProductPage() {
  const params = useParams();
  const productCode = params.productCode as string;
  
  // Convert to uppercase to match our product codes
  const normalizedCode = productCode?.toUpperCase();
  
  // Check if this is a valid product code
  if (!normalizedCode || !['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'].includes(normalizedCode)) {
    redirect('/pricing');
  }
  
  // For P1, redirect to the existing journey implementation
  if (normalizedCode === 'P1') {
    redirect('/journey');
  }
  
  // For other products, redirect to their respective implementations
  // (These will need to be created as the products are built)
  const targetRoute = PRODUCT_ROUTES[productCode.toLowerCase()];
  if (targetRoute && targetRoute !== '/journey') {
    redirect(targetRoute);
  }
  
  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode={normalizedCode}>
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {getProductTitle(normalizedCode)}
            </h1>
            <p className="text-gray-600">
              This product content is being prepared. You'll be redirected to the content area soon.
            </p>
          </div>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}

function getProductTitle(productCode: string): string {
  const titles: Record<string, string> = {
    P1: '30-Day India Launch Sprint',
    P2: 'Incorporation & Compliance Kit', 
    P3: 'Funding Mastery',
    P4: 'Finance Stack - CFO-Level Mastery',
    P5: 'Legal Stack - Bulletproof Framework',
    P6: 'Sales & GTM Master Course',
    P7: 'State Ecosystem Mastery - Complete Infrastructure Navigation',
    P8: 'Investor-Ready Data Room Mastery',
    P9: 'National & International Government Ecosystem Mastery',
    P10: 'Patent Mastery for Indian Startups',
    P11: 'Branding & Public Relations Mastery',
    P12: 'Marketing Mastery - Complete Growth Engine'
  };
  
  return titles[productCode] || 'Product';
}
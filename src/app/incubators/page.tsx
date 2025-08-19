'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import IncubatorDatabase from '@/components/funding/IncubatorDatabase';

export default function IncubatorsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <ProductProtectedRoute productCodes={['P1', 'P3', 'P5', 'ALL_ACCESS']}>
            {({ hasAccess, userProducts }) => (
              <IncubatorDatabase 
                hasAccess={hasAccess} 
                userProducts={userProducts}
              />
            )}
          </ProductProtectedRoute>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
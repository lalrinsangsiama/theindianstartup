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
          <ProductProtectedRoute productCode="P3">
            <IncubatorDatabase hasAccess={true} />
          </ProductProtectedRoute>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
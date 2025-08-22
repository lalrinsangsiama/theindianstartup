'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { ReferralProgram } from '@/components/referral/ReferralProgram';

export default function ReferralPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Heading as="h1" variant="h3" className="mb-2">
              Referral Program
            </Heading>
            <Text color="muted" size="lg">
              Earn ₹500 credit for each friend who joins The Indian Startup
            </Text>
          </div>

          {/* Main Content */}
          <ReferralProgram />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart3 } from 'lucide-react';

export default function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Performance Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Performance visualization coming soon.
        </p>
      </CardContent>
    </Card>
  );
}

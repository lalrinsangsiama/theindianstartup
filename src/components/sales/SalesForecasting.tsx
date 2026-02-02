'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { TrendingUp } from 'lucide-react';

export default function SalesForecasting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Sales Forecasting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Sales forecasting tools coming soon.
        </p>
      </CardContent>
    </Card>
  );
}

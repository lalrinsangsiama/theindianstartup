'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CreditCard } from 'lucide-react';

export default function PurchaseForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Purchase Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Purchase form is being loaded.
        </p>
      </CardContent>
    </Card>
  );
}

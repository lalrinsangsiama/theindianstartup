'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Search } from 'lucide-react';

export default function PatentSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Patent Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Patent search functionality coming soon.
        </p>
      </CardContent>
    </Card>
  );
}

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2 } from 'lucide-react';

export default function EcosystemDirectory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Ecosystem Directory
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Directory of ecosystem partners will appear here.
        </p>
      </CardContent>
    </Card>
  );
}

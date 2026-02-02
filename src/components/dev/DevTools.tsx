'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Wrench } from 'lucide-react';

export default function DevTools() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="w-5 h-5" />
          Developer Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Development tools panel.
        </p>
      </CardContent>
    </Card>
  );
}

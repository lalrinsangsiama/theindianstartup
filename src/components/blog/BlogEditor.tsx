'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FileEdit } from 'lucide-react';

export default function BlogEditor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileEdit className="w-5 h-5" />
          Blog Editor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Blog editor coming soon.
        </p>
      </CardContent>
    </Card>
  );
}

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { MessageSquare } from 'lucide-react';

export default function CommunityPosts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Community Posts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">
          Community posts will appear here.
        </p>
      </CardContent>
    </Card>
  );
}

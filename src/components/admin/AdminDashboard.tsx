'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LayoutDashboard, Users, Settings, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const adminLinks = [
    { href: '/admin/users', icon: Users, label: 'User Management' },
    { href: '/admin/content', icon: FileText, label: 'Content Management' },
    { href: '/admin/settings', icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <link.icon className="w-6 h-6 mb-2 text-gray-600" />
                  <p className="font-medium">{link.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

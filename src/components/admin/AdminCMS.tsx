'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { 
  Database, 
  Users, 
  BookOpen, 
  Settings, 
  ShoppingCart,
  BarChart3,
  FileText,
  Globe,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { UserManagement } from './UserManagement';
import { ProductManagement } from './ProductManagement';
import { ContentManagement } from './ContentManagement';
import { ResourceManagement } from './ResourceManagement';
import { BlogManagement } from './BlogManagement';
import { PurchaseManagement } from './PurchaseManagement';
import { SupportDashboard } from './SupportDashboard';
import { AdminGuide } from './AdminGuide';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SystemSettings } from './SystemSettings';

export function AdminCMS() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalPurchases: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      logger.error('Failed to fetch stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-mono mb-2">Admin CMS</h1>
              <p className="text-gray-600">Complete platform management system</p>
            </div>
            <Button
              onClick={() => setActiveTab('guide')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Need Help? Start Here
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex w-auto min-w-full p-1">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 whitespace-nowrap">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="guide" className="flex items-center gap-2 bg-blue-100 text-blue-700 border-2 border-blue-300 whitespace-nowrap">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Help Guide</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2 whitespace-nowrap">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2 bg-purple-100 text-purple-700 border-2 border-purple-300 whitespace-nowrap">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">📝 Blog</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2 whitespace-nowrap">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2 whitespace-nowrap">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2 whitespace-nowrap">
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">Courses</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2 whitespace-nowrap">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center gap-2 whitespace-nowrap">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Purchases</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 whitespace-nowrap">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 whitespace-nowrap">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-gray-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                  <p className="text-xs text-gray-600">P1-P12 + Bundle</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPurchases}</div>
                  <p className="text-xs text-gray-600">Lifetime purchases</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100).toLocaleString()}</div>
                  <p className="text-xs text-gray-600">Total earnings</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsers}</div>
                  <p className="text-xs text-gray-600">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900">🚀 Quick Actions for Beginners</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => setActiveTab('guide')}
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    📖 Start with Admin Guide
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('content')}
                    className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    🌱 Seed All Course Content
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('support')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    💬 Check Support Tickets
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('blog')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    📝 Manage Blog Posts
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('users')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    👥 View All Users
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <span className="text-green-600 font-medium">✅ Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment System</span>
                    <span className="text-green-600 font-medium">✅ Razorpay Live</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Service</span>
                    <span className="text-green-600 font-medium">✅ Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cache System</span>
                    <span className="text-yellow-600 font-medium">⚡ Redis Ready</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="guide">
            <AdminGuide />
          </TabsContent>

          <TabsContent value="support">
            <SupportDashboard />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceManagement />
          </TabsContent>

          <TabsContent value="purchases">
            <PurchaseManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
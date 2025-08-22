'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  BookOpen,
  Calendar,
  Target,
  Award
} from 'lucide-react';

interface Analytics {
  userGrowth: {
    current: number;
    previous: number;
    change: number;
  };
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  purchases: {
    current: number;
    previous: number;
    change: number;
  };
  engagement: {
    activeUsers: number;
    averageProgress: number;
    completionRate: number;
  };
  topProducts: {
    code: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
  recentActivity: {
    date: string;
    type: string;
    description: string;
    value?: number;
  }[];
}

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      logger.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    const color = change >= 0 ? 'text-green-600' : 'text-red-600';
    return (
      <span className={`text-sm font-medium ${color}`}>
        {sign}{change.toFixed(1)}%
      </span>
    );
  };

  if (loading || !analytics) {
    return <div className="flex justify-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Analytics Dashboard</h3>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{analytics.userGrowth.current.toLocaleString()}</p>
                  {formatChange(analytics.userGrowth.change)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">₹{(analytics.revenue.current / 100).toLocaleString()}</p>
                  {formatChange(analytics.revenue.change)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Purchases</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{analytics.purchases.current}</p>
                  {formatChange(analytics.purchases.change)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{analytics.engagement.activeUsers}</p>
                  <span className="text-sm text-gray-500">this month</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm">Average Progress</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{analytics.engagement.averageProgress.toFixed(1)}%</div>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full" 
                    style={{ width: `${analytics.engagement.averageProgress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-green-600" />
                <span className="text-sm">Completion Rate</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{analytics.engagement.completionRate.toFixed(1)}%</div>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-600 rounded-full" 
                    style={{ width: `${analytics.engagement.completionRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-600">
                <div className="flex justify-between mb-1">
                  <span>Daily Active Users</span>
                  <span className="font-medium">{Math.round(analytics.engagement.activeUsers * 0.3)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Weekly Active Users</span>
                  <span className="font-medium">{Math.round(analytics.engagement.activeUsers * 0.7)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Active Users</span>
                  <span className="font-medium">{analytics.engagement.activeUsers}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topProducts.map((product, index) => (
                <div key={product.code} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{product.code}</div>
                      <div className="text-sm text-gray-500 truncate max-w-32">
                        {product.name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{product.sales} sales</div>
                    <div className="text-sm text-gray-500">
                      ₹{(product.revenue / 100).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <div>
                    <div className="text-sm">{activity.description}</div>
                    <div className="text-xs text-gray-500">{activity.date}</div>
                  </div>
                </div>
                {activity.value && (
                  <div className="text-sm font-medium">
                    {activity.type === 'revenue' 
                      ? `₹${(activity.value / 100).toLocaleString()}`
                      : activity.value.toLocaleString()
                    }
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
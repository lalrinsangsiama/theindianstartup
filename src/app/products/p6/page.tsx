'use client';

import React, { useState, Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Target, 
  Users, 
  TrendingUp, 
  BarChart3,
  DollarSign,
  CheckCircle,
  Crown,
  Zap,
  FileText,
  Phone,
  Mail,
  Globe,
  Calculator,
  Database,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

// Lazy load components
const SalesReadinessAssessment = React.lazy(() => import('@/components/sales/SalesReadinessAssessment'));
const LeadGenerationMachine = React.lazy(() => import('@/components/sales/LeadGenerationMachine'));
const P6ResourceHub = React.lazy(() => import('@/components/sales/P6ResourceHub'));

// Sales Pipeline Calculator - Functional Implementation
const PipelineManager = () => {
  const [stages, setStages] = React.useState([
    { name: 'Lead', deals: 50, value: 500000, conversionRate: 40 },
    { name: 'Qualified', deals: 20, value: 400000, conversionRate: 50 },
    { name: 'Proposal', deals: 10, value: 300000, conversionRate: 60 },
    { name: 'Negotiation', deals: 6, value: 200000, conversionRate: 70 },
    { name: 'Closed Won', deals: 4, value: 140000, conversionRate: 100 }
  ]);

  const updateStage = (index: number, field: string, value: number) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setStages(newStages);
  };

  const totalPipelineValue = stages.reduce((sum, s) => sum + s.value, 0);
  const weightedPipelineValue = stages.reduce((sum, s, i) => {
    const weight = (i + 1) / stages.length;
    return sum + (s.value * weight);
  }, 0);
  const avgDealSize = stages.reduce((sum, s) => sum + s.value, 0) / stages.reduce((sum, s) => sum + s.deals, 0);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Sales Pipeline Manager
        </h2>
        <p className="text-gray-600">Track and forecast your sales pipeline with real-time analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">₹{(totalPipelineValue/100000).toFixed(1)}L</div>
            <div className="text-sm text-blue-600">Total Pipeline Value</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">₹{(weightedPipelineValue/100000).toFixed(1)}L</div>
            <div className="text-sm text-green-600">Weighted Pipeline</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{stages.reduce((sum, s) => sum + s.deals, 0)}</div>
            <div className="text-sm text-purple-600">Total Deals</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-700">₹{(avgDealSize/1000).toFixed(0)}K</div>
            <div className="text-sm text-orange-600">Avg Deal Size</div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stages.map((stage, index) => (
              <div key={stage.name} className="grid grid-cols-5 gap-4 items-center p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">{stage.name}</div>
                <div>
                  <label className="text-xs text-gray-500">Deals</label>
                  <input
                    type="number"
                    value={stage.deals}
                    onChange={(e) => updateStage(index, 'deals', parseInt(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Value (₹)</label>
                  <input
                    type="number"
                    value={stage.value}
                    onChange={(e) => updateStage(index, 'value', parseInt(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Conv. Rate (%)</label>
                  <input
                    type="number"
                    value={stage.conversionRate}
                    onChange={(e) => updateStage(index, 'conversionRate', parseInt(e.target.value) || 0)}
                    className="w-full border rounded px-2 py-1 text-sm"
                  />
                </div>
                <div className="text-right">
                  <Badge className="bg-blue-100 text-blue-800">
                    ₹{(stage.value/100000).toFixed(1)}L
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-600" />
            Revenue Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-700">₹{((weightedPipelineValue * 0.8)/100000).toFixed(1)}L</div>
              <div className="text-sm text-gray-600">Conservative (80%)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-700">₹{(weightedPipelineValue/100000).toFixed(1)}L</div>
              <div className="text-sm text-gray-600">Expected (100%)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-700">₹{((weightedPipelineValue * 1.2)/100000).toFixed(1)}L</div>
              <div className="text-sm text-gray-600">Optimistic (120%)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// GTM Strategy Builder / Pricing Calculator - Functional Implementation
const PricingCalculator = () => {
  const [pricing, setPricing] = React.useState({
    productCost: 5000,
    operatingCost: 2000,
    targetMargin: 40,
    competitorPrice: 15000,
    volumeDiscount: 10,
    enterpriseMultiplier: 1.5
  });

  const calculatePricing = () => {
    const totalCost = pricing.productCost + pricing.operatingCost;
    const suggestedPrice = totalCost / (1 - (pricing.targetMargin / 100));
    const marketPosition = (suggestedPrice / pricing.competitorPrice) * 100;
    const enterprisePrice = suggestedPrice * pricing.enterpriseMultiplier;
    const volumePrice = suggestedPrice * (1 - pricing.volumeDiscount / 100);

    return {
      suggestedPrice: Math.round(suggestedPrice),
      margin: Math.round((suggestedPrice - totalCost) / suggestedPrice * 100),
      marketPosition: Math.round(marketPosition),
      enterprisePrice: Math.round(enterprisePrice),
      volumePrice: Math.round(volumePrice),
      breakeven: Math.ceil(100000 / (suggestedPrice - totalCost))
    };
  };

  const results = calculatePricing();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          Pricing Strategy Calculator
        </h2>
        <p className="text-gray-600">Optimize your pricing with Indian market insights</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Cost & Market Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Product/Service Cost (₹)</label>
              <input
                type="number"
                value={pricing.productCost}
                onChange={(e) => setPricing({...pricing, productCost: parseInt(e.target.value) || 0})}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Operating Cost per Unit (₹)</label>
              <input
                type="number"
                value={pricing.operatingCost}
                onChange={(e) => setPricing({...pricing, operatingCost: parseInt(e.target.value) || 0})}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Target Gross Margin (%)</label>
              <input
                type="number"
                value={pricing.targetMargin}
                onChange={(e) => setPricing({...pricing, targetMargin: parseInt(e.target.value) || 0})}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Competitor Average Price (₹)</label>
              <input
                type="number"
                value={pricing.competitorPrice}
                onChange={(e) => setPricing({...pricing, competitorPrice: parseInt(e.target.value) || 0})}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Volume Discount (%)</label>
              <input
                type="number"
                value={pricing.volumeDiscount}
                onChange={(e) => setPricing({...pricing, volumeDiscount: parseInt(e.target.value) || 0})}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Enterprise Price Multiplier</label>
              <input
                type="number"
                step="0.1"
                value={pricing.enterpriseMultiplier}
                onChange={(e) => setPricing({...pricing, enterpriseMultiplier: parseFloat(e.target.value) || 1})}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              Pricing Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white rounded-lg text-center">
              <div className="text-3xl font-bold text-green-700">₹{results.suggestedPrice.toLocaleString('en-IN')}</div>
              <div className="text-sm text-gray-600">Recommended Price</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg text-center">
                <div className="text-xl font-bold text-blue-700">{results.margin}%</div>
                <div className="text-xs text-gray-600">Gross Margin</div>
              </div>
              <div className="p-3 bg-white rounded-lg text-center">
                <div className="text-xl font-bold text-purple-700">{results.marketPosition}%</div>
                <div className="text-xs text-gray-600">vs Competitor</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between p-2 bg-white rounded">
                <span className="text-sm">Enterprise Price:</span>
                <span className="font-semibold">₹{results.enterprisePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2 bg-white rounded">
                <span className="text-sm">Volume Price:</span>
                <span className="font-semibold">₹{results.volumePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-2 bg-white rounded">
                <span className="text-sm">Breakeven Units:</span>
                <span className="font-semibold">{results.breakeven} units</span>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">India Market Insight:</div>
              <div className="text-xs text-yellow-700 mt-1">
                {results.marketPosition < 90
                  ? 'Your price is competitive. Consider value-based positioning.'
                  : results.marketPosition > 110
                    ? 'Premium pricing. Ensure strong differentiation.'
                    : 'Market-aligned pricing. Good positioning.'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Customer Success Dashboard - Functional Implementation
const CustomerSuccessDashboard = () => {
  const [customers, setCustomers] = React.useState([
    { name: 'Acme Corp', health: 90, mrr: 50000, nps: 9, lastContact: '2 days ago', risk: 'low' },
    { name: 'TechStart Ltd', health: 75, mrr: 30000, nps: 7, lastContact: '1 week ago', risk: 'medium' },
    { name: 'Global Industries', health: 45, mrr: 80000, nps: 5, lastContact: '3 weeks ago', risk: 'high' },
    { name: 'Innovation Hub', health: 85, mrr: 25000, nps: 8, lastContact: '3 days ago', risk: 'low' },
    { name: 'Smart Solutions', health: 60, mrr: 40000, nps: 6, lastContact: '2 weeks ago', risk: 'medium' }
  ]);

  const totalMRR = customers.reduce((sum, c) => sum + c.mrr, 0);
  const avgHealth = Math.round(customers.reduce((sum, c) => sum + c.health, 0) / customers.length);
  const avgNPS = (customers.reduce((sum, c) => sum + c.nps, 0) / customers.length).toFixed(1);
  const atRiskRevenue = customers.filter(c => c.risk === 'high').reduce((sum, c) => sum + c.mrr, 0);

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-600 bg-green-100';
    if (health >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskBadge = (risk: string) => {
    const colors: Record<string, string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[risk] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <CheckCircle className="w-6 h-6 text-purple-600" />
          Customer Success Dashboard
        </h2>
        <p className="text-gray-600">Track customer health and prevent churn</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">₹{(totalMRR/1000).toFixed(0)}K</div>
            <div className="text-sm text-blue-600">Monthly Revenue</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{avgHealth}%</div>
            <div className="text-sm text-green-600">Avg Health Score</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{avgNPS}</div>
            <div className="text-sm text-purple-600">Avg NPS Score</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-700">₹{(atRiskRevenue/1000).toFixed(0)}K</div>
            <div className="text-sm text-red-600">At-Risk Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Health Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-3 text-sm font-semibold">Customer</th>
                  <th className="text-center p-3 text-sm font-semibold">Health</th>
                  <th className="text-center p-3 text-sm font-semibold">MRR</th>
                  <th className="text-center p-3 text-sm font-semibold">NPS</th>
                  <th className="text-center p-3 text-sm font-semibold">Last Contact</th>
                  <th className="text-center p-3 text-sm font-semibold">Risk</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 font-medium">{customer.name}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getHealthColor(customer.health)}`}>
                        {customer.health}%
                      </span>
                    </td>
                    <td className="p-3 text-center">₹{(customer.mrr/1000).toFixed(0)}K</td>
                    <td className="p-3 text-center">{customer.nps}</td>
                    <td className="p-3 text-center text-sm text-gray-600">{customer.lastContact}</td>
                    <td className="p-3 text-center">
                      <Badge className={getRiskBadge(customer.risk)}>{customer.risk}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customers.filter(c => c.risk !== 'low').map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-gray-600">
                    {customer.risk === 'high' ? 'Schedule urgent executive review' : 'Send engagement survey'}
                  </div>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Take Action
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Sales Metrics Dashboard / Analytics Suite - Functional Implementation
const AnalyticsSuite = () => {
  const [timeRange, setTimeRange] = React.useState('month');
  const metrics = {
    revenue: { current: 1250000, previous: 1100000, target: 1500000 },
    deals: { current: 45, previous: 38, target: 50 },
    avgDealSize: { current: 27778, previous: 28947, target: 30000 },
    conversionRate: { current: 23, previous: 20, target: 25 },
    cycleTime: { current: 32, previous: 38, target: 28 },
    quota: { current: 83, previous: 73, target: 100 }
  };

  const getChangePercent = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const getProgressColor = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <BarChart3 className="w-6 h-6 text-orange-600" />
          Sales Analytics Suite
        </h2>
        <p className="text-gray-600">AI-powered insights and performance tracking</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center gap-2">
        {['week', 'month', 'quarter', 'year'].map((range) => (
          <Button
            key={range}
            size="sm"
            variant={timeRange === range ? 'primary' : 'outline'}
            onClick={() => setTimeRange(range)}
            className={timeRange === range ? 'bg-orange-600 hover:bg-orange-700' : ''}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-600">Revenue</div>
                <div className="text-2xl font-bold">₹{(metrics.revenue.current/100000).toFixed(1)}L</div>
              </div>
              <Badge className={Number(getChangePercent(metrics.revenue.current, metrics.revenue.previous)) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {Number(getChangePercent(metrics.revenue.current, metrics.revenue.previous)) >= 0 ? '+' : ''}{getChangePercent(metrics.revenue.current, metrics.revenue.previous)}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress to target</span>
                <span>{Math.round((metrics.revenue.current / metrics.revenue.target) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${getProgressColor(metrics.revenue.current, metrics.revenue.target)} rounded-full`} style={{ width: `${Math.min((metrics.revenue.current / metrics.revenue.target) * 100, 100)}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-600">Deals Closed</div>
                <div className="text-2xl font-bold">{metrics.deals.current}</div>
              </div>
              <Badge className={Number(getChangePercent(metrics.deals.current, metrics.deals.previous)) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {Number(getChangePercent(metrics.deals.current, metrics.deals.previous)) >= 0 ? '+' : ''}{getChangePercent(metrics.deals.current, metrics.deals.previous)}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress to target</span>
                <span>{Math.round((metrics.deals.current / metrics.deals.target) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${getProgressColor(metrics.deals.current, metrics.deals.target)} rounded-full`} style={{ width: `${Math.min((metrics.deals.current / metrics.deals.target) * 100, 100)}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
                <div className="text-2xl font-bold">{metrics.conversionRate.current}%</div>
              </div>
              <Badge className={Number(getChangePercent(metrics.conversionRate.current, metrics.conversionRate.previous)) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {Number(getChangePercent(metrics.conversionRate.current, metrics.conversionRate.previous)) >= 0 ? '+' : ''}{getChangePercent(metrics.conversionRate.current, metrics.conversionRate.previous)}%
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress to target</span>
                <span>{Math.round((metrics.conversionRate.current / metrics.conversionRate.target) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${getProgressColor(metrics.conversionRate.current, metrics.conversionRate.target)} rounded-full`} style={{ width: `${Math.min((metrics.conversionRate.current / metrics.conversionRate.target) * 100, 100)}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Avg Deal Size</span>
              <div className="text-right">
                <div className="font-bold">₹{(metrics.avgDealSize.current/1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-500">Target: ₹{(metrics.avgDealSize.target/1000).toFixed(0)}K</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Sales Cycle (days)</span>
              <div className="text-right">
                <div className="font-bold">{metrics.cycleTime.current}</div>
                <div className="text-xs text-gray-500">Target: {metrics.cycleTime.target}</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Quota Attainment</span>
              <div className="text-right">
                <div className="font-bold">{metrics.quota.current}%</div>
                <div className="text-xs text-gray-500">Target: {metrics.quota.target}%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-600" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-white rounded-lg">
              <div className="font-medium text-green-700">Strong pipeline growth</div>
              <div className="text-sm text-gray-600">Deal velocity increased 18% this month</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="font-medium text-yellow-700">Focus area</div>
              <div className="text-sm text-gray-600">Avg deal size declining - consider upselling</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="font-medium text-blue-700">Opportunity</div>
              <div className="text-sm text-gray-600">Q4 historically +35% - start planning now</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function P6ProductPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'readiness-assessment',
      name: 'Sales Readiness Assessment',
      description: 'Comprehensive evaluation of your sales capabilities across 5 key dimensions',
      icon: <Target className="w-6 h-6" />,
      value: '₹12,000',
      component: SalesReadinessAssessment
    },
    {
      id: 'lead-generation',
      name: 'Lead Generation Machine',
      description: 'Multi-channel lead generation tool with Indian market focus',
      icon: <Users className="w-6 h-6" />,
      value: '₹25,000',
      component: LeadGenerationMachine
    },
    {
      id: 'pipeline-manager',
      name: 'Pipeline Manager',
      description: 'Advanced pipeline management with forecasting analytics',
      icon: <TrendingUp className="w-6 h-6" />,
      value: '₹22,000',
      component: PipelineManager
    },
    {
      id: 'pricing-calculator',
      name: 'Pricing Calculator',
      description: 'Dynamic pricing optimization with competitive analysis',
      icon: <DollarSign className="w-6 h-6" />,
      value: '₹18,000',
      component: PricingCalculator
    },
    {
      id: 'customer-success',
      name: 'Customer Success Dashboard',
      description: 'Customer health tracking and retention management',
      icon: <CheckCircle className="w-6 h-6" />,
      value: '₹20,000',
      component: CustomerSuccessDashboard
    },
    {
      id: 'analytics-suite',
      name: 'Analytics Suite',
      description: 'AI-powered sales analytics and revenue forecasting',
      icon: <BarChart3 className="w-6 h-6" />,
      value: '₹35,000',
      component: AnalyticsSuite
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'resource-hub':
        return (
          <Suspense fallback={<div className="p-8 text-center">Loading Resource Hub...</div>}>
            <P6ResourceHub />
          </Suspense>
        );
      case 'readiness-assessment':
      case 'lead-generation':
      case 'pipeline-manager':
      case 'pricing-calculator':
      case 'customer-success':
      case 'analytics-suite':
        const tool = tools.find(t => t.id === activeTab);
        if (tool) {
          const Component = tool.component;
          return (
            <Suspense fallback={<div className="p-8 text-center">Loading {tool.name}...</div>}>
              <Component />
            </Suspense>
          );
        }
        return null;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Crown className="w-4 h-4" />
            PREMIUM COURSE
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2 mt-8">
          <Users className="w-6 h-6 text-blue-600" />
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            P6 Master Course
          </Badge>
        </div>
        <h1 className="text-3xl font-bold">Sales & GTM in India - Master Course</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Transform your startup into a revenue-generating machine with India-specific sales strategies. 
          60-day intensive course with 200+ templates, 6 interactive tools, and expert frameworks.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            60 Expert Lessons
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            200+ Templates
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            6 Interactive Tools
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            ₹5L+ Value
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">₹5,32,000</div>
              <div className="text-sm text-gray-600">Total Resource Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">₹6,999</div>
              <div className="text-sm text-gray-600">Course Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">76x</div>
              <div className="text-sm text-gray-600">Return on Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">60</div>
              <div className="text-sm text-gray-600">Days to Mastery</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Professional Sales Tools</h2>
            <p className="text-gray-600">6 interactive tools worth ₹1,32,000+ included with your course</p>
          </div>
          <Button 
            onClick={() => setActiveTab('resource-hub')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Resource Hub
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(tool => (
            <Card key={tool.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    {tool.icon}
                  </div>
                  <div>
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                      {tool.value} value
                    </Badge>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <Button 
                  onClick={() => setActiveTab(tool.id)}
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-blue-700 transition-colors"
                >
                  Launch Tool
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Course Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Indian Market Mastery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Regional sales strategies for North, South, East, West India</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Cultural nuances and buyer psychology insights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Government sales (GeM) and tender processes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">SME and enterprise sales differentiation</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Comprehensive Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">200+ sales templates and scripts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Complete sales playbooks and processes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Team training and management materials</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Analytics dashboards and reporting tools</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Sales?</h2>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            Join thousands of founders who have built systematic sales processes and achieved 
            predictable revenue growth with our proven frameworks.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setActiveTab('readiness-assessment')}
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-50"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Sales Assessment
            </Button>
            <Button 
              onClick={() => setActiveTab('resource-hub')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700"
            >
              <Database className="w-5 h-5 mr-2" />
              Explore Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P6">
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-1 overflow-x-auto py-4">
                {[
                  { id: 'overview', label: 'Course Overview', icon: <BookOpen className="w-4 h-4" /> },
                  { id: 'resource-hub', label: 'Resource Hub', icon: <Database className="w-4 h-4" /> },
                  { id: 'readiness-assessment', label: 'Sales Assessment', icon: <Target className="w-4 h-4" /> },
                  { id: 'lead-generation', label: 'Lead Generation', icon: <Users className="w-4 h-4" /> },
                  { id: 'pipeline-manager', label: 'Pipeline Manager', icon: <TrendingUp className="w-4 h-4" /> },
                  { id: 'pricing-calculator', label: 'Pricing Calculator', icon: <DollarSign className="w-4 h-4" /> },
                  { id: 'customer-success', label: 'Customer Success', icon: <CheckCircle className="w-4 h-4" /> },
                  { id: 'analytics-suite', label: 'Analytics Suite', icon: <BarChart3 className="w-4 h-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="py-8">
            {renderActiveComponent()}
          </div>
        </div>
      </ProductProtectedRoute>
    </DashboardLayout>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Heading } from '../../components/ui/Typography';
import { Text } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/Card';
import { CardHeader } from '../../components/ui/Card";
import { CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  PieChart, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  IndianRupee,
  Calculator,
  DollarSign
} from 'lucide-react';

interface MonthlyProjection {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface Portfolio {
  projections?: MonthlyProjection[];
  fundingNeeds?: number;
  fundingPurpose?: string;
  burnRate?: number;
  runwayMonths?: number;
  breakEvenTimeline?: string;
}

export default function FinancialsPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    projections: [
      { month: 'Month 1', revenue: 0, expenses: 0, profit: 0 },
      { month: 'Month 2', revenue: 0, expenses: 0, profit: 0 },
      { month: 'Month 3', revenue: 0, expenses: 0, profit: 0 },
      { month: 'Month 6', revenue: 0, expenses: 0, profit: 0 },
      { month: 'Month 12', revenue: 0, expenses: 0, profit: 0 },
    ]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/portfolio');
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }

      const data = await response.json();
      setPortfolio({
        projections: data.projections || [
          { month: 'Month 1', revenue: 0, expenses: 0, profit: 0 },
          { month: 'Month 2', revenue: 0, expenses: 0, profit: 0 },
          { month: 'Month 3', revenue: 0, expenses: 0, profit: 0 },
          { month: 'Month 6', revenue: 0, expenses: 0, profit: 0 },
          { month: 'Month 12', revenue: 0, expenses: 0, profit: 0 },
        ],
        fundingNeeds: data.fundingNeeds || 0,
        fundingPurpose: data.fundingPurpose || '',
        burnRate: data.burnRate || 0,
        runwayMonths: data.runwayMonths || 0,
        breakEvenTimeline: data.breakEvenTimeline || '',
      });
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Portfolio, value: any) => {
    setPortfolio(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateProjection = (index: number, field: keyof MonthlyProjection, value: string) => {
    const numValue = parseInt(value) || 0;
    setPortfolio(prev => {
      const newProjections = [...(prev.projections || [])];
      newProjections[index] = {
        ...newProjections[index],
        [field]: numValue,
        profit: field === 'revenue' 
          ? numValue - newProjections[index].expenses
          : field === 'expenses'
          ? newProjections[index].revenue - numValue
          : numValue
      };
      return { ...prev, projections: newProjections };
    });
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/portfolio/financials', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projections: portfolio.projections,
          fundingNeeds: portfolio.fundingNeeds,
          fundingPurpose: portfolio.fundingPurpose,
          burnRate: portfolio.burnRate,
          runwayMonths: portfolio.runwayMonths,
          breakEvenTimeline: portfolio.breakEvenTimeline,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setLastSaved(new Date());
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const getCompletionPercentage = () => {
    let totalFields = 3;
    let completedFields = 0;
    
    // Check if projections have values
    if (portfolio.projections && portfolio.projections.some(p => p.revenue > 0 || p.expenses > 0)) {
      completedFields++;
    }
    
    // Check funding needs
    if (portfolio.fundingNeeds && portfolio.fundingNeeds > 0 && portfolio.fundingPurpose) {
      completedFields++;
    }
    
    // Check financial metrics
    if (portfolio.burnRate && portfolio.runwayMonths && portfolio.breakEvenTimeline) {
      completedFields++;
    }
    
    return (completedFields / totalFields) * 100;
  };

  const isComplete = getCompletionPercentage() === 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/portfolio')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
              
              <div className="flex items-center gap-4">
                {lastSaved && (
                  <Text size="sm" color="muted">
                    Last saved {lastSaved.toLocaleTimeString()}
                  </Text>
                )}
                <Button
                  variant="primary"
                  onClick={saveSection}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <PieChart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Financial Projections
                </Heading>
                <Text className="text-gray-600">
                  Create financial projections and funding requirements
                </Text>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
              </div>
              <Badge variant={isComplete ? "success" : "default"}>
                {Math.round(getCompletionPercentage())}% Complete
              </Badge>
            </div>

            {error && (
              <Card className="border-red-200 bg-red-50 mb-6">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <Text className="text-red-700">{error}</Text>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Form Sections */}
          <div className="space-y-8">
            {/* Revenue Projections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Revenue & Expense Projections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Text size="sm" color="muted">
                    Enter your projected monthly revenue and expenses for the first year
                  </Text>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3">Period</th>
                          <th className="text-left py-2 px-3">Revenue (₹)</th>
                          <th className="text-left py-2 px-3">Expenses (₹)</th>
                          <th className="text-left py-2 px-3">Profit/Loss (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {portfolio.projections?.map((projection, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 px-3 font-medium">{projection.month}</td>
                            <td className="py-3 px-3">
                              <Input
                                type="number"
                                value={projection.revenue}
                                onChange={(e) => updateProjection(index, 'revenue', e.target.value)}
                                placeholder="0"
                                className="max-w-[150px]"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <Input
                                type="number"
                                value={projection.expenses}
                                onChange={(e) => updateProjection(index, 'expenses', e.target.value)}
                                placeholder="0"
                                className="max-w-[150px]"
                              />
                            </td>
                            <td className="py-3 px-3">
                              <Text className={projection.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                                {formatCurrency(projection.profit)}
                              </Text>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Funding Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Funding Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Total Funding Needed *
                  </label>
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-gray-500" />
                    <Input
                      type="number"
                      value={portfolio.fundingNeeds || ''}
                      onChange={(e) => handleInputChange('fundingNeeds', parseInt(e.target.value) || 0)}
                      placeholder="Enter amount needed"
                      className="max-w-[300px]"
                    />
                  </div>
                  <Text size="sm" color="muted" className="mt-1">
                    How much funding do you need to reach your goals?
                  </Text>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Use of Funds *
                  </label>
                  <textarea
                    value={portfolio.fundingPurpose || ''}
                    onChange={(e) => handleInputChange('fundingPurpose', e.target.value)}
                    placeholder="Explain how you'll use the funding (e.g., product development, marketing, hiring)"
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Financial Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  Key Financial Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Monthly Burn Rate *
                    </label>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-gray-500" />
                      <Input
                        type="number"
                        value={portfolio.burnRate || ''}
                        onChange={(e) => handleInputChange('burnRate', parseInt(e.target.value) || 0)}
                        placeholder="Monthly expenses"
                      />
                    </div>
                    <Text size="sm" color="muted" className="mt-1">
                      Average monthly expenses
                    </Text>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Runway (Months) *
                    </label>
                    <Input
                      type="number"
                      value={portfolio.runwayMonths || ''}
                      onChange={(e) => handleInputChange('runwayMonths', parseInt(e.target.value) || 0)}
                      placeholder="Months of runway"
                    />
                    <Text size="sm" color="muted" className="mt-1">
                      How long can you operate?
                    </Text>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Break-Even Timeline *
                  </label>
                  <Input
                    value={portfolio.breakEvenTimeline || ''}
                    onChange={(e) => handleInputChange('breakEvenTimeline', e.target.value)}
                    placeholder="e.g., Month 12, Q4 2024"
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    When do you expect to become profitable?
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/go-to-market')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Go-to-Market
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                onClick={saveSection}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save & Continue
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push('/portfolio/pitch')}
                disabled={!isComplete}
              >
                Next: Pitch Materials
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Completion Status */}
          {isComplete && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <Text className="text-green-700 font-medium">
                  Excellent! Your financial projections are complete. Ready to create your pitch materials?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
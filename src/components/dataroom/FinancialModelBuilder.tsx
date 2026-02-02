'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Calculator,
  BarChart3,
  PieChart,
  FileText,
  Download,
  Settings,
  Target,
  AlertTriangle,
  CheckCircle,
  Plus,
  Minus,
  Eye,
  RefreshCw
} from 'lucide-react';

interface RevenueStream {
  id: string;
  name: string;
  type: 'recurring' | 'one-time' | 'usage-based';
  currentMRR: number;
  growthRate: number;
  churnRate?: number;
}

interface FinancialProjection {
  year: number;
  revenue: number;
  costs: {
    cogs: number;
    sales: number;
    marketing: number;
    rd: number;
    admin: number;
  };
  metrics: {
    grossMargin: number;
    burnRate: number;
    runway: number;
    ltv: number;
    cac: number;
  };
}

interface ScenarioAnalysis {
  best: FinancialProjection[];
  base: FinancialProjection[];
  worst: FinancialProjection[];
}

const FinancialModelBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState('revenue');
  const [companyStage, setCompanyStage] = useState('');
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([]);
  const [projectionYears, setProjectionYears] = useState(5);
  const [projections, setProjections] = useState<FinancialProjection[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioAnalysis | null>(null);
  const [assumptions, setAssumptions] = useState<string[]>([]);

  const stages = [
    { id: 'pre_seed', name: 'Pre-Seed', description: 'MVP stage, limited revenue' },
    { id: 'seed', name: 'Seed', description: 'Product-market fit, growing revenue' },
    { id: 'series_a', name: 'Series A', description: 'Scaling revenue, proven model' },
    { id: 'series_b', name: 'Series B', description: 'Market expansion, optimizing unit economics' },
    { id: 'growth', name: 'Growth Stage', description: 'Mature business, preparing for exit' }
  ];

  const revenueStreamTypes = [
    { id: 'recurring', name: 'Recurring Revenue', description: 'Subscriptions, SaaS, memberships' },
    { id: 'one-time', name: 'One-time Sales', description: 'Product sales, consulting, licenses' },
    { id: 'usage-based', name: 'Usage-based', description: 'Pay-per-use, transaction fees, commissions' }
  ];

  const addRevenueStream = () => {
    const newStream: RevenueStream = {
      id: `stream_${Date.now()}`,
      name: '',
      type: 'recurring',
      currentMRR: 0,
      growthRate: 0,
      churnRate: 0
    };
    setRevenueStreams([...revenueStreams, newStream]);
  };

  const updateRevenueStream = (id: string, updates: Partial<RevenueStream>) => {
    setRevenueStreams(streams => 
      streams.map(stream => 
        stream.id === id ? { ...stream, ...updates } : stream
      )
    );
  };

  const removeRevenueStream = (id: string) => {
    setRevenueStreams(streams => streams.filter(stream => stream.id !== id));
  };

  const generateProjections = () => {
    const projectionData: FinancialProjection[] = [];
    
    for (let year = 1; year <= projectionYears; year++) {
      const totalRevenue = revenueStreams.reduce((total, stream) => {
        let yearlyRevenue = 0;
        
        if (stream.type === 'recurring') {
          // Compound growth for recurring revenue
          const annualRevenue = stream.currentMRR * 12;
          yearlyRevenue = annualRevenue * Math.pow(1 + stream.growthRate / 100, year - 1);
          
          // Apply churn if applicable
          if (stream.churnRate) {
            yearlyRevenue *= (1 - stream.churnRate / 100);
          }
        } else {
          // Linear growth for other types
          yearlyRevenue = stream.currentMRR * (1 + (stream.growthRate / 100) * year);
        }
        
        return total + yearlyRevenue;
      }, 0);

      // Calculate costs based on industry benchmarks
      const costs = {
        cogs: totalRevenue * getCogsRate(companyStage),
        sales: totalRevenue * getSalesRate(companyStage),
        marketing: totalRevenue * getMarketingRate(companyStage),
        rd: totalRevenue * getRdRate(companyStage),
        admin: totalRevenue * getAdminRate(companyStage)
      };

      const grossProfit = totalRevenue - costs.cogs;
      const totalOpex = costs.sales + costs.marketing + costs.rd + costs.admin;
      const netIncome = grossProfit - totalOpex;

      // Check if any revenue stream is recurring
      const hasRecurringStream = revenueStreams.some(s => s.type === 'recurring');

      const metrics = {
        grossMargin: (grossProfit / totalRevenue) * 100,
        burnRate: totalOpex / 12,
        runway: netIncome < 0 ? Math.abs(netIncome) / (totalOpex / 12) : 0,
        ltv: hasRecurringStream ? calculateLTV(totalRevenue / revenueStreams.length) : 0,
        cac: costs.sales + costs.marketing > 0 ? (costs.sales + costs.marketing) / (totalRevenue / 1000) : 0
      };

      projectionData.push({
        year,
        revenue: totalRevenue,
        costs,
        metrics
      });
    }

    setProjections(projectionData);
    generateScenarios(projectionData);
  };

  const generateScenarios = (baseProjections: FinancialProjection[]) => {
    const scenarios: ScenarioAnalysis = {
      base: baseProjections,
      best: baseProjections.map(proj => ({
        ...proj,
        revenue: proj.revenue * 1.5,
        costs: {
          ...proj.costs,
          cogs: proj.costs.cogs * 1.2,
          sales: proj.costs.sales * 1.3,
          marketing: proj.costs.marketing * 1.4
        }
      })),
      worst: baseProjections.map(proj => ({
        ...proj,
        revenue: proj.revenue * 0.6,
        costs: {
          ...proj.costs,
          cogs: proj.costs.cogs * 0.8,
          sales: proj.costs.sales * 0.9,
          marketing: proj.costs.marketing * 0.8
        }
      }))
    };

    // Recalculate metrics for scenarios
    Object.keys(scenarios).forEach(scenario => {
      scenarios[scenario as keyof ScenarioAnalysis] = scenarios[scenario as keyof ScenarioAnalysis].map(proj => {
        const grossProfit = proj.revenue - proj.costs.cogs;
        const totalOpex = proj.costs.sales + proj.costs.marketing + proj.costs.rd + proj.costs.admin;
        
        return {
          ...proj,
          metrics: {
            ...proj.metrics,
            grossMargin: (grossProfit / proj.revenue) * 100,
            burnRate: totalOpex / 12
          }
        };
      });
    });

    setScenarios(scenarios);
  };

  const getCogsRate = (stage: string): number => {
    const rates = { pre_seed: 0.3, seed: 0.25, series_a: 0.2, series_b: 0.18, growth: 0.15 };
    return rates[stage as keyof typeof rates] || 0.25;
  };

  const getSalesRate = (stage: string): number => {
    const rates = { pre_seed: 0.15, seed: 0.2, series_a: 0.25, series_b: 0.22, growth: 0.18 };
    return rates[stage as keyof typeof rates] || 0.2;
  };

  const getMarketingRate = (stage: string): number => {
    const rates = { pre_seed: 0.1, seed: 0.15, series_a: 0.2, series_b: 0.18, growth: 0.15 };
    return rates[stage as keyof typeof rates] || 0.15;
  };

  const getRdRate = (stage: string): number => {
    const rates = { pre_seed: 0.25, seed: 0.2, series_a: 0.18, series_b: 0.15, growth: 0.12 };
    return rates[stage as keyof typeof rates] || 0.2;
  };

  const getAdminRate = (stage: string): number => {
    const rates = { pre_seed: 0.2, seed: 0.15, series_a: 0.12, series_b: 0.1, growth: 0.08 };
    return rates[stage as keyof typeof rates] || 0.15;
  };

  const calculateLTV = (averageRevenue: number): number => {
    // Simple LTV calculation - can be enhanced
    return averageRevenue * 3; // 3 years average
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Advanced Financial Model Builder</h1>
              <p className="text-gray-600">Build comprehensive financial projections with scenario analysis</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{revenueStreams.length}</div>
              <div className="text-sm text-gray-600">Revenue Streams</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{projectionYears}</div>
              <div className="text-sm text-gray-600">Projection Years</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{scenarios ? 3 : 0}</div>
              <div className="text-sm text-gray-600">Scenarios</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">₹35,000</div>
              <div className="text-sm text-gray-600">Tool Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'setup', label: 'Company Setup', icon: <Settings className="w-4 h-4" /> },
          { id: 'revenue', label: 'Revenue Streams', icon: <DollarSign className="w-4 h-4" /> },
          { id: 'projections', label: 'Financial Projections', icon: <TrendingUp className="w-4 h-4" /> },
          { id: 'scenarios', label: 'Scenario Analysis', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'export', label: 'Export Model', icon: <Download className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Setup Tab */}
      {activeTab === 'setup' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Stage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stages.map(stage => (
                  <div
                    key={stage.id}
                    onClick={() => setCompanyStage(stage.id)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      companyStage === stage.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{stage.name}</h4>
                      {companyStage === stage.id && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Projection Period (Years)</label>
                <Input
                  type="number"
                  value={projectionYears}
                  onChange={(e) => setProjectionYears(Number(e.target.value))}
                  min="3"
                  max="10"
                />
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Selected Configuration</h4>
                <div className="text-sm space-y-1">
                  <div>Stage: <span className="font-medium">{stages.find(s => s.id === companyStage)?.name || 'Not selected'}</span></div>
                  <div>Period: <span className="font-medium">{projectionYears} years</span></div>
                </div>
              </div>

              {companyStage && (
                <Button
                  onClick={() => setActiveTab('revenue')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Configure Revenue Streams
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Revenue Streams Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Revenue Streams ({revenueStreams.length})</span>
                <Button onClick={addRevenueStream} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stream
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {revenueStreams.length > 0 ? (
                <div className="space-y-4">
                  {revenueStreams.map((stream, index) => (
                    <Card key={stream.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                          <div>
                            <label className="block text-sm font-medium mb-1">Stream Name</label>
                            <Input
                              value={stream.name}
                              onChange={(e) => updateRevenueStream(stream.id, { name: e.target.value })}
                              placeholder="e.g., SaaS Subscriptions"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select
                              value={stream.type}
                              onChange={(e) => updateRevenueStream(stream.id, { type: e.target.value as any })}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            >
                              {revenueStreamTypes.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Current {stream.type === 'recurring' ? 'MRR' : 'Monthly'} (₹)</label>
                            <Input
                              type="number"
                              value={stream.currentMRR}
                              onChange={(e) => updateRevenueStream(stream.id, { currentMRR: Number(e.target.value) })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Growth Rate (%)</label>
                            <Input
                              type="number"
                              value={stream.growthRate}
                              onChange={(e) => updateRevenueStream(stream.id, { growthRate: Number(e.target.value) })}
                            />
                          </div>
                          <div className="flex gap-2">
                            {stream.type === 'recurring' && (
                              <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Churn Rate (%)</label>
                                <Input
                                  type="number"
                                  value={stream.churnRate || 0}
                                  onChange={(e) => updateRevenueStream(stream.id, { churnRate: Number(e.target.value) })}
                                />
                              </div>
                            )}
                            <Button
                              onClick={() => removeRevenueStream(stream.id)}
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-4">No revenue streams configured</p>
                  <Button onClick={addRevenueStream} className="bg-green-600 hover:bg-green-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Revenue Stream
                  </Button>
                </div>
              )}

              {revenueStreams.length > 0 && (
                <div className="pt-4 border-t">
                  <Button
                    onClick={generateProjections}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Generate Financial Projections
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projections Tab */}
      {activeTab === 'projections' && (
        <div className="space-y-6">
          {projections.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Financial Projections ({projectionYears} Years)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 p-2 text-left">Year</th>
                        <th className="border border-gray-300 p-2 text-right">Revenue</th>
                        <th className="border border-gray-300 p-2 text-right">COGS</th>
                        <th className="border border-gray-300 p-2 text-right">Gross Profit</th>
                        <th className="border border-gray-300 p-2 text-right">OpEx</th>
                        <th className="border border-gray-300 p-2 text-right">Net Income</th>
                        <th className="border border-gray-300 p-2 text-right">Gross Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projections.map(proj => {
                        const grossProfit = proj.revenue - proj.costs.cogs;
                        const totalOpex = proj.costs.sales + proj.costs.marketing + proj.costs.rd + proj.costs.admin;
                        const netIncome = grossProfit - totalOpex;
                        
                        return (
                          <tr key={proj.year}>
                            <td className="border border-gray-300 p-2 font-medium">Year {proj.year}</td>
                            <td className="border border-gray-300 p-2 text-right">{formatCurrency(proj.revenue)}</td>
                            <td className="border border-gray-300 p-2 text-right">{formatCurrency(proj.costs.cogs)}</td>
                            <td className="border border-gray-300 p-2 text-right">{formatCurrency(grossProfit)}</td>
                            <td className="border border-gray-300 p-2 text-right">{formatCurrency(totalOpex)}</td>
                            <td className={`border border-gray-300 p-2 text-right ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {formatCurrency(netIncome)}
                            </td>
                            <td className="border border-gray-300 p-2 text-right">{proj.metrics.grossMargin.toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">No projections generated yet</p>
                <Button onClick={() => setActiveTab('revenue')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Configure Revenue Streams
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Scenarios Tab */}
      {activeTab === 'scenarios' && scenarios && (
        <div className="space-y-6">
          {Object.entries(scenarios).map(([scenario, data]) => (
            <Card key={scenario}>
              <CardHeader>
                <CardTitle className="capitalize flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {scenario} Case Scenario
                  <Badge className={
                    scenario === 'best' ? 'bg-green-100 text-green-800' :
                    scenario === 'worst' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }>
                    {scenario === 'best' ? '+50% Revenue' : scenario === 'worst' ? '-40% Revenue' : 'Base Case'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(data[data.length - 1].revenue)}</div>
                    <div className="text-sm text-gray-600">Year {projectionYears} Revenue</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{data[data.length - 1].metrics.grossMargin.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">Gross Margin</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">{formatCurrency(data[data.length - 1].metrics.burnRate)}</div>
                    <div className="text-sm text-gray-600">Monthly Burn</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold">
                      {data.reduce((sum: number, proj: any) => sum + proj.revenue, 0) > data.reduce((sum: number, proj: any) => sum + (Object.values(proj.costs) as number[]).reduce((a: number, b: number) => a + b, 0), 0) ?
                        'Profitable' : 'Growth Mode'}
                    </div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Financial Model
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projections.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    Export to Excel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export to PDF
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Generate Pitch Deck
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Model Summary</h4>
                  <ul className="text-sm space-y-1">
                    <li>• {revenueStreams.length} revenue streams configured</li>
                    <li>• {projectionYears} year financial projections</li>
                    <li>• {scenarios ? '3-scenario analysis included' : 'Base case projections'}</li>
                    <li>• Industry-standard cost assumptions applied</li>
                    <li>• Investor-ready formatting and metrics</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Complete your financial model to enable export</p>
                <Button onClick={() => setActiveTab('setup')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Start Building Model
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialModelBuilder;
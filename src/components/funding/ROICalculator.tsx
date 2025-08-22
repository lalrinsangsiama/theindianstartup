'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Calculator,
  Target,
  PieChart,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react';

interface ROIMetrics {
  simpleROI: number;
  annualizedROI: number;
  breakEvenPeriod: number;
  paybackPeriod: number;
  netPresentValue: number;
  internalRateOfReturn: number;
}

interface InvestmentData {
  initialInvestment: number;
  additionalInvestments: { amount: number; month: number }[];
  monthlyRevenue: number;
  monthlyExpenses: number;
  revenueGrowthRate: number;
  discountRate: number;
  timeHorizon: number;
}

const ROICalculator: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    initialInvestment: 1000000,
    additionalInvestments: [],
    monthlyRevenue: 200000,
    monthlyExpenses: 150000,
    revenueGrowthRate: 15,
    discountRate: 12,
    timeHorizon: 36
  });

  const [roiMetrics, setROIMetrics] = useState<ROIMetrics | null>(null);
  const [monthlyProjections, setMonthlyProjections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (investmentData.initialInvestment > 0) {
      calculateROI();
    }
  }, [investmentData]);

  const calculateROI = () => {
    setLoading(true);
    
    // Generate monthly projections
    const projections = [];
    let cumulativeInvestment = investmentData.initialInvestment;
    let cumulativeRevenue = 0;
    let cumulativeExpenses = 0;
    let monthlyRev = investmentData.monthlyRevenue;
    
    for (let month = 1; month <= investmentData.timeHorizon; month++) {
      // Apply growth rate
      if (month > 1) {
        monthlyRev *= (1 + investmentData.revenueGrowthRate / 100 / 12);
      }
      
      // Check for additional investments
      const additionalInvestment = investmentData.additionalInvestments
        .find(inv => inv.month === month)?.amount || 0;
      
      cumulativeInvestment += additionalInvestment;
      cumulativeRevenue += monthlyRev;
      cumulativeExpenses += investmentData.monthlyExpenses;
      
      const netCashFlow = monthlyRev - investmentData.monthlyExpenses;
      const cumulativeProfit = cumulativeRevenue - cumulativeExpenses - cumulativeInvestment;
      const monthlyROI = cumulativeProfit > 0 ? (cumulativeProfit / cumulativeInvestment) * 100 : 0;
      
      projections.push({
        month,
        monthlyRevenue: monthlyRev,
        monthlyExpenses: investmentData.monthlyExpenses,
        netCashFlow,
        cumulativeInvestment,
        cumulativeRevenue,
        cumulativeExpenses,
        cumulativeProfit,
        monthlyROI
      });
    }
    
    setMonthlyProjections(projections);
    
    // Calculate key metrics
    const finalProjection = projections[projections.length - 1];
    const totalProfit = finalProjection.cumulativeProfit;
    const simpleROI = (totalProfit / cumulativeInvestment) * 100;
    const annualizedROI = Math.pow(1 + simpleROI / 100, 12 / investmentData.timeHorizon) - 1;
    
    // Find break-even period
    const breakEvenMonth = projections.findIndex(p => p.cumulativeProfit > 0) + 1;
    const breakEvenPeriod = breakEvenMonth > 0 ? breakEvenMonth : investmentData.timeHorizon;
    
    // Calculate payback period (simple)
    let cumulativeCashFlow = -investmentData.initialInvestment;
    let paybackPeriod = 0;
    for (const projection of projections) {
      cumulativeCashFlow += projection.netCashFlow;
      paybackPeriod = projection.month;
      if (cumulativeCashFlow > 0) break;
    }
    
    // Calculate NPV
    const npv = projections.reduce((sum, projection) => {
      const discountFactor = Math.pow(1 + investmentData.discountRate / 100 / 12, projection.month);
      return sum + projection.netCashFlow / discountFactor;
    }, -investmentData.initialInvestment);
    
    // Calculate IRR (simplified approximation)
    let irr = 0.1; // Start with 10%
    for (let i = 0; i < 20; i++) {
      let npvAtRate = -investmentData.initialInvestment;
      for (const projection of projections) {
        npvAtRate += projection.netCashFlow / Math.pow(1 + irr / 12, projection.month);
      }
      if (Math.abs(npvAtRate) < 1000) break;
      irr += npvAtRate > 0 ? 0.01 : -0.01;
    }
    
    const metrics: ROIMetrics = {
      simpleROI,
      annualizedROI: annualizedROI * 100,
      breakEvenPeriod,
      paybackPeriod,
      netPresentValue: npv,
      internalRateOfReturn: irr * 100
    };
    
    setROIMetrics(metrics);
    setLoading(false);
  };

  const updateInvestmentData = (field: keyof InvestmentData, value: any) => {
    setInvestmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addAdditionalInvestment = () => {
    const newInvestment = { amount: 500000, month: 12 };
    setInvestmentData(prev => ({
      ...prev,
      additionalInvestments: [...prev.additionalInvestments, newInvestment]
    }));
  };

  const removeAdditionalInvestment = (index: number) => {
    setInvestmentData(prev => ({
      ...prev,
      additionalInvestments: prev.additionalInvestments.filter((_, i) => i !== index)
    }));
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${Math.round(amount)}`;
  };

  const getROIColor = (roi: number) => {
    if (roi >= 20) return 'text-green-600 bg-green-50';
    if (roi >= 10) return 'text-yellow-600 bg-yellow-50';
    if (roi >= 0) return 'text-blue-600 bg-blue-50';
    return 'text-red-600 bg-red-50';
  };

  const getROIRating = (roi: number) => {
    if (roi >= 30) return 'Excellent';
    if (roi >= 20) return 'Very Good';
    if (roi >= 15) return 'Good';
    if (roi >= 10) return 'Average';
    if (roi >= 0) return 'Below Average';
    return 'Poor';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Advanced ROI Calculator</h1>
              <p className="text-gray-600">Calculate comprehensive return on investment metrics with projections</p>
            </div>
          </div>
          
          {roiMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`text-center p-3 rounded-lg ${getROIColor(roiMetrics.simpleROI)}`}>
                <div className="text-2xl font-bold">{roiMetrics.simpleROI.toFixed(1)}%</div>
                <div className="text-sm">Simple ROI</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{roiMetrics.paybackPeriod}</div>
                <div className="text-sm text-gray-600">Payback (Months)</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(roiMetrics.netPresentValue)}</div>
                <div className="text-sm text-gray-600">NPV</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{getROIRating(roiMetrics.simpleROI)}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Investment Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Investment Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="initial">Initial Investment (₹)</Label>
              <Input
                id="initial"
                type="number"
                value={investmentData.initialInvestment}
                onChange={(e) => updateInvestmentData('initialInvestment', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="revenue">Monthly Revenue (₹)</Label>
              <Input
                id="revenue"
                type="number"
                value={investmentData.monthlyRevenue}
                onChange={(e) => updateInvestmentData('monthlyRevenue', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="expenses">Monthly Expenses (₹)</Label>
              <Input
                id="expenses"
                type="number"
                value={investmentData.monthlyExpenses}
                onChange={(e) => updateInvestmentData('monthlyExpenses', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="growth">Revenue Growth Rate (% annually)</Label>
              <Input
                id="growth"
                type="number"
                value={investmentData.revenueGrowthRate}
                onChange={(e) => updateInvestmentData('revenueGrowthRate', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="discount">Discount Rate (% annually)</Label>
              <Input
                id="discount"
                type="number"
                value={investmentData.discountRate}
                onChange={(e) => updateInvestmentData('discountRate', Number(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="horizon">Time Horizon (months)</Label>
              <Input
                id="horizon"
                type="number"
                min="12"
                max="60"
                value={investmentData.timeHorizon}
                onChange={(e) => updateInvestmentData('timeHorizon', Number(e.target.value))}
              />
            </div>

            {/* Additional Investments */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Additional Investments</Label>
                <Button onClick={addAdditionalInvestment} size="sm" variant="outline">
                  Add Investment
                </Button>
              </div>
              {investmentData.additionalInvestments.map((inv, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={inv.amount}
                    onChange={(e) => {
                      const updated = [...investmentData.additionalInvestments];
                      updated[index].amount = Number(e.target.value);
                      updateInvestmentData('additionalInvestments', updated);
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Month"
                    value={inv.month}
                    onChange={(e) => {
                      const updated = [...investmentData.additionalInvestments];
                      updated[index].month = Number(e.target.value);
                      updateInvestmentData('additionalInvestments', updated);
                    }}
                  />
                  <Button 
                    onClick={() => removeAdditionalInvestment(index)}
                    size="sm" 
                    variant="outline"
                    className="text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ROI Metrics */}
        {roiMetrics && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                ROI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className={`p-4 rounded-lg ${getROIColor(roiMetrics.simpleROI)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Simple ROI</span>
                    <Badge className="bg-white/20">{getROIRating(roiMetrics.simpleROI)}</Badge>
                  </div>
                  <div className="text-2xl font-bold">{roiMetrics.simpleROI.toFixed(1)}%</div>
                  <Progress value={Math.min(roiMetrics.simpleROI, 100)} className="mt-2" />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-800">Annualized ROI</span>
                  <div className="text-xl font-bold text-blue-600">{roiMetrics.annualizedROI.toFixed(1)}%</div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-purple-800">Net Present Value</span>
                  <div className="text-xl font-bold text-purple-600">{formatCurrency(roiMetrics.netPresentValue)}</div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-800">Internal Rate of Return</span>
                  <div className="text-xl font-bold text-orange-600">{roiMetrics.internalRateOfReturn.toFixed(1)}%</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-medium text-gray-600">Break-even Period</span>
                    <div className="text-lg font-bold">{roiMetrics.breakEvenPeriod} months</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-medium text-gray-600">Payback Period</span>
                    <div className="text-lg font-bold">{roiMetrics.paybackPeriod} months</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Monthly Projections */}
      {monthlyProjections.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Monthly Projections (First 12 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-2 text-left">Month</th>
                    <th className="border border-gray-300 p-2 text-right">Revenue</th>
                    <th className="border border-gray-300 p-2 text-right">Expenses</th>
                    <th className="border border-gray-300 p-2 text-right">Net Cash Flow</th>
                    <th className="border border-gray-300 p-2 text-right">Cumulative Profit</th>
                    <th className="border border-gray-300 p-2 text-right">ROI %</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyProjections.slice(0, 12).map((projection) => (
                    <tr key={projection.month}>
                      <td className="border border-gray-300 p-2 font-medium">Month {projection.month}</td>
                      <td className="border border-gray-300 p-2 text-right">{formatCurrency(projection.monthlyRevenue)}</td>
                      <td className="border border-gray-300 p-2 text-right">{formatCurrency(projection.monthlyExpenses)}</td>
                      <td className={`border border-gray-300 p-2 text-right ${
                        projection.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(projection.netCashFlow)}
                      </td>
                      <td className={`border border-gray-300 p-2 text-right ${
                        projection.cumulativeProfit >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(projection.cumulativeProfit)}
                      </td>
                      <td className={`border border-gray-300 p-2 text-right ${
                        projection.monthlyROI >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {projection.monthlyROI.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Options */}
      {roiMetrics && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>
              <Button variant="outline">
                <PieChart className="w-4 h-4 mr-2" />
                Generate Charts
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Calculator
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ROICalculator;
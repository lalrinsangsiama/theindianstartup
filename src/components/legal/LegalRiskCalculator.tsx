'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CheckCircle, XCircle, TrendingUp, DollarSign } from 'lucide-react';

interface RiskFactor {
  id: string;
  category: string;
  question: string;
  weight: number;
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
}

interface RiskAssessment {
  totalScore: number;
  riskLevel: string;
  preventionCost: number;
  potentialLoss: number;
  roi: number;
  recommendations: string[];
}

const RISK_FACTORS: RiskFactor[] = [
  {
    id: 'founder_agreement',
    category: 'Founder Relations',
    question: 'Do you have a comprehensive founders agreement with equity vesting?',
    weight: 15,
    impact: 'Critical'
  },
  {
    id: 'employment_contracts',
    category: 'Employment Law',
    question: 'Are all employees on proper employment contracts with IP assignment?',
    weight: 12,
    impact: 'High'
  },
  {
    id: 'customer_contracts',
    category: 'Commercial Contracts',
    question: 'Do you have standardized customer agreements with liability protection?',
    weight: 10,
    impact: 'High'
  },
  {
    id: 'ip_protection',
    category: 'Intellectual Property',
    question: 'Is your intellectual property properly protected and documented?',
    weight: 13,
    impact: 'Critical'
  },
  {
    id: 'data_privacy',
    category: 'Data Protection',
    question: 'Do you have compliant privacy policies and data protection measures?',
    weight: 8,
    impact: 'High'
  },
  {
    id: 'regulatory_compliance',
    category: 'Regulatory',
    question: 'Are you compliant with all industry-specific regulations?',
    weight: 9,
    impact: 'High'
  },
  {
    id: 'vendor_agreements',
    category: 'Vendor Management',
    question: 'Do you have proper vendor agreements with all service providers?',
    weight: 7,
    impact: 'Medium'
  },
  {
    id: 'board_governance',
    category: 'Corporate Governance',
    question: 'Do you have proper board governance and compliance procedures?',
    weight: 8,
    impact: 'High'
  },
  {
    id: 'dispute_resolution',
    category: 'Dispute Management',
    question: 'Do you have dispute resolution mechanisms in all major contracts?',
    weight: 6,
    impact: 'Medium'
  },
  {
    id: 'crisis_management',
    category: 'Crisis Preparedness',
    question: 'Do you have legal crisis management and emergency response procedures?',
    weight: 5,
    impact: 'Medium'
  }
];

const LegalRiskCalculator: React.FC = () => {
  const [responses, setResponses] = useState<Record<string, boolean>>({});
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [companySize, setCompanySize] = useState<string>('startup');
  const [industry, setIndustry] = useState<string>('technology');
  const [revenue, setRevenue] = useState<number>(0);

  const calculateRisk = () => {
    let totalPossibleScore = RISK_FACTORS.reduce((sum, factor) => sum + factor.weight, 0);
    let actualScore = RISK_FACTORS.reduce((sum, factor) => {
      return sum + (responses[factor.id] ? factor.weight : 0);
    }, 0);

    const riskPercentage = (actualScore / totalPossibleScore) * 100;
    
    let riskLevel = 'Low';
    let preventionMultiplier = 0.02; // 2% of revenue for low risk
    let lossMultiplier = 0.5; // 50% of revenue potential loss
    
    if (riskPercentage < 30) {
      riskLevel = 'Critical';
      preventionMultiplier = 0.08;
      lossMultiplier = 2.5;
    } else if (riskPercentage < 50) {
      riskLevel = 'High';
      preventionMultiplier = 0.06;
      lossMultiplier = 1.8;
    } else if (riskPercentage < 70) {
      riskLevel = 'Medium';
      preventionMultiplier = 0.04;
      lossMultiplier = 1.2;
    }

    const baseRevenue = revenue || 1000000; // Default 10L if no revenue
    const preventionCost = baseRevenue * preventionMultiplier;
    const potentialLoss = baseRevenue * lossMultiplier;
    const roi = ((potentialLoss - preventionCost) / preventionCost) * 100;

    const recommendations = generateRecommendations(responses, riskLevel);

    setAssessment({
      totalScore: Math.round(riskPercentage),
      riskLevel,
      preventionCost: Math.round(preventionCost),
      potentialLoss: Math.round(potentialLoss),
      roi: Math.round(roi),
      recommendations
    });
  };

  const generateRecommendations = (responses: Record<string, boolean>, riskLevel: string): string[] => {
    const recommendations: string[] = [];
    
    // Check specific gaps and provide targeted recommendations
    if (!responses.founder_agreement) {
      recommendations.push('URGENT: Create comprehensive founders agreement with equity vesting to prevent ₹5+ crore disputes');
    }
    if (!responses.employment_contracts) {
      recommendations.push('HIGH: Implement proper employment contracts to prevent wrongful termination lawsuits');
    }
    if (!responses.ip_protection) {
      recommendations.push('CRITICAL: Secure intellectual property protection to prevent ₹10+ crore IP theft');
    }
    if (!responses.data_privacy) {
      recommendations.push('HIGH: Implement data protection compliance to avoid regulatory penalties');
    }
    if (!responses.regulatory_compliance) {
      recommendations.push('HIGH: Ensure regulatory compliance to prevent business license issues');
    }

    // General recommendations based on risk level
    if (riskLevel === 'Critical') {
      recommendations.push('Consider immediate legal audit and comprehensive legal framework implementation');
      recommendations.push('Establish emergency legal fund of ₹5-10 lakhs for immediate issues');
    } else if (riskLevel === 'High') {
      recommendations.push('Implement P5 Legal Stack course to address all identified gaps');
      recommendations.push('Schedule quarterly legal health check-ups');
    }

    return recommendations.slice(0, 6); // Limit to top 6 recommendations
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Critical': return <XCircle className="w-6 h-6 text-red-600" />;
      case 'High': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'Medium': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'Low': return <CheckCircle className="w-6 h-6 text-green-600" />;
      default: return <AlertTriangle className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-mono">Legal Risk Assessment Calculator</h1>
        <p className="text-xl text-gray-600">Identify your legal vulnerabilities and prevention costs</p>
        <p className="text-lg text-blue-600 font-semibold">Based on ₹100+ crore legal disasters analysis</p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="company-size">Company Size</Label>
            <select 
              id="company-size"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="startup">Startup (1-10 employees)</option>
              <option value="small">Small (11-50 employees)</option>
              <option value="medium">Medium (51-200 employees)</option>
              <option value="large">Large (200+ employees)</option>
            </select>
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <select 
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="technology">Technology</option>
              <option value="fintech">FinTech</option>
              <option value="healthtech">HealthTech</option>
              <option value="ecommerce">E-commerce</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Services</option>
            </select>
          </div>
          <div>
            <Label htmlFor="revenue">Annual Revenue (₹)</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              placeholder="e.g., 1000000"
            />
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Legal Risk Assessment</CardTitle>
          <p className="text-gray-600">Answer the following questions honestly to assess your legal risk</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {RISK_FACTORS.map((factor) => (
            <div key={factor.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{factor.question}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {factor.category}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      factor.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                      factor.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                      factor.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {factor.impact} Impact
                    </span>
                    <span className="text-sm bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      Weight: {factor.weight}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setResponses(prev => ({ ...prev, [factor.id]: true }))}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    responses[factor.id] === true 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                  }`}
                >
                  ✓ Yes
                </button>
                <button
                  onClick={() => setResponses(prev => ({ ...prev, [factor.id]: false }))}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    responses[factor.id] === false 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                  }`}
                >
                  ✗ No
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-center pt-6">
            <Button 
              onClick={calculateRisk}
              disabled={Object.keys(responses).length < RISK_FACTORS.length}
              className="px-8 py-3 text-lg font-semibold"
            >
              Calculate Legal Risk
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Results */}
      {assessment && (
        <div className="space-y-6">
          {/* Risk Level Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-center">Your Legal Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${getRiskColor(assessment.riskLevel)}`}>
                  {getRiskIcon(assessment.riskLevel)}
                  <div>
                    <div className="text-2xl font-bold">{assessment.riskLevel} Risk</div>
                    <div className="text-lg">Compliance Score: {assessment.totalScore}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Impact */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Prevention Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ₹{assessment.preventionCost.toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Investment needed for legal protection
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Potential Loss
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  ₹{assessment.potentialLoss.toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Risk exposure without protection
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-mono flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {assessment.roi}%
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Return on legal investment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Immediate Action Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assessment.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Recommended Solution</h4>
                <p className="text-blue-800 mb-3">
                  The P5 Legal Stack course addresses all identified gaps with 300+ templates, 
                  crisis management training, and expert legal guidance - saving you ₹{(assessment.potentialLoss - 7999).toLocaleString('en-IN')} 
                  compared to traditional legal consultations.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get P5 Legal Stack for ₹7,999
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LegalRiskCalculator;
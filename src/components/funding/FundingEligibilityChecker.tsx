'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  Building2,
  Users,
  Calendar,
  DollarSign,
  Award,
  Download,
  RefreshCw,
  Zap,
  TrendingUp,
  FileText,
  Globe
} from 'lucide-react';

interface CompanyProfile {
  companyName: string;
  industry: string;
  stage: string;
  yearOfIncorporation: number;
  location: string;
  sector: string;
  revenue: number;
  employees: number;
  previousFunding: number;
  isExporting: boolean;
  hasIP: boolean;
  isMSME: boolean;
  isWomenLed: boolean;
  foundersAge: number;
  hasTechComponent: boolean;
}

interface FundingOpportunity {
  id: string;
  name: string;
  type: 'government' | 'private' | 'grant' | 'debt' | 'equity';
  minAmount: number;
  maxAmount: number;
  eligibilityScore: number;
  requiredCriteria: string[];
  additionalBenefits: string[];
  applicationDeadline?: string;
  processingTime: string;
  successRate: number;
  authority: string;
  applicationComplexity: 'Low' | 'Medium' | 'High';
}

const FundingEligibilityChecker: React.FC = () => {
  const [profile, setProfile] = useState<CompanyProfile>({
    companyName: '',
    industry: '',
    stage: 'startup',
    yearOfIncorporation: 2024,
    location: 'Mumbai',
    sector: 'Technology',
    revenue: 0,
    employees: 5,
    previousFunding: 0,
    isExporting: false,
    hasIP: false,
    isMSME: true,
    isWomenLed: false,
    foundersAge: 28,
    hasTechComponent: false
  });

  const [eligibleOpportunities, setEligibleOpportunities] = useState<FundingOpportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [overallScore, setOverallScore] = useState(0);

  const fundingOpportunities: FundingOpportunity[] = [
    {
      id: 'startup_india_seed',
      name: 'Startup India Seed Funding Scheme',
      type: 'government',
      minAmount: 500000,
      maxAmount: 2000000,
      eligibilityScore: 0,
      requiredCriteria: ['DPIIT Recognized Startup', 'Less than 2 years old', 'Innovative business idea'],
      additionalBenefits: ['Mentorship support', 'Incubation facilities', 'Tax benefits'],
      processingTime: '4-6 months',
      successRate: 15,
      authority: 'Department for Promotion of Industry and Internal Trade',
      applicationComplexity: 'Medium'
    },
    {
      id: 'mudra_loan',
      name: 'MUDRA Loan - Tarun',
      type: 'debt',
      minAmount: 500000,
      maxAmount: 1000000,
      eligibilityScore: 0,
      requiredCriteria: ['Non-corporate, non-farm SME/Micro enterprises', 'Business plan'],
      additionalBenefits: ['No collateral required', 'Competitive interest rates'],
      processingTime: '2-4 weeks',
      successRate: 70,
      authority: 'Micro Units Development & Refinance Agency',
      applicationComplexity: 'Low'
    },
    {
      id: 'sidbi_fund',
      name: 'SIDBI Fund of Funds for Startups',
      type: 'equity',
      minAmount: 5000000,
      maxAmount: 50000000,
      eligibilityScore: 0,
      requiredCriteria: ['DPIIT certified startup', 'Innovative scalable business model'],
      additionalBenefits: ['Equity funding', 'Professional management'],
      processingTime: '6-12 months',
      successRate: 25,
      authority: 'Small Industries Development Bank of India',
      applicationComplexity: 'High'
    },
    {
      id: 'msme_cgtmse',
      name: 'MSME Credit Guarantee Trust',
      type: 'debt',
      minAmount: 1000000,
      maxAmount: 50000000,
      eligibilityScore: 0,
      requiredCriteria: ['MSME Registration', 'Good credit history'],
      additionalBenefits: ['85% credit guarantee', 'Collateral-free loans'],
      processingTime: '1-2 months',
      successRate: 80,
      authority: 'Ministry of MSME',
      applicationComplexity: 'Low'
    },
    {
      id: 'technology_development_board',
      name: 'Technology Development Board (TDB)',
      type: 'debt',
      minAmount: 2500000,
      maxAmount: 100000000,
      eligibilityScore: 0,
      requiredCriteria: ['Indian owned company', 'Indigenous technology', 'Commercial potential'],
      additionalBenefits: ['Low interest rates', 'Flexible repayment', 'Technology support'],
      processingTime: '6-9 months',
      successRate: 40,
      authority: 'Department of Science and Technology',
      applicationComplexity: 'High'
    },
    {
      id: 'stand_up_india',
      name: 'Stand Up India',
      type: 'debt',
      minAmount: 1000000,
      maxAmount: 10000000,
      eligibilityScore: 0,
      requiredCriteria: ['Women/SC/ST entrepreneur', '18-65 years age', 'New enterprise'],
      additionalBenefits: ['Preferential lending', 'Handholding support'],
      processingTime: '45-60 days',
      successRate: 85,
      authority: 'Ministry of Finance',
      applicationComplexity: 'Medium'
    },
    {
      id: 'pmegp',
      name: 'Prime Minister Employment Generation Programme',
      type: 'grant',
      minAmount: 100000,
      maxAmount: 2500000,
      eligibilityScore: 0,
      requiredCriteria: ['18+ years age', 'Project cost limits', 'Educational qualification'],
      additionalBenefits: ['Subsidy up to 35%', 'Backward linkage support'],
      processingTime: '2-3 months',
      successRate: 60,
      authority: 'Ministry of MSME',
      applicationComplexity: 'Medium'
    },
    {
      id: 'atal_innovation_mission',
      name: 'Atal Innovation Mission (AIM)',
      type: 'grant',
      minAmount: 300000,
      maxAmount: 3000000,
      eligibilityScore: 0,
      requiredCriteria: ['Innovative startup', 'Technology-based solution', 'Scalable business model'],
      additionalBenefits: ['Mentorship', 'Infrastructure support', 'Market access'],
      processingTime: '3-6 months',
      successRate: 30,
      authority: 'NITI Aayog',
      applicationComplexity: 'Medium'
    },
    {
      id: 'export_promotion_capital_goods',
      name: 'Export Promotion Capital Goods (EPCG)',
      type: 'government',
      minAmount: 0,
      maxAmount: 0, // Duty exemption, not direct funding
      eligibilityScore: 0,
      requiredCriteria: ['Exporter status', 'Capital goods import', 'Export obligation'],
      additionalBenefits: ['Zero duty on capital goods', 'Export promotion'],
      processingTime: '1-2 months',
      successRate: 90,
      authority: 'Directorate General of Foreign Trade',
      applicationComplexity: 'Medium'
    },
    {
      id: 'venture_capital_assistance',
      name: 'Venture Capital Assistance (VCA)',
      type: 'equity',
      minAmount: 500000,
      maxAmount: 15000000,
      eligibilityScore: 0,
      requiredCriteria: ['Technology-based project', 'Commercial viability', 'Skilled management'],
      additionalBenefits: ['Equity participation', 'Professional guidance'],
      processingTime: '4-8 months',
      successRate: 20,
      authority: 'Small Industries Development Bank of India',
      applicationComplexity: 'High'
    }
  ];

  useEffect(() => {
    if (profile.companyName) {
      checkEligibility();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const checkEligibility = () => {
    setLoading(true);
    
    setTimeout(() => {
      const updatedOpportunities = fundingOpportunities.map(opportunity => {
        let score = 0;
        const companyAge = 2024 - profile.yearOfIncorporation;
        
        // Calculate eligibility score based on various criteria
        switch (opportunity.id) {
          case 'startup_india_seed':
            if (companyAge <= 2) score += 30;
            if (profile.stage === 'startup' || profile.stage === 'early') score += 25;
            if (profile.hasTechComponent) score += 20;
            if (profile.revenue < 1000000) score += 25;
            break;
            
          case 'mudra_loan':
            if (profile.isMSME) score += 40;
            if (profile.revenue > 0 && profile.revenue <= 5000000) score += 30;
            if (profile.employees <= 50) score += 30;
            break;
            
          case 'sidbi_fund':
            if (profile.stage === 'growth' || profile.stage === 'scaling') score += 25;
            if (profile.hasTechComponent) score += 25;
            if (profile.revenue > 1000000) score += 25;
            if (profile.previousFunding > 0) score += 25;
            break;
            
          case 'msme_cgtmse':
            if (profile.isMSME) score += 50;
            if (profile.revenue > 0) score += 25;
            if (companyAge >= 1) score += 25;
            break;
            
          case 'technology_development_board':
            if (profile.hasTechComponent) score += 40;
            if (profile.hasIP) score += 30;
            if (profile.revenue > 2000000) score += 30;
            break;
            
          case 'stand_up_india':
            if (profile.isWomenLed) score += 50;
            if (profile.foundersAge >= 18 && profile.foundersAge <= 65) score += 25;
            if (companyAge <= 3) score += 25;
            break;
            
          case 'pmegp':
            if (profile.foundersAge >= 18) score += 30;
            if (profile.employees <= 10) score += 35;
            if (profile.revenue <= 2500000) score += 35;
            break;
            
          case 'atal_innovation_mission':
            if (profile.hasTechComponent) score += 40;
            if (profile.stage === 'startup' || profile.stage === 'early') score += 30;
            if (profile.hasIP) score += 30;
            break;
            
          case 'export_promotion_capital_goods':
            if (profile.isExporting) score += 60;
            if (['Manufacturing', 'Technology'].includes(profile.sector)) score += 40;
            break;
            
          case 'venture_capital_assistance':
            if (profile.hasTechComponent) score += 35;
            if (profile.revenue > 1000000) score += 35;
            if (profile.previousFunding > 0) score += 30;
            break;
            
          default:
            score = 50;
        }
        
        return {
          ...opportunity,
          eligibilityScore: Math.min(score, 100)
        };
      });
      
      // Sort by eligibility score
      const sortedOpportunities = updatedOpportunities
        .filter(opp => opp.eligibilityScore >= 30)
        .sort((a, b) => b.eligibilityScore - a.eligibilityScore);
      
      setEligibleOpportunities(sortedOpportunities);
      
      // Calculate overall score
      const totalScore = sortedOpportunities.reduce((sum, opp) => sum + opp.eligibilityScore, 0);
      const avgScore = sortedOpportunities.length > 0 ? totalScore / sortedOpportunities.length : 0;
      setOverallScore(Math.round(avgScore));
      
      setLoading(false);
    }, 1500);
  };

  const updateProfile = (field: keyof CompanyProfile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCurrency = (amount: number): string => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return amount === 0 ? 'Varies' : `₹${amount}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    if (score >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 40) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Funding Eligibility Checker</h1>
              <p className="text-gray-600">Find funding opportunities that match your startup profile</p>
            </div>
          </div>
          
          {overallScore > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className={`text-center p-3 rounded-lg ${getScoreColor(overallScore)}`}>
                <div className="text-2xl font-bold">{overallScore}%</div>
                <div className="text-sm">Overall Score</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{eligibleOpportunities.length}</div>
                <div className="text-sm text-gray-600">Eligible Programs</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(Math.max(...eligibleOpportunities.map(o => o.maxAmount)))}
                </div>
                <div className="text-sm text-gray-600">Max Funding</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(eligibleOpportunities.reduce((sum, o) => sum + o.successRate, 0) / eligibleOpportunities.length) || 0}%
                </div>
                <div className="text-sm text-gray-600">Avg Success Rate</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Company Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={profile.companyName}
                  onChange={(e) => updateProfile('companyName', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  value={profile.industry}
                  onChange={(e) => updateProfile('industry', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Education">Education</option>
                  <option value="Finance">Finance</option>
                  <option value="Retail">Retail</option>
                  <option value="Services">Services</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stage">Company Stage</Label>
                <select
                  id="stage"
                  value={profile.stage}
                  onChange={(e) => updateProfile('stage', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="idea">Idea Stage</option>
                  <option value="startup">Startup</option>
                  <option value="early">Early Stage</option>
                  <option value="growth">Growth Stage</option>
                  <option value="scaling">Scaling</option>
                  <option value="mature">Mature</option>
                </select>
              </div>
              <div>
                <Label htmlFor="year">Year of Incorporation</Label>
                <Input
                  id="year"
                  type="number"
                  min="2000"
                  max="2024"
                  value={profile.yearOfIncorporation}
                  onChange={(e) => updateProfile('yearOfIncorporation', Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  value={profile.location}
                  onChange={(e) => updateProfile('location', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <Label htmlFor="sector">Sector</Label>
                <select
                  id="sector"
                  value={profile.sector}
                  onChange={(e) => updateProfile('sector', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Technology">Technology</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="revenue">Annual Revenue (₹)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={profile.revenue}
                  onChange={(e) => updateProfile('revenue', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="employees">Number of Employees</Label>
                <Input
                  id="employees"
                  type="number"
                  value={profile.employees}
                  onChange={(e) => updateProfile('employees', Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousFunding">Previous Funding (₹)</Label>
                <Input
                  id="previousFunding"
                  type="number"
                  value={profile.previousFunding}
                  onChange={(e) => updateProfile('previousFunding', Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="foundersAge">Founder's Age</Label>
                <Input
                  id="foundersAge"
                  type="number"
                  min="18"
                  max="75"
                  value={profile.foundersAge}
                  onChange={(e) => updateProfile('foundersAge', Number(e.target.value))}
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <h4 className="font-medium">Additional Information</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isExporting"
                    checked={profile.isExporting}
                    onCheckedChange={(checked) => updateProfile('isExporting', checked)}
                  />
                  <Label htmlFor="isExporting" className="text-sm">Exporting business</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasIP"
                    checked={profile.hasIP}
                    onCheckedChange={(checked) => updateProfile('hasIP', checked)}
                  />
                  <Label htmlFor="hasIP" className="text-sm">Has IP/Patents</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isMSME"
                    checked={profile.isMSME}
                    onCheckedChange={(checked) => updateProfile('isMSME', checked)}
                  />
                  <Label htmlFor="isMSME" className="text-sm">MSME Registered</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isWomenLed"
                    checked={profile.isWomenLed}
                    onCheckedChange={(checked) => updateProfile('isWomenLed', checked)}
                  />
                  <Label htmlFor="isWomenLed" className="text-sm">Women-led startup</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasTechComponent"
                    checked={profile.hasTechComponent}
                    onCheckedChange={(checked) => updateProfile('hasTechComponent', checked)}
                  />
                  <Label htmlFor="hasTechComponent" className="text-sm">Technology-based</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Eligibility Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Analyzing eligibility...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {overallScore > 0 && (
                  <>
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreColor(overallScore)} text-2xl font-bold mb-2`}>
                        {overallScore}%
                      </div>
                      <p className="text-sm text-gray-600">Overall Eligibility Score</p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Top Recommendations</h4>
                      {eligibleOpportunities.slice(0, 3).map((opportunity) => (
                        <div key={opportunity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-sm">{opportunity.name}</div>
                            <div className="text-xs text-gray-600">
                              {formatCurrency(opportunity.minAmount)} - {formatCurrency(opportunity.maxAmount)}
                            </div>
                          </div>
                          <Badge className={getScoreColor(opportunity.eligibilityScore)}>
                            {opportunity.eligibilityScore}%
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-sm font-medium">Government</div>
                        <div className="text-xs text-gray-600">
                          {eligibleOpportunities.filter(o => o.type === 'government' || o.type === 'grant').length} programs
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <div className="text-sm font-medium">Private</div>
                        <div className="text-xs text-gray-600">
                          {eligibleOpportunities.filter(o => o.type === 'equity' || o.type === 'debt').length} options
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {!profile.companyName && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">Complete your company profile to see eligibility results</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Eligible Opportunities */}
      {eligibleOpportunities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Eligible Funding Opportunities ({eligibleOpportunities.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eligibleOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium mb-1">{opportunity.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
                          </Badge>
                          <Badge className={`text-xs ${getScoreColor(opportunity.eligibilityScore)}`}>
                            {opportunity.eligibilityScore}% Match
                          </Badge>
                        </div>
                      </div>
                      {getScoreIcon(opportunity.eligibilityScore)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Funding Range</p>
                        <p className="text-sm font-bold">
                          {formatCurrency(opportunity.minAmount)} - {formatCurrency(opportunity.maxAmount)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Key Requirements</p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {opportunity.requiredCriteria.slice(0, 2).map((criteria, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full" />
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-600">Success Rate</span>
                          <div className="font-medium">{opportunity.successRate}%</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Processing</span>
                          <div className="font-medium">{opportunity.processingTime}</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 mb-2">{opportunity.authority}</p>
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          <Globe className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {eligibleOpportunities.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download Eligibility Report
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FundingEligibilityChecker;
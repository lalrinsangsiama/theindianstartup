'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Star, 
  Zap, 
  Award, 
  Eye,
  Heart,
  Brain,
  Download,
  Share2,
  BarChart3,
  AlertTriangle
} from 'lucide-react';

interface BrandMetrics {
  awareness: number;
  perception: number;
  loyalty: number;
  differentiation: number;
  engagement: number;
  consistency: number;
  relevance: number;
  premium: number;
}

interface BrandStrategy {
  score: number;
  category: string;
  recommendations: string[];
  investmentAreas: string[];
  timeline: string;
  expectedROI: string;
  brandValue: number;
}

const BrandStrategyCalculator: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [currentRevenue, setCurrentRevenue] = useState('');
  const [brandMetrics, setBrandMetrics] = useState<BrandMetrics>({
    awareness: 30,
    perception: 40,
    loyalty: 35,
    differentiation: 45,
    engagement: 25,
    consistency: 50,
    relevance: 60,
    premium: 30
  });

  const [strategy, setStrategy] = useState<BrandStrategy | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateBrandStrategy = () => {
    if (!companyName.trim() || !industry.trim() || !currentRevenue) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    setTimeout(() => {
      const totalScore = Object.values(brandMetrics).reduce((sum, value) => sum + value, 0) / 8;
      const brandValue = Math.round(parseFloat(currentRevenue) * (totalScore / 100) * 2.5);
      
      let category = '';
      let recommendations: string[] = [];
      let investmentAreas: string[] = [];
      let timeline = '';
      let expectedROI = '';

      if (totalScore >= 70) {
        category = 'Brand Leader';
        recommendations = [
          'Expand into new markets with strong brand equity',
          'Launch premium product lines leveraging brand strength',
          'Develop strategic partnerships with industry leaders',
          'Create thought leadership content to maintain market position'
        ];
        investmentAreas = ['Global expansion', 'Premium positioning', 'Innovation showcase'];
        timeline = '6-12 months';
        expectedROI = '200-300%';
      } else if (totalScore >= 50) {
        category = 'Growing Brand';
        recommendations = [
          'Focus on brand consistency across all touchpoints',
          'Increase digital presence and social media engagement',
          'Develop compelling brand storytelling and content',
          'Implement customer loyalty programs'
        ];
        investmentAreas = ['Digital marketing', 'Content creation', 'Customer experience'];
        timeline = '9-18 months';
        expectedROI = '150-250%';
      } else {
        category = 'Emerging Brand';
        recommendations = [
          'Define clear brand identity and value proposition',
          'Establish consistent visual identity across platforms',
          'Build foundational brand awareness campaigns',
          'Focus on customer experience and satisfaction'
        ];
        investmentAreas = ['Brand identity', 'Awareness campaigns', 'Visual design'];
        timeline = '12-24 months';
        expectedROI = '100-200%';
      }

      setStrategy({
        score: Math.round(totalScore),
        category,
        recommendations,
        investmentAreas,
        timeline,
        expectedROI,
        brandValue
      });
      setLoading(false);
    }, 2000);
  };

  const updateMetric = (metric: keyof BrandMetrics, value: number[]) => {
    setBrandMetrics(prev => ({
      ...prev,
      [metric]: value[0]
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBrandValueFormatted = (value: number) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Brand Strategy Calculator</h1>
        <p className="text-gray-600">
          Analyze your brand strength and get personalized strategy recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Enter your company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., Technology, Healthcare, Finance"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., Tech professionals, Small businesses"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="revenue">Annual Revenue (₹)</Label>
              <Input
                id="revenue"
                type="number"
                placeholder="Enter annual revenue"
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Brand Metrics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Brand Metrics Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(brandMetrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                  <span className="text-sm font-medium">{value}%</span>
                </div>
                <Slider
                  value={[value]}
                  onValueChange={(newValue) => updateMetric(key as keyof BrandMetrics, newValue)}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Calculate Button */}
      <div className="text-center">
        <Button 
          onClick={calculateBrandStrategy}
          disabled={loading || !companyName || !industry || !currentRevenue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Brand Strategy...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Calculate Brand Strategy
            </div>
          )}
        </Button>
      </div>

      {/* Results Section */}
      {strategy && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Brand Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Brand Score Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold ${getScoreColor(strategy.score)}`}>
                  {strategy.score}
                </div>
                <div className="text-xl text-gray-600 mt-2">Brand Score</div>
                <Badge className={`mt-2 ${
                  strategy.score >= 70 ? 'bg-green-100 text-green-800' :
                  strategy.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {strategy.category}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Expected ROI</div>
                  <div className="font-bold text-blue-600">{strategy.expectedROI}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Brand Value</div>
                  <div className="font-bold text-green-600">
                    {getBrandValueFormatted(strategy.brandValue)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Strategic Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700">Priority Actions</Label>
                <ul className="mt-2 space-y-2">
                  {strategy.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700">Investment Areas</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {strategy.investmentAreas.map((area, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">Timeline</Label>
                  <div className="text-sm font-medium text-blue-600">{strategy.timeline}</div>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">ROI Projection</Label>
                  <div className="text-sm font-medium text-green-600">{strategy.expectedROI}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      {strategy && (
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Full Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Analysis
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Get Detailed Action Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Brand Building Fundamentals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, title: "Brand Awareness", desc: "How well your target audience knows your brand" },
              { icon: Star, title: "Brand Perception", desc: "How your audience views and feels about your brand" },
              { icon: Heart, title: "Brand Loyalty", desc: "Customer retention and repeat business strength" },
              { icon: Zap, title: "Differentiation", desc: "What makes your brand unique in the market" }
            ].map((item, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandStrategyCalculator;
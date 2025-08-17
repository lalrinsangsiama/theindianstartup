'use client';

import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/auth/ProtectedRoute';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Heading } from '../../components/ui/Typography';
import { Text } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { CardContent } from '../../components/ui/Card';
import { CardHeader } from "../../components/ui/Card";
import { CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { 
  Lightbulb, 
  TrendingUp, 
  DollarSign, 
  Palette, 
  Shield, 
  Rocket, 
  Users, 
  PieChart,
  FileText,
  CheckCircle2,
  Circle,
  Download,
  Share2,
  Loader2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Portfolio {
  id: string;
  userId: string;
  startupName?: string;
  tagline?: string;
  logo?: string;
  problemStatement?: string;
  solution?: string;
  valueProposition?: string;
  targetMarket?: any;
  competitors?: any;
  marketSize?: any;
  revenueStreams?: any;
  pricingStrategy?: any;
  domain?: string;
  socialHandles?: any;
  entityType?: string;
  complianceStatus?: any;
  mvpDescription?: string;
  features?: any;
  userFeedback?: any;
  salesStrategy?: any;
  customerPersonas?: any;
  projections?: any;
  fundingNeeds?: number;
  pitchDeck?: string;
  onePageSummary?: string;
  updatedAt: string;
}

interface PortfolioSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
  fields: string[];
  category: 'foundation' | 'strategy' | 'execution';
}

const PORTFOLIO_SECTIONS: PortfolioSection[] = [
  {
    id: 'idea-vision',
    title: 'Idea & Vision',
    description: 'Define your startup\'s core problem, solution, and value proposition',
    icon: Lightbulb,
    route: '/portfolio/idea-vision',
    fields: ['startupName', 'tagline', 'problemStatement', 'solution', 'valueProposition'],
    category: 'foundation',
  },
  {
    id: 'market-research',
    title: 'Market Research',
    description: 'Understand your target market, competitors, and market opportunity',
    icon: TrendingUp,
    route: '/portfolio/market-research',
    fields: ['targetMarket', 'competitors', 'marketSize'],
    category: 'foundation',
  },
  {
    id: 'business-model',
    title: 'Business Model',
    description: 'Design your revenue model and pricing strategy',
    icon: DollarSign,
    route: '/portfolio/business-model',
    fields: ['revenueStreams', 'pricingStrategy'],
    category: 'strategy',
  },
  {
    id: 'brand-assets',
    title: 'Brand Assets',
    description: 'Create your brand identity, domain, and social presence',
    icon: Palette,
    route: '/portfolio/brand-assets',
    fields: ['startupName', 'logo', 'domain', 'socialHandles'],
    category: 'execution',
  },
  {
    id: 'legal-compliance',
    title: 'Legal & Compliance',
    description: 'Set up legal structure and compliance requirements',
    icon: Shield,
    route: '/portfolio/legal-compliance',
    fields: ['entityType', 'complianceStatus'],
    category: 'execution',
  },
  {
    id: 'product',
    title: 'Product Development',
    description: 'Define your MVP, features, and gather user feedback',
    icon: Rocket,
    route: '/portfolio/product',
    fields: ['mvpDescription', 'features', 'userFeedback'],
    category: 'execution',
  },
  {
    id: 'go-to-market',
    title: 'Go-to-Market',
    description: 'Plan your sales strategy and customer acquisition',
    icon: Users,
    route: '/portfolio/go-to-market',
    fields: ['salesStrategy', 'customerPersonas'],
    category: 'strategy',
  },
  {
    id: 'financials',
    title: 'Financials',
    description: 'Create financial projections and funding requirements',
    icon: PieChart,
    route: '/portfolio/financials',
    fields: ['projections', 'fundingNeeds'],
    category: 'strategy',
  },
  {
    id: 'pitch',
    title: 'Pitch Materials',
    description: 'Generate pitch deck and one-page summary',
    icon: FileText,
    route: '/portfolio/pitch',
    fields: ['pitchDeck', 'onePageSummary'],
    category: 'execution',
  },
];

export default function PortfolioOverviewPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
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
      setPortfolio(data);
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const calculateSectionCompletion = (section: PortfolioSection): number => {
    if (!portfolio) return 0;
    
    const completedFields = section.fields.filter(field => {
      const value = portfolio[field as keyof Portfolio];
      return value !== null && value !== undefined && value !== '';
    });
    
    return (completedFields.length / section.fields.length) * 100;
  };

  const getOverallCompletion = (): number => {
    if (!portfolio) return 0;
    
    const totalCompletion = PORTFOLIO_SECTIONS.reduce((sum, section) => {
      return sum + calculateSectionCompletion(section);
    }, 0);
    
    return totalCompletion / PORTFOLIO_SECTIONS.length;
  };

  const getSectionsByCategory = (category: string) => {
    return PORTFOLIO_SECTIONS.filter(section => section.category === category);
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

  if (error) {
    return (
      <ProtectedRoute >
        <DashboardLayout>
          <div className="p-8">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <Text className="text-red-700">Error: {error}</Text>
                <Button 
                  variant="outline" 
                  onClick={fetchPortfolio}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  const overallCompletion = getOverallCompletion();

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Heading as="h1" className="mb-2 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-600" />
                  Startup Portfolio
                </Heading>
                <Text className="text-xl text-gray-600">
                  Build your startup step by step as you progress through the 30-day journey
                </Text>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Portfolio
                </Button>
              </div>
            </div>

            {/* Overall Progress */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Heading as="h3" variant="h4">
                      Portfolio Completion
                    </Heading>
                    <Text color="muted">
                      Track your startup&apos;s development across all key areas
                    </Text>
                  </div>
                  <div className="text-right">
                    <Text className="text-3xl font-bold text-blue-700">
                      {Math.round(overallCompletion)}%
                    </Text>
                    <Text size="sm" color="muted">Complete</Text>
                  </div>
                </div>
                
                <ProgressBar 
                  value={overallCompletion} 
                  className="h-3"
                  showLabel={false}
                />
                
                <div className="flex items-center justify-between mt-3 text-sm">
                  <Text color="muted">
                    {PORTFOLIO_SECTIONS.filter(s => calculateSectionCompletion(s) === 100).length} of {PORTFOLIO_SECTIONS.length} sections complete
                  </Text>
                  {portfolio?.startupName && (
                    <Badge variant="success">
                      {portfolio.startupName}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Categories */}
          {['foundation', 'strategy', 'execution'].map(category => (
            <div key={category} className="mb-12">
              <div className="mb-6">
                <Heading as="h2" variant="h3" className="mb-2 capitalize">
                  {category}
                </Heading>
                <Text color="muted">
                  {category === 'foundation' && 'Core startup fundamentals and market understanding'}
                  {category === 'strategy' && 'Business strategy and go-to-market planning'}
                  {category === 'execution' && 'Implementation and operational setup'}
                </Text>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getSectionsByCategory(category).map(section => {
                  const completion = calculateSectionCompletion(section);
                  const isComplete = completion === 100;
                  const Icon = section.icon;

                  return (
                    <Card 
                      key={section.id} 
                      className={`transition-all hover:shadow-lg cursor-pointer ${
                        isComplete ? 'border-green-300 bg-green-50' : 'hover:border-gray-400'
                      }`}
                      onClick={() => window.location.href = section.route}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              isComplete ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              <Icon className={`w-5 h-5 ${
                                isComplete ? 'text-green-600' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <CardTitle className="text-lg">
                                {section.title}
                              </CardTitle>
                            </div>
                          </div>
                          
                          {isComplete ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            <Circle className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <Text size="sm" color="muted" className="mb-4">
                          {section.description}
                        </Text>
                        
                        <div className="space-y-3">
                          <ProgressBar 
                            value={completion} 
                            className="h-2"
                            showLabel={false}
                          />
                          
                          <div className="flex items-center justify-between">
                            <Text size="sm" color="muted">
                              {Math.round(completion)}% complete
                            </Text>
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Portfolio Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Download className="w-6 h-6" />
                  <div className="text-center">
                    <Text weight="medium">Export Portfolio</Text>
                    <Text size="sm" color="muted">Download as PDF</Text>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <FileText className="w-6 h-6" />
                  <div className="text-center">
                    <Text weight="medium">Generate One-Pager</Text>
                    <Text size="sm" color="muted">Auto-create summary</Text>
                  </div>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Share2 className="w-6 h-6" />
                  <div className="text-center">
                    <Text weight="medium">Share with Investors</Text>
                    <Text size="sm" color="muted">Create shareable link</Text>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
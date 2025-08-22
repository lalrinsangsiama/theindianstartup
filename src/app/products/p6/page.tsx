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

// Mock components for other tools (will be implemented separately if needed)
const PipelineManager = () => (
  <div className="p-8 text-center">
    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-600" />
    <h3 className="text-xl font-bold mb-2">Sales Pipeline Manager</h3>
    <p className="text-gray-600 mb-4">Advanced pipeline management with forecasting and performance analytics</p>
    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const PricingCalculator = () => (
  <div className="p-8 text-center">
    <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-600" />
    <h3 className="text-xl font-bold mb-2">Pricing Strategy Calculator</h3>
    <p className="text-gray-600 mb-4">Dynamic pricing optimization with Indian market analysis</p>
    <Button className="bg-green-600 hover:bg-green-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const CustomerSuccessDashboard = () => (
  <div className="p-8 text-center">
    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-purple-600" />
    <h3 className="text-xl font-bold mb-2">Customer Success Dashboard</h3>
    <p className="text-gray-600 mb-4">Comprehensive customer health tracking and success management</p>
    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const AnalyticsSuite = () => (
  <div className="p-8 text-center">
    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-orange-600" />
    <h3 className="text-xl font-bold mb-2">Sales Analytics Suite</h3>
    <p className="text-gray-600 mb-4">Advanced analytics with AI-powered insights and revenue forecasting</p>
    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
      Coming Soon
    </Button>
  </div>
);

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
'use client';

import React, { useState, Suspense } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductProtectedRoute } from '@/components/auth/ProductProtectedRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Database, 
  Calculator, 
  TrendingUp, 
  Shield,
  Users,
  Target,
  BarChart3,
  CheckCircle,
  Crown,
  Zap,
  FileText,
  Play,
  DollarSign,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Globe,
  Star
} from 'lucide-react';

// Lazy load components
const DataRoomArchitect = React.lazy(() => import('@/components/dataroom/DataRoomArchitect'));
const FinancialModelBuilder = React.lazy(() => import('@/components/dataroom/FinancialModelBuilder'));
const P8ResourceHub = React.lazy(() => import('@/components/dataroom/P8ResourceHub'));
const P8ProgressTracker = React.lazy(() => import('@/components/dataroom/P8ProgressTracker'));

// Mock components for other tools (will be implemented separately if needed)
const CapTableManager = () => (
  <div className="p-8 text-center">
    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-purple-600" />
    <h3 className="text-xl font-bold mb-2">Cap Table Management System</h3>
    <p className="text-gray-600 mb-4">Professional cap table management with equity tracking and vesting schedules</p>
    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const DueDiligenceQA = () => (
  <div className="p-8 text-center">
    <Shield className="w-16 h-16 mx-auto mb-4 text-green-600" />
    <h3 className="text-xl font-bold mb-2">Due Diligence Q&A Generator</h3>
    <p className="text-gray-600 mb-4">Comprehensive Q&A preparation with industry-specific questions</p>
    <Button className="bg-green-600 hover:bg-green-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const TeamAnalytics = () => (
  <div className="p-8 text-center">
    <Users className="w-16 h-16 mx-auto mb-4 text-blue-600" />
    <h3 className="text-xl font-bold mb-2">Team Analytics Dashboard</h3>
    <p className="text-gray-600 mb-4">Advanced team performance analytics with investor reporting</p>
    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const CustomerAnalytics = () => (
  <div className="p-8 text-center">
    <Target className="w-16 h-16 mx-auto mb-4 text-orange-600" />
    <h3 className="text-xl font-bold mb-2">Customer Analytics Engine</h3>
    <p className="text-gray-600 mb-4">Comprehensive customer analytics with cohort analysis and LTV calculations</p>
    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
      Coming Soon
    </Button>
  </div>
);

const AnalyticsSuite = () => (
  <div className="p-8 text-center">
    <BarChart3 className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
    <h3 className="text-xl font-bold mb-2">Data Room Analytics Suite</h3>
    <p className="text-gray-600 mb-4">Complete analytics dashboard for data room performance and KPI tracking</p>
    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
      Coming Soon
    </Button>
  </div>
);

export default function P8ProductPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const tools = [
    {
      id: 'data-room-architecture',
      name: 'Data Room Architecture Tool',
      description: 'Professional data room structure designer with investor-grade organization',
      icon: <Database className="w-6 h-6" />,
      value: '₹25,000',
      component: DataRoomArchitect
    },
    {
      id: 'financial-model-builder',
      name: 'Financial Model Builder',
      description: 'Comprehensive financial modeling with scenario analysis',
      icon: <Calculator className="w-6 h-6" />,
      value: '₹35,000',
      component: FinancialModelBuilder
    },
    {
      id: 'cap-table-manager',
      name: 'Cap Table Manager',
      description: 'Professional cap table management with equity tracking',
      icon: <TrendingUp className="w-6 h-6" />,
      value: '₹30,000',
      component: CapTableManager
    },
    {
      id: 'dd-qa-generator',
      name: 'Due Diligence Q&A',
      description: 'Comprehensive Q&A preparation with expert answers',
      icon: <Shield className="w-6 h-6" />,
      value: '₹30,000',
      component: DueDiligenceQA
    },
    {
      id: 'team-analytics',
      name: 'Team Analytics',
      description: 'Advanced team performance analytics and reporting',
      icon: <Users className="w-6 h-6" />,
      value: '₹22,000',
      component: TeamAnalytics
    },
    {
      id: 'customer-analytics',
      name: 'Customer Analytics',
      description: 'Comprehensive customer analytics with cohort analysis',
      icon: <Target className="w-6 h-6" />,
      value: '₹28,000',
      component: CustomerAnalytics
    },
    {
      id: 'analytics-suite',
      name: 'Analytics Suite',
      description: 'Complete data room performance and KPI tracking',
      icon: <BarChart3 className="w-6 h-6" />,
      value: '₹48,000',
      component: AnalyticsSuite
    }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'progress':
        return (
          <Suspense fallback={<div className="p-8 text-center">Loading Progress Tracker...</div>}>
            <P8ProgressTracker />
          </Suspense>
        );
      case 'resource-hub':
        return (
          <Suspense fallback={<div className="p-8 text-center">Loading Resource Hub...</div>}>
            <P8ResourceHub />
          </Suspense>
        );
      case 'data-room-architecture':
      case 'financial-model-builder':
      case 'cap-table-manager':
      case 'dd-qa-generator':
      case 'team-analytics':
      case 'customer-analytics':
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
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Crown className="w-4 h-4" />
            PREMIUM COURSE
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2 mt-8">
          <Database className="w-6 h-6 text-blue-600" />
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            P8 Master Course
          </Badge>
        </div>
        <h1 className="text-3xl font-bold">Investor-Ready Data Room Mastery</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Transform your startup with a professional data room that accelerates fundraising and increases valuation. 
          45-day intensive course with 300+ templates, 7 interactive tools, and expert VC/CFO insights.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            45 Expert Lessons
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            300+ Templates
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            7 Interactive Tools
          </div>
          <div className="flex items-center gap-1">
            <Play className="w-4 h-4" />
            VC Masterclasses
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">₹10,68,000</div>
              <div className="text-sm text-gray-600">Total Resource Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">₹9,999</div>
              <div className="text-sm text-gray-600">Course Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">107x</div>
              <div className="text-sm text-gray-600">Return on Investment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">45</div>
              <div className="text-sm text-gray-600">Days to Data Room</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Tools Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Professional Data Room Tools</h2>
            <p className="text-gray-600">7 investor-grade tools worth ₹2,18,000+ included with your course</p>
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

      {/* Premium Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Expert Content Access
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">15 VC masterclass sessions with top-tier investors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">12 CFO insights from unicorn-scale finance leaders</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">8 investment banker sessions on data room best practices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Exclusive case studies from successful fundraising rounds</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Comprehensive Template Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">300+ professional data room templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Legal documentation suite (80 documents)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Financial models and advanced reporting templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm">Due diligence and compliance materials</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Success Metrics */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            Data Room Success Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3.5x</div>
              <div className="text-sm text-gray-600">Faster Due Diligence</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">25%</div>
              <div className="text-sm text-gray-600">Higher Valuations</div>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">60%</div>
              <div className="text-sm text-gray-600">Improved Close Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Investor-Ready Data Room?</h2>
          <p className="mb-6 text-blue-100 max-w-2xl mx-auto">
            Join successful founders who have raised millions with professional data rooms that impressed 
            top-tier investors and accelerated their fundraising timeline.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => setActiveTab('data-room-architecture')}
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-50"
            >
              <Database className="w-5 h-5 mr-2" />
              Start Data Room Tool
            </Button>
            <Button 
              onClick={() => setActiveTab('resource-hub')}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700"
            >
              <Crown className="w-5 h-5 mr-2" />
              Explore Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <DashboardLayout>
      <ProductProtectedRoute productCode="P8">
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <div className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-1 overflow-x-auto py-4">
                {[
                  { id: 'overview', label: 'Course Overview', icon: <BookOpen className="w-4 h-4" /> },
                  { id: 'progress', label: 'My Progress', icon: <TrendingUp className="w-4 h-4" /> },
                  { id: 'resource-hub', label: 'Resource Hub', icon: <Crown className="w-4 h-4" /> },
                  { id: 'data-room-architecture', label: 'Data Room Tool', icon: <Database className="w-4 h-4" /> },
                  { id: 'financial-model-builder', label: 'Financial Model', icon: <Calculator className="w-4 h-4" /> },
                  { id: 'cap-table-manager', label: 'Cap Table', icon: <TrendingUp className="w-4 h-4" /> },
                  { id: 'dd-qa-generator', label: 'Due Diligence', icon: <Shield className="w-4 h-4" /> },
                  { id: 'team-analytics', label: 'Team Analytics', icon: <Users className="w-4 h-4" /> },
                  { id: 'customer-analytics', label: 'Customer Analytics', icon: <Target className="w-4 h-4" /> },
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
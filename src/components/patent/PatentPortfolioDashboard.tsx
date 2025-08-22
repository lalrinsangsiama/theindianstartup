'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { 
  Scale,
  TrendingUp,
  FileText,
  Clock,
  DollarSign,
  Globe,
  AlertCircle,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  Briefcase,
  Target,
  Award,
  Users,
  Calendar,
  MapPin,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { logger } from '@/lib/logger';

interface PatentPortfolio {
  id: string;
  portfolioName: string;
  description: string;
  totalPatents: number;
  activePatents: number;
  pendingApplications: number;
  grantedPatents: number;
  portfolioValue: number;
  annualMaintenanceCost: number;
  technologyAreas: string[];
  jurisdictions: string[];
  applications: PatentApplication[];
}

interface PatentApplication {
  id: string;
  applicationNumber?: string;
  title: string;
  inventionType: string;
  status: 'draft' | 'filed' | 'examination' | 'granted' | 'rejected' | 'abandoned';
  jurisdiction: string;
  filingDate?: string;
  priorityDate?: string;
  inventors: any[];
  totalInvestment: number;
  estimatedValue: number;
  technologyArea: string;
  commercialStatus: string;
}

interface DashboardData {
  portfolios: PatentPortfolio[];
  totalApplications: number;
  totalValue: number;
  totalInvestment: number;
  averageGrantRate: number;
}

export default function PatentPortfolioDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products/p10');
      
      if (!response.ok) {
        throw new Error('Failed to load portfolio data');
      }

      const data = await response.json();
      
      // Process portfolio data for dashboard
      const portfolios = data.portfolios || [];
      const totalApplications = portfolios.reduce((sum: number, p: PatentPortfolio) => sum + p.totalPatents, 0);
      const totalValue = portfolios.reduce((sum: number, p: PatentPortfolio) => sum + p.portfolioValue, 0);
      const totalInvestment = portfolios.reduce((sum: number, p: PatentPortfolio) => sum + p.annualMaintenanceCost, 0);
      
      setDashboardData({
        portfolios,
        totalApplications,
        totalValue,
        totalInvestment,
        averageGrantRate: 75 // Mock data - would be calculated from actual applications
      });

      if (portfolios.length > 0) {
        setSelectedPortfolio(portfolios[0].id);
      }

    } catch (error) {
      logger.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted': return 'bg-green-100 text-green-800';
      case 'examination': return 'bg-blue-100 text-blue-800';
      case 'filed': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'abandoned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted': return <CheckCircle2 className="h-4 w-4" />;
      case 'examination': return <Search className="h-4 w-4" />;
      case 'filed': return <FileText className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'abandoned': return <Trash2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredApplications = (applications: PatentApplication[]) => {
    return applications.filter(app => {
      const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.technologyArea.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load portfolio data. Please try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const selectedPortfolioData = dashboardData.portfolios.find(p => p.id === selectedPortfolio);

  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Scale className="h-8 w-8 text-blue-600" />
            Patent Portfolio Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your intellectual property portfolio and track applications
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Portfolio
        </Button>
      </div>

      {/* Portfolio Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Applications</p>
                <p className="text-3xl font-bold text-blue-900">
                  {dashboardData.totalApplications}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Portfolio Value</p>
                <p className="text-3xl font-bold text-green-900">
                  ₹{Math.round(dashboardData.totalValue / 100000)}L
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Total Investment</p>
                <p className="text-3xl font-bold text-purple-900">
                  ₹{Math.round(dashboardData.totalInvestment / 100000)}L
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600">Grant Rate</p>
                <p className="text-3xl font-bold text-orange-900">
                  {dashboardData.averageGrantRate}%
                </p>
              </div>
              <Award className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Selection and Management */}
      {dashboardData.portfolios.length > 0 ? (
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* Portfolio List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Your Portfolios</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {dashboardData.portfolios.map((portfolio) => (
                    <button
                      key={portfolio.id}
                      onClick={() => setSelectedPortfolio(portfolio.id)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-4 ${
                        selectedPortfolio === portfolio.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-transparent'
                      }`}
                    >
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">{portfolio.portfolioName}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <span>{portfolio.totalPatents} patents</span>
                          <span>₹{Math.round(portfolio.portfolioValue / 100000)}L</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {portfolio.technologyAreas.slice(0, 2).map((tech, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Portfolio Details */}
          <div className="lg:col-span-3">
            {selectedPortfolioData ? (
              <div className="space-y-6">
                
                {/* Portfolio Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-blue-600" />
                          {selectedPortfolioData.portfolioName}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedPortfolioData.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedPortfolioData.activePatents}
                        </p>
                        <p className="text-xs text-gray-600">Active Patents</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {selectedPortfolioData.grantedPatents}
                        </p>
                        <p className="text-xs text-gray-600">Granted</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {selectedPortfolioData.pendingApplications}
                        </p>
                        <p className="text-xs text-gray-600">Pending</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedPortfolioData.jurisdictions.length}
                        </p>
                        <p className="text-xs text-gray-600">Countries</p>
                      </div>
                    </div>
                    
                    {/* Technology Areas */}
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Technology Areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPortfolioData.technologyAreas.map((tech, idx) => (
                          <Badge key={idx} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Applications Search and Filter */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Patent Applications</CardTitle>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Application
                      </Button>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search applications..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Status</option>
                        <option value="draft">Draft</option>
                        <option value="filed">Filed</option>
                        <option value="examination">Examination</option>
                        <option value="granted">Granted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedPortfolioData.applications && selectedPortfolioData.applications.length > 0 ? (
                      <div className="space-y-4">
                        {filteredApplications(selectedPortfolioData.applications).map((application) => (
                          <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-semibold text-sm">{application.title}</h3>
                                  <Badge className={getStatusColor(application.status)}>
                                    <div className="flex items-center gap-1">
                                      {getStatusIcon(application.status)}
                                      {application.status}
                                    </div>
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {application.jurisdiction}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {application.filingDate ? new Date(application.filingDate).toLocaleDateString() : 'Not filed'}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />
                                    ₹{Math.round(application.totalInvestment / 1000)}K invested
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    ₹{Math.round(application.estimatedValue / 100000)}L value
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <Badge variant="outline" className="text-xs">
                                    {application.technologyArea}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Applications Yet</h3>
                        <p className="text-gray-600 mb-4">
                          Start building your patent portfolio by adding your first application.
                        </p>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Application
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Portfolio</h3>
                  <p className="text-gray-600">
                    Choose a portfolio from the left to view detailed information and manage applications.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <Card>
          <CardContent className="p-12 text-center">
            <Scale className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Start Your Patent Journey</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Create your first patent portfolio to begin tracking your intellectual property applications and building your IP strategy.
            </p>
            <Button size="lg" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Portfolio
            </Button>
            
            {/* Quick Setup Guide */}
            <div className="mt-8 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-4">Quick Setup Guide:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">1</div>
                  <h4 className="font-medium mb-1">Create Portfolio</h4>
                  <p className="text-sm text-gray-600">Define your IP strategy and technology focus areas</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">2</div>
                  <h4 className="font-medium mb-1">Add Applications</h4>
                  <p className="text-sm text-gray-600">Track your patent applications across jurisdictions</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-2">3</div>
                  <h4 className="font-medium mb-1">Monitor & Optimize</h4>
                  <p className="text-sm text-gray-600">Track progress, deadlines, and portfolio value</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Portfolio Modal would go here */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Create New Portfolio</h2>
            <p className="text-gray-600 mb-4">This feature will be available soon.</p>
            <Button onClick={() => setShowCreateModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
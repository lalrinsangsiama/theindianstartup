'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { 
  Database, 
  FolderOpen, 
  Lock, 
  Users,
  FileText,
  BarChart3,
  Shield,
  CheckCircle,
  AlertTriangle,
  Star,
  Plus,
  Eye,
  Download,
  Settings,
  Target,
  Clock,
  DollarSign
} from 'lucide-react';

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  requiredDocs: string[];
  accessLevel: 'Public' | 'Investor' | 'Board' | 'Management';
  priority: 'High' | 'Medium' | 'Low';
  completionStatus: number;
}

interface DataRoomStructure {
  categories: DocumentCategory[];
  securitySettings: {
    watermarking: boolean;
    downloadRestrictions: boolean;
    timeBasedAccess: boolean;
    ipRestrictions: boolean;
  };
  accessLevels: {
    [key: string]: {
      users: number;
      permissions: string[];
    };
  };
}

const DataRoomArchitect: React.FC = () => {
  const [activeTab, setActiveTab] = useState('structure');
  const [dataRoomName, setDataRoomName] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [structure, setStructure] = useState<DataRoomStructure>({
    categories: [],
    securitySettings: {
      watermarking: false,
      downloadRestrictions: false,
      timeBasedAccess: false,
      ipRestrictions: false
    },
    accessLevels: {}
  });

  const documentCategories: DocumentCategory[] = [
    {
      id: 'company_overview',
      name: 'Company Overview',
      description: 'Executive summary, pitch deck, company presentation',
      icon: <FileText className="w-5 h-5" />,
      requiredDocs: ['Executive Summary', 'Pitch Deck', 'Company Presentation', 'One-Pager'],
      accessLevel: 'Public',
      priority: 'High',
      completionStatus: 0
    },
    {
      id: 'legal_corporate',
      name: 'Legal & Corporate',
      description: 'Articles of incorporation, bylaws, board resolutions',
      icon: <Shield className="w-5 h-5" />,
      requiredDocs: ['Certificate of Incorporation', 'Articles of Association', 'Board Resolutions', 'Shareholder Agreements'],
      accessLevel: 'Investor',
      priority: 'High',
      completionStatus: 0
    },
    {
      id: 'financial',
      name: 'Financial Information',
      description: 'Financial statements, projections, budget',
      icon: <BarChart3 className="w-5 h-5" />,
      requiredDocs: ['Audited Financials', 'Management Accounts', '3-Year Projections', 'Cap Table'],
      accessLevel: 'Investor',
      priority: 'High',
      completionStatus: 0
    },
    {
      id: 'business_operations',
      name: 'Business & Operations',
      description: 'Business plan, market analysis, operational metrics',
      icon: <Target className="w-5 h-5" />,
      requiredDocs: ['Business Plan', 'Market Analysis', 'Competitive Analysis', 'Product Roadmap'],
      accessLevel: 'Investor',
      priority: 'Medium',
      completionStatus: 0
    },
    {
      id: 'team_hr',
      name: 'Team & HR',
      description: 'Organization chart, key employee contracts, HR policies',
      icon: <Users className="w-5 h-5" />,
      requiredDocs: ['Organization Chart', 'Key Employee Contracts', 'HR Policies', 'Employee Handbook'],
      accessLevel: 'Management',
      priority: 'Medium',
      completionStatus: 0
    },
    {
      id: 'technology_ip',
      name: 'Technology & IP',
      description: 'Patents, trademarks, technology documentation',
      icon: <Lock className="w-5 h-5" />,
      requiredDocs: ['Patent Portfolio', 'Trademark Registrations', 'Technology Architecture', 'IP Strategy'],
      accessLevel: 'Board',
      priority: 'High',
      completionStatus: 0
    },
    {
      id: 'customers_sales',
      name: 'Customers & Sales',
      description: 'Customer contracts, sales pipeline, revenue analysis',
      icon: <DollarSign className="w-5 h-5" />,
      requiredDocs: ['Key Customer Contracts', 'Sales Pipeline', 'Customer Analytics', 'Revenue Analysis'],
      accessLevel: 'Investor',
      priority: 'Medium',
      completionStatus: 0
    },
    {
      id: 'compliance_regulatory',
      name: 'Compliance & Regulatory',
      description: 'Regulatory approvals, compliance documentation',
      icon: <CheckCircle className="w-5 h-5" />,
      requiredDocs: ['Regulatory Licenses', 'Compliance Reports', 'Audit Reports', 'Tax Filings'],
      accessLevel: 'Management',
      priority: 'Low',
      completionStatus: 0
    }
  ];

  const platforms = [
    { id: 'intralinks', name: 'Intralinks', features: ['Enterprise Security', 'Advanced Analytics', 'Global Support'] },
    { id: 'firmex', name: 'Firmex', features: ['User-Friendly', 'Cost-Effective', 'Quick Setup'] },
    { id: 'merrill_datasite', name: 'Merrill DataSite', features: ['Investment Banking Grade', 'Advanced Workflow', 'Global Reach'] },
    { id: 'sharevault', name: 'ShareVault', features: ['Mid-Market Focus', 'Flexible Pricing', 'Good Support'] }
  ];

  const calculateOverallCompletion = () => {
    if (structure.categories.length === 0) return 0;
    const totalCompletion = structure.categories.reduce((sum, cat) => sum + cat.completionStatus, 0);
    return Math.round(totalCompletion / structure.categories.length);
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'Public': return 'bg-green-100 text-green-800';
      case 'Investor': return 'bg-blue-100 text-blue-800';
      case 'Board': return 'bg-purple-100 text-purple-800';
      case 'Management': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const initializeStructure = () => {
    if (!dataRoomName || !selectedPlatform) {
      alert('Please provide data room name and select a platform');
      return;
    }

    setStructure({
      categories: documentCategories.map(cat => ({ ...cat })),
      securitySettings: {
        watermarking: true,
        downloadRestrictions: true,
        timeBasedAccess: false,
        ipRestrictions: false
      },
      accessLevels: {
        'Public': { users: 0, permissions: ['View'] },
        'Investor': { users: 0, permissions: ['View', 'Download'] },
        'Board': { users: 0, permissions: ['View', 'Download', 'Print'] },
        'Management': { users: 0, permissions: ['View', 'Download', 'Print', 'Edit'] }
      }
    });
  };

  const updateCategoryCompletion = (categoryId: string, completion: number) => {
    setStructure(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId ? { ...cat, completionStatus: completion } : cat
      )
    }));
  };

  const toggleSecuritySetting = (setting: keyof typeof structure.securitySettings) => {
    setStructure(prev => ({
      ...prev,
      securitySettings: {
        ...prev.securitySettings,
        [setting]: !prev.securitySettings[setting]
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Data Room Architecture Tool</h1>
              <p className="text-gray-600">Design and build your professional investor data room</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{documentCategories.length}</div>
              <div className="text-sm text-gray-600">Document Categories</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{calculateOverallCompletion()}%</div>
              <div className="text-sm text-gray-600">Overall Completion</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-gray-600">Access Levels</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">₹25,000</div>
              <div className="text-sm text-gray-600">Tool Value</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'setup', label: 'Initial Setup', icon: <Settings className="w-4 h-4" /> },
          { id: 'structure', label: 'Document Structure', icon: <FolderOpen className="w-4 h-4" /> },
          { id: 'security', label: 'Security Settings', icon: <Shield className="w-4 h-4" /> },
          { id: 'preview', label: 'Preview & Export', icon: <Eye className="w-4 h-4" /> }
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
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Data Room Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Data Room Name</label>
                <Input
                  value={dataRoomName}
                  onChange={(e) => setDataRoomName(e.target.value)}
                  placeholder="e.g., TechCorp Series A Data Room"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Platform Selection</label>
                <div className="space-y-2">
                  {platforms.map(platform => (
                    <div
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedPlatform === platform.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{platform.name}</h4>
                        {selectedPlatform === platform.id && (
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {platform.features.map(feature => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={initializeStructure}
                disabled={!dataRoomName || !selectedPlatform}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Database className="w-4 h-4 mr-2" />
                Initialize Data Room Structure
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Room Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Logical Organization</div>
                    <div className="text-sm text-gray-600">Group documents by category and investor needs</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Access Control</div>
                    <div className="text-sm text-gray-600">Implement proper access levels and permissions</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Security First</div>
                    <div className="text-sm text-gray-600">Enable watermarking and download restrictions</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Regular Updates</div>
                    <div className="text-sm text-gray-600">Keep documents current and version controlled</div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Document Structure Tab */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          {structure.categories.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5" />
                      Document Categories ({structure.categories.length})
                    </span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {calculateOverallCompletion()}% Complete
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {structure.categories.map(category => (
                      <Card key={category.id} className="border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{category.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                              <div className="flex gap-2">
                                <Badge className={getAccessLevelColor(category.accessLevel)}>
                                  {category.accessLevel}
                                </Badge>
                                <Badge className={getPriorityColor(category.priority)}>
                                  {category.priority}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="text-sm font-medium">Required Documents:</div>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {category.requiredDocs.map(doc => (
                                <li key={doc} className="flex items-center gap-2">
                                  <FileText className="w-3 h-3" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Completion Status</span>
                              <span>{category.completionStatus}%</span>
                            </div>
                            <Progress value={category.completionStatus} className="h-2" />
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              value={category.completionStatus}
                              onChange={(e) => updateCategoryCompletion(category.id, Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold text-lg mb-2">No Data Room Structure</h3>
                <p className="text-gray-600 mb-4">Initialize your data room in the Setup tab first</p>
                <Button onClick={() => setActiveTab('setup')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Go to Setup
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(structure.securitySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'watermarking' && 'Add watermarks to all documents'}
                      {key === 'downloadRestrictions' && 'Control document download permissions'}
                      {key === 'timeBasedAccess' && 'Set time-limited access for users'}
                      {key === 'ipRestrictions' && 'Restrict access by IP address'}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSecuritySetting(key as keyof typeof structure.securitySettings)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      value ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(structure.accessLevels).map(([level, settings]) => (
                  <div key={level} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getAccessLevelColor(level)}>
                        {level}
                      </Badge>
                      <span className="text-sm font-medium">{settings.users} users</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Permissions: {settings.permissions.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Data Room Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {structure.categories.length > 0 ? (
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Data Room: {dataRoomName}</h3>
                    <p className="text-sm text-gray-600 mb-4">Platform: {selectedPlatform}</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{structure.categories.length}</div>
                        <div className="text-sm text-gray-600">Categories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{calculateOverallCompletion()}%</div>
                        <div className="text-sm text-gray-600">Complete</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {structure.categories.reduce((sum, cat) => sum + cat.requiredDocs.length, 0)}
                        </div>
                        <div className="text-sm text-gray-600">Documents</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Export Structure
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Data Room
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Complete the setup and structure to preview your data room</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DataRoomArchitect;
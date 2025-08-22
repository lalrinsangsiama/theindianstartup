'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Users, 
  Mail, 
  Phone,
  Globe,
  Search,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Zap,
  CheckCircle,
  Plus,
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';

interface LeadChannel {
  id: string;
  name: string;
  type: string;
  description: string;
  costPerLead: number;
  conversionRate: number;
  monthlyCapacity: number;
  setupTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  icon: React.ReactNode;
}

interface LeadCampaign {
  id: string;
  name: string;
  channels: string[];
  targetAudience: string;
  budget: number;
  timeline: number;
  expectedLeads: number;
  status: 'Planning' | 'Active' | 'Completed';
}

const LeadGenerationMachine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('channels');
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<LeadCampaign[]>([]);
  const [budget, setBudget] = useState(50000);
  const [targetLeads, setTargetLeads] = useState(100);
  const [timeline, setTimeline] = useState(30);

  const leadChannels: LeadChannel[] = [
    {
      id: 'linkedin_outreach',
      name: 'LinkedIn Outreach',
      type: 'Social Selling',
      description: 'Direct outreach to prospects on LinkedIn with personalized messages',
      costPerLead: 150,
      conversionRate: 8,
      monthlyCapacity: 500,
      setupTime: 3,
      difficulty: 'Easy',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'cold_email',
      name: 'Cold Email Campaigns',
      type: 'Email Marketing',
      description: 'Automated email sequences to targeted prospect lists',
      costPerLead: 100,
      conversionRate: 5,
      monthlyCapacity: 2000,
      setupTime: 5,
      difficulty: 'Medium',
      icon: <Mail className="w-5 h-5" />
    },
    {
      id: 'cold_calling',
      name: 'Cold Calling',
      type: 'Phone Sales',
      description: 'Direct phone outreach to qualified prospects',
      costPerLead: 300,
      conversionRate: 12,
      monthlyCapacity: 300,
      setupTime: 2,
      difficulty: 'Hard',
      icon: <Phone className="w-5 h-5" />
    },
    {
      id: 'content_marketing',
      name: 'Content Marketing',
      type: 'Inbound',
      description: 'Blog posts, whitepapers, and educational content for organic leads',
      costPerLead: 200,
      conversionRate: 15,
      monthlyCapacity: 800,
      setupTime: 14,
      difficulty: 'Medium',
      icon: <Globe className="w-5 h-5" />
    },
    {
      id: 'seo_organic',
      name: 'SEO & Organic Search',
      type: 'Inbound',
      description: 'Search engine optimization for organic lead generation',
      costPerLead: 250,
      conversionRate: 20,
      monthlyCapacity: 400,
      setupTime: 21,
      difficulty: 'Hard',
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 'paid_advertising',
      name: 'Google/Facebook Ads',
      type: 'Paid Media',
      description: 'Paid advertising campaigns on Google and social platforms',
      costPerLead: 400,
      conversionRate: 10,
      monthlyCapacity: 1500,
      setupTime: 7,
      difficulty: 'Medium',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 'referral_program',
      name: 'Referral Program',
      type: 'Word of Mouth',
      description: 'Systematic referral program with existing customers and partners',
      costPerLead: 500,
      conversionRate: 25,
      monthlyCapacity: 200,
      setupTime: 10,
      difficulty: 'Easy',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'webinars_events',
      name: 'Webinars & Events',
      type: 'Education',
      description: 'Educational webinars and industry events for lead capture',
      costPerLead: 350,
      conversionRate: 18,
      monthlyCapacity: 300,
      setupTime: 14,
      difficulty: 'Medium',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  const calculateROI = (channels: string[]) => {
    const selectedChannelData = leadChannels.filter(c => channels.includes(c.id));
    const totalLeads = selectedChannelData.reduce((sum, channel) => {
      const leadsFromChannel = Math.min(
        Math.floor(budget * 0.8 / channel.costPerLead / selectedChannelData.length),
        Math.floor(channel.monthlyCapacity * (timeline / 30))
      );
      return sum + leadsFromChannel;
    }, 0);
    
    const totalCost = selectedChannelData.reduce((sum, channel) => {
      const leadsFromChannel = Math.min(
        Math.floor(budget * 0.8 / channel.costPerLead / selectedChannelData.length),
        Math.floor(channel.monthlyCapacity * (timeline / 30))
      );
      return sum + (leadsFromChannel * channel.costPerLead);
    }, 0);

    const avgConversionRate = selectedChannelData.reduce((sum, channel, index) => {
      return sum + channel.conversionRate;
    }, 0) / selectedChannelData.length || 0;

    const expectedCustomers = Math.floor(totalLeads * (avgConversionRate / 100));
    
    return {
      totalLeads,
      totalCost,
      expectedCustomers,
      avgConversionRate,
      costPerLead: totalCost / totalLeads || 0,
      roi: ((expectedCustomers * 50000) - totalCost) / totalCost * 100 || 0
    };
  };

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const createCampaign = () => {
    if (selectedChannels.length === 0) return;

    const newCampaign: LeadCampaign = {
      id: `campaign_${Date.now()}`,
      name: `Multi-Channel Campaign ${campaigns.length + 1}`,
      channels: [...selectedChannels],
      targetAudience: 'B2B Decision Makers',
      budget: budget,
      timeline: timeline,
      expectedLeads: calculateROI(selectedChannels).totalLeads,
      status: 'Planning'
    };

    setCampaigns(prev => [...prev, newCampaign]);
    setSelectedChannels([]);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const roiData = calculateROI(selectedChannels);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Lead Generation Machine</h1>
              <p className="text-gray-600">Build your multi-channel lead generation strategy</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{leadChannels.length}</div>
              <div className="text-sm text-gray-600">Available Channels</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{selectedChannels.length}</div>
              <div className="text-sm text-gray-600">Selected Channels</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{campaigns.length}</div>
              <div className="text-sm text-gray-600">Active Campaigns</div>
            </div>
            <div className="text-center p-3 bg-white/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{roiData.totalLeads}</div>
              <div className="text-sm text-gray-600">Expected Leads</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { id: 'channels', label: 'Lead Channels', icon: <Target className="w-4 h-4" /> },
          { id: 'calculator', label: 'ROI Calculator', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'campaigns', label: 'Campaigns', icon: <Zap className="w-4 h-4" /> },
          { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> }
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

      {/* Lead Channels Tab */}
      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {leadChannels.map(channel => (
            <Card 
              key={channel.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedChannels.includes(channel.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleChannelToggle(channel.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {channel.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{channel.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {channel.type}
                      </Badge>
                    </div>
                  </div>
                  {selectedChannels.includes(channel.id) && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{channel.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost per Lead:</span>
                    <span className="font-medium">₹{channel.costPerLead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion Rate:</span>
                    <span className="font-medium">{channel.conversionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Capacity:</span>
                    <span className="font-medium">{channel.monthlyCapacity} leads</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Setup Time:</span>
                    <span className="font-medium">{channel.setupTime} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Difficulty:</span>
                    <Badge className={getDifficultyColor(channel.difficulty)}>
                      {channel.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ROI Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Campaign Parameters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Budget (₹)</label>
                <Input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  min="10000"
                  step="5000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Campaign Timeline (days)</label>
                <Input
                  type="number"
                  value={timeline}
                  onChange={(e) => setTimeline(Number(e.target.value))}
                  min="7"
                  max="90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Selected Channels ({selectedChannels.length})
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedChannels.map(channelId => {
                    const channel = leadChannels.find(c => c.id === channelId);
                    return channel ? (
                      <Badge key={channelId} variant="outline">
                        {channel.name}
                      </Badge>
                    ) : null;
                  })}
                  {selectedChannels.length === 0 && (
                    <p className="text-sm text-gray-500">Select channels from the Channels tab</p>
                  )}
                </div>
              </div>

              <Button
                onClick={createCampaign}
                disabled={selectedChannels.length === 0}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Projected Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedChannels.length > 0 ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{roiData.totalLeads}</div>
                      <div className="text-sm text-gray-600">Total Leads</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{roiData.expectedCustomers}</div>
                      <div className="text-sm text-gray-600">Expected Customers</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment:</span>
                      <span className="font-medium">₹{roiData.totalCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost per Lead:</span>
                      <span className="font-medium">₹{Math.round(roiData.costPerLead)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Conversion Rate:</span>
                      <span className="font-medium">{roiData.avgConversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projected ROI:</span>
                      <span className={`font-medium ${roiData.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {roiData.roi.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">Success Factors</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Quality targeting and messaging</li>
                      <li>• Consistent follow-up processes</li>
                      <li>• A/B testing and optimization</li>
                      <li>• CRM integration and tracking</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select lead generation channels to see projections</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {campaigns.length > 0 ? (
            campaigns.map(campaign => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <p className="text-gray-600">{campaign.targetAudience}</p>
                    </div>
                    <Badge className={
                      campaign.status === 'Planning' ? 'bg-yellow-100 text-yellow-800' :
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }>
                      {campaign.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Budget</div>
                      <div className="font-medium">₹{campaign.budget.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Timeline</div>
                      <div className="font-medium">{campaign.timeline} days</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Expected Leads</div>
                      <div className="font-medium">{campaign.expectedLeads}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Channels</div>
                      <div className="font-medium">{campaign.channels.length}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Plan
                    </Button>
                    {campaign.status === 'Planning' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        <Zap className="w-4 h-4 mr-2" />
                        Launch Campaign
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="font-semibold text-lg mb-2">No Campaigns Yet</h3>
                <p className="text-gray-600 mb-4">Create your first lead generation campaign using the calculator</p>
                <Button onClick={() => setActiveTab('calculator')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Channel Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leadChannels.slice(0, 5).map(channel => (
                  <div key={channel.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {channel.icon}
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{channel.conversionRate}%</div>
                      <div className="text-sm text-gray-500">conversion</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Lead Generation Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Analytics will appear after campaign launches</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeadGenerationMachine;
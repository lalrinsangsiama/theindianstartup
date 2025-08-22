'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  Megaphone, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Share2,
  Mail,
  Phone,
  Globe,
  Star,
  Target,
  Zap,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  objective: string;
  targetAudience: string;
  budget: number;
  timeline: string;
  status: 'planning' | 'active' | 'completed';
  channels: string[];
  keyMessages: string[];
  mediaTargets: MediaTarget[];
  milestones: Milestone[];
  results: CampaignResults;
}

interface MediaTarget {
  id: string;
  publication: string;
  journalist: string;
  email: string;
  phone?: string;
  beat: string;
  relationship: 'cold' | 'warm' | 'strong';
  status: 'pending' | 'contacted' | 'interested' | 'declined' | 'published';
  lastContact?: Date;
  notes: string;
}

interface Milestone {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
  description: string;
}

interface CampaignResults {
  impressions: number;
  mentions: number;
  positivesentiment: number;
  mediaValue: number;
  websiteTraffic: number;
  leads: number;
}

const PRCampaignManager: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: '',
    targetAudience: '',
    budget: '',
    timeline: ''
  });

  // Sample data initialization
  useEffect(() => {
    const sampleCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Product Launch Campaign',
        objective: 'Generate awareness for new AI product launch',
        targetAudience: 'Tech entrepreneurs and SME owners',
        budget: 500000,
        timeline: '6 weeks',
        status: 'active',
        channels: ['Tech Media', 'Business Publications', 'LinkedIn', 'Industry Podcasts'],
        keyMessages: [
          'Revolutionary AI solution for small businesses',
          'First-of-its-kind automation platform in India',
          'Democratizing AI for entrepreneurs'
        ],
        mediaTargets: [
          {
            id: '1',
            publication: 'YourStory',
            journalist: 'Priya Sharma',
            email: 'priya@yourstory.com',
            phone: '+91-9876543210',
            beat: 'Startups & Technology',
            relationship: 'warm',
            status: 'interested',
            notes: 'Previously covered our seed funding story'
          },
          {
            id: '2',
            publication: 'Inc42',
            journalist: 'Rahul Singh',
            email: 'rahul@inc42.com',
            beat: 'AI & SaaS',
            relationship: 'cold',
            status: 'contacted',
            notes: 'Sent initial pitch deck, waiting for response'
          }
        ],
        milestones: [
          {
            id: '1',
            title: 'Media Kit Preparation',
            date: new Date('2025-08-25'),
            completed: true,
            description: 'Complete press kit with product details, founder bios, and high-res images'
          },
          {
            id: '2',
            title: 'Journalist Outreach',
            date: new Date('2025-09-01'),
            completed: false,
            description: 'Reach out to tier-1 tech publications'
          }
        ],
        results: {
          impressions: 2500000,
          mentions: 45,
          positivesentiment: 85,
          mediaValue: 1800000,
          websiteTraffic: 125,
          leads: 89
        }
      }
    ];
    setCampaigns(sampleCampaigns);
    setActiveCampaign(sampleCampaigns[0]);
  }, []);

  const createNewCampaign = () => {
    if (!newCampaign.name || !newCampaign.objective) return;

    const campaign: Campaign = {
      id: Date.now().toString(),
      name: newCampaign.name,
      objective: newCampaign.objective,
      targetAudience: newCampaign.targetAudience,
      budget: parseInt(newCampaign.budget) || 0,
      timeline: newCampaign.timeline,
      status: 'planning',
      channels: [],
      keyMessages: [],
      mediaTargets: [],
      milestones: [],
      results: {
        impressions: 0,
        mentions: 0,
        positivesentiment: 0,
        mediaValue: 0,
        websiteTraffic: 0,
        leads: 0
      }
    };

    setCampaigns([...campaigns, campaign]);
    setActiveCampaign(campaign);
    setShowNewCampaign(false);
    setNewCampaign({
      name: '',
      objective: '',
      targetAudience: '',
      budget: '',
      timeline: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'cold': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'strong': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">PR Campaign Manager</h1>
          <p className="text-gray-600">Manage your public relations campaigns and media outreach</p>
        </div>
        <Button 
          onClick={() => setShowNewCampaign(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Campaign List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map(campaign => (
          <Card 
            key={campaign.id} 
            className={`cursor-pointer transition-all ${
              activeCampaign?.id === campaign.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
            }`}
            onClick={() => setActiveCampaign(campaign)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{campaign.objective}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget:</span>
                  <span className="font-semibold">{formatCurrency(campaign.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Media Targets:</span>
                  <span className="font-semibold">{campaign.mediaTargets.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Timeline:</span>
                  <span className="font-semibold">{campaign.timeline}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Campaign Form */}
      {showNewCampaign && (
        <Card>
          <CardHeader>
            <CardTitle>Create New PR Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Product Launch Campaign"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget (₹)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="500000"
                  value={newCampaign.budget}
                  onChange={(e) => setNewCampaign({...newCampaign, budget: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="objective">Campaign Objective</Label>
              <Textarea
                id="objective"
                placeholder="Describe the main goal of this PR campaign"
                value={newCampaign.objective}
                onChange={(e) => setNewCampaign({...newCampaign, objective: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  placeholder="e.g., Tech entrepreneurs"
                  value={newCampaign.targetAudience}
                  onChange={(e) => setNewCampaign({...newCampaign, targetAudience: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 6 weeks"
                  value={newCampaign.timeline}
                  onChange={(e) => setNewCampaign({...newCampaign, timeline: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={createNewCampaign} className="bg-blue-600 hover:bg-blue-700 text-white">
                Create Campaign
              </Button>
              <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Campaign Details */}
      {activeCampaign && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Campaign Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="w-5 h-5" />
                {activeCampaign.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Objective</h3>
                <p className="text-gray-600">{activeCampaign.objective}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Key Messages</h3>
                <div className="space-y-2">
                  {activeCampaign.keyMessages.map((message, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Channels</h3>
                <div className="flex flex-wrap gap-2">
                  {activeCampaign.channels.map((channel, index) => (
                    <Badge key={index} variant="outline">{channel}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-600">
                    {(activeCampaign.results.impressions / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-xs text-gray-600">Impressions</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Share2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-600">
                    {activeCampaign.results.mentions}
                  </div>
                  <div className="text-xs text-gray-600">Mentions</div>
                </div>
              </div>

              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-yellow-600">
                  {activeCampaign.results.positivesentiment}%
                </div>
                <div className="text-xs text-gray-600">Positive Sentiment</div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Target className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <div className="text-lg font-bold text-purple-600">
                  {formatCurrency(activeCampaign.results.mediaValue)}
                </div>
                <div className="text-xs text-gray-600">Media Value</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Media Targets */}
      {activeCampaign && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Media Targets ({activeCampaign.mediaTargets.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Publication</th>
                    <th className="text-left p-2">Journalist</th>
                    <th className="text-left p-2">Beat</th>
                    <th className="text-left p-2">Relationship</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeCampaign.mediaTargets.map(target => (
                    <tr key={target.id} className="border-b">
                      <td className="p-2 font-medium">{target.publication}</td>
                      <td className="p-2">{target.journalist}</td>
                      <td className="p-2">{target.beat}</td>
                      <td className="p-2">
                        <Badge className={getRelationshipColor(target.relationship)} variant="outline">
                          {target.relationship}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <Badge variant="outline">{target.status}</Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      {activeCampaign && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Campaign Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCampaign.milestones.map(milestone => (
                <div key={milestone.id} className="flex items-start gap-3">
                  {milestone.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${milestone.completed ? 'text-green-700' : ''}`}>
                        {milestone.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {milestone.date.toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PRCampaignManager;
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  TrendingUp, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  Target,
  DollarSign,
  Plus,
  X,
  BarChart3,
  Globe
} from 'lucide-react';

interface MarketResearch {
  targetMarket?: any;
  competitors?: any;
  marketSize?: any;
}

interface TargetSegment {
  id: string;
  name: string;
  description: string;
  size: string;
  painPoints: string[];
}

interface Competitor {
  id: string;
  name: string;
  type: 'direct' | 'indirect' | 'substitute';
  strengths: string[];
  weaknesses: string[];
  pricing: string;
  marketShare: string;
}

interface MarketSize {
  tam: string; // Total Addressable Market
  sam: string; // Serviceable Addressable Market
  som: string; // Serviceable Obtainable Market
  tamDescription: string;
  samDescription: string;
  somDescription: string;
}

export default function MarketResearchPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<MarketResearch>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Local state for form data
  const [targetSegments, setTargetSegments] = useState<TargetSegment[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [marketSize, setMarketSize] = useState<MarketSize>({
    tam: '',
    sam: '',
    som: '',
    tamDescription: '',
    samDescription: '',
    somDescription: '',
  });

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
      setPortfolio({
        targetMarket: data.targetMarket,
        competitors: data.competitors,
        marketSize: data.marketSize,
      });

      // Parse existing data
      if (data.targetMarket) {
        setTargetSegments(data.targetMarket.segments || []);
      }
      if (data.competitors) {
        setCompetitors(data.competitors.list || []);
      }
      if (data.marketSize) {
        setMarketSize({
          tam: data.marketSize.tam || '',
          sam: data.marketSize.sam || '',
          som: data.marketSize.som || '',
          tamDescription: data.marketSize.tamDescription || '',
          samDescription: data.marketSize.samDescription || '',
          somDescription: data.marketSize.somDescription || '',
        });
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/portfolio/market-research', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetMarket: {
            segments: targetSegments,
            lastUpdated: new Date().toISOString(),
          },
          competitors: {
            list: competitors,
            lastUpdated: new Date().toISOString(),
          },
          marketSize: {
            ...marketSize,
            lastUpdated: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setLastSaved(new Date());
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const addTargetSegment = () => {
    const newSegment: TargetSegment = {
      id: Date.now().toString(),
      name: '',
      description: '',
      size: '',
      painPoints: [''],
    };
    setTargetSegments([...targetSegments, newSegment]);
  };

  const updateTargetSegment = (id: string, field: keyof TargetSegment, value: any) => {
    setTargetSegments(segments =>
      segments.map(segment =>
        segment.id === id ? { ...segment, [field]: value } : segment
      )
    );
  };

  const removeTargetSegment = (id: string) => {
    setTargetSegments(segments => segments.filter(segment => segment.id !== id));
  };

  const addCompetitor = () => {
    const newCompetitor: Competitor = {
      id: Date.now().toString(),
      name: '',
      type: 'direct',
      strengths: [''],
      weaknesses: [''],
      pricing: '',
      marketShare: '',
    };
    setCompetitors([...competitors, newCompetitor]);
  };

  const updateCompetitor = (id: string, field: keyof Competitor, value: any) => {
    setCompetitors(comps =>
      comps.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    );
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(comps => comps.filter(comp => comp.id !== id));
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 6;

    // Target market (1 point)
    if (targetSegments.length > 0 && targetSegments[0]?.name) completed++;

    // Competitors (1 point)
    if (competitors.length > 0 && competitors[0]?.name) completed++;

    // Market size fields (4 points)
    if (marketSize.tam) completed++;
    if (marketSize.sam) completed++;
    if (marketSize.som) completed++;
    if (marketSize.tamDescription && marketSize.samDescription && marketSize.somDescription) completed++;

    return (completed / total) * 100;
  };

  const isComplete = getCompletionPercentage() >= 80; // 80% threshold for completion

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

  return (
    <ProtectedRoute >
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/portfolio')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
              
              <div className="flex items-center gap-4">
                {lastSaved && (
                  <Text size="sm" color="muted">
                    Last saved {lastSaved.toLocaleTimeString()}
                  </Text>
                )}
                <Button
                  variant="primary"
                  onClick={saveSection}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Market Research
                </Heading>
                <Text className="text-gray-600">
                  Understand your target market, competitors, and market opportunity
                </Text>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
              </div>
              <Badge variant={isComplete ? "success" : "default"}>
                {Math.round(getCompletionPercentage())}% Complete
              </Badge>
            </div>

            {error && (
              <Card className="border-red-200 bg-red-50 mb-6">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <Text className="text-red-700">{error}</Text>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Target Market Segments */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Target Market Segments
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addTargetSegment}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Segment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {targetSegments.length === 0 ? (
                    <div className="text-center py-8">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <Text color="muted">No target segments defined yet</Text>
                      <Button variant="outline" size="sm" className="mt-3" onClick={addTargetSegment}>
                        Add Your First Segment
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {targetSegments.map((segment, index) => (
                        <div key={segment.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline">Segment {index + 1}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTargetSegment(segment.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Segment Name
                              </label>
                              <Input
                                value={segment.name}
                                onChange={(e) => updateTargetSegment(segment.id, 'name', e.target.value)}
                                placeholder="e.g., Small Business Owners"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Description
                              </label>
                              <textarea
                                value={segment.description}
                                onChange={(e) => updateTargetSegment(segment.id, 'description', e.target.value)}
                                placeholder="Describe this customer segment..."
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                rows={3}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Market Size
                              </label>
                              <Input
                                value={segment.size}
                                onChange={(e) => updateTargetSegment(segment.id, 'size', e.target.value)}
                                placeholder="e.g., 2.5M businesses in India"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Market Size Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Market Size Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      TAM - Total Addressable Market
                    </label>
                    <Input
                      value={marketSize.tam}
                      onChange={(e) => setMarketSize(prev => ({ ...prev, tam: e.target.value }))}
                      placeholder="e.g., $50B globally"
                    />
                    <textarea
                      value={marketSize.tamDescription}
                      onChange={(e) => setMarketSize(prev => ({ ...prev, tamDescription: e.target.value }))}
                      placeholder="Explain your TAM calculation..."
                      className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      SAM - Serviceable Addressable Market
                    </label>
                    <Input
                      value={marketSize.sam}
                      onChange={(e) => setMarketSize(prev => ({ ...prev, sam: e.target.value }))}
                      placeholder="e.g., $5B in India"
                    />
                    <textarea
                      value={marketSize.samDescription}
                      onChange={(e) => setMarketSize(prev => ({ ...prev, samDescription: e.target.value }))}
                      placeholder="Explain your SAM calculation..."
                      className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                      rows={2}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      SOM - Serviceable Obtainable Market
                    </label>
                    <Input
                      value={marketSize.som}
                      onChange={(e) => setMarketSize(prev => ({ ...prev, som: e.target.value }))}
                      placeholder="e.g., $50M in 5 years"
                    />
                    <textarea
                      value={marketSize.somDescription}
                      onChange={(e) => setMarketSize(prev => ({ ...prev, somDescription: e.target.value }))}
                      placeholder="Explain your SOM calculation..."
                      className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Competitor Analysis */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-purple-600" />
                      Competitor Analysis
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addCompetitor}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Competitor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {competitors.length === 0 ? (
                    <div className="text-center py-8">
                      <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <Text color="muted">No competitors analyzed yet</Text>
                      <Button variant="outline" size="sm" className="mt-3" onClick={addCompetitor}>
                        Add Your First Competitor
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {competitors.map((competitor, index) => (
                        <div key={competitor.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline">Competitor {index + 1}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCompetitor(competitor.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Company Name
                                </label>
                                <Input
                                  value={competitor.name}
                                  onChange={(e) => updateCompetitor(competitor.id, 'name', e.target.value)}
                                  placeholder="Competitor name"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Type
                                </label>
                                <select
                                  value={competitor.type}
                                  onChange={(e) => updateCompetitor(competitor.id, 'type', e.target.value)}
                                  className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                  <option value="direct">Direct</option>
                                  <option value="indirect">Indirect</option>
                                  <option value="substitute">Substitute</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Pricing
                                </label>
                                <Input
                                  value={competitor.pricing}
                                  onChange={(e) => updateCompetitor(competitor.id, 'pricing', e.target.value)}
                                  placeholder="e.g., ₹999/month"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium mb-1">
                                  Market Share
                                </label>
                                <Input
                                  value={competitor.marketShare}
                                  onChange={(e) => updateCompetitor(competitor.id, 'marketShare', e.target.value)}
                                  placeholder="e.g., 15%"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/idea-vision')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Idea & Vision
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                onClick={saveSection}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save & Continue
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push('/portfolio/business-model')}
                disabled={!isComplete}
              >
                Next: Business Model
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Completion Status */}
          {isComplete && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <Text className="text-green-700 font-medium">
                  Excellent! You&apos;ve completed the Market Research section. Ready to define your Business Model?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
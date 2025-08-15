'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  DollarSign, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  X,
  Users,
  Zap,
  Heart,
  Briefcase,
  CreditCard,
  TrendingUp
} from 'lucide-react';

interface BusinessModel {
  revenue_streams?: any;
  pricing_strategy?: any;
}

interface RevenueStream {
  id: string;
  name: string;
  description: string;
  type: 'subscription' | 'one-time' | 'commission' | 'advertising' | 'freemium' | 'marketplace';
  pricing: string;
  targetSegment: string;
  expectedRevenue: string;
}

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: 'monthly' | 'yearly' | 'one-time';
  features: string[];
  targetCustomers: string;
  margin: string;
}

export default function BusinessModelPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<BusinessModel>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [revenueStreams, setRevenueStreams] = useState<RevenueStream[]>([]);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);

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
        revenue_streams: data.revenue_streams,
        pricing_strategy: data.pricing_strategy,
      });

      if (data.revenue_streams) {
        setRevenueStreams(data.revenue_streams.streams || []);
      }
      if (data.pricing_strategy) {
        setPricingTiers(data.pricing_strategy.tiers || []);
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

      const response = await fetch('/api/portfolio/business-model', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          revenueStreams: {
            streams: revenueStreams,
            lastUpdated: new Date().toISOString(),
          },
          pricingStrategy: {
            tiers: pricingTiers,
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

  const addRevenueStream = () => {
    const newStream: RevenueStream = {
      id: Date.now().toString(),
      name: '',
      description: '',
      type: 'subscription',
      pricing: '',
      targetSegment: '',
      expectedRevenue: '',
    };
    setRevenueStreams([...revenueStreams, newStream]);
  };

  const updateRevenueStream = (id: string, field: keyof RevenueStream, value: any) => {
    setRevenueStreams(streams =>
      streams.map(stream =>
        stream.id === id ? { ...stream, [field]: value } : stream
      )
    );
  };

  const removeRevenueStream = (id: string) => {
    setRevenueStreams(streams => streams.filter(stream => stream.id !== id));
  };

  const addPricingTier = () => {
    const newTier: PricingTier = {
      id: Date.now().toString(),
      name: '',
      price: '',
      period: 'monthly',
      features: [''],
      targetCustomers: '',
      margin: '',
    };
    setPricingTiers([...pricingTiers, newTier]);
  };

  const updatePricingTier = (id: string, field: keyof PricingTier, value: any) => {
    setPricingTiers(tiers =>
      tiers.map(tier =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    );
  };

  const removePricingTier = (id: string) => {
    setPricingTiers(tiers => tiers.filter(tier => tier.id !== id));
  };

  const updateFeature = (tierId: string, index: number, value: string) => {
    setPricingTiers(tiers =>
      tiers.map(tier =>
        tier.id === tierId
          ? {
              ...tier,
              features: tier.features.map((feature, i) =>
                i === index ? value : feature
              ),
            }
          : tier
      )
    );
  };

  const addFeature = (tierId: string) => {
    setPricingTiers(tiers =>
      tiers.map(tier =>
        tier.id === tierId
          ? { ...tier, features: [...tier.features, ''] }
          : tier
      )
    );
  };

  const removeFeature = (tierId: string, index: number) => {
    setPricingTiers(tiers =>
      tiers.map(tier =>
        tier.id === tierId
          ? {
              ...tier,
              features: tier.features.filter((_, i) => i !== index),
            }
          : tier
      )
    );
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 2;

    if (revenueStreams.length > 0 && revenueStreams[0]?.name) completed++;
    if (pricingTiers.length > 0 && pricingTiers[0]?.name) completed++;

    return (completed / total) * 100;
  };

  const isComplete = getCompletionPercentage() >= 100;

  if (loading) {
    return (
      <ProtectedRoute requireSubscription={true}>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireSubscription={true}>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto p-8">
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
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Business Model
                </Heading>
                <Text className="text-gray-600">
                  Design your revenue model and pricing strategy
                </Text>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
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

          {/* Business Model Canvas Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Revenue Streams */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Revenue Streams
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addRevenueStream}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Stream
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {revenueStreams.length === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <Text color="muted">No revenue streams defined yet</Text>
                    <Button variant="outline" size="sm" className="mt-3" onClick={addRevenueStream}>
                      Add Your First Revenue Stream
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {revenueStreams.map((stream, index) => (
                      <div key={stream.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">Stream {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRevenueStream(stream.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Name</label>
                              <input
                                type="text"
                                value={stream.name}
                                onChange={(e) => updateRevenueStream(stream.id, 'name', e.target.value)}
                                placeholder="e.g., Subscription Revenue"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Type</label>
                              <select
                                value={stream.type}
                                onChange={(e) => updateRevenueStream(stream.id, 'type', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option value="subscription">Subscription</option>
                                <option value="one-time">One-time Payment</option>
                                <option value="commission">Commission</option>
                                <option value="advertising">Advertising</option>
                                <option value="freemium">Freemium</option>
                                <option value="marketplace">Marketplace</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                              value={stream.description}
                              onChange={(e) => updateRevenueStream(stream.id, 'description', e.target.value)}
                              placeholder="How this revenue stream works..."
                              className="w-full p-2 border border-gray-300 rounded-lg"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Pricing</label>
                              <input
                                type="text"
                                value={stream.pricing}
                                onChange={(e) => updateRevenueStream(stream.id, 'pricing', e.target.value)}
                                placeholder="e.g., ₹999/month"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Expected Revenue</label>
                              <input
                                type="text"
                                value={stream.expectedRevenue}
                                onChange={(e) => updateRevenueStream(stream.id, 'expectedRevenue', e.target.value)}
                                placeholder="e.g., ₹10L/year"
                                className="w-full p-2 border border-gray-300 rounded-lg"
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

            {/* Pricing Strategy */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Pricing Strategy
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addPricingTier}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Tier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {pricingTiers.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <Text color="muted">No pricing tiers defined yet</Text>
                    <Button variant="outline" size="sm" className="mt-3" onClick={addPricingTier}>
                      Add Your First Pricing Tier
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pricingTiers.map((tier, index) => (
                      <div key={tier.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline">Tier {index + 1}</Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePricingTier(tier.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Tier Name</label>
                              <input
                                type="text"
                                value={tier.name}
                                onChange={(e) => updatePricingTier(tier.id, 'name', e.target.value)}
                                placeholder="e.g., Basic, Pro, Enterprise"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Price</label>
                              <input
                                type="text"
                                value={tier.price}
                                onChange={(e) => updatePricingTier(tier.id, 'price', e.target.value)}
                                placeholder="e.g., ₹999"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Period</label>
                              <select
                                value={tier.period}
                                onChange={(e) => updatePricingTier(tier.id, 'period', e.target.value as any)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option value="monthly">Monthly</option>
                                <option value="yearly">Yearly</option>
                                <option value="one-time">One-time</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Margin</label>
                              <input
                                type="text"
                                value={tier.margin}
                                onChange={(e) => updatePricingTier(tier.id, 'margin', e.target.value)}
                                placeholder="e.g., 70%"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Target Customers</label>
                            <input
                              type="text"
                              value={tier.targetCustomers}
                              onChange={(e) => updatePricingTier(tier.id, 'targetCustomers', e.target.value)}
                              placeholder="Who is this tier for?"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-1">Features</label>
                            <div className="space-y-2">
                              {tier.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateFeature(tier.id, featureIndex, e.target.value)}
                                    placeholder="Feature description"
                                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFeature(tier.id, featureIndex)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addFeature(tier.id)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Feature
                              </Button>
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

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/market-research')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Market Research
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
                onClick={() => router.push('/portfolio/brand-assets')}
                disabled={!isComplete}
              >
                Next: Brand Assets
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
                  Perfect! You've defined your Business Model. Ready to work on Brand Assets?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
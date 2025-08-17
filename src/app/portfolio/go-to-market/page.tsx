'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from "@/components/ui/Card";
import { CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Target,
  ShoppingCart,
  User,
  Plus,
  X
} from 'lucide-react';

interface CustomerPersona {
  id: string;
  name: string;
  demographics: string;
  painPoints: string;
  behaviors: string;
  goals: string;
}

interface SalesChannel {
  id: string;
  channel: string;
  strategy: string;
  budget: string;
}

interface Portfolio {
  salesStrategy?: string;
  customerPersonas?: CustomerPersona[];
  salesChannels?: SalesChannel[];
}

export default function GoToMarketPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    customerPersonas: [],
    salesChannels: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
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
      setPortfolio({
        salesStrategy: data.salesStrategy || '',
        customerPersonas: data.customerPersonas || [],
        salesChannels: data.salesChannels || [],
      });
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Portfolio, value: any) => {
    setPortfolio(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPersona = () => {
    const newPersona: CustomerPersona = {
      id: Date.now().toString(),
      name: '',
      demographics: '',
      painPoints: '',
      behaviors: '',
      goals: ''
    };
    setPortfolio(prev => ({
      ...prev,
      customerPersonas: [...(prev.customerPersonas || []), newPersona]
    }));
  };

  const updatePersona = (id: string, field: keyof CustomerPersona, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      customerPersonas: prev.customerPersonas?.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      ) || []
    }));
  };

  const removePersona = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      customerPersonas: prev.customerPersonas?.filter(p => p.id !== id) || []
    }));
  };

  const addChannel = () => {
    const newChannel: SalesChannel = {
      id: Date.now().toString(),
      channel: '',
      strategy: '',
      budget: ''
    };
    setPortfolio(prev => ({
      ...prev,
      salesChannels: [...(prev.salesChannels || []), newChannel]
    }));
  };

  const updateChannel = (id: string, field: keyof SalesChannel, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      salesChannels: prev.salesChannels?.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      ) || []
    }));
  };

  const removeChannel = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      salesChannels: prev.salesChannels?.filter(c => c.id !== id) || []
    }));
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/portfolio/go-to-market', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salesStrategy: portfolio.salesStrategy,
          customerPersonas: portfolio.customerPersonas,
          salesChannels: portfolio.salesChannels,
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

  const getCompletionPercentage = () => {
    let totalFields = 3;
    let completedFields = 0;
    
    if (portfolio.salesStrategy && portfolio.salesStrategy.trim() !== '') {
      completedFields++;
    }
    
    if (portfolio.customerPersonas && portfolio.customerPersonas.length > 0) {
      const validPersonas = portfolio.customerPersonas.filter(p => 
        p.name && p.demographics && p.painPoints
      );
      if (validPersonas.length > 0) {
        completedFields++;
      }
    }
    
    if (portfolio.salesChannels && portfolio.salesChannels.length > 0) {
      const validChannels = portfolio.salesChannels.filter(c => 
        c.channel && c.strategy
      );
      if (validChannels.length > 0) {
        completedFields++;
      }
    }
    
    return (completedFields / totalFields) * 100;
  };

  const isComplete = getCompletionPercentage() === 100;

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
        <div className="max-w-4xl mx-auto p-8">
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
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Go-to-Market Strategy
                </Heading>
                <Text className="text-gray-600">
                  Plan your sales strategy and customer acquisition
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

          {/* Form Sections */}
          <div className="space-y-8">
            {/* Sales Strategy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Sales Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Overall Go-to-Market Strategy *
                  </label>
                  <textarea
                    value={portfolio.salesStrategy || ''}
                    onChange={(e) => handleInputChange('salesStrategy', e.target.value)}
                    placeholder="Describe your approach to acquiring and retaining customers..."
                    className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={6}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Include your sales process, customer journey, and growth strategy
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Customer Personas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-600" />
                    Customer Personas
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addPersona}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Persona
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {portfolio.customerPersonas && portfolio.customerPersonas.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.customerPersonas.map((persona) => (
                      <div key={persona.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <Input
                              value={persona.name}
                              onChange={(e) => updatePersona(persona.id, 'name', e.target.value)}
                              placeholder="Persona name (e.g., Tech-Savvy Millennial)"
                              className="font-medium"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <textarea
                                value={persona.demographics}
                                onChange={(e) => updatePersona(persona.id, 'demographics', e.target.value)}
                                placeholder="Demographics (age, location, income)"
                                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                                rows={2}
                              />
                              <textarea
                                value={persona.behaviors}
                                onChange={(e) => updatePersona(persona.id, 'behaviors', e.target.value)}
                                placeholder="Behaviors & preferences"
                                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                                rows={2}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <textarea
                                value={persona.painPoints}
                                onChange={(e) => updatePersona(persona.id, 'painPoints', e.target.value)}
                                placeholder="Pain points & challenges"
                                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                                rows={2}
                              />
                              <textarea
                                value={persona.goals}
                                onChange={(e) => updatePersona(persona.id, 'goals', e.target.value)}
                                placeholder="Goals & aspirations"
                                className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                                rows={2}
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePersona(persona.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <User className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <Text color="muted">No customer personas defined yet</Text>
                    <Text size="sm" color="muted" className="mt-1">
                      Click &quot;Add Persona&quot; to define your target customers
                    </Text>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Sales Channels */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-green-600" />
                    Sales & Marketing Channels
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addChannel}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Channel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {portfolio.salesChannels && portfolio.salesChannels.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.salesChannels.map((channel) => (
                      <div key={channel.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <Input
                                value={channel.channel}
                                onChange={(e) => updateChannel(channel.id, 'channel', e.target.value)}
                                placeholder="Channel (e.g., LinkedIn, Google Ads)"
                              />
                              <Input
                                value={channel.budget}
                                onChange={(e) => updateChannel(channel.id, 'budget', e.target.value)}
                                placeholder="Monthly budget (e.g., ₹10,000)"
                              />
                            </div>
                            <textarea
                              value={channel.strategy}
                              onChange={(e) => updateChannel(channel.id, 'strategy', e.target.value)}
                              placeholder="Strategy for this channel"
                              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                              rows={2}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeChannel(channel.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <Text color="muted">No sales channels defined yet</Text>
                    <Text size="sm" color="muted" className="mt-1">
                      Click &quot;Add Channel&quot; to plan your customer acquisition channels
                    </Text>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/product')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Product Development
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
                onClick={() => router.push('/portfolio/financials')}
                disabled={!isComplete}
              >
                Next: Financials
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
                  Great work! You&apos;ve completed your Go-to-Market strategy. Ready to work on your financial projections?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
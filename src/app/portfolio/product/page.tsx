'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Zap,
  Package,
  MessageSquare,
  Plus,
  X
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  priority: 'must-have' | 'should-have' | 'nice-to-have';
}

interface Feedback {
  id: string;
  source: string;
  feedback: string;
  date: string;
}

interface Portfolio {
  mvp_description?: string;
  features?: Feature[];
  user_feedback?: Feedback[];
}

export default function ProductPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    features: [],
    user_feedback: []
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
        mvp_description: data.mvp_description || '',
        features: data.features || [],
        user_feedback: data.user_feedback || [],
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

  const addFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      name: '',
      description: '',
      priority: 'should-have'
    };
    setPortfolio(prev => ({
      ...prev,
      features: [...(prev.features || []), newFeature]
    }));
  };

  const updateFeature = (id: string, field: keyof Feature, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      features: prev.features?.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      ) || []
    }));
  };

  const removeFeature = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      features: prev.features?.filter(f => f.id !== id) || []
    }));
  };

  const addFeedback = () => {
    const newFeedback: Feedback = {
      id: Date.now().toString(),
      source: '',
      feedback: '',
      date: new Date().toISOString().split('T')[0]
    };
    setPortfolio(prev => ({
      ...prev,
      user_feedback: [...(prev.user_feedback || []), newFeedback]
    }));
  };

  const updateFeedback = (id: string, field: keyof Feedback, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      user_feedback: prev.user_feedback?.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      ) || []
    }));
  };

  const removeFeedback = (id: string) => {
    setPortfolio(prev => ({
      ...prev,
      user_feedback: prev.user_feedback?.filter(f => f.id !== id) || []
    }));
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/portfolio/product', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mvpDescription: portfolio.mvp_description,
          features: portfolio.features,
          userFeedback: portfolio.user_feedback,
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
    let totalFields = 1; // MVP description
    let completedFields = 0;
    
    if (portfolio.mvp_description && portfolio.mvp_description.trim() !== '') {
      completedFields++;
    }
    
    // Count features as a single field
    if (portfolio.features && portfolio.features.length > 0) {
      totalFields++;
      const validFeatures = portfolio.features.filter(f => f.name && f.description);
      if (validFeatures.length > 0) {
        completedFields++;
      }
    } else {
      totalFields++;
    }
    
    // Count feedback as a single field
    if (portfolio.user_feedback && portfolio.user_feedback.length > 0) {
      totalFields++;
      const validFeedback = portfolio.user_feedback.filter(f => f.source && f.feedback);
      if (validFeedback.length > 0) {
        completedFields++;
      }
    } else {
      totalFields++;
    }
    
    return (completedFields / totalFields) * 100;
  };

  const isComplete = getCompletionPercentage() === 100;

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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Rocket className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Product Development
                </Heading>
                <Text className="text-gray-600">
                  Define your MVP, features, and gather user feedback
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
            {/* MVP Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Minimum Viable Product (MVP)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    MVP Description *
                  </label>
                  <textarea
                    value={portfolio.mvp_description || ''}
                    onChange={(e) => handleInputChange('mvp_description', e.target.value)}
                    placeholder="Describe your MVP - what is the simplest version of your product that solves the core problem?"
                    className="w-full min-h-[150px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={6}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Focus on the core features that deliver immediate value to users
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Product Features
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addFeature}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {portfolio.features && portfolio.features.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.features.map((feature) => (
                      <div key={feature.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <Input
                              value={feature.name}
                              onChange={(e) => updateFeature(feature.id, 'name', e.target.value)}
                              placeholder="Feature name"
                              className="font-medium"
                            />
                            <textarea
                              value={feature.description}
                              onChange={(e) => updateFeature(feature.id, 'description', e.target.value)}
                              placeholder="Feature description"
                              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                              rows={2}
                            />
                            <select
                              value={feature.priority}
                              onChange={(e) => updateFeature(feature.id, 'priority', e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                            >
                              <option value="must-have">Must Have</option>
                              <option value="should-have">Should Have</option>
                              <option value="nice-to-have">Nice to Have</option>
                            </select>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeature(feature.id)}
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
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <Text color="muted">No features added yet</Text>
                    <Text size="sm" color="muted" className="mt-1">
                      Click "Add Feature" to start listing your product features
                    </Text>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Feedback */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    User Feedback
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addFeedback}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feedback
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {portfolio.user_feedback && portfolio.user_feedback.length > 0 ? (
                  <div className="space-y-4">
                    {portfolio.user_feedback.map((feedback) => (
                      <div key={feedback.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <Input
                                value={feedback.source}
                                onChange={(e) => updateFeedback(feedback.id, 'source', e.target.value)}
                                placeholder="Source (e.g., User Interview, Beta Tester)"
                              />
                              <Input
                                type="date"
                                value={feedback.date}
                                onChange={(e) => updateFeedback(feedback.id, 'date', e.target.value)}
                              />
                            </div>
                            <textarea
                              value={feedback.feedback}
                              onChange={(e) => updateFeedback(feedback.id, 'feedback', e.target.value)}
                              placeholder="What did they say?"
                              className="w-full p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                              rows={3}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFeedback(feedback.id)}
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
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <Text color="muted">No feedback collected yet</Text>
                    <Text size="sm" color="muted" className="mt-1">
                      Click "Add Feedback" to start documenting user insights
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
              onClick={() => router.push('/portfolio/legal-compliance')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Legal & Compliance
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
                onClick={() => router.push('/portfolio/go-to-market')}
                disabled={!isComplete}
              >
                Next: Go-to-Market
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
                  Excellent! You've completed the Product Development section. Ready to plan your Go-to-Market strategy?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
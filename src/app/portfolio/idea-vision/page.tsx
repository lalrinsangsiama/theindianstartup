'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  Heart,
  Zap
} from 'lucide-react';

interface Portfolio {
  startupName?: string;
  tagline?: string;
  problemStatement?: string;
  solution?: string;
  valueProposition?: string;
}

export default function IdeaVisionPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio>({});
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
        startupName: data.startupName || '',
        tagline: data.tagline || '',
        problemStatement: data.problemStatement || '',
        solution: data.solution || '',
        valueProposition: data.valueProposition || '',
      });
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Portfolio, value: string) => {
    setPortfolio(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/portfolio/idea-vision', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startupName: portfolio.startupName,
          tagline: portfolio.tagline,
          problemStatement: portfolio.problemStatement,
          solution: portfolio.solution,
          valueProposition: portfolio.valueProposition,
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
    const fields = [
      portfolio.startupName,
      portfolio.tagline,
      portfolio.problemStatement,
      portfolio.solution,
      portfolio.valueProposition,
    ];
    const completed = fields.filter(field => field && field.trim() !== '').length;
    return (completed / fields.length) * 100;
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
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Idea & Vision
                </Heading>
                <Text className="text-gray-600">
                  Define your startup&apos;s core problem, solution, and value proposition
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
            {/* Startup Name & Tagline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Startup Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Startup Name *
                  </label>
                  <Input
                    value={portfolio.startupName || ''}
                    onChange={(e) => handleInputChange('startupName', e.target.value)}
                    placeholder="Enter your startup name..."
                    className="text-lg"
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Choose a memorable name that reflects your mission
                  </Text>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tagline *
                  </label>
                  <Input
                    value={portfolio.tagline || ''}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="A catchy one-liner that captures your essence..."
                    maxLength={100}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Keep it under 100 characters and make it memorable
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Problem Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-red-600" />
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What problem are you solving? *
                  </label>
                  <textarea
                    value={portfolio.problemStatement || ''}
                    onChange={(e) => handleInputChange('problemStatement', e.target.value)}
                    placeholder="Describe the pain point your target customers face..."
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={5}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Be specific about who has this problem and why it matters
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Your Solution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    How do you solve this problem? *
                  </label>
                  <textarea
                    value={portfolio.solution || ''}
                    onChange={(e) => handleInputChange('solution', e.target.value)}
                    placeholder="Explain your approach to solving the problem..."
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={5}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Focus on how your solution is different and better
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Value Proposition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-green-600" />
                  Value Proposition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Why should customers choose you? *
                  </label>
                  <textarea
                    value={portfolio.valueProposition || ''}
                    onChange={(e) => handleInputChange('valueProposition', e.target.value)}
                    placeholder="What unique value do you provide to customers..."
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={5}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Highlight the key benefits and competitive advantages
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Portfolio Overview
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
                onClick={() => router.push('/portfolio/market-research')}
                disabled={!isComplete}
              >
                Next: Market Research
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
                  Great! You&apos;ve completed the Idea & Vision section. Ready to move on to Market Research?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
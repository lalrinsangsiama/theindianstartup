'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  ArrowLeft, 
  ArrowRight,
  FileText, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  Sparkles,
  FileSignature,
  ExternalLink,
  Eye
} from 'lucide-react';

interface Portfolio {
  pitchDeck?: string;
  onePageSummary?: string;
  investorAsk?: string;
  tractionMetrics?: string;
  useOfFunds?: string;
  exitStrategy?: string;
}

export default function PitchPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
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
        pitchDeck: data.pitchDeck || '',
        onePageSummary: data.onePageSummary || '',
        investorAsk: data.investorAsk || '',
        tractionMetrics: data.tractionMetrics || '',
        useOfFunds: data.useOfFunds || data.fundingPurpose || '',
        exitStrategy: data.exitStrategy || '',
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

      const response = await fetch('/api/portfolio/pitch', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pitchDeck: portfolio.pitchDeck,
          onePageSummary: portfolio.onePageSummary,
          investorAsk: portfolio.investorAsk,
          tractionMetrics: portfolio.tractionMetrics,
          useOfFunds: portfolio.useOfFunds,
          exitStrategy: portfolio.exitStrategy,
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

  const generateOnePager = async () => {
    try {
      setGenerating(true);
      setError(null);

      const response = await fetch('/api/portfolio/generate-one-pager', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to generate one-pager');
      }

      const data = await response.json();
      setPortfolio(prev => ({
        ...prev,
        onePageSummary: data.summary
      }));
    } catch (err) {
      console.error('Error generating one-pager:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate');
    } finally {
      setGenerating(false);
    }
  };

  const exportPitchDeck = async () => {
    try {
      const response = await fetch('/api/portfolio/export-pitch-deck');
      
      if (!response.ok) {
        throw new Error('Failed to export pitch deck');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'pitch-deck.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting pitch deck:', err);
      setError(err instanceof Error ? err.message : 'Failed to export');
    }
  };

  const getCompletionPercentage = () => {
    const fields = [
      portfolio.investorAsk,
      portfolio.tractionMetrics,
      portfolio.useOfFunds,
      portfolio.exitStrategy,
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Pitch Materials
                </Heading>
                <Text className="text-gray-600">
                  Generate pitch deck and one-page summary
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
            {/* Key Pitch Elements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-purple-600" />
                  Key Pitch Elements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    The Ask *
                  </label>
                  <textarea
                    value={portfolio.investorAsk || ''}
                    onChange={(e) => handleInputChange('investorAsk', e.target.value)}
                    placeholder="What are you asking from investors? (e.g., ₹50 lakhs for 10% equity)"
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={3}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Be specific about the amount, equity offered, and type of investors you&apos;re targeting
                  </Text>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Traction & Metrics *
                  </label>
                  <textarea
                    value={portfolio.tractionMetrics || ''}
                    onChange={(e) => handleInputChange('tractionMetrics', e.target.value)}
                    placeholder="Key achievements and metrics (users, revenue, partnerships, etc.)"
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={4}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Include concrete numbers and growth percentages that demonstrate momentum
                  </Text>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Use of Funds *
                  </label>
                  <textarea
                    value={portfolio.useOfFunds || ''}
                    onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
                    placeholder="How will you use the investment? (e.g., 40% product development, 30% marketing...)"
                    className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={4}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Break down allocation by percentage or specific amounts
                  </Text>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Exit Strategy *
                  </label>
                  <textarea
                    value={portfolio.exitStrategy || ''}
                    onChange={(e) => handleInputChange('exitStrategy', e.target.value)}
                    placeholder="Potential exit opportunities (acquisition, IPO, strategic sale...)"
                    className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
                    rows={3}
                  />
                  <Text size="sm" color="muted" className="mt-1">
                    Show investors how they can realize returns on their investment
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Generated Materials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  Generated Materials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pitch Deck */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <Text weight="medium">Pitch Deck</Text>
                        <Text size="sm" color="muted">
                          Professional investor presentation
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={exportPitchDeck}>
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  {portfolio.pitchDeck ? (
                    <Badge variant="success">Generated</Badge>
                  ) : (
                    <Badge variant="default">Will auto-generate when portfolio is complete</Badge>
                  )}
                </div>

                {/* One-Page Summary */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileSignature className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <Text weight="medium">One-Page Summary</Text>
                        <Text size="sm" color="muted">
                          Executive summary for quick review
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateOnePager}
                        disabled={generating || !isComplete}
                      >
                        {generating ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 mr-2" />
                        )}
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Share Link
                      </Button>
                    </div>
                  </div>
                  {portfolio.onePageSummary ? (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <Text size="sm" className="whitespace-pre-wrap">
                        {portfolio.onePageSummary}
                      </Text>
                    </div>
                  ) : (
                    <Badge variant="default">
                      {isComplete ? 'Click Generate to create' : 'Complete all sections first'}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/financials')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Financials
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
                Save Portfolio
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push('/portfolio')}
              >
                Portfolio Overview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Completion Status */}
          {isComplete && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <Text className="text-green-700 font-medium mb-2">
                      Congratulations! Your startup portfolio is complete!
                    </Text>
                    <Text className="text-green-600">
                      You can now generate your pitch deck and one-page summary. Share these materials with potential investors, partners, and stakeholders to showcase your startup&apos;s potential.
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
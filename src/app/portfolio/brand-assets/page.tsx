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
  Palette, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Link,
  Image,
  Hash,
  Globe
} from 'lucide-react';

interface BrandAssets {
  logo?: string;
  domain?: string;
  socialHandles?: any;
}

interface SocialHandle {
  platform: string;
  handle: string;
  url: string;
}

interface BrandColor {
  name: string;
  hex: string;
  usage: string;
}

export default function BrandAssetsPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<BrandAssets>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Local state
  const [logoUrl, setLogoUrl] = useState('');
  const [domain, setDomain] = useState('');
  const [socialHandles, setSocialHandles] = useState<SocialHandle[]>([]);
  const [brandColors, setBrandColors] = useState<BrandColor[]>([]);
  const [primaryFont, setPrimaryFont] = useState('');
  const [secondaryFont, setSecondaryFont] = useState('');

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
        logo: data.logo,
        domain: data.domain,
        socialHandles: data.socialHandles,
      });

      // Parse existing data
      setLogoUrl(data.logo || '');
      setDomain(data.domain || '');
      
      if (data.socialHandles) {
        setSocialHandles(data.socialHandles.handles || []);
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

      const response = await fetch('/api/portfolio/brand-assets', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logo: logoUrl,
          domain: domain,
          socialHandles: {
            handles: socialHandles,
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

  const addSocialHandle = () => {
    const newHandle: SocialHandle = {
      platform: '',
      handle: '',
      url: '',
    };
    setSocialHandles([...socialHandles, newHandle]);
  };

  const updateSocialHandle = (index: number, field: keyof SocialHandle, value: string) => {
    setSocialHandles(handles =>
      handles.map((handle, i) =>
        i === index ? { ...handle, [field]: value } : handle
      )
    );
  };

  const removeSocialHandle = (index: number) => {
    setSocialHandles(handles => handles.filter((_, i) => i !== index));
  };

  const addBrandColor = () => {
    const newColor: BrandColor = {
      name: '',
      hex: '#000000',
      usage: '',
    };
    setBrandColors([...brandColors, newColor]);
  };

  const updateBrandColor = (index: number, field: keyof BrandColor, value: string) => {
    setBrandColors(colors =>
      colors.map((color, i) =>
        i === index ? { ...color, [field]: value } : color
      )
    );
  };

  const removeBrandColor = (index: number) => {
    setBrandColors(colors => colors.filter((_, i) => i !== index));
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 5;

    if (logoUrl) completed++;
    if (domain) completed++;
    if (socialHandles.length > 0 && socialHandles[0]?.platform) completed++;
    if (brandColors.length > 0 && brandColors[0]?.name) completed++;
    if (primaryFont && secondaryFont) completed++;

    return (completed / total) * 100;
  };

  const isComplete = getCompletionPercentage() >= 80;

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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Brand Assets
                </Heading>
                <Text className="text-gray-600">
                  Define your visual identity and brand presence
                </Text>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
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
              {/* Logo & Domain */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image className="w-5 h-5 text-blue-600" />
                    Logo & Domain
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Logo URL
                    </label>
                    <Input
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                    <Text size="sm" color="muted" className="mt-1">
                      Upload your logo and paste the URL here
                    </Text>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Domain Name
                    </label>
                    <Input
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="yourstartup.com"
                    />
                    <Text size="sm" color="muted" className="mt-1">
                      Your primary domain (without https://)
                    </Text>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Handles */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="w-5 h-5 text-green-600" />
                      Social Media Handles
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addSocialHandle}
                    >
                      Add Handle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {socialHandles.length === 0 ? (
                    <div className="text-center py-8">
                      <Hash className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <Text color="muted">No social handles added yet</Text>
                      <Button variant="outline" size="sm" className="mt-3" onClick={addSocialHandle}>
                        Add Your First Handle
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {socialHandles.map((handle, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 mb-2">
                            <div>
                              <label className="block text-sm font-medium mb-1">Platform</label>
                              <select
                                value={handle.platform}
                                onChange={(e) => updateSocialHandle(index, 'platform', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option value="">Select platform</option>
                                <option value="twitter">Twitter/X</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="instagram">Instagram</option>
                                <option value="facebook">Facebook</option>
                                <option value="youtube">YouTube</option>
                                <option value="github">GitHub</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Handle</label>
                              <Input
                                value={handle.handle}
                                onChange={(e) => updateSocialHandle(index, 'handle', e.target.value)}
                                placeholder="@yourstartup"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">URL</label>
                              <Input
                                value={handle.url}
                                onChange={(e) => updateSocialHandle(index, 'url', e.target.value)}
                                placeholder="https://..."
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSocialHandle(index)}
                            className="text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Brand Colors */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-orange-600" />
                      Brand Colors
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addBrandColor}
                    >
                      Add Color
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {brandColors.length === 0 ? (
                    <div className="text-center py-8">
                      <Palette className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <Text color="muted">No brand colors defined yet</Text>
                      <Button variant="outline" size="sm" className="mt-3" onClick={addBrandColor}>
                        Add Your First Color
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {brandColors.map((color, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 mb-2">
                            <div>
                              <label className="block text-sm font-medium mb-1">Name</label>
                              <Input
                                value={color.name}
                                onChange={(e) => updateBrandColor(index, 'name', e.target.value)}
                                placeholder="Primary Blue"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Color</label>
                              <div className="flex gap-2">
                                <input
                                  type="color"
                                  value={color.hex}
                                  onChange={(e) => updateBrandColor(index, 'hex', e.target.value)}
                                  className="w-12 h-10 border border-gray-300 rounded"
                                />
                                <Input
                                  value={color.hex}
                                  onChange={(e) => updateBrandColor(index, 'hex', e.target.value)}
                                  placeholder="#000000"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Usage</label>
                              <Input
                                value={color.usage}
                                onChange={(e) => updateBrandColor(index, 'usage', e.target.value)}
                                placeholder="Headers, CTAs"
                              />
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBrandColor(index)}
                            className="text-red-600"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-600" />
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Primary Font
                    </label>
                    <Input
                      value={primaryFont}
                      onChange={(e) => setPrimaryFont(e.target.value)}
                      placeholder="Inter, Helvetica, Arial"
                    />
                    <Text size="sm" color="muted" className="mt-1">
                      Used for headings and important text
                    </Text>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Secondary Font
                    </label>
                    <Input
                      value={secondaryFont}
                      onChange={(e) => setSecondaryFont(e.target.value)}
                      placeholder="Georgia, Times, serif"
                    />
                    <Text size="sm" color="muted" className="mt-1">
                      Used for body text and descriptions
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/business-model')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Business Model
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
                onClick={() => router.push('/portfolio/legal-compliance')}
                disabled={!isComplete}
              >
                Next: Legal & Compliance
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
                  Excellent! Your brand assets are looking great. Ready to work on Legal & Compliance?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
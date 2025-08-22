'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { 
  ArrowLeft,
  MapPin,
  Building,
  TrendingUp,
  Users,
  ExternalLink,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Calendar,
  DollarSign,
  Award,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

interface InvestorDetails {
  investor_name: string;
  investor_type: string;
  category_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  linkedin: string | null;
  full_address: string;
  investment_stages: string[];
  focus_sectors: string[];
  min_investment: number | null;
  max_investment: number | null;
  description: string;
  portfolio_count: number | null;
  key_investments: string[];
  founded_year: number | null;
  fund_size: number | null;
  verification_status: boolean;
  last_verified: string;
}

export default function InvestorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [investor, setInvestor] = useState<InvestorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvestorDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/investors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          investorId: params.id
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          router.push('/investors');
          return;
        }
        throw new Error(data.message || 'Failed to fetch investor details');
      }

      if (data.success && data.data) {
        setInvestor(data.data);
      } else {
        throw new Error('Investor not found');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch investor details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchInvestorDetails();
    }
  }, [params.id]);

  const formatAmount = (amount: number | null) => {
    if (!amount) return 'Not specified';
    
    if (amount >= 10000000) { // 1 Cr+
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) { // 1L+
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      angel: 'bg-blue-100 text-blue-700',
      vc_firm: 'bg-green-100 text-green-700',
      international: 'bg-purple-100 text-purple-700',
      government: 'bg-orange-100 text-orange-700',
      accelerator: 'bg-yellow-100 text-yellow-700',
      incubator: 'bg-pink-100 text-pink-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  if (error || !investor) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <Alert variant="error" className="mb-6">
              {error || 'Investor not found'}
            </Alert>
            <Link href="/investors">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Investors
              </Button>
            </Link>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/investors">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Investors
              </Button>
            </Link>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <Heading as="h1" className="mb-1">
                      {investor.investor_name}
                    </Heading>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(investor.investor_type)}>
                        {investor.category_name}
                      </Badge>
                      {investor.verification_status && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {investor.portfolio_count && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Text size="xl" weight="bold" className="text-accent">
                        {investor.portfolio_count}
                      </Text>
                      <Text size="sm" color="muted">
                        Investments
                      </Text>
                    </div>
                  )}
                  {investor.min_investment && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Text size="xl" weight="bold" className="text-green-600">
                        {formatAmount(investor.min_investment)}
                      </Text>
                      <Text size="sm" color="muted">
                        Min Investment
                      </Text>
                    </div>
                  )}
                  {investor.max_investment && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Text size="xl" weight="bold" className="text-blue-600">
                        {formatAmount(investor.max_investment)}
                      </Text>
                      <Text size="sm" color="muted">
                        Max Investment
                      </Text>
                    </div>
                  )}
                  {investor.founded_year && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Text size="xl" weight="bold" className="text-purple-600">
                        {investor.founded_year}
                      </Text>
                      <Text size="sm" color="muted">
                        Founded
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" variant="h3" className="mb-4">
                    About
                  </Heading>
                  <Text className="leading-relaxed">
                    {investor.description}
                  </Text>
                </CardContent>
              </Card>

              {/* Investment Focus */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h2" variant="h3" className="mb-4">
                    Investment Focus
                  </Heading>
                  
                  <div className="space-y-4">
                    {/* Investment Stages */}
                    {investor.investment_stages && investor.investment_stages.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-gray-600" />
                          <Text weight="medium">Investment Stages</Text>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {investor.investment_stages.map((stage) => (
                            <Badge key={stage} variant="outline">
                              {stage.replace('_', ' ').toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Focus Sectors */}
                    {investor.focus_sectors && investor.focus_sectors.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-gray-600" />
                          <Text weight="medium">Focus Sectors</Text>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {investor.focus_sectors.map((sector) => (
                            <Badge key={sector} variant="outline">
                              {sector.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Investment Range */}
                    {(investor.min_investment || investor.max_investment) && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <Text weight="medium">Investment Range</Text>
                        </div>
                        <Text>
                          {formatAmount(investor.min_investment)} - {formatAmount(investor.max_investment)}
                        </Text>
                      </div>
                    )}

                    {/* Fund Size */}
                    {investor.fund_size && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="w-4 h-4 text-gray-600" />
                          <Text weight="medium">Fund Size</Text>
                        </div>
                        <Text>
                          {formatAmount(investor.fund_size)}
                        </Text>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Notable Investments */}
              {investor.key_investments && investor.key_investments.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <Heading as="h2" variant="h3" className="mb-4">
                      Notable Investments
                    </Heading>
                    <div className="flex flex-wrap gap-2">
                      {investor.key_investments.map((investment) => (
                        <Badge key={investment} variant="outline" className="bg-gray-50">
                          {investment}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h3" variant="h4" className="mb-4">
                    Contact Information
                  </Heading>
                  
                  <div className="space-y-4">
                    {/* Location */}
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-600 mt-1" />
                      <div>
                        <Text weight="medium" size="sm">Location</Text>
                        <Text size="sm" color="muted">
                          {investor.full_address}
                        </Text>
                      </div>
                    </div>

                    {/* Website */}
                    {investor.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="w-4 h-4 text-gray-600 mt-1" />
                        <div>
                          <Text weight="medium" size="sm">Website</Text>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto text-accent"
                            onClick={() => window.open(investor.website, '_blank')}
                          >
                            Visit Website
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* LinkedIn */}
                    {investor.linkedin && (
                      <div className="flex items-start gap-3">
                        <Linkedin className="w-4 h-4 text-gray-600 mt-1" />
                        <div>
                          <Text weight="medium" size="sm">LinkedIn</Text>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto text-accent"
                            onClick={() => window.open(investor.linkedin, '_blank')}
                          >
                            View Profile
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {investor.contact_email && (
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-gray-600 mt-1" />
                        <div>
                          <Text weight="medium" size="sm">Email</Text>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="p-0 h-auto text-accent"
                            onClick={() => window.open(`mailto:${investor.contact_email}`, '_blank')}
                          >
                            Send Email
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    {investor.contact_phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-gray-600 mt-1" />
                        <div>
                          <Text weight="medium" size="sm">Phone</Text>
                          <Text size="sm" color="muted">
                            {investor.contact_phone}
                          </Text>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    {investor.website && (
                      <Button 
                        className="w-full"
                        onClick={() => window.open(investor.website, '_blank')}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    )}
                    {investor.linkedin && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(investor.linkedin, '_blank')}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Verification Status */}
              <Card>
                <CardContent className="p-6">
                  <Heading as="h3" variant="h4" className="mb-4">
                    Verification
                  </Heading>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${investor.verification_status ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <Text size="sm">
                        {investor.verification_status ? 'Verified Investor' : 'Unverified'}
                      </Text>
                    </div>
                    
                    <Text size="xs" color="muted">
                      Last updated: {new Date(investor.last_verified).toLocaleDateString()}
                    </Text>
                    
                    <Text size="xs" color="muted">
                      All investor information is sourced from public records and verified through our research process.
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
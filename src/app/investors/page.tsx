'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { InvestorCard } from '@/components/investors/InvestorCard';
import { InvestorFilters } from '@/components/investors/InvestorFilters';
import { 
  TrendingUp, 
  Users, 
  Building, 
  Loader2, 
  Lock, 
  ShoppingCart,
  Eye,
  Crown
} from 'lucide-react';
import Link from 'next/link';

interface Investor {
  id: string;
  name: string;
  type: string;
  city: string;
  sectors: string[];
  investment_stage: string[];
  website?: string;
  linkedin?: string;
  description: string;
  portfolio_size: number | null;
  notable_investments: string[];
}

interface FilterState {
  query: string;
  category: string;
  city: string;
  stage: string;
  sector: string;
}

export default function InvestorsPage() {
  const router = useRouter();
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    cities: [] as string[],
    stages: [] as string[],
    sectors: [] as string[]
  });
  
  const [filters, setFilters] = useState<FilterState>({
    query: '',
    category: '',
    city: '',
    stage: '',
    sector: ''
  });

  const fetchInvestors = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        )
      );

      const response = await fetch(`/api/investors?${params}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          setHasAccess(false);
          return;
        }
        throw new Error(data.message || 'Failed to fetch investors');
      }

      setHasAccess(true);
      if (data.success && data.data) {
        setInvestors(data.data.investors || []);
        setCategories(data.data.categories || []);
        setFilterOptions(data.data.filters || { cities: [], stages: [], sectors: [] });
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch investors');
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchInvestors();
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      category: '',
      city: '',
      stage: '',
      sector: ''
    });
    setTimeout(fetchInvestors, 100);
  };

  const handleViewInvestor = (investorId: string) => {
    router.push(`/investors/${investorId}`);
  };

  // Access denied view
  if (hasAccess === false) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-red-100 rounded-full mb-6">
                <Lock className="w-12 h-12 text-red-600" />
              </div>
              
              <Heading as="h1" variant="h2" className="mb-4">
                Premium Access Required
              </Heading>
              
              <Text color="muted" className="mb-8 max-w-md mx-auto">
                Access to our exclusive database of 37+ verified investors requires the 
                P3: Funding Mastery course or All-Access Bundle.
              </Text>

              <Card className="p-8 mb-8 bg-gradient-to-r from-accent/5 to-accent/10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-4">
                      <Crown className="w-6 h-6 text-accent" />
                      <Text weight="bold" className="text-lg">
                        What's Included:
                      </Text>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-accent" />
                        <Text size="sm">37+ verified investor contacts</Text>
                      </li>
                      <li className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-accent" />
                        <Text size="sm">VCs, Angels, Micro VCs & more</Text>
                      </li>
                      <li className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-accent" />
                        <Text size="sm">Advanced search & filters</Text>
                      </li>
                      <li className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-accent" />
                        <Text size="sm">Detailed investor profiles</Text>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-left">
                    <Text weight="bold" className="mb-3">
                      Investment Range Coverage:
                    </Text>
                    <div className="space-y-2">
                      <Badge>₹25K - ₹2.5L (Angel)</Badge>
                      <Badge>₹1L - ₹50L (Seed)</Badge>
                      <Badge>₹20L - ₹5Cr (Series A+)</Badge>
                      <Badge>₹5Cr+ (Growth)</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing?highlight=P3">
                  <Button variant="primary" size="lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Get P3: Funding Mastery (₹5,999)
                  </Button>
                </Link>
                <Link href="/pricing?highlight=ALL_ACCESS">
                  <Button variant="outline" size="lg">
                    All-Access Bundle (₹54,999)
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Investor Database
                </Heading>
                <Text color="muted">
                  37+ verified investor contacts for your funding journey
                </Text>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Text size="xl" weight="bold" className="text-accent text-2xl">
                    {investors.length || 37}+
                  </Text>
                  <Text size="sm" color="muted">
                    Investors
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Text size="xl" weight="bold" className="text-green-600">
                    ₹25K - ₹100Cr
                  </Text>
                  <Text size="sm" color="muted">
                    Ticket Range
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Text size="xl" weight="bold" className="text-blue-600">
                    6
                  </Text>
                  <Text size="sm" color="muted">
                    Investor Types
                  </Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Text size="xl" weight="bold" className="text-purple-600">
                    30+
                  </Text>
                  <Text size="sm" color="muted">
                    Cities Covered
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>

          {error && (
            <Alert variant="error" className="mb-6">
              {error}
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <InvestorFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
                loading={loading}
                categories={categories}
                filterOptions={filterOptions}
              />
            </div>

            {/* Investors Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              ) : investors.length === 0 ? (
                <div className="text-center py-12">
                  <Text color="muted" className="mb-4">
                    No investors found matching your criteria
                  </Text>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Text color="muted">
                      Showing {investors.length} investors
                    </Text>
                  </div>

                  {/* Investors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {investors.map((investor) => (
                      <InvestorCard
                        key={investor.id}
                        investor={investor}
                        onViewDetails={() => handleViewInvestor(investor.id)}
                      />
                    ))}
                  </div>

                  {/* Note about comprehensive database */}
                  <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
                    <Text size="sm" color="muted">
                      All verified investors from our comprehensive database are shown above.
                      <br />
                      Use filters to find investors matching your specific criteria.
                    </Text>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
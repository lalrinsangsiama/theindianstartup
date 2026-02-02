'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  TrendingUp, 
  Building,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterState {
  query: string;
  category: string;
  city: string;
  stage: string;
  sector: string;
  type?: string;
  minTicket?: string;
  maxTicket?: string;
}

interface InvestorFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  loading?: boolean;
  categories?: any[];
  filterOptions?: {
    cities: string[];
    stages: string[];
    sectors: string[];
  };
}

const INVESTOR_CATEGORIES = [
  { value: 'angel_investor', label: 'Angel Investors' },
  { value: 'venture_capital', label: 'VC Firms' },
  { value: 'international_investor', label: 'International' },
  { value: 'government_agency', label: 'Government' },
  { value: 'accelerator', label: 'Accelerators' },
  { value: 'incubator', label: 'Incubators' }
];

// Alias for backward compatibility
const INVESTOR_TYPES = INVESTOR_CATEGORIES;

const STAGES = [
  { value: 'pre_seed', label: 'Pre-Seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series_a', label: 'Series A' },
  { value: 'series_b', label: 'Series B' },
  { value: 'series_c', label: 'Series C' },
  { value: 'growth', label: 'Growth' }
];

const SECTORS = [
  { value: 'fintech', label: 'Fintech' },
  { value: 'edtech', label: 'Edtech' },
  { value: 'healthtech', label: 'Healthtech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'deeptech', label: 'DeepTech' },
  { value: 'agritech', label: 'AgriTech' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'foodtech', label: 'FoodTech' },
  { value: 'proptech', label: 'PropTech' },
  { value: 'insurtech', label: 'InsurTech' },
  { value: 'mobility', label: 'Mobility' }
];

const CITIES = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Bangalore', label: 'Bangalore' },
  { value: 'Hyderabad', label: 'Hyderabad' },
  { value: 'Chennai', label: 'Chennai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Kolkata', label: 'Kolkata' },
  { value: 'Ahmedabad', label: 'Ahmedabad' }
];

const TICKET_RANGES = [
  { value: { min: '25000', max: '250000' }, label: '₹25K - ₹2.5L' },
  { value: { min: '100000', max: '1000000' }, label: '₹1L - ₹10L' },
  { value: { min: '500000', max: '5000000' }, label: '₹5L - ₹50L' },
  { value: { min: '2000000', max: '50000000' }, label: '₹20L - ₹5Cr' },
  { value: { min: '10000000', max: '100000000' }, label: '₹1Cr - ₹10Cr' },
  { value: { min: '50000000', max: '' }, label: '₹5Cr+' }
];

export function InvestorFilters({
  filters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  loading,
  categories = [],
  filterOptions = { cities: [], stages: [], sectors: [] }
}: InvestorFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const selectTicketRange = (range: { min: string; max: string }) => {
    onFiltersChange({
      ...filters,
      minTicket: range.min,
      maxTicket: range.max
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search investors, firms, or portfolio companies..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <Text weight="medium" className="mb-3">
            Investor Category
          </Text>
          <div className="flex flex-wrap gap-2">
            {INVESTOR_CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => updateFilter('category', filters.category === category.value ? '' : category.value)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  filters.category === category.value
                    ? "bg-accent text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stage Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4" />
            <Text weight="medium">
              Investment Stage
            </Text>
          </div>
          <div className="flex flex-wrap gap-2">
            {(filterOptions.stages.length > 0 ? filterOptions.stages : STAGES.map(s => s.value)).map((stage) => (
              <button
                key={stage}
                onClick={() => updateFilter('stage', filters.stage === stage ? '' : stage)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  filters.stage === stage
                    ? "bg-accent text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                )}
              >
                {stage.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <Text>Advanced Filters</Text>
            </div>
            <Text size="sm" color="muted">
              {showAdvanced ? 'Less' : 'More'}
            </Text>
          </Button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-6">
            {/* Sectors */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Building className="w-4 h-4" />
                <Text weight="medium">
                  Sectors
                </Text>
              </div>
              <div className="flex flex-wrap gap-2">
                {SECTORS.map((sector) => (
                  <button
                    key={sector.value}
                    onClick={() => updateFilter('sector', filters.sector === sector.value ? '' : sector.value)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      filters.sector === sector.value
                        ? "bg-accent text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    {sector.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4" />
                <Text weight="medium">
                  City
                </Text>
              </div>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => (
                  <button
                    key={city.value}
                    onClick={() => updateFilter('city', filters.city === city.value ? '' : city.value)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      filters.city === city.value
                        ? "bg-accent text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    {city.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ticket Size */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4" />
                <Text weight="medium">
                  Ticket Size
                </Text>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {TICKET_RANGES.map((range, index) => (
                  <button
                    key={index}
                    onClick={() => selectTicketRange(range.value)}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      filters.minTicket === range.value.min && filters.maxTicket === range.value.max
                        ? "bg-accent text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min amount"
                  value={filters.minTicket}
                  onChange={(e) => updateFilter('minTicket', e.target.value)}
                  type="number"
                />
                <Input
                  placeholder="Max amount"
                  value={filters.maxTicket}
                  onChange={(e) => updateFilter('maxTicket', e.target.value)}
                  type="number"
                />
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <Text weight="medium" size="sm">
                Active Filters
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value) return null;
                
                let label = value;
                if (key === 'type') {
                  label = INVESTOR_TYPES.find(t => t.value === value)?.label || value;
                } else if (key === 'stage') {
                  label = STAGES.find(s => s.value === value)?.label || value;
                } else if (key === 'sector') {
                  label = SECTORS.find(s => s.value === value)?.label || value;
                }
                
                return (
                  <Badge key={key} variant="outline" className="text-xs">
                    {label}
                    <button
                      onClick={() => updateFilter(key as keyof FilterState, '')}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="mt-6 pt-4 border-t">
          <Button
            variant="primary"
            onClick={onApplyFilters}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Searching...' : 'Apply Filters'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
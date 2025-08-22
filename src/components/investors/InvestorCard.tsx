'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  MapPin, 
  DollarSign, 
  Building, 
  Mail, 
  Linkedin, 
  ExternalLink,
  TrendingUp,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvestorCardProps {
  investor: {
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
  };
  onViewDetails?: () => void;
}

export function InvestorCard({ investor, onViewDetails }: InvestorCardProps) {
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

  const getTypeLabel = (type: string) => {
    const labels = {
      angel: 'Angel Investor',
      vc_firm: 'VC Firm',
      international: 'International',
      government: 'Government',
      accelerator: 'Accelerator',
      incubator: 'Incubator'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-accent">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Text weight="semibold" className="text-lg">
                {investor.name}
              </Text>
              <Badge size="sm" className={getTypeColor(investor.type)}>
                {getTypeLabel(investor.type)}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <Text size="sm" weight="medium">
                {investor.city}
              </Text>
            </div>
          </div>
        </div>

        {/* Description */}
        <Text size="sm" color="muted" className="mb-4 line-clamp-3">
          {investor.description}
        </Text>

        {/* Investment Details */}
        <div className="space-y-3 mb-4">
          {/* Investment Stages */}
          {investor.investment_stage && investor.investment_stage.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <TrendingUp className="w-4 h-4 text-gray-500" />
              <div className="flex flex-wrap gap-1">
                {investor.investment_stage.map((stage, index) => (
                  <Badge key={stage} variant="outline" size="sm" className="text-xs">
                    {stage.replace('_', ' ').toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Sectors */}
          {investor.sectors && investor.sectors.length > 0 && (
            <div className="flex items-start gap-2">
              <Users className="w-4 h-4 text-gray-500 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {investor.sectors.slice(0, 3).map((sector, index) => (
                  <Badge key={sector} variant="outline" size="sm" className="text-xs">
                    {sector.replace('_', ' ')}
                  </Badge>
                ))}
                {investor.sectors.length > 3 && (
                  <Badge variant="outline" size="sm" className="text-xs">
                    +{investor.sectors.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Preview */}
        {investor.notable_investments && investor.notable_investments.length > 0 && (
          <div className="mb-4">
            <Text size="xs" color="muted" className="mb-2">
              Notable investments:
            </Text>
            <div className="flex flex-wrap gap-1">
              {investor.notable_investments.slice(0, 3).map((company, index) => (
                <Badge key={company} variant="outline" size="sm" className="text-xs bg-gray-50">
                  {company}
                </Badge>
              ))}
              {investor.notable_investments.length > 3 && (
                <Badge variant="outline" size="sm" className="text-xs">
                  +{investor.notable_investments.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <Text size="sm">
            {investor.portfolio_size ? `${investor.portfolio_size} investments` : 'Active investor'}
          </Text>
          <div className="flex items-center gap-1">
            <ExternalLink className="w-4 h-4" />
            <Text size="sm">
              View Details
            </Text>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            View Details
          </Button>
          {investor.website && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(investor.website, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}
          {investor.linkedin && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(investor.linkedin, '_blank')}
            >
              <Linkedin className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface Feature {
  text: string;
  highlight?: boolean;
  icon?: React.ReactNode;
  category?: 'essential' | 'pro' | 'bonus';
}

interface MobileFeatureListProps {
  features: (string | Feature)[];
  maxVisible?: number;
  variant?: 'compact' | 'detailed' | 'categorized';
  className?: string;
}

export const MobileFeatureList: React.FC<MobileFeatureListProps> = ({
  features,
  maxVisible = 4,
  variant = 'compact',
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Normalize features
  const normalizedFeatures: Feature[] = features.map(f => {
    if (typeof f === 'string') {
      return { text: f };
    }
    return f;
  });

  // Categorize features if needed
  const categorizedFeatures = variant === 'categorized' 
    ? {
        essential: normalizedFeatures.filter(f => f.category === 'essential' || !f.category).slice(0, 3),
        pro: normalizedFeatures.filter(f => f.category === 'pro').slice(0, 3),
        bonus: normalizedFeatures.filter(f => f.category === 'bonus')
      }
    : null;

  // Get visible features
  const visibleFeatures = isExpanded 
    ? normalizedFeatures 
    : normalizedFeatures.slice(0, maxVisible);

  const hasMore = normalizedFeatures.length > maxVisible;

  // Compact variant - Simple checkmarks
  if (variant === 'compact') {
    return (
      <div className={cn("space-y-2", className)}>
        {visibleFeatures.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Check 
              className={cn(
                "w-4 h-4 mt-0.5 flex-shrink-0",
                feature.highlight ? "text-yellow-500" : "text-green-600"
              )} 
            />
            <Text size="xs" className="leading-tight">
              {feature.text}
            </Text>
          </div>
        ))}
        
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-1 py-2 text-blue-600 active:bg-blue-50 rounded-lg transition-colors"
          >
            <Text size="xs" weight="medium">
              {isExpanded 
                ? 'Show less' 
                : `+${normalizedFeatures.length - maxVisible} more features`
              }
            </Text>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );
  }

  // Detailed variant - With icons and badges
  if (variant === 'detailed') {
    return (
      <div className={cn("space-y-3", className)}>
        {visibleFeatures.map((feature, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg",
              feature.highlight && "bg-yellow-50"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              feature.highlight ? "bg-yellow-100" : "bg-green-100"
            )}>
              {feature.icon || (
                feature.highlight ? (
                  <Star className="w-4 h-4 text-yellow-600" />
                ) : (
                  <Check className="w-4 h-4 text-green-600" />
                )
              )}
            </div>
            <div className="flex-1">
              <Text size="sm" weight={feature.highlight ? "medium" : "normal"}>
                {feature.text}
              </Text>
              {feature.highlight && (
                <Badge size="sm" className="mt-1 bg-yellow-100 text-yellow-700">
                  Premium Feature
                </Badge>
              )}
            </div>
          </div>
        ))}
        
        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-1 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Text size="sm" weight="medium">
              {isExpanded ? 'Show less' : 'View all features'}
            </Text>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    );
  }

  // Categorized variant - Grouped features
  if (variant === 'categorized' && categorizedFeatures) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Essential Features */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-600" />
            <Text size="sm" weight="medium">Essential Features</Text>
          </div>
          <div className="space-y-1 pl-6">
            {categorizedFeatures.essential.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-0.5 text-blue-600 flex-shrink-0" />
                <Text size="xs">{feature.text}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Features */}
        {categorizedFeatures.pro.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <Text size="sm" weight="medium">Pro Features</Text>
            </div>
            <div className="space-y-1 pl-6">
              {categorizedFeatures.pro.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-3 h-3 mt-0.5 text-purple-600 flex-shrink-0" />
                  <Text size="xs">{feature.text}</Text>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bonus Features */}
        {categorizedFeatures.bonus.length > 0 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full flex items-center justify-center gap-2 py-2 text-green-600"
          >
            <Award className="w-4 h-4" />
            <Text size="xs" weight="medium">
              +{categorizedFeatures.bonus.length} bonus features
            </Text>
            <ChevronDown className="w-4 h-4" />
          </button>
        )}

        {isExpanded && categorizedFeatures.bonus.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-green-600" />
              <Text size="sm" weight="medium">Bonus Features</Text>
            </div>
            <div className="space-y-1 pl-6">
              {categorizedFeatures.bonus.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-3 h-3 mt-0.5 text-green-600 flex-shrink-0" />
                  <Text size="xs">{feature.text}</Text>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-full mt-2 py-2 text-gray-600"
            >
              <Text size="xs">Show less</Text>
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};
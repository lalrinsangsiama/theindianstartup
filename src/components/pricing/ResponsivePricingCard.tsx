'use client';

import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Shield,
  Zap,
  Clock,
  Users,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface PricingFeature {
  text: string;
  highlight?: boolean;
}

interface ResponsivePricingCardProps {
  code: string;
  title: string;
  shortTitle?: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[] | PricingFeature[];
  icon?: React.ReactNode;
  mostPopular?: boolean;
  recommended?: boolean;
  savingsPercent?: number;
  duration?: string;
  modules?: number;
  onPurchase: (code: string, price: number) => void;
  isLoading?: boolean;
  isMobile?: boolean;
  className?: string;
}

export const ResponsivePricingCard: React.FC<ResponsivePricingCardProps> = ({
  code,
  title,
  shortTitle,
  tagline,
  description,
  price,
  originalPrice,
  features,
  icon,
  mostPopular,
  recommended,
  savingsPercent,
  duration,
  modules,
  onPurchase,
  isLoading,
  isMobile,
  className
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  // Convert features to consistent format
  const normalizedFeatures: PricingFeature[] = features.map(f => 
    typeof f === 'string' ? { text: f } : f
  );
  
  // Show limited features on mobile
  const visibleFeatures = isMobile && !showAllFeatures 
    ? normalizedFeatures.slice(0, 4) 
    : normalizedFeatures;
  
  const hasMoreFeatures = isMobile && normalizedFeatures.length > 4;

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "hover:shadow-xl hover:scale-[1.02]",
        mostPopular && "ring-2 ring-accent shadow-lg",
        recommended && "bg-gradient-to-br from-gray-900 to-gray-800 text-white",
        isMobile && "w-full",
        className
      )}
    >
      {/* Popular/Recommended Badge */}
      {(mostPopular || recommended) && (
        <div className={cn(
          "absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg",
          mostPopular && "bg-accent text-white",
          recommended && "bg-yellow-500 text-black"
        )}>
          {mostPopular ? "MOST POPULAR" : "BEST VALUE"}
        </div>
      )}

      <CardContent className={cn(
        "p-6",
        isMobile && "p-4"
      )}>
        {/* Header */}
        <div className="text-center mb-6">
          {/* Icon */}
          {icon && (
            <div className={cn(
              "w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center",
              recommended ? "bg-white/20" : "bg-gray-100"
            )}>
              {icon}
            </div>
          )}

          {/* Title & Tagline */}
          <Heading 
            as="h3" 
            variant={isMobile ? "h6" : "h5"} 
            className={cn(
              "mb-2",
              recommended && "text-white"
            )}
          >
            {isMobile && shortTitle ? shortTitle : title}
          </Heading>
          
          {tagline && (
            <Text 
              size="xs" 
              className={cn(
                "font-medium mb-3",
                recommended ? "text-yellow-300" : "text-accent"
              )}
            >
              {tagline}
            </Text>
          )}

          {/* Description - Hidden on mobile */}
          {!isMobile && (
            <Text 
              size="sm" 
              className={cn(
                "mb-4",
                recommended ? "text-gray-300" : "text-gray-600"
              )}
            >
              {description}
            </Text>
          )}

          {/* Duration & Modules - Compact on mobile */}
          {(duration || modules) && (
            <div className={cn(
              "flex items-center justify-center gap-4 mb-4",
              isMobile && "gap-2"
            )}>
              {duration && (
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" />
                  <Text size={isMobile ? "xs" : "sm"}>{duration}</Text>
                </div>
              )}
              {modules && (
                <div className="flex items-center gap-1 text-sm">
                  <Zap className="w-4 h-4" />
                  <Text size={isMobile ? "xs" : "sm"}>{modules} modules</Text>
                </div>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="mb-4">
            {originalPrice && (
              <Text 
                className={cn(
                  "text-xl line-through",
                  recommended ? "text-gray-400" : "text-gray-400"
                )}
              >
                ₹{originalPrice.toLocaleString('en-IN')}
              </Text>
            )}
            <Text 
              className={cn(
                "font-bold mb-1",
                isMobile ? "text-2xl" : "text-3xl",
                recommended && "text-white"
              )}
            >
              ₹{price.toLocaleString('en-IN')}
            </Text>
            {savingsPercent && (
              <Badge 
                className={cn(
                  recommended ? "bg-yellow-500 text-black" : "bg-green-100 text-green-700"
                )}
                size={isMobile ? "sm" : "md"}
              >
                Save {savingsPercent}%
              </Badge>
            )}
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {visibleFeatures.map((feature, index) => (
            <li 
              key={index} 
              className={cn(
                "flex items-start gap-2",
                isMobile && "text-sm"
              )}
            >
              <Check 
                className={cn(
                  "w-4 h-4 mt-0.5 flex-shrink-0",
                  feature.highlight 
                    ? "text-yellow-500" 
                    : recommended 
                      ? "text-yellow-300" 
                      : "text-green-600"
                )} 
              />
              <Text 
                size={isMobile ? "xs" : "sm"} 
                className={recommended ? "text-gray-200" : ""}
              >
                {feature.text}
              </Text>
            </li>
          ))}
        </ul>

        {/* Show More Features - Mobile Only */}
        {hasMoreFeatures && (
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className={cn(
              "w-full flex items-center justify-center gap-1 text-sm mb-4",
              recommended ? "text-yellow-300" : "text-blue-600"
            )}
          >
            <Text size="xs" weight="medium">
              {showAllFeatures ? "Show less" : `+${normalizedFeatures.length - 4} more features`}
            </Text>
            {showAllFeatures ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        )}

        {/* CTA Button - Larger on mobile */}
        <Button
          className={cn(
            "w-full",
            isMobile && "py-4 text-base",
            recommended && "bg-yellow-500 hover:bg-yellow-400 text-black"
          )}
          variant={mostPopular || recommended ? "primary" : "outline"}
          onClick={() => onPurchase(code, price)}
          disabled={isLoading}
          size={isMobile ? "lg" : "md"}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              Get {shortTitle || title}
              {isMobile && (
                <span className="ml-2">→</span>
              )}
            </>
          )}
        </Button>

        {/* Trust Indicators */}
        <div className={cn(
          "mt-3 flex items-center justify-center gap-3 text-xs",
          recommended ? "text-gray-400" : "text-gray-600"
        )}>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <Text size="xs">3-day guarantee</Text>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
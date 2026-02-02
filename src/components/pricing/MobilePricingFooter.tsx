'use client';

import React, { useEffect, useState } from 'react';
import { Shield, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface MobilePricingFooterProps {
  productName: string;
  price: number;
  originalPrice?: number;
  onPurchase: () => void;
  isLoading?: boolean;
  show?: boolean;
  className?: string;
}

export const MobilePricingFooter: React.FC<MobilePricingFooterProps> = ({
  productName,
  price,
  originalPrice,
  onPurchase,
  isLoading,
  show = true,
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show footer after user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!show || !isVisible || isDismissed) return null;

  const savings = originalPrice ? originalPrice - price : 0;
  const savingsPercent = originalPrice 
    ? Math.round((savings / originalPrice) * 100) 
    : 0;

  return (
    <>
      {/* Overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sticky Footer */}
      <div 
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-300",
          "bg-white border-t shadow-[0_-4px_16px_rgba(0,0,0,0.1)]",
          isExpanded ? "h-auto" : "h-auto",
          className
        )}
      >
        {/* Collapsed View */}
        {!isExpanded && (
          <div className="p-4">
            <div className="flex items-center justify-between gap-3">
              {/* Product Info */}
              <div className="flex-1">
                <Text size="sm" weight="medium" className="truncate">
                  {productName}
                </Text>
                <div className="flex items-center gap-2">
                  {originalPrice && (
                    <Text size="xs" className="line-through text-gray-500">
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </Text>
                  )}
                  <Text size="lg" weight="bold">
                    ₹{price.toLocaleString('en-IN')}
                  </Text>
                  {savingsPercent > 0 && (
                    <Badge size="sm" className="bg-green-100 text-green-700">
                      {savingsPercent}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={onPurchase}
                disabled={isLoading}
                className="px-6 py-3"
                variant="primary"
                size="md"
              >
                Buy Now
              </Button>
            </div>

            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full mt-2 py-1 flex items-center justify-center gap-1 text-gray-600"
            >
              <ChevronUp className="w-4 h-4" />
              <Text size="xs">View details</Text>
            </button>
          </div>
        )}

        {/* Expanded View */}
        {isExpanded && (
          <div className="p-4 pb-6 animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <Text weight="medium">{productName}</Text>
                <div className="flex items-center gap-2 mt-1">
                  {originalPrice && (
                    <Text size="sm" className="line-through text-gray-500">
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </Text>
                  )}
                  <Text size="xl" weight="bold">
                    ₹{price.toLocaleString('en-IN')}
                  </Text>
                  {savingsPercent > 0 && (
                    <Badge className="bg-green-100 text-green-700">
                      Save {savingsPercent}%
                    </Badge>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronUp className="w-5 h-5 rotate-180" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-green-700">
                <Shield className="w-4 h-4" />
                <Text size="sm">3-day money back guarantee</Text>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4" />
                <Text size="sm">Secure payment via Razorpay</Text>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-4 h-4" />
                <Text size="sm">Instant access after payment</Text>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={onPurchase}
              disabled={isLoading}
              className="w-full py-4 text-lg"
              variant="primary"
              size="lg"
            >
              Buy Now - ₹{price.toLocaleString('en-IN')}
            </Button>

            {/* Dismiss Option */}
            <button
              onClick={() => {
                setIsDismissed(true);
                setIsExpanded(false);
              }}
              className="w-full mt-3 py-2 text-gray-500"
            >
              <Text size="xs">Not interested right now</Text>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
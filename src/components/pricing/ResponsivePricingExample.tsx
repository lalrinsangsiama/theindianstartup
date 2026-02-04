'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ResponsivePricingGrid } from './ResponsivePricingGrid';
import { MobilePricingFooter } from './MobilePricingFooter';
import { MobilePaymentButton } from './MobilePaymentButton';
import { MobileFeatureList } from './MobileFeatureList';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Rocket, Shield, DollarSign } from 'lucide-react';

// Example usage of responsive pricing components
export const ResponsivePricingExample = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Example products data
  const products = [
    {
      code: 'P1',
      title: '30-Day India Launch Sprint',
      shortTitle: 'Launch Sprint',
      tagline: 'Go from idea to launch',
      description: 'The complete startup launch program designed for Indian founders',
      price: 4999,
      originalPrice: 9999,
      savingsPercent: 50,
      duration: '30 days',
      modules: 4,
      icon: <Rocket className="w-6 h-6" />,
      mostPopular: true,
      features: [
        'Daily action plans',
        'Legal entity setup',
        'MVP development guide',
        'First customer acquisition',
        'India-specific compliance',
        'Community support',
        'Expert mentorship',
        '100+ templates'
      ]
    },
    {
      code: 'P3',
      title: 'Funding Mastery Complete',
      shortTitle: 'Funding Mastery',
      tagline: 'Master the funding game',
      description: 'Comprehensive guide to raising funds in India',
      price: 5999,
      originalPrice: 11999,
      savingsPercent: 50,
      duration: '45 days',
      modules: 12,
      icon: <DollarSign className="w-6 h-6" />,
      features: [
        'Government grants (₹20L-5Cr)',
        'Angel investment strategies',
        'VC funding roadmap',
        'Debt funding mastery',
        'Pitch deck templates',
        'Financial modeling',
        'Investor networking',
        'Term sheet negotiation'
      ]
    },
    {
      code: 'ALL_ACCESS',
      title: 'All Access Bundle',
      shortTitle: 'All Access',
      tagline: 'Everything you need',
      description: 'Get all 30 courses and save 33%',
      price: 149999,
      originalPrice: 224970,
      savingsPercent: 33,
      duration: 'Lifetime',
      modules: 300,
      icon: <Shield className="w-6 h-6" />,
      recommended: true,
      features: [
        'All 30 courses included',
        'Save ₹74,971',
        'Lifetime access',
        'Priority support',
        'Exclusive masterclasses',
        'Quarterly updates',
        'Certificate of completion',
        'Alumni network access'
      ]
    }
  ];

  const handlePurchase = async (code: string, price: number) => {
    setIsLoading(true);
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    logger.info(`Purchasing ${code} for ₹${price}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white py-8 px-4 text-center">
        <Badge className="bg-green-100 text-green-700 mb-4">
          Limited Time: 50% Launch Discount
        </Badge>
        <Heading as="h1" variant={isMobile ? "h4" : "h2"} className="mb-2">
          Choose Your Startup Journey
        </Heading>
        <Text color="muted" className="max-w-2xl mx-auto">
          Join 2,847 Indian founders building successful startups
        </Text>
      </div>

      {/* Pricing Grid */}
      <div className="container mx-auto px-4 py-8">
        <ResponsivePricingGrid
          items={products}
          onPurchase={handlePurchase}
          isLoading={isLoading}
          variant={isMobile ? 'carousel' : 'grid'}
          columns={{
            mobile: 1,
            tablet: 2,
            desktop: 3
          }}
        />
      </div>

      {/* Mobile-specific sections */}
      {isMobile && (
        <>
          {/* Feature Comparison */}
          <div className="bg-white py-8 px-4">
            <Heading as="h2" variant="h5" className="mb-4">
              What's Included
            </Heading>
            <MobileFeatureList
              features={[
                { text: 'Step-by-step guidance', category: 'essential' },
                { text: 'India-specific content', category: 'essential' },
                { text: 'Legal compliance help', category: 'essential' },
                { text: 'Expert mentorship', category: 'pro' },
                { text: 'Community access', category: 'pro' },
                { text: 'Lifetime updates', category: 'pro' },
                { text: 'Certificate', category: 'bonus' },
                { text: 'Alumni network', category: 'bonus' }
              ]}
              variant="categorized"
            />
          </div>

          {/* Payment Section */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className="p-4">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="mb-4 text-blue-600"
                >
                  ← Back to courses
                </button>
                
                <Heading as="h2" variant="h5" className="mb-2">
                  {selectedProduct.title}
                </Heading>
                
                <MobilePaymentButton
                  productCode={selectedProduct.code}
                  productName={selectedProduct.title}
                  price={selectedProduct.price}
                  onPurchase={async (code, price) => {
                    await handlePurchase(code, price);
                    setSelectedProduct(null);
                  }}
                />
              </div>
            </div>
          )}

          {/* Sticky Footer */}
          {!selectedProduct && (
            <MobilePricingFooter
              productName="All Access Bundle"
              price={54999}
              originalPrice={79999}
              onPurchase={() => handlePurchase('ALL_ACCESS', 54999)}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </div>
  );
};
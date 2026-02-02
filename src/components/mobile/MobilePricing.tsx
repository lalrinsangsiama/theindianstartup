'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Zap,
  Lock
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';
import { cn } from '@/lib/utils';

// Helper function to format Indian price
const formatIndianPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};

interface Bundle {
  code: string;
  title: string;
  tagline: string;
  price: number;
  originalPrice: number;
  savingsPercent: number;
  features: string[];
  mostPopular?: boolean;
}

interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  modules: number;
}

interface MobilePricingProps {
  bundles: Bundle[];
  products: Product[];
  onPurchase: (code: string, price: number) => void;
  isLoading: boolean;
}

export const MobilePricing: React.FC<MobilePricingProps> = ({
  bundles,
  products,
  onPurchase,
  isLoading
}) => {
  const [activeTab, setActiveTab] = useState<'bundles' | 'products'>('bundles');
  const [activeBundleIndex, setActiveBundleIndex] = useState(1); // Start with most popular
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Swipe handlers for bundle carousel
  useSwipeGesture(carouselRef, {
    onSwipeLeft: () => {
      if (activeBundleIndex < bundles.length - 1) {
        setActiveBundleIndex(prev => prev + 1);
      }
    },
    onSwipeRight: () => {
      if (activeBundleIndex > 0) {
        setActiveBundleIndex(prev => prev - 1);
      }
    }
  });

  const activeBundle = bundles[activeBundleIndex];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 border-b">
        <div className="px-4 py-4">
          <Heading as="h1" variant="h5" className="text-center mb-2">
            Choose Your Path
          </Heading>
          <Text size="sm" color="muted" className="text-center">
            Save up to 30% with bundles
          </Text>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex border-t">
          <button
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              activeTab === 'bundles' 
                ? "text-black border-b-2 border-black" 
                : "text-gray-500"
            )}
            onClick={() => setActiveTab('bundles')}
          >
            Bundles
          </button>
          <button
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-colors",
              activeTab === 'products' 
                ? "text-black border-b-2 border-black" 
                : "text-gray-500"
            )}
            onClick={() => setActiveTab('products')}
          >
            Individual Courses
          </button>
        </div>
      </div>

      {activeTab === 'bundles' ? (
        <div className="px-4 py-6">
          {/* Bundle Carousel */}
          <div className="relative" ref={carouselRef}>
            <div className="flex gap-4 overflow-hidden">
              <div 
                className="flex gap-4 transition-transform duration-300"
                style={{ transform: `translateX(-${activeBundleIndex * 100}%)` }}
              >
                {bundles.map((bundle, index) => (
                  <div key={bundle.code} className="w-full flex-shrink-0">
                    <Card className={cn(
                      "relative overflow-hidden",
                      bundle.mostPopular && "ring-2 ring-accent shadow-lg"
                    )}>
                      {bundle.mostPopular && (
                        <div className="absolute top-0 right-0 bg-accent text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="text-center mb-6">
                          <Heading as="h3" variant="h5" className="mb-2">
                            {bundle.title}
                          </Heading>
                          <Text size="xs" className="text-accent font-medium mb-3">
                            {bundle.tagline}
                          </Text>
                          
                          <div className="mb-4">
                            <Text className="text-xl line-through text-gray-400">
                              ₹{bundle.originalPrice.toLocaleString('en-IN')}
                            </Text>
                            <Text className="text-3xl font-bold mb-1">
                              ₹{bundle.price.toLocaleString('en-IN')}
                            </Text>
                            <Badge className="bg-green-100 text-green-700">
                              Save {bundle.savingsPercent}%
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          {bundle.features.slice(0, 5).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <Text size="sm">{feature}</Text>
                            </div>
                          ))}
                        </div>

                        <Button
                          className="w-full mb-3"
                          variant="primary"
                          onClick={() => onPurchase(bundle.code, bundle.price)}
                          disabled={isLoading}
                        >
                          Get {bundle.title}
                        </Button>
                        
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                          <Shield className="w-3 h-3" />
                          <Text size="xs">3-day money back guarantee</Text>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {bundles.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === activeBundleIndex 
                      ? "w-8 bg-black" 
                      : "bg-gray-300"
                  )}
                  onClick={() => setActiveBundleIndex(index)}
                />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 mt-8">
            <Card className="p-4 text-center">
              <Star className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
              <Text weight="bold">4.8/5</Text>
              <Text size="xs" color="muted">2,847 founders</Text>
            </Card>
            <Card className="p-4 text-center">
              <Zap className="w-5 h-5 text-blue-500 mx-auto mb-2" />
              <Text weight="bold">89%</Text>
              <Text size="xs" color="muted">Completion rate</Text>
            </Card>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6">
          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <Card 
                key={product.code}
                className="overflow-hidden"
                onClick={() => router.push(`/demo/${product.code.toLowerCase()}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <Heading as="h4" variant="h6" className="mb-1">
                        {product.title}
                      </Heading>
                      <Text size="xs" color="muted" className="mb-2">
                        {product.duration} • {product.modules} modules
                      </Text>
                    </div>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  <Text size="sm" color="muted" className="mb-3 line-clamp-2">
                    {product.description}
                  </Text>
                  
                  <div className="flex items-center justify-between">
                    <Text weight="bold" size="lg">
                      ₹{formatIndianPrice(product.price)}
                    </Text>
                    <Button size="sm" variant="outline">
                      View Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <Heading as="h3" variant="h6" className="mb-2">
                Save with Bundles
              </Heading>
              <Text size="sm" color="muted" className="mb-4">
                Get multiple courses at up to 30% discount
              </Text>
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => setActiveTab('bundles')}
              >
                View Bundles
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
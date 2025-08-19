'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Heading, Text } from '@/components/ui/Typography';
import { BookOpen, ShoppingCart } from 'lucide-react';
import { useUserCoupons } from '@/hooks/useUserCoupons';

interface Product {
  code: string;
  title: string;
  shortTitle?: string;
  description: string;
  price: number;
  estimatedDays?: number;
  icon?: React.ReactNode;
}

interface UnboughtCoursesSectionProps {
  unboughtProducts: Product[];
  ownedProductsCount: number;
  onProductClick: (product: Product) => void;
}

export function UnboughtCoursesSection({ 
  unboughtProducts, 
  ownedProductsCount,
  onProductClick 
}: UnboughtCoursesSectionProps) {
  const { activeCoupons } = useUserCoupons();
  const hasActiveCoupon = activeCoupons.length > 0;

  if (unboughtProducts.length === 0) return null;

  const getAllAccessOriginalPrice = () => {
    return unboughtProducts.reduce((sum, p) => sum + (p.price || 0), 0) + (ownedProductsCount * 5000); // Rough estimate
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Heading as="h2" variant="h4" className="mb-2">
            Expand Your Startup Knowledge
          </Heading>
          <Text color="muted">
            {unboughtProducts.length} more courses to master your startup journey
          </Text>
        </div>
        {hasActiveCoupon && (
          <Badge className="bg-green-100 text-green-700">
            🎉 You have a {activeCoupons[0].discountPercent}% coupon: {activeCoupons[0].code}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {unboughtProducts.slice(0, 6).map((product) => (
          <Card 
            key={product.code} 
            className="border-2 border-gray-200 hover:border-black transition-all cursor-pointer"
            onClick={() => onProductClick(product)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                  {product.icon || <BookOpen className="w-6 h-6 text-gray-600" />}
                </div>
                <Badge size="sm" variant="outline">
                  {product.estimatedDays} days
                </Badge>
              </div>
              
              <Text weight="semibold" className="mb-2">
                {product.code}: {product.shortTitle || product.title}
              </Text>
              <Text size="sm" color="muted" className="mb-4 line-clamp-2">
                {product.description}
              </Text>
              
              <div className="flex items-center justify-between">
                <div>
                  <Text className="font-bold text-lg">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </Text>
                  {hasActiveCoupon && (
                    <Text size="xs" className="text-green-600">
                      ₹{Math.floor(product.price * 0.9).toLocaleString('en-IN')} with coupon
                    </Text>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  Learn More →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {unboughtProducts.length > 6 && (
        <div className="text-center mb-8">
          <Link href="/pricing">
            <Button variant="outline">
              View All {unboughtProducts.length} Courses →
            </Button>
          </Link>
        </div>
      )}

      {/* All Access Bundle Promotion */}
      <Card className="border-2 border-black bg-gradient-to-r from-purple-50 to-blue-50">
        <CardContent className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-purple-600 text-white mb-4">
              BEST VALUE - SAVE ₹15,987
            </Badge>
            <Heading as="h3" variant="h3" className="mb-4">
              Get All-Access Bundle
            </Heading>
            <Text size="lg" color="muted" className="mb-6">
              Unlock all 12 comprehensive courses and master every aspect of building a successful startup in India
            </Text>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <Text className="font-bold text-2xl">12</Text>
                <Text size="sm" color="muted">Courses</Text>
              </div>
              <div className="text-center">
                <Text className="font-bold text-2xl">500+</Text>
                <Text size="sm" color="muted">Lessons</Text>
              </div>
              <div className="text-center">
                <Text className="font-bold text-2xl">1000+</Text>
                <Text size="sm" color="muted">Templates</Text>
              </div>
              <div className="text-center">
                <Text className="font-bold text-2xl">1 Year</Text>
                <Text size="sm" color="muted">Access</Text>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div>
                <Text className="text-gray-500 line-through text-xl">
                  ₹{getAllAccessOriginalPrice().toLocaleString('en-IN')}
                </Text>
                <Text className="font-bold text-3xl">
                  ₹54,999
                </Text>
              </div>
              <Link href="/pricing">
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Get All Access
                </Button>
              </Link>
            </div>

            {ownedProductsCount > 0 && (
              <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                <Text size="sm" className="text-purple-700">
                  💡 You already own {ownedProductsCount} course{ownedProductsCount > 1 ? 's' : ''}. 
                  Upgrade to All Access and save even more!
                </Text>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
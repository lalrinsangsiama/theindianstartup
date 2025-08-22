'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ResponsivePricingCard } from './ResponsivePricingCard';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PricingItem {
  code: string;
  title: string;
  shortTitle?: string;
  tagline?: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  icon?: React.ReactNode;
  mostPopular?: boolean;
  recommended?: boolean;
  savingsPercent?: number;
  duration?: string;
  modules?: number;
}

interface ResponsivePricingGridProps {
  items: PricingItem[];
  onPurchase: (code: string, price: number) => void;
  isLoading?: boolean;
  variant?: 'grid' | 'carousel';
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export const ResponsivePricingGrid: React.FC<ResponsivePricingGridProps> = ({
  items,
  onPurchase,
  isLoading,
  variant = 'grid',
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Calculate visible items based on screen size
  const visibleItems = isMobile 
    ? columns.mobile || 1 
    : isTablet 
      ? columns.tablet || 2 
      : columns.desktop || 3;

  // Carousel navigation
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.offsetWidth / visibleItems;
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = Math.max(0, currentIndex - visibleItems);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, items.length - visibleItems);
    const newIndex = Math.min(maxIndex, currentIndex + visibleItems);
    scrollToIndex(newIndex);
  };

  // Mobile carousel variant
  if (variant === 'carousel' && isMobile) {
    return (
      <div className="relative">
        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <div 
              key={item.code}
              className="flex-shrink-0 w-full snap-center"
            >
              <ResponsivePricingCard
                {...item}
                onPurchase={onPurchase}
                isLoading={isLoading}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {items.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              disabled={currentIndex >= items.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex 
                  ? "w-8 bg-black" 
                  : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default grid layout
  return (
    <div 
      className={cn(
        "grid gap-6",
        isMobile && "grid-cols-1",
        isTablet && "grid-cols-2",
        !isMobile && !isTablet && `grid-cols-${columns.desktop || 3}`
      )}
    >
      {items.map((item) => (
        <ResponsivePricingCard
          key={item.code}
          {...item}
          onPurchase={onPurchase}
          isLoading={isLoading}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
};
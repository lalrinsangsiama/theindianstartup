'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Palette, Target, Megaphone, Users } from 'lucide-react';

interface BrandingLoadingStateProps {
  message?: string;
  type?: 'default' | 'brand-strategy' | 'pr-campaign' | 'brand-assets' | 'media-relations';
}

const BrandingLoadingState: React.FC<BrandingLoadingStateProps> = ({
  message = 'Loading...',
  type = 'default'
}) => {
  const getIconAndColor = () => {
    switch (type) {
      case 'brand-strategy':
        return { icon: Target, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'pr-campaign':
        return { icon: Megaphone, color: 'text-purple-600', bgColor: 'bg-purple-100' };
      case 'brand-assets':
        return { icon: Palette, color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'media-relations':
        return { icon: Users, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      default:
        return { icon: Palette, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const { icon: Icon, color, bgColor } = getIconAndColor();

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <Card className="max-w-sm w-full">
        <CardContent className="p-8 text-center">
          {/* Animated Icon */}
          <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse`}>
            <Icon className={`w-8 h-8 ${color}`} />
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center mb-4">
            <div className="flex space-x-1">
              <div className={`w-2 h-2 ${bgColor} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-2 h-2 ${bgColor} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-2 h-2 ${bgColor} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          {/* Loading Message */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {type === 'brand-strategy' && 'Analyzing Brand Strategy'}
            {type === 'pr-campaign' && 'Loading PR Campaign Manager'}
            {type === 'brand-assets' && 'Preparing Brand Asset Generator'}
            {type === 'media-relations' && 'Loading Media Relations CRM'}
            {type === 'default' && 'Loading Brand Tools'}
          </h3>
          
          <p className="text-sm text-gray-600">
            {message}
          </p>

          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className={`bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full animate-pulse`} style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Tool-specific Tips */}
          <div className="mt-4 text-xs text-gray-500">
            {type === 'brand-strategy' && '💡 Tip: Have your brand metrics and industry info ready'}
            {type === 'pr-campaign' && '📢 Tip: Prepare your campaign objectives and target media'}
            {type === 'brand-assets' && '🎨 Tip: Think about your brand colors and style preferences'}
            {type === 'media-relations' && '👥 Tip: Consider your key journalist contacts and relationships'}
            {type === 'default' && '🚀 Professional tools loading...'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingLoadingState;
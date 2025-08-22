'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  Play,
  Pause,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { ProgressBar as Progress } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
// Helper function to format Indian price
const formatIndianPrice = (price: number) => {
  return price.toLocaleString('en-IN');
};

interface MobileCourseCardProps {
  product: {
    code: string;
    title: string;
    shortTitle?: string;
    description: string;
    price: number;
    hasAccess: boolean;
    progress?: number;
    estimatedDays?: number;
    currentDay?: number;
    category?: string;
    icon?: React.ReactNode;
    isActive?: boolean;
    isPaused?: boolean;
  };
  onActionClick?: () => void;
}

export const MobileCourseCard: React.FC<MobileCourseCardProps> = ({ 
  product, 
  onActionClick 
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onActionClick) {
      onActionClick();
    } else if (product.hasAccess) {
      router.push(`/products/${product.code.toLowerCase()}`);
    } else {
      router.push(`/demo/${product.code.toLowerCase()}`);
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'foundation': return 'bg-blue-500';
      case 'funding': return 'bg-green-500';
      case 'legal': return 'bg-purple-500';
      case 'growth': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = () => {
    if (!product.hasAccess) return null;
    
    if (product.progress === 100) {
      return <Badge variant="success" size="sm">Completed</Badge>;
    } else if (product.isActive) {
      return <Badge variant="default" size="sm">Active</Badge>;
    } else if (product.isPaused) {
      return <Badge variant="warning" size="sm">Paused</Badge>;
    }
    return null;
  };

  return (
    <Card 
      className="overflow-hidden touch-manipulation active:scale-[0.98] transition-transform"
      onClick={handleClick}
    >
      {/* Header with Category Color */}
      <div className={`h-2 ${getCategoryColor(product.category)}`} />
      
      <div className="p-4">
        {/* Title and Status */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {product.icon && (
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {product.icon}
                </div>
              )}
              <Text weight="medium" size="sm" className="line-clamp-1">
                {product.shortTitle || product.title}
              </Text>
            </div>
            {getStatusBadge()}
          </div>
          
          {!product.hasAccess && (
            <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
        </div>

        {/* Progress Section */}
        {product.hasAccess && product.progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <Text size="xs" color="muted">
                {product.currentDay ? `Day ${product.currentDay}` : 'Progress'}
              </Text>
              <Text size="xs" weight="medium">
                {Math.round(product.progress)}%
              </Text>
            </div>
            <Progress value={product.progress} className="h-2" />
          </div>
        )}

        {/* Description */}
        <Text size="xs" color="muted" className="line-clamp-2 mb-3">
          {product.description}
        </Text>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {product.hasAccess ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <Text size="xs" color="muted">
                    {product.estimatedDays}d
                  </Text>
                </div>
                {product.progress === 100 && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
              </div>
              <Button size="sm" variant="ghost" className="gap-1 text-xs px-2 py-1">
                {product.isActive ? 'Continue' : 'Start'}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </>
          ) : (
            <>
              <Text size="sm" weight="bold">
                ₹{formatIndianPrice(product.price)}
              </Text>
              <Button size="sm" variant="primary" className="gap-1 text-xs px-2 py-1">
                Demo
                <Play className="w-3 h-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

// List view variant for mobile
export const MobileCourseListItem: React.FC<MobileCourseCardProps> = ({ 
  product, 
  onActionClick 
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onActionClick) {
      onActionClick();
    } else if (product.hasAccess) {
      router.push(`/products/${product.code.toLowerCase()}`);
    } else {
      router.push(`/demo/${product.code.toLowerCase()}`);
    }
  };

  return (
    <div 
      className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:shadow-sm active:scale-[0.98] transition-all"
      onClick={handleClick}
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
        {product.icon || <BookOpen className="w-6 h-6 text-gray-600" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Text weight="medium" size="sm" className="truncate">
            {product.shortTitle || product.title}
          </Text>
          {product.hasAccess && product.progress === 100 && (
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          )}
        </div>
        
        {product.hasAccess && product.progress !== undefined ? (
          <div className="flex items-center gap-2">
            <Progress value={product.progress} className="h-1.5 flex-1" />
            <Text size="xs" color="muted">
              {Math.round(product.progress)}%
            </Text>
          </div>
        ) : (
          <Text size="xs" color="muted">
            ₹{formatIndianPrice(product.price)} • {product.estimatedDays} days
          </Text>
        )}
      </div>

      {/* Action */}
      {product.hasAccess ? (
        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      ) : (
        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
      )}
    </div>
  );
};
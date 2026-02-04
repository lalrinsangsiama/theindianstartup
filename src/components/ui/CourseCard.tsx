import * as React from 'react';
import { cn } from '@/lib/cn';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import { 
  Clock, 
  Users, 
  CheckCircle, 
  Lock, 
  Star, 
  TrendingUp,
  ArrowRight,
  Play
} from 'lucide-react';

interface CourseCardProps {
  course: {
    code: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    modules: number;
    category: string;
    hasAccess?: boolean;
    progress?: number;
    rating?: number;
    students?: number;
    icon?: React.ReactNode;
    isPopular?: boolean;
    isNew?: boolean;
  };
  variant?: 'default' | 'compact' | 'featured';
  onSelect?: () => void;
  onPreview?: () => void;
  onPurchase?: () => void;
  showProgress?: boolean;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  variant = 'default',
  onSelect,
  onPreview,
  onPurchase,
  showProgress = true,
  className
}) => {
  const {
    code,
    title,
    description,
    price,
    duration,
    modules,
    category,
    hasAccess,
    progress = 0,
    rating,
    students,
    icon,
    isPopular,
    isNew
  } = course;

  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
  
  const handleCardClick = () => {
    if (hasAccess && onSelect) {
      onSelect();
    } else if (!hasAccess && onPurchase) {
      onPurchase();
    }
  };

  const variants = {
    default: 'p-6',
    compact: 'p-4',
    featured: 'p-8 border-2 border-black shadow-lg'
  };

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden transition-all duration-300 cursor-pointer',
        'hover:shadow-lg hover:-translate-y-1',
        hasAccess ? 'border-green-200 bg-green-50/30' : 'border-gray-200',
        variant === 'featured' && 'ring-2 ring-black',
        className
      )}
      onClick={handleCardClick}
    >
      {/* Badges */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        {isPopular && (
          <Badge className="bg-orange-500 text-white">Most Popular</Badge>
        )}
        {isNew && (
          <Badge className="bg-blue-500 text-white">New</Badge>
        )}
        {hasAccess && (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Owned
          </Badge>
        )}
      </div>

      <CardContent className={variants[variant]}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              hasAccess ? 'bg-green-500 text-white' : 'bg-black text-white'
            )}>
              {icon || <TrendingUp className="w-6 h-6" />}
            </div>
            <div>
              <Badge variant="outline" size="sm" className="mb-2">
                {code}
              </Badge>
              <div className="text-xs text-gray-500">{category}</div>
            </div>
          </div>
          
          {!hasAccess && (
            <div className="text-right">
              <Text className="text-2xl font-bold">{formatPrice(price)}</Text>
              <Text size="xs" color="muted">{duration}</Text>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-black transition-colors">
            {title}
          </h3>
          <Text size="sm" color="muted" className="line-clamp-2 mb-4">
            {description}
          </Text>
          
          {/* Meta info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{modules} modules</span>
            </div>
          </div>

          {/* Progress bar for owned courses */}
          {hasAccess && showProgress && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}% complete</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {hasAccess ? (
            <>
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect?.();
                }}
              >
                {progress > 0 ? 'Continue' : 'Start'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {onPreview && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview();
                  }}
                >
                  <Play className="w-4 h-4" />
                </Button>
              )}
            </>
          ) : (
            <>
              {onPreview && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview();
                  }}
                >
                  Preview
                </Button>
              )}
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onPurchase?.();
                }}
              >
                {variant === 'featured' ? 'Get Started' : 'Buy Now'}
              </Button>
            </>
          )}
        </div>

      </CardContent>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

// Grid container for course cards
export const CourseGrid: React.FC<{
  courses: any[];
  variant?: 'default' | 'compact';
  columns?: 1 | 2 | 3 | 4;
  onCourseSelect?: (course: any) => void;
  onCoursePreview?: (course: any) => void;
  onCoursePurchase?: (course: any) => void;
  className?: string;
}> = ({
  courses,
  variant = 'default',
  columns = 3,
  onCourseSelect,
  onCoursePreview,
  onCoursePurchase,
  className
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={cn(
      'grid gap-6',
      gridCols[columns],
      className
    )}>
      {courses.map((course) => (
        <CourseCard
          key={course.code}
          course={course}
          variant={variant}
          onSelect={() => onCourseSelect?.(course)}
          onPreview={() => onCoursePreview?.(course)}
          onPurchase={() => onCoursePurchase?.(course)}
        />
      ))}
    </div>
  );
};
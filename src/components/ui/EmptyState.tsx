'use client';

import React from 'react';
import { Button } from './Button';
import { Text, Heading } from './Typography';
import { 
  Package, 
  Search, 
  Users, 
  FileText, 
  Trophy,
  MessageSquare,
  BookOpen,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  type?: 'no-courses' | 'no-results' | 'no-community' | 'no-portfolio' | 'no-achievements' | 'error' | 'custom';
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

interface EmptyStateConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
}

const emptyStateConfigs: Record<string, EmptyStateConfig> = {
  'no-courses': {
    icon: <BookOpen className="w-12 h-12 text-gray-400" />,
    title: "No Courses Yet",
    description: "Start your entrepreneurial journey with our comprehensive courses",
    actionLabel: "Browse Courses",
    actionHref: "/pricing"
  },
  'no-results': {
    icon: <Search className="w-12 h-12 text-gray-400" />,
    title: "No Results Found",
    description: "Try adjusting your search or filters to find what you're looking for",
    actionLabel: "Clear Filters"
  },
  'no-community': {
    icon: <Users className="w-12 h-12 text-gray-400" />,
    title: "No Posts Yet",
    description: "Be the first to start a discussion in the community",
    actionLabel: "Create Post"
  },
  'no-portfolio': {
    icon: <Briefcase className="w-12 h-12 text-gray-400" />,
    title: "Portfolio Not Started",
    description: "Complete course activities to build your portfolio automatically",
    actionLabel: "Start Learning",
    actionHref: "/pricing"
  },
  'no-achievements': {
    icon: <Trophy className="w-12 h-12 text-gray-400" />,
    title: "No Achievements Yet",
    description: "Complete lessons and earn XP to unlock achievements",
    actionLabel: "View Courses",
    actionHref: "/pricing"
  },
  'error': {
    icon: <AlertCircle className="w-12 h-12 text-red-400" />,
    title: "Something Went Wrong",
    description: "We couldn't load this content. Please try again later.",
    actionLabel: "Retry"
  }
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'custom',
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  icon,
  className = ''
}) => {
  const config: EmptyStateConfig | null = type !== 'custom' ? emptyStateConfigs[type] : null;

  const finalTitle = title || config?.title || "No Data Available";
  const finalDescription = description || config?.description || "There's nothing to display here yet";
  const finalActionLabel = actionLabel || config?.actionLabel;
  const finalActionHref = actionHref || config?.actionHref;
  const finalIcon = icon || config?.icon || <Package className="w-12 h-12 text-gray-400" />;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {finalIcon}
      </div>
      <Heading as="h3" variant="h5" className="mb-2 text-center">
        {finalTitle}
      </Heading>
      <Text color="muted" className="mb-6 text-center max-w-sm">
        {finalDescription}
      </Text>
      {finalActionLabel && (
        finalActionHref ? (
          <Link href={finalActionHref}>
            <Button variant="primary">
              {finalActionLabel}
            </Button>
          </Link>
        ) : (
          <Button variant="primary" onClick={onAction}>
            {finalActionLabel}
          </Button>
        )
      )}
    </div>
  );
};

// Loading Skeleton Components
export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white border-2 border-gray-200 rounded-lg p-6 animate-pulse ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="space-y-2">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      ))}
    </div>
  );
};

export const ContentSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>
      <div className="space-y-2 mt-6">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    </div>
  );
};

// Loading Spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-black rounded-full animate-spin`}></div>
    </div>
  );
};

// Page Loading State
export const PageLoading: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <LoadingSpinner size="lg" className="mb-4" />
      <Text color="muted">{message}</Text>
    </div>
  );
};
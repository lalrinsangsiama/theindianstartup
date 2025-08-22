import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  showHome = true,
  className 
}) => {
  const allItems = showHome 
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn('flex items-center space-x-1 text-sm', className)}
    >
      <ol className="flex items-center space-x-1">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = index === 0 && showHome;
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              
              {isLast || !item.href ? (
                <span 
                  className={cn(
                    'flex items-center',
                    isLast 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-500'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isHome && <Home className="w-4 h-4 mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center text-gray-500 hover:text-gray-700 transition-colors',
                    'hover:underline underline-offset-2'
                  )}
                >
                  {isHome && <Home className="w-4 h-4 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Helper hook to generate breadcrumbs from pathname
export const useBreadcrumbs = (
  customPaths?: Record<string, string>
) => {
  const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      // Custom path mapping
      const customLabel = customPaths?.[currentPath];
      
      // Default label formatting
      const defaultLabel = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      
      breadcrumbs.push({
        label: customLabel || defaultLabel,
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  return { generateBreadcrumbs };
};

// Course-specific breadcrumb component
export const CourseBreadcrumbs: React.FC<{
  courseName: string;
  lessonTitle?: string;
  className?: string;
}> = ({ courseName, lessonTitle, className }) => {
  const items: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Courses', href: '/pricing' },
    { label: courseName, href: lessonTitle ? undefined : '#' },
  ];
  
  if (lessonTitle) {
    items.push({ label: lessonTitle, current: true });
  }
  
  return <Breadcrumbs items={items} showHome={false} className={className} />;
};

// Progress indicator breadcrumbs for courses
export const ProgressBreadcrumbs: React.FC<{
  totalSteps: number;
  currentStep: number;
  stepLabels?: string[];
  onStepClick?: (step: number) => void;
  className?: string;
}> = ({ 
  totalSteps, 
  currentStep, 
  stepLabels, 
  onStepClick,
  className 
}) => {
  return (
    <nav 
      aria-label="Progress" 
      className={cn('flex items-center justify-center', className)}
    >
      <ol className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCurrent = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = onStepClick && stepNumber <= currentStep;
          
          const stepElement = (
            <div
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors',
                isCurrent && 'bg-black text-white',
                isCompleted && 'bg-green-500 text-white',
                !isCurrent && !isCompleted && 'bg-gray-200 text-gray-600',
                isClickable && 'cursor-pointer hover:bg-gray-300'
              )}
              onClick={isClickable ? () => onStepClick(stepNumber) : undefined}
            >
              {isCompleted ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                stepNumber
              )}
            </div>
          );
          
          return (
            <li key={stepNumber} className="flex items-center">
              {stepElement}
              {stepLabels?.[index] && (
                <span className="ml-2 text-sm text-gray-600 hidden sm:inline">
                  {stepLabels[index]}
                </span>
              )}
              {stepNumber < totalSteps && (
                <div className="w-12 h-0.5 bg-gray-200 ml-4" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
import React from 'react';
import { Loader2 } from 'lucide-react';

// Common loading spinner
export const LoadingSpinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}> = ({ size = 'md', className = '', message }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </div>
  );
};

// Full page loading state
export const PageLoading: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" message={message} />
    </div>
  );
};

// Section loading state
export const SectionLoading: React.FC<{ 
  height?: string;
  message?: string;
}> = ({ height = 'h-64', message }) => {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <LoadingSpinner size="md" message={message} />
    </div>
  );
};

// Skeleton loader for cards
export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </>
  );
};

// Table skeleton loader
export const TableSkeleton: React.FC<{ rows?: number; cols?: number }> = ({ 
  rows = 5, 
  cols = 4 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
      </div>
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="p-4">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-100">
              {Array.from({ length: cols }).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// List skeleton loader
export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg animate-pulse">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Button loading state
export const ButtonLoading: React.FC<{ 
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}> = ({ children, isLoading, loadingText = 'Loading...', className = '' }) => {
  if (!isLoading) return <>{children}</>;
  
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Loader2 className="w-4 h-4 animate-spin" />
      {loadingText}
    </span>
  );
};
import React from 'react';
import { AlertCircle, RefreshCw, XCircle, AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui';
import Link from 'next/link';

// Common error display
export const ErrorMessage: React.FC<{
  title?: string;
  message: string;
  type?: 'error' | 'warning' | 'info';
  className?: string;
}> = ({ 
  title, 
  message, 
  type = 'error',
  className = '' 
}) => {
  const styles = {
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: XCircle
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertTriangle
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: AlertCircle
    }
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${style.text} mt-0.5`} />
        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold ${style.text} mb-1`}>{title}</h3>
          )}
          <p className={`text-sm ${style.text}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

// Page level error state
export const PageError: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}> = ({ 
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  showHomeButton = true
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3 justify-center">
          {onRetry && (
            <Button onClick={onRetry} variant="primary">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          {showHomeButton && (
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Empty state component
export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}> = ({ icon, title, message, action, className = '' }) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      {icon && (
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {message && (
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{message}</p>
      )}
      
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

// Network error component
export const NetworkError: React.FC<{
  onRetry?: () => void;
}> = ({ onRetry }) => {
  return (
    <ErrorMessage
      type="error"
      title="Network Error"
      message="Unable to connect to the server. Please check your internet connection and try again."
    />
  );
};

// Permission denied error
export const PermissionError: React.FC<{
  message?: string;
}> = ({ message = 'You do not have permission to access this resource.' }) => {
  return (
    <ErrorMessage
      type="error"
      title="Access Denied"
      message={message}
    />
  );
};

// Form validation errors
export const ValidationErrors: React.FC<{
  errors: string[];
  className?: string;
}> = ({ errors, className = '' }) => {
  if (errors.length === 0) return null;

  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-red-800 mb-2">Please fix the following errors:</p>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
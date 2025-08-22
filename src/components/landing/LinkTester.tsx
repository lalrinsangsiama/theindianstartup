'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Eye } from 'lucide-react';
import { validateAllLinks, generateLinkReport, type LinkValidationResult } from '@/lib/link-validator';

interface LinkTesterProps {
  showInDevelopment?: boolean;
}

export const LinkTester: React.FC<LinkTesterProps> = ({ showInDevelopment = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<LinkValidationResult[]>([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    // Only show in development mode or when explicitly enabled
    setIsVisible(process.env.NODE_ENV === 'development' && showInDevelopment);
  }, [showInDevelopment]);

  const runTests = async () => {
    setIsLoading(true);
    try {
      const validationResults = await validateAllLinks();
      setResults(validationResults);
    } catch (error) {
      console.error('Error running link tests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testSpecificLink = (url: string) => {
    if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Visual indicator
        element.classList.add('bg-yellow-100', 'border-2', 'border-yellow-400');
        setTimeout(() => {
          element.classList.remove('bg-yellow-100', 'border-2', 'border-yellow-400');
        }, 2000);
      } else {
        alert(`Anchor ${url} not found!`);
      }
    } else if (url.startsWith('mailto:')) {
      window.open(url);
    } else {
      // Test navigation in a new tab to avoid losing current state
      window.open(url, '_blank');
    }
  };

  if (!isVisible) return null;

  const validCount = results.filter(r => r.status === 'valid').length;
  const invalidCount = results.filter(r => r.status === 'invalid').length;
  const errorCount = results.filter(r => r.status === 'error').length;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-white shadow-lg border-2">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Text weight="bold" size="sm">🔗 Link Tester</Text>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="p-1"
            >
              ×
            </Button>
          </div>

          <div className="space-y-2">
            <Button
              variant="primary"
              size="sm"
              onClick={runTests}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Testing Links...' : 'Test All Links'}
            </Button>

            {results.length > 0 && (
              <>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    {validCount}
                  </div>
                  <div className="flex items-center gap-1 text-red-600">
                    <XCircle className="w-3 h-3" />
                    {invalidCount}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-600">
                    <AlertCircle className="w-3 h-3" />
                    {errorCount}
                  </div>
                </div>

                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-xs p-1 rounded"
                    >
                      <span className="truncate flex-1 mr-2" title={result.url}>
                        {result.url}
                      </span>
                      <div className="flex items-center gap-1">
                        {result.status === 'valid' && (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        )}
                        {result.status === 'invalid' && (
                          <XCircle className="w-3 h-3 text-red-500" />
                        )}
                        {result.status === 'error' && (
                          <AlertCircle className="w-3 h-3 text-yellow-500" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => testSpecificLink(result.url)}
                          className="p-0 h-4 w-4"
                          title="Test this link"
                        >
                          <ExternalLink className="w-2 h-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowReport(!showReport)}
                  className="w-full text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {showReport ? 'Hide Report' : 'Show Report'}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {showReport && (
        <Card className="mt-2 bg-white shadow-lg border-2 max-h-64 overflow-y-auto">
          <div className="p-4">
            <Text weight="bold" size="sm" className="mb-2">Link Report</Text>
            <pre className="text-xs whitespace-pre-wrap">
              {generateLinkReport()}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
};

// Quick test buttons for key user flows
export const QuickLinkTest: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible) return null;

  const testUserFlow = (flowName: string, steps: string[]) => {
    console.group(`🚀 Testing User Flow: ${flowName}`);
    steps.forEach((step, index) => {
      console.log(`Step ${index + 1}: ${step}`);
    });
    console.groupEnd();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Card className="bg-white shadow-lg border-2">
        <div className="p-3">
          <Text weight="bold" size="sm" className="mb-2">🧪 Flow Tests</Text>
          <div className="space-y-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => testUserFlow('New User Signup', [
                'Click Get Started',
                'Choose product/bundle',
                'Complete signup',
                'Email verification',
                'Onboarding flow',
                'Dashboard access'
              ])}
            >
              Test Signup Flow
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => testUserFlow('Purchase Flow', [
                'View pricing',
                'Add to cart',
                'Checkout',
                'Payment',
                'Access granted'
              ])}
            >
              Test Purchase Flow
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => testUserFlow('Content Access', [
                'Login',
                'Dashboard',
                'Course access',
                'Lesson completion',
                'Portfolio update'
              ])}
            >
              Test Content Flow
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
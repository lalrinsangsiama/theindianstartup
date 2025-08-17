'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Heading } from '../../components/ui/Typography';
import { Text } from '../../components/ui/Typography';

interface BreakpointInfo {
  name: string;
  width: number;
  active: boolean;
}

const breakpoints: BreakpointInfo[] = [
  { name: 'xs', width: 320, active: false },
  { name: 'sm', width: 640, active: false },
  { name: 'md', width: 768, active: false },
  { name: 'lg', width: 1024, active: false },
  { name: 'xl', width: 1280, active: false },
  { name: '2xl', width: 1536, active: false },
];

export function ResponsiveTest() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = useState('');
  const [orientation, setOrientation] = useState('');
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      setDevicePixelRatio(window.devicePixelRatio || 1);
      
      // Determine current breakpoint
      let current = 'xs';
      if (width >= 1536) current = '2xl';
      else if (width >= 1280) current = 'xl';
      else if (width >= 1024) current = 'lg';
      else if (width >= 768) current = 'md';
      else if (width >= 640) current = 'sm';
      
      setCurrentBreakpoint(current);
      
      // Determine orientation
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const testElements = [
    {
      component: 'Button',
      tests: [
        'Primary button renders correctly',
        'Secondary button renders correctly',
        'Button text is readable',
        'Button is touchable (min 44px)',
      ],
    },
    {
      component: 'Navigation',
      tests: [
        'Mobile menu toggle works',
        'Navigation items are accessible',
        'Dropdowns work on touch devices',
        'Logo is visible and proportional',
      ],
    },
    {
      component: 'Forms',
      tests: [
        'Input fields are properly sized',
        'Labels are visible',
        'Form validation messages show',
        'Submit buttons are accessible',
      ],
    },
    {
      component: 'Cards',
      tests: [
        'Cards stack properly on mobile',
        'Card content is readable',
        'Card actions are touchable',
        'Images scale correctly',
      ],
    },
    {
      component: 'Typography',
      tests: [
        'Headings scale appropriately',
        'Body text is readable (min 16px)',
        'Line height provides good readability',
        'Text doesn\'t overflow containers',
      ],
    },
  ];

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white"
        size="sm"
      >
        Test Responsive
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Heading>Responsive Design Test</Heading>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              ✕
            </Button>
          </div>

          {/* Current Device Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded">
              <Text size="sm" weight="medium" className="text-blue-900">Screen Size</Text>
              <Text size="sm" className="text-blue-700">
                {windowSize.width} × {windowSize.height}
              </Text>
            </div>
            <div className="bg-green-50 p-3 rounded">
              <Text size="sm" weight="medium" className="text-green-900">Breakpoint</Text>
              <Text size="sm" className="text-green-700">{currentBreakpoint}</Text>
            </div>
            <div className="bg-purple-50 p-3 rounded">
              <Text size="sm" weight="medium" className="text-purple-900">Orientation</Text>
              <Text size="sm" className="text-purple-700">{orientation}</Text>
            </div>
            <div className="bg-orange-50 p-3 rounded">
              <Text size="sm" weight="medium" className="text-orange-900">Pixel Ratio</Text>
              <Text size="sm" className="text-orange-700">{devicePixelRatio}x</Text>
            </div>
          </div>

          {/* Breakpoint Indicators */}
          <div className="mb-6">
            <Text weight="medium" className="mb-3">Breakpoint Status</Text>
            <div className="flex flex-wrap gap-2">
              {breakpoints.map((bp) => (
                <div
                  key={bp.name}
                  className={`px-3 py-1 rounded text-sm ${
                    currentBreakpoint === bp.name
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {bp.name} ({bp.width}px+)
                </div>
              ))}
            </div>
          </div>

          {/* Component Tests */}
          <div className="space-y-6">
            <Text weight="medium">Component Responsiveness Checklist</Text>
            
            {testElements.map((element) => (
              <div key={element.component} className="border rounded-lg p-4">
                <Text weight="medium" className="mb-3">{element.component}</Text>
                <div className="space-y-2">
                  {element.tests.map((test, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                      <Text size="sm">{test}</Text>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Touch Target Test */}
          <div className="mt-6 p-4 border rounded-lg">
            <Text weight="medium" className="mb-3">Touch Target Test</Text>
            <Text size="sm" className="mb-4 text-gray-600">
              Test that interactive elements are at least 44px × 44px for good touch accessibility.
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="h-11 w-full bg-green-500 text-white rounded text-sm">
                44px High ✓
              </button>
              <button className="h-8 w-full bg-red-500 text-white rounded text-sm">
                32px High ✗
              </button>
              <button className="h-12 w-full bg-blue-500 text-white rounded text-sm">
                48px High ✓
              </button>
              <button className="h-6 w-full bg-red-500 text-white rounded text-xs">
                24px High ✗
              </button>
            </div>
          </div>

          {/* Text Readability Test */}
          <div className="mt-6 p-4 border rounded-lg">
            <Text weight="medium" className="mb-3">Text Readability Test</Text>
            <div className="space-y-3">
              <div>
                <Text size="xs" className="text-gray-500">12px - Too small for body text</Text>
                <p style={{ fontSize: '12px' }}>
                  This text is 12px and may be too small for comfortable reading on mobile devices.
                </p>
              </div>
              <div>
                <Text size="sm" className="text-gray-500">14px - Minimum for body text</Text>
                <p style={{ fontSize: '14px' }}>
                  This text is 14px, which is generally the minimum size for body text.
                </p>
              </div>
              <div>
                <Text className="text-gray-500">16px - Recommended body text</Text>
                <p style={{ fontSize: '16px' }}>
                  This text is 16px, which is the recommended size for body text on mobile.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              onClick={() => window.open('https://search.google.com/test/mobile-friendly', '_blank')}
              variant="outline"
              size="sm"
            >
              Google Mobile Test
            </Button>
            <Button
              onClick={() => window.open('https://web.dev/measure/', '_blank')}
              variant="outline"
              size="sm"
            >
              PageSpeed Insights
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  `Screen: ${windowSize.width}×${windowSize.height}, ` +
                  `Breakpoint: ${currentBreakpoint}, ` +
                  `Orientation: ${orientation}, ` +
                  `DPR: ${devicePixelRatio}`
                );
              }}
              variant="outline"
              size="sm"
            >
              Copy Device Info
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Hook to check if current breakpoint matches
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('md');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) setBreakpoint('2xl');
      else if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else if (width >= 640) setBreakpoint('sm');
      else setBreakpoint('xs');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
  };
}
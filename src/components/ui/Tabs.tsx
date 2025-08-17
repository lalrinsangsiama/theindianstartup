'use client';

import * as React from 'react';
import { cn } from '../lib/cn';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    
    const activeTab = value ?? internalValue;
    const setActiveTab = React.useCallback(
      (newValue: string) => {
        if (value === undefined) {
          setInternalValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [value, onValueChange]
    );
    
    return (
      <TabsContext.Provider value={{ activeTab, setActiveTab }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center justify-start gap-1 border-b-2 border-gray-200 w-full',
        className
      )}
      {...props}
    />
  )
);

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error('TabsTrigger must be used within Tabs');
    }
    
    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;
    
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        className={cn(
          'relative px-4 py-2 font-heading font-medium text-sm uppercase tracking-wider transition-all duration-200',
          'hover:text-black focus:outline-none focus:text-black',
          isActive ? 'text-black' : 'text-gray-500',
          'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
          'after:bg-black after:transform after:scale-x-0 after:transition-transform after:duration-200',
          isActive && 'after:scale-x-100',
          className
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error('TabsContent must be used within Tabs');
    }
    
    const { activeTab } = context;
    const isActive = activeTab === value;
    
    if (!isActive) return null;
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          'mt-6 animate-fade-in',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
/**
 * Accessibility utilities and helpers
 * Provides consistent ARIA labels, roles, and accessibility features
 */

import React from 'react';

// Common ARIA label generators
export const ariaLabels = {
  // Navigation
  navigation: (section: string) => `${section} navigation`,
  breadcrumb: () => 'Breadcrumb navigation',
  pagination: () => 'Pagination navigation',
  
  // Buttons and Actions
  closeModal: () => 'Close modal dialog',
  closeAlert: () => 'Close alert',
  toggleMenu: (isOpen: boolean) => isOpen ? 'Close menu' : 'Open menu',
  toggleSection: (section: string, isExpanded: boolean) => 
    `${isExpanded ? 'Collapse' : 'Expand'} ${section} section`,
  
  // Forms
  requiredField: (fieldName: string) => `${fieldName} (required)`,
  optionalField: (fieldName: string) => `${fieldName} (optional)`,
  formError: (fieldName: string) => `Error in ${fieldName} field`,
  
  // Content
  readMore: (title: string) => `Read more about ${title}`,
  viewDetails: (item: string) => `View details for ${item}`,
  editItem: (item: string) => `Edit ${item}`,
  deleteItem: (item: string) => `Delete ${item}`,
  
  // Progress and Status
  progress: (current: number, total: number) => 
    `Progress: ${current} of ${total} completed`,
  loadingContent: (content: string) => `Loading ${content}`,
  
  // Media
  imageAlt: (description: string) => description,
  videoControls: () => 'Video player controls',
  
  // Tables
  sortColumn: (column: string, direction?: 'asc' | 'desc') => 
    direction ? `Sort ${column} ${direction === 'asc' ? 'ascending' : 'descending'}` 
              : `Sort by ${column}`,
  
  // Search and Filters
  searchResults: (count: number, query: string) => 
    `${count} search results for "${query}"`,
  filterBy: (filter: string) => `Filter by ${filter}`,
  clearFilters: () => 'Clear all filters',
};

// ARIA role constants
export const ariaRoles = {
  // Landmark roles
  banner: 'banner',
  navigation: 'navigation', 
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  search: 'search',
  
  // Widget roles
  button: 'button',
  link: 'link',
  menuitem: 'menuitem',
  tab: 'tab',
  tabpanel: 'tabpanel',
  dialog: 'dialog',
  alertdialog: 'alertdialog',
  tooltip: 'tooltip',
  
  // Structure roles
  list: 'list',
  listitem: 'listitem',
  table: 'table',
  row: 'row',
  cell: 'cell',
  columnheader: 'columnheader',
  rowheader: 'rowheader',
} as const;

// ARIA state helpers
export const ariaStates = {
  expanded: (isExpanded: boolean) => ({ 'aria-expanded': isExpanded }),
  selected: (isSelected: boolean) => ({ 'aria-selected': isSelected }),
  checked: (isChecked: boolean) => ({ 'aria-checked': isChecked }),
  disabled: (isDisabled: boolean) => ({ 'aria-disabled': isDisabled }),
  hidden: (isHidden: boolean) => ({ 'aria-hidden': isHidden }),
  pressed: (isPressed: boolean) => ({ 'aria-pressed': isPressed }),
  current: (current: string | boolean) => ({ 'aria-current': current }),
  live: (politeness: 'polite' | 'assertive' | 'off') => ({ 'aria-live': politeness }),
  describedBy: (id: string) => ({ 'aria-describedby': id }),
  labelledBy: (id: string) => ({ 'aria-labelledby': id }),
  controls: (id: string) => ({ 'aria-controls': id }),
  owns: (id: string) => ({ 'aria-owns': id }),
  hasPopup: (type: 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | boolean) => 
    ({ 'aria-haspopup': type }),
};

// Keyboard navigation helpers
export const keyboardHandlers = {
  // Close on Escape
  escapeToClose: (onClose: () => void) => (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  },
  
  // Arrow navigation for lists/menus
  arrowNavigation: (
    items: Element[],
    currentIndex: number,
    onChange: (index: number) => void
  ) => (event: KeyboardEvent) => {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      default:
        return;
    }
    
    onChange(newIndex);
    (items[newIndex] as HTMLElement)?.focus();
  },
  
  // Tab trap for modals
  trapFocus: (containerRef: React.RefObject<HTMLElement>) => (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  },
};

// Focus management utilities
export const focusManagement = {
  // Save and restore focus for modals
  saveFocus: () => {
    return document.activeElement as HTMLElement;
  },
  
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },
  
  // Focus first focusable element in container
  focusFirst: (container: HTMLElement) => {
    const focusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    if (focusable) {
      focusable.focus();
    }
  },
  
  // Move focus to element by ID
  focusById: (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.focus();
    }
  },
};

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement is read
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Color contrast utilities
export const colorContrast = {
  // Check if color combination meets WCAG AA standards
  meetsWCAG: (foreground: string, background: string): boolean => {
    // This is a simplified check - for production, use a proper contrast library
    const contrast = calculateContrast(foreground, background);
    return contrast >= 4.5; // WCAG AA standard
  },
  
  // Get recommended text color for background
  getTextColor: (backgroundColor: string): string => {
    const luminance = getLuminance(backgroundColor);
    return luminance > 0.5 ? '#000000' : '#ffffff';
  },
};

// Helper functions for color contrast
function calculateContrast(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function getLuminance(color: string): number {
  // Simplified luminance calculation
  // For production, use a proper color library
  const rgb = hexToRgb(color);
  if (!rgb) return 0;
  
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Skip link component for keyboard navigation
export const SkipLink = ({ href, children }: { href: string; children: string }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-white text-black p-4 font-medium"
    style={{ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: '1px', overflow: 'hidden', position: 'absolute', whiteSpace: 'nowrap', width: '1px' }}
  >
    {children}
  </a>
);

// Visually hidden utility for screen reader only content
export const visuallyHidden = {
  className: 'sr-only',
  style: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    border: 0,
  }
};

// High contrast mode detection
export const detectHighContrast = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for Windows high contrast mode
  if (window.matchMedia) {
    return window.matchMedia('(prefers-contrast: high)').matches ||
           window.matchMedia('(-ms-high-contrast: active)').matches;
  }
  
  return false;
};

// Reduced motion detection
export const detectReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
};

// Accessible form validation
export const formValidation = {
  // Generate error message ID for field
  getErrorId: (fieldName: string) => `${fieldName}-error`,
  
  // Generate description ID for field
  getDescriptionId: (fieldName: string) => `${fieldName}-description`,
  
  // Get ARIA attributes for form field
  getFieldProps: (fieldName: string, hasError: boolean, hasDescription: boolean) => ({
    'aria-invalid': hasError,
    'aria-describedby': [
      hasError ? formValidation.getErrorId(fieldName) : null,
      hasDescription ? formValidation.getDescriptionId(fieldName) : null,
    ].filter(Boolean).join(' ') || undefined,
  }),
};
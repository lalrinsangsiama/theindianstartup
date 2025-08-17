import * as React from 'react';
import { cn } from '../lib/cn';

// Heading Component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as, variant, ...props }, ref) => {
    const Component = as || variant || 'h2';
    const styleVariant = variant || as || 'h2';
    
    const variants = {
      h1: 'text-4xl md:text-5xl lg:text-6xl leading-tight',
      h2: 'text-3xl md:text-4xl leading-tight',
      h3: 'text-2xl md:text-3xl leading-snug',
      h4: 'text-xl md:text-2xl leading-snug',
      h5: 'text-lg md:text-xl',
      h6: 'text-base md:text-lg',
    };
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          'font-heading font-semibold tracking-tight text-black',
          variants[styleVariant],
          className
        )}
        {...props}
      />
    );
  }
);

Heading.displayName = 'Heading';

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'inverse';
  leading?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ 
    className, 
    as: Component = 'p', 
    size = 'base',
    weight = 'normal',
    color = 'default',
    leading = 'normal',
    ...props 
  }, ref) => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };
    
    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };
    
    const colors = {
      default: 'text-gray-900',
      muted: 'text-gray-600',
      inverse: 'text-white',
    };
    
    const leadings = {
      tight: 'leading-tight',
      snug: 'leading-snug',
      normal: 'leading-normal',
      relaxed: 'leading-relaxed',
      loose: 'leading-loose',
    };
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          'font-body',
          sizes[size],
          weights[weight],
          colors[color],
          leadings[leading],
          className
        )}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

// Code Component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'inline' | 'block';
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant = 'inline', ...props }, ref) => {
    if (variant === 'block') {
      return (
        <pre
          ref={ref as any}
          className={cn(
            'font-mono text-sm bg-gray-900 text-white p-4 rounded-lg overflow-x-auto',
            className
          )}
          {...props}
        />
      );
    }
    
    return (
      <code
        ref={ref}
        className={cn(
          'font-mono text-sm bg-gray-100 text-gray-900 px-1 py-0.5 rounded',
          className
        )}
        {...props}
      />
    );
  }
);

Code.displayName = 'Code';

// Quote Component
export interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  cite?: string;
  author?: string;
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  ({ className, cite, author, children, ...props }, ref) => {
    return (
      <blockquote
        ref={ref}
        className={cn(
          'border-l-4 border-gray-300 pl-4 my-4',
          className
        )}
        cite={cite}
        {...props}
      >
        <Text className="italic text-gray-700">
          {children}
        </Text>
        {(author || cite) && (
          <footer className="mt-2">
            <Text size="sm" color="muted">
              — {author}
              {cite && (
                <>
                  , <cite className="italic">{cite}</cite>
                </>
              )}
            </Text>
          </footer>
        )}
      </blockquote>
    );
  }
);

Quote.displayName = 'Quote';

// Label Component
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium text-gray-700',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Heading, Text, Code, Quote, Label };
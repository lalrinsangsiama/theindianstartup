import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  icon?: React.ReactNode;
}

// Map input types to common autocomplete values
const autoCompleteMap: Record<string, string> = {
  email: 'email',
  password: 'current-password',
  tel: 'tel',
  url: 'url',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, helper, error, id, icon, autoComplete, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    // Auto-suggest autocomplete based on input type if not provided
    const resolvedAutoComplete = autoComplete ?? (type ? autoCompleteMap[type] : undefined);

    return (
      <div className="w-full">
        {/* H28 FIX: Corrected text sizing - smaller on mobile, normal on desktop */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            autoComplete={resolvedAutoComplete}
            className={cn(
              "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm md:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus-visible:ring-red-500",
              icon && "pl-10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {helper && !error && (
          <p className="mt-1.5 md:mt-1 text-sm text-gray-600">{helper}</p>
        )}
        {error && (
          <p className="mt-1.5 md:mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

// Checkbox Component
export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          className={cn(
            "h-5 w-5 rounded border border-gray-300 text-black focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label htmlFor={props.id} className="text-sm font-medium leading-none">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
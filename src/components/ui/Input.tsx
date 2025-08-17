'use client';

import * as React from 'react';
import { cn } from '../lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text', 
    label,
    error,
    helper,
    icon,
    iconPosition = 'left',
    id,
    ...props 
  }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasIcon = Boolean(icon);
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {hasIcon && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'input-base px-3 py-2 font-body',
              hasIcon && iconPosition === 'left' && 'pl-10',
              hasIcon && iconPosition === 'right' && 'pr-10',
              error && 'border-red-600 focus:ring-red-600',
              'placeholder:text-gray-400',
              'focus:placeholder:text-gray-500',
              className
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          
          {hasIcon && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helper && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-600">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    error,
    helper,
    id,
    ...props 
  }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'input-base px-3 py-2 font-body min-h-[100px] resize-y',
            error && 'border-red-600 focus:ring-red-600',
            'placeholder:text-gray-400',
            'focus:placeholder:text-gray-500',
            className
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${textareaId}-error` : helper ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helper && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-gray-600">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select Component
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    label,
    error,
    helper,
    placeholder,
    children,
    id,
    ...props 
  }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'input-base px-3 py-2 font-body appearance-none pr-10',
            error && 'border-red-600 focus:ring-red-600',
            className
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? `${selectId}-error` : helper ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        
        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        )}
        
        {helper && !error && (
          <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-gray-600">
            {helper}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Checkbox Component
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'h-4 w-4 text-black border-gray-300 rounded focus:ring-2 focus:ring-black focus:ring-offset-2',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="ml-2 text-sm text-gray-700 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Input, Textarea, Select, Checkbox };
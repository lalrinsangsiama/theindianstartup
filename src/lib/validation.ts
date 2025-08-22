// Common validation functions used across the application

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

// Phone validation (Indian format)
export const validatePhone = (phone: string): string | null => {
  if (!phone) return 'Phone number is required';
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10) return 'Phone number must be 10 digits';
  if (!/^[6-9]/.test(cleanPhone)) return 'Invalid Indian phone number';
  return null;
};

// Password validation
export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return null;
};

// Name validation
export const validateName = (name: string): string | null => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name must be less than 50 characters';
  if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
  return null;
};

// GST number validation (Indian)
export const validateGST = (gst: string): string | null => {
  if (!gst) return 'GST number is required';
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstRegex.test(gst)) return 'Invalid GST number format';
  return null;
};

// PAN number validation (Indian)
export const validatePAN = (pan: string): string | null => {
  if (!pan) return 'PAN number is required';
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan.toUpperCase())) return 'Invalid PAN number format';
  return null;
};

// Aadhaar number validation (Indian)
export const validateAadhaar = (aadhaar: string): string | null => {
  if (!aadhaar) return 'Aadhaar number is required';
  const cleanAadhaar = aadhaar.replace(/\s/g, '');
  if (!/^\d{12}$/.test(cleanAadhaar)) return 'Aadhaar must be 12 digits';
  return null;
};

// URL validation
export const validateURL = (url: string): string | null => {
  if (!url) return null; // URL might be optional
  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL format';
  }
};

// Amount validation
export const validateAmount = (amount: string | number, min?: number, max?: number): string | null => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return 'Invalid amount';
  if (numAmount < 0) return 'Amount cannot be negative';
  if (min !== undefined && numAmount < min) return `Amount must be at least ₹${min}`;
  if (max !== undefined && numAmount > max) return `Amount cannot exceed ₹${max}`;
  return null;
};

// Date validation
export const validateDate = (date: string, minDate?: Date, maxDate?: Date): string | null => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return 'Invalid date';
  if (minDate && dateObj < minDate) return `Date must be after ${minDate.toLocaleDateString()}`;
  if (maxDate && dateObj > maxDate) return `Date must be before ${maxDate.toLocaleDateString()}`;
  return null;
};

// Company name validation
export const validateCompanyName = (name: string): string | null => {
  if (!name) return 'Company name is required';
  if (name.length < 2) return 'Company name must be at least 2 characters';
  if (name.length > 100) return 'Company name must be less than 100 characters';
  return null;
};

// Pincode validation (Indian)
export const validatePincode = (pincode: string): string | null => {
  if (!pincode) return 'Pincode is required';
  if (!/^\d{6}$/.test(pincode)) return 'Pincode must be 6 digits';
  if (pincode.startsWith('0')) return 'Invalid pincode';
  return null;
};

// File validation
export const validateFile = (
  file: File,
  maxSizeMB?: number,
  allowedTypes?: string[]
): string | null => {
  if (!file) return 'File is required';
  
  if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    return `File type must be one of: ${allowedTypes.join(', ')}`;
  }
  
  return null;
};

// Generic required field validation
export const validateRequired = (value: any, fieldName: string): string | null => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

// Length validation
export const validateLength = (
  value: string,
  minLength?: number,
  maxLength?: number,
  fieldName: string = 'Field'
): string | null => {
  if (!value) return null;
  
  if (minLength && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  
  if (maxLength && value.length > maxLength) {
    return `${fieldName} must be less than ${maxLength} characters`;
  }
  
  return null;
};

// Pattern validation
export const validatePattern = (
  value: string,
  pattern: RegExp,
  errorMessage: string
): string | null => {
  if (!value) return null;
  if (!pattern.test(value)) return errorMessage;
  return null;
};

// Form validation helper
export const validateForm = <T extends Record<string, any>>(
  values: T,
  validators: Partial<Record<keyof T, (value: any) => string | null>>
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};
  
  for (const field in validators) {
    const validator = validators[field];
    if (validator) {
      const error = validator(values[field]);
      if (error) {
        errors[field] = error;
      }
    }
  }
  
  return errors;
};

// Check if form has errors
export const hasErrors = (errors: Record<string, any>): boolean => {
  return Object.values(errors).some(error => error !== null && error !== undefined && error !== '');
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Format phone number for display
export const formatPhone = (phone: string): string => {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return phone;
};

// Format amount in Indian currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Custom validation rule builder
export class ValidationRuleBuilder {
  private rules: Array<(value: any) => string | null> = [];
  
  required(message = 'This field is required') {
    this.rules.push((value) => {
      if (value === null || value === undefined || value === '') {
        return message;
      }
      return null;
    });
    return this;
  }
  
  min(minValue: number, message?: string) {
    this.rules.push((value) => {
      if (value !== null && value !== undefined && value < minValue) {
        return message || `Value must be at least ${minValue}`;
      }
      return null;
    });
    return this;
  }
  
  max(maxValue: number, message?: string) {
    this.rules.push((value) => {
      if (value !== null && value !== undefined && value > maxValue) {
        return message || `Value must be at most ${maxValue}`;
      }
      return null;
    });
    return this;
  }
  
  minLength(length: number, message?: string) {
    this.rules.push((value) => {
      if (value && value.length < length) {
        return message || `Must be at least ${length} characters`;
      }
      return null;
    });
    return this;
  }
  
  maxLength(length: number, message?: string) {
    this.rules.push((value) => {
      if (value && value.length > length) {
        return message || `Must be at most ${length} characters`;
      }
      return null;
    });
    return this;
  }
  
  pattern(regex: RegExp, message: string) {
    this.rules.push((value) => {
      if (value && !regex.test(value)) {
        return message;
      }
      return null;
    });
    return this;
  }
  
  custom(validator: (value: any) => string | null) {
    this.rules.push(validator);
    return this;
  }
  
  build() {
    return (value: any): string | null => {
      for (const rule of this.rules) {
        const error = rule(value);
        if (error) return error;
      }
      return null;
    };
  }
}
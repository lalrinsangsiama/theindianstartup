import React from 'react';
import { Mail } from 'lucide-react';
import { Button } from './Button';
import { Text } from './Typography';

interface ContactSupportProps {
  variant?: 'inline' | 'button' | 'full';
  showIcon?: boolean;
  className?: string;
}

export function ContactSupport({ 
  variant = 'inline', 
  showIcon = true,
  className = '' 
}: ContactSupportProps) {
  const email = 'support@theindianstartup.in';
  const subject = 'Help with The Indian Startup';
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

  if (variant === 'inline') {
    return (
      <a 
        href={mailtoLink}
        className={`inline-flex items-center gap-1 text-black font-medium underline hover:no-underline ${className}`}
      >
        {showIcon && <Mail className="w-4 h-4" />}
        Contact support
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a href={mailtoLink}>
        <Button variant="outline" size="sm" className={className}>
          {showIcon && <Mail className="w-4 h-4" />}
          Contact Support
        </Button>
      </a>
    );
  }

  // Full variant with multiple contact options
  return (
    <div className={`space-y-4 ${className}`}>
      <Text weight="medium">Need Help?</Text>
      
      <div className="space-y-3">
        <a
          href={mailtoLink}
          className="flex items-center gap-3 p-3 border border-gray-200 hover:border-black transition-colors"
        >
          <Mail className="w-5 h-5" />
          <div>
            <Text weight="medium">Email Support</Text>
            <Text size="sm" color="muted">{email}</Text>
          </div>
        </a>
      </div>

      <Text size="xs" color="muted">
        Support hours: Monday - Friday, 10 AM - 6 PM IST
      </Text>
    </div>
  );
}

// Quick helper component for common use cases
export function SupportLink({ className = '' }: { className?: string }) {
  return (
    <Text size="sm" color="muted" className={className}>
      Need help?{' '}
      <ContactSupport variant="inline" showIcon={false} />
    </Text>
  );
}

export default ContactSupport;
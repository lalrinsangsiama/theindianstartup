'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import { Star, Quote } from 'lucide-react';

// IMPORTANT: Per the NO FAKE DATA policy in CLAUDE.md, testimonials should ONLY
// be displayed when there is actual verified data. This file provides the
// structure for displaying testimonials once real user feedback is collected.
//
// Until real testimonials are collected, the TESTIMONIALS array should remain empty
// or be populated only with verified, real user feedback.

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  location?: string;
  productCodes: string[];
  quote: string;
  rating?: number;
  verified: boolean;
  dateAdded?: string;
}

// Empty array - to be populated with REAL testimonials only when available
// DO NOT add fake testimonials here
export const TESTIMONIALS: Testimonial[] = [];

interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'full' | 'compact';
  className?: string;
}

export function TestimonialCard({
  testimonial,
  variant = 'full',
  className = ''
}: TestimonialCardProps) {
  const { name, role, company, quote, rating, verified, productCodes } = testimonial;

  if (variant === 'compact') {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <Quote className="w-6 h-6 text-blue-400 flex-shrink-0" />
          <div>
            <Text size="sm" className="italic mb-2 line-clamp-3">&quot;{quote}&quot;</Text>
            <div className="flex items-center gap-2">
              <Text size="xs" weight="medium">{name}</Text>
              {role && <Text size="xs" color="muted">{role}</Text>}
              {verified && (
                <Badge className="bg-green-100 text-green-700 text-xs">Verified</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`}>
      <CardContent>
        <Quote className="w-8 h-8 text-blue-400 mb-4" />
        <Text className="text-lg italic mb-4">&quot;{quote}&quot;</Text>

        {rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <Text weight="semibold">{name}</Text>
            {role && <Text size="sm" color="muted">{role}</Text>}
            {company && <Text size="xs" color="muted">{company}</Text>}
          </div>
          {verified && (
            <Badge className="bg-green-100 text-green-700 text-xs">Verified Purchase</Badge>
          )}
        </div>

        {productCodes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {productCodes.map(code => (
              <Badge key={code} variant="outline" className="text-xs">
                {code}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface TestimonialsGridProps {
  testimonials?: Testimonial[];
  maxDisplay?: number;
  variant?: 'full' | 'compact';
  className?: string;
}

export function TestimonialsGrid({
  testimonials = TESTIMONIALS,
  maxDisplay = 6,
  variant = 'compact',
  className = ''
}: TestimonialsGridProps) {
  // Don't render anything if there are no testimonials
  // This follows the NO FAKE DATA policy
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const displayTestimonials = testimonials.slice(0, maxDisplay);

  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {displayTestimonials.map(testimonial => (
        <TestimonialCard
          key={testimonial.id}
          testimonial={testimonial}
          variant={variant}
        />
      ))}
    </div>
  );
}

// Placeholder component shown when no testimonials are available
export function TestimonialsPlaceholder({ className = '' }: { className?: string }) {
  return (
    <Card className={`p-8 text-center border-dashed border-2 border-gray-200 bg-gray-50 ${className}`}>
      <Quote className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <Text color="muted" className="mb-2">
        Testimonials will appear here once verified reviews are available.
      </Text>
      <Text size="sm" color="muted">
        We only display authentic feedback from real users.
      </Text>
    </Card>
  );
}

// Section component for use in landing pages
// Returns null when no testimonials exist (per NO FAKE DATA policy)
interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  maxDisplay?: number;
  variant?: 'grid' | 'carousel';
  className?: string;
}

export function TestimonialsSection({
  title = 'What Founders Are Saying',
  subtitle,
  testimonials = TESTIMONIALS,
  maxDisplay = 6,
  variant = 'grid',
  className = ''
}: TestimonialsSectionProps) {
  // Don't render the section if there are no testimonials
  // This follows the NO FAKE DATA policy
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const displayTestimonials = testimonials.slice(0, maxDisplay);

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {displayTestimonials.map(testimonial => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            variant="full"
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialsGrid;

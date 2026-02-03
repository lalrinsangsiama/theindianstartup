'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import { Star, Quote, TrendingUp, Award, Users } from 'lucide-react';

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role?: string;
  course: string;
  courseName?: string;
  outcome: string;
  quote: string;
  rating: number;
  avatar?: string;
  fundingRaised?: string;
  savingsAccessed?: string;
  timeToResult?: string;
}

// Sample testimonials data
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    company: 'NutriBox India',
    role: 'Founder & CEO',
    course: 'P7',
    courseName: 'State-wise Scheme Map',
    outcome: 'Accessed ₹45L in state subsidies within 60 days',
    quote: 'The state scheme database alone was worth 10x what I paid. I discovered subsidies I never knew existed for my food processing startup.',
    rating: 5,
    savingsAccessed: '₹45L',
    timeToResult: '60 days'
  },
  {
    id: '2',
    name: 'Rahul Mehta',
    company: 'PayFlow Technologies',
    role: 'Co-founder',
    course: 'P3',
    courseName: 'Funding in India - Complete Mastery',
    outcome: 'Raised ₹2Cr seed round from angel investors',
    quote: 'The pitch deck templates and investor database were game-changers. Closed my round in 45 days with 3 term sheets.',
    rating: 5,
    fundingRaised: '₹2Cr',
    timeToResult: '45 days'
  },
  {
    id: '3',
    name: 'Ananya Reddy',
    company: 'MedAssist',
    role: 'Founder',
    course: 'P1 + P2',
    courseName: 'Launch Sprint + Incorporation Kit',
    outcome: 'Incorporated Pvt Ltd and got DPIIT recognition in 45 days',
    quote: 'Would have taken 6 months and ₹50K with a consultant. The step-by-step process made it foolproof.',
    rating: 5,
    savingsAccessed: '₹50K saved',
    timeToResult: '45 days'
  },
  {
    id: '4',
    name: 'Vikram Patel',
    company: 'GreenWeld Manufacturing',
    role: 'Managing Director',
    course: 'P24',
    courseName: 'Manufacturing & Make in India',
    outcome: 'Applied for PLI scheme worth ₹5Cr',
    quote: 'The compliance checklists saved us from costly mistakes. We qualified for the PLI scheme on our first application.',
    rating: 5,
    fundingRaised: '₹5Cr PLI',
    timeToResult: '90 days'
  },
  {
    id: '5',
    name: 'Sneha Agarwal',
    company: 'LearnSmart EdTech',
    role: 'CEO',
    course: 'ALL_ACCESS',
    courseName: 'All-Access Mastermind',
    outcome: 'Built complete legal, finance, and funding infrastructure',
    quote: 'Best investment I made for my startup. The All-Access bundle covered everything from incorporation to Series A prep.',
    rating: 5,
    fundingRaised: '₹3.5Cr',
    timeToResult: '6 months'
  },
  {
    id: '6',
    name: 'Arjun Krishnamurthy',
    company: 'AgriTech Solutions',
    role: 'Founder',
    course: 'P26',
    courseName: 'AgriTech & Farm-to-Fork',
    outcome: 'Registered FPO with 500+ farmers, accessed ₹35L grant',
    quote: 'The FPO registration process would have taken years without this course. Got it done in 3 months.',
    rating: 5,
    fundingRaised: '₹35L grant',
    timeToResult: '3 months'
  },
  {
    id: '7',
    name: 'Meera Iyer',
    company: 'CarbonNeutral Tech',
    role: 'Co-founder',
    course: 'P15',
    courseName: 'Carbon Credits & Sustainability',
    outcome: 'Generated ₹80L from carbon credit trading in year one',
    quote: 'The Verra VCS verification process was demystified completely. Our first carbon credit issuance happened within 8 months.',
    rating: 5,
    fundingRaised: '₹80L revenue',
    timeToResult: '8 months'
  },
  {
    id: '8',
    name: 'Karthik Sundaram',
    company: 'FinServ Digital',
    role: 'Founder & CEO',
    course: 'P20',
    courseName: 'FinTech Mastery',
    outcome: 'Obtained PA-PG license from RBI in 6 months',
    quote: 'The regulatory compliance roadmap was invaluable. Avoided ₹10L+ in consultant fees and got our license faster.',
    rating: 5,
    savingsAccessed: '₹10L+ saved',
    timeToResult: '6 months'
  }
];

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

// Avatar with initials fallback
function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (avatar) {
    return (
      <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Generate a consistent color based on name
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-red-500'
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;

  return (
    <div
      className={`w-14 h-14 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-semibold text-lg`}
    >
      {initials}
    </div>
  );
}

// Single testimonial card
interface TestimonialCardProps {
  testimonial: Testimonial;
  variant?: 'default' | 'compact' | 'featured';
}

export function TestimonialCard({ testimonial, variant = 'default' }: TestimonialCardProps) {
  const {
    name,
    company,
    role,
    course,
    courseName,
    outcome,
    quote,
    rating,
    avatar,
    fundingRaised,
    savingsAccessed,
    timeToResult
  } = testimonial;

  if (variant === 'compact') {
    return (
      <Card className="border border-gray-200 hover:border-green-300 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar name={name} avatar={avatar} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Text weight="semibold" className="truncate">{name}</Text>
                <StarRating rating={rating} />
              </div>
              <Text size="sm" color="muted" className="truncate">{company}</Text>
              <Text size="sm" className="mt-2 line-clamp-2 text-gray-700">"{quote}"</Text>
              {(fundingRaised || savingsAccessed) && (
                <Badge className="mt-2 bg-green-100 text-green-800">
                  {fundingRaised || savingsAccessed}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-8 h-8 text-green-600" />
            <Badge className="bg-green-600 text-white">Featured Story</Badge>
          </div>

          <Text className="text-lg italic text-gray-700 mb-4">"{quote}"</Text>

          <div className="flex items-center gap-4 mb-4">
            <Avatar name={name} avatar={avatar} />
            <div>
              <Text weight="semibold">{name}</Text>
              <Text size="sm" color="muted">{role} at {company}</Text>
              <StarRating rating={rating} />
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <Text weight="medium" className="text-green-800">Outcome</Text>
            </div>
            <Text className="text-green-700">{outcome}</Text>

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className="bg-blue-100 text-blue-800">{courseName || course}</Badge>
              {timeToResult && (
                <Badge className="bg-purple-100 text-purple-800">{timeToResult}</Badge>
              )}
              {(fundingRaised || savingsAccessed) && (
                <Badge className="bg-green-100 text-green-800">
                  {fundingRaised || savingsAccessed}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar name={name} avatar={avatar} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <Text weight="semibold">{name}</Text>
                <Text size="sm" color="muted">{role ? `${role}, ` : ''}{company}</Text>
              </div>
              <StarRating rating={rating} />
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <Quote className="absolute -top-2 -left-1 w-6 h-6 text-gray-200" />
          <Text className="pl-6 text-gray-700 italic">"{quote}"</Text>
        </div>

        <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-green-600" />
            <Text size="sm" weight="medium" className="text-green-800">{outcome}</Text>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-100 text-blue-800">{courseName || course}</Badge>
          {timeToResult && (
            <Badge className="bg-purple-100 text-purple-800">{timeToResult}</Badge>
          )}
          {(fundingRaised || savingsAccessed) && (
            <Badge className="bg-green-100 text-green-800">
              {fundingRaised || savingsAccessed}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Testimonials grid section
interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  maxDisplay?: number;
  variant?: 'grid' | 'carousel' | 'list';
  showHeader?: boolean;
  filterByCourse?: string;
  className?: string;
}

export function TestimonialsSection({
  title = 'What Founders Are Saying',
  subtitle = 'Real results from founders who completed our courses',
  testimonials = TESTIMONIALS,
  maxDisplay = 4,
  variant = 'grid',
  showHeader = true,
  filterByCourse,
  className = ''
}: TestimonialsSectionProps) {
  // Filter by course if specified
  const filteredTestimonials = filterByCourse
    ? testimonials.filter((t) => t.course.includes(filterByCourse))
    : testimonials;

  const displayTestimonials = filteredTestimonials.slice(0, maxDisplay);

  return (
    <section className={`py-12 ${className}`}>
      {showHeader && (
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-6 h-6 text-green-600" />
            <Text size="lg" weight="semibold" className="text-green-600">
              Trusted by 2,000+ Founders
            </Text>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <Text size="lg" color="muted" className="max-w-2xl mx-auto">
            {subtitle}
          </Text>
        </div>
      )}

      {variant === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}

      {variant === 'list' && (
        <div className="space-y-4 max-w-3xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} variant="compact" />
          ))}
        </div>
      )}

      {variant === 'carousel' && (
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {displayTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 w-[350px] snap-center">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// Get testimonials for a specific course
export function getTestimonialsForCourse(courseCode: string, limit: number = 2): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.course.includes(courseCode)).slice(0, limit);
}

export default TestimonialsSection;

'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle, Shield, Target, Briefcase, BookOpen, TrendingUp } from "lucide-react";
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/icons/Logo';
import { StructuredData } from '@/components/seo/StructuredData';
import { createClient } from '@/lib/supabase/client';
import { TestimonialsSection, TESTIMONIALS } from '@/components/social-proof/FounderTestimonials';
import { TrustBadges, PLATFORM_METRICS } from '@/components/social-proof/PlatformMetrics';
import { User } from '@supabase/supabase-js';

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8 text-black" />
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/pricing" className="text-sm hover:text-black transition-colors hover:underline hidden sm:block">
                Pricing
              </Link>
              {user ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/dashboard')}
                  className="px-6 py-2"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => router.push('/signup')}
                  className="px-6 py-2"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Centered, Clean */}
      <section className="py-16 md:py-24 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              The Complete<br />
              <span className="text-green-600">Startup Education</span> Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              30 comprehensive courses taking you from idea to global expansion. Built specifically for Indian founders.
            </p>

            {/* Primary CTA */}
            <div className="mb-8">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'click_hero_cta', {
                      event_category: 'engagement',
                      event_label: 'hero_explore_courses'
                    });
                  }
                  router.push('/pricing');
                }}
                className="relative inline-flex items-center justify-center group cursor-pointer"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                <span className="relative flex items-center px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Trust Badges - Factual content metrics only */}
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
              <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">{PLATFORM_METRICS.totalCourses} comprehensive courses</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700 bg-purple-50 px-4 py-2 rounded-full">
                <Target className="h-4 w-4" />
                <span className="font-medium">{PLATFORM_METRICS.totalModules} expert modules</span>
              </div>
              <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full">
                <Briefcase className="h-4 w-4" />
                <span className="font-medium">{PLATFORM_METRICS.totalTemplates}+ templates</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4" />
                <span className="font-medium">{PLATFORM_METRICS.moneyBackGuarantee}-day money back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">{PLATFORM_METRICS.totalLessons}+ lessons</span>
              </div>
              <div className="flex items-center gap-2 text-orange-700 bg-orange-50 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">{PLATFORM_METRICS.accessDuration} days access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Cards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-4">
              Why Indian Founders Choose Us
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Comprehensive, practical guidance designed for the Indian startup ecosystem
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Step-by-Step Courses</h3>
                <p className="text-gray-600">
                  From incorporation to funding to global expansion. Clear modules that build on each other.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">Ready-to-Use Templates</h3>
                <p className="text-gray-600">
                  1000+ templates for legal, finance, compliance, pitch decks, and more. Use them immediately.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-3">India-Specific</h3>
                <p className="text-gray-600">
                  GST, MCA, DPIIT, state schemes, and regulations. Built for Indian founders, not adapted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - Brief Summary */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-4">
              What You Get
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Everything to build, fund, and scale your startup
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">30 step-by-step courses</span>
                  <p className="text-sm text-gray-600">From launch to global expansion</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">1000+ templates and tools</span>
                  <p className="text-sm text-gray-600">Ready to use immediately</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">India-specific compliance guides</span>
                  <p className="text-sm text-gray-600">GST, MCA, DPIIT and more</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Investor-ready portfolio builder</span>
                  <p className="text-sm text-gray-600">Builds automatically as you learn</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Lifetime updates</span>
                  <p className="text-sm text-gray-600">Always current with regulations</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Self-paced learning</span>
                  <p className="text-sm text-gray-600">Learn at your own schedule</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/pricing"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                See full course catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <TestimonialsSection
              title="What Founders Are Saying"
              subtitle="Real results from founders who completed our courses"
              testimonials={TESTIMONIALS.slice(0, 4)}
              maxDisplay={4}
              variant="grid"
            />

            <div className="mt-8 text-center">
              <Link
                href="/community/success-stories"
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                Read more success stories <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing Preview */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                <span>All-Access Bundle</span>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-mono font-bold mb-2">₹1,49,999</div>
                <div className="text-green-600 font-medium">Save ₹74,971</div>
              </div>

              <div className="text-gray-600 mb-8">
                30 courses &bull; 1000+ templates &bull; Lifetime access
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push('/pricing')}
                  className="w-full"
                >
                  Get All-Access
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push('/pricing')}
                  className="w-full"
                >
                  View All Pricing
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Or explore individual courses starting at ₹4,999
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">
              3-Day Money-Back Guarantee
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Try risk-free. If you're not completely satisfied with the quality and value,
              we'll refund your purchase. No questions asked.
            </p>

            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'click_guarantee_cta', {
                    event_category: 'engagement',
                    event_label: 'guarantee_get_started'
                  });
                }
                router.push('/pricing');
              }}
            >
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="font-mono text-sm font-semibold">THE INDIAN STARTUP</p>
              <p className="mt-1 text-sm text-gray-600">
                © {new Date().getFullYear()} The Indian Startup
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href="/about" className="text-sm text-gray-600 hover:text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                About
              </a>
              <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                Terms
              </a>
              <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                Privacy
              </a>
              <a href="/refund-policy" className="text-sm text-gray-600 hover:text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                Refunds
              </a>
              <a href="/shipping-delivery" className="text-sm text-gray-600 hover:text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                Shipping
              </a>
              <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Structured Data */}
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <StructuredData type="course" />
      <StructuredData type="product" />
    </div>
  );
}

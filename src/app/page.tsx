'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Rocket, Users, TrendingUp, Clock, Target, BookOpen, IndianRupee, Award, Calendar, Shield, Zap, Briefcase, Sparkles, MapPin } from "lucide-react";
import { Button } from '@/components/ui/Button';
import { StructuredData } from '@/components/seo/StructuredData';
import { createClient } from '@/lib/supabase/client';
import { LinkTester, QuickLinkTest } from '@/components/landing/LinkTester';
import { PaymentButton, BuyNowButton, AllAccessButton } from '@/components/payment/PaymentButton';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  
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
            <Link href="/" className="font-mono text-xl font-bold">
              THE INDIAN STARTUP
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm hover:text-black transition-colors cursor-pointer hover:underline">
                Features
              </a>
              <a href="#value" className="text-sm hover:text-black transition-colors cursor-pointer hover:underline">
                What's Included
              </a>
              <Link href="/pricing" className="text-sm hover:text-black transition-colors hover:underline">
                Pricing
              </Link>
              {user ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-6 py-2"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = '/get-started'}
                  className="px-6 py-2"
                >
                  Get Started
                </Button>
              )}
            </div>
            <div className="md:hidden">
              {user ? (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = '/dashboard'}
                  className="px-4 py-2"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => window.location.href = '/get-started'}
                  className="px-4 py-2"
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-gray-200 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Main Message */}
              <div className="lg:pr-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-2 border-orange-300 text-orange-800 px-4 py-2 text-sm font-bold animate-pulse shadow-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <span>🔥 LIMITED TIME: Save ₹27,989 on All-Access Bundle</span>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                </div>
                <h1 className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  Launch Your Startup in<br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">30 Days</span> or Less
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  The only step-by-step system that takes you from <span className="font-semibold text-gray-900">idea to incorporated business</span> with paying customers.
                  <span className="block mt-2 text-base text-gray-700">✨ Build your investor-ready portfolio automatically as you complete each lesson.</span>
                </p>
                
                {/* Enhanced Social Proof */}
                <div className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">+2K</div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                          <span>₹50Cr+ raised by our alumni</span>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-gray-600 font-medium">89% complete the full program • 4.8/5 rating</div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>2000+ founders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-500" />
                        <span>Since 2023</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      // Track conversion event
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'click_hero_cta', {
                          event_category: 'engagement',
                          event_label: 'hero_get_started'
                        });
                      }
                      window.location.href = '/get-started';
                    }}
                    className="relative inline-flex items-center justify-center group w-full md:w-auto cursor-pointer"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <span className="relative flex items-center px-8 py-4 bg-black text-white rounded-lg text-lg font-semibold">
                      Start Your 30-Day Journey <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-2 rounded-full">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">3-day guarantee</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 bg-blue-50 px-3 py-2 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">Launch in 30 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-700 bg-purple-50 px-3 py-2 rounded-full">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">Join 2000+ founders</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Value Props */}
              <div className="lg:pl-8">
                <div className="grid gap-6">
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Daily Action Plans</h3>
                        <p className="text-sm text-gray-600">Clear daily tasks that build on each other. 30 days to launch-ready startup.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Portfolio Builds Itself</h3>
                        <p className="text-sm text-gray-600">Every activity creates your professional portfolio. Investor-ready by day 30.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">India-Specific Guidance</h3>
                        <p className="text-sm text-gray-600">Templates, regulations, and strategies designed for Indian startup ecosystem.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              <span>Complete Startup Ecosystem</span>
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">
              Everything You Need to Build a Successful Startup
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              From idea validation to IPO readiness - get access to the most comprehensive startup education platform in India
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
              <div className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl font-bold font-mono text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">12</div>
                <p className="text-sm font-semibold text-gray-700">Specialized Products</p>
                <p className="text-xs text-gray-500 mt-1">Complete coverage</p>
              </div>
              <div className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl font-bold font-mono text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
                <p className="text-sm font-semibold text-gray-700">Templates & Tools</p>
                <p className="text-xs text-gray-500 mt-1">Ready to use</p>
              </div>
              <div className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl font-bold font-mono text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">450+</div>
                <p className="text-sm font-semibold text-gray-700">Action Items</p>
                <p className="text-xs text-gray-500 mt-1">Step-by-step</p>
              </div>
              <div className="bg-white p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl font-bold font-mono text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">∞</div>
                <p className="text-sm font-semibold text-gray-700">Portfolio Updates</p>
                <p className="text-xs text-gray-500 mt-1">Lifetime value</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Ready to transform your startup journey?</h3>
                  <p className="text-gray-600">Join thousands of successful Indian founders</p>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/pricing'}
                  >
                    View Pricing
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'click_value_section_cta', {
                          event_category: 'engagement',
                          event_label: 'value_section_get_started'
                        });
                      }
                      window.location.href = '/get-started';
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Get Started Now →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Feature Highlight */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-6">
              <Briefcase className="h-4 w-4" />
              <span>New Feature: Portfolio Builder</span>
            </div>
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-6">
              Build Your Startup Portfolio While You Learn
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Every lesson builds your professional startup portfolio automatically. 
              By the end, you'll have a complete business profile ready to pitch to investors, partners, and customers.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Builds Automatically</h3>
                <p className="text-sm text-gray-600">Complete activities in courses and watch your portfolio grow with each lesson</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Investor Ready</h3>
                <p className="text-sm text-gray-600">Export professional one-pagers, pitch decks, and business model canvas</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Private & Secure</h3>
                <p className="text-sm text-gray-600">Your startup information stays private - no public profiles or directories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-mono text-2xl md:text-3xl font-bold">
              12 Products. Every Challenge Solved.
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              From 30-day launch to IPO readiness. Choose individual products or get the complete ecosystem with our All-Access Bundle.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Target className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                P1-P4: Foundation Bundle
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                30-Day Launch, Incorporation & Compliance, Funding Mastery, Finance Stack - everything to get started.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">₹22,996</span>
                  <span className="text-sm text-gray-500 line-through">₹26,996</span>
                </div>
                <BuyNowButton
                  productCode="FOUNDATION_BUNDLE"
                  size="sm"
                  className="w-full"
                  showPrice={false}
                  customText="Buy Foundation Bundle - ₹22,996"
                  showSavings={false}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    window.location.href = '/pricing#foundation';
                  }}
                >
                  View Individual Products
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Shield className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                P5-P8: Growth Bundle
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Legal Stack, Sales & GTM, State Schemes, Data Room - protect and scale your startup professionally.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">₹27,996</span>
                  <span className="text-sm text-gray-500 line-through">₹32,996</span>
                </div>
                <BuyNowButton
                  productCode="GROWTH_BUNDLE"
                  size="sm"
                  className="w-full"
                  showPrice={false}
                  customText="Buy Growth Bundle - ₹27,996"
                  showSavings={false}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    window.location.href = '/pricing#growth';
                  }}
                >
                  View Individual Products
                </Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <BookOpen className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                P9-P12: Mastery Bundle
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Government Schemes, Patent Strategy, Branding & PR, Marketing Mastery - become industry leaders.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">₹28,996</span>
                  <span className="text-sm text-gray-500 line-through">₹33,996</span>
                </div>
                <BuyNowButton
                  productCode="MASTERY_BUNDLE"
                  size="sm"
                  className="w-full"
                  showPrice={false}
                  customText="Buy Mastery Bundle - ₹28,996"
                  showSavings={false}
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    window.location.href = '/pricing#mastery';
                  }}
                >
                  View Individual Products
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 p-6 md:p-8 rounded-lg transition-all hover:shadow-lg relative">
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                BEST VALUE
              </div>
              <Award className="mb-4 h-8 w-8 text-orange-600" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                All-Access Bundle
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Get all 12 products for the price of 8. Complete startup mastery from idea to IPO.
              </p>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">₹54,999</div>
                  <div className="text-sm text-gray-500 line-through mb-1">₹79,992</div>
                  <div className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">
                    Save ₹24,993 (31% OFF)
                  </div>
                </div>
                <BuyNowButton
                  productCode="ALL_ACCESS"
                  size="sm"
                  className="w-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 hover:from-yellow-500 hover:via-red-600 hover:to-purple-700 text-white font-bold"
                  showPrice={false}
                  customText="🚀 Buy All-Access Bundle - ₹54,999"
                  showSavings={false}
                  ctaStyle="animated"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Users className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                India-Specific Guidance
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Every template, process, and strategy designed specifically for Indian regulations and market conditions.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  window.location.href = '/pricing';
                }}
              >
                View All Products →
              </Button>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Briefcase className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Portfolio Builder
              </h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Professional portfolio that builds itself, investor-ready exports, complete business documents. Grow as you learn.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  if (user) {
                    window.location.href = '/portfolio';
                  } else {
                    window.location.href = '/get-started';
                  }
                }}
              >
                {user ? 'View Your Portfolio' : 'Start Building Portfolio'} →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Ecosystem Overview */}
      <section className="border-t border-gray-200 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">
                Choose Your Path to Success
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each product solves specific startup challenges. Start with what you need most, 
                or get the complete ecosystem with our All-Access Bundle.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center bg-white border-2 border-blue-200 rounded-lg p-6">
                <div className="bg-blue-50 rounded-lg p-6 mb-4">
                  <h3 className="font-mono text-xl font-bold mb-2">Foundation Bundle</h3>
                  <p className="text-gray-600 text-sm mb-4">Launch & Setup</p>
                  <div className="space-y-2 text-sm text-left mb-4">
                    <div>• P1: 30-Day Launch Sprint (₹4,999)</div>
                    <div>• P2: Incorporation & Compliance (₹4,999)</div>
                    <div>• P3: Funding Mastery (₹5,999)</div>
                    <div>• P4: Finance Stack (₹6,999)</div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 line-through">₹22,996 individually</div>
                    <div className="font-mono text-lg font-bold text-blue-600">₹19,999 bundle</div>
                    <div className="text-xs text-green-600 font-semibold">Save ₹2,997</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <BuyNowButton
                    productCode="FOUNDATION_BUNDLE"
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    showPrice={false}
                    customText="Buy Foundation Bundle"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      window.location.href = '/pricing#individual';
                    }}
                  >
                    Buy Individual Products
                  </Button>
                </div>
              </div>

              <div className="text-center bg-white border-2 border-green-200 rounded-lg p-6">
                <div className="bg-green-50 rounded-lg p-6 mb-4">
                  <h3 className="font-mono text-xl font-bold mb-2">Growth Bundle</h3>
                  <p className="text-gray-600 text-sm mb-4">Scale & Protect</p>
                  <div className="space-y-2 text-sm text-left mb-4">
                    <div>• P5: Legal Stack (₹7,999)</div>
                    <div>• P6: Sales & GTM (₹6,999)</div>
                    <div>• P7: State Schemes (₹4,999)</div>
                    <div>• P8: Data Room Mastery (₹9,999)</div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 line-through">₹29,996 individually</div>
                    <div className="font-mono text-lg font-bold text-green-600">₹24,999 bundle</div>
                    <div className="text-xs text-green-600 font-semibold">Save ₹4,997</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <BuyNowButton
                    productCode="GROWTH_BUNDLE"
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700"
                    showPrice={false}
                    customText="Buy Growth Bundle"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      window.location.href = '/pricing#individual';
                    }}
                  >
                    Buy Individual Products
                  </Button>
                </div>
              </div>

              <div className="text-center bg-white border-2 border-purple-200 rounded-lg p-6">
                <div className="bg-purple-50 rounded-lg p-6 mb-4">
                  <h3 className="font-mono text-xl font-bold mb-2">Mastery Bundle</h3>
                  <p className="text-gray-600 text-sm mb-4">Lead & Excel</p>
                  <div className="space-y-2 text-sm text-left mb-4">
                    <div>• P9: Government Schemes (₹4,999)</div>
                    <div>• P10: Patent Strategy (₹7,999)</div>
                    <div>• P11: Branding & PR (₹7,999)</div>
                    <div>• P12: Marketing Mastery (₹9,999)</div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-xs text-gray-500 line-through">₹30,996 individually</div>
                    <div className="font-mono text-lg font-bold text-purple-600">₹24,999 bundle</div>
                    <div className="text-xs text-green-600 font-semibold">Save ₹5,997</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <BuyNowButton
                    productCode="MASTERY_BUNDLE"
                    size="sm"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    showPrice={false}
                    customText="Buy Mastery Bundle"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      window.location.href = '/pricing#individual';
                    }}
                  >
                    Buy Individual Products
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-lg border-4 border-yellow-400 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                LIMITED OFFER
              </div>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-yellow-400/10 rounded-full"></div>
              
              <div className="relative z-10">
                <h3 className="font-mono text-2xl font-bold mb-2">🚀 All-Access Bundle</h3>
                <p className="text-gray-300 mb-4">Get all 12 products + lifetime updates</p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="text-center">
                      <div className="font-bold text-yellow-400">12</div>
                      <div className="text-gray-300">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-yellow-400">1000+</div>
                      <div className="text-gray-300">Templates</div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-gray-600 pt-4">
                    <div className="text-gray-400 text-sm line-through">₹82,988 individually</div>
                    <div className="font-mono text-4xl font-bold mb-2 text-yellow-400">₹54,999</div>
                    <div className="text-green-400 text-sm font-semibold bg-green-900/50 px-2 py-1 rounded-full inline-block">
                      💰 Save ₹27,989 (34% OFF)
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <AllAccessButton 
                    size="lg"
                    showSavings={false}
                    className="w-full"
                  />
                  
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.location.href = '/pricing';
                    }}
                    className="border-white text-white hover:bg-white hover:text-black w-full"
                  >
                    View Individual Products
                  </Button>
                </div>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>3-day money-back</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Instant access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-gray-200 bg-gray-50 py-20" id="value">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-3xl font-bold">
              Complete Information & Guidance for Running Your Startup
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get comprehensive step-by-step guides, templates, and learning resources for every aspect of building your startup:
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {[
                { course: "Business Setup Learning & Templates (P1-P2)", value: "150+ Templates", included: true },
                { course: "Funding Strategy Masterclass & Resources (P3)", value: "200+ Documents", included: true },
                { course: "Finance Management Mastery (P4)", value: "250+ Templates", included: true },
                { course: "Legal Knowledge & Documentation Guide (P5)", value: "300+ Templates", included: true },
                { course: "Sales & Marketing Masterclass (P6)", value: "75+ Templates", included: true },
                { course: "State Schemes Knowledge Guide (P7)", value: "500+ Schemes", included: true },
                { course: "Data Room Mastery Tutorial (P8)", value: "50+ Templates", included: true },
                { course: "Government Schemes Learning Guide (P9)", value: "40+ Resources", included: true },
                { course: "Patent Strategy Mastery (P10)", value: "100+ Templates", included: true },
                { course: "Branding & PR Masterclass (P11)", value: "300+ Templates", included: true },
                { course: "Marketing Mastery Course (P12)", value: "120+ Resources", included: true },
              ].map((item) => (
                <div
                  key={item.course}
                  className="flex items-center justify-between border border-gray-200 bg-white p-6"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <h3 className="font-medium">{item.course}</h3>
                  </div>
                  <span className="font-mono text-sm font-semibold text-accent">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-accent text-white p-8 text-center">
              <p className="text-sm font-medium mb-2">COMPLETE LEARNING ECOSYSTEM</p>
              <p className="font-mono text-4xl font-bold mb-4">1,700+ Resources</p>
              <p className="text-sm mb-6">Templates, Guides, Playbooks & Learning Materials</p>
              <p className="font-mono text-5xl font-bold">₹54,999</p>
              <p className="text-sm mt-2 opacity-90">All-Access Bundle • 12 Products • 1-year access</p>
              <div className="mt-4 text-sm opacity-75">
                Or start with individual learning products from ₹4,999 each
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Journey Preview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-mono text-2xl md:text-3xl font-bold">
              Your 30-Day Learning Journey
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              Each day builds on the previous. By Day 30, you'll have comprehensive knowledge, actionable templates, and a complete startup portfolio.
            </p>
          </div>

          {/* Portfolio Showcase */}
          <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-gray-200">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-4">
                  <Briefcase className="h-4 w-4" />
                  <span>Portfolio Feature</span>
                </div>
                <h3 className="font-mono text-xl font-bold mb-2">See Your Progress in Real-Time</h3>
                <p className="text-gray-600">Watch your startup portfolio come to life as you complete each activity</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h4 className="font-semibold mb-4">Portfolio Completion Progress:</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Idea & Vision', completion: 100, color: 'bg-green-500' },
                        { name: 'Market Research', completion: 85, color: 'bg-blue-500' },
                        { name: 'Business Model', completion: 70, color: 'bg-purple-500' },
                        { name: 'Financial Planning', completion: 60, color: 'bg-yellow-500' },
                        { name: 'Legal Structure', completion: 45, color: 'bg-red-500' },
                        { name: 'Brand Assets', completion: 30, color: 'bg-gray-300' }
                      ].map((section, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-32 text-xs font-medium">{section.name}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${section.color} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${section.completion}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600 w-8 text-right">{section.completion}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-bold mb-2">Your Portfolio Dashboard</h4>
                    <div className="space-y-1 text-sm mb-4">
                      <div className="flex justify-between"><span>Sections Complete:</span><span className="font-semibold">3/8</span></div>
                      <div className="flex justify-between"><span>Export Ready:</span><span className="text-green-600 font-semibold">✓ Yes</span></div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => {
                        if (user) {
                          window.location.href = '/portfolio';
                        } else {
                          // Show demo or redirect to get started
                          window.location.href = '/get-started';
                        }
                      }}
                    >
                      {user ? 'View Your Portfolio →' : 'See Portfolio Demo →'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h3 className="font-mono text-xl font-bold mb-2">
                  Weekly Learning Structure
                </h3>
                <p className="text-base text-gray-600">Master your startup journey week by week with P1: 30-Day Launch Sprint</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <BuyNowButton
                  productCode="P1"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  showPrice={false}
                  customText="Start P1: 30-Day Sprint (₹4,999)"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    window.location.href = '/pricing?product=ALL_ACCESS';
                  }}
                >
                  Get All Products (₹54,999)
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 font-mono text-2xl font-bold text-accent">
                W1
              </div>
              <h3 className="font-semibold mb-2">Foundation</h3>
              <p className="text-sm text-gray-600">
                Idea validation, market research, business model, brand identity
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 font-mono text-2xl font-bold text-accent">
                W2
              </div>
              <h3 className="font-semibold mb-2">Building Blocks</h3>
              <p className="text-sm text-gray-600">
                Legal structure, compliance roadmap, MVP planning, banking setup
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 font-mono text-2xl font-bold text-accent">
                W3
              </div>
              <h3 className="font-semibold mb-2">Making it Real</h3>
              <p className="text-sm text-gray-600">
                Company registration, GST/tax setup, product development, testing
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 font-mono text-2xl font-bold text-accent">
                W4
              </div>
              <h3 className="font-semibold mb-2">Launch Ready</h3>
              <p className="text-sm text-gray-600">
                Go-to-market, pitch deck, investor readiness, first customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This System Works */}
      <section className="border-t border-gray-200 py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-mono text-2xl md:text-3xl font-bold mb-4">
                Why 2000+ Founders Choose Our System
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Unlike generic startup advice, our system is built specifically for Indian founders with actionable, step-by-step guidance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-mono text-xl font-bold text-blue-600 mb-3">Daily Structure</div>
                <p className="text-gray-600 mb-4">
                  No overwhelming 500-page guides. Each day has 3-5 focused tasks that build on each other.
                </p>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>45 mins/day average</span>
                </div>
              </div>
              
              <div className="bg-white p-8 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div className="font-mono text-xl font-bold text-green-600 mb-3">India-First</div>
                <p className="text-gray-600 mb-4">
                  Every template, every process, every example is specifically for Indian regulations and market.
                </p>
                <div className="flex items-center text-sm text-green-600 font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>100% India-specific</span>
                </div>
              </div>
              
              <div className="bg-white p-8 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="font-mono text-xl font-bold text-purple-600 mb-3">Implementation</div>
                <p className="text-gray-600 mb-4">
                  Not just theory. Learn through practical exercises with real templates and step-by-step guides.
                </p>
                <div className="flex items-center text-sm text-purple-600 font-medium">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>1000+ ready templates</span>
                </div>
              </div>
            </div>
            
            {/* Success Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center">
              <h3 className="font-bold text-xl mb-6">Proven Results from Our Community</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-1">₹50Cr+</div>
                  <div className="text-sm opacity-90">Total funding raised</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">89%</div>
                  <div className="text-sm opacity-90">Completion rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">30</div>
                  <div className="text-sm opacity-90">Days to launch</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">4.8/5</div>
                  <div className="text-sm opacity-90">Average rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-green-300 p-8 md:p-12 text-center rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-400"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-mono text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                  3-Day Money-Back Guarantee
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
                  Try our courses for 3 days. If you're not completely satisfied with the quality and value,
                  we'll refund your purchase. No questions asked.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">3-day guarantee</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Full money-back</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 p-4 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">No questions asked</span>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg inline-block">
                  <p className="text-green-800 font-semibold text-lg">
                    📊 97% of founders complete the full program and launch successfully
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Join 2000+ founders who've transformed their ideas into thriving businesses
                  </p>
                </div>
                
                <div className="mt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'click_guarantee_section', {
                          event_category: 'engagement',
                          event_label: 'guarantee_get_started'
                        });
                      }
                      window.location.href = '/get-started';
                    }}
                    className="bg-green-600 hover:bg-green-700 px-8 py-4 text-lg font-bold"
                  >
                    Start Today with 3-Day Guarantee →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 text-yellow-400" />
              <span>Launch Your Startup Journey</span>
            </div>
            <h2 className="font-mono text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Your Complete Startup
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Ecosystem Awaits
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From idea to IPO readiness - everything you need in one comprehensive platform.
              <br className="hidden md:block" />
              <span className="text-yellow-400 font-semibold">Choose your path and start building today.</span>
            </p>
            
            {/* Value Props Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-yellow-400 mb-1">12</div>
                <div className="text-xs text-gray-400">Complete Products</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-green-400 mb-1">1000+</div>
                <div className="text-xs text-gray-400">Templates</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-blue-400 mb-1">2000+</div>
                <div className="text-xs text-gray-400">Founders</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                <div className="text-2xl font-bold text-purple-400 mb-1">₹50Cr+</div>
                <div className="text-xs text-gray-400">Funding Raised</div>
              </div>
            </div>
            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button 
                variant="primary"
                size="lg"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'click_final_cta', {
                      event_category: 'engagement',
                      event_label: 'get_started_final',
                      value: 54999
                    });
                  }
                  window.location.href = '/get-started';
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 px-8 md:px-12 py-4 md:py-5 flex items-center gap-3 font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                🚀 Get Started Now <ArrowRight className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', 'click_pricing_final_cta', {
                      event_category: 'engagement',
                      event_label: 'view_all_products_final'
                    });
                  }
                  window.location.href = '/pricing';
                }}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 md:px-12 py-4 md:py-5 flex items-center gap-3 font-semibold text-lg transition-all duration-300"
              >
                View All Products
              </Button>
            </div>
            
            {/* Special Offer Banner */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-xl border-2 border-red-400 mb-8 relative">
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                HOT DEAL
              </div>
              <p className="text-white font-bold text-lg">
                🔥 Limited Time: Save ₹27,989 on All-Access Bundle
              </p>
              <p className="text-red-100 text-sm mt-1">
                Join now and get complete access to all 12 products for just ₹54,999
              </p>
            </div>
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300 max-w-2xl mx-auto mb-8">
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-center">12 Complete Products</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                <Shield className="h-5 w-5 text-blue-400" />
                <span className="text-center">3-Day Guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                <Briefcase className="h-5 w-5 text-purple-400" />
                <span className="text-center">Portfolio Builder</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-lg">
                <Users className="h-5 w-5 text-yellow-400" />
                <span className="text-center">2000+ Community</span>
              </div>
            </div>
          </div>
          <div className="mt-8 text-xs text-gray-400 text-center max-w-3xl mx-auto space-y-2">
            <p>
              By purchasing, you agree to our <a href="/terms" className="underline hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" className="underline hover:text-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. 
            </p>
            <p>
              This is an educational platform providing guides and resources only. We do not provide professional services.
            </p>
            <p className="flex items-center justify-center gap-4 mt-4">
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Secure payments
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Instant access
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                3-day guarantee
              </span>
            </p>
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
                © 2024. Built for Indian founders, by Indian founders.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
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

      {/* Development Tools */}
      <LinkTester />
      <QuickLinkTest />
    </div>
  );
}
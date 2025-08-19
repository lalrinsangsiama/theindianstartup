'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Rocket, Users, TrendingUp, Clock, Target, BookOpen, IndianRupee, Award, Calendar, Shield, Zap, Briefcase } from "lucide-react";
import { Button } from '@/components/ui/Button';
import { StructuredData } from '@/components/seo/StructuredData';
import { createClient } from '@/lib/supabase/client';

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
              <Link href="#features" className="text-sm hover:text-accent transition-colors">
                Features
              </Link>
              <Link href="#value" className="text-sm hover:text-accent transition-colors">
                What&apos;s Included
              </Link>
              <Link href="/pricing" className="text-sm hover:text-accent transition-colors">
                Pricing
              </Link>
              {user ? (
                <Link href="/dashboard" className="btn-primary text-sm px-6 py-2">
                  Dashboard
                </Link>
              ) : (
                <Link href="/get-started" className="btn-primary text-sm px-6 py-2">
                  Get Started
                </Link>
              )}
            </div>
            <div className="md:hidden">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-sm px-4 py-2">
                  Dashboard
                </Link>
              ) : (
                <Link href="/get-started" className="btn-primary text-sm px-4 py-2">
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-gray-200 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4 text-accent" />
              <span>Learn to build your startup step-by-step</span>
            </div>
            <h1 className="font-mono text-4xl md:text-5xl font-bold leading-tight mb-6">
              Complete Startup Mastery<br className="hidden md:block" />
              <span className="md:hidden"> </span>Ecosystem for Indian Founders
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl">
              12 comprehensive courses with step-by-step guides, templates, and resources. 
              Build your startup portfolio as you learn - from idea validation to scaling through expert-curated educational content.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <div className="flex-1">
                <Link 
                  href="/get-started" 
                  className="btn-primary text-lg px-8 py-4 w-full md:w-auto inline-flex items-center justify-center"
                >
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <p className="mt-3 text-sm text-gray-500 flex items-center justify-center md:justify-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" /> 
                  12 Products • Portfolio Builder • Community Access
                </p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left border-t md:border-t-0 md:border-l border-gray-300 pt-6 md:pt-0 md:pl-8">
                <p className="text-2xl md:text-3xl font-bold font-mono text-accent">1,700+</p>
                <p className="text-sm text-gray-600">Templates, guides & resources</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8">
              Complete Startup Ecosystem
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold font-mono text-accent mb-2">12</div>
                <p className="text-sm font-medium">Specialized Products</p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold font-mono text-accent mb-2">500+</div>
                <p className="text-sm font-medium">Templates & Tools</p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold font-mono text-accent mb-2">450+</div>
                <p className="text-sm font-medium">Daily Action Items</p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold font-mono text-accent mb-2">1</div>
                <p className="text-sm font-medium">Complete Portfolio</p>
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
                P1-P4: Foundation
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                30-Day Launch, Incorporation & Compliance, Funding Mastery, Finance Stack - everything to get started.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Shield className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                P5-P8: Protection & Growth
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Legal Stack, Sales & GTM, State Schemes, Data Room - protect and scale your startup professionally.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <BookOpen className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                P9-P12: Advanced Mastery
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Government Schemes, Patent Strategy, Branding & PR, Marketing Mastery - become industry leaders.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Award className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Modular Approach
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Buy individual products (₹4,999-₹9,999) or get everything with All-Access Bundle (₹54,999).
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Users className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                India-Specific Guidance
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Every template, process, and strategy designed specifically for Indian regulations and market conditions.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Briefcase className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Portfolio Builder
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Professional portfolio that builds itself, investor-ready exports, complete business documents. Grow as you learn.
              </p>
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
              <div className="text-center">
                <div className="bg-blue-50 rounded-lg p-8 mb-4">
                  <h3 className="font-mono text-xl font-bold mb-2">Foundation (P1-P4)</h3>
                  <p className="text-gray-600 text-sm mb-4">Launch & Setup</p>
                  <div className="space-y-2 text-sm text-left">
                    <div>• 30-Day Launch Sprint</div>
                    <div>• Incorporation & Compliance</div>
                    <div>• Funding Mastery</div>
                    <div>• Finance Stack</div>
                  </div>
                </div>
                <div className="font-mono text-lg font-bold">₹4,999 - ₹6,999 each</div>
              </div>

              <div className="text-center">
                <div className="bg-green-50 rounded-lg p-8 mb-4">
                  <h3 className="font-mono text-xl font-bold mb-2">Growth (P5-P8)</h3>
                  <p className="text-gray-600 text-sm mb-4">Scale & Protect</p>
                  <div className="space-y-2 text-sm text-left">
                    <div>• Legal Stack</div>
                    <div>• Sales & GTM</div>
                    <div>• State Schemes</div>
                    <div>• Data Room Mastery</div>
                  </div>
                </div>
                <div className="font-mono text-lg font-bold">₹4,999 - ₹9,999 each</div>
              </div>

              <div className="text-center">
                <div className="bg-purple-50 rounded-lg p-8 mb-4">
                  <h3 className="font-mono text-xl font-bold mb-2">Mastery (P9-P12)</h3>
                  <p className="text-gray-600 text-sm mb-4">Lead & Excel</p>
                  <div className="space-y-2 text-sm text-left">
                    <div>• Government Schemes</div>
                    <div>• Patent Strategy</div>
                    <div>• Branding & PR</div>
                    <div>• Marketing Mastery</div>
                  </div>
                </div>
                <div className="font-mono text-lg font-bold">₹4,999 - ₹9,999 each</div>
              </div>
            </div>

            <div className="text-center bg-black text-white p-8 rounded-lg">
              <h3 className="font-mono text-2xl font-bold mb-2">All-Access Bundle</h3>
              <p className="text-gray-300 mb-4">Get all 12 products for the price of 8</p>
              <div className="font-mono text-4xl font-bold mb-2">₹54,999</div>
              <div className="text-gray-300 text-sm">Save ₹15,987 (22% off)</div>
              <div className="mt-6">
                <Link href="/pricing" className="inline-block bg-white text-black px-6 py-3 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  View All Products
                </Link>
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
              Each day builds on the previous. By Day 30, you&apos;ll have comprehensive knowledge, actionable templates, and a complete startup portfolio.
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
                    <Link href="/portfolio" className="inline-block">
                      <Button variant="outline" size="sm" className="text-xs">
                        View Portfolio Demo →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 max-w-3xl">
            <h3 className="font-mono text-xl font-bold mb-4">
              Weekly Learning Structure
            </h3>
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
      <section className="border-t border-gray-200 py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-mono text-2xl md:text-3xl font-bold mb-12 text-center">
              Why This System Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="font-mono text-lg font-bold text-accent mb-2">Daily Structure</div>
                <p className="text-sm text-gray-600">
                  No overwhelming 500-page guides. Each day has 3-5 focused tasks that build on each other.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="font-mono text-lg font-bold text-accent mb-2">India-First</div>
                <p className="text-sm text-gray-600">
                  Every template, every process, every example is specifically for Indian regulations and market.
                </p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="font-mono text-lg font-bold text-accent mb-2">Implementation</div>
                <p className="text-sm text-gray-600">
                  Not just theory. Learn through practical exercises with real templates and step-by-step implementation guides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-green-50 border-2 border-green-200 p-8 text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-mono text-2xl font-bold mb-4">
              30-Day Money-Back Guarantee
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              If you don&apos;t find value in the first 30 days, we&apos;ll refund your money. No questions asked.
              That&apos;s how confident we are in our system.
            </p>
            <p className="text-sm text-gray-600">
              97% of founders complete the full 30 days. Join them.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-6">
            Your Complete Startup Ecosystem Awaits
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            From idea to IPO readiness - everything you need in one place.<br className="hidden md:block" />
            <span className="md:hidden"> </span>Choose your path and start building today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/get-started" 
              className="inline-flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 font-semibold hover:bg-gray-100 transition-colors rounded-lg"
            >
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/pricing" 
              className="inline-flex items-center gap-2 border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 font-semibold hover:bg-white hover:text-black transition-colors rounded-lg"
            >
              View All Products
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>12 Complete Products</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>500+ Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Portfolio Builder</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Community Access</span>
            </div>
          </div>
          <div className="mt-6 text-xs text-gray-400 text-center max-w-2xl mx-auto">
            By purchasing, you agree to our <Link href="/terms" className="underline hover:text-gray-300">Terms of Service</Link> and <Link href="/privacy" className="underline hover:text-gray-300">Privacy Policy</Link>. 
            This is an educational platform providing guides and resources only. We do not provide professional services.
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
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <a
                href="mailto:support@theindianstartup.in"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                support@theindianstartup.in
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
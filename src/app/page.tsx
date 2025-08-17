'use client';

import Link from "next/link";
import { ArrowRight, CheckCircle, Rocket, Users, TrendingUp, Clock, Target, BookOpen, IndianRupee, Award, Calendar, Shield, Zap } from "lucide-react";
import { StructuredData } from "../components/seo/StructuredData";

export default function HomePage() {
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
              <Link href="/pricing" className="btn-primary text-sm px-6 py-2">
                Start Your Journey
              </Link>
            </div>
            <div className="md:hidden">
              <Link href="/pricing" className="btn-primary text-sm px-4 py-2">
                Get Started
              </Link>
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
              <span>Save ₹1,00,000+ vs hiring consultants</span>
            </div>
            <h1 className="font-mono text-4xl md:text-5xl font-bold leading-tight mb-6">
              From Idea to Incorporated<br className="hidden md:block" />
              <span className="md:hidden"> </span>Startup in 30 Days
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl">
              The only implementation system you need to launch a legally compliant, 
              investor-ready startup in India. No consultants. No confusion.
            </p>
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
              <div className="flex-1">
                <Link 
                  href="/pricing" 
                  className="btn-primary text-lg px-8 py-4 w-full md:w-auto inline-flex items-center justify-center"
                >
                  Start for ₹4,999 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <p className="mt-3 text-sm text-gray-500 flex items-center justify-center md:justify-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" /> 
                  365-day access • One-time payment
                </p>
              </div>
              <div className="flex-shrink-0 text-center md:text-left border-t md:border-t-0 md:border-l border-gray-300 pt-6 md:pt-0 md:pl-8">
                <p className="text-2xl md:text-3xl font-bold font-mono text-accent">₹1,60,000+</p>
                <p className="text-sm text-gray-600">Worth of templates & guidance</p>
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
              What You&apos;re Getting
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold font-mono text-accent mb-2">30</div>
                <p className="text-sm font-medium">Daily lessons with action items</p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <div className="text-3xl font-bold font-mono text-accent mb-2">60+</div>
                <p className="text-sm font-medium">Legal templates & documents</p>
              </div>
              <div className="bg-white p-6 border border-gray-200 rounded-lg sm:col-span-2 md:col-span-1">
                <div className="text-3xl font-bold font-mono text-accent mb-2">365</div>
                <p className="text-sm font-medium">Days platform access</p>
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
              Everything You Need to Launch Successfully
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              A complete implementation system that guides you through every step of building a startup in India.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Target className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Daily Action Plans
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Wake up knowing exactly what to do. Pre-work, core tasks, and bonus activities for overachievers.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Shield className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Legal Compliance Sorted
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Company registration, GST, PAN, trademark—all the boring but critical stuff explained step-by-step.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <BookOpen className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                India-Specific Guidance
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Built for Indian founders. Local payment methods, regional languages, state-specific benefits.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Award className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Gamified Progress
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Earn XP, unlock badges, maintain streaks. Building a startup should feel like leveling up.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Users className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                Founder Community
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Connect with founders on the same journey. Share wins, get help, find co-founders.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-lg transition-all hover:border-gray-400 hover:shadow-md">
              <Calendar className="mb-4 h-8 w-8 text-accent" />
              <h3 className="mb-2 font-mono text-lg md:text-xl font-semibold">
                365-Day Access
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Life happens. Take your time. Your progress is saved and you can always come back.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="border-t border-gray-200 bg-gray-50 py-20" id="value">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-3xl font-bold">
              ₹1,60,000+ Worth of Value for ₹4,999
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Here&apos;s what consultants would charge you for the same outcomes:
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-4">
              {[
                { service: "Company Incorporation Assistance", value: "₹25,000", included: true },
                { service: "GST Registration & Compliance Setup", value: "₹10,000", included: true },
                { service: "Brand Identity & Logo Design", value: "₹20,000", included: true },
                { service: "MVP Development Guidance", value: "₹50,000", included: true },
                { service: "Market Research & Validation", value: "₹15,000", included: true },
                { service: "Pitch Deck Creation", value: "₹25,000", included: true },
                { service: "Legal Document Templates", value: "₹15,000", included: true },
                { service: "30 Days of Consulting", value: "₹1,00,000+", included: true },
              ].map((item) => (
                <div
                  key={item.service}
                  className="flex items-center justify-between border border-gray-200 bg-white p-6"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <h3 className="font-medium">{item.service}</h3>
                  </div>
                  <span className="font-mono text-lg font-semibold text-gray-500 line-through">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-accent text-white p-8 text-center">
              <p className="text-sm font-medium mb-2">TOTAL VALUE</p>
              <p className="font-mono text-4xl font-bold mb-4">₹1,60,000+</p>
              <p className="text-sm mb-6">Your Investment</p>
              <p className="font-mono text-5xl font-bold">₹4,999</p>
              <p className="text-sm mt-2 opacity-90">One-time payment • Lifetime updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Journey Preview */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <h2 className="font-mono text-2xl md:text-3xl font-bold">
              Your 30-Day Transformation
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">
              Each day builds on the previous. By Day 30, you&apos;ll have a real, registered company.
            </p>
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
                  Not just theory. By Day 30, you have a registered company with real legal documents.
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
            Your Startup Journey Starts Today
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Stop reading about entrepreneurship. Start building.<br className="hidden md:block" />
            <span className="md:hidden"> </span>In 30 days, you&apos;ll be a registered founder with a real company.
          </p>
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 font-semibold hover:bg-gray-100 transition-colors rounded-lg"
          >
            Begin Your 30-Day Journey for ₹4,999 <ArrowRight className="h-5 w-5" />
          </Link>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>365-day access</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>All templates included</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Community access</span>
            </div>
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
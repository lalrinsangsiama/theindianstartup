'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ArrowLeft, Target, Users, Award, BookOpen, Shield, Rocket, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8" />
            </Link>

            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container max-w-4xl">
          <div className="text-center">
            <Heading as="h1" className="mb-4">About The Indian Startup</Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Empowering Indian founders with comprehensive, step-by-step guidance to build successful startups from idea to global scale.
            </Text>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container py-12 max-w-4xl">
        {/* Mission */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <Heading as="h2" variant="h3">Our Mission</Heading>
          </div>
          <Text className="mb-4">
            The Indian Startup was founded with a simple mission: to make entrepreneurship accessible to every aspiring Indian founder.
            We believe that the knowledge and guidance needed to build a successful startup should not be locked behind expensive consulting
            fees or inaccessible networks.
          </Text>
          <Text>
            Our platform provides India-specific guidance, templates, and resources that address the unique challenges faced by
            entrepreneurs in the Indian ecosystem - from navigating complex regulatory requirements to accessing government schemes
            and building investor-ready businesses.
          </Text>
        </section>

        {/* What We Offer */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <Heading as="h2" variant="h3">What We Offer</Heading>
          </div>
          <Text className="mb-6">
            We provide comprehensive educational products covering every aspect of building a startup in India:
          </Text>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">30 Comprehensive Courses</h4>
              <p className="text-sm text-gray-600">
                From 30-day launch sprints to sector-specific mastery programs covering FinTech, HealthTech, E-commerce, and more.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">3,000+ Resources</h4>
              <p className="text-sm text-gray-600">
                Templates, playbooks, checklists, and guides designed specifically for Indian regulations and market conditions.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Government Schemes Database</h4>
              <p className="text-sm text-gray-600">
                Access information about 500+ government schemes across all 28 states and 8 UTs to maximize benefits.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Portfolio Builder</h4>
              <p className="text-sm text-gray-600">
                Build your investor-ready startup portfolio automatically as you complete course activities.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Overview */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
            <Heading as="h2" variant="h3" className="text-white text-center mb-8">Our Platform</Heading>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">30</div>
                <div className="text-sm opacity-90">Complete Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">1000+</div>
                <div className="text-sm opacity-90">Templates & Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">450+</div>
                <div className="text-sm opacity-90">Action Items</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">365</div>
                <div className="text-sm opacity-90">Days Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <Heading as="h2" variant="h3">Our Values</Heading>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">India-First Approach</h4>
                <p className="text-gray-600">Every piece of content is designed specifically for Indian regulations, markets, and business practices.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Practical Implementation</h4>
                <p className="text-gray-600">We focus on actionable guidance with real templates, not just theory.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Founder Success</h4>
                <p className="text-gray-600">Our success is measured by the success of our founders.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Continuous Improvement</h4>
                <p className="text-gray-600">We regularly update our content to reflect the latest regulations and best practices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Information */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-orange-600" />
            </div>
            <Heading as="h2" variant="h3">Business Information</Heading>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Platform Name</h4>
                <p className="text-gray-700">The Indian Startup</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Type</h4>
                <p className="text-gray-700">Digital Educational Platform</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Website</h4>
                <a href="https://theindianstartup.in" className="text-blue-600 hover:underline">
                  theindianstartup.in
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support Email</h4>
                <a href="mailto:support@theindianstartup.in" className="text-blue-600 hover:underline">
                  support@theindianstartup.in
                </a>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Products Offered</h4>
                <p className="text-gray-700">Online courses, templates, and educational resources for entrepreneurs</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Location</h4>
                <p className="text-gray-700">Bangalore, Karnataka, India</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-xl">
          <Rocket className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <Heading as="h2" variant="h3" className="text-white mb-4">Ready to Start Your Journey?</Heading>
          <Text className="text-gray-300 mb-6">
            Join thousands of founders who are building successful startups with our guidance.
          </Text>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button variant="primary" className="bg-yellow-400 text-black hover:bg-yellow-300">
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>

        {/* Legal Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-600">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>|</span>
            <Link href="/refund-policy" className="hover:underline">Refund Policy</Link>
            <span>|</span>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

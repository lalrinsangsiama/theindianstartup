'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ContactSupport } from '@/components/ui/ContactSupport';
import { ArrowLeft, Zap, Download, Clock, CheckCircle, Globe, Mail } from 'lucide-react';

export default function ShippingDeliveryPage() {
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

      {/* Content */}
      <main className="container py-12 max-w-4xl">
        <div className="mb-8">
          <Heading as="h1" className="mb-4">Shipping & Delivery Policy</Heading>
          <Text color="muted">Last updated: January 29, 2026</Text>
        </div>

        {/* Digital Products Notice */}
        <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-blue-800 mb-2">100% Digital Products - Instant Access</h2>
              <p className="text-blue-700">
                The Indian Startup offers exclusively digital products. All courses, templates, and resources
                are delivered electronically with instant access upon successful payment.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <Heading as="h2" variant="h4" className="mb-4">1. Product Type</Heading>
            <Text className="mb-4">
              All products offered by The Indian Startup are <strong>digital/electronic products</strong>, including:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Online courses and learning modules (P1-P12)</li>
              <li>Downloadable templates and documents</li>
              <li>Digital guides and playbooks</li>
              <li>Interactive tools and calculators</li>
              <li>Video content and tutorials</li>
            </ul>
            <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 font-medium">
                <strong>Note:</strong> We do not sell or ship any physical products. No physical delivery is involved.
              </p>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">2. Delivery Method</Heading>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold">Online Platform Access</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Access courses directly through your dashboard at theindianstartup.in
                </p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">Downloadable Resources</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Templates and documents available for download within course modules
                </p>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">3. Delivery Timeline</Heading>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800">Instant Access</h4>
                  <p className="text-green-700">
                    Upon successful payment, you will receive immediate access to your purchased products.
                    No waiting period or shipping time required.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold mb-2">Delivery Process:</h4>
                <ol className="list-decimal pl-6 space-y-2 text-sm">
                  <li>Complete payment through Razorpay secure gateway</li>
                  <li>Receive payment confirmation email instantly</li>
                  <li>Access unlocked in your dashboard within seconds</li>
                  <li>Start learning immediately - no shipping delays</li>
                </ol>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">4. Access Period</Heading>
            <Text className="mb-4">
              All purchases include <strong>1-year (365 days) access</strong> from the date of purchase.
            </Text>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold">Course Access</h4>
                </div>
                <p className="text-sm text-gray-600">365 days from purchase date</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Download className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">Downloaded Content</h4>
                </div>
                <p className="text-sm text-gray-600">Yours to keep permanently</p>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">5. Technical Requirements</Heading>
            <Text className="mb-4">
              To access our digital products, you need:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>A device (computer, tablet, or smartphone) with internet access</li>
              <li>A modern web browser (Chrome, Firefox, Safari, or Edge)</li>
              <li>Valid email address for account creation</li>
              <li>Stable internet connection for streaming video content</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">6. Delivery Issues</Heading>
            <Text className="mb-4">
              If you experience any issues accessing your purchased products:
            </Text>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm text-gray-600">Confirm you received the payment confirmation email</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Refresh your dashboard</p>
                  <p className="text-sm text-gray-600">Log out and log back in to refresh your access</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Contact support</p>
                  <p className="text-sm text-gray-600">Email support@theindianstartup.in with your order details</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">7. No Physical Shipping</Heading>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
              <Text className="mb-2">
                <strong>To be clear:</strong> The Indian Startup does not:
              </Text>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Ship physical products</li>
                <li>Require shipping addresses</li>
                <li>Charge shipping fees</li>
                <li>Have delivery timeframes (instant digital access)</li>
                <li>Partner with courier services</li>
              </ul>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">8. Contact Us</Heading>
            <Text className="mb-4">
              For any delivery or access-related queries:
            </Text>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-gray-600" />
                <Text className="font-medium">Email: support@theindianstartup.in</Text>
              </div>
              <Text className="text-sm text-gray-600">
                Response time: Within 24-48 hours on business days
              </Text>
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <ContactSupport variant="full" />
        </div>
      </main>
    </div>
  );
}

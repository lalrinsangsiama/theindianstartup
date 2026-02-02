'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ContactSupport } from '@/components/ui/ContactSupport';
import { ArrowLeft, Shield, Clock, Mail, CheckCircle } from 'lucide-react';

export default function RefundPolicyPage() {
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
          <Heading as="h1" className="mb-4">Refund Policy</Heading>
          <Text color="muted">Last updated: January 29, 2026</Text>
        </div>

        {/* Guarantee Highlight */}
        <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-green-800 mb-2">7-Day Money-Back Guarantee</h2>
              <p className="text-green-700">
                We offer a full refund within 7 days of purchase if you are not satisfied with our products.
                No questions asked.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <Heading as="h2" variant="h4" className="mb-4">1. Refund Eligibility</Heading>
            <Text className="mb-4">
              You are eligible for a full refund if you request it within 7 days of your purchase date.
              This applies to all individual products (P1-P12) and the All-Access Bundle.
            </Text>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold mb-2">Eligibility Criteria:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request must be made within 7 days of purchase</li>
                <li>Valid purchase confirmation or order ID required</li>
                <li>Refund requested to the original payment method</li>
              </ul>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">2. How to Request a Refund</Heading>
            <Text className="mb-4">
              To request a refund, please follow these steps:
            </Text>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Send an Email</h4>
                  <p className="text-sm text-gray-600">Email us at <a href="mailto:support@theindianstartup.in" className="text-blue-600 underline">support@theindianstartup.in</a> with the subject line: "Refund Request - [Your Order ID]"</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Include Required Information</h4>
                  <p className="text-sm text-gray-600">Provide your registered email, order ID/payment ID, and purchase date</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Confirmation</h4>
                  <p className="text-sm text-gray-600">We will acknowledge your request within 24 hours</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">3. Refund Processing Time</Heading>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold">Acknowledgment</h4>
                </div>
                <p className="text-sm text-gray-600">Within 24-48 hours of your request</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">Refund Processed</h4>
                </div>
                <p className="text-sm text-gray-600">5-7 business days to original payment method</p>
              </div>
            </div>
            <Text className="mt-4">
              <strong>Note:</strong> Bank processing times may vary. Credit card refunds typically appear within 5-7 business days,
              while UPI and net banking refunds may be processed within 3-5 business days.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">4. Non-Refundable Situations</Heading>
            <Text className="mb-4">
              Refunds may not be granted in the following situations:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Request made after 7 days from the purchase date</li>
              <li>Multiple refund requests for the same product (abuse of refund policy)</li>
              <li>Promotional or discounted purchases where refund exclusions were clearly stated</li>
              <li>Account termination due to violation of Terms of Service</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">5. Partial Refunds</Heading>
            <Text className="mb-4">
              In certain circumstances, we may offer partial refunds:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>If you have completed more than 50% of a course within the refund window</li>
              <li>If you wish to downgrade from the All-Access Bundle to individual products</li>
              <li>Technical issues that prevented full access (we will assess on a case-by-case basis)</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">6. Subscription Cancellations</Heading>
            <Text className="mb-4">
              Our products are one-time purchases with 1-year access, not recurring subscriptions.
              If you wish to discontinue using our products before your access period expires,
              please see our <Link href="/cancellation-policy" className="text-blue-600 underline">Cancellation Policy</Link>.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">7. Contact Us</Heading>
            <Text className="mb-4">
              For any refund-related queries, please contact us:
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

          <section>
            <Heading as="h2" variant="h4" className="mb-4">8. Changes to This Policy</Heading>
            <Text className="mb-4">
              We reserve the right to modify this refund policy at any time. Changes will be effective immediately
              upon posting on our website. Your continued use of our services after any changes indicates acceptance
              of the updated policy. Refund requests will be processed based on the policy in effect at the time of purchase.
            </Text>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <ContactSupport variant="full" />
        </div>
      </main>
    </div>
  );
}

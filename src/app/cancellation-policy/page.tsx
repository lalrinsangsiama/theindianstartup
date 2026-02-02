'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ContactSupport } from '@/components/ui/ContactSupport';
import { ArrowLeft, AlertCircle, Clock, Mail, Info, CheckCircle } from 'lucide-react';

export default function CancellationPolicyPage() {
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
          <Heading as="h1" className="mb-4">Cancellation Policy</Heading>
          <Text color="muted">Last updated: January 29, 2026</Text>
        </div>

        {/* Important Notice */}
        <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-xl text-blue-800 mb-2">Digital Products - No Recurring Subscriptions</h2>
              <p className="text-blue-700">
                All our products are one-time purchases with 1-year access. There are no recurring charges
                or automatic renewals to cancel.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <Heading as="h2" variant="h4" className="mb-4">1. Understanding Our Products</Heading>
            <Text className="mb-4">
              The Indian Startup offers digital educational products that provide:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>One-time purchase:</strong> Pay once, access for 1 year</li>
              <li><strong>No recurring billing:</strong> No automatic renewals or subscription charges</li>
              <li><strong>Digital delivery:</strong> Instant access upon purchase (no physical products)</li>
              <li><strong>Lifetime templates:</strong> Downloaded templates remain yours permanently</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">2. Access Period</Heading>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold">Access Duration</h4>
                </div>
                <p className="text-sm text-gray-600">365 days from date of purchase</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold">After Expiry</h4>
                </div>
                <p className="text-sm text-gray-600">Downloaded content remains yours forever</p>
              </div>
            </div>
            <Text className="mb-4">
              When your access period ends, you will no longer be able to access the online platform content.
              However, any templates, documents, or resources you have downloaded during your access period
              remain yours to use permanently.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">3. Voluntary Cancellation</Heading>
            <Text className="mb-4">
              Since our products are not subscriptions, there is no cancellation process required. However,
              if you wish to stop using our platform before your access period ends:
            </Text>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">You can simply stop accessing the platform - no action required</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">Your account will remain active until the access period expires</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm">No future charges will be made as there are no recurring payments</p>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">4. Account Deletion</Heading>
            <Text className="mb-4">
              If you wish to permanently delete your account and all associated data:
            </Text>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800">Warning: This action is irreversible</h4>
                  <p className="text-sm text-yellow-700">Deleting your account will permanently remove all your progress, portfolio data, and access to purchased products.</p>
                </div>
              </div>
              <Text className="mb-4">
                To request account deletion, email us at <a href="mailto:support@theindianstartup.in" className="text-blue-600 underline">support@theindianstartup.in</a> with:
              </Text>
              <ul className="list-disc pl-6 space-y-2">
                <li>Subject: "Account Deletion Request"</li>
                <li>Your registered email address</li>
                <li>Reason for deletion (optional)</li>
              </ul>
              <Text className="mt-4">
                We will process your request within 7 business days and send confirmation once completed.
              </Text>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">5. Access Revocation</Heading>
            <Text className="mb-4">
              We reserve the right to revoke access in the following circumstances:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Violation of our Terms of Service</li>
              <li>Sharing account credentials with unauthorized users</li>
              <li>Attempting to redistribute or resell our content</li>
              <li>Fraudulent payment or chargeback abuse</li>
            </ul>
            <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
              <Text className="text-sm">
                <strong>Note:</strong> In cases of legitimate disputes or misunderstandings, we will always
                attempt to resolve the issue before taking any action to revoke access.
              </Text>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">6. Refunds vs. Cancellations</Heading>
            <Text className="mb-4">
              If you are within 7 days of your purchase and wish to get your money back, please refer to our
              <Link href="/refund-policy" className="text-blue-600 underline ml-1">Refund Policy</Link>.
            </Text>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Refund (within 7 days)</h4>
                <p className="text-sm text-green-700">Full money back, access revoked</p>
              </div>
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Cancellation (after 7 days)</h4>
                <p className="text-sm text-blue-700">No refund, access continues until expiry</p>
              </div>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">7. Renewal and Re-purchase</Heading>
            <Text className="mb-4">
              When your 1-year access period ends:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You will receive email notifications 30 days, 7 days, and 1 day before expiry</li>
              <li>You can choose to renew at the then-current price</li>
              <li>No automatic renewal charges will be made</li>
              <li>Previous progress and portfolio data will be retained if you renew</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">8. Contact Us</Heading>
            <Text className="mb-4">
              For any questions about cancellations or account management:
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

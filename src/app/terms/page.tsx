'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui';
import { Heading, Text } from '@/components/ui';
import { ContactSupport } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
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
          <Heading as="h1" className="mb-4">Terms of Service</Heading>
          <Text color="muted">Last updated: August 15, 2025</Text>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <Heading as="h2" variant="h4" className="mb-4">1. Acceptance of Terms</Heading>
            <Text className="mb-4">
              By accessing or using The Indian Startup platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). 
              If you disagree with any part of these terms, you may not access the Service.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">2. Description of Service</Heading>
            <Text className="mb-4">
              The Indian Startup provides a 30-day structured program for Indian entrepreneurs to launch their startups. 
              The Service includes:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Daily lessons and action items</li>
              <li>India-specific compliance guidance</li>
              <li>Templates and resources</li>
              <li>Community access</li>
              <li>Progress tracking and gamification features</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">3. User Accounts</Heading>
            <Text className="mb-4">
              To access the Service, you must:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your password</li>
              <li>Promptly update any changes to your information</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <Text className="mb-4">
              You must be at least 18 years old to use this Service.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">4. Payment and Subscription</Heading>
            <Text className="mb-4">
              <strong>Pricing:</strong> Access to the Service requires payment of ₹999 (launch offer) or ₹2,499 (regular price).
            </Text>
            <Text className="mb-4">
              <strong>Access Period:</strong> Your subscription provides access for 365 days from the date of purchase.
            </Text>
            <Text className="mb-4">
              <strong>Refund Policy:</strong> We offer a 7-day money-back guarantee. Request refunds by contacting support@theindianstartup.in.
            </Text>
            <Text className="mb-4">
              <strong>Payment Processing:</strong> Payments are processed securely through Razorpay. We do not store credit card information.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">5. Intellectual Property</Heading>
            <Text className="mb-4">
              All content provided through the Service, including lessons, templates, and resources, is the property of The Indian Startup 
              and is protected by intellectual property laws.
            </Text>
            <Text className="mb-4">
              You may use the content for your personal and business use but may not:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Redistribute or sell the content</li>
              <li>Create derivative works without permission</li>
              <li>Use the content for competing services</li>
              <li>Remove any proprietary notices</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">6. User Content</Heading>
            <Text className="mb-4">
              By uploading content to the Service (including portfolio information, feedback, and community posts), you:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Retain ownership of your content</li>
              <li>Grant us a license to use, display, and distribute your content within the Service</li>
              <li>Confirm that your content doesn&apos;t violate any laws or third-party rights</li>
              <li>Agree that we may moderate or remove content that violates these Terms</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">7. Prohibited Uses</Heading>
            <Text className="mb-4">
              You agree not to:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with the proper working of the Service</li>
              <li>Copy, modify, or reverse engineer the Service</li>
              <li>Use automated systems to access the Service</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">8. Disclaimer</Heading>
            <Text className="mb-4">
              The Service is provided &quot;as is&quot; without warranties of any kind. While we strive to provide accurate and helpful information, 
              we do not guarantee:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>The success of your startup</li>
              <li>The accuracy of all compliance information</li>
              <li>Uninterrupted access to the Service</li>
              <li>That the Service will meet all your requirements</li>
            </ul>
            <Text className="mb-4">
              You should consult with legal, tax, and business professionals for advice specific to your situation.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">9. Limitation of Liability</Heading>
            <Text className="mb-4">
              To the maximum extent permitted by law, The Indian Startup shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of the Service.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">10. Indemnification</Heading>
            <Text className="mb-4">
              You agree to indemnify and hold harmless The Indian Startup from any claims, damages, or expenses arising from:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any third-party rights</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">11. Governing Law</Heading>
            <Text className="mb-4">
              These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction 
              of the courts in Bangalore, Karnataka.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">12. Changes to Terms</Heading>
            <Text className="mb-4">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes via email. 
              Your continued use of the Service after changes constitutes acceptance of the new Terms.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">13. Contact Information</Heading>
            <Text className="mb-4">
              For questions about these Terms, please contact us at:
            </Text>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <Text className="font-medium">The Indian Startup</Text>
              <Text>Email: support@theindianstartup.in</Text>
              <Text>Website: theindianstartup.in</Text>
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
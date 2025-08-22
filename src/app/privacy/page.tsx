'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ContactSupport } from '@/components/ui/ContactSupport';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <Heading as="h1" className="mb-4">Privacy Policy</Heading>
          <Text color="muted">Last updated: August 15, 2025</Text>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <Text className="mb-4">
              At The Indian Startup, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our educational platform.
            </Text>
            <Text className="mb-4">
              <strong>Important:</strong> The Indian Startup is an educational platform providing learning resources, guides, and templates. 
              We do not provide professional services such as legal, financial, or business consulting. All information collected is used 
              solely to enhance your learning experience.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">1. Information We Collect</Heading>
            
            <Text weight="medium" className="mb-2">Personal Information</Text>
            <Text className="mb-4">
              When you register for our Service, we collect:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Password (encrypted)</li>
              <li>Payment information (processed by Razorpay)</li>
            </ul>

            <Text weight="medium" className="mb-2">Usage Information</Text>
            <Text className="mb-4">
              We automatically collect:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Cookies and similar technologies</li>
              <li>Usage patterns and preferences</li>
            </ul>

            <Text weight="medium" className="mb-2">User Content</Text>
            <Text className="mb-4">
              Information you provide through the Service:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Startup portfolio information</li>
              <li>Progress data and achievements</li>
              <li>Community posts and interactions</li>
              <li>Uploaded documents and files</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">2. How We Use Your Information</Heading>
            <Text className="mb-4">
              We use your information exclusively for educational platform purposes:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide access to educational content and learning materials</li>
              <li>Process your course purchases and payments</li>
              <li>Send course updates and learning notifications</li>
              <li>Track your learning progress and award achievements</li>
              <li>Improve and personalize your learning experience</li>
              <li>Facilitate peer learning through community features</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <Text className="mb-4">
              We do not use your information to provide professional services or act on your behalf in any business matters.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">3. Information Sharing</Heading>
            <Text className="mb-4">
              We do not sell your personal information. We may share your information with:
            </Text>
            
            <Text weight="medium" className="mb-2">Service Providers</Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Supabase (authentication and database)</li>
              <li>Razorpay (payment processing)</li>
              <li>Vercel (hosting)</li>
              <li>Email service providers</li>
            </ul>

            <Text weight="medium" className="mb-2">Other Users</Text>
            <Text className="mb-4">
              Certain information may be visible to other users:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Your name and profile picture</li>
              <li>Achievements and badges</li>
              <li>Community posts and comments</li>
              <li>Progress metrics and statistics</li>
            </ul>

            <Text weight="medium" className="mb-2">Legal Requirements</Text>
            <Text className="mb-4">
              We may disclose your information if required by law or in response to valid legal requests.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">4. Data Security</Heading>
            <Text className="mb-4">
              We implement appropriate security measures to protect your information:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Encryption of sensitive data</li>
              <li>Secure HTTPS connections</li>
              <li>Regular security audits</li>
              <li>Limited access to personal information</li>
              <li>Secure password storage using bcrypt</li>
            </ul>
            <Text className="mb-4">
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">5. Data Retention</Heading>
            <Text className="mb-4">
              We retain your information for as long as necessary to provide the Service and comply with legal obligations:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Account information: Until account deletion</li>
              <li>Transaction records: 7 years (legal requirement)</li>
              <li>Usage logs: 90 days</li>
              <li>User content: Until you delete it or account closure</li>
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">6. Your Rights</Heading>
            <Text className="mb-4">
              You have the right to:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Disable cookies in your browser</li>
            </ul>
            <Text className="mb-4">
              To exercise these rights, contact us at support@theindianstartup.in
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">7. Cookies and Tracking</Heading>
            <Text className="mb-4">
              We use cookies and similar technologies to:
            </Text>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns</li>
              <li>Improve the Service</li>
            </ul>
            <Text className="mb-4">
              You can control cookies through your browser settings, but disabling them may limit functionality.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">8. Children's Privacy</Heading>
            <Text className="mb-4">
              Our Service is not intended for children under 18. We do not knowingly collect information from children. 
              If you believe we have collected information from a child, please contact us immediately.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">9. International Data Transfers</Heading>
            <Text className="mb-4">
              Your information may be transferred to and processed in countries other than India. We ensure appropriate 
              safeguards are in place to protect your information in accordance with this Privacy Policy.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">10. Third-Party Links</Heading>
            <Text className="mb-4">
              Our Service may contain links to third-party websites. We are not responsible for their privacy practices. 
              Please review their privacy policies before providing any information.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">11. Changes to This Policy</Heading>
            <Text className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by email 
              and by posting the new policy on this page. The "Last updated" date will be revised.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">12. Contact Us</Heading>
            <Text className="mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </Text>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <Text className="font-medium">The Indian Startup</Text>
              <Text>Email: support@theindianstartup.in</Text>
              <Text>Website: theindianstartup.in</Text>
            </div>
          </section>

          <section>
            <Heading as="h2" variant="h4" className="mb-4">13. Grievance Officer</Heading>
            <Text className="mb-4">
              In accordance with Information Technology Act 2000 and rules made thereunder, the name and contact details 
              of the Grievance Officer are provided below:
            </Text>
            <div className="bg-gray-50 p-4 border border-gray-200">
              <Text className="font-medium">Grievance Officer</Text>
              <Text>The Indian Startup</Text>
              <Text>Email: grievance@theindianstartup.in</Text>
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
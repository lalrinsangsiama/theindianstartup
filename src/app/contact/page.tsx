'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Typography';
import { Text } from '@/components/ui/Typography';
import { ArrowLeft, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
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
          <Heading as="h1" className="mb-4">Contact Us</Heading>
          <Text color="muted">We are here to help you succeed</Text>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <a href="mailto:support@theindianstartup.in" className="text-blue-600 hover:underline">
                    support@theindianstartup.in
                  </a>
                  <p className="text-sm text-gray-500 mt-1">For general inquiries and support</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Response Time</h3>
                  <p className="text-gray-700">Within 24-48 hours</p>
                  <p className="text-sm text-gray-500 mt-1">Monday to Saturday, 9 AM - 6 PM IST</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Registered Address</h3>
                  <p className="text-gray-700">
                    The Indian Startup<br />
                    Bangalore, Karnataka<br />
                    India - 560001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold mb-4">Common Queries</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/refund-policy" className="text-blue-600 hover:underline flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Refund & Returns Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cancellation-policy" className="text-blue-600 hover:underline flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Cancellation Policy
                  </Link>
                </li>
                <li>
                  <Link href="/shipping-delivery" className="text-blue-600 hover:underline flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Shipping & Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:underline flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-blue-600 hover:underline flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Support</h3>
              <p className="text-sm text-gray-600 mb-3">
                For payment-related issues, refunds, or transaction queries:
              </p>
              <ul className="text-sm space-y-2">
                <li><strong>Email:</strong> support@theindianstartup.in</li>
                <li><strong>Subject:</strong> Payment Query - [Order ID]</li>
                <li><strong>Processing:</strong> 24-48 hours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Business Information */}
        <div className="border-t border-gray-200 pt-8">
          <Heading as="h2" variant="h4" className="mb-4">Business Information</Heading>
          <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Legal Entity</h4>
                <p className="text-gray-700">The Indian Startup</p>
                <p className="text-sm text-gray-500 mt-1">Educational Platform for Indian Entrepreneurs</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Business Type</h4>
                <p className="text-gray-700">Digital Educational Products</p>
                <p className="text-sm text-gray-500 mt-1">Online courses, templates, and learning resources</p>
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
            </div>
          </div>
        </div>

        {/* Grievance Officer */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <Heading as="h2" variant="h4" className="mb-4">Grievance Officer</Heading>
          <Text className="mb-4">
            In accordance with the Information Technology Act 2000 and rules made thereunder,
            the name and contact details of the Grievance Officer are provided below:
          </Text>
          <div className="bg-gray-50 p-6 border border-gray-200 rounded-lg">
            <p><strong>Name:</strong> Customer Support Team</p>
            <p><strong>Email:</strong> <a href="mailto:support@theindianstartup.in" className="text-blue-600 hover:underline">support@theindianstartup.in</a></p>
            <p><strong>Address:</strong> Bangalore, Karnataka, India - 560001</p>
            <p className="text-sm text-gray-500 mt-2">
              Grievances will be addressed within 30 days from the date of receipt.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { 
  XCircle, 
  RefreshCw, 
  Mail, 
  Phone, 
  CreditCard,
  ArrowRight,
  HelpCircle,
  Shield
} from 'lucide-react';

export default function CheckoutFailedPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Error Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <XCircle className="w-24 h-24 text-red-600" />
          </div>
          
          <Badge variant="error" size="lg" className="mb-4">
            Payment Failed
          </Badge>
          
          <Heading as="h1" className="mb-4">
            Oops! Something went wrong
          </Heading>
          
          <Text className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your payment could not be processed. Don&apos;t worry - no amount has been 
            charged to your account. Let&apos;s try again!
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Common Reasons */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                <Heading as="h2" variant="h4">Common Reasons</Heading>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <Text size="sm">
                    Insufficient balance in your account
                  </Text>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <Text size="sm">
                    Incorrect card details or expired card
                  </Text>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <Text size="sm">
                    Payment declined by your bank
                  </Text>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <Text size="sm">
                    Transaction timeout or network issues
                  </Text>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                  <Text size="sm">
                    International transactions not enabled
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What to Do Next */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <RefreshCw className="w-6 h-6 text-blue-600" />
                <Heading as="h2" variant="h4">What to Do Next</Heading>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Text weight="bold" size="sm">1</Text>
                  </div>
                  <div>
                    <Text weight="medium">Check Your Payment Details</Text>
                    <Text size="sm" color="muted">
                      Verify card number, expiry date, and CVV
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Text weight="bold" size="sm">2</Text>
                  </div>
                  <div>
                    <Text weight="medium">Contact Your Bank</Text>
                    <Text size="sm" color="muted">
                      Ensure online transactions are enabled
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Text weight="bold" size="sm">3</Text>
                  </div>
                  <div>
                    <Text weight="medium">Try Again</Text>
                    <Text size="sm" color="muted">
                      Return to pricing page and retry payment
                    </Text>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/pricing">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <RefreshCw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Payment Security */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            
            <Heading as="h3" variant="h5" className="mb-3">
              Your Payment is Secure
            </Heading>
            
            <Text className="text-gray-600 mb-6">
              We use Razorpay&apos;s secure payment gateway with 256-bit SSL encryption. 
              Your card details are never stored on our servers.
            </Text>
            
            <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="mt-16 text-center">
          <Heading as="h3" variant="h5" className="mb-6">
            Need Help?
          </Heading>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a 
              href="mailto:support@theindianstartup.in"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-black transition-colors"
            >
              <Mail className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <Text weight="medium">Email Support</Text>
                <Text size="sm" color="muted">support@theindianstartup.in</Text>
              </div>
            </a>
            
            <a 
              href="https://wa.me/918894717777"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-black transition-colors"
            >
              <Phone className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <Text weight="medium">WhatsApp Support</Text>
                <Text size="sm" color="muted">+91 88947 17777</Text>
              </div>
            </a>
          </div>
          
          <Text size="sm" color="muted" className="mt-6">
            Our support team typically responds within 2 hours during business hours (9 AM - 6 PM IST)
          </Text>
        </div>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Heading, Text } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Logo } from '@/components/icons/Logo';
import { Check, Star } from 'lucide-react';

export default function PricingPage() {
  const features = [
    '30-day structured journey from idea to launch',
    'India-specific guidance (MCA, GST, DPIIT)',
    'Downloadable templates and checklists',
    'Gamified learning with XP and badges',
    'Community access and peer support',
    'Expert office hours (weekly)',
    'Startup portfolio builder',
    'Access for 365 days',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-black hover:opacity-80 transition-opacity">
              <Logo variant="full" className="h-8" />
            </Link>
            
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="container max-w-3xl">
          <Badge variant="outline" className="mb-4">
            🚀 LAUNCH OFFER - LIMITED TIME
          </Badge>
          
          <Heading as="h1" className="mb-4">
            Launch Your Startup in 30 Days
          </Heading>
          
          <Text size="xl" className="text-gray-600">
            Join 2,847+ Indian founders who are building their startups 
            with our step-by-step playbooks and gamified journey.
          </Text>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="pb-24">
        <div className="container max-w-4xl">
          <Card variant="bordered" className="relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-8 transform -translate-y-1/2">
              <Badge variant="default" size="lg" className="flex items-center gap-1">
                <Star className="w-4 h-4" fill="currentColor" />
                MOST POPULAR
              </Badge>
            </div>

            <CardHeader className="text-center pt-12 pb-8 border-b border-gray-200">
              <CardTitle>
                <Heading as="h2" variant="h3">
                  30-Day India Launch Sprint
                </Heading>
              </CardTitle>
              
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-2">
                  <Text className="text-gray-500 line-through">₹2,499</Text>
                  <Text className="font-heading text-5xl font-bold">₹999</Text>
                </div>
                <Text size="sm" color="muted" className="mt-2">
                  Early bird pricing for first 100 founders
                </Text>
              </div>
            </CardHeader>

            <CardContent className="py-8">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <Text size="sm">{feature}</Text>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-8">
                <Link href="/signup" className="block">
                  <Button variant="primary" size="lg" className="w-full">
                    Start Your Journey Now
                  </Button>
                </Link>
                
                <Text size="xs" color="muted" className="text-center mt-4">
                  No hidden fees. Cancel anytime. 7-day money-back guarantee.
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <Text size="sm" color="muted" className="mb-6">
              TRUSTED BY FOUNDERS FROM
            </Text>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <Text className="font-heading font-semibold">IIT Delhi</Text>
              <Text className="font-heading font-semibold">IIM Bangalore</Text>
              <Text className="font-heading font-semibold">BITS Pilani</Text>
              <Text className="font-heading font-semibold">ISB</Text>
              <Text className="font-heading font-semibold">NIT Trichy</Text>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mt-16 text-center">
            <Text color="muted">
              Questions?{' '}
              <Link href="/faq" className="text-black underline hover:no-underline">
                Check our FAQ
              </Link>
              {' or '}
              <a 
                href="mailto:support@theindianstartup.in" 
                className="text-black underline hover:no-underline"
              >
                email us
              </a>
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';
import { 
  HelpCircle,
  Search,
  ChevronDown,
  ChevronRight,
  Mail,
  MessageCircle,
  Clock,
  BookOpen,
  Video,
  FileText,
  Users,
  Zap,
  Trophy,
  Target,
  Calendar,
  CreditCard,
  Shield,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Phone,
  Globe
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface ContactMethod {
  icon: React.ElementType;
  title: string;
  description: string;
  action: string;
  actionType: 'email' | 'link' | 'chat';
  actionValue: string;
  responseTime: string;
  badge?: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How do I start my 30-day journey?',
    answer: 'After completing your onboarding, you\'ll automatically be placed on Day 1 of your journey. Each day unlocks new lessons, tasks, and resources to help you build your startup step by step.',
    category: 'Getting Started',
    tags: ['journey', 'onboarding', 'beginner']
  },
  {
    id: '2',
    question: 'What happens if I miss a day?',
    answer: 'Don\'t worry! You can catch up at any time. Your progress is saved, and you can continue from where you left off. However, maintaining a daily streak will help you build momentum and earn bonus XP.',
    category: 'Progress',
    tags: ['streak', 'progress', 'daily']
  },
  {
    id: '3',
    question: 'How do I earn XP and badges?',
    answer: 'You earn XP by completing daily lessons (20 XP), uploading proof of work (30 XP), and maintaining streaks (bonus XP). Badges are awarded for specific milestones like completing your first week or finishing market research.',
    category: 'Gamification',
    tags: ['xp', 'badges', 'rewards']
  },
  {
    id: '4',
    question: 'Can I access my content after 30 days?',
    answer: 'Yes! Your purchase gives you access to all content and features for a full year. You can revisit lessons, update your portfolio, and continue using the platform.',
    category: 'Access',
    tags: ['access', 'subscription', 'year']
  },
  {
    id: '5',
    question: 'How do I update my startup portfolio?',
    answer: 'Go to the Portfolio section in your dashboard. Each section can be edited individually. Your portfolio automatically builds as you progress through the 30-day journey.',
    category: 'Portfolio',
    tags: ['portfolio', 'editing', 'startup']
  },
  {
    id: '6',
    question: 'What if I need help with Indian regulations?',
    answer: 'Our content is specifically designed for Indian startups and includes guidance on MCA registration, GST, DPIIT, and other regulatory requirements. For specific legal advice, we recommend consulting with a lawyer.',
    category: 'Legal',
    tags: ['legal', 'regulations', 'india', 'compliance']
  },
  {
    id: '7',
    question: 'Can I get a refund?',
    answer: 'We offer a 7-day money-back guarantee if you\'re not satisfied with the platform. Contact our support team within 7 days of purchase for a full refund.',
    category: 'Billing',
    tags: ['refund', 'billing', 'guarantee']
  },
  {
    id: '8',
    question: 'How do I join the community?',
    answer: 'The Community section is available in your dashboard. You can ask questions, share progress, connect with other founders, and participate in expert sessions.',
    category: 'Community',
    tags: ['community', 'networking', 'founders']
  },
  {
    id: '9',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure Razorpay integration. All transactions are encrypted and secure.',
    category: 'Billing',
    tags: ['payment', 'razorpay', 'security']
  },
  {
    id: '10',
    question: 'Can I change my notification preferences?',
    answer: 'Yes! Go to Settings > Notifications to customize when and how you receive updates. You can control daily reminders, weekly reports, and community notifications.',
    category: 'Settings',
    tags: ['notifications', 'settings', 'email']
  }
];

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get detailed help with your questions',
    action: 'Send Email',
    actionType: 'email',
    actionValue: 'support@theindianstartup.in',
    responseTime: 'Within 24 hours',
    badge: 'Most Popular'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Quick answers to urgent questions',
    action: 'Start Chat',
    actionType: 'chat',
    actionValue: '#',
    responseTime: 'Within 2 hours',
    badge: 'Fastest'
  },
  {
    icon: Calendar,
    title: 'Expert Session',
    description: 'Book a 1-on-1 call with our experts',
    action: 'Schedule Call',
    actionType: 'link',
    actionValue: 'https://calendly.com/theindianstartup',
    responseTime: 'Same week',
    badge: 'Premium'
  }
];

const quickLinks = [
  {
    icon: BookOpen,
    title: 'Getting Started Guide',
    description: 'Complete walkthrough for new users',
    link: '#getting-started'
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Watch how to use key features',
    link: '#tutorials'
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Detailed guides and resources',
    link: '#docs'
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with other founders',
    link: '/community'
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [contactFormData, setContactFormData] = useState({
    subject: '',
    message: '',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFAQs(newExpanded);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/support/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormData)
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setContactFormData({ subject: '', message: '', urgency: 'normal' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      // You could show an error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactMethod = (method: ContactMethod) => {
    switch (method.actionType) {
      case 'email':
        window.location.href = `mailto:${method.actionValue}?subject=Help Request`;
        break;
      case 'link':
        window.open(method.actionValue, '_blank');
        break;
      case 'chat':
        // Implement chat functionality
        alert('Live chat will be available soon!');
        break;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="p-8 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex p-3 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <Heading as="h1" className="mb-4">Help & Support</Heading>
            <Text size="lg" color="muted" className="max-w-2xl mx-auto">
              Get the help you need to succeed in your startup journey. Find answers, connect with experts, and join our community.
            </Text>
          </div>

          {/* Search and Categories */}
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help topics, questions, or keywords..."
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-12">
            <Heading as="h2" variant="h4" className="mb-6">Quick Help</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Card key={index} variant="interactive" className="h-full">
                    <a href={link.link} className="block h-full">
                      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                        <IconComponent className="w-8 h-8 text-blue-600 mb-3" />
                        <Text weight="medium" className="mb-2">{link.title}</Text>
                        <Text size="sm" color="muted">{link.description}</Text>
                      </CardContent>
                    </a>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Methods */}
          <div className="mb-12">
            <Heading as="h2" variant="h4" className="mb-6">Get in Touch</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="relative">
                    {method.badge && (
                      <Badge 
                        variant="default" 
                        className="absolute -top-2 -right-2 z-10"
                      >
                        {method.badge}
                      </Badge>
                    )}
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex p-3 bg-gray-100 rounded-full mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Text weight="medium" className="mb-2">{method.title}</Text>
                      <Text size="sm" color="muted" className="mb-4">{method.description}</Text>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <Text size="xs" color="muted">{method.responseTime}</Text>
                      </div>
                      <Button 
                        variant={method.badge === 'Most Popular' ? 'primary' : 'outline'}
                        onClick={() => handleContactMethod(method)}
                        className="w-full"
                      >
                        {method.action}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <Heading as="h2" variant="h4" className="mb-6">
              Frequently Asked Questions
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({filteredFAQs.length} results)
              </span>
            </Heading>
            
            <div className="space-y-4">
              {filteredFAQs.map(faq => {
                const isExpanded = expandedFAQs.has(faq.id);
                return (
                  <Card key={faq.id} className="overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <Text weight="medium" className="mb-2">{faq.question}</Text>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm">{faq.category}</Badge>
                            {faq.tags.map(tag => (
                              <Badge key={tag} variant="outline" size="sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <Text color="muted" className="mt-4">{faq.answer}</Text>
                      </div>
                    )}
                  </Card>
                );
              })}
              
              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <Text weight="medium" className="mb-2">No results found</Text>
                  <Text color="muted">Try adjusting your search or browse different categories</Text>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Still Need Help?</CardTitle>
              <Text color="muted">
                Can&apos;t find what you&apos;re looking for? Send us a message and we&apos;ll get back to you quickly.
              </Text>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <Alert variant="success" className="mb-6">
                  <CheckCircle className="w-4 h-4" />
                  Thank you! We&apos;ve received your message and will respond within 24 hours.
                </Alert>
              )}
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    value={contactFormData.subject}
                    onChange={(e) => setContactFormData({ ...contactFormData, subject: e.target.value })}
                    placeholder="What do you need help with?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={contactFormData.urgency}
                    onChange={(e) => setContactFormData({ ...contactFormData, urgency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="low">Low - General question</option>
                    <option value="normal">Normal - Need help</option>
                    <option value="high">High - Account issue</option>
                    <option value="urgent">Urgent - Can&apos;t access content</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                    placeholder="Please describe your issue or question in detail..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    rows={5}
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    variant="primary"
                    isLoading={isSubmitting}
                    disabled={!contactFormData.subject || !contactFormData.message}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <Text size="sm" color="muted" className="mb-4">
                Looking for more resources?
              </Text>
              <div className="flex justify-center gap-6">
                <a 
                  href="/community" 
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Users className="w-4 h-4" />
                  Join Community
                </a>
                <a 
                  href="https://blog.theindianstartup.in" 
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-4 h-4" />
                  Blog & Resources
                </a>
                <a 
                  href="/resources" 
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <FileText className="w-4 h-4" />
                  Download Templates
                </a>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
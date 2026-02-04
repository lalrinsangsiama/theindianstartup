'use client';

import React from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ArrowLeft,
  Heart,
  BookOpen,
  Award,
  Target,
  Users,
  MessageSquare,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function CommunityGuidelinesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/community">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Community
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Community Guidelines
                </Heading>
                <Text className="text-gray-600">
                  Building a supportive and productive founder community together
                </Text>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <Text className="text-lg leading-relaxed">
                Welcome to The Indian Startup community! Our community is built on mutual respect,
                collaboration, and a shared passion for entrepreneurship. These guidelines help us
                maintain a positive and productive environment where founders can learn, share, and
                grow together.
              </Text>
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Our Core Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
                <Heart className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <Text weight="medium" className="mb-1">Be Respectful & Supportive</Text>
                  <Text size="sm" color="muted">
                    Treat every member with dignity and respect. The startup journey is challenging -
                    be supportive of fellow founders regardless of their stage, experience, or background.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <Text weight="medium" className="mb-1">Share Knowledge Generously</Text>
                  <Text size="sm" color="muted">
                    Share your experiences, learnings, and resources freely. What you share today
                    might help another founder avoid costly mistakes or discover new opportunities.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <Award className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <Text weight="medium" className="mb-1">Celebrate Others&apos; Successes</Text>
                  <Text size="sm" color="muted">
                    Celebrate milestones and achievements of fellow founders. A supportive community
                    lifts everyone up and creates positive momentum for all members.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                <Target className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <Text weight="medium" className="mb-1">Stay On-Topic & Provide Value</Text>
                  <Text size="sm" color="muted">
                    Keep discussions focused on startup-related topics. Every post and comment should
                    aim to add value - share insights, ask meaningful questions, or offer constructive feedback.
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What We Encourage */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                What We Encourage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Sharing genuine startup experiences, both successes and failures</Text>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Asking thoughtful questions about startup challenges</Text>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Providing constructive feedback and actionable advice</Text>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Sharing useful resources, tools, and learning materials</Text>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Networking and building genuine connections</Text>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Helping fellow founders with introductions and referrals</Text>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Engaging respectfully even when you disagree</Text>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What We Don&apos;t Allow */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                What We Don&apos;t Allow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Spam, self-promotion, or unsolicited advertising</Text>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Harassment, bullying, or personal attacks</Text>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Sharing false or misleading information</Text>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Disclosure of others&apos; confidential information</Text>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Content that is discriminatory, offensive, or inappropriate</Text>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Soliciting investments or money from community members</Text>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <Text size="sm">Impersonating others or creating fake accounts</Text>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Posting Guidelines */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Posting Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Text weight="medium" className="mb-2">Choose the Right Category</Text>
                <Text size="sm" color="muted">
                  Post in the appropriate category to help others find relevant content. Use
                  &quot;Questions&quot; for help requests, &quot;Success Stories&quot; for wins, and &quot;Resources&quot;
                  for sharing useful materials.
                </Text>
              </div>

              <div>
                <Text weight="medium" className="mb-2">Write Clear Titles</Text>
                <Text size="sm" color="muted">
                  Make your titles descriptive and specific. Instead of &quot;Need help,&quot; try
                  &quot;How to approach VCs for seed funding in healthcare tech?&quot;
                </Text>
              </div>

              <div>
                <Text weight="medium" className="mb-2">Provide Context</Text>
                <Text size="sm" color="muted">
                  When asking questions, provide enough background information for others
                  to understand your situation and give meaningful responses.
                </Text>
              </div>

              <div>
                <Text weight="medium" className="mb-2">Use Tags Appropriately</Text>
                <Text size="sm" color="muted">
                  Add relevant tags to help others discover your posts. Use existing tags
                  when possible for better discoverability.
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Enforcement */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Enforcement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4">
                Violations of these guidelines may result in:
              </Text>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-medium">1.</span>
                  <Text size="sm">Content removal and a warning</Text>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-medium">2.</span>
                  <Text size="sm">Temporary restriction of posting privileges</Text>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-medium">3.</span>
                  <Text size="sm">Permanent removal from the community</Text>
                </li>
              </ul>
              <Text size="sm" color="muted">
                If you see content that violates these guidelines, please report it using
                the report button or contact us at support@theindianstartup.in
              </Text>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <Text color="muted" className="mb-4">
              By participating in our community, you agree to follow these guidelines.
            </Text>
            <Link href="/community">
              <Button variant="primary">
                Return to Community
              </Button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

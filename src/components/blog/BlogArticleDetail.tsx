'use client';

import React from 'react';
import Link from 'next/link';
import { BlogArticle } from '@/data/blog-articles';
import { SafeHTML } from '@/lib/sanitize';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading, Text } from '@/components/ui/Typography';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen,
  Star,
  Trophy,
  Users
} from 'lucide-react';

interface BlogArticleDetailProps {
  article: BlogArticle;
}

function formatIndianPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export const BlogArticleDetail: React.FC<BlogArticleDetailProps> = ({ article }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Back to Blog Button */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <Link href="/blog">
          <Button variant="outline" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <Badge className="mb-4 bg-black text-white">
            {article.category}
          </Badge>

          {/* Title */}
          <Heading as="h1" variant="h1" className="mb-6">
            {article.title}
          </Heading>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <Text size="sm">{article.author.name}</Text>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <Text size="sm">
                {new Date(article.publishedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <Text size="sm">{article.readTime} min read</Text>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mb-12 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <SafeHTML 
              html={article.content}
              className="article-content"
              options={{
                allowImages: true,
                allowLinks: true,
                allowStyles: true,
                allowTables: true,
                maxLength: 50000, // Reasonable limit for blog content
              }}
            />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {article.tags.map((tag) => (
              <Badge 
                key={tag} 
                size="sm" 
                className="bg-gray-100 text-gray-700"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Course CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <Heading as="h2" variant="h3" className="mb-2">
                    Ready to Master This Topic?
                  </Heading>
                  <Text color="muted" size="lg">
                    Take your knowledge to the next level with our comprehensive course
                  </Text>
                </div>

                <div className="bg-white rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Text weight="medium" className="text-lg">
                          {article.courseName}
                        </Text>
                        <Badge className="bg-green-100 text-green-700">
                          {article.courseCode}
                        </Badge>
                      </div>
                      <Text color="muted" className="mb-4">
                        Master every aspect covered in this article with step-by-step guidance, 
                        templates, and expert insights.
                      </Text>
                      
                      {/* Course Features */}
                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <Text size="sm" color="muted">Expert-designed curriculum</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-500" />
                          <Text size="sm" color="muted">2,500+ successful students</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-500" />
                          <Text size="sm" color="muted">100+ templates included</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-purple-500" />
                          <Text size="sm" color="muted">Certificate of completion</Text>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Text size="sm" color="muted">Course Price:</Text>
                          <Text size="xl" weight="bold" className="text-green-600">
                            {formatIndianPrice(article.coursePrice)}
                          </Text>
                        </div>
                        <Link href={`/products/${article.courseCode.toLowerCase()}`}>
                          <Button size="lg" className="group">
                            View Course Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Text size="sm" color="muted">
                    Join thousands of founders who have transformed their startups with our proven frameworks
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleDetail;
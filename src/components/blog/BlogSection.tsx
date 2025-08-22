'use client';

import { useState } from 'react';
import Link from 'next/link';
import { blogArticles, getFeaturedArticles, getAllCategories, getAllTags, BlogArticle } from '@/data/blog-articles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Clock, Calendar, ArrowRight, Search, Filter, Tag, User } from 'lucide-react';

interface BlogSectionProps {
  showFilters?: boolean;
  featuredOnly?: boolean;
  limit?: number;
  category?: string;
}

export default function BlogSection({ 
  showFilters = true, 
  featuredOnly = false, 
  limit,
  category 
}: BlogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get articles based on props
  let articles = featuredOnly ? getFeaturedArticles() : blogArticles;
  
  if (category) {
    articles = articles.filter(article => article.category === category);
  }

  // Apply filters
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesTag = selectedTag === 'all' || article.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Apply limit
  const displayArticles = limit ? filteredArticles.slice(0, limit) : filteredArticles;

  const categories = getAllCategories();
  const tags = getAllTags();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            {featuredOnly ? 'Featured Articles' : 'Startup Knowledge Hub'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, practical guides, and actionable strategies to help you build and scale your startup successfully.
          </p>
        </div>

        {/* Filters */}
        {showFilters && !featuredOnly && (
          <div className="mb-8 bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>

              {/* Category Filter Buttons */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Categories:</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Categories
                  </Button>
                  {categories.map((cat: string) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filter Summary */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge className="bg-blue-100 text-blue-800">
                      Search: "{searchQuery}"
                    </Badge>
                  )}
                  {selectedCategory !== 'all' && (
                    <Badge className="bg-green-100 text-green-800">
                      Category: {selectedCategory}
                    </Badge>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {displayArticles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {displayArticles.map((article: BlogArticle) => (
              <Card key={article.id} className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    {article.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <CardTitle className="text-lg font-semibold leading-tight text-black group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${article.slug}`} className="line-clamp-2">
                      {article.title}
                    </Link>
                  </CardTitle>
                  
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0 mt-auto">
                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                          +{article.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Related Product */}
                  {article.relatedProducts && article.relatedProducts.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Related Course:</span>
                        <Link 
                          href={`/products/${article.relatedProducts[0].toLowerCase()}`}
                          className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                        >
                          {article.relatedProducts[0]}
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime} min read
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{article.author.name}</p>
                      <p className="text-xs text-gray-500">{article.author.role}</p>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <Link href={`/blog/${article.slug}`}>
                    <Button variant="outline" className="w-full group/btn">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* View All Button (when limited) */}
        {limit && displayArticles.length >= limit && filteredArticles.length > limit && (
          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}

        {/* Categories Overview (when showing all) */}
        {!featuredOnly && !limit && (
          <div className="mt-16 pt-12 border-t">
            <h3 className="text-2xl font-bold text-black mb-8 text-center">Explore by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat: string) => {
                const categoryCount = blogArticles.filter((article: BlogArticle) => article.category === cat).length;
                return (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className="text-center p-3 h-auto flex-col"
                  >
                    <span className="font-medium text-xs mb-1">{cat}</span>
                    <span className="text-xs text-gray-500">
                      {categoryCount} article{categoryCount !== 1 ? 's' : ''}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
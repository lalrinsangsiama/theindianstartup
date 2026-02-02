'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Calendar,
  Tag,
  Image,
  Search,
  Filter,
  BarChart3,
  Globe,
  Share2,
  MessageSquare,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  Link,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Modal } from '@/components/ui';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: string;
  authorBio?: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  scheduledFor?: string;
  category: string;
  tags: string[];
  readingTime?: number;
  wordCount?: number;
  viewCount: number;
  likeCount: number;
  shareCount: number;
  commentCount: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt: string;
  updatedAt: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  postCount: number;
}

export function BlogManagement() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });

  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'The Indian Startup Team',
    authorBio: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    scheduledFor: '',
    category: '',
    tags: [] as string[],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [] as string[]
  });

  // Mock data for demonstration
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Complete Guide to DPIIT Startup Recognition in 2024',
      slug: 'complete-guide-dpiit-startup-recognition-2024',
      excerpt: 'Everything you need to know about DPIIT startup recognition, benefits, and step-by-step application process.',
      content: `# Complete Guide to DPIIT Startup Recognition in 2024

The Department for Promotion of Industry and Internal Trade (DPIIT) startup recognition is one of the most valuable certifications an Indian startup can obtain. This comprehensive guide walks you through everything you need to know.

## What is DPIIT Recognition?

DPIIT recognition is an official certification from the Government of India that validates your business as a startup. This recognition comes with numerous benefits including tax exemptions, easier compliance, and access to government schemes.

## Benefits of DPIIT Recognition

### 1. Tax Benefits
- Income tax exemption for 3 consecutive years
- Capital gains tax exemption under Section 54EE
- No angel tax on investments

### 2. IPR Benefits  
- 80% rebate on patent filing fees
- Fast-track patent examination
- Free IP facilitation services

### 3. Compliance Benefits
- Self-certification for labor and environment laws
- Simplified exit process
- Reduced inspection under 9 labor and environment laws

## Eligibility Criteria

To qualify for DPIIT recognition, your startup must meet these criteria:

1. **Incorporation**: Incorporated as a private limited company, partnership firm, or LLP
2. **Age**: Not older than 10 years from incorporation
3. **Turnover**: Annual turnover should not exceed ₹100 crore in any financial year
4. **Innovation**: Working towards innovation, development, or improvement of products/processes/services
5. **Scalability**: Should have potential for employment generation or wealth creation

## Required Documents

### For Private Limited Company:
- Certificate of Incorporation
- Memorandum and Articles of Association
- PAN Card of the company
- Brief description of business/product/service
- Letter of recommendation (optional)

### For Partnership/LLP:
- Partnership deed/LLP Agreement
- Certificate of Registration
- PAN Card
- Business description

## Step-by-Step Application Process

### Step 1: Prepare Documents
Gather all required documents and ensure they are properly attested.

### Step 2: Register on Startup India Portal
1. Visit https://www.startupindia.gov.in/
2. Click on "Register" 
3. Fill in basic details
4. Verify email and mobile number

### Step 3: Fill Application Form
1. Login to your account
2. Click on "Recognition Application"
3. Fill in company details
4. Upload required documents
5. Submit application

### Step 4: Application Review
- Initial review takes 2-3 working days
- If approved, you receive recognition certificate
- If rejected, you can reapply after addressing issues

### Step 5: Download Certificate
Once approved, download your DPIIT recognition certificate from the portal.

## Common Mistakes to Avoid

1. **Incorrect Business Description**: Be specific about innovation/improvement aspects
2. **Missing Documents**: Ensure all required documents are uploaded
3. **Generic Recommendations**: Letters of recommendation should be specific and detailed
4. **Late Application**: Apply before completing 10 years of incorporation

## Post-Recognition Benefits

Once you receive DPIIT recognition:

1. **Access to Startup India Hub**: Connect with mentors, investors, and other startups
2. **Government Scheme Eligibility**: Apply for various government funding schemes
3. **Networking Opportunities**: Participate in startup events and conferences
4. **Investor Visibility**: Listed on the official startup directory

## Maintaining Your Status

To maintain DPIIT recognition:
- File annual returns on time
- Maintain innovation focus in business operations  
- Keep turnover below ₹100 crore threshold
- Update any significant business changes

## Conclusion

DPIIT recognition is a game-changer for Indian startups. The process is straightforward if you have all documents ready and meet eligibility criteria. Start your application today and unlock the numerous benefits available to recognized startups.

Need help with your DPIIT application? Our P2: Incorporation & Compliance Kit provides step-by-step guidance and all required templates.`,
      featuredImage: '/images/blog/dpiit-recognition-guide.jpg',
      author: 'Priya Sharma',
      authorBio: 'Legal & Compliance Expert with 8 years experience helping startups navigate Indian regulations',
      status: 'published',
      publishedAt: '2024-01-20T10:00:00Z',
      category: 'Legal & Compliance',
      tags: ['dpiit', 'government-schemes', 'legal-advice', 'startup-guide'],
      readingTime: 8,
      wordCount: 1200,
      viewCount: 2847,
      likeCount: 89,
      shareCount: 156,
      commentCount: 23,
      metaTitle: 'DPIIT Startup Recognition Guide 2024 - Complete Process & Benefits',
      metaDescription: 'Step-by-step guide to DPIIT startup recognition in India. Learn eligibility, documents, application process & benefits. Get certified today!',
      metaKeywords: ['DPIIT recognition', 'startup India', 'government benefits', 'tax exemption'],
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      title: 'How to Raise Your First ₹1 Crore: A Complete Funding Guide',
      slug: 'how-to-raise-first-1-crore-funding-guide',
      excerpt: 'Proven strategies and step-by-step process to successfully raise your startup\'s first major funding round in India.',
      content: `# How to Raise Your First ₹1 Crore: A Complete Funding Guide

Raising your startup's first significant funding round is a major milestone. This guide provides a proven roadmap to successfully raise ₹1 crore or more for your Indian startup.`,
      featuredImage: '/images/blog/funding-guide.jpg',
      author: 'Rajesh Kumar',
      authorBio: 'Former VC and startup founder who has raised over ₹50 crore across multiple ventures',
      status: 'draft',
      category: 'Funding & Investment',
      tags: ['funding', 'venture-capital', 'angel-investment', 'startup-guide'],
      readingTime: 12,
      wordCount: 1800,
      viewCount: 0,
      likeCount: 0,
      shareCount: 0,
      commentCount: 0,
      metaTitle: 'How to Raise ₹1 Crore Funding - Complete Guide for Indian Startups',
      metaDescription: 'Learn proven strategies to raise your first ₹1 crore funding. Includes investor deck templates, pitch strategies & funding timeline.',
      createdAt: '2024-01-22T14:30:00Z',
      updatedAt: '2024-01-22T16:45:00Z'
    },
    {
      id: '3',
      title: 'State-wise Startup Benefits: Which State is Best for Your Business?',
      slug: 'state-wise-startup-benefits-best-state-for-business',
      excerpt: 'Comprehensive comparison of startup benefits across Indian states. Find the best location for maximum government support and subsidies.',
      content: `# State-wise Startup Benefits: Which State is Best for Your Business?

Different Indian states offer varying benefits for startups. This comprehensive guide helps you choose the best state for maximum government support.`,
      featuredImage: '/images/blog/state-benefits.jpg',
      author: 'Amit Patel',
      authorBio: 'Government Policy Expert specializing in startup ecosystem development across Indian states',
      status: 'published',
      publishedAt: '2024-01-18T08:00:00Z',
      category: 'Government & Policy',
      tags: ['state-benefits', 'government-schemes', 'location-strategy', 'subsidies'],
      readingTime: 15,
      wordCount: 2200,
      viewCount: 1634,
      likeCount: 67,
      shareCount: 89,
      commentCount: 34,
      createdAt: '2024-01-16T11:20:00Z',
      updatedAt: '2024-01-18T08:00:00Z'
    }
  ];

  const mockCategories: BlogCategory[] = [
    { id: '1', name: 'Legal & Compliance', slug: 'legal-compliance', color: '#EF4444', postCount: 12 },
    { id: '2', name: 'Funding & Investment', slug: 'funding-investment', color: '#10B981', postCount: 8 },
    { id: '3', name: 'Government & Policy', slug: 'government-policy', color: '#8B5CF6', postCount: 6 },
    { id: '4', name: 'Sales & Marketing', slug: 'sales-marketing', color: '#F59E0B', postCount: 10 },
    { id: '5', name: 'Finance & Operations', slug: 'finance-operations', color: '#3B82F6', postCount: 7 }
  ];

  useEffect(() => {
    setPosts(mockPosts);
    setCategories(mockCategories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || post.status === filters.status;
    const matchesCategory = filters.category === 'all' || post.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <AlertCircle className="w-4 h-4" />;
      case 'archived': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleCreatePost = () => {
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featuredImage: '',
      author: 'The Indian Startup Team',
      authorBio: '',
      status: 'draft',
      scheduledFor: '',
      category: categories[0]?.name || '',
      tags: [],
      metaTitle: '',
      metaDescription: '',
      metaKeywords: []
    });
    setSelectedPost(null);
    setShowPostModal(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      featuredImage: post.featuredImage || '',
      author: post.author,
      authorBio: post.authorBio || '',
      status: post.status,
      scheduledFor: post.scheduledFor || '',
      category: post.category,
      tags: post.tags,
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      metaKeywords: post.metaKeywords || []
    });
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleSavePost = async () => {
    // Generate slug if empty
    if (!postForm.slug && postForm.title) {
      setPostForm(prev => ({ ...prev, slug: generateSlug(prev.title) }));
    }

    // Here you would call the API to save the post
    logger.info('Saving post:', postForm);
    
    setShowPostModal(false);
    // Refresh posts list
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    // Here you would call the API to delete the post
    logger.info('Deleting post:', { postId });
    
    setPosts(posts.filter(p => p.id !== postId));
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading blog management...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-purple-900 mb-2">📝 Blog Management</h1>
              <p className="text-purple-700">Create, edit, and manage your blog content for maximum engagement</p>
            </div>
            <Button
              onClick={handleCreatePost}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Blog Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'posts', label: 'All Posts', icon: FileText },
            { id: 'categories', label: 'Categories', icon: Tag },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'seo', label: 'SEO Tools', icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search posts by title or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg line-clamp-1">{post.title}</h3>
                        <Badge className={`text-xs ${getStatusColor(post.status)}`}>
                          {getStatusIcon(post.status)}
                          <span className="ml-1">{post.status}</span>
                        </Badge>
                      </div>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-6 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.status === 'published' && post.publishedAt 
                            ? formatDate(post.publishedAt) 
                            : formatDate(post.updatedAt)
                          }
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} min read
                        </span>
                      </div>

                      <div className="flex items-center gap-6 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.viewCount.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {post.commentCount} comments
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          {post.shareCount} shares
                        </span>
                      </div>

                      {post.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          {post.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 4 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {post.status === 'published' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          title="View Post"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`)}
                        title="Copy Link"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No blog posts found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || filters.status !== 'all' || filters.category !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first blog post to start building your content library'
                  }
                </p>
                <Button onClick={handleCreatePost}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Blog Categories</CardTitle>
                <Button onClick={() => setShowCategoryModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <Badge variant="outline" className="text-xs">
                          {category.postCount} posts
                        </Badge>
                      </div>
                      <h3 className="font-medium mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Posts</p>
                    <p className="text-2xl font-bold">{posts.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Published</p>
                    <p className="text-2xl font-bold">{posts.filter(p => p.status === 'published').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold">{posts.reduce((sum, p) => sum + p.viewCount, 0).toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement</p>
                    <p className="text-2xl font-bold">{posts.reduce((sum, p) => sum + p.likeCount + p.shareCount + p.commentCount, 0)}</p>
                  </div>
                  <Share2 className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts
                  .filter(p => p.status === 'published')
                  .sort((a, b) => b.viewCount - a.viewCount)
                  .slice(0, 5)
                  .map((post, index) => (
                    <div key={post.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium line-clamp-1">{post.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>{post.viewCount.toLocaleString()} views</span>
                          <span>{post.likeCount} likes</span>
                          <span>{post.shareCount} shares</span>
                          <span>{post.commentCount} comments</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SEO Tools Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Posts Missing Meta Descriptions</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {posts.filter(p => !p.metaDescription).length}
                  </p>
                  <p className="text-sm text-gray-600">Need attention</p>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Posts with Good SEO</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {posts.filter(p => p.metaTitle && p.metaDescription && p.metaKeywords && p.metaKeywords.length > 0).length}
                  </p>
                  <p className="text-sm text-gray-600">Optimized posts</p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Blog Post Editor Modal */}
      {showPostModal && (
        <Modal
          isOpen={showPostModal}
          onClose={() => setShowPostModal(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={postForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setPostForm({ 
                      ...postForm, 
                      title,
                      slug: postForm.slug || generateSlug(title)
                    });
                  }}
                  placeholder="Enter an engaging title..."
                  className="text-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium">URL Slug</label>
                <Input
                  value={postForm.slug}
                  onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                  placeholder="url-friendly-slug"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Excerpt</label>
                <Textarea
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  placeholder="Brief description for previews and social sharing..."
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  placeholder="Write your blog post content here (Markdown supported)..."
                  rows={20}
                  className="font-mono text-sm"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Publish Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Publish Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <select
                      value={postForm.status}
                      onChange={(e) => setPostForm({ ...postForm, status: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-md mt-1"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Schedule for Later</label>
                    <Input
                      type="datetime-local"
                      value={postForm.scheduledFor}
                      onChange={(e) => setPostForm({ ...postForm, scheduledFor: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Categories & Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Organization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={postForm.category}
                      onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md mt-1"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Tags (comma separated)</label>
                    <Input
                      value={postForm.tags.join(', ')}
                      onChange={(e) => setPostForm({ 
                        ...postForm, 
                        tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                      })}
                      placeholder="startup, funding, legal"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Author Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Author Name</label>
                    <Input
                      value={postForm.author}
                      onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Author Bio</label>
                    <Textarea
                      value={postForm.authorBio}
                      onChange={(e) => setPostForm({ ...postForm, authorBio: e.target.value })}
                      placeholder="Brief author description..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* SEO Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Meta Title</label>
                    <Input
                      value={postForm.metaTitle}
                      onChange={(e) => setPostForm({ ...postForm, metaTitle: e.target.value })}
                      placeholder="SEO optimized title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Meta Description</label>
                    <Textarea
                      value={postForm.metaDescription}
                      onChange={(e) => setPostForm({ ...postForm, metaDescription: e.target.value })}
                      placeholder="SEO meta description..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Keywords</label>
                    <Input
                      value={postForm.metaKeywords.join(', ')}
                      onChange={(e) => setPostForm({ 
                        ...postForm, 
                        metaKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                      })}
                      placeholder="keyword1, keyword2"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Featured Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Input
                      value={postForm.featuredImage}
                      onChange={(e) => setPostForm({ ...postForm, featuredImage: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="sm" className="w-full">
                      <Upload className="w-3 h-3 mr-1" />
                      Upload Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPostModal(false)}>
                Cancel
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => {
                  setPostForm({ ...postForm, status: 'draft' });
                  handleSavePost();
                }}
              >
                Save as Draft
              </Button>
              <Button 
                onClick={() => {
                  setPostForm({ ...postForm, status: 'published' });
                  handleSavePost();
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Publish Post
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
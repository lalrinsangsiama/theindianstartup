'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { 
  BookOpen,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Play,
  Settings,
  Users,
  MessageSquare,
  FileText,
  Database,
  Mail,
  BarChart3,
  HelpCircle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Badge } from '@/components/ui';

interface GuideStep {
  id: string;
  title: string;
  description: string;
  action?: () => void;
  completed?: boolean;
}

interface Guide {
  id: string;
  title: string;
  description: string;
  category: 'getting_started' | 'content_management' | 'user_support' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: GuideStep[];
  icon: any;
}

export function AdminGuide() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['getting_started']));

  const guides: Guide[] = [
    {
      id: 'first_steps',
      title: 'Your First Steps as Admin',
      description: 'Complete setup guide for new admins',
      category: 'getting_started',
      difficulty: 'beginner',
      estimatedTime: '30 minutes',
      icon: Play,
      steps: [
        {
          id: 'access_admin',
          title: 'Access Admin Panel',
          description: 'Navigate to /admin and log in with admin credentials',
          completed: true
        },
        {
          id: 'understand_dashboard',
          title: 'Understand the Dashboard',
          description: 'Learn about key metrics: users, tickets, revenue, and course completion rates',
        },
        {
          id: 'explore_tabs',
          title: 'Explore All Tabs',
          description: 'Visit each tab: Dashboard, Users, Products, Content, Resources, Support, Analytics',
        },
        {
          id: 'check_users',
          title: 'Review Current Users',
          description: 'Go to Users tab and see who has registered and their activity',
        },
        {
          id: 'seed_content',
          title: 'Seed Initial Content (IMPORTANT)',
          description: 'Go to Content tab → Click "Seed All Courses" to populate your platform with course content',
        }
      ]
    },
    {
      id: 'content_seeding',
      title: 'How to Seed Course Content',
      description: 'Step-by-step guide to populate all 30 courses',
      category: 'content_management',
      difficulty: 'beginner',
      estimatedTime: '15 minutes',
      icon: Database,
      steps: [
        {
          id: 'navigate_content',
          title: 'Go to Content Management',
          description: 'Click on the "Content" tab in the admin navigation',
        },
        {
          id: 'understand_seeding',
          title: 'Understand Seeding',
          description: 'Seeding populates your database with all 30 course structures (P1-P30) with lessons, modules, and content',
        },
        {
          id: 'click_seed_all',
          title: 'Click "Seed All Courses"',
          description: 'Click the green "Seed All Courses" button in the bulk operations section',
        },
        {
          id: 'wait_completion',
          title: 'Wait for Completion',
          description: 'The seeding process will show progress. Wait for "All courses seeded successfully!" message',
        },
        {
          id: 'validate_content',
          title: 'Validate Content',
          description: 'Click "Validate Content" to ensure all courses were seeded correctly',
        },
        {
          id: 'browse_courses',
          title: 'Browse Your Courses',
          description: 'Use the dropdown to select different products (P1-P12) and see their modules and lessons',
        }
      ]
    },
    {
      id: 'user_management',
      title: 'Managing Users',
      description: 'How to view, edit, and support your users',
      category: 'user_support',
      difficulty: 'beginner',
      estimatedTime: '20 minutes',
      icon: Users,
      steps: [
        {
          id: 'access_users',
          title: 'Access User Management',
          description: 'Go to the "Users" tab in admin navigation',
        },
        {
          id: 'understand_user_data',
          title: 'Understand User Information',
          description: 'Each user shows: contact info, purchase history, course progress, and support tickets',
        },
        {
          id: 'search_users',
          title: 'Search and Filter Users',
          description: 'Use the search box to find users by name or email',
        },
        {
          id: 'view_user_details',
          title: 'View User Details',
          description: 'Click on any user to see their complete profile, purchases, and course progress',
        },
        {
          id: 'contact_users',
          title: 'Contact Users',
          description: 'Use the "Email" button to send direct messages to users',
        },
        {
          id: 'update_user_info',
          title: 'Update User Information',
          description: 'Click "Edit" to modify user details, add notes, or assign tags',
        }
      ]
    },
    {
      id: 'support_tickets',
      title: 'Handling Support Tickets',
      description: 'Complete guide to customer support',
      category: 'user_support',
      difficulty: 'beginner',
      estimatedTime: '25 minutes',
      icon: MessageSquare,
      steps: [
        {
          id: 'access_support',
          title: 'Access Support Dashboard',
          description: 'Go to the "Support" tab in admin navigation',
        },
        {
          id: 'understand_tickets',
          title: 'Understand Ticket System',
          description: 'Tickets have priority levels (urgent, high, medium, low) and status (open, in progress, resolved)',
        },
        {
          id: 'filter_tickets',
          title: 'Filter and Search Tickets',
          description: 'Use filters to find tickets by status, priority, or category',
        },
        {
          id: 'respond_ticket',
          title: 'Respond to Tickets',
          description: 'Click on a ticket to open it, read the issue, and write a helpful response',
        },
        {
          id: 'update_status',
          title: 'Update Ticket Status',
          description: 'Change status to "In Progress" when working, "Resolved" when fixed',
        },
        {
          id: 'set_priority',
          title: 'Set Appropriate Priority',
          description: 'Payment issues = High/Urgent, General questions = Medium/Low',
        },
        {
          id: 'follow_up',
          title: 'Follow Up',
          description: 'Check back on resolved tickets to ensure customer satisfaction',
        }
      ]
    },
    {
      id: 'add_edit_content',
      title: 'Adding and Editing Course Content',
      description: 'How to add new lessons and edit existing content',
      category: 'content_management',
      difficulty: 'intermediate',
      estimatedTime: '30 minutes',
      icon: FileText,
      steps: [
        {
          id: 'select_product',
          title: 'Select a Product/Course',
          description: 'In Content tab, use dropdown to select which course (P1-P12) you want to edit',
        },
        {
          id: 'add_module',
          title: 'Add New Module',
          description: 'Click "Add Module" to create a new section in the course',
        },
        {
          id: 'add_lesson',
          title: 'Add New Lesson',
          description: 'Within a module, click "Add Lesson" to create individual lessons',
        },
        {
          id: 'edit_lesson_content',
          title: 'Edit Lesson Content',
          description: 'Click edit icon on any lesson to modify title, content, action items, and resources',
        },
        {
          id: 'add_resources',
          title: 'Add Resources',
          description: 'In Resources tab, add templates, links, and tools that lessons can reference',
        },
        {
          id: 'organize_content',
          title: 'Organize Content',
          description: 'Use order index to arrange modules and lessons in logical sequence',
        }
      ]
    },
    {
      id: 'analytics_insights',
      title: 'Understanding Analytics',
      description: 'How to read and act on platform analytics',
      category: 'advanced',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      icon: BarChart3,
      steps: [
        {
          id: 'dashboard_metrics',
          title: 'Dashboard Key Metrics',
          description: 'Understand: Total Users, Revenue, Course Completion, Support Tickets',
        },
        {
          id: 'user_activity',
          title: 'Monitor User Activity',
          description: 'Track new users, active users, and user engagement patterns',
        },
        {
          id: 'revenue_tracking',
          title: 'Revenue Analysis',
          description: 'Monitor monthly revenue, average order value, and popular products',
        },
        {
          id: 'course_performance',
          title: 'Course Performance',
          description: 'See which courses are most popular and have highest completion rates',
        },
        {
          id: 'identify_issues',
          title: 'Identify Issues',
          description: 'Look for: low completion rates, high support tickets, user drop-offs',
        },
        {
          id: 'make_improvements',
          title: 'Make Data-Driven Improvements',
          description: 'Use analytics to improve content, user experience, and support',
        }
      ]
    },
    {
      id: 'bulk_communications',
      title: 'Bulk Communications',
      description: 'How to send emails to groups of users',
      category: 'advanced',
      difficulty: 'intermediate',
      estimatedTime: '15 minutes',
      icon: Mail,
      steps: [
        {
          id: 'access_communications',
          title: 'Access Communications',
          description: 'Go to Support tab → Communications section',
        },
        {
          id: 'choose_audience',
          title: 'Choose Your Audience',
          description: 'Select who to email: All Users, Premium Users, New Users, etc.',
        },
        {
          id: 'write_email',
          title: 'Write Your Email',
          description: 'Add subject and message. Be helpful and personal.',
        },
        {
          id: 'use_templates',
          title: 'Use Email Templates',
          description: 'Save time with pre-written templates for common situations',
        },
        {
          id: 'send_email',
          title: 'Send Email',
          description: 'Preview first, then send to your selected audience',
        }
      ]
    }
  ];

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'getting_started': return Play;
      case 'content_management': return FileText;
      case 'user_support': return MessageSquare;
      case 'advanced': return Settings;
      default: return BookOpen;
    }
  };

  const categories = [
    { id: 'getting_started', name: 'Getting Started', description: 'Essential first steps' },
    { id: 'content_management', name: 'Content Management', description: 'Manage courses and resources' },
    { id: 'user_support', name: 'User Support', description: 'Help and support users' },
    { id: 'advanced', name: 'Advanced Features', description: 'Analytics and automation' }
  ];

  if (selectedGuide) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedGuide(null)}
          >
            ← Back to Guides
          </Button>
        </div>

        {/* Guide Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <selectedGuide.icon className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl">{selectedGuide.title}</CardTitle>
                </div>
                <p className="text-gray-600 mb-3">{selectedGuide.description}</p>
                <div className="flex items-center gap-3">
                  <Badge className={`text-xs ${getDifficultyColor(selectedGuide.difficulty)}`}>
                    {selectedGuide.difficulty}
                  </Badge>
                  <span className="text-sm text-gray-500">⏱️ {selectedGuide.estimatedTime}</span>
                  <span className="text-sm text-gray-500">
                    📋 {selectedGuide.steps.length} steps
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Steps */}
        <div className="space-y-4">
          {selectedGuide.steps.map((step, index) => (
            <Card key={step.id} className={step.completed ? 'bg-green-50 border-green-200' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step.completed 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {step.completed ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                    {step.action && (
                      <Button 
                        size="sm" 
                        className="mt-3"
                        onClick={step.action}
                      >
                        Do This Step
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-blue-900">Pro Tip</h3>
                <p className="text-blue-700 text-sm">
                  Take your time with each step. The admin panel is powerful, and understanding each feature will make you more effective at managing your startup platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Admin Guide Center</h1>
              <p className="text-blue-700">
                Step-by-step guides to help you master your startup platform admin panel
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
            <div>
              <h3 className="font-medium text-orange-900">New Admin? Start Here!</h3>
              <p className="text-orange-700 text-sm mb-3">
                If this is your first time in the admin panel, we strongly recommend starting with "Your First Steps as Admin" guide.
              </p>
              <Button 
                size="sm"
                onClick={() => setSelectedGuide(guides[0])}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Start First Steps Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      {categories.map((category) => {
        const CategoryIcon = getCategoryIcon(category.id);
        const categoryGuides = guides.filter(g => g.category === category.id);
        const isExpanded = expandedCategories.has(category.id);

        return (
          <Card key={category.id}>
            <CardHeader>
              <button
                onClick={() => toggleCategory(category.id)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <CategoryIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </CardHeader>
            
            {isExpanded && (
              <CardContent>
                <div className="space-y-3">
                  {categoryGuides.map((guide) => {
                    const GuideIcon = guide.icon;
                    return (
                      <div
                        key={guide.id}
                        onClick={() => setSelectedGuide(guide)}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <GuideIcon className="w-5 h-5 text-gray-600" />
                          <div>
                            <h3 className="font-medium">{guide.title}</h3>
                            <p className="text-sm text-gray-600">{guide.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Badge className={`text-xs ${getDifficultyColor(guide.difficulty)}`}>
                            {guide.difficulty}
                          </Badge>
                          <span>⏱️ {guide.estimatedTime}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}

      {/* Help Section */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="font-medium">Need More Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Can't find what you're looking for? Here are additional resources:
              </p>
              <div className="flex gap-3">
                <Button size="sm" variant="outline">
                  Contact Support
                </Button>
                <Button size="sm" variant="outline">
                  Watch Video Tutorials
                </Button>
                <Button size="sm" variant="outline">
                  Join Admin Community
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
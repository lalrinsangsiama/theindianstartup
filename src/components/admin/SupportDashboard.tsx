'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  MessageSquare,
  User,
  Clock,
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Tag,
  Filter,
  Search,
  RefreshCw,
  Send,
  Archive,
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  BarChart3
} from 'lucide-react';
import { Modal, ModalHeader, ModalTitle, ModalBody } from '@/components/ui';
import { SupportTicket, TicketResponse, UserProfile } from '@/lib/customer-support';

export function SupportDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  // Mock data for demonstration
  const mockTickets: SupportTicket[] = [
    {
      id: '1',
      userId: 'user1',
      userEmail: 'rajesh@example.com',
      userName: 'Rajesh Kumar',
      subject: 'Cannot access P3 Funding course after purchase',
      message: 'I purchased the P3 Funding course yesterday but I\'m unable to access the content. Getting an access denied error.',
      category: 'technical',
      priority: 'high',
      status: 'open',
      tags: ['course_access', 'payment_issue'],
      attachments: [],
      responseCount: 0,
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      userEmail: 'priya@startup.com',
      userName: 'Priya Sharma',
      subject: 'Request for invoice copy',
      message: 'Hi, I need a copy of my purchase invoice for P1 30-Day Launch Sprint for tax filing purposes.',
      category: 'billing',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'admin1',
      tags: ['invoice', 'tax'],
      attachments: [],
      responseCount: 2,
      createdAt: '2024-01-19T15:45:00Z',
      updatedAt: '2024-01-20T09:15:00Z',
      lastResponseAt: '2024-01-20T09:15:00Z'
    },
    {
      id: '3',
      userId: 'user3',
      userEmail: 'amit@techstartup.com',
      userName: 'Amit Patel',
      subject: 'Suggestion for new course on AI/ML for startups',
      message: 'Would love to see a course specifically about integrating AI/ML into startups. This is becoming very relevant.',
      category: 'feature_request',
      priority: 'low',
      status: 'open',
      tags: ['course_request', 'ai_ml'],
      attachments: [],
      responseCount: 1,
      createdAt: '2024-01-18T14:20:00Z',
      updatedAt: '2024-01-19T11:30:00Z',
      lastResponseAt: '2024-01-19T11:30:00Z'
    }
  ];

  const mockUsers: UserProfile[] = [
    {
      id: 'user1',
      email: 'rajesh@example.com',
      name: 'Rajesh Kumar',
      phone: '+91-9876543210',
      registrationDate: '2024-01-15T00:00:00Z',
      lastLoginAt: '2024-01-20T08:30:00Z',
      totalPurchases: 2,
      totalSpent: 1049800, // ₹10,498
      courseProgress: {
        'P1': { completedLessons: 15, totalLessons: 30, lastActivityAt: '2024-01-20T07:45:00Z' },
        'P3': { completedLessons: 0, totalLessons: 45, lastActivityAt: '2024-01-19T10:00:00Z' }
      },
      supportTickets: { total: 3, open: 1, resolved: 2 },
      preferences: {
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true
      },
      tags: ['premium_user', 'entrepreneur'],
      notes: 'Active user, quick to respond to communications'
    },
    {
      id: 'user2',
      email: 'priya@startup.com',
      name: 'Priya Sharma',
      phone: '+91-8765432109',
      registrationDate: '2024-01-10T00:00:00Z',
      lastLoginAt: '2024-01-19T16:20:00Z',
      totalPurchases: 1,
      totalSpent: 499900, // ₹4,999
      courseProgress: {
        'P1': { completedLessons: 25, totalLessons: 30, lastActivityAt: '2024-01-19T14:30:00Z' }
      },
      supportTickets: { total: 2, open: 0, resolved: 2 },
      preferences: {
        emailNotifications: true,
        smsNotifications: true,
        marketingEmails: false
      },
      tags: ['fast_learner', 'tech_founder'],
      notes: 'High completion rate, interested in advanced courses'
    }
  ];

  const [dashboardStats] = useState({
    tickets: {
      total: 45,
      open: 12,
      urgent: 3,
      avgResponseTime: 4.5
    },
    users: {
      total: 1250,
      newThisWeek: 28,
      activeThisWeek: 187
    },
    revenue: {
      total: 2450000,
      thisMonth: 340000,
      avgOrderValue: 7999
    },
    courses: {
      totalEnrollments: 890,
      completionRate: 68,
      mostPopular: 'P1: 30-Day Launch Sprint'
    }
  });

  useEffect(() => {
    setTickets(mockTickets);
    setUsers(mockUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || ticket.status === filters.status;
    const matchesPriority = filters.priority === 'all' || ticket.priority === filters.priority;
    const matchesCategory = filters.category === 'all' || ticket.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'waiting_user': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${(amount / 100).toLocaleString('en-IN')}`;
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading support dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'tickets', label: 'Support Tickets', icon: MessageSquare },
            { id: 'users', label: 'User Management', icon: User },
            { id: 'communications', label: 'Communications', icon: Mail }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Support Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.tickets.total}</div>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                  <span className="text-red-600">{dashboardStats.tickets.open} open</span>
                  <span className="text-orange-600">{dashboardStats.tickets.urgent} urgent</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.users.total.toLocaleString()}</div>
                <div className="flex items-center gap-4 text-xs text-gray-600 mt-1">
                  <span className="text-green-600">+{dashboardStats.users.newThisWeek} this week</span>
                  <span>{dashboardStats.users.activeThisWeek} active</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(dashboardStats.revenue.total)}</div>
                <div className="text-xs text-gray-600 mt-1">
                  {formatCurrency(dashboardStats.revenue.thisMonth)} this month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Course Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.courses.completionRate}%</div>
                <div className="text-xs text-gray-600 mt-1">
                  {dashboardStats.courses.totalEnrollments} total enrollments
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tickets.slice(0, 5).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm line-clamp-1">{ticket.subject}</div>
                        <div className="text-xs text-gray-600">{ticket.userName}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setActiveTab('tickets')}
                  >
                    View All Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Users This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-600">{user.email}</div>
                      </div>
                      <div className="text-right text-xs text-gray-600">
                        <div>{user.totalPurchases} purchases</div>
                        <div>{formatCurrency(user.totalSpent)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setActiveTab('users')}
                  >
                    View All Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Support Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search tickets by subject or user email..."
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
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="waiting_user">Waiting User</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Categories</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="content">Content</option>
                  <option value="account">Account</option>
                  <option value="feature_request">Feature Request</option>
                  <option value="general">General</option>
                </select>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedTicket(ticket)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{ticket.subject}</h3>
                        <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {ticket.message}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {ticket.userName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {ticket.userEmail}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(ticket.createdAt)}
                        </span>
                        {ticket.responseCount > 0 && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {ticket.responseCount} responses
                          </span>
                        )}
                      </div>
                      {ticket.tags.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          {ticket.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTickets.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No tickets found</h3>
                <p className="text-gray-500">
                  {searchQuery || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'No support tickets yet'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* User Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Users
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{user.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {user.totalPurchases} purchases
                        </Badge>
                        {user.tags.map((tag) => (
                          <Badge key={tag} className="text-xs bg-blue-100 text-blue-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600">Contact</div>
                          <div className="text-sm">{user.email}</div>
                          {user.phone && <div className="text-sm">{user.phone}</div>}
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Revenue</div>
                          <div className="text-sm font-medium">{formatCurrency(user.totalSpent)}</div>
                          <div className="text-xs text-gray-500">{user.totalPurchases} orders</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Support</div>
                          <div className="text-sm">{user.supportTickets.total} total tickets</div>
                          <div className="text-xs text-gray-500">
                            {user.supportTickets.open} open, {user.supportTickets.resolved} resolved
                          </div>
                        </div>
                      </div>

                      {/* Course Progress */}
                      {Object.keys(user.courseProgress).length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm text-gray-600 mb-2">Course Progress</div>
                          <div className="space-y-2">
                            {Object.entries(user.courseProgress).map(([courseCode, progress]) => (
                              <div key={courseCode} className="flex items-center gap-3">
                                <span className="text-sm font-medium w-8">{courseCode}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${(progress.completedLessons / progress.totalLessons) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {progress.completedLessons}/{progress.totalLessons}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Registered {formatDate(user.registrationDate)}</span>
                        {user.lastLoginAt && (
                          <span>Last login {formatDate(user.lastLoginAt)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === 'communications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Communications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Send To</label>
                <select className="w-full px-3 py-2 border rounded-md mt-1">
                  <option>All Users</option>
                  <option>Premium Users</option>
                  <option>New Users (Last 7 days)</option>
                  <option>Inactive Users (No login 30 days)</option>
                  <option>Course Specific Users</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Email subject..." className="mt-1" />
              </div>
              
              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Email content..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'Welcome Email for New Users',
                  'Course Completion Congratulations',
                  'Inactive User Re-engagement',
                  'New Course Launch Announcement',
                  'Support Ticket Follow-up'
                ].map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{template}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          className="max-w-4xl"
        >
          <ModalHeader>
            <ModalTitle>{`Ticket #${selectedTicket.id}`}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium mb-2">{selectedTicket.subject}</h3>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={`text-xs ${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority}
                  </Badge>
                  <Badge className={`text-xs ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    by {selectedTicket.userName}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Star className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm">{selectedTicket.message}</div>
              <div className="mt-3 pt-3 border-t flex items-center justify-between text-xs text-gray-500">
                <span>{formatDate(selectedTicket.createdAt)}</span>
                <span>{selectedTicket.userEmail}</span>
              </div>
            </div>

            {/* Status Actions */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium">Quick Actions:</span>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Change Status</option>
                <option>In Progress</option>
                <option>Waiting User</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <select className="px-2 py-1 border rounded text-sm">
                <option>Set Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
              <Button size="sm">Update</Button>
            </div>

            {/* Response */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Response</label>
              <Textarea
                placeholder="Type your response..."
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    Mark as resolved
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    Send email notification
                  </label>
                </div>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}
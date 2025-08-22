'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { 
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Upload,
  Download,
  Edit,
  Trash2,
  Eye,
  Bell,
  Target,
  TrendingUp,
  IndianRupee,
  Building,
  Users,
  Phone,
  Mail,
  ExternalLink,
  Filter,
  Search,
  MoreHorizontal,
  Archive,
  Star,
  RefreshCw
} from 'lucide-react';

interface Application {
  id: string;
  schemeName: string;
  schemeId: string;
  applicationDate: string;
  lastUpdated: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'withdrawn';
  amount: number;
  category: string;
  ministry: string;
  applicationNumber?: string;
  expectedDecision?: string;
  documents: ApplicationDocument[];
  timeline: ApplicationEvent[];
  contacts: Contact[];
  notes: string[];
  priority: 'high' | 'medium' | 'low';
  completionPercentage: number;
}

interface ApplicationDocument {
  id: string;
  name: string;
  type: string;
  status: 'required' | 'uploaded' | 'verified' | 'rejected';
  uploadedAt?: string;
  size?: number;
  url?: string;
}

interface ApplicationEvent {
  id: string;
  date: string;
  event: string;
  description: string;
  type: 'milestone' | 'update' | 'action-required' | 'decision';
  status: 'completed' | 'pending' | 'overdue';
}

interface Contact {
  id: string;
  name: string;
  designation: string;
  department: string;
  email?: string;
  phone?: string;
  lastContact?: string;
  notes?: string;
}

const mockApplications: Application[] = [
  {
    id: 'app-001',
    schemeName: 'Startup India Seed Fund Scheme',
    schemeId: 'sisfs',
    applicationDate: '2024-01-15',
    lastUpdated: '2024-01-20',
    status: 'under-review',
    amount: 4500000,
    category: 'Seed Funding',
    ministry: 'DPIIT',
    applicationNumber: 'SISFS/2024/001234',
    expectedDecision: '2024-03-15',
    completionPercentage: 85,
    priority: 'high',
    documents: [
      {
        id: 'doc-001',
        name: 'Business Plan',
        type: 'PDF',
        status: 'verified',
        uploadedAt: '2024-01-10',
        size: 2500000
      },
      {
        id: 'doc-002',
        name: 'Financial Projections',
        type: 'Excel',
        status: 'uploaded',
        uploadedAt: '2024-01-12',
        size: 150000
      },
      {
        id: 'doc-003',
        name: 'DPIIT Certificate',
        type: 'PDF',
        status: 'required'
      }
    ],
    timeline: [
      {
        id: 'event-001',
        date: '2024-01-15',
        event: 'Application Submitted',
        description: 'Application successfully submitted through online portal',
        type: 'milestone',
        status: 'completed'
      },
      {
        id: 'event-002',
        date: '2024-01-18',
        event: 'Initial Review Started',
        description: 'Application moved to technical evaluation stage',
        type: 'update',
        status: 'completed'
      },
      {
        id: 'event-003',
        date: '2024-02-01',
        event: 'Committee Presentation',
        description: 'Present to evaluation committee',
        type: 'action-required',
        status: 'pending'
      }
    ],
    contacts: [
      {
        id: 'contact-001',
        name: 'Rajesh Kumar',
        designation: 'Deputy Secretary',
        department: 'DPIIT',
        email: 'rajesh.kumar@dpiit.gov.in',
        phone: '+91 9876543210',
        lastContact: '2024-01-18'
      }
    ],
    notes: [
      'Need to prepare presentation for committee meeting',
      'Follow up on DPIIT certificate requirement'
    ]
  },
  {
    id: 'app-002',
    schemeName: 'MSME Champions Scheme',
    schemeId: 'msme-champions',
    applicationDate: '2024-01-20',
    lastUpdated: '2024-01-22',
    status: 'draft',
    amount: 2500000,
    category: 'Technology Grant',
    ministry: 'MSME',
    completionPercentage: 45,
    priority: 'medium',
    documents: [
      {
        id: 'doc-004',
        name: 'Project Report',
        type: 'PDF',
        status: 'required'
      },
      {
        id: 'doc-005',
        name: 'Udyam Certificate',
        type: 'PDF',
        status: 'uploaded',
        uploadedAt: '2024-01-20',
        size: 300000
      }
    ],
    timeline: [
      {
        id: 'event-004',
        date: '2024-01-20',
        event: 'Application Started',
        description: 'Draft application created',
        type: 'milestone',
        status: 'completed'
      }
    ],
    contacts: [],
    notes: []
  }
];

export function ApplicationTracker() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'calendar'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Filter applications based on status and search
  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.schemeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.ministry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'under-review': return 'bg-yellow-100 text-yellow-700';
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'withdrawn': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <Edit className="w-4 h-4" />;
      case 'submitted': return <Upload className="w-4 h-4" />;
      case 'under-review': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'withdrawn': return <Archive className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    const upcomingEvents = applications.flatMap(app => 
      app.timeline.filter(event => 
        event.status === 'pending' && 
        new Date(event.date) > today &&
        new Date(event.date) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      ).map(event => ({ ...event, applicationId: app.id, schemeName: app.schemeName }))
    );
    return upcomingEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  if (selectedApplication) {
    return (
      <ApplicationDetailView 
        application={selectedApplication}
        onBack={() => setSelectedApplication(null)}
        onUpdate={(updatedApp) => {
          setApplications(apps => apps.map(app => 
            app.id === updatedApp.id ? updatedApp : app
          ));
          setSelectedApplication(updatedApp);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <Heading as="h2" variant="h4">
            Application Tracker
          </Heading>
          <Text color="muted">
            Track and manage all your government scheme applications
          </Text>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative"
          >
            <Bell className="w-4 h-4" />
            {getUpcomingDeadlines().length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {getUpcomingDeadlines().length}
              </span>
            )}
          </Button>
          
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold">{applications.length}</Text>
            <Text size="sm" color="muted">Total Applications</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold">
              {applications.filter(a => a.status === 'under-review').length}
            </Text>
            <Text size="sm" color="muted">Under Review</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold">
              {applications.filter(a => a.status === 'approved').length}
            </Text>
            <Text size="sm" color="muted">Approved</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <IndianRupee className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold">
              ₹{Math.round(applications.reduce((sum, app) => sum + app.amount/100000, 0))}L
            </Text>
            <Text size="sm" color="muted">Total Applied</Text>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <Text className="text-2xl font-bold">
              {Math.round(applications.reduce((sum, app) => sum + app.completionPercentage, 0) / applications.length)}%
            </Text>
            <Text size="sm" color="muted">Avg Completion</Text>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-600" />
              Upcoming Deadlines & Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getUpcomingDeadlines().length === 0 ? (
              <Text color="muted">No upcoming deadlines in the next 7 days</Text>
            ) : (
              <div className="space-y-3">
                {getUpcomingDeadlines().map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <Text weight="medium">{event.event}</Text>
                      <Text size="sm" color="muted">
                        {event.schemeName} • {new Date(event.date).toLocaleDateString()}
                      </Text>
                    </div>
                    <Badge className="bg-orange-100 text-orange-700">
                      {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>

              <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('kanban')}
                >
                  Kanban
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications List/Kanban */}
      {viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredApplications.map(application => (
            <Card
              key={application.id}
              className={`border-l-4 ${getPriorityColor(application.priority)} hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => setSelectedApplication(application)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Heading as="h4" variant="h5">
                        {application.schemeName}
                      </Heading>
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                      </Badge>
                      {application.priority === 'high' && (
                        <Badge className="bg-red-100 text-red-700">
                          <Star className="w-3 h-3 mr-1" />
                          High Priority
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <Text size="sm">{application.ministry}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <Text size="sm">₹{(application.amount / 100000).toFixed(1)}L</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <Text size="sm">{new Date(application.applicationDate).toLocaleDateString()}</Text>
                      </div>
                      {application.applicationNumber && (
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <Text size="sm">{application.applicationNumber}</Text>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <Text size="sm" color="muted">Completion</Text>
                        <Text size="sm" color="muted">{application.completionPercentage}%</Text>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${application.completionPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Document Status */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <Text size="xs" color="muted">
                          {application.documents.filter(d => d.status === 'verified').length} verified
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Upload className="w-3 h-3 text-blue-500" />
                        <Text size="xs" color="muted">
                          {application.documents.filter(d => d.status === 'uploaded').length} uploaded
                        </Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-orange-500" />
                        <Text size="xs" color="muted">
                          {application.documents.filter(d => d.status === 'required').length} pending
                        </Text>
                      </div>
                    </div>

                    {/* Next Action */}
                    {application.timeline.find(t => t.status === 'pending') && (
                      <Alert variant="info" className="mt-3">
                        <Clock className="w-4 h-4" />
                        <div>
                          <Text size="sm" weight="medium">Next Action Required</Text>
                          <Text size="sm">
                            {application.timeline.find(t => t.status === 'pending')?.event} - 
                            Due: {application.timeline.find(t => t.status === 'pending')?.date}
                          </Text>
                        </div>
                      </Alert>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredApplications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <Text color="muted">No applications found matching your criteria</Text>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Application
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <KanbanView applications={filteredApplications} onSelectApplication={setSelectedApplication} />
      )}

      {/* Add Application Modal */}
      {showAddForm && (
        <AddApplicationModal
          onClose={() => setShowAddForm(false)}
          onAdd={(newApp) => {
            setApplications(prev => [...prev, { ...newApp, id: `app-${Date.now()}` }]);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
}

// Kanban View Component
function KanbanView({ applications, onSelectApplication }: { 
  applications: Application[], 
  onSelectApplication: (app: Application) => void 
}) {
  const columns = [
    { id: 'draft', title: 'Draft', color: 'bg-gray-100' },
    { id: 'submitted', title: 'Submitted', color: 'bg-blue-100' },
    { id: 'under-review', title: 'Under Review', color: 'bg-yellow-100' },
    { id: 'approved', title: 'Approved', color: 'bg-green-100' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-100' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {columns.map(column => (
        <div key={column.id} className="space-y-3">
          <div className={`p-3 rounded-lg ${column.color}`}>
            <Text weight="medium" className="text-center">
              {column.title}
            </Text>
            <Text size="sm" color="muted" className="text-center">
              {applications.filter(app => app.status === column.id).length} applications
            </Text>
          </div>

          <div className="space-y-2">
            {applications.filter(app => app.status === column.id).map(app => (
              <Card
                key={app.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onSelectApplication(app)}
              >
                <CardContent className="p-4">
                  <Text weight="medium" size="sm" className="mb-2">
                    {app.schemeName}
                  </Text>
                  <div className="flex items-center justify-between mb-2">
                    <Text size="xs" color="muted">{app.ministry}</Text>
                    <Text size="xs" color="muted">₹{(app.amount / 100000).toFixed(1)}L</Text>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${app.completionPercentage}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Application Detail View Component  
function ApplicationDetailView({ 
  application, 
  onBack, 
  onUpdate 
}: { 
  application: Application, 
  onBack: () => void,
  onUpdate: (app: Application) => void
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'timeline' | 'contacts'>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <div>
            <Heading as="h2" variant="h4">{application.schemeName}</Heading>
            <Text color="muted">Application ID: {application.applicationNumber || 'Draft'}</Text>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <Text size="sm" color="muted" className="mb-1">Status</Text>
              <Badge className={getStatusColor(application.status)} size="lg">
                {getStatusIcon(application.status)}
                <span className="ml-2 capitalize">{application.status.replace('-', ' ')}</span>
              </Badge>
            </div>
            <div>
              <Text size="sm" color="muted" className="mb-1">Amount</Text>
              <Text weight="medium" className="text-xl">₹{(application.amount / 100000).toFixed(1)}L</Text>
            </div>
            <div>
              <Text size="sm" color="muted" className="mb-1">Completion</Text>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${application.completionPercentage}%` }}
                  />
                </div>
                <Text size="sm">{application.completionPercentage}%</Text>
              </div>
            </div>
            <div>
              <Text size="sm" color="muted" className="mb-1">Expected Decision</Text>
              <Text weight="medium">
                {application.expectedDecision 
                  ? new Date(application.expectedDecision).toLocaleDateString()
                  : 'TBD'
                }
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-8">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'documents', label: 'Documents', icon: Upload },
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'contacts', label: 'Contacts', icon: Users }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 pb-4 px-1 font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-600 hover:text-black'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <ApplicationOverview application={application} onUpdate={onUpdate} />
        )}
        {activeTab === 'documents' && (
          <DocumentsTab application={application} onUpdate={onUpdate} />
        )}
        {activeTab === 'timeline' && (
          <TimelineTab application={application} onUpdate={onUpdate} />
        )}
        {activeTab === 'contacts' && (
          <ContactsTab application={application} onUpdate={onUpdate} />
        )}
      </div>
    </div>
  );
}

// Application Overview Component
function ApplicationOverview({ application, onUpdate }: { 
  application: Application, 
  onUpdate: (app: Application) => void 
}) {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div>
            <Text size="sm" color="muted" className="mb-1">Scheme Category</Text>
            <Text weight="medium">{application.category}</Text>
          </div>
          <div>
            <Text size="sm" color="muted" className="mb-1">Ministry/Department</Text>
            <Text weight="medium">{application.ministry}</Text>
          </div>
          <div>
            <Text size="sm" color="muted" className="mb-1">Application Date</Text>
            <Text weight="medium">{new Date(application.applicationDate).toLocaleDateString()}</Text>
          </div>
          <div>
            <Text size="sm" color="muted" className="mb-1">Last Updated</Text>
            <Text weight="medium">{new Date(application.lastUpdated).toLocaleDateString()}</Text>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Notes
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Note
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {application.notes.length === 0 ? (
            <Text color="muted">No notes added yet</Text>
          ) : (
            <div className="space-y-3">
              {application.notes.map((note, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                  <Text size="sm">{note}</Text>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Documents Tab Component
function DocumentsTab({ application, onUpdate }: { 
  application: Application, 
  onUpdate: (app: Application) => void 
}) {
  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'required': return 'bg-red-100 text-red-700';
      case 'uploaded': return 'bg-blue-100 text-blue-700';
      case 'verified': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Documents
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Document
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {application.documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Text weight="medium">{doc.name}</Text>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge size="sm" className={getDocumentStatusColor(doc.status)}>
                      {doc.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    {doc.uploadedAt && (
                      <Text size="xs" color="muted">
                        Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {doc.status === 'required' ? (
                  <Button size="sm" variant="primary">
                    <Upload className="w-4 h-4 mr-1" />
                    Upload
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Timeline Tab Component
function TimelineTab({ application, onUpdate }: { 
  application: Application, 
  onUpdate: (app: Application) => void 
}) {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'milestone': return 'bg-green-500';
      case 'update': return 'bg-blue-500';
      case 'action-required': return 'bg-orange-500';
      case 'decision': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {application.timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${getEventColor(event.type)}`} />
                {index < application.timeline.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-1">
                  <Text weight="medium">{event.event}</Text>
                  <Text size="sm" color="muted">
                    {new Date(event.date).toLocaleDateString()}
                  </Text>
                </div>
                <Text size="sm" color="muted" className="mb-2">
                  {event.description}
                </Text>
                <Badge 
                  size="sm" 
                  className={
                    event.status === 'completed' ? 'bg-green-100 text-green-700' :
                    event.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }
                >
                  {event.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Contacts Tab Component
function ContactsTab({ application, onUpdate }: { 
  application: Application, 
  onUpdate: (app: Application) => void 
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Key Contacts
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Contact
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {application.contacts.length === 0 ? (
          <Text color="muted" className="text-center py-8">
            No contacts added yet
          </Text>
        ) : (
          <div className="space-y-4">
            {application.contacts.map(contact => (
              <div key={contact.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div>
                  <Text weight="medium">{contact.name}</Text>
                  <Text size="sm" color="muted" className="mb-2">
                    {contact.designation}, {contact.department}
                  </Text>
                  <div className="space-y-1">
                    {contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <Text size="sm">{contact.email}</Text>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <Text size="sm">{contact.phone}</Text>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Add Application Modal Component (simplified)
function AddApplicationModal({ 
  onClose, 
  onAdd 
}: { 
  onClose: () => void, 
  onAdd: (app: Omit<Application, 'id'>) => void 
}) {
  const [formData, setFormData] = useState({
    schemeName: '',
    amount: '',
    category: '',
    ministry: '',
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApplication: Omit<Application, 'id'> = {
      schemeName: formData.schemeName,
      schemeId: formData.schemeName.toLowerCase().replace(/\s+/g, '-'),
      applicationDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'draft',
      amount: parseInt(formData.amount) * 100000,
      category: formData.category,
      ministry: formData.ministry,
      priority: formData.priority as 'high' | 'medium' | 'low',
      completionPercentage: 10,
      documents: [],
      timeline: [{
        id: 'init',
        date: new Date().toISOString().split('T')[0],
        event: 'Application Created',
        description: 'Draft application initialized',
        type: 'milestone',
        status: 'completed'
      }],
      contacts: [],
      notes: []
    };

    onAdd(newApplication);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Add New Application</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Scheme Name *</label>
              <Input
                required
                value={formData.schemeName}
                onChange={(e) => setFormData(prev => ({ ...prev, schemeName: e.target.value }))}
                placeholder="Enter scheme name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Amount (₹ Lakhs) *</label>
              <Input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Enter amount in lakhs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select category</option>
                <option value="Seed Funding">Seed Funding</option>
                <option value="Grants">Grants</option>
                <option value="Subsidies">Subsidies</option>
                <option value="Loan Guarantee">Loan Guarantee</option>
                <option value="Innovation Grant">Innovation Grant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ministry/Department *</label>
              <Input
                required
                value={formData.ministry}
                onChange={(e) => setFormData(prev => ({ ...prev, ministry: e.target.value }))}
                placeholder="Enter ministry/department"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Add Application
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function (needs to be defined in component scope)
function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-700';
    case 'submitted': return 'bg-blue-100 text-blue-700';
    case 'under-review': return 'bg-yellow-100 text-yellow-700';
    case 'approved': return 'bg-green-100 text-green-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    case 'withdrawn': return 'bg-gray-100 text-gray-600';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function getStatusIcon(status: string): JSX.Element {
  switch (status) {
    case 'draft': return <Edit className="w-4 h-4" />;
    case 'submitted': return <Upload className="w-4 h-4" />;
    case 'under-review': return <Clock className="w-4 h-4" />;
    case 'approved': return <CheckCircle className="w-4 h-4" />;
    case 'rejected': return <XCircle className="w-4 h-4" />;
    case 'withdrawn': return <Archive className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
}
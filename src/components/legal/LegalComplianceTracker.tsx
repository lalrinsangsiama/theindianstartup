'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Calendar, AlertTriangle, CheckCircle, Clock, Bell, FileText, Building, Users, Shield } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  category: 'Corporate' | 'Employment' | 'Tax' | 'Regulatory' | 'IP' | 'Data Protection';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: Date;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  description: string;
  requiredDocuments: string[];
  penalty: string;
  frequency: 'One-time' | 'Annual' | 'Quarterly' | 'Monthly';
  applicableFrom: string;
  authority: string;
  resources: string[];
}

interface ComplianceStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  upcomingWeek: number;
  criticalItems: number;
}

const SAMPLE_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: 'annual_return_mca',
    title: 'Annual Return Filing (MCA)',
    category: 'Corporate',
    priority: 'High',
    dueDate: new Date(2024, 11, 30), // Dec 30, 2024
    status: 'Pending',
    description: 'File Annual Return (MGT-7) and Financial Statements with Ministry of Corporate Affairs',
    requiredDocuments: ['MGT-7 Form', 'Financial Statements', 'Board Resolution', 'Auditor Certificate'],
    penalty: '₹10,000 + ₹50/day for delay',
    frequency: 'Annual',
    applicableFrom: 'All Private Limited Companies',
    authority: 'Ministry of Corporate Affairs (MCA)',
    resources: ['MCA Portal', 'Annual Return Filing Guide', 'Financial Statement Template']
  },
  {
    id: 'gst_return_monthly',
    title: 'GST Return Filing (GSTR-3B)',
    category: 'Tax',
    priority: 'Critical',
    dueDate: new Date(2024, 8, 20), // Sep 20, 2024
    status: 'Overdue',
    description: 'Monthly GST return filing for regular taxpayers',
    requiredDocuments: ['GSTR-3B Form', 'Input Tax Credit Details', 'Output Tax Details'],
    penalty: '₹50/day (max ₹10,000) + 18% interest',
    frequency: 'Monthly',
    applicableFrom: 'All GST Registered Entities',
    authority: 'Goods and Services Tax Network (GSTN)',
    resources: ['GST Portal', 'GSTR-3B Filing Guide', 'GST Calculator']
  },
  {
    id: 'pf_esi_returns',
    title: 'PF & ESI Monthly Returns',
    category: 'Employment',
    priority: 'High',
    dueDate: new Date(2024, 8, 15), // Sep 15, 2024
    status: 'In Progress',
    description: 'Monthly PF and ESI returns for employees',
    requiredDocuments: ['Employee Database', 'Salary Register', 'ECR File', 'Challan Details'],
    penalty: '₹100/day for PF, ₹25,000 for ESI',
    frequency: 'Monthly',
    applicableFrom: 'Employers with 20+ employees (PF), 10+ employees (ESI)',
    authority: 'EPFO & ESIC',
    resources: ['UAN Portal', 'ESI Portal', 'PF-ESI Guide']
  },
  {
    id: 'trademark_renewal',
    title: 'Trademark Renewal',
    category: 'IP',
    priority: 'Medium',
    dueDate: new Date(2025, 2, 15), // Mar 15, 2025
    status: 'Pending',
    description: 'Renew trademark registration for company logo and brand name',
    requiredDocuments: ['Trademark Certificate', 'TM-12 Form', 'Declaration of Use'],
    penalty: 'Loss of trademark rights + ₹10,000 restoration fee',
    frequency: 'Every 10 years',
    applicableFrom: 'Trademark owners',
    authority: 'Trademark Registry, Government of India',
    resources: ['Trademark Registry Portal', 'Renewal Guide', 'TM-12 Form']
  },
  {
    id: 'board_meeting_quarterly',
    title: 'Quarterly Board Meeting',
    category: 'Corporate',
    priority: 'Medium',
    dueDate: new Date(2024, 8, 30), // Sep 30, 2024
    status: 'Pending',
    description: 'Mandatory quarterly board meeting as per Companies Act',
    requiredDocuments: ['Board Meeting Notice', 'Agenda', 'Minutes of Previous Meeting', 'Financial Results'],
    penalty: 'Director penalty ₹1 lakh + ₹5,000/day',
    frequency: 'Quarterly',
    applicableFrom: 'All Companies',
    authority: 'Ministry of Corporate Affairs (MCA)',
    resources: ['Board Meeting Templates', 'Agenda Templates', 'Resolution Bank']
  },
  {
    id: 'data_protection_audit',
    title: 'Data Protection Impact Assessment',
    category: 'Data Protection',
    priority: 'High',
    dueDate: new Date(2024, 9, 31), // Oct 31, 2024
    status: 'Pending',
    description: 'Annual data protection audit and impact assessment',
    requiredDocuments: ['Data Inventory', 'Privacy Policy', 'Consent Records', 'Security Assessment'],
    penalty: 'Up to ₹500 crore or 4% of turnover',
    frequency: 'Annual',
    applicableFrom: 'Data Processing Entities',
    authority: 'Data Protection Authority (Future)',
    resources: ['DPIA Template', 'Data Mapping Tool', 'Privacy Policy Generator']
  },
  {
    id: 'sexual_harassment_training',
    title: 'Sexual Harassment Awareness Training',
    category: 'Employment',
    priority: 'Medium',
    dueDate: new Date(2024, 10, 15), // Nov 15, 2024
    status: 'Pending',
    description: 'Mandatory annual training under Sexual Harassment Act (POSH)',
    requiredDocuments: ['Training Records', 'Attendance Sheets', 'ICC Constitution', 'Policy Display'],
    penalty: 'License cancellation + ₹50,000 fine',
    frequency: 'Annual',
    applicableFrom: 'Organizations with 10+ employees',
    authority: 'Local District Officer',
    resources: ['POSH Training Materials', 'ICC Setup Guide', 'Policy Templates']
  },
  {
    id: 'environmental_clearance',
    title: 'Environmental Compliance Report',
    category: 'Regulatory',
    priority: 'Low',
    dueDate: new Date(2025, 0, 31), // Jan 31, 2025
    status: 'Pending',
    description: 'Annual environmental compliance report for manufacturing units',
    requiredDocuments: ['Pollution Certificate', 'Water Usage Report', 'Waste Management Report'],
    penalty: 'Factory closure + ₹10 lakh fine',
    frequency: 'Annual',
    applicableFrom: 'Manufacturing Units',
    authority: 'State Pollution Control Board',
    resources: ['Environmental Report Template', 'Pollution Norms Guide', 'SPCB Portal']
  }
];

const LegalComplianceTracker: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(SAMPLE_COMPLIANCE_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [stats, setStats] = useState<ComplianceStats>({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    upcomingWeek: 0,
    criticalItems: 0
  });

  const categories = ['All', 'Corporate', 'Employment', 'Tax', 'Regulatory', 'IP', 'Data Protection'];
  const priorities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  useEffect(() => {
    calculateStats();
  }, [complianceItems]);

  const calculateStats = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const newStats: ComplianceStats = {
      total: complianceItems.length,
      completed: complianceItems.filter(item => item.status === 'Completed').length,
      pending: complianceItems.filter(item => item.status === 'Pending' || item.status === 'In Progress').length,
      overdue: complianceItems.filter(item => item.status === 'Overdue' || (item.dueDate < now && item.status !== 'Completed')).length,
      upcomingWeek: complianceItems.filter(item => item.dueDate <= nextWeek && item.dueDate >= now && item.status !== 'Completed').length,
      criticalItems: complianceItems.filter(item => item.priority === 'Critical' && item.status !== 'Completed').length
    };

    setStats(newStats);
  };

  const updateItemStatus = (itemId: string, newStatus: ComplianceItem['status']) => {
    setComplianceItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const getFilteredItems = () => {
    return complianceItems.filter(item => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
      const priorityMatch = selectedPriority === 'All' || item.priority === selectedPriority;
      return categoryMatch && priorityMatch;
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Corporate': return <Building className="w-4 h-4" />;
      case 'Employment': return <Users className="w-4 h-4" />;
      case 'Tax': return <FileText className="w-4 h-4" />;
      case 'Regulatory': return <Shield className="w-4 h-4" />;
      case 'IP': return <Shield className="w-4 h-4" />;
      case 'Data Protection': return <Shield className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const now = new Date();
    const diffTime = dueDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-mono">Legal Compliance Tracker</h1>
        <p className="text-xl text-gray-600">Stay ahead of all legal deadlines and requirements</p>
        <p className="text-lg text-blue-600 font-semibold">Prevent ₹10+ crore penalties through proactive compliance</p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
            <div className="text-sm text-gray-600">Overdue</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.upcomingWeek}</div>
            <div className="text-sm text-gray-600">Due This Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.criticalItems}</div>
            <div className="text-sm text-gray-600">Critical</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="font-medium">Category:</label>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">Priority:</label>
          <select 
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Compliance Items */}
      <div className="space-y-4">
        {getFilteredItems().map((item) => {
          const daysUntilDue = getDaysUntilDue(item.dueDate);
          const isUrgent = daysUntilDue <= 7 && item.status !== 'Completed';
          const isOverdue = daysUntilDue < 0 && item.status !== 'Completed';

          return (
            <Card key={item.id} className={`${isOverdue ? 'border-red-300 bg-red-50' : isUrgent ? 'border-orange-300 bg-orange-50' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getCategoryIcon(item.category)}
                    <div className="flex-1">
                      <CardTitle className="text-lg font-mono">{item.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={`${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </Badge>
                    <Badge className={`${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Due Date:</span>
                      <span className={`${isOverdue ? 'text-red-600 font-semibold' : isUrgent ? 'text-orange-600 font-semibold' : ''}`}>
                        {item.dueDate.toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    {daysUntilDue >= 0 ? (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{daysUntilDue} days remaining</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-semibold">{Math.abs(daysUntilDue)} days overdue</span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium">Frequency:</span> {item.frequency}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Authority:</span> {item.authority}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Penalty:</span>
                      <div className="text-red-600 font-semibold">{item.penalty}</div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Applicable to:</span> {item.applicableFrom}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Required Documents:</div>
                  <div className="flex flex-wrap gap-2">
                    {item.requiredDocuments.map((doc, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Resources:</div>
                  <div className="flex flex-wrap gap-2">
                    {item.resources.map((resource, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {item.status !== 'Completed' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateItemStatus(item.id, 'In Progress')}
                        disabled={item.status === 'In Progress'}
                      >
                        Start Working
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateItemStatus(item.id, 'Completed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Complete
                      </Button>
                    </>
                  )}
                  {item.status === 'Completed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateItemStatus(item.id, 'Pending')}
                    >
                      Reopen
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Bell className="w-4 h-4 mr-1" />
                    Set Reminder
                  </Button>
                </div>

                {isOverdue && (
                  <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800 font-semibold">
                      <AlertTriangle className="w-4 h-4" />
                      OVERDUE: Immediate action required to avoid penalties
                    </div>
                  </div>
                )}

                {isUrgent && !isOverdue && (
                  <div className="p-3 bg-orange-100 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 text-orange-800 font-semibold">
                      <Clock className="w-4 h-4" />
                      URGENT: Due within 7 days
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {getFilteredItems().length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-gray-600">
              {selectedCategory !== 'All' || selectedPriority !== 'All' 
                ? 'Try adjusting your filters to see more items.' 
                : 'All compliance items are up to date!'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Need Help with Legal Compliance?</h3>
          <p className="text-gray-600 mb-4">
            The P5 Legal Stack course provides comprehensive compliance frameworks, templates, 
            and expert guidance to ensure you never miss a deadline or face penalties.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get P5 Legal Stack - Complete Compliance Solution
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalComplianceTracker;
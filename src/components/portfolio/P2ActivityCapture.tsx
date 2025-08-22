'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  FileText, 
  Save, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  Download,
  Calculator,
  Scale
} from 'lucide-react';

interface P2ActivityCaptureProps {
  activityTypeId: string;
  activityName: string;
  lessonId: string;
  courseCode: string;
  moduleId: string;
  onComplete?: (data: any) => void;
}

export function P2ActivityCapture({
  activityTypeId,
  activityName,
  lessonId,
  courseCode,
  moduleId,
  onComplete
}: P2ActivityCaptureProps) {
  const [activityData, setActivityData] = useState<any>({});
  const [attachments, setAttachments] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [reflection, setReflection] = useState('');
  const [status, setStatus] = useState<'in_progress' | 'completed' | 'needs_review'>('in_progress');
  const [saving, setSaving] = useState(false);

  // Activity-specific form fields based on type
  const getActivityFields = () => {
    switch (activityTypeId) {
      case 'legal_structure_decision':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Chosen Business Structure</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.structure || ''}
                onChange={(e) => setActivityData({...activityData, structure: e.target.value})}
              >
                <option value="">Select Structure</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="partnership">Partnership</option>
                <option value="llp">Limited Liability Partnership (LLP)</option>
                <option value="private_limited">Private Limited Company</option>
                <option value="opc">One Person Company (OPC)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Justification for Choice</label>
              <Textarea
                placeholder="Why did you choose this structure? Consider factors like liability, funding needs, number of owners, etc."
                value={activityData.justification || ''}
                onChange={(e) => setActivityData({...activityData, justification: e.target.value})}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Capital Requirements</label>
              <Input
                type="number"
                placeholder="Initial capital required (₹)"
                value={activityData.capital || ''}
                onChange={(e) => setActivityData({...activityData, capital: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Future Plans</label>
              <Textarea
                placeholder="How might your structure needs change as you grow? Plan for fundraising, partnerships, etc."
                value={activityData.futurePlans || ''}
                onChange={(e) => setActivityData({...activityData, futurePlans: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        );

      case 'incorporation_documentation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                placeholder="Your approved company name"
                value={activityData.companyName || ''}
                onChange={(e) => setActivityData({...activityData, companyName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Registration Status</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.status || ''}
                onChange={(e) => setActivityData({...activityData, status: e.target.value})}
              >
                <option value="">Select Status</option>
                <option value="name_approved">Name Approved</option>
                <option value="documents_prepared">Documents Prepared</option>
                <option value="application_submitted">Application Submitted</option>
                <option value="incorporated">Successfully Incorporated</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CIN/Registration Number</label>
              <Input
                placeholder="Corporate Identification Number (if incorporated)"
                value={activityData.cin || ''}
                onChange={(e) => setActivityData({...activityData, cin: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Registered Office Address</label>
              <Textarea
                placeholder="Complete registered office address"
                value={activityData.address || ''}
                onChange={(e) => setActivityData({...activityData, address: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Directors/Partners Details</label>
              <Textarea
                placeholder="Names and details of directors/partners with DIN numbers"
                value={activityData.directors || ''}
                onChange={(e) => setActivityData({...activityData, directors: e.target.value})}
                rows={4}
              />
            </div>
          </div>
        );

      case 'banking_setup':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bank Name</label>
              <Input
                placeholder="Which bank did you choose?"
                value={activityData.bankName || ''}
                onChange={(e) => setActivityData({...activityData, bankName: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Number</label>
              <Input
                placeholder="Corporate account number"
                value={activityData.accountNumber || ''}
                onChange={(e) => setActivityData({...activityData, accountNumber: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Type</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.accountType || ''}
                onChange={(e) => setActivityData({...activityData, accountType: e.target.value})}
              >
                <option value="">Select Account Type</option>
                <option value="current">Current Account</option>
                <option value="eefc">EEFC Account</option>
                <option value="escrow">Escrow Account</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Signatory Setup</label>
              <Textarea
                placeholder="Who are the authorized signatories? What are the signing powers?"
                value={activityData.signatories || ''}
                onChange={(e) => setActivityData({...activityData, signatories: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Banking Services Activated</label>
              <div className="grid grid-cols-2 gap-2">
                {['Internet Banking', 'Mobile Banking', 'UPI', 'Cheque Book', 'Debit Card', 'Credit Card'].map(service => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(activityData.services || []).includes(service)}
                      onChange={(e) => {
                        const services = activityData.services || [];
                        if (e.target.checked) {
                          setActivityData({...activityData, services: [...services, service]});
                        } else {
                          setActivityData({...activityData, services: services.filter((s: string) => s !== service)});
                        }
                      }}
                    />
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gst_compliance':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">GSTIN</label>
              <Input
                placeholder="Your GST registration number"
                value={activityData.gstin || ''}
                onChange={(e) => setActivityData({...activityData, gstin: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Registration Date</label>
              <Input
                type="date"
                value={activityData.registrationDate || ''}
                onChange={(e) => setActivityData({...activityData, registrationDate: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">GST Category</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.category || ''}
                onChange={(e) => setActivityData({...activityData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                <option value="regular">Regular</option>
                <option value="composition">Composition Scheme</option>
                <option value="casual">Casual Taxable Person</option>
                <option value="non_resident">Non-Resident</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Return Filing Frequency</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.frequency || ''}
                onChange={(e) => setActivityData({...activityData, frequency: e.target.value})}
              >
                <option value="">Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly (QRMP)</option>
                <option value="annual">Annual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Accounting Software Setup</label>
              <Input
                placeholder="Which software are you using for GST compliance?"
                value={activityData.software || ''}
                onChange={(e) => setActivityData({...activityData, software: e.target.value})}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Activity Details</label>
              <Textarea
                placeholder="Describe what you accomplished in this activity..."
                value={activityData.details || ''}
                onChange={(e) => setActivityData({...activityData, details: e.target.value})}
                rows={4}
              />
            </div>
          </div>
        );
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/portfolio/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activityTypeId,
          lessonId,
          courseCode,
          moduleId,
          completionData: activityData,
          attachments,
          notes,
          reflection,
          status
        })
      });

      if (response.ok) {
        setStatus('completed');
        onComplete?.(activityData);
      }
    } catch (error) {
      console.error('Error saving activity:', error);
    } finally {
      setSaving(false);
    }
  };

  const getActivityIcon = () => {
    switch (activityTypeId) {
      case 'legal_structure_decision':
        return <Building className="w-5 h-5" />;
      case 'incorporation_documentation':
        return <FileText className="w-5 h-5" />;
      case 'banking_setup':
        return <Calculator className="w-5 h-5" />;
      case 'gst_compliance':
        return <Scale className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'needs_review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {getActivityIcon()}
            </div>
            <div>
              <CardTitle className="text-lg">{activityName}</CardTitle>
              <p className="text-sm text-gray-600">Update your portfolio with this activity</p>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            {status === 'in_progress' && 'In Progress'}
            {status === 'completed' && 'Completed'}
            {status === 'needs_review' && 'Needs Review'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Activity-specific form */}
        <div>
          <h4 className="font-medium mb-4">Activity Details</h4>
          {getActivityFields()}
        </div>

        {/* File attachments */}
        <div>
          <label className="block text-sm font-medium mb-2">Attachments (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload documents, screenshots, or certificates</p>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">Additional Notes</label>
          <Textarea
            placeholder="Any additional information or context for this activity..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Reflection */}
        <div>
          <label className="block text-sm font-medium mb-2">Learning Reflection</label>
          <Textarea
            placeholder="What did you learn from this activity? What challenges did you face?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={3}
          />
        </div>

        {/* Progress indicator */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">Portfolio Impact</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            This activity will be added to your startup portfolio and help showcase your 
            legal and compliance readiness to investors and partners.
          </p>
          <div className="flex items-center gap-2">
            <Progress value={Object.keys(activityData).length * 20} className="flex-1" />
            <span className="text-xs text-gray-500">
              {Math.min(Object.keys(activityData).length * 20, 100)}% Complete
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={saving || Object.keys(activityData).length === 0}
            className="flex-1"
          >
            {saving ? (
              <>
                <Save className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save to Portfolio
              </>
            )}
          </Button>
          
          {status === 'completed' && (
            <Button variant="outline" onClick={() => window.open('/portfolio', '_blank')}>
              <FileText className="w-4 h-4 mr-2" />
              View Portfolio
            </Button>
          )}
        </div>

        {/* Templates and tools */}
        <div className="border-t pt-4">
          <h5 className="font-medium mb-3">Related Resources</h5>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Templates
            </Button>
            <Button variant="outline" size="sm">
              <Calculator className="w-4 h-4 mr-2" />
              Use Calculator
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View Guides
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
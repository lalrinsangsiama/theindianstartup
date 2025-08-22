'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Save, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Calculator,
  FileText,
  Users,
  Target,
  PiggyBank,
  BarChart3
} from 'lucide-react';

interface P3ActivityCaptureProps {
  activityTypeId: string;
  activityName: string;
  lessonId: string;
  courseCode: string;
  moduleId: string;
  onComplete?: (data: any) => void;
}

export function P3ActivityCapture({
  activityTypeId,
  activityName,
  lessonId,
  courseCode,
  moduleId,
  onComplete
}: P3ActivityCaptureProps) {
  const [activityData, setActivityData] = useState<any>({});
  const [attachments, setAttachments] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [reflection, setReflection] = useState('');
  const [status, setStatus] = useState<'in_progress' | 'completed' | 'needs_review'>('in_progress');
  const [saving, setSaving] = useState(false);

  // Activity-specific form fields based on funding type
  const getActivityFields = () => {
    switch (activityTypeId) {
      case 'funding_strategy_plan':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Funding Goal</label>
              <Input
                type="number"
                placeholder="Amount needed (₹)"
                value={activityData.fundingGoal || ''}
                onChange={(e) => setActivityData({...activityData, fundingGoal: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Funding Stage</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.fundingStage || ''}
                onChange={(e) => setActivityData({...activityData, fundingStage: e.target.value})}
              >
                <option value="">Select Stage</option>
                <option value="pre_seed">Pre-Seed (₹5L-₹50L)</option>
                <option value="seed">Seed (₹50L-₹5Cr)</option>
                <option value="series_a">Series A (₹5Cr-₹50Cr)</option>
                <option value="series_b">Series B (₹50Cr+)</option>
                <option value="debt">Debt Funding</option>
                <option value="government">Government Grants</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Use of Funds</label>
              <Textarea
                placeholder="How will you use the funding? Break down by category (Product, Marketing, Team, Operations, etc.)"
                value={activityData.useOfFunds || ''}
                onChange={(e) => setActivityData({...activityData, useOfFunds: e.target.value})}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Investors</label>
              <Textarea
                placeholder="List potential investors, VCs, angels, or grant programs you'll target"
                value={activityData.targetInvestors || ''}
                onChange={(e) => setActivityData({...activityData, targetInvestors: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Timeline</label>
              <Input
                placeholder="Expected timeline to close funding (e.g., 6 months)"
                value={activityData.timeline || ''}
                onChange={(e) => setActivityData({...activityData, timeline: e.target.value})}
              />
            </div>
          </div>
        );

      case 'investor_pipeline':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Identified Investors</label>
              <Input
                type="number"
                placeholder="Number of investors identified"
                value={activityData.identifiedInvestors || ''}
                onChange={(e) => setActivityData({...activityData, identifiedInvestors: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contacted Investors</label>
              <Input
                type="number"
                placeholder="Number of investors contacted"
                value={activityData.contactedInvestors || ''}
                onChange={(e) => setActivityData({...activityData, contactedInvestors: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Investor Meetings</label>
              <Input
                type="number"
                placeholder="Number of meetings scheduled/completed"
                value={activityData.investorMeetings || ''}
                onChange={(e) => setActivityData({...activityData, investorMeetings: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pipeline Status</label>
              <Textarea
                placeholder="Describe current status with each investor in your pipeline"
                value={activityData.pipelineStatus || ''}
                onChange={(e) => setActivityData({...activityData, pipelineStatus: e.target.value})}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Next Steps</label>
              <Textarea
                placeholder="What are your immediate next steps for each investor?"
                value={activityData.nextSteps || ''}
                onChange={(e) => setActivityData({...activityData, nextSteps: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        );

      case 'funding_documents':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pitch Deck Status</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.pitchDeckStatus || ''}
                onChange={(e) => setActivityData({...activityData, pitchDeckStatus: e.target.value})}
              >
                <option value="">Select Status</option>
                <option value="not_started">Not Started</option>
                <option value="draft">Draft Version</option>
                <option value="reviewed">Reviewed by Mentors</option>
                <option value="investor_ready">Investor Ready</option>
                <option value="tested">Tested with Investors</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Financial Model</label>
              <select 
                className="w-full p-3 border rounded-lg"
                value={activityData.financialModelStatus || ''}
                onChange={(e) => setActivityData({...activityData, financialModelStatus: e.target.value})}
              >
                <option value="">Select Status</option>
                <option value="basic">Basic Model</option>
                <option value="detailed">Detailed 3-Year Model</option>
                <option value="scenario_based">Scenario-Based Model</option>
                <option value="investor_grade">Investor-Grade Model</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Due Diligence Preparation</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Financial Statements',
                  'Legal Documents', 
                  'IP Documentation',
                  'Customer Contracts',
                  'Team Agreements',
                  'Compliance Records'
                ].map(doc => (
                  <label key={doc} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(activityData.ddDocuments || []).includes(doc)}
                      onChange={(e) => {
                        const docs = activityData.ddDocuments || [];
                        if (e.target.checked) {
                          setActivityData({...activityData, ddDocuments: [...docs, doc]});
                        } else {
                          setActivityData({...activityData, ddDocuments: docs.filter((d: string) => d !== doc)});
                        }
                      }}
                    />
                    <span className="text-sm">{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Valuation Analysis</label>
              <Textarea
                placeholder="Your startup's valuation range, methodology, and supporting data"
                value={activityData.valuationAnalysis || ''}
                onChange={(e) => setActivityData({...activityData, valuationAnalysis: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        );

      case 'government_grants':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Grants Applied For</label>
              <Input
                type="number"
                placeholder="Number of grant applications submitted"
                value={activityData.grantsApplied || ''}
                onChange={(e) => setActivityData({...activityData, grantsApplied: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Grant Programs</label>
              <Textarea
                placeholder="List specific grant programs you've applied to (SISF, SAMRIDH, state schemes, etc.)"
                value={activityData.grantPrograms || ''}
                onChange={(e) => setActivityData({...activityData, grantPrograms: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Grant Value</label>
              <Input
                type="number"
                placeholder="Total value of grants applied for (₹)"
                value={activityData.totalGrantValue || ''}
                onChange={(e) => setActivityData({...activityData, totalGrantValue: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Application Status</label>
              <Textarea
                placeholder="Current status of each grant application"
                value={activityData.applicationStatus || ''}
                onChange={(e) => setActivityData({...activityData, applicationStatus: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compliance Setup</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Startup India Registration',
                  'DPIIT Recognition', 
                  'GST Registration',
                  'Bank Account Setup',
                  'Audited Financials',
                  'Project Report'
                ].map(requirement => (
                  <label key={requirement} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={(activityData.complianceItems || []).includes(requirement)}
                      onChange={(e) => {
                        const items = activityData.complianceItems || [];
                        if (e.target.checked) {
                          setActivityData({...activityData, complianceItems: [...items, requirement]});
                        } else {
                          setActivityData({...activityData, complianceItems: items.filter((item: string) => item !== requirement)});
                        }
                      }}
                    />
                    <span className="text-sm">{requirement}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Funding Activity Details</label>
              <Textarea
                placeholder="Describe what you accomplished in this funding-related activity..."
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
      console.error('Error saving funding activity:', error);
    } finally {
      setSaving(false);
    }
  };

  const getActivityIcon = () => {
    switch (activityTypeId) {
      case 'funding_strategy_plan':
        return <Target className="w-5 h-5" />;
      case 'investor_pipeline':
        return <Users className="w-5 h-5" />;
      case 'funding_documents':
        return <FileText className="w-5 h-5" />;
      case 'government_grants':
        return <PiggyBank className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
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
            <div className="p-2 bg-green-100 rounded-lg">
              {getActivityIcon()}
            </div>
            <div>
              <CardTitle className="text-lg">{activityName}</CardTitle>
              <p className="text-sm text-gray-600">Build your funding portfolio with this activity</p>
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
          <h4 className="font-medium mb-4">Funding Activity Details</h4>
          {getActivityFields()}
        </div>

        {/* File attachments */}
        <div>
          <label className="block text-sm font-medium mb-2">Supporting Documents (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Upload pitch decks, financial models, term sheets, or grant applications</p>
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
            placeholder="Any additional context, insights, or next steps for this funding activity..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Reflection */}
        <div>
          <label className="block text-sm font-medium mb-2">Funding Learning Reflection</label>
          <Textarea
            placeholder="What did you learn about fundraising? What challenges did you face? What would you do differently?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={3}
          />
        </div>

        {/* Progress indicator */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Portfolio Impact</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            This funding activity will be added to your startup portfolio and help demonstrate 
            your fundraising progress and strategy to investors.
          </p>
          <div className="flex items-center gap-2">
            <Progress value={Math.min(Object.keys(activityData).length * 15, 100)} className="flex-1" />
            <span className="text-xs text-gray-500">
              {Math.min(Object.keys(activityData).length * 15, 100)}% Complete
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

        {/* Related tools and templates */}
        <div className="border-t pt-4">
          <h5 className="font-medium mb-3">P3 Funding Resources</h5>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Calculator className="w-4 h-4 mr-2" />
              Valuation Calculator
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Pitch Deck Templates
            </Button>
            <Button variant="outline" size="sm">
              <DollarSign className="w-4 h-4 mr-2" />
              Financial Models
            </Button>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Cap Table Simulator
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
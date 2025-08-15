'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Heading, Text } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  Shield, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  CreditCard,
  Scale,
  Check,
  X
} from 'lucide-react';

interface LegalCompliance {
  entity_type?: string;
  compliance_status?: any;
  registrations?: any;
  legal_documents?: any;
}

interface ComplianceItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  documents?: string[];
}

interface Registration {
  type: 'company' | 'gst' | 'trademark' | 'dpiit' | 'epf' | 'esic';
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  registrationNumber?: string;
  dateCompleted?: string;
  cost?: string;
}

export default function LegalCompliancePage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<LegalCompliance>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Local state
  const [entityType, setEntityType] = useState('');
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    fetchPortfolio();
    initializeDefaultItems();
  }, []);

  const initializeDefaultItems = () => {
    // Default compliance items for Indian startups
    const defaultCompliance: ComplianceItem[] = [
      {
        id: '1',
        name: 'Company Registration',
        description: 'Register your company with MCA (Ministry of Corporate Affairs)',
        status: 'pending',
        documents: ['MOA', 'AOA', 'Form INC-32']
      },
      {
        id: '2',
        name: 'GST Registration',
        description: 'Register for GST if annual turnover exceeds ₹20 lakhs',
        status: 'pending',
        documents: ['GST Certificate']
      },
      {
        id: '3',
        name: 'DPIIT Recognition',
        description: 'Get recognized as a startup by DPIIT for tax benefits',
        status: 'pending',
        documents: ['DPIIT Certificate']
      },
      {
        id: '4',
        name: 'Trademark Registration',
        description: 'Protect your brand name and logo',
        status: 'pending',
        documents: ['Trademark Certificate']
      }
    ];

    const defaultRegistrations: Registration[] = [
      {
        type: 'company',
        name: 'Company Registration',
        status: 'not_started',
        cost: '₹15,000 - ₹25,000'
      },
      {
        type: 'gst',
        name: 'GST Registration',
        status: 'not_started',
        cost: 'Free'
      },
      {
        type: 'trademark',
        name: 'Trademark Registration',
        status: 'not_started',
        cost: '₹4,500 - ₹10,000'
      },
      {
        type: 'dpiit',
        name: 'DPIIT Startup Recognition',
        status: 'not_started',
        cost: 'Free'
      }
    ];

    setComplianceItems(defaultCompliance);
    setRegistrations(defaultRegistrations);
  };

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/portfolio');
      
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio');
      }

      const data = await response.json();
      setPortfolio({
        entity_type: data.entity_type,
        compliance_status: data.compliance_status,
        registrations: data.registrations,
        legal_documents: data.legal_documents,
      });

      // Parse existing data
      setEntityType(data.entity_type || '');
      
      if (data.compliance_status?.items) {
        setComplianceItems(data.compliance_status.items);
      }
      
      if (data.registrations?.list) {
        setRegistrations(data.registrations.list);
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/portfolio/legal-compliance', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entityType: entityType,
          complianceStatus: {
            items: complianceItems,
            lastUpdated: new Date().toISOString(),
          },
          registrations: {
            list: registrations,
            lastUpdated: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      setLastSaved(new Date());
    } catch (err) {
      console.error('Error saving portfolio:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateComplianceStatus = (id: string, status: ComplianceItem['status']) => {
    setComplianceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const updateRegistrationStatus = (index: number, status: Registration['status'], registrationNumber?: string) => {
    setRegistrations(regs =>
      regs.map((reg, i) =>
        i === index 
          ? { 
              ...reg, 
              status, 
              registrationNumber: registrationNumber || reg.registrationNumber,
              dateCompleted: status === 'completed' ? new Date().toISOString() : reg.dateCompleted
            } 
          : reg
      )
    );
  };

  const getCompletionPercentage = () => {
    let completed = 0;
    let total = 0;

    // Entity type
    total += 1;
    if (entityType) completed += 1;

    // Compliance items
    total += complianceItems.length;
    completed += complianceItems.filter(item => item.status === 'completed').length;

    // Key registrations
    total += Math.min(2, registrations.length); // Count first 2 as essential
    completed += registrations.slice(0, 2).filter(reg => reg.status === 'completed').length;

    return total > 0 ? (completed / total) * 100 : 0;
  };

  const isComplete = getCompletionPercentage() >= 50; // 50% threshold for legal basics

  if (loading) {
    return (
      <ProtectedRoute requireSubscription={true}>
        <DashboardLayout>
          <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireSubscription={true}>
      <DashboardLayout>
        <div className="max-w-6xl mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => router.push('/portfolio')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Button>
              
              <div className="flex items-center gap-4">
                {lastSaved && (
                  <Text size="sm" color="muted">
                    Last saved {lastSaved.toLocaleTimeString()}
                  </Text>
                )}
                <Button
                  variant="primary"
                  onClick={saveSection}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <Heading as="h1" className="mb-1">
                  Legal & Compliance
                </Heading>
                <Text className="text-gray-600">
                  Set up your legal foundation and compliance requirements
                </Text>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
              </div>
              <Badge variant={isComplete ? "success" : "default"}>
                {Math.round(getCompletionPercentage())}% Complete
              </Badge>
            </div>

            {error && (
              <Card className="border-red-200 bg-red-50 mb-6">
                <CardContent className="p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <Text className="text-red-700">{error}</Text>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Entity Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    Business Entity Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Choose your business structure
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select entity type</option>
                      <option value="private_limited">Private Limited Company</option>
                      <option value="llp">Limited Liability Partnership (LLP)</option>
                      <option value="opc">One Person Company (OPC)</option>
                      <option value="proprietorship">Sole Proprietorship</option>
                      <option value="partnership">Partnership Firm</option>
                    </select>
                    
                    {entityType === 'private_limited' && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <Text size="sm" className="text-blue-700">
                          <strong>Recommended for startups:</strong> Limited liability, easier to raise funds, 
                          tax benefits, and professional credibility.
                        </Text>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-green-600" />
                    Compliance Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <Text weight="medium">{item.name}</Text>
                              <Badge 
                                variant={
                                  item.status === 'completed' ? 'success' :
                                  item.status === 'in_progress' ? 'warning' : 'default'
                                }
                                size="sm"
                              >
                                {item.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <Text size="sm" color="muted" className="mb-2">
                              {item.description}
                            </Text>
                            {item.documents && (
                              <Text size="xs" color="muted">
                                Documents: {item.documents.join(', ')}
                              </Text>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant={item.status === 'pending' ? 'primary' : 'outline'}
                            onClick={() => updateComplianceStatus(item.id, 'pending')}
                          >
                            Pending
                          </Button>
                          <Button
                            size="sm"
                            variant={item.status === 'in_progress' ? 'primary' : 'outline'}
                            onClick={() => updateComplianceStatus(item.id, 'in_progress')}
                          >
                            In Progress
                          </Button>
                          <Button
                            size="sm"
                            variant={item.status === 'completed' ? 'primary' : 'outline'}
                            onClick={() => updateComplianceStatus(item.id, 'completed')}
                          >
                            Completed
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Registration Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Registration Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {registrations.map((reg, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <Text weight="medium" className="mb-1">{reg.name}</Text>
                            <Text size="sm" color="muted">Cost: {reg.cost}</Text>
                          </div>
                          <Badge 
                            variant={
                              reg.status === 'completed' ? 'success' :
                              reg.status === 'in_progress' ? 'warning' : 'default'
                            }
                          >
                            {reg.status.replace('_', ' ')}
                          </Badge>
                        </div>

                        {reg.status === 'completed' && (
                          <div className="mb-3">
                            <Input
                              placeholder="Registration Number"
                              value={reg.registrationNumber || ''}
                              onChange={(e) => updateRegistrationStatus(index, 'completed', e.target.value)}
                            />
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={reg.status === 'not_started' ? 'primary' : 'outline'}
                            onClick={() => updateRegistrationStatus(index, 'not_started')}
                          >
                            Not Started
                          </Button>
                          <Button
                            size="sm"
                            variant={reg.status === 'in_progress' ? 'primary' : 'outline'}
                            onClick={() => updateRegistrationStatus(index, 'in_progress')}
                          >
                            In Progress
                          </Button>
                          <Button
                            size="sm"
                            variant={reg.status === 'completed' ? 'primary' : 'outline'}
                            onClick={() => updateRegistrationStatus(index, 'completed')}
                          >
                            Completed
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Legal Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    Helpful Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Text weight="medium" className="mb-1">MCA Portal</Text>
                      <Text size="sm" color="muted">Company registration and compliance</Text>
                      <a 
                        href="https://www.mca.gov.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Visit MCA →
                      </a>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Text weight="medium" className="mb-1">GST Portal</Text>
                      <Text size="sm" color="muted">GST registration and filing</Text>
                      <a 
                        href="https://www.gst.gov.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Visit GST Portal →
                      </a>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Text weight="medium" className="mb-1">Startup India</Text>
                      <Text size="sm" color="muted">DPIIT registration and benefits</Text>
                      <a 
                        href="https://www.startupindia.gov.in" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Visit Startup India →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => router.push('/portfolio/brand-assets')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Brand Assets
            </Button>

            <div className="flex items-center gap-4">
              <Button
                variant="primary"
                onClick={saveSection}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save & Continue
              </Button>

              <Button
                variant="outline"
                onClick={() => router.push('/portfolio/product-development')}
                disabled={!isComplete}
              >
                Next: Product Development
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Completion Status */}
          {isComplete && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <Text className="text-green-700 font-medium">
                  Great progress on your legal foundation! Ready to work on Product Development?
                </Text>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
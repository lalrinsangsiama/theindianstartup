'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Building,
  Calendar,
  Users,
  IndianRupee,
  FileText,
  ArrowRight,
  Loader2,
  Info
} from 'lucide-react';

interface EligibilityCriteria {
  businessAge: string;
  businessType: string;
  annualRevenue: string;
  employees: string;
  dpiitRegistered: boolean;
  msmeRegistered: boolean;
  location: string;
  sector: string;
  fundingReceived: string;
  womenLed: boolean;
}

interface EligibilityResult {
  schemeId: string;
  schemeName: string;
  eligible: boolean;
  score: number;
  missingCriteria: string[];
  suggestions: string[];
}

export function EligibilityChecker({ onComplete }: { onComplete?: (results: EligibilityResult[]) => void }) {
  const [step, setStep] = useState(1);
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState<EligibilityResult[] | null>(null);
  
  const [criteria, setCriteria] = useState<EligibilityCriteria>({
    businessAge: '',
    businessType: '',
    annualRevenue: '',
    employees: '',
    dpiitRegistered: false,
    msmeRegistered: false,
    location: '',
    sector: '',
    fundingReceived: '',
    womenLed: false
  });

  const handleInputChange = (field: keyof EligibilityCriteria, value: any) => {
    setCriteria(prev => ({ ...prev, [field]: value }));
  };

  const checkEligibility = async () => {
    setChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults: EligibilityResult[] = [
        {
          schemeId: '1',
          schemeName: 'Startup India Seed Fund Scheme',
          eligible: true,
          score: 85,
          missingCriteria: ['Annual revenue documentation'],
          suggestions: ['Prepare audited financial statements', 'Get CA certificate']
        },
        {
          schemeId: '2',
          schemeName: 'MSME Champions Scheme',
          eligible: !criteria.msmeRegistered,
          score: criteria.msmeRegistered ? 95 : 40,
          missingCriteria: criteria.msmeRegistered ? [] : ['MSME registration required'],
          suggestions: criteria.msmeRegistered ? ['Application ready'] : ['Complete Udyam registration first']
        },
        {
          schemeId: '3',
          schemeName: 'Credit Guarantee Scheme',
          eligible: parseInt(criteria.businessAge) >= 1,
          score: parseInt(criteria.businessAge) >= 1 ? 75 : 20,
          missingCriteria: parseInt(criteria.businessAge) >= 1 ? [] : ['Minimum 1 year operations required'],
          suggestions: parseInt(criteria.businessAge) >= 1 ? ['Prepare business plan'] : ['Wait for eligibility period']
        }
      ];
      
      setResults(mockResults);
      setChecking(false);
      if (onComplete) {
        onComplete(mockResults);
      }
    }, 2000);
  };

  if (results) {
    return (
      <div className="space-y-4">
        <div className="mb-6">
          <Heading as="h3" variant="h4" className="mb-2">
            Your Eligibility Results
          </Heading>
          <Text color="muted">
            Based on your inputs, here are the schemes you're eligible for
          </Text>
        </div>

        {results.map(result => (
          <Card 
            key={result.schemeId} 
            className={`border-2 ${result.eligible ? 'border-green-200' : 'border-gray-200'}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {result.eligible ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <Heading as="h4" variant="h6">
                      {result.schemeName}
                    </Heading>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={result.eligible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}
                    >
                      {result.eligible ? 'Eligible' : 'Not Eligible'}
                    </Badge>
                    <Text size="sm" color="muted">
                      Match Score: {result.score}%
                    </Text>
                  </div>
                </div>
              </div>

              {result.missingCriteria.length > 0 && (
                <div className="mb-4">
                  <Text size="sm" weight="medium" className="mb-2">
                    {result.eligible ? 'To Improve Application:' : 'Missing Requirements:'}
                  </Text>
                  <ul className="space-y-1">
                    {result.missingCriteria.map((criteria, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                        <Text size="sm">{criteria}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.suggestions.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Text size="sm" weight="medium" className="mb-2">Next Steps:</Text>
                  <ul className="space-y-1">
                    {result.suggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5" />
                        <Text size="sm">{suggestion}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-3 mt-6">
          <Button 
            variant="outline"
            onClick={() => {
              setResults(null);
              setStep(1);
              setCriteria({
                businessAge: '',
                businessType: '',
                annualRevenue: '',
                employees: '',
                dpiitRegistered: false,
                msmeRegistered: false,
                location: '',
                sector: '',
                fundingReceived: '',
                womenLed: false
              });
            }}
          >
            Check Again
          </Button>
          <Button variant="primary">
            Save Results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <Text size="sm" weight="medium">Step {step} of 3</Text>
          <Text size="sm" color="muted">{Math.round((step / 3) * 100)}% Complete</Text>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Basic Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Business Age
              </label>
              <select
                value={criteria.businessAge}
                onChange={(e) => handleInputChange('businessAge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select age</option>
                <option value="0">Less than 1 year</option>
                <option value="1">1-2 years</option>
                <option value="2">2-5 years</option>
                <option value="5">More than 5 years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Business Type
              </label>
              <select
                value={criteria.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select type</option>
                <option value="pvt_ltd">Private Limited</option>
                <option value="llp">LLP</option>
                <option value="partnership">Partnership</option>
                <option value="proprietorship">Proprietorship</option>
                <option value="opc">One Person Company</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location (State)
              </label>
              <select
                value={criteria.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select state</option>
                <option value="karnataka">Karnataka</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="delhi">Delhi</option>
                <option value="tamil_nadu">Tamil Nadu</option>
                <option value="telangana">Telangana</option>
                <option value="gujarat">Gujarat</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Business Sector
              </label>
              <select
                value={criteria.sector}
                onChange={(e) => handleInputChange('sector', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select sector</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="fintech">Fintech</option>
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
              </select>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!criteria.businessAge || !criteria.businessType || !criteria.location || !criteria.sector}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Financial Information */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Financial & Team Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Annual Revenue
              </label>
              <select
                value={criteria.annualRevenue}
                onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select range</option>
                <option value="0">Pre-revenue</option>
                <option value="10">Less than ₹10 lakhs</option>
                <option value="50">₹10-50 lakhs</option>
                <option value="100">₹50 lakhs - 1 crore</option>
                <option value="500">₹1-5 crores</option>
                <option value="1000">Above ₹5 crores</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Employees
              </label>
              <select
                value={criteria.employees}
                onChange={(e) => handleInputChange('employees', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select range</option>
                <option value="1">1-5</option>
                <option value="5">5-10</option>
                <option value="10">10-25</option>
                <option value="25">25-50</option>
                <option value="50">50-100</option>
                <option value="100">100+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Previous Funding Received
              </label>
              <select
                value={criteria.fundingReceived}
                onChange={(e) => handleInputChange('fundingReceived', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
              >
                <option value="">Select amount</option>
                <option value="0">No funding</option>
                <option value="10">Less than ₹10 lakhs</option>
                <option value="50">₹10-50 lakhs</option>
                <option value="100">₹50 lakhs - 1 crore</option>
                <option value="500">Above ₹1 crore</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={criteria.womenLed}
                  onChange={(e) => handleInputChange('womenLed', e.target.checked)}
                  className="w-4 h-4"
                />
                <Text size="sm">Women-led business (51% or more ownership)</Text>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => setStep(3)}
                disabled={!criteria.annualRevenue || !criteria.employees || !criteria.fundingReceived}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Registrations */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Registrations & Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="info">
              <Info className="w-4 h-4" />
              <Text size="sm">
                These registrations significantly increase your eligibility for government schemes
              </Text>
            </Alert>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={criteria.dpiitRegistered}
                  onChange={(e) => handleInputChange('dpiitRegistered', e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <Text weight="medium">DPIIT Registration</Text>
                  <Text size="sm" color="muted">Startup India recognition</Text>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={criteria.msmeRegistered}
                  onChange={(e) => handleInputChange('msmeRegistered', e.target.checked)}
                  className="w-4 h-4"
                />
                <div>
                  <Text weight="medium">MSME/Udyam Registration</Text>
                  <Text size="sm" color="muted">Ministry of MSME registration</Text>
                </div>
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={checkEligibility}
                disabled={checking}
              >
                {checking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    Check Eligibility
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
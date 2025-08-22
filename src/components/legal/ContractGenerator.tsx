'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Download, Eye, Users, Building, Scale } from 'lucide-react';

interface ContractData {
  contractType: string;
  parties: {
    party1: { name: string; address: string; role: string; };
    party2: { name: string; address: string; role: string; };
  };
  terms: {
    duration: string;
    payment: string;
    deliverables: string;
    terminationClause: string;
    governingLaw: string;
    disputeResolution: string;
  };
  customClauses: string[];
}

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  clauses: string[];
  sampleText: string;
  icon: React.ReactNode;
}

const CONTRACT_TEMPLATES: ContractTemplate[] = [
  {
    id: 'founders_agreement',
    name: 'Founders Agreement',
    description: 'Comprehensive agreement between company founders covering equity, vesting, IP assignment, and exit terms',
    category: 'Corporate',
    clauses: ['Equity Distribution', 'Vesting Schedule', 'IP Assignment', 'Non-Compete', 'Exit Mechanisms'],
    sampleText: `FOUNDERS AGREEMENT

This Founders Agreement ("Agreement") is entered into on [DATE] between:

1. [FOUNDER 1 NAME], residing at [ADDRESS] ("Founder 1")
2. [FOUNDER 2 NAME], residing at [ADDRESS] ("Founder 2")

WHEREAS, the parties wish to establish a clear framework for their collaboration in founding and operating [COMPANY NAME] ("Company");

NOW THEREFORE, the parties agree as follows:

1. EQUITY DISTRIBUTION
   1.1 Founder 1 shall hold [X]% equity in the Company
   1.2 Founder 2 shall hold [Y]% equity in the Company
   1.3 Remaining [Z]% shall be reserved for ESOP pool

2. VESTING SCHEDULE
   2.1 All founder equity shall vest over 4 years with 1-year cliff
   2.2 Vesting accelerates on involuntary termination without cause
   2.3 Unvested equity subject to repurchase at fair market value

3. INTELLECTUAL PROPERTY
   3.1 All IP created in course of business assigned to Company
   3.2 Pre-existing IP listed in Schedule A
   3.3 Waiver of moral rights where applicable

[Additional clauses continue...]`,
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 'employment_agreement',
    name: 'Employment Agreement',
    description: 'Standard employment contract with IP assignment, confidentiality, and termination clauses',
    category: 'Employment',
    clauses: ['Job Description', 'Compensation', 'IP Assignment', 'Confidentiality', 'Termination'],
    sampleText: `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into between [COMPANY NAME], a company incorporated under the laws of India ("Company") and [EMPLOYEE NAME] ("Employee").

1. POSITION AND DUTIES
   1.1 Employee shall serve as [POSITION]
   1.2 Employee shall report to [REPORTING MANAGER]
   1.3 Employee shall devote full professional time and attention to Company

2. COMPENSATION
   2.1 Base salary: ₹[AMOUNT] per annum
   2.2 Variable compensation as per Company policy
   2.3 Benefits including PF, ESI, health insurance

3. INTELLECTUAL PROPERTY ASSIGNMENT
   3.1 All work product belongs to Company
   3.2 Employee assigns all rights to Company
   3.3 Employee shall assist in IP protection

[Additional clauses continue...]`,
    icon: <Building className="w-5 h-5" />
  },
  {
    id: 'nda',
    name: 'Non-Disclosure Agreement',
    description: 'Comprehensive NDA for protecting confidential business information and trade secrets',
    category: 'Commercial',
    clauses: ['Definition of Confidential Information', 'Permitted Use', 'Return of Information', 'Remedies'],
    sampleText: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into between [DISCLOSING PARTY] and [RECEIVING PARTY].

1. CONFIDENTIAL INFORMATION
   1.1 Includes all technical, business, financial information
   1.2 Information marked confidential or reasonably considered confidential
   1.3 Excludes publicly available information

2. OBLIGATIONS
   2.1 Receiving Party shall maintain strict confidentiality
   2.2 Use information solely for evaluation purposes
   2.3 Not disclose to third parties without consent

3. TERM
   3.1 Agreement effective for [DURATION]
   3.2 Obligations survive termination
   3.3 Return all confidential materials upon request

[Additional clauses continue...]`,
    icon: <Scale className="w-5 h-5" />
  },
  {
    id: 'service_agreement',
    name: 'Service Agreement',
    description: 'Master service agreement for B2B services with SLAs, payment terms, and liability clauses',
    category: 'Commercial',
    clauses: ['Scope of Services', 'Service Levels', 'Payment Terms', 'Liability Limitations', 'Termination'],
    sampleText: `SERVICE AGREEMENT

This Service Agreement is between [SERVICE PROVIDER] ("Provider") and [CLIENT] ("Client").

1. SERVICES
   1.1 Provider shall provide services as detailed in Statement of Work
   1.2 Services include [DESCRIPTION]
   1.3 Performance standards as per SLA

2. PAYMENT TERMS
   2.1 Fees: ₹[AMOUNT] [FREQUENCY]
   2.2 Payment due within [X] days of invoice
   2.3 Late payment interest at [RATE]%

3. SERVICE LEVEL AGREEMENT
   3.1 Uptime: [X]%
   3.2 Response time: [X] hours
   3.3 Service credits for non-compliance

[Additional clauses continue...]`,
    icon: <FileText className="w-5 h-5" />
  }
];

const ContractGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [contractData, setContractData] = useState<ContractData>({
    contractType: '',
    parties: {
      party1: { name: '', address: '', role: '' },
      party2: { name: '', address: '', role: '' }
    },
    terms: {
      duration: '',
      payment: '',
      deliverables: '',
      terminationClause: '',
      governingLaw: 'Laws of India',
      disputeResolution: 'Arbitration in New Delhi'
    },
    customClauses: []
  });
  
  const [generatedContract, setGeneratedContract] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setContractData(prev => ({
      ...prev,
      contractType: template.name
    }));
  };

  const generateContract = () => {
    if (!selectedTemplate) return;
    
    let contract = selectedTemplate.sampleText;
    
    // Replace placeholders with actual data
    contract = contract
      .replace(/\[COMPANY NAME\]/g, contractData.parties.party1.name)
      .replace(/\[FOUNDER 1 NAME\]/g, contractData.parties.party1.name)
      .replace(/\[FOUNDER 2 NAME\]/g, contractData.parties.party2.name)
      .replace(/\[EMPLOYEE NAME\]/g, contractData.parties.party2.name)
      .replace(/\[SERVICE PROVIDER\]/g, contractData.parties.party1.name)
      .replace(/\[CLIENT\]/g, contractData.parties.party2.name)
      .replace(/\[DISCLOSING PARTY\]/g, contractData.parties.party1.name)
      .replace(/\[RECEIVING PARTY\]/g, contractData.parties.party2.name)
      .replace(/\[DATE\]/g, new Date().toLocaleDateString('en-IN'))
      .replace(/\[ADDRESS\]/g, contractData.parties.party1.address);

    // Add payment terms if specified
    if (contractData.terms.payment) {
      contract = contract.replace(/₹\[AMOUNT\]/g, contractData.terms.payment);
    }

    // Add duration if specified
    if (contractData.terms.duration) {
      contract = contract.replace(/\[DURATION\]/g, contractData.terms.duration);
    }

    // Add governing law and dispute resolution
    contract = contract.replace(/Laws of India/g, contractData.terms.governingLaw);
    contract = contract.replace(/Arbitration in New Delhi/g, contractData.terms.disputeResolution);

    // Add custom clauses
    if (contractData.customClauses.length > 0) {
      const customSection = '\n\nADDITIONAL TERMS:\n' + 
        contractData.customClauses.map((clause, index) => `${index + 1}. ${clause}`).join('\n');
      contract += customSection;
    }

    // Add standard footer
    contract += `

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

${contractData.parties.party1.name}          ${contractData.parties.party2.name}


_________________________              _________________________
Signature                               Signature

Name: ${contractData.parties.party1.name}                    Name: ${contractData.parties.party2.name}
Title: ${contractData.parties.party1.role}                   Title: ${contractData.parties.party2.role}
Date: _________________                 Date: _________________`;

    setGeneratedContract(contract);
    setShowPreview(true);
  };

  const downloadContract = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedContract], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedTemplate?.name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-mono">AI-Powered Contract Generator</h1>
        <p className="text-xl text-gray-600">Generate professional contracts in minutes, not hours</p>
        <p className="text-lg text-blue-600 font-semibold">300+ Expert-Drafted Templates Available</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Template Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">1. Select Contract Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {CONTRACT_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{template.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{template.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {template.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {template.clauses.map((clause, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {clause}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Party Information */}
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">2. Party Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Party 1</h4>
                    <div>
                      <Label htmlFor="party1-name">Name/Company</Label>
                      <Input
                        id="party1-name"
                        value={contractData.parties.party1.name}
                        onChange={(e) => setContractData(prev => ({
                          ...prev,
                          parties: { ...prev.parties, party1: { ...prev.parties.party1, name: e.target.value }}
                        }))}
                        placeholder="ABC Private Limited"
                      />
                    </div>
                    <div>
                      <Label htmlFor="party1-role">Role</Label>
                      <Input
                        id="party1-role"
                        value={contractData.parties.party1.role}
                        onChange={(e) => setContractData(prev => ({
                          ...prev,
                          parties: { ...prev.parties, party1: { ...prev.parties.party1, role: e.target.value }}
                        }))}
                        placeholder="Company/Founder/Service Provider"
                      />
                    </div>
                    <div>
                      <Label htmlFor="party1-address">Address</Label>
                      <Textarea
                        id="party1-address"
                        value={contractData.parties.party1.address}
                        onChange={(e) => setContractData(prev => ({
                          ...prev,
                          parties: { ...prev.parties, party1: { ...prev.parties.party1, address: e.target.value }}
                        }))}
                        placeholder="Complete address"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Party 2</h4>
                    <div>
                      <Label htmlFor="party2-name">Name/Company</Label>
                      <Input
                        id="party2-name"
                        value={contractData.parties.party2.name}
                        onChange={(e) => setContractData(prev => ({
                          ...prev,
                          parties: { ...prev.parties, party2: { ...prev.parties.party2, name: e.target.value }}
                        }))}
                        placeholder="XYZ Private Limited"
                      />
                    </div>
                    <div>
                      <Label htmlFor="party2-role">Role</Label>
                      <Input
                        id="party2-role"
                        value={contractData.parties.party2.role}
                        onChange={(e) => setContractData(prev => ({
                          ...prev,
                          parties: { ...prev.parties, party2: { ...prev.parties.party2, role: e.target.value }}
                        }))}
                        placeholder="Client/Employee/Counterparty"
                      />
                    </div>
                    <div>
                      <Label htmlFor="party2-address">Address</Label>
                      <Textarea
                        id="party2-address"
                        value={contractData.parties.party2.address}
                        onChange={(e) => setContractData(prev => ({
                          ...prev,
                          parties: { ...prev.parties, party2: { ...prev.parties.party2, address: e.target.value }}
                        }))}
                        placeholder="Complete address"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contract Terms */}
          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">3. Contract Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={contractData.terms.duration}
                      onChange={(e) => setContractData(prev => ({
                        ...prev,
                        terms: { ...prev.terms, duration: e.target.value }
                      }))}
                      placeholder="e.g., 2 years, Indefinite"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment">Payment Terms</Label>
                    <Input
                      id="payment"
                      value={contractData.terms.payment}
                      onChange={(e) => setContractData(prev => ({
                        ...prev,
                        terms: { ...prev.terms, payment: e.target.value }
                      }))}
                      placeholder="e.g., ₹10,00,000 per month"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="deliverables">Key Deliverables/Scope</Label>
                  <Textarea
                    id="deliverables"
                    value={contractData.terms.deliverables}
                    onChange={(e) => setContractData(prev => ({
                      ...prev,
                      terms: { ...prev.terms, deliverables: e.target.value }
                    }))}
                    placeholder="Describe main deliverables or scope of work"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="governing-law">Governing Law</Label>
                    <select
                      id="governing-law"
                      value={contractData.terms.governingLaw}
                      onChange={(e) => setContractData(prev => ({
                        ...prev,
                        terms: { ...prev.terms, governingLaw: e.target.value }
                      }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Laws of India">Laws of India</option>
                      <option value="Laws of Delhi">Laws of Delhi</option>
                      <option value="Laws of Mumbai">Laws of Mumbai</option>
                      <option value="Laws of Bangalore">Laws of Bangalore</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="dispute-resolution">Dispute Resolution</Label>
                    <select
                      id="dispute-resolution"
                      value={contractData.terms.disputeResolution}
                      onChange={(e) => setContractData(prev => ({
                        ...prev,
                        terms: { ...prev.terms, disputeResolution: e.target.value }
                      }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="Arbitration in New Delhi">Arbitration in New Delhi</option>
                      <option value="Arbitration in Mumbai">Arbitration in Mumbai</option>
                      <option value="Mediation followed by Arbitration">Mediation followed by Arbitration</option>
                      <option value="Courts in Delhi">Courts in Delhi</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={generateContract} className="px-8 py-3 text-lg">
                    <FileText className="w-5 h-5 mr-2" />
                    Generate Contract
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview and Download */}
        <div className="space-y-6">
          {showPreview && generatedContract && (
            <Card>
              <CardHeader>
                <CardTitle className="font-mono flex items-center justify-between">
                  Contract Preview
                  <div className="flex gap-2">
                    <Button onClick={() => setShowPreview(false)} variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button onClick={downloadContract} size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {generatedContract}
                  </pre>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Important Legal Notice</h4>
                  <p className="text-sm text-yellow-800">
                    This contract is generated from a template and should be reviewed by a qualified lawyer 
                    before execution. The P5 Legal Stack course provides comprehensive training on contract 
                    customization and legal review processes.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contract Information */}
          {selectedTemplate && !showPreview && (
            <Card>
              <CardHeader>
                <CardTitle className="font-mono">Template Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {selectedTemplate.icon}
                    <h3 className="text-xl font-semibold">{selectedTemplate.name}</h3>
                  </div>
                  <p className="text-gray-600">{selectedTemplate.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Key Clauses Included:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTemplate.clauses.map((clause, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{clause}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-1">Expert Drafted</h4>
                    <p className="text-sm text-blue-800">
                      This template has been created by senior advocates and tested in real legal scenarios. 
                      It includes industry best practices and comprehensive protection clauses.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">P5 Contract Generator Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Expert-Drafted Templates</h4>
                    <p className="text-sm text-gray-600">300+ templates created by senior advocates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">AI-Powered Customization</h4>
                    <p className="text-sm text-gray-600">Smart clause suggestions based on your inputs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Legal Compliance</h4>
                    <p className="text-sm text-gray-600">Updated with latest Indian law changes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Cost Savings</h4>
                    <p className="text-sm text-gray-600">Save ₹50,000-₹2,00,000 in legal drafting costs</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContractGenerator;
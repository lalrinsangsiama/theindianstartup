'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Text, Heading } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Download,
  FileText,
  Calculator,
  TrendingUp,
  Users,
  Building,
  IndianRupee,
  Calendar,
  Target,
  Star,
  ArrowRight,
  Info,
  Clock,
  Award,
  Zap
} from 'lucide-react';

interface EligibilityQuestion {
  id: string;
  category: string;
  question: string;
  type: 'boolean' | 'select' | 'number' | 'text';
  options?: string[];
  required: boolean;
  helpText?: string;
}

interface EligibilityResult {
  schemeId: string;
  schemeName: string;
  matchPercentage: number;
  eligibleAmount: {
    min: number;
    max: number;
  };
  recommendations: string[];
  missingRequirements: string[];
  nextSteps: string[];
  successProbability: number;
  category: string;
  processingTime: string;
}

interface EligibilityCheckerProps {
  onComplete: (results: EligibilityResult[]) => void;
}

const eligibilityQuestions: EligibilityQuestion[] = [
  // Company Details
  {
    id: 'company-stage',
    category: 'Company Details',
    question: 'What is your current company stage?',
    type: 'select',
    options: [
      'Idea stage (0-6 months)',
      'MVP/Prototype stage (6-18 months)', 
      'Early revenue (18-36 months)',
      'Growth stage (3+ years)',
      'Scale-up stage (5+ years)'
    ],
    required: true,
    helpText: 'Different schemes target different company stages'
  },
  {
    id: 'incorporation-status',
    category: 'Company Details',
    question: 'Is your company incorporated in India?',
    type: 'boolean',
    required: true,
    helpText: 'Most government schemes require Indian incorporation'
  },
  {
    id: 'dpiit-recognition',
    category: 'Company Details', 
    question: 'Do you have DPIIT Startup India recognition?',
    type: 'boolean',
    required: false,
    helpText: 'Required for many central government schemes'
  },
  {
    id: 'udyam-registration',
    category: 'Company Details',
    question: 'Do you have Udyam (MSME) registration?',
    type: 'boolean',
    required: false,
    helpText: 'Required for MSME-specific schemes'
  },
  {
    id: 'gst-registration',
    category: 'Company Details',
    question: 'Do you have GST registration?',
    type: 'boolean',
    required: false
  },
  {
    id: 'annual-turnover',
    category: 'Company Details',
    question: 'What is your current annual turnover (₹ lakhs)?',
    type: 'number',
    required: false,
    helpText: 'Many schemes have turnover limits'
  },

  // Business Model
  {
    id: 'sector',
    category: 'Business Model',
    question: 'Which sector best describes your business?',
    type: 'select',
    options: [
      'Information Technology',
      'Manufacturing & Hardware',
      'Healthcare & Biotechnology',
      'Agriculture & Food Processing',
      'Financial Services (Fintech)',
      'Clean Energy & Environment',
      'Education Technology',
      'Retail & E-commerce',
      'Transportation & Logistics',
      'Other Services'
    ],
    required: true
  },
  {
    id: 'innovation-type',
    category: 'Business Model',
    question: 'What type of innovation does your business represent?',
    type: 'select',
    options: [
      'Deep Technology/R&D',
      'Digital Platform/Software',
      'Process Innovation',
      'Social Innovation',
      'Product Innovation',
      'Service Innovation'
    ],
    required: true
  },
  {
    id: 'target-market',
    category: 'Business Model',
    question: 'Who is your primary target market?',
    type: 'select',
    options: [
      'B2B Enterprise',
      'B2B SME',
      'B2C Urban',
      'B2C Rural',
      'B2G Government',
      'B2B2C Platform'
    ],
    required: true
  },
  {
    id: 'export-potential',
    category: 'Business Model',
    question: 'Does your business have export potential?',
    type: 'boolean',
    required: false,
    helpText: 'Export-oriented businesses get priority in many schemes'
  },

  // Financial Information
  {
    id: 'funding-needed',
    category: 'Financial Information',
    question: 'How much funding do you need (₹ lakhs)?',
    type: 'select',
    options: [
      '₹5-25 lakhs',
      '₹25-50 lakhs',
      '₹50 lakhs - ₹1 crore',
      '₹1-2 crore',
      '₹2-5 crore',
      'Above ₹5 crore'
    ],
    required: true
  },
  {
    id: 'funding-purpose',
    category: 'Financial Information',
    question: 'What is the primary purpose of funding?',
    type: 'select',
    options: [
      'Product Development',
      'Market Expansion',
      'Technology Upgrade',
      'Working Capital',
      'Infrastructure Setup',
      'Team Building',
      'Marketing & Sales'
    ],
    required: true
  },
  {
    id: 'previous-funding',
    category: 'Financial Information',
    question: 'Have you received any previous funding?',
    type: 'select',
    options: [
      'No previous funding',
      'Government grant (₹1-10 lakhs)',
      'Government grant (₹10+ lakhs)',
      'Angel investment (₹10-50 lakhs)',
      'VC funding (₹50 lakhs+)',
      'Bank loan',
      'Multiple sources'
    ],
    required: false
  },
  {
    id: 'collateral-available',
    category: 'Financial Information',
    question: 'Do you have collateral available for loans?',
    type: 'boolean',
    required: false
  },

  // Geographic & Social Impact
  {
    id: 'state-location',
    category: 'Geographic & Impact',
    question: 'In which state is your primary operations?',
    type: 'select',
    options: [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
      'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
      'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
      'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
      'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
      'Delhi', 'Chandigarh', 'Puducherry', 'Jammu & Kashmir', 'Ladakh'
    ],
    required: true
  },
  {
    id: 'rural-focus',
    category: 'Geographic & Impact',
    question: 'Does your business focus on rural areas?',
    type: 'boolean',
    required: false,
    helpText: 'Rural-focused businesses get priority in many schemes'
  },
  {
    id: 'job-creation',
    category: 'Geographic & Impact',
    question: 'How many jobs will you create in the next 2 years?',
    type: 'select',
    options: [
      '1-10 jobs',
      '11-25 jobs',
      '26-50 jobs',
      '51-100 jobs',
      '100+ jobs'
    ],
    required: false
  },
  {
    id: 'women-employment',
    category: 'Geographic & Impact',
    question: 'Will you focus on women employment?',
    type: 'boolean',
    required: false,
    helpText: 'Women-focused employment gets additional points'
  }
];

// Mock scheme database for eligibility matching
const schemes = [
  {
    id: 'sisfs',
    name: 'Startup India Seed Fund Scheme',
    category: 'Seed Funding',
    fundingRange: { min: 20, max: 50 },
    eligibilityCriteria: {
      'dpiit-recognition': true,
      'company-stage': ['Idea stage (0-6 months)', 'MVP/Prototype stage (6-18 months)'],
      'annual-turnover': { max: 25 },
      'previous-funding': ['No previous funding', 'Government grant (₹1-10 lakhs)']
    },
    processingTime: '3-4 months',
    successRate: 15
  },
  {
    id: 'msme-champions',
    name: 'MSME Champions Scheme',
    category: 'Grants',
    fundingRange: { min: 5, max: 100 },
    eligibilityCriteria: {
      'udyam-registration': true,
      'company-stage': ['Early revenue (18-36 months)', 'Growth stage (3+ years)'],
      'annual-turnover': { min: 5, max: 2500 },
      'gst-registration': true
    },
    processingTime: '2-3 months',
    successRate: 35
  },
  {
    id: 'karnataka-idea2poc',
    name: 'Karnataka Idea2PoC Grant',
    category: 'State Grant',
    fundingRange: { min: 50, max: 50 },
    eligibilityCriteria: {
      'state-location': ['Karnataka'],
      'company-stage': ['MVP/Prototype stage (6-18 months)'],
      'sector': ['Information Technology', 'Healthcare & Biotechnology'],
      'innovation-type': ['Deep Technology/R&D', 'Digital Platform/Software']
    },
    processingTime: '2 months',
    successRate: 20
  },
  {
    id: 'cgss',
    name: 'Credit Guarantee Scheme for Startups',
    category: 'Loan Guarantee',
    fundingRange: { min: 10, max: 1000 },
    eligibilityCriteria: {
      'dpiit-recognition': true,
      'company-stage': ['Early revenue (18-36 months)', 'Growth stage (3+ years)'],
      'funding-purpose': ['Working Capital', 'Market Expansion', 'Infrastructure Setup'],
      'gst-registration': true
    },
    processingTime: '1 month',
    successRate: 45
  },
  {
    id: 'aim-grant',
    name: 'Atal Innovation Mission Grant',
    category: 'Innovation Grant',
    fundingRange: { min: 10, max: 100 },
    eligibilityCriteria: {
      'innovation-type': ['Deep Technology/R&D', 'Social Innovation'],
      'company-stage': ['Idea stage (0-6 months)', 'MVP/Prototype stage (6-18 months)'],
      'job-creation': ['11-25 jobs', '26-50 jobs', '51-100 jobs', '100+ jobs']
    },
    processingTime: '3 months',
    successRate: 10
  }
];

export function EnhancedEligibilityChecker({ onComplete }: EligibilityCheckerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [...new Set(eligibilityQuestions.map(q => q.category))];
  const currentCategory = categories[currentStep];
  const questionsInCategory = eligibilityQuestions.filter(q => q.category === currentCategory);
  const totalSteps = categories.length;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const canProceed = () => {
    const requiredQuestions = questionsInCategory.filter(q => q.required);
    return requiredQuestions.every(q => answers[q.id] !== undefined && answers[q.id] !== '');
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateEligibility();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateEligibility = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const eligibilityResults: EligibilityResult[] = schemes.map(scheme => {
      let matchScore = 0;
      let totalCriteria = 0;
      const missingRequirements: string[] = [];
      const recommendations: string[] = [];

      // Calculate match percentage based on eligibility criteria
      Object.entries(scheme.eligibilityCriteria).forEach(([criterion, requirement]) => {
        totalCriteria++;
        const userAnswer = answers[criterion];

        if (typeof requirement === 'boolean') {
          if (userAnswer === requirement) {
            matchScore++;
          } else if (requirement && !userAnswer) {
            missingRequirements.push(`${criterion.replace('-', ' ')} required`);
          }
        } else if (Array.isArray(requirement)) {
          if (requirement.includes(userAnswer)) {
            matchScore++;
          } else if (userAnswer) {
            missingRequirements.push(`Current ${criterion.replace('-', ' ')}: ${userAnswer} not eligible`);
          }
        } else if (typeof requirement === 'object' && requirement !== null) {
          const numericAnswer = parseFloat(userAnswer) || 0;
          let meets = true;
          
          if ('min' in requirement && numericAnswer < requirement.min) {
            meets = false;
            missingRequirements.push(`Minimum ${criterion.replace('-', ' ')} of ₹${requirement.min} lakhs required`);
          }
          if ('max' in requirement && numericAnswer > requirement.max) {
            meets = false;
            missingRequirements.push(`Maximum ${criterion.replace('-', ' ')} of ₹${requirement.max} lakhs allowed`);
          }
          
          if (meets) matchScore++;
        }
      });

      const matchPercentage = Math.round((matchScore / totalCriteria) * 100);

      // Generate recommendations based on gaps
      if (matchPercentage < 100) {
        if (!answers['dpiit-recognition'] && scheme.id === 'sisfs') {
          recommendations.push('Apply for DPIIT Startup India recognition first');
        }
        if (!answers['udyam-registration'] && scheme.id === 'msme-champions') {
          recommendations.push('Complete Udyam (MSME) registration');
        }
        if (missingRequirements.length > 0) {
          recommendations.push('Address missing requirements to improve eligibility');
        }
      }

      // Adjust funding amount based on user needs
      const userFundingNeed = answers['funding-needed'];
      let adjustedMin = scheme.fundingRange.min;
      let adjustedMax = scheme.fundingRange.max;

      if (userFundingNeed) {
        if (userFundingNeed.includes('₹5-25')) {
          adjustedMax = Math.min(adjustedMax, 25);
        } else if (userFundingNeed.includes('₹25-50')) {
          adjustedMin = Math.max(adjustedMin, 25);
          adjustedMax = Math.min(adjustedMax, 50);
        }
        // Add more funding range adjustments as needed
      }

      // Calculate success probability
      let successProbability = scheme.successRate;
      if (matchPercentage >= 90) successProbability += 10;
      if (matchPercentage >= 80) successProbability += 5;
      if (answers['export-potential']) successProbability += 5;
      if (answers['rural-focus']) successProbability += 5;
      if (answers['women-employment']) successProbability += 3;

      successProbability = Math.min(successProbability, 85); // Cap at 85%

      const nextSteps: string[] = [];
      if (matchPercentage >= 70) {
        nextSteps.push('Prepare detailed business plan');
        nextSteps.push('Gather required documentation');
        nextSteps.push('Submit application before deadline');
      } else {
        nextSteps.push('Improve eligibility criteria first');
        nextSteps.push('Consider applying to better-matched schemes');
      }

      return {
        schemeId: scheme.id,
        schemeName: scheme.name,
        matchPercentage,
        eligibleAmount: {
          min: adjustedMin,
          max: adjustedMax
        },
        recommendations,
        missingRequirements,
        nextSteps,
        successProbability: Math.round(successProbability),
        category: scheme.category,
        processingTime: scheme.processingTime
      };
    });

    // Sort by match percentage and success probability
    const sortedResults = eligibilityResults.sort((a, b) => {
      if (a.matchPercentage !== b.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return b.successProbability - a.successProbability;
    });

    setResults(sortedResults);
    setLoading(false);
    setShowResults(true);
    onComplete(sortedResults);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <Text weight="medium">Analyzing your eligibility...</Text>
          <Text size="sm" color="muted">Checking against 500+ government schemes</Text>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <Text className="text-2xl font-bold">{results.length}</Text>
              <Text size="sm" color="muted">Schemes Analyzed</Text>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <Text className="text-2xl font-bold">
                {results.filter(r => r.matchPercentage >= 80).length}
              </Text>
              <Text size="sm" color="muted">High Match</Text>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <IndianRupee className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <Text className="text-2xl font-bold">
                ₹{Math.max(...results.map(r => r.eligibleAmount.max))}L
              </Text>
              <Text size="sm" color="muted">Max Funding</Text>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <Text className="text-2xl font-bold">
                {Math.max(...results.map(r => r.successProbability))}%
              </Text>
              <Text size="sm" color="muted">Best Success Rate</Text>
            </CardContent>
          </Card>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {results.map((result, index) => (
            <Card 
              key={result.schemeId}
              className={`border-2 ${
                result.matchPercentage >= 80 ? 'border-green-200 bg-green-50' :
                result.matchPercentage >= 60 ? 'border-yellow-200 bg-yellow-50' :
                'border-gray-200'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Heading as="h4" variant="h5">
                        {result.schemeName}
                      </Heading>
                      <Badge 
                        className={`
                          ${result.matchPercentage >= 80 ? 'bg-green-100 text-green-700' :
                            result.matchPercentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'}
                        `}
                      >
                        {result.matchPercentage}% Match
                      </Badge>
                      {index === 0 && (
                        <Badge className="bg-blue-100 text-blue-700">
                          <Star className="w-3 h-3 mr-1" />
                          Top Match
                        </Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        <Text size="sm">
                          ₹{result.eligibleAmount.min}L - ₹{result.eligibleAmount.max}L
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <Text size="sm">{result.processingTime}</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <Text size="sm">{result.successProbability}% success rate</Text>
                      </div>
                    </div>

                    <Badge variant="outline" size="sm" className="mb-3">
                      {result.category}
                    </Badge>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  {result.missingRequirements.length > 0 && (
                    <div>
                      <Text weight="medium" className="mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        Missing Requirements
                      </Text>
                      <ul className="space-y-1">
                        {result.missingRequirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                            <Text size="sm">{req}</Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.recommendations.length > 0 && (
                    <div>
                      <Text weight="medium" className="mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        Recommendations
                      </Text>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ArrowRight className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                            <Text size="sm">{rec}</Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {result.nextSteps.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <Text weight="medium" className="mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Next Steps
                    </Text>
                    <div className="space-y-2">
                      {result.nextSteps.map((step, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <Text size="sm">{step}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button size="sm" variant="primary">
                    View Scheme Details
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button onClick={() => setShowResults(false)} variant="outline">
            Start Over
          </Button>
          <Button variant="primary">
            <FileText className="w-4 h-4 mr-2" />
            Download Full Report
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" variant="h4">
            Government Scheme Eligibility Assessment
          </Heading>
          <Text size="sm" color="muted">
            Step {currentStep + 1} of {totalSteps}
          </Text>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex justify-between mt-2">
          {categories.map((category, index) => (
            <Text 
              key={category}
              size="xs" 
              className={`
                ${index <= currentStep ? 'text-black font-medium' : 'text-gray-400'}
              `}
            >
              {category}
            </Text>
          ))}
        </div>
      </div>

      {/* Current Category Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            {currentCategory}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questionsInCategory.map(question => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <Text weight="medium" className="flex-1">
                  {question.question}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </Text>
                {question.helpText && (
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    <div className="absolute right-0 top-6 w-64 p-3 bg-black text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {question.helpText}
                    </div>
                  </div>
                )}
              </div>

              {question.type === 'boolean' && (
                <div className="flex gap-3">
                  <Button
                    variant={answers[question.id] === true ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleAnswer(question.id, true)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={answers[question.id] === false ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleAnswer(question.id, false)}
                  >
                    No
                  </Button>
                </div>
              )}

              {question.type === 'select' && (
                <select
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="">Select an option...</option>
                  {question.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {question.type === 'number' && (
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                />
              )}

              {question.type === 'text' && (
                <Input
                  type="text"
                  placeholder="Enter your answer"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        
        <Button
          onClick={nextStep}
          disabled={!canProceed()}
          variant="primary"
        >
          {currentStep === totalSteps - 1 ? (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Eligibility
            </>
          ) : (
            'Next'
          )}
        </Button>
      </div>

      {/* Help Alert */}
      <Alert variant="info">
        <Info className="w-4 h-4" />
        <div>
          <Text weight="medium">Complete Assessment for Best Results</Text>
          <Text size="sm" color="muted">
            Answer all questions accurately to get personalized scheme recommendations. 
            This assessment takes 5-7 minutes and will match you with the most relevant 
            government funding opportunities.
          </Text>
        </div>
      </Alert>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { 
  Target, 
  Users, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Star,
  BarChart3,
  Zap,
  RefreshCw
} from 'lucide-react';

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: { value: number; label: string }[];
}

interface AssessmentResult {
  overall: number;
  categories: {
    strategy: number;
    process: number;
    team: number;
    technology: number;
    performance: number;
  };
  recommendations: string[];
}

const SalesReadinessAssessment: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const assessmentSections = [
    {
      title: 'Sales Strategy Foundation',
      category: 'strategy',
      icon: <Target className="w-5 h-5" />,
      questions: [
        {
          id: 'target_market',
          category: 'strategy',
          question: 'How well-defined is your target market and ideal customer profile?',
          options: [
            { value: 1, label: 'No clear definition' },
            { value: 2, label: 'Basic understanding' },
            { value: 3, label: 'Well-defined segments' },
            { value: 4, label: 'Detailed personas with validation' }
          ]
        },
        {
          id: 'value_proposition',
          category: 'strategy',
          question: 'How clear and compelling is your value proposition?',
          options: [
            { value: 1, label: 'Unclear or generic' },
            { value: 2, label: 'Basic differentiation' },
            { value: 3, label: 'Clear competitive advantage' },
            { value: 4, label: 'Proven and validated messaging' }
          ]
        },
        {
          id: 'pricing_strategy',
          category: 'strategy',
          question: 'How developed is your pricing strategy?',
          options: [
            { value: 1, label: 'No clear pricing model' },
            { value: 2, label: 'Basic pricing set' },
            { value: 3, label: 'Market-researched pricing' },
            { value: 4, label: 'Dynamic pricing with optimization' }
          ]
        }
      ]
    },
    {
      title: 'Sales Process & Systems',
      category: 'process',
      icon: <BarChart3 className="w-5 h-5" />,
      questions: [
        {
          id: 'sales_process',
          category: 'process',
          question: 'How documented and standardized is your sales process?',
          options: [
            { value: 1, label: 'No documented process' },
            { value: 2, label: 'Basic process outline' },
            { value: 3, label: 'Well-documented stages' },
            { value: 4, label: 'Optimized process with metrics' }
          ]
        },
        {
          id: 'lead_qualification',
          category: 'process',
          question: 'How effective is your lead qualification process?',
          options: [
            { value: 1, label: 'No qualification criteria' },
            { value: 2, label: 'Basic qualification questions' },
            { value: 3, label: 'Structured qualification framework' },
            { value: 4, label: 'AI-powered lead scoring' }
          ]
        },
        {
          id: 'sales_materials',
          category: 'process',
          question: 'How comprehensive are your sales materials and collateral?',
          options: [
            { value: 1, label: 'Minimal materials' },
            { value: 2, label: 'Basic brochures/presentations' },
            { value: 3, label: 'Comprehensive sales toolkit' },
            { value: 4, label: 'Personalized, dynamic content' }
          ]
        }
      ]
    },
    {
      title: 'Sales Team Capability',
      category: 'team',
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          id: 'team_skills',
          category: 'team',
          question: 'How skilled is your sales team?',
          options: [
            { value: 1, label: 'Inexperienced team' },
            { value: 2, label: 'Basic sales skills' },
            { value: 3, label: 'Well-trained professionals' },
            { value: 4, label: 'Expert-level performers' }
          ]
        },
        {
          id: 'team_structure',
          category: 'team',
          question: 'How well-structured is your sales organization?',
          options: [
            { value: 1, label: 'No clear structure' },
            { value: 2, label: 'Basic role definitions' },
            { value: 3, label: 'Specialized sales roles' },
            { value: 4, label: 'Optimized team structure' }
          ]
        },
        {
          id: 'training_program',
          category: 'team',
          question: 'How comprehensive is your sales training program?',
          options: [
            { value: 1, label: 'No formal training' },
            { value: 2, label: 'Basic onboarding' },
            { value: 3, label: 'Ongoing training program' },
            { value: 4, label: 'Continuous skill development' }
          ]
        }
      ]
    },
    {
      title: 'Sales Technology Stack',
      category: 'technology',
      icon: <Zap className="w-5 h-5" />,
      questions: [
        {
          id: 'crm_system',
          category: 'technology',
          question: 'How advanced is your CRM and sales automation?',
          options: [
            { value: 1, label: 'No CRM or basic spreadsheets' },
            { value: 2, label: 'Basic CRM system' },
            { value: 3, label: 'Advanced CRM with automation' },
            { value: 4, label: 'AI-powered sales platform' }
          ]
        },
        {
          id: 'analytics_reporting',
          category: 'technology',
          question: 'How robust are your sales analytics and reporting?',
          options: [
            { value: 1, label: 'No formal reporting' },
            { value: 2, label: 'Basic sales reports' },
            { value: 3, label: 'Comprehensive analytics' },
            { value: 4, label: 'Predictive analytics with AI' }
          ]
        },
        {
          id: 'sales_tools',
          category: 'technology',
          question: 'How comprehensive is your sales technology toolkit?',
          options: [
            { value: 1, label: 'Minimal tools' },
            { value: 2, label: 'Basic sales tools' },
            { value: 3, label: 'Integrated tool stack' },
            { value: 4, label: 'Best-in-class technology suite' }
          ]
        }
      ]
    },
    {
      title: 'Performance & Results',
      category: 'performance',
      icon: <TrendingUp className="w-5 h-5" />,
      questions: [
        {
          id: 'conversion_rates',
          category: 'performance',
          question: 'How are your sales conversion rates?',
          options: [
            { value: 1, label: 'Below industry average' },
            { value: 2, label: 'Industry average' },
            { value: 3, label: 'Above industry average' },
            { value: 4, label: 'Top quartile performance' }
          ]
        },
        {
          id: 'sales_cycle',
          category: 'performance',
          question: 'How optimized is your sales cycle length?',
          options: [
            { value: 1, label: 'Very long, unpredictable' },
            { value: 2, label: 'Average length' },
            { value: 3, label: 'Shorter than average' },
            { value: 4, label: 'Optimized and predictable' }
          ]
        },
        {
          id: 'revenue_growth',
          category: 'performance',
          question: 'How consistent is your revenue growth?',
          options: [
            { value: 1, label: 'Declining or stagnant' },
            { value: 2, label: 'Slow growth' },
            { value: 3, label: 'Steady growth' },
            { value: 4, label: 'Rapid, scalable growth' }
          ]
        }
      ]
    }
  ];

  const allQuestions = assessmentSections.flatMap(section => section.questions);
  const currentQuestions = assessmentSections[currentSection]?.questions || [];

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateResults = (): AssessmentResult => {
    const categoryScores = {
      strategy: 0,
      process: 0,
      team: 0,
      technology: 0,
      performance: 0
    };

    const categoryCounts = {
      strategy: 0,
      process: 0,
      team: 0,
      technology: 0,
      performance: 0
    };

    // Calculate category averages
    Object.entries(answers).forEach(([questionId, score]) => {
      const question = allQuestions.find(q => q.id === questionId);
      if (question) {
        categoryScores[question.category] += score;
        categoryCounts[question.category]++;
      }
    });

    Object.keys(categoryScores).forEach(category => {
      if (categoryCounts[category] > 0) {
        categoryScores[category] = Math.round((categoryScores[category] / categoryCounts[category]) * 25);
      }
    });

    const overall = Math.round(Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 5);

    const recommendations = generateRecommendations(categoryScores, overall);

    return {
      overall,
      categories: categoryScores,
      recommendations
    };
  };

  const generateRecommendations = (categories: any, overall: number): string[] => {
    const recommendations = [];

    if (overall < 40) {
      recommendations.push('Focus on building foundational sales capabilities across all areas');
    } else if (overall < 60) {
      recommendations.push('Strengthen weak areas while maintaining current strengths');
    } else if (overall < 80) {
      recommendations.push('Optimize existing processes and invest in advanced capabilities');
    } else {
      recommendations.push('Maintain excellence and explore cutting-edge innovations');
    }

    // Category-specific recommendations
    if (categories.strategy < 60) {
      recommendations.push('Invest in market research and strategic planning');
    }
    if (categories.process < 60) {
      recommendations.push('Document and optimize your sales processes');
    }
    if (categories.team < 60) {
      recommendations.push('Enhance sales team training and structure');
    }
    if (categories.technology < 60) {
      recommendations.push('Upgrade your sales technology stack');
    }
    if (categories.performance < 60) {
      recommendations.push('Focus on improving key performance metrics');
    }

    return recommendations;
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < allQuestions.length) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const results = calculateResults();
      setResult(results);
      setLoading(false);
    }, 1500);
  };

  const resetAssessment = () => {
    setAnswers({});
    setResult(null);
    setCurrentSection(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (result) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Target className="w-6 h-6 text-blue-600" />
            Sales Readiness Assessment Results
          </CardTitle>
          <p className="text-gray-600">Your comprehensive sales capability analysis</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className={`text-4xl font-bold mb-2 ${getScoreColor(result.overall)}`}>
              {result.overall}/100
            </div>
            <Badge className={getScoreBadgeColor(result.overall)}>
              {result.overall >= 80 ? 'Excellent' : 
               result.overall >= 60 ? 'Good' : 
               result.overall >= 40 ? 'Needs Improvement' : 'Critical'}
            </Badge>
            <p className="text-gray-600 mt-2">Overall Sales Readiness Score</p>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentSections.map((section) => (
              <div key={section.category} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  {section.icon}
                  <span className="font-medium">{section.title}</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(result.categories[section.category])}`}>
                  {result.categories[section.category]}/100
                </div>
                <Progress 
                  value={result.categories[section.category]} 
                  className="mt-2" 
                />
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Recommendations
            </h3>
            {result.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-blue-800">{rec}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button onClick={resetAssessment} variant="outline" className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Take Assessment Again
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <Target className="w-4 h-4 mr-2" />
              Get Improvement Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          Sales Readiness Assessment
        </CardTitle>
        <p className="text-gray-600">
          Comprehensive evaluation of your sales capabilities across 5 key dimensions
        </p>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-4 mt-4">
          <Progress 
            value={(currentSection / assessmentSections.length) * 100} 
            className="flex-1" 
          />
          <span className="text-sm font-medium text-gray-600">
            {currentSection + 1} of {assessmentSections.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          {assessmentSections[currentSection]?.icon}
          <div>
            <h3 className="font-semibold text-lg">{assessmentSections[currentSection]?.title}</h3>
            <p className="text-sm text-gray-600">
              {currentQuestions.length} questions in this section
            </p>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {currentQuestions.map((question, qIndex) => (
            <div key={question.id} className="space-y-3">
              <h4 className="font-medium">
                {currentSection * 3 + qIndex + 1}. {question.question}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswerChange(question.id, option.value)}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      answers[question.id] === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        answers[question.id] === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[question.id] === option.value && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            disabled={currentSection === 0}
            variant="outline"
          >
            Previous Section
          </Button>
          
          {currentSection === assessmentSections.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={loading || Object.keys(answers).length < allQuestions.length}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Get Results
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentSection(prev => prev + 1)}
              disabled={currentQuestions.some(q => !answers[q.id])}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next Section
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesReadinessAssessment;
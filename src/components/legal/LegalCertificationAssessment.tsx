'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, XCircle, Clock, Award, BookOpen, FileText, Users, Scale, AlertTriangle, Star } from 'lucide-react';

interface Question {
  id: string;
  module: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  category: 'Foundation' | 'Contract Law' | 'IP Protection' | 'Employment Law' | 'Dispute Resolution' | 'Compliance';
}

interface AssessmentResult {
  score: number;
  totalPoints: number;
  percentage: number;
  grade: string;
  certificationLevel: string;
  strengths: string[];
  improvements: string[];
  recommendations: string[];
}

interface CertificationLevel {
  name: string;
  minScore: number;
  description: string;
  badge: string;
  benefits: string[];
  icon: React.ReactNode;
}

const CERTIFICATION_LEVELS: CertificationLevel[] = [
  {
    name: 'Legal Foundation Certificate',
    minScore: 75,
    description: 'Basic business law knowledge and contract review capabilities',
    badge: 'Foundation',
    benefits: [
      'Basic legal risk assessment proficiency',
      'Contract review and analysis capabilities',
      'Legal compliance awareness',
      'Entry-level legal knowledge certification'
    ],
    icon: <BookOpen className="w-6 h-6" />
  },
  {
    name: 'Legal Strategy Certificate',
    minScore: 80,
    description: 'Advanced contract drafting, IP protection, and compliance system design',
    badge: 'Strategy',
    benefits: [
      'Advanced contract drafting and negotiation',
      'IP protection strategy development',
      'Compliance system design and implementation',
      'Legal advisory capabilities'
    ],
    icon: <Scale className="w-6 h-6" />
  },
  {
    name: 'Legal Expert Certificate',
    minScore: 85,
    description: 'Crisis management, complex problem solving, and legal consultation skills',
    badge: 'Expert',
    benefits: [
      'Crisis management and emergency response',
      'Complex legal problem solving',
      'Legal advisory and consultation skills',
      'Expert-level legal knowledge'
    ],
    icon: <Award className="w-6 h-6" />
  },
  {
    name: 'Legal Master Certificate',
    minScore: 90,
    description: 'Legal training capabilities, expert witness qualifications, and consulting authorization',
    badge: 'Master',
    benefits: [
      'Legal training and education capabilities',
      'Expert witness and advisory qualifications',
      'Legal consulting practice authorization',
      'Master-level legal expertise recognition'
    ],
    icon: <Star className="w-6 h-6" />
  }
];

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    module: 'Legal Foundations',
    question: 'What is the primary legal risk that causes 35% of startup failures according to the course?',
    options: ['Employment disputes', 'Founder disputes', 'Customer lawsuits', 'Tax penalties'],
    correctAnswer: 1,
    explanation: 'Founder disputes are the #1 cause of startup failures, accounting for 35% of all legal incidents. This is why comprehensive founders agreements with proper vesting schedules are crucial.',
    difficulty: 'Easy',
    points: 10,
    category: 'Foundation'
  },
  {
    id: 'q2',
    module: 'Contract Law',
    question: 'Under the Indian Contract Act, which of the following is NOT an essential element of a valid contract?',
    options: ['Offer and acceptance', 'Consideration', 'Notarization', 'Free consent'],
    correctAnswer: 2,
    explanation: 'Notarization is not an essential element of a valid contract under the Indian Contract Act. The essential elements are: offer and acceptance, consideration, capacity, free consent, lawful object, and not expressly void.',
    difficulty: 'Medium',
    points: 15,
    category: 'Contract Law'
  },
  {
    id: 'q3',
    module: 'IP Protection',
    question: 'What is the duration of trademark protection in India once registered?',
    options: ['5 years', '7 years', '10 years', '20 years'],
    correctAnswer: 2,
    explanation: 'Trademark protection in India lasts for 10 years from the date of registration and can be renewed indefinitely for successive periods of 10 years each.',
    difficulty: 'Easy',
    points: 10,
    category: 'IP Protection'
  },
  {
    id: 'q4',
    module: 'Employment Law',
    question: 'Under the Sexual Harassment of Women at Workplace Act (POSH), what is the minimum number of employees required to constitute an Internal Complaints Committee?',
    options: ['5 employees', '10 employees', '15 employees', '20 employees'],
    correctAnswer: 1,
    explanation: 'Organizations with 10 or more employees must constitute an Internal Complaints Committee (ICC) under the POSH Act. Organizations with less than 10 employees can approach the Local Complaints Committee.',
    difficulty: 'Medium',
    points: 15,
    category: 'Employment Law'
  },
  {
    id: 'q5',
    module: 'Contract Negotiation',
    question: 'In contract negotiation, what does BATNA stand for?',
    options: ['Best Alternative To Negotiated Agreement', 'Basic Agreement Terms and Negotiation Analysis', 'Bilateral Agreement Terms and Negotiation Approach', 'Best Approach To Negotiation Analysis'],
    correctAnswer: 0,
    explanation: 'BATNA stands for Best Alternative To Negotiated Agreement. It represents what you will do if you cannot reach an agreement with the other party and is crucial for effective negotiation.',
    difficulty: 'Hard',
    points: 20,
    category: 'Contract Law'
  },
  {
    id: 'q6',
    module: 'Dispute Resolution',
    question: 'Which of the following is typically the fastest and most cost-effective dispute resolution method?',
    options: ['Litigation', 'Arbitration', 'Mediation', 'Conciliation'],
    correctAnswer: 2,
    explanation: 'Mediation is typically the fastest and most cost-effective dispute resolution method as it involves a neutral third party helping parties reach a mutually acceptable solution without binding decisions.',
    difficulty: 'Easy',
    points: 10,
    category: 'Dispute Resolution'
  },
  {
    id: 'q7',
    module: 'Corporate Governance',
    question: 'According to the Companies Act 2013, how often must a private limited company hold board meetings?',
    options: ['Monthly', 'Quarterly', 'Bi-annually', 'Annually'],
    correctAnswer: 1,
    explanation: 'Private limited companies must hold board meetings at least once every quarter (every three months) according to the Companies Act 2013.',
    difficulty: 'Medium',
    points: 15,
    category: 'Compliance'
  },
  {
    id: 'q8',
    module: 'Data Protection',
    question: 'What is the maximum penalty under the proposed Indian Data Protection Bill for data breaches?',
    options: ['₹5 crore or 2% of turnover', '₹15 crore or 4% of turnover', '₹500 crore or 4% of turnover', '₹1000 crore or 10% of turnover'],
    correctAnswer: 2,
    explanation: 'The proposed Indian Data Protection Bill provides for penalties of up to ₹500 crore or 4% of worldwide turnover, whichever is higher, for serious data protection violations.',
    difficulty: 'Hard',
    points: 20,
    category: 'Compliance'
  },
  {
    id: 'q9',
    module: 'Crisis Management',
    question: 'What is the first step in legal crisis management when facing a regulatory investigation?',
    options: ['Issue public statement', 'Contact media', 'Activate legal response team', 'Pay penalty immediately'],
    correctAnswer: 2,
    explanation: 'The first step in legal crisis management during regulatory investigation is to immediately activate your legal response team and follow established crisis protocols before taking any external actions.',
    difficulty: 'Medium',
    points: 15,
    category: 'Foundation'
  },
  {
    id: 'q10',
    module: 'Legal Technology',
    question: 'What is the primary benefit of implementing AI-powered contract analysis tools?',
    options: ['Eliminating lawyers completely', 'Reducing contract review time by 70%+', 'Making all contracts identical', 'Avoiding all legal risks'],
    correctAnswer: 1,
    explanation: 'AI-powered contract analysis tools primarily benefit businesses by reducing contract review time by 70% or more while identifying risks, suggesting improvements, and ensuring consistency.',
    difficulty: 'Easy',
    points: 10,
    category: 'Foundation'
  }
];

const LegalCertificationAssessment: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(3600); // 60 minutes
  const [assessmentStarted, setAssessmentStarted] = useState<boolean>(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    if (assessmentStarted && !assessmentCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setAssessmentCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [assessmentStarted, assessmentCompleted, timeRemaining]);

  const startAssessment = () => {
    setAssessmentStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeRemaining(3600);
  };

  const selectAnswer = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const submitAssessment = () => {
    setAssessmentCompleted(true);
    calculateResults();
  };

  const calculateResults = () => {
    let totalScore = 0;
    let totalPoints = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {};

    SAMPLE_QUESTIONS.forEach(question => {
      totalPoints += question.points;
      
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;

      if (selectedAnswers[question.id] === question.correctAnswer) {
        totalScore += question.points;
        categoryScores[question.category].correct++;
      }
    });

    const percentage = (totalScore / totalPoints) * 100;
    
    // Determine grade and certification level
    let grade = 'F';
    let certificationLevel = 'None';
    
    if (percentage >= 90) {
      grade = 'A+';
      certificationLevel = 'Legal Master Certificate';
    } else if (percentage >= 85) {
      grade = 'A';
      certificationLevel = 'Legal Expert Certificate';
    } else if (percentage >= 80) {
      grade = 'B+';
      certificationLevel = 'Legal Strategy Certificate';
    } else if (percentage >= 75) {
      grade = 'B';
      certificationLevel = 'Legal Foundation Certificate';
    } else if (percentage >= 60) {
      grade = 'C';
      certificationLevel = 'Participation Certificate';
    }

    // Identify strengths and improvements
    const strengths: string[] = [];
    const improvements: string[] = [];
    
    Object.entries(categoryScores).forEach(([category, scores]) => {
      const categoryPercentage = (scores.correct / scores.total) * 100;
      if (categoryPercentage >= 80) {
        strengths.push(category);
      } else if (categoryPercentage < 60) {
        improvements.push(category);
      }
    });

    // Generate recommendations
    const recommendations: string[] = [];
    if (percentage < 75) {
      recommendations.push('Review fundamental legal concepts and retake the assessment');
      recommendations.push('Focus on weak areas identified in the detailed analysis');
      recommendations.push('Complete additional practice exercises in P5 Legal Stack modules');
    }
    if (improvements.includes('Contract Law')) {
      recommendations.push('Spend more time on contract drafting and negotiation modules');
    }
    if (improvements.includes('Employment Law')) {
      recommendations.push('Review employment law compliance requirements and POSH Act provisions');
    }
    if (improvements.includes('IP Protection')) {
      recommendations.push('Study intellectual property protection strategies and filing procedures');
    }

    const result: AssessmentResult = {
      score: totalScore,
      totalPoints,
      percentage: Math.round(percentage),
      grade,
      certificationLevel,
      strengths,
      improvements,
      recommendations
    };

    setAssessmentResult(result);
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCertificationLevel = (levelName: string) => {
    return CERTIFICATION_LEVELS.find(level => level.name === levelName);
  };

  // Pre-assessment screen
  if (!assessmentStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-mono">P5 Legal Stack Certification Assessment</h1>
          <p className="text-xl text-gray-600">Demonstrate your legal knowledge and earn professional certification</p>
          <p className="text-lg text-blue-600 font-semibold">Recognized by Bar Council & Industry Leaders</p>
        </div>

        {/* Assessment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="font-mono">Assessment Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Duration:</span> 60 minutes
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Questions:</span> {SAMPLE_QUESTIONS.length} questions
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Total Points:</span> {SAMPLE_QUESTIONS.reduce((sum, q) => sum + q.points, 0)} points
                </div>
                <div className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">Passing Score:</span> 75% minimum
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Question Categories:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Legal Foundations & Risk Management</li>
                  <li>• Contract Law & Negotiation</li>
                  <li>• Intellectual Property Protection</li>
                  <li>• Employment Law & HR Compliance</li>
                  <li>• Dispute Resolution & Litigation</li>
                  <li>• Regulatory Compliance & Data Protection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certification Levels */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-mono text-center">Certification Levels</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CERTIFICATION_LEVELS.map((level, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {level.icon}
                    {level.name}
                  </CardTitle>
                  <Badge className="w-fit bg-blue-100 text-blue-800">
                    {level.minScore}%+ Required
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                  <div className="space-y-1">
                    {level.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Start Assessment */}
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Important Instructions</h3>
            <ul className="text-sm text-yellow-800 space-y-1 text-left max-w-2xl mx-auto">
              <li>• You have 60 minutes to complete the assessment</li>
              <li>• Each question has only one correct answer</li>
              <li>• You can navigate between questions during the assessment</li>
              <li>• Assessment will auto-submit when time expires</li>
              <li>• Minimum 75% score required for certification</li>
              <li>• You can retake the assessment after 7 days if needed</li>
            </ul>
          </div>
          
          <Button onClick={startAssessment} className="px-8 py-3 text-lg">
            <Award className="w-5 h-5 mr-2" />
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults && assessmentResult) {
    const certLevel = getCertificationLevel(assessmentResult.certificationLevel);
    
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-mono">Assessment Results</h1>
          <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${
            assessmentResult.percentage >= 75 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {assessmentResult.percentage >= 75 ? (
              <CheckCircle className="w-8 h-8" />
            ) : (
              <XCircle className="w-8 h-8" />
            )}
            <div className="text-left">
              <div className="text-2xl font-bold">Grade: {assessmentResult.grade}</div>
              <div className="text-lg">{assessmentResult.score}/{assessmentResult.totalPoints} points ({assessmentResult.percentage}%)</div>
            </div>
          </div>
        </div>

        {/* Certification */}
        {certLevel && assessmentResult.percentage >= 75 && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                {certLevel.icon}
                Congratulations! You've earned:
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-3xl font-bold text-blue-600">{certLevel.name}</div>
              <p className="text-lg text-gray-600">{certLevel.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold mb-2">Certification Benefits:</h4>
                  <ul className="space-y-1 text-sm text-left">
                    {certLevel.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Recognition:</h4>
                  <ul className="space-y-1 text-sm text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Bar Council approved certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>LinkedIn profile credential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Digital certificate with verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Corporate legal competency recognition</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button className="mt-4">
                <Award className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Performance Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              {assessmentResult.strengths.length > 0 ? (
                <div className="space-y-2">
                  {assessmentResult.strengths.map((strength, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-700">{strength}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Focus on building foundational knowledge across all areas.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-mono">Areas for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              {assessmentResult.improvements.length > 0 ? (
                <div className="space-y-2">
                  {assessmentResult.improvements.map((improvement, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-orange-700">{improvement}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Excellent performance across all categories!</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="font-mono">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessmentResult.recommendations.map((recommendation, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <span>{recommendation}</span>
                </div>
              ))}
              {assessmentResult.percentage >= 90 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Master Level Achievement</h4>
                  <p className="text-blue-800">
                    You've demonstrated exceptional legal knowledge! Consider advanced specialization tracks or 
                    mentoring other learners in the P5 Legal Stack community.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={() => {
            setAssessmentStarted(false);
            setAssessmentCompleted(false);
            setShowResults(false);
            setCurrentQuestion(0);
            setSelectedAnswers({});
            setTimeRemaining(3600);
          }} variant="outline">
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  // Assessment in progress
  const currentQ = SAMPLE_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-mono">Legal Certification Assessment</h1>
          <p className="text-gray-600">Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-red-600">
            {formatTime(timeRemaining)}
          </div>
          <p className="text-sm text-gray-600">Time Remaining</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress: {Math.round(progress)}%</span>
          <span>Answered: {answeredCount}/{SAMPLE_QUESTIONS.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{currentQ.module}</Badge>
                <Badge className={`${
                  currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentQ.difficulty}
                </Badge>
                <Badge className="bg-blue-100 text-blue-800">{currentQ.points} points</Badge>
              </div>
              <CardTitle className="text-xl leading-relaxed">{currentQ.question}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(currentQ.id, index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQ.id] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQ.id] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQ.id] === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                    )}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Show explanation after answering */}
          {selectedAnswers[currentQ.id] !== undefined && showExplanation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
              <p className="text-blue-800">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {selectedAnswers[currentQ.id] !== undefined && !showExplanation && (
                <Button
                  onClick={() => setShowExplanation(true)}
                  variant="outline"
                >
                  Show Explanation
                </Button>
              )}

              {currentQuestion === SAMPLE_QUESTIONS.length - 1 ? (
                <Button
                  onClick={submitAssessment}
                  disabled={answeredCount < SAMPLE_QUESTIONS.length}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Assessment
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswers[currentQ.id] === undefined}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-mono">Question Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {SAMPLE_QUESTIONS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setShowExplanation(false);
                }}
                className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[SAMPLE_QUESTIONS[index].id] !== undefined
                    ? 'bg-green-200 text-green-800 hover:bg-green-300'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-200 rounded"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalCertificationAssessment;
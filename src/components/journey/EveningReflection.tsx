'use client';

import React, { useState } from 'react';
import { logger } from '@/lib/logger';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { Text } from '@/components/ui/Typography';
import { Heading } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Moon, 
  Star, 
  Lightbulb, 
  Target, 
  TrendingUp,
  Heart,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface EveningReflectionProps {
  day: number;
  reflectionQuestions: string[];
  onSave?: (reflection: ReflectionData) => void;
  onComplete?: () => void;
  className?: string;
}

interface ReflectionData {
  keyLearnings: string;
  biggestChallenge: string;
  tomorrowFocus: string;
  satisfactionRating: number;
  notes: string;
}

export function EveningReflection({
  day,
  reflectionQuestions = [],
  onSave,
  onComplete,
  className = ""
}: EveningReflectionProps) {
  const [reflection, setReflection] = useState<ReflectionData>({
    keyLearnings: '',
    biggestChallenge: '',
    tomorrowFocus: '',
    satisfactionRating: 0,
    notes: ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const defaultQuestions = [
    "What were your biggest learnings today?",
    "What challenge did you overcome or work on?",
    "What will you focus on tomorrow?",
    "How satisfied are you with today's progress? (1-5)",
    "Any additional thoughts or ideas?"
  ];

  const questions = reflectionQuestions.length > 0 ? reflectionQuestions : defaultQuestions;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave?.(reflection);
      setIsCompleted(true);
      
      // Auto-complete after a delay
      setTimeout(() => {
        onComplete?.();
      }, 1500);
    } catch (error) {
      logger.error('Failed to save reflection:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid = () => {
    return reflection.keyLearnings.trim() && 
           reflection.biggestChallenge.trim() && 
           reflection.satisfactionRating > 0;
  };

  if (isCompleted) {
    return (
      <Card className={`border-green-200 bg-green-50 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <Heading as="h3" variant="h4" className="mb-2 text-green-800">
            Day {day} Complete! 🎉
          </Heading>
          <Text color="muted" className="mb-4">
            Your reflection has been saved. Great work today!
          </Text>
          <div className="flex items-center justify-center gap-2 text-sm text-green-700">
            <Sparkles className="w-4 h-4" />
            <span>+25 XP Bonus for completing reflection</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-purple-200 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-600" />
            </div>
            Evening Reflection
          </CardTitle>
          <Badge variant="outline" className="border-purple-300 text-purple-700">
            +25 XP
          </Badge>
        </div>
        <Text color="muted" className="mt-2">
          Take a moment to reflect on your progress and learnings from Day {day}
        </Text>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Key Learnings */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              What were your biggest learnings today?
            </label>
            <textarea
              value={reflection.keyLearnings}
              onChange={(e) => setReflection({ ...reflection, keyLearnings: e.target.value })}
              placeholder="Share the key insights, discoveries, or knowledge you gained..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
            />
          </div>

          {/* Biggest Challenge */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Target className="w-4 h-4 text-orange-500" />
              What challenge did you work on today?
            </label>
            <textarea
              value={reflection.biggestChallenge}
              onChange={(e) => setReflection({ ...reflection, biggestChallenge: e.target.value })}
              placeholder="Describe a challenge you faced and how you approached it..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={3}
            />
          </div>

          {/* Tomorrow's Focus */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              What will you focus on tomorrow?
            </label>
            <textarea
              value={reflection.tomorrowFocus}
              onChange={(e) => setReflection({ ...reflection, tomorrowFocus: e.target.value })}
              placeholder="Set your intention and priorities for the next day..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={2}
            />
          </div>

          {/* Satisfaction Rating */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Heart className="w-4 h-4 text-red-500" />
              How satisfied are you with today's progress?
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setReflection({ ...reflection, satisfactionRating: rating })}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                    reflection.satisfactionRating >= rating
                      ? 'bg-yellow-400 border-yellow-400 text-white'
                      : 'border-gray-300 hover:border-yellow-400'
                  }`}
                >
                  <Star className={`w-5 h-5 ${reflection.satisfactionRating >= rating ? 'fill-current' : ''}`} />
                </button>
              ))}
            </div>
            <Text size="sm" color="muted" className="mt-2">
              {reflection.satisfactionRating > 0 && (
                <>
                  {reflection.satisfactionRating === 1 && "Every journey has tough days - tomorrow is a new opportunity!"}
                  {reflection.satisfactionRating === 2 && "Making progress step by step. Keep going!"}
                  {reflection.satisfactionRating === 3 && "Solid progress! You're building momentum."}
                  {reflection.satisfactionRating === 4 && "Great work today! You're making excellent progress."}
                  {reflection.satisfactionRating === 5 && "Outstanding! You're crushing this journey! 🚀"}
                </>
              )}
            </Text>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-3">
              <Star className="w-4 h-4 text-purple-500" />
              Additional thoughts or ideas (optional)
            </label>
            <textarea
              value={reflection.notes}
              onChange={(e) => setReflection({ ...reflection, notes: e.target.value })}
              placeholder="Any other thoughts, ideas, or insights you want to capture..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              rows={2}
            />
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleSave}
              isLoading={isSaving}
              disabled={!isFormValid()}
            >
              {isSaving ? 'Saving Reflection...' : 'Complete Day ' + day}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            {!isFormValid() && (
              <Text size="sm" color="muted" className="text-center mt-2">
                Please fill in your key learnings, challenge, and satisfaction rating to continue
              </Text>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
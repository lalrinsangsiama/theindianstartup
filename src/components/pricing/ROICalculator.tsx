'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Text } from '@/components/ui/Typography';
import {
  Calculator,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Sparkles,
  DollarSign,
  Users,
  Building,
  Target
} from 'lucide-react';
import Link from 'next/link';

// Course data with value estimates
const COURSE_DATA: Record<string, { price: number; value: number; category: string; title: string }> = {
  P1: { price: 4999, value: 15000, category: 'Foundation', title: '30-Day Launch Sprint' },
  P2: { price: 4999, value: 18000, category: 'Foundation', title: 'Incorporation & Compliance' },
  P3: { price: 5999, value: 50000, category: 'Funding', title: 'Funding Mastery' },
  P4: { price: 6999, value: 40000, category: 'Finance', title: 'Finance Stack' },
  P5: { price: 7999, value: 150000, category: 'Legal', title: 'Legal Stack' },
  P6: { price: 6999, value: 30000, category: 'Growth', title: 'Sales & GTM' },
  P7: { price: 4999, value: 500000, category: 'Government', title: 'State Schemes' },
  P8: { price: 9999, value: 100000, category: 'Growth', title: 'Data Room' },
  P9: { price: 4999, value: 500000, category: 'Government', title: 'Govt Schemes' },
  P10: { price: 7999, value: 75000, category: 'Legal', title: 'Patent Mastery' },
  P11: { price: 7999, value: 50000, category: 'Marketing', title: 'Branding & PR' },
  P12: { price: 9999, value: 80000, category: 'Marketing', title: 'Marketing Mastery' },
  P13: { price: 7999, value: 100000, category: 'Sector', title: 'Food Processing' },
  P14: { price: 8999, value: 250000, category: 'Sector', title: 'Impact & CSR' },
  P15: { price: 9999, value: 200000, category: 'Sector', title: 'Carbon Credits' },
  P16: { price: 5999, value: 25000, category: 'Core', title: 'HR & Team' },
  P17: { price: 6999, value: 35000, category: 'Core', title: 'Product Development' },
  P18: { price: 5999, value: 30000, category: 'Core', title: 'Operations' },
  P19: { price: 6999, value: 40000, category: 'Core', title: 'Tech Stack' },
  P20: { price: 8999, value: 150000, category: 'High-Growth', title: 'FinTech' },
  P21: { price: 8999, value: 200000, category: 'High-Growth', title: 'HealthTech' },
  P22: { price: 7999, value: 60000, category: 'High-Growth', title: 'E-commerce' },
  P23: { price: 8999, value: 300000, category: 'High-Growth', title: 'EV & Mobility' },
  P24: { price: 8999, value: 250000, category: 'High-Growth', title: 'Manufacturing' },
  P25: { price: 6999, value: 45000, category: 'Emerging', title: 'EdTech' },
  P26: { price: 6999, value: 80000, category: 'Emerging', title: 'AgriTech' },
  P27: { price: 7999, value: 100000, category: 'Emerging', title: 'PropTech' },
  P28: { price: 9999, value: 300000, category: 'Emerging', title: 'Biotech' },
  P29: { price: 7999, value: 75000, category: 'Advanced', title: 'SaaS' },
  P30: { price: 9999, value: 200000, category: 'Advanced', title: 'International' }
};

const ALL_ACCESS_PRICE = 149999;
const ALL_ACCESS_VALUE = Object.values(COURSE_DATA).reduce((sum, c) => sum + c.value, 0);

interface ROICalculatorProps {
  className?: string;
}

export function ROICalculator({ className = '' }: ROICalculatorProps) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleCourse = (code: string) => {
    setSelectedCourses(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const selectAllCourses = () => {
    setSelectedCourses(Object.keys(COURSE_DATA));
  };

  const clearSelection = () => {
    setSelectedCourses([]);
  };

  const calculations = useMemo(() => {
    if (selectedCourses.length === 0) {
      return {
        totalInvestment: 0,
        totalValue: 0,
        savings: 0,
        roi: 0,
        consultantCost: 0,
        shouldConsiderAllAccess: false,
        allAccessSavings: 0
      };
    }

    const totalInvestment = selectedCourses.reduce(
      (sum, code) => sum + (COURSE_DATA[code]?.price || 0),
      0
    );

    const totalValue = selectedCourses.reduce(
      (sum, code) => sum + (COURSE_DATA[code]?.value || 0),
      0
    );

    const consultantCost = totalValue * 2; // Consultant would charge ~2x the value
    const roi = totalInvestment > 0 ? Math.round(totalValue / totalInvestment) : 0;
    const savings = totalValue - totalInvestment;

    // Suggest All-Access if individual total > 60% of All-Access price
    const shouldConsiderAllAccess = totalInvestment > ALL_ACCESS_PRICE * 0.6 && selectedCourses.length < 30;
    const allAccessSavings = totalInvestment - ALL_ACCESS_PRICE;

    return {
      totalInvestment,
      totalValue,
      savings,
      roi,
      consultantCost,
      shouldConsiderAllAccess,
      allAccessSavings
    };
  }, [selectedCourses]);

  // Group courses by category for display
  const coursesByCategory = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    Object.entries(COURSE_DATA).forEach(([code, data]) => {
      if (!grouped[data.category]) {
        grouped[data.category] = [];
      }
      grouped[data.category].push(code);
    });
    return grouped;
  }, []);

  const displayedCategories = showAllCourses
    ? Object.keys(coursesByCategory)
    : Object.keys(coursesByCategory).slice(0, 3);

  return (
    <Card className={`border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            ROI Calculator
          </CardTitle>
          <Badge className="bg-blue-600 text-white">Interactive</Badge>
        </div>
        <Text size="sm" color="muted">
          Select courses to see your potential return on investment
        </Text>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={selectAllCourses}
            className="text-xs"
          >
            Select All (30)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearSelection}
            className="text-xs"
          >
            Clear
          </Button>
        </div>

        {/* Course Selection */}
        <div className="space-y-4">
          {displayedCategories.map(category => (
            <div key={category}>
              <Text size="sm" weight="medium" className="mb-2 text-gray-700">
                {category}
              </Text>
              <div className="flex flex-wrap gap-2">
                {coursesByCategory[category].map(code => {
                  const course = COURSE_DATA[code];
                  const isSelected = selectedCourses.includes(code);
                  return (
                    <button
                      key={code}
                      onClick={() => toggleCourse(code)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {code}: {course.title}
                      {isSelected && <CheckCircle className="w-3 h-3 ml-1 inline" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!showAllCourses && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllCourses(true)}
              className="w-full text-blue-600"
            >
              Show All Categories
            </Button>
          )}
        </div>

        {/* Results */}
        {selectedCourses.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-blue-200">
            <div className="text-center">
              <Text size="sm" color="muted" className="mb-1">
                {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected
              </Text>
            </div>

            {/* Main Results Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-lg text-center">
                <Text size="xs" color="muted">Your Investment</Text>
                <Text className="text-xl font-bold text-gray-900">
                  ₹{calculations.totalInvestment.toLocaleString('en-IN')}
                </Text>
              </div>
              <div className="p-3 bg-white rounded-lg text-center">
                <Text size="xs" color="muted">Value Delivered</Text>
                <Text className="text-xl font-bold text-green-700">
                  ₹{calculations.totalValue.toLocaleString('en-IN')}
                </Text>
              </div>
            </div>

            {/* ROI Badge */}
            <div className="flex justify-center">
              <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                {calculations.roi}x ROI
              </Badge>
            </div>

            {/* Comparison Cards */}
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <Text size="sm">You Save</Text>
                </div>
                <Text weight="bold" className="text-green-700">
                  ₹{calculations.savings.toLocaleString('en-IN')}
                </Text>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-500" />
                  <Text size="sm">Consultant Cost</Text>
                </div>
                <Text weight="bold" className="text-red-500 line-through">
                  ₹{calculations.consultantCost.toLocaleString('en-IN')}
                </Text>
              </div>
            </div>

            {/* All-Access Suggestion */}
            {calculations.shouldConsiderAllAccess && (
              <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg border border-purple-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <Text weight="bold" className="text-purple-800">
                      Consider All-Access Bundle!
                    </Text>
                    <Text size="sm" className="text-purple-600 mt-1">
                      Get all 30 courses for ₹1,49,999 and save
                      {calculations.allAccessSavings > 0
                        ? ` ₹${calculations.allAccessSavings.toLocaleString('en-IN')} more!`
                        : ' even more with additional courses!'}
                    </Text>
                    <Link href="/pricing#all-access">
                      <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700 text-white">
                        View All-Access
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <Link href={`/checkout?products=${selectedCourses.join(',')}`}>
              <Button variant="primary" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                Get Selected Courses - ₹{calculations.totalInvestment.toLocaleString('en-IN')}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Empty State */}
        {selectedCourses.length === 0 && (
          <div className="text-center py-6">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <Text color="muted">
              Select courses above to calculate your ROI
            </Text>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ROICalculator;

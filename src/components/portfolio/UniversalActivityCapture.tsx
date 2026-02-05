'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, 
  CheckCircle, 
  Upload, 
  FileText, 
  Calendar,
  Target,
  TrendingUp,
  AlertCircle,
  BookOpen,
  Award,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ActivityCaptureProps {
  activityTypeId: string;
  courseCode: string;
  moduleId?: string;
  lessonId?: string;
  title?: string;
  description?: string;
  showProgress?: boolean;
  autoSave?: boolean;
  onComplete?: (data: any) => void;
}

interface ActivityType {
  id: string;
  name: string;
  category: string;
  portfolioSection: string;
  portfolioField: string;
  dataSchema: any;
  description: string;
}

interface ActivityData {
  id?: string;
  activityTypeId: string;
  userId: string;
  data: any;
  isCompleted: boolean;
  completedAt?: string;
  metadata: any;
}

const UniversalActivityCapture: React.FC<ActivityCaptureProps> = ({
  activityTypeId,
  courseCode,
  moduleId,
  lessonId,
  title,
  description,
  showProgress = true,
  autoSave = true,
  onComplete
}) => {
  const { user } = useAuth();
  const [activityType, setActivityType] = useState<ActivityType | null>(null);
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const fetchActivityType = useCallback(async () => {
    try {
      const response = await fetch(`/api/portfolio/activities/${activityTypeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activity type');
      }
      const data = await response.json();
      setActivityType(data.activityType);
    } catch (err: any) {
      setError(err.message);
    }
  }, [activityTypeId]);

  const fetchExistingData = useCallback(async () => {
    try {
      const response = await fetch(`/api/portfolio/activities?activityTypeId=${activityTypeId}`);
      if (response.ok) {
        const data = await response.json();
        const existingActivity = data.activities?.[0];
        if (existingActivity) {
          setActivityData(existingActivity);
          setFormData(existingActivity.data || {});
          setIsCompleted(existingActivity.isCompleted || false);
        }
      }
    } catch (err: any) {
      logger.error('Error fetching existing data:', err);
    } finally {
      setLoading(false);
    }
  }, [activityTypeId]);

  useEffect(() => {
    if (user && activityTypeId) {
      fetchActivityType();
      fetchExistingData();
    }
  }, [user, activityTypeId, fetchActivityType, fetchExistingData]);

  const validateData = (data: any, schema: any): string[] => {
    const errors: string[] = [];
    
    if (!schema?.properties) return errors;

    Object.keys(schema.properties).forEach(key => {
      const property = schema.properties[key];
      const value = data[key];

      if (property.required && (!value || (Array.isArray(value) && value.length === 0))) {
        errors.push(`${key.replace(/_/g, ' ')} is required`);
      }

      if (property.type === 'number' && value && isNaN(Number(value))) {
        errors.push(`${key.replace(/_/g, ' ')} must be a valid number`);
      }

      if (property.type === 'array' && value && !Array.isArray(value)) {
        errors.push(`${key.replace(/_/g, ' ')} must be a list`);
      }

      if (property.format === 'date' && value && isNaN(Date.parse(value))) {
        errors.push(`${key.replace(/_/g, ' ')} must be a valid date`);
      }
    });

    return errors;
  };

  const saveData = async (completed = false) => {
    if (!user || !activityType) return;

    setSaving(true);
    setError('');

    try {
      const errors = validateData(formData, activityType.dataSchema);
      setValidationErrors(errors);

      if (completed && errors.length > 0) {
        throw new Error('Please fix validation errors before completing');
      }

      const payload = {
        activityTypeId,
        data: formData,
        isCompleted: completed,
        metadata: {
          courseCode,
          moduleId,
          lessonId,
          completedAt: completed ? new Date().toISOString() : undefined,
          version: '1.0'
        }
      };

      const method = activityData?.id ? 'PUT' : 'POST';
      const url = activityData?.id 
        ? `/api/portfolio/activities/${activityData.id}`
        : '/api/portfolio/activities';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save activity');
      }

      const savedActivity = await response.json();
      setActivityData(savedActivity.activity);
      setIsCompleted(completed);

      if (completed) {
        // Award XP for completing activity
        try {
          await fetch('/api/xp/award', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              eventType: 'portfolio_activity_completed',
              eventId: activityTypeId,
              xpAmount: 25,
              metadata: {
                activityType: activityType.name,
                courseCode
              }
            })
          });
        } catch (xpError) {
          console.error('Error awarding XP:', xpError);
        }

        onComplete?.(savedActivity.activity);
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);

    // Auto-save if enabled
    if (autoSave && !saving) {
      const timeout = setTimeout(() => {
        saveData(false);
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  };

  const renderFormField = (key: string, property: any) => {
    const value = formData[key];
    const hasError = validationErrors.some(error => error.includes(key.replace(/_/g, ' ')));

    switch (property.type) {
      case 'string':
        if (property.enum) {
          return (
            <select
              value={value || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                hasError ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select option</option>
              {property.enum.map((option: string) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          );
        } else if (property.format === 'date') {
          return (
            <input
              type="date"
              value={value || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                hasError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          );
        } else {
          return (
            <textarea
              value={value || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                hasError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={`Enter ${key.replace(/_/g, ' ')}`}
            />
          );
        }

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleInputChange(key, parseFloat(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${key.replace(/_/g, ' ')}`}
          />
        );

      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleInputChange(key, e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-700">
              {key.replace(/_/g, ' ')}
            </label>
          </div>
        );

      case 'array':
        return (
          <div className="space-y-2">
            {(value || []).map((item: any, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={typeof item === 'string' ? item : JSON.stringify(item)}
                  onChange={(e) => {
                    const newArray = [...(value || [])];
                    newArray[index] = e.target.value;
                    handleInputChange(key, newArray);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    const newArray = (value || []).filter((_: any, i: number) => i !== index);
                    handleInputChange(key, newArray);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newArray = [...(value || []), ''];
                handleInputChange(key, newArray);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add item
            </button>
          </div>
        );

      case 'object':
        return (
          <textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value || ''}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleInputChange(key, parsed);
              } catch {
                handleInputChange(key, e.target.value);
              }
            }}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter JSON object"
          />
        );

      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(key, e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              hasError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${key.replace(/_/g, ' ')}`}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !activityType) {
    return (
      <div className="bg-white rounded-lg border p-6">
        <div className="text-center text-red-600">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="font-medium">Failed to load activity</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={() => {
              setError('');
              fetchActivityType();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!activityType) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border"
    >
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Target className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {title || activityType.name}
              </h3>
              <p className="text-sm text-gray-600">
                {description || activityType.description}
              </p>
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>

        {/* Course Context */}
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{courseCode}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Target className="w-4 h-4" />
            <span>{activityType.portfolioSection.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="w-4 h-4" />
            <span>25 XP</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        {activityType.dataSchema?.properties && (
          <div className="space-y-6">
            {Object.keys(activityType.dataSchema.properties).map(key => {
              const property = activityType.dataSchema.properties[key];
              return (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    {property.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderFormField(key, property)}
                  {property.description && (
                    <p className="text-xs text-gray-500 mt-1">{property.description}</p>
                  )}
                </div>
              );
            })}

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Please fix the following errors:</span>
                </div>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* General Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center space-x-4">
                {saving && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                    <span className="text-sm">Saving...</span>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => saveData(false)}
                  disabled={saving}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  Save Draft
                </button>

                <button
                  onClick={() => saveData(true)}
                  disabled={saving || validationErrors.length > 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4 inline mr-2" />
                  {isCompleted ? 'Update & Complete' : 'Complete Activity'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UniversalActivityCapture;
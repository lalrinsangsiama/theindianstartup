'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Input } from '@/components/ui';
import { Textarea } from '@/components/ui';
import { Badge } from '@/components/ui';
import { 
  BookOpen,
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  Calendar,
  Clock,
  Trophy,
  ChevronDown,
  ChevronRight,
  Database,
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';
import { Modal } from '@/components/ui';

interface Product {
  id: string;
  code: string;
  title: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  description?: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  day: number;
  title: string;
  briefContent?: string;
  actionItems?: any;
  resources?: any;
  estimatedTime: number;
  xpReward: number;
  orderIndex: number;
}

export function ContentManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [lessonForm, setLessonForm] = useState({
    day: 1,
    title: '',
    briefContent: '',
    actionItems: '',
    resources: '',
    estimatedTime: 45,
    xpReward: 50,
    moduleId: ''
  });
  const [moduleForm, setModuleForm] = useState({
    title: '',
    description: '',
    orderIndex: 0,
    productId: ''
  });
  
  // Seeding functionality
  const [seedingProgress, setSeedingProgress] = useState<any>(null);
  const [showSeedingModal, setShowSeedingModal] = useState(false);
  const [seedingStatus, setSeedingStatus] = useState<'idle' | 'seeding' | 'validating' | 'clearing'>('idle');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/content/products');
      const data = await response.json();
      setProducts(data);
      if (data.length > 0) {
        setSelectedProduct(data[0].id);
      }
    } catch (error) {
      logger.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateModule = (productId: string) => {
    const product = products.find(p => p.id === productId);
    setModuleForm({
      title: '',
      description: '',
      orderIndex: (product?.modules.length || 0) + 1,
      productId
    });
    setEditingModule(null);
    setShowModuleModal(true);
  };

  const handleEditModule = (module: Module) => {
    setModuleForm({
      title: module.title,
      description: module.description || '',
      orderIndex: module.orderIndex,
      productId: products.find(p => p.modules.some(m => m.id === module.id))?.id || ''
    });
    setEditingModule(module);
    setShowModuleModal(true);
  };

  const handleSaveModule = async () => {
    try {
      const url = editingModule
        ? `/api/admin/content/modules/${editingModule.id}`
        : '/api/admin/content/modules';
      
      const method = editingModule ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleForm)
      });
      
      if (response.ok) {
        await fetchProducts();
        setShowModuleModal(false);
      }
    } catch (error) {
      logger.error('Failed to save module:', error);
    }
  };

  const handleCreateLesson = (moduleId: string) => {
    const targetModule = products
      .flatMap(p => p.modules)
      .find(m => m.id === moduleId);
    
    setLessonForm({
      day: (targetModule?.lessons.length || 0) + 1,
      title: '',
      briefContent: '',
      actionItems: '',
      resources: '',
      estimatedTime: 45,
      xpReward: 50,
      moduleId
    });
    setEditingLesson(null);
    setShowLessonModal(true);
  };

  const handleEditLesson = (lesson: Lesson, moduleId: string) => {
    setLessonForm({
      day: lesson.day,
      title: lesson.title,
      briefContent: lesson.briefContent || '',
      actionItems: JSON.stringify(lesson.actionItems, null, 2) || '',
      resources: JSON.stringify(lesson.resources, null, 2) || '',
      estimatedTime: lesson.estimatedTime,
      xpReward: lesson.xpReward,
      moduleId
    });
    setEditingLesson(lesson);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async () => {
    try {
      const url = editingLesson
        ? `/api/admin/content/lessons/${editingLesson.id}`
        : '/api/admin/content/lessons';
      
      const method = editingLesson ? 'PATCH' : 'POST';
      
      // Parse JSON fields
      let actionItems, resources;
      try {
        actionItems = lessonForm.actionItems ? JSON.parse(lessonForm.actionItems) : null;
        resources = lessonForm.resources ? JSON.parse(lessonForm.resources) : null;
      } catch (e) {
        alert('Invalid JSON in action items or resources');
        return;
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...lessonForm,
          actionItems,
          resources
        })
      });
      
      if (response.ok) {
        await fetchProducts();
        setShowLessonModal(false);
      }
    } catch (error) {
      logger.error('Failed to save lesson:', error);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Are you sure you want to delete this module and all its lessons?')) return;
    
    try {
      const response = await fetch(`/api/admin/content/modules/${moduleId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      logger.error('Failed to delete module:', error);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    
    try {
      const response = await fetch(`/api/admin/content/lessons/${lessonId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      logger.error('Failed to delete lesson:', error);
    }
  };

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // Seeding functions
  const handleSeedAll = async () => {
    setSeedingStatus('seeding');
    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed_all' })
      });
      
      const data = await response.json();
      if (data.success) {
        setSeedingProgress(data.progress);
        await fetchProducts(); // Refresh data
        alert('All courses seeded successfully!');
      } else {
        alert(`Seeding failed: ${data.error}`);
      }
    } catch (error) {
      logger.error('Seeding error:', error);
      alert('Seeding failed. Check console for details.');
    } finally {
      setSeedingStatus('idle');
    }
  };

  const handleValidateContent = async () => {
    setSeedingStatus('validating');
    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'validate' })
      });
      
      const data = await response.json();
      if (data.success) {
        setSeedingProgress(data.validation);
        setShowSeedingModal(true);
      }
    } catch (error) {
      logger.error('Validation error:', error);
      alert('Validation failed. Check console for details.');
    } finally {
      setSeedingStatus('idle');
    }
  };

  const handleClearContent = async () => {
    if (!confirm('Are you sure you want to clear ALL course content? This action cannot be undone.')) return;
    
    setSeedingStatus('clearing');
    try {
      const response = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear_content' })
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchProducts(); // Refresh data
        alert('All content cleared successfully!');
      } else {
        alert(`Clear failed: ${data.error}`);
      }
    } catch (error) {
      logger.error('Clear error:', error);
      alert('Clear failed. Check console for details.');
    } finally {
      setSeedingStatus('idle');
    }
  };

  const currentProduct = products.find(p => p.id === selectedProduct);

  if (loading) {
    return <div className="flex justify-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Content Management</CardTitle>
            <div className="flex items-center gap-4">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.code} - {product.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Bulk Operations */}
          <div className="flex items-center gap-3 mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Bulk Operations:</span>
            </div>
            
            <Button 
              onClick={handleSeedAll}
              disabled={seedingStatus !== 'idle'}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              size="sm"
            >
              {seedingStatus === 'seeding' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
              {seedingStatus === 'seeding' ? 'Seeding...' : 'Seed All Courses'}
            </Button>
            
            <Button 
              onClick={handleValidateContent}
              disabled={seedingStatus !== 'idle'}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {seedingStatus === 'validating' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {seedingStatus === 'validating' ? 'Validating...' : 'Validate Content'}
            </Button>
            
            <Button 
              onClick={handleClearContent}
              disabled={seedingStatus !== 'idle'}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
            >
              {seedingStatus === 'clearing' ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {seedingStatus === 'clearing' ? 'Clearing...' : 'Clear All Content'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {currentProduct && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{currentProduct.title}</h3>
                <Button onClick={() => handleCreateModule(currentProduct.id)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              <div className="space-y-4">
                {currentProduct.modules
                  .sort((a, b) => a.orderIndex - b.orderIndex)
                  .map((module) => (
                  <Card key={module.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleModule(module.id)}
                          >
                            {expandedModules.has(module.id) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </Button>
                          <div>
                            <h4 className="font-medium">{module.title}</h4>
                            {module.description && (
                              <p className="text-sm text-gray-600">{module.description}</p>
                            )}
                          </div>
                          <Badge variant="default">
                            {module.lessons.length} lessons
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCreateLesson(module.id)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Lesson
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditModule(module)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteModule(module.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {expandedModules.has(module.id) && (
                      <CardContent>
                        <div className="space-y-3">
                          {module.lessons
                            .sort((a, b) => a.orderIndex - b.orderIndex)
                            .map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <Badge variant="outline">Day {lesson.day}</Badge>
                                <div>
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {lesson.estimatedTime}min
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Trophy className="w-3 h-3" />
                                      {lesson.xpReward} XP
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditLesson(lesson, module.id)}
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteLesson(lesson.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Module Form Modal */}
      {showModuleModal && (
        <Modal
          isOpen={showModuleModal}
          onClose={() => setShowModuleModal(false)}
        >
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">{editingModule ? 'Edit Module' : 'Create Module'}</h2>
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={moduleForm.title}
                onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                placeholder="Module title..."
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={moduleForm.description}
                onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                placeholder="Module description..."
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Order Index</label>
              <Input
                type="number"
                value={moduleForm.orderIndex}
                onChange={(e) => setModuleForm({ ...moduleForm, orderIndex: parseInt(e.target.value) })}
              />
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleSaveModule} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingModule ? 'Update Module' : 'Create Module'}
              </Button>
              <Button variant="outline" onClick={() => setShowModuleModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Lesson Form Modal */}
      {showLessonModal && (
        <Modal
          isOpen={showLessonModal}
          onClose={() => setShowLessonModal(false)}
          className="max-w-4xl"
        >
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingLesson ? 'Edit Lesson' : 'Create Lesson'}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Day</label>
                <Input
                  type="number"
                  value={lessonForm.day}
                  onChange={(e) => setLessonForm({ ...lessonForm, day: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Estimated Time (minutes)</label>
                <Input
                  type="number"
                  value={lessonForm.estimatedTime}
                  onChange={(e) => setLessonForm({ ...lessonForm, estimatedTime: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Title</label>
              <Input
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                placeholder="Lesson title..."
              />
            </div>

            <div>
              <label className="text-sm font-medium">Brief Content</label>
              <Textarea
                value={lessonForm.briefContent}
                onChange={(e) => setLessonForm({ ...lessonForm, briefContent: e.target.value })}
                placeholder="Brief lesson content..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Action Items (JSON)</label>
              <Textarea
                value={lessonForm.actionItems}
                onChange={(e) => setLessonForm({ ...lessonForm, actionItems: e.target.value })}
                placeholder='["Define your target market", "Research competitors"]'
                rows={3}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Resources (JSON)</label>
              <Textarea
                value={lessonForm.resources}
                onChange={(e) => setLessonForm({ ...lessonForm, resources: e.target.value })}
                placeholder='{"links": ["https://example.com"], "templates": ["template.pdf"]}'
                rows={3}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">XP Reward</label>
              <Input
                type="number"
                value={lessonForm.xpReward}
                onChange={(e) => setLessonForm({ ...lessonForm, xpReward: parseInt(e.target.value) })}
              />
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleSaveLesson} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                {editingLesson ? 'Update Lesson' : 'Create Lesson'}
              </Button>
              <Button variant="outline" onClick={() => setShowLessonModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Validation Modal */}
      {showSeedingModal && seedingProgress && (
        <Modal
          isOpen={showSeedingModal}
          onClose={() => setShowSeedingModal(false)}
          className="max-w-4xl"
        >
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Content Validation Results</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">Content Statistics</h3>
              <div className="flex items-center gap-2">
                {seedingProgress.valid ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${seedingProgress.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {seedingProgress.valid ? 'Valid' : 'Issues Found'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{seedingProgress.stats?.products || 0}</div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{seedingProgress.stats?.modules || 0}</div>
                <div className="text-sm text-gray-600">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{seedingProgress.stats?.lessons || 0}</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
            </div>

            {seedingProgress.issues && seedingProgress.issues.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Issues Found ({seedingProgress.issues.length})
                </h4>
                <ul className="space-y-1 text-sm text-red-700">
                  {seedingProgress.issues.map((issue: string, index: number) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={() => setShowSeedingModal(false)} 
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
              {!seedingProgress.valid && (
                <Button 
                  onClick={handleSeedAll}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Fix Issues with Full Seed
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
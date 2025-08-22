// Comprehensive Admin Seeding System for Course Content
// Supports both Supabase and Firebase with batch operations

import { createClient } from '@/lib/supabase/server';
import { ALL_COURSES, Course, CourseModule, CourseLesson } from '@/data/course-content-templates';

export interface SeedingProgress {
  total: number;
  completed: number;
  current: string;
  errors: string[];
}

export class ContentSeeder {
  private progress: SeedingProgress;
  
  constructor() {
    this.progress = {
      total: 0,
      completed: 0,
      current: '',
      errors: []
    };
  }

  private getClient() {
    return createClient();
  }

  // Main seeding function with progress tracking
  async seedAllCourses(progressCallback?: (progress: SeedingProgress) => void): Promise<SeedingProgress> {
    try {
      // Calculate total operations
      this.progress.total = this.calculateTotalOperations();
      this.progress.completed = 0;
      this.progress.errors = [];

      for (const course of ALL_COURSES) {
        await this.seedCourse(course, progressCallback);
      }

      this.progress.current = 'Seeding completed successfully';
      if (progressCallback) progressCallback(this.progress);
      
      return this.progress;
    } catch (error) {
      this.progress.errors.push(`Seeding failed: ${error}`);
      throw error;
    }
  }

  // Seed individual course with modules and lessons
  private async seedCourse(course: Course, progressCallback?: (progress: SeedingProgress) => void): Promise<void> {
    try {
      this.progress.current = `Seeding course: ${course.title}`;
      if (progressCallback) progressCallback(this.progress);

      // Check if product exists, create if not
      let product = await this.findOrCreateProduct(course);
      
      // Seed modules
      for (const moduleData of course.modules) {
        await this.seedModule(product.id, moduleData, progressCallback);
      }

      this.progress.completed++;
    } catch (error) {
      this.progress.errors.push(`Failed to seed course ${course.code}: ${error}`);
      throw error;
    }
  }

  // Find or create product
  private async findOrCreateProduct(course: Course): Promise<any> {
    // Check if product exists
    const { data: existingProduct, error: findError } = await this.getClient()
      .from('Product')
      .select('*')
      .eq('code', course.code)
      .single();

    if (existingProduct) {
      return existingProduct;
    }

    // Create new product if it doesn't exist
    const productData = {
      code: course.code,
      title: course.title,
      description: course.description,
      price: this.getProductPrice(course.code),
      isBundle: false,
      estimatedDays: this.calculateCourseDays(course)
    };

    const { data: newProduct, error: createError } = await this.getClient()
      .from('Product')
      .insert([productData])
      .select()
      .single();

    if (createError) throw createError;
    return newProduct;
  }

  // Seed module with lessons
  private async seedModule(productId: string, moduleData: CourseModule, progressCallback?: (progress: SeedingProgress) => void): Promise<void> {
    try {
      this.progress.current = `Seeding module: ${moduleData.title}`;
      if (progressCallback) progressCallback(this.progress);

      // Check if module exists
      const { data: existingModule } = await this.getClient()
        .from('Module')
        .select('*')
        .eq('productId', productId)
        .eq('title', moduleData.title)
        .single();

      let moduleId;
      
      if (existingModule) {
        moduleId = existingModule.id;
      } else {
        // Create new module
        const { data: newModuleData, error: moduleError } = await this.getClient()
          .from('Module')
          .insert([{
            productId,
            title: moduleData.title,
            description: moduleData.description,
            orderIndex: moduleData.orderIndex
          }])
          .select()
          .single();

        if (moduleError) throw moduleError;
        moduleId = newModuleData.id;
      }

      // Seed lessons in batch
      await this.seedLessonsBatch(moduleId, moduleData.lessons, progressCallback);
      
      this.progress.completed++;
    } catch (error) {
      this.progress.errors.push(`Failed to seed module ${moduleData.title}: ${error}`);
      throw error;
    }
  }

  // Batch seed lessons for better performance
  private async seedLessonsBatch(moduleId: string, lessons: CourseLesson[], progressCallback?: (progress: SeedingProgress) => void): Promise<void> {
    const BATCH_SIZE = 10;
    
    for (let i = 0; i < lessons.length; i += BATCH_SIZE) {
      const batch = lessons.slice(i, i + BATCH_SIZE);
      
      this.progress.current = `Seeding lessons ${i + 1}-${Math.min(i + BATCH_SIZE, lessons.length)} of ${lessons.length}`;
      if (progressCallback) progressCallback(this.progress);

      const lessonData = batch.map((lesson, batchIndex) => ({
        moduleId,
        day: lesson.day,
        title: lesson.title,
        briefContent: lesson.briefContent,
        actionItems: lesson.actionItems,
        resources: lesson.resources,
        estimatedTime: lesson.estimatedTime,
        xpReward: lesson.xpReward,
        orderIndex: i + batchIndex + 1
      }));

      const { error } = await this.getClient()
        .from('Lesson')
        .upsert(lessonData, {
          onConflict: 'moduleId,day',
          ignoreDuplicates: false
        });

      if (error && !error.message.includes('duplicate')) {
        throw error;
      }

      this.progress.completed += batch.length;
    }
  }

  // Utility functions
  private calculateTotalOperations(): number {
    let total = 0;
    for (const course of ALL_COURSES) {
      total += 1; // Course
      total += course.modules.length; // Modules
      for (const moduleData of course.modules) {
        total += moduleData.lessons.length; // Lessons
      }
    }
    return total;
  }

  private calculateCourseDays(course: Course): number {
    let maxDay = 0;
    for (const moduleData of course.modules) {
      for (const lesson of moduleData.lessons) {
        if (lesson.day > maxDay) maxDay = lesson.day;
      }
    }
    return maxDay;
  }

  private getProductPrice(code: string): number {
    const prices: { [key: string]: number } = {
      'P1': 499900, // ₹4,999
      'P2': 499900, // ₹4,999
      'P3': 599900, // ₹5,999
      'P4': 699900, // ₹6,999
      'P5': 799900, // ₹7,999
      'P6': 699900, // ₹6,999
      'P7': 499900, // ₹4,999
      'P8': 999900, // ₹9,999
      'P9': 499900, // ₹4,999
      'P10': 799900, // ₹7,999
      'P11': 799900, // ₹7,999
      'P12': 999900  // ₹9,999
    };
    return prices[code] || 499900;
  }

  // Resource seeding functions
  async seedResources(progressCallback?: (progress: SeedingProgress) => void): Promise<void> {
    // This would seed a resources table if we create one
    // For now, resources are embedded in lesson content
    this.progress.current = 'Resources are embedded in lesson content';
    if (progressCallback) progressCallback(this.progress);
  }

  // Government schemes seeding
  async seedGovernmentSchemes(progressCallback?: (progress: SeedingProgress) => void): Promise<void> {
    // This would seed government schemes into a dedicated table
    this.progress.current = 'Government schemes seeding not implemented yet';
    if (progressCallback) progressCallback(this.progress);
  }

  // Validation functions
  async validateSeededContent(): Promise<{ 
    valid: boolean; 
    issues: string[]; 
    stats: { products: number; modules: number; lessons: number } 
  }> {
    const issues: string[] = [];
    
    try {
      // Count products
      const { data: products, error: productsError } = await this.getClient()
        .from('Product')
        .select('id, code, title');
      
      if (productsError) issues.push(`Products validation error: ${productsError.message}`);

      // Count modules
      const { data: modules, error: modulesError } = await this.getClient()
        .from('Module')
        .select('id, productId, title');
      
      if (modulesError) issues.push(`Modules validation error: ${modulesError.message}`);

      // Count lessons
      const { data: lessons, error: lessonsError } = await this.getClient()
        .from('Lesson')
        .select('id, moduleId, title, day');
      
      if (lessonsError) issues.push(`Lessons validation error: ${lessonsError.message}`);

      // Validate content structure
      if (products) {
        for (const product of products) {
          const productModules = modules?.filter(m => m.productId === product.id) || [];
          if (productModules.length === 0) {
            issues.push(`Product ${product.code} has no modules`);
          }
          
          for (const moduleData of productModules) {
            const moduleLessons = lessons?.filter(l => l.moduleId === moduleData.id) || [];
            if (moduleLessons.length === 0) {
              issues.push(`Module ${moduleData.title} in ${product.code} has no lessons`);
            }
          }
        }
      }

      return {
        valid: issues.length === 0,
        issues,
        stats: {
          products: products?.length || 0,
          modules: modules?.length || 0,
          lessons: lessons?.length || 0
        }
      };
    } catch (error) {
      return {
        valid: false,
        issues: [`Validation failed: ${error}`],
        stats: { products: 0, modules: 0, lessons: 0 }
      };
    }
  }

  // Clear all seeded content (use with caution!)
  async clearAllContent(): Promise<void> {
    try {
      // Delete in correct order due to foreign key constraints
      await this.getClient().from('Lesson').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await this.getClient().from('Module').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      // Don't delete products as they might have purchases associated
    } catch (error) {
      throw new Error(`Failed to clear content: ${error}`);
    }
  }
}

// Firebase integration (for future use)
export class FirebaseContentSeeder {
  private firestore: any; // Would be initialized with Firebase SDK
  
  constructor(firebaseConfig?: any) {
    // Initialize Firebase if config provided
    // this.firestore = firebase.firestore();
  }

  async seedToFirebase(courses: Course[]): Promise<void> {
    // Implementation for Firebase seeding
    // Would use batch writes for better performance
    throw new Error('Firebase seeding not yet implemented');
  }
}

// Export singleton instance
export const contentSeeder = new ContentSeeder();
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    // First, check if P1 product exists, if not create it
    const { data: existingProduct } = await supabase
      .from('Product')
      .select('id')
      .eq('code', 'P1')
      .single();

    let productId = existingProduct?.id;

    if (!existingProduct) {
      const { data: newProduct, error: productError } = await supabase
        .from('Product')
        .insert({
          code: 'P1',
          title: '30-Day India Launch Sprint',
          description: 'Transform your startup idea into a legally incorporated, market-validated business with paying customers in just 30 days.',
          price: 4999,
          isBundle: false,
          estimatedDays: 30,
          features: [
            '30 daily action plans with exact steps',
            '150+ premium templates (₹25,000 value)',
            '50+ interactive tools and calculators',
            'Indian unicorn case studies',
            'Expert masterclasses and insights'
          ]
        })
        .select('id')
        .single();

      if (productError) throw productError;
      productId = newProduct.id;
    }

    // Create modules for P1
    const modules = [
      {
        title: 'Foundation Week',
        description: 'Days 1-7: Crystal-clear problem definition and market validation',
        orderIndex: 1
      },
      {
        title: 'Building Blocks',
        description: 'Days 8-14: Legal foundation and operational setup',
        orderIndex: 2
      },
      {
        title: 'Making it Real',
        description: 'Days 15-21: Product launch and early traction',
        orderIndex: 3
      },
      {
        title: 'Launch Ready',
        description: 'Days 22-30: Scale, funding prep, and sustainable growth',
        orderIndex: 4
      }
    ];

    // Delete existing modules and lessons
    await supabase
      .from('Module')
      .delete()
      .eq('productId', productId);

    // Insert modules
    const { data: insertedModules, error: moduleError } = await supabase
      .from('Module')
      .insert(
        modules.map(module => ({
          ...module,
          productId
        }))
      )
      .select('id, orderIndex');

    if (moduleError) throw moduleError;

    // Sample lessons for first few days
    const sampleLessons = [
      {
        moduleId: insertedModules.find(m => m.orderIndex === 1)?.id,
        day: 1,
        title: 'Idea Refinement & Goal Setting',
        briefContent: 'Transform your raw idea into a clear, actionable vision. Define the problem you\'re solving and set SMART goals for the next 30 days.',
        actionItems: [
          { task: 'Complete Problem-Solution Fit Canvas', priority: 'high' },
          { task: 'Conduct 5 customer interviews', priority: 'high' },
          { task: 'Write 30-day SMART goals', priority: 'medium' },
          { task: 'Create elevator pitch', priority: 'medium' }
        ],
        resources: {
          templates: [
            { name: 'Problem-Solution Fit Canvas', url: '/templates/p1/problem-solution-canvas.html' },
            { name: 'Customer Interview Script', url: '/templates/p1/interview-script.pdf' },
            { name: 'SMART Goals Worksheet', url: '/templates/p1/smart-goals.xlsx' }
          ],
          tools: [
            { name: 'Market Size Calculator', url: '/templates/p1/market-calculator.html' },
            { name: 'Startup Readiness Assessment', url: '/templates/p1/startup-readiness-assessment.html' }
          ]
        },
        estimatedTime: 120,
        xpReward: 100,
        orderIndex: 1,
        metadata: {
          deliverables: ['Problem Statement Document', '30-Day Goals', 'Elevator Pitch'],
          expertInsight: 'Harshil Mathur (Razorpay): We spent more time talking to customers than coding in our first month',
          milestone: 'Foundation Started'
        }
      },
      {
        moduleId: insertedModules.find(m => m.orderIndex === 1)?.id,
        day: 2,
        title: 'Market Research & Analysis',
        briefContent: 'Deep dive into your target market. Calculate TAM/SAM/SOM, analyze competitors, and identify your unique positioning.',
        actionItems: [
          { task: 'Calculate TAM, SAM, and SOM', priority: 'high' },
          { task: 'Analyze 5 direct competitors', priority: 'high' },
          { task: 'Create competitor comparison matrix', priority: 'medium' },
          { task: 'Define unique value proposition', priority: 'high' }
        ],
        resources: {
          templates: [
            { name: 'TAM-SAM-SOM Calculator', url: '/templates/p1/tam-sam-som.xlsx' },
            { name: 'Competitor Analysis Matrix', url: '/templates/p1/competitor-matrix.xlsx' }
          ],
          tools: [
            { name: 'India Market Data Portal', url: '/tools/market-data' }
          ]
        },
        estimatedTime: 150,
        xpReward: 100,
        orderIndex: 2,
        metadata: {
          deliverables: ['Market Size Analysis', 'Competitor Matrix', 'Positioning Statement'],
          expertInsight: 'Kunal Shah (CRED): Pick a niche and dominate before expanding'
        }
      }
    ];

    // Insert sample lessons
    const { error: lessonError } = await supabase
      .from('Lesson')
      .insert(sampleLessons);

    if (lessonError) throw lessonError;

    // Add some resources
    const resources = [
      {
        title: 'Startup Readiness Assessment',
        type: 'tool',
        url: '/templates/p1/startup-readiness-assessment.html',
        description: 'Comprehensive 15-question assessment to evaluate your startup readiness',
        tags: ['assessment', 'tool', 'interactive'],
        productCode: 'P1',
        metadata: {
          questions: 15,
          categories: 5,
          duration: '5 minutes'
        }
      },
      {
        title: 'Master Template Library',
        type: 'resource',
        url: '/templates/p1/master-template-library.html',
        description: 'Access to 150+ premium templates worth ₹25,000',
        tags: ['templates', 'library', 'premium'],
        productCode: 'P1',
        metadata: {
          count: 150,
          value: 25000,
          categories: 8
        }
      },
      {
        title: 'Business Model Canvas',
        type: 'template',
        url: '/templates/p1/business-model-canvas.html',
        description: 'Interactive business model canvas with Indian examples',
        tags: ['canvas', 'business model', 'interactive'],
        productCode: 'P1',
        metadata: {
          examples: 15,
          exportable: true
        }
      }
    ];

    const { error: resourceError } = await supabase
      .from('Resource')
      .insert(resources);

    if (resourceError) throw resourceError;

    return NextResponse.json({ 
      success: true, 
      message: 'P1 content seeded successfully',
      details: {
        modules: modules.length,
        lessons: sampleLessons.length,
        resources: resources.length
      }
    });
  } catch (error) {
    console.error('Error seeding P1 content:', error);
    return NextResponse.json(
      { error: 'Failed to seed P1 content' },
      { status: 500 }
    );
  }
}
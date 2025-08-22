import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  try {
    const { data: categories, error } = await supabase
      .from('BlogCategory')
      .select('*')
      .eq('isActive', true)
      .order('orderIndex', { ascending: true });

    if (error) throw error;

    return NextResponse.json(categories || []);
  } catch (error) {
    logger.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();
  const categoryData = await request.json();

  try {
    // Generate slug
    const slug = categoryData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newCategory = {
      name: categoryData.name,
      slug,
      description: categoryData.description,
      color: categoryData.color || '#3B82F6',
      icon: categoryData.icon,
      orderIndex: categoryData.orderIndex || 0,
      isActive: true,
      postCount: 0
    };

    const { data: category, error } = await supabase
      .from('BlogCategory')
      .insert([newCategory])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(category);
  } catch (error) {
    logger.error('Error creating blog category:', error);
    return NextResponse.json(
      { error: 'Failed to create blog category' },
      { status: 500 }
    );
  }
}
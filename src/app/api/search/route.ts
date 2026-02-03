import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import { z } from 'zod';

const searchSchema = z.object({
  q: z.string().min(2).max(100),
  type: z.enum(['all', 'courses', 'lessons', 'community', 'resources']).optional().default('all'),
  limit: z.number().min(1).max(50).optional().default(10),
});

interface SearchResult {
  id: string;
  type: 'course' | 'lesson' | 'community' | 'resource';
  title: string;
  description: string;
  url: string;
  highlight?: string;
  metadata?: Record<string, unknown>;
}

/**
 * GET /api/search
 * Global search across courses, lessons, community posts, and resources
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    const validation = searchSchema.safeParse({ q: query, type, limit });

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Search query must be 2-100 characters' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    // Helper to highlight matching text
    const getHighlight = (text: string, maxLength: number = 150): string => {
      const lowerText = text.toLowerCase();
      const index = lowerText.indexOf(searchTerm);
      if (index === -1) return text.slice(0, maxLength) + '...';

      const start = Math.max(0, index - 50);
      const end = Math.min(text.length, index + searchTerm.length + 50);
      let snippet = text.slice(start, end);

      if (start > 0) snippet = '...' + snippet;
      if (end < text.length) snippet = snippet + '...';

      return snippet;
    };

    // Search courses (products)
    if (type === 'all' || type === 'courses') {
      const { data: courses } = await supabase
        .from('Product')
        .select('code, title, description, price, isBundle')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .eq('isActive', true)
        .limit(limit);

      if (courses) {
        courses.forEach((course) => {
          results.push({
            id: course.code,
            type: 'course',
            title: course.title,
            description: course.description || '',
            url: `/products/${course.code.toLowerCase()}`,
            highlight: getHighlight(course.description || course.title),
            metadata: {
              price: course.price,
              isBundle: course.isBundle,
            },
          });
        });
      }
    }

    // Search lessons
    if (type === 'all' || type === 'lessons') {
      const { data: lessons } = await supabase
        .from('Lesson')
        .select(`
          id,
          title,
          description,
          content,
          moduleId,
          Module:Module(productCode)
        `)
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        .limit(limit);

      if (lessons) {
        lessons.forEach((lesson: any) => {
          const productCode = lesson.Module?.productCode || 'p1';
          results.push({
            id: lesson.id,
            type: 'lesson',
            title: lesson.title,
            description: lesson.description || '',
            url: `/products/${productCode.toLowerCase()}/lessons/${lesson.id}`,
            highlight: getHighlight(lesson.content || lesson.description || lesson.title),
            metadata: {
              productCode,
            },
          });
        });
      }
    }

    // Search community posts
    if (type === 'all' || type === 'community') {
      const { data: posts } = await supabase
        .from('CommunityPost')
        .select('id, title, content, authorName, category, createdAt')
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
        .eq('status', 'published')
        .order('createdAt', { ascending: false })
        .limit(limit);

      if (posts) {
        posts.forEach((post) => {
          results.push({
            id: post.id,
            type: 'community',
            title: post.title,
            description: `by ${post.authorName}`,
            url: `/community/posts/${post.id}`,
            highlight: getHighlight(post.content || post.title),
            metadata: {
              category: post.category,
              author: post.authorName,
            },
          });
        });
      }
    }

    // Search resources (government schemes, etc.)
    if (type === 'all' || type === 'resources') {
      const { data: schemes } = await supabase
        .from('GovernmentScheme')
        .select('id, name, description, category, eligibility')
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .limit(limit);

      if (schemes) {
        schemes.forEach((scheme) => {
          results.push({
            id: scheme.id,
            type: 'resource',
            title: scheme.name,
            description: scheme.category || '',
            url: `/government-schemes/${scheme.id}`,
            highlight: getHighlight(scheme.description || scheme.name),
            metadata: {
              category: scheme.category,
              eligibility: scheme.eligibility,
            },
          });
        });
      }
    }

    // Sort results by relevance (exact title match first)
    results.sort((a, b) => {
      const aExact = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bExact = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      return bExact - aExact;
    });

    // Limit total results
    const limitedResults = results.slice(0, limit);

    return NextResponse.json({
      query,
      results: limitedResults,
      total: limitedResults.length,
      hasMore: results.length > limit,
    });
  } catch (error) {
    logger.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}

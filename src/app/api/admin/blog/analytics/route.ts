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
    // Get basic stats
    const { data: posts, error: postsError } = await supabase
      .from('BlogPost')
      .select('status, viewCount, likeCount, shareCount, commentCount, publishedAt, metaTitle, metaDescription');

    if (postsError) throw postsError;

    const totalPosts = posts?.length || 0;
    const publishedPosts = posts?.filter(p => p.status === 'published').length || 0;
    const draftPosts = posts?.filter(p => p.status === 'draft').length || 0;
    const totalViews = posts?.reduce((sum, p) => sum + (p.viewCount || 0), 0) || 0;
    const totalEngagement = posts?.reduce((sum, p) => 
      sum + (p.likeCount || 0) + (p.shareCount || 0) + (p.commentCount || 0), 0) || 0;

    // Get top performing posts
    const topPosts = posts
      ?.filter(p => p.status === 'published')
      ?.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      ?.slice(0, 10) || [];

    // Get recent activity (posts published in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentPosts = posts?.filter(p => 
      p.status === 'published' && 
      p.publishedAt && 
      new Date(p.publishedAt) > thirtyDaysAgo
    ).length || 0;

    // Get categories with post counts
    const { data: categories, error: categoriesError } = await supabase
      .from('BlogCategory')
      .select(`
        name, 
        postCount,
        color
      `)
      .eq('isActive', true)
      .order('postCount', { ascending: false });

    if (categoriesError) throw categoriesError;

    // Get monthly publishing trend (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthPosts = posts?.filter(p => 
        p.status === 'published' && 
        p.publishedAt &&
        new Date(p.publishedAt) >= monthStart && 
        new Date(p.publishedAt) <= monthEnd
      ).length || 0;

      monthlyData.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        posts: monthPosts
      });
    }

    const analytics = {
      overview: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews,
        totalEngagement,
        recentPosts
      },
      topPosts,
      categories: categories || [],
      monthlyTrend: monthlyData,
      seoHealth: {
        postsWithMetaTitle: posts?.filter(p => p.metaTitle).length || 0,
        postsWithMetaDescription: posts?.filter(p => p.metaDescription).length || 0,
        postsNeedingSEO: posts?.filter(p => !p.metaTitle || !p.metaDescription).length || 0
      }
    };

    return NextResponse.json(analytics);
  } catch (error) {
    logger.error('Error fetching blog analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog analytics' },
      { status: 500 }
    );
  }
}
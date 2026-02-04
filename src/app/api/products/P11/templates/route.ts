import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getUserFromRequest } from '@/lib/auth';
import { logger } from '@/lib/logger';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const user = await getUserFromRequest(request);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has access to P11
    const { data: purchases, error: purchaseError } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P11', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gte('expiresAt', new Date().toISOString());

    if (purchaseError || !purchases || purchases.length === 0) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Return P11 template library
    const templates = {
      media_pitch_templates: [
        {
          id: 'funding-announcement',
          title: 'Funding Announcement Pitch',
          description: 'Template for announcing funding rounds',
          category: 'Funding',
          success_rate: '65%',
          sample: 'Subject: [Company] raises ₹X Cr Series A to transform [industry]\n\nHi [Journalist Name],\n\nHope you\'re doing well. I wanted to share some exciting news that might interest your [publication] readers.\n\n[Company Name] just closed our Series A funding round of ₹X crores, led by [Lead Investor]. This funding will help us [specific use of funds and impact].\n\nWhat makes this particularly newsworthy:\n- [Unique angle 1]\n- [Market size/opportunity]\n- [Traction metrics]\n\nWould you be interested in an exclusive interview with our CEO [Name] to discuss our growth plans and industry insights?\n\nHappy to provide additional information, including investor quotes, company metrics, and high-res photos.\n\nBest regards,\n[Your Name]'
        },
        {
          id: 'product-launch',
          title: 'Product Launch Pitch',
          description: 'Template for new product announcements',
          category: 'Product',
          success_rate: '55%',
          sample: 'Subject: India\'s first [innovation] launches - solving [problem] for [audience]\n\nHi [Journalist Name],\n\nGreat work on your recent piece about [relevant topic]. Your insights on [specific point] really resonated.\n\nI wanted to share news about [Product Name], which we\'re launching today to address [specific problem in their beat].\n\n[Product Name] is significant because:\n- First-to-market innovation: [unique feature]\n- Market impact: [size and opportunity]\n- Early traction: [beta user feedback/metrics]\n\nKey differentiators:\n• [Feature 1] vs competitors who only offer [limitation]\n• [Feature 2] specifically designed for Indian market\n• [Feature 3] with proven ROI of [metric]\n\nWould you like an exclusive demo or interview with our product team?\n\nAttached: Product images, demo video, and founder bio.\n\nThanks for your time!\n[Your Name]'
        }
      ],
      press_release_formats: [
        {
          id: 'standard-announcement',
          title: 'Standard Announcement Format',
          description: 'Professional press release template',
          category: 'General',
          structure: {
            headline: '[Location], [Date] - [Company] announces [news] to [benefit/impact]',
            lead: 'First paragraph with who, what, when, where, why in 2-3 sentences',
            body: 'Supporting paragraphs with details, quotes, and context',
            boilerplate: 'About [Company] - standard company description',
            contact: 'Media contact information'
          },
          sample: 'Mumbai, India - January 15, 2025 - TheIndianStartup.in, India\'s leading entrepreneurship education platform, today announced the launch of P11: Branding & PR Mastery Premium Edition, a comprehensive 84-day course designed to transform founders into recognized industry leaders.\n\nThe new premium edition includes 500+ verified media contacts, proven templates with 45% success rates, and a unique success guarantee program offering 5+ media mentions and 1+ award win or money back.\n\n"After working with 1000+ founders, we identified that brand building and PR are the most critical yet overlooked aspects of startup success," said [Founder Name], CEO of TheIndianStartup.in. "P11 Premium Edition addresses this gap with real journalist contacts and proven frameworks that guarantee results."\n\nKey features include:\n• Real media database with 500+ journalist contacts across national and international publications\n• Complete "How to Get Written About" HERO framework system\n• 25 media pitch templates and 15 press release formats with proven success rates\n• Advanced modules covering financial communications, M&A PR, and global expansion\n• Monthly masterclasses and 3 personal mentorship sessions\n\nThe course addresses the $2.1 billion brand building market in India, where 89% of startups fail to build strong brand recognition, according to recent studies.\n\n"We\'re seeing founders achieve 1,250x ROI through systematic brand building," added [Name], Head of Branding Programs. "Our success guarantee reflects our confidence in these proven methodologies."\n\nP11 Premium Edition is available for ₹14,999 with lifetime access and includes:\n- 84 comprehensive lessons across 12 expert modules\n- Verified media contact database (worth ₹50,000)\n- Complete template library (worth ₹40,000)\n- Success guarantee program\n- Monthly expert masterclasses\n- 3 x 1-on-1 mentorship sessions\n\nAbout TheIndianStartup.in\nTheIndianStartup.in is India\'s leading entrepreneurship education platform, helping over 5,000+ founders build successful startups through practical, step-by-step playbooks. The platform offers 12 specialized courses covering everything from incorporation to scaling, with a focus on India-specific strategies and guaranteed outcomes.\n\nFor more information about P11 Branding & PR Mastery Premium Edition, visit [website] or contact [media contact].\n\nMedia Contact:\n[Name]\n[Title]\n[Email]\n[Phone]'
        }
      ],
      brand_guidelines_template: {
        title: '50-Page Brand Guidelines Template',
        sections: [
          'Brand Story & Mission',
          'Logo Usage & Variations',
          'Color Palette & Applications',
          'Typography System',
          'Photography Guidelines',
          'Voice & Tone Guide',
          'Digital Applications',
          'Print Applications',
          'Packaging Guidelines',
          'Do\'s and Don\'ts',
          'Contact Information',
          'Version Control'
        ],
        value: '₹25,000'
      },
      pr_campaign_planner: {
        title: 'PR Campaign Planning Template',
        components: [
          'Campaign Objectives (SMART goals)',
          'Target Audience Analysis',
          'Key Messages Matrix',
          'Media Target List',
          'Content Calendar (90 days)',
          'Budget Breakdown',
          'Timeline & Milestones',
          'Success Metrics & KPIs',
          'Risk Assessment',
          'Contingency Plans'
        ],
        value: '₹15,000'
      }
    };

    return NextResponse.json({
      success: true,
      templates,
      totalValue: '₹1,40,000',
      categories: ['Media Pitches', 'Press Releases', 'Brand Guidelines', 'Campaign Planning'],
      usage_note: 'All templates are optimized for Indian market and include proven success rates'
    });

  } catch (error) {
    logger.error('Error fetching P11 templates:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P5
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P5', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const toolType = searchParams.get('type');
    const legalArea = searchParams.get('legal_area');
    const search = searchParams.get('search');

    // Build query
    let query = supabase
      .from('p5_tools')
      .select('*')
      .eq('is_active', true)
      .order('usage_count', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (toolType) {
      query = query.eq('tool_type', toolType);
    }

    if (legalArea) {
      query = query.eq('legal_area', legalArea);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: tools, error } = await query;

    if (error) {
      throw error;
    }

    // Get tool categories for filtering
    const { data: categories } = await supabase
      .from('p5_tools')
      .select('category, tool_type, legal_area')
      .eq('is_active', true)
      .order('category');

    const uniqueCategories = Array.from(
      new Set(categories?.map(c => c.category))
    ).map(category => ({
      name: category,
      types: Array.from(
        new Set(
          categories
            ?.filter(c => c.category === category)
            .map(c => c.tool_type)
            .filter(Boolean)
        )
      )
    }));

    // Get legal areas
    const legalAreas = Array.from(
      new Set(categories?.map(c => c.legal_area).filter(Boolean))
    );

    // Enhance tools with features and use cases
    const enhancedTools = tools?.map(tool => {
      let features: string[] = [];
      let useCases: string[] = [];
      
      // Add specific features based on tool category
      switch (tool.category) {
        case 'risk_assessment':
          features = [
            'Multi-factor risk analysis',
            'Impact-probability matrix',
            'Mitigation cost calculations',
            'Regulatory compliance mapping',
            'Real-time risk monitoring'
          ];
          useCases = [
            'Pre-transaction risk assessment',
            'Compliance gap analysis',
            'Legal budget planning',
            'Board risk reporting'
          ];
          break;

        case 'compliance':
          features = [
            'Multi-jurisdiction coverage',
            'Automated deadline tracking',
            'Penalty cost calculations',
            'Compliance score dashboard',
            'Audit trail generation'
          ];
          useCases = [
            'Regulatory compliance management',
            'Audit preparation',
            'Legal calendar management',
            'Compliance reporting'
          ];
          break;

        case 'ip_management':
          features = [
            'Portfolio-wide IP tracking',
            'Renewal management',
            'Valuation calculations',
            'Infringement monitoring',
            'Monetization opportunity analysis'
          ];
          useCases = [
            'IP portfolio optimization',
            'Patent prosecution management',
            'Licensing opportunity identification',
            'IP due diligence'
          ];
          break;

        case 'employment':
          features = [
            'Labor law compliance checking',
            'Multi-state regulation support',
            'Cost-benefit calculations',
            'Policy template generation',
            'Training module integration'
          ];
          useCases = [
            'HR policy development',
            'Employment law compliance',
            'Workplace investigation management',
            'Employee lifecycle management'
          ];
          break;

        case 'contracts':
          features = [
            'AI-powered contract analysis',
            'Risk scoring algorithms',
            'Template customization',
            'Approval workflow integration',
            'Performance tracking'
          ];
          useCases = [
            'Contract lifecycle management',
            'Vendor agreement optimization',
            'Legal review automation',
            'Contract negotiation support'
          ];
          break;

        default:
          features = [
            'Advanced analytics',
            'Automated processing',
            'Export capabilities',
            'Integration ready',
            'Professional reporting'
          ];
          useCases = [
            'Legal operations',
            'Decision support',
            'Compliance management',
            'Risk mitigation'
          ];
      }

      return {
        ...tool,
        features,
        useCases,
        estimatedTime: `${tool.estimated_time_minutes} minutes`,
        difficulty: getDifficultyLevel(tool.tool_type),
        prerequisites: getPrerequisites(tool.category)
      };
    }) || [];

    return NextResponse.json({
      tools: enhancedTools,
      categories: uniqueCategories,
      legalAreas,
      totalCount: enhancedTools.length,
      stats: {
        byCategory: getToolStats(enhancedTools, 'category'),
        byLegalArea: getToolStats(enhancedTools, 'legal_area'),
        byType: getToolStats(enhancedTools, 'tool_type')
      }
    });

  } catch (error) {
    console.error('Error fetching P5 tools:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user access to P5
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P5', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { action, toolId, data } = body;

    switch (action) {
      case 'use_tool':
        // Increment usage count
        const { error: usageError } = await supabase
          .from('p5_tools')
          .update({ 
            usage_count: 'usage_count + 1',
            updated_at: new Date().toISOString()
          })
          .eq('id', toolId);

        if (usageError) throw usageError;

        // Track tool usage event
        const { error: xpError } = await supabase
          .from('p5_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'tool_usage',
            event_id: toolId,
            xp_earned: 20 // Higher XP for legal tools
          });

        if (xpError) throw xpError;

        // Get tool info for response
        const { data: tool } = await supabase
          .from('p5_tools')
          .select('name, url, legal_area')
          .eq('id', toolId)
          .single();

        return NextResponse.json({ 
          success: true, 
          toolUrl: tool?.url,
          toolName: tool?.name,
          legalArea: tool?.legal_area,
          xpEarned: 20
        });

      case 'save_analysis':
        // Save legal analysis results
        const { error: saveXpError } = await supabase
          .from('p5_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'analysis_saved',
            event_id: `${toolId}_${Date.now()}`,
            xp_earned: 25 // Higher reward for saving legal analysis
          });

        if (saveXpError) throw saveXpError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 25,
          message: 'Legal analysis saved successfully'
        });

      case 'generate_report':
        // Track report generation
        const { error: reportError } = await supabase
          .from('p5_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'report_generated',
            event_id: `${toolId}_report`,
            xp_earned: 30 // Premium reward for report generation
          });

        if (reportError) throw reportError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 30,
          message: 'Legal report generated successfully'
        });

      case 'schedule_consultation':
        // Track consultation scheduling
        const { error: consultError } = await supabase
          .from('p5_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'consultation_scheduled',
            event_id: `${toolId}_consultation`,
            xp_earned: 15
          });

        if (consultError) throw consultError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 15,
          message: 'Legal consultation scheduled successfully'
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing P5 tool request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function getDifficultyLevel(toolType: string): 'Beginner' | 'Intermediate' | 'Advanced' {
  const advancedTypes = ['analyzer', 'optimizer'];
  const intermediateTypes = ['manager', 'tracker'];
  
  if (advancedTypes.includes(toolType)) return 'Advanced';
  if (intermediateTypes.includes(toolType)) return 'Intermediate';
  return 'Beginner';
}

function getPrerequisites(category: string): string[] {
  switch (category) {
    case 'risk_assessment':
      return ['Business understanding', 'Legal context awareness', 'Risk management basics'];
    case 'compliance':
      return ['Regulatory knowledge', 'Business operations', 'Compliance frameworks'];
    case 'ip_management':
      return ['IP basics', 'Portfolio understanding', 'Business strategy'];
    case 'employment':
      return ['HR processes', 'Labor law basics', 'Employee lifecycle'];
    case 'contracts':
      return ['Contract basics', 'Business relationships', 'Legal principles'];
    case 'corporate':
      return ['Corporate structure', 'Transaction basics', 'Due diligence knowledge'];
    default:
      return ['Legal basics', 'Business knowledge'];
  }
}

function getToolStats(tools: any[], groupBy: string): Record<string, number> {
  return tools.reduce((acc: Record<string, number>, tool) => {
    const key = tool[groupBy] || 'Other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}
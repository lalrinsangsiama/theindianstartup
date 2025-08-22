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

    // Check user access to P3
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P3', 'ALL_ACCESS'])
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
    const fundingStage = searchParams.get('stage');
    const search = searchParams.get('search');

    // Build query
    let query = supabase
      .from('p3_tools')
      .select('*')
      .eq('is_active', true)
      .order('usage_count', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (toolType) {
      query = query.eq('tool_type', toolType);
    }

    if (fundingStage) {
      query = query.eq('funding_stage', fundingStage);
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
      .from('p3_tools')
      .select('category, tool_type, funding_stage')
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

    // Get funding stages
    const fundingStages = Array.from(
      new Set(categories?.map(c => c.funding_stage).filter(Boolean))
    );

    // Enhance tools with usage statistics
    const enhancedTools = tools?.map(tool => {
      let features: string[] = [];
      let useCases: string[] = [];
      
      // Add specific features based on tool category
      switch (tool.category) {
        case 'valuation':
          features = [
            'Multiple valuation methodologies',
            'Scenario-based modeling',
            'Comparable company analysis',
            'Risk-adjusted calculations',
            'Export to Excel/PDF'
          ];
          useCases = [
            'Pre-funding valuation estimates',
            'Investor presentation preparation',
            'Term sheet negotiations',
            'Exit planning scenarios'
          ];
          break;

        case 'equity':
          features = [
            'Multi-round cap table modeling',
            'ESOP pool calculations',
            'Dilution impact analysis',
            'Exit waterfall scenarios',
            'Interactive visualizations'
          ];
          useCases = [
            'Fundraising planning',
            'Employee equity grants',
            'Investor negotiations',
            'Exit strategy modeling'
          ];
          break;

        case 'government':
          features = [
            'Real-time scheme database',
            'Eligibility automation',
            'Application progress tracking',
            'ROI calculations',
            'Compliance reminders'
          ];
          useCases = [
            'Grant opportunity discovery',
            'Application preparation',
            'Compliance management',
            'Cost-benefit analysis'
          ];
          break;

        case 'debt':
          features = [
            'Multi-lender comparison',
            'Cash flow impact modeling',
            'Debt capacity analysis',
            'Repayment scheduling',
            'Credit score optimization'
          ];
          useCases = [
            'Working capital planning',
            'Equipment financing',
            'Growth capital decisions',
            'Debt restructuring'
          ];
          break;

        default:
          features = [
            'Real-time calculations',
            'Export capabilities',
            'Scenario modeling',
            'Integration ready',
            'Professional reporting'
          ];
          useCases = [
            'Strategic planning',
            'Investment decisions',
            'Investor communications',
            'Performance tracking'
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
      fundingStages,
      totalCount: enhancedTools.length,
      stats: {
        byCategory: getToolStats(enhancedTools, 'category'),
        byStage: getToolStats(enhancedTools, 'funding_stage'),
        byType: getToolStats(enhancedTools, 'tool_type')
      }
    });

  } catch (error) {
    console.error('Error fetching P3 tools:', error);
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

    // Check user access to P3
    const { data: purchase } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_id', user.id)
      .in('product_code', ['P3', 'ALL_ACCESS'])
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
          .from('p3_tools')
          .update({ 
            usage_count: 'usage_count + 1',
            updated_at: new Date().toISOString()
          })
          .eq('id', toolId);

        if (usageError) throw usageError;

        // Track tool usage event
        const { error: xpError } = await supabase
          .from('p3_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'tool_usage',
            event_id: toolId,
            xp_earned: 15 // Higher XP for financial tools
          });

        if (xpError) throw xpError;

        // Get tool info for response
        const { data: tool } = await supabase
          .from('p3_tools')
          .select('name, url')
          .eq('id', toolId)
          .single();

        return NextResponse.json({ 
          success: true, 
          toolUrl: tool?.url,
          toolName: tool?.name,
          xpEarned: 15
        });

      case 'save_calculation':
        // Save calculation results for future reference
        const { error: saveXpError } = await supabase
          .from('p3_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'calculation_saved',
            event_id: `${toolId}_${Date.now()}`,
            xp_earned: 20 // Higher reward for saving calculations
          });

        if (saveXpError) throw saveXpError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 20,
          message: 'Calculation saved successfully'
        });

      case 'export_results':
        // Track export events for analytics
        const { error: exportError } = await supabase
          .from('p3_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'results_exported',
            event_id: `${toolId}_export`,
            xp_earned: 10
          });

        if (exportError) throw exportError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 10,
          message: 'Results exported successfully'
        });

      case 'share_tool':
        // Track tool sharing for viral growth
        const { error: shareError } = await supabase
          .from('p3_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'tool_shared',
            event_id: `${toolId}_share`,
            xp_earned: 5
          });

        if (shareError) throw shareError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 5,
          message: 'Tool shared successfully'
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing P3 tool request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function getDifficultyLevel(toolType: string): 'Beginner' | 'Intermediate' | 'Advanced' {
  const advancedTypes = ['analyzer', 'simulator'];
  const intermediateTypes = ['calculator', 'optimizer'];
  
  if (advancedTypes.includes(toolType)) return 'Advanced';
  if (intermediateTypes.includes(toolType)) return 'Intermediate';
  return 'Beginner';
}

function getPrerequisites(category: string): string[] {
  switch (category) {
    case 'valuation':
      return ['Basic financial knowledge', 'Company financials', 'Market research'];
    case 'equity':
      return ['Cap table basics', 'Funding rounds understanding', 'Shareholder structure'];
    case 'government':
      return ['Business registration', 'Company details', 'Project requirements'];
    case 'debt':
      return ['Financial statements', 'Cash flow data', 'Asset information'];
    case 'due_diligence':
      return ['Company documentation', 'Financial records', 'Legal structure'];
    case 'planning':
      return ['Business plan', 'Financial projections', 'Market analysis'];
    default:
      return ['Basic business knowledge', 'Company information'];
  }
}

function getToolStats(tools: any[], groupBy: string): Record<string, number> {
  return tools.reduce((acc: Record<string, number>, tool) => {
    const key = tool[groupBy] || 'Other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}
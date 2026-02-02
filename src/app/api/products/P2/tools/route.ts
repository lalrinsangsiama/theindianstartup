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

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');

    // Build query for P2 tools
    let query = supabase
      .from('p2_tools')
      .select('*')
      .eq('is_active', true)
      .order('usage_count', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    if (type) {
      query = query.eq('tool_type', type);
    }

    const { data: tools, error } = await query;

    if (error) {
      throw error;
    }

    // Get tool categories and types for filtering
    const { data: allTools } = await supabase
      .from('p2_tools')
      .select('category, tool_type')
      .eq('is_active', true);

    const categories = Array.from(new Set(allTools?.map(t => t.category)));
    const types = Array.from(new Set(allTools?.map(t => t.tool_type)));

    // Enhance tools with usage statistics and descriptions
    const enhancedTools = tools?.map(tool => {
      let enhancedDescription = tool.description;
      let features: string[] = [];
      let useCases: string[] = [];

      // Add specific details based on tool type
      switch (tool.id) {
        case 'tool-structure-selector':
          features = [
            '15-question AI assessment',
            'Personalized recommendations',
            'Cost-benefit analysis',
            'Risk assessment matrix',
            'Future scalability planning'
          ];
          useCases = [
            'First-time entrepreneurs',
            'Structure conversion planning',
            'Investment readiness',
            'Tax optimization'
          ];
          break;

        case 'tool-compliance-cost':
          features = [
            'Multi-year cost projection',
            'State-wise compliance variations',
            'Professional fee estimates',
            'Penalty cost calculator',
            'ROI analysis for compliance investment'
          ];
          useCases = [
            'Budget planning',
            'Structure comparison',
            'Compliance outsourcing decisions',
            'Annual planning'
          ];
          break;

        case 'tool-equity-dilution':
          features = [
            'Multi-round funding modeling',
            'ESOP impact calculation',
            'Valuation tracking',
            'Founder dilution analysis',
            'Exit scenario planning'
          ];
          useCases = [
            'Fundraising planning',
            'ESOP structuring',
            'Co-founder equity splits',
            'Exit strategy planning'
          ];
          break;

        case 'tool-gst-calculator':
          features = [
            'Multi-state GST calculation',
            'ITC optimization suggestions',
            'Return filing estimates',
            'Penalty calculations',
            'Refund processing tracker'
          ];
          useCases = [
            'Monthly GST planning',
            'ITC optimization',
            'Pricing strategy',
            'Compliance cost estimation'
          ];
          break;

        case 'tool-penalty-calculator':
          features = [
            'Multi-compliance penalty calculator',
            'Late fee computation',
            'Interest calculations',
            'Waiver eligibility check',
            'Payment plan suggestions'
          ];
          useCases = [
            'Compliance planning',
            'Risk assessment',
            'Cost-benefit analysis',
            'Penalty mitigation'
          ];
          break;

        case 'tool-license-analyzer':
          features = [
            'Industry-specific license mapping',
            'State and central requirements',
            'Timeline estimation',
            'Cost breakdown',
            'Renewal tracking'
          ];
          useCases = [
            'Business planning',
            'Location selection',
            'Compliance roadmap',
            'Industry entry planning'
          ];
          break;

        case 'tool-document-generator':
          features = [
            'AI-powered document creation',
            'Legal clause customization',
            'Template library access',
            'Version control',
            'Lawyer review integration'
          ];
          useCases = [
            'Contract creation',
            'Agreement drafting',
            'Policy development',
            'Legal documentation'
          ];
          break;

        case 'tool-compliance-tracker':
          features = [
            'Automated deadline tracking',
            'Multi-entity management',
            'Notification system',
            'Filing status tracking',
            'Professional integration'
          ];
          useCases = [
            'Compliance management',
            'Deadline tracking',
            'Multi-entity operations',
            'Professional coordination'
          ];
          break;
      }

      return {
        ...tool,
        features,
        useCases,
        estimatedTime: getEstimatedTime(tool.type),
        difficulty: getDifficultyLevel(tool.id),
        prerequisites: getPrerequisites(tool.id)
      };
    }) || [];

    return NextResponse.json({
      tools: enhancedTools,
      categories,
      types,
      totalTools: enhancedTools.length
    });

  } catch (error) {
    console.error('Error fetching P2 tools:', error);
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

    // Check user access to P2
    const { data: purchase } = await supabase
      .from('Purchase')
      .select('*')
      .eq('userId', user.id)
      .in('productCode', ['P2', 'ALL_ACCESS'])
      .eq('status', 'completed')
      .gt('expiresAt', new Date().toISOString())
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    const body = await request.json();
    const { action, toolId, data } = body;

    switch (action) {
      case 'use_tool':
        // Increment tool usage count
        const { error: usageError } = await supabase
          .from('p2_tools')
          .update({ 
            usage_count: 'usage_count + 1',
            updated_at: new Date().toISOString()
          })
          .eq('id', toolId);

        if (usageError) throw usageError;

        // Track tool usage event
        const { error: xpError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'tool_used',
            event_id: toolId,
            xp_earned: 10 // XP reward for using tools
          });

        if (xpError) throw xpError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 10
        });

      case 'save_calculation':
        // Save tool calculation results (implement user_calculations table if needed)
        const calculationData = {
          user_id: user.id,
          tool_id: toolId,
          input_data: data.inputs,
          output_data: data.outputs,
          calculation_date: new Date().toISOString(),
          notes: data.notes || null
        };

        // For now, just award XP for saving calculations
        const { error: saveXpError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'calculation_saved',
            event_id: `${toolId}_${Date.now()}`,
            xp_earned: 15
          });

        if (saveXpError) throw saveXpError;

        return NextResponse.json({ 
          success: true,
          xpEarned: 15
        });

      case 'request_consultation':
        // Handle consultation request based on tool results
        const consultationData = {
          user_id: user.id,
          tool_id: toolId,
          consultation_type: data.consultationType,
          message: data.message,
          tool_results: data.toolResults,
          priority: data.priority || 'normal',
          created_at: new Date().toISOString()
        };

        // For now, just track the event
        const { error: consultationError } = await supabase
          .from('p2_xp_events')
          .insert({
            user_id: user.id,
            event_type: 'consultation_requested',
            event_id: `${toolId}_consultation`,
            xp_earned: 0
          });

        if (consultationError) throw consultationError;

        return NextResponse.json({ 
          success: true,
          message: 'Consultation request submitted. Our experts will contact you within 24 hours.'
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

  } catch (error) {
    console.error('Error processing P2 tool request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function getEstimatedTime(toolType: string): string {
  switch (toolType) {
    case 'calculator': return '10-15 minutes';
    case 'analyzer': return '15-30 minutes';
    case 'generator': return '20-45 minutes';
    case 'tracker': return '5-10 minutes setup';
    default: return '10-20 minutes';
  }
}

function getDifficultyLevel(toolId: string): 'Beginner' | 'Intermediate' | 'Advanced' {
  const advancedTools = ['tool-equity-dilution', 'tool-document-generator'];
  const intermediateTools = ['tool-compliance-cost', 'tool-license-analyzer', 'tool-compliance-tracker'];
  
  if (advancedTools.includes(toolId)) return 'Advanced';
  if (intermediateTools.includes(toolId)) return 'Intermediate';
  return 'Beginner';
}

function getPrerequisites(toolId: string): string[] {
  switch (toolId) {
    case 'tool-structure-selector':
      return ['Basic business idea', 'Understanding of business goals'];
    case 'tool-compliance-cost':
      return ['Business structure decision', 'Location finalization'];
    case 'tool-equity-dilution':
      return ['Cap table basics', 'Funding requirements'];
    case 'tool-gst-calculator':
      return ['GST registration', 'Business transactions data'];
    case 'tool-penalty-calculator':
      return ['Compliance requirements knowledge', 'Filing deadlines'];
    case 'tool-license-analyzer':
      return ['Business activity definition', 'Location details'];
    case 'tool-document-generator':
      return ['Legal requirements understanding', 'Business details'];
    case 'tool-compliance-tracker':
      return ['Business registration', 'Compliance calendar'];
    default:
      return ['Basic business knowledge'];
  }
}
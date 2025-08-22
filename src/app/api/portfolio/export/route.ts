import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface ExportData {
  portfolio: any;
  sections: any[];
  activities: any[];
  exportType: 'pdf' | 'one_pager' | 'pitch_deck' | 'business_model_canvas';
  format: 'html' | 'json' | 'markdown';
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { exportType, format = 'html' } = await request.json();

    if (!exportType) {
      return NextResponse.json(
        { error: 'Export type is required' },
        { status: 400 }
      );
    }

    // Get user's portfolio data
    const { data: portfolio } = await supabase
      .from('StartupPortfolio')
      .select('*')
      .eq('userId', user.id)
      .single();

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }

    // Get portfolio sections
    const { data: sections } = await supabase
      .from('PortfolioSection')
      .select('*')
      .eq('isActive', true)
      .order('order');

    // Get user's activities
    const { data: activities } = await supabase
      .from('PortfolioActivity')
      .select(`
        *,
        activityType:ActivityType(*)
      `)
      .eq('userId', user.id)
      .eq('portfolioId', portfolio.id)
      .eq('isLatest', true)
      .eq('status', 'completed');

    // Generate export based on type
    const exportData: ExportData = {
      portfolio,
      sections: sections || [],
      activities: activities || [],
      exportType,
      format
    };

    switch (exportType) {
      case 'one_pager':
        return generateOnePager(exportData);
      case 'pitch_deck':
        return generatePitchDeck(exportData);
      case 'business_model_canvas':
        return generateBusinessModelCanvas(exportData);
      case 'pdf':
        return generatePDFSummary(exportData);
      default:
        return NextResponse.json(
          { error: 'Invalid export type' },
          { status: 400 }
        );
    }

  } catch (error) {
    logger.error('Export API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateOnePager(data: ExportData) {
  const { portfolio, activities } = data;
  
  // Create a comprehensive one-pager
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${portfolio.startupName || 'Startup'} - One Pager</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #333; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: bold; color: #000; margin-bottom: 10px; border-left: 4px solid #000; padding-left: 12px; }
        .content { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .highlight { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        @media print { body { padding: 20px; } .section { break-inside: avoid; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${portfolio.startupName || 'Your Startup'}</h1>
        ${portfolio.tagline ? `<p style="font-size: 18px; color: #666;">${portfolio.tagline}</p>` : ''}
      </div>

      ${generateSectionContent(activities, 'executive_summary', 'Executive Summary')}
      ${generateSectionContent(activities, 'problem_solution', 'Problem & Solution')}
      ${generateSectionContent(activities, 'market_research', 'Market Opportunity')}
      ${generateSectionContent(activities, 'business_model', 'Business Model')}
      ${generateSectionContent(activities, 'product_development', 'Product')}
      ${generateSectionContent(activities, 'go_to_market', 'Go-to-Market')}
      ${generateSectionContent(activities, 'financial_projections', 'Financials')}

      <div class="section">
        <div class="highlight">
          <h3>Ready to Transform India's Startup Ecosystem</h3>
          <p>Contact us to learn more about this opportunity.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return NextResponse.json({
    exportType: 'one_pager',
    format: 'html',
    content: html,
    filename: `${portfolio.startupName || 'startup'}_one_pager.html`,
    generatedAt: new Date().toISOString()
  });
}

async function generatePitchDeck(data: ExportData) {
  const { portfolio, activities } = data;
  
  // Create HTML pitch deck
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${portfolio.startupName || 'Startup'} - Pitch Deck</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; background: #000; color: #fff; }
        .slide { min-height: 100vh; padding: 60px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; page-break-after: always; }
        .slide:nth-child(odd) { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .slide:nth-child(even) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        h1 { font-size: 4rem; margin-bottom: 2rem; font-weight: 300; }
        h2 { font-size: 3rem; margin-bottom: 1.5rem; font-weight: 400; }
        .content { max-width: 800px; font-size: 1.5rem; line-height: 1.6; }
        .highlight { font-size: 2rem; font-weight: bold; margin: 2rem 0; }
        @media print { .slide { min-height: auto; } }
      </style>
    </head>
    <body>
      <div class="slide">
        <h1>${portfolio.startupName || 'Your Startup'}</h1>
        ${portfolio.tagline ? `<p class="highlight">${portfolio.tagline}</p>` : ''}
        <p>Transforming India's Business Landscape</p>
      </div>

      <div class="slide">
        <h2>The Problem</h2>
        <div class="content">
          ${getActivityContent(activities, 'define_problem_statement') || 'Problem statement not yet defined in portfolio.'}
        </div>
      </div>

      <div class="slide">
        <h2>Our Solution</h2>
        <div class="content">
          ${getActivityContent(activities, 'solution_design') || 'Solution not yet defined in portfolio.'}
        </div>
      </div>

      <div class="slide">
        <h2>Market Opportunity</h2>
        <div class="content">
          ${getActivityContent(activities, 'market_sizing') || 'Market analysis not yet completed in portfolio.'}
        </div>
      </div>

      <div class="slide">
        <h2>Business Model</h2>
        <div class="content">
          ${getActivityContent(activities, 'revenue_model_design') || 'Business model not yet defined in portfolio.'}
        </div>
      </div>

      <div class="slide">
        <h2>Financial Projections</h2>
        <div class="content">
          ${getActivityContent(activities, 'financial_modeling') || 'Financial projections not yet completed in portfolio.'}
        </div>
      </div>

      <div class="slide">
        <h2>Ask & Next Steps</h2>
        <div class="content">
          <p>Ready to revolutionize the market together.</p>
          ${getActivityContent(activities, 'funding_requirements') || 'Funding requirements not yet defined in portfolio.'}
        </div>
      </div>
    </body>
    </html>
  `;

  return NextResponse.json({
    exportType: 'pitch_deck',
    format: 'html',
    content: html,
    filename: `${portfolio.startupName || 'startup'}_pitch_deck.html`,
    generatedAt: new Date().toISOString()
  });
}

async function generateBusinessModelCanvas(data: ExportData) {
  const { portfolio, activities } = data;
  
  // Create Business Model Canvas
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${portfolio.startupName || 'Startup'} - Business Model Canvas</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .canvas { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; grid-template-rows: auto auto auto; gap: 10px; max-width: 1200px; margin: 0 auto; }
        .box { background: white; border: 2px solid #333; padding: 15px; min-height: 150px; }
        .box h3 { margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; font-weight: bold; }
        .key-partners { grid-column: 1; grid-row: 1/3; background: #e3f2fd; }
        .key-activities { grid-column: 2; grid-row: 1; background: #f3e5f5; }
        .value-propositions { grid-column: 3; grid-row: 1/3; background: #fff3e0; }
        .customer-relationships { grid-column: 4; grid-row: 1; background: #e8f5e8; }
        .customer-segments { grid-column: 5; grid-row: 1/3; background: #fce4ec; }
        .key-resources { grid-column: 2; grid-row: 2; background: #f3e5f5; }
        .channels { grid-column: 4; grid-row: 2; background: #e8f5e8; }
        .cost-structure { grid-column: 1/3; grid-row: 3; background: #ffebee; }
        .revenue-streams { grid-column: 3/6; grid-row: 3; background: #e0f2f1; }
        .title { grid-column: 1/6; text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        .content { font-size: 12px; line-height: 1.4; }
      </style>
    </head>
    <body>
      <div class="canvas">
        <div class="title">${portfolio.startupName || 'Business Model Canvas'}</div>
        
        <div class="box key-partners">
          <h3>Key Partners</h3>
          <div class="content">
            ${getActivityContent(activities, 'team_structure_planning') || 'Partners not yet defined'}
          </div>
        </div>
        
        <div class="box key-activities">
          <h3>Key Activities</h3>
          <div class="content">
            ${getActivityContent(activities, 'product_roadmap') || 'Key activities not yet defined'}
          </div>
        </div>
        
        <div class="box value-propositions">
          <h3>Value Propositions</h3>
          <div class="content">
            ${getActivityContent(activities, 'value_proposition_canvas') || 'Value proposition not yet defined'}
          </div>
        </div>
        
        <div class="box customer-relationships">
          <h3>Customer Relationships</h3>
          <div class="content">
            ${getActivityContent(activities, 'sales_process_design') || 'Customer relationships not yet defined'}
          </div>
        </div>
        
        <div class="box customer-segments">
          <h3>Customer Segments</h3>
          <div class="content">
            ${getActivityContent(activities, 'customer_persona_development') || 'Customer segments not yet defined'}
          </div>
        </div>
        
        <div class="box key-resources">
          <h3>Key Resources</h3>
          <div class="content">
            ${getActivityContent(activities, 'feature_prioritization') || 'Key resources not yet defined'}
          </div>
        </div>
        
        <div class="box channels">
          <h3>Channels</h3>
          <div class="content">
            ${getActivityContent(activities, 'marketing_strategy') || 'Channels not yet defined'}
          </div>
        </div>
        
        <div class="box cost-structure">
          <h3>Cost Structure</h3>
          <div class="content">
            ${getActivityContent(activities, 'financial_modeling') || 'Cost structure not yet defined'}
          </div>
        </div>
        
        <div class="box revenue-streams">
          <h3>Revenue Streams</h3>
          <div class="content">
            ${getActivityContent(activities, 'revenue_model_design') || 'Revenue streams not yet defined'}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return NextResponse.json({
    exportType: 'business_model_canvas',
    format: 'html',
    content: html,
    filename: `${portfolio.startupName || 'startup'}_business_model_canvas.html`,
    generatedAt: new Date().toISOString()
  });
}

async function generatePDFSummary(data: ExportData) {
  // For now, return HTML that can be converted to PDF
  const onePager = await generateOnePager(data);
  const responseData = await onePager.json();
  
  return NextResponse.json({
    ...responseData,
    exportType: 'pdf',
    note: 'This HTML can be converted to PDF using browser print functionality or a PDF generation service'
  });
}

function generateSectionContent(activities: any[], sectionName: string, title: string): string {
  const sectionActivities = activities.filter(a => 
    a.activityType?.portfolioSection === sectionName
  );

  if (sectionActivities.length === 0) {
    return `
      <div class="section">
        <div class="section-title">${title}</div>
        <div class="content">
          <p><em>This section will be populated as you complete activities in our courses.</em></p>
        </div>
      </div>
    `;
  }

  const content = sectionActivities.map(activity => {
    const data = typeof activity.data === 'string' ? activity.data : JSON.stringify(activity.data);
    return `<p><strong>${activity.activityType.name}:</strong> ${data.substring(0, 200)}${data.length > 200 ? '...' : ''}</p>`;
  }).join('');

  return `
    <div class="section">
      <div class="section-title">${title}</div>
      <div class="content">
        ${content}
      </div>
    </div>
  `;
}

function getActivityContent(activities: any[], activityTypeId: string): string {
  const activity = activities.find(a => a.activityType?.id === activityTypeId);
  
  if (!activity) {
    return '';
  }

  if (typeof activity.data === 'string') {
    return activity.data;
  }

  if (typeof activity.data === 'object') {
    // Extract meaningful content from structured data
    if (activity.data.problem) return activity.data.problem;
    if (activity.data.solution) return activity.data.solution;
    if (activity.data.pitch) return activity.data.pitch;
    if (activity.data.mission) return activity.data.mission;
    
    return JSON.stringify(activity.data, null, 2);
  }

  return String(activity.data);
}
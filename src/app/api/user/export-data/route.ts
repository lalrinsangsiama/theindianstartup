import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
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

    // Get user profile with all related data
    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('*, StartupPortfolio(*), DailyProgress(*), XPEvent(*)')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError || !userProfile) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    // Generate HTML content that looks good when printed as PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>The Indian Startup - Journey Report</title>
  <meta charset="UTF-8">
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    
    h1 {
      color: #000;
      border-bottom: 3px solid #000;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    
    h2 {
      color: #333;
      margin-top: 30px;
      margin-bottom: 15px;
      padding: 10px;
      background: #f5f5f5;
      border-left: 4px solid #000;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }
    
    .section {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 20px 0;
    }
    
    .stat-card {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    
    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #000;
      margin-top: 5px;
    }
    
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    
    .info-label {
      font-weight: 600;
      color: #666;
    }
    
    .info-value {
      color: #333;
    }
    
    .badge-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }
    
    .badge {
      background: #000;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
    }
    
    .progress-bar {
      width: 100%;
      height: 20px;
      background: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
      margin: 10px 0;
    }
    
    .progress-fill {
      height: 100%;
      background: #000;
      transition: width 0.3s;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #eee;
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    
    .highlight {
      background: #fffacd;
      padding: 2px 4px;
      border-radius: 3px;
    }
    
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>The Indian Startup - Journey Report</h1>
      <p>Generated on ${new Date().toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</p>
    </div>
  </div>

  <div class="section">
    <h2>👤 Personal Information</h2>
    <div class="info-row">
      <span class="info-label">Full Name</span>
      <span class="info-value">${userProfile.name || 'Not provided'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Email</span>
      <span class="info-value">${userProfile.email}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Phone</span>
      <span class="info-value">${userProfile.phone || 'Not provided'}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Member Since</span>
      <span class="info-value">${new Date(userProfile.createdAt).toLocaleDateString('en-IN')}</span>
    </div>
    ${userProfile.bio ? `
    <div class="info-row">
      <span class="info-label">Bio</span>
      <span class="info-value">${userProfile.bio}</span>
    </div>
    ` : ''}
  </div>

  <div class="section">
    <h2>📊 Journey Statistics</h2>
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">Current Progress</div>
        <div class="stat-value">Day ${userProfile.currentDay || 1}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${((userProfile.currentDay || 1) / 30) * 100}%"></div>
        </div>
        <small>${Math.round(((userProfile.currentDay || 1) / 30) * 100)}% Complete</small>
      </div>
      
      <div class="stat-card">
        <div class="stat-label">Total XP Earned</div>
        <div class="stat-value">${userProfile.totalXP || 0}</div>
        <small>Level ${Math.floor((userProfile.totalXP || 0) / 100) + 1}</small>
      </div>
      
      <div class="stat-card">
        <div class="stat-label">Current Streak</div>
        <div class="stat-value">${userProfile.currentStreak || 0} days</div>
        <small>Longest: ${userProfile.longestStreak || 0} days</small>
      </div>
      
      <div class="stat-card">
        <div class="stat-label">Badges Earned</div>
        <div class="stat-value">${userProfile.badges?.length || 0}</div>
        ${userProfile.badges && userProfile.badges.length > 0 ? `
          <div class="badge-list">
            ${userProfile.badges.slice(0, 5).map((badge: string) => `<span class="badge">${badge}</span>`).join('')}
            ${userProfile.badges.length > 5 ? `<span class="badge">+${userProfile.badges.length - 5} more</span>` : ''}
          </div>
        ` : ''}
      </div>
    </div>
  </div>

  ${userProfile.StartupPortfolio?.[0] ? `
  <div class="section">
    <h2>🚀 Startup Information</h2>
    <div class="info-row">
      <span class="info-label">Startup Name</span>
      <span class="info-value">${userProfile.StartupPortfolio[0].startupName || 'Not set'}</span>
    </div>
    ${userProfile.StartupPortfolio[0].tagline ? `
    <div class="info-row">
      <span class="info-label">Tagline</span>
      <span class="info-value">${userProfile.StartupPortfolio[0].tagline}</span>
    </div>
    ` : ''}
    ${userProfile.StartupPortfolio[0].problemStatement ? `
    <div class="info-row">
      <span class="info-label">Problem Statement</span>
      <span class="info-value">${userProfile.StartupPortfolio[0].problemStatement}</span>
    </div>
    ` : ''}
    ${userProfile.StartupPortfolio[0].solution ? `
    <div class="info-row">
      <span class="info-label">Solution</span>
      <span class="info-value">${userProfile.StartupPortfolio[0].solution}</span>
    </div>
    ` : ''}
    ${userProfile.StartupPortfolio[0].targetMarket?.description ? `
    <div class="info-row">
      <span class="info-label">Target Market</span>
      <span class="info-value">${userProfile.StartupPortfolio[0].targetMarket.description}</span>
    </div>
    ` : ''}
  </div>
  ` : ''}

  ${userProfile.DailyProgress && userProfile.DailyProgress.length > 0 ? `
  <div class="section">
    <h2>📅 Recent Progress</h2>
    <p>Completed ${userProfile.DailyProgress.filter((p: any) => p.completedAt).length} out of ${userProfile.DailyProgress.length} started lessons</p>
    <div style="margin-top: 15px;">
      ${userProfile.DailyProgress.slice(-5).reverse().map((progress: any) => `
        <div class="info-row">
          <span class="info-label">Day ${progress.day}</span>
          <span class="info-value">
            ${progress.completedAt ? `✅ Completed on ${new Date(progress.completedAt).toLocaleDateString('en-IN')}` : '⏳ In Progress'}
            ${progress.xpEarned > 0 ? `<span class="highlight">+${progress.xpEarned} XP</span>` : ''}
          </span>
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}

  <div class="footer">
    <p><strong>The Indian Startup</strong></p>
    <p>Your 30-Day Journey to Launch</p>
    <p>support@theindianstartup.in | theindianstartup.in</p>
    <p style="margin-top: 20px; font-size: 10px;">
      This report contains your personal data as of ${new Date().toLocaleString('en-IN')}. 
      Keep this document secure and do not share it publicly.
    </p>
  </div>
</body>
</html>
    `;

    // Return HTML with appropriate headers for download
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="theindianstartup-report-${new Date().toISOString().split('T')[0]}.html"`,
      },
    });
  } catch (error) {
    logger.error('Export data error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
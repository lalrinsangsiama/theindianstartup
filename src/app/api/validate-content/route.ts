import { NextResponse } from 'next/server';
import { parseEnhancedContent } from '@/lib/content-parser';

export const dynamic = 'force-dynamic';

export async function GET() {
  const results = [];
  
  // Process days in smaller batches to reduce memory usage
  const batchSize = 10;
  for (let batch = 0; batch < 3; batch++) {
    const startDay = batch * batchSize + 1;
    const endDay = Math.min(startDay + batchSize - 1, 30);
    
    for (let day = startDay; day <= endDay; day++) {
      try {
        const content = parseEnhancedContent(day);
        results.push({
          day,
          status: 'success',
          title: content.title,
          briefLength: content.briefContent.length,
          tasksCount: content.tasks.length,
          resourcesCount: content.resources.length,
          estimatedTime: content.estimatedTime,
          focus: content.focus ? 'Yes' : 'No',
          successMetrics: content.successMetrics.length,
          taskBreakdown: {
            preWork: content.tasks.filter(t => t.category === 'pre-work').length,
            core: content.tasks.filter(t => t.category === 'core').length,
            bonus: content.tasks.filter(t => t.category === 'bonus').length
          },
          detailedContent: content.tasks.filter(t => t.detailedContent).length
        });
      } catch (error) {
        results.push({
          day,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    // Small delay between batches to prevent overwhelming the system
    if (batch < 2) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  const summary = {
    totalDays: 30,
    successfulDays: results.filter(r => r.status === 'success').length,
    errorDays: results.filter(r => r.status === 'error').length,
    totalTasks: results.reduce((sum, r) => sum + (r.tasksCount || 0), 0),
    averageTasksPerDay: results.reduce((sum, r) => sum + (r.tasksCount || 0), 0) / 30,
    daysWithDetailedContent: results.filter(r => r.detailedContent && r.detailedContent > 0).length
  };
  
  return NextResponse.json({
    summary,
    details: results
  });
}
import * as fs from 'fs';
import * as path from 'path';

interface DayContent {
  day: number;
  title: string;
  objective: string;
  actionItems: Array<{
    id: string;
    title: string;
    description: string;
    xp: number;
  }>;
  resources: Array<{
    title: string;
    type: string;
    url: string;
  }>;
  deliverables: string[];
}

export function parse30DayContent(): DayContent[] {
  const contentPath = path.join(process.cwd(), '30daycontent.md');
  const content = fs.readFileSync(contentPath, 'utf-8');
  
  // Split content by days
  const dayRegex = /Day (\d+):\s*([^\n]+)/g;
  const days: DayContent[] = [];
  
  let match;
  let lastIndex = 0;
  
  while ((match = dayRegex.exec(content)) !== null) {
    const dayNumber = parseInt(match[1]);
    const dayTitle = match[2].trim();
    const startIndex = match.index;
    
    // Extract content for previous day if exists
    if (lastIndex > 0 && days.length > 0) {
      const previousDayContent = content.substring(lastIndex, startIndex);
      parseDayContent(days[days.length - 1], previousDayContent);
    }
    
    days.push({
      day: dayNumber,
      title: dayTitle,
      objective: '',
      actionItems: [],
      resources: [],
      deliverables: [],
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Parse content for the last day
  if (days.length > 0) {
    const lastDayContent = content.substring(lastIndex);
    parseDayContent(days[days.length - 1], lastDayContent);
  }
  
  return days;
}

function parseDayContent(day: DayContent, content: string) {
  // Extract objective
  const objectiveMatch = content.match(/Objective[^:]*:\s*([^Action]*)/i);
  if (objectiveMatch) {
    day.objective = objectiveMatch[1].trim().replace(/\n/g, ' ');
  }
  
  // Extract action items
  const actionItemsMatch = content.match(/Action Items:([\s\S]*?)(?:Resources|Deliverables|$)/i);
  if (actionItemsMatch) {
    const actionItemsText = actionItemsMatch[1];
    const items = actionItemsText.split(/•|–/).filter(item => item.trim());
    
    day.actionItems = items.map((item, index) => {
      const lines = item.trim().split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/^[\d.]+\s*/, '').replace(/:.*/, '').trim() || '';
      const description = lines.slice(1).join(' ').trim();
      
      return {
        id: `day${day.day}-task${index + 1}`,
        title: title.substring(0, 100), // Limit title length
        description: description || title,
        xp: calculateXP(title, description),
      };
    });
  }
  
  // Extract resources
  const resourcesMatch = content.match(/Resources[^:]*:([\s\S]*?)(?:Deliverables|$)/i);
  if (resourcesMatch) {
    const resourcesText = resourcesMatch[1];
    const items = resourcesText.split(/•|–/).filter(item => item.trim());
    
    day.resources = items.map((item) => {
      const text = item.trim();
      const urlMatch = text.match(/\((https?:\/\/[^\)]+)\)/);
      const url = urlMatch ? urlMatch[1] : '#';
      const title = text.replace(/\([^\)]+\)/, '').trim();
      
      return {
        title: title.substring(0, 100),
        type: determineResourceType(title, url),
        url: url,
      };
    });
  }
  
  // Extract deliverables
  const deliverablesMatch = content.match(/Deliverables:([\s\S]*?)(?:Day \d+|$)/i);
  if (deliverablesMatch) {
    const deliverablesText = deliverablesMatch[1];
    const items = deliverablesText.split(/•|–/).filter(item => item.trim());
    day.deliverables = items.map(item => item.trim().replace(/^[\d.]+\s*/, ''));
  }
}

function calculateXP(title: string, description: string): number {
  // Base XP based on task complexity
  let xp = 15;
  
  // Add XP for specific keywords
  const complexTasks = ['research', 'analysis', 'create', 'design', 'implement', 'develop'];
  const simpleTask = ['read', 'review', 'check', 'list'];
  
  const taskText = (title + ' ' + description).toLowerCase();
  
  if (complexTasks.some(task => taskText.includes(task))) {
    xp += 10;
  }
  
  if (taskText.includes('template') || taskText.includes('document')) {
    xp += 5;
  }
  
  if (simpleTask.some(task => taskText.includes(task))) {
    xp -= 5;
  }
  
  return Math.max(10, Math.min(50, xp)); // Ensure XP is between 10 and 50
}

function determineResourceType(title: string, url: string): string {
  const lowerTitle = title.toLowerCase();
  const lowerUrl = url.toLowerCase();
  
  if (lowerTitle.includes('template')) return 'template';
  if (lowerTitle.includes('guide') || lowerTitle.includes('playbook')) return 'guide';
  if (lowerTitle.includes('tool') || lowerTitle.includes('calculator')) return 'tool';
  if (lowerUrl.includes('youtube') || lowerUrl.includes('video')) return 'video';
  if (lowerUrl.includes('gov.in') || lowerUrl.includes('government')) return 'government';
  if (url.startsWith('http')) return 'external';
  
  return 'document';
}

// Export for use in seed script
export function generateDailyLessonsFromContent() {
  const days = parse30DayContent();
  
  return days.map(day => ({
    day: day.day,
    title: day.title,
    briefContent: day.objective || `Welcome to Day ${day.day}! Today you'll work on ${day.title}.`,
    actionItems: day.actionItems,
    resources: day.resources,
    estimatedTime: day.actionItems.length * 20, // Estimate 20 mins per action item
    xpReward: day.actionItems.reduce((sum, item) => sum + item.xp, 0),
  }));
}
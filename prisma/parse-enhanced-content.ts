import * as fs from 'fs';
import * as path from 'path';

interface Task {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: 'pre-work' | 'core' | 'bonus';
  estimatedTime?: number;
  documentsRequired?: boolean;
  documents?: Array<{
    id: string;
    title: string;
    description: string;
    fileName?: string;
    fileType?: 'document' | 'spreadsheet' | 'presentation' | 'image' | 'pdf';
    folderSuggestion?: string;
  }>;
}

interface Resource {
  title: string;
  type: 'template' | 'guide' | 'tool' | 'video' | 'government' | 'external' | 'document';
  url: string;
  category?: string;
  description?: string;
}

interface EnhancedDayContent {
  day: number;
  title: string;
  briefContent: string;
  estimatedTime: number;
  xpReward: number;
  focus?: string;
  successMetrics?: string[];
  expertTips?: string[];
  reflectionQuestions?: string[];
  actionItems: Task[];
  resources: Resource[];
}

export function parseEnhancedContent(): EnhancedDayContent[] {
  const contentDir = path.join(process.cwd(), 'src/content/30-day-enhanced');
  const days: EnhancedDayContent[] = [];
  
  // Parse each day file (day-01.md to day-30.md)
  for (let dayNum = 1; dayNum <= 30; dayNum++) {
    const dayFile = `day-${dayNum.toString().padStart(2, '0')}.md`;
    const filePath = path.join(contentDir, dayFile);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const dayContent = parseSingleDay(dayNum, content);
      days.push(dayContent);
    } else {
      // Create fallback content if file doesn't exist
      days.push(createFallbackDay(dayNum));
    }
  }
  
  return days;
}

function parseSingleDay(dayNumber: number, content: string): EnhancedDayContent {
  const lines = content.split('\n');
  
  // Extract title from first heading
  const titleMatch = content.match(/^#\s+Day\s+\d+:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : `Day ${dayNumber}`;
  
  // Extract morning brief content - handle both emoji formats
  const briefMatch = content.match(/##\s+(?:🌅\s+Morning Brief|Morning Brief\s*☀️)[\s\S]*?\n([\s\S]*?)(?=##|\n\*\*)/);
  const briefContent = briefMatch ? briefMatch[1].trim() : `Welcome to Day ${dayNumber}!`;
  
  // Extract focus area
  const focusMatch = content.match(/\*\*Today's Focus:\*\*\s*(.+)/);
  const focus = focusMatch ? focusMatch[1].trim() : undefined;
  
  // Extract time commitment
  const timeMatch = content.match(/\*\*Time Commitment:\*\*\s*(.+)/);
  const timeText = timeMatch ? timeMatch[1].trim() : '2-3 hours';
  const estimatedTime = parseTimeCommitment(timeText);
  
  // Extract success metrics
  const successMetrics = extractBulletPoints(content, /\*\*Success Metrics:\*\*/);
  
  // Extract reflection questions
  const reflectionQuestions = extractBulletPoints(content, /### Reflection Questions/);
  
  // Parse action items
  const actionItems = parseActionItems(content, dayNumber);
  
  // Parse resources
  const resources = parseResources(content);
  
  // Calculate total XP
  const xpReward = actionItems.reduce((sum, item) => sum + item.xp, 0);
  
  return {
    day: dayNumber,
    title,
    briefContent: cleanMarkdown(briefContent),
    estimatedTime,
    xpReward,
    focus,
    successMetrics,
    reflectionQuestions,
    actionItems,
    resources,
  };
}

function parseActionItems(content: string, dayNumber: number): Task[] {
  const tasks: Task[] = [];
  
  // Extract pre-work tasks
  const preWorkMatch = content.match(/### Pre-Work[\s\S]*?\n([\s\S]*?)(?=### |## )/);
  if (preWorkMatch) {
    const preWorkTasks = extractChecklistItems(preWorkMatch[1]);
    preWorkTasks.forEach((task, index) => {
      tasks.push({
        id: `day${dayNumber}-prework-${index + 1}`,
        title: task.title,
        description: task.description,
        xp: 5,
        category: 'pre-work',
        estimatedTime: 5,
        documentsRequired: task.title.toLowerCase().includes('folder') || task.title.toLowerCase().includes('document'),
      });
    });
  }
  
  // Extract core tasks
  const coreTasksMatch = content.match(/### Core Tasks[\s\S]*?\n([\s\S]*?)(?=### |## )/);
  if (coreTasksMatch) {
    const coreTasks = extractChecklistItems(coreTasksMatch[1]);
    coreTasks.forEach((task, index) => {
      tasks.push({
        id: `day${dayNumber}-core-${index + 1}`,
        title: task.title,
        description: task.description,
        xp: calculateXP(task.title, task.description),
        category: 'core',
        estimatedTime: estimateTaskTime(task.title, task.description),
        documentsRequired: needsDocuments(task.title, task.description),
      });
    });
  }
  
  // Extract bonus tasks
  const bonusTasksMatch = content.match(/### Bonus Tasks[\s\S]*?\n([\s\S]*?)(?=### |## )/);
  if (bonusTasksMatch) {
    const bonusTasks = extractChecklistItems(bonusTasksMatch[1]);
    bonusTasks.forEach((task, index) => {
      tasks.push({
        id: `day${dayNumber}-bonus-${index + 1}`,
        title: task.title,
        description: task.description,
        xp: Math.floor(calculateXP(task.title, task.description) * 1.5),
        category: 'bonus',
        estimatedTime: estimateTaskTime(task.title, task.description),
        documentsRequired: needsDocuments(task.title, task.description),
      });
    });
  }
  
  // Extract numbered action items
  const actionItemsMatch = content.match(/## 🎯 Action Items([\s\S]*?)(?=## )/);
  if (actionItemsMatch) {
    const numberedTasks = extractNumberedActionItems(actionItemsMatch[1], dayNumber);
    tasks.push(...numberedTasks);
  }
  
  return tasks;
}

function extractChecklistItems(text: string): Array<{title: string, description: string}> {
  const items: Array<{title: string, description: string}> = [];
  const lines = text.split('\n').filter(line => line.trim().startsWith('- [ ]'));
  
  lines.forEach(line => {
    const cleanLine = line.replace(/^- \[ \]\s*/, '').trim();
    if (cleanLine) {
      // Split title and description if there's additional context
      const parts = cleanLine.split(/[:(]/).map(p => p.trim());
      const title = parts[0] || cleanLine;
      const description = parts.slice(1).join(' ').replace(/\)$/, '') || title;
      
      items.push({
        title: title.substring(0, 100),
        description: description.substring(0, 300),
      });
    }
  });
  
  return items;
}

function extractNumberedActionItems(text: string, dayNumber: number): Task[] {
  const tasks: Task[] = [];
  const sections = text.split(/### \d+\.\s+/).filter(section => section.trim());
  
  sections.forEach((section, index) => {
    const lines = section.split('\n');
    const titleLine = lines[0]?.match(/(.+?)(?:\s*\((\d+)\s*mins?\))?$/);
    const title = titleLine ? titleLine[1].trim() : `Action Item ${index + 1}`;
    const timeMatch = titleLine && titleLine[2] ? parseInt(titleLine[2]) : null;
    
    // Extract description from the section content
    const descriptionLines = lines.slice(1).filter(line => 
      line.trim() && 
      !line.startsWith('#') && 
      !line.startsWith('```') &&
      !line.startsWith('- [ ]')
    );
    const description = descriptionLines.slice(0, 3).join(' ').trim() || title;
    
    tasks.push({
      id: `day${dayNumber}-action-${index + 1}`,
      title: title.substring(0, 100),
      description: cleanMarkdown(description).substring(0, 300),
      xp: calculateXP(title, description),
      category: 'core',
      estimatedTime: timeMatch || estimateTaskTime(title, description),
      documentsRequired: needsDocuments(title, description),
      documents: extractDocumentRequirements(section),
    });
  });
  
  return tasks;
}

function extractDocumentRequirements(text: string): Array<{
  id: string;
  title: string;
  description: string;
  fileName?: string;
  fileType?: 'document' | 'spreadsheet' | 'presentation' | 'image' | 'pdf';
  folderSuggestion?: string;
}> {
  const documents: any[] = [];
  
  // Look for template, canvas, worksheet mentions
  const templateMatches = text.match(/(?:template|canvas|worksheet|document)s?[^.]*?(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi);
  
  if (templateMatches) {
    templateMatches.forEach((match, index) => {
      documents.push({
        id: `doc-${Date.now()}-${index}`,
        title: match.trim(),
        description: `Document created for: ${match.trim()}`,
        fileType: determineFileType(match),
        folderSuggestion: '01-Foundation/Business Planning/',
      });
    });
  }
  
  return documents;
}

function parseResources(content: string): Resource[] {
  const resources: Resource[] = [];
  
  // Extract resources section
  const resourcesMatch = content.match(/## 📚 Resources & Tools([\s\S]*?)(?=## |$)/);
  if (!resourcesMatch) return resources;
  
  const resourcesText = resourcesMatch[1];
  
  // Extract different resource categories
  const categories = [
    { name: 'Essential Reading', type: 'document' },
    { name: 'Market Research Tools', type: 'tool' },
    { name: 'Templates & Downloads', type: 'template' },
    { name: 'Government Resources', type: 'government' },
    { name: 'Video Tutorials', type: 'video' },
  ];
  
  categories.forEach(category => {
    const categoryMatch = resourcesText.match(new RegExp(`### ${category.name}([\\s\\S]*?)(?=### |## |$)`));
    if (categoryMatch) {
      const items = extractResourceItems(categoryMatch[1]);
      items.forEach(item => {
        resources.push({
          ...item,
          type: category.type as any,
          category: category.name,
        });
      });
    }
  });
  
  return resources;
}

function extractResourceItems(text: string): Array<{title: string, url: string, description?: string}> {
  const items: Array<{title: string, url: string, description?: string}> = [];
  const lines = text.split('\n').filter(line => line.trim().startsWith('-'));
  
  lines.forEach(line => {
    // Match markdown links [title](url)
    const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const title = linkMatch[1].trim();
      const url = linkMatch[2].trim();
      const description = line.replace(/\[([^\]]+)\]\(([^)]+)\)/, '').replace(/^-\s*/, '').trim();
      
      items.push({
        title: title.substring(0, 100),
        url,
        description: description || undefined,
      });
    } else {
      // Handle plain text items
      const cleanLine = line.replace(/^-\s*/, '').trim();
      if (cleanLine) {
        items.push({
          title: cleanLine.substring(0, 100),
          url: '#',
          description: cleanLine,
        });
      }
    }
  });
  
  return items;
}

function extractBulletPoints(content: string, headerRegex: RegExp): string[] {
  const headerMatch = content.match(headerRegex);
  if (!headerMatch) return [];
  
  const startIndex = headerMatch.index! + headerMatch[0].length;
  const nextHeaderMatch = content.substring(startIndex).match(/\n\*\*[^*]+:\*\*|\n##/);
  const endIndex = nextHeaderMatch ? startIndex + nextHeaderMatch.index! : content.length;
  
  const section = content.substring(startIndex, endIndex);
  const lines = section.split('\n').filter(line => line.trim().startsWith('-'));
  
  return lines.map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean);
}

function parseTimeCommitment(timeText: string): number {
  const hourMatch = timeText.match(/(\d+(?:\.\d+)?)\s*(?:-\s*(\d+(?:\.\d+)?))?\s*hours?/i);
  if (hourMatch) {
    const minHours = parseFloat(hourMatch[1]);
    const maxHours = hourMatch[2] ? parseFloat(hourMatch[2]) : minHours;
    return Math.round((minHours + maxHours) / 2 * 60); // Convert to minutes
  }
  
  const minMatch = timeText.match(/(\d+)\s*(?:-\s*(\d+))?\s*mins?/i);
  if (minMatch) {
    const minMins = parseInt(minMatch[1]);
    const maxMins = minMatch[2] ? parseInt(minMatch[2]) : minMins;
    return Math.round((minMins + maxMins) / 2);
  }
  
  // Default fallback
  return 120; // 2 hours
}

function calculateXP(title: string, description: string): number {
  let xp = 20; // Base XP
  
  const taskText = (title + ' ' + description).toLowerCase();
  
  // High-value tasks
  if (taskText.includes('create') || taskText.includes('design') || taskText.includes('develop')) xp += 15;
  if (taskText.includes('research') || taskText.includes('analysis') || taskText.includes('validate')) xp += 10;
  if (taskText.includes('implement') || taskText.includes('build') || taskText.includes('execute')) xp += 12;
  
  // Medium-value tasks
  if (taskText.includes('write') || taskText.includes('document') || taskText.includes('prepare')) xp += 8;
  if (taskText.includes('interview') || taskText.includes('survey') || taskText.includes('test')) xp += 10;
  
  // Document creation bonus
  if (taskText.includes('template') || taskText.includes('canvas') || taskText.includes('plan')) xp += 5;
  
  // Simple tasks penalty
  if (taskText.includes('read') || taskText.includes('review') || taskText.includes('check')) xp -= 5;
  if (taskText.includes('list') || taskText.includes('gather') || taskText.includes('find')) xp -= 3;
  
  return Math.max(10, Math.min(50, xp));
}

function estimateTaskTime(title: string, description: string): number {
  const taskText = (title + ' ' + description).toLowerCase();
  
  // Complex tasks
  if (taskText.includes('create') || taskText.includes('design') || taskText.includes('develop')) return 45;
  if (taskText.includes('research') || taskText.includes('analysis')) return 30;
  if (taskText.includes('interview') || taskText.includes('survey')) return 25;
  
  // Medium tasks
  if (taskText.includes('write') || taskText.includes('document')) return 20;
  if (taskText.includes('plan') || taskText.includes('prepare')) return 15;
  
  // Simple tasks
  if (taskText.includes('read') || taskText.includes('review')) return 10;
  if (taskText.includes('check') || taskText.includes('list')) return 5;
  
  return 15; // Default
}

function needsDocuments(title: string, description: string): boolean {
  const taskText = (title + ' ' + description).toLowerCase();
  return taskText.includes('document') || 
         taskText.includes('template') || 
         taskText.includes('canvas') || 
         taskText.includes('plan') ||
         taskText.includes('create') ||
         taskText.includes('write');
}

function determineFileType(text: string): 'document' | 'spreadsheet' | 'presentation' | 'image' | 'pdf' {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('spreadsheet') || lowerText.includes('calculator') || lowerText.includes('excel')) return 'spreadsheet';
  if (lowerText.includes('presentation') || lowerText.includes('pitch') || lowerText.includes('slides')) return 'presentation';
  if (lowerText.includes('image') || lowerText.includes('logo') || lowerText.includes('graphic')) return 'image';
  if (lowerText.includes('pdf')) return 'pdf';
  return 'document';
}

function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1')     // Remove italic
    .replace(/`([^`]+)`/g, '$1')       // Remove code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/#{1,6}\s*/g, '')         // Remove headers
    .replace(/\n\s*\n/g, '\n')         // Remove extra newlines
    .trim();
}

function createFallbackDay(dayNumber: number): EnhancedDayContent {
  return {
    day: dayNumber,
    title: `Startup Journey - Day ${dayNumber}`,
    briefContent: `Welcome to Day ${dayNumber} of your startup journey. Today you'll continue building your startup foundation.`,
    estimatedTime: 120,
    xpReward: 50,
    actionItems: [
      {
        id: `day${dayNumber}-fallback-1`,
        title: 'Complete daily startup tasks',
        description: 'Work on your startup development for today',
        xp: 25,
        category: 'core',
        estimatedTime: 60,
      },
      {
        id: `day${dayNumber}-fallback-2`,
        title: 'Reflect on progress',
        description: 'Review your progress and plan next steps',
        xp: 15,
        category: 'core',
        estimatedTime: 30,
      },
    ],
    resources: [
      {
        title: 'Startup Resources',
        type: 'external',
        url: 'https://startupindia.gov.in',
      },
    ],
  };
}

// Export for use in seed script
export function generateDailyLessonsFromEnhancedContent() {
  const days = parseEnhancedContent();
  
  return days.map(day => ({
    day: day.day,
    title: day.title,
    briefContent: day.briefContent,
    actionItems: day.actionItems,
    resources: day.resources,
    estimatedTime: day.estimatedTime,
    xpReward: day.xpReward,
    // Additional fields for enhanced content
    focus: day.focus,
    successMetrics: day.successMetrics,
    expertTips: day.expertTips,
    reflectionQuestions: day.reflectionQuestions,
  }));
}
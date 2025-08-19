import { readFileSync } from 'fs';
import { join } from 'path';

interface TaskContent {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: 'pre-work' | 'core' | 'bonus';
  estimatedTime: number;
  detailedContent?: {
    objective: string;
    guide: string[];
    tips: string[];
    examples?: string[];
    deliverable: string;
  };
}

// Cache to prevent repeated file reads
const contentCache = new Map<number, ReturnType<typeof parseEnhancedContent>>();

export function parseEnhancedContent(day: number): {
  briefContent: string;
  tasks: TaskContent[];
  resources: any[];
  estimatedTime: number;
  title: string;
  focus: string;
  successMetrics: string[];
} {
  // Return cached result if available
  if (contentCache.has(day)) {
    return contentCache.get(day)!;
  }

  try {
    const contentPath = join(process.cwd(), 'src', 'content', '30-day-enhanced', `day-${day.toString().padStart(2, '0')}.md`);
    const content = readFileSync(contentPath, 'utf-8');
    
    // Extract title
    const titleMatch = content.match(/^# (.+)/m);
    const title = titleMatch ? titleMatch[1].trim() : `Day ${day}: Startup Journey`;
    
    // Extract morning brief - handle multiple variations
    let briefContent = '';
    const briefPatterns = [
      /## 🌅 Morning Brief.*?\n(.*?)(?=\n## |\n### |$)/s,
      /## Morning Brief.*?\n(.*?)(?=\n## |\n### |$)/s,
      /\*Read Time:.*?\n(.*?)(?=\n## |\n### |\*\*What You'll Achieve|\*\*Time Commitment|$)/s
    ];
    
    for (const pattern of briefPatterns) {
      const match = content.match(pattern);
      if (match) {
        briefContent = match[1].trim();
        break;
      }
    }
    
    // Extract focus
    const focusMatch = content.match(/\*\*Today's Focus:\*\* (.+)/);
    const focus = focusMatch ? focusMatch[1].trim() : '';
    
    // Extract success metrics
    const successMetrics = extractSuccessMetrics(content);
    
    // Extract time commitment
    const timeMatch = content.match(/\*\*Time Commitment:\*\* (.+)/);
    const timeString = timeMatch ? timeMatch[1] : '2-3 hours';
    const estimatedTime = extractTimeInMinutes(timeString);
    
    // Parse tasks from the content
    const tasks = parseTasksFromContent(content, day);
    
    // Extract resources
    const resources = parseResourcesFromContent(content);
    
    const result = {
      briefContent,
      tasks,
      resources,
      estimatedTime,
      title,
      focus,
      successMetrics
    };

    // Cache the result
    contentCache.set(day, result);
    return result;
  } catch (error) {
    console.error(`Error parsing content for day ${day}:`, error);
    // Return fallback content
    return getFallbackContent(day);
  }
}

function parseTasksFromContent(content: string, day: number): TaskContent[] {
  const tasks: TaskContent[] = [];
  
  // Try multiple patterns for different day formats
  const taskSectionPatterns = [
    // Pattern 1: Early days format (### headings)
    { pattern: /### Pre-Work.*?\n(.*?)(?=\n### |$)/s, category: 'pre-work' },
    { pattern: /### Morning Prep.*?\n(.*?)(?=\n### |$)/s, category: 'pre-work' },
    { pattern: /### Core Tasks.*?\n(.*?)(?=\n### |$)/s, category: 'core' },
    { pattern: /### Core Work.*?\n(.*?)(?=\n### |$)/s, category: 'core' },
    { pattern: /### Bonus Tasks.*?\n(.*?)(?=\n### |$)/s, category: 'bonus' },
    { pattern: /### Final Polish.*?\n(.*?)(?=\n### |$)/s, category: 'bonus' },
    
    // Pattern 2: Later days format (## headings with emojis) - Fixed regex
    { pattern: /## 📚 Pre-Work.*?\n([\s\S]*?)(?=\n## |\n---|\n\n##|$)/, category: 'pre-work' },
    { pattern: /## 🚀 Core Action Items.*?\n([\s\S]*?)(?=\n## |\n---|\n\n##|$)/, category: 'core' },
    { pattern: /## 💼 Core Tasks.*?\n([\s\S]*?)(?=\n## |\n---|\n\n##|$)/, category: 'core' },
    { pattern: /## 🎁 Bonus Challenges.*?\n([\s\S]*?)(?=\n## |\n---|\n\n##|$)/, category: 'bonus' },
    { pattern: /## ⭐ Bonus Tasks.*?\n([\s\S]*?)(?=\n## |\n---|\n\n##|$)/, category: 'bonus' }
  ];
  
  // Extract tasks from each section
  for (const { pattern, category } of taskSectionPatterns) {
    const match = content.match(pattern);
    if (match) {
      const sectionTasks = extractTasksFromSection(match[1], category as any, day);
      tasks.push(...sectionTasks);
    }
  }
  
  // If no checklist format found, try to extract from action items directly
  if (tasks.length === 0) {
    const actionItemTasks = extractTasksFromActionItems(content, day);
    tasks.push(...actionItemTasks);
  }
  
  // Add detailed content from action items
  enhanceTasksWithActionItems(tasks, content, day);
  
  return tasks;
}

function extractTasksFromSection(section: string, category: 'pre-work' | 'core' | 'bonus', day: number): TaskContent[] {
  const tasks: TaskContent[] = [];
  
  // Look for checkboxes throughout the entire section, including nested ones
  const checkboxMatches = [...section.matchAll(/- \[ \]\s*\*\*(.+?)\*\*/g)];
  
  if (checkboxMatches.length > 0) {
    // Found checkboxes with bold formatting
    checkboxMatches.forEach((match, index) => {
      const taskText = match[1].trim().replace(/\(.+?\)/g, '').trim();
      if (taskText.length > 5) {
        const xp = category === 'pre-work' ? 10 : category === 'core' ? 25 : 15;
        const estimatedTime = category === 'pre-work' ? 15 : category === 'core' ? 45 : 30;
        
        tasks.push({
          id: `day${day}-${category}-${index + 1}`,
          title: taskText,
          description: `${category === 'core' ? 'Essential task for today' : category === 'bonus' ? 'Optional enhancement activity' : 'Quick setup task'}`,
          xp,
          category,
          estimatedTime
        });
      }
    });
  } else {
    // Try regular checkboxes
    const regularCheckboxes = [...section.matchAll(/- \[ \](.+)/g)];
    
    if (regularCheckboxes.length > 0) {
      regularCheckboxes.forEach((match, index) => {
        const taskText = match[1].trim()
          .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold formatting
          .replace(/\(.+?\)/g, '') // Remove parenthetical content
          .trim();
        
        if (taskText.length > 5) {
          const xp = category === 'pre-work' ? 10 : category === 'core' ? 25 : 15;
          const estimatedTime = category === 'pre-work' ? 15 : category === 'core' ? 45 : 30;
          
          tasks.push({
            id: `day${day}-${category}-${index + 1}`,
            title: taskText,
            description: `${category === 'core' ? 'Essential task for today' : category === 'bonus' ? 'Optional enhancement activity' : 'Quick setup task'}`,
            xp,
            category,
            estimatedTime
          });
        }
      });
    } else {
      // Try to extract from subsections or phases
      const subsectionMatches = section.match(/### (.+?)(?:\n|$)/g);
      if (subsectionMatches) {
        subsectionMatches.forEach((match, index) => {
          const taskText = match.replace(/### /, '').trim().replace(/\(.+?\)/g, '').trim();
          if (taskText.length > 5) {
            const xp = category === 'pre-work' ? 10 : category === 'core' ? 25 : 15;
            const estimatedTime = category === 'pre-work' ? 15 : category === 'core' ? 45 : 30;
            
            tasks.push({
              id: `day${day}-${category}-${index + 1}`,
              title: taskText,
              description: `${category === 'core' ? 'Essential task for today' : category === 'bonus' ? 'Optional enhancement activity' : 'Quick setup task'}`,
              xp,
              category,
              estimatedTime
            });
          }
        });
      }
    }
  }
  
  return tasks;
}

function enhanceTasksWithActionItems(tasks: TaskContent[], content: string, day: number) {
  // Extract action items section
  const actionItemsMatch = content.match(/## 🎯 Action Items(.*?)(?=\n## |$)/s);
  if (!actionItemsMatch) return;
  
  const actionItemsContent = actionItemsMatch[1];
  
  // Parse individual action items
  const actionItemMatches = actionItemsContent.match(/### \d+\. (.+?)\n(.*?)(?=\n### \d+\.|$)/gs);
  
  if (actionItemMatches) {
    actionItemMatches.forEach((match, index) => {
      const titleMatch = match.match(/### \d+\. (.+)/);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // Find corresponding task and enhance it
      const task = tasks.find(t => 
        t.category === 'core' && 
        (t.title.toLowerCase().includes(title.toLowerCase().split(' ')[0]) ||
         title.toLowerCase().includes(t.title.toLowerCase().split(' ')[0]))
      );
      
      if (task) {
        task.detailedContent = parseDetailedContent(match, title);
      }
    });
  }
}

function parseDetailedContent(actionItem: string, title: string): {
  objective: string;
  guide: string[];
  tips: string[];
  examples?: string[];
  deliverable: string;
} {
  // Extract objective (first paragraph usually)
  const lines = actionItem.split('\n').filter(line => line.trim());
  let objective = `Complete: ${title}`;
  
  // Look for framework or methodology sections
  const frameworkMatch = actionItem.match(/#### (.+? Framework|Methodology)(.*?)(?=\n#### |$)/s);
  if (frameworkMatch) {
    const frameworkContent = frameworkMatch[2];
    objective = `Apply the ${frameworkMatch[1]} to ${title.toLowerCase()}`;
  }
  
  // Extract guide steps
  const guide: string[] = [];
  const stepMatches = actionItem.match(/\*\*(.+?)\*\*/g);
  if (stepMatches) {
    stepMatches.forEach(step => {
      const cleanStep = step.replace(/\*\*/g, '').trim();
      if (cleanStep && !cleanStep.includes('📁') && !cleanStep.includes('Why')) {
        guide.push(cleanStep);
      }
    });
  }
  
  // Fallback guide if no steps found
  if (guide.length === 0) {
    guide.push(
      'Read through the provided framework carefully',
      'Answer all the questions step by step',
      'Document your findings clearly',
      'Review and refine your answers',
      'Save your work in the appropriate folder'
    );
  }
  
  // Extract tips (look for bullet points or numbered lists)
  const tips: string[] = [];
  const tipMatches = actionItem.match(/- (.+)/g);
  if (tipMatches) {
    tipMatches.slice(0, 3).forEach(tip => {
      const cleanTip = tip.replace(/^- /, '').trim();
      if (cleanTip && !cleanTip.startsWith('[ ]')) {
        tips.push(cleanTip);
      }
    });
  }
  
  // Default tips if none found
  if (tips.length === 0) {
    tips.push(
      'Take your time and think deeply about each question',
      'Be specific and avoid generic answers',
      'Document everything for future reference'
    );
  }
  
  // Extract examples if any
  const examples: string[] = [];
  const exampleMatch = actionItem.match(/Examples?:(.*?)(?=\n\n|\n[A-Z]|$)/s);
  if (exampleMatch) {
    const exampleLines = exampleMatch[1].split('\n').filter(line => line.trim());
    exampleLines.forEach(line => {
      const cleanLine = line.replace(/^[-*] /, '').trim();
      if (cleanLine && cleanLine.length > 10) {
        examples.push(cleanLine);
      }
    });
  }
  
  const deliverable = `Completed ${title.toLowerCase()} with clear documentation and actionable insights`;
  
  return {
    objective,
    guide,
    tips,
    examples: examples.length > 0 ? examples : undefined,
    deliverable
  };
}

function parseResourcesFromContent(content: string): any[] {
  const resources: any[] = [];
  
  // Look for resources section
  const resourcesMatch = content.match(/## 📚 Resources(.*?)(?=\n## |$)/s);
  if (resourcesMatch) {
    const resourceLines = resourcesMatch[1].split('\n').filter(line => line.trim().startsWith('-'));
    
    resourceLines.forEach((line, index) => {
      const resourceText = line.replace(/^- /, '').trim();
      resources.push({
        id: `resource-${index + 1}`,
        title: resourceText,
        type: 'template',
        url: '#',
        description: `Resource for today's activities`
      });
    });
  }
  
  return resources;
}

function extractTasksFromActionItems(content: string, day: number): TaskContent[] {
  const tasks: TaskContent[] = [];
  
  // Try multiple patterns for action items
  const actionItemPatterns = [
    /### \d+\. (.+?)(?=\n|$)/g,  // Pattern: ### 1. Task Name
    /### Phase \d+: (.+?)(?=\n|$)/g,  // Pattern: ### Phase 1: Task Name
    /#### \d+\.\d+ (.+?)(?=\n|$)/g,  // Pattern: #### 1.1 Task Name
    /## Phase \d+: (.+?)(?=\n|$)/g   // Pattern: ## Phase 1: Task Name
  ];
  
  let foundItems: string[] = [];
  
  // Try each pattern
  for (const pattern of actionItemPatterns) {
    const matches = [...content.matchAll(pattern)];
    if (matches.length > 0) {
      foundItems = matches.map(match => match[1].trim());
      break;
    }
  }
  
  // If no structured action items found, try to extract phases or sections
  if (foundItems.length === 0) {
    const phaseMatches = content.match(/(?:### |## )(.+?)\s*\(.*?\)/g);
    if (phaseMatches) {
      foundItems = phaseMatches.map(match => 
        match.replace(/(?:### |## )/, '').replace(/\s*\(.*?\)/, '').trim()
      );
    }
  }
  
  foundItems.forEach((title, index) => {
    const cleanTitle = title
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold formatting
      .replace(/\(.+?\)/g, '') // Remove parenthetical content
      .trim();
    
    if (cleanTitle.length > 5) {
      tasks.push({
        id: `day${day}-action-${index + 1}`,
        title: cleanTitle,
        description: 'Complete this action item from today\'s lesson',
        xp: 30,
        category: 'core',
        estimatedTime: 45
      });
    }
  });
  
  return tasks;
}

function extractSuccessMetrics(content: string): string[] {
  const metrics: string[] = [];
  
  // Look for success metrics patterns
  const patterns = [
    /\*\*Success Metrics:\*\*(.*?)(?=\n\n|\n[A-Z]|\n## |\n### |$)/s,
    /Success Metrics:\*\*(.*?)(?=\n\n|\n[A-Z]|\n## |\n### |$)/s,
    /## Success Metrics(.*?)(?=\n## |\n### |$)/s
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      const metricsText = match[1];
      // Extract bullet points
      const bullets = metricsText.match(/[-•*]\s*(.+)/g);
      if (bullets) {
        bullets.forEach(bullet => {
          const cleaned = bullet.replace(/^[-•*]\s*/, '').trim();
          if (cleaned) metrics.push(cleaned);
        });
      }
      break;
    }
  }
  
  return metrics;
}

function extractTimeInMinutes(timeString: string): number {
  const hourMatch = timeString.match(/(\d+)-?(\d+)?\s*hours?/);
  const minMatch = timeString.match(/(\d+)\s*mins?/);
  
  if (hourMatch) {
    const hours = hourMatch[2] ? parseInt(hourMatch[2]) : parseInt(hourMatch[1]);
    return hours * 60;
  }
  
  if (minMatch) {
    return parseInt(minMatch[1]);
  }
  
  // Default fallback
  return 120; // 2 hours
}

function getFallbackContent(day: number) {
  return {
    briefContent: `Welcome to Day ${day} of your startup journey! Today's content is being prepared.`,
    tasks: [
      {
        id: `day${day}-core-1`,
        title: 'Review Day Materials',
        description: 'Go through today\'s focus areas and prepare for action',
        xp: 25,
        category: 'core' as const,
        estimatedTime: 30
      }
    ],
    resources: [],
    estimatedTime: 60,
    title: `Day ${day}: Getting Started`,
    focus: 'Review and prepare for your startup journey',
    successMetrics: ['Complete day review', 'Set expectations']
  };
}
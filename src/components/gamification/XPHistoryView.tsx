import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Text } from '@/components/ui';
import { 
  Zap, 
  TrendingUp, 
  Calendar, 
  Award,
  Target,
  MessageSquare,
  Users,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface XPEvent {
  id: string;
  type: string;
  points: number;
  description: string;
  createdAt: string;
}

interface XPHistoryViewProps {
  events: XPEvent[];
  totalXP: number;
  currentLevel: number;
  levelProgress: {
    current: number;
    required: number;
    percentage: number;
  };
}

export const XPHistoryView: React.FC<XPHistoryViewProps> = ({
  events,
  totalXP,
  currentLevel,
  levelProgress,
}) => {
  const getEventIcon = (type: string) => {
    const iconMap: Record<string, any> = {
      daily_lesson_complete: Target,
      task_complete: Target,
      streak_bonus: Zap,
      week_complete: Calendar,
      community_post: MessageSquare,
      help_peer: Users,
      portfolio_section: FileText,
      achievement_unlock: Award,
    };
    
    return iconMap[type] || Zap;
  };

  const getEventColor = (type: string) => {
    const colorMap: Record<string, string> = {
      daily_lesson_complete: 'text-blue-600 bg-blue-100',
      task_complete: 'text-green-600 bg-green-100',
      streak_bonus: 'text-orange-600 bg-orange-100',
      week_complete: 'text-purple-600 bg-purple-100',
      community_post: 'text-pink-600 bg-pink-100',
      help_peer: 'text-red-600 bg-red-100',
      portfolio_section: 'text-indigo-600 bg-indigo-100',
      achievement_unlock: 'text-yellow-600 bg-yellow-100',
    };
    
    return colorMap[type] || 'text-gray-600 bg-gray-100';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Group events by date
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, XPEvent[]>);

  return (
    <div className="space-y-6">
      {/* Current Level Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Text className="text-sm text-gray-600 mb-1">Current Level</Text>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">Level {currentLevel}</span>
                <Badge variant="warning" size="sm">
                  {totalXP.toLocaleString()} XP Total
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Text className="text-sm text-gray-600 mb-1">Next Level Progress</Text>
              <div className="flex items-center gap-2">
                <Text className="font-medium">
                  {levelProgress.current} / {levelProgress.required} XP
                </Text>
                <Badge variant="outline" size="sm">
                  {levelProgress.percentage}%
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
              style={{ width: `${levelProgress.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* XP History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            XP History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedEvents)
              .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
              .map(([date, dateEvents]) => {
                const totalDayXP = dateEvents.reduce((sum, event) => sum + event.points, 0);
                const displayDate = new Date(date);
                const isToday = displayDate.toDateString() === new Date().toDateString();
                
                return (
                  <div key={date}>
                    <div className="flex items-center justify-between mb-3">
                      <Text className="font-medium text-gray-700">
                        {isToday ? 'Today' : displayDate.toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Text>
                      <Badge variant="outline">
                        +{totalDayXP} XP
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {dateEvents.map((event) => {
                        const Icon = getEventIcon(event.type);
                        const colorClass = getEventColor(event.type);
                        
                        return (
                          <div 
                            key={event.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className={cn("p-2 rounded-lg", colorClass)}>
                              <Icon className="w-4 h-4" />
                            </div>
                            
                            <div className="flex-1">
                              <Text className="font-medium">
                                {event.description}
                              </Text>
                              <Text size="sm" color="muted">
                                {formatDate(event.createdAt)}
                              </Text>
                            </div>
                            
                            <div className="text-right">
                              <Text className="font-bold text-orange-600">
                                +{event.points} XP
                              </Text>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
          
          {events.length === 0 && (
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <Text color="muted">No XP events yet</Text>
              <Text size="sm" color="muted">
                Start your journey to earn XP!
              </Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
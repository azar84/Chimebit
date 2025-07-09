import React from 'react';
import { Card } from '../ui/Card';
import { ActivityItem } from '@/types/common';
import { formatRelativeTime } from '@/utils/formatters';

interface ActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = 'Recent Activity',
  maxItems = 5,
}) => {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card title={title}>
      <div className="space-y-4">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${activity.color || '#5243E9'}1A` }}
            >
              <div style={{ color: activity.color || '#5243E9' }}>
                {activity.icon}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              {activity.description && (
                <p className="text-xs text-gray-600">
                  {activity.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formatRelativeTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </Card>
  );
}; 
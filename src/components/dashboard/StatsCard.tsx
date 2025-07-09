import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { StatsCardProps } from '@/types/common';

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon,
  color = '#5243E9',
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}1A` }}
        >
          <div style={{ color }}>
            {icon}
          </div>
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          {change.type === 'increase' ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span 
            className={`text-sm font-medium ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change.value}% {change.period}
          </span>
        </div>
      )}
    </Card>
  );
}; 
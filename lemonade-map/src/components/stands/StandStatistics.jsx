import React from 'react';
import { Card } from '../ui';

/**
 * Component to display stand visitor statistics
 * @param {Object} props - Component props
 * @param {Object} props.statistics - Statistics data
 * @returns {JSX.Element} - Stand statistics component
 */
const StandStatistics = ({ statistics }) => {
  // If no statistics provided, use demo data
  const stats = statistics || {
    totalViews: Math.floor(Math.random() * 500),
    uniqueVisitors: Math.floor(Math.random() * 200),
    averageTimeSpent: Math.floor(Math.random() * 5) + 1,
    popularTimes: [
      { day: 'Monday', hour: '2-4 PM' },
      { day: 'Wednesday', hour: '3-5 PM' },
      { day: 'Saturday', hour: '12-2 PM' }
    ],
    viewsByDay: [
      { day: 'Mon', views: Math.floor(Math.random() * 50) },
      { day: 'Tue', views: Math.floor(Math.random() * 50) },
      { day: 'Wed', views: Math.floor(Math.random() * 50) },
      { day: 'Thu', views: Math.floor(Math.random() * 50) },
      { day: 'Fri', views: Math.floor(Math.random() * 50) },
      { day: 'Sat', views: Math.floor(Math.random() * 50) },
      { day: 'Sun', views: Math.floor(Math.random() * 50) }
    ]
  };
  
  // Calculate max views for bar chart scaling
  const maxViews = Math.max(...stats.viewsByDay.map(day => day.views));
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <h3 className="text-blue-800 text-lg mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalViews}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <h3 className="text-green-800 text-lg mb-1">Unique Visitors</h3>
          <p className="text-3xl font-bold text-green-600">{stats.uniqueVisitors}</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <h3 className="text-purple-800 text-lg mb-1">Avg. Time (min)</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.averageTimeSpent}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <Card.Header>
            <h3 className="text-xl font-display text-lemonade-blue-dark">
              Views by Day
            </h3>
          </Card.Header>
          <Card.Body className="p-4">
            <div className="h-64 flex items-end justify-between">
              {stats.viewsByDay.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-8 bg-lemonade-blue rounded-t-md" 
                    style={{ 
                      height: `${(day.views / maxViews) * 100}%`,
                      minHeight: '10px'
                    }}
                  ></div>
                  <span className="mt-2 text-sm text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
        
        <Card>
          <Card.Header>
            <h3 className="text-xl font-display text-lemonade-blue-dark">
              Popular Times
            </h3>
          </Card.Header>
          <Card.Body>
            <ul className="divide-y divide-gray-200">
              {stats.popularTimes.map((time, index) => (
                <li key={index} className="py-3 flex justify-between">
                  <span className="font-medium">{time.day}</span>
                  <span className="text-gray-600">{time.hour}</span>
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      </div>
      
      <div className="p-4 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800 text-sm">
          Note: These statistics are for demonstration purposes only. In a production environment, 
          this would be connected to real analytics data.
        </p>
      </div>
    </div>
  );
};

export default StandStatistics;
import React from 'react';
import { SCREENS } from '../../constants/screens';

export const BottomNavigation = ({ currentScreen, onNavigate, notificationCounts = {} }) => {
  const navItems = [
    { 
      id: SCREENS.HOME, 
      label: '홈', 
      icon: '🏠',
      count: 0
    },
    { 
      id: SCREENS.JOB_RECOMMENDATIONS, 
      label: '추천', 
      icon: '💼',
      count: 0
    },
    { 
      id: SCREENS.MY_INFO, 
      label: '내 정보', 
      icon: '👤',
      count: notificationCounts.applications || 0
    }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              currentScreen === item.id 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-500 hover:text-primary-600'
            }`}
          >
            <span className="text-lg mb-1 relative">
              {item.icon}
              {item.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
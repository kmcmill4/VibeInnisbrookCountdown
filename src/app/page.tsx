'use client';

import { useState } from 'react';
import { Flag, FileText, Cloud, Trophy, Users } from 'lucide-react';
import HomeTab from '@/components/tabs/HomeTab';
import ScorecardsTab from '@/components/tabs/ScorecardsTab';
import WeatherTab from '@/components/tabs/WeatherTab';
import SnakePitTab from '@/components/tabs/SnakePitTab';
import PlayersTab from '@/components/tabs/PlayersTab';

type TabType = 'home' | 'scorecards' | 'weather' | 'snakepit' | 'players';

export default function InnisbrookApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const tabs = [
    { id: 'home' as TabType, icon: Flag, label: 'Gauntlet' },
    { id: 'scorecards' as TabType, icon: FileText, label: 'Courses' },
    { id: 'weather' as TabType, icon: Cloud, label: 'Weather' },
    { id: 'snakepit' as TabType, icon: Trophy, label: 'Snake Pit' },
    { id: 'players' as TabType, icon: Users, label: 'Players' },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white pb-20">
      {/* Safe area top padding for iOS notch */}
      <div className="pt-safe">
        {/* Tab Content */}
        <div className="min-h-[calc(100vh-5rem)]">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'scorecards' && <ScorecardsTab />}
          {activeTab === 'weather' && <WeatherTab />}
          {activeTab === 'snakepit' && <SnakePitTab />}
          {activeTab === 'players' && <PlayersTab />}
        </div>

        {/* Bottom Tab Bar - iOS Style */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1E]/95 backdrop-blur-xl border-t border-white/10 pb-safe">
          <div className="grid grid-cols-5 h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 transition-all ${
                    isActive ? 'text-[#b87333]' : 'text-gray-400'
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[10px] font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

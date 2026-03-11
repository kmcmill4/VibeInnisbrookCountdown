'use client';

import { useState } from 'react';
import { Flag, FileText, Beer, Trophy, Users } from 'lucide-react';
import HomeTab from '@/components/tabs/HomeTab';
import ScorecardsTab from '@/components/tabs/ScorecardsTab';
import NineteenthHoleTab from '@/components/tabs/NineteenthHoleTab';
import SnakePitTab from '@/components/tabs/SnakePitTab';
import PlayersTab from '@/components/tabs/PlayersTab';

type TabType = 'home' | 'scorecards' | 'nineteenth' | 'snakepit' | 'players';

export default function InnisbrookApp() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const tabs = [
    { id: 'home' as TabType, icon: Flag, label: 'Gauntlet' },
    { id: 'scorecards' as TabType, icon: FileText, label: 'Courses' },
    { id: 'nineteenth' as TabType, icon: Beer, label: '19th Hole' },
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
          {activeTab === 'nineteenth' && <NineteenthHoleTab />}
          {activeTab === 'snakepit' && <SnakePitTab />}
          {activeTab === 'players' && <PlayersTab />}
        </div>

        {/* Bottom Tab Bar - iOS Style with Glassmorphism */}
        <div 
          className="fixed bottom-0 left-0 right-0 border-t border-white/10 pb-safe backdrop-blur-2xl bg-black/80"
          style={{
            boxShadow: '0 -4px 16px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          <div className="grid grid-cols-5 h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center gap-1 transition-all relative ${
                    isActive ? 'text-[#b87333]' : 'text-gray-400'
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#b87333]/10 to-transparent" />
                  )}
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                  <span className="text-[10px] font-medium relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

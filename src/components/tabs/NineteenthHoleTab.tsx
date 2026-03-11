'use client';

import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

interface Activity {
  name: string;
  category: string;
  description: string;
  address: string;
  distance: string;
  icon: string;
  gradient: string;
  vibe: string;
}

const activities: Activity[] = [
  {
    name: 'King Corona Cigars Cafe',
    category: 'Cigar Lounge',
    description: 'Premium cigar lounge with full bar. Massive walk-in humidor, leather chairs, and sports on TV.',
    address: '1984 Drew St, Clearwater',
    distance: '8 mi',
    icon: '🚬',
    gradient: 'from-amber-600 to-orange-500',
    vibe: 'Classy'
  },
  {
    name: "Bern's Steak House",
    category: 'Steakhouse',
    description: '600,000+ bottle wine cellar. Dry-aged USDA Prime beef. Harry Waugh Dessert Room upstairs.',
    address: '1208 S Howard Ave, Tampa',
    distance: '22 mi',
    icon: '🥩',
    gradient: 'from-red-600 to-rose-500',
    vibe: 'Legendary'
  },
  {
    name: '7venth Sun Brewery',
    category: 'Brewery',
    description: 'Award-winning craft brewery. Huge taproom, rotating IPAs. Food trucks on weekends.',
    address: '1012 Broadway, Dunedin',
    distance: '6 mi',
    icon: '🍺',
    gradient: 'from-blue-600 to-cyan-500',
    vibe: 'Craft Beer'
  },
  {
    name: 'Clearwater Beach',
    category: 'Beach',
    description: '#1 beach in America. White sand, clear water, beach bars. Pier 60 sunset celebrations.',
    address: 'Clearwater Beach',
    distance: '11 mi',
    icon: '🏖️',
    gradient: 'from-cyan-600 to-blue-500',
    vibe: 'Beach Day'
  },
];

const categories = [
  { name: 'All', icon: '🌟' },
  { name: 'Cigars', icon: '🚬' },
  { name: 'Food', icon: '🍽️' },
  { name: 'Bars', icon: '🍻' },
  { name: 'Activities', icon: '⛳' },
];

export default function NineteenthHoleTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="p-4 pb-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-4xl mb-2">🍻</div>
        <h1 className="text-2xl font-black">The 19th Hole</h1>
        <p className="text-xs text-gray-400 mt-1">Off-course activities</p>
      </motion.div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-4"
          >
            <div className="flex gap-3">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${activity.gradient} bg-opacity-20`}>
                <span>{activity.icon}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">{activity.name}</h3>
                <p className="text-xs text-gray-300 mt-1">{activity.description}</p>
                <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-2">
                  <MapPin size={10} />
                  <span>{activity.distance}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

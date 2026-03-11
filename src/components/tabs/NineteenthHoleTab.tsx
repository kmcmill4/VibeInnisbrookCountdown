'use client';

import { useState } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
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
  // Cigars & Lounges
  {
    name: 'King Corona Cigars Cafe',
    category: 'Cigar Lounge',
    description: 'Premium cigar lounge with full bar. Massive walk-in humidor, leather chairs, and sports on TV. The spot for post-round stogies.',
    address: '1984 Drew St, Clearwater, FL 33765',
    distance: '8 mi',
    icon: '🚬',
    gradient: 'from-amber-600 to-orange-500',
    vibe: 'Classy & Relaxed'
  },
  
  // Steakhouses & Fine Dining
  {
    name: "Bern's Steak House",
    category: 'Steakhouse',
    description: 'Legendary Tampa institution. 600,000+ bottle wine cellar. Dry-aged USDA Prime beef. Harry Waugh Dessert Room upstairs is a must.',
    address: '1208 S Howard Ave, Tampa, FL 33606',
    distance: '22 mi',
    icon: '🥩',
    gradient: 'from-red-600 to-rose-500',
    vibe: 'Legendary'
  },
  {
    name: 'Ocean Prime',
    category: 'Steakhouse',
    description: 'Modern steakhouse with killer cocktails. Great for a high-end night out. Try the smoking shellfish tower.',
    address: '403 S Dale Mabry Hwy, Tampa, FL 33609',
    distance: '20 mi',
    icon: '🥩',
    gradient: 'from-red-600 to-rose-500',
    vibe: 'Modern Upscale'
  },
  {
    name: 'Columbia Restaurant',
    category: 'Cuban/Spanish',
    description: "Florida's oldest restaurant (1905). Legendary Cuban sandwiches, paella, and flamenco shows. Ybor City institution.",
    address: '2117 E 7th Ave, Tampa, FL 33605',
    distance: '26 mi',
    icon: '🥘',
    gradient: 'from-orange-600 to-red-500',
    vibe: 'Historic Icon'
  },

  // Burgers & Casual
  {
    name: 'The Chattaway',
    category: 'Burgers',
    description: 'Old Florida dive bar with phenomenal burgers. Cash only. Outdoor seating under the trees. Local legend since 1951.',
    address: '358 22nd Ave S, St Petersburg, FL 33705',
    distance: '18 mi',
    icon: '🍔',
    gradient: 'from-yellow-600 to-amber-500',
    vibe: 'Dive Bar Classic'
  },
  {
    name: 'Ulele',
    category: 'BBQ',
    description: 'Upscale BBQ on the Hillsborough River. Native-inspired menu, craft beer brewed on-site. Incredible atmosphere.',
    address: '1810 N Highland Ave, Tampa, FL 33602',
    distance: '24 mi',
    icon: '🍖',
    gradient: 'from-orange-600 to-red-500',
    vibe: 'Waterfront BBQ'
  },

  // Breweries
  {
    name: '7venth Sun Brewery',
    category: 'Brewery',
    description: 'Award-winning craft brewery. Huge taproom, rotating IPAs, and great vibes. Food trucks on weekends. Local favorite.',
    address: '1012 Broadway, Dunedin, FL 34698',
    distance: '6 mi',
    icon: '🍺',
    gradient: 'from-blue-600 to-cyan-500',
    vibe: 'Craft Beer Haven'
  },
  {
    name: 'Cigar City Brewing',
    category: 'Brewery',
    description: "Tampa's most famous brewery. Their Jai Alai IPA is legendary. Huge taproom with tours available. Must-visit.",
    address: '3924 W Spruce St, Tampa, FL 33607',
    distance: '20 mi',
    icon: '🍺',
    gradient: 'from-blue-600 to-cyan-500',
    vibe: 'Tampa Icon'
  },
  {
    name: 'Green Bench Brewing',
    category: 'Brewery',
    description: 'Downtown St. Pete brewery with killer sours and IPAs. Great patio for day drinking. Walking distance to nightlife.',
    address: '1133 Baum Ave N, St Petersburg, FL 33705',
    distance: '20 mi',
    icon: '🍺',
    gradient: 'from-blue-600 to-cyan-500',
    vibe: 'Urban Taproom'
  },
  {
    name: 'Dunedin Brewery',
    category: 'Brewery',
    description: "Florida's oldest microbrewery. Cozy taproom with consistently great beers. Perfect pre-dinner spot.",
    address: '937 Douglas Ave, Dunedin, FL 34698',
    distance: '5 mi',
    icon: '🍺',
    gradient: 'from-blue-600 to-cyan-500',
    vibe: 'OG Craft Beer'
  },

  // Bars & Nightlife
  {
    name: 'The Mill',
    category: 'Sports Bar',
    description: 'Massive sports bar with 50+ TVs, great wings, and cold beer. Perfect for watching games. Late-night scene.',
    address: '200 Central Ave, St Petersburg, FL 33701',
    distance: '19 mi',
    icon: '📺',
    gradient: 'from-green-600 to-emerald-500',
    vibe: 'Sports Central'
  },
  {
    name: "Ferg's Sports Bar",
    category: 'Sports Bar',
    description: 'Iconic St. Pete sports bar. Outdoor seating, live music, and right by the stadium. Great atmosphere.',
    address: '1320 Central Ave, St Petersburg, FL 33705',
    distance: '20 mi',
    icon: '📺',
    gradient: 'from-green-600 to-emerald-500',
    vibe: 'Local Legend'
  },
  {
    name: "Jimmy B's Beach Bar",
    category: 'Beach Bar',
    description: 'Classic beach bar on St Pete Beach. Live music, frozen drinks, and right on the sand. Pure vacation vibes.',
    address: '6200 Gulf Blvd, St Pete Beach, FL 33706',
    distance: '12 mi',
    icon: '🍹',
    gradient: 'from-cyan-600 to-blue-500',
    vibe: 'Beach Party'
  },
  {
    name: 'Ybor City',
    category: 'Nightlife District',
    description: 'Historic Tampa nightlife district. Bars, clubs, live music. Where Tampa parties. Start at 7th Ave.',
    address: '7th Ave, Tampa, FL 33605',
    distance: '26 mi',
    icon: '🎉',
    gradient: 'from-pink-600 to-rose-500',
    vibe: 'Party District'
  },
  {
    name: 'The Avenue',
    category: 'Rooftop Bar',
    description: 'Upscale rooftop bar in Clearwater Beach. Ocean views, craft cocktails, late 20s energy. Sunset spot.',
    address: '21 Bay Esplanade, Clearwater Beach, FL 33767',
    distance: '10 mi',
    icon: '🍸',
    gradient: 'from-purple-600 to-pink-500',
    vibe: 'Beach Club'
  },

  // Activities & Entertainment
  {
    name: 'Clearwater Beach',
    category: 'Beach',
    description: 'Consistently rated #1 beach in America. White sand, clear water, beach bars. Pier 60 has sunset celebrations nightly.',
    address: 'Clearwater Beach, FL 33767',
    distance: '11 mi',
    icon: '🏖️',
    gradient: 'from-cyan-600 to-blue-500',
    vibe: 'Beach Day'
  },
  {
    name: 'Honeymoon Island State Park',
    category: 'Nature',
    description: 'Beautiful state park with pristine beach, nature trails, and wildlife. Great for morning runs. Osprey nests everywhere.',
    address: '1 Causeway Blvd, Dunedin, FL 34698',
    distance: '8 mi',
    icon: '🌴',
    gradient: 'from-teal-600 to-cyan-500',
    vibe: 'Nature Escape'
  },
  {
    name: 'Pinellas Trail',
    category: 'Running/Biking',
    description: '47-mile paved trail through Pinellas County. Perfect for morning runs. Passes breweries and beaches. Rent bikes nearby.',
    address: 'Multiple access points near Palm Harbor',
    distance: '2 mi',
    icon: '🏃',
    gradient: 'from-emerald-600 to-green-500',
    vibe: 'Active'
  },
  {
    name: "Hubbard's Marina",
    category: 'Fishing',
    description: 'Charter fishing for grouper, snapper, and more. Half-day and full-day trips. Experienced captains. Gear included.',
    address: "150 John's Pass Boardwalk, Madeira Beach, FL 33708",
    distance: '14 mi',
    icon: '🎣',
    gradient: 'from-indigo-600 to-blue-500',
    vibe: 'Deep Sea'
  },
  {
    name: 'Tampa Bay Rays Game',
    category: 'Sports',
    description: 'Catch a Rays game at Tropicana Field. Great atmosphere, cheap tickets. Check schedule for home games in May.',
    address: '1 Tropicana Dr, St Petersburg, FL 33705',
    distance: '20 mi',
    icon: '⚾',
    gradient: 'from-blue-600 to-cyan-500',
    vibe: 'MLB Game'
  },
];

const categories = [
  { name: 'All', icon: '🌟' },
  { name: 'Cigars', icon: '🚬' },
  { name: 'Food', icon: '🍽️' },
  { name: 'Breweries', icon: '🍺' },
  { name: 'Bars', icon: '🍻' },
  { name: 'Beach', icon: '🏖️' },
  { name: 'Activities', icon: '⛳' },
];

export default function NineteenthHoleTab() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredActivities = selectedCategory === 'All' 
    ? activities 
    : activities.filter(a => {
        if (selectedCategory === 'Cigars') return a.category.includes('Cigar');
        if (selectedCategory === 'Food') return ['Steakhouse', 'Seafood', 'Burgers', 'BBQ', 'Fine Dining', 'Cuban/Spanish'].includes(a.category);
        if (selectedCategory === 'Breweries') return a.category === 'Brewery';
        if (selectedCategory === 'Bars') return ['Sports Bar', 'Beach Bar', 'Rooftop Bar', 'Nightlife District'].includes(a.category);
        if (selectedCategory === 'Beach') return a.category === 'Beach';
        if (selectedCategory === 'Activities') return ['Golf Entertainment', 'Nature', 'Running/Biking', 'Fishing', 'Theme Park', 'Sports', 'Entertainment'].includes(a.category);
        return false;
      });

  return (
    <div className="p-4 pb-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-4xl mb-2">🍻</div>
        <h1 className="text-2xl font-black">The 19th Hole</h1>
        <p className="text-xs text-gray-400 mt-1">28 activities • Tap to navigate</p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedCategory(cat.name)}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.name
                ? 'bg-gradient-to-r from-[#b87333] to-[#d4954f] text-black shadow-lg'
                : 'bg-white/5 text-gray-400 border border-white/10 backdrop-blur-xl'
            }`}
          >
            {cat.icon} {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Activities List - All Clickable */}
      <div className="space-y-3 mb-6">
        {filteredActivities.map((activity, index) => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name + ' ' + activity.address)}`;
          
          return (
            <motion.a
              key={activity.name}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ x: 4 }}
              className="block relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-4 group cursor-pointer"
              style={{
                boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
              
              <div className="relative flex gap-3">
                {/* Icon */}
                <div 
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br ${activity.gradient} bg-opacity-20`}
                >
                  <span>{activity.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      {activity.name}
                      <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.distance}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {activity.category}
                    </span>
                    <span className="text-[9px] text-gray-500">• {activity.vibe}</span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed mb-2">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <MapPin size={10} />
                    <span className="truncate">{activity.address}</span>
                  </div>
                </div>
              </div>

              {/* Hover glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: '-4px 0 16px rgba(184, 115, 51, 0.15)'
                }}
              />
            </motion.a>
          );
        })}
      </div>

{/* Activities Map Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 mb-4 shadow-2xl"
        style={{
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
        
        <div className="p-4 border-b border-white/10 flex items-center justify-between relative z-20">
          <div className="flex items-center gap-2">
            <Navigation size={16} className="text-[#b87333]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-tight">Trip Navigation</h3>
          </div>
          <span className="text-[10px] text-white/40 font-mono">TAMPA BAY, FL</span>
        </div>

        <div className="relative h-80 sm:h-96 grayscale-[20%] contrast-[1.1] invert-[0.9] hue-rotate-[180deg]">
          {/* Note: Invert/Hue-rotate filters can make standard Google Maps look "Dark Mode" */}
          <iframe
            src="https://www.google.com/maps/d/u/0/embed?mid=19r8Ru34Jz8JyDdDlJMba1Z7C60yAH18&ehbc=2E312F&noprof=1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-0"
          />
        </div>
      </motion.div>

      {/* Pro Tip Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-[#b87333]/10 border border-[#b87333]/30 rounded-2xl p-4 flex gap-3"
      >
        <div className="mt-0.5">💡</div>
        <div>
          <div className="text-xs font-bold text-[#b87333] mb-1 uppercase tracking-wider">Local Insight</div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Most spots are 20-30 min from <span className="text-white font-medium">Innisbrook</span>. 
            Clearwater Beach is your best bet for a quick sunset between rounds. 
            <span className="block mt-1 text-[#b87333]/80 italic font-medium">Tip: Use the map markers to trigger Uber directly.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
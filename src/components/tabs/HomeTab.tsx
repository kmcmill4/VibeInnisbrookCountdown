'use client';

import { useState, useEffect } from 'react';
import { MapPin, Cloud, Wind, Droplets, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

interface WeatherDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  wind_mph: number;
  wind_dir: string;
  precip_chance: number;
  humidity: number;
}

export default function HomeTab() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [weatherLoading, setWeatherLoading] = useState(true);

  useEffect(() => {
    const target = new Date('2026-05-16T08:00:00-04:00').getTime();
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance > 0) {
        const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        const seconds = Math.floor((distance / 1000) % 60);
        const minutes = Math.floor((distance / 1000 / 60) % 60);
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const months = Math.floor(totalDays / 30);
        const days = totalDays % 30;

        setTimeLeft({ months, days, hours, minutes, seconds, totalDays });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch('/api/weather');
      if (response.ok) {
        const data = await response.json();
        setWeather(data.forecast.slice(0, 3)); // Only first 3 days
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setWeatherLoading(false);
    }
  };

  const showCountdown = timeLeft.totalDays >= 1;

  const gauntletItems = [
    {
      name: 'Cabot Citrus Farms',
      date: 'Fri 5/15',
      time: 'TBD',
      tag: 'ROOST',
      icon: '🏌️',
      gradient: 'from-orange-500 to-yellow-500',
      color: 'orange',
      location: 'Brooksville, FL'
    },
    {
      name: 'Copperhead',
      date: 'Sat 5/16',
      time: '7:47 AM',
      times: ['7:47am', '7:55am', '8:04am', '1:43pm'],
      tag: 'SNAKE PIT',
      icon: '🐍',
      gradient: 'from-amber-600 to-yellow-600',
      color: 'amber',
      location: 'Innisbrook Resort'
    },
    {
      name: 'Massimo',
      date: 'Sat 5/16',
      time: '7:30 PM',
      tag: 'DINNER',
      icon: '🍽️',
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple',
      location: 'Tampa, FL',
      isDinner: true
    },
    {
      name: 'Island Course',
      date: 'Sun 5/17',
      time: '8:21 AM',
      times: ['8:21am', '8:29am', '8:38am'],
      tag: 'TIGHT ONE',
      icon: '🏝️',
      gradient: 'from-emerald-500 to-teal-500',
      color: 'emerald',
      location: 'Innisbrook Resort'
    },
    {
      name: "Bern's Steak House",
      date: 'Sun 5/17',
      time: '5:30 PM',
      tag: 'DINNER',
      icon: '🍽️',
      gradient: 'from-purple-500 to-pink-500',
      color: 'purple',
      location: 'Tampa, FL',
      isDinner: true
    },
    {
      name: 'South Course',
      date: 'Mon 5/18',
      time: '8:38 AM',
      times: ['8:38am', '8:46am', '8:55am'],
      tag: 'REDEMPTION',
      icon: '⛳',
      gradient: 'from-blue-500 to-cyan-500',
      color: 'blue',
      location: 'Innisbrook Resort'
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header with Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#b87333]/10 via-transparent to-[#b87333]/10 blur-3xl -z-10" />
        <h1 className="text-3xl font-black tracking-tight">
          INNISBROOK <span className="text-[#b87333]">GOLF TRIP</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1">
          <MapPin size={14} />
          Palm Harbor, FL • May 2026
        </p>
      </motion.div>

      {/* Countdown - Glassmorphism Effect */}
      {showCountdown && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-2xl"
          style={{
            boxShadow: '0 8px 32px 0 rgba(184, 115, 51, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
          <div className="relative p-6 grid grid-cols-5 gap-2 text-center">
            {[
              { label: 'MO', value: timeLeft.months },
              { label: 'DA', value: timeLeft.days },
              { label: 'HR', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEC', value: timeLeft.seconds },
            ].map((unit, index) => (
              <motion.div 
                key={unit.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl font-black text-white tabular-nums drop-shadow-lg">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-[#b87333] text-[10px] font-bold mt-1">
                  {unit.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Weather Forecast - 3 Column Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-3 px-1">
          <Cloud size={16} className="text-blue-400" />
          <h2 className="text-sm font-bold text-white">Weather Forecast</h2>
        </div>
        
        {weatherLoading ? (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {weather.map((day, index) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-3"
                style={{
                  boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                <div className="relative">
                  <div className="text-[10px] text-gray-400 font-bold mb-0.5">{day.day}</div>
                  <div className="text-2xl mb-1">{day.icon}</div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-lg font-black text-red-400">{day.high}°</span>
                    <span className="text-sm text-blue-400">{day.low}°</span>
                  </div>
                  <div className="space-y-1 text-[9px] text-gray-400">
                    <div className="flex items-center gap-1">
                      <Wind size={10} />
                      <span>{day.wind_dir} {day.wind_mph}mph</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplets size={10} />
                      <span>{day.precip_chance}% • {day.humidity}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* The Gauntlet Schedule - Option C Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#b87333] to-[#d4954f]" />
          <h2 className="text-lg font-bold text-white">The Gauntlet</h2>
        </div>
        
        <div className="space-y-2">
          {gauntletItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 4 }}
              className={`relative overflow-hidden rounded-2xl flex items-center gap-3 p-3 group cursor-pointer transition-all ${
                item.isDinner 
                  ? 'border-2 border-purple-500 bg-purple-500/10 backdrop-blur-xl' 
                  : 'border-l-[3px] backdrop-blur-xl bg-white/5'
              }`}
              style={{
                boxShadow: `0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`,
                ...(item.isDinner ? {} : {
                borderLeftColor: item.color === 'orange' ? '#f97316' : 
                                 item.color === 'amber' ? '#b87333' :
                                 item.color === 'emerald' ? '#10b981' :
                                 item.color === 'purple' ? '#a855f7' : '#3b82f6'
                })
              }}
            >
              {/* Gradient icon background */}
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-gradient-to-br ${item.gradient} bg-opacity-20 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10" />
                <span className="relative z-10">{item.icon}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm truncate">{item.name}</div>
                {item.times ? (
                  <>
                    <div className="text-xs text-gray-400">{item.date}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.times.map((t, i) => (
                        <span key={i} className="text-[9px] text-gray-400 bg-white/10 rounded px-1.5 py-0.5 font-mono">{t}</span>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-xs text-gray-400">{item.date} • {item.time}</div>
                )}
              </div>
              
              {/* Pill */}
              <div 
                className={`text-[9px] font-black px-2.5 py-1 rounded-full border whitespace-nowrap`}
                style={{
                  backgroundColor: item.color === 'orange' ? 'rgba(249, 115, 22, 0.2)' :
                                   item.color === 'amber' ? 'rgba(184, 115, 51, 0.2)' :
                                   item.color === 'emerald' ? 'rgba(16, 185, 129, 0.2)' :
                                   item.color === 'purple' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                  color: item.color === 'orange' ? '#f97316' :
                         item.color === 'amber' ? '#b87333' :
                         item.color === 'emerald' ? '#10b981' :
                         item.color === 'purple' ? '#a855f7' : '#3b82f6',
                  borderColor: item.color === 'orange' ? 'rgba(249, 115, 22, 0.3)' :
                               item.color === 'amber' ? 'rgba(184, 115, 51, 0.3)' :
                               item.color === 'emerald' ? 'rgba(16, 185, 129, 0.3)' :
                               item.color === 'purple' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'
                }}
              >
                {item.tag}
              </div>

              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: item.color === 'orange' ? '-4px 0 16px rgba(249, 115, 22, 0.2)' :
                             item.color === 'amber' ? '-4px 0 16px rgba(184, 115, 51, 0.2)' :
                             item.color === 'emerald' ? '-4px 0 16px rgba(16, 185, 129, 0.2)' :
                             item.color === 'purple' ? '-4px 0 16px rgba(168, 85, 247, 0.2)' : '-4px 0 16px rgba(59, 130, 246, 0.2)'
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      
      {/* Trip Stats - Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 p-4"
        style={{
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
        <h3 className="text-sm font-bold text-white mb-3 relative z-10">Trip Stats</h3>
        <div className="grid grid-cols-2 gap-3 relative z-10">
          {[
            { label: 'Total Holes', value: '54', color: 'text-[#b87333]' },
            { label: 'Total Yards', value: '21,463', color: 'text-green-400' },
            { label: 'Total Strokes', value: '???', color: 'text-blue-400' },
            { label: 'Beers', value: 'TBD', color: 'text-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-black ${stat.color} drop-shadow-lg`}>{stat.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

     {/* Google Map Embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl bg-white/5"
        style={{
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-10" />
        <div className="p-3 border-b border-white/10 flex items-center gap-2 relative z-20">
          <Navigation size={16} className="text-[#b87333]" />
          <h3 className="text-sm font-bold text-white">Trip Map</h3>
        </div>
        <div className="relative h-80 sm:h-96 grayscale-[20%] contrast-[1.1] invert-[0.9] hue-rotate-[180deg]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56687.89414935896!2d-82.74!3d28.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e184e2e8c48f%3A0x8e3c3c5f5b5c5c5c!2sInnisbrook%20Golf%20Resort!5e0!3m2!1sen!2sus!4v1234567890"
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


      {/* Footer */}
      <div className="text-center text-gray-600 text-xs pt-4 pb-2">
        <p>Let's make this trip legendary. 🏌️‍♂️🍺🚬</p>
      </div>
    </div>
  );
}

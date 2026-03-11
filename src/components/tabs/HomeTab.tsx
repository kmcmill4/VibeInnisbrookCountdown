'use client';

import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
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

  // Hide countdown if less than 1 day left
  const showCountdown = timeLeft.totalDays >= 1;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <h1 className="text-3xl font-black tracking-tight">
          INNISBROOK <span className="text-[#b87333]">GOLF TRIP</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1 flex items-center justify-center gap-1">
          <MapPin size={14} />
          Palm Harbor, FL • May 2026
        </p>
      </motion.div>

      {/* Countdown - Only show if more than 1 day left */}
      {showCountdown && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] rounded-3xl p-6 border border-white/5"
        >
          <div className="grid grid-cols-5 gap-2 text-center">
            {[
              { label: 'MO', value: timeLeft.months },
              { label: 'DA', value: timeLeft.days },
              { label: 'HR', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEC', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label}>
                <div className="text-3xl font-black text-white tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-[#b87333] text-[10px] font-bold mt-1">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <h2 className="text-lg font-bold text-white/90">The Gauntlet</h2>
        
        <div className="space-y-2">
          {[
            { course: 'Cabot Citrus Farms', date: 'Thu 5/15', time: 'TBD', tag: 'ROOST', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', type: 'venue' },
            { course: 'Copperhead', date: 'Fri 5/16', time: '8:00 AM', tag: 'SNAKE PIT', color: 'bg-[#b87333]/20 text-[#b87333] border-[#b87333]/30', type: 'course' },
            { course: 'Island Course', date: 'Sat 5/17', time: '8:30 AM', tag: 'TIGHT ONE', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', type: 'course' },
            { course: "Bern's Steak House", date: 'Sat 5/17', time: 'Evening', tag: 'DINNER', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', type: 'venue' },
            { course: 'South Course', date: 'Sun 5/18', time: '8:55 AM', tag: 'REDEMPTION', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', type: 'course' },
          ].map((round, index) => (
            <div
              key={index}
              className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5 active:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">{round.course}</div>
                  <div className="text-sm text-gray-400">{round.date} • {round.time}</div>
                </div>
                <div className={`text-[9px] px-2.5 py-1 rounded-full font-black border ${round.color}`}>
                  {round.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
      >
        <h3 className="text-sm font-bold text-white/90 mb-3">Trip Stats</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Holes', value: '54', color: 'text-[#b87333]' },
            { label: 'Total Yards', value: '21,463', color: 'text-green-400' },
            { label: 'Total Strokes', value: '???', color: 'text-blue-400' },
            { label: 'Beers', value: 'TBD', color: 'text-orange-400' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="text-center text-gray-600 text-xs pt-4 pb-2">
        <p>Let's make this trip legendary. 🏌️‍♂️🍺🚬</p>
      </div>
    </div>
  );
}

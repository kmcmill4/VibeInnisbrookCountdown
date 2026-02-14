"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Trophy, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// Animation Variants with explicit typing for Vercel
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { 
      type: "spring" as const, 
      stiffness: 100 
    } 
  }
};

export default function InnisbrookDashboard() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-05-16T08:00:00-04:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-slate-100 p-4 md:p-8 font-sans selection:bg-[#b87333]">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* HEADER */}
        <motion.header variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white">
              BOYS GOLF TRIP <span className="text-[#b87333]">INNISBROOK</span>
            </h1>
            <p className="text-slate-500 font-medium">Palm Harbor, FL • May 2026</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-[#16191B] border border-white/10 px-4 py-2 rounded-2xl cursor-default"
          >
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
             <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest">System Online</p>
          </motion.div>
        </motion.header>

        {/* HERO COUNTDOWN */}
        <motion.section 
          variants={item}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(184, 115, 51, 0.2)" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-[#16191B] to-[#0B0D0E] p-8 md:p-12 shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label}>
                <div className="text-5xl md:text-7xl font-black text-white tabular-nums">{unit.value}</div>
                <div className="text-[#b87333] uppercase tracking-widest text-xs font-bold mt-2">{unit.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
             <Trophy size={200} />
          </div>
        </motion.section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={item} className="md:col-span-2">
            <Card className="bg-[#16191B] border-white/5 rounded-[2rem] h-full shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 italic">
                  <MapPin className="text-[#b87333]" /> THE GAUNTLET
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { course: "Copperhead", time: "5/16 • 8:00 AM", tag: "THE SNAKE PIT", color: "text-[#b87333]" },
                  { course: "Island Course", time: "5/17 • 8:30 AM", tag: "WATER EVERYWHERE", color: "text-emerald-400" },
                  { course: "South Course", time: "5/18 • 8:55 AM", tag: "REDEMPTION", color: "text-blue-400" },
                ].map((round) => (
                  <motion.div 
                    key={round.course}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="p-4 rounded-2xl border border-white/5 flex justify-between items-center transition-colors cursor-pointer group"
                  >
                    <div>
                      <p className="font-bold text-white group-hover:text-[#b87333] transition-colors">{round.course}</p>
                      <p className="text-sm text-slate-500">{round.time}</p>
                    </div>
                    <div className={`text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-black tracking-widest ${round.color}`}>
                      {round.tag}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="bg-[#b87333] border-none rounded-[2rem] text-[#2D1B0D] h-full shadow-2xl shadow-[#b87333]/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 uppercase text-sm font-black tracking-tighter">
                  <Info size={18} /> Snake Pit Intel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-black text-2xl leading-[1.1] mb-6 tracking-tight">
                  "Holes 16, 17, and 18 are historically the hardest finish in Florida."
                </p>
                <div className="space-y-3 opacity-90 text-sm font-bold">
                   <p>• 16: The Moccasin (Dogleg Right)</p>
                   <p>• 17: The Rattler (Long Par 3)</p>
                   <p>• 18: The Copperhead (Uphill Grind)</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
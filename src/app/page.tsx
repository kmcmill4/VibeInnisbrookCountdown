"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Trophy, Info, Calendar, Wind, Droplets, Target, TrendingUp } from 'lucide-react';
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

interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CourseInfo {
  name: string;
  nickname: string;
  date: string;
  time: string;
  par: number;
  yardage: number;
  rating: number;
  slope: number;
  trivia: string;
  difficulty: number;
  color: string;
}

interface WeatherDay {
  date: string;
  day: string;
  high: number;
  low: number;
  condition: string;
  wind: string;
  precipitation: number;
  icon: string;
}

export default function InnisbrookDashboard() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ 
    months: 0, 
    days: 0, 
    hours: 0, 
    minutes: 0, 
    seconds: 0 
  });
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);

  const courses: CourseInfo[] = [
    {
      name: 'Copperhead',
      nickname: 'The Snake Pit',
      date: '5/16/26',
      time: '8:00 AM ET',
      par: 71,
      yardage: 7340,
      rating: 76.5,
      slope: 143,
      trivia: 'Holes 16, 17, and 18 have played at +0.562 over par since 2003. Beware: The 16th (Moccasin) has a fairway only 50 yards wide. Miss right, and you\'re in the drink.',
      difficulty: 95,
      color: 'text-[#b87333]'
    },
    {
      name: 'Island Course',
      nickname: 'The Tight One',
      date: '5/17/26',
      time: '8:30 AM ET',
      par: 72,
      yardage: 7125,
      rating: 75.2,
      slope: 137,
      trivia: 'Don\'t let the name fool you - this track is tight and tree-lined. Known for demanding accuracy over distance. The par-3 5th hole plays over water to a peninsula green.',
      difficulty: 85,
      color: 'text-emerald-400'
    },
    {
      name: 'South Course',
      nickname: 'Redemption',
      date: '5/18/26',
      time: '8:55 AM ET',
      par: 71,
      yardage: 6998,
      rating: 74.1,
      slope: 132,
      trivia: 'The "easier" of the three, but don\'t sleep on it. Features more elevation changes than the other courses. Perfect for redemption rounds after Copperhead humbles you.',
      difficulty: 75,
      color: 'text-blue-400'
    }
  ];

  const weather: WeatherDay[] = [
    {
      date: '5/15',
      day: 'Thu',
      high: 86,
      low: 72,
      condition: 'Partly Cloudy',
      wind: 'E 8-12 mph',
      precipitation: 20,
      icon: '⛅'
    },
    {
      date: '5/16',
      day: 'Fri',
      high: 87,
      low: 74,
      condition: 'Sunny',
      wind: 'SE 6-10 mph',
      precipitation: 10,
      icon: '☀️'
    },
    {
      date: '5/17',
      day: 'Sat',
      high: 88,
      low: 75,
      condition: 'Mostly Sunny',
      wind: 'S 5-8 mph',
      precipitation: 15,
      icon: '🌤️'
    },
    {
      date: '5/18',
      day: 'Sun',
      high: 89,
      low: 76,
      condition: 'Partly Cloudy',
      wind: 'SW 7-11 mph',
      precipitation: 25,
      icon: '⛅'
    }
  ];

  useEffect(() => {
    const target = new Date("2026-05-16T08:00:00-04:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance > 0) {
        const seconds = Math.floor((distance / 1000) % 60);
        const minutes = Math.floor((distance / 1000 / 60) % 60);
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        const months = Math.floor(totalDays / 30);
        const days = totalDays % 30;

        setTimeLeft({ months, days, hours, minutes, seconds });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const courseTimer = setInterval(() => {
      setCurrentCourseIndex((prev) => (prev + 1) % courses.length);
    }, 30000); // Rotate every 30 seconds

    return () => clearInterval(courseTimer);
  }, []);

  const currentCourse = courses[currentCourseIndex];

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
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
              INNISBROOK <span className="text-[#b87333]">GOLF TRIP</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Palm Harbor, FL • May 2026</p>
          </div>
          <div className="flex items-center gap-3 bg-[#16191B] border border-white/10 px-4 py-2 rounded-2xl">
            <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Typical May: 87°F</p>
          </div>
        </motion.header>

        {/* HERO COUNTDOWN */}
        <motion.section 
          variants={item}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(184, 115, 51, 0.2)" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-[#16191B] to-[#0B0D0E] p-8 md:p-12 shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-5 gap-2 md:gap-8 text-center">
            {[
              { label: 'Months', value: timeLeft.months },
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <div key={unit.label}>
                <div className="text-3xl md:text-7xl font-black text-white tabular-nums">{unit.value.toString().padStart(2, '0')}</div>
                <div className="text-[#b87333] uppercase tracking-wider text-[10px] md:text-xs font-bold mt-1 md:mt-2">{unit.label}</div>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Trophy size={200} />
          </div>
        </motion.section>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* COURSE SCHEDULE */}
          <motion.div variants={item} className="md:col-span-2">
            <Card className="bg-[#16191B] border-white/5 rounded-[2rem] h-full shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 italic">
                  <Target className="text-[#b87333]" /> THE GAUNTLET
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <motion.div 
                    key={course.name}
                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                      index === currentCourseIndex 
                        ? 'border-[#b87333] bg-[#b87333]/10' 
                        : 'border-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-white group-hover:text-[#b87333] transition-colors">
                          Round {index + 1}: {course.name}
                        </p>
                        <p className="text-sm text-slate-500">{course.date} • {course.time}</p>
                      </div>
                      <div className={`text-[10px] bg-white/5 border border-white/10 px-3 py-1 rounded-full font-black tracking-widest ${course.color}`}>
                        {course.nickname}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="bg-[#0B0D0E]/70 p-2 rounded-lg text-center">
                        <div className="text-slate-500 text-[10px] md:text-xs">Par</div>
                        <div className="font-bold text-white text-xs md:text-sm">{course.par}</div>
                      </div>
                      <div className="bg-[#0B0D0E]/70 p-2 rounded-lg text-center">
                        <div className="text-slate-500 text-[10px] md:text-xs">Yards</div>
                        <div className="font-bold text-white text-xs md:text-sm">{course.yardage.toLocaleString()}</div>
                      </div>
                      <div className="bg-[#0B0D0E]/70 p-2 rounded-lg text-center">
                        <div className="text-slate-500 text-[10px] md:text-xs">Rating</div>
                        <div className="font-bold text-white text-xs md:text-sm">{course.rating}</div>
                      </div>
                      <div className="bg-[#0B0D0E]/70 p-2 rounded-lg text-center">
                        <div className="text-slate-500 text-[10px] md:text-xs">Slope</div>
                        <div className="font-bold text-white text-xs md:text-sm">{course.slope}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* COURSE INTEL - ROTATING */}
          <motion.div variants={item}>
            <Card className="bg-[#b87333] border-none rounded-[2rem] text-[#2D1B0D] h-full shadow-2xl shadow-[#b87333]/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 uppercase text-sm font-black tracking-tighter">
                  <Info size={18} /> Course Intel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-black text-2xl leading-[1.1] mb-2 tracking-tight">
                    {currentCourse.name}
                  </p>
                  <p className="text-sm opacity-80 mb-3">"{currentCourse.nickname}"</p>
                  
                  {/* Difficulty Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold">Difficulty</span>
                      <span className="font-bold">{currentCourse.difficulty}/100</span>
                    </div>
                    <div className="h-2 bg-[#2D1B0D]/30 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#2D1B0D] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentCourse.difficulty}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#2D1B0D]/20 p-4 rounded-xl">
                  <p className="text-sm leading-relaxed">
                    {currentCourse.trivia}
                  </p>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-2 justify-center pt-2">
                  {courses.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentCourseIndex
                          ? 'w-8 bg-[#2D1B0D]'
                          : 'w-1.5 bg-[#2D1B0D]/30'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* WEATHER FORECAST */}
        <motion.div variants={item}>
          <Card className="bg-[#16191B] border-white/5 rounded-[2rem] shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 italic">
                <Wind className="text-blue-400" /> Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {weather.map((day, index) => (
                  <motion.div
                    key={day.date}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.03)" }}
                    className="bg-[#0B0D0E]/50 p-3 md:p-4 rounded-2xl border border-white/5 text-center transition-all"
                  >
                    <div className="text-xs md:text-sm text-slate-500 mb-1">{day.day}</div>
                    <div className="text-[10px] md:text-xs text-slate-600 mb-2">{day.date}</div>
                    <div className="text-3xl md:text-4xl mb-2">{day.icon}</div>
                    <div className="text-[10px] md:text-xs text-slate-400 mb-2">{day.condition}</div>
                    <div className="flex justify-center gap-1 md:gap-2 mb-2">
                      <span className="text-base md:text-lg font-bold text-red-400">{day.high}°</span>
                      <span className="text-base md:text-lg text-blue-400">{day.low}°</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[10px] md:text-xs text-slate-500 mb-1">
                      <Wind className="w-3 h-3" />
                      <span className="hidden md:inline">{day.wind}</span>
                      <span className="md:hidden">{day.wind.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-[10px] md:text-xs text-slate-500">
                      <Droplets className="w-3 h-3" />
                      <span>{day.precipitation}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* DINNER PLANS */}
        <motion.div variants={item}>
          <Card className="bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/30 rounded-[2rem] shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2 italic">
                <Calendar className="text-red-400" /> Saturday Night Dinner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">Bern's Steak House</h3>
                  <a 
                    href="https://maps.app.goo.gl/7zgZjcxfN5jnA5dy7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-4 text-xs md:text-sm group"
                  >
                    <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                    <span className="break-words">1208 S Howard Ave, Tampa, FL 33606</span>
                  </a>
                  <div className="space-y-3">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="bg-[#0B0D0E]/50 p-3 rounded-xl border border-white/5"
                    >
                      <div className="text-xs text-slate-400 uppercase mb-1 font-bold">Dress Code</div>
                      <div className="text-sm text-white">Business Casual - Collared shirts required, no shorts</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="bg-[#0B0D0E]/50 p-3 rounded-xl border border-white/5"
                    >
                      <div className="text-xs text-slate-400 uppercase mb-1 font-bold">Signature Dish</div>
                      <div className="text-sm text-white">Châteaubriand for Two - dry-aged USDA Prime beef</div>
                    </motion.div>
                  </div>
                </div>
                <div className="bg-[#0B0D0E]/50 p-4 rounded-xl border border-red-500/20">
                  <div className="text-xs text-red-400 uppercase mb-2 font-bold tracking-wider">Did You Know?</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Bern's boasts one of the world's largest wine collections with over 600,000 bottles! 
                    The wine cellar spans nearly half a city block. After dinner, head upstairs to the 
                    Harry Waugh Dessert Room - intimate booths where you can order from 50+ desserts and 
                    1,400 after-dinner drinks. Reservations book months in advance, so this is a big deal!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* TRIP STATS */}
        <motion.div variants={item}>
          <Card className="bg-[#16191B] border-white/5 rounded-[2rem] shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 italic">
                <TrendingUp className="text-green-400" /> Trip Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Holes', value: '54', color: 'text-[#b87333]' },
                  { label: 'Total Yards', value: '21,463', color: 'text-green-400' },
                  { label: 'Total Strokes', value: '???', color: 'text-blue-400' },
                  { label: 'Beers Consumed', value: 'TBD', color: 'text-orange-400' },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#0B0D0E]/50 p-3 md:p-4 rounded-2xl text-center border border-white/5 transition-all"
                  >
                    <div className={`text-2xl md:text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FOOTER */}
        <motion.div variants={item} className="text-center text-slate-600 text-sm pb-4">
          <p>Let's make this trip legendary. 🏌️‍♂️🍺🚬</p>
        </motion.div>

      </motion.div>
    </div>
  );
}

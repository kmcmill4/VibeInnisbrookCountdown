'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Award } from 'lucide-react';

interface Hole {
  number: number;
  par: number;
  yardage: number;
  handicap: number;
}

interface Course {
  id: string;
  name: string;
  nickname: string;
  totalPar: number;
  totalYardage: number;
  rating: number;
  slope: number;
  holes: Hole[];
  gradient: string;
  accentColor: string;
  trivia: string;
}

const courses: Course[] = [
  {
    id: 'roost',
    name: 'Roost',
    nickname: 'The Warm-Up',
    totalPar: 72,
    totalYardage: 7200,
    rating: 74.8,
    slope: 138,
    gradient: 'from-orange-600 via-orange-500 to-yellow-500',
    accentColor: 'orange',
    trivia: 'Cabot Citrus Farms is the sister property to the legendary Cabot Cliffs in Nova Scotia. The Roost course features citrus groves throughout - you\'re literally playing through orange trees!',
    holes: [
      { number: 1, par: 4, yardage: 410, handicap: 9 },
      { number: 2, par: 5, yardage: 540, handicap: 3 },
      { number: 3, par: 3, yardage: 185, handicap: 15 },
      { number: 4, par: 4, yardage: 425, handicap: 5 },
      { number: 5, par: 4, yardage: 395, handicap: 11 },
      { number: 6, par: 3, yardage: 195, handicap: 17 },
      { number: 7, par: 4, yardage: 445, handicap: 1 },
      { number: 8, par: 5, yardage: 560, handicap: 7 },
      { number: 9, par: 4, yardage: 405, handicap: 13 },
      { number: 10, par: 4, yardage: 420, handicap: 10 },
      { number: 11, par: 5, yardage: 535, handicap: 4 },
      { number: 12, par: 3, yardage: 200, handicap: 16 },
      { number: 13, par: 4, yardage: 440, handicap: 2 },
      { number: 14, par: 4, yardage: 385, handicap: 12 },
      { number: 15, par: 3, yardage: 175, handicap: 18 },
      { number: 16, par: 4, yardage: 435, handicap: 6 },
      { number: 17, par: 5, yardage: 545, handicap: 8 },
      { number: 18, par: 4, yardage: 415, handicap: 14 },
    ],
  },
  {
    id: 'copperhead',
    name: 'Copperhead',
    nickname: 'The Snake Pit',
    totalPar: 71,
    totalYardage: 7340,
    rating: 76.5,
    slope: 143,
    gradient: 'from-amber-600 via-amber-500 to-yellow-600',
    accentColor: 'amber',
    trivia: 'Holes 16, 17, and 18 have played at +0.562 over par since 2003. The 16th (Moccasin) has a fairway only 50 yards wide. Miss right, and you\'re in the drink. The Snake Pit has ended more tournament dreams than any other finishing stretch in Florida.',
    holes: [
      { number: 1, par: 4, yardage: 420, handicap: 11 },
      { number: 2, par: 5, yardage: 565, handicap: 3 },
      { number: 3, par: 3, yardage: 215, handicap: 15 },
      { number: 4, par: 4, yardage: 445, handicap: 5 },
      { number: 5, par: 4, yardage: 455, handicap: 1 },
      { number: 6, par: 4, yardage: 400, handicap: 13 },
      { number: 7, par: 3, yardage: 190, handicap: 17 },
      { number: 8, par: 5, yardage: 575, handicap: 7 },
      { number: 9, par: 4, yardage: 465, handicap: 9 },
      { number: 10, par: 4, yardage: 430, handicap: 10 },
      { number: 11, par: 4, yardage: 440, handicap: 4 },
      { number: 12, par: 3, yardage: 200, handicap: 16 },
      { number: 13, par: 5, yardage: 575, handicap: 6 },
      { number: 14, par: 4, yardage: 445, handicap: 2 },
      { number: 15, par: 3, yardage: 220, handicap: 14 },
      { number: 16, par: 4, yardage: 445, handicap: 8 },
      { number: 17, par: 3, yardage: 215, handicap: 18 },
      { number: 18, par: 4, yardage: 440, handicap: 12 },
    ],
  },
  {
    id: 'island',
    name: 'Island Course',
    nickname: 'The Tight One',
    totalPar: 72,
    totalYardage: 7125,
    rating: 75.2,
    slope: 137,
    gradient: 'from-emerald-600 via-emerald-500 to-teal-500',
    accentColor: 'emerald',
    trivia: 'Don\'t let the name fool you - this track is tight and tree-lined. Known for demanding accuracy over distance. The signature par-3 5th hole plays over water to a peninsula green. Legend has it that more balls have been lost on this hole than any other at Innisbrook.',
    holes: [
      { number: 1, par: 5, yardage: 545, handicap: 5 },
      { number: 2, par: 4, yardage: 390, handicap: 11 },
      { number: 3, par: 4, yardage: 445, handicap: 1 },
      { number: 4, par: 3, yardage: 195, handicap: 15 },
      { number: 5, par: 3, yardage: 180, handicap: 17 },
      { number: 6, par: 4, yardage: 415, handicap: 7 },
      { number: 7, par: 5, yardage: 565, handicap: 3 },
      { number: 8, par: 4, yardage: 400, handicap: 13 },
      { number: 9, par: 4, yardage: 425, handicap: 9 },
      { number: 10, par: 4, yardage: 410, handicap: 6 },
      { number: 11, par: 5, yardage: 540, handicap: 4 },
      { number: 12, par: 3, yardage: 210, handicap: 14 },
      { number: 13, par: 4, yardage: 440, handicap: 2 },
      { number: 14, par: 4, yardage: 395, handicap: 12 },
      { number: 15, par: 3, yardage: 175, handicap: 18 },
      { number: 16, par: 4, yardage: 430, handicap: 8 },
      { number: 17, par: 5, yardage: 555, handicap: 10 },
      { number: 18, par: 4, yardage: 410, handicap: 16 },
    ],
  },
  {
    id: 'south',
    name: 'South Course',
    nickname: 'Redemption',
    totalPar: 71,
    totalYardage: 6998,
    rating: 74.1,
    slope: 132,
    gradient: 'from-blue-600 via-blue-500 to-cyan-500',
    accentColor: 'blue',
    trivia: 'The "easier" of the three championship courses, but don\'t sleep on it. Features the most elevation changes of all Innisbrook courses - over 80 feet from high point to low. Perfect for redemption rounds after Copperhead humbles you.',
    holes: [
      { number: 1, par: 4, yardage: 385, handicap: 7 },
      { number: 2, par: 5, yardage: 535, handicap: 3 },
      { number: 3, par: 3, yardage: 185, handicap: 15 },
      { number: 4, par: 4, yardage: 420, handicap: 5 },
      { number: 5, par: 4, yardage: 405, handicap: 9 },
      { number: 6, par: 3, yardage: 195, handicap: 17 },
      { number: 7, par: 4, yardage: 425, handicap: 1 },
      { number: 8, par: 5, yardage: 550, handicap: 11 },
      { number: 9, par: 4, yardage: 390, handicap: 13 },
      { number: 10, par: 4, yardage: 395, handicap: 10 },
      { number: 11, par: 3, yardage: 175, handicap: 18 },
      { number: 12, par: 4, yardage: 415, handicap: 6 },
      { number: 13, par: 5, yardage: 545, handicap: 4 },
      { number: 14, par: 4, yardage: 400, handicap: 12 },
      { number: 15, par: 4, yardage: 385, handicap: 14 },
      { number: 16, par: 3, yardage: 205, handicap: 16 },
      { number: 17, par: 4, yardage: 430, handicap: 2 },
      { number: 18, par: 4, yardage: 460, handicap: 8 },
    ],
  },
];

export default function ScorecardsTab() {
  const [activeCourse, setActiveCourse] = useState(0);

  const course = courses[activeCourse];
  const frontNine = course.holes.slice(0, 9);
  const backNine = course.holes.slice(9, 18);

  return (
    <div className="p-4 pb-6">
      {/* Course Tabs - Redesigned with gradients */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
        {courses.map((c, index) => (
          <motion.button
            key={c.id}
            onClick={() => setActiveCourse(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-3 rounded-2xl text-sm font-black whitespace-nowrap transition-all relative overflow-hidden ${
              activeCourse === index
                ? 'text-black shadow-lg'
                : 'bg-[#1C1C1E] text-gray-400 border border-white/10'
            }`}
          >
            {activeCourse === index && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 bg-gradient-to-r ${c.gradient}`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              {activeCourse === index && <Sparkles size={14} />}
              {c.name}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Course Header - Redesigned with gradient border */}
          <div className="relative mb-6 overflow-hidden rounded-3xl">
            {/* Gradient border effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${course.gradient} opacity-20 blur-xl`} />
            
            <div className={`relative bg-[#1C1C1E] rounded-3xl p-5 border-2 border-transparent bg-clip-padding`}>
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${course.gradient} opacity-10`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white mb-1">{course.name}</h2>
                    <p className={`text-sm font-bold bg-gradient-to-r ${course.gradient} bg-clip-text text-transparent`}>
                      "{course.nickname}"
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${course.gradient}`}>
                    <Award className="text-black" size={24} />
                  </div>
                </div>
                
                {/* Trivia Box - Moved here */}
                <div className={`bg-gradient-to-br from-${course.accentColor}-500/10 to-${course.accentColor}-600/5 border border-${course.accentColor}-500/20 rounded-2xl p-4 mb-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className={`text-${course.accentColor}-400`} />
                    <span className={`text-xs font-bold text-${course.accentColor}-400 uppercase tracking-wider`}>
                      Course Intel
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {course.trivia}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: 'Par', value: course.totalPar, icon: '🎯' },
                    { label: 'Yards', value: course.totalYardage.toLocaleString(), icon: '📏' },
                    { label: 'Rating', value: course.rating, icon: '⭐' },
                    { label: 'Slope', value: course.slope, icon: '📈' },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="bg-black/40 rounded-xl p-3 text-center border border-white/5"
                    >
                      <div className="text-lg mb-1">{stat.icon}</div>
                      <div className="text-lg font-black text-white">{stat.value}</div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scorecard Tables - Enhanced design */}
          {/* Front Nine */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${course.gradient}`} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Front Nine</h3>
            </div>
            <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden border border-white/5 shadow-lg">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`bg-gradient-to-r ${course.gradient} bg-opacity-10`}>
                    <th className="py-3 px-3 text-left text-white font-black">Hole</th>
                    <th className="py-3 px-2 text-center text-white font-black">Par</th>
                    <th className="py-3 px-2 text-center text-white font-black">Yards</th>
                    <th className="py-3 px-2 text-center text-white font-black">HCP</th>
                  </tr>
                </thead>
                <tbody>
                  {frontNine.map((hole, index) => (
                    <motion.tr
                      key={hole.number}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className={`${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'} hover:bg-white/[0.05] transition-colors`}
                    >
                      <td className="py-3 px-3 font-black text-white">{hole.number}</td>
                      <td className="py-3 px-2 text-center text-white font-bold">{hole.par}</td>
                      <td className="py-3 px-2 text-center text-gray-300 font-medium">{hole.yardage}</td>
                      <td className="py-3 px-2 text-center text-gray-400">{hole.handicap}</td>
                    </motion.tr>
                  ))}
                  <tr className={`bg-gradient-to-r ${course.gradient} bg-opacity-20 border-t-2 border-${course.accentColor}-500/30`}>
                    <td className={`py-3 px-3 font-black text-${course.accentColor}-400`}>OUT</td>
                    <td className={`py-3 px-2 text-center font-black text-${course.accentColor}-400`}>
                      {frontNine.reduce((sum, h) => sum + h.par, 0)}
                    </td>
                    <td className={`py-3 px-2 text-center font-black text-${course.accentColor}-400`}>
                      {frontNine.reduce((sum, h) => sum + h.yardage, 0)}
                    </td>
                    <td className="py-3 px-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Nine */}
          <div>
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${course.gradient}`} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Back Nine</h3>
            </div>
            <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden border border-white/5 shadow-lg">
              <table className="w-full text-xs">
                <thead>
                  <tr className={`bg-gradient-to-r ${course.gradient} bg-opacity-10`}>
                    <th className="py-3 px-3 text-left text-white font-black">Hole</th>
                    <th className="py-3 px-2 text-center text-white font-black">Par</th>
                    <th className="py-3 px-2 text-center text-white font-black">Yards</th>
                    <th className="py-3 px-2 text-center text-white font-black">HCP</th>
                  </tr>
                </thead>
                <tbody>
                  {backNine.map((hole, index) => (
                    <motion.tr
                      key={hole.number}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className={`${index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'} hover:bg-white/[0.05] transition-colors ${
                        hole.number >= 16 && course.id === 'copperhead' ? 'bg-red-500/10 border-l-2 border-red-500' : ''
                      }`}
                    >
                      <td className="py-3 px-3 font-black text-white">
                        {hole.number}
                        {hole.number >= 16 && course.id === 'copperhead' && (
                          <span className="ml-1 text-xs">🐍</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center text-white font-bold">{hole.par}</td>
                      <td className="py-3 px-2 text-center text-gray-300 font-medium">{hole.yardage}</td>
                      <td className="py-3 px-2 text-center text-gray-400">{hole.handicap}</td>
                    </motion.tr>
                  ))}
                  <tr className={`bg-gradient-to-r ${course.gradient} bg-opacity-20 border-t-2 border-${course.accentColor}-500/30`}>
                    <td className={`py-3 px-3 font-black text-${course.accentColor}-400`}>IN</td>
                    <td className={`py-3 px-2 text-center font-black text-${course.accentColor}-400`}>
                      {backNine.reduce((sum, h) => sum + h.par, 0)}
                    </td>
                    <td className={`py-3 px-2 text-center font-black text-${course.accentColor}-400`}>
                      {backNine.reduce((sum, h) => sum + h.yardage, 0)}
                    </td>
                    <td className="py-3 px-2"></td>
                  </tr>
                  <tr className={`bg-gradient-to-r ${course.gradient} bg-opacity-30 border-t-4 border-${course.accentColor}-500/50`}>
                    <td className="py-3 px-3 font-black text-white">TOTAL</td>
                    <td className="py-3 px-2 text-center font-black text-white text-base">
                      {course.totalPar}
                    </td>
                    <td className="py-3 px-2 text-center font-black text-white text-base">
                      {course.totalYardage.toLocaleString()}
                    </td>
                    <td className="py-3 px-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

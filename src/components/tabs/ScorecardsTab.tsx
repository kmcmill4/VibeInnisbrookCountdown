'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  color: string;
}

const courses: Course[] = [
  {
    id: 'copperhead',
    name: 'Copperhead',
    nickname: 'The Snake Pit',
    totalPar: 71,
    totalYardage: 7340,
    rating: 76.5,
    slope: 143,
    color: 'bg-[#b87333]',
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
    color: 'bg-emerald-500',
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
    color: 'bg-blue-500',
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
      {/* Course Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {courses.map((c, index) => (
          <button
            key={c.id}
            onClick={() => setActiveCourse(index)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeCourse === index
                ? `${c.color} text-black`
                : 'bg-[#1C1C1E] text-gray-400'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={course.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Course Header */}
          <div className="bg-[#1C1C1E] rounded-2xl p-4 mb-4 border border-white/5">
            <h2 className="text-xl font-black text-white mb-1">{course.name}</h2>
            <p className="text-sm text-gray-400 mb-3">"{course.nickname}"</p>
            
            <div className="grid grid-cols-4 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-white">{course.totalPar}</div>
                <div className="text-[10px] text-gray-500 uppercase">Par</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{course.totalYardage.toLocaleString()}</div>
                <div className="text-[10px] text-gray-500 uppercase">Yards</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{course.rating}</div>
                <div className="text-[10px] text-gray-500 uppercase">Rating</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{course.slope}</div>
                <div className="text-[10px] text-gray-500 uppercase">Slope</div>
              </div>
            </div>
          </div>

          {/* Front Nine */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">Front Nine</h3>
            <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden border border-white/5">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/5">
                    <th className="py-2 px-2 text-left text-gray-400 font-semibold">Hole</th>
                    <th className="py-2 px-2 text-center text-gray-400 font-semibold">Par</th>
                    <th className="py-2 px-2 text-center text-gray-400 font-semibold">Yards</th>
                    <th className="py-2 px-2 text-center text-gray-400 font-semibold">HCP</th>
                  </tr>
                </thead>
                <tbody>
                  {frontNine.map((hole, index) => (
                    <tr key={hole.number} className={index % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                      <td className="py-2.5 px-2 font-bold text-white">{hole.number}</td>
                      <td className="py-2.5 px-2 text-center text-white">{hole.par}</td>
                      <td className="py-2.5 px-2 text-center text-gray-300">{hole.yardage}</td>
                      <td className="py-2.5 px-2 text-center text-gray-400">{hole.handicap}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#b87333]/10 border-t border-[#b87333]/30">
                    <td className="py-2.5 px-2 font-black text-[#b87333]">OUT</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#b87333]">
                      {frontNine.reduce((sum, h) => sum + h.par, 0)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#b87333]">
                      {frontNine.reduce((sum, h) => sum + h.yardage, 0)}
                    </td>
                    <td className="py-2.5 px-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Back Nine */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">Back Nine</h3>
            <div className="bg-[#1C1C1E] rounded-2xl overflow-hidden border border-white/5">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/5">
                    <th className="py-2 px-2 text-left text-gray-400 font-semibold">Hole</th>
                    <th className="py-2 px-2 text-center text-gray-400 font-semibold">Par</th>
                    <th className="py-2 px-2 text-center text-gray-400 font-semibold">Yards</th>
                    <th className="py-2 px-2 text-center text-gray-400 font-semibold">HCP</th>
                  </tr>
                </thead>
                <tbody>
                  {backNine.map((hole, index) => (
                    <tr 
                      key={hole.number} 
                      className={`${index % 2 === 0 ? 'bg-white/[0.02]' : ''} ${
                        hole.number >= 16 && course.id === 'copperhead' ? 'bg-red-500/10' : ''
                      }`}
                    >
                      <td className="py-2.5 px-2 font-bold text-white">
                        {hole.number}
                        {hole.number >= 16 && course.id === 'copperhead' && (
                          <span className="ml-1 text-[9px] text-red-400">🐍</span>
                        )}
                      </td>
                      <td className="py-2.5 px-2 text-center text-white">{hole.par}</td>
                      <td className="py-2.5 px-2 text-center text-gray-300">{hole.yardage}</td>
                      <td className="py-2.5 px-2 text-center text-gray-400">{hole.handicap}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#b87333]/10 border-t border-[#b87333]/30">
                    <td className="py-2.5 px-2 font-black text-[#b87333]">IN</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#b87333]">
                      {backNine.reduce((sum, h) => sum + h.par, 0)}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#b87333]">
                      {backNine.reduce((sum, h) => sum + h.yardage, 0)}
                    </td>
                    <td className="py-2.5 px-2"></td>
                  </tr>
                  <tr className="bg-[#b87333]/20 border-t-2 border-[#b87333]/50">
                    <td className="py-2.5 px-2 font-black text-white">TOTAL</td>
                    <td className="py-2.5 px-2 text-center font-black text-white">
                      {course.totalPar}
                    </td>
                    <td className="py-2.5 px-2 text-center font-black text-white">
                      {course.totalYardage.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Snake Pit Callout for Copperhead */}
          {course.id === 'copperhead' && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-2xl p-3">
              <div className="text-xs font-bold text-red-400 mb-1">🐍 THE SNAKE PIT</div>
              <p className="text-xs text-gray-300">
                Holes 16-18 are historically the toughest finishing stretch in Florida. 
                Combined average: +0.562 over par since 2003.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

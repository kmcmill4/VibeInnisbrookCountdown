'use client';

import { useState, useEffect } from 'react';
import { Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface Prediction {
  player: string;
  hole16: number;
  hole17: number;
  hole18: number;
  total: number;
  submitted: boolean;
}

export default function SnakePitTab() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/predictions');
      if (response.ok) {
        const data = await response.json();
        setPredictions(data.predictions);
      }
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const snakePitPar = 10; // Hole 16 (par 4) + Hole 17 (par 3) + Hole 18 (par 4)

  // Sort predictions by total score (lowest first)
  const sortedPredictions = [...predictions]
    .filter(p => p.submitted)
    .sort((a, b) => a.total - b.total);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🐍</div>
        <h1 className="text-2xl font-black">The Snake Pit</h1>
        <p className="text-xs text-gray-400 mt-1">Holes 16, 17, 18 • Copperhead Course</p>
      </div>

      {/* Course Info */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 mb-4">
        <h2 className="text-sm font-bold text-red-400 mb-2">⚠️ The Gauntlet</h2>
        <p className="text-xs text-gray-300 leading-relaxed mb-3">
          These three holes have played at +0.562 over par since 2003, making them 
          the toughest finishing stretch in Florida.
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { hole: '16', name: 'Moccasin', par: 4, yards: 445 },
            { hole: '17', name: 'Rattler', par: 3, yards: 215 },
            { hole: '18', name: 'Copperhead', par: 4, yards: 440 },
          ].map((hole) => (
            <div key={hole.hole} className="bg-black/30 rounded-lg p-2">
              <div className="text-lg font-black text-red-400">#{hole.hole}</div>
              <div className="text-[10px] text-gray-400 uppercase">{hole.name}</div>
              <div className="text-xs text-white mt-1">Par {hole.par}</div>
              <div className="text-[10px] text-gray-500">{hole.yards} yds</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prediction Leaderboard */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={18} className="text-[#b87333]" />
          <h2 className="text-lg font-bold">Predictions</h2>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400 text-sm">Loading predictions...</div>
        ) : sortedPredictions.length === 0 ? (
          <div className="bg-[#1C1C1E] rounded-2xl p-6 text-center border border-white/5">
            <p className="text-sm text-gray-400 mb-3">No predictions yet!</p>
            <a
              href="/predict"
              className="inline-block px-4 py-2 bg-[#b87333] text-black font-bold rounded-full text-sm"
            >
              Make Your Prediction
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedPredictions.map((prediction, index) => {
              const overPar = prediction.total - snakePitPar;
              const isWinning = index === 0;

              return (
                <motion.div
                  key={prediction.player}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-[#1C1C1E] rounded-2xl p-4 border ${
                    isWinning ? 'border-[#b87333]' : 'border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isWinning && <Trophy size={16} className="text-[#b87333]" />}
                      <span className="font-bold text-white">{prediction.player}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-white">{prediction.total}</div>
                      <div className={`text-xs ${
                        overPar > 0 ? 'text-red-400' : overPar < 0 ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {overPar > 0 ? '+' : ''}{overPar}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-black/30 rounded-lg p-2 text-center">
                      <div className="text-gray-400 mb-0.5">Hole 16</div>
                      <div className="font-bold text-white">{prediction.hole16}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 text-center">
                      <div className="text-gray-400 mb-0.5">Hole 17</div>
                      <div className="font-bold text-white">{prediction.hole17}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-2 text-center">
                      <div className="text-gray-400 mb-0.5">Hole 18</div>
                      <div className="font-bold text-white">{prediction.hole18}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Make Prediction Button */}
      <div className="mt-4">
        <a
          href="/predict"
          className="block w-full bg-gradient-to-r from-[#b87333] to-[#d4954f] text-black font-black text-center py-4 rounded-2xl active:scale-95 transition-transform"
        >
          <div className="flex items-center justify-center gap-2">
            <Target size={20} />
            <span>Make Your Prediction</span>
          </div>
        </a>
      </div>

      {/* Stats */}
      <div className="mt-4 bg-[#1C1C1E] rounded-2xl p-4 border border-white/5">
        <h3 className="text-sm font-bold text-white mb-3">Snake Pit Stats</h3>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-2xl font-black text-[#b87333]">{snakePitPar}</div>
            <div className="text-[10px] text-gray-500 uppercase">Combined Par</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">1,100</div>
            <div className="text-[10px] text-gray-500 uppercase">Total Yards</div>
          </div>
        </div>
      </div>
    </div>
  );
}

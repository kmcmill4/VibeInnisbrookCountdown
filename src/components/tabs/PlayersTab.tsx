'use client';

import { Users, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Player {
  nickname: string;
  handicap: number;
}

const players: Player[] = [
  { nickname: 'KMac', handicap: 8 },
  { nickname: 'BK', handicap: 12 },
  { nickname: 'Benny', handicap: 15 },
  { nickname: 'Gootz', handicap: 6 },
  { nickname: 'Peppy', handicap: 10 },
  { nickname: 'Caker', handicap: 14 },
  { nickname: 'Rosey', handicap: 9 },
  { nickname: 'Bluey', handicap: 11 },
  { nickname: 'Frenchie', handicap: 13 },
  { nickname: 'RayRay', handicap: 7 },
];

export default function PlayersTab() {
  // Sort players by handicap (lowest first)
  const sortedPlayers = [...players].sort((a, b) => a.handicap - b.handicap);
  
  const avgHandicap = Math.round(
    players.reduce((sum, p) => sum + p.handicap, 0) / players.length
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🏌️‍♂️</div>
        <h1 className="text-2xl font-black">The Squad</h1>
        <p className="text-xs text-gray-400 mt-1">10 players ready to tee it up</p>
      </div>

      {/* Team Stats */}
      <div className="bg-[#1C1C1E] rounded-2xl p-4 mb-4 border border-white/5">
        <h2 className="text-sm font-bold text-white mb-3">Team Stats</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-2xl font-black text-[#b87333]">{players.length}</div>
            <div className="text-[10px] text-gray-500 uppercase">Players</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">{avgHandicap}</div>
            <div className="text-[10px] text-gray-500 uppercase">Avg HCP</div>
          </div>
          <div>
            <div className="text-2xl font-black text-green-400">
              {Math.min(...players.map(p => p.handicap))}
            </div>
            <div className="text-[10px] text-gray-500 uppercase">Low HCP</div>
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-[#b87333]" />
          <h2 className="text-lg font-bold">Roster</h2>
        </div>

        <div className="space-y-2">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.nickname}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b87333] to-[#d4954f] flex items-center justify-center font-black text-black text-sm">
                  {player.nickname.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-white">{player.nickname}</div>
                  <div className="text-xs text-gray-400">Handicap Index</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-white">{player.handicap}</div>
                <div className="text-[10px] text-gray-500 uppercase">HCP</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-3">
        <div className="text-xs font-bold text-purple-300 mb-1">🔒 Privacy Protected</div>
        <p className="text-xs text-gray-300">
          Only nicknames are displayed to protect player identities on this public site.
        </p>
      </div>

      {/* Handicap Info */}
      <div className="mt-4 bg-[#1C1C1E] rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-2 mb-2">
          <TrendingDown size={16} className="text-[#b87333]" />
          <h3 className="text-sm font-bold text-white">About Handicaps</h3>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          Handicap Index measures playing ability. Lower numbers indicate better players. 
          Course handicap will be adjusted based on the specific tees and slope rating played.
        </p>
      </div>
    </div>
  );
}

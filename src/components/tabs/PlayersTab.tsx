'use client';

import { useState, useEffect } from 'react';
import { Users, Edit2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Player {
  nickname: string;
  handicap: number;
}

const INITIAL_PLAYERS: Player[] = [
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
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [editMode, setEditMode] = useState(false);
  const [editedPlayers, setEditedPlayers] = useState<Player[]>(INITIAL_PLAYERS);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('golf-players');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPlayers(parsed);
        setEditedPlayers(parsed);
      } catch (e) {
        console.error('Failed to load players:', e);
      }
    }
  }, []);

  const sortedPlayers = [...players].sort((a, b) => a.handicap - b.handicap);
  const avgHandicap = Math.round(
    players.reduce((sum, p) => sum + p.handicap, 0) / players.length
  );

  const handleEdit = () => {
    setEditedPlayers([...players]);
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditedPlayers([...players]);
    setEditMode(false);
  };

  const handleSave = () => {
    setPlayers([...editedPlayers]);
    localStorage.setItem('golf-players', JSON.stringify(editedPlayers));
    setEditMode(false);
  };

  const updateHandicap = (nickname: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setEditedPlayers(prev =>
      prev.map(p => (p.nickname === nickname ? { ...p, handicap: numValue } : p))
    );
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🏌️‍♂️</div>
        <h1 className="text-2xl font-black">The Squad</h1>
        <p className="text-xs text-gray-400 mt-1">10 players ready to tee it up</p>
      </div>

      {/* Team Stats */}
      <div className="bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] rounded-2xl p-4 mb-4 border border-white/5 shadow-lg">
        <h2 className="text-sm font-bold text-white mb-3">Team Stats</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Players', value: players.length, color: 'text-[#b87333]', emoji: '👥' },
            { label: 'Avg HCP', value: avgHandicap, color: 'text-white', emoji: '📊' },
            { label: 'Low HCP', value: Math.min(...players.map(p => p.handicap)), color: 'text-green-400', emoji: '⭐' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="bg-black/30 rounded-xl p-3"
            >
              <div className="text-xl mb-1">{stat.emoji}</div>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Edit Controls */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-[#b87333]" />
          <h2 className="text-lg font-bold">Roster</h2>
        </div>
        
        {!editMode ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-[#b87333] text-black font-bold rounded-xl text-sm"
          >
            <Edit2 size={14} />
            <span>Edit Handicaps</span>
          </motion.button>
        ) : (
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-2 bg-[#1C1C1E] text-gray-400 font-bold rounded-xl text-sm border border-white/10"
            >
              <X size={14} />
              <span>Cancel</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white font-bold rounded-xl text-sm"
            >
              <Save size={14} />
              <span>Save</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Players List */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {(editMode ? editedPlayers : sortedPlayers).map((player, index) => (
            <motion.div
              key={player.nickname}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.03 }}
              className={`bg-gradient-to-r from-[#1C1C1E] to-[#2C2C2E] rounded-2xl p-4 border border-white/5 flex items-center justify-between shadow-lg ${
                editMode ? 'border-[#b87333]/30' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b87333] to-[#d4954f] flex items-center justify-center font-black text-black text-base shadow-lg">
                  {player.nickname.substring(0, 2).toUpperCase()}
                </div>
                <div className="font-bold text-white text-lg">{player.nickname}</div>
              </div>
              
              {editMode ? (
                <input
                  type="number"
                  value={player.handicap}
                  onChange={(e) => updateHandicap(player.nickname, e.target.value)}
                  className="w-20 bg-black/40 border-2 border-[#b87333]/50 rounded-xl px-3 py-2 text-white text-2xl font-black text-center focus:outline-none focus:border-[#b87333]"
                  min="0"
                  max="54"
                />
              ) : (
                <div className="text-right">
                  <div className="text-3xl font-black text-white">{player.handicap}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">HCP</div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Privacy Notice */}
      <div className="mt-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-3">
        <div className="text-xs font-bold text-purple-300 mb-1">🔒 Privacy Protected</div>
        <p className="text-xs text-gray-300 leading-relaxed">
          Only nicknames are displayed to protect player identities on this public site.
        </p>
      </div>

      {editMode && (
        <div className="mt-4 bg-[#b87333]/10 border border-[#b87333]/30 rounded-2xl p-3">
          <div className="text-xs font-bold text-[#b87333] mb-1">💡 Edit Mode</div>
          <p className="text-xs text-gray-300">
            Tap on any handicap value to edit. Changes are saved locally on your device.
          </p>
        </div>
      )}
    </div>
  );
}

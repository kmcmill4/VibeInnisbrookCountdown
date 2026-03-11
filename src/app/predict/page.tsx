'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send } from 'lucide-react';

const PLAYER_NICKNAMES = [
  'KMac', 'BK', 'Benny', 'Gootz', 'Peppy',
  'Caker', 'Rosey', 'Bluey', 'Frenchie', 'RayRay'
];

export default function PredictPage() {
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [hole16, setHole16] = useState('');
  const [hole17, setHole17] = useState('');
  const [hole18, setHole18] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const total = (parseInt(hole16) || 0) + (parseInt(hole17) || 0) + (parseInt(hole18) || 0);
  const snakePitPar = 11; // 4 + 3 + 4
  const overPar = total - snakePitPar;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedPlayer) {
      setError('Please select your nickname');
      return;
    }

    if (!hole16 || !hole17 || !hole18) {
      setError('Please predict scores for all three holes');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/predictions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player: selectedPlayer,
          hole16: parseInt(hole16),
          hole17: parseInt(hole17),
          hole18: parseInt(hole18),
          total,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit prediction');
      }

      // Success - redirect back to home
      router.push('/?tab=snakepit');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white p-4">
      <div className="max-w-md mx-auto pt-safe">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 bg-[#1C1C1E] rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black">Make Your Prediction</h1>
            <p className="text-xs text-gray-400">Snake Pit Challenge</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info Box at Top */}
          <div className="bg-[#1C1C1E] rounded-2xl p-3 border border-white/5">
            <p className="text-xs text-gray-400 leading-relaxed">
              💡 Predict how many strokes you think you'll need for each hole in the Snake Pit. 
              You can update your prediction anytime before the round.
            </p>
          </div>

          {/* Player Selection */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Who are you?
            </label>
            <select
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="w-full bg-[#1C1C1E] border border-white/10 rounded-xl px-4 py-3 text-white"
              required
            >
              <option value="">Select your nickname</option>
              {PLAYER_NICKNAMES.map((nickname) => (
                <option key={nickname} value={nickname}>
                  {nickname}
                </option>
              ))}
            </select>
          </div>

          {/* Hole Predictions */}
          <div className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5">
            <h2 className="text-sm font-bold text-white mb-3">Predict Your Scores</h2>
            
            <div className="space-y-3">
              {[
                { hole: '16', name: 'Moccasin', par: 4, value: hole16, onChange: setHole16 },
                { hole: '17', name: 'Rattler', par: 3, value: hole17, onChange: setHole17 },
                { hole: '18', name: 'Copperhead', par: 4, value: hole18, onChange: setHole18 },
              ].map((hole) => (
                <div key={hole.hole}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-white">Hole {hole.hole}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        {hole.name} • Par {hole.par}
                      </span>
                    </div>
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={hole.value}
                    onChange={(e) => hole.onChange(e.target.value)}
                    placeholder={`Par ${hole.par}`}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-bold text-center"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Total Display */}
          {total > 0 && (
            <div className="bg-gradient-to-br from-[#b87333]/20 to-[#b87333]/10 border border-[#b87333]/30 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-400">Predicted Total</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Par is {snakePitPar}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white">{total}</div>
                  <div className={`text-sm font-bold ${
                    overPar > 0 ? 'text-red-400' : overPar < 0 ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {overPar > 0 ? '+' : ''}{overPar}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-[#b87333] to-[#d4954f] text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-50 disabled:scale-100"
          >
            {submitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send size={20} />
                <span>Submit Prediction</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Wind, Droplets, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function WeatherTab() {
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/weather');
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather');
      }
      
      const data = await response.json();
      setWeather(data.forecast);
    } catch (err) {
      setError('Unable to load weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleRefresh = () => {
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-400">Loading weather...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <p className="text-sm text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#1C1C1E] rounded-full text-sm font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-black">Weather Forecast</h1>
          <p className="text-xs text-gray-400 mt-1">Palm Harbor, FL</p>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 bg-[#1C1C1E] rounded-full active:scale-95 transition-transform"
        >
          <RefreshCw size={18} className="text-gray-400" />
        </button>
      </div>

      {/* Weather Cards */}
      <div className="space-y-3">
        {weather.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1C1C1E] rounded-2xl p-4 border border-white/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-bold text-white">{day.day}</div>
                <div className="text-xs text-gray-400">{day.date}</div>
              </div>
              <div className="text-4xl">{day.icon}</div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-300">{day.condition}</div>
              <div className="flex gap-3">
                <div className="text-right">
                  <div className="text-2xl font-bold text-red-400">{day.high}°</div>
                  <div className="text-xs text-gray-500">High</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-400">{day.low}°</div>
                  <div className="text-xs text-gray-500">Low</div>
                </div>
              </div>
            </div>

            {/* Golf-Specific Data */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Wind size={14} className="text-blue-400" />
                  <span className="text-xs text-gray-400">Wind</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {day.wind_dir} {day.wind_mph} mph
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Droplets size={14} className="text-blue-400" />
                  <span className="text-xs text-gray-400">Rain</span>
                </div>
                <div className="text-sm font-bold text-white">{day.precip_chance}%</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Droplets size={14} className="text-gray-400" />
                  <span className="text-xs text-gray-400">Humid</span>
                </div>
                <div className="text-sm font-bold text-white">{day.humidity}%</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Golf Tip */}
      <div className="mt-4 bg-[#b87333]/10 border border-[#b87333]/30 rounded-2xl p-3">
        <div className="text-xs font-bold text-[#b87333] mb-1">⛳ Golf Weather Tip</div>
        <p className="text-xs text-gray-300">
          Wind direction matters! Check which way the wind is blowing before each round 
          to plan your strategy on approach shots.
        </p>
      </div>
    </div>
  );
}

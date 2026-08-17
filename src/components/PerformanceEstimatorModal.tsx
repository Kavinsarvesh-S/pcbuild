import React, { useState } from 'react';
import type { SelectedParts } from '../types/pcBuilder';
import { X, Gamepad2, Monitor, Award } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceEstimatorModalProps {
  isOpen: boolean;
  selectedParts: SelectedParts;
  onClose: () => void;
}

export const PerformanceEstimatorModal: React.FC<PerformanceEstimatorModalProps> = ({
  isOpen,
  selectedParts,
  onClose,
}) => {
  const [resolution, setResolution] = useState<'1080p' | '1440p' | '4K'>('1440p');

  if (!isOpen) return null;

  const gpu = selectedParts.gpu;
  const cpu = selectedParts.cpu;

  // Base tier multipliers
  const getGpuMultiplier = () => {
    if (!gpu) return 0;
    if (gpu.id.includes('4090')) return 1.0;
    if (gpu.id.includes('4070') || gpu.id.includes('7800')) return 0.65;
    if (gpu.id.includes('4060')) return 0.42;
    return 0.5;
  };

  const getCpuMultiplier = () => {
    if (!cpu) return 0;
    if (cpu.id.includes('7800x3d') || cpu.id.includes('14900')) return 1.0;
    if (cpu.id.includes('13600k')) return 0.85;
    if (cpu.id.includes('7600')) return 0.72;
    return 0.6;
  };

  const gpuMult = getGpuMultiplier();
  const cpuMult = getCpuMultiplier();

  // Resolution factors
  const resFactor = resolution === '1080p' ? 1.0 : resolution === '1440p' ? 0.72 : 0.42;

  // Game FPS estimations
  const games = [
    {
      name: 'Cyberpunk 2077 (Ray Tracing)',
      genre: 'AAA Open World',
      baseFps: 165,
      icon: '🌃',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      name: 'Call of Duty: Warzone',
      genre: 'Battle Royale',
      baseFps: 240,
      icon: '🪖',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      name: 'Fortnite (Unreal Engine 5)',
      genre: 'Esports Shooter',
      baseFps: 280,
      icon: '⚡',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      name: 'Valorant / CS2',
      genre: 'Competitive FPS',
      baseFps: 550,
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  // Workstation score out of 100
  const workstationScore = gpu && cpu ? Math.round((gpuMult * 0.55 + cpuMult * 0.45) * 100) : 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-white/10 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-3xl glass-layer border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          {/* Header */}
          <div className="p-5 glass-layer border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Performance & FPS Estimator Matrix
                </h2>
                <p className="text-xs text-white/70">Real-time benchmark calculations powered by CPU & GPU pairing</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-white/70 hover:text-white transition hover-gemini-gradient"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Resolution Selector Tabs */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider pl-2 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-indigo-600" /> Target Resolution:
              </span>
              <div className="flex items-center gap-1">
                {(['1080p', '1440p', '4K'] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition hover-gemini-gradient ${
                      resolution === res
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-white/80 hover:text-white hover:bg-slate-200'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Pair Badge */}
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-indigo-700 uppercase tracking-wider font-bold">Active Engine Pair</span>
                <p className="text-sm font-bold text-white mt-0.5">
                  {gpu ? gpu.name : 'No GPU Selected'} + {cpu ? cpu.name : 'No CPU Selected'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/70 uppercase font-semibold">Workstation Score</span>
                <p className="text-lg font-mono font-extrabold text-[#FF9E1B] flex items-center gap-1 justify-end">
                  <Award className="w-4 h-4 text-[#FF9E1B]" /> {workstationScore}/100
                </p>
              </div>
            </div>

            {/* Game FPS Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {games.map((game) => {
                const calculatedFps = Math.round(game.baseFps * gpuMult * (0.6 + cpuMult * 0.4) * resFactor);
                const isFluid = calculatedFps >= 60;

                return (
                  <div
                    key={game.name}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition hover-gemini-gradient space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{game.icon}</span>
                        <div>
                          <h3 className="text-xs font-bold text-white">{game.name}</h3>
                          <span className="text-[10px] text-white/70">{game.genre}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-white/70">{resolution}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                      <span className="text-xs text-white/70">Estimated Framerate</span>
                      <span className={`text-2xl font-mono font-extrabold ${isFluid ? 'text-indigo-600' : 'text-[#FF9E1B]'}`}>
                        {calculatedFps > 0 ? `${calculatedFps} FPS` : 'Select Parts'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
                      <div
                        className={`h-full bg-gradient-to-r ${game.color} transition hover-gemini-gradient-all duration-500`}
                        style={{ width: `${Math.min(100, Math.round((calculatedFps / 300) * 100))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition hover-gemini-gradient"
            >
              Back to Builder
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


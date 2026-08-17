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
      color: 'from-[#DAEBF2]0 to-teal-500',
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
      <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-3xl bg-transparent/95 border border-[#94BDCF] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-800"
        >
          {/* Header */}
          <div className="p-5 bg-white/40 border-b border-[#94BDCF]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#80CCE3]/30 border border-[#80CCE3] text-slate-900">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  Performance & FPS Estimator Matrix
                </h2>
                <p className="text-xs text-slate-600">Real-time benchmark calculations powered by CPU & GPU pairing</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 transition border border-[#94BDCF]/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto bg-white/30">
            {/* Resolution Selector Tabs */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-[#94BDCF]/60">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider pl-2 flex items-center gap-1.5">
                <Monitor className="w-4 h-4 text-sky-700" /> Target Resolution:
              </span>
              <div className="flex items-center gap-1">
                {(['1080p', '1440p', '4K'] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                      resolution === res
                        ? 'bg-[#80CCE3] text-slate-950 font-bold shadow-xs border border-sky-400'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    {res}
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Pair Badge */}
            <div className="p-4 rounded-xl bg-white/80 border border-[#94BDCF]/60 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-[10px] text-sky-800 uppercase tracking-wider font-bold">Active Engine Pair</span>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {gpu ? gpu.name : 'No GPU Selected'} + {cpu ? cpu.name : 'No CPU Selected'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Workstation Score</span>
                <p className="text-lg font-mono font-extrabold text-sky-800 flex items-center gap-1 justify-end">
                  <Award className="w-4 h-4 text-sky-700" /> {workstationScore}/100
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
                    className="p-4 rounded-xl bg-white/80 border border-[#94BDCF]/60 hover:border-[#94BDCF] transition space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{game.icon}</span>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900">{game.name}</h3>
                          <span className="text-[10px] text-slate-500">{game.genre}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-500">{resolution}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-200">
                      <span className="text-xs text-slate-600">Estimated Framerate</span>
                      <span className={`text-2xl font-mono font-extrabold ${isFluid ? 'text-sky-800' : 'text-slate-700'}`}>
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

          <div className="p-4 bg-white/40 border-t border-[#94BDCF]/60 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-950 font-bold text-xs transition border border-sky-400"
            >
              Back to Builder
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


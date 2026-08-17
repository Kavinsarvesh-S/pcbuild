import React, { useState } from 'react';
import { Cpu, DollarSign, Sparkles, RefreshCw, Share2, Layers, BookmarkPlus, Check, ShoppingCart } from 'lucide-react';
import { PRESET_BUILDS } from '../data/presets';
import type { PresetBuild } from '../types/pcBuilder';
import { formatRupees } from '../utils/currencyFormatter';
import { motion } from 'framer-motion';

interface NavbarProps {
  budget: number;
  onOpenBudgetModal: () => void;
  onSelectPreset: (preset: PresetBuild) => void;
  onResetBuild: () => void;
  onOpenShareModal: () => void;
  onOpenPerformanceModal: () => void;
  onGoToHome?: () => void;
  onGoToCheckout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  budget,
  onOpenBudgetModal,
  onSelectPreset,
  onResetBuild,
  onOpenShareModal,
  onOpenPerformanceModal,
  onGoToHome,
  onGoToCheckout,
}) => {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

  const handleSelectPreset = (preset: PresetBuild) => {
    onSelectPreset(preset);
    setCopiedPresetId(preset.id);
    setShowPresetsMenu(false);
    setTimeout(() => setCopiedPresetId(null), 1500);
  };

  return (
    <header className="sticky top-0 z-[60] w-full bg-white/10 backdrop-blur-[32px] border-b border-white/20 px-4 lg:px-8 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={onGoToHome}
          className="flex items-center gap-3 text-left transition hover-gemini-gradient group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3D6E] via-[#FF9E1B] to-[#FF3D6E] flex items-center justify-center shadow-md border border-rose-500/50">
            <Cpu className="w-6 h-6 text-white font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-brand font-bold tracking-wider text-white flex items-center gap-1.5">
                EDITH
              </h1>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-rose-500/40/40 text-white border border-rose-500/50 rounded-full">
                Pastel Dream
              </span>
            </div>
            <p className="text-xs text-white/70 hidden sm:block">Hardware Compatibility & Real-Time Engine</p>
          </div>
        </motion.button>

        {/* Center Actions / Preset selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Preset Builder Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-layer hover:bg-[#FF9E1B]/20/60 border border-rose-500/40 text-xs sm:text-sm font-medium text-white transition hover-gemini-gradient shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#FF9E1B]" />
              <span className="hidden md:inline">Load Preset Build</span>
              <span className="md:hidden">Presets</span>
              <Layers className="w-3.5 h-3.5 text-rose-400" />
            </motion.button>

            {showPresetsMenu && (
              <div className="absolute right-0 sm:left-0 mt-2 w-72 sm:w-80 glass-panel glass-layer/95 border border-rose-500/40 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-rose-500/40/60">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Curated Template Rigs
                  </p>
                </div>
                <div className="py-1 space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {['Gaming / Streaming', 'Content Creation', 'Engineering Works', 'Data Science and others'].map(cat => (
                    <div key={cat} className="mb-2">
                      <div className="px-3 py-1 text-[10px] font-bold text-rose-400 uppercase tracking-wider bg-rose-500/20/10 border-y border-rose-500/40/30 my-1">
                        {cat}
                      </div>
                      {PRESET_BUILDS.filter(p => p.category === cat).map((preset) => (
                        <motion.button
                          whileHover={{ scale: 1.01, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className="w-full text-left p-2.5 rounded-lg hover:bg-rose-500/20/30 border border-transparent hover:border-rose-500/40 transition hover-gemini-gradient flex items-start justify-between group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white group-hover:text-white">
                                {preset.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/40/30 text-white font-medium border border-rose-500/50/40">
                                {preset.badge}
                              </span>
                            </div>
                            <p className="text-xs text-white/70 line-clamp-1 mt-0.5">{preset.tagline}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-[#FF9E1B]">
                              {formatRupees(preset.estimatedPrice)}
                            </span>
                            {copiedPresetId === preset.id && (
                              <div className="text-[10px] text-[#FF9E1B] flex items-center gap-0.5 justify-end mt-0.5 font-bold">
                                <Check className="w-3 h-3" /> Loaded
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Budget Setting Trigger */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenBudgetModal}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FF9E1B]/20 hover:bg-[#FF9E1B]/30 border border-[#FF9E1B]/40 text-xs sm:text-sm font-medium text-white transition hover-gemini-gradient shadow-xs"
          >
            <DollarSign className="w-4 h-4 text-[#FF9E1B]" />
            <span>Target: <strong className="font-mono text-white">{formatRupees(budget)}</strong></span>
          </motion.button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {/* Performance Benchmark Modal Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPerformanceModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20/60 hover:bg-rose-500/50 border border-rose-500/50 text-xs font-semibold text-white transition hover-gemini-gradient"
            title="Estimate Gaming FPS & Benchmarks"
          >
            <BookmarkPlus className="w-4 h-4 text-[#1E293B]" />
            <span className="hidden lg:inline">FPS Stats</span>
          </motion.button>

          {/* Share / Export */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenShareModal}
            className="p-2 rounded-xl glass-layer hover:bg-[#22151F] border border-rose-500/40 text-white/90 transition hover-gemini-gradient shadow-xs"
            title="Share or Export Build"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResetBuild}
            className="p-2 rounded-xl glass-layer hover:bg-rose-500/10 hover:text-rose-400 border border-rose-500/40 text-white/70 transition hover-gemini-gradient shadow-xs"
            title="Reset Build"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>

          {/* Checkout Button */}
          {onGoToCheckout && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGoToCheckout}
              className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/90 text-white font-bold text-xs transition hover-gemini-gradient shadow-md flex items-center gap-1 border border-rose-500/50"
              title="Proceed to Checkout"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Checkout</span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};

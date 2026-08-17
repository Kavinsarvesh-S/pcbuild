import React, { useState } from 'react';
import { DollarSign, Sparkles, RefreshCw, Share2, Layers, BookmarkPlus, Check, ShoppingCart } from 'lucide-react';
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
    <div className="relative z-40 w-full bg-white/40 backdrop-blur-md border-b border-[#B0DEED] px-4 lg:px-8 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Center Actions / Preset selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Preset Builder Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 hover:bg-[#80CCE3]/20 border border-[#B0DEED] text-xs sm:text-sm font-semibold text-slate-900 transition shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-sky-700" />
              <span className="hidden md:inline">Load Preset Build</span>
              <span className="md:hidden">Presets</span>
              <Layers className="w-3.5 h-3.5 text-sky-700" />
            </motion.button>

            {showPresetsMenu && (
              <div className="absolute right-0 sm:left-0 mt-2 w-72 sm:w-80 bg-white/80 border border-[#B0DEED]/100 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-3xl">
                <div className="px-3 py-2 border-b border-[#B0DEED]/60">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Curated Template Rigs
                  </p>
                </div>
                <div className="py-1 space-y-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {['Gaming / Streaming', 'Content Creation', 'Engineering Works', 'Data Science and others'].map(cat => (
                    <div key={cat} className="mb-2">
                      <div className="px-3 py-1 text-[10px] font-bold text-sky-800 uppercase tracking-wider bg-[#80CCE3]/20 border-y border-[#B0DEED]/50 my-1 rounded-sm">
                        {cat}
                      </div>
                      {PRESET_BUILDS.filter(p => p.category === cat).map((preset) => (
                        <motion.button
                          whileHover={{ scale: 1.01, x: 2 }}
                          whileTap={{ scale: 0.98 }}
                          key={preset.id}
                          onClick={() => handleSelectPreset(preset)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-[#80CCE3]/15 border border-transparent hover:border-[#B0DEED] transition flex items-start justify-between group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900">
                                {preset.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#80CCE3]/30 text-slate-800 font-bold border border-[#80CCE3]/60">
                                {preset.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{preset.tagline}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-slate-900">
                              {formatRupees(preset.estimatedPrice)}
                            </span>
                            {copiedPresetId === preset.id && (
                              <div className="text-[10px] text-emerald-700 flex items-center gap-0.5 justify-end mt-0.5 font-bold">
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
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#80CCE3]/25 hover:bg-[#80CCE3]/40 border border-[#80CCE3] text-xs sm:text-sm font-semibold text-slate-900 transition shadow-xs"
          >
            <DollarSign className="w-4 h-4 text-sky-700" />
            <span>Target: <strong className="font-mono text-slate-900">{formatRupees(budget)}</strong></span>
          </motion.button>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {/* Performance Benchmark Modal Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPerformanceModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 hover:bg-[#80CCE3]/20 border border-[#B0DEED] text-xs font-semibold text-slate-900 transition shadow-xs"
            title="Estimate Gaming FPS & Benchmarks"
          >
            <BookmarkPlus className="w-4 h-4 text-sky-700" />
            <span className="hidden lg:inline">FPS Stats</span>
          </motion.button>

          {/* Share / Export */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenShareModal}
            className="p-2 rounded-xl bg-white/80 hover:bg-[#80CCE3]/20 border border-[#B0DEED] text-slate-800 transition shadow-xs"
            title="Share or Export Build"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>

          {/* Reset */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onResetBuild}
            className="p-2 rounded-xl bg-white/80 hover:bg-rose-50 hover:text-rose-600 border border-[#B0DEED] text-slate-700 transition shadow-xs"
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
              className="px-3.5 py-1.5 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-950 font-bold text-xs transition shadow-sm flex items-center gap-1 border border-sky-400"
              title="Proceed to Checkout"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Checkout</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sparkles, Gamepad2, Layers, Cpu } from 'lucide-react';
import { PRESET_BUILDS } from '../data/presets';
import type { PresetBuild } from '../types/pcBuilder';
import { formatRupees } from '../utils/currencyFormatter';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Footer } from './Footer';

interface PresetsPageProps {
  initialCategory: PresetBuild['category'] | null;
  onSelectPreset: (preset: PresetBuild) => void;
  onGoToHome: () => void;
  onGoToContact: () => void;
}

export const PresetsPage: React.FC<PresetsPageProps> = ({
  initialCategory,
  onSelectPreset,
  onGoToHome,
  onGoToContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<PresetBuild['category']>(
    initialCategory || 'Gaming / Streaming'
  );

  return (
    <motion.div
      key="presets"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-transparent text-slate-900 flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 w-full flex-1">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#94BDCF]/40 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-brand font-bold text-slate-900 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#80CCE3]" /> Prebuild Gallery
            </h1>
            <p className="text-sm text-slate-600 mt-2">Select any pre-configured template to load directly into the builder.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar: Categories */}
          <div className="w-full lg:w-1/4 space-y-3 shrink-0">
            <h3 className="text-sm font-bold text-slate-900 mb-4 px-2 uppercase tracking-wider">Purpose</h3>
            {['Gaming / Streaming', 'Content Creation', 'Engineering Works', 'Data Science and others'].map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  key={cat}
                  onClick={() => setSelectedCategory(cat as PresetBuild['category'])}
                  className={`w-full text-left relative px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'text-slate-900 bg-[#80CCE3]/20 border border-[#80CCE3]/40 shadow-sm'
                      : 'glass-layer text-slate-700 border border-transparent hover:bg-white/50 hover:border-[#94BDCF]/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSidebarCategoryPresets"
                      className="absolute inset-0 bg-[#80CCE3]/20 border border-[#80CCE3]/40 rounded-2xl shadow-sm z-0"
                      initial={false}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {cat === 'Gaming / Streaming' && <Gamepad2 className="w-4 h-4" />}
                    {cat === 'Content Creation' && <Sparkles className="w-4 h-4" />}
                    {cat === 'Engineering Works' && <Layers className="w-4 h-4" />}
                    {cat === 'Data Science and others' && <Cpu className="w-4 h-4" />}
                    {cat}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Main Area: Grid of Cards */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESET_BUILDS.filter(p => p.category === selectedCategory).map((preset) => (
              <Tilt 
                key={preset.id}
                tiltMaxAngleX={10} 
                tiltMaxAngleY={10} 
                perspective={1000} 
                scale={1.02} 
                transitionSpeed={250}
                className="h-full"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => onSelectPreset(preset)}
                  className="bg-white/20 backdrop-blur-2xl cursor-pointer rounded-3xl p-5 border border-[#94BDCF]/40 glass-layer shadow-md flex flex-col h-full bg-white/80 hover:border-[#94BDCF]/50 hover:shadow-xl transition-all"
                >
                  {/* Top Text */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{preset.name}</h3>
                    <p className="text-sm font-semibold text-[#80CCE3] mt-1">{preset.tier}</p>
                  </div>

                  {/* Image Area - 3D Pop-Out */}
                  <div className="mb-8 w-full">
                    {preset.image ? (
                      <figure 
                        className="character-card" 
                        style={{ '--bg-img': `url(${preset.image})` } as React.CSSProperties}
                      >
                        <img src={preset.image.replace('/assest/', '/tran/')} alt={preset.name} />
                        <figcaption className="character-card-caption">{preset.tier}</figcaption>
                      </figure>
                    ) : (
                      <div className="w-full aspect-[4/5] bg-transparent rounded-2xl overflow-hidden relative shadow-inner flex items-center justify-center text-slate-700">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Bottom Text */}
                  <div className="mt-auto flex flex-col">
                    <span className="text-xs text-slate-600 font-medium uppercase tracking-widest">Starts</span>
                    <span className="text-xl font-bold text-slate-900">
                      {formatRupees(preset.estimatedPrice)}
                    </span>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
      <Footer onGoToHome={onGoToHome} onGoToContact={onGoToContact} />
    </motion.div>
  );
};

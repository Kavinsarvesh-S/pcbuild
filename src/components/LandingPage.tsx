import React, { useState } from 'react';
import { Cpu, Sparkles, ArrowRight, Zap, ShieldCheck, Gamepad2, Box, Layers } from 'lucide-react';
import type { PresetBuild } from '../types/pcBuilder';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

interface LandingPageProps {
  onStartBuilding: () => void;
  onGoToContact: () => void;
  onGoToHome: () => void;
  onGoToPresets?: (category: PresetBuild['category']) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilding,
  onGoToContact,
  onGoToHome,
  onGoToPresets,
}) => {
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { name: 'Home', action: onGoToHome },
    { name: 'Prebuilds', action: () => onGoToPresets && onGoToPresets('Gaming / Streaming') },
    { name: 'About', action: () => { } },
    { name: 'Contact', action: onGoToContact },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-[#DAEBF2] text-slate-800 flex flex-col"
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-[60] w-full glass-panel border-b border-[#B0DEED] px-4 lg:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#80CCE3] via-[#B0DEED] to-[#B0DEED] flex items-center justify-center shadow-md border border-[#80CCE3]">
              <Cpu className="w-6 h-6 text-slate-800 font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-brand font-bold tracking-wider text-slate-900 flex items-center gap-1.5">
                EDITH
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">Edith PC Builder Studio</p>
            </div>
          </div>

          {/* Navigation Links */}
          {/* Elastic Slider Navigation Links */}
          <div className="hidden md:flex items-center p-1.5 rounded-full bg-[#B0DEED]/20 border border-[#B0DEED]/40 backdrop-blur-md shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    item.action();
                  }}
                  className={`relative px-5 py-2 text-sm font-bold transition-colors duration-300 z-10 rounded-full ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-[#80CCE3] rounded-full shadow-md z-[-1]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.name}
                </button>
              );
            })}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartBuilding}
            className="px-4 py-2 rounded-xl bg-[#80CCE3] hover:bg-[#7ab4e3] text-slate-900 font-bold text-xs shadow-md transition hover-gemini-gradient flex items-center gap-1.5 border border-[#80CCE3]"
          >
            <span>Launch PC Builder</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 w-full flex-1 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C2DAE6] border border-[#94BDCF] shadow-xs text-xs font-semibold text-slate-800">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Interactive Real-Time Hardware Compatibility Studio</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-brand font-extrabold text-slate-900 tracking-tight leading-tight text-center">
            <span className="block">EDITH PC BUILDER</span>
            <span className="block text-gradient-lavender text-sm sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-3 whitespace-nowrap">
              Smarter build — Zero compromise
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Select parts, validate CPU socket compatibility, memory standards, power supply headroom, and estimate real gaming FPS across 45+ hardware components.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStartBuilding}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#80CCE3] hover:bg-[#7ab4e3] text-slate-950 font-extrabold text-sm shadow-lg shadow-[#80CCE3]/30 transition hover-gemini-gradient flex items-center justify-center gap-2 border border-[#80CCE3]"
            >
              <span>Start Building Custom Rig</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#presets"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl glass-layer hover:bg-[#C2DAE6] border border-[#B0DEED] text-slate-800 font-bold text-sm transition hover-gemini-gradient shadow-xs flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#80CCE3]" />
              <span>Explore Ready Presets</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Category Accordion Section */}
        <div id="presets" className="w-full mt-16 text-left space-y-8">
          <div className="flex flex-col items-center justify-center text-center gap-2 pb-4">
            <h2 className="text-3xl font-brand font-bold text-slate-900">
              Choose Your Path
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Select a category below to explore our curated prebuilt PC gallery, explicitly tuned for your exact workflow.
            </p>
          </div>

          <div className="w-full h-[60vh] min-h-[500px] flex flex-col md:flex-row rounded-3xl group/accordion px-4 md:px-8">
            {/* Gaming Card */}
            <div
              onClick={() => onGoToPresets && onGoToPresets('Gaming / Streaming')}
              className="relative flex-1 hover:-translate-y-12 hover:shadow-2xl hover:z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 z-10"
            >
              <img src="/assest/gndc.jpeg" alt="Gaming" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col gap-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#C2DAE6] text-amber-800 flex items-center justify-center shadow-lg">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none whitespace-nowrap drop-shadow-md">Gaming /<br />Streaming</h3>
              </div>
            </div>

            {/* Content Creation Card */}
            <div
              onClick={() => onGoToPresets && onGoToPresets('Content Creation')}
              className="relative flex-1 -mt-12 md:mt-0 md:-ml-16 hover:-translate-y-12 hover:shadow-2xl hover:z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 z-20"
            >
              <img src="/assest/cc.jpeg" alt="Content Creation" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col gap-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#C2DAE6] text-rose-800 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none whitespace-nowrap drop-shadow-md">Content<br />Creation</h3>
              </div>
            </div>

            {/* Engineering Works Card */}
            <div
              onClick={() => onGoToPresets && onGoToPresets('Engineering Works')}
              className="relative flex-1 -mt-12 md:mt-0 md:-ml-16 hover:-translate-y-12 hover:shadow-2xl hover:z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 z-30"
            >
              <img src="/assest/eng.jpg" alt="Engineering" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col gap-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#B0DEED] text-blue-800 flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none whitespace-nowrap drop-shadow-md">Engineering<br />Works</h3>
              </div>
            </div>

            {/* Data Science Card */}
            <div
              onClick={() => onGoToPresets && onGoToPresets('Data Science and others')}
              className="relative flex-1 -mt-12 md:mt-0 md:-ml-16 hover:-translate-y-12 hover:shadow-2xl hover:z-50 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 z-40"
            >
              <img src="/assest/ds.jpeg" alt="Data Science" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8 flex flex-col gap-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-xl bg-[#B0DEED] text-purple-800 flex items-center justify-center shadow-lg">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none whitespace-nowrap drop-shadow-md">Data<br />Science</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-24 text-left">
          {/* Feature 1 */}
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-panel p-6 rounded-3xl border border-[#B0DEED] bg-[#B0DEED]/30 shadow-md hover:shadow-2xl hover:border-[#80CCE3] transition-all duration-300 space-y-3 cursor-default">
            <div className="p-3 w-12 h-12 rounded-2xl bg-[#B0DEED]/60 text-slate-900 flex items-center justify-center border border-[#80CCE3] shadow-sm">
              <ShieldCheck className="w-6 h-6 text-indigo-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Real-Time Validation</h3>
            <p className="text-sm text-slate-500">
              Instant socket matching (AM4/AM5/LGA1700), DDR4/DDR5 checks, and motherboard size fit. Missing nothing—complete compatibility mapping.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-panel p-6 rounded-3xl border border-[#94BDCF] bg-[#C2DAE6]/70 shadow-md hover:shadow-2xl hover:border-amber-400 transition-all duration-300 space-y-3 cursor-default">
            <div className="p-3 w-12 h-12 rounded-2xl bg-[#94BDCF] text-amber-800 flex items-center justify-center border border-[#94BDCF] shadow-sm">
              <Zap className="w-6 h-6 text-amber-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Wattage & Budget Tracker</h3>
            <p className="text-sm text-slate-500">
              Live power load estimation in Watts and budget tracking in Indian Rupees (₹).
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-panel p-6 rounded-3xl border border-[#94BDCF] bg-[#C2DAE6]/60 shadow-md hover:shadow-2xl hover:border-rose-400 transition-all duration-300 space-y-3 cursor-default">
            <div className="p-3 w-12 h-12 rounded-2xl bg-[#94BDCF] text-rose-800 flex items-center justify-center border border-[#94BDCF] shadow-sm">
              <Gamepad2 className="w-6 h-6 text-rose-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">FPS Estimator</h3>
            <p className="text-sm text-slate-500">
              Simulate frame rates for Cyberpunk 2077, Warzone, Fortnite, and CS2 at 1080p, 1440p, or 4K.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div whileHover={{ y: -8, scale: 1.02 }} className="glass-panel p-6 rounded-3xl border border-[#B0DEED] bg-[#B0DEED]/20 shadow-md hover:shadow-2xl hover:border-purple-400 transition-all duration-300 space-y-3 cursor-default">
            <div className="p-3 w-12 h-12 rounded-2xl bg-[#B0DEED]/60 text-slate-900 flex items-center justify-center border border-[#B0DEED] shadow-sm">
              <Box className="w-6 h-6 text-purple-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Interactive Blueprint</h3>
            <p className="text-sm text-slate-500">
              Visual PC tower layout diagram allowing direct slot clicks and part swapping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer onGoToHome={onGoToHome} onGoToContact={onGoToContact} />
    </motion.div>
  );
};

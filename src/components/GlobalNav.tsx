import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GlobalNavProps {
  activeView: string;
  onGoToHome: () => void;
  onGoToPresets: () => void;
  onGoToAbout: () => void;
  onGoToContact: () => void;
  onGoToAuth: () => void;
  onGoToBuilder: () => void;
}

export const GlobalNav: React.FC<GlobalNavProps> = ({
  activeView,
  onGoToHome,
  onGoToPresets,
  onGoToAbout,
  onGoToContact,
  onGoToAuth,
  onGoToBuilder
}) => {
  const navItems = [
    { name: 'Home', action: onGoToHome, id: 'landing' },
    { name: 'Prebuild', action: onGoToPresets, id: 'presets' },
    { name: 'Custom', action: onGoToBuilder, id: 'builder' },
    { name: 'About', action: onGoToAbout, id: 'about' },
    { name: 'Contact', action: onGoToContact, id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-[60] w-full bg-white/20 backdrop-blur-md border-b border-[#B0DEED]/40 px-4 lg:px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button onClick={onGoToHome} className="flex items-center gap-2 text-left">
          <img src="/assest/logo.png" alt="EDITH Logo" className="h-[52px] w-auto object-contain drop-shadow-md" />
          <div className="flex flex-col">
            <h1 className="text-xl font-brand font-bold tracking-wider text-slate-900 leading-none">
              EDITH
            </h1>
          </div>
        </button>

        {/* Elastic Slider Navigation Links */}
        <div className="hidden md:flex items-center p-1.5 rounded-full bg-[#B0DEED]/20 border border-[#B0DEED]/40 shadow-inner">
          {navItems.map((item) => {
            // Treat builder, checkout as 'landing' or just let them have no active tab
            // Let's explicitly match id, if no match, nothing is highlighted. 
            // Or we map builder/checkout to 'landing' for simplicity.
            const isActive = activeView === item.id || (item.id === 'builder' && activeView === 'checkout');
            return (
              <button
                key={item.name}
                onClick={item.action}
                className={`relative px-5 py-2 text-sm font-bold transition-colors duration-300 z-10 rounded-full ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
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
          onClick={onGoToAuth}
          className="px-4 py-2 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-900 font-bold text-xs shadow-md transition hover-gemini-gradient flex items-center gap-1.5 border border-[#80CCE3]"
        >
          <span className="hidden sm:inline">Sign Up / Login</span>
          <span className="sm:hidden">Login</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </header>
  );
};

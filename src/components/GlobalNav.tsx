import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

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
  onGoToBuilder,
}) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      onGoToHome();
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  const navItems = [
    { name: 'Home', action: onGoToHome, id: 'landing' },
    { name: 'Prebuild', action: onGoToPresets, id: 'presets' },
    { name: 'Custom', action: onGoToBuilder, id: 'builder' },
    { name: 'About', action: onGoToAbout, id: 'about' },
    { name: 'Contact', action: onGoToContact, id: 'contact' },
  ];

  // Derive initial for avatar
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const initial = displayName.charAt(0).toUpperCase();

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

        {/* Auth CTA or User Profile Badge */}
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/40 hover:bg-white/60 border border-[#B0DEED] backdrop-blur-md shadow-sm transition"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#80CCE3] to-[#94BDCF] text-slate-900 font-bold flex items-center justify-center text-sm shadow-inner border border-white/60">
                {initial}
              </div>
              <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate hidden sm:inline">
                {displayName}
              </span>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white/80 border border-[#B0DEED] rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl"
                >
                  <div className="px-3 py-2.5 border-b border-[#B0DEED]/50 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{displayName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onGoToBuilder();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#80CCE3]/20 hover:text-slate-900 transition flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-sky-700" />
                    <span>My PC Builds</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-2 mt-1"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
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
        )}
      </div>
    </header>
  );
};

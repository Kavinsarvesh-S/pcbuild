import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col pt-32 px-4 lg:px-8 max-w-7xl mx-auto w-full space-y-8"
    >
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-white/20 animate-pulse border border-[#80CCE3]/30" />
        <div className="space-y-3">
          <div className="w-48 h-6 rounded-lg bg-white/20 animate-pulse" />
          <div className="w-32 h-4 rounded-lg bg-white/10 animate-pulse" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl border border-[#94BDCF]/20 h-64 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="w-full h-4 rounded-lg bg-white/20 animate-pulse" />
                <div className="w-2/3 h-3 rounded-lg bg-white/10 animate-pulse" />
              </div>
            </div>
            <div className="mt-auto space-y-2">
              <div className="w-full h-8 rounded-xl bg-white/10 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Centered Loading indicator */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
        <div className="p-4 rounded-2xl glass-panel shadow-2xl flex flex-col items-center gap-3">
          <Cpu className="w-8 h-8 text-[#80CCE3] animate-bounce" />
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#94BDCF] animate-ping" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-[#80CCE3] animate-ping" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-[#B0DEED] animate-ping" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

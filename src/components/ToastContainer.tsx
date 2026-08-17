import React from 'react';
import type { ToastMessage } from '../types/pcBuilder';

import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-xl flex items-start justify-between gap-3 ${
              toast.type === 'error'
                ? 'bg-rose-500/90 border-rose-500/50/60 text-rose-400 shadow-rose-950/50'
                : toast.type === 'warning'
                ? 'bg-[#FF9E1B]/90 border-[#FF9E1B]/50/60 text-[#FF9E1B] shadow-amber-950/50'
                : toast.type === 'success'
                ? 'bg-[#FF9E1B]/90 border-[#FF9E1B]/50/60 text-[#FF9E1B] shadow-emerald-950/50'
                : 'bg-[#22151F]/90 border-cyan-500/60 text-white/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#FF9E1B]" />}
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#FF9E1B]" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider">{toast.title}</h4>
                <p className="text-xs mt-1 leading-relaxed opacity-95">{toast.description}</p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-[#22151F]/60 text-white/60 hover:text-white transition hover-gemini-gradient shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

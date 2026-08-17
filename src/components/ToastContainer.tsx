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
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-xl flex items-start justify-between gap-3 ${
              toast.type === 'error'
                ? 'bg-rose-50/95 border-rose-300 text-rose-950'
                : toast.type === 'warning'
                ? 'bg-amber-50/95 border-amber-300 text-amber-950'
                : toast.type === 'success'
                ? 'bg-emerald-50/95 border-emerald-300 text-emerald-950'
                : 'bg-sky-50/95 border-sky-300 text-sky-950'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-600" />}
                {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-sky-600" />}
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider">{toast.title}</h4>
                <p className="text-xs mt-0.5 leading-relaxed opacity-90 font-medium">{toast.description}</p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 text-slate-500 hover:text-slate-800 transition shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

import React, { useState } from 'react';
import { X, DollarSign, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRupees } from '../utils/currencyFormatter';

interface BudgetModalProps {
  isOpen: boolean;
  currentBudget: number;
  onSaveBudget: (newBudget: number) => void;
  onClose: () => void;
}

export const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  currentBudget,
  onSaveBudget,
  onClose,
}) => {
  const [val, setVal] = useState<number>(currentBudget);

  if (!isOpen) return null;

  const quickPresets = [50000, 80000, 120000, 180000, 350000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val > 0) {
      onSaveBudget(val);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-white/10 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md glass-layer border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 text-white"
        >
          <div className="p-5 glass-layer border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-[#FF9E1B]/50 text-[#FF9E1B]">
                <DollarSign className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-white">Define Target PC Budget</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-white/70 hover:text-white transition hover-gemini-gradient"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
                Target Budget Limit (INR ₹)
              </label>
              <div className="relative">
                <span className="text-[#FF9E1B] font-mono font-bold text-lg absolute left-3 top-2.5">₹</span>
                <input
                  type="number"
                  min="20000"
                  max="1000000"
                  step="1000"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 text-lg font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl text-white focus:outline-none focus:border-[#FF9E1B]/50"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="block text-xs text-white/70 font-medium mb-2">Quick Budget Targets:</span>
              <div className="flex flex-wrap gap-2">
                {quickPresets.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => setVal(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition hover-gemini-gradient ${
                      val === preset
                        ? 'bg-[#FF9E1B] text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-white/90 border border-slate-200 hover:border-[#FF9E1B]/50'
                    }`}
                  >
                    {formatRupees(preset)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 text-white/80 text-xs font-semibold hover:bg-slate-200 transition hover-gemini-gradient"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#FF9E1B] hover:bg-[#FF9E1B] text-white font-bold text-xs shadow-md transition hover-gemini-gradient flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save Budget
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

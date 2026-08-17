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
      <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md bg-transparent/95 border border-[#94BDCF] rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-800"
        >
          <div className="p-5 bg-white/40 border-b border-[#94BDCF]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#80CCE3]/30 border border-[#80CCE3] text-slate-900">
                <DollarSign className="w-5 h-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Define Target PC Budget</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 transition border border-[#94BDCF]/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white/30">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Target Budget Limit (INR ₹)
              </label>
              <div className="relative">
                <span className="text-sky-700 font-mono font-bold text-lg absolute left-3 top-2.5">₹</span>
                <input
                  type="number"
                  min="20000"
                  max="1000000"
                  step="1000"
                  value={val}
                  onChange={(e) => setVal(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 text-lg font-mono font-bold bg-white/90 border border-[#94BDCF]/60 rounded-xl text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <span className="block text-xs text-slate-600 font-medium mb-2">Quick Budget Targets:</span>
              <div className="flex flex-wrap gap-2">
                {quickPresets.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => setVal(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                      val === preset
                        ? 'bg-[#80CCE3] text-slate-950 font-bold shadow-xs border border-sky-400'
                        : 'bg-white/80 text-slate-800 border border-[#94BDCF]/60 hover:bg-white'
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
                className="px-4 py-2 rounded-xl bg-white/60 text-slate-700 text-xs font-semibold hover:bg-white transition border border-[#94BDCF]/60"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5 border border-sky-400"
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

import React from 'react';
import type { CompatibilityReport } from '../types/pcBuilder';
import { DollarSign, Zap, CheckCircle2, AlertTriangle, ShieldCheck, BarChart2, ShoppingCart } from 'lucide-react';
import { formatRupees } from '../utils/currencyFormatter';
import { motion } from 'framer-motion';

interface BottomSummaryBarProps {
  report: CompatibilityReport;
  budget: number;
  onOpenReportModal: () => void;
  onOpenPerformanceModal: () => void;
  onProceedToCheckout?: () => void;
}

export const BottomSummaryBar: React.FC<BottomSummaryBarProps> = ({
  report,
  budget,
  onOpenReportModal,
  onOpenPerformanceModal,
  onProceedToCheckout,
}) => {
  const isOverBudget = report.totalPrice > budget;
  const budgetPercentage = Math.min(100, Math.round((report.totalPrice / budget) * 100));

  const psuWattage = report.psuCapacity || 0;
  const wattagePercentage = psuWattage > 0 ? Math.min(100, Math.round((report.totalWattage / psuWattage) * 100)) : 0;
  const isWattageHigh = psuWattage > 0 && report.totalWattage + 100 > psuWattage;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-[32px] border-t border-white/20 py-3 px-4 lg:px-8 shadow-[0_-4px_30px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Total Price & Budget Progress */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isOverBudget ? 'bg-rose-500/10 border-rose-500/40 text-rose-400' : 'glass-layer border-white/40 text-white'}`}>
              <DollarSign className="w-5 h-5 text-[#FF9E1B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/70 uppercase font-semibold tracking-wider">Total Price</span>
                {isOverBudget && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/50 font-bold">
                    Over Budget
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl sm:text-2xl font-mono font-extrabold ${isOverBudget ? 'text-rose-400' : 'text-white'}`}>
                  {formatRupees(report.totalPrice)}
                </span>
                <span className="text-xs text-white/70 font-mono">/ {formatRupees(budget)} target</span>
              </div>
            </div>
          </div>

          {/* Mini Budget Bar */}
          <div className="hidden sm:block w-28 glass-layer h-2.5 rounded-full overflow-hidden border border-white/40 p-0.5">
            <div
              className={`h-full rounded-full transition hover-gemini-gradient-all duration-500 ${
                isOverBudget ? 'bg-rose-500/30' : 'bg-rose-500/20'
              }`}
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
        </div>

        {/* Center: System Power / Wattage Status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start border-t md:border-t-0 border-rose-500/40 pt-2 md:pt-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isWattageHigh ? 'bg-[#FF9E1B]/30 border-[#FF9E1B]/40 text-[#FF9E1B]' : 'glass-layer border-white/40 text-white'}`}>
              <Zap className="w-5 h-5 text-[#FF9E1B]" />
            </div>
            <div>
              <span className="text-xs text-white/70 uppercase font-semibold tracking-wider">Estimated Load</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-mono font-bold text-[#FF9E1B]">
                  {report.totalWattage}W
                </span>
                <span className="text-xs text-white/70 font-mono">
                  {psuWattage > 0 ? `/ ${psuWattage}W PSU` : '(No PSU)'}
                </span>
              </div>
            </div>
          </div>

          {/* Mini Power Bar */}
          {psuWattage > 0 && (
            <div className="hidden sm:block w-24 glass-layer h-2.5 rounded-full overflow-hidden border border-white/40 p-0.5">
              <div
                className={`h-full rounded-full transition hover-gemini-gradient-all duration-500 ${
                  isWattageHigh ? 'bg-[#FF9E1B]' : 'bg-rose-500/20'
                }`}
                style={{ width: `${wattagePercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Right: Visual Compatibility Status & Checkout */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 border-rose-500/40 pt-2 md:pt-0">
          {/* Compatibility Pill */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenReportModal}
            className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition hover-gemini-gradient flex items-center gap-1.5 shadow-xs ${
              report.isCompatible
                ? 'glass-layer border-white/40 text-white hover:bg-white/40'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-400 hover:bg-rose-500/30 animate-pulse'
            }`}
          >
            {report.isCompatible ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9E1B]" />
                <span className="hidden sm:inline">Compatible</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>{report.errors.length} Conflict{report.errors.length > 1 ? 's' : ''}</span>
              </>
            )}
          </motion.button>

          {/* Audit breakdown */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenReportModal}
            className="px-3 py-1.5 rounded-xl glass-layer hover:bg-[#FF9E1B]/20 border border-rose-500/40 text-xs font-semibold text-white transition hover-gemini-gradient flex items-center gap-1 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Audit</span>
          </motion.button>

          {/* Performance estimator */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPerformanceModal}
            className="px-3 py-1.5 rounded-xl glass-layer hover:bg-rose-500/20/40 text-white font-bold text-xs transition hover-gemini-gradient flex items-center gap-1 border border-rose-500/40 shadow-xs"
          >
            <BarChart2 className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">FPS Stats</span>
          </motion.button>

          {/* Checkout Main Trigger Button */}
          {onProceedToCheckout && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProceedToCheckout}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/90 text-white font-extrabold text-xs shadow-md transition hover-gemini-gradient flex items-center gap-1.5 border border-rose-500/50"
            >
              <ShoppingCart className="w-4 h-4 text-white" />
              <span>Checkout →</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

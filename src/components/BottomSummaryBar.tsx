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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-transparent/95 backdrop-blur-2xl border-t border-[#B0DEED] py-3 px-4 lg:px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Total Price & Budget Progress */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isOverBudget ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white/80 border-[#B0DEED] text-slate-900'}`}>
              <DollarSign className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 uppercase font-bold tracking-wider">Total Price</span>
                {isOverBudget && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 border border-rose-300 font-bold">
                    Over Budget
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl sm:text-2xl font-mono font-extrabold ${isOverBudget ? 'text-rose-700' : 'text-slate-900'}`}>
                  {formatRupees(report.totalPrice)}
                </span>
                <span className="text-xs text-slate-600 font-mono">/ {formatRupees(budget)} target</span>
              </div>
            </div>
          </div>

          {/* Mini Budget Bar */}
          <div className="hidden sm:block w-28 bg-white/80 h-2.5 rounded-full overflow-hidden border border-[#B0DEED] p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? 'bg-rose-500' : 'bg-[#80CCE3]'
              }`}
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
        </div>

        {/* Center: System Power / Wattage Status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start border-t md:border-t-0 border-[#B0DEED]/60 pt-2 md:pt-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${isWattageHigh ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white/80 border-[#B0DEED] text-slate-900'}`}>
              <Zap className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <span className="text-xs text-slate-600 uppercase font-bold tracking-wider">Estimated Load</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-mono font-bold text-sky-800">
                  {report.totalWattage}W
                </span>
                <span className="text-xs text-slate-600 font-mono">
                  {psuWattage > 0 ? `/ ${psuWattage}W PSU` : '(No PSU)'}
                </span>
              </div>
            </div>
          </div>

          {/* Mini Power Bar */}
          {psuWattage > 0 && (
            <div className="hidden sm:block w-24 bg-white/80 h-2.5 rounded-full overflow-hidden border border-[#B0DEED] p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isWattageHigh ? 'bg-amber-500' : 'bg-[#80CCE3]'
                }`}
                style={{ width: `${wattagePercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Right: Visual Compatibility Status & Checkout */}
        <div className="flex items-center gap-2 sm:gap-2.5 w-full md:w-auto justify-end border-t md:border-t-0 border-[#B0DEED]/60 pt-2 md:pt-0">
          {/* Compatibility Pill */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenReportModal}
            className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition flex items-center gap-1.5 shadow-xs ${
              report.isCompatible
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                : 'bg-rose-100 border-rose-300 text-rose-800 hover:bg-rose-200 animate-pulse'
            }`}
          >
            {report.isCompatible ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Compatible</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{report.errors.length} Conflict{report.errors.length > 1 ? 's' : ''}</span>
              </>
            )}
          </motion.button>

          {/* Audit breakdown */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenReportModal}
            className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-[#80CCE3]/20 border border-[#B0DEED] text-xs font-semibold text-slate-800 transition flex items-center gap-1 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-700" />
            <span className="hidden sm:inline">Audit</span>
          </motion.button>

          {/* Performance estimator */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPerformanceModal}
            className="px-3 py-1.5 rounded-xl bg-white/80 hover:bg-[#80CCE3]/20 text-slate-800 font-semibold text-xs transition flex items-center gap-1 border border-[#B0DEED] shadow-xs"
          >
            <BarChart2 className="w-3.5 h-3.5 text-sky-700" />
            <span className="hidden sm:inline">FPS Stats</span>
          </motion.button>

          {/* Checkout Main Trigger Button */}
          {onProceedToCheckout && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onProceedToCheckout}
              className="px-4 py-2 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-1.5 border border-sky-400"
            >
              <ShoppingCart className="w-4 h-4 text-slate-950" />
              <span>Checkout →</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import type { CompatibilityReport, SelectedParts } from '../types/pcBuilder';

import { X, ShieldAlert, CheckCircle2, AlertTriangle, Cpu, Zap, CircuitBoard, Box, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompatibilityModalProps {
  isOpen: boolean;
  report: CompatibilityReport;
  selectedParts: SelectedParts;
  onClose: () => void;
}

export const CompatibilityModal: React.FC<CompatibilityModalProps> = ({
  isOpen,
  report,
  selectedParts,
  onClose,
}) => {
  if (!isOpen) return null;

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
          className="relative w-full max-w-2xl glass-layer border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          {/* Header */}
          <div className="p-5 glass-layer border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${report.isCompatible ? 'bg-emerald-50 border-[#FF9E1B]/50 text-[#FF9E1B]' : 'bg-rose-50 border-rose-500/50 text-rose-400'}`}>
                {report.isCompatible ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Hardware Audit & Compatibility Report</h2>
                <p className="text-xs text-white/70">Deep validation check across sockets, memory standards & power buffers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-white/70 hover:text-white transition hover-gemini-gradient"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Status Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              report.isCompatible
                ? 'bg-emerald-50 border-[#FF9E1B]/50 text-[#FF9E1B]'
                : 'bg-rose-50 border-rose-500/50 text-rose-400'
            }`}>
              {report.isCompatible ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-[#FF9E1B] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-[#FF9E1B]">System Compatibility Check Passed!</h3>
                    <p className="text-xs text-[#FF9E1B] mt-0.5">
                      All selected components feature matching processor sockets, RAM DDR generations, case form factor dimensions, and sufficient PSU power headroom.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-rose-400">{report.errors.length} Conflict(s) Detected</h3>
                    <p className="text-xs text-rose-400 mt-0.5">
                      Your current component selection contains hardware mismatches. Please resolve the issues listed below.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Error Details */}
            {report.errors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Incompatibility Issues ({report.errors.length})
                </h4>
                <div className="space-y-2">
                  {report.errors.map((err, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-rose-50 border border-rose-500/50 text-xs text-rose-400 space-y-1">
                      <p className="font-semibold text-rose-400">{err.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning Details */}
            {report.warnings.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF9E1B] flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> System Recommendations ({report.warnings.length})
                </h4>
                <div className="space-y-2">
                  {report.warnings.map((warn, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-50 border border-[#FF9E1B]/50 text-xs text-[#FF9E1B]">
                      <p>{warn.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Check Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70">
                Compatibility Matrix Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* CPU & Motherboard */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="font-semibold text-white">Socket Match</p>
                      <p className="text-[10px] text-white/70">
                        {selectedParts.cpu && selectedParts.motherboard
                          ? `${selectedParts.cpu.specs.socket} vs ${selectedParts.motherboard.specs.socket}`
                          : 'Awaiting CPU & Mobo'}
                      </p>
                    </div>
                  </div>
                  {selectedParts.cpu && selectedParts.motherboard ? (
                    selectedParts.cpu.specs.socket === selectedParts.motherboard.specs.socket ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF9E1B] text-[#FF9E1B] border border-[#FF9E1B]/50 font-bold">MATCH</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/50 font-bold">MISMATCH</span>
                    )
                  ) : (
                    <span className="text-[10px] text-white/60 font-mono">-</span>
                  )}
                </div>

                {/* RAM Generation */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircuitBoard className="w-4 h-4 text-rose-400" />
                    <div>
                      <p className="font-semibold text-white">RAM Standard</p>
                      <p className="text-[10px] text-white/70">
                        {selectedParts.motherboard && selectedParts.ram
                          ? `${selectedParts.motherboard.specs.ddrGen} vs ${selectedParts.ram.specs.ddrGen}`
                          : 'Awaiting RAM & Mobo'}
                      </p>
                    </div>
                  </div>
                  {selectedParts.motherboard && selectedParts.ram ? (
                    selectedParts.motherboard.specs.ddrGen === selectedParts.ram.specs.ddrGen ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF9E1B] text-[#FF9E1B] border border-[#FF9E1B]/50 font-bold">MATCH</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/50 font-bold">MISMATCH</span>
                    )
                  ) : (
                    <span className="text-[10px] text-white/60 font-mono">-</span>
                  )}
                </div>

                {/* Case & Motherboard Form Factor */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#FF9E1B]" />
                    <div>
                      <p className="font-semibold text-white">Form Factor Clearance</p>
                      <p className="text-[10px] text-white/70">
                        {selectedParts.motherboard && selectedParts.case
                          ? `${selectedParts.motherboard.specs.formFactor} Mobo inside ${selectedParts.case.name}`
                          : 'Awaiting Case & Mobo'}
                      </p>
                    </div>
                  </div>
                  {report.categoryStatus.case.isCompatible ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF9E1B] text-[#FF9E1B] border border-[#FF9E1B]/50 font-bold">PASS</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/50 font-bold">FAIL</span>
                  )}
                </div>

                {/* Power Supply Headroom */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FF9E1B]" />
                    <div>
                      <p className="font-semibold text-white">Power Headroom</p>
                      <p className="text-[10px] text-white/70">
                        Est: {report.totalWattage}W + 100W buffer vs {report.psuCapacity}W PSU
                      </p>
                    </div>
                  </div>
                  {report.categoryStatus.psu.isCompatible ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF9E1B] text-[#FF9E1B] border border-[#FF9E1B]/50 font-bold">SAFE</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/50 font-bold">LOW</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition hover-gemini-gradient"
            >
              Close Report
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


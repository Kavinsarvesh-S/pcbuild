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
          className="relative w-full max-w-2xl bg-transparent/95 border border-[#94BDCF] rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-800"
        >
          {/* Header */}
          <div className="p-5 bg-white/40 border-b border-[#94BDCF]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${report.isCompatible ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-rose-100 border-rose-300 text-rose-800'}`}>
                {report.isCompatible ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Hardware Audit & Compatibility Report</h2>
                <p className="text-xs text-slate-600">Deep validation check across sockets, memory standards & power buffers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/60 hover:bg-white text-slate-600 hover:text-slate-900 transition border border-[#94BDCF]/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto bg-white/30">
            {/* Status Banner */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              report.isCompatible
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {report.isCompatible ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-emerald-900">System Compatibility Check Passed!</h3>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      All selected components feature matching processor sockets, RAM DDR generations, case form factor dimensions, and sufficient PSU power headroom.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-rose-900">{report.errors.length} Conflict(s) Detected</h3>
                    <p className="text-xs text-rose-800 mt-0.5">
                      Your current component selection contains hardware mismatches. Please resolve the issues listed below.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Error Details */}
            {report.errors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Incompatibility Issues ({report.errors.length})
                </h4>
                <div className="space-y-2">
                  {report.errors.map((err, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                      <p className="font-semibold">{err.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning Details */}
            {report.warnings.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Info className="w-4 h-4" /> System Recommendations ({report.warnings.length})
                </h4>
                <div className="space-y-2">
                  {report.warnings.map((warn, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <p>{warn.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Check Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Compatibility Matrix Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* CPU & Motherboard */}
                <div className="p-3 rounded-xl bg-white/80 border border-[#94BDCF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-sky-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Socket Match</p>
                      <p className="text-[10px] text-slate-600">
                        {selectedParts.cpu && selectedParts.motherboard
                          ? `${selectedParts.cpu.specs.socket} vs ${selectedParts.motherboard.specs.socket}`
                          : 'Awaiting CPU & Mobo'}
                      </p>
                    </div>
                  </div>
                  {selectedParts.cpu && selectedParts.motherboard ? (
                    selectedParts.cpu.specs.socket === selectedParts.motherboard.specs.socket ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">MATCH</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 font-bold">MISMATCH</span>
                    )
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">-</span>
                  )}
                </div>

                {/* RAM Generation */}
                <div className="p-3 rounded-xl bg-white/80 border border-[#94BDCF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CircuitBoard className="w-4 h-4 text-sky-700" />
                    <div>
                      <p className="font-semibold text-slate-900">RAM Standard</p>
                      <p className="text-[10px] text-slate-600">
                        {selectedParts.motherboard && selectedParts.ram
                          ? `${selectedParts.motherboard.specs.ddrGen} vs ${selectedParts.ram.specs.ddrGen}`
                          : 'Awaiting RAM & Mobo'}
                      </p>
                    </div>
                  </div>
                  {selectedParts.motherboard && selectedParts.ram ? (
                    selectedParts.motherboard.specs.ddrGen === selectedParts.ram.specs.ddrGen ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">MATCH</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 font-bold">MISMATCH</span>
                    )
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">-</span>
                  )}
                </div>

                {/* Case & Motherboard Form Factor */}
                <div className="p-3 rounded-xl bg-white/80 border border-[#94BDCF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-sky-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Form Factor Clearance</p>
                      <p className="text-[10px] text-slate-600">
                        {selectedParts.motherboard && selectedParts.case
                          ? `${selectedParts.motherboard.specs.formFactor} Mobo inside ${selectedParts.case.name}`
                          : 'Awaiting Case & Mobo'}
                      </p>
                    </div>
                  </div>
                  {report.categoryStatus.case.isCompatible ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">PASS</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 font-bold">FAIL</span>
                  )}
                </div>

                {/* Power Supply Headroom */}
                <div className="p-3 rounded-xl bg-white/80 border border-[#94BDCF]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-sky-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Power Headroom</p>
                      <p className="text-[10px] text-slate-600">
                        Est: {report.totalWattage}W + 100W buffer vs {report.psuCapacity}W PSU
                      </p>
                    </div>
                  </div>
                  {report.categoryStatus.psu.isCompatible ? (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">SAFE</span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 font-bold">LOW</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/40 border-t border-[#94BDCF]/60 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-950 font-bold text-xs transition border border-sky-400"
            >
              Close Report
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


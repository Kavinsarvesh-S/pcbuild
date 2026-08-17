import React from 'react';
import type { SelectedParts, ComponentCategory } from '../types/pcBuilder';
import { Cpu, Fan, CircuitBoard, MemoryStick, MonitorPlay, HardDrive, Zap, Box, Plus, CheckCircle2 } from 'lucide-react';
import { formatRupees } from '../utils/currencyFormatter';

interface VisualPCChassisProps {
  selectedParts: SelectedParts;
  onOpenSlotDrawer: (category: ComponentCategory) => void;
}

export const VisualPCChassis: React.FC<VisualPCChassisProps> = ({
  selectedParts,
  onOpenSlotDrawer,
}) => {
  const installedCount = Object.values(selectedParts).filter(Boolean).length;
  const isComplete = installedCount === 8;

  return (
    <div className="relative glass-panel rounded-2xl p-4 sm:p-6 overflow-hidden border border-[#94BDCF]/60 shadow-md glass-layer">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#94BDCF]/50">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Box className="w-5 h-5 text-sky-700" />
            Interactive Hardware Layout Blueprint
          </h2>
          <p className="text-xs text-slate-600">Click any visual hardware slot to open part selector</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-700">
            Build Progress: <strong className="text-sky-800 font-mono font-bold">{installedCount}/8</strong> Parts
          </span>
          {isComplete && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] uppercase tracking-wide font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Assembly Ready
            </span>
          )}
        </div>
      </div>

      {/* Graphical Tower Frame Container */}
      <div className="relative w-full max-w-3xl mx-auto min-h-[420px] bg-transparent/70 rounded-xl border border-[#94BDCF]/50 p-4 shadow-inner flex flex-col justify-between overflow-hidden">
        {/* Chassis Outer Shell Accent */}
        <div className="absolute inset-2 border-2 border-dashed border-[#94BDCF]/60 rounded-lg pointer-events-none" />

        {/* Top Fans / Liquid Cooler Bay Slot */}
        <div className="mb-4">
          <div className="text-[10px] uppercase font-semibold text-slate-700 tracking-wider mb-1 flex items-center gap-1">
            <Fan className="w-3 h-3 text-sky-700" /> Top Radiator & Cooling Exhaust
          </div>
          <button
            onClick={() => onOpenSlotDrawer('cooler')}
            className={`w-full py-2.5 px-3 rounded-lg border text-left transition hover:bg-white/40 flex items-center justify-between ${
              selectedParts.cooler
                ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${selectedParts.cooler ? 'bg-[#80CCE3]/30 text-slate-900' : 'bg-white/60 text-slate-600'}`}>
                <Fan className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  {selectedParts.cooler ? selectedParts.cooler.name : 'Select CPU Cooler / AIO'}
                </p>
                {selectedParts.cooler && (
                  <p className="text-[10px] text-slate-600 font-mono">
                    {selectedParts.cooler.specs.supportedSockets?.join(', ')} • {formatRupees(selectedParts.cooler.price)}
                  </p>
                )}
              </div>
            </div>
            {!selectedParts.cooler ? (
              <span className="text-xs text-sky-700 flex items-center gap-1 font-medium">
                <Plus className="w-3.5 h-3.5" /> Add Cooler
              </span>
            ) : (
              <span className="text-xs font-mono font-semibold text-slate-900">{formatRupees(selectedParts.cooler.price)}</span>
            )}
          </button>
        </div>

        {/* Middle Main Motherboard Chamber Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 my-2 flex-1">
          {/* Left: Motherboard & CPU & RAM Slot Block (7 cols) */}
          <div className="md:col-span-7 bg-white/40 border border-[#94BDCF]/60 rounded-xl p-3 flex flex-col justify-between relative">
            <div className="text-[10px] uppercase font-semibold text-slate-700 tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <CircuitBoard className="w-3 h-3 text-sky-700" /> Motherboard Tray
              </span>
              {selectedParts.motherboard && (
                <span className="text-[10px] text-slate-800 font-mono bg-white/90 px-1.5 py-0.5 rounded border border-[#94BDCF]/60">
                  {selectedParts.motherboard.specs.socket} | {selectedParts.motherboard.specs.ddrGen} | {selectedParts.motherboard.specs.formFactor}
                </span>
              )}
            </div>

            {/* Motherboard Selector */}
            <button
              onClick={() => onOpenSlotDrawer('motherboard')}
              className={`w-full p-2.5 rounded-lg border text-left transition hover:bg-white/60 mb-2 flex items-center justify-between ${
                selectedParts.motherboard
                  ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                  : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
              }`}
            >
              <div className="flex items-center gap-2">
                <CircuitBoard className={`w-4 h-4 ${selectedParts.motherboard ? 'text-slate-900' : 'text-slate-500'}`} />
                <span className="text-xs font-medium text-slate-900">
                  {selectedParts.motherboard ? selectedParts.motherboard.name : 'Add Motherboard'}
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-slate-700">
                {selectedParts.motherboard ? formatRupees(selectedParts.motherboard.price) : '+ Select'}
              </span>
            </button>

            {/* Sub-block: CPU Socket & RAM Slots Side-by-Side */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              {/* CPU Socket Slot */}
              <button
                onClick={() => onOpenSlotDrawer('cpu')}
                className={`p-2.5 rounded-lg border text-left transition hover:bg-white/60 ${
                  selectedParts.cpu
                    ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                    : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Cpu className={`w-3.5 h-3.5 ${selectedParts.cpu ? 'text-slate-900' : 'text-slate-500'}`} />
                  <span className="text-[10px] text-slate-500 font-semibold">CPU</span>
                </div>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {selectedParts.cpu ? selectedParts.cpu.name : 'Install CPU'}
                </p>
                {selectedParts.cpu && (
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                    {selectedParts.cpu.specs.socket} • {selectedParts.cpu.wattage}W
                  </p>
                )}
              </button>

              {/* RAM Slot */}
              <button
                onClick={() => onOpenSlotDrawer('ram')}
                className={`p-2.5 rounded-lg border text-left transition hover:bg-white/60 ${
                  selectedParts.ram
                    ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                    : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <MemoryStick className={`w-3.5 h-3.5 ${selectedParts.ram ? 'text-slate-900' : 'text-slate-500'}`} />
                  <span className="text-[10px] text-slate-500 font-semibold">RAM</span>
                </div>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {selectedParts.ram ? selectedParts.ram.name : 'Install RAM'}
                </p>
                {selectedParts.ram && (
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                    {selectedParts.ram.specs.ddrGen} • {selectedParts.ram.specs.ramCapacity}
                  </p>
                )}
              </button>
            </div>
          </div>

          {/* Right: GPU & NVMe Storage Block (5 cols) */}
          <div className="md:col-span-5 bg-white/40 border border-[#94BDCF]/60 rounded-xl p-3 flex flex-col justify-between gap-2">
            <div className="text-[10px] uppercase font-semibold text-slate-700 tracking-wider flex items-center gap-1">
              <MonitorPlay className="w-3 h-3 text-sky-700" /> PCIe Expansion & Storage
            </div>

            {/* GPU Slot */}
            <button
              onClick={() => onOpenSlotDrawer('gpu')}
              className={`p-3 rounded-lg border text-left transition hover:bg-white/60 flex-1 flex flex-col justify-between ${
                selectedParts.gpu
                  ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                  : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                  <MonitorPlay className={`w-4 h-4 ${selectedParts.gpu ? 'text-slate-900' : 'text-slate-500'}`} />
                  Graphics Card (GPU)
                </span>
                {selectedParts.gpu && (
                  <span className="text-xs font-mono font-bold text-slate-900">{formatRupees(selectedParts.gpu.price)}</span>
                )}
              </div>
              <div className="my-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {selectedParts.gpu ? selectedParts.gpu.name : 'Select PCIe GPU'}
                </p>
                {selectedParts.gpu && (
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                    VRAM: {selectedParts.gpu.specs.vram} • {selectedParts.gpu.wattage}W TDP
                  </p>
                )}
              </div>
            </button>

            {/* Storage NVMe Slot */}
            <button
              onClick={() => onOpenSlotDrawer('storage')}
              className={`p-2.5 rounded-lg border text-left transition hover:bg-white/60 ${
                selectedParts.storage
                  ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                  : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-900 flex items-center gap-1.5">
                  <HardDrive className={`w-3.5 h-3.5 ${selectedParts.storage ? 'text-sky-700' : 'text-slate-500'}`} />
                  M.2 NVMe SSD
                </span>
                <span className="text-xs font-mono font-medium text-slate-700">
                  {selectedParts.storage ? formatRupees(selectedParts.storage.price) : '+ Add'}
                </span>
              </div>
              {selectedParts.storage && (
                <p className="text-xs font-semibold text-slate-900 truncate mt-1">
                  {selectedParts.storage.name} ({selectedParts.storage.specs.capacity})
                </p>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Shroud: PSU & PC Case Selection Bar */}
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#94BDCF]/50">
          {/* PSU Basement Slot */}
          <button
            onClick={() => onOpenSlotDrawer('psu')}
            className={`p-2.5 rounded-lg border text-left transition hover:bg-white/60 flex items-center justify-between ${
              selectedParts.psu
                ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Zap className={`w-4 h-4 ${selectedParts.psu ? 'text-sky-700' : 'text-slate-500'}`} />
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  {selectedParts.psu ? selectedParts.psu.name : 'Power Supply (PSU)'}
                </p>
                {selectedParts.psu && (
                  <p className="text-[10px] text-slate-600 font-mono">
                    {selectedParts.psu.specs.psuWattage}W • {selectedParts.psu.specs.efficiencyRating}
                  </p>
                )}
              </div>
            </div>
            <span className="text-xs font-mono font-medium text-slate-700">
              {selectedParts.psu ? formatRupees(selectedParts.psu.price) : '+ Add'}
            </span>
          </button>

          {/* PC Case Frame Slot */}
          <button
            onClick={() => onOpenSlotDrawer('case')}
            className={`p-2.5 rounded-lg border text-left transition hover:bg-white/60 flex items-center justify-between ${
              selectedParts.case
                ? 'bg-white/80 border-[#94BDCF] shadow-xs'
                : 'glass-layer border-[#94BDCF]/50 hover:border-[#94BDCF]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Box className={`w-4 h-4 ${selectedParts.case ? 'text-slate-900' : 'text-slate-500'}`} />
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  {selectedParts.case ? selectedParts.case.name : 'PC Case / Enclosure'}
                </p>
                {selectedParts.case && (
                  <p className="text-[10px] text-slate-600 font-mono">
                    Supports: {selectedParts.case.specs.supportedFormFactors?.join(', ')}
                  </p>
                )}
              </div>
            </div>
            <span className="text-xs font-mono font-medium text-slate-700">
              {selectedParts.case ? formatRupees(selectedParts.case.price) : '+ Add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

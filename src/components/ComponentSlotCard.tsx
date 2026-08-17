import React from 'react';
import type { ComponentCategory, HardwareComponent } from '../types/pcBuilder';
import { CATEGORY_INFO } from '../data/mockComponents';
import { Cpu, Fan, CircuitBoard, MemoryStick, MonitorPlay, HardDrive, Zap, Box, Plus, Trash2, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatRupees } from '../utils/currencyFormatter';

interface ComponentSlotCardProps {
  category: ComponentCategory;
  selectedComponent: HardwareComponent | null | undefined;
  isCompatible?: boolean;
  incompatibilityReason?: string;
  onOpenDrawer: (category: ComponentCategory) => void;
  onRemoveComponent: (category: ComponentCategory) => void;
}

const CATEGORY_ICONS: Record<ComponentCategory, React.ComponentType<{ className?: string }>> = {
  cpu: Cpu,
  cooler: Fan,
  motherboard: CircuitBoard,
  ram: MemoryStick,
  gpu: MonitorPlay,
  storage: HardDrive,
  psu: Zap,
  case: Box,
};

const CATEGORY_BORDER_CLASSES: Record<ComponentCategory, string> = {
  cpu: 'border-[#B0DEED] glass-layer shadow-xs',
  cooler: 'border-[#B0DEED] glass-layer shadow-xs',
  motherboard: 'border-[#B0DEED] glass-layer shadow-xs',
  ram: 'border-[#B0DEED] glass-layer shadow-xs',
  gpu: 'border-[#B0DEED] glass-layer shadow-xs',
  storage: 'border-[#B0DEED] glass-layer shadow-xs',
  psu: 'border-[#B0DEED] glass-layer shadow-xs',
  case: 'border-[#B0DEED] glass-layer shadow-xs',
};

const CATEGORY_ICON_COLORS: Record<ComponentCategory, string> = {
  cpu: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
  cooler: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
  motherboard: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
  ram: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
  gpu: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
  storage: 'bg-[#80CCE3]/30 text-slate-800 border-[#80CCE3]',
  psu: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
  case: 'bg-[#94BDCF]/30 text-slate-800 border-[#94BDCF]',
};

export const ComponentSlotCard: React.FC<ComponentSlotCardProps> = ({
  category,
  selectedComponent,
  isCompatible = true,
  incompatibilityReason,
  onOpenDrawer,
  onRemoveComponent,
}) => {
  const info = CATEGORY_INFO[category];
  const IconComponent = CATEGORY_ICONS[category];

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between border backdrop-blur-xl bg-transparent ${
        selectedComponent
          ? !isCompatible
            ? 'border-rose-300 shadow-md'
            : CATEGORY_BORDER_CLASSES[category].replace('glass-layer', '')
          : 'border-[#94BDCF]/50 hover:border-[#94BDCF] shadow-xs'
      }`}
    >
      {/* Slot Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl border ${selectedComponent ? CATEGORY_ICON_COLORS[category] : 'glass-layer text-slate-700 border-[#94BDCF]/50'}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{info.name}</h3>
            <p className="text-[10px] text-slate-500 line-clamp-1">{info.description}</p>
          </div>
        </div>

        {/* Compatibility badge if selected */}
        {selectedComponent && (
          <div>
            {isCompatible ? (
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-700" /> Compatible
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-semibold shadow-xs">
                <AlertTriangle className="w-3 h-3 text-rose-700" /> Conflict
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Body */}
      {selectedComponent ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={selectedComponent.image}
              alt={selectedComponent.name}
              className="w-14 h-14 object-cover rounded-xl border border-slate-200 glass-layer shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{selectedComponent.brand}</span>
                <span className="text-xs font-mono font-bold text-slate-900">{formatRupees(selectedComponent.price)}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">{selectedComponent.name}</h4>

              {/* Spec Pills */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {selectedComponent.specs.socket && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 text-slate-700 font-mono border border-[#94BDCF]/40">
                    {selectedComponent.specs.socket}
                  </span>
                )}
                {selectedComponent.specs.ddrGen && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 text-slate-700 font-mono border border-[#94BDCF]/50">
                    {selectedComponent.specs.ddrGen}
                  </span>
                )}
                {selectedComponent.specs.formFactor && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 text-slate-700 font-mono border border-[#80CCE3]/40">
                    {selectedComponent.specs.formFactor}
                  </span>
                )}
                {selectedComponent.wattage > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/80 text-slate-700 font-mono border border-slate-200">
                    {selectedComponent.wattage}W
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Incompatibility reason warning text if conflict */}
          {!isCompatible && incompatibilityReason && (
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-start gap-1.5 shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <span>{incompatibilityReason}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
            <button
              onClick={() => onOpenDrawer(category)}
              className="flex-1 py-1.5 px-2 rounded-xl glass-layer hover:bg-white/60 border border-[#94BDCF]/50 text-xs font-semibold text-slate-800 hover:text-slate-950 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3 h-3 text-sky-700" /> Swap Part
            </button>
            <button
              onClick={() => onRemoveComponent(category)}
              className="p-1.5 rounded-xl glass-layer hover:bg-rose-50 hover:text-rose-600 text-slate-500 transition border border-[#94BDCF]/50 shadow-xs"
              title="Remove Component"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Empty Slot State */
        <div className="py-5 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => onOpenDrawer(category)}
            className="w-full py-3 px-4 rounded-xl border border-dashed border-[#94BDCF]/60 hover:border-[#94BDCF] hover:bg-white/40 text-slate-600 hover:text-slate-900 transition group flex flex-col items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full glass-layer group-hover:bg-white/60 border border-[#94BDCF]/50 group-hover:border-[#94BDCF] flex items-center justify-center text-slate-600 group-hover:text-slate-900 transition">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold">Select {info.name.split(' ')[0]}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

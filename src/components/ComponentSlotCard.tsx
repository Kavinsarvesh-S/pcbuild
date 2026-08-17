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
  cpu: 'border-white/40 glass-layer shadow-xs',
  cooler: 'border-white/40 glass-layer shadow-xs',
  motherboard: 'border-white/40 glass-layer shadow-xs',
  ram: 'border-white/40 glass-layer shadow-xs',
  gpu: 'border-white/40 glass-layer shadow-xs',
  storage: 'border-white/40 glass-layer shadow-xs',
  psu: 'border-white/40 glass-layer shadow-xs',
  case: 'border-white/40 glass-layer shadow-xs',
};

const CATEGORY_ICON_COLORS: Record<ComponentCategory, string> = {
  cpu: 'bg-rose-500/20 text-white border-rose-500/50',
  cooler: 'bg-rose-500/20 text-white border-rose-500/40',
  motherboard: 'bg-rose-500/40 text-white border-rose-500/50',
  ram: 'bg-rose-500/20 text-white border-rose-500/50',
  gpu: 'bg-rose-500/30 text-white border-rose-500/40',
  storage: 'bg-[#FF9E1B]/30 text-white border-[#FF9E1B]/40',
  psu: 'bg-rose-500/10 text-white border-rose-500/20',
  case: 'bg-rose-500/40 text-white border-rose-500/50',
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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={`relative rounded-2xl p-4 transition hover-gemini-gradient-all duration-200 flex flex-col justify-between border ${
        selectedComponent
          ? !isCompatible
            ? 'border-rose-500/50 glass-layer shadow-md'
            : CATEGORY_BORDER_CLASSES[category]
          : 'glass-layer border-rose-500/40 hover:border-rose-500/50 hover:shadow-md'
      }`}
    >
      {/* Slot Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl border ${selectedComponent ? CATEGORY_ICON_COLORS[category] : 'glass-layer text-white/80 border-white/40'}`}>
            <IconComponent className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">{info.name}</h3>
            <p className="text-[10px] text-white/70 line-clamp-1">{info.description}</p>
          </div>
        </div>

        {/* Compatibility badge if selected */}
        {selectedComponent && (
          <div>
            {isCompatible ? (
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF9E1B] text-[#FF9E1B] border border-[#FF9E1B]/50 font-semibold shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-[#FF9E1B]" /> Compatible
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/50 font-semibold shadow-xs">
                <AlertTriangle className="w-3 h-3 text-rose-400" /> Conflict
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
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">{selectedComponent.brand}</span>
                <span className="text-xs font-mono font-bold text-white">{formatRupees(selectedComponent.price)}</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1 mt-0.5">{selectedComponent.name}</h4>

              {/* Spec Pills */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {selectedComponent.specs.socket && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded glass-layer text-white font-mono border border-rose-500/40">
                    {selectedComponent.specs.socket}
                  </span>
                )}
                {selectedComponent.specs.ddrGen && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded glass-layer text-white font-mono border border-rose-500/50">
                    {selectedComponent.specs.ddrGen}
                  </span>
                )}
                {selectedComponent.specs.formFactor && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded glass-layer text-white font-mono border border-[#FF9E1B]/40">
                    {selectedComponent.specs.formFactor}
                  </span>
                )}
                {selectedComponent.wattage > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded glass-layer text-white/90 font-mono border border-slate-200">
                    {selectedComponent.wattage}W
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Incompatibility reason warning text if conflict */}
          {!isCompatible && incompatibilityReason && (
            <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-[11px] text-rose-400 flex items-start gap-1.5 shadow-xs">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <span>{incompatibilityReason}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80">
            <button
              onClick={() => onOpenDrawer(category)}
              className="flex-1 py-1.5 px-2 rounded-xl glass-layer hover:bg-[#FF9E1B]/20 hover:border-[#FF9E1B]/40 border border-rose-500/40 text-xs font-semibold text-white transition hover-gemini-gradient flex items-center justify-center gap-1.5 shadow-xs"
            >
              <RefreshCw className="w-3 h-3 text-rose-400" /> Swap Part
            </button>
            <button
              onClick={() => onRemoveComponent(category)}
              className="p-1.5 rounded-xl glass-layer hover:bg-rose-500/10 hover:text-rose-400 text-white/60 transition hover-gemini-gradient border border-rose-500/40 shadow-xs"
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
            className="w-full py-3 px-4 rounded-xl border border-dashed border-rose-500/40 hover:border-rose-500/50 hover:bg-rose-500/20/20 text-white/80 hover:text-white transition hover-gemini-gradient group flex flex-col items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full glass-layer group-hover:bg-white/20 border border-white/40 group-hover:border-white/60 flex items-center justify-center text-white/80 group-hover:text-white transition hover-gemini-gradient">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold">Select {info.name.split(' ')[0]}</span>
          </button>
        </div>
      )}
    </motion.div>
  );
};

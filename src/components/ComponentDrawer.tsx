import React, { useState, useMemo } from 'react';
import type { ComponentCategory, HardwareComponent, SelectedParts, FilterState } from '../types/pcBuilder';
import { MOCK_COMPONENTS, CATEGORY_INFO } from '../data/mockComponents';
import { checkComponentCompatibilityWithBuild } from '../utils/compatibilityEngine';
import { X, Search, SlidersHorizontal, CheckCircle2, AlertTriangle, Cpu, DollarSign, Filter, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRupees } from '../utils/currencyFormatter';


interface ComponentDrawerProps {
  isOpen: boolean;
  category: ComponentCategory | null;
  selectedParts: SelectedParts;
  onClose: () => void;
  onSelectComponent: (component: HardwareComponent) => void;
  onAttemptIncompatibleSelect: (component: HardwareComponent, reason: string) => void;
}

export const ComponentDrawer: React.FC<ComponentDrawerProps> = ({
  isOpen,
  category,
  selectedParts,
  onClose,
  onSelectComponent,
  onAttemptIncompatibleSelect,
}) => {
  if (!isOpen || !category) return null;

  const categoryInfo = CATEGORY_INFO[category];

  // Component options for this category
  const categoryItems = useMemo(() => {
    return MOCK_COMPONENTS.filter((c) => c.category === category);
  }, [category]);

  // Max price for slider
  const maxAvailablePrice = useMemo(() => {
    return Math.max(...categoryItems.map((c) => c.price), 500);
  }, [categoryItems]);

  // Local Filter State
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    maxPrice: maxAvailablePrice,
    minPrice: 0,
    selectedBrand: 'all',
    selectedTier: 'all',
    hideIncompatible: false,
  });

  // Extract unique brands for filtering
  const availableBrands = useMemo(() => {
    const brands = new Set(categoryItems.map((c) => c.brand));
    return ['all', ...Array.from(brands)];
  }, [categoryItems]);

  // Filtered and evaluated components
  const filteredComponents = useMemo(() => {
    return categoryItems.filter((item) => {
      // Search
      const matchesSearch =
        item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Price filter
      const matchesPrice = item.price <= filters.maxPrice;

      // Brand filter
      const matchesBrand = filters.selectedBrand === 'all' || item.brand === filters.selectedBrand;

      // Tier filter
      const matchesTier = filters.selectedTier === 'all' || item.tier === filters.selectedTier;

      // Compatibility filter
      if (filters.hideIncompatible) {
        const { isCompatible } = checkComponentCompatibilityWithBuild(item, selectedParts);
        if (!isCompatible) return false;
      }

      return matchesSearch && matchesPrice && matchesBrand && matchesTier;
    });
  }, [categoryItems, filters, selectedParts]);

  const handleItemClick = (item: HardwareComponent) => {
    const { isCompatible, reason } = checkComponentCompatibilityWithBuild(item, selectedParts);

    if (!isCompatible && reason) {
      onAttemptIncompatibleSelect(item, reason);
    } else {
      onSelectComponent(item);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-md transition hover-gemini-gradient-opacity"
        />

        {/* Centered Modal Panel */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[90vh] bg-white/20 backdrop-blur-2xl rounded-3xl border border-[#94BDCF]/50 shadow-2xl flex flex-col z-10 text-slate-800 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#94BDCF]/60 bg-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-[#80CCE3]/30 text-slate-800 border border-[#80CCE3]">
                  <Cpu className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{categoryInfo.name} Options</h2>
                  <p className="text-xs text-slate-600 font-medium">{categoryInfo.description}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/60 hover:bg-white border border-[#94BDCF]/60 text-slate-600 hover:text-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Bar & Controls */}
          <div className="p-4 bg-white/5 border-b border-[#94BDCF]/60 space-y-3">
            {/* Search & Hide Incompatible Toggle */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={`Search ${categoryInfo.name}...`}
                  value={filters.searchQuery}
                  onChange={(e) => setFilters((f) => ({ ...f, searchQuery: e.target.value }))}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white/80 border border-[#94BDCF]/60 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 shadow-xs"
                />
              </div>

              {/* Hide Incompatible Switch */}
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none shrink-0 bg-white/70 px-3 py-2 rounded-lg border border-[#94BDCF]/60 shadow-xs">
                <input
                  type="checkbox"
                  checked={filters.hideIncompatible}
                  onChange={(e) => setFilters((f) => ({ ...f, hideIncompatible: e.target.checked }))}
                  className="rounded border-slate-300 text-sky-600 focus:ring-sky-500/30 bg-white"
                />
                <span className="flex items-center gap-1 font-medium">
                  <ShieldAlert className="w-3.5 h-3.5 text-sky-700" /> Hide Incompatible
                </span>
              </label>
            </div>

            {/* Price Filter Range Slider */}
            <div className="p-3 bg-white/70 border border-[#94BDCF]/60 rounded-lg shadow-xs">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-700 flex items-center gap-1 font-medium">
                  <DollarSign className="w-3.5 h-3.5 text-sky-700" /> Max Price Limit
                </span>
                <span className="font-mono font-bold text-sky-800">{formatRupees(filters.maxPrice)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={maxAvailablePrice}
                step="500"
                value={filters.maxPrice}
                onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                className="w-full accent-sky-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Brand Chips */}
            {availableBrands.length > 2 && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                <span className="text-[10px] text-slate-500 uppercase font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Brand:
                </span>
                {availableBrands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setFilters((f) => ({ ...f, selectedBrand: brand }))}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition shrink-0 ${
                      filters.selectedBrand === brand
                        ? 'bg-[#80CCE3] text-slate-950 font-bold border border-sky-400'
                        : 'bg-white/80 text-slate-700 border border-[#94BDCF]/60 hover:bg-white'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Component List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-transparent">
            {filteredComponents.length === 0 ? (
              <div className="py-12 text-center text-slate-500">
                <SlidersHorizontal className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm font-semibold text-slate-700">No hardware components match your filters</p>
                <button
                  onClick={() =>
                    setFilters({
                      searchQuery: '',
                      maxPrice: maxAvailablePrice,
                      minPrice: 0,
                      selectedBrand: 'all',
                      selectedTier: 'all',
                      hideIncompatible: false,
                    })
                  }
                  className="mt-3 text-xs text-sky-700 font-bold hover:underline"
                >
                  Reset all drawer filters
                </button>
              </div>
            ) : (
              filteredComponents.map((item) => {
                const isCurrentlySelected = selectedParts[category]?.id === item.id;
                const { isCompatible, reason } = checkComponentCompatibilityWithBuild(item, selectedParts);

                return (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className={`rounded-xl p-4 transition-all duration-300 border h-full backdrop-blur-xl ${
                        isCurrentlySelected
                          ? 'border-sky-500 bg-sky-500/10 shadow-[0_10px_30px_-10px_rgba(14,165,233,0.4)]'
                          : !isCompatible
                          ? 'border-rose-300 bg-rose-500/10 hover:border-rose-400'
                          : 'border-[#94BDCF]/40 bg-transparent hover:border-[#94BDCF] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(148,189,207,0.5)] hover:bg-white/5'
                      }`}
                    >
                    <div className="flex items-start gap-4">
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border border-slate-200 bg-white shrink-0 shadow-xs"
                      />

                      {/* Info & Specs */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            {item.brand} • <span className="capitalize">{item.tier} Tier</span>
                          </span>
                          <span className="text-sm font-mono font-bold text-slate-900">{formatRupees(item.price)}</span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">{item.name}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-1">{item.description}</p>

                        {/* Specs Pill row */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {item.specs.socket && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              Socket: {item.specs.socket}
                            </span>
                          )}
                          {item.specs.supportedSockets && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              Sockets: {item.specs.supportedSockets.join(', ')}
                            </span>
                          )}
                          {item.specs.ddrGen && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              {item.specs.ddrGen}
                            </span>
                          )}
                          {item.specs.formFactor && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              {item.specs.formFactor}
                            </span>
                          )}
                          {item.specs.supportedFormFactors && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              Fits: {item.specs.supportedFormFactors.join(', ')}
                            </span>
                          )}
                          {item.specs.psuWattage && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              {item.specs.psuWattage}W Power
                            </span>
                          )}
                          {item.wattage > 0 && !item.specs.psuWattage && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-mono font-medium">
                              {item.wattage}W Draw
                            </span>
                          )}
                        </div>

                        {/* Compatibility Status Pill */}
                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200">
                          {isCompatible ? (
                            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Compatible with build
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-rose-700 font-semibold truncate max-w-[240px]">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Incompatible
                            </span>
                          )}

                          <button
                            onClick={() => handleItemClick(item)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs ${
                              isCurrentlySelected
                                ? 'bg-sky-700 text-white font-bold cursor-default'
                                : !isCompatible
                                ? 'bg-rose-100 border border-rose-300 text-rose-800 hover:bg-rose-200'
                                : 'bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-950 font-bold border border-sky-400'
                            }`}
                          >
                            {isCurrentlySelected ? 'Selected' : !isCompatible ? 'Force Incompatible' : 'Select Part'}
                          </button>
                        </div>

                        {/* Incompatibility reason warning text if not compatible */}
                        {!isCompatible && reason && (
                          <p className="mt-2 text-[11px] text-rose-800 bg-rose-50 p-2 rounded border border-rose-200">
                            {reason}
                          </p>
                        )}
                      </div>
                    </div>
                    </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

import React, { useState, useMemo } from 'react';
import type { ComponentCategory, HardwareComponent, SelectedParts, PresetBuild, ToastMessage } from './types/pcBuilder';
import { evaluateCompatibility } from './utils/compatibilityEngine';
import { Navbar } from './components/Navbar';
import { VisualPCChassis } from './components/VisualPCChassis';
import { ComponentSlotCard } from './components/ComponentSlotCard';
import { ComponentDrawer } from './components/ComponentDrawer';
import { BottomSummaryBar } from './components/BottomSummaryBar';
import { CompatibilityModal } from './components/CompatibilityModal';
import { PerformanceEstimatorModal } from './components/PerformanceEstimatorModal';
import { BudgetModal } from './components/BudgetModal';
import { ShareModal } from './components/ShareModal';
import { LandingPage } from './components/LandingPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ContactPage } from './components/ContactPage';
import { PresetsPage } from './components/PresetsPage';
import { AboutPage } from './components/AboutPage';
import { AuthPage } from './components/AuthPage';
import { GlobalNav } from './components/GlobalNav';
import { PageLoader } from './components/PageLoader';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { CursorSpotlight } from './components/CursorSpotlight';
import confetti from 'canvas-confetti';
import { Layers, Cpu } from 'lucide-react';
import { formatRupees } from './utils/currencyFormatter';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PARTS: SelectedParts = {
  cpu: null,
  cooler: null,
  motherboard: null,
  ram: null,
  gpu: null,
  storage: null,
  psu: null,
  case: null,
};

export const App: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [view, setView] = useState<'landing' | 'builder' | 'checkout' | 'contact' | 'presets' | 'about' | 'auth'>('landing');
  const [initialPresetCategory, setInitialPresetCategory] = useState<PresetBuild['category'] | null>(null);
  const [selectedParts, setSelectedParts] = useState<SelectedParts>(INITIAL_PARTS);
  const [budget, setBudget] = useState<number>(120000);

  const navigate = (newView: typeof view) => {
    if (view === newView) return;
    setIsPageLoading(true);
    // Fake loading delay to show skeleton and allow exit animation
    setTimeout(() => {
      setView(newView);
      setTimeout(() => setIsPageLoading(false), 500); // 500ms skeleton
    }, 250);
  };


  const [activeDrawerCategory, setActiveDrawerCategory] = useState<ComponentCategory | null>(null);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState<boolean>(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description: string, type: ToastMessage['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [newToast, ...prev].slice(0, 4));

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Evaluate compatibility report
  const compatibilityReport = useMemo(() => {
    return evaluateCompatibility(selectedParts);
  }, [selectedParts]);

  // Check if build complete & trigger confetti
  const triggerCelebrationIfComplete = (parts: SelectedParts) => {
    const count = Object.values(parts).filter(Boolean).length;
    const report = evaluateCompatibility(parts);
    if (count === 8 && report.isCompatible) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#80CCE3', '#B0DEED', '#B0DEED', '#94BDCF'],
      });
      addToast('Build Complete!', 'All 8 hardware components are fully compatible and ready for assembly.', 'success');
    }
  };

  // Select Component
  const handleSelectComponent = (component: HardwareComponent) => {
    const updatedParts: SelectedParts = {
      ...selectedParts,
      [component.category]: component,
    };
    setSelectedParts(updatedParts);
    addToast('Component Added', `${component.name} added to build (${component.category.toUpperCase()}).`, 'success');
    triggerCelebrationIfComplete(updatedParts);
  };

  // Attempt Incompatible Selection
  const handleAttemptIncompatibleSelect = (component: HardwareComponent, reason: string) => {
    addToast(`Incompatible: ${component.name}`, reason, 'error');
  };

  // Remove Component
  const handleRemoveComponent = (category: ComponentCategory) => {
    const component = selectedParts[category];
    if (!component) return;

    setSelectedParts((prev) => ({
      ...prev,
      [category]: null,
    }));
    addToast('Component Removed', `${component.name} removed from build.`, 'info');
  };

  // Load Preset Build
  const handleSelectPreset = (preset: PresetBuild) => {
    setSelectedParts(preset.parts);
    setBudget(preset.estimatedPrice + 200);
    navigate('builder');
    addToast('Preset Build Loaded', `Loaded "${preset.name}" preset build.`, 'success');
    triggerCelebrationIfComplete(preset.parts);
  };

  // Reset Build
  const handleResetBuild = () => {
    setSelectedParts(INITIAL_PARTS);
    addToast('Build Reset', 'Cleared all selected hardware components.', 'info');
  };

  const categories: ComponentCategory[] = ['cpu', 'cooler', 'motherboard', 'ram', 'gpu', 'storage', 'psu', 'case'];
  const filledCount = Object.values(selectedParts).filter(Boolean).length;

  return (
        <div className="min-h-screen relative overflow-x-hidden">
      {/* Dynamic Background Orbs */}
      <div className="fixed inset-0 z-[-2] bg-[#DAEBF2]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B0DEED] blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#94BDCF] blur-[150px] opacity-60 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-[#80CCE3] blur-[100px] opacity-50 animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      <CursorSpotlight />
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      <GlobalNav onGoToBuilder={() => navigate('builder')} 
        activeView={view}
        onGoToHome={() => navigate('landing')}
        onGoToPresets={() => navigate('presets')}
        onGoToAbout={() => navigate('about')}
        onGoToContact={() => navigate('contact')}
        onGoToAuth={() => navigate('auth')}
      />

      <AnimatePresence mode="wait">
        {isPageLoading && <PageLoader key="loader" />}
        {!isPageLoading && view === 'landing' && (
          <LandingPage onGoToBuilder={() => navigate('builder')}
            key="landing"
            
            onGoToHome={() => navigate('landing')}
            onGoToContact={() => navigate('contact')}
            onGoToPresets={(category) => {
              setInitialPresetCategory(category || null);
              navigate('presets');
            }}
          />
        )}

        {!isPageLoading && view === 'about' && (
          <AboutPage key="about" />
        )}

        {!isPageLoading && view === 'auth' && (
          <AuthPage key="auth" onLoginSuccess={() => navigate('builder')} />
        )}

        {!isPageLoading && view === 'presets' && (
          <PresetsPage
            key="presets"
            initialCategory={initialPresetCategory}
            onSelectPreset={handleSelectPreset}
            onGoToHome={() => navigate('landing')}
            onGoToContact={() => navigate('contact')}
          />
        )}

        {!isPageLoading && view === 'checkout' && (
          <CheckoutPage
            key="checkout"
            selectedParts={selectedParts}
            report={compatibilityReport}
            budget={budget}
            
            onGoToHome={() => navigate('landing')}
            onGoToContact={() => navigate('contact')}
          />
        )}

        {!isPageLoading && view === 'builder' && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="min-h-screen bg-transparent text-slate-800 flex flex-col pb-24"
          >
            {/* Top Header Navigation */}
            <Navbar
              budget={budget}
              onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
              onSelectPreset={handleSelectPreset}
              onResetBuild={handleResetBuild}
              onOpenShareModal={() => setIsShareModalOpen(true)}
              onOpenPerformanceModal={() => setIsPerformanceModalOpen(true)}
              onGoToHome={() => navigate('landing')}
              onGoToCheckout={() => navigate('checkout')}
            />

            {/* Main Content Dashboard */}
            <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 w-full flex-1 space-y-6">
              {/* Top Hero Stats Banner */}
              <div className="glass-layer rounded-2xl p-5 border border-[#B0DEED] flex flex-col md:flex-row items-center justify-between gap-4 shadow-md">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-[#80CCE3]/30 text-slate-900 border border-[#80CCE3]/60">
                      <Cpu className="w-4 h-4 text-slate-800" />
                    </span>
                    <h2 className="text-lg font-brand font-bold text-slate-900 tracking-wider">EDITH</h2>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Configure components with real-time validation across sockets, memory standards, and power headroom.
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                  <div className="text-center px-3.5 py-2 rounded-xl glass-layer border border-[#B0DEED] shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Components</span>
                    <p className="text-base font-mono font-bold text-slate-900">{filledCount} / 8</p>
                  </div>

                  <div className="text-center px-3.5 py-2 rounded-xl glass-layer border border-[#B0DEED] shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Est. Power Draw</span>
                    <p className="text-base font-mono font-bold text-sky-700">{compatibilityReport.totalWattage}W</p>
                  </div>

                  <div className="text-center px-3.5 py-2 rounded-xl glass-layer border border-[#B0DEED] shadow-xs">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Status</span>
                    <p className={`text-xs font-bold ${compatibilityReport.isCompatible ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {compatibilityReport.isCompatible ? '✅ Compatible' : '⚠️ Conflict'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive PC Visual Blueprint */}
              <VisualPCChassis
                selectedParts={selectedParts}
                onOpenSlotDrawer={(cat) => setActiveDrawerCategory(cat)}
              />

              {/* Visual Component Slots Grid (4x2 layout) */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-700" /> Component Slots
                  </h2>
                  <span className="text-xs text-slate-500">Click any card to select or swap hardware</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categories.map((cat) => {
                    const selectedComp = selectedParts[cat];
                    const catStatus = compatibilityReport.categoryStatus[cat];

                    return (
                      <ComponentSlotCard
                        key={cat}
                        category={cat}
                        selectedComponent={selectedComp}
                        isCompatible={catStatus.isCompatible}
                        incompatibilityReason={catStatus.reason}
                        onOpenDrawer={(c) => setActiveDrawerCategory(c)}
                        onRemoveComponent={(c) => handleRemoveComponent(c)}
                      />
                    );
                  })}
                </div>
              </div>
            </main>

            {/* Footer */}
            <Footer
              onGoToHome={() => navigate('landing')}
              onGoToContact={() => navigate('contact')}
            />

            {/* Fixed Bottom Summary Bar */}
            <BottomSummaryBar
              report={compatibilityReport}
              budget={budget}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onOpenPerformanceModal={() => setIsPerformanceModalOpen(true)}
              onProceedToCheckout={() => navigate('checkout')}
            />

            {/* Component Drawer */}
            <ComponentDrawer
              isOpen={activeDrawerCategory !== null}
              category={activeDrawerCategory}
              selectedParts={selectedParts}
              onClose={() => setActiveDrawerCategory(null)}
              onSelectComponent={handleSelectComponent}
              onAttemptIncompatibleSelect={handleAttemptIncompatibleSelect}
            />

            {/* Diagnostic Audit Report Modal */}
            <CompatibilityModal
              isOpen={isReportModalOpen}
              report={compatibilityReport}
              selectedParts={selectedParts}
              onClose={() => setIsReportModalOpen(false)}
            />

            {/* FPS Performance Estimator Modal */}
            <PerformanceEstimatorModal
              isOpen={isPerformanceModalOpen}
              selectedParts={selectedParts}
              onClose={() => setIsPerformanceModalOpen(false)}
            />

            {/* Budget Modal */}
            <BudgetModal
              isOpen={isBudgetModalOpen}
              currentBudget={budget}
              onSaveBudget={(newBudget) => {
                setBudget(newBudget);
                addToast('Budget Updated', `Target budget set to ${formatRupees(newBudget)}.`, 'info');
              }}
              onClose={() => setIsBudgetModalOpen(false)}
            />

            {/* Share / Export Modal */}
            <ShareModal
              isOpen={isShareModalOpen}
              selectedParts={selectedParts}
              report={compatibilityReport}
              budget={budget}
              onClose={() => setIsShareModalOpen(false)}
            />
          </motion.div>
        )}

        {!isPageLoading && view === 'contact' && (
          <ContactPage
            key="contact"
            onGoToHome={() => navigate('landing')}
            onGoToContact={() => navigate('contact')}
            
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;

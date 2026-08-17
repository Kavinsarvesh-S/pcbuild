import React, { useState } from 'react';
import type { SelectedParts, CompatibilityReport } from '../types/pcBuilder';
import { X, Copy, Check, Share2, FileText, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatRupees } from '../utils/currencyFormatter';

interface ShareModalProps {
  isOpen: boolean;
  selectedParts: SelectedParts;
  report: CompatibilityReport;
  budget: number;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  selectedParts,
  report,
  budget,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [format, setFormat] = useState<'text' | 'markdown' | 'json'>('markdown');

  if (!isOpen) return null;

  const generateMarkdown = () => {
    let md = `### 🖥️ NEXUS RIG Custom PC Build\n\n`;
    md += `**Total Price:** ${formatRupees(report.totalPrice)} | **Budget:** ${formatRupees(budget)}\n`;
    md += `**Estimated System Draw:** ${report.totalWattage}W | **Compatibility:** ${report.isCompatible ? '✅ Passed' : '❌ Conflict'}\n\n`;
    md += `| Category | Hardware Component | Price |\n`;
    md += `| :--- | :--- | :--- |\n`;

    Object.entries(selectedParts).forEach(([cat, comp]) => {
      if (comp) {
        md += `| **${cat.toUpperCase()}** | ${comp.name} | ${formatRupees(comp.price)} |\n`;
      } else {
        md += `| **${cat.toUpperCase()}** | *Not Selected* | ₹0 |\n`;
      }
    });

    return md;
  };

  const generatePlainText = () => {
    let text = `NEXUS RIG CUSTOM PC BUILD\n-------------------------\n`;
    text += `Total Price: ${formatRupees(report.totalPrice)} (Budget: ${formatRupees(budget)})\n`;
    text += `Estimated Load: ${report.totalWattage}W\n\n`;

    Object.entries(selectedParts).forEach(([cat, comp]) => {
      text += `${cat.toUpperCase()}: ${comp ? `${comp.name} (${formatRupees(comp.price)})` : 'Not Selected'}\n`;
    });

    return text;
  };


  const generateJSON = () => {
    return JSON.stringify(
      {
        totalPrice: report.totalPrice,
        estimatedWattage: report.totalWattage,
        isCompatible: report.isCompatible,
        parts: selectedParts,
      },
      null,
      2
    );
  };

  const getOutputText = () => {
    if (format === 'markdown') return generateMarkdown();
    if (format === 'json') return generateJSON();
    return generatePlainText();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getOutputText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          className="relative w-full max-w-xl glass-layer border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-white"
        >
          <div className="p-5 glass-layer border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Share & Export Custom Build</h2>
                <p className="text-xs text-white/70">Export formatted specs list for forums, Reddit, or saving</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-white/70 hover:text-white transition hover-gemini-gradient"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {/* Format Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFormat('markdown')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition hover-gemini-gradient ${
                  format === 'markdown' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-white/90 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Markdown Table
              </button>
              <button
                onClick={() => setFormat('text')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition hover-gemini-gradient ${
                  format === 'text' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-white/90 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Plain Text
              </button>
              <button
                onClick={() => setFormat('json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition hover-gemini-gradient ${
                  format === 'json' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-white/90 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                <Code className="w-3.5 h-3.5" /> JSON Raw
              </button>
            </div>

            {/* Code Output Text Box */}
            <div className="relative">
              <textarea
                readOnly
                rows={10}
                value={getOutputText()}
                className="w-full p-4 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-white focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-white/70">
                {Object.values(selectedParts).filter(Boolean).length} / 8 components selected
              </span>

              <button
                onClick={handleCopy}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition hover-gemini-gradient flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Build Specs'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


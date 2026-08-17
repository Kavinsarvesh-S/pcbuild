import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onGoToHome: () => void;
  onGoToContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoToHome, onGoToContact }) => {
  return (
    <footer className="w-full bg-white/10 backdrop-blur-md border-t border-[#94BDCF]/60 py-12 px-4 lg:px-8 mt-auto text-slate-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Description */}
        <div className="space-y-4 col-span-1 md:col-span-1">
          <button onClick={onGoToHome} className="flex items-center gap-2 text-left transition hover:opacity-80 group">
            <img src="/assest/logo.png" alt="EDITH Logo" className="h-[42px] w-auto object-contain drop-shadow-sm" />
            <div>
              <h2 className="text-lg font-brand font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                EDITH
              </h2>
            </div>
          </button>
          <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
            Premium custom PC builder with real-time hardware compatibility checking and performance estimation. Build your pastel dream rig today.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Quick Links</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><button onClick={onGoToHome} className="hover:text-slate-950 hover:underline transition">Home / PC Builder</button></li>
            <li><button onClick={onGoToHome} className="hover:text-slate-950 hover:underline transition">Curated Presets</button></li>
            <li><button onClick={onGoToContact} className="hover:text-slate-950 hover:underline transition">Contact Us</button></li>
            <li><a href="#" className="hover:text-slate-950 hover:underline transition">FAQ & Support</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Build Categories</h3>
          <ul className="space-y-2 text-xs text-slate-600">
            <li><a href="#" className="hover:text-slate-950 hover:underline transition">Gaming & Streaming</a></li>
            <li><a href="#" className="hover:text-slate-950 hover:underline transition">Content Creation</a></li>
            <li><a href="#" className="hover:text-slate-950 hover:underline transition">Engineering Workstations</a></li>
            <li><a href="#" className="hover:text-slate-950 hover:underline transition">Data Science Rigs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Contact & Location</h3>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <span>123, CPT Campus, Main Building,<br />Tharamani, Chennai 600 113</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-700 shrink-0" />
              <a href="tel:+919344502361" className="hover:text-slate-950 transition">+91 9344502361</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-700 shrink-0" />
              <a href="mailto:edith@query.pcbuild" className="hover:text-slate-950 transition">edith@query.pcbuild</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-[#94BDCF]/50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <p>&copy; {new Date().getFullYear()} Edith PC Builder Studio. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-800 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-800 transition">Terms of Service</a>
          <a href="#" className="hover:text-slate-800 transition">Return Policy</a>
        </div>
      </div>
    </footer>
  );
};

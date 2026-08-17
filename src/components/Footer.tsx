import React from 'react';
import { Mail, Phone, MapPin, Cpu } from 'lucide-react';

interface FooterProps {
  onGoToHome: () => void;
  onGoToContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoToHome, onGoToContact }) => {
  return (
    <footer className="w-full bg-[#22151F] border-t border-rose-500/40 py-12 px-4 lg:px-8 mt-auto text-white/90">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Description */}
        <div className="space-y-4 col-span-1 md:col-span-1">
          <button onClick={onGoToHome} className="flex items-center gap-3 text-left transition hover-gemini-gradient group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF3D6E] via-[#FF9E1B] to-[#FF3D6E] flex items-center justify-center shadow-sm border border-rose-500/50">
              <Cpu className="w-4 h-4 text-white font-bold" />
            </div>
            <div>
              <h2 className="text-lg font-brand font-bold tracking-tight text-white flex items-center gap-1.5">
                EDITH
              </h2>
            </div>
          </button>
          <p className="text-xs text-white/70 leading-relaxed max-w-xs">
            Premium custom PC builder with real-time hardware compatibility checking and performance estimation. Build your pastel dream rig today.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li><button onClick={onGoToHome} className="hover:text-rose-400 hover:underline transition">Home / PC Builder</button></li>
            <li><button onClick={onGoToHome} className="hover:text-rose-400 hover:underline transition">Curated Presets</button></li>
            <li><button onClick={onGoToContact} className="hover:text-rose-400 hover:underline transition">Contact Us</button></li>
            <li><a href="#" className="hover:text-rose-400 hover:underline transition">FAQ & Support</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Build Categories</h3>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-rose-400 hover:underline transition">Gaming & Streaming</a></li>
            <li><a href="#" className="hover:text-rose-400 hover:underline transition">Content Creation</a></li>
            <li><a href="#" className="hover:text-rose-400 hover:underline transition">Engineering Workstations</a></li>
            <li><a href="#" className="hover:text-rose-400 hover:underline transition">Data Science Rigs</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Contact & Location</h3>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>123 Pastel Avenue, Silicon Valley Tech Park,<br />San Jose, CA 95131</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-400 shrink-0" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-400 shrink-0" />
              <span>support@edithpc.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-rose-500/40/50 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/60">
        <p>&copy; {new Date().getFullYear()} Edith PC Builder Studio. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white/80 transition">Privacy Policy</a>
          <a href="#" className="hover:text-white/80 transition">Terms of Service</a>
          <a href="#" className="hover:text-white/80 transition">Return Policy</a>
        </div>
      </div>
    </footer>
  );
};

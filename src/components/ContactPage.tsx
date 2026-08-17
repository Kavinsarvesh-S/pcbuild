import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock, Cpu } from 'lucide-react';
import { Footer } from './Footer';

interface ContactPageProps {
  onGoToHome: () => void;
  onGoToContact: () => void;
  onStartBuilding: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onGoToHome, onGoToContact, onStartBuilding }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-[#22151F] text-white flex flex-col"
    >
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-rose-500/40 px-4 lg:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={onGoToHome} className="flex items-center gap-3 text-left transition hover-gemini-gradient group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF3D6E] via-[#FF9E1B] to-[#FF3D6E] flex items-center justify-center shadow-md border border-rose-500/50">
              <Cpu className="w-6 h-6 text-white font-bold" />
            </div>
            <div>
              <h1 className="text-xl font-brand font-bold tracking-tight text-white flex items-center gap-1.5">
                EDITH
              </h1>
              <p className="text-[10px] text-white/70 font-medium hidden sm:block">Edith PC Builder Studio</p>
            </div>
          </button>
          <div className="flex gap-4 items-center">
            <button onClick={onGoToHome} className="text-xs font-bold text-white/80 hover:text-rose-400 transition">Home</button>
            <button onClick={onStartBuilding} className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/90 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 border border-rose-500/50">
              Builder
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Get in <span className="text-gradient-lavender">Touch</span>
          </h1>
          <p className="text-white/80">
            Have questions about a custom build, compatibility, or your recent order? Our expert PC building team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-2xl border border-rose-500/40 glass-layer shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30 shrink-0">
                <MapPin className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Our Location</h3>
                <p className="text-sm text-white/80">123 Pastel Avenue, Silicon Valley Tech Park,<br />San Jose, CA 95131</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-[#FF9E1B]/40 bg-[#FF9E1B]/20/40 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF9E1B]/30/50 flex items-center justify-center border border-[#FF9E1B]/40/60 shrink-0">
                <Phone className="w-5 h-5 text-[#FF9E1B]" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Phone Support</h3>
                <p className="text-sm text-white/80">+1 (800) 123-4567<br />Toll-free, Mon-Fri 9am-6pm PST</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-rose-500/50 bg-rose-500/40/10 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/40/30 flex items-center justify-center border border-rose-500/50/50 shrink-0">
                <Mail className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Email Us</h3>
                <p className="text-sm text-white/80">support@edithpc.com<br />We aim to reply within 24 hours.</p>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl border border-rose-500/40 bg-rose-500/10/30 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/30/40 flex items-center justify-center border border-rose-500/40/60 shrink-0">
                <Clock className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Business Hours</h3>
                <p className="text-sm text-white/80">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-rose-500/40 glass-layer shadow-md h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/90">First Name</label>
                    <input type="text" className="w-full bg-white/50 border border-rose-500/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition" placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/90">Last Name</label>
                    <input type="text" className="w-full bg-white/50 border border-rose-500/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Email Address</label>
                  <input type="email" className="w-full bg-white/50 border border-rose-500/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition" placeholder="john@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Subject</label>
                  <select className="w-full bg-white/50 border border-rose-500/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition">
                    <option>General Inquiry</option>
                    <option>Custom Build Advice</option>
                    <option>Order Status</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white/90">Message</label>
                  <textarea rows={5} className="w-full bg-white/50 border border-rose-500/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/90 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 border border-rose-500/50"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer onGoToHome={onGoToHome} onGoToContact={onGoToContact} />
    </motion.div>
  );
};

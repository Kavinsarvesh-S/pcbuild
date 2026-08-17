import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import { Footer } from './Footer';

interface ContactPageProps {
  onGoToHome: () => void;
  onGoToContact: () => void;
  
}

export const ContactPage: React.FC<ContactPageProps> = ({ onGoToHome, onGoToContact, }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-transparent text-slate-900 flex flex-col"
    >
      {/* Top Navbar */}
      

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Get in <span className="text-gradient-lavender">Touch</span>
          </h1>
          <p className="text-slate-700">
            Have questions about a custom build, compatibility, or your recent order? Our expert PC building team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-2xl border border-[#94BDCF]/40 glass-layer shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#94BDCF]/20 flex items-center justify-center border border-[#94BDCF]/30 shrink-0">
                <MapPin className="w-5 h-5 text-[#80CCE3]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Our Location</h3>
                <p className="text-sm text-slate-700">123, CPT Campus, Main Building,<br />Tharamani, Chennai 600 113</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-2xl border border-[#94BDCF]/40 glass-layer shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#94BDCF]/20 flex items-center justify-center border border-[#94BDCF]/30 shrink-0">
                <Phone className="w-5 h-5 text-[#80CCE3]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Phone Support</h3>
                <p className="text-sm text-slate-700">9344502361<br />Mon-Fri 9am-6pm IST</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-2xl border border-[#94BDCF]/40 glass-layer shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#94BDCF]/20 flex items-center justify-center border border-[#94BDCF]/30 shrink-0">
                <Mail className="w-5 h-5 text-[#80CCE3]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                <p className="text-sm text-slate-700">edith@query.pcbuild<br />We aim to reply within 24 hours.</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-2xl p-6 rounded-2xl border border-[#94BDCF]/40 glass-layer shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#94BDCF]/20 flex items-center justify-center border border-[#94BDCF]/30 shrink-0">
                <Clock className="w-5 h-5 text-[#80CCE3]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Business Hours</h3>
                <p className="text-sm text-slate-700">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 backdrop-blur-2xl p-6 md:p-8 rounded-3xl border border-[#94BDCF]/40 glass-layer shadow-md h-full">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">First Name</label>
                    <input type="text" className="w-full bg-white/50 border border-[#94BDCF]/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition" placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800">Last Name</label>
                    <input type="text" className="w-full bg-white/50 border border-[#94BDCF]/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Email Address</label>
                  <input type="email" className="w-full bg-white/50 border border-[#94BDCF]/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition" placeholder="john@example.com" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Subject</label>
                  <select className="w-full bg-white/50 border border-[#94BDCF]/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition">
                    <option>General Inquiry</option>
                    <option>Custom Build Advice</option>
                    <option>Order Status</option>
                    <option>Technical Support</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800">Message</label>
                  <textarea rows={5} className="w-full bg-white/50 border border-[#94BDCF]/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition resize-none" placeholder="How can we help you?"></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#94BDCF]/20 hover:bg-[#94BDCF]/90 text-slate-900 font-bold text-sm shadow-md transition flex items-center justify-center gap-2 border border-[#94BDCF]/50"
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

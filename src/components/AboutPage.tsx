import React from 'react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';

interface AboutPageProps {}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="min-h-screen bg-transparent text-slate-800 flex flex-col"
    >
      <main className="flex-1 max-w-5xl mx-auto px-4 lg:px-8 py-16 w-full space-y-20">
        
        {/* Company Story */}
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Our <span className="text-[#80CCE3]">Story</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            EDITH PC Builder Studio started with a simple mission: to make building a custom PC as exciting and seamless as possible. We believe that everyone, from hardcore gamers to creative professionals, deserves a machine tailored exactly to their needs—without the headache of compatibility issues.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl border border-[#B0DEED] shadow-sm bg-white/40">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Mission</h3>
            <p className="text-slate-600">
              To empower creators, gamers, and engineers by providing an intuitive, beautiful, and reliable platform for designing high-performance custom computers.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-2xl p-8 rounded-3xl border border-[#B0DEED] shadow-sm bg-white/40">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Values</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>0 Compromise on Quality</li>
              <li>Smarter Builds, Not Harder</li>
              <li>Transparent Pricing & Compatibility</li>
              <li>Continuous Innovation</li>
            </ul>
          </div>
        </section>

        {/* Team Placeholder */}
        <section className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-[#B0DEED]/40 border-4 border-white mb-4 shadow-sm" />
                <h4 className="text-lg font-bold text-slate-900">Team Member {i}</h4>
                <p className="text-sm text-slate-500">PC Enthusiast</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer onGoToContact={() => {}} onGoToHome={() => {}} />
    </motion.div>
  );
};

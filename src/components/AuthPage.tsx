import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import {} from './Footer';

interface AuthPageProps {
  onLoginSuccess?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-transparent flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-md perspective-1000 relative h-[500px]">
        <AnimatePresence initial={false} mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/60 shadow-2xl h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
                  <p className="text-slate-500 mt-2">Log in to your EDITH account</p>
                </div>
                
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(); }}>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700" required />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700" required />
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full py-3 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-900 font-bold shadow-md transition-all flex justify-center items-center gap-2">
                    Log In <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                
                <p className="text-center mt-6 text-sm text-slate-500">
                  Don't have an account?{' '}
                  <button onClick={() => setIsLogin(false)} className="text-[#80CCE3] hover:text-[#94BDCF] font-bold underline underline-offset-4">Sign up</button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/60 shadow-2xl h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
                  <p className="text-slate-500 mt-2">Join EDITH PC Builder</p>
                </div>
                
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(); }}>
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700" required />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700" required />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input type="password" placeholder="Password" className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700" required />
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full py-3 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-900 font-bold shadow-md transition-all flex justify-center items-center gap-2">
                    Sign Up <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                
                <p className="text-center mt-6 text-sm text-slate-500">
                  Already have an account?{' '}
                  <button onClick={() => setIsLogin(true)} className="text-[#80CCE3] hover:text-[#94BDCF] font-bold underline underline-offset-4">Log in</button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

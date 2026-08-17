import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, KeyRound, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  onLoginSuccess?: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  // UI status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { login, signup, resetPassword: sendResetPasswordEmail, isFirebaseConfigured } = useAuth();

  // Helper to map Firebase Auth error codes to user-friendly messages
  const getFirebaseErrorMessage = (err: any): string => {
    const code = err?.code || '';
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Try logging in instead.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment and try again.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/api-key-not-valid':
      case 'auth/invalid-api-key':
        return 'Missing or invalid Firebase credentials. Please update your .env.local file.';
      default:
        return err?.message || 'An unexpected error occurred. Please try again.';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Client-side validation
    if (!email.trim() || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      setSuccessMessage('Successfully logged in! Redirecting...');
      setTimeout(() => {
        onLoginSuccess?.();
      }, 1000);
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Client-side validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setLoading(true);
    try {
      await signup(name.trim(), email.trim(), password);
      setSuccessMessage('Account created successfully! Welcome to EDITH.');
      setTimeout(() => {
        onLoginSuccess?.();
      }, 1200);
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!resetEmail.trim()) {
      setError('Please enter your account email address.');
      return;
    }

    setLoading(true);
    try {
      await sendResetPasswordEmail(resetEmail.trim());
      setSuccessMessage('Password reset link sent! Check your inbox.');
      setResetEmail('');
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-transparent flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      {!isFirebaseConfigured && (
        <div className="w-full max-w-md mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>Note:</strong> Firebase credentials not detected in <code>.env.local</code>. Please add your Firebase configuration to activate live cloud authentication.
          </span>
        </div>
      )}

      <div className="w-full max-w-md perspective-1000 relative min-h-[520px]">
        <AnimatePresence initial={false} mode="wait">
          {showForgotPassword ? (
            <motion.div
              key="forgot-password"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/60 shadow-2xl h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-[#80CCE3]/20 border border-[#80CCE3]/50 flex items-center justify-center text-slate-800">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Reset Password</h2>
                  <p className="text-slate-600 text-xs mt-1">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleResetPassword}>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="Account Email Address"
                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] disabled:opacity-60 text-slate-900 font-bold shadow-md transition-all flex justify-center items-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Link...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition underline underline-offset-4"
                  >
                    ← Back to Login
                  </button>
                </div>
              </div>
            </motion.div>
          ) : isLogin ? (
            <motion.div
              key="login"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/60 shadow-2xl h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
                  <p className="text-slate-600 text-sm mt-1">Log in to your EDITH account</p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(true);
                        setError(null);
                        setSuccessMessage(null);
                      }}
                      className="text-xs font-semibold text-[#80CCE3] hover:text-[#94BDCF] transition"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] disabled:opacity-60 text-slate-900 font-bold shadow-md transition-all flex justify-center items-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Log In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center mt-6 text-sm text-slate-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[#80CCE3] hover:text-[#94BDCF] font-bold underline underline-offset-4"
                  >
                    Sign up
                  </button>
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
              className="w-full h-full"
            >
              <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/30 border border-white/60 shadow-2xl h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
                  <p className="text-slate-600 text-sm mt-1">Join EDITH PC Builder</p>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form className="space-y-3.5" onSubmit={handleSignup}>
                  <div>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password (min. 6 characters)"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-[#B0DEED] rounded-xl outline-none focus:border-[#80CCE3] focus:ring-2 focus:ring-[#80CCE3]/20 transition-all text-slate-700 text-sm"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] disabled:opacity-60 text-slate-900 font-bold shadow-md transition-all flex justify-center items-center gap-2 text-sm mt-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign Up</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center mt-5 text-sm text-slate-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setError(null);
                      setSuccessMessage(null);
                    }}
                    className="text-[#80CCE3] hover:text-[#94BDCF] font-bold underline underline-offset-4"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

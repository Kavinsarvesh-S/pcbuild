import React, { type ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  onRedirectToLogin: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, onRedirectToLogin }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#80CCE3] mb-4" />
        <p className="text-slate-600 text-sm font-medium">Verifying authorization...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-600">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Authentication Required</h3>
        <p className="text-sm text-slate-600 mb-6">
          You need to be signed in to access this section of EDITH.
        </p>
        <button
          onClick={onRedirectToLogin}
          className="px-6 py-2.5 rounded-xl bg-[#80CCE3] hover:bg-[#94BDCF] text-slate-900 font-bold text-sm shadow-md transition-all"
        >
          Sign In / Create Account
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

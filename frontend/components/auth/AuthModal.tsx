'use client';

import React, { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { GoogleLoginButton } from './GoogleLoginButton';
import { X, Eye, EyeOff, Lock, Mail, User, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const { loginWithEmail, registerWithEmail, loginAsDemoUser } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Data Analyst');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail({ email, password });
      } else {
        await registerWithEmail({ name, email, password, role });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (persona: 'aarav' | 'ranjan') => {
    loginAsDemoUser(persona);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-scaleUp">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white font-black text-xs shadow-xs">
              SR
            </div>
            <div>
              <h2 className="text-sm font-black text-brand-navy">
                {mode === 'login' ? 'Sign In to SkillRoute' : 'Create SkillRoute Account'}
              </h2>
              <p className="text-[11px] text-slate-500">
                Workforce Transition Intelligence Platform
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 bg-slate-50/30">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2.5 text-xs font-bold transition-all ${
              mode === 'login'
                ? 'text-brand-navy border-b-2 border-brand-navy bg-white'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-2.5 text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'text-brand-navy border-b-2 border-brand-navy bg-white'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Google Sign-In Button */}
          <GoogleLoginButton onSuccess={onClose} label={mode === 'login' ? 'Continue with Google' : 'Sign up with Google'} />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider absolute">
              Or with email
            </span>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Current Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Data Analyst, BI Specialist"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-xs transition-all disabled:opacity-50 mt-1 cursor-pointer"
            >
              {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 mb-2 flex items-center justify-between">
              <span>Quick 1-Click Evaluation Accounts</span>
              <Sparkles className="w-3 h-3 text-brand-saffron" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('aarav')}
                className="p-2 border border-slate-200 rounded-lg hover:border-brand-navy hover:bg-slate-50 text-left transition-all group cursor-pointer flex items-center gap-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Aarav"
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-brand-navy group-hover:text-blue-600 truncate">
                    Aarav Sharma
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">Data Analyst • 1.5y</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('ranjan')}
                className="p-2 border border-slate-200 rounded-lg hover:border-brand-navy hover:bg-slate-50 text-left transition-all group cursor-pointer flex items-center gap-2"
              >
                <img
                  src="/default-avatar.svg"
                  alt="Ranjan"
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold text-brand-navy group-hover:text-blue-600 truncate">
                    Ranjan Maiti
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">Build For Bharat 2.0</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { GoogleLoginButton } from '../../components/auth/GoogleLoginButton';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithEmail, loginAsDemoUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Catch OAuth query error states
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'cancelled') {
      setError('Google sign-in was cancelled.');
    } else if (errorParam === 'oauth_failed' || errorParam === 'token_exchange_failed') {
      setError("We couldn't sign you in with Google. Please try again.");
    } else if (errorParam === 'userinfo_failed') {
      setError("We couldn't retrieve your Google account information.");
    } else if (errorParam === 'expired') {
      setError('Your session has expired. Please sign in again.');
    } else if (errorParam === 'missing_credentials') {
      setError('Google OAuth configuration required: Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local to connect to accounts.google.com.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginWithEmail({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSelect = (persona: 'aarav' | 'ranjan') => {
    loginAsDemoUser(persona);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="h-16 border-b border-brand-border bg-white px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white font-black text-sm shadow-xs">
            SR
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-brand-navy">SKILLROUTE</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
              Build For Bharat 2.0
            </span>
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-slate-600 hover:text-brand-navy transition-colors"
        >
          ← Back to Overview
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl border border-brand-border shadow-xl overflow-hidden">
          
          {/* Left Brand Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-slate text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-amber-300">
                <Award className="w-3.5 h-3.5" />
                <span>Build For Bharat 2.0 • Team ELITECORE</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Skill-to-Opportunity <br />
                  Transition Intelligence
                </h1>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Turn your existing capabilities into an evidence-backed roadmap to your target career role.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Taxonomy-grounded in ESCO 1.2.1 & NCS India</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Deterministic opportunity scoring engine</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Empirical project & code evidence verification</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
              <span>Grounding Engine: Online</span>
              <span className="font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                98.4% Confidence
              </span>
            </div>
          </div>

          {/* Right Authentication Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5 max-w-md mx-auto w-full">
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-black text-brand-navy tracking-tight">
                  Welcome back
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Sign in to continue to SkillRoute
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                  <span className="leading-relaxed">{error}</span>
                </div>
              )}

              {/* REAL Google Sign-In Button */}
              <div className="pt-1">
                <GoogleLoginButton label="Continue with Google" />
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider absolute">
                  or
                </span>
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. aarav@skillroute.ai"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-700">
                      Password
                    </label>
                    <span className="text-[10px] text-brand-slate hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy focus:border-transparent transition-all"
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
                  className="w-full py-2.5 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-xs transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <span>{loading ? 'Signing in...' : 'Sign In with Email'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Demo Evaluation Personas */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-saffron" />
                    <span>Quick Hackathon Evaluation Personas:</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">1-Click</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoSelect('aarav')}
                    className="p-2 bg-white border border-slate-200 hover:border-brand-navy rounded-lg text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="text-[11px] font-bold text-brand-navy group-hover:text-blue-600 truncate">
                      Aarav Sharma
                    </div>
                    <div className="text-[10px] text-slate-500">Data Analyst • 1.5y</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoSelect('ranjan')}
                    className="p-2 bg-white border border-slate-200 hover:border-brand-navy rounded-lg text-left transition-all group cursor-pointer shadow-2xs"
                  >
                    <div className="text-[11px] font-bold text-brand-navy group-hover:text-blue-600 truncate">
                      Ranjan Maiti
                    </div>
                    <div className="text-[10px] text-slate-500">Build For Bharat 2.0</div>
                  </button>
                </div>
              </div>

              {/* Footer Links */}
              <div className="space-y-2 pt-1 text-center">
                <div className="text-xs text-slate-600">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="font-bold text-brand-navy hover:underline">
                    Create account
                  </Link>
                </div>
                <div className="text-[10px] text-slate-400">
                  <span className="hover:underline cursor-pointer">Privacy Policy</span>
                  {' · '}
                  <span className="hover:underline cursor-pointer">Terms of Service</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-brand-border bg-white text-center text-[11px] text-slate-500">
        SkillRoute • Build For Bharat 2.0 Hackathon • Team ELITECORE
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

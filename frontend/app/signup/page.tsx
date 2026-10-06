'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { GoogleLoginButton } from '../../components/auth/GoogleLoginButton';
import {
  Lock,
  Mail,
  User,
  Briefcase,
  Eye,
  EyeOff,
  ArrowRight,
  Award,
  CheckCircle2,
  Github,
  MapPin
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { registerWithEmail, loginWithGitHub } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Data Analyst');
  const [location, setLocation] = useState('Delhi NCR, India');
  const [experienceYears, setExperienceYears] = useState('1.5');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await registerWithEmail({
        name,
        email,
        password,
        role,
        location,
        experience_years: parseFloat(experienceYears) || 1.0
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check the details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHub = async () => {
    setLoading(true);
    try {
      await loginWithGitHub();
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between font-sans">
      {/* Header */}
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
          href="/login"
          className="text-xs font-semibold text-slate-600 hover:text-brand-navy transition-colors"
        >
          Already have an account? <strong className="text-brand-navy underline">Sign In</strong>
        </Link>
      </header>

      {/* Main Grid */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl border border-brand-border shadow-xl overflow-hidden">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-slate text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-amber-300">
                <Award className="w-3.5 h-3.5" />
                <span>Build For Bharat 2.0</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                  Design Your <br />
                  Transition Pathway
                </h1>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Join candidates across Bharat navigating structured, high-value career mobility with verified evidence.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Personalized skill constellation mapping</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Deterministic opportunity scoring engine</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Learn → Build → Prove → Apply milestones</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 pt-6 border-t border-white/10 text-[11px] text-slate-400">
              Free during Build For Bharat 2.0 demonstration
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5 max-w-md mx-auto w-full">
              <div>
                <h2 className="text-2xl font-black text-brand-navy tracking-tight">
                  Create Your Account
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Start mapping your career transition in minutes.
                </p>
              </div>

              {/* Fast OAuth */}
              <div className="space-y-2">
                <GoogleLoginButton
                  onSuccess={() => router.push('/dashboard')}
                  label="Sign up with Google"
                />

                <button
                  type="button"
                  onClick={handleGitHub}
                  className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Sign up with GitHub</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider absolute">
                  Or register with email
                </span>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Roy"
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
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Data Analyst"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya.roy@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-navy"
                      />
                    </div>
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
                      minLength={6}
                      placeholder="Minimum 6 characters"
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
                  className="w-full py-2.5 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-xs transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <span>{loading ? 'Creating Profile...' : 'Complete Registration'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="text-center text-xs text-slate-600">
                Already registered?{' '}
                <Link href="/login" className="font-bold text-brand-navy hover:underline">
                  Sign In
                </Link>
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

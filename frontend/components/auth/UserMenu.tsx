'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../lib/auth-context';
import {
  User,
  LogOut,
  ChevronDown,
  Layers,
  Compass,
  Route,
  Check,
  RefreshCw,
  Sparkles,
  Shield
} from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, logout, loginAsDemoUser, openAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="px-3 py-1.5 text-xs font-bold text-brand-navy hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-3.5 py-1.5 text-xs font-bold bg-brand-navy hover:bg-slate-800 text-white rounded-lg transition-all shadow-2xs"
        >
          Create Account
        </Link>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  const getProviderBadge = (provider: string) => {
    switch (provider) {
      case 'google':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Google
          </span>
        );
      case 'github':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-800 border border-slate-300">
            GitHub
          </span>
        );
      case 'demo':
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
            Demo Persona
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
            Verified
          </span>
        );
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer group"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center shadow-2xs group-hover:bg-brand-slate transition-colors">
            {initials}
          </div>
        )}
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold text-brand-navy leading-tight flex items-center gap-1">
            <span>{user.name}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-brand-navy transition-transform" />
          </div>
          <div className="text-[10px] text-slate-400 truncate leading-none">
            {user.role}
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1 divide-y divide-slate-100 animate-fadeIn">
          {/* User Details Header */}
          <div className="p-3.5 space-y-1 bg-slate-50/50 rounded-t-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-brand-navy">{user.name}</span>
              {getProviderBadge(user.provider)}
            </div>
            <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
            <div className="text-[10px] text-slate-400 pt-0.5 font-medium">
              {user.role} • {user.location || 'India'}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-50 transition-colors font-medium"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>Capability Constellation</span>
            </Link>
            <Link
              href="/transition/analytics-engineer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-50 transition-colors font-medium"
            >
              <Compass className="w-4 h-4 text-slate-400" />
              <span>Target: Analytics Engineer</span>
            </Link>
            <Link
              href="/pathway"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-50 transition-colors font-medium"
            >
              <Route className="w-4 h-4 text-slate-400" />
              <span>Optimized 18-Week Pathway</span>
            </Link>
          </div>

          {/* Switch Demo Persona */}
          <div className="p-2 space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Switch Persona</span>
              <RefreshCw className="w-2.5 h-2.5" />
            </div>
            <button
              onClick={() => {
                loginAsDemoUser('aarav');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left ${
                user.id === 'aarav_sharma_01'
                  ? 'bg-slate-100 text-brand-navy font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Aarav Sharma (Data Analyst)</span>
              {user.id === 'aarav_sharma_01' && <Check className="w-3.5 h-3.5 text-brand-navy" />}
            </button>
            <button
              onClick={() => {
                loginAsDemoUser('ranjan');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors text-left ${
                user.id === 'ranjan_maiti_01'
                  ? 'bg-slate-100 text-brand-navy font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>Ranjan Maiti (Build for Bharat)</span>
              {user.id === 'ranjan_maiti_01' && <Check className="w-3.5 h-3.5 text-brand-navy" />}
            </button>
          </div>

          {/* Sign Out */}
          <div className="p-1">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Sign Out of SkillRoute</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

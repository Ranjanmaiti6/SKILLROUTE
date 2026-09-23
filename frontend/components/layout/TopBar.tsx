'use client';

import React from 'react';
import { Search, Bell, Menu, Shield, Compass, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface TopBarProps {
  onOpenMobile?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobile }) => {
  return (
    <header className="h-16 border-b border-brand-border bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="md:hidden p-1.5 rounded-md hover:bg-slate-100 text-slate-600"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative w-64 md:w-80 hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills, transitions, or roles..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-brand-border rounded-md text-brand-navy focus:outline-none focus:border-brand-slate focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Active Target Transition Pill */}
        <Link
          href="/transition/analytics-engineer"
          className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-amber-50/70 border border-amber-200/80 rounded-full text-xs text-amber-900 hover:bg-amber-100/70 transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-brand-saffron" />
          <span>Active Target: <strong>Analytics Engineer (78% Overlap)</strong></span>
        </Link>

        {/* Responsible Engine Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-brand-borderLight rounded-full text-[11px] text-brand-muted">
          <Shield className="w-3 h-3 text-brand-green" />
          <span>Deterministic Graph Core</span>
        </div>

        {/* Notification Bell */}
        <button
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-brand-saffron absolute top-1.5 right-1.5" />
        </button>

        {/* Profile Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-brand-borderLight">
          <div className="w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-semibold flex items-center justify-center">
            RM
          </div>
          <span className="text-xs font-medium text-brand-navy hidden sm:inline">Ranjan Maiti</span>
        </div>
      </div>
    </header>
  );
};

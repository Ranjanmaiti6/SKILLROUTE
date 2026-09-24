'use client';

import React from 'react';
import { Search, Bell, Menu, Shield, Compass, Sparkles, Command } from 'lucide-react';
import Link from 'next/link';

interface TopBarProps {
  onOpenMobile?: () => void;
  onOpenCommand?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMobile, onOpenCommand }) => {
  return (
    <header className="h-16 border-b border-brand-border bg-white flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 shadow-subtle">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input with ⌘K Command Palette Trigger */}
        <button
          onClick={onOpenCommand}
          className="flex items-center gap-2.5 w-64 md:w-80 px-3 py-1.5 bg-slate-50 hover:bg-slate-100/80 border border-brand-border rounded-lg text-left text-xs text-slate-500 transition-colors group cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-navy transition-colors" />
          <span className="flex-1 font-medium truncate">Search skills, transitions, or roles...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-bold text-slate-500 bg-white rounded border border-slate-200 shadow-2xs">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Active Target Transition Pill */}
        <Link
          href="/transition/analytics-engineer"
          className="hidden lg:flex items-center gap-2 px-3 py-1 bg-amber-50/80 border border-amber-200/90 rounded-full text-xs text-amber-950 hover:bg-amber-100 transition-all font-semibold shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-brand-saffron animate-pulse" />
          <span>Active Target: <strong>Analytics Engineer (82 Fit)</strong></span>
        </Link>

        {/* Responsible Engine Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-brand-border rounded-full text-[11px] text-brand-muted font-medium">
          <Shield className="w-3.5 h-3.5 text-brand-green" />
          <span>Grounded Core (ESCO 1.2.1)</span>
        </div>

        {/* Notification Bell */}
        <button
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 relative transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-brand-saffron absolute top-1.5 right-1.5 ring-2 ring-white" />
        </button>

        {/* Profile Pill */}
        <Link
          href="/profile"
          className="flex items-center gap-2 pl-2 border-l border-brand-border hover:opacity-85 transition-opacity"
        >
          <div className="w-7 h-7 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center shadow-2xs">
            AS
          </div>
          <span className="text-xs font-bold text-brand-navy hidden sm:inline">Aarav Sharma</span>
        </Link>
      </div>
    </header>
  );
};


'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  Compass,
  GitFork,
  Route,
  CheckCircle2,
  LineChart,
  HelpCircle,
  Award,
  ChevronRight,
  Shield
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
  onOpenCommand?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile, onOpenCommand }) => {
  const pathname = usePathname();

  const primaryNav = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Capability', href: '/profile', icon: Layers },
    { name: 'Opportunities', href: '/opportunities', icon: Compass },
    { name: 'Transition', href: '/transition/analytics-engineer', icon: GitFork },
    { name: 'Pathway', href: '/pathway', icon: Route },
    { name: 'Evidence', href: '/evidence', icon: CheckCircle2 },
  ];

  const secondaryNav = [
    { name: 'Outcomes', href: '/outcomes', icon: LineChart },
    { name: 'How It Works', href: '/how-it-works', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-brand-border h-screen flex flex-col flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 border-b border-brand-border flex items-center justify-between px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center text-white font-black text-sm shadow-xs group-hover:bg-brand-slate transition-colors">
            SR
          </div>
          <div>
            <div className="font-extrabold text-sm tracking-tight text-brand-navy flex items-center gap-1.5">
              <span>SKILLROUTE</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                2.0
              </span>
            </div>
            <div className="text-[10px] text-brand-muted tracking-wider uppercase font-medium">
              Transition Intelligence
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Decision Core
          </div>
          <nav className="space-y-0.5">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href.startsWith('/transition') && pathname.startsWith('/transition'));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-100 text-brand-navy border-l-2 border-brand-navy pl-2.5 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-navy' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Intelligence Moat
          </div>
          <nav className="space-y-0.5">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-slate-100 text-brand-navy border-l-2 border-brand-navy pl-2.5 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-navy' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Command Palette Button */}
        {onOpenCommand && (
          <div className="pt-1">
            <button
              onClick={onOpenCommand}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-brand-border text-left flex items-center justify-between text-xs text-slate-600 transition-colors"
            >
              <span className="text-[11px] font-medium text-slate-500">Quick Command</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-bold bg-white text-slate-600 rounded border border-slate-200">
                ⌘ K
              </kbd>
            </button>
          </div>
        )}

        {/* Team & Challenge Stamp */}
        <div className="p-3 bg-slate-50/80 rounded-xl border border-brand-border text-xs text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 text-brand-navy font-bold text-[11px]">
            <Award className="w-3.5 h-3.5 text-brand-saffron" />
            <span>BUILD FOR BHARAT 2.0</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Team: <strong className="text-brand-navy">ELITECORE</strong>
          </div>
          <div className="text-[10px] text-slate-400">
            Workforce Transition Intelligence
          </div>
        </div>
      </div>

      {/* User Quick Switcher Footer */}
      <div className="p-3 border-t border-brand-border bg-slate-50/50">
        <Link
          href="/profile"
          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center font-bold text-xs shadow-2xs">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-brand-navy truncate">Aarav Sharma</div>
            <div className="text-[11px] text-brand-muted truncate">Data Analyst • 1.5 yrs</div>
          </div>
        </Link>
      </div>
    </aside>
  );
};


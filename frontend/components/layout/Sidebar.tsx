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
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();

  const primaryNav = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Capability Profile', href: '/profile', icon: Layers },
    { name: 'Opportunity Map', href: '/opportunities', icon: Compass },
    { name: 'Transition Graph', href: '/transition/analytics-engineer', icon: GitFork },
    { name: 'My Pathway', href: '/pathway', icon: Route },
    { name: 'Evidence Builder', href: '/evidence', icon: CheckCircle2 },
    { name: 'Transition Outcomes', href: '/outcomes', icon: LineChart },
  ];

  const secondaryNav = [
    { name: 'How It Works (Pipeline)', href: '/how-it-works', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-brand-border h-screen flex flex-col flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 border-b border-brand-border flex items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-brand-navy flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:bg-brand-slate transition-colors">
            SR
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-brand-navy flex items-center gap-1.5">
              <span>SKILLROUTE</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold uppercase">
                v2.0
              </span>
            </div>
            <div className="text-[10px] text-brand-muted tracking-wider uppercase font-medium">
              Transition Engine
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Decision Core
          </div>
          <nav className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href.startsWith('/transition') && pathname.startsWith('/transition'));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-slate-100 text-brand-navy font-semibold border-l-2 border-brand-slate pl-2.5'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-slate' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Transparency
          </div>
          <nav className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-slate-100 text-brand-navy font-semibold'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Team & Challenge Stamp */}
        <div className="p-3 bg-slate-50 rounded-lg border border-brand-borderLight text-xs text-brand-muted space-y-1">
          <div className="flex items-center gap-1.5 text-brand-navy font-semibold text-[11px]">
            <Award className="w-3.5 h-3.5 text-brand-saffron" />
            <span>BUILD FOR BHARAT 2.0</span>
          </div>
          <div className="text-[11px]">
            Team: <span className="font-medium text-slate-700">ELITECORE</span>
          </div>
          <div className="text-[10px] text-slate-400">
            Intelligent Workforce Ecosystem
          </div>
        </div>
      </div>

      {/* User Quick Switcher Footer */}
      <div className="p-3 border-t border-brand-border bg-slate-50/50">
        <div className="flex items-center gap-2.5 px-2 py-1.5">
          <div className="w-8 h-8 rounded-full bg-brand-slate text-white flex items-center justify-center font-semibold text-xs shadow-xs">
            RM
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-brand-navy truncate">Ranjan Maiti</div>
            <div className="text-[11px] text-brand-muted truncate">Data Analyst • 1.5 yrs</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

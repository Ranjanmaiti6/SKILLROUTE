'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  Layers,
  Compass,
  GitFork,
  Route,
  CheckCircle2,
  LineChart,
  ArrowRight,
  Sparkles,
  Command,
  X,
  Zap,
  Sliders
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  href?: string;
  icon: React.ElementType;
  badge?: string;
}

const PALETTE_ITEMS: ActionItem[] = [
  {
    id: 'transition-engine',
    title: 'Transition Engine',
    subtitle: 'Where can your current skills take you? Realistic transition analysis',
    category: 'Intelligence',
    href: '/transition-engine',
    icon: GitFork,
    badge: 'Core'
  },
  {
    id: 'next-best-skill',
    title: 'Next Best Skill',
    subtitle: 'If I can learn only ONE thing next, what should it be?',
    category: 'Intelligence',
    href: '/next-best-skill',
    icon: Zap,
    badge: 'Optimal'
  },
  {
    id: 'career-simulator',
    title: 'Career Transition Simulator',
    subtitle: 'Explore fastest, balanced, and specialized career pathways',
    category: 'Intelligence',
    href: '/career-simulator',
    icon: Route,
    badge: 'Paths'
  },
  {
    id: 'what-if',
    title: 'What-If Scenario Lab',
    subtitle: 'Explore how changing variables alters reachable opportunities',
    category: 'Intelligence',
    href: '/what-if',
    icon: Sliders,
    badge: 'Lab'
  },
  {
    id: 'overview',
    title: 'Command Center',
    subtitle: 'View transition readiness, KPIs, and next best action',
    category: 'Navigation',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: 'Overview'
  },
  {
    id: 'capability',
    title: 'Capability Profile',
    subtitle: 'Aarav Sharma • 4 evidence states & skill constellation',
    category: 'Navigation',
    href: '/profile',
    icon: Layers,
    badge: 'Profile'
  },
  {
    id: 'opportunities',
    title: 'Opportunity Landscape',
    subtitle: 'Evaluate 4 reachable transition destinations',
    category: 'Navigation',
    href: '/opportunities',
    icon: Compass,
    badge: 'Explore'
  },
  {
    id: 'transition',
    title: 'Transition Graph',
    subtitle: 'Interactive computational graph: Data Analyst → Analytics Engineer',
    category: 'Navigation',
    href: '/transition/analytics-engineer',
    icon: GitFork,
    badge: 'Graph'
  },
  {
    id: 'pathway',
    title: 'Constraint-Aware Optimizer',
    subtitle: 'Simulate learning pacing from 10h to 40h/week',
    category: 'Navigation',
    href: '/pathway',
    icon: Route,
    badge: 'Optimizer'
  },
  {
    id: 'evidence',
    title: 'Evidence Builder',
    subtitle: 'Learn → Build → Prove → Apply portfolio milestone proof',
    category: 'Navigation',
    href: '/evidence',
    icon: CheckCircle2,
    badge: 'Evidence'
  },
  {
    id: 'outcomes',
    title: 'Transition Outcomes',
    subtitle: 'Empirical telemetry & self-improving outcome loop',
    category: 'Navigation',
    href: '/outcomes',
    icon: LineChart,
    badge: 'Outcomes'
  },
  // Quick Skill shortcuts
  {
    id: 'skill-sql',
    title: 'Inspect SQL Evidence',
    subtitle: 'Status: Evidence-backed • Used in 3 production projects',
    category: 'Skills',
    href: '/profile',
    icon: Sparkles,
    badge: 'Core'
  },
  {
    id: 'skill-dbt',
    title: 'Inspect dbt Prerequisite Gap',
    subtitle: 'P0 Critical • 24 hours effort required',
    category: 'Skills',
    href: '/transition/analytics-engineer',
    icon: Sparkles,
    badge: 'Gap'
  },
  {
    id: 'skill-modeling',
    title: 'Inspect Dimensional Data Modeling',
    subtitle: 'Transferable bridge: Star Schema & Grain design',
    category: 'Skills',
    href: '/evidence',
    icon: Sparkles,
    badge: 'Bridge'
  },
  {
    id: 'auth-login',
    title: 'Sign In / Switch Account',
    subtitle: 'Sign in with Google, GitHub, or demo personas',
    category: 'Account',
    href: '/login',
    icon: Sparkles,
    badge: 'Auth'
  },
  {
    id: 'auth-signup',
    title: 'Create Account',
    subtitle: 'Register new profile on SkillRoute platform',
    category: 'Account',
    href: '/signup',
    icon: Sparkles,
    badge: 'Register'
  }
];

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const filtered = PALETTE_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = useCallback((item: ActionItem) => {
    if (item.href) {
      router.push(item.href);
      onClose();
    }
  }, [router, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, handleSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-brand-border overflow-hidden z-10 animate-fadeIn">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-border bg-white">
          <Search className="w-4 h-4 text-brand-muted mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, role, or skill..."
            className="flex-1 text-sm bg-transparent outline-none text-brand-navy placeholder:text-slate-400 font-medium"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-brand-muted">
              No matching transition commands or skills found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-100/90 text-brand-navy'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${
                        isSelected
                          ? 'bg-brand-navy text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-brand-navy truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-slate-200/60 text-slate-700">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-brand-muted truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-3.5 h-3.5 flex-shrink-0 ml-2 transition-transform ${
                      isSelected ? 'text-brand-slate translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-brand-border flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>SkillRoute Intelligence Palette</span>
            <span>•</span>
            <span className="text-brand-navy font-medium">Team ELITECORE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
        </div>
      </div>
    </div>
  );
};

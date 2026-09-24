'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { fetchOpportunities, fetchWhyThisPath } from '../../lib/api';
import { OccupationTransition, WhyThisPathData } from '../../types';
import { OpportunityCard } from '../../components/opportunities/OpportunityCard';
import { WhyThisPathModal } from '../../components/transition/WhyThisPathModal';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  Compass,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Filter,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers,
  ShieldCheck
} from 'lucide-react';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OccupationTransition[]>([]);
  const [whyModalData, setWhyModalData] = useState<WhyThisPathData | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'high' | 'medium'>('all');
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  useEffect(() => {
    fetchOpportunities().then(setOpportunities);
  }, []);

  const handleWhyClick = async (opp: OccupationTransition) => {
    const data = await fetchWhyThisPath(opp.slug);
    setWhyModalData(data);
  };

  const filteredOpps = opportunities.filter((opp) => {
    if (filterMode === 'high') return opp.transition_accessibility === 'High';
    if (filterMode === 'medium')
      return opp.transition_accessibility === 'Medium' || opp.transition_accessibility === 'Medium-High';
    return true;
  });

  const optimalTarget = opportunities.find((o) => o.slug === 'analytics-engineer') || opportunities[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header & Frontier Intelligence */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-brand-borderLight">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-slate" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-slate">
                  OCCUPATIONAL TRANSITION FRONTIER
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  4 Destinations Calibrated
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight mt-2">
                YOUR OPPORTUNITY LANDSCAPE
              </h1>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Not every high-demand role is an equally reachable transition. SkillRoute evaluates
                prerequisite depth and learning costs from Aarav Sharma’s current profile so you can pick high-value, realistic destinations.
              </p>
            </div>

            {/* Next Best Action (Phase 13 Spec: EXPLORE TRANSITION) */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href={`/transition/${optimalTarget?.slug || 'analytics-engineer'}`}
                className="px-5 py-2.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-xs flex items-center gap-2"
              >
                <span>EXPLORE TRANSITION</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </Link>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                Filter:
              </span>
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterMode === 'all'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                All Destinations ({opportunities.length})
              </button>
              <button
                onClick={() => setFilterMode('high')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterMode === 'high'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                High Accessibility
              </button>
              <button
                onClick={() => setFilterMode('medium')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterMode === 'medium'
                    ? 'bg-brand-navy text-white border-brand-navy shadow-2xs'
                    : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                Medium Accessibility
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              Hovering a destination highlights its relative capability overlap.
            </div>
          </div>
        </div>

        {/* 4 Transition Destinations Grid (Phase 7 Spec) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredOpps.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opp={opp}
              onWhyClick={handleWhyClick}
              isHero={opp.slug === 'analytics-engineer'}
            />
          ))}
        </div>

        {/* Frontier Comparison Intelligence Banner */}
        <div className="p-5 rounded-xl bg-slate-50 border border-brand-border text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-slate" />
            <h4 className="font-bold text-brand-navy text-xs uppercase tracking-wider">
              Transition Accessibility Insight
            </h4>
          </div>
          <p className="leading-relaxed">
            While <strong>ML Engineering</strong> commands high market attention, the transition barrier for a Data Analyst with 1.5 years experience requires approximately <strong>240 hours</strong> of systems engineering and distributed computing prerequisites (59 Fit). In contrast, <strong>Analytics Engineering</strong> shares a <strong>78% capability overlap</strong> and requires only <strong>120 hours</strong> of focused learning to unlock high-demand modern data stack roles across Indian tech hubs (82 Fit).
          </p>
        </div>

        {/* Responsible AI Stamp */}
        <ResponsibleAIStamp />
      </div>

      {/* Why This Path Modal Drawer */}
      {whyModalData && (
        <WhyThisPathModal
          data={whyModalData}
          isOpen={!!whyModalData}
          onClose={() => setWhyModalData(null)}
        />
      )}
    </AppShell>
  );
}

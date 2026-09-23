'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { fetchOpportunities, fetchWhyThisPath } from '../../lib/api';
import { OccupationTransition, WhyThisPathData } from '../../types';
import { OpportunityCard } from '../../components/opportunities/OpportunityCard';
import { WhyThisPathModal } from '../../components/transition/WhyThisPathModal';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import { Compass, Filter, ArrowUpDown } from 'lucide-react';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<OccupationTransition[]>([]);
  const [whyModalData, setWhyModalData] = useState<WhyThisPathData | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'high' | 'medium'>('all');

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

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-brand-border pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-slate" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Occupational Transition Frontier
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
              Where Can You Move From Here?
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Not every high-demand role is an equally reachable transition. SkillRoute evaluates
              prerequisite depth and learning costs so you can select feasible, high-value destinations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                filterMode === 'all'
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-slate-600 border-brand-border hover:bg-slate-50'
              }`}
            >
              All Reachable ({opportunities.length})
            </button>
            <button
              onClick={() => setFilterMode('high')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                filterMode === 'high'
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-slate-600 border-brand-border hover:bg-slate-50'
              }`}
            >
              High Accessibility
            </button>
            <button
              onClick={() => setFilterMode('medium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                filterMode === 'medium'
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-white text-slate-600 border-brand-border hover:bg-slate-50'
              }`}
            >
              Medium Accessibility
            </button>
          </div>
        </div>

        {/* Opportunity Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpps.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} onWhyClick={handleWhyClick} />
          ))}
        </div>

        {/* Comparison Insight Banner */}
        <div className="p-5 rounded-xl bg-slate-50 border border-brand-borderLight text-xs text-slate-600 space-y-2">
          <h4 className="font-bold text-brand-navy flex items-center gap-2">
            <span>Optimization Insight: Analytics Engineer vs Machine Learning Engineer</span>
          </h4>
          <p className="leading-relaxed">
            While ML Engineering commands high market attention, the transition barrier for a Data Analyst with 1.5 years experience requires approximately <strong>110 hours</strong> of systems engineering and distributed computing prerequisites. In contrast, <strong>Analytics Engineering</strong> shares a <strong>78% capability overlap</strong> and requires only <strong>42 hours</strong> of focused learning to unlock high-demand opportunities across Indian tech hubs.
          </p>
        </div>

        {/* Responsible AI Notice */}
        <ResponsibleAIStamp />
      </div>

      {/* Why This Path Modal */}
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

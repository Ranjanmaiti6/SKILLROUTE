'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AppShell } from '../../../components/layout/AppShell';
import { fetchTransitionGraph, fetchWhyThisPath, fetchOpportunities } from '../../../lib/api';
import { TransitionGraphData, WhyThisPathData, OccupationTransition } from '../../../types';
import { TransitionGraph } from '../../../components/transition/TransitionGraph';
import { WhyThisPathModal } from '../../../components/transition/WhyThisPathModal';
import { ResponsibleAIStamp } from '../../../components/shared/ResponsibleAIStamp';
import { GitFork, Route, HelpCircle, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function TransitionDetailPage() {
  const params = useParams();
  const roleSlug = (params?.role as string) || 'analytics-engineer';

  const [graphData, setGraphData] = useState<TransitionGraphData | null>(null);
  const [whyData, setWhyData] = useState<WhyThisPathData | null>(null);
  const [opportunities, setOpportunities] = useState<OccupationTransition[]>([]);
  const [isWhyModalOpen, setIsWhyModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [gData, wData, opps] = await Promise.all([
          fetchTransitionGraph(roleSlug),
          fetchWhyThisPath(roleSlug),
          fetchOpportunities()
        ]);
        setGraphData(gData);
        setWhyData(wData);
        setOpportunities(opps);
      } catch (err) {
        console.error("Error loading transition details", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [roleSlug]);

  if (loading || !graphData || !whyData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-brand-slate border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const currentOpp = opportunities.find((o) => o.slug === roleSlug) || opportunities[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header Ribbon */}
        <div className="border-b border-brand-border pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-brand-slate" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Knowledge Graph Traversal
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
              Transition: Data Analyst → {whyData.target_role_title}
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Knowledge graph modeling capabilities, transferable bridges, and missing prerequisites.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWhyModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 text-brand-navy"
            >
              <HelpCircle className="w-3.5 h-3.5 text-brand-slate" />
              <span>Why This Path?</span>
            </button>

            <Link
              href="/pathway"
              className="px-4 py-2 text-xs font-semibold bg-brand-navy text-white rounded-lg hover:bg-brand-slate transition-all shadow-xs flex items-center gap-1.5"
            >
              <Route className="w-3.5 h-3.5" />
              <span>Proceed to Pathway Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Transition Summary KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Current Overlap
            </span>
            <div className="text-xl font-bold text-brand-navy mt-1">
              {whyData.evidence_metrics.skill_overlap_percentage}%
            </div>
            <div className="text-[10px] text-brand-green mt-0.5 font-medium">
              High initial baseline
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Prerequisite Coverage
            </span>
            <div className="text-xl font-bold text-brand-navy mt-1">
              {whyData.evidence_metrics.prerequisite_coverage}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
              2 missing skills required
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Estimated Effort
            </span>
            <div className="text-xl font-bold text-amber-600 mt-1">
              {whyData.evidence_metrics.estimated_learning_effort}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
              ~6 weeks @ 40h/week
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Market Signal
            </span>
            <div className="text-base font-bold text-emerald-700 mt-1 truncate">
              {currentOpp?.market_signal.trend || 'Growing'}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
              Delhi NCR & Bengaluru
            </div>
          </div>
        </div>

        {/* Signature Interactive Transition Graph */}
        <TransitionGraph data={graphData} />

        {/* Grounded Narrative Card */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Decision Model Rationale
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                Grounding Engine
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
              {whyData.grounded_narrative}
            </p>
          </div>

          <button
            onClick={() => setIsWhyModalOpen(true)}
            className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-brand-navy rounded-lg transition-colors whitespace-nowrap"
          >
            Inspect Evidence & Assumptions
          </button>
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>

      {/* Why This Path Modal */}
      <WhyThisPathModal
        data={whyData}
        isOpen={isWhyModalOpen}
        onClose={() => setIsWhyModalOpen(false)}
      />
    </AppShell>
  );
}

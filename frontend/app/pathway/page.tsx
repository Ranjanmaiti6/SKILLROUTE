'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { optimizePathway } from '../../lib/api';
import { PathwayOptimizationResult } from '../../types';
import { TimeBudgetSlider } from '../../components/pathway/TimeBudgetSlider';
import { PathwayTimeline } from '../../components/pathway/PathwayTimeline';
import { PathwayComparison } from '../../components/pathway/PathwayComparison';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import { Route, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock, Sliders, RefreshCw } from 'lucide-react';

export default function PathwayPage() {
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [activePathId, setActivePathId] = useState('analytics-engineer');
  const [pathway, setPathway] = useState<PathwayOptimizationResult | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  useEffect(() => {
    async function loadPathway() {
      setIsRecalculating(true);
      const res = await optimizePathway(activePathId, weeklyHours);
      setPathway(res);
      setTimeout(() => setIsRecalculating(false), 350);
    }
    loadPathway();
  }, [weeklyHours, activePathId]);

  if (!pathway) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-brand-slate border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const roleTitle = activePathId === 'data-scientist'
    ? 'Data Scientist'
    : activePathId === 'data-product-analyst'
    ? 'Data Product Analyst'
    : 'Analytics Engineer';

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header Ribbon */}
        <div className="border-b border-brand-border pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-brand-slate" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Constraint-Aware Path Optimizer • P* Engine
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
              Your Optimized Transition Pathway
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Candidate: <strong>Aarav Sharma</strong> (Data Analyst, Delhi NCR) • Target: <strong>{roleTitle}</strong>.
              Sequence, pacing, and milestones dynamically adapt to your weekly available learning hours.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsRecalculating(true);
                setTimeout(() => setIsRecalculating(false), 400);
              }}
              className="px-4 py-2.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 group"
            >
              <Sliders className="w-4 h-4 text-brand-saffron" />
              <span>OPTIMIZE MY PATH</span>
              <RefreshCw className={`w-3.5 h-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
            </button>
            <Link
              href="/evidence"
              className="px-4 py-2.5 text-xs font-semibold bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 text-brand-navy"
            >
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span>Next: Build Evidence</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Differentiator Callout Pill */}
        <div className="px-4 py-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-semibold">
            <Sparkles className="w-4 h-4 text-brand-saffron flex-shrink-0" />
            <span>Core SkillRoute Differentiator:</span>
            <span className="font-bold text-brand-navy">Same Profile • Different Constraint • Different Feasible Pathway</span>
          </div>
          <span className="text-[11px] text-amber-900 bg-white/70 px-2 py-0.5 rounded border border-amber-200 font-mono w-fit">
            Deterministic P* Optimization
          </span>
        </div>

        {/* The Hero Interaction: Interactive Time-Budget Slider */}
        <TimeBudgetSlider
          value={weeklyHours}
          onChange={setWeeklyHours}
          recalculatedBadge={pathway.recalculated_badge}
          isRecalculating={isRecalculating}
        />

        {/* Optimizer Feedback Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-saffron flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-brand-navy">
                Optimization Mode: {pathway.pathway_mode} (~{pathway.estimated_weeks} weeks @ {weeklyHours} hrs/wk)
              </span>
              <p className="text-slate-600 leading-relaxed">{pathway.optimization_rationale}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:border-l sm:border-slate-200 sm:pl-4 flex-shrink-0">
            <div>
              <div className="text-[10px] text-brand-muted">Total Curriculum Effort</div>
              <div className="text-xs font-bold text-brand-navy">
                {pathway.total_learning_hours} Hours
              </div>
            </div>
            <div>
              <div className="text-[10px] text-brand-muted">Constraint Feasibility</div>
              <div className="text-xs font-bold text-brand-green">
                {(pathway.confidence_score * 100).toFixed(0)}% Achievable
              </div>
            </div>
          </div>
        </div>

        {/* Phased Pathway Timeline */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-2">
            <div>
              <h3 className="text-base font-extrabold text-brand-navy">
                Dynamically Recomputed Milestone Sequence
              </h3>
              <p className="text-xs text-brand-muted">
                Respects prerequisite DAG dependencies. Pacing adapts smoothly from relaxed progression to intensive sprint.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-brand-navy w-fit">
              Sequence Active: {roleTitle}
            </span>
          </div>

          <PathwayTimeline phases={pathway.phases} targetRoleTitle={roleTitle} />

          {/* Primary Evidence CTA Bar */}
          <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50">
            <div>
              <h4 className="font-bold text-brand-navy text-sm">Ready to convert these milestones into verifiable proof?</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Every milestone translates into empirical codebase evidence: Learn → Build → Prove → Apply.
              </p>
            </div>
            <Link
              href="/evidence"
              className="px-5 py-2.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>BUILD EVIDENCE</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-saffron" />
            </Link>
          </div>
        </div>

        {/* Phase 11: Side-by-Side Pathway Comparison Component */}
        <PathwayComparison
          currentWeeklyHours={weeklyHours}
          activePathId={activePathId}
          onSelectPath={setActivePathId}
        />

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

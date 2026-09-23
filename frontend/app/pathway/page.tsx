'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { optimizePathway } from '../../lib/api';
import { PathwayOptimizationResult } from '../../types';
import { TimeBudgetSlider } from '../../components/pathway/TimeBudgetSlider';
import { PathwayTimeline } from '../../components/pathway/PathwayTimeline';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import { Route, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Clock } from 'lucide-react';

export default function PathwayPage() {
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [pathway, setPathway] = useState<PathwayOptimizationResult | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  useEffect(() => {
    async function loadPathway() {
      setIsRecalculating(true);
      const res = await optimizePathway('analytics_engineer', weeklyHours);
      setPathway(res);
      setTimeout(() => setIsRecalculating(false), 300);
    }
    loadPathway();
  }, [weeklyHours]);

  if (!pathway) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-brand-slate border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-brand-border pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Route className="w-4 h-4 text-brand-slate" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Constraint-Aware Optimizer
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
              Your Transition Pathway
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Target: <strong>{pathway.target_role_title}</strong>. Recomputes sequence, pacing, and milestones dynamically as your time budget changes.
            </p>
          </div>

          <Link
            href="/evidence"
            className="px-4 py-2 text-xs font-semibold bg-brand-navy text-white rounded-lg hover:bg-brand-slate transition-all shadow-xs flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Open Evidence Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* The Killer Feature: Interactive Time-Budget Slider */}
        <TimeBudgetSlider
          value={weeklyHours}
          onChange={setWeeklyHours}
          recalculatedBadge={pathway.recalculated_badge}
          isRecalculating={isRecalculating}
        />

        {/* Optimizer Feedback Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-brand-borderLight flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-saffron flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-brand-navy">
                Optimization Mode: {pathway.pathway_mode} (~{pathway.estimated_weeks} weeks)
              </span>
              <p className="text-slate-600">{pathway.optimization_rationale}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:border-l sm:border-slate-200 sm:pl-4 flex-shrink-0">
            <div>
              <div className="text-[10px] text-brand-muted">Total Learning Effort</div>
              <div className="text-xs font-bold text-brand-navy">
                {pathway.total_learning_hours} Hours
              </div>
            </div>
            <div>
              <div className="text-[10px] text-brand-muted">Confidence</div>
              <div className="text-xs font-bold text-brand-green">
                {(pathway.confidence_score * 100).toFixed(0)}% Feasible
              </div>
            </div>
          </div>
        </div>

        {/* Phased Pathway Timeline */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-brand-border">
            <div>
              <h3 className="text-base font-bold text-brand-navy">
                Optimized Milestone Sequence
              </h3>
              <p className="text-xs text-brand-muted">
                Sequential progression enforcing prerequisite depth before warehouse deployment.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-brand-navy">
              {pathway.phases.length} Phases Active
            </span>
          </div>

          <PathwayTimeline phases={pathway.phases} targetRoleTitle={pathway.target_role_title} />
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

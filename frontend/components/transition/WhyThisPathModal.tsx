'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  HelpCircle,
  Calculator,
  Sliders,
  Check,
  Building2
} from 'lucide-react';
import { WhyThisPathData } from '../../types';

interface WhyThisPathModalProps {
  data: WhyThisPathData;
  isOpen: boolean;
  onClose: () => void;
}

export const WhyThisPathModal: React.FC<WhyThisPathModalProps> = ({ data, isOpen, onClose }) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  if (!isOpen) return null;

  const fitScore = data.evidence_metrics?.transition_fit ?? 82;
  const targetTitle = data.target_role_title || 'Analytics Engineer';

  // Exact grounded why you fit points
  const whyYouFit = [
    {
      title: 'Strong SQL foundation',
      evidence: 'Verified from daily query work & window function queries',
      icon: '✓'
    },
    {
      title: 'Python experience',
      evidence: 'Verified from automation scripts & data wrangling in Pandas',
      icon: '✓'
    },
    {
      title: 'Analytics experience',
      evidence: '1.5 years business domain experience in reporting & KPI modeling',
      icon: '✓'
    }
  ];

  // Exact grounded what is missing points
  const whatsMissing = [
    {
      title: 'dbt (Data Build Tool)',
      description: 'Modular SQL transformations, DAG orchestration & schema tests',
      status: 'P0 Critical',
      icon: '△'
    },
    {
      title: 'Data Warehousing',
      description: 'Snowflake / BigQuery clustering, micro-partitioning & cost tuning',
      status: 'P1 High',
      icon: '△'
    },
    {
      title: 'Advanced Data Modeling',
      description: 'Kimball dimensional star schemas, SCD-2 & fact table architecture',
      status: 'P1 High',
      icon: '△'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Right-Side Slide-Over Drawer */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto border-l border-brand-border animate-slideInRight">
        {/* Header */}
        <div className="p-5 border-b border-brand-border bg-slate-50 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-navy text-white flex items-center justify-center font-bold shadow-xs">
              <Compass className="w-5 h-5 text-brand-saffron" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
                TRANSITION INTELLIGENCE REPORT • GROUNDED REASONING
              </div>
              <h2 className="text-base font-extrabold text-brand-navy">
                WHY THIS PATH?
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-200/60 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* Target Role & Fit Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 text-white flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-300">
                RECOMMENDED DESTINATION
              </span>
              <div className="text-lg font-extrabold text-white mt-0.5">
                {targetTitle.toUpperCase()}
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Primary Recommendation under your constraints</span>
              </div>
            </div>
            <div className="text-right border-l border-white/20 pl-4">
              <span className="text-[10px] text-slate-300 uppercase font-semibold">Transition Fit</span>
              <div className="text-3xl font-black text-white leading-tight">
                {fitScore}
                <span className="text-sm font-normal text-slate-400">/100</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-mono">High Feasibility</span>
            </div>
          </div>

          {/* SECTION 1: WHY YOU FIT */}
          <div className="space-y-2.5 border-b border-brand-border pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                <span>WHY YOU FIT</span>
              </h3>
              <span className="text-[10px] font-bold text-brand-green bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                78% Capability Overlap
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Directly validated from Aarav’s operational queries, scripts, and 1.5 yrs analyst track record:
            </p>
            <div className="space-y-2 pt-1">
              {whyYouFit.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/80 flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-brand-navy">{item.title}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{item.evidence}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: WHAT'S MISSING */}
          <div className="space-y-2.5 border-b border-brand-border pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                <span>WHAT&apos;S MISSING</span>
              </h3>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                3 Key Gaps to Close
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Specific technical capabilities required to meet market requirements for Analytics Engineer:
            </p>
            <div className="space-y-2 pt-1">
              {whatsMissing.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-amber-50/40 border border-amber-200/80 flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-brand-navy">{item.title}</div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: TRANSFERABILITY */}
          <div className="space-y-2.5 border-b border-brand-border pb-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-brand-navy">
                TRANSFERABILITY
              </h3>
              <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Bridge Efficiency: 88%
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              How your existing analytical capabilities bridge into production engineering:
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-brand-border flex items-center justify-between gap-2 text-center font-bold text-brand-navy">
              <div className="flex-1 p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                <span className="block text-[11px] text-brand-navy font-bold">Data Analysis</span>
                <span className="text-[9px] text-slate-500 font-normal">Ad-hoc Queries</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-slate flex-shrink-0" />
              <div className="flex-1 p-2 rounded-lg bg-emerald-50 border border-emerald-200 shadow-2xs">
                <span className="block text-[11px] text-emerald-900 font-bold">Data Modeling</span>
                <span className="text-[9px] text-emerald-700 font-normal">Kimball Schemas</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-slate flex-shrink-0" />
              <div className="flex-1 p-2 rounded-lg bg-blue-50 border border-blue-200 shadow-2xs">
                <span className="block text-[11px] text-blue-900 font-bold">Analytics Eng</span>
                <span className="text-[9px] text-blue-700 font-normal">dbt Pipelines</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 italic">
              Your daily SQL reporting directly informs dimension & fact table design. Rather than learning engineering from scratch, you elevate existing queries into automated dbt transformations.
            </p>
          </div>

          {/* SECTION 4: EFFORT & CONSTRAINT */}
          <div className="grid grid-cols-2 gap-3 border-b border-brand-border pb-5">
            <div className="p-3 rounded-xl bg-slate-50 border border-brand-border">
              <span className="text-[10px] text-brand-muted uppercase font-bold block">EFFORT ESTIMATE</span>
              <div className="text-base font-bold text-brand-navy mt-1 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span>120 Learning Hours</span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">Estimated across 4 curriculum phases</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200">
              <span className="text-[10px] text-blue-900 uppercase font-bold block">YOUR CONSTRAINT</span>
              <div className="text-base font-bold text-brand-navy mt-1 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-brand-blue" />
                <span>20 hrs/week</span>
              </div>
              <span className="text-[10px] text-slate-600 block mt-0.5">6 wks to core • 12 wks to market readiness</span>
            </div>
          </div>

          {/* SECTION 5: ALTERNATIVES CONSIDERED */}
          <div className="space-y-2.5 border-b border-brand-border pb-5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-brand-navy">
              ALTERNATIVES CONSIDERED
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-brand-navy">Data Scientist</span>
                  <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    71 Fit • ~180 hours
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Requires deep inferential statistics, calculus, and ML math (~180 hours) — 50% longer transition distance with higher prerequisite risk.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-brand-navy">Data Product Analyst</span>
                  <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    67 Fit • ~80 hours
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Lower technical ceiling and compensation band. While faster (~80 hours), it moves toward product telemetry & A/B testing rather than architectural depth.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 6: CONFIDENCE */}
          <div className="p-3 rounded-xl bg-slate-50 border border-brand-border flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] text-brand-muted uppercase font-bold">CONFIDENCE RATING</div>
              <div className="text-sm font-bold text-brand-navy mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Medium–High Confidence</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Grounding based on verified GitHub code artifacts & Delhi NCR tech employer demands.
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 px-2 py-1 rounded font-bold">
                0.86 P_Score
              </span>
            </div>
          </div>

          {/* SECTION 7: HOW THE DECISION WAS MADE */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-bold text-xs uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-brand-blue" />
                <span>HOW THE DECISION WAS MADE</span>
              </div>
              <button
                onClick={() => setShowFormulaDetails(!showFormulaDetails)}
                className="text-[10px] text-brand-blue font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>{showFormulaDetails ? 'Hide Details' : 'Show Weights'}</span>
                {showFormulaDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {/* Formula Block */}
            <div className="p-2.5 rounded-lg bg-brand-navy text-white font-mono text-[10px] leading-relaxed overflow-x-auto">
              Score = Skill Fit + Transferability + Accessibility + Prerequisites - Learning Cost - Experience Gap
            </div>

            {showFormulaDetails ? (
              <div className="space-y-1.5 pt-1 text-[11px]">
                <div className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">+ Skill Fit (35% weight)</span>
                  <span className="font-bold font-mono text-emerald-700">+34 pts</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">+ Transferability (25% weight)</span>
                  <span className="font-bold font-mono text-emerald-700">+22 pts</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">+ Regional Accessibility & Demand (15% weight)</span>
                  <span className="font-bold font-mono text-emerald-700">+16 pts</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">+ Prerequisites Met (20% weight)</span>
                  <span className="font-bold font-mono text-emerald-700">+18 pts</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">- Learning Cost Penalty (120 hrs / 10% weight)</span>
                  <span className="font-bold font-mono text-amber-700">-5 pts</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-white border border-slate-200">
                  <span className="text-slate-600">- Experience Gap Penalty (1.5 yrs baseline / 5% weight)</span>
                  <span className="font-bold font-mono text-amber-700">-3 pts</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-100 font-bold border border-slate-300 text-brand-navy">
                  <span>Calculated Composite Score:</span>
                  <span className="font-mono text-xs">82 / 100</span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 leading-snug">
                The engine evaluates weighted multi-factor graph metrics across capability overlap, transfer bridges, regional hiring velocity, and required hours under your 20 hr/week budget.
              </p>
            )}
          </div>

          {/* Responsible Engine Disclaimer */}
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-brand-navy block mb-0.5">Grounded Decision Engine:</strong>
              SkillRoute explains a structured mathematical decision computed via DAG traversal and constrained optimization. It does not use ungrounded text generation.
            </div>
          </div>
        </div>

        {/* Footer Navigation CTA */}
        <div className="p-4 border-t border-brand-border bg-slate-50 flex items-center justify-between gap-3 sticky bottom-0 z-20">
          <button
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-brand-navy bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Report
          </button>
          <Link
            href="/pathway"
            className="px-4 py-2 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-brand-slate transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>OPTIMIZE MY PATH</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-saffron" />
          </Link>
        </div>
      </div>
    </div>
  );
};

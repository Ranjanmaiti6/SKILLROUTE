'use client';

import React from 'react';
import Link from 'next/link';
import { OccupationTransition } from '../../types';
import { Clock, ArrowRight, HelpCircle, AlertCircle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface OpportunityCardProps {
  opp: OccupationTransition;
  onWhyClick?: (opp: OccupationTransition) => void;
  isHero?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opp, onWhyClick, isHero }) => {
  const fitScore = opp.demoSignals?.transitionFit ?? opp.accessibility_score;
  const accessibility = opp.demoSignals?.accessibility ?? `${opp.transition_accessibility} accessibility`;
  const skillGap = opp.demoSignals?.skillGap ?? `${opp.primary_missing_skills.length} priority gaps`;
  const effort = opp.demoSignals?.estimatedEffort ?? `${opp.estimated_learning_hours}h estimated effort`;

  const isHighFit = fitScore >= 80;
  const isMediumFit = fitScore >= 65 && fitScore < 80;

  return (
    <div
      className={`bg-white border rounded-xl p-5 transition-all flex flex-col justify-between group hover:shadow-md ${
        isHighFit
          ? 'border-brand-navy/40 shadow-xs ring-1 ring-brand-navy/10'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <div className="space-y-4">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
              {opp.category}
            </span>
            <h3 className="text-base font-extrabold text-brand-navy mt-0.5 group-hover:text-brand-slate transition-colors">
              {opp.title}
            </h3>
          </div>
          {isHighFit && (
            <span className="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 flex-shrink-0">
              Optimal
            </span>
          )}
        </div>

        {/* Visual Transition Fit Display */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
          <div>
            <div className="text-3xl font-black text-brand-navy leading-none tracking-tight">
              {fitScore}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 font-mono">
              TRANSITION FIT
            </div>
          </div>
          <div className="text-right space-y-0.5">
            <div className="text-xs font-bold text-brand-navy">
              {accessibility}
            </div>
            <div className="text-[11px] text-slate-500">
              {skillGap}
            </div>
            <div className="text-[11px] font-semibold text-amber-800">
              {effort}
            </div>
          </div>
        </div>

        {/* Rationale Narrative */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {opp.rationale}
        </p>

        {/* Priority Missing Skills Pills */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">
            Priority Gaps to Acquire:
          </span>
          <div className="flex flex-wrap gap-1">
            {opp.primary_missing_skills.slice(0, 3).map((s, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200"
              >
                {s.name} ({s.effort_hrs}h)
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        {onWhyClick ? (
          <button
            type="button"
            onClick={() => onWhyClick(opp)}
            className="text-xs font-semibold text-slate-500 hover:text-brand-navy transition-colors flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-brand-slate" />
            <span>Why This Path?</span>
          </button>
        ) : (
          <span className="text-[11px] text-slate-400 font-medium">Calibrated transition</span>
        )}

        <Link
          href={`/transition/${opp.slug}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-2xs group/btn"
        >
          <span>EXPLORE TRANSITION</span>
          <ArrowRight className="w-3.5 h-3.5 text-brand-saffron group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

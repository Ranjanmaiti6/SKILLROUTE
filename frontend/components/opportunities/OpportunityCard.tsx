'use client';

import React from 'react';
import Link from 'next/link';
import { OccupationTransition } from '../../types';
import { MarketSignalBadge } from '../shared/MarketSignalBadge';
import { Clock, ArrowRight, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

interface OpportunityCardProps {
  opp: OccupationTransition;
  onWhyClick?: (opp: OccupationTransition) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opp, onWhyClick }) => {
  const isHighFit = opp.accessibility_score >= 80;
  const isMediumFit = opp.accessibility_score >= 65 && opp.accessibility_score < 80;

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 hover:border-brand-slate hover:shadow-xs transition-all flex flex-col justify-between">
      <div>
        {/* Header: Title & Accessibility Badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              {opp.category}
            </span>
            <h3 className="text-base font-bold text-brand-navy mt-0.5">{opp.title}</h3>
          </div>
          <div className="text-right flex-shrink-0">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${
                isHighFit
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : isMediumFit
                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              Fit: {opp.accessibility_score}%
            </span>
            <div className="text-[10px] text-brand-muted mt-0.5">
              {opp.transition_accessibility} Accessibility
            </div>
          </div>
        </div>

        {/* Narrative Rationale */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {opp.rationale}
        </p>

        {/* Metric Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
          <div className="p-2 rounded bg-slate-50 border border-brand-borderLight">
            <span className="text-[10px] text-brand-muted block">Skill Overlap</span>
            <span className="text-xs font-bold text-brand-navy mt-0.5 block">
              {opp.skill_overlap_percentage}%
            </span>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-brand-borderLight">
            <span className="text-[10px] text-brand-muted block">Prerequisites</span>
            <span className="text-xs font-bold text-brand-navy mt-0.5 block">
              {opp.prerequisite_coverage}
            </span>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-brand-borderLight">
            <span className="text-[10px] text-brand-muted block">Est. Effort</span>
            <span className="text-xs font-bold text-brand-navy mt-0.5 block flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-brand-slate" />
              {opp.estimated_learning_hours}h
            </span>
          </div>
        </div>

        {/* Missing Skills Preview */}
        <div className="mt-4">
          <span className="text-[11px] font-semibold text-brand-navy block mb-1.5">
            Key Missing Prerequisites:
          </span>
          <div className="flex flex-wrap gap-1">
            {opp.primary_missing_skills.slice(0, 3).map((s, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80"
              >
                {s.name} ({s.effort_hrs}h)
              </span>
            ))}
            {opp.primary_missing_skills.length > 3 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-100">
                +{opp.primary_missing_skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Market Signal & Actions */}
      <div className="mt-5 pt-3.5 border-t border-brand-border flex items-center justify-between gap-2">
        <MarketSignalBadge signal={opp.market_signal} />

        <div className="flex items-center gap-2">
          {onWhyClick && (
            <button
              onClick={() => onWhyClick(opp)}
              className="px-2.5 py-1.5 text-xs font-medium text-brand-slate hover:bg-slate-100 rounded-md transition-colors"
            >
              Why this path?
            </button>
          )}

          <Link
            href={`/transition/${opp.slug}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-brand-navy text-white rounded-md hover:bg-brand-slate transition-colors shadow-xs"
          >
            <span>Analyze</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

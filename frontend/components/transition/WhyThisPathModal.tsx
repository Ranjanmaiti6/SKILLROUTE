'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, Sparkles, Compass } from 'lucide-react';
import { WhyThisPathData } from '../../types';

interface WhyThisPathModalProps {
  data: WhyThisPathData;
  isOpen: boolean;
  onClose: () => void;
}

export const WhyThisPathModal: React.FC<WhyThisPathModalProps> = ({ data, isOpen, onClose }) => {
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl z-10 border border-brand-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-brand-border bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-brand-slate text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
                Evidence-Grounded Rationale
              </span>
              <h3 className="text-base font-bold text-brand-navy">
                Why this transition: {data.target_role_title}?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-brand-navy hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Grounded Narrative */}
          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200/70 text-xs text-brand-navy leading-relaxed space-y-1.5">
            <div className="font-semibold text-brand-slate flex items-center gap-1.5 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Grounded Decision Engine Output</span>
            </div>
            <p>{data.grounded_narrative}</p>
          </div>

          {/* Evidence Metric Grid */}
          <div>
            <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-3">
              Evidence Signal Matrix
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-brand-borderLight text-center">
                <span className="text-[10px] text-brand-muted block">Skill Overlap</span>
                <span className="text-sm font-bold text-brand-navy mt-0.5 block">
                  {data.evidence_metrics.skill_overlap_percentage}%
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-brand-borderLight text-center">
                <span className="text-[10px] text-brand-muted block">Prerequisites</span>
                <span className="text-sm font-bold text-brand-navy mt-0.5 block">
                  {data.evidence_metrics.prerequisite_coverage}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-brand-borderLight text-center">
                <span className="text-[10px] text-brand-muted block">Estimated Effort</span>
                <span className="text-sm font-bold text-brand-navy mt-0.5 block">
                  {data.evidence_metrics.estimated_learning_effort}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-brand-borderLight text-center">
                <span className="text-[10px] text-brand-muted block">Confidence</span>
                <span className="text-sm font-bold text-brand-green mt-0.5 block">
                  {data.evidence_metrics.confidence.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Qualitative Context Table */}
          <div className="border border-brand-borderLight rounded-lg overflow-hidden text-xs">
            <div className="grid grid-cols-2 p-2.5 bg-slate-50 border-b border-brand-borderLight font-semibold text-brand-navy">
              <span>Dimension</span>
              <span>Observed Signal</span>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-2 p-2.5">
                <span className="text-brand-muted">Transferable Capability</span>
                <span className="font-medium text-brand-navy">
                  {data.evidence_metrics.transferable_capability_level}
                </span>
              </div>
              <div className="grid grid-cols-2 p-2.5">
                <span className="text-brand-muted">Market Signal</span>
                <span className="font-medium text-brand-navy">
                  {data.evidence_metrics.market_signal}
                </span>
              </div>
              <div className="grid grid-cols-2 p-2.5">
                <span className="text-brand-muted">Experience Gap</span>
                <span className="font-medium text-brand-navy">
                  {data.evidence_metrics.experience_gap}
                </span>
              </div>
              <div className="grid grid-cols-2 p-2.5">
                <span className="text-brand-muted">Data Freshness</span>
                <span className="font-medium text-brand-navy">
                  {data.evidence_metrics.data_freshness}
                </span>
              </div>
            </div>
          </div>

          {/* Accordion: Assumptions */}
          <div className="border border-brand-borderLight rounded-lg overflow-hidden">
            <button
              onClick={() => setShowAssumptions(!showAssumptions)}
              className="w-full p-3 bg-slate-50 flex items-center justify-between text-xs font-semibold text-brand-navy hover:bg-slate-100 transition-colors"
            >
              <span>View Optimization Assumptions ({data.assumptions.length})</span>
              {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showAssumptions && (
              <div className="p-3.5 bg-white space-y-2 text-xs text-slate-600 border-t border-brand-borderLight">
                {data.assumptions.map((assump, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-brand-slate font-bold">•</span>
                    <span>{assump}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: Alternatives */}
          <div className="border border-brand-borderLight rounded-lg overflow-hidden">
            <button
              onClick={() => setShowAlternatives(!showAlternatives)}
              className="w-full p-3 bg-slate-50 flex items-center justify-between text-xs font-semibold text-brand-navy hover:bg-slate-100 transition-colors"
            >
              <span>Explore Adjacent Alternatives ({data.alternatives.length})</span>
              {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showAlternatives && (
              <div className="p-3.5 bg-white space-y-3 text-xs text-slate-600 border-t border-brand-borderLight">
                {data.alternatives.map((alt, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-semibold text-brand-navy">{alt.title}</div>
                    <div className="text-[11px] text-slate-600">{alt.reason}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Governance Notice */}
          <div className="text-[11px] text-brand-muted flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-brand-borderLight">
            <AlertCircle className="w-3.5 h-3.5 text-brand-slate flex-shrink-0 mt-0.5" />
            <span>{data.governance_notice}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-brand-border bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium bg-brand-navy text-white rounded-md hover:bg-brand-slate transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};

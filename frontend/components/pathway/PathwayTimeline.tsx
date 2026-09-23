'use client';

import React from 'react';
import { PathwayMilestone } from '../../types';
import { CheckCircle2, Clock, Layers, ArrowDown, Award, AlertCircle } from 'lucide-react';

interface PathwayTimelineProps {
  phases: PathwayMilestone[];
  targetRoleTitle: string;
}

export const PathwayTimeline: React.FC<PathwayTimelineProps> = ({ phases, targetRoleTitle }) => {
  return (
    <div className="space-y-6">
      {/* Current State Anchor */}
      <div className="p-4 rounded-xl border border-brand-border bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
            00
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
              Origin Point
            </span>
            <h4 className="text-sm font-bold text-brand-navy">Current State: Data Analyst</h4>
          </div>
        </div>
        <div className="text-right text-xs">
          <span className="font-semibold text-brand-green">Capabilities Verified</span>
          <div className="text-[11px] text-brand-muted">SQL, Python, Power BI, Statistics</div>
        </div>
      </div>

      {/* Phased Milestones */}
      <div className="relative pl-6 border-l-2 border-slate-200 ml-4 space-y-6">
        {phases.map((phase, idx) => {
          const isDone = phase.status === 'completed';
          const isInProgress = phase.status === 'in-progress';

          return (
            <div key={phase.id} className="relative group">
              {/* Node indicator */}
              <div
                className={`absolute -left-[33px] top-4 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                  isDone
                    ? 'bg-emerald-600 border-white text-white shadow-xs'
                    : isInProgress
                    ? 'bg-amber-500 border-white text-white shadow-xs animate-pulse'
                    : 'bg-white border-slate-300 text-slate-500'
                }`}
              >
                {isDone ? '✓' : phase.phase_number}
              </div>

              {/* Card Container */}
              <div className="bg-white border border-brand-border rounded-xl p-5 hover:border-brand-slate hover:shadow-xs transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
                      Phase 0{phase.phase_number}
                    </span>
                    <h4 className="text-base font-bold text-brand-navy mt-0.5">
                      {phase.phase_title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-slate-50 border border-brand-borderLight text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{phase.estimated_hours} hrs</span>
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-900 font-medium">
                      {phase.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{phase.summary}</p>

                {/* Target Skills */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[11px] font-medium text-brand-muted mr-1">Skills:</span>
                  {phase.target_skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-brand-navy border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Evidence Milestone Banner */}
                <div className="p-3 rounded-lg bg-slate-50 border border-brand-borderLight text-xs flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-brand-saffron flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold text-brand-navy">Verifiable Milestone:</span>
                    <p className="text-slate-600 leading-tight">{phase.evidence_milestone}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Destination Anchor */}
      <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/70 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
              Target Opportunity Unlocked
            </span>
            <h4 className="text-base font-bold text-emerald-950">{targetRoleTitle}</h4>
          </div>
        </div>
        <div className="text-right">
          <span className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-semibold">
            Ready for Application
          </span>
          <div className="text-[11px] text-emerald-800 mt-1">Backed by Portfolio Evidence</div>
        </div>
      </div>
    </div>
  );
};

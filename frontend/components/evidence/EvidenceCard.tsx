'use client';

import React from 'react';
import { EvidenceArtifact } from '../../types';
import { BookOpen, Hammer, CheckCircle2, Send, ExternalLink } from 'lucide-react';

interface EvidenceCardProps {
  artifact: EvidenceArtifact;
  onStatusChange: (id: string, newStatus: 'not-started' | 'in-progress' | 'completed') => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({ artifact, onStatusChange }) => {
  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 hover:border-brand-slate hover:shadow-xs transition-all space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
            {artifact.category}
          </span>
          <h3 className="text-base font-bold text-brand-navy mt-0.5">{artifact.skill_name}</h3>
        </div>

        {/* Status Toggle Buttons */}
        <div className="inline-flex rounded-lg border border-brand-borderLight p-1 bg-slate-50 gap-1">
          <button
            onClick={() => onStatusChange(artifact.id, 'not-started')}
            className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
              artifact.status === 'not-started'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Not Started
          </button>
          <button
            onClick={() => onStatusChange(artifact.id, 'in-progress')}
            className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
              artifact.status === 'in-progress'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => onStatusChange(artifact.id, 'completed')}
            className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
              artifact.status === 'completed'
                ? 'bg-brand-green text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* The 4-Step Quadrant: LEARN -> BUILD -> PROVE -> APPLY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        {/* LEARN */}
        <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-blue-900 uppercase tracking-wider text-[10px]">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>01 Learn</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">{artifact.learn}</p>
        </div>

        {/* BUILD */}
        <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wider text-[10px]">
            <Hammer className="w-3.5 h-3.5 text-amber-700" />
            <span>02 Build</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">{artifact.build}</p>
        </div>

        {/* PROVE */}
        <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 uppercase tracking-wider text-[10px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>03 Prove</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">{artifact.prove}</p>
        </div>

        {/* APPLY */}
        <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-purple-900 uppercase tracking-wider text-[10px]">
            <Send className="w-3.5 h-3.5 text-purple-700" />
            <span>04 Apply</span>
          </div>
          <p className="text-slate-700 leading-relaxed text-[11px]">{artifact.apply}</p>
        </div>
      </div>

      {/* Artifact Verification Link */}
      {artifact.repository_link && (
        <div className="pt-2 flex items-center justify-between text-xs text-brand-muted border-t border-slate-100">
          <span className="text-[11px]">{artifact.verification_notes}</span>
          <a
            href={artifact.repository_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-slate hover:underline font-medium"
          >
            <span>View GitHub Repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};

'use client';

import React from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, FileCode, Layers, GitFork, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { CapabilityItem } from '../../types';

interface SkillDetailDrawerProps {
  skill: CapabilityItem | null;
  onClose: () => void;
}

export const SkillDetailDrawer: React.FC<SkillDetailDrawerProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  const getStateBadge = (type: string) => {
    switch (type) {
      case 'evidence-backed':
        return {
          icon: '✓',
          label: 'Evidence-backed',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'explicit':
        return {
          icon: '✓',
          label: 'Explicit',
          color: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'inferred':
        return {
          icon: '◐',
          label: 'Inferred',
          color: 'bg-indigo-50 text-indigo-800 border-indigo-200'
        };
      case 'gap':
      default:
        return {
          icon: '○',
          label: 'Gap',
          color: 'bg-amber-50 text-amber-900 border-amber-300'
        };
    }
  };

  const badge = getStateBadge(skill.support_type);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto border-l border-brand-border animate-slideInRight">
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between bg-slate-50/80 sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badge.color}`}>
                {badge.icon} {badge.label}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">ESCO Normalization</span>
            </div>
            <h3 className="text-xl font-extrabold text-brand-navy mt-1">{skill.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-navy hover:bg-slate-200/60 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 text-xs">
          {/* Intelligence Matrix (Phase 6 Format) */}
          <div className="grid grid-cols-2 gap-3">
            {/* STATUS */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-brand-borderLight">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                STATUS
              </span>
              <div className="text-xs font-extrabold text-brand-navy mt-1 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  skill.support_type === 'evidence-backed'
                    ? 'bg-brand-green'
                    : skill.support_type === 'explicit'
                    ? 'bg-brand-slate'
                    : skill.support_type === 'inferred'
                    ? 'bg-indigo-600'
                    : 'bg-brand-saffron'
                }`} />
                <span className="capitalize">{skill.support_type}</span>
              </div>
            </div>

            {/* CONFIDENCE */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-brand-borderLight">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                CONFIDENCE
              </span>
              <div className="text-xs font-extrabold text-brand-navy mt-1 capitalize">
                {skill.confidence === 'none' ? 'Target Gap' : `${skill.confidence} Confidence`}
              </div>
            </div>
          </div>

          {/* USED IN */}
          <div className="p-4 rounded-xl bg-slate-50 border border-brand-borderLight space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              USED IN
            </span>
            <div className="text-xs font-bold text-brand-navy">
              {skill.used_in || (skill.evidence_sources.length > 0 ? `${skill.evidence_sources.length} projects` : 'Target prerequisite to acquire')}
            </div>
            {skill.evidence_sources.length > 0 && (
              <ul className="space-y-1.5 pt-2">
                {skill.evidence_sources.map((src, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* TRANSFERABLE TO */}
          <div className="p-4 rounded-xl bg-slate-50 border border-brand-borderLight space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              TRANSFERABLE TO
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skill.transferable_domains.map((dom, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-brand-border text-brand-navy shadow-2xs"
                >
                  {dom}
                </span>
              ))}
            </div>
          </div>

          {/* PREREQUISITES */}
          <div className="p-4 rounded-xl bg-slate-50 border border-brand-borderLight space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              PREREQUISITES
            </span>
            <div className="text-xs font-bold text-brand-navy">
              {skill.prerequisites || 'None'}
            </div>
            <p className="text-[10px] text-slate-500">
              {skill.prerequisites?.includes('✓')
                ? 'All foundational concepts already satisfied by current profile.'
                : 'Checked against the SkillRoute directed capability DAG.'}
            </p>
          </div>

          {/* Grounding note */}
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80 text-[11px] text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-brand-navy">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-slate" />
              <span>Taxonomy Normalization</span>
            </div>
            <p className="leading-relaxed">
              Canonical concept mapping eliminates keyword fragmentation. This skill node contributes directly to your transition score toward Analytics Engineering.
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 border-t border-brand-border bg-slate-50 flex items-center justify-between sticky bottom-0 z-20">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-brand-navy bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Panel
          </button>

          {skill.support_type === 'gap' ? (
            <Link
              href="/evidence"
              className="px-4 py-2 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Build Evidence Plan</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          ) : (
            <Link
              href="/transition/analytics-engineer"
              className="px-4 py-2 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>View In Graph</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};


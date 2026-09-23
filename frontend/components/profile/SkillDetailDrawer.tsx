'use client';

import React from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, FileCode, Layers } from 'lucide-react';
import { CapabilityItem } from '../../types';

interface SkillDetailDrawerProps {
  skill: CapabilityItem | null;
  onClose: () => void;
}

export const SkillDetailDrawer: React.FC<SkillDetailDrawerProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto border-l border-brand-border">
        {/* Header */}
        <div className="p-5 border-b border-brand-border flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
              Capability Analysis
            </span>
            <h3 className="text-lg font-bold text-brand-navy mt-0.5">{skill.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-brand-navy hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Status & Confidence Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 border border-brand-borderLight">
              <span className="text-[11px] text-brand-muted block">Support Type</span>
              <span className="text-xs font-semibold text-brand-navy capitalize mt-0.5 block">
                {skill.support_type}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-brand-borderLight">
              <span className="text-[11px] text-brand-muted block">Confidence Score</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-semibold text-brand-navy capitalize">
                  {skill.confidence}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    skill.confidence === 'high'
                      ? 'bg-brand-green'
                      : skill.confidence === 'medium'
                      ? 'bg-brand-saffron'
                      : 'bg-slate-300'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Evidence Sources */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy mb-2">
              <FileCode className="w-3.5 h-3.5 text-brand-slate" />
              <span>Verified Evidence Sources</span>
            </div>
            {skill.evidence_sources.length > 0 ? (
              <ul className="space-y-2">
                {skill.evidence_sources.map((src, i) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-md bg-white border border-brand-borderLight text-xs text-slate-700 flex items-start gap-2 shadow-xs"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-3 rounded-md bg-amber-50/60 border border-amber-200 text-xs text-amber-800">
                No direct artifact found. Categorized as an inferred or missing prerequisite capability.
              </div>
            )}
          </div>

          {/* Transferable Domains */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy mb-2">
              <Layers className="w-3.5 h-3.5 text-brand-slate" />
              <span>Transferable Opportunity Destinations</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skill.transferable_domains.map((domain, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-brand-navy border border-brand-border"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {/* Taxonomy Grounding Note */}
          <div className="p-3.5 bg-blue-50/50 rounded-lg border border-blue-200/60 text-xs text-blue-900 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-slate" />
              <span>ESCO / O*NET Taxonomy Normalized</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              Canonical concept mapping eliminates keyword fragmentation. This skill node contributes directly to your transition score toward Analytics Engineering and Data Product Analytics.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 border-t border-brand-border bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-brand-muted">Category: {skill.category}</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium bg-brand-navy text-white rounded-md hover:bg-brand-slate transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};

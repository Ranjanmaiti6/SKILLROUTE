'use client';

import React from 'react';
import { CapabilityItem } from '../../types';
import { Check, Sparkles, AlertCircle, FileCheck2, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface CapabilityCardProps {
  skill: CapabilityItem;
  onSelect: (skill: CapabilityItem) => void;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ skill, onSelect }) => {
  const getBadgeStyle = () => {
    switch (skill.support_type) {
      case 'evidence-backed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'explicit':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'inferred':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'gap':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const getLabel = () => {
    switch (skill.support_type) {
      case 'evidence-backed':
        return 'EVIDENCE-BACKED';
      case 'explicit':
        return 'EXPLICIT';
      case 'inferred':
        return 'INFERRED';
      case 'gap':
        return 'MISSING / SKILL GAP';
      default:
        return (skill.support_type as string).toUpperCase();
    }
  };

  const getIcon = () => {
    switch (skill.support_type) {
      case 'evidence-backed':
        return <FileCheck2 className="w-3.5 h-3.5 text-brand-green" />;
      case 'explicit':
        return <Check className="w-3.5 h-3.5 text-brand-slate" />;
      case 'inferred':
        return <Sparkles className="w-3.5 h-3.5 text-purple-600" />;
      case 'gap':
        return <AlertCircle className="w-3.5 h-3.5 text-brand-saffron" />;
      default:
        return null;
    }
  };

  const getConfidenceDot = () => {
    switch (skill.confidence) {
      case 'high':
        return 'bg-brand-green';
      case 'medium':
        return 'bg-brand-saffron';
      case 'low':
        return 'bg-amber-400';
      default:
        return 'bg-slate-300';
    }
  };

  return (
    <div
      onClick={() => onSelect(skill)}
      className="p-3.5 rounded-xl border border-brand-border bg-white hover:border-brand-slate hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs text-brand-navy group-hover:text-brand-slate transition-colors">
              {skill.name}
            </span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-slate transition-colors flex-shrink-0" />
        </div>
        <div className="text-[11px] text-brand-muted mt-0.5 line-clamp-1">
          {skill.category}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9.5px] font-bold tracking-tight border ${getBadgeStyle()}`}
        >
          {getIcon()}
          <span>{getLabel()}</span>
        </span>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
          <span className={`w-1.5 h-1.5 rounded-full ${getConfidenceDot()}`} />
          <span className="capitalize">{skill.confidence !== 'none' ? `${skill.confidence} Conf.` : 'No Signal'}</span>
        </div>
      </div>
    </div>
  );
};

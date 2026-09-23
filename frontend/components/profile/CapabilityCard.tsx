'use client';

import React from 'react';
import { CapabilityItem } from '../../types';
import { Check, Sparkles, AlertCircle, FileCheck2, ArrowUpRight } from 'lucide-react';

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
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
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

  return (
    <div
      onClick={() => onSelect(skill)}
      className="p-3.5 rounded-lg border border-brand-border bg-white hover:border-brand-slate hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <span className="font-semibold text-xs text-brand-navy group-hover:text-brand-slate transition-colors">
            {skill.name}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-slate transition-colors flex-shrink-0" />
        </div>
        <div className="text-[11px] text-brand-muted mt-0.5 line-clamp-1">
          {skill.category}
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${getBadgeStyle()}`}
        >
          {getIcon()}
          <span className="capitalize">{skill.support_type}</span>
        </span>
        <span className="text-[10px] text-slate-400 font-medium capitalize">
          {skill.proficiency_level !== 'none' ? skill.proficiency_level : 'Missing'}
        </span>
      </div>
    </div>
  );
};

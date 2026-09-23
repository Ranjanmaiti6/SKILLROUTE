import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const ResponsibleAIStamp: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-xs text-brand-muted bg-slate-50 border border-brand-borderLight rounded px-2.5 py-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
        <span>Evidence-grounded model • ESCO 1.2.1 & O*NET 31.0 aligned</span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-brand-borderLight rounded-lg p-3.5 flex items-start gap-3 text-xs text-brand-muted">
      <Info className="w-4 h-4 text-brand-slate flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="font-medium text-brand-navy">Responsible Career Intelligence Standard</p>
        <p className="leading-relaxed">
          SkillRoute does not guarantee employment. Recommendations are evidence-based estimates computed under stated time and prerequisite constraints using verified taxonomy benchmarks (ESCO v1.2.1, O*NET 31.0, and NCS India). The decision model is deterministic; generative models are restricted solely to explanation synthesis.
        </p>
      </div>
    </div>
  );
};

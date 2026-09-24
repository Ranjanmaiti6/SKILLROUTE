'use client';

import React from 'react';
import { Award, CheckCircle2, Clock, Calendar, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export interface PathComparisonOption {
  id: string;
  title: string;
  badge?: string;
  isRecommended?: boolean;
  fitScore: number;
  totalHours: number;
  weeksAtCurrentBudget: number;
  newSkillsCount: number;
  leveragedSkillsCount: number;
  marketDemand: string;
  summary: string;
  tagline: string;
}

interface PathwayComparisonProps {
  currentWeeklyHours: number;
  activePathId: string;
  onSelectPath: (pathId: string) => void;
}

export const PathwayComparison: React.FC<PathwayComparisonProps> = ({
  currentWeeklyHours,
  activePathId,
  onSelectPath
}) => {
  // Pacing calculations dynamically respect currentWeeklyHours
  const calcWeeks = (hours: number) => Math.max(1, Math.ceil(hours / currentWeeklyHours));

  const pathways: PathComparisonOption[] = [
    {
      id: 'analytics-engineer',
      title: 'Analytics Engineer',
      isRecommended: true,
      badge: 'RECOMMENDED UNDER CURRENT CONSTRAINT',
      fitScore: 82,
      totalHours: 120,
      weeksAtCurrentBudget: calcWeeks(120),
      newSkillsCount: 3, // dbt, Data Warehousing, Dimensional Modeling
      leveragedSkillsCount: 4, // SQL, Python, Power BI, Statistics
      marketDemand: 'High market signal',
      tagline: 'Direct pipeline bridge from SQL & analytical reporting',
      summary: 'Lowest transition risk, highest wage acceleration (+45%), and perfect alignment with your 20h/week capacity.'
    },
    {
      id: 'data-product-analyst',
      title: 'Data Product Analyst',
      isRecommended: false,
      fitScore: 67,
      totalHours: 80,
      weeksAtCurrentBudget: calcWeeks(80),
      newSkillsCount: 2, // Product Telemetry, A/B Testing
      leveragedSkillsCount: 4, // SQL, Python, Excel, Power BI
      marketDemand: 'Moderate market signal',
      tagline: 'Fastest completion but lower engineering ceiling',
      summary: 'Shifts toward digital experiments and user funnels. Fast transition (~80 hrs) with moderate regional hiring velocity.'
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      isRecommended: false,
      fitScore: 71,
      totalHours: 180,
      weeksAtCurrentBudget: calcWeeks(180),
      newSkillsCount: 5, // Advanced Stats, ML Math, Scikit-Learn, Feature Store, Model Deployment
      leveragedSkillsCount: 3, // Python, SQL, Statistics
      marketDemand: 'High market signal',
      tagline: 'Heavy statistical inference & mathematical barrier',
      summary: 'Demands deep statistical rigor and predictive modeling. 50% more learning hours required under current constraints.'
    }
  ];

  return (
    <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-border gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-saffron" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
              Multi-Destination Intelligence
            </span>
          </div>
          <h3 className="text-base font-extrabold text-brand-navy mt-0.5">
            Compare Pathways Side-by-Side
          </h3>
          <p className="text-xs text-slate-500">
            Dynamically modeled against your current <strong>{currentWeeklyHours} hrs/week</strong> budget. Switch active transition target with one click.
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700 w-fit">
          3 Feasible Scenarios
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {pathways.map((path) => {
          const isActive = activePathId === path.id;

          return (
            <div
              key={path.id}
              onClick={() => onSelectPath(path.id)}
              className={`rounded-xl border p-5 transition-all cursor-pointer flex flex-col justify-between relative ${
                isActive
                  ? 'border-brand-navy ring-2 ring-brand-navy/15 bg-blue-50/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Recommended Badge on Path A */}
              {path.isRecommended && (
                <div className="absolute -top-3 left-4 right-4 text-center">
                  <span className="bg-brand-navy text-white text-[9.5px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs border border-brand-saffron/40 flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-saffron" />
                    <span>RECOMMENDED UNDER CURRENT CONSTRAINT</span>
                  </span>
                </div>
              )}

              <div className="space-y-4 pt-1.5">
                {/* Header: Title and Fit Score */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-extrabold text-base text-brand-navy">
                      {path.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {path.tagline}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-2xl font-black text-brand-navy">
                      {path.fitScore}
                      <span className="text-xs font-normal text-slate-400">/100</span>
                    </div>
                    <span className="text-[9.5px] font-bold text-emerald-700 uppercase">
                      Fit Score
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-semibold">
                      <Clock className="w-3 h-3" />
                      <span>Total Effort</span>
                    </div>
                    <div className="font-bold text-brand-navy mt-0.5">
                      {path.totalHours} hrs
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-semibold">
                      <Calendar className="w-3 h-3" />
                      <span>Duration</span>
                    </div>
                    <div className="font-bold text-brand-navy mt-0.5">
                      {path.weeksAtCurrentBudget} weeks
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-semibold">
                      <Sparkles className="w-3 h-3" />
                      <span>New Skills</span>
                    </div>
                    <div className="font-bold text-amber-800 mt-0.5">
                      {path.newSkillsCount} to learn
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-1 text-slate-500 text-[10px] uppercase font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Leveraged</span>
                    </div>
                    <div className="font-bold text-emerald-800 mt-0.5">
                      {path.leveragedSkillsCount} verified
                    </div>
                  </div>
                </div>

                {/* Market Demand Indicator */}
                <div className="flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-green" />
                    <span>Market Signal</span>
                  </span>
                  <span className="font-bold text-brand-navy">
                    {path.marketDemand}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {path.summary}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPath(path.id);
                  }}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-brand-navy'
                  }`}
                >
                  {isActive ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Active Target Pathway</span>
                    </>
                  ) : (
                    <>
                      <span>Switch to this Path</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

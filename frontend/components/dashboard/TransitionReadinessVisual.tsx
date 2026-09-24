'use client';

import React, { useState } from 'react';
import { Info, CheckCircle2, AlertCircle, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';

interface ReadinessFactor {
  id: string;
  name: string;
  score: number; // 0 - 100
  barCount: number; // out of 18 blocks
  status: string;
  explanation: string;
  grounding: string;
}

const READINESS_FACTORS: ReadinessFactor[] = [
  {
    id: 'skill_fit',
    name: 'Skill Fit',
    score: 78,
    barCount: 14,
    status: '78% Direct Overlap',
    explanation: 'Calculated from direct canonical matches in SQL, Python, Statistics, and Data Analysis verified in codebase.',
    grounding: 'Derived from daily PostgreSQL queries and Python data pipeline scripts.'
  },
  {
    id: 'prerequisites',
    name: 'Prerequisites',
    score: 75,
    barCount: 13,
    status: '6 / 8 Satisfied',
    explanation: 'Core foundation ready. Advanced SQL and dimensional reasoning directly satisfy dbt ingestion requirements.',
    grounding: 'Only 2 prerequisites (dbt modular framework, cloud warehouse) remain to complete.'
  },
  {
    id: 'transferability',
    name: 'Transferability',
    score: 85,
    barCount: 15,
    status: 'High Bridge Efficiency (0.88)',
    explanation: 'Operational reporting experience directly transfers into Kimball dimensional schemas and analytical marts.',
    grounding: 'Power BI star schema design provides 88% knowledge transfer into dimensional facts.'
  },
  {
    id: 'evidence',
    name: 'Evidence',
    score: 50,
    barCount: 9,
    status: '2 / 4 Projects Verified',
    explanation: 'Dimensional Modeling and Sales Dashboard verified. dbt project currently in progress.',
    grounding: 'Requires 1 additional GitHub repo with passing schema tests to reach 100% evidence proof.'
  },
  {
    id: 'learning_cost',
    name: 'Learning Cost',
    score: 70,
    barCount: 12,
    status: '120h Paced Feasibility',
    explanation: '120 curriculum hours fit comfortably into an 18-week schedule at 20 hours/week without burnout.',
    grounding: 'Pacing calibrated against working professional constraints.'
  }
];

export const TransitionReadinessVisual: React.FC = () => {
  const [selectedFactorId, setSelectedFactorId] = useState<string>('skill_fit');

  const activeFactor = READINESS_FACTORS.find((f) => f.id === selectedFactorId) || READINESS_FACTORS[0];

  // SVG Radial arc calculations for composite score 82
  const compositeScore = 82;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // Arc angle: 260 degrees total
  const arcLength = circumference * (240 / 360);
  const strokeDashoffset = arcLength - (arcLength * compositeScore) / 100;

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-borderLight">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
            Transition Readiness
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          Deterministic Composite
        </span>
      </div>

      {/* Main Visual: Radial Arc + Factor Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center py-4">
        {/* Left: Clean Architectural Radial Indicator */}
        <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-120" viewBox="0 0 160 160">
              {/* Background Track Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="10"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
              />
              {/* Active Score Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#0F1E36"
                strokeWidth="10"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Score Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-brand-navy tracking-tight leading-none">
                {compositeScore}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 mt-0.5">
                / 100
              </span>
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 mt-1">
                High Fit
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <div className="text-xs font-bold text-brand-navy">Analytics Engineer</div>
            <div className="text-[10px] text-slate-500">Based on 5 readiness factors</div>
          </div>
        </div>

        {/* Right: Factor List with segmented bars */}
        <div className="md:col-span-7 space-y-2">
          {READINESS_FACTORS.map((factor) => {
            const isSelected = selectedFactorId === factor.id;
            return (
              <div
                key={factor.id}
                onClick={() => setSelectedFactorId(factor.id)}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-slate-50 border-brand-navy shadow-2xs'
                    : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-semibold ${isSelected ? 'text-brand-navy' : 'text-slate-700'}`}>
                    {factor.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-600 font-medium">
                    {factor.status}
                  </span>
                </div>

                {/* Minimal Segmented Progress Bar */}
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-2 bg-slate-100 rounded-sm overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 rounded-sm ${
                        isSelected ? 'bg-brand-navy' : 'bg-slate-700'
                      }`}
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
                    {factor.score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Factor Explanation Drawer / Box (Reveals upon click) */}
      <div className="mt-2 p-3 rounded-lg bg-slate-50 border border-brand-border text-xs space-y-1 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-brand-navy font-bold">
            <Info className="w-3.5 h-3.5 text-brand-slate" />
            <span>{activeFactor.name} Intelligence Note</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Factor: {activeFactor.id}</span>
        </div>
        <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
          {activeFactor.explanation}
        </p>
        <div className="text-[10px] text-brand-slate pt-0.5 font-medium flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-brand-green" />
          <span>{activeFactor.grounding}</span>
        </div>
      </div>
    </div>
  );
};

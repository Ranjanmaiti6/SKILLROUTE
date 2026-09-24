'use client';

import React, { useState, useEffect } from 'react';
import { Sliders, Clock, Sparkles, Check, CheckCircle2, RotateCcw } from 'lucide-react';

interface TimeBudgetSliderProps {
  value: number;
  onChange: (hours: number) => void;
  recalculatedBadge?: string;
  isRecalculating?: boolean;
}

const BUDGET_PRESETS = [10, 15, 20, 25, 30, 40];

export const TimeBudgetSlider: React.FC<TimeBudgetSliderProps> = ({
  value,
  onChange,
  recalculatedBadge,
  isRecalculating = false
}) => {
  // Approximate weeks based on 120 curriculum hours for Analytics Engineer
  const calcWeeks = (h: number) => {
    if (h === 10) return 36;
    if (h === 15) return 24;
    if (h === 20) return 18;
    if (h === 25) return 14;
    if (h === 30) return 12;
    if (h === 40) return 10;
    return Math.ceil(120 / h);
  };

  const currentWeeks = calcWeeks(value);
  const pacingLabel = value <= 10 ? 'Relaxed Pacing' : value >= 40 ? 'Intensive Sprint' : 'Recommended Pacing';

  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-5">
      {/* Header and Recalculated Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-navy text-white flex items-center justify-center shadow-xs">
            <Sliders className="w-4 h-4 text-brand-saffron" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
              HERO INTERACTION • CONSTRAINT-AWARE OPTIMIZER
            </span>
            <h3 className="text-sm font-extrabold text-brand-navy">
              Available Learning Time Simulator
            </h3>
          </div>
        </div>

        {/* Live Notification Banner */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 ${
            isRecalculating
              ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
              : 'bg-emerald-50 text-emerald-900 border-emerald-200'
          }`}
        >
          {isRecalculating ? (
            <>
              <RotateCcw className="w-3.5 h-3.5 text-amber-700 animate-spin" />
              <span>RECALCULATING PATHWAY...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>PATHWAY UPDATED — {currentWeeks} WEEKS AT {value} HRS/WEEK</span>
            </>
          )}
        </div>
      </div>

      {/* Preset Buttons for exact values: 10, 15, 20, 25, 30, 40 */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
        {BUDGET_PRESETS.map((preset) => {
          const isSelected = value === preset;
          const weeks = calcWeeks(preset);
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-all flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-brand-navy text-white border-brand-navy shadow-xs scale-102 ring-2 ring-brand-navy/20'
                  : 'bg-slate-50 text-slate-700 border-brand-borderLight hover:bg-slate-100 hover:text-brand-navy'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Clock className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{preset}h / wk</span>
              </div>
              <div className="text-[10px] font-normal opacity-85 mt-0.5">
                ~{weeks} weeks
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Range Slider */}
      <div className="space-y-2 pt-1">
        <div className="flex justify-between items-center text-xs font-bold text-brand-navy">
          <span className="text-slate-500">10 hrs/week</span>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-mono font-bold shadow-xs">
              {value} hrs / week
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {pacingLabel}
            </span>
          </div>
          <span className="text-slate-500">40 hrs/week</span>
        </div>

        <input
          type="range"
          min="10"
          max="40"
          step="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
        />

        <div className="flex justify-between text-[10px] text-slate-500 font-medium px-0.5">
          <span>10h: ~36 weeks (relaxed pacing)</span>
          <span>20h: ~18 weeks (recommended pacing)</span>
          <span>40h: ~10 weeks (intensive pacing)</span>
        </div>
      </div>

      {/* Structured Status Micro-Animation Feedback */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-brand-borderLight text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <span className="font-bold uppercase tracking-wider text-[10px] text-brand-slate">
            {isRecalculating ? 'CALCULATING FEASIBILITY...' : 'OPTIMIZED SCHEDULE READY'}
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
            isRecalculating ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
          }`}>
            {isRecalculating ? 'Recalculating' : 'Constraint Satisfied'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 text-[11px]">
          <div className="flex items-center gap-1.5 text-brand-navy font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            <span>Target: Analytics Engineer</span>
          </div>

          <div className="flex items-center gap-1.5 text-brand-navy font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            <span>Pacing: {currentWeeks} weeks</span>
          </div>

          <div className="flex items-center gap-1.5 text-brand-navy font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            <span>Effort: 120 total hrs</span>
          </div>

          <div className="flex items-center gap-1.5 text-brand-navy font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
            <span>Weekly: {value} hrs/wk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

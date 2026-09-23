'use client';

import React from 'react';
import { Sliders, Clock, Sparkles } from 'lucide-react';

interface TimeBudgetSliderProps {
  value: number;
  onChange: (hours: number) => void;
  recalculatedBadge?: string;
  isRecalculating?: boolean;
}

const BUDGET_PRESETS = [10, 20, 30, 40, 60];

export const TimeBudgetSlider: React.FC<TimeBudgetSliderProps> = ({
  value,
  onChange,
  recalculatedBadge,
  isRecalculating = false
}) => {
  return (
    <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-brand-slate/10 flex items-center justify-center text-brand-slate">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-navy">Time Budget Constraint Simulator</h3>
            <p className="text-xs text-brand-muted">
              How much time can you realistically invest each week?
            </p>
          </div>
        </div>

        {/* Live Recomputed Badge */}
        {recalculatedBadge && (
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
              isRecalculating
                ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-green" />
            <span>{recalculatedBadge}</span>
          </div>
        )}
      </div>

      {/* Preset Pills */}
      <div className="flex items-center gap-2 pt-1">
        {BUDGET_PRESETS.map((preset) => {
          const isSelected = value === preset;
          return (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                isSelected
                  ? 'bg-brand-navy text-white border-brand-navy shadow-xs scale-102'
                  : 'bg-slate-50 text-slate-600 border-brand-borderLight hover:bg-slate-100 hover:text-brand-navy'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <Clock className={`w-3 h-3 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                <span>{preset}h / wk</span>
              </div>
              <div className="text-[10px] font-normal opacity-80 mt-0.5">
                {preset === 60 ? 'Sprint' : preset === 40 ? 'Standard' : preset === 20 ? 'Part-time' : 'Steady'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Range Slider for granular control */}
      <div className="space-y-1 pt-1">
        <input
          type="range"
          min="10"
          max="60"
          step="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
        />
        <div className="flex justify-between text-[10px] text-brand-muted font-medium px-1">
          <span>10 hrs/wk (Bite-sized)</span>
          <span>40 hrs/wk (Standard default)</span>
          <span>60 hrs/wk (Intensive sprint)</span>
        </div>
      </div>
    </div>
  );
};

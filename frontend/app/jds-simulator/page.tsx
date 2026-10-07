'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  BarChart3,
  Award,
  Zap,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Info
} from 'lucide-react';
import jdsData from '../../data/derived/jds_analytics.json';

interface SkillRatings {
  big_data_skills: number;
  maths_stats_skills: number;
  coding_skills: number;
  ai_and_ml_skills: number;
  dashboard_and_storytelling_skills: number;
}

const PRESET_ARCHETYPES: Record<string, { name: string; description: string; skills: SkillRatings }> = {
  star: {
    name: 'Full-Stack Junior Star',
    description: 'Mastery across mathematical foundations, coding syntax, and business storytelling.',
    skills: {
      big_data_skills: 4.0,
      maths_stats_skills: 4.8,
      coding_skills: 4.7,
      ai_and_ml_skills: 4.9,
      dashboard_and_storytelling_skills: 4.9
    }
  },
  silent_quant: {
    name: 'The Silent Quant (At Risk)',
    description: 'High mathematical and coding depth, but struggles to translate findings into executive narratives.',
    skills: {
      big_data_skills: 3.8,
      maths_stats_skills: 4.8,
      coding_skills: 4.6,
      ai_and_ml_skills: 4.7,
      dashboard_and_storytelling_skills: 3.2
    }
  },
  storyteller: {
    name: 'The Pure Storyteller',
    description: 'Exceptional communication and dashboard polish, but lighter on advanced mathematical rigor.',
    skills: {
      big_data_skills: 3.5,
      maths_stats_skills: 3.6,
      coding_skills: 3.8,
      ai_and_ml_skills: 4.2,
      dashboard_and_storytelling_skills: 4.9
    }
  },
  infrastructure: {
    name: 'The Big Data Specialist',
    description: 'Strong distributed systems focus, which our empirical analysis reveals has lower ROI at junior level.',
    skills: {
      big_data_skills: 4.9,
      maths_stats_skills: 3.8,
      coding_skills: 4.0,
      ai_and_ml_skills: 4.1,
      dashboard_and_storytelling_skills: 3.6
    }
  }
};

export default function JDSSimulatorPage() {
  const [skills, setSkills] = useState<SkillRatings>({
    big_data_skills: 3.8,
    maths_stats_skills: 4.2,
    coding_skills: 4.2,
    ai_and_ml_skills: 4.5,
    dashboard_and_storytelling_skills: 4.3
  });

  const [activeTab, setActiveTab] = useState<'simulator' | 'evidence'>('simulator');

  // Calibrated Multivariable Logistic Regression weights from our official audit of 139 records
  // Intercept = -26.2243
  // maths-stats = +1.8211
  // dashboard-storytelling = +1.3548
  // ai-ml = +1.2639
  // big-data = +0.9962
  // coding = +0.6090
  const zScore =
    -26.2243 +
    1.8211 * skills.maths_stats_skills +
    1.3548 * skills.dashboard_and_storytelling_skills +
    1.2639 * skills.ai_and_ml_skills +
    0.9962 * skills.big_data_skills +
    0.609 * skills.coding_skills;

  const predictedProb = Math.min(Math.max(1 / (1 + Math.exp(-zScore)), 0.01), 0.99);
  const probPercent = Math.round(predictedProb * 100);

  // Synergy and Deficit Detection
  const isSilentQuant = skills.maths_stats_skills >= 4.5 && skills.dashboard_and_storytelling_skills < 4.0;
  const isDualMastery = skills.maths_stats_skills >= 4.5 && skills.dashboard_and_storytelling_skills >= 4.5;
  const isCodingOverindexed = skills.coding_skills >= 4.8 && skills.dashboard_and_storytelling_skills < 3.8;

  // Determine Persona
  let personaName = 'Developing Practitioner';
  let personaBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
  if (skills.maths_stats_skills >= 4.5 && skills.dashboard_and_storytelling_skills >= 4.5 && skills.coding_skills >= 4.5) {
    personaName = 'Full-Stack Junior Star (Tier 1)';
    personaBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  } else if (isSilentQuant) {
    personaName = 'The Silent Quant (Promotion Bottleneck)';
    personaBadgeColor = 'bg-rose-50 text-rose-800 border-rose-300';
  } else if (skills.dashboard_and_storytelling_skills >= 4.5 && skills.maths_stats_skills < 4.0) {
    personaName = 'Business Storyteller / Translator';
    personaBadgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
  } else if (probPercent >= 65) {
    personaName = 'High-Advancement Contributor';
    personaBadgeColor = 'bg-blue-50 text-blue-800 border-blue-300';
  }

  const handleSliderChange = (trait: keyof SkillRatings, val: number) => {
    setSkills((prev) => ({ ...prev, [trait]: val }));
  };

  const handleLoadArchetype = (key: string) => {
    if (PRESET_ARCHETYPES[key]) {
      setSkills(PRESET_ARCHETYPES[key].skills);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12 max-w-7xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-1">
              <span>Official SAS CU Hackathon Dataset 3</span>
              <span>•</span>
              <span className="text-brand-navy">JDS Skill Traits Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Junior Data Scientist Promotion & Hike Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Calibrated on 139 evaluated junior practitioners. Adjust candidate proficiency ratings (1.0–5.0) to model
              advancement probability, identify the &ldquo;Silent Quant&rdquo; communication bottleneck, and uncover high-ROI upskilling paths.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
              N = 139 Practitioners
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Logistic Model Pseudo R² = 0.499
            </span>
          </div>
        </div>

        {/* Archetype Quick-Load Bar */}
        <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xs">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick-Load Candidate Archetypes:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(PRESET_ARCHETYPES).map(([key, item]) => (
              <button
                key={key}
                onClick={() => handleLoadArchetype(key)}
                className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-brand-navy hover:bg-slate-50 transition-all text-xs group"
              >
                <div className="font-bold text-brand-navy group-hover:text-blue-700">{item.name}</div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Sliders on Left, Prediction Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 5 Skill Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-navy" />
                  <span>Technical & Narrative Competency Ratings</span>
                </div>
                <button
                  onClick={() =>
                    setSkills({
                      big_data_skills: 3.8,
                      maths_stats_skills: 4.2,
                      coding_skills: 4.2,
                      ai_and_ml_skills: 4.5,
                      dashboard_and_storytelling_skills: 4.3
                    })
                  }
                  className="text-[11px] font-semibold text-slate-500 hover:text-brand-navy flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Sample Means</span>
                </button>
              </div>

              {/* Slider 1: Dashboard & Storytelling */}
              <div className="space-y-1.5 p-3 rounded-lg bg-indigo-50/40 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Dashboard & Storytelling</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                      Cohen&apos;s d = 1.323 (Top Driver)
                    </span>
                  </div>
                  <span className="font-black text-sm text-indigo-700">{skills.dashboard_and_storytelling_skills.toFixed(1)} / 5.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={skills.dashboard_and_storytelling_skills}
                  onChange={(e) => handleSliderChange('dashboard_and_storytelling_skills', parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1.0 (Ad-hoc Charts)</span>
                  <span>Sample Mean: 4.36 (High Hike Mean: 4.85)</span>
                  <span>5.0 (C-Suite Narrative)</span>
                </div>
              </div>

              {/* Slider 2: Maths & Stats */}
              <div className="space-y-1.5 p-3 rounded-lg bg-emerald-50/40 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Maths & Statistics Skills</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      Cohen&apos;s d = 1.222 (Moat)
                    </span>
                  </div>
                  <span className="font-black text-sm text-emerald-700">{skills.maths_stats_skills.toFixed(1)} / 5.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={skills.maths_stats_skills}
                  onChange={(e) => handleSliderChange('maths_stats_skills', parseFloat(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1.0 (Basic Arithmetic)</span>
                  <span>Sample Mean: 4.29 (High Hike Mean: 4.71)</span>
                  <span>5.0 (Rigorous Hypothesis Testing)</span>
                </div>
              </div>

              {/* Slider 3: Coding Skills */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Coding Skills (Python, SQL, SAS)</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                      Cohen&apos;s d = 0.985
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-800">{skills.coding_skills.toFixed(1)} / 5.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={skills.coding_skills}
                  onChange={(e) => handleSliderChange('coding_skills', parseFloat(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1.0 (Syntax Errors)</span>
                  <span>Sample Mean: 4.27 (High Hike Mean: 4.64)</span>
                  <span>5.0 (Clean Modular Code)</span>
                </div>
              </div>

              {/* Slider 4: AI & ML Skills */}
              <div className="space-y-1.5 p-3 rounded-lg bg-blue-50/40 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">AI & Machine Learning Concepts</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                      Cohen&apos;s d = 0.880
                    </span>
                  </div>
                  <span className="font-black text-sm text-blue-700">{skills.ai_and_ml_skills.toFixed(1)} / 5.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={skills.ai_and_ml_skills}
                  onChange={(e) => handleSliderChange('ai_and_ml_skills', parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1.0 (Basic Scikit-Learn)</span>
                  <span>Sample Mean: 4.57 (Ceiling: 49% at 5.0)</span>
                  <span>5.0 (Ensemble & DL Mastery)</span>
                </div>
              </div>

              {/* Slider 5: Big Data Skills */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Big Data Infrastructure (Spark, Hadoop)</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      Cohen&apos;s d = 0.225 (Low Junior ROI)
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-800">{skills.big_data_skills.toFixed(1)} / 5.0</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={skills.big_data_skills}
                  onChange={(e) => handleSliderChange('big_data_skills', parseFloat(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1.0 (No Distributed Exp)</span>
                  <span>Sample Mean: 3.85 (p = 0.217 non-sig)</span>
                  <span>5.0 (Cluster Optimization)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Predictive Results & Actionable Diagnosis (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Probability Score Card */}
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Predicted Salary Hike & Promotion Probability
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-5xl font-black text-brand-navy tracking-tight">{probPercent}%</div>
                  <div className="text-xs font-bold text-slate-500 mt-1">
                    {probPercent >= 70 ? 'High Likelihood Tier (>= 70%)' : probPercent >= 45 ? 'Moderate Likelihood Tier' : 'Low Advancement Risk (< 45%)'}
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${personaBadgeColor}`}>
                  {personaName}
                </div>
              </div>

              {/* Progress Bar Gauge */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    probPercent >= 70 ? 'bg-emerald-500' : probPercent >= 45 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${probPercent}%` }}
                />
              </div>

              {/* Warning Alert: The Silent Quant Trap */}
              {isSilentQuant && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Caution: The &ldquo;Silent Quant&rdquo; Bottleneck Detected!</div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-rose-800">
                      In our audit of 139 junior practitioners, candidates with High Maths (≥ 4.5) but Low Storytelling (&lt; 4.0) experienced a <strong>78.6% low-hike rate</strong> (only 21.4% high hike). Technical depth without business narrative fails to secure corporate promotions.
                    </div>
                  </div>
                </div>
              )}

              {/* Success Badge: Dual Mastery */}
              {isDualMastery && !isSilentQuant && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Dual Mastery Advantage Achieved!</div>
                    <div className="mt-0.5 text-[11px] leading-relaxed text-emerald-800">
                      Candidates scoring ≥ 4.5 in both <strong>Storytelling</strong> and <strong>Maths</strong> achieved an <strong>84.7% high-hike rate</strong> in the empirical sample. This dual competency acts as the strongest advancement multiplier.
                    </div>
                  </div>
                </div>
              )}

              {/* Statistical Model Grounding Note */}
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="font-bold text-slate-700 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-brand-navy" />
                  <span>Empirical Formulation:</span>
                </div>
                <div className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-200 text-slate-700 break-all">
                  z = -26.22 + 1.82·Maths + 1.35·Story + 1.26·AIML + 1.00·BigData + 0.61·Code
                </div>
                <p className="text-[10px] text-slate-500">
                  5-Fold CV: 84.1% Accuracy, 0.904 ROC-AUC. Evaluated without artificial joins.
                </p>
              </div>
            </div>

            {/* Strategic Coaching Recommendation */}
            <div className="bg-slate-50 p-4 rounded-xl border border-brand-border space-y-2 text-xs">
              <div className="font-bold text-brand-navy flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-saffron" />
                <span>Actionable Upskilling Priority for Junior Data Scientists:</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-brand-navy">1.</span>
                  <span><strong>Prioritize Dashboard & Storytelling:</strong> With Cohen&apos;s d = 1.323 and an odds ratio of 5.42, narrative communication provides 2.4x the advancement leverage of pure syntax memorization.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-brand-navy">2.</span>
                  <span><strong>Protect Mathematical Rigor:</strong> Do not rely on black-box libraries. High-hike juniors average 4.71 in Maths-Stats vs 3.83 for low-hike peers.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-brand-navy">3.</span>
                  <span><strong>Defer Advanced Big Data:</strong> Distributed clustering skills have near-zero correlation with entry-level raises (d = 0.225, p = 0.217). Focus on core problem-solving first.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

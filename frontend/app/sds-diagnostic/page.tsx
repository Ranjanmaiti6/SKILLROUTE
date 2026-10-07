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
  ShieldCheck,
  Award,
  Zap,
  RotateCcw,
  BookOpen,
  Info,
  UserCheck,
  Compass
} from 'lucide-react';
import sdsData from '../../data/derived/sds_analytics.json';

interface PersonalityTraits {
  neuroticism: number;
  extraversion: number;
  openness_to_experience: number;
  agreeableness: number;
  conscientiousness: number;
}

const PRESET_PERSONAS: Record<string, { name: string; description: string; traits: PersonalityTraits }> = {
  executive_advisor: {
    name: 'The Executive Trusted Advisor',
    description: 'High Conscientiousness + High Openness + High Extraversion. Rapid C-suite trust and structured delivery.',
    traits: {
      neuroticism: 32,
      extraversion: 52,
      openness_to_experience: 51,
      agreeableness: 48,
      conscientiousness: 56
    }
  },
  unreliable_visionary: {
    name: 'The Unreliable Visionary (At Risk)',
    description: 'Brilliant conceptual innovation (High Openness), but weak project accountability (Low Conscientiousness).',
    traits: {
      neuroticism: 38,
      extraversion: 46,
      openness_to_experience: 53,
      agreeableness: 42,
      conscientiousness: 28
    }
  },
  methodical_deliverer: {
    name: 'The Methodical Deliverer',
    description: 'Meticulous pipeline execution (High Conscientiousness), but cautious with ambiguous client architecture.',
    traits: {
      neuroticism: 30,
      extraversion: 38,
      openness_to_experience: 34,
      agreeableness: 45,
      conscientiousness: 54
    }
  },
  sample_average: {
    name: 'Sample Baseline Profile',
    description: 'Mean scores observed across the 161 evaluated senior practitioners in Dataset 4.',
    traits: {
      neuroticism: 36,
      extraversion: 43,
      openness_to_experience: 41,
      agreeableness: 45,
      conscientiousness: 45
    }
  }
};

export default function SDSDiagnosticPage() {
  const [traits, setTraits] = useState<PersonalityTraits>({
    neuroticism: 36,
    extraversion: 45,
    openness_to_experience: 44,
    agreeableness: 46,
    conscientiousness: 49
  });

  // Evaluate 3 Empirical Gatekeeper Rules discovered in our audit
  const passGate1 = traits.openness_to_experience > 38.5;
  const passGate2 = traits.conscientiousness > 36.5;
  const passGate3 = traits.agreeableness > 37.5;
  const passAllGates = passGate1 && passGate2 && passGate3;

  // Multivariable Logistic Regression Formula:
  // z = -36.3314 + 0.2688·Openness + 0.2489·Conscientiousness + 0.1216·Neuroticism + 0.1129·Extraversion + 0.0798·Agreeableness
  const zScore =
    -36.3314 +
    0.2688 * traits.openness_to_experience +
    0.2489 * traits.conscientiousness +
    0.1216 * traits.neuroticism +
    0.1129 * traits.extraversion +
    0.0798 * traits.agreeableness;

  const logisticProb = Math.min(Math.max(1 / (1 + Math.exp(-zScore)), 0.01), 0.99);
  const probPercent = Math.round(logisticProb * 100);

  // Determine Persona
  let personaTitle = 'Developing Senior Practitioner';
  let personaBadgeColor = 'bg-slate-100 text-slate-700 border-slate-300';
  let personaAdvice = 'Focus on building consistent delivery accountability and consultative stakeholder empathy.';

  if (traits.conscientiousness > 36.5 && traits.openness_to_experience > 38.5 && traits.extraversion >= 45) {
    personaTitle = 'The Executive Trusted Advisor (Tier 1)';
    personaBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    personaAdvice = 'Exemplary consultative balance. You pair creative problem framing with disciplined project delivery and stakeholder confidence.';
  } else if (traits.openness_to_experience > 38.5 && traits.conscientiousness <= 36.5) {
    personaTitle = 'The Unreliable Visionary (Delivery Risk)';
    personaBadgeColor = 'bg-rose-50 text-rose-800 border-rose-300';
    personaAdvice = 'Critical warning: In our audit, 0% of senior practitioners with High Openness but Conscientiousness ≤ 36.5 succeeded in client-facing roles. Implement automated project milestones and delivery checklists.';
  } else if (traits.conscientiousness > 36.5 && traits.openness_to_experience <= 38.5) {
    personaTitle = 'The Methodical Deliverer';
    personaBadgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
    personaAdvice = 'Strong execution reliability, but risk of rigidity when clients present ambiguous, unstructured problems. Develop exploratory framing and rapid prototyping skills.';
  } else if (!passGate1 && !passGate2) {
    personaTitle = 'Execution Bottleneck';
    personaBadgeColor = 'bg-slate-100 text-slate-800 border-slate-300';
    personaAdvice = 'Below threshold on both innovation and delivery gates. Requires structured executive mentoring before leading enterprise client accounts.';
  }

  const handleSliderChange = (trait: keyof PersonalityTraits, val: number) => {
    setTraits((prev) => ({ ...prev, [trait]: val }));
  };

  const handleLoadPersona = (key: string) => {
    if (PRESET_PERSONAS[key]) {
      setTraits(PRESET_PERSONAS[key].traits);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 pb-12 max-w-7xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-1">
              <span>Official SAS CU Hackathon Dataset 4</span>
              <span>•</span>
              <span className="text-brand-navy">SDS Personality Traits Analysis</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Senior Data Scientist Leadership Behavioral Diagnostic
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Calibrated on 161 customer-facing senior data scientists. Evaluates the Big Five Five-Factor psychometric profile,
              tests the 3-gate empirical decision rule (96.89% accuracy), and diagnoses consultative leadership readiness.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
              N = 161 Practitioners
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              3-Gate Heuristic Accuracy = 96.89%
            </span>
          </div>
        </div>

        {/* Persona Quick-Load Bar */}
        <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xs">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick-Load Senior Behavioral Archetypes:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(PRESET_PERSONAS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => handleLoadPersona(key)}
                className="text-left p-2.5 rounded-lg border border-slate-200 hover:border-brand-navy hover:bg-slate-50 transition-all text-xs group"
              >
                <div className="font-bold text-brand-navy group-hover:text-blue-700">{item.name}</div>
                <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{item.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Diagnostic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 5 Big Five OCEAN Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-navy" />
                  <span>Big Five Personality Dimensions (Normalized Scores: 17–68)</span>
                </div>
                <button
                  onClick={() =>
                    setTraits({
                      neuroticism: 36,
                      extraversion: 43,
                      openness_to_experience: 41,
                      agreeableness: 45,
                      conscientiousness: 45
                    })
                  }
                  className="text-[11px] font-semibold text-slate-500 hover:text-brand-navy flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Sample Means</span>
                </button>
              </div>

              {/* Trait 1: Conscientiousness */}
              <div className="space-y-1.5 p-3 rounded-lg bg-emerald-50/40 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Conscientiousness (Diligence & Accountability)</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                      Cohen&apos;s d = 1.847 (Top Driver)
                    </span>
                  </div>
                  <span className="font-black text-sm text-emerald-700">{traits.conscientiousness} / 66</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="66"
                  step="1"
                  value={traits.conscientiousness}
                  onChange={(e) => handleSliderChange('conscientiousness', parseInt(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Min: 18 (Missed Deadlines)</span>
                  <span>Gate Cutoff: &gt; 36.5 (High Success Mean: 53.7)</span>
                  <span>Max: 66 (Meticulous Reliability)</span>
                </div>
              </div>

              {/* Trait 2: Openness to Experience */}
              <div className="space-y-1.5 p-3 rounded-lg bg-indigo-50/40 border border-indigo-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Openness to Experience (Strategic Innovation)</span>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                      Cohen&apos;s d = 1.803 (Top Driver)
                    </span>
                  </div>
                  <span className="font-black text-sm text-indigo-700">{traits.openness_to_experience} / 65</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="65"
                  step="1"
                  value={traits.openness_to_experience}
                  onChange={(e) => handleSliderChange('openness_to_experience', parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Min: 18 (Rigid Templating)</span>
                  <span>Gate Cutoff: &gt; 38.5 (High Success Mean: 48.5)</span>
                  <span>Max: 65 (Adaptive Problem Framing)</span>
                </div>
              </div>

              {/* Trait 3: Extraversion */}
              <div className="space-y-1.5 p-3 rounded-lg bg-blue-50/40 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Extraversion (Client Engagement & Energy)</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                      Cohen&apos;s d = 1.132 (Catalyst)
                    </span>
                  </div>
                  <span className="font-black text-sm text-blue-700">{traits.extraversion} / 67</span>
                </div>
                <input
                  type="range"
                  min="17"
                  max="67"
                  step="1"
                  value={traits.extraversion}
                  onChange={(e) => handleSliderChange('extraversion', parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Min: 17 (Reserved Solitary)</span>
                  <span>High Success Mean: 48.9 vs Low: 36.9</span>
                  <span>Max: 67 (Persuasive C-Suite Presence)</span>
                </div>
              </div>

              {/* Trait 4: Agreeableness */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Agreeableness (Stakeholder Empathy & Trust)</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                      Cohen&apos;s d = 0.609
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-800">{traits.agreeableness} / 68</span>
                </div>
                <input
                  type="range"
                  min="17"
                  max="68"
                  step="1"
                  value={traits.agreeableness}
                  onChange={(e) => handleSliderChange('agreeableness', parseInt(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Min: 17 (Adversarial Posture)</span>
                  <span>Gate Cutoff: &gt; 37.5 (Mean: 44.6)</span>
                  <span>Max: 68 (Collaborative Partnership)</span>
                </div>
              </div>

              {/* Trait 5: Neuroticism */}
              <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-brand-navy">Neuroticism (Emotional Reactivity)</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                      Cohen&apos;s d = -0.012 (Uncorrelated, p=0.94)
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-800">{traits.neuroticism} / 68</span>
                </div>
                <input
                  type="range"
                  min="17"
                  max="68"
                  step="1"
                  value={traits.neuroticism}
                  onChange={(e) => handleSliderChange('neuroticism', parseInt(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Min: 17 (Unflappable Calm)</span>
                  <span>Sample Mean: 36.2 (Equal in both cohorts)</span>
                  <span>Max: 68 (High Sensitivity)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Predictive Results & Gatekeeper Evaluation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Probability Score Card */}
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Consultative Success Classification Probability
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-5xl font-black text-brand-navy tracking-tight">{probPercent}%</div>
                  <div className="text-xs font-bold text-slate-500 mt-1">
                    {probPercent >= 75 ? 'Strong Success Profile (≥ 75%)' : probPercent >= 50 ? 'Moderate Fit Profile' : 'Consultative Risk Profile (< 50%)'}
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${personaBadgeColor}`}>
                  {personaTitle}
                </div>
              </div>

              {/* Progress Bar Gauge */}
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    probPercent >= 75 ? 'bg-emerald-500' : probPercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${probPercent}%` }}
                />
              </div>

              {/* 3-Gate Empirical Rule Checklist */}
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-brand-navy flex items-center justify-between">
                  <span>3-Gate Decision Tree Check (96.89% Accuracy):</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-black uppercase ${passAllGates ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    {passAllGates ? 'ALL GATES PASSED' : 'GATE FAILED'}
                  </span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      {passGate1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                      <span>Gate 1: Openness &gt; 38.5</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">{traits.openness_to_experience} {passGate1 ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      {passGate2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                      <span>Gate 2: Conscientiousness &gt; 36.5</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">{traits.conscientiousness} {passGate2 ? '✓' : '✗'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      {passGate3 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                      <span>Gate 3: Agreeableness &gt; 37.5</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">{traits.agreeableness} {passGate3 ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>

              {/* Persona Executive Coaching Advice */}
              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded-lg text-[11px] text-blue-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-blue-900">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Executive Coaching Assessment:</span>
                </div>
                <p className="leading-relaxed text-blue-900">{personaAdvice}</p>
              </div>

              {/* Statistical Grounding */}
              <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
                <span>5-Fold CV: 91.3% Acc, 0.947 ROC-AUC</span>
                <span className="font-mono">N = 161 records (Dataset 4)</span>
              </div>
            </div>

            {/* Strategic Consultation Insights */}
            <div className="bg-slate-50 p-4 rounded-xl border border-brand-border space-y-2 text-xs">
              <div className="font-bold text-brand-navy flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-saffron" />
                <span>Behavioral Insights for Senior Practice Leads:</span>
              </div>
              <ul className="space-y-1.5 text-slate-600 text-[11px]">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-brand-navy">•</span>
                  <span><strong>Conscientiousness is the Foundation:</strong> At senior levels, missed milestone commitments destroy client retention. Top performers average 53.7/66 (d = 1.85).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-brand-navy">•</span>
                  <span><strong>Openness Unlocks Ambiguity:</strong> Rigid practitioners fail when client business models are ill-defined. Openness provides the conceptual flexibility to navigate ambiguity (d = 1.80).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-brand-navy">•</span>
                  <span><strong>Do Not Penalize Emotional Sensitivity:</strong> Neuroticism shows zero relationship with performance (d = -0.012). Stress sensitivity does not hinder consultative delivery if discipline is high.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

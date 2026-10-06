'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  fetchWhatIfRun,
  ROLES_REGISTRY,
  SKILLS_REGISTRY,
  WhatIfLabResult
} from '../../lib/transition-intelligence';
import {
  Sliders,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  RotateCcw,
  Save,
  ShieldCheck,
  Zap,
  GitFork,
  Route,
  Check
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

export default function WhatIfLabPage() {
  const { user } = useAuth();

  // Baseline skills
  const defaultSkills: string[] = ['sql', 'python', 'statistics', 'power_bi', 'excel'];
  const baselineSkills: string[] = user?.verified_skills && user.verified_skills.length > 0
    ? user.verified_skills.map((s: string) => s.toLowerCase())
    : defaultSkills;

  const [targetRole, setTargetRole] = useState<string>('analytics-engineer');
  const [weeklyHours, setWeeklyHours] = useState<number>(20);
  const [experienceYears, setExperienceYears] = useState<number>(user?.experience_years || 1.5);
  const [marketScenario, setMarketScenario] = useState<string>('neutral');
  const [addedSkills, setAddedSkills] = useState<string[]>([]);
  const [removedSkills, setRemovedSkills] = useState<string[]>([]);
  const [simulation, setSimulation] = useState<WhatIfLabResult | null>(null);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Available skills to toggle
  const availableSandboxSkills = [
    { id: 'docker', name: 'Docker & Containers' },
    { id: 'dbt', name: 'dbt (Data Build Tool)' },
    { id: 'dimensional_modeling', name: 'Dimensional Modeling' },
    { id: 'cloud_warehousing', name: 'Cloud Warehousing' },
    { id: 'orchestration_airflow', name: 'Apache Airflow' },
    { id: 'distributed_spark', name: 'PySpark (Distributed)' },
    { id: 'ab_testing', name: 'A/B Testing Experiments' },
    { id: 'cicd_git', name: 'Data CI/CD & Git' }
  ];

  useEffect(() => {
    async function runSim() {
      setLoading(true);
      try {
        const res = await fetchWhatIfRun({
          target_role_slug: targetRole,
          user_skills: baselineSkills,
          added_skills: addedSkills,
          removed_skills: removedSkills,
          weekly_hours: weeklyHours,
          user_experience: experienceYears,
          market_scenario: marketScenario
        });
        setSimulation(res);
      } catch (err) {
        console.error('Error running what-if simulation', err);
      } finally {
        setLoading(false);
      }
    }
    runSim();
  }, [targetRole, weeklyHours, experienceYears, marketScenario, addedSkills, removedSkills]);

  const toggleSkill = (skillId: string) => {
    if (addedSkills.includes(skillId)) {
      setAddedSkills(addedSkills.filter((s) => s !== skillId));
    } else {
      setAddedSkills([...addedSkills, skillId]);
    }
  };

  const handlePreset = (preset: string) => {
    if (preset === 'docker') {
      setTargetRole('data-engineer');
      setAddedSkills(['docker']);
    } else if (preset === 'dbt') {
      setTargetRole('analytics-engineer');
      setAddedSkills(['dbt', 'dimensional_modeling']);
    } else if (preset === 'hours_20') {
      setWeeklyHours(20);
    } else if (preset === 'market_surge') {
      setMarketScenario('high_demand');
    } else if (preset === 'reset') {
      setAddedSkills([]);
      setRemovedSkills([]);
      setWeeklyHours(20);
      setMarketScenario('neutral');
      setTargetRole('analytics-engineer');
    }
  };

  const handleSaveToProfile = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Top Header */}
        <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
              <Sliders className="w-3.5 h-3.5 text-amber-600" />
              <span>CORE INTELLIGENCE MODULE 4</span>
            </div>
            <h1 className="text-2xl font-black text-brand-navy tracking-tight">
              WHAT-IF LAB
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Explore how changing one variable changes your opportunity landscape. Compare baseline vs scenario states.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePreset('reset')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset Sandbox</span>
            </button>
            <Link
              href="/transition-engine"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-brand-navy rounded-lg hover:bg-brand-slate transition-all shadow-xs"
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Transition Engine</span>
            </Link>
          </div>
        </div>

        {/* Quick Scenario Preset Chips */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs space-y-2.5">
          <div className="text-[11px] font-bold text-brand-navy uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Scenario Presets</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handlePreset('docker')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                addedSkills.includes('docker') && targetRole === 'data-engineer'
                  ? 'bg-brand-navy text-white border-brand-navy shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              &ldquo;What if I learn Docker?&rdquo;
            </button>
            <button
              onClick={() => handlePreset('dbt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                addedSkills.includes('dbt') && addedSkills.includes('dimensional_modeling')
                  ? 'bg-brand-navy text-white border-brand-navy shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              &ldquo;What if I master dbt + Modeling?&rdquo;
            </button>
            <button
              onClick={() => handlePreset('hours_20')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 transition-colors"
            >
              &ldquo;What if I spend 20 hrs/wk instead of 10?&rdquo;
            </button>
            <button
              onClick={() => handlePreset('market_surge')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                marketScenario === 'high_demand'
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              &ldquo;What if market demand surges?&rdquo;
            </button>
          </div>
        </div>

        {/* Variable Controls & Future Profile Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Variable Controls & Build Future Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Variable Controls */}
            <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-navy" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                    Variable Controls
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">Simulation Inputs</span>
              </div>

              {/* Target Role Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-lg border border-slate-200 bg-white text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy"
                >
                  {Object.values(ROLES_REGISTRY).map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.title} ({r.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Available Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Weekly Time Available</span>
                  <span className="font-extrabold text-brand-navy bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {weeklyHours} hrs/week
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="5"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-navy"
                />
              </div>

              {/* Experience Level & Market Scenario */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Experience</label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(parseFloat(e.target.value))}
                    className="w-full text-xs font-medium p-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                  >
                    <option value="1.0">1.0 Year</option>
                    <option value="1.5">1.5 Years</option>
                    <option value="2.5">2.5 Years</option>
                    <option value="4.0">4.0 Years</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Market Scenario</label>
                  <select
                    value={marketScenario}
                    onChange={(e) => setMarketScenario(e.target.value)}
                    className="w-full text-xs font-medium p-2 rounded-lg border border-slate-200 bg-white text-slate-800"
                  >
                    <option value="neutral">Neutral Market</option>
                    <option value="high_demand">High Demand (+4 pts)</option>
                    <option value="tight_market">Tight Market (-5 pts)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced Section: "Build Your Future Profile" Sandbox */}
            <div className="bg-white border-2 border-slate-900 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-navy" />
                  <span className="text-xs font-black uppercase tracking-wider text-brand-navy">
                    Build Your Future Profile
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                  Sandbox
                </span>
              </div>

              <p className="text-[11px] text-slate-500">
                Temporarily toggle hypothetical skills to recalculate reachable opportunities. Changes remain temporary until saved.
              </p>

              <div className="grid grid-cols-2 gap-2">
                {availableSandboxSkills.map((sk) => {
                  const isAdded = addedSkills.includes(sk.id);
                  return (
                    <button
                      key={sk.id}
                      onClick={() => toggleSkill(sk.id)}
                      className={`p-2.5 rounded-lg border text-left text-xs font-bold transition-all flex items-center justify-between ${
                        isAdded
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate">{sk.name}</span>
                      <span className="text-[12px] font-black ml-1">
                        {isAdded ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Save / Reset Simulation Buttons */}
              <div className="pt-3 border-t border-brand-border flex items-center justify-between gap-2">
                <button
                  onClick={handleSaveToProfile}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-brand-navy rounded-lg hover:bg-brand-slate transition-colors shadow-2xs"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved to Profile!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>Save to My Profile</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setAddedSkills([]);
                    setRemovedSkills([]);
                  }}
                  title="Clear Added Skills"
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-200 hover:bg-rose-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Side-by-Side Baseline vs Scenario & Explainable Diagnosis (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {simulation && (
              <>
                {/* Explainable Diagnosis Banner */}
                <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Intelligent Diagnosis: What Changed?</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {simulation.intelligence_diagnosis}
                  </p>
                </div>

                {/* Metric Cards Comparison (Reachable Opportunities, Score, Effort, Gaps) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Reachable Roles */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      Reachable Roles
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-brand-navy">
                        {simulation.scenario.reachable_roles}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        from {simulation.baseline.reachable_roles}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-0.5 pt-0.5">
                      {simulation.deltas.reachable_roles > 0 ? (
                        <>
                          <TrendingUp className="w-3 h-3" />
                          <span>+{simulation.deltas.reachable_roles} unlocked</span>
                        </>
                      ) : (
                        <span className="text-slate-400">Unchanged</span>
                      )}
                    </div>
                  </div>

                  {/* Transition Score */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      Transition Score
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-brand-navy">
                        {simulation.scenario.transition_score}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        / 100
                      </span>
                    </div>
                    <div className="text-[11px] font-bold flex items-center gap-0.5 pt-0.5">
                      {simulation.deltas.score > 0 ? (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +{simulation.deltas.score} pts
                        </span>
                      ) : simulation.deltas.score < 0 ? (
                        <span className="text-rose-700 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          {simulation.deltas.score} pts
                        </span>
                      ) : (
                        <span className="text-slate-400">Baseline</span>
                      )}
                    </div>
                  </div>

                  {/* Critical Gaps */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      Critical Gaps
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-brand-navy">
                        {simulation.scenario.critical_gaps}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        from {simulation.baseline.critical_gaps}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold flex items-center gap-0.5 pt-0.5">
                      {simulation.deltas.gaps < 0 ? (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          {Math.abs(simulation.deltas.gaps)} resolved
                        </span>
                      ) : (
                        <span className="text-slate-400">Baseline</span>
                      )}
                    </div>
                  </div>

                  {/* Remaining Effort */}
                  <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">
                      Learning Effort
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-brand-navy">
                        {simulation.scenario.learning_effort_hrs}h
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        ({simulation.scenario.estimated_weeks}w)
                      </span>
                    </div>
                    <div className="text-[11px] font-bold flex items-center gap-0.5 pt-0.5">
                      {simulation.deltas.effort_hrs < 0 ? (
                        <span className="text-emerald-700">
                          -{Math.abs(simulation.deltas.effort_hrs)}h remaining
                        </span>
                      ) : (
                        <span className="text-slate-400">Baseline</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scenario Comparison Table */}
                <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-brand-border pb-3">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                        Baseline vs Scenario Comparison
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Exact calculated deltas across core transition metrics
                      </p>
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-brand-navy">
                      Target: {simulation.target_role}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-brand-border text-slate-400 font-bold uppercase text-[10px]">
                          <th className="pb-2.5">Metric</th>
                          <th className="pb-2.5 text-center">Baseline</th>
                          <th className="pb-2.5 text-center">Scenario</th>
                          <th className="pb-2.5 text-right">Delta / Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-3 font-bold text-brand-navy">Reachable Roles (Score ≥ 70)</td>
                          <td className="py-3 text-center text-slate-600">{simulation.baseline.reachable_roles} Roles</td>
                          <td className="py-3 text-center font-bold text-brand-navy">{simulation.scenario.reachable_roles} Roles</td>
                          <td className="py-3 text-right font-bold text-emerald-700">
                            {simulation.deltas.reachable_roles > 0 ? `↑ +${simulation.deltas.reachable_roles} Unlocked` : '→ Unchanged'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold text-brand-navy">Critical Bottleneck Gaps</td>
                          <td className="py-3 text-center text-slate-600">{simulation.baseline.critical_gaps} Gaps</td>
                          <td className="py-3 text-center font-bold text-brand-navy">{simulation.scenario.critical_gaps} Gaps</td>
                          <td className="py-3 text-right font-bold text-emerald-700">
                            {simulation.deltas.gaps < 0 ? `↓ ${Math.abs(simulation.deltas.gaps)} Eliminated` : '→ Unchanged'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold text-brand-navy">Transition Readiness Score</td>
                          <td className="py-3 text-center text-slate-600">{simulation.baseline.transition_score} / 100</td>
                          <td className="py-3 text-center font-bold text-brand-navy">{simulation.scenario.transition_score} / 100</td>
                          <td className="py-3 text-right font-bold text-emerald-700">
                            {simulation.deltas.score > 0 ? `↑ +${simulation.deltas.score} Pts` : '→ Unchanged'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold text-brand-navy">Remaining Learning Effort</td>
                          <td className="py-3 text-center text-slate-600">{simulation.baseline.learning_effort_hrs} Hours</td>
                          <td className="py-3 text-center font-bold text-brand-navy">{simulation.scenario.learning_effort_hrs} Hours</td>
                          <td className="py-3 text-right font-bold text-emerald-700">
                            {simulation.deltas.effort_hrs < 0 ? `↓ -${Math.abs(simulation.deltas.effort_hrs)} Hours` : '→ Unchanged'}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-bold text-brand-navy">Time Horizon to Readiness</td>
                          <td className="py-3 text-center text-slate-600">{simulation.baseline.estimated_weeks} Weeks</td>
                          <td className="py-3 text-center font-bold text-brand-navy">{simulation.scenario.estimated_weeks} Weeks</td>
                          <td className="py-3 text-right font-bold text-emerald-700">
                            {simulation.scenario.estimated_weeks < simulation.baseline.estimated_weeks
                              ? `↓ Faster by ${simulation.baseline.estimated_weeks - simulation.scenario.estimated_weeks} Weeks`
                              : '→ Same Pace'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Responsible AI Stamp */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

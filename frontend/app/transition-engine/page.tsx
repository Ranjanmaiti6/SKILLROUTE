'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  fetchTransitionAnalysis,
  ROLES_REGISTRY,
  TransitionAnalysisResult
} from '../../lib/transition-intelligence';
import {
  GitFork,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Route,
  Sliders,
  Award,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

export default function TransitionEnginePage() {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<string>('analytics-engineer');
  const [analysis, setAnalysis] = useState<TransitionAnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'important' | 'transferable'>('all');

  // Candidate base skills
  const defaultSkills: string[] = ['Python', 'SQL', 'Statistics', 'Pandas', 'Power BI', 'Excel'];
  const currentSkills: string[] = user?.verified_skills && user.verified_skills.length > 0
    ? user.verified_skills
    : defaultSkills;

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const result = await fetchTransitionAnalysis(
          selectedRole,
          currentSkills.map((s: string) => s.toLowerCase()),
          user?.experience_years || 1.5
        );
        setAnalysis(result);
      } catch (err) {
        console.error('Error fetching transition analysis', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedRole, user]);

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Top Header Section */}
        <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>CORE INTELLIGENCE MODULE 1</span>
            </div>
            <h1 className="text-2xl font-black text-brand-navy tracking-tight">
              Where can your current skills take you?
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Explore realistic transitions from your current capability profile grounded in ESCO 1.2.1 & O*NET 31.0 standards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/next-best-skill"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-brand-navy rounded-lg hover:bg-brand-slate transition-all shadow-xs"
            >
              <span>Next Best Skill</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/career-simulator"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <Route className="w-3.5 h-3.5 text-slate-500" />
              <span>Simulate Paths</span>
            </Link>
          </div>
        </div>

        {/* Current Capabilities & Target Selector Ribbon */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Current Capability Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-navy" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Current Capabilities
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {currentSkills.length} Verified
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {currentSkills.map((skill: string) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-brand-navy hover:border-slate-300 transition-colors"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-brand-border/60 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Candidate Experience: <strong>{user?.experience_years || '1.5'} yrs</strong></span>
              <Link href="/profile" className="text-brand-navy font-semibold hover:underline flex items-center gap-0.5">
                <span>Edit Profile</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Target Role Selector (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-navy" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Target Opportunity
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Select target role to calculate transition accessibility
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(ROLES_REGISTRY).map((role) => {
                const isSelected = selectedRole === role.slug;
                return (
                  <button
                    key={role.slug}
                    onClick={() => setSelectedRole(role.slug)}
                    className={`text-left p-3 rounded-lg border transition-all relative ${
                      isSelected
                        ? 'border-brand-navy bg-slate-50/90 shadow-2xs ring-1 ring-brand-navy'
                        : 'border-brand-border bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="text-xs font-bold text-brand-navy leading-tight truncate">
                      {role.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 truncate">
                      {role.category}
                    </div>
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-navy absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Transition Analysis Flow Ribbon */}
        {analysis && (
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-xs border border-slate-800">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <GitFork className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Transition Trajectory
                  </div>
                  <div className="text-sm font-black flex items-center gap-2">
                    <span>{user?.role || 'Data Analyst'}</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300">{analysis.target_role.title}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Foundation</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{analysis.foundation_status}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Critical Gaps</div>
                  <div className="font-bold text-rose-400 mt-0.5">{analysis.critical_gaps_count} Blocking</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Transferable</div>
                  <div className="font-bold text-sky-400 mt-0.5">{analysis.transferable_count} Bridges</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Learning Effort</div>
                  <div className="font-bold text-amber-300 mt-0.5">{analysis.total_effort_hrs} Hours</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Core Analysis Breakdown: Score & Gaps */}
        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Transition Readiness Score Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-brand-border pb-3">
                  <div>
                    <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                      Transition Readiness
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Interpretable Composite Score
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded font-bold bg-slate-100 text-brand-navy border border-slate-200">
                    Model v2.0
                  </span>
                </div>

                {/* Score Number and Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-black text-brand-navy">
                      {analysis.transition_score}
                    </span>
                    <span className="text-xs font-bold text-slate-500">/ 100</span>
                  </div>

                  {/* Visual Segmented Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex border border-slate-200">
                    <div
                      className="bg-brand-navy transition-all duration-700 ease-out rounded-full"
                      style={{ width: `${analysis.transition_score}%` }}
                    />
                  </div>

                  <div className="text-[11px] text-slate-600 font-medium pt-1">
                    Readiness is calculated using verified capability overlap, market signals, and prerequisite accessibility.
                  </div>
                </div>

                {/* Mathematical Components Breakdown */}
                <div className="space-y-3 pt-3 border-t border-brand-border">
                  <div className="text-[11px] font-bold text-brand-navy uppercase tracking-wider">
                    Why this score?
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Skill Fit (Overlap)</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                        {analysis.components.skill_fit >= 70 ? 'High' : analysis.components.skill_fit >= 40 ? 'Moderate' : 'Developing'} ({analysis.components.skill_fit}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Transferability</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                        {analysis.components.transferability >= 70 ? 'High' : 'Moderate'} ({analysis.components.transferability}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Prerequisites</span>
                      <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 text-[11px]">
                        {analysis.components.accessibility >= 75 ? 'Strong' : 'Moderate'} ({analysis.components.accessibility}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Learning Cost</span>
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                        {analysis.components.learning_cost_penalty <= 35 ? 'Low-Medium' : 'High'} (-{analysis.components.learning_cost_penalty}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Experience Gap</span>
                      <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-[11px]">
                        {analysis.components.experience_gap_penalty <= 20 ? 'Low' : 'Moderate'} (-{analysis.components.experience_gap_penalty}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Formula Transparency Box */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[10px] text-slate-600 space-y-1">
                  <div className="font-bold text-brand-navy">Scoring Formula</div>
                  <div className="font-mono text-[9.5px] text-slate-700 bg-white p-1.5 rounded border border-slate-200">
                    TransitionScore = SkillFit + Demand + Transferability + Accessibility - LearningCost - ExperienceGap
                  </div>
                  <div className="text-slate-500">
                    Calibrated weights: SkillFit (0.35), Demand (0.20), Transfer (0.22), Access (0.18).
                  </div>
                </div>
              </div>

              {/* Quick Actions to Next Modules */}
              <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Next Intelligence Actions
                </div>

                <Link
                  href="/next-best-skill"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-brand-border hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="text-xs font-bold text-brand-navy group-hover:text-brand-slate">
                        Next Best Skill
                      </div>
                      <div className="text-[10px] text-slate-500">
                        See single highest-leverage skill to learn
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/career-simulator"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-brand-border hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Route className="w-4 h-4 text-indigo-600" />
                    <div>
                      <div className="text-xs font-bold text-brand-navy group-hover:text-brand-slate">
                        Career Transition Simulator
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Compare fastest vs optimal transition paths
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/what-if"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-brand-border hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="text-xs font-bold text-brand-navy group-hover:text-brand-slate">
                        What-If Scenario Lab
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Simulate adding skills or changing constraints
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right: Detailed Skill Gap Breakdown & Transferability Bridges (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Category Filter Tabs */}
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-4">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-brand-navy">
                      Capability & Gap Breakdown
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Explains the direct structural relationship between your skills and {analysis.target_role.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        activeTab === 'all'
                          ? 'bg-white text-brand-navy shadow-2xs'
                          : 'text-slate-600 hover:text-brand-navy'
                      }`}
                    >
                      All ({analysis.gap_breakdown.critical.length + analysis.gap_breakdown.important.length + analysis.gap_breakdown.transferable.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('critical')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        activeTab === 'critical'
                          ? 'bg-white text-rose-700 shadow-2xs'
                          : 'text-slate-600 hover:text-rose-700'
                      }`}
                    >
                      Critical ({analysis.gap_breakdown.critical.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('important')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        activeTab === 'important'
                          ? 'bg-white text-amber-700 shadow-2xs'
                          : 'text-slate-600 hover:text-amber-700'
                      }`}
                    >
                      Important ({analysis.gap_breakdown.important.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('transferable')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                        activeTab === 'transferable'
                          ? 'bg-white text-emerald-700 shadow-2xs'
                          : 'text-slate-600 hover:text-emerald-700'
                      }`}
                    >
                      Transferable ({analysis.gap_breakdown.transferable.length})
                    </button>
                  </div>
                </div>

                {/* TRANSFERABLE CAPABILITIES (Differentiator) */}
                {(activeTab === 'all' || activeTab === 'transferable') && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                        Transferable Capabilities (Existing Leverage)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.gap_breakdown.transferable.map((item) => (
                        <div
                          key={item.skill_id}
                          className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/40 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              {item.skill_name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase bg-emerald-100 text-emerald-800">
                              Active Bridge
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-700 leading-relaxed">
                            {item.leverage_note}
                          </p>
                          <div className="text-[10px] font-semibold text-emerald-700 pt-1">
                            ✓ Partial transferability detected
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CRITICAL SKILL GAPS (Blockers) */}
                {(activeTab === 'all' || activeTab === 'critical') && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                        Critical Gaps (Entry Bottlenecks)
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {analysis.gap_breakdown.critical.map((gap) => (
                        <div
                          key={gap.id}
                          className="p-4 rounded-lg border border-rose-200 bg-rose-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1 max-w-lg">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-rose-900">{gap.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase bg-rose-100 text-rose-800 border border-rose-200">
                                Critical Blocker
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              {gap.blocking_reason}
                            </p>
                            <div className="text-[10px] text-slate-500 flex items-center gap-3">
                              <span>Effort: <strong>{gap.effort_hrs} hrs</strong></span>
                              <span>Difficulty: <strong>{gap.difficulty}</strong></span>
                              <span className="text-emerald-700 font-medium">
                                {gap.prerequisites_satisfied ? '✓ Prerequisites Satisfied' : '⚠️ Missing Prerequisites'}
                              </span>
                            </div>
                          </div>

                          <Link
                            href="/next-best-skill"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-900 bg-rose-100/80 hover:bg-rose-200/80 rounded-md transition-colors border border-rose-300 self-start sm:self-center"
                          >
                            <span>Prioritize</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* IMPORTANT SKILLS */}
                {(activeTab === 'all' || activeTab === 'important') && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                        Important Skills (Substantially Improves Readiness)
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {analysis.gap_breakdown.important.map((item) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-amber-900">{item.name}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded font-semibold bg-amber-100 text-amber-800">
                                High Value
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600">
                              {item.substantially_improves}
                            </p>
                            <div className="text-[10px] text-slate-500">
                              Estimated effort: {item.effort_hrs} hours • {item.difficulty} difficulty
                            </div>
                          </div>

                          <span className="text-[11px] font-semibold text-slate-500 self-start sm:self-center">
                            Phase 2 Skill
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Taxonomy Grounding Footer */}
                <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Grounding: <strong>{analysis.taxonomy_grounding}</strong></span>
                  </div>
                  <div>
                    Market Signal: <strong>{analysis.market_signal}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Responsible AI Stamp */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

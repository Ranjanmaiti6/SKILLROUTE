'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  fetchNextBestSkill,
  ROLES_REGISTRY,
  NextBestSkillResult,
  NextBestSkillOption
} from '../../lib/transition-intelligence';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Info,
  GitFork,
  Route,
  Sliders,
  TrendingUp,
  X
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

export default function NextBestSkillPage() {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState<string>('analytics-engineer');
  const [data, setData] = useState<NextBestSkillResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDetailSkill, setSelectedDetailSkill] = useState<NextBestSkillOption | null>(null);

  const defaultSkills: string[] = ['Python', 'SQL', 'Statistics', 'Pandas', 'Power BI', 'Excel'];
  const currentSkills: string[] = user?.verified_skills && user.verified_skills.length > 0
    ? user.verified_skills
    : defaultSkills;

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetchNextBestSkill(
          targetRole,
          currentSkills.map((s: string) => s.toLowerCase())
        );
        setData(res);
        if (res.top_skill && !selectedDetailSkill) {
          setSelectedDetailSkill(res.top_skill);
        }
      } catch (err) {
        console.error('Failed to load next best skill', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [targetRole, user]);

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Header Ribbon */}
        <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>CORE INTELLIGENCE MODULE 2</span>
            </div>
            <h1 className="text-2xl font-black text-brand-navy tracking-tight">
              If you can learn only ONE thing next, what should it be?
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Deterministic decision model maximizing Expected Opportunity Gain per unit of learning investment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/transition-engine"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors"
            >
              <GitFork className="w-3.5 h-3.5 text-slate-500" />
              <span>Transition Engine</span>
            </Link>
            <Link
              href="/career-simulator"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-brand-navy rounded-lg hover:bg-brand-slate transition-all shadow-xs"
            >
              <Route className="w-3.5 h-3.5" />
              <span>Career Simulator</span>
            </Link>
          </div>
        </div>

        {/* Target Role Selector Bar */}
        <div className="bg-white border border-brand-border rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">
              Evaluating Target:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {Object.values(ROLES_REGISTRY).map((role) => (
                <button
                  key={role.slug}
                  onClick={() => setTargetRole(role.slug)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    targetRole === role.slug
                      ? 'bg-brand-navy text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {role.title}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Subject to satisfied prerequisites & role relevance
          </div>
        </div>

        {data && data.top_skill && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Prominent Hero Card for #1 Skill (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border-2 border-brand-navy rounded-xl p-6 shadow-xs relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    <span>PRIORITY #1 RECOMMENDATION</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {data.top_skill.efficiency_ratio}x Gain/Hour
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {data.top_skill.category}
                  </div>
                  <h2 className="text-2xl font-black text-brand-navy mt-1 tracking-tight">
                    {data.top_skill.name}
                  </h2>
                </div>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-brand-border text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-[10px] text-slate-500 uppercase font-medium">Opportunity Gain</div>
                    <div className="font-extrabold text-brand-navy mt-0.5">
                      {data.top_skill.opportunity_gain} ({data.top_skill.opportunity_gain_numeric}/10)
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-[10px] text-slate-500 uppercase font-medium">Learning Effort</div>
                    <div className="font-extrabold text-brand-navy mt-0.5">
                      {data.top_skill.effort_hrs} Hours ({data.top_skill.difficulty})
                    </div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="text-[10px] text-slate-500 uppercase font-medium">Prerequisites</div>
                    <div className="font-extrabold text-emerald-700 mt-0.5">
                      {data.top_skill.prerequisites_satisfied ? '100% Satisfied' : 'Pending'}
                    </div>
                  </div>
                </div>

                {/* "WHY THIS SKILL?" Bulleted Rationale */}
                <div className="space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-brand-navy flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>WHY THIS SKILL?</span>
                  </div>

                  <div className="space-y-2">
                    {data.why_this_skill.map((reason, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/70 p-2.5 rounded-lg border border-slate-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-brand-border">
                  <button
                    onClick={() => setSelectedDetailSkill(data.top_skill)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-slate underline underline-offset-4"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Inspect Evidence & Methodology</span>
                  </button>

                  <Link
                    href={`/career-simulator`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-navy rounded-lg hover:bg-brand-slate transition-colors shadow-2xs"
                  >
                    <span>Add to Transition Path</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Mathematical Core Formula Card */}
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-3 text-xs text-slate-600">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-navy" />
                  <span>Mathematical Ranking Model</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                  NextBestSkill = argmax( ExpectedOpportunityGain / LearningCost )
                </div>
                <p className="text-[11px] text-slate-500">
                  Subject to: Prerequisites satisfied by current profile + User target role relevance + Market demand signal.
                  Prevents arbitrary skill recommendations by directly penalizing high-effort prerequisites.
                </p>
              </div>
            </div>

            {/* Right: Skill Comparison Alternatives & Detailed Drawer (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Comparison List */}
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-brand-border pb-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                      Next Skill Options
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Ranked alternatives evaluated by engine
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Top 5 Candidates
                  </span>
                </div>

                <div className="space-y-2.5">
                  {data.ranked_options.map((skill) => {
                    const isSelected = selectedDetailSkill?.skill_id === skill.skill_id;
                    return (
                      <div
                        key={skill.skill_id}
                        onClick={() => setSelectedDetailSkill(skill)}
                        className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-brand-navy bg-slate-50 ring-1 ring-brand-navy shadow-2xs'
                            : 'border-brand-border bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-black px-1.5 py-0.5 rounded bg-slate-200 text-brand-navy">
                              #{skill.priority_rank}
                            </span>
                            <span className="text-xs font-bold text-brand-navy truncate max-w-[170px]">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-700">
                            {skill.efficiency_ratio}x
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                          <span>Opp: <strong className="text-slate-700">{skill.opportunity_gain}</strong></span>
                          <span>Cost: <strong className="text-slate-700">{skill.effort_hrs}h</strong></span>
                          <span className="text-brand-navy font-semibold flex items-center gap-0.5">
                            Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Reasoning Inspector Panel */}
              {selectedDetailSkill && (
                <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-brand-border pb-3">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-brand-navy" />
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                        Why this skill? — Inspection
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Rank #{selectedDetailSkill.priority_rank}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Skill Name</div>
                      <div className="font-bold text-brand-navy text-sm">{selectedDetailSkill.name}</div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Affected Roles</div>
                      <div className="font-medium text-slate-700 mt-0.5">
                        {selectedDetailSkill.unlocks_roles.join(', ') || 'Target Transition'}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Transferable Leverage</div>
                      <div className="text-slate-700 mt-0.5 bg-emerald-50/50 p-2 rounded border border-emerald-100 text-[11px]">
                        {selectedDetailSkill.transferable_note}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Prerequisites</div>
                        <div className="font-medium text-slate-700 mt-0.5">
                          {selectedDetailSkill.prerequisites.length > 0
                            ? selectedDetailSkill.prerequisites.join(', ')
                            : 'None required'}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Evidence Standard</div>
                        <div className="font-medium text-slate-700 mt-0.5">
                          {selectedDetailSkill.evidence_source}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-brand-border flex items-center justify-between text-[10px] text-slate-500">
                      <span>Confidence: <strong>{selectedDetailSkill.confidence}</strong></span>
                      <span>Freshness: <strong>{selectedDetailSkill.data_freshness}</strong></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Responsible AI Stamp */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { fetchProfile, fetchOpportunities, fetchWhyThisPath } from '../../lib/api';
import { UserProfile, OccupationTransition, WhyThisPathData } from '../../types';
import { TransitionReadinessVisual } from '../../components/dashboard/TransitionReadinessVisual';
import { OpportunityCard } from '../../components/opportunities/OpportunityCard';
import { WhyThisPathModal } from '../../components/transition/WhyThisPathModal';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
  GitFork,
  Sliders
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

export default function DashboardPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [opportunities, setOpportunities] = useState<OccupationTransition[]>([]);
  const [whyModalData, setWhyModalData] = useState<WhyThisPathData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [profData, oppsData] = await Promise.all([
          fetchProfile(),
          fetchOpportunities()
        ]);
        setProfile(profData);
        setOpportunities(oppsData);
      } catch (err) {
        console.error("Dashboard data load error", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleOpenWhy = async () => {
    const data = await fetchWhyThisPath('analytics-engineer');
    setWhyModalData(data);
  };

  if (loading || !profile) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="space-y-3 text-center">
            <div className="w-8 h-8 border-2 border-brand-navy border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">
              ANALYZING WORKFORCE PROFILE
            </div>
            <div className="text-[11px] text-slate-500 space-y-0.5">
              <div>✓ Extracting verified capability signals</div>
              <div>✓ Normalizing to ESCO 1.2.1 / O*NET 31.0 taxonomy</div>
              <div>✓ Computing shortest prerequisite DAG distance</div>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  const primaryTarget = opportunities.find((o) => o.slug === 'analytics-engineer') || opportunities[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* =========================================================================
            HERO COMMAND CENTER — THE FIRST 30 SECONDS EXPERIENCE
            Immediately answers:
            1. Where am I? (SkillRoute Transition Intelligence)
            2. What do I have? (Data Analyst, 1.5 yrs, verified SQL & Python)
            3. Where can I go? (Analytics Engineer • 82 Transition Fit)
            4. What is missing? (dbt, Data Warehousing, Dimensional Modeling)
            5. What should I do next? ("Build your Data Modeling evidence", Primary CTA: BUILD MY PATH)
            6. Why this path? (Secondary CTA: WHY THIS PATH?)
            7. How does learning constraint change pathway? (18 wks @ 20h/wk)
           ========================================================================= */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          {/* Row 1: Header Identity + Current → Target Context */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-slate px-2 py-0.5 rounded bg-blue-50 border border-blue-200 font-mono">
                  TRANSITION INTELLIGENCE • COMMAND CENTER
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>ESCO / O*NET Grounded</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy tracking-tight mt-2">
                GOOD MORNING, {(user?.name || profile.name).toUpperCase()}
              </h1>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Your skill-to-opportunity transition path is computed, sequenced, and verified.
              </p>
            </div>

            {/* Current Role → Target Destination Strip */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Current Capability
                </span>
                <div className="text-xs font-black text-brand-navy mt-0.5">
                  {profile.current_role}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  1.5y exp • Delhi NCR
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0 shadow-2xs">
                <ArrowRight className="w-4 h-4 text-brand-slate" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Target Destination
                </span>
                <div className="text-xs font-black text-brand-slate mt-0.5">
                  Analytics Engineer
                </div>
                <div className="text-[10px] font-bold text-emerald-700">
                  82 Fit • Recommended
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Four Key Decision Core Scorecards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TRANSITION FIT
              </span>
              <div className="text-2xl font-black text-brand-navy mt-1 tracking-tight">
                82 <span className="text-xs font-normal text-slate-400">/ 100</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
                High Feasibility Transition
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                SKILL COVERAGE
              </span>
              <div className="text-2xl font-black text-brand-navy mt-1 tracking-tight">
                76%
              </div>
              <div className="text-[10px] text-brand-slate font-semibold mt-0.5">
                6 of 8 Requirements Met
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                ESTIMATED EFFORT
              </span>
              <div className="text-2xl font-black text-amber-700 mt-1 tracking-tight">
                120 <span className="text-xs font-normal text-slate-500">hrs</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                ~18 weeks @ 20 hrs/week
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PATHWAY PACING
              </span>
              <div className="text-2xl font-black text-emerald-700 mt-1 flex items-center gap-1.5 tracking-tight">
                <CheckCircle2 className="w-5 h-5 text-brand-green" />
                <span>Ready</span>
              </div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                Constraint-aware schedule
              </div>
            </div>
          </div>

          {/* Row 3: Thin Transition Line showing verified skills and missing gaps */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                TRANSITION BRIDGING PATHWAY
              </span>
              <span className="text-[11px] text-slate-500">
                Prerequisite chain: SQL → Data Modeling → dbt → Analytics Engineer
              </span>
            </div>

            <div className="relative py-3">
              <div className="h-0.5 bg-slate-200 w-full absolute top-1/2 -translate-y-1/2 left-0 z-0" />
              <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto">
                <div className="bg-white px-3 py-1.5 rounded-lg border-2 border-brand-navy text-xs font-bold text-brand-navy shadow-xs flex-shrink-0">
                  Data Analyst (Current)
                </div>

                <div className="bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300 text-[11px] font-semibold text-emerald-900 flex items-center gap-1 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  <span>Verified: SQL • Python • BI</span>
                </div>

                <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-300 text-[11px] font-semibold text-blue-900 flex items-center gap-1 flex-shrink-0">
                  <span>Transfer: Data Modeling</span>
                  <ArrowRight className="w-3 h-3 text-blue-700" />
                </div>

                <div className="bg-amber-50 px-3 py-1 rounded-full border border-amber-300 text-[11px] font-semibold text-amber-900 flex items-center gap-1 flex-shrink-0">
                  <span>Missing: dbt • Warehousing</span>
                </div>

                <div className="bg-white px-3 py-1.5 rounded-lg border-2 border-emerald-600 text-xs font-bold text-brand-navy shadow-xs flex-shrink-0">
                  Analytics Engineer (Target)
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: NEXT BEST ACTION Card with High-Contrast Primary CTA */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  NEXT BEST ACTION
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Phase 1 Priority Milestone
                </span>
              </div>
              <h3 className="text-lg font-black text-brand-navy">
                “Build your Data Modeling evidence project”
              </h3>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                Your SQL queries are already verified in repository code. Building a verified Kimball dimensional model (fact & dimension tables) satisfies the critical bridge before tackling dbt.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              {/* Secondary CTA: WHY THIS PATH? */}
              <button
                type="button"
                onClick={handleOpenWhy}
                className="px-4 py-2.5 text-xs font-bold bg-white text-brand-navy border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4 text-brand-slate" />
                <span>WHY THIS PATH?</span>
              </button>

              {/* Primary CTA: Exactly ONE primary action */}
              <Link
                href="/pathway"
                className="px-6 py-2.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>BUILD MY PATH</span>
                <ArrowRight className="w-4 h-4 text-brand-saffron group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Transition Readiness Visual & Capability Baseline Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <TransitionReadinessVisual />
          </div>

          {/* Quick Capability Baseline Constellation */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-slate" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                    Capability Baseline Snapshot
                  </h3>
                </div>
                <Link
                  href="/profile"
                  className="text-xs font-bold text-brand-navy hover:underline flex items-center gap-1"
                >
                  <span>Review All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Core Skills (Verified ✓)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'SQL', 'Statistics', 'Data Analysis'].map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-100 text-brand-navy border border-slate-200"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Transferable Bridge (Inferred ◐)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Data Modeling', 'ETL Concepts'].map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200"
                      >
                        ◐ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Priority Skill Gaps (Target ○)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['dbt', 'Data Warehousing', 'Cloud Analytics'].map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200"
                      >
                        ○ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{user?.name || profile.name} • {user?.role || profile.current_role}</span>
              <Link href="/profile" className="font-bold text-brand-navy hover:underline">
                Open Capability Constellation →
              </Link>
            </div>
          </div>
        </div>

        {/* Opportunity Landscape Glance (4 calibrated destinations) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-brand-navy">
                Your Opportunity Landscape
              </h2>
              <p className="text-xs text-slate-500">
                4 calibrated occupational transitions evaluated under prerequisite depth and learning effort.
              </p>
            </div>
            <Link
              href="/opportunities"
              className="text-xs font-bold text-brand-navy hover:underline flex items-center gap-1"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunities.slice(0, 4).map((opp) => (
              <OpportunityCard
                key={opp.id}
                opp={opp}
                onWhyClick={() => handleOpenWhy()}
              />
            ))}
          </div>
        </div>

        {/* Responsible AI Disclaimer Stamp */}
        <ResponsibleAIStamp />
      </div>

      {/* Why This Path Modal Drawer */}
      {whyModalData && (
        <WhyThisPathModal
          data={whyModalData}
          isOpen={!!whyModalData}
          onClose={() => setWhyModalData(null)}
        />
      )}
    </AppShell>
  );
}

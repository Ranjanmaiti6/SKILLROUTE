'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { fetchProfile, fetchOpportunities } from '../../lib/api';
import { UserProfile, OccupationTransition } from '../../types';
import { OpportunityCard } from '../../components/opportunities/OpportunityCard';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  Compass,
  Layers,
  Route,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [opportunities, setOpportunities] = useState<OccupationTransition[]>([]);
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

  if (loading || !profile) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="space-y-3 text-center">
            <div className="w-8 h-8 border-2 border-brand-slate border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-brand-muted">Evaluating transition graph...</p>
          </div>
        </div>
      </AppShell>
    );
  }

  const primaryTarget = opportunities.find((o) => o.slug === 'analytics-engineer') || opportunities[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Decision Intelligence Session
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                Live Model
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
              Good morning, Ranjan.
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Your transition intelligence is ready. 3 reachable opportunities identified from current capabilities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/opportunities"
              className="px-3.5 py-2 text-xs font-semibold bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              Where Can I Move?
            </Link>
            <Link
              href="/transition/analytics-engineer"
              className="px-3.5 py-2 text-xs font-semibold bg-brand-navy text-white rounded-lg hover:bg-brand-slate transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Transition Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Profile Capability Card & Key Transition Fit Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ranjan Maiti Profile Card */}
          <div className="lg:col-span-2 bg-white border border-brand-border rounded-xl p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-brand-navy text-white font-bold text-base flex items-center justify-center shadow-xs">
                    RM
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-brand-navy">{profile.name}</h2>
                    <p className="text-xs text-brand-muted">
                      {profile.current_role} • {profile.experience_years} years experience • {profile.location}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate">
                    Education
                  </span>
                  <div className="text-xs font-medium text-slate-700">
                    B.Tech in Computer Science / IT (2024)
                  </div>
                </div>
              </div>

              {/* Extracted Capabilities with Confidence Badges */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Current Extracted Capabilities
                  </span>
                  <Link
                    href="/profile"
                    className="text-xs font-semibold text-brand-slate hover:underline flex items-center gap-1"
                  >
                    <span>View Capability Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {profile.current_capabilities.map((cap) => (
                    <div
                      key={cap.id}
                      className="p-2.5 rounded-lg border border-brand-borderLight bg-slate-50/60 flex flex-col justify-between"
                    >
                      <div className="font-semibold text-xs text-brand-navy">{cap.name}</div>
                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span
                          className={`capitalize font-medium ${
                            cap.support_type === 'evidence-backed'
                              ? 'text-emerald-700'
                              : cap.support_type === 'explicit'
                              ? 'text-blue-700'
                              : cap.support_type === 'inferred'
                              ? 'text-purple-700'
                              : 'text-amber-700'
                          }`}
                        >
                          {cap.support_type}
                        </span>
                        <span className="text-slate-400 capitalize">{cap.confidence}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Evidence Note */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-muted">
              <span>Verified across 3 production projects (Sales Analytics, Churn, MRR Forecast).</span>
              <span className="font-mono text-slate-400">ESCO 1.2.1 Normalized</span>
            </div>
          </div>

          {/* Primary Transition Spotlight */}
          <div className="bg-brand-navy text-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  Optimal Adjacent Transition
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                  Fit: {primaryTarget.accessibility_score}%
                </span>
              </div>

              <h3 className="text-xl font-bold mt-2">{primaryTarget.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {primaryTarget.rationale}
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Skill Overlap</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {primaryTarget.skill_overlap_percentage}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Prerequisites</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {primaryTarget.prerequisite_coverage}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Estimated Effort</div>
                  <div className="text-base font-bold text-amber-300 mt-0.5">
                    ~{primaryTarget.estimated_learning_hours} hours
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Market Signal</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">
                    {primaryTarget.market_signal.trend}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/pathway"
                className="text-xs font-semibold text-amber-300 hover:text-white transition-colors"
              >
                Inspect Pathway Timeline →
              </Link>
              <Link
                href={`/transition/${primaryTarget.slug}`}
                className="px-3.5 py-1.5 rounded-lg bg-white text-brand-navy text-xs font-bold hover:bg-slate-100 transition-colors shadow-xs"
              >
                Analyze Path
              </Link>
            </div>
          </div>
        </div>

        {/* Reachable Transitions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-brand-navy">
                Reachable Transition Destinations
              </h2>
              <p className="text-xs text-brand-muted">
                Evaluated under prerequisite depth, learning cost, and regional Indian demand.
              </p>
            </div>
            <Link
              href="/opportunities"
              className="text-xs font-semibold text-brand-slate hover:underline flex items-center gap-1"
            >
              <span>Explore All 5 Destinations</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {opportunities.slice(0, 3).map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        </div>

        {/* Responsible AI Footer Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

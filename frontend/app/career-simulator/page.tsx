'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  fetchCareerSimulation,
  CareerSimulationResult,
  CareerPath
} from '../../lib/transition-intelligence';
import {
  Route,
  ArrowRight,
  Clock,
  Zap,
  CheckCircle2,
  Sliders,
  ChevronRight,
  TrendingUp,
  Award,
  ShieldCheck,
  GitFork,
  HelpCircle,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

export default function CareerSimulatorPage() {
  const { user } = useAuth();
  const [weeklyHours, setWeeklyHours] = useState<number>(20);
  const [simulation, setSimulation] = useState<CareerSimulationResult | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string>('path_b_balanced');
  const [activeGraphNode, setActiveGraphNode] = useState<string>('profile');
  const [loading, setLoading] = useState<boolean>(true);

  const defaultSkills: string[] = ['Python', 'SQL', 'Statistics', 'Pandas', 'Power BI', 'Excel'];
  const currentSkills: string[] = user?.verified_skills && user.verified_skills.length > 0
    ? user.verified_skills
    : defaultSkills;

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetchCareerSimulation(
          weeklyHours,
          currentSkills.map((s: string) => s.toLowerCase()),
          user?.role || 'Data Analyst',
          user?.experience_years || 1.5
        );
        setSimulation(res);
      } catch (err) {
        console.error('Error loading career simulation', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [weeklyHours, user]);

  const activePath = simulation?.paths.find((p) => p.id === selectedPathId) || simulation?.paths[1];

  return (
    <AppShell>
      <div className="space-y-8 max-w-7xl mx-auto pb-12">
        {/* Top Header */}
        <div className="border-b border-brand-border pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-900 border border-amber-200 mb-2">
              <Route className="w-3.5 h-3.5 text-amber-600" />
              <span>CORE INTELLIGENCE MODULE 3</span>
            </div>
            <h1 className="text-2xl font-black text-brand-navy tracking-tight">
              Explore Your Possible Transitions
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              See how different skill investments change your reachable opportunities across fastest, balanced, and specialized pathways.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/what-if"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-brand-navy rounded-lg hover:bg-brand-slate transition-all shadow-xs"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>What-If Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Time-Constrained Simulation Control Ribbon */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-navy" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                Time-Constrained Simulation: &ldquo;I have limited time&rdquo;
              </span>
            </div>
            <div className="text-xs font-bold text-brand-navy bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
              Active Budget: <span className="text-amber-700">{weeklyHours} Hours / Week</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>5 hrs/wk (Part-time pace)</span>
                <span>20 hrs/wk (Standard)</span>
                <span>40 hrs/wk (Intensive)</span>
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
              <div className="flex gap-2 pt-1">
                {[5, 10, 15, 20, 30].map((h) => (
                  <button
                    key={h}
                    onClick={() => setWeeklyHours(h)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors ${
                      weeklyHours === h
                        ? 'bg-brand-navy text-white border-brand-navy'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {h} hrs/wk
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="font-bold text-brand-navy">Dynamic Timeline Recalculation</div>
              <p>
                Adjusting your weekly learning budget automatically recalibrates milestone duration and completion horizons across all 3 pathways.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Interactive Career Graph */}
        <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                Interactive Career Opportunity Graph
              </h2>
              <p className="text-[11px] text-slate-500">
                Click nodes to inspect capability bridging and role reachability
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Deterministic Graph
            </span>
          </div>

          {/* SVG Visual Graph */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 overflow-x-auto">
            <svg viewBox="0 0 880 240" className="w-full min-w-[700px] h-56 select-none font-sans">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#94a3b8" />
                </marker>
                <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#0f172a" />
                </marker>
              </defs>

              {/* Connecting Edges */}
              {/* Profile -> Path A (Data Product Analyst) */}
              <path d="M 170 120 C 260 70, 340 50, 480 50" fill="none" stroke={selectedPathId === 'path_a_fastest' ? '#0f172a' : '#cbd5e1'} strokeWidth={selectedPathId === 'path_a_fastest' ? '3' : '2'} markerEnd={selectedPathId === 'path_a_fastest' ? 'url(#arrow-active)' : 'url(#arrow)'} />
              {/* Profile -> Path B (Analytics Engineer) */}
              <path d="M 170 120 C 280 120, 360 120, 480 120" fill="none" stroke={selectedPathId === 'path_b_balanced' ? '#0f172a' : '#cbd5e1'} strokeWidth={selectedPathId === 'path_b_balanced' ? '3' : '2'} markerEnd={selectedPathId === 'path_b_balanced' ? 'url(#arrow-active)' : 'url(#arrow)'} />
              {/* Profile -> Path C (Data Engineer) */}
              <path d="M 170 120 C 260 170, 340 190, 480 190" fill="none" stroke={selectedPathId === 'path_c_specialized' ? '#0f172a' : '#cbd5e1'} strokeWidth={selectedPathId === 'path_c_specialized' ? '3' : '2'} markerEnd={selectedPathId === 'path_c_specialized' ? 'url(#arrow-active)' : 'url(#arrow)'} />

              {/* Advanced Edges to ML Engineer */}
              <path d="M 660 190 C 710 190, 720 140, 740 120" fill="none" stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Intermediate Milestone Node Tags */}
              <rect x="270" y="38" width="130" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="335" y="54" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">Telemetry + A/B</text>

              <rect x="270" y="108" width="130" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="335" y="124" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">dbt + Dimensional</text>

              <rect x="270" y="178" width="130" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
              <text x="335" y="194" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">Docker + Spark</text>

              {/* Center Profile Node */}
              <g onClick={() => setActiveGraphNode('profile')} className="cursor-pointer">
                <rect x="40" y="92" width="130" height="56" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                <text x="105" y="115" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">CURRENT STATE</text>
                <text x="105" y="133" textAnchor="middle" fontSize="9.5" fontWeight="500" fill="#94a3b8">Data Analyst (5 Skills)</text>
              </g>

              {/* Target Node: Path A (Data Product Analyst) */}
              <g onClick={() => { setSelectedPathId('path_a_fastest'); setActiveGraphNode('path_a'); }} className="cursor-pointer">
                <rect x="480" y="24" width="180" height="52" rx="10" fill={selectedPathId === 'path_a_fastest' ? '#f0fdf4' : '#ffffff'} stroke={selectedPathId === 'path_a_fastest' ? '#16a34a' : '#cbd5e1'} strokeWidth="2" />
                <text x="570" y="46" textAnchor="middle" fontSize="11" fontWeight="800" fill="#14532d">DATA PRODUCT ANALYST</text>
                <text x="570" y="62" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#15803d">Fastest Route (72h)</text>
              </g>

              {/* Target Node: Path B (Analytics Engineer) */}
              <g onClick={() => { setSelectedPathId('path_b_balanced'); setActiveGraphNode('path_b'); }} className="cursor-pointer">
                <rect x="480" y="94" width="180" height="52" rx="10" fill={selectedPathId === 'path_b_balanced' ? '#eff6ff' : '#ffffff'} stroke={selectedPathId === 'path_b_balanced' ? '#2563eb' : '#cbd5e1'} strokeWidth="2" />
                <text x="570" y="116" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e3a8a">ANALYTICS ENGINEER</text>
                <text x="570" y="132" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#1d4ed8">Highest Overlap (120h)</text>
              </g>

              {/* Target Node: Path C (Data Engineer) */}
              <g onClick={() => { setSelectedPathId('path_c_specialized'); setActiveGraphNode('path_c'); }} className="cursor-pointer">
                <rect x="480" y="164" width="180" height="52" rx="10" fill={selectedPathId === 'path_c_specialized' ? '#faf5ff' : '#ffffff'} stroke={selectedPathId === 'path_c_specialized' ? '#9333ea' : '#cbd5e1'} strokeWidth="2" />
                <text x="570" y="186" textAnchor="middle" fontSize="11" fontWeight="800" fill="#581c87">DATA ENGINEER</text>
                <text x="570" y="202" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#7e22ce">Specialization (220h)</text>
              </g>

              {/* Target Node: ML Engineer (Extension) */}
              <g className="opacity-75">
                <rect x="730" y="96" width="130" height="48" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="795" y="117" textAnchor="middle" fontSize="10" fontWeight="700" fill="#64748b">ML ENGINEER</text>
                <text x="795" y="132" textAnchor="middle" fontSize="8.5" fill="#94a3b8">Phase 2 Reachable</text>
              </g>
            </svg>
          </div>
        </div>

        {/* 3 Pathway Cards Grid */}
        {simulation && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simulation.paths.map((path) => {
              const isSelected = selectedPathId === path.id;
              return (
                <div
                  key={path.id}
                  onClick={() => setSelectedPathId(path.id)}
                  className={`bg-white rounded-xl border p-5 shadow-2xs cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-brand-navy ring-2 ring-brand-navy shadow-xs'
                      : 'border-brand-border hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-brand-navy border border-slate-200">
                        {path.badge}
                      </span>
                      <span className="text-xs font-black text-brand-navy">
                        Score: {path.overall_score}
                      </span>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {path.name.split(':')[0]}
                      </div>
                      <h3 className="text-base font-black text-brand-navy mt-0.5">
                        {path.target_role}
                      </h3>
                      <div className="inline-block mt-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {path.pace_badge}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {path.rationale}
                    </p>

                    {/* Sequential Milestones */}
                    <div className="space-y-1.5 pt-2 border-t border-brand-border">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">
                        Milestone Steps
                      </div>
                      {path.steps.map((st) => (
                        <div key={st.step} className="flex items-center gap-2 text-xs">
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 ${
                              st.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : st.status === 'next'
                                ? 'bg-brand-navy text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {st.step}
                          </span>
                          <span className="text-slate-700 truncate font-medium">
                            {st.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-border flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Total: <strong>{path.effort_hrs}h</strong>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPathId(path.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-brand-navy text-white'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {isSelected ? 'Active Path' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Path Comparison Matrix Table */}
        {simulation && (
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Path Comparison Matrix
                </h3>
                <p className="text-[11px] text-slate-500">
                  Compare accessibility, transferability, and time investment side-by-side
                </p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                Weekly Budget: {weeklyHours}h
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-brand-border text-slate-400 font-bold uppercase text-[10px]">
                    <th className="pb-2.5">Path</th>
                    <th className="pb-2.5">Target Role</th>
                    <th className="pb-2.5">Skill Gaps</th>
                    <th className="pb-2.5">Estimated Effort</th>
                    <th className="pb-2.5">Opportunity Signal</th>
                    <th className="pb-2.5">Transferability</th>
                    <th className="pb-2.5">Accessibility</th>
                    <th className="pb-2.5 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {simulation.comparison_matrix.map((row) => {
                    const isSelected = selectedPathId === row.path_id;
                    return (
                      <tr
                        key={row.path_id}
                        onClick={() => setSelectedPathId(row.path_id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-slate-50/90 font-semibold' : 'hover:bg-slate-50/50'
                        }`}
                      >
                        <td className="py-3 font-bold text-brand-navy">{row.path_name}</td>
                        <td className="py-3 text-slate-800">{row.target_role}</td>
                        <td className="py-3 text-slate-600">{row.skill_gaps}</td>
                        <td className="py-3 text-amber-800 font-bold">{row.estimated_effort}</td>
                        <td className="py-3 text-slate-700">{row.opportunity_signal}</td>
                        <td className="py-3 text-emerald-700">{row.transferability}</td>
                        <td className="py-3 text-indigo-700">{row.accessibility}</td>
                        <td className="py-3 text-right font-black text-brand-navy">{row.score}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Responsible AI Stamp */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

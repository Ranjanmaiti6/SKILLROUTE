'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Layers,
  HelpCircle,
  FileCheck2,
  FolderGit2,
  BarChart3,
  TrendingUp,
  Award,
  AlertTriangle,
  Info,
  Sliders,
  Database,
  Building2,
  MapPin,
  Cpu
} from 'lucide-react';
import marketOverview from '../../data/derived/market_overview.json';
import locationData from '../../data/derived/location_intelligence.json';
import jdsData from '../../data/derived/jds_analytics.json';
import sdsData from '../../data/derived/sds_analytics.json';

export default function EvidenceHubPage() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'market' | 'jds' | 'sds' | 'ml'>('datasets');

  return (
    <AppShell>
      <div className="space-y-6 pb-12 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-brand-border">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-1">
              <span>Official SAS CU Hackathon Research Hub</span>
              <span>•</span>
              <span className="text-brand-navy">Statistical Verification & ML Evidence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Evidence & Analytics Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
              Transparent empirical proof backing every recommendation in SkillRoute. Ingesting and auditing all 4 official datasets: 
              15,841 Analytics Jobs, 1,602 Data Science Postings, 139 Junior Data Scientists, and 161 Senior Customer-Facing Data Scientists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-300">
              17,743 Total Records
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
              4 Official Datasets
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              100% Empirically Grounded
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('datasets')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'datasets'
                ? 'border-brand-navy text-brand-navy bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>1. Dataset Portfolio & Quality</span>
          </button>

          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'market'
                ? 'border-brand-navy text-brand-navy bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>2. Market Salary & Demand (Datasets 1 & 2)</span>
          </button>

          <button
            onClick={() => setActiveTab('jds')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'jds'
                ? 'border-brand-navy text-brand-navy bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. Junior DS Promotion Science (Dataset 3)</span>
          </button>

          <button
            onClick={() => setActiveTab('sds')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'sds'
                ? 'border-brand-navy text-brand-navy bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>4. Senior DS Leadership Psychometrics (Dataset 4)</span>
          </button>

          <button
            onClick={() => setActiveTab('ml')}
            className={`px-4 py-2.5 rounded-t-lg transition-all flex items-center gap-2 border-b-2 ${
              activeTab === 'ml'
                ? 'border-brand-navy text-brand-navy bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5. ML Models & 5-Fold Cross Validation</span>
          </button>
        </div>

        {/* TAB 1: DATASET PORTFOLIO & AUDIT */}
        {activeTab === 'datasets' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Dataset 1 */}
              <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>DATASET 1</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px]">CSV</span>
                </div>
                <div className="font-extrabold text-brand-navy text-sm">DataScience Jobs</div>
                <div className="text-2xl font-black text-brand-navy">1,602 <span className="text-xs font-normal text-slate-500">records</span></div>
                <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                  <div>• 93,005 represented job vacancies</div>
                  <div>• Continuous salaries (4.0L – 38.0L)</div>
                  <div>• Enterprise recruiters: TCS, Accenture, IBM</div>
                </div>
              </div>

              {/* Dataset 2 */}
              <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>DATASET 2</span>
                  <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px]">CSV</span>
                </div>
                <div className="font-extrabold text-brand-navy text-sm">Analytics Jobs</div>
                <div className="text-2xl font-black text-brand-navy">15,841 <span className="text-xs font-normal text-slate-500">postings</span></div>
                <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                  <div>• Key skills, location, designation, salary</div>
                  <div>• 6 ordinal salary brackets (0to3 to 25to50)</div>
                  <div>• Complete geo-mapping across Indian metros</div>
                </div>
              </div>

              {/* Dataset 3 */}
              <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>DATASET 3</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px]">XLSX</span>
                </div>
                <div className="font-extrabold text-brand-navy text-sm">JDS Skill Traits</div>
                <div className="text-2xl font-black text-brand-navy">139 <span className="text-xs font-normal text-slate-500">junior DS</span></div>
                <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                  <div>• 5 technical & storytelling traits (1–5)</div>
                  <div>• Binary salary hike target (52.5% high)</div>
                  <div>• Forensically audited: 27-row block copy</div>
                </div>
              </div>

              {/* Dataset 4 */}
              <div className="bg-white p-4 rounded-xl border border-brand-border shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>DATASET 4</span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px]">XLSX</span>
                </div>
                <div className="font-extrabold text-brand-navy text-sm">SDS Personality Traits</div>
                <div className="text-2xl font-black text-brand-navy">161 <span className="text-xs font-normal text-slate-500">senior DS</span></div>
                <div className="text-[11px] text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                  <div>• Big Five OCEAN psychometric scores</div>
                  <div>• Consultative success target (52.8% high)</div>
                  <div>• 3-Gate Decision Rule: 96.89% accuracy</div>
                </div>
              </div>
            </div>

            {/* Forensic Data Quality Audit Table */}
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-4">
              <div className="font-bold text-sm text-brand-navy flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Forensic Data Quality & Governance Audit Scorecard</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Dataset Name</th>
                      <th className="py-2.5 px-3">Total Rows</th>
                      <th className="py-2.5 px-3">Missing Values</th>
                      <th className="py-2.5 px-3">Target Variable</th>
                      <th className="py-2.5 px-3">Class / Target Balance</th>
                      <th className="py-2.5 px-3">Integrity Flags Identified</th>
                      <th className="py-2.5 px-3">Remediation Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">DataScience Jobs</td>
                      <td className="py-2.5 px-3">1,602</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-semibold">0 (100% complete)</td>
                      <td className="py-2.5 px-3 font-mono">avg_salary (LPA)</td>
                      <td className="py-2.5 px-3">Mean: 10.3L, Range: 4.0–38.0L</td>
                      <td className="py-2.5 px-3 text-amber-700">Salary strings contain &apos;L&apos; suffix</td>
                      <td className="py-2.5 px-3 text-slate-600">Regex-parsed to float LPA features</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Analytics Jobs</td>
                      <td className="py-2.5 px-3">15,841</td>
                      <td className="py-2.5 px-3 text-amber-600 font-semibold">job_type: 75.8% null</td>
                      <td className="py-2.5 px-3 font-mono">salary (bracket)</td>
                      <td className="py-2.5 px-3">Balanced across 6 brackets</td>
                      <td className="py-2.5 px-3 text-amber-700">Multi-city strings, trailing &apos;...&apos;</td>
                      <td className="py-2.5 px-3 text-slate-600">Tokenized skills & metro clustering</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">JDS Skill Traits</td>
                      <td className="py-2.5 px-3">139</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-semibold">0 (100% complete)</td>
                      <td className="py-2.5 px-3 font-mono">salary_hike_high_or_low</td>
                      <td className="py-2.5 px-3">73 High (52.5%) vs 66 Low (47.5%)</td>
                      <td className="py-2.5 px-3 text-rose-700 font-semibold">27-row block duplicate (12 contradictory)</td>
                      <td className="py-2.5 px-3 text-slate-600">Acknowledge Bayes floor; regularized L2</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">SDS Personality Traits</td>
                      <td className="py-2.5 px-3">161</td>
                      <td className="py-2.5 px-3 text-emerald-600 font-semibold">0 (100% complete)</td>
                      <td className="py-2.5 px-3 font-mono">success_classification_high_low</td>
                      <td className="py-2.5 px-3">85 High (52.8%) vs 76 Low (47.2%)</td>
                      <td className="py-2.5 px-3 text-amber-700">9 repeated IDs with different traits</td>
                      <td className="py-2.5 px-3 text-slate-600">Standardized column headers; tree rules</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MARKET SALARY & DEMAND (DATASETS 1 & 2) */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-3">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-navy" />
                  <span>Top Hiring Metro Hubs (15,841 Jobs)</span>
                </div>
                <div className="space-y-2 text-xs">
                  {locationData.slice(0, 6).map((loc, idx) => (
                    <div key={loc.location} className="flex items-center justify-between p-2 rounded bg-slate-50">
                      <div>
                        <span className="font-bold text-brand-navy">{loc.location}</span>
                        <div className="text-[10px] text-slate-500">Avg Salary: {loc.avg_salary_lpa} LPA</div>
                      </div>
                      <span className="font-bold text-brand-navy px-2 py-0.5 rounded bg-white border border-slate-200">
                        {loc.job_postings.toLocaleString()} jobs
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-3">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-brand-navy" />
                  <span>Top Enterprise Recruiters (1,602 Benchmarks)</span>
                </div>
                <div className="space-y-2 text-xs">
                  {marketOverview.top_hiring_companies.slice(0, 6).map((comp) => (
                    <div key={comp.company} className="flex items-center justify-between p-2 rounded bg-slate-50">
                      <div>
                        <span className="font-bold text-brand-navy">{comp.company}</span>
                        <div className="text-[10px] text-slate-500">Avg Benchmark: {comp.avg_salary_lpa} LPA</div>
                      </div>
                      <span className="font-bold text-brand-navy px-2 py-0.5 rounded bg-white border border-slate-200">
                        {comp.total_jobs.toLocaleString()} jobs
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-3">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-brand-navy" />
                  <span>Salary Bracket Distribution (LPA)</span>
                </div>
                <div className="space-y-2 text-xs">
                  {Object.entries(marketOverview.salary_bracket_distribution).map(([bracket, count]) => (
                    <div key={bracket} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold">
                        <span>{bracket} LPA</span>
                        <span className="font-mono text-slate-600">{count} postings ({Math.round(count / 158.41)}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-brand-navy h-full rounded-full"
                          style={{ width: `${(count / 3608) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: JUNIOR DS PROMOTION SCIENCE (DATASET 3) */}
        {activeTab === 'jds' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Empirical Effect Sizes & Group Differences (High Hike vs Low Hike)</span>
                </div>
                <Link
                  href="/jds-simulator"
                  className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <span>Launch Live Simulator</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Skill Competency Dimension</th>
                      <th className="py-2.5 px-3">Low Hike Mean (N=66)</th>
                      <th className="py-2.5 px-3">High Hike Mean (N=73)</th>
                      <th className="py-2.5 px-3">Net Advantage (Δ)</th>
                      <th className="py-2.5 px-3">Mann-Whitney U p-val</th>
                      <th className="py-2.5 px-3">Cohen&apos;s d Effect Size</th>
                      <th className="py-2.5 px-3">Univariable Odds Ratio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-emerald-50/30">
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Dashboard & Storytelling</td>
                      <td className="py-2.5 px-3 font-mono">3.814</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">4.845</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+1.031</td>
                      <td className="py-2.5 px-3 font-mono">1.34 × 10⁻¹³</td>
                      <td className="py-2.5 px-3 font-black text-emerald-800">1.323 (Very Large)</td>
                      <td className="py-2.5 px-3 font-bold">5.421 (p &lt; 0.0001)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Maths & Statistics Skills</td>
                      <td className="py-2.5 px-3 font-mono">3.830</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">4.712</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+0.882</td>
                      <td className="py-2.5 px-3 font-mono">2.15 × 10⁻¹²</td>
                      <td className="py-2.5 px-3 font-black text-emerald-800">1.222 (Very Large)</td>
                      <td className="py-2.5 px-3 font-bold">5.285 (p &lt; 0.0001)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Coding Skills (Python, SQL)</td>
                      <td className="py-2.5 px-3 font-mono">3.853</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">4.644</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+0.791</td>
                      <td className="py-2.5 px-3 font-mono">4.89 × 10⁻⁹</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">0.985 (Large)</td>
                      <td className="py-2.5 px-3 font-bold">3.212 (p &lt; 0.0001)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">AI & Machine Learning</td>
                      <td className="py-2.5 px-3 font-mono">4.283</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">4.822</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+0.539</td>
                      <td className="py-2.5 px-3 font-mono">8.79 × 10⁻⁵</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">0.880 (Large)</td>
                      <td className="py-2.5 px-3 font-bold">5.191 (p &lt; 0.0001)</td>
                    </tr>
                    <tr className="bg-amber-50/30">
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Big Data Infrastructure</td>
                      <td className="py-2.5 px-3 font-mono">3.750</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">3.940</td>
                      <td className="py-2.5 px-3 font-bold text-slate-700">+0.190</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">0.2172 (Non-Sig)</td>
                      <td className="py-2.5 px-3 font-bold text-slate-500">0.225 (Negligible)</td>
                      <td className="py-2.5 px-3 font-bold text-slate-500">1.308 (p = 0.187)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* The Silent Quant Discovery Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-brand-border space-y-2 text-xs">
                <div className="font-bold text-brand-navy flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>The &ldquo;Silent Quant&rdquo; Threshold Empirical Discovery:</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  When testing non-linear skill combinations across the 139 junior practitioners:
                  Candidates with High Maths (≥ 4.5) but Low Storytelling (&lt; 4.0) experienced a <strong>78.6% low-hike rate</strong> (only 21.4% high hike).
                  Conversely, candidates with Dual Mastery (both Storytelling ≥ 4.5 AND Maths ≥ 4.5) achieved an <strong>84.7% high-hike rate</strong>.
                  This proves that narrative communication acts as a mandatory multiplier on mathematical foundations for junior advancement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SENIOR DS LEADERSHIP PSYCHOMETRICS (DATASET 4) */}
        {activeTab === 'sds' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm text-brand-navy flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <span>Big Five Personality Dimension Separation (High vs Low Success)</span>
                </div>
                <Link
                  href="/sds-diagnostic"
                  className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <span>Launch Leadership Diagnostic</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Big Five Trait Dimension</th>
                      <th className="py-2.5 px-3">Low Success Mean (N=76)</th>
                      <th className="py-2.5 px-3">High Success Mean (N=85)</th>
                      <th className="py-2.5 px-3">Net Advantage (Δ)</th>
                      <th className="py-2.5 px-3">Welch t p-val</th>
                      <th className="py-2.5 px-3">Cohen&apos;s d Effect Size</th>
                      <th className="py-2.5 px-3">Correlation with Success (r)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="bg-emerald-50/30">
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Conscientiousness</td>
                      <td className="py-2.5 px-3 font-mono">35.74</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">53.68</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+17.95</td>
                      <td className="py-2.5 px-3 font-mono">&lt; 10⁻¹⁵</td>
                      <td className="py-2.5 px-3 font-black text-emerald-800">1.847 (Massive)</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+0.680 (p &lt; 0.001)</td>
                    </tr>
                    <tr className="bg-indigo-50/30">
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Openness to Experience</td>
                      <td className="py-2.5 px-3 font-mono">33.32</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-700">48.49</td>
                      <td className="py-2.5 px-3 font-bold text-indigo-700">+15.18</td>
                      <td className="py-2.5 px-3 font-mono">&lt; 10⁻¹⁵</td>
                      <td className="py-2.5 px-3 font-black text-indigo-800">1.803 (Massive)</td>
                      <td className="py-2.5 px-3 font-bold text-indigo-700">+0.671 (p &lt; 0.001)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Extraversion</td>
                      <td className="py-2.5 px-3 font-mono">36.88</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">48.86</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+11.98</td>
                      <td className="py-2.5 px-3 font-mono">&lt; 10⁻⁹</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">1.132 (Very Large)</td>
                      <td className="py-2.5 px-3 font-bold">+0.494 (p &lt; 0.001)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Agreeableness</td>
                      <td className="py-2.5 px-3 font-mono">41.12</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">47.72</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">+6.60</td>
                      <td className="py-2.5 px-3 font-mono">0.00039</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">0.609 (Moderate)</td>
                      <td className="py-2.5 px-3 font-bold">+0.293 (p = 0.0002)</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-brand-navy">Neuroticism</td>
                      <td className="py-2.5 px-3 font-mono">36.26</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">36.13</td>
                      <td className="py-2.5 px-3 font-bold text-slate-700">-0.13</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">0.9415 (Non-Sig)</td>
                      <td className="py-2.5 px-3 font-bold text-slate-500">-0.012 (Zero)</td>
                      <td className="py-2.5 px-3 font-bold text-slate-500">-0.006 (p = 0.940)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3-Gate Rule Card */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>The 3-Gate Decision Rule (96.89% Empirical Accuracy):</span>
                </div>
                <div className="text-emerald-950 text-[11px] leading-relaxed">
                  A transparent 3-node decision rule correctly classifies 156 out of 161 practitioners:
                  <div className="font-mono bg-white p-2 rounded border border-emerald-200 mt-1.5 mb-1.5 text-[10px]">
                    Success = (Openness &gt; 38.5) AND (Conscientiousness &gt; 36.5) AND (Agreeableness &gt; 37.5)
                  </div>
                  All 85 successful senior data scientists satisfy all three conditions. 0% of practitioners with Conscientiousness ≤ 36.5 achieved high success, proving execution diligence is a mandatory gatekeeper.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ML BENCHMARKS & 5-FOLD CV */}
        {activeTab === 'ml' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-brand-border shadow-xs space-y-4">
              <div className="font-bold text-sm text-brand-navy flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-navy" />
                <span>Stratified 5-Fold Cross Validation Benchmark Across Candidate Models</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50">
                      <th className="py-2.5 px-3">Dataset Domain</th>
                      <th className="py-2.5 px-3">Algorithm Model</th>
                      <th className="py-2.5 px-3">Accuracy (Mean ± SD)</th>
                      <th className="py-2.5 px-3">ROC-AUC (Mean ± SD)</th>
                      <th className="py-2.5 px-3">F1-Score (Mean ± SD)</th>
                      <th className="py-2.5 px-3">Precision / Recall</th>
                      <th className="py-2.5 px-3">Overfitting Diagnosis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 font-bold font-sans text-brand-navy">JDS Skill Traits (Dataset 3)</td>
                      <td className="py-2.5 px-3 font-sans font-bold">Logistic Regression (L2)</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">84.1% ± 8.4%</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">0.904 ± 0.048</td>
                      <td className="py-2.5 px-3">84.8% ± 8.8%</td>
                      <td className="py-2.5 px-3">83.0% / 87.5%</td>
                      <td className="py-2.5 px-3 font-sans text-emerald-700">Clean; regularized weights</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold font-sans text-brand-navy">JDS Skill Traits (Dataset 3)</td>
                      <td className="py-2.5 px-3 font-sans font-bold">Random Forest (Depth 3)</td>
                      <td className="py-2.5 px-3">84.9% ± 5.3%</td>
                      <td className="py-2.5 px-3">0.890 ± 0.050</td>
                      <td className="py-2.5 px-3">85.7% ± 5.4%</td>
                      <td className="py-2.5 px-3">84.5% / 87.8%</td>
                      <td className="py-2.5 px-3 font-sans text-emerald-700">Stable ensemble</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold font-sans text-brand-navy">JDS Skill Traits (Dataset 3)</td>
                      <td className="py-2.5 px-3 font-sans font-bold">Decision Tree (Depth 3)</td>
                      <td className="py-2.5 px-3">79.8% ± 6.7%</td>
                      <td className="py-2.5 px-3">0.819 ± 0.066</td>
                      <td className="py-2.5 px-3">81.4% ± 6.5%</td>
                      <td className="py-2.5 px-3">78.7% / 85.0%</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600">Constrained threshold splits</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2.5 px-3 font-bold font-sans text-brand-navy">SDS Personality (Dataset 4)</td>
                      <td className="py-2.5 px-3 font-sans font-bold">Random Forest (Depth 3)</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">95.0% ± 4.3%</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">0.991 ± 0.015</td>
                      <td className="py-2.5 px-3">95.3% ± 4.3%</td>
                      <td className="py-2.5 px-3">94.3% / 96.5%</td>
                      <td className="py-2.5 px-3 font-sans text-emerald-700">Captures 3-gate cutoff</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2.5 px-3 font-bold font-sans text-brand-navy">SDS Personality (Dataset 4)</td>
                      <td className="py-2.5 px-3 font-sans font-bold">Decision Tree (Depth 3)</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-bold">93.8% ± 4.9%</td>
                      <td className="py-2.5 px-3">0.942 ± 0.051</td>
                      <td className="py-2.5 px-3">93.9% ± 5.1%</td>
                      <td className="py-2.5 px-3">94.2% / 94.1%</td>
                      <td className="py-2.5 px-3 font-sans text-emerald-700">100% interpretable rules</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="py-2.5 px-3 font-bold font-sans text-brand-navy">SDS Personality (Dataset 4)</td>
                      <td className="py-2.5 px-3 font-sans font-bold">Logistic Regression (L2)</td>
                      <td className="py-2.5 px-3">91.3% ± 5.7%</td>
                      <td className="py-2.5 px-3">0.947 ± 0.048</td>
                      <td className="py-2.5 px-3">92.0% ± 5.4%</td>
                      <td className="py-2.5 px-3">90.1% / 94.1%</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600">Quasi-separation handled via L2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

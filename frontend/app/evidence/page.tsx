'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { EvidenceCard, EvidenceStatus } from '../../components/evidence/EvidenceCard';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
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
  ArrowLeft,
  Hammer,
  Plus
} from 'lucide-react';

interface ArtifactState {
  id: string;
  skill_id: string;
  skill_name: string;
  category: string;
  priority: string;
  status: EvidenceStatus;
  learn: string;
  build: string;
  prove: string;
  apply: string;
  githubUrl?: string;
  repository_link?: string;
  verification_notes?: string;
}

const INITIAL_ARTIFACTS: ArtifactState[] = [
  {
    id: 'ev_dbt',
    skill_id: 'skill_dbt',
    skill_name: 'dbt (Data Build Tool)',
    category: 'Core Transformation Engine',
    priority: 'P0 Critical',
    status: 'in-progress',
    learn: 'Models • Tests • Transformations. Understand ref() dependencies, Jinja macros, staging/intermediate/marts layers, and automated schema tests.',
    build: 'Analytics warehouse transformation project: Convert raw orders & customer events into dimensional analytics marts with incremental models.',
    prove: 'Public GitHub repository with automated schema tests (unique, not_null, relationships), lineage DAG diagram, and docs generate output.',
    apply: 'Demonstrate in technical screenings to prove you write production-grade, modular SQL pipelines rather than fragile ad-hoc queries.',
    repository_link: 'https://github.com/aaravsharma/jaffle-shop-dbt-analytics',
    verification_notes: '12 models configured; 18 automated schema tests passing in GitHub Actions CI.'
  },
  {
    id: 'ev_data_modeling',
    skill_id: 'skill_data_modeling',
    skill_name: 'Dimensional Data Modeling',
    category: 'Data Architecture',
    priority: 'P0 Critical',
    status: 'verified', // 1 of 4 verified/evidenced
    learn: 'Kimball star schemas, facts vs. dimensions, surrogate keys, and slowly changing dimensions (SCD 1 & SCD 2).',
    build: 'Enterprise sales & revenue dimensional model with fact_sales, dim_customers, and dim_products modeled from transactional CRM schemas.',
    prove: 'Full ERD diagram, normalization benchmarks, and query execution plan analysis proving reduced scan costs by 65%.',
    apply: 'Showcases architectural rigor during system design rounds; positions you as an engineer, not just a dashboard builder.',
    repository_link: 'https://github.com/aaravsharma/dimensional-modeling-star-schema',
    verification_notes: 'ERD and schema DDL verified against O*NET 15-2051.02 architectural standards.'
  },
  {
    id: 'ev_warehouse',
    skill_id: 'skill_warehousing',
    skill_name: 'Cloud Data Warehousing (Snowflake / BigQuery)',
    category: 'Storage & Compute Infrastructure',
    priority: 'P1 High',
    status: 'not-started',
    learn: 'Clustering, micro-partitioning, credit optimization, warehouse sizing principles, and zero-copy cloning.',
    build: 'Multi-tier warehouse staging, intermediate, and reporting marts on Snowflake or BigQuery with automated partition pruning.',
    prove: 'Benchmark query profile comparison showing partition pruning reducing query scan by 80% and query latency under 1.2s.',
    apply: 'Validates cloud warehouse fluency and cost-conscious data platform engineering for modern cloud startups.',
    verification_notes: 'Scheduled for Phase 3 progression.'
  },
  {
    id: 'ev_cicd',
    skill_id: 'skill_cicd_git',
    skill_name: 'Data CI/CD & Version Control',
    category: 'Engineering Rigor',
    priority: 'P2 Medium',
    status: 'not-started',
    learn: 'GitHub Actions for data teams: sqlfluff linting, automated dbt compile, branch protections, and pull request previews.',
    build: 'Automated CI/CD pipeline triggering slim CI runs on every pull request targeting the main data branch.',
    prove: 'Passing GitHub Actions build badge on repository, pull request preview environments, and lint rules enforcement.',
    apply: 'Separates modern analytics engineers from traditional BI dashboard creators during hiring team code reviews.',
    verification_notes: 'Scheduled for final portfolio packaging.'
  }
];

export default function EvidenceBuilderPage() {
  const [artifacts, setArtifacts] = useState<ArtifactState[]>(INITIAL_ARTIFACTS);

  const handleStatusChange = (id: string, newStatus: EvidenceStatus, repoUrl?: string) => {
    setArtifacts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              githubUrl: repoUrl || item.githubUrl || item.repository_link
            }
          : item
      )
    );
  };

  // Progress metrics calculation
  // "1 of 4 skills evidenced (25%)" or verified
  const evidencedOrVerified = artifacts.filter(
    (a) => a.status === 'evidenced' || a.status === 'verified'
  ).length;
  const inProgress = artifacts.filter((a) => a.status === 'in-progress').length;
  const total = artifacts.length;
  const progressPct = Math.round((evidencedOrVerified / total) * 100);

  const handleBuildEvidenceCTA = () => {
    // Scroll or set next not-started project to in-progress
    const firstNotStarted = artifacts.find((a) => a.status === 'not-started');
    if (firstNotStarted) {
      handleStatusChange(firstNotStarted.id, 'in-progress');
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header ribbon */}
        <div className="border-b border-brand-border pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Empirical Evidence Builder • Candidate: Aarav Sharma
              </span>
            </div>
            <h1 className="text-2xl font-black text-brand-navy mt-1 tracking-tight">
              TURN SKILLS INTO PROOF
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Skills don&apos;t get you hired. Evidence does. Build verifiable proof of your capabilities.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBuildEvidenceCTA}
              className="px-4 py-2.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 group"
            >
              <Hammer className="w-4 h-4 text-brand-saffron" />
              <span>BUILD EVIDENCE</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/pathway"
              className="px-3.5 py-2 text-xs font-semibold bg-white border border-brand-border rounded-lg hover:bg-slate-50 transition-colors shadow-xs flex items-center gap-1.5 text-brand-navy"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              <span>Pathway</span>
            </Link>
          </div>
        </div>

        {/* Hero Progress Scorecard Banner */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate block">
                EVIDENCE READINESS PIPELINE
              </span>
              <h3 className="text-lg font-black text-brand-navy mt-0.5">
                {evidencedOrVerified} of {total} skills evidenced ({progressPct}%)
              </h3>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{evidencedOrVerified} Evidenced / Verified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{inProgress} Active Project</span>
              </span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-brand-navy to-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, progressPct)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>Baseline: 1.5 yrs SQL Experience</span>
              <span>Target: Analytics Engineer Market Readiness (100%)</span>
            </div>
          </div>
        </div>

        {/* The 4-Step Recipe Navigation Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">01 LEARN</span>
            <div className="text-xs font-bold text-brand-navy mt-1">What to study</div>
            <p className="text-[11px] text-slate-600 mt-0.5">Specific mental models, not generic courses.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">02 BUILD</span>
            <div className="text-xs font-bold text-brand-navy mt-1">What to build</div>
            <p className="text-[11px] text-slate-600 mt-0.5">Concrete production-grade architecture.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
            <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider block">03 PROVE</span>
            <div className="text-xs font-bold text-brand-navy mt-1">How to prove it</div>
            <p className="text-[11px] text-slate-600 mt-0.5">GitHub repos, schema test suites, CI badges.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80">
            <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block">04 APPLY</span>
            <div className="text-xs font-bold text-brand-navy mt-1">Where to apply it</div>
            <p className="text-[11px] text-slate-600 mt-0.5">Resume impact points & technical screening talk-tracks.</p>
          </div>
        </div>

        {/* Structured Evidence Cards */}
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
              Priority Skills Evidence Plan • Analytics Engineer
            </h3>
            <span className="text-[11px] text-slate-500">
              Interactive buttons persist evidence status in real time
            </span>
          </div>

          {artifacts.map((artifact) => (
            <EvidenceCard
              key={artifact.id}
              artifact={artifact}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {/* Methodology Callout */}
        <div className="p-5 rounded-xl bg-slate-50 border border-brand-border text-xs text-slate-600 space-y-2">
          <div className="font-bold text-brand-navy flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-saffron" />
            <span>Why Empirical Code Proof Trumps Traditional Certificates</span>
          </div>
          <p className="leading-relaxed">
            Data engineering hiring managers in Indian tech centers (Delhi NCR, Bengaluru, Hyderabad) report that certificate credentials provide low signal. By building a verified dbt analytics repository with automated test suites, Kimball star schemas, and partition optimizations, Aarav demonstrates immediate day-one execution capability.
          </p>
        </div>

        {/* Completion Flow Navigation */}
        <div className="p-5 rounded-xl border border-brand-border bg-white shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-brand-navy">Ready to present your workforce profile?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Review Aarav Sharma&apos;s complete Transition Intelligence Overview or explore the Opportunity Landscape.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/opportunities"
              className="px-3.5 py-2 text-xs font-semibold text-brand-slate bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            >
              Opportunity Landscape
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-xs"
            >
              Back to Overview
            </Link>
          </div>
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

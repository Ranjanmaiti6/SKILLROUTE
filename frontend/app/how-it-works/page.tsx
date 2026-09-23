'use client';

import React from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  HelpCircle,
  ShieldCheck,
  Cpu,
  Database,
  GitFork,
  Sliders,
  CheckCircle2,
  FileCode,
  BookOpen
} from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Profile Ingestion & Parsing',
      desc: 'Candidate resumes, GitHub repositories, and work portfolios are parsed into unstructured text chunks.',
      tech: 'Python spaCy / regex / structural parsing'
    },
    {
      num: '02',
      title: 'Named Entity Extraction',
      desc: 'Technical tools, methodologies, and project tasks are extracted and categorized into explicit vs evidence-backed vs inferred.',
      tech: 'Domain-specific NER models'
    },
    {
      num: '03',
      title: 'Skill Normalization',
      desc: 'Aliases are crosswalked to canonical IDs (e.g. "Postgres", "SQL queries" → ESCO skill e8f7a9d0) to eliminate keyword fragmentation.',
      tech: 'ESCO v1.2.1 & O*NET 31.0 crosswalk'
    },
    {
      num: '04',
      title: 'Capability Graph Traversal',
      desc: 'Directed graphs map prerequisite dependencies (e.g. SQL is a prerequisite for Dimensional Modeling, which is a prerequisite for dbt).',
      tech: 'Directed Acyclic Graph (DAG) traversal'
    },
    {
      num: '05',
      title: 'Multi-Objective Transition Scoring',
      desc: 'Candidate target roles are scored using: Fit + Demand + Transferability + Accessibility - LearningCost - ExperienceGap.',
      tech: 'Calibrated Decision Model'
    },
    {
      num: '06',
      title: 'Constraint-Aware Pathway Optimization',
      desc: 'The optimizer maximizes expected gain divided by learning cost + risk, subject to weekly learning hours (10h to 60h/week).',
      tech: 'Constrained Mathematical Optimization'
    },
    {
      num: '07',
      title: 'Evidence Verification & Outcome Loop',
      desc: 'Every milestone maps to verifiable code repositories (Learn → Build → Prove → Apply). Consented outcomes update transition probabilities.',
      tech: 'Bayesian edge weight retraining'
    }
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-brand-border pb-5">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-slate" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
              Technical Architecture & Transparency
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
            How SkillRoute Reasons
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
            SkillRoute is not a generic AI chatbot or a resume keyword matcher. The system makes decisions
            using structured knowledge graphs, verified taxonomies, and constrained optimization.
            Large Language Models are restricted strictly to explanation synthesis.
          </p>
        </div>

        {/* 7-Step Pipeline */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-brand-navy">
            The 7-Stage Intelligence Pipeline
          </h3>

          <div className="space-y-3">
            {steps.map((st) => (
              <div
                key={st.num}
                className="p-4 rounded-lg bg-slate-50 border border-brand-borderLight flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded bg-brand-navy text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {st.num}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">{st.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{st.desc}</p>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-brand-slate bg-white px-2.5 py-1 rounded border border-slate-200 w-fit md:flex-shrink-0">
                  {st.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mathematical Core Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
              <Database className="w-4 h-4 text-brand-slate" />
              <span>Transition Scoring Formulation</span>
            </h3>
            <div className="p-3 bg-slate-900 text-amber-300 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
              TransitionScore(r) = w₁·SkillFit + w₂·Demand + w₃·Transferability + w₄·Accessibility - w₅·LearningCost - w₆·ExperienceGap
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tuned using validation data and expert calibration rather than arbitrary weights. This separates market attractiveness from immediate accessibility.
            </p>
          </div>

          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-slate" />
              <span>Path Optimization Formulation</span>
            </h3>
            <div className="p-3 bg-slate-900 text-emerald-300 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
              P* = argmax [ ExpectedOpportunityGain(P) / (LearningCost(P) + Risk(P)) ]
              {"\n"}subject to: LearningTime(P) ≤ UserTimeBudget
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Optimizes pathway sequence under stated weekly hours constraints, ensuring that prerequisite chains are completely satisfied.
            </p>
          </div>
        </div>

        {/* Verified Data Sources Table */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-brand-navy flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-green" />
            <span>Verified Foundation Taxonomies (No Invented Data)</span>
          </h3>

          <div className="border border-brand-borderLight rounded-lg overflow-hidden text-xs">
            <div className="grid grid-cols-3 p-3 bg-slate-50 border-b border-brand-borderLight font-bold text-brand-navy">
              <span>Source</span>
              <span>Role in SkillRoute</span>
              <span>Status</span>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-brand-navy">ESCO v1.2.1</span>
                <span className="text-slate-600">European classification of skills and occupations</span>
                <span className="text-brand-green font-medium">Official API / Download</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-brand-navy">O*NET 31.0 Database</span>
                <span className="text-slate-600">Transferable skills, activities, and software</span>
                <span className="text-brand-green font-medium">Verified Official DB</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-brand-navy">National Career Service (NCS)</span>
                <span className="text-slate-600">Ministry of Labour & Employment India signals</span>
                <span className="text-brand-green font-medium">Official Portal Context</span>
              </div>
              <div className="grid grid-cols-3 p-3">
                <span className="font-semibold text-brand-navy">WEF Future of Jobs 2025</span>
                <span className="text-slate-600">Macro employer transformation trends</span>
                <span className="text-brand-green font-medium">Verified Macro Evidence</span>
              </div>
            </div>
          </div>
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

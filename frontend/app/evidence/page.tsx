'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { fetchEvidenceChecklist } from '../../lib/api';
import { EvidenceArtifact } from '../../types';
import { EvidenceCard } from '../../components/evidence/EvidenceCard';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function EvidenceBuilderPage() {
  const [artifacts, setArtifacts] = useState<EvidenceArtifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvidenceChecklist().then((items) => {
      setArtifacts(items);
      setLoading(false);
    });
  }, []);

  const handleStatusChange = (
    id: string,
    newStatus: 'not-started' | 'in-progress' | 'completed'
  ) => {
    setArtifacts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-brand-slate border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const completedCount = artifacts.filter((a) => a.status === 'completed').length;
  const inProgressCount = artifacts.filter((a) => a.status === 'in-progress').length;

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-brand-border pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
                Artifact Verification Engine
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
              Evidence Builder: Learn → Build → Prove → Apply
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Certificates and resume bullet points are often unverified. SkillRoute guides you to
              create empirical codebase proof for every missing prerequisite.
            </p>
          </div>

          <Link
            href="/outcomes"
            className="px-4 py-2 text-xs font-semibold bg-brand-navy text-white rounded-lg hover:bg-brand-slate transition-all shadow-xs flex items-center gap-1.5"
          >
            <span>Transition Outcomes Loop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Evidence Progress Scorecard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Completed Evidence
            </span>
            <div className="text-2xl font-bold text-brand-green mt-1">
              {completedCount} / {artifacts.length}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Dimensional modeling verified
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Active In-Progress
            </span>
            <div className="text-2xl font-bold text-brand-saffron mt-1">
              {inProgressCount} Core Project
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              dbt Jaffle Shop Analytics pipeline
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-brand-border shadow-xs">
            <span className="text-[10px] text-brand-muted uppercase font-semibold">
              Evidence Readiness Score
            </span>
            <div className="text-2xl font-bold text-brand-navy mt-1">
              {Math.round(((completedCount * 1.0 + inProgressCount * 0.5) / artifacts.length) * 100)}%
            </div>
            <div className="text-[10px] text-brand-green mt-0.5">
              Feasible for technical screening
            </div>
          </div>
        </div>

        {/* Evidence Cards List */}
        <div className="space-y-4">
          {artifacts.map((artifact) => (
            <EvidenceCard
              key={artifact.id}
              artifact={artifact}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {/* Methodology Callout */}
        <div className="p-5 rounded-xl bg-slate-50 border border-brand-borderLight text-xs text-slate-600 space-y-2">
          <div className="font-bold text-brand-navy flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-slate" />
            <span>Why the Learn → Build → Prove → Apply Quadrant Matters</span>
          </div>
          <p className="leading-relaxed">
            Hiring managers in Indian product startups and global capability centers (GCCs) report that traditional credentialing does not predict real-world job performance. By anchoring your transition on verifiable GitHub repositories, test suites, and schema diagrams, SkillRoute produces objective evidence that reduces recruiter uncertainty.
          </p>
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>
    </AppShell>
  );
}

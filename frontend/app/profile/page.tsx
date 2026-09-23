'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '../../components/layout/AppShell';
import { fetchProfile } from '../../lib/api';
import { UserProfile, CapabilityItem } from '../../types';
import { CapabilityCard } from '../../components/profile/CapabilityCard';
import { SkillDetailDrawer } from '../../components/profile/SkillDetailDrawer';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  FileCheck2,
  Check,
  Sparkles,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  GitBranch,
  Layers
} from 'lucide-react';

export default function CapabilityProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<CapabilityItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'evidence-backed' | 'explicit' | 'inferred'>('all');

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-brand-slate border-t-transparent rounded-full animate-spin" />
        </div>
      </AppShell>
    );
  }

  const explicitSkills = profile.current_capabilities.filter((s) => s.support_type === 'explicit');
  const evidenceSkills = profile.current_capabilities.filter((s) => s.support_type === 'evidence-backed');
  const inferredSkills = profile.current_capabilities.filter((s) => s.support_type === 'inferred');
  const gapSkills = profile.current_capabilities.filter((s) => s.support_type === 'gap');

  const filteredSkills = profile.current_capabilities.filter((s) => {
    if (activeTab === 'all') return true;
    return s.support_type === activeTab;
  });

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-brand-border pb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-slate">
            Capability Extraction Layer
          </span>
          <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
            Your Capability Profile
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            SkillRoute separates what you explicitly state from what your verified project evidence supports.
            This eliminates keyword hallucinations and models your genuine capability frontier.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
            {[
              { id: 'all', label: `All Capabilities (${profile.current_capabilities.length})` },
              { id: 'evidence-backed', label: `Evidence-Backed (${evidenceSkills.length})` },
              { id: 'explicit', label: `Explicit (${explicitSkills.length})` },
              { id: 'inferred', label: `Inferred (${inferredSkills.length})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-navy text-white border-brand-navy shadow-xs'
                    : 'bg-white text-slate-600 border-brand-border hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Core Capability Buckets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Explicit */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-slate" />
                <h3 className="text-sm font-bold text-brand-navy">Explicit Capabilities</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-semibold border border-blue-200">
                {explicitSkills.length} Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Skills directly referenced in operational role responsibilities and technical queries.
            </p>
            <div className="space-y-2 pt-1">
              {explicitSkills.map((skill) => (
                <CapabilityCard key={skill.id} skill={skill} onSelect={setSelectedSkill} />
              ))}
            </div>
          </div>

          {/* Evidence-Backed */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-brand-green" />
                <h3 className="text-sm font-bold text-brand-navy">Evidence-Backed</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                {evidenceSkills.length} High Conf.
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Skills verified through repository artifacts, statistical reports, and BI dashboards.
            </p>
            <div className="space-y-2 pt-1">
              {evidenceSkills.map((skill) => (
                <CapabilityCard key={skill.id} skill={skill} onSelect={setSelectedSkill} />
              ))}
            </div>
          </div>

          {/* Inferred & Identified Gaps */}
          <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-bold text-brand-navy">Inferred & Gaps</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                {inferredSkills.length + gapSkills.length} Detected
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Potential capabilities detected from code imports, or identified missing prerequisites.
            </p>
            <div className="space-y-2 pt-1">
              {inferredSkills.map((skill) => (
                <CapabilityCard key={skill.id} skill={skill} onSelect={setSelectedSkill} />
              ))}
              {gapSkills.map((skill) => (
                <CapabilityCard key={skill.id} skill={skill} onSelect={setSelectedSkill} />
              ))}
            </div>
          </div>
        </div>

        {/* Project Evidence Backing Section */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-brand-navy">
                Verified Candidate Project Evidence
              </h3>
              <p className="text-xs text-brand-muted">
                These artifacts provide empirical grounding for your capability confidence scores.
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
              3 Production Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {profile.projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-lg border border-brand-borderLight bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-brand-navy">{proj.title}</h4>
                    <span className="text-[10px] text-brand-green font-semibold flex items-center gap-1">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {proj.stack.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.2 rounded text-[10px] bg-white border border-slate-200 text-slate-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.evidence_url && (
                    <span className="text-[10px] font-mono text-brand-slate truncate block">
                      {proj.evidence_url}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Responsible AI Disclaimer */}
        <ResponsibleAIStamp />
      </div>

      {/* Interactive Detail Slide-Over Drawer */}
      <SkillDetailDrawer skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </AppShell>
  );
}

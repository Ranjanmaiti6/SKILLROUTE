'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '../../components/layout/AppShell';
import { fetchProfile } from '../../lib/api';
import { UserProfile, CapabilityItem } from '../../types';
import { SkillDetailDrawer } from '../../components/profile/SkillDetailDrawer';
import { ResponsibleAIStamp } from '../../components/shared/ResponsibleAIStamp';
import {
  Briefcase,
  Clock,
  MapPin,
  GraduationCap,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  AlertCircle,
  FileCode2,
  HelpCircle,
  FolderGit2
} from 'lucide-react';

export default function CapabilityProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<CapabilityItem | null>(null);
  const [activeCoverageSection, setActiveCoverageSection] = useState<'skills' | 'projects' | 'experience' | 'education'>('skills');

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="space-y-3 text-center">
            <div className="w-8 h-8 border-2 border-brand-navy border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs font-bold text-brand-navy uppercase tracking-wider">
              ANALYZING PROFILE
            </div>
            <div className="text-[11px] text-slate-500">
              ✓ Grounding capabilities into ESCO / O*NET taxonomy
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  // Grouped skill constellation (Phase 6 Spec)
  const coreSkills = profile.current_capabilities.filter((c) => c.group === 'core' || ['Python', 'SQL', 'Statistics', 'Data Analysis'].includes(c.name));
  const toolsSkills = profile.current_capabilities.filter((c) => c.group === 'tools' || ['Power BI', 'Excel'].includes(c.name));
  const transferableSkills = profile.current_capabilities.filter((c) => c.group === 'transferable' || ['Data Modeling', 'ETL Concepts'].includes(c.name));
  const gapSkills = profile.current_capabilities.filter((c) => c.group === 'gap' || ['dbt', 'Data Warehousing', 'Cloud Analytics'].includes(c.name));

  const getStateSymbol = (supportType: string) => {
    switch (supportType) {
      case 'evidence-backed':
        return { symbol: '✓', label: 'Evidence-backed', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'explicit':
        return { symbol: '✓', label: 'Explicit', color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'inferred':
        return { symbol: '◐', label: 'Inferred', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
      case 'gap':
      default:
        return { symbol: '○', label: 'Gap', color: 'text-amber-800 bg-amber-50 border-amber-300' };
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Top Profile Header (Phase 6 Spec) */}
        <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-brand-borderLight">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-brand-navy text-white font-extrabold text-xl flex items-center justify-center shadow-xs flex-shrink-0">
                AS
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-brand-navy tracking-tight">
                    Aarav Sharma
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                    Verified Profile
                  </span>
                </div>
                <div className="text-sm font-bold text-brand-slate">
                  Data Analyst
                </div>
                <div className="text-xs text-slate-500 font-medium pt-0.5">
                  1.5 years • Delhi NCR
                </div>
              </div>
            </div>

            {/* Primary Action: Exactly ONE primary action for Capability page (REVIEW SKILL GAPS) */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('skill-gaps-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 text-xs font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>REVIEW SKILL GAPS</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-saffron group-hover:translate-x-0.5 transition-transform" />
              </button>
              <Link
                href="/opportunities"
                className="px-4 py-2.5 text-xs font-semibold bg-white text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Explore Destinations →
              </Link>
            </div>
          </div>

          {/* CAPABILITY COVERAGE Tabs (Phase 6 Spec) */}
          <div className="pt-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
                CAPABILITY COVERAGE:
              </span>
              {[
                { id: 'skills', label: 'Technical Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'experience', label: 'Experience' },
                { id: 'education', label: 'Education' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCoverageSection(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    activeCoverageSection === tab.id
                      ? 'bg-brand-navy text-white border-brand-navy shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100 hover:border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              Click any skill node to inspect evidence, status, and transferable domains.
            </div>
          </div>
        </div>

        {/* Section 1: Technical Skills - Grouped Skill Constellation (Phase 6 Hero Feature) */}
        {activeCoverageSection === 'skills' && (
          <div className="space-y-6">
            {/* Legend Ribbon */}
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-brand-border text-xs gap-3">
              <span className="font-bold text-brand-navy text-xs uppercase tracking-wider">
                State Indicators:
              </span>
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                    ✓ Evidence-backed
                  </span>
                  <span className="text-slate-500 text-[11px]">Proved in codebase</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                    ✓ Explicit
                  </span>
                  <span className="text-slate-500 text-[11px]">Direct operational tool</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200">
                    ◐ Inferred
                  </span>
                  <span className="text-slate-500 text-[11px]">Derived knowledge bridge</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-300">
                    ○ Gap
                  </span>
                  <span className="text-slate-500 text-[11px]">Target prerequisite gap</span>
                </div>
              </div>
            </div>

            {/* 4 Grouped Constellations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* 1. CORE SKILLS */}
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-brand-borderLight">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-navy">
                      CORE SKILLS
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {coreSkills.length} Verified
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-3">
                    {coreSkills.map((skill) => {
                      const badge = getStateSymbol(skill.support_type);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => setSelectedSkill(skill)}
                          className="p-3 rounded-lg border border-brand-border hover:border-brand-navy hover:bg-slate-50/80 cursor-pointer transition-all shadow-2xs group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-brand-navy group-hover:text-brand-slate transition-colors">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                              {badge.symbol} {badge.label}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 truncate">
                            {skill.used_in || skill.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 border-t border-brand-borderLight flex items-center justify-between">
                  <span>Foundation baseline</span>
                  <span className="font-bold text-brand-navy">Ready</span>
                </div>
              </div>

              {/* 2. TOOLS */}
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-brand-borderLight">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-slate">
                      TOOLS
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {toolsSkills.length} Operational
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-3">
                    {toolsSkills.map((skill) => {
                      const badge = getStateSymbol(skill.support_type);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => setSelectedSkill(skill)}
                          className="p-3 rounded-lg border border-brand-border hover:border-brand-navy hover:bg-slate-50/80 cursor-pointer transition-all shadow-2xs group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-brand-navy group-hover:text-brand-slate transition-colors">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                              {badge.symbol} {badge.label}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 truncate">
                            {skill.used_in || skill.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 border-t border-brand-borderLight flex items-center justify-between">
                  <span>Operational stack</span>
                  <span className="font-bold text-brand-navy">Active</span>
                </div>
              </div>

              {/* 3. TRANSFERABLE */}
              <div className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-brand-borderLight">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700">
                      TRANSFERABLE
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {transferableSkills.length} Bridges
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-3">
                    {transferableSkills.map((skill) => {
                      const badge = getStateSymbol(skill.support_type);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => setSelectedSkill(skill)}
                          className="p-3 rounded-lg border border-indigo-100 bg-indigo-50/30 hover:border-indigo-400 hover:bg-indigo-50/60 cursor-pointer transition-all shadow-2xs group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-brand-navy group-hover:text-indigo-800 transition-colors">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                              {badge.symbol} {badge.label}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 truncate">
                            {skill.used_in || skill.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 border-t border-brand-borderLight flex items-center justify-between">
                  <span>Transfer efficiency</span>
                  <span className="font-bold text-indigo-700">88%</span>
                </div>
              </div>

              {/* 4. SKILL GAPS */}
              <div id="skill-gaps-section" className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-brand-borderLight">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800">
                      SKILL GAPS
                    </span>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                      {gapSkills.length} Target Gaps
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-3">
                    {gapSkills.map((skill) => {
                      const badge = getStateSymbol(skill.support_type);
                      return (
                        <div
                          key={skill.id}
                          onClick={() => setSelectedSkill(skill)}
                          className="p-3 rounded-lg border border-amber-200 bg-amber-50/30 hover:border-amber-400 hover:bg-amber-50/70 cursor-pointer transition-all shadow-2xs group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-brand-navy group-hover:text-amber-900 transition-colors">
                              {skill.name}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.color}`}>
                              {badge.symbol} {badge.label}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1 truncate">
                            {skill.used_in || skill.category}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 border-t border-brand-borderLight flex items-center justify-between">
                  <span>Curriculum effort</span>
                  <span className="font-bold text-amber-800">120 hrs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Projects Coverage Tab */}
        {activeCoverageSection === 'projects' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {profile.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white border border-brand-border rounded-xl p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Project</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {proj.id}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-brand-navy">{proj.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-brand-navy border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-brand-borderLight flex items-center justify-between text-xs text-brand-slate font-medium">
                    <span className="truncate">{proj.evidence_url}</span>
                    <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Experience Coverage Tab */}
        {activeCoverageSection === 'experience' && (
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
              Operational Work Experience
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-brand-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                DA
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-brand-navy">Data Analyst</h4>
                  <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Full-time • 1.5 years
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Delhi NCR, India • Operational Analytics Team
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Responsible for executive weekly revenue reports, PostgreSQL ad-hoc aggregations, churn cohort modeling, and Power BI operational sales dashboards used by 45 business stakeholders.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Education Coverage Tab */}
        {activeCoverageSection === 'education' && (
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-xs space-y-4 animate-fadeIn">
            <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider">
              Academic Credentials
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-brand-border flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-slate text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-brand-navy">{profile.education.degree}</h4>
                  <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Graduation: {profile.education.year}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  {profile.education.institution}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Rigorous coursework in Relational Database Management Systems (RDBMS), Data Structures, Applied Discrete Mathematics, and Probability & Statistics.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Responsible AI Disclaimer Stamp */}
        <ResponsibleAIStamp />
      </div>

      {/* Compact Skill Detail Drawer (Phase 6 Spec) */}
      <SkillDetailDrawer
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </AppShell>
  );
}

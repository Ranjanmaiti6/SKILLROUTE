import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  Route,
  Award,
  GitFork,
  CheckCircle2,
  Building2,
  GraduationCap,
  Users2,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="h-20 border-b border-brand-border bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-navy flex items-center justify-center text-white font-bold text-base shadow-sm">
              SR
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-brand-navy flex items-center gap-2">
                <span>SKILLROUTE</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold uppercase">
                  Build For Bharat 2.0
                </span>
              </div>
              <div className="text-[10px] text-brand-muted tracking-wider uppercase font-medium">
                Team ELITECORE
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="#paradigm" className="hover:text-brand-navy transition-colors">
              The Paradigm
            </Link>
            <Link href="#principles" className="hover:text-brand-navy transition-colors">
              Principles
            </Link>
            <Link href="#pipeline" className="hover:text-brand-navy transition-colors">
              Reasoning Engine
            </Link>
            <Link href="#ecosystem" className="hover:text-brand-navy transition-colors">
              Ecosystem
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-brand-navy transition-colors hidden sm:block"
            >
              Demo Profile
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-semibold bg-brand-navy text-white rounded-lg hover:bg-brand-slate transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Explore My Path</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-brand-border text-xs font-medium text-brand-navy mb-6">
          <Award className="w-3.5 h-3.5 text-brand-saffron" />
          <span>Skill-to-Opportunity Transition Intelligence Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy tracking-tight max-w-4xl mx-auto leading-tight">
          From Skills Today <br />
          <span className="text-brand-slate">to Opportunities Tomorrow.</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          SkillRoute turns your current capabilities into an evidence-backed transition plan —
          showing what to learn next, why it matters, and which opportunities it can unlock.
        </p>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold bg-brand-navy text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 group"
          >
            <span>BUILD MY PATH</span>
            <ArrowRight className="w-4 h-4 text-brand-saffron group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/profile"
            className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold bg-white text-brand-navy border border-brand-border rounded-lg hover:bg-slate-50 transition-all shadow-xs"
          >
            View Demo Profile (Aarav Sharma)
          </Link>
        </div>

        {/* Subtle Process Line */}
        <div className="mt-12 flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold tracking-wider text-slate-500 uppercase">
          <span>Current Capability</span>
          <span className="text-slate-300">→</span>
          <span>Transition Graph</span>
          <span className="text-slate-300">→</span>
          <span className="text-brand-navy font-bold">Opportunity</span>
        </div>
      </section>

      {/* Product Preview / Live Dashboard Mockup */}
      <section className="px-6 pb-20 max-w-6xl mx-auto w-full">
        <div className="bg-white border border-brand-border rounded-2xl shadow-xl overflow-hidden">
          {/* Mock Window Top Bar */}
          <div className="h-11 bg-slate-50 border-b border-brand-border flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400/80 inline-block" />
              <span className="text-[11px] font-medium text-slate-500 ml-2">
                skillroute.gov.in/transition/analytics-engineer
              </span>
            </div>
            <div className="text-[11px] text-brand-green font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded Engine Active</span>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="p-6 md:p-8 bg-slate-50/50 space-y-6">
            {/* Candidate Overview Ribbon */}
            <div className="p-4 bg-white rounded-xl border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-navy text-white font-bold text-lg flex items-center justify-center">
                  AS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-brand-navy">Aarav Sharma</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                      Data Analyst (1.5y)
                    </span>
                  </div>
                  <div className="text-xs text-brand-muted mt-0.5">
                    Delhi NCR • B.Tech IT • 3 Verified Production Projects
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-center">
                <div className="px-3 py-1.5 bg-slate-50 rounded-lg border border-brand-borderLight">
                  <div className="text-[10px] text-brand-muted uppercase font-semibold">
                    Target Transition
                  </div>
                  <div className="text-xs font-bold text-brand-navy">Analytics Engineer</div>
                </div>
                <div className="px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-[10px] text-emerald-800 uppercase font-semibold">
                    Transition Fit
                  </div>
                  <div className="text-xs font-bold text-emerald-900">82 Fit (High)</div>
                </div>
              </div>
            </div>

            {/* Transition Graph Preview Mini */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-white border border-brand-border space-y-2">
                <span className="text-[10px] font-bold uppercase text-brand-navy tracking-wider">
                  01 Proven Capability
                </span>
                <div className="font-semibold text-brand-navy">SQL & Python</div>
                <div className="text-[11px] text-brand-muted">
                  PostgreSQL window queries & Pandas pipelines
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-brand-border space-y-2">
                <span className="text-[10px] font-bold uppercase text-brand-slate tracking-wider">
                  02 Transferable Bridge
                </span>
                <div className="font-semibold text-brand-slate">Dimensional Modeling</div>
                <div className="text-[11px] text-brand-muted">
                  Kimball star schemas & enterprise marts
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-amber-300 bg-amber-50/30 space-y-2">
                <span className="text-[10px] font-bold uppercase text-amber-900 tracking-wider">
                  03 Missing Prerequisite
                </span>
                <div className="font-semibold text-amber-950">dbt Core + Warehousing</div>
                <div className="text-[11px] text-amber-800">
                  42 hours estimated learning effort
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-emerald-300 bg-emerald-50/40 space-y-2">
                <span className="text-[10px] font-bold uppercase text-emerald-900 tracking-wider">
                  04 Unlocked Opportunity
                </span>
                <div className="font-semibold text-emerald-950">Analytics Engineer</div>
                <div className="text-[11px] text-emerald-800">
                  Strong market demand in Delhi NCR / BLR
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Principles */}
      <section id="principles" className="py-16 px-6 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-slate">
              Product Philosophy
            </span>
            <h2 className="text-3xl font-extrabold text-brand-navy mt-1">
              Career Decisions Under Constraints
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every hour spent learning one skill is an hour not spent learning another.
              SkillRoute turns career movement into a constrained decision problem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-brand-border bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Understand</h3>
              <p className="text-xs font-medium text-brand-slate">&quot;What can I already do?&quot;</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                SkillRoute extracts capabilities from real project evidence and work history,
                categorizing them into explicit, evidence-supported, and inferred competencies.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-brand-border bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-brand-slate text-white flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Transition</h3>
              <p className="text-xs font-medium text-brand-slate">&quot;Where can I realistically move?&quot;</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demand does not equal accessibility. We evaluate the graph distance and prerequisite
                depth required to reach an opportunity rather than giving generic job lists.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-brand-border bg-slate-50/50 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Act</h3>
              <p className="text-xs font-medium text-brand-slate">&quot;What should I learn and prove next?&quot;</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adaptive pathways optimized under your available weekly hours. Accompanied by
                Learn → Build → Prove → Apply evidence artifacts that employers trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Pipeline: How SkillRoute Reasons */}
      <section id="pipeline" className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-slate">
            Deterministic Decision Layer
          </span>
          <h2 className="text-3xl font-extrabold text-brand-navy mt-1">
            How SkillRoute Reasons
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            SkillRoute is not simply an LLM prompt. Decisions are made through structured knowledge
            graphs, verified taxonomies, and mathematical optimization.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {[
            { step: '01', title: 'Profile', desc: 'Resume & projects' },
            { step: '02', title: 'NLP Extraction', desc: 'Entity recognition' },
            { step: '03', title: 'Normalization', desc: 'ESCO & O*NET IDs' },
            { step: '04', title: 'Capability Graph', desc: 'Prerequisite trees' },
            { step: '05', title: 'Transition Analysis', desc: 'Distance & score' },
            { step: '06', title: 'Path Optimization', desc: 'Time-budget slider' },
            { step: '07', title: 'Evidence Plan', desc: 'Learn-Build-Prove' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-brand-border flex flex-col justify-between"
            >
              <div className="text-[10px] font-bold text-brand-slate">{item.step}</div>
              <div className="font-bold text-xs text-brand-navy mt-1">{item.title}</div>
              <div className="text-[10px] text-brand-muted mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Verified Data Sources Card */}
        <div className="mt-8 p-5 bg-white rounded-xl border border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-brand-green flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-brand-navy">
                Verified Foundation Sources (Zero Invented Data)
              </h4>
              <p className="text-[11px] text-slate-600">
                Grounded in European ESCO v1.2.1, US O*NET 31.0, National Career Service (NCS) India, and WEF Future of Jobs 2025.
              </p>
            </div>
          </div>
          <Link
            href="/how-it-works"
            className="text-xs font-semibold text-brand-slate hover:underline whitespace-nowrap"
          >
            Read Methodology →
          </Link>
        </div>
      </section>

      {/* Institutional Extensions: Beyond Individual Intelligence */}
      <section id="ecosystem" className="py-16 px-6 bg-slate-100/60 border-t border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-slate">
              Scalable Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
              Beyond Individual Career Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              The same transition graph serves students, higher education, and corporate mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white border border-brand-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-slate flex items-center justify-center">
                <Users2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-brand-navy">Students & Jobseekers</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand real capability gaps, explore reachable adjacent transitions, and build
                evidence projects that stand out in screenings.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-brand-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-brand-saffron flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-brand-navy">Universities & Colleges</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare academic curriculum coverage against evolving occupational requirements and
                identify high-priority technical skills to boost placement outcomes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-brand-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-brand-green flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-brand-navy">Enterprises & GCCs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transform workforce planning from external hiring to internal mobility: reskill,
                redeploy, and optimize transition pathways across adjacent tech stacks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-white border-t border-brand-border mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-brand-navy">SKILLROUTE</span>
            <span>• Build For Bharat 2.0 Hackathon Prototype</span>
          </div>
          <div>
            Team: <strong className="text-brand-navy">ELITECORE</strong> (Ranjan Maiti • Swati • Saurabh Suman)
          </div>
          <div className="text-[11px] text-slate-400">
            From Skills Today → To Opportunities Tomorrow.
          </div>
        </div>
      </footer>
    </div>
  );
}

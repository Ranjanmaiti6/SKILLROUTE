'use client';

import React, { useState } from 'react';
import { PathwayMilestone } from '../../types';
import {
  CheckCircle2,
  Clock,
  Layers,
  ArrowDown,
  Award,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Code2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

interface PathwayTimelineProps {
  phases?: PathwayMilestone[];
  targetRoleTitle: string;
}

interface TimelineStepItem {
  id: string;
  name: string;
  phaseLabel: string;
  estimatedHours: number;
  status: 'Verified' | 'In Progress' | 'Up Next' | 'Future';
  evidenceMilestone: string;
  objectives: string[];
  resources: { name: string; type: string }[];
  isOrigin?: boolean;
  isDestination?: boolean;
}

export const PathwayTimeline: React.FC<PathwayTimelineProps> = ({ targetRoleTitle }) => {
  const [expandedStepId, setExpandedStepId] = useState<string | null>('step_modeling');

  const steps: TimelineStepItem[] = [
    {
      id: 'step_origin',
      name: 'CURRENT CAPABILITY',
      phaseLabel: 'BASELINE',
      estimatedHours: 0,
      status: 'Verified',
      evidenceMilestone: '1.5 yrs analyst experience in Delhi NCR tech company; daily SQL query workflows.',
      objectives: [
        'Descriptive reporting and KPI dashboard ownership',
        'Relational data querying and window function aggregations',
        'Cross-functional metric alignment with business partners'
      ],
      resources: [
        { name: 'Internal Sales BI Dashboards', type: 'Workplace Artifact' },
        { name: 'Production PostgreSQL Data Warehouse Queries', type: 'Verified Code' }
      ],
      isOrigin: true
    },
    {
      id: 'step_sql',
      name: 'SQL',
      phaseLabel: 'FOUNDATION',
      estimatedHours: 0,
      status: 'Verified',
      evidenceMilestone: 'Advanced SQL fluency (window functions, CTEs, self-joins) verified in repository queries.',
      objectives: [
        'Multi-table joins and subquery optimization',
        'Window functions (ROW_NUMBER, DENSE_RANK, LAG/LEAD)',
        'Aggregate queries for MRR/ARR and user cohort retention'
      ],
      resources: [
        { name: 'Aarav GitHub: sales-analytics-powerbi', type: 'Verified Repository' },
        { name: 'PostgreSQL Advanced Query Benchmark Suite', type: 'Verified Test' }
      ]
    },
    {
      id: 'step_modeling',
      name: 'Data Modeling',
      phaseLabel: 'PHASE 1',
      estimatedHours: 20,
      status: 'In Progress',
      evidenceMilestone: 'Enterprise sales & revenue dimensional model with fact_sales, dim_customers, dim_products (Kimball star schema).',
      objectives: [
        'Kimball dimensional modeling principles: Facts vs. Dimensions',
        'Surrogate keys and natural business keys',
        'Slowly Changing Dimensions (SCD Type 1 vs Type 2)',
        'ERD mapping and grain definition'
      ],
      resources: [
        { name: 'The Data Warehouse Toolkit (Ralph Kimball)', type: 'Book' },
        { name: 'dbt Learn: Dimensional Modeling Masterclass', type: 'Interactive Course' }
      ]
    },
    {
      id: 'step_dbt',
      name: 'dbt (Data Build Tool)',
      phaseLabel: 'PHASE 2',
      estimatedHours: 24,
      status: 'Up Next',
      evidenceMilestone: 'Jaffle Shop Analytics pipeline with dbt-core, modular models (staging/intermediate/marts), and automated schema tests.',
      objectives: [
        'Project configuration, profiles.yml, and ref() macros',
        'Modular SQL: staging, intermediate, and marts layer patterns',
        'Automated schema tests (unique, not_null, accepted_values, relationships)',
        'dbt documentation generation and interactive lineage graph'
      ],
      resources: [
        { name: 'dbt Fundamentals Official Certification', type: 'Hands-on Lab' },
        { name: 'Jaffle Shop Reference Pipeline (GitHub)', type: 'Open-Source Project' }
      ]
    },
    {
      id: 'step_warehousing',
      name: 'Data Warehousing',
      phaseLabel: 'PHASE 3',
      estimatedHours: 20,
      status: 'Future',
      evidenceMilestone: 'Snowflake / BigQuery staging and marts design with micro-partitioning, clustering keys, and cost pruning.',
      objectives: [
        'Cloud data warehouse architecture (Snowflake / BigQuery / Redshift)',
        'Micro-partitioning, clustering keys, and query pruning',
        'Warehouse sizing, credit utilization, and query execution plans',
        'Zero-copy cloning and time-travel querying'
      ],
      resources: [
        { name: 'Snowflake Architecture & Query Profiling Guide', type: 'Documentation' },
        { name: 'BigQuery Partitioning & Cost Optimization Patterns', type: 'Lab' }
      ]
    },
    {
      id: 'step_portfolio',
      name: 'Portfolio Evidence',
      phaseLabel: 'PHASE 4',
      estimatedHours: 20,
      status: 'Future',
      evidenceMilestone: 'End-to-end modern analytics engineering repository with CI/CD pull request tests, lineage graph, and documentation walkthrough.',
      objectives: [
        'GitHub Actions CI workflow running sqlfluff lint and dbt build on pull requests',
        'Public README documenting architectural decisions, grain, and test coverage',
        'System design walkthrough prepared for technical interview screenings'
      ],
      resources: [
        { name: 'EliteCore Evidence Plan & Template Repository', type: 'Boilerplate' },
        { name: 'GitHub Actions for dbt CI/CD Guide', type: 'Tutorial' }
      ]
    },
    {
      id: 'step_target',
      name: `TARGET: ${targetRoleTitle.toUpperCase()}`,
      phaseLabel: 'DESTINATION',
      estimatedHours: 0,
      status: 'Future',
      evidenceMilestone: '82 Transition Fit • Verified market readiness for hiring managers across Delhi NCR & Bengaluru tech hubs.',
      objectives: [
        'Demonstrated mastery of the Modern Data Stack (SQL + dbt + Snowflake)',
        'Ability to bridge raw ingestion tables into business-ready metrics',
        'Empirical code evidence eliminating traditional hiring hesitation'
      ],
      resources: [
        { name: 'ESCO 2512.3 / O*NET 15-2051.02 Taxonomy Standards', type: 'Workforce Framework' },
        { name: 'India Tech Center Analytics Engineering Benchmark 2026', type: 'Market Report' }
      ],
      isDestination: true
    }
  ];

  const getStatusBadge = (status: TimelineStepItem['status']) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>Verified</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
            <Sparkles className="w-3 h-3 text-amber-700" />
            <span>In Progress</span>
          </span>
        );
      case 'Up Next':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
            <span>Up Next</span>
          </span>
        );
      case 'Future':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            <span>Future</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* High-level Sequence Banner */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-brand-border flex items-center justify-between text-xs text-brand-navy">
        <span className="font-bold uppercase tracking-wider text-[10px] text-brand-slate">
          PREREQUISITE-AWARE SEQUENCE
        </span>
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="text-emerald-700 font-bold">2 Verified</span>
          <span className="text-slate-300">•</span>
          <span className="text-amber-700 font-bold">1 In Progress</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">3 Milestones to Target</span>
        </div>
      </div>

      {/* Structured Progression Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 ml-3 sm:ml-4 space-y-5">
        {steps.map((step, idx) => {
          const isExpanded = expandedStepId === step.id;
          const isVerified = step.status === 'Verified';
          const isInProgress = step.status === 'In Progress';
          const isTarget = step.isDestination;

          return (
            <div key={step.id} className="relative group">
              {/* Node indicator on the vertical timeline track */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all ${
                  isVerified
                    ? 'bg-emerald-600 border-white text-white shadow-xs'
                    : isInProgress
                    ? 'bg-amber-500 border-white text-white shadow-xs ring-4 ring-amber-100 animate-pulse'
                    : isTarget
                    ? 'bg-brand-navy border-brand-saffron text-white shadow-sm ring-2 ring-brand-navy/20'
                    : 'bg-white border-slate-300 text-slate-500 group-hover:border-slate-400'
                }`}
              >
                {isVerified ? '✓' : idx}
              </div>

              {/* Step Card */}
              <div
                className={`rounded-xl border transition-all ${
                  isTarget
                    ? 'bg-gradient-to-r from-blue-50/50 via-white to-emerald-50/40 border-emerald-300 shadow-xs'
                    : isInProgress
                    ? 'bg-amber-50/30 border-amber-300 shadow-xs'
                    : 'bg-white border-brand-border hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                {/* Clickable Header */}
                <div
                  onClick={() => setExpandedStepId(isExpanded ? null : step.id)}
                  className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-slate font-mono">
                        {step.phaseLabel}
                      </span>
                      {getStatusBadge(step.status)}
                    </div>
                    <h4 className="text-base font-extrabold text-brand-navy">
                      {step.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-3">
                    {step.estimatedHours > 0 && (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 text-brand-navy">
                        <Clock className="w-3.5 h-3.5 text-brand-blue" />
                        <span>{step.estimatedHours} hrs</span>
                      </span>
                    )}

                    <button
                      type="button"
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-brand-navy transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Evidence Milestone Banner */}
                <div className="px-4 sm:px-5 pb-4">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-brand-saffron flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-brand-navy text-[11px] block">
                        Evidence Milestone:
                      </span>
                      <p className="text-slate-600 text-xs leading-relaxed mt-0.5">
                        {step.evidenceMilestone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expandable Section: Learning Objectives & Recommended Resources */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 animate-fadeIn">
                    {/* Objectives */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-brand-blue" />
                        <span>Core Learning Objectives</span>
                      </div>
                      <ul className="space-y-1.5 pl-5 list-disc text-xs text-slate-600">
                        {step.objectives.map((obj, oIdx) => (
                          <li key={oIdx} className="leading-snug">
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Resources */}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-navy mb-2">
                        <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Curated Grounded Resources</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.resources.map((res, rIdx) => (
                          <div
                            key={rIdx}
                            className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                          >
                            <span className="font-medium text-brand-navy truncate">
                              {res.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono ml-2 flex-shrink-0">
                              {res.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Connecting Down Arrow between steps */}
              {idx < steps.length - 1 && (
                <div className="flex justify-center my-2 text-slate-300">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

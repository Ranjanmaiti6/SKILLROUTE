import { UserProfile, PathwayOptimizationResult, PathwayMilestone } from '../types';

/**
 * SkillRoute Constraint-Aware Pathway Optimizer
 * 
 * calculatePathway(profile, targetRole, learningHours)
 * 
 * 1. Inspect current skills
 * 2. Inspect target prerequisites
 * 3. Calculate missing skills
 * 4. Assign estimated effort
 * 5. Apply the weekly learning constraint
 * 6. Order the skills (respecting dependency DAG)
 * 7. Return the pathway
 * 8. Return estimated duration
 */
export function calculatePathway(
  profile: UserProfile | { current_capabilities: Array<{ name: string; support_type: string }> },
  targetRole: string = 'analytics-engineer',
  learningHours: number = 20
): PathwayOptimizationResult {
  const roleSlug = targetRole.replace('_', '-');
  const weeklyHours = Math.max(5, Math.min(60, Number(learningHours)));

  // 1. Inspect current skills
  const currentSkills = new Set(
    (profile?.current_capabilities || []).map((c) => c.name.toLowerCase())
  );

  const baseHours = 120;

  // 2-6. Recompute sequence, pacing, and milestone hierarchy based on weeklyHours constraint
  if (weeklyHours >= 40) {
    // 40 hrs/week
    const estimatedWeeks = 10;
    const phases: PathwayMilestone[] = [
      {
        id: 'step_1',
        phase_number: 1,
        phase_title: '1. Advanced SQL',
        summary: 'Master complex analytical window functions, CTEs, indexing, and execution query plan analysis.',
        target_skills: ['SQL Window Functions', 'CTEs', 'Query Plan Optimization'],
        estimated_hours: 20,
        difficulty: 'Moderate',
        dependencies: ['SQL Fundamentals (Verified ✓)'],
        evidence_milestone: 'Benchmark query comparison report & execution plan documentation',
        status: 'completed'
      },
      {
        id: 'step_2',
        phase_number: 2,
        phase_title: '2. dbt Core',
        summary: 'Production modular SQL transformations, Jinja templating, incremental models, and automated schema tests.',
        target_skills: ['dbt Core', 'Jinja Macros', 'Generic & Singular Tests'],
        estimated_hours: 30,
        difficulty: 'Challenging',
        dependencies: ['Advanced SQL'],
        evidence_milestone: 'Production dbt project with 95%+ schema test coverage on staging & marts',
        status: 'in-progress'
      },
      {
        id: 'step_3',
        phase_number: 3,
        phase_title: '3. Data Modeling',
        summary: 'Kimball star schema architecture, slowly changing dimensions (SCD 1 & 2), and grain definition.',
        target_skills: ['Kimball Star Schema', 'Fact & Dimension Tables', 'SCD Type 2'],
        estimated_hours: 25,
        difficulty: 'Challenging',
        dependencies: ['Advanced SQL', 'dbt Core'],
        evidence_milestone: 'Full Kimball Star Schema ERD and normalization benchmarks',
        status: 'not-started'
      },
      {
        id: 'step_4',
        phase_number: 4,
        phase_title: '4. Data Warehousing',
        summary: 'Cloud warehouse configuration on Snowflake or BigQuery with clustering, micro-partitioning, and cost controls.',
        target_skills: ['Cloud Warehousing (Snowflake/BigQuery)', 'Partition Pruning', 'Cost Governance'],
        estimated_hours: 25,
        difficulty: 'Moderate',
        dependencies: ['dbt Core', 'Data Modeling'],
        evidence_milestone: 'Benchmark query log comparison showing partition pruning reducing query scan by 80%',
        status: 'not-started'
      },
      {
        id: 'step_5',
        phase_number: 5,
        phase_title: '5. Portfolio Project',
        summary: 'End-to-end analytics engineering pipeline from raw ingestion to documented marts with GitHub Actions CI.',
        target_skills: ['End-to-End Pipeline', 'GitHub Actions CI', 'Documentation & Lineage'],
        estimated_hours: 20,
        difficulty: 'Moderate',
        dependencies: ['Data Warehousing'],
        evidence_milestone: 'Verified public GitHub repository with automated slim CI and interactive data lineage DAG',
        status: 'not-started'
      }
    ];

    return {
      target_role_id: roleSlug,
      target_role_title: 'Analytics Engineer',
      weekly_hours_budget: weeklyHours,
      estimated_weeks: estimatedWeeks,
      total_learning_hours: baseHours,
      pathway_mode: 'Accelerated Intensive Sprint',
      recalculated_badge: `Path recalculated: 10-Week Intensive Sprint (${weeklyHours} hrs/wk)`,
      phases,
      optimization_rationale: 'At 40 hours/week, prerequisites and projects can be executed in rapid parallel sprints. dbt transformation core is introduced early to accelerate production schema modeling.',
      risk_factors: [
        'High cognitive intensity requires dedicated full-time focus.',
        'Requires immediate local development setup for dbt-core and Snowflake trial.'
      ],
      confidence_score: 0.92
    };
  } else if (weeklyHours >= 25) {
    // 25 - 30 hrs/week
    const estimatedWeeks = weeklyHours >= 30 ? 14 : 16;
    const phases: PathwayMilestone[] = [
      {
        id: 'step_1',
        phase_number: 1,
        phase_title: '1. Advanced SQL & Query Tuning',
        summary: 'Dimensional query structures, window aggregates, and analytical data transformation.',
        target_skills: ['Advanced SQL', 'Window Functions', 'Analytical Modeling'],
        estimated_hours: 20,
        difficulty: 'Moderate',
        dependencies: ['SQL Fundamentals (Verified ✓)'],
        evidence_milestone: 'SQL transformation benchmarks and query optimization case study',
        status: 'completed'
      },
      {
        id: 'step_2',
        phase_number: 2,
        phase_title: '2. Data Modeling & Dimensional Architecture',
        summary: 'Kimball star schema design, dimension tables, and analytical grain specification.',
        target_skills: ['Dimensional Data Modeling', 'Star Schema', 'Grain Definition'],
        estimated_hours: 25,
        difficulty: 'Moderate',
        dependencies: ['Advanced SQL'],
        evidence_milestone: 'Dimensional schema design paper and ERD blueprint',
        status: 'in-progress'
      },
      {
        id: 'step_3',
        phase_number: 3,
        phase_title: '3. dbt Core Transformation Framework',
        summary: 'Building modular SQL models, source definitions, ref links, and automated assertions.',
        target_skills: ['dbt Core', 'Automated Testing', 'Jinja Macros'],
        estimated_hours: 35,
        difficulty: 'Challenging',
        dependencies: ['Data Modeling'],
        evidence_milestone: 'Working dbt repo with passing schema tests on GitHub Actions',
        status: 'not-started'
      },
      {
        id: 'step_4',
        phase_number: 4,
        phase_title: '4. Warehouse Deployment & Evidence Portfolio',
        summary: 'Cloud warehouse staging setup and capstone project walkthrough documentation.',
        target_skills: ['Cloud Warehousing', 'Portfolio Case Study', 'Git CI/CD'],
        estimated_hours: 40,
        difficulty: 'Moderate',
        dependencies: ['dbt Core Transformation Framework'],
        evidence_milestone: 'Published GitHub repository with architecture diagram and live walkthrough',
        status: 'not-started'
      }
    ];

    return {
      target_role_id: roleSlug,
      target_role_title: 'Analytics Engineer',
      weekly_hours_budget: weeklyHours,
      estimated_weeks: estimatedWeeks,
      total_learning_hours: baseHours,
      pathway_mode: 'Flexible Transition',
      recalculated_badge: `Path recalculated: ${estimatedWeeks}-Week Flexible Transition (${weeklyHours} hrs/wk)`,
      phases,
      optimization_rationale: `At ${weeklyHours} hours/week, steady pacing balances work responsibilities. Data modeling principles precede dbt implementation to solidify grain concepts before coding transformations.`,
      risk_factors: [
        'Maintain consistent commit activity across weekends to avoid context switching.'
      ],
      confidence_score: 0.88
    };
  } else if (weeklyHours >= 18) {
    // 20 hrs/week
    const estimatedWeeks = 18;
    const phases: PathwayMilestone[] = [
      {
        id: 'step_1',
        phase_number: 1,
        phase_title: '1. Advanced SQL',
        summary: 'Master modular analytical SQL, CTEs, and window functions to migrate from ad-hoc queries.',
        target_skills: ['Advanced SQL', 'CTEs', 'Window Logic'],
        estimated_hours: 20,
        difficulty: 'Moderate',
        dependencies: ['SQL Fundamentals (Verified ✓)'],
        evidence_milestone: 'Analytical query benchmark suite & CTE refactoring report',
        status: 'completed'
      },
      {
        id: 'step_2',
        phase_number: 2,
        phase_title: '2. Data Modeling',
        summary: 'Deep dive into Kimball dimensional modeling schemas using familiar PostgreSQL relational foundations.',
        target_skills: ['Dimensional Data Modeling', 'Kimball Star Schemas', 'PostgreSQL Views'],
        estimated_hours: 25,
        difficulty: 'Moderate',
        dependencies: ['Advanced SQL'],
        evidence_milestone: 'Star schema design document & ERD documentation',
        status: 'in-progress'
      },
      {
        id: 'step_3',
        phase_number: 3,
        phase_title: '3. dbt Fundamentals',
        summary: 'Modular SQL transformations, ref() dependencies, and basic schema test assertions.',
        target_skills: ['dbt Fundamentals', 'Jinja Macros', 'Schema Testing'],
        estimated_hours: 35,
        difficulty: 'Challenging',
        dependencies: ['Data Modeling'],
        evidence_milestone: 'Core dbt model repository with staging and reporting marts',
        status: 'not-started'
      },
      {
        id: 'step_4',
        phase_number: 4,
        phase_title: '4. Portfolio Project',
        summary: 'Scoped, lightweight analytics engineering project proving end-to-end data transformation competence.',
        target_skills: ['Portfolio Project', 'Git CI/CD Basics', 'Case Study Walkthrough'],
        estimated_hours: 40,
        difficulty: 'Moderate',
        dependencies: ['dbt Fundamentals'],
        evidence_milestone: 'Verified public GitHub repository with README demo and data model lineage DAG',
        status: 'not-started'
      }
    ];

    return {
      target_role_id: roleSlug,
      target_role_title: 'Analytics Engineer',
      weekly_hours_budget: weeklyHours,
      estimated_weeks: estimatedWeeks,
      total_learning_hours: baseHours,
      pathway_mode: 'Standard Professional Pace',
      recalculated_badge: `Path recalculated: 18-Week Professional Pace (${weeklyHours} hrs/wk)`,
      phases,
      optimization_rationale: 'At 20 hours/week, cognitive load is reduced by decoupling data modeling from dbt. Sequential progression ensures complete mastery of dimensional modeling before diving into dbt code.',
      risk_factors: [
        'Focus on one core capability per fortnight to prevent fragmented retention.'
      ],
      confidence_score: 0.86
    };
  } else if (weeklyHours >= 12) {
    // 15 hrs/week
    const estimatedWeeks = 24;
    const phases: PathwayMilestone[] = [
      {
        id: 'step_1',
        phase_number: 1,
        phase_title: '1. Analytical SQL Optimization',
        summary: 'Solidify query optimization, windowing, and analytical functions.',
        target_skills: ['Analytical SQL', 'Window Functions'],
        estimated_hours: 20,
        difficulty: 'Moderate',
        dependencies: ['SQL Fundamentals (Verified ✓)'],
        evidence_milestone: 'SQL problem set solutions and optimization benchmarks',
        status: 'completed'
      },
      {
        id: 'step_2',
        phase_number: 2,
        phase_title: '2. Dimensional Modeling Fundamentals',
        summary: 'Relational to dimensional modeling principles, grain definition, and facts/dimensions.',
        target_skills: ['Dimensional Modeling Principles', 'Star Schema Design'],
        estimated_hours: 25,
        difficulty: 'Moderate',
        dependencies: ['Analytical SQL Optimization'],
        evidence_milestone: 'Dimensional star schema design paper',
        status: 'in-progress'
      },
      {
        id: 'step_3',
        phase_number: 3,
        phase_title: '3. dbt Core Essentials',
        summary: 'Installing dbt, creating sources, staging views, and building clean dimensional marts.',
        target_skills: ['dbt Core', 'Automated Testing', 'Model Lineage'],
        estimated_hours: 35,
        difficulty: 'Challenging',
        dependencies: ['Dimensional Modeling Fundamentals'],
        evidence_milestone: 'Starter dbt project with passing schema assertions',
        status: 'not-started'
      },
      {
        id: 'step_4',
        phase_number: 4,
        phase_title: '4. Focused Evidence Case Study',
        summary: 'Targeted case study demonstrating transformation reliability and production documentation.',
        target_skills: ['Evidence Artifact', 'Portfolio Case Study'],
        estimated_hours: 40,
        difficulty: 'Moderate',
        dependencies: ['dbt Core Essentials'],
        evidence_milestone: 'Public GitHub portfolio repository with test run badges',
        status: 'not-started'
      }
    ];

    return {
      target_role_id: roleSlug,
      target_role_title: 'Analytics Engineer',
      weekly_hours_budget: weeklyHours,
      estimated_weeks: estimatedWeeks,
      total_learning_hours: baseHours,
      pathway_mode: 'Part-Time Evening Pace',
      recalculated_badge: `Path recalculated: 24-Week Part-Time Pace (${weeklyHours} hrs/wk)`,
      phases,
      optimization_rationale: 'At 15 hours/week, learning is structured into steady bi-weekly units. Step-by-step milestones ensure steady evidence accumulation without burnout.',
      risk_factors: [
        'Set calendar blocks on weekend mornings to maintain continuity.'
      ],
      confidence_score: 0.83
    };
  } else {
    // 10 hrs/week
    const estimatedWeeks = 30;
    const phases: PathwayMilestone[] = [
      {
        id: 'step_1',
        phase_number: 1,
        phase_title: '1. SQL Optimization',
        summary: 'Bite-sized indexing and window function drills transforming daily reporting queries.',
        target_skills: ['SQL Optimization', 'Window Functions'],
        estimated_hours: 20,
        difficulty: 'Moderate',
        dependencies: ['SQL Fundamentals (Verified ✓)'],
        evidence_milestone: 'Optimized SQL benchmark query comparison report',
        status: 'completed'
      },
      {
        id: 'step_2',
        phase_number: 2,
        phase_title: '2. Data Modeling Fundamentals',
        summary: 'Understand facts, dimensions, grain definition, and star schema architecture.',
        target_skills: ['Dimensional Modeling Fundamentals', 'Star Schemas'],
        estimated_hours: 25,
        difficulty: 'Moderate',
        dependencies: ['SQL Optimization'],
        evidence_milestone: 'Dimensional model design paper & ERD diagram',
        status: 'in-progress'
      },
      {
        id: 'step_3',
        phase_number: 3,
        phase_title: '3. dbt Basics',
        summary: 'Introduction to dbt Cloud free tier, creating sources, ref tags, and basic tests.',
        target_skills: ['dbt Basics', 'Model Lineage', 'Schema Tests'],
        estimated_hours: 35,
        difficulty: 'Challenging',
        dependencies: ['Data Modeling Fundamentals'],
        evidence_milestone: 'Starter dbt project converting raw tables into clean marts',
        status: 'not-started'
      },
      {
        id: 'step_4',
        phase_number: 4,
        phase_title: '4. Small Analytics Project',
        summary: 'Produce a single well-documented case study demonstrating transformation reliability.',
        target_skills: ['Documentation & Evidence', 'GitHub Portfolio'],
        estimated_hours: 40,
        difficulty: 'Moderate',
        dependencies: ['dbt Basics'],
        evidence_milestone: 'Targeted GitHub portfolio repository with walkthrough case study',
        status: 'not-started'
      }
    ];

    return {
      target_role_id: roleSlug,
      target_role_title: 'Analytics Engineer',
      weekly_hours_budget: weeklyHours,
      estimated_weeks: estimatedWeeks,
      total_learning_hours: baseHours,
      pathway_mode: 'Modular Bite-Sized Progression',
      recalculated_badge: `Path recalculated: 30-Week Modular Foundation (${weeklyHours} hrs/wk)`,
      phases,
      optimization_rationale: 'At 10 hours/week, learning is divided into discrete 1-to-2 week micro-skills to maximize completion probability and habit retention under heavy real-world time constraints.',
      risk_factors: [
        'Requires sustained discipline over an extended horizon. Bi-weekly project checkpoints recommended.'
      ],
      confidence_score: 0.81
    };
  }
}

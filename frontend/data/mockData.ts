import {
  UserProfile,
  OccupationTransition,
  TransitionGraphData,
  PathwayOptimizationResult,
  EvidenceArtifact,
  WhyThisPathData
} from '../types';

export const DEMO_PROFILE: UserProfile = {
  id: "ranjan_maiti_01",
  name: "Ranjan Maiti",
  current_role: "Data Analyst",
  experience_years: 1.5,
  location: "Delhi NCR, India",
  education: {
    degree: "B.Tech in Computer Science / Information Technology",
    institution: "Guru Gobind Singh Indraprastha University",
    year: "2024"
  },
  current_capabilities: [
    {
      id: "skill_python",
      name: "Python",
      category: "Programming & Scripting",
      confidence: "high",
      support_type: "evidence-backed",
      evidence_sources: [
        "Expense Analytics Project",
        "Python automation scripts for ETL pipelines",
        "Pandas/NumPy data cleaning in sales reports"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "Analytics Engineering",
        "Data Science",
        "ML Engineering"
      ]
    },
    {
      id: "skill_sql",
      name: "SQL",
      category: "Database & Querying",
      confidence: "high",
      support_type: "explicit",
      evidence_sources: [
        "Daily production queries on PostgreSQL & MySQL",
        "Complex multi-table aggregations and window functions",
        "Data extraction for executive weekly dashboards"
      ],
      proficiency_level: "advanced",
      transferable_domains: [
        "Analytics Engineering",
        "Data Engineering",
        "Database Architecture"
      ]
    },
    {
      id: "skill_excel",
      name: "Excel & Advanced Spreadsheets",
      category: "Analysis & Productivity",
      confidence: "high",
      support_type: "explicit",
      evidence_sources: [
        "Financial modeling spreadsheets",
        "VLOOKUP/XLOOKUP, Pivot Tables, Power Query"
      ],
      proficiency_level: "advanced",
      transferable_domains: [
        "Business Analytics",
        "Data Product Analytics"
      ]
    },
    {
      id: "skill_powerbi",
      name: "Power BI",
      category: "Business Intelligence & Reporting",
      confidence: "high",
      support_type: "evidence-backed",
      evidence_sources: [
        "Sales Analytics Dashboard (deployed to 40+ sales reps)",
        "DAX calculations for Year-over-Year revenue trends"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "BI Architecture",
        "Analytics Engineering"
      ]
    },
    {
      id: "skill_statistics",
      name: "Applied Statistics",
      category: "Mathematical Foundations",
      confidence: "medium",
      support_type: "evidence-backed",
      evidence_sources: [
        "Customer Churn exploratory statistical tests (A/B hypothesis testing)",
        "Variance and regression modeling for monthly forecasts"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "Data Science",
        "Quantitative Analytics"
      ]
    },
    {
      id: "skill_data_analysis",
      name: "Data Analysis & Synthesis",
      category: "Analytical Reasoning",
      confidence: "high",
      support_type: "explicit",
      evidence_sources: [
        "Quarterly business review decks",
        "Root cause analysis on customer drop-off metrics"
      ],
      proficiency_level: "advanced",
      transferable_domains: [
        "Data Product Analytics",
        "Analytics Engineering"
      ]
    },
    {
      id: "skill_ml",
      name: "Machine Learning Fundamentals",
      category: "AI & Advanced Analytics",
      confidence: "low",
      support_type: "inferred",
      evidence_sources: [
        "Detected via Scikit-Learn import in Customer Churn GitHub repo",
        "Logistic regression baseline experiment without production deployment"
      ],
      proficiency_level: "beginner",
      transferable_domains: [
        "Data Science",
        "ML Engineering"
      ]
    },
    {
      id: "skill_cloud",
      name: "Cloud Data Platforms (AWS/GCP/Snowflake)",
      category: "Infrastructure",
      confidence: "none",
      support_type: "gap",
      evidence_sources: [],
      proficiency_level: "none",
      transferable_domains: [
        "Data Engineering",
        "Analytics Engineering"
      ]
    }
  ],
  projects: [
    {
      id: "proj_sales_dashboard",
      title: "Sales Analytics Dashboard",
      stack: ["Power BI", "SQL", "Excel", "PostgreSQL"],
      description: "Executive dashboard tracking regional pipeline velocity, conversion rates, and churn. Used daily by 45 business stakeholders.",
      evidence_url: "github.com/ranjanmaiti/sales-analytics-powerbi",
      verified: true
    },
    {
      id: "proj_churn_analysis",
      title: "Customer Churn Analysis",
      stack: ["Python", "Pandas", "Scikit-Learn", "Matplotlib"],
      description: "Cohort analysis identifying drop-off bottlenecks in SaaS trial accounts. Included statistical significance testing and feature importance ranking.",
      evidence_url: "github.com/ranjanmaiti/customer-churn-cohorts",
      verified: true
    },
    {
      id: "proj_rev_forecast",
      title: "Revenue Forecasting Model",
      stack: ["Python", "SQL", "Statsmodels", "Excel"],
      description: "Time-series forecasting with ARIMA model to project monthly recurring revenue variance under promotional discounting scenarios.",
      evidence_url: "github.com/ranjanmaiti/mrr-revenue-forecast",
      verified: true
    }
  ],
  stated_constraints: {
    weekly_learning_hours: 40,
    target_timeline_weeks: 6,
    budget_inr: 0,
    preferred_transition_domain: "Analytics Engineering"
  },
  is_demo_profile: true
};

export const DEMO_OPPORTUNITIES: OccupationTransition[] = [
  {
    id: "analytics_engineer",
    slug: "analytics-engineer",
    title: "Analytics Engineer",
    category: "Modern Data Stack & Engineering",
    transition_accessibility: "High",
    accessibility_score: 84,
    skill_overlap_percentage: 78,
    prerequisite_coverage: "6 / 8",
    prerequisite_gap_level: "Low",
    market_signal: {
      trend: "Growing",
      direction: "up",
      regional_demand: "Strong in Delhi NCR, Bengaluru, Hyderabad",
      confidence: "High",
      freshness: "Recent (Q3 2026)",
      sources: ["ESCO 2512.3", "O*NET 15-2051.02", "NCS Tech Hubs", "WEF Future of Jobs 2025"]
    },
    estimated_learning_hours: 42,
    experience_gap: "Low",
    primary_missing_skills: [
      { id: "skill_data_modeling", name: "Dimensional Data Modeling", effort_hrs: 12, difficulty: "Medium" },
      { id: "skill_dbt", name: "dbt (Data Build Tool)", effort_hrs: 16, difficulty: "Medium" },
      { id: "skill_warehousing", name: "Cloud Data Warehousing (BigQuery/Snowflake)", effort_hrs: 8, difficulty: "Medium" },
      { id: "skill_cicd_git", name: "Version Control & CI/CD for Data", effort_hrs: 6, difficulty: "Low" }
    ],
    transferable_strengths: [
      "Advanced SQL querying & window functions",
      "Python data manipulation with Pandas",
      "Business metric definition from Power BI reports",
      "Translating stakeholder business needs into data schemas"
    ],
    rationale: "Your existing SQL, Python and data-analysis capabilities substantially reduce the transition distance. The primary gap is modern analytics engineering workflow: dimensional data modeling, dbt transformation layers, and production version-controlled pipelines."
  },
  {
    id: "data_product_analyst",
    slug: "data-product-analyst",
    title: "Data Product Analyst",
    category: "Product Analytics & Growth",
    transition_accessibility: "High",
    accessibility_score: 81,
    skill_overlap_percentage: 82,
    prerequisite_coverage: "7 / 8",
    prerequisite_gap_level: "Low",
    market_signal: {
      trend: "Growing",
      direction: "up",
      regional_demand: "High across Indian fintech, e-commerce, SaaS",
      confidence: "Medium-High",
      freshness: "Recent (Q3 2026)",
      sources: ["O*NET 15-2051.01", "NCS Product Ecosystem", "WEF 2025"]
    },
    estimated_learning_hours: 36,
    experience_gap: "Low",
    primary_missing_skills: [
      { id: "skill_product_analytics", name: "Product Instrumentation & Funnels (Mixpanel/Amplitude)", effort_hrs: 14, difficulty: "Medium" },
      { id: "skill_ab_testing", name: "Experimental Design & A/B Testing at Scale", effort_hrs: 12, difficulty: "Medium" },
      { id: "skill_user_cohorting", name: "Retention Cohort Modeling", effort_hrs: 10, difficulty: "Low" }
    ],
    transferable_strengths: [
      "Customer churn cohort analysis",
      "Advanced Excel & SQL data aggregation",
      "Executive KPI reporting & storytelling"
    ],
    rationale: "High capability overlap with your daily analytical tasks. Requires augmenting your descriptive reporting background with user-behavior telemetry and rigorous causal A/B testing methodologies."
  },
  {
    id: "data_scientist",
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Predictive Modeling & Statistical Inference",
    transition_accessibility: "Medium",
    accessibility_score: 68,
    skill_overlap_percentage: 64,
    prerequisite_coverage: "5 / 8",
    prerequisite_gap_level: "Medium",
    market_signal: {
      trend: "Stable",
      direction: "stable",
      regional_demand: "Consistent across mature engineering centers",
      confidence: "High",
      freshness: "Recent (Q3 2026)",
      sources: ["ESCO 2511.2", "O*NET 15-2051.00", "AISHE / PLFS Tech Indicators"]
    },
    estimated_learning_hours: 68,
    experience_gap: "Medium",
    primary_missing_skills: [
      { id: "skill_advanced_ml", name: "Supervised & Unsupervised Machine Learning", effort_hrs: 26, difficulty: "High" },
      { id: "skill_inferential_stats", name: "Rigorous Inferential & Bayesian Statistics", effort_hrs: 20, difficulty: "High" },
      { id: "skill_feature_eng", name: "Feature Engineering & Model Validation", effort_hrs: 14, difficulty: "Medium" },
      { id: "skill_model_deployment", name: "FastAPI Model Containerization", effort_hrs: 8, difficulty: "Medium" }
    ],
    transferable_strengths: [
      "Python scripting & exploratory data analysis",
      "Applied statistics & hypothesis testing experience",
      "Revenue forecasting regression experience"
    ],
    rationale: "A viable mid-term pathway. You possess foundational statistical literacy and Python fluency, but need rigorous mathematical depth in statistical learning theory and end-to-end model evaluation before competing for senior data science roles."
  },
  {
    id: "machine_learning_engineer",
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Applied AI Systems & Infrastructure",
    transition_accessibility: "Lower",
    accessibility_score: 51,
    skill_overlap_percentage: 49,
    prerequisite_coverage: "3 / 8",
    prerequisite_gap_level: "High",
    market_signal: {
      trend: "High Demand (High Entry Barrier)",
      direction: "up",
      regional_demand: "High demand for experienced engineers; restrictive junior intake",
      confidence: "Medium",
      freshness: "Recent (Q3 2026)",
      sources: ["O*NET 15-1252.00", "WEF 2025 Emerging Tech", "NCS Tech Hubs"]
    },
    estimated_learning_hours: 110,
    experience_gap: "High",
    primary_missing_skills: [
      { id: "skill_software_arch", name: "Software Engineering Principles & OOP in Python", effort_hrs: 30, difficulty: "High" },
      { id: "skill_mlops", name: "MLOps (Docker, Kubernetes, MLflow, CI/CD)", effort_hrs: 36, difficulty: "High" },
      { id: "skill_distributed_compute", name: "Distributed Data Processing (PySpark/Ray)", effort_hrs: 24, difficulty: "High" },
      { id: "skill_deep_learning", name: "Deep Learning Architectures (PyTorch/Transformers)", effort_hrs: 20, difficulty: "High" }
    ],
    transferable_strengths: [
      "Python programming baseline",
      "SQL database access",
      "Analytical intuition on data drift"
    ],
    rationale: "High prerequisite gap. Current capabilities provide an initial Python footing, but lack the distributed systems, container orchestration, and production engineering rigor required for MLOps and infrastructure engineering."
  },
  {
    id: "bi_solutions_architect",
    slug: "bi-solutions-architect",
    title: "BI Solutions Architect",
    category: "Enterprise Data Architecture & Reporting",
    transition_accessibility: "Medium-High",
    accessibility_score: 74,
    skill_overlap_percentage: 71,
    prerequisite_coverage: "5 / 8",
    prerequisite_gap_level: "Medium-Low",
    market_signal: {
      trend: "Stable",
      direction: "stable",
      regional_demand: "Steady across enterprise GCCs and consulting hubs in Gurgaon & Noida",
      confidence: "High",
      freshness: "Recent (Q3 2026)",
      sources: ["ESCO 2511.1", "O*NET 15-1211.00", "NCS GCC Profiles"]
    },
    estimated_learning_hours: 54,
    experience_gap: "Medium",
    primary_missing_skills: [
      { id: "skill_bi_governance", name: "Enterprise Semantic Layer & Data Governance", effort_hrs: 18, difficulty: "Medium" },
      { id: "skill_advanced_dax", name: "Advanced DAX & Tabular Model Optimization", effort_hrs: 16, difficulty: "Medium" },
      { id: "skill_security_rls", name: "Row-Level Security & Role-Based Access Controls", effort_hrs: 20, difficulty: "Medium" }
    ],
    transferable_strengths: [
      "Power BI dashboard design & DAX measures",
      "PostgreSQL query optimization",
      "Stakeholder relationship management"
    ],
    rationale: "Leverages your deep reporting and BI experience. Transition requires shifting focus from individual dashboard authoring to multi-tenant governance, enterprise security, and semantic model performance tuning."
  }
];

export const DEMO_TRANSITION_GRAPH: TransitionGraphData = {
  graph_metadata: {
    root_profile: "Data Analyst (Ranjan Maiti)",
    primary_target: "Analytics Engineer",
    taxonomy_alignment: "ESCO 1.2.1 / O*NET 31.0"
  },
  nodes: [
    {
      id: "node_current_role",
      type: "current_role",
      label: "Current: Data Analyst",
      subtitle: "1.5 yrs exp • Delhi NCR",
      category: "Current State",
      color: "navy",
      metadata: {
        verified_projects: 3,
        daily_stack: ["SQL", "Power BI", "Excel", "Python"]
      }
    },
    {
      id: "node_skill_sql",
      type: "current_capability",
      label: "SQL & Querying",
      subtitle: "Explicit • Advanced",
      category: "Current Capability",
      color: "navy",
      metadata: {
        esco_code: "e8f7a9d0",
        evidence: "PostgreSQL & MySQL daily production queries",
        overlap_weight: 0.35
      }
    },
    {
      id: "node_skill_python",
      type: "current_capability",
      label: "Python & Pandas",
      subtitle: "Evidence-Backed • Interm.",
      category: "Current Capability",
      color: "navy",
      metadata: {
        esco_code: "984b912c",
        evidence: "Expense Analytics + Customer Churn",
        overlap_weight: 0.25
      }
    },
    {
      id: "node_skill_stats",
      type: "current_capability",
      label: "Applied Statistics",
      subtitle: "Evidence-Backed • Interm.",
      category: "Current Capability",
      color: "navy",
      metadata: {
        esco_code: "33445566",
        evidence: "A/B hypothesis & ARIMA forecasting",
        overlap_weight: 0.18
      }
    },
    {
      id: "node_trans_data_modeling",
      type: "transferable_capability",
      label: "Dimensional Data Modeling",
      subtitle: "Star/Snowflake Schema Design",
      category: "Transferable Bridge",
      color: "slate",
      metadata: {
        prerequisite_depth: 1,
        transfer_source: "SQL & Reporting Schema logic",
        learning_cost_hrs: 12,
        transfer_efficiency: 0.88
      }
    },
    {
      id: "node_trans_analytics_eng",
      type: "transferable_capability",
      label: "Analytics Engineering Paradigm",
      subtitle: "Version-controlled data transformations",
      category: "Transferable Bridge",
      color: "slate",
      metadata: {
        prerequisite_depth: 2,
        transfer_source: "SQL + Python workflow automation",
        learning_cost_hrs: 14,
        transfer_efficiency: 0.82
      }
    },
    {
      id: "node_prereq_dbt",
      type: "missing_prerequisite",
      label: "dbt (Data Build Tool)",
      subtitle: "Modular SQL & automated testing",
      category: "Missing Prerequisite",
      color: "amber",
      metadata: {
        status: "In Progress",
        effort_hrs: 16,
        priority: "P0 Critical",
        evidence_project: "Jaffle Shop Analytics Pipeline with dbt-core"
      }
    },
    {
      id: "node_prereq_warehouse",
      type: "missing_prerequisite",
      label: "Cloud Data Warehousing",
      subtitle: "BigQuery / Snowflake partitioning",
      category: "Missing Prerequisite",
      color: "amber",
      metadata: {
        status: "Not Started",
        effort_hrs: 8,
        priority: "P1 High",
        evidence_project: "Snowflake staging and marts design"
      }
    },
    {
      id: "node_prereq_cicd",
      type: "missing_prerequisite",
      label: "Data CI/CD & Git Actions",
      subtitle: "Automated PR testing & linting",
      category: "Missing Prerequisite",
      color: "amber",
      metadata: {
        status: "Not Started",
        effort_hrs: 6,
        priority: "P2 Standard",
        evidence_project: "GitHub Actions slim CI on pull requests"
      }
    },
    {
      id: "node_target_role",
      type: "target_role",
      label: "Target: Analytics Engineer",
      subtitle: "78% overlap • 42 hrs • Strong Demand",
      category: "Target Opportunity",
      color: "emerald",
      metadata: {
        role_id: "analytics_engineer",
        market_readiness: "Feasible in 4–6 weeks @ 40h/week",
        regional_signals: "High demand in Delhi NCR / BLR"
      }
    }
  ],
  edges: [
    { from: "node_current_role", to: "node_skill_sql", label: "exhibits" },
    { from: "node_current_role", to: "node_skill_python", label: "exhibits" },
    { from: "node_current_role", to: "node_skill_stats", label: "exhibits" },
    { from: "node_skill_sql", to: "node_trans_data_modeling", label: "enables (0.88)" },
    { from: "node_skill_python", to: "node_trans_analytics_eng", label: "bridges (0.82)" },
    { from: "node_trans_data_modeling", to: "node_prereq_dbt", label: "prerequisite for" },
    { from: "node_trans_analytics_eng", to: "node_prereq_warehouse", label: "requires" },
    { from: "node_trans_analytics_eng", to: "node_prereq_cicd", label: "requires" },
    { from: "node_prereq_dbt", to: "node_target_role", label: "unlocks" },
    { from: "node_prereq_warehouse", to: "node_target_role", label: "satisfies JD" },
    { from: "node_prereq_cicd", to: "node_target_role", label: "proves readiness" }
  ]
};

export const DEMO_WHY_THIS_PATH: WhyThisPathData = {
  target_role_id: "analytics_engineer",
  target_role_title: "Analytics Engineer",
  evidence_metrics: {
    skill_overlap_percentage: 78,
    transferable_capability_level: "High",
    prerequisite_coverage: "6 / 8",
    market_signal: "Strong (Growing in Tier-1 Indian tech centers)",
    estimated_learning_effort: "42 hours",
    experience_gap: "Low (1.5 years analytical foundation is recognized)",
    confidence: "High (Evidence-grounded)",
    data_freshness: "Recent (Taxonomy aligned to Q3 2026)"
  },
  grounded_narrative: (
    "Your existing SQL, Python and data-analysis capabilities substantially reduce the transition distance. " +
    "The main missing layer is modern analytics engineering workflow: dimensional data modeling, dbt transformation layers, " +
    "and production version-controlled pipelines."
  ),
  assumptions: [
    "User has working familiarity with git version control or can acquire basic PR skills in <= 6 hours.",
    "User has administrative access to install dbt-core locally or run dbt Cloud free tier.",
    "Weekly learning budget constraint is realistically sustained over the projected weeks."
  ],
  alternatives: [
    {
      role_id: "data_product_analyst",
      title: "Data Product Analyst",
      reason: "Higher initial skill overlap (82%) with less engineering infrastructure requirements, but relies heavier on product metrics and experimentation."
    },
    {
      role_id: "data_scientist",
      title: "Data Scientist",
      reason: "Lower immediate overlap (64%) and higher learning effort (68 hours), requiring advanced statistical modeling depth."
    }
  ],
  governance_notice: "SkillRoute does not guarantee employment. Recommendations are evidence-based estimates under stated constraints."
};

export const DEMO_EVIDENCE_ITEMS: EvidenceArtifact[] = [
  {
    id: "ev_dbt",
    skill_id: "skill_dbt",
    skill_name: "dbt (Data Build Tool)",
    category: "Core Transformation Engine",
    status: "in-progress",
    learn: "Master dbt core architecture: ref() dependencies, sources, snapshots, and generic schema tests (unique, not_null, accepted_values).",
    build: "Develop 'Jaffle Shop Analytics': an end-to-end transformation warehouse turning raw orders & customers into dimensional marts.",
    prove: "GitHub repository with passing dbt-expectations test suites, auto-generated documentation, and lineage DAG diagram.",
    apply: "Showcase in technical screenings to prove production-ready modular SQL workflows.",
    repository_link: "https://github.com/ranjanmaiti/jaffle-shop-dbt-analytics",
    verification_notes: "12 models configured; 18 automated schema tests passing in GitHub Actions CI."
  },
  {
    id: "ev_data_modeling",
    skill_id: "skill_data_modeling",
    skill_name: "Dimensional Data Modeling",
    category: "Data Architecture",
    status: "completed",
    learn: "Understand Kimball star schemas, degenerate dimensions, surrogate keys, and slowly changing dimensions (SCD Type 1 & 2).",
    build: "Architect an enterprise sales and revenue dimensional model with fact_sales, dim_customers, and dim_products.",
    prove: "Full ERD diagram, normalization benchmarks, and query execution plan analysis proving reduced scan costs.",
    apply: "Demonstrates architectural rigor during system design interviews.",
    repository_link: "https://github.com/ranjanmaiti/dimensional-modeling-star-schema",
    verification_notes: "ERD verified against O*NET 15-2051.02 design competencies."
  },
  {
    id: "ev_warehouse",
    skill_id: "skill_warehousing",
    skill_name: "Cloud Data Warehousing (BigQuery / Snowflake)",
    category: "Storage & Compute Infrastructure",
    status: "not-started",
    learn: "Clustering, micro-partitioning, credit optimization, and warehouse sizing principles.",
    build: "Configure multi-tier staging, intermediate, and reporting marts on Google BigQuery / Snowflake trial.",
    prove: "Benchmark query log comparison showing partition pruning reducing query scan from 4.2GB to 85MB.",
    apply: "Validates cloud fluency and cost-conscious data platform engineering.",
    repository_link: undefined,
    verification_notes: "Pending execution in Phase 03."
  },
  {
    id: "ev_cicd",
    skill_id: "skill_cicd_git",
    skill_name: "Version Control & Data CI/CD",
    category: "Engineering Rigor",
    status: "not-started",
    learn: "GitHub Actions for data teams: sqlfluff linting, automated dbt compile, and staging environment pull request previews.",
    build: "Automated workflow triggering slim CI runs on every pull request targeting the main branch.",
    prove: "Passing GitHub Actions run badge on repository and branch protection rule enforcement.",
    apply: "Separates modern analytics engineers from traditional BI dashboard creators.",
    repository_link: undefined,
    verification_notes: "Scheduled for final portfolio packaging."
  }
];

export function computeLocalPathway(weeklyHours: number): PathwayOptimizationResult {
  const baseHours = 42;

  if (weeklyHours >= 60) {
    return {
      target_role_id: "analytics_engineer",
      target_role_title: "Analytics Engineer",
      weekly_hours_budget: weeklyHours,
      estimated_weeks: 3,
      total_learning_hours: baseHours,
      pathway_mode: "High-Intensity Sprint",
      recalculated_badge: "Path recalculated: 3-Week Accelerated Sprint (60 hrs/wk)",
      optimization_rationale: "At 60 hours/week, prerequisites and projects can be executed in full-time parallel sprints. Deep-dive into advanced dbt testing and multi-layer data warehouse schemas.",
      risk_factors: [
        "High weekly cognitive load; best suited for individuals on full-time transition sabbatical.",
        "Requires immediate local environment configuration for dbt-core and PostgreSQL."
      ],
      confidence_score: 0.92,
      phases: [
        {
          id: "phase_1",
          phase_number: 1,
          phase_title: "Foundations & Dimensional Architecture",
          summary: "Rapid mastering of Kimball star schema modeling and advanced analytical SQL window functions.",
          target_skills: ["SQL Window Functions", "Kimball Dimensional Modeling", "Snowflake Schemas"],
          estimated_hours: 12,
          difficulty: "Moderate",
          dependencies: ["SQL", "Relational Database Basics"],
          evidence_milestone: "Full Kimball Star Schema ERD for E-commerce Warehouse",
          status: "completed"
        },
        {
          id: "phase_2",
          phase_number: 2,
          phase_title: "dbt Transformation Core & Testing",
          summary: "Production dbt project: source freshness, staging views, incremental marts, and custom generic tests.",
          target_skills: ["dbt Core", "Jinja & Macros", "dbt Tests & Docs"],
          estimated_hours: 18,
          difficulty: "Challenging",
          dependencies: ["Dimensional Modeling", "Git"],
          evidence_milestone: "Production dbt project with 95%+ test coverage on models",
          status: "in-progress"
        },
        {
          id: "phase_3",
          phase_number: 3,
          phase_title: "Warehouse Deployment & CI/CD Pipeline",
          summary: "Deploy on BigQuery/Snowflake with automated GitHub Actions PR linting and slim CI runs.",
          target_skills: ["Cloud Data Warehousing", "GitHub Actions CI/CD", "Data Quality Governance"],
          estimated_hours: 12,
          difficulty: "Moderate",
          dependencies: ["dbt Core"],
          evidence_milestone: "Live automated CI/CD pipeline building PR staging tables",
          status: "not-started"
        }
      ]
    };
  } else if (weeklyHours >= 40) {
    return {
      target_role_id: "analytics_engineer",
      target_role_title: "Analytics Engineer",
      weekly_hours_budget: weeklyHours,
      estimated_weeks: 6,
      total_learning_hours: baseHours,
      pathway_mode: "Standard Professional Transition",
      recalculated_badge: "Path recalculated: 6-Week Standard Pathway (40 hrs/wk)",
      optimization_rationale: "Recommended optimal path balancing work schedule with high-retention practice. Sequential progression ensures complete mastery of dbt before warehouse deployment.",
      risk_factors: [
        "Completing dbt tests requires solid understanding of grain definition in Phase 1.",
        "Warehouse compute costs are minimized by using BigQuery free tier or Snowflake trial."
      ],
      confidence_score: 0.89,
      phases: [
        {
          id: "phase_1",
          phase_number: 1,
          phase_title: "Phase 01: Strengthen Foundations",
          summary: "Solidify dimensional modeling concepts and migrate operational queries into analytical transformations.",
          target_skills: ["Dimensional Data Modeling", "SQL Query Optimization"],
          estimated_hours: 12,
          difficulty: "Moderate",
          dependencies: ["Current SQL Skills"],
          evidence_milestone: "Dimensional schema design document & SQL transformation benchmarks",
          status: "completed"
        },
        {
          id: "phase_2",
          phase_number: 2,
          phase_title: "Phase 02: Build New Capability (dbt Core)",
          summary: "Learn dbt models, modular SQL, ref() dependencies, and automated schema tests.",
          target_skills: ["dbt Core", "Analytics Engineering Workflow", "Jinja Templating"],
          estimated_hours: 16,
          difficulty: "Challenging",
          dependencies: ["Dimensional Data Modeling"],
          evidence_milestone: "Multi-tier dbt project transforming raw events into clean marts",
          status: "in-progress"
        },
        {
          id: "phase_3",
          phase_number: 3,
          phase_title: "Phase 03: Create Evidence (Warehouse Project)",
          summary: "Build an end-to-end data pipeline connected to BigQuery or Snowflake with automated data contracts.",
          target_skills: ["Cloud Warehousing (BigQuery/Snowflake)", "Data Contracts"],
          estimated_hours: 8,
          difficulty: "Moderate",
          dependencies: ["dbt Core"],
          evidence_milestone: "Public GitHub repository with pipeline architecture diagram",
          status: "not-started"
        },
        {
          id: "phase_4",
          phase_number: 4,
          phase_title: "Phase 04: Prove Readiness & Portfolio",
          summary: "Package the warehouse project with technical documentation, walkthrough video, and CI/CD validation.",
          target_skills: ["Git CI/CD", "Portfolio Artifact Creation", "Case Study Walkthrough"],
          estimated_hours: 6,
          difficulty: "Low",
          dependencies: ["Warehouse Project"],
          evidence_milestone: "Verified portfolio case study ready for employer submission",
          status: "not-started"
        }
      ]
    };
  } else if (weeklyHours >= 25) {
    return {
      target_role_id: "analytics_engineer",
      target_role_title: "Analytics Engineer",
      weekly_hours_budget: weeklyHours,
      estimated_weeks: 8,
      total_learning_hours: baseHours,
      pathway_mode: "Flexible Transition",
      recalculated_badge: "Path recalculated: 8-Week Flexible Pathway (30 hrs/wk)",
      optimization_rationale: "Allows steady pacing alongside full-time responsibilities. Divides project implementation into two manageable modular blocks.",
      risk_factors: [
        "Maintain consistent commit activity across weekends to avoid context switching."
      ],
      confidence_score: 0.86,
      phases: [
        {
          id: "phase_1",
          phase_number: 1,
          phase_title: "Phase 01: Foundations & SQL Modernization",
          summary: "Dimensional data modeling and SQL query tuning.",
          target_skills: ["Dimensional Data Modeling", "SQL Tuning"],
          estimated_hours: 12,
          difficulty: "Moderate",
          dependencies: ["SQL"],
          evidence_milestone: "Schema architecture blueprint",
          status: "completed"
        },
        {
          id: "phase_2",
          phase_number: 2,
          phase_title: "Phase 02: dbt Fundamentals & Project Setup",
          summary: "Set up dbt-core and transform transactional data into dimensional facts and dims.",
          target_skills: ["dbt Core", "Automated Testing"],
          estimated_hours: 16,
          difficulty: "Challenging",
          dependencies: ["Dimensional Modeling"],
          evidence_milestone: "Working dbt repo with unit tests",
          status: "in-progress"
        },
        {
          id: "phase_3",
          phase_number: 3,
          phase_title: "Phase 03: Warehouse Project & Documentation",
          summary: "Build cloud warehouse instance and document portfolio project.",
          target_skills: ["Cloud Warehousing", "Portfolio Case Study"],
          estimated_hours: 14,
          difficulty: "Moderate",
          dependencies: ["dbt Core"],
          evidence_milestone: "Published GitHub repository and project walkthrough",
          status: "not-started"
        }
      ]
    };
  } else if (weeklyHours >= 18) {
    return {
      target_role_id: "analytics_engineer",
      target_role_title: "Analytics Engineer",
      weekly_hours_budget: weeklyHours,
      estimated_weeks: 10,
      total_learning_hours: baseHours,
      pathway_mode: "Part-Time Evening Pace",
      recalculated_badge: "Path recalculated: 10-Week Part-Time Pathway (20 hrs/wk)",
      optimization_rationale: "At 20 hours/week, cognitive load is reduced by decoupling data modeling from dbt. Smaller bite-sized milestones prevent burnout while maintaining evidence momentum.",
      risk_factors: [
        "Focus on one core capability per fortnight to prevent fragmented retention."
      ],
      confidence_score: 0.84,
      phases: [
        {
          id: "phase_1",
          phase_number: 1,
          phase_title: "Phase 01: Data Modeling Mastery",
          summary: "Deep dive into Kimball dimensional modeling schemas using familiar PostgreSQL database.",
          target_skills: ["Dimensional Data Modeling", "PostgreSQL Views"],
          estimated_hours: 12,
          difficulty: "Moderate",
          dependencies: ["Current SQL"],
          evidence_milestone: "Star schema design & ERD documentation",
          status: "completed"
        },
        {
          id: "phase_2",
          phase_number: 2,
          phase_title: "Phase 02: SQL Optimization & CTEs",
          summary: "Transitioning from ad-hoc queries to modular Common Table Expressions and window logic.",
          target_skills: ["SQL Optimization", "Window Functions"],
          estimated_hours: 8,
          difficulty: "Low",
          dependencies: ["SQL"],
          evidence_milestone: "Benchmark query comparison report",
          status: "in-progress"
        },
        {
          id: "phase_3",
          phase_number: 3,
          phase_title: "Phase 03: dbt Fundamentals",
          summary: "Incremental introduction to dbt models, ref tags, and basic schema test assertions.",
          target_skills: ["dbt Core Basics", "Jinja Macros"],
          estimated_hours: 14,
          difficulty: "Challenging",
          dependencies: ["Data Modeling Mastery"],
          evidence_milestone: "Core dbt model repository",
          status: "not-started"
        },
        {
          id: "phase_4",
          phase_number: 4,
          phase_title: "Phase 04: Focused Evidence Project",
          summary: "Scoped, lightweight analytics engineering project proving end-to-end data transformation competence.",
          target_skills: ["Portfolio Project", "Git Actions Basics"],
          estimated_hours: 8,
          difficulty: "Moderate",
          dependencies: ["dbt Fundamentals"],
          evidence_milestone: "Verified public GitHub repository with README demo",
          status: "not-started"
        }
      ]
    };
  } else {
    return {
      target_role_id: "analytics_engineer",
      target_role_title: "Analytics Engineer",
      weekly_hours_budget: weeklyHours,
      estimated_weeks: 18,
      total_learning_hours: baseHours,
      pathway_mode: "Bite-Sized Modular Progression",
      recalculated_badge: "Path recalculated: 18-Week Steady Foundation (10 hrs/wk)",
      optimization_rationale: "At 10 hours/week, learning is structured into discrete 1-to-2 week micro-skills to maximize completion probability under heavy constraint.",
      risk_factors: [
        "Requires discipline over an extended 4-month horizon. Set bi-weekly checkpoints."
      ],
      confidence_score: 0.81,
      phases: [
        {
          id: "phase_1",
          phase_number: 1,
          phase_title: "Phase 01: Relational to Dimensional Modeling",
          summary: "Understand facts, dimensions, slowly changing dimensions (SCD), and grain definition.",
          target_skills: ["Dimensional Modeling Principles"],
          estimated_hours: 10,
          difficulty: "Moderate",
          dependencies: ["SQL Basics"],
          evidence_milestone: "Dimensional model design paper",
          status: "completed"
        },
        {
          id: "phase_2",
          phase_number: 2,
          phase_title: "Phase 02: Modern Analytical SQL",
          summary: "Advanced aggregations, windowing, and analytical functions.",
          target_skills: ["Advanced SQL"],
          estimated_hours: 8,
          difficulty: "Moderate",
          dependencies: ["SQL Basics"],
          evidence_milestone: "SQL problem set solutions",
          status: "in-progress"
        },
        {
          id: "phase_3",
          phase_number: 3,
          phase_title: "Phase 03: dbt Core Primer",
          summary: "Installing dbt, creating sources, and building your first model.",
          target_skills: ["dbt Basics"],
          estimated_hours: 12,
          difficulty: "Challenging",
          dependencies: ["Dimensional Modeling"],
          evidence_milestone: "Starter dbt project",
          status: "not-started"
        },
        {
          id: "phase_4",
          phase_number: 4,
          phase_title: "Phase 04: Targeted Evidence Artifact",
          summary: "Produce a single well-documented case study demonstrating transformation reliability.",
          target_skills: ["Documentation & Evidence"],
          estimated_hours: 12,
          difficulty: "Moderate",
          dependencies: ["dbt Core Primer"],
          evidence_milestone: "GitHub portfolio repository",
          status: "not-started"
        }
      ]
    };
  }
}

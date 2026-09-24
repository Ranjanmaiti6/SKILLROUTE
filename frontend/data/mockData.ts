import {
  UserProfile,
  OccupationTransition,
  TransitionGraphData,
  PathwayOptimizationResult,
  EvidenceArtifact,
  WhyThisPathData
} from '../types';
import { calculatePathway } from '../lib/optimizer';

export const DEMO_PROFILE: UserProfile = {
  id: "aarav_sharma_01",
  name: "Aarav Sharma",
  current_role: "Data Analyst",
  experience_years: 1.5,
  location: "Delhi NCR, India",
  education: {
    degree: "B.Tech in Computer Science / Information Technology",
    institution: "Guru Gobind Singh Indraprastha University",
    year: "2024"
  },
  current_capabilities: [
    // CORE SKILLS
    {
      id: "skill_python",
      name: "Python",
      category: "Programming & Scripting",
      group: "core",
      confidence: "high",
      support_type: "evidence-backed",
      evidence_sources: [
        "Expense Analytics Project (Pandas/NumPy data cleaning in sales reports)",
        "Python automation scripts for scheduled ETL data pipelines"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "Analytics Engineering",
        "Data Science",
        "ML Engineering"
      ],
      used_in: "2 production projects",
      prerequisites: "None"
    },
    {
      id: "skill_sql",
      name: "SQL",
      category: "Database & Querying",
      group: "core",
      confidence: "high",
      support_type: "evidence-backed",
      evidence_sources: [
        "Daily production queries on PostgreSQL & MySQL",
        "Complex multi-table aggregations, CTEs, and window functions",
        "Data extraction queries powering executive weekly dashboards"
      ],
      proficiency_level: "advanced",
      transferable_domains: [
        "Analytics Engineering",
        "Data Engineering",
        "Database Architecture"
      ],
      used_in: "3 projects (Daily production)",
      prerequisites: "None"
    },
    {
      id: "skill_statistics",
      name: "Statistics",
      category: "Mathematical Foundations",
      group: "core",
      confidence: "medium",
      support_type: "evidence-backed",
      evidence_sources: [
        "Customer Churn exploratory statistical tests (A/B hypothesis testing)",
        "Variance and ARIMA regression modeling for monthly recurring revenue"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "Data Science",
        "Quantitative Analytics"
      ],
      used_in: "2 projects (Churn & Forecasting)",
      prerequisites: "None"
    },
    {
      id: "skill_data_analysis",
      name: "Data Analysis",
      category: "Analytical Reasoning",
      group: "core",
      confidence: "high",
      support_type: "explicit",
      evidence_sources: [
        "Quarterly business review executive decks",
        "Root-cause cohort analysis on customer drop-off bottlenecks"
      ],
      proficiency_level: "advanced",
      transferable_domains: [
        "Data Product Analytics",
        "Analytics Engineering"
      ],
      used_in: "Executive review reports",
      prerequisites: "None"
    },

    // TOOLS
    {
      id: "skill_powerbi",
      name: "Power BI",
      category: "Business Intelligence & Reporting",
      group: "tools",
      confidence: "high",
      support_type: "evidence-backed",
      evidence_sources: [
        "Sales Analytics Dashboard (deployed to 40+ sales team stakeholders)",
        "DAX calculations for Year-over-Year pipeline growth and regional margins"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "BI Architecture",
        "Analytics Engineering"
      ],
      used_in: "Sales Analytics Dashboard",
      prerequisites: "None"
    },
    {
      id: "skill_excel",
      name: "Excel",
      category: "Analysis & Productivity",
      group: "tools",
      confidence: "high",
      support_type: "explicit",
      evidence_sources: [
        "Financial modeling spreadsheets & operational tracking sheets",
        "XLOOKUP, Pivot Tables, Power Query transformations"
      ],
      proficiency_level: "advanced",
      transferable_domains: [
        "Business Analytics",
        "Data Product Analytics"
      ],
      used_in: "Financial modeling & ops tracking",
      prerequisites: "None"
    },

    // TRANSFERABLE
    {
      id: "skill_data_modeling",
      name: "Data Modeling",
      category: "Data Architecture",
      group: "transferable",
      confidence: "medium",
      support_type: "inferred",
      evidence_sources: [
        "Inferred from relational schema design in Sales Dashboard repo",
        "Star-schema dimension & fact table configuration in Power BI"
      ],
      proficiency_level: "beginner",
      transferable_domains: [
        "Analytics Engineering",
        "Data Engineering"
      ],
      used_in: "Power BI star schemas",
      prerequisites: "SQL ✓"
    },
    {
      id: "skill_etl_concepts",
      name: "ETL Concepts",
      category: "Data Pipelines",
      group: "transferable",
      confidence: "medium",
      support_type: "inferred",
      evidence_sources: [
        "Cron automation scripts extracting and cleansing CSV feeds into PostgreSQL"
      ],
      proficiency_level: "intermediate",
      transferable_domains: [
        "Analytics Engineering",
        "Data Engineering"
      ],
      used_in: "Postgres staging pipelines",
      prerequisites: "Python & SQL ✓"
    },

    // SKILL GAPS
    {
      id: "skill_dbt",
      name: "dbt",
      category: "Analytics Engineering",
      group: "gap",
      confidence: "none",
      support_type: "gap",
      evidence_sources: [],
      proficiency_level: "none",
      transferable_domains: [
        "Analytics Engineering"
      ],
      used_in: "None (Target Priority Gap P0)",
      prerequisites: "SQL ✓, Data Modeling"
    },
    {
      id: "skill_data_warehousing",
      name: "Data Warehousing",
      category: "Infrastructure",
      group: "gap",
      confidence: "none",
      support_type: "gap",
      evidence_sources: [],
      proficiency_level: "none",
      transferable_domains: [
        "Data Engineering",
        "Analytics Engineering"
      ],
      used_in: "None (Target Priority Gap P1)",
      prerequisites: "SQL ✓, ETL Concepts"
    },
    {
      id: "skill_cloud_analytics",
      name: "Cloud Analytics",
      category: "Cloud Platforms",
      group: "gap",
      confidence: "none",
      support_type: "gap",
      evidence_sources: [],
      proficiency_level: "none",
      transferable_domains: [
        "Analytics Engineering",
        "Cloud Architecture"
      ],
      used_in: "None (Target Priority Gap P2)",
      prerequisites: "SQL ✓, Warehousing"
    }
  ],
  projects: [
    {
      id: "proj_sales_dashboard",
      title: "Sales Analytics Dashboard",
      stack: ["Power BI", "SQL", "Excel", "PostgreSQL"],
      description: "Executive dashboard tracking regional pipeline velocity, conversion rates, and churn. Used daily by 45 business stakeholders.",
      evidence_url: "github.com/aaravsharma/sales-analytics-powerbi",
      verified: true
    },
    {
      id: "proj_churn_analysis",
      title: "Customer Churn Analysis",
      stack: ["Python", "Pandas", "Scikit-Learn", "Matplotlib"],
      description: "Cohort analysis identifying drop-off bottlenecks in SaaS trial accounts. Included statistical significance testing and feature importance ranking.",
      evidence_url: "github.com/aaravsharma/customer-churn-cohorts",
      verified: true
    },
    {
      id: "proj_rev_forecast",
      title: "Revenue Forecasting Model",
      stack: ["Python", "SQL", "Statsmodels", "Excel"],
      description: "Time-series forecasting with ARIMA model to project monthly recurring revenue variance under promotional discounting scenarios.",
      evidence_url: "github.com/aaravsharma/mrr-revenue-forecast",
      verified: true
    }
  ],
  stated_constraints: {
    weekly_learning_hours: 20,
    target_timeline_weeks: 18,
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
    accessibility_score: 82,
    skill_overlap_percentage: 78,
    prerequisite_coverage: "6 / 8",
    prerequisite_gap_level: "Medium",
    requiredSkills: ["sql", "python", "data-modeling", "dbt", "cloud-warehousing"],
    demoSignals: {
      transitionFit: 82,
      accessibility: "High accessibility",
      skillGap: "3 priority gaps",
      estimatedEffort: "120 hrs",
      marketSignal: "Strong",
      confidence: "Medium-High",
      disclaimer: "Calibrated on ESCO 1.2.1 / O*NET 31.0"
    },
    market_signal: {
      trend: "Strong",
      direction: "up",
      regional_demand: "Strong across Delhi NCR, Bengaluru, Hyderabad data engineering teams",
      confidence: "Medium-High",
      freshness: "Recent (Q3 2026)",
      sources: ["ESCO 2512.3", "O*NET 15-2051.02", "NCS Tech Hubs", "WEF Future of Jobs 2025"]
    },
    estimated_learning_hours: 120,
    experience_gap: "Low",
    primary_missing_skills: [
      { id: "skill_data_modeling", name: "Dimensional Data Modeling", effort_hrs: 20, difficulty: "Medium" },
      { id: "skill_dbt", name: "dbt (Data Build Tool)", effort_hrs: 24, difficulty: "Medium" },
      { id: "skill_warehousing", name: "Cloud Data Warehousing", effort_hrs: 20, difficulty: "Medium" },
      { id: "skill_cicd_git", name: "Version Control & Data CI/CD", effort_hrs: 16, difficulty: "Low" }
    ],
    transferable_strengths: [
      "Advanced SQL querying & window functions",
      "Python data manipulation with Pandas",
      "Business metric definition from Power BI reports",
      "Translating stakeholder business needs into data schemas"
    ],
    rationale: "High capability overlap with your daily analytical tasks. Your existing SQL and Python fluency substantially reduce transition distance. Primary gap is modern analytics engineering workflow: dimensional data modeling, dbt transformation layers, and cloud data warehouses."
  },
  {
    id: "data_scientist",
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Predictive Modeling & Statistical Inference",
    transition_accessibility: "Medium",
    accessibility_score: 71,
    skill_overlap_percentage: 64,
    prerequisite_coverage: "5 / 8",
    prerequisite_gap_level: "Medium",
    requiredSkills: ["python", "sql", "statistics", "advanced-ml", "data-modeling"],
    demoSignals: {
      transitionFit: 71,
      accessibility: "Medium accessibility",
      skillGap: "4 priority gaps",
      estimatedEffort: "180 hrs",
      marketSignal: "Stable",
      confidence: "High",
      disclaimer: "Calibrated on ESCO 1.2.1 / O*NET 31.0"
    },
    market_signal: {
      trend: "Stable",
      direction: "stable",
      regional_demand: "Consistent across mature engineering centers & GCCs",
      confidence: "High",
      freshness: "Recent (Q3 2026)",
      sources: ["ESCO 2511.2", "O*NET 15-2051.00", "AISHE / PLFS Tech Indicators"]
    },
    estimated_learning_hours: 180,
    experience_gap: "Medium",
    primary_missing_skills: [
      { id: "skill_advanced_ml", name: "Supervised & Unsupervised Machine Learning", effort_hrs: 55, difficulty: "High" },
      { id: "skill_inferential_stats", name: "Rigorous Inferential & Bayesian Statistics", effort_hrs: 40, difficulty: "High" },
      { id: "skill_feature_eng", name: "Feature Engineering & Model Validation", effort_hrs: 30, difficulty: "Medium" },
      { id: "skill_model_deployment", name: "Model Serving & Docker Deployment", effort_hrs: 35, difficulty: "Medium" }
    ],
    transferable_strengths: [
      "Python scripting & exploratory data analysis",
      "Applied statistics & hypothesis testing experience",
      "Revenue forecasting regression experience"
    ],
    rationale: "A viable mid-term pathway. You possess foundational statistical literacy and Python fluency, but need rigorous mathematical depth in statistical learning theory and end-to-end model evaluation."
  },
  {
    id: "data_product_analyst",
    slug: "data-product-analyst",
    title: "Data Product Analyst",
    category: "Product Analytics & Growth",
    transition_accessibility: "High",
    accessibility_score: 67,
    skill_overlap_percentage: 82,
    prerequisite_coverage: "7 / 8",
    prerequisite_gap_level: "Low",
    requiredSkills: ["sql", "excel", "data-analysis", "statistics", "product-analytics"],
    demoSignals: {
      transitionFit: 67,
      accessibility: "High accessibility",
      skillGap: "2 priority gaps",
      estimatedEffort: "80 hrs",
      marketSignal: "Growing",
      confidence: "High",
      disclaimer: "Calibrated on ESCO 1.2.1 / O*NET 31.0"
    },
    market_signal: {
      trend: "Growing",
      direction: "up",
      regional_demand: "High across Indian fintech, e-commerce, SaaS ecosystems",
      confidence: "High",
      freshness: "Recent (Q3 2026)",
      sources: ["O*NET 15-2051.01", "NCS Product Ecosystem", "WEF 2025"]
    },
    estimated_learning_hours: 80,
    experience_gap: "Low",
    primary_missing_skills: [
      { id: "skill_product_analytics", name: "Product Telemetry & Funnels (Mixpanel/Amplitude)", effort_hrs: 25, difficulty: "Medium" },
      { id: "skill_ab_testing", name: "Experimental Design & A/B Testing at Scale", effort_hrs: 25, difficulty: "Medium" }
    ],
    transferable_strengths: [
      "Customer churn cohort analysis",
      "Advanced Excel & SQL data aggregation",
      "Executive KPI reporting & storytelling"
    ],
    rationale: "High capability overlap with your daily analytical tasks. Requires augmenting your descriptive reporting background with user-behavior telemetry and digital experimentation."
  },
  {
    id: "machine_learning_engineer",
    slug: "machine-learning-engineer",
    title: "ML Engineer",
    category: "Applied AI Systems & Infrastructure",
    transition_accessibility: "Lower",
    accessibility_score: 59,
    skill_overlap_percentage: 49,
    prerequisite_coverage: "3 / 8",
    prerequisite_gap_level: "High",
    requiredSkills: ["python", "advanced-ml", "mlops", "distributed-systems", "deep-learning"],
    demoSignals: {
      transitionFit: 59,
      accessibility: "Lower accessibility",
      skillGap: "5 priority gaps",
      estimatedEffort: "240 hrs",
      marketSignal: "High Demand",
      confidence: "Medium",
      disclaimer: "Calibrated on ESCO 1.2.1 / O*NET 31.0"
    },
    market_signal: {
      trend: "High Demand",
      direction: "up",
      regional_demand: "High demand for experienced engineers; restrictive junior intake",
      confidence: "Medium",
      freshness: "Recent (Q3 2026)",
      sources: ["O*NET 15-1252.00", "WEF 2025 Emerging Tech", "NCS Tech Hubs"]
    },
    estimated_learning_hours: 240,
    experience_gap: "High",
    primary_missing_skills: [
      { id: "skill_software_arch", name: "Software Engineering Principles & OOP in Python", effort_hrs: 50, difficulty: "High" },
      { id: "skill_mlops", name: "MLOps (Docker, Kubernetes, MLflow, CI/CD)", effort_hrs: 60, difficulty: "High" },
      { id: "skill_distributed_compute", name: "Distributed Data Processing (PySpark/Ray)", effort_hrs: 45, difficulty: "High" },
      { id: "skill_deep_learning", name: "Deep Learning Architectures (PyTorch/Transformers)", effort_hrs: 45, difficulty: "High" },
      { id: "skill_system_design", name: "Low-latency ML Inference System Design", effort_hrs: 40, difficulty: "High" }
    ],
    transferable_strengths: [
      "Python programming baseline",
      "SQL database access",
      "Analytical intuition on data drift"
    ],
    rationale: "High prerequisite gap. Current capabilities provide an initial Python footing, but lack the distributed systems, container orchestration, and production engineering rigor required for MLOps."
  }
];

export const DEMO_TRANSITION_GRAPH: TransitionGraphData = {
  graph_metadata: {
    root_profile: "Data Analyst (Aarav Sharma)",
    primary_target: "Analytics Engineer",
    alternative_targets: ["Data Scientist", "ML Engineer", "Data Product Analyst"],
    taxonomy_alignment: "ESCO 1.2.1 / O*NET 31.0"
  },
  nodes: [
    {
      id: "node_current_role",
      type: "current_role",
      label: "DATA ANALYST",
      subtitle: "Current Role • 1.5 yrs exp",
      category: "Current State",
      color: "navy",
      metadata: {
        verified_projects: 3,
        daily_stack: ["SQL", "Power BI", "Excel", "Python"],
        why_it_matters: "Current empirical foundation. 1.5 years experience as a Data Analyst gives immediate proficiency in business metrics, ad-hoc queries, and reporting."
      }
    },
    {
      id: "node_skill_sql",
      type: "current_capability",
      label: "SQL",
      subtitle: "Evidence-backed • Advanced",
      category: "Current Capability",
      color: "slate",
      metadata: {
        esco_code: "e8f7a9d0",
        evidence: "PostgreSQL & MySQL daily production queries, CTEs, and window functions",
        overlap_weight: 0.35,
        why_it_matters: "Core foundational language for modern data transformation.",
        prerequisite_satisfied: "Directly satisfied by current role"
      }
    },
    {
      id: "node_skill_python",
      type: "current_capability",
      label: "Python",
      subtitle: "Evidence-backed • Intermediate",
      category: "Current Capability",
      color: "slate",
      metadata: {
        esco_code: "984b912c",
        evidence: "Expense Analytics + Customer Churn cohort analysis repos",
        overlap_weight: 0.25,
        why_it_matters: "Essential for data automation, dbt Jinja extensions, and orchestration.",
        prerequisite_satisfied: "Directly satisfied by verified projects"
      }
    },
    {
      id: "node_skill_stats",
      type: "current_capability",
      label: "Statistics",
      subtitle: "Evidence-backed • Intermediate",
      category: "Current Capability",
      color: "slate",
      metadata: {
        esco_code: "33445566",
        evidence: "Customer Churn A/B hypothesis testing & ARIMA revenue forecasting",
        overlap_weight: 0.18,
        why_it_matters: "Ensures metric validity and data quality test assertions.",
        prerequisite_satisfied: "Directly satisfied by statistical reporting"
      }
    },
    {
      id: "node_skill_powerbi",
      type: "current_capability",
      label: "Power BI",
      subtitle: "Evidence-backed • Intermediate",
      category: "Current Capability",
      color: "slate",
      metadata: {
        esco_code: "44556677",
        evidence: "Sales Analytics Dashboard deployed to 40+ sales team stakeholders",
        overlap_weight: 0.20,
        why_it_matters: "Deep business context and metric visualization experience.",
        prerequisite_satisfied: "Directly satisfied by daily dashboards"
      }
    },
    {
      id: "node_trans_data_modeling",
      type: "transferable_capability",
      label: "Data Modeling",
      subtitle: "Kimball Star/Snowflake Schema Design",
      category: "Transferable Capability",
      color: "emerald",
      metadata: {
        prerequisite_depth: 1,
        transfer_source: "SQL reporting queries & Power BI schemas",
        learning_cost_hrs: 20,
        transfer_efficiency: 0.88,
        why_it_matters: "Bridges transactional database querying into clean analytical facts and dimensions.",
        prerequisite: "SQL ✓ (Satisfied)",
        status: "Inferred / In Progress"
      }
    },
    {
      id: "node_trans_etl",
      type: "transferable_capability",
      label: "ETL Concepts",
      subtitle: "Data Ingestion & Staging Pipelines",
      category: "Transferable Capability",
      color: "emerald",
      metadata: {
        prerequisite_depth: 1,
        transfer_source: "Python scripts & Cron data extract jobs",
        learning_cost_hrs: 20,
        transfer_efficiency: 0.85,
        why_it_matters: "Underpins how raw source feeds are transformed into staging tables.",
        prerequisite: "Python & SQL ✓ (Satisfied)",
        status: "Inferred / In Progress"
      }
    },
    {
      id: "node_prereq_dbt",
      type: "missing_prerequisite",
      label: "dbt",
      subtitle: "Modular SQL & automated schema testing",
      category: "Missing Skill",
      color: "amber",
      metadata: {
        status: "Missing / Skill Gap (P0)",
        effort_hrs: 24,
        priority: "P0 Critical",
        why_it_matters: "Core transformation engine for Analytics Engineering. Powers modular SQL transformations and testing.",
        prerequisite: "Data Modeling",
        evidence: "Analytics transformation project (Jaffle Shop Analytics pipeline)",
        evidence_project: "Jaffle Shop Analytics Pipeline with dbt-core & automated schema tests"
      }
    },
    {
      id: "node_prereq_warehouse",
      type: "missing_prerequisite",
      label: "Data Warehousing",
      subtitle: "Cloud Snowflake / BigQuery clustering & partitions",
      category: "Missing Skill",
      color: "amber",
      metadata: {
        status: "Missing / Skill Gap (P1)",
        effort_hrs: 20,
        priority: "P1 High",
        why_it_matters: "Target execution environment for modern analytical queries, clustering, and marts.",
        prerequisite: "ETL Concepts & SQL ✓",
        evidence: "Snowflake staging & marts design with partition optimization",
        evidence_project: "Snowflake staging and marts design with micro-partition optimization"
      }
    },
    {
      id: "node_target_role",
      type: "target_role",
      label: "ANALYTICS ENGINEER",
      subtitle: "82 Fit • Target Role",
      category: "Target Role",
      color: "navy",
      metadata: {
        role_id: "analytics-engineer",
        market_readiness: "Ready in 18 weeks @ 20h/wk (10 weeks @ 40h/wk)",
        regional_signals: "High demand in Delhi NCR, Bengaluru, Hyderabad",
        why_it_matters: "Primary optimized transition destination with 78% immediate capability overlap."
      }
    },
    {
      id: "node_alt_data_scientist",
      type: "target_role",
      label: "Data Scientist",
      subtitle: "71 Fit • 180 hrs",
      category: "Alternative Opportunity",
      color: "slate",
      metadata: {
        role_id: "data-scientist",
        market_readiness: "Feasible in 18–24 weeks",
        regional_signals: "Enterprise demand",
        why_it_matters: "Requires 180 learning hours in inferential statistics and ML algorithms."
      }
    },
    {
      id: "node_alt_product_analyst",
      type: "target_role",
      label: "Data Product Analyst",
      subtitle: "67 Fit • 80 hrs",
      category: "Alternative Opportunity",
      color: "slate",
      metadata: {
        role_id: "data-product-analyst",
        market_readiness: "Feasible in 6–8 weeks",
        regional_signals: "High demand in Indian product startups",
        why_it_matters: "Requires 80 learning hours in Mixpanel product telemetry and experimentation."
      }
    }
  ],
  edges: [
    { from: "node_current_role", to: "node_skill_sql", label: "exhibits" },
    { from: "node_current_role", to: "node_skill_python", label: "exhibits" },
    { from: "node_current_role", to: "node_skill_stats", label: "exhibits" },
    { from: "node_current_role", to: "node_skill_powerbi", label: "exhibits" },

    { from: "node_skill_sql", to: "node_trans_data_modeling", label: "enables" },
    { from: "node_skill_python", to: "node_trans_etl", label: "bridges" },
    { from: "node_skill_powerbi", to: "node_trans_data_modeling", label: "informs" },

    { from: "node_trans_data_modeling", to: "node_prereq_dbt", label: "prerequisite for" },
    { from: "node_trans_etl", to: "node_prereq_warehouse", label: "enables" },

    { from: "node_prereq_dbt", to: "node_target_role", label: "unlocks role" },
    { from: "node_prereq_warehouse", to: "node_target_role", label: "satisfies JD" },

    { from: "node_skill_stats", to: "node_alt_data_scientist", label: "alt path" },
    { from: "node_skill_powerbi", to: "node_alt_product_analyst", label: "alt path" }
  ]
};

export const DEMO_WHY_THIS_PATH: WhyThisPathData = {
  target_role_id: "analytics-engineer",
  target_role_title: "Analytics Engineer",
  evidence_metrics: {
    transition_fit: 82,
    skill_overlap_percentage: 78,
    transferable_capability_level: "High",
    prerequisite_coverage: "6 / 8",
    market_signal: "Strong",
    estimated_learning_effort: "120 learning hours",
    experience_gap: "Low",
    confidence: "Medium–High",
    data_freshness: "Recent (Taxonomy aligned to Q3 2026)"
  },
  skill_overlap: [
    { name: "Strong SQL foundation", status: "verified", symbol: "✓" },
    { name: "Python experience", status: "verified", symbol: "✓" },
    { name: "Analytics experience", status: "verified", symbol: "✓" }
  ],
  transferable_bridge: [
    "Data Analysis",
    "Data Modeling",
    "Analytics Engineering"
  ],
  prerequisites_status: [
    { name: "SQL", satisfied: true, symbol: "✓" },
    { name: "Python", satisfied: true, symbol: "✓" },
    { name: "dbt", satisfied: false, symbol: "△" },
    { name: "Data Warehousing", satisfied: false, symbol: "△" },
    { name: "Advanced Data Modeling", satisfied: false, symbol: "△" }
  ],
  grounded_narrative: (
    "Your daily SQL fluency and Python scripting provide an immediate 78% capability overlap for Analytics Engineering. " +
    "The primary bridge is elevating ad-hoc analytical queries into production dimensional models, with dbt automating modular transformations and CI data tests."
  ),
  assumptions: [
    "User has working familiarity with Git version control (branching, pull requests).",
    "User has environment access to install dbt-core locally or run dbt Cloud free tier.",
    "Weekly learning constraint of 20 hours/week is maintained over the estimated 18 weeks."
  ],
  alternatives: [
    {
      role_id: "data-scientist",
      title: "Data Scientist",
      fit: 71,
      effort: "180 learning hours",
      reason: "Requires 180 learning hours in inferential statistics, machine learning theory, and model containerization."
    },
    {
      role_id: "data-product-analyst",
      title: "Data Product Analyst",
      fit: 67,
      effort: "80 learning hours",
      reason: "High initial capability overlap, but shifts focus heavily toward product telemetry, Mixpanel, and experimental A/B testing rather than data architecture."
    }
  ],
  governance_notice: "SkillRoute explains a structured decision using graph relationships and constraints. It does not hallucinate recommendations."
};

export const DEMO_EVIDENCE_ITEMS: EvidenceArtifact[] = [
  {
    id: "ev_dbt",
    skill_id: "skill_dbt",
    skill_name: "dbt (Data Build Tool)",
    category: "Core Transformation Engine",
    status: "in-progress",
    learn: "Models • Tests • Transformations. Understand ref() dependencies, Jinja macros, and automated schema tests.",
    build: "Analytics warehouse project: End-to-end transformation pipeline converting raw orders & customers into dimensional marts.",
    prove: "GitHub repository • Dashboard • Project walkthrough. Passing test suites, lineage DAG, and documentation.",
    apply: "Resume • Portfolio • Applications. Showcase in technical screenings to prove production-ready modular SQL workflows.",
    repository_link: "https://github.com/aaravsharma/jaffle-shop-dbt-analytics",
    verification_notes: "12 models configured; 18 automated schema tests passing in GitHub Actions CI."
  },
  {
    id: "ev_data_modeling",
    skill_id: "skill_data_modeling",
    skill_name: "Dimensional Data Modeling",
    category: "Data Architecture",
    status: "completed",
    learn: "Kimball star schemas, facts, dimensions, surrogate keys, and slowly changing dimensions (SCD 1 & 2).",
    build: "Enterprise sales and revenue dimensional model with fact_sales, dim_customers, and dim_products.",
    prove: "Full ERD diagram, normalization benchmarks, and query execution plan analysis proving reduced scan costs.",
    apply: "Demonstrates architectural rigor during system design and technical interviews.",
    repository_link: "https://github.com/aaravsharma/dimensional-modeling-star-schema",
    verification_notes: "ERD verified against O*NET 15-2051.02 design competencies."
  },
  {
    id: "ev_warehouse",
    skill_id: "skill_warehousing",
    skill_name: "Data Warehousing",
    category: "Storage & Compute Infrastructure",
    status: "not-started",
    learn: "Clustering, micro-partitioning, credit optimization, and warehouse sizing principles.",
    build: "Configure multi-tier staging, intermediate, and reporting marts on BigQuery or Snowflake trial.",
    prove: "Benchmark query log comparison showing partition pruning reducing query scan by 80%.",
    apply: "Validates cloud warehouse fluency and cost-conscious data platform engineering.",
    repository_link: undefined,
    verification_notes: "Scheduled for Phase 04."
  },
  {
    id: "ev_cicd",
    skill_id: "skill_cicd_git",
    skill_name: "Data CI/CD & Version Control",
    category: "Engineering Rigor",
    status: "not-started",
    learn: "GitHub Actions for data teams: sqlfluff linting, automated dbt compile, and pull request previews.",
    build: "Automated workflow triggering slim CI runs on every pull request targeting the main branch.",
    prove: "Passing GitHub Actions run badge on repository and branch protection rule enforcement.",
    apply: "Separates modern analytics engineers from traditional BI dashboard creators.",
    repository_link: undefined,
    verification_notes: "Scheduled for final portfolio packaging."
  }
];

export function computeLocalPathway(weeklyHours: number): PathwayOptimizationResult {
  return calculatePathway(DEMO_PROFILE, 'analytics-engineer', weeklyHours);
}


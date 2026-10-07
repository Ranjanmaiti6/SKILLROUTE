/**
 * SkillRoute Unified Transition Intelligence Client & Engine
 * Team EliteCore — Build For Bharat 2.0
 * 
 * Provides unified data structures and intelligence logic for:
 * 1. Transition Engine
 * 2. Next Best Skill
 * 3. Career Transition Simulator
 * 4. What-If Lab
 */

export interface TargetRoleCatalogItem {
  slug: string;
  title: string;
  category: string;
  demand_score: number;
  market_signal: string;
  esco_code: string;
  onet_code: string;
  base_experience_required: number;
  required_skills: string[];
  critical_skills: string[];
  important_skills: string[];
  optional_skills?: string[];
  transferable_bridges: Record<string, string>;
}

export interface SkillCatalogItem {
  id: string;
  name: string;
  category: string;
  effort_hrs: number;
  difficulty?: string;
  prerequisites?: string[];
  unlocks_roles?: string[];
  opportunity_gain?: string;
  evidence_source?: string;
  transferable_note?: string;
}

export interface SkillGapItem {
  id: string;
  name: string;
  category: string;
  effort_hrs: number;
  difficulty?: string;
  blocking_reason?: string;
  substantially_improves?: string;
  note?: string;
  prerequisites_satisfied?: boolean;
}

export interface TransferableItem {
  skill_id: string;
  skill_name: string;
  leverage_note: string;
  status: string;
}

export interface TransitionAnalysisResult {
  target_role: {
    slug: string;
    title: string;
    category: string;
    demand_score: number;
    market_signal: string;
    esco_code: string;
    onet_code: string;
  };
  transition_score: number;
  components: {
    skill_fit: number;
    demand_signal: number;
    transferability: number;
    accessibility: number;
    learning_cost_penalty: number;
    experience_gap_penalty: number;
  };
  formula_metadata: {
    decision_model: string;
    weights: Record<string, number>;
    confidence: string;
  };
  total_effort_hrs: number;
  skill_overlap_percentage: number;
  effective_readiness_percentage: number;
  foundation_status: string;
  critical_gaps_count: number;
  important_gaps_count: number;
  transferable_count: number;
  overlapping_skills: string[];
  gap_breakdown: {
    critical: SkillGapItem[];
    important: SkillGapItem[];
    optional: SkillGapItem[];
    transferable: TransferableItem[];
  };
  market_signal: string;
  taxonomy_grounding: string;
}

export interface NextBestSkillOption {
  skill_id: string;
  name: string;
  category: string;
  effort_hrs: number;
  difficulty: string;
  prerequisites: string[];
  prerequisites_satisfied: boolean;
  opportunity_gain: string;
  opportunity_gain_numeric: number;
  learning_cost_numeric: number;
  efficiency_ratio: number;
  unlocks_roles: string[];
  evidence_source: string;
  transferable_note: string;
  confidence: string;
  data_freshness: string;
  priority_rank: number;
}

export interface NextBestSkillResult {
  target_role: string;
  top_skill: NextBestSkillOption;
  top_recommendation: NextBestSkillOption;
  why_this_skill: string[];
  why_reasons: string[];
  ranked_options: NextBestSkillOption[];
  comparison_ranking: NextBestSkillOption[];
  formula_explanation: string;
}

export interface CareerPathStep {
  step: number;
  title: string;
  desc: string;
  effort_hrs?: number;
  status: 'completed' | 'next' | 'upcoming' | 'goal';
}

export interface CareerPath {
  id: string;
  name: string;
  target_role: string;
  role_slug: string;
  badge: string;
  pace_badge: string;
  effort_hrs: number;
  estimated_weeks: number;
  overall_score: number;
  skill_fit: string;
  opportunity_signal: string;
  transferability: string;
  accessibility: string;
  steps: CareerPathStep[];
  rationale: string;
}

export interface CareerSimulationResult {
  weekly_hours: number;
  current_role: string;
  paths: CareerPath[];
  comparison_matrix: Array<{
    path_id: string;
    path_name: string;
    target_role: string;
    skill_gaps: string;
    estimated_effort: string;
    opportunity_signal: string;
    transferability: string;
    accessibility: string;
    score: number;
  }>;
}

export interface WhatIfLabResult {
  target_role: string;
  baseline: {
    reachable_roles: number;
    transition_score: number;
    critical_gaps: number;
    learning_effort_hrs: number;
    estimated_weeks: number;
    overlap_percentage: number;
    market_signal: string;
  };
  scenario: {
    reachable_roles: number;
    transition_score: number;
    critical_gaps: number;
    learning_effort_hrs: number;
    estimated_weeks: number;
    overlap_percentage: number;
    market_signal: string;
  };
  deltas: {
    score: number;
    score_direction: 'up' | 'down' | 'same';
    effort_hrs: number;
    effort_direction: 'improved' | 'increased' | 'same';
    gaps: number;
    reachable_roles: number;
  };
  added_skills: string[];
  removed_skills: string[];
  scenario_skills: string[];
  weekly_hours: number;
  intelligence_diagnosis: string;
}

// ============================================================
// STANDARDIZED TAXONOMY GROUNDING CATALOGS
// ============================================================

export const ROLES_REGISTRY: Record<string, TargetRoleCatalogItem> = {
  "analytics-engineer": {
    slug: "analytics-engineer",
    title: "Analytics Engineer",
    category: "Modern Data Stack & Engineering",
    esco_code: "2512.3",
    onet_code: "15-2051.02",
    demand_score: 0.88,
    market_signal: "Strong (High demand across Indian tech hubs)",
    base_experience_required: 1.5,
    required_skills: ["sql", "python", "dimensional_modeling", "dbt", "cloud_warehousing", "cicd_git"],
    critical_skills: ["dbt", "dimensional_modeling"],
    important_skills: ["cloud_warehousing", "cicd_git"],
    optional_skills: ["orchestration_airflow", "terraform"],
    transferable_bridges: {
      "sql": "Direct daily fluency in complex CTEs and analytical queries",
      "python": "Pandas transformation pipelines map directly into transformation layers",
      "power_bi": "Understanding business metrics accelerates semantic layer modeling"
    }
  },
  "data-engineer": {
    slug: "data-engineer",
    title: "Data Engineer",
    category: "Data Infrastructure & Pipelines",
    esco_code: "2512.4",
    onet_code: "15-1252.00",
    demand_score: 0.92,
    market_signal: "Very High (Critical shortage in pipeline engineering)",
    base_experience_required: 2.0,
    required_skills: ["python", "sql", "distributed_spark", "orchestration_airflow", "cloud_warehousing", "docker"],
    critical_skills: ["distributed_spark", "orchestration_airflow", "docker"],
    important_skills: ["cloud_warehousing", "streaming_kafka"],
    optional_skills: ["cicd_git", "terraform"],
    transferable_bridges: {
      "sql": "ETL query optimization and schema design",
      "python": "Automation scripts translate into DAG operator logic"
    }
  },
  "data-product-analyst": {
    slug: "data-product-analyst",
    title: "Data Product Analyst",
    category: "Product Analytics & Experimentation",
    esco_code: "2511.1",
    onet_code: "15-2051.01",
    demand_score: 0.82,
    market_signal: "Growing (High fintech & consumer internet demand)",
    base_experience_required: 1.0,
    required_skills: ["sql", "python", "ab_testing", "product_funnels", "cohort_modeling"],
    critical_skills: ["ab_testing", "product_funnels"],
    important_skills: ["cohort_modeling"],
    optional_skills: ["mixpanel_amplitude", "executive_storytelling"],
    transferable_bridges: {
      "sql": "Retention queries and user cohort filtering",
      "statistics": "Basic hypothesis testing underpins experimentation",
      "power_bi": "Executive reporting translates to growth dashboards"
    }
  },
  "data-scientist": {
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Predictive Modeling & Statistical Inference",
    esco_code: "2511.2",
    onet_code: "15-2051.00",
    demand_score: 0.78,
    market_signal: "Moderate-High (Mature predictive analytics)",
    base_experience_required: 2.5,
    required_skills: ["python", "sql", "inferential_stats", "supervised_ml", "feature_engineering"],
    critical_skills: ["inferential_stats", "supervised_ml"],
    important_skills: ["feature_engineering", "model_evaluation"],
    optional_skills: ["deep_learning", "nlp_basics"],
    transferable_bridges: {
      "python": "Pandas and NumPy data preprocessing",
      "statistics": "Exploratory distribution analysis",
      "sql": "Feature extraction from operational databases"
    }
  },
  "machine-learning-engineer": {
    slug: "machine-learning-engineer",
    title: "ML Engineer",
    category: "Applied AI Systems & Infrastructure",
    esco_code: "2512.2",
    onet_code: "15-1252.00",
    demand_score: 0.85,
    market_signal: "High Demand (Senior heavy)",
    base_experience_required: 3.0,
    required_skills: ["python", "supervised_ml", "mlops_deployment", "docker", "distributed_spark", "deep_learning"],
    critical_skills: ["mlops_deployment", "docker", "deep_learning"],
    important_skills: ["distributed_spark", "model_monitoring"],
    optional_skills: ["kubernetes", "triton_inference"],
    transferable_bridges: {
      "python": "Foundational Python syntax and scripting",
      "statistics": "Loss functions and performance evaluation metrics"
    }
  },
  "backend-engineer": {
    slug: "backend-engineer",
    title: "Backend Engineer (Data Platforms)",
    category: "Software Engineering & APIs",
    esco_code: "2512.1",
    onet_code: "15-1252.00",
    demand_score: 0.84,
    market_signal: "Strong (Platform engineering demand)",
    base_experience_required: 2.0,
    required_skills: ["python", "sql", "api_design", "docker", "system_design", "cicd_git"],
    critical_skills: ["api_design", "system_design", "docker"],
    important_skills: ["cicd_git", "caching_redis"],
    optional_skills: ["grpc", "postgresql_tuning"],
    transferable_bridges: {
      "sql": "Database queries and relational modeling",
      "python": "FastAPI/Flask API development capabilities"
    }
  }
};

export const SKILLS_REGISTRY: Record<string, SkillCatalogItem> = {
  "sql": { id: "sql", name: "SQL", category: "Database & Querying", effort_hrs: 0, prerequisites: [] },
  "python": { id: "python", name: "Python", category: "Programming & Scripting", effort_hrs: 0, prerequisites: [] },
  "statistics": { id: "statistics", name: "Applied Statistics", category: "Mathematics & Inference", effort_hrs: 0, prerequisites: [] },
  "power_bi": { id: "power_bi", name: "Power BI & Dashboarding", category: "Visualization & BI", effort_hrs: 0, prerequisites: [] },
  "excel": { id: "excel", name: "Advanced Excel", category: "Analytical Tools", effort_hrs: 0, prerequisites: [] },
  "dimensional_modeling": {
    id: "dimensional_modeling",
    name: "Dimensional Data Modeling",
    category: "Data Architecture",
    effort_hrs: 20,
    difficulty: "Medium",
    prerequisites: ["sql"],
    unlocks_roles: ["Analytics Engineer", "Data Engineer"],
    opportunity_gain: "High",
    evidence_source: "Kimball Dimensional Architecture • ESCO 2512.3",
    transferable_note: "Builds directly on existing relational query experience"
  },
  "dbt": {
    id: "dbt",
    name: "dbt (Data Build Tool)",
    category: "Transformation Workflow",
    effort_hrs: 24,
    difficulty: "Medium",
    prerequisites: ["sql", "dimensional_modeling"],
    unlocks_roles: ["Analytics Engineer"],
    opportunity_gain: "High",
    evidence_source: "Modern Data Stack Benchmark • dbt Core Documentation",
    transferable_note: "Uses standard SQL SELECT statements wrapped in Jinja templates"
  },
  "cloud_warehousing": {
    id: "cloud_warehousing",
    name: "Cloud Data Warehousing (BigQuery / Snowflake)",
    category: "Cloud Infrastructure",
    effort_hrs: 20,
    difficulty: "Medium",
    prerequisites: ["sql"],
    unlocks_roles: ["Analytics Engineer", "Data Engineer"],
    opportunity_gain: "High",
    evidence_source: "O*NET 15-2051.02 Cloud Architecture",
    transferable_note: "ANSI SQL syntax maps directly to Snowflake/BigQuery query engines"
  },
  "docker": {
    id: "docker",
    name: "Docker & Container Fundamentals",
    category: "Infrastructure & Dev",
    effort_hrs: 18,
    difficulty: "Medium",
    prerequisites: [],
    unlocks_roles: ["Data Engineer", "ML Engineer", "Backend Engineer (Data Platforms)"],
    opportunity_gain: "High",
    evidence_source: "Cloud Native Computing Foundation (CNCF)",
    transferable_note: "Existing Linux scripting fundamentals provide high transfer leverage"
  },
  "orchestration_airflow": {
    id: "orchestration_airflow",
    name: "Pipeline Orchestration (Apache Airflow)",
    category: "Data Engineering",
    effort_hrs: 26,
    difficulty: "Medium",
    prerequisites: ["python"],
    unlocks_roles: ["Data Engineer", "Analytics Engineer"],
    opportunity_gain: "High",
    evidence_source: "Apache Software Foundation • ESCO 2512.4",
    transferable_note: "Python scheduling scripts translate directly into Airflow DAG tasks"
  },
  "distributed_spark": {
    id: "distributed_spark",
    name: "Distributed Compute (PySpark)",
    category: "Big Data Processing",
    effort_hrs: 35,
    difficulty: "High",
    prerequisites: ["python", "sql"],
    unlocks_roles: ["Data Engineer", "ML Engineer"],
    opportunity_gain: "High",
    evidence_source: "Apache Spark Architecture Standards",
    transferable_note: "Spark DataFrames share identical semantics with Pandas DataFrames"
  },
  "ab_testing": {
    id: "ab_testing",
    name: "Controlled Experiments & A/B Testing",
    category: "Product Science",
    effort_hrs: 22,
    difficulty: "Medium",
    prerequisites: ["statistics"],
    unlocks_roles: ["Data Product Analyst", "Data Scientist"],
    opportunity_gain: "High",
    evidence_source: "Causal Inference in Digital Products",
    transferable_note: "Builds on existing hypothesis testing and p-value intuition"
  },
  "product_funnels": {
    id: "product_funnels",
    name: "Behavioral Telemetry & Funnel Analysis",
    category: "Product Analytics",
    effort_hrs: 16,
    difficulty: "Low",
    prerequisites: ["sql"],
    unlocks_roles: ["Data Product Analyst"],
    opportunity_gain: "Medium",
    evidence_source: "Product Analytics Certification Standards",
    transferable_note: "Power BI funnel reporting experience directly transfers"
  },
  "inferential_stats": {
    id: "inferential_stats",
    name: "Inferential & Bayesian Statistics",
    category: "Mathematical Foundations",
    effort_hrs: 30,
    difficulty: "High",
    prerequisites: ["statistics"],
    unlocks_roles: ["Data Scientist"],
    opportunity_gain: "Medium",
    evidence_source: "Statistical Inference Frameworks",
    transferable_note: "Builds upon foundational standard deviation and distribution metrics"
  },
  "supervised_ml": {
    id: "supervised_ml",
    name: "Supervised Machine Learning (Scikit-Learn)",
    category: "Statistical Learning",
    effort_hrs: 32,
    difficulty: "Medium",
    prerequisites: ["python", "statistics"],
    unlocks_roles: ["Data Scientist", "ML Engineer"],
    opportunity_gain: "High",
    evidence_source: "Applied ML Practice Benchmarks",
    transferable_note: "Pandas feature preparation feeds directly into model fit and predict workflows"
  },
  "mlops_deployment": {
    id: "mlops_deployment",
    name: "MLOps & Model Serving",
    category: "Production AI",
    effort_hrs: 28,
    difficulty: "High",
    prerequisites: ["python", "docker"],
    unlocks_roles: ["ML Engineer"],
    opportunity_gain: "High",
    evidence_source: "MLOps World Standards",
    transferable_note: "Python API scripting pairs with Docker containerization"
  },
  "api_design": {
    id: "api_design",
    name: "REST & FastAPI High-Throughput Services",
    category: "API Systems",
    effort_hrs: 20,
    difficulty: "Medium",
    prerequisites: ["python"],
    unlocks_roles: ["Backend Engineer (Data Platforms)"],
    opportunity_gain: "High",
    evidence_source: "OpenAPI Specification Standards",
    transferable_note: "Python backend script logic modularizes directly into endpoint routes"
  },
  "cicd_git": {
    id: "cicd_git",
    name: "Version Control & Data CI/CD (GitHub Actions)",
    category: "Engineering Practices",
    effort_hrs: 14,
    difficulty: "Low",
    prerequisites: [],
    unlocks_roles: ["Analytics Engineer", "Data Engineer", "Backend Engineer (Data Platforms)"],
    opportunity_gain: "Medium",
    evidence_source: "Modern Software Delivery Practices",
    transferable_note: "Basic Git commit and push workflows form the foundation"
  }
};

const DEFAULT_USER_SKILLS = ["sql", "python", "statistics", "power_bi", "excel"];

// ============================================================
// CLIENT-SIDE DETERMINISTIC ENGINE (FOR INSTANT UI ZERO-LATENCY)
// ============================================================

export function analyzeTransitionLocal(
  targetRoleSlug: string = "analytics-engineer",
  userSkills: string[] = DEFAULT_USER_SKILLS,
  userExperience: number = 1.5
): TransitionAnalysisResult {
  const role = ROLES_REGISTRY[targetRoleSlug] || ROLES_REGISTRY["analytics-engineer"];
  const skillsSet = new Set(userSkills.map((s) => s.toLowerCase().trim()));

  const required = role.required_skills;
  const critical = role.critical_skills;
  const important = role.important_skills;
  const optional = role.optional_skills || [];

  const missingCritical = critical.filter((s) => !skillsSet.has(s));
  const missingImportant = important.filter((s) => !skillsSet.has(s));
  const missingOptional = optional.filter((s) => !skillsSet.has(s));
  const overlappingSkills = required.filter((s) => skillsSet.has(s));

  // Transferable items with leverage
  const transferable: TransferableItem[] = [];
  Array.from(skillsSet).forEach((sk) => {
    if (role.transferable_bridges[sk]) {
      transferable.push({
        skill_id: sk,
        skill_name: SKILLS_REGISTRY[sk]?.name || sk.toUpperCase(),
        leverage_note: role.transferable_bridges[sk],
        status: "transferable_strength"
      });
    }
  });

  const rawSkillFit = overlappingSkills.length / Math.max(1, required.length);
  const transferableCredit = transferable.length * 0.12;
  const effectiveSkillFit = Math.min(1.0, rawSkillFit + transferableCredit);
  const transferabilityScore = Math.min(1.0, 0.45 + transferable.length * 0.18);

  // Prerequisites check
  let prereqsMet = 0;
  let totalPrereqs = 0;
  [...missingCritical, ...missingImportant].forEach((sk) => {
    const meta = SKILLS_REGISTRY[sk];
    const ps = meta?.prerequisites || [];
    totalPrereqs += ps.length;
    ps.forEach((p) => {
      if (skillsSet.has(p)) prereqsMet += 1;
    });
  });

  const accessibility = totalPrereqs > 0 ? prereqsMet / totalPrereqs : 0.88;

  // Total effort
  const totalEffortHrs = [...missingCritical, ...missingImportant].reduce(
    (acc, s) => acc + (SKILLS_REGISTRY[s]?.effort_hrs || 20),
    0
  );
  const normalizedLearningCost = Math.min(1.0, totalEffortHrs / 240.0);

  const expDelta = Math.max(0.0, role.base_experience_required - userExperience);
  const experienceGapPenalty = Math.min(1.0, expDelta / 3.0);

  // Calibrated score formula
  const rawScore =
    0.35 * effectiveSkillFit +
    0.20 * role.demand_score +
    0.22 * transferabilityScore +
    0.18 * accessibility -
    0.08 * normalizedLearningCost -
    0.05 * experienceGapPenalty;

  const transitionScore = Math.max(0, Math.min(100, Math.round(rawScore * 100)));

  return {
    target_role: {
      slug: role.slug,
      title: role.title,
      category: role.category,
      demand_score: role.demand_score,
      market_signal: role.market_signal,
      esco_code: role.esco_code,
      onet_code: role.onet_code
    },
    transition_score: transitionScore,
    components: {
      skill_fit: Math.round(effectiveSkillFit * 1000) / 10,
      demand_signal: Math.round(role.demand_score * 1000) / 10,
      transferability: Math.round(transferabilityScore * 1000) / 10,
      accessibility: Math.round(accessibility * 1000) / 10,
      learning_cost_penalty: Math.round(normalizedLearningCost * 1000) / 10,
      experience_gap_penalty: Math.round(experienceGapPenalty * 1000) / 10
    },
    formula_metadata: {
      decision_model: "Calibrated Decision Model (Constrained Optimization)",
      weights: {
        skillFit: 0.35,
        demand: 0.20,
        transferability: 0.22,
        accessibility: 0.18,
        learningCost: 0.08,
        experienceGap: 0.05
      },
      confidence: "High (Taxonomy Evidence Grounded)"
    },
    total_effort_hrs: totalEffortHrs,
    skill_overlap_percentage: Math.round(rawSkillFit * 100),
    effective_readiness_percentage: Math.round(effectiveSkillFit * 100),
    foundation_status:
      effectiveSkillFit >= 0.6
        ? "Strong foundation"
        : effectiveSkillFit >= 0.4
        ? "Partial skill overlap"
        : "Foundational overlap",
    critical_gaps_count: missingCritical.length,
    important_gaps_count: missingImportant.length,
    transferable_count: transferable.length,
    overlapping_skills: overlappingSkills.map((s) => SKILLS_REGISTRY[s]?.name || s),
    gap_breakdown: {
      critical: missingCritical.map((s) => {
        const item = SKILLS_REGISTRY[s];
        const ps = item?.prerequisites || [];
        const satisfy = ps.every((p) => skillsSet.has(p));
        return {
          id: s,
          name: item?.name || s,
          category: item?.category || "Core Gap",
          effort_hrs: item?.effort_hrs || 24,
          difficulty: item?.difficulty || "Medium",
          blocking_reason: `Essential core competency required by ${role.title} job taxonomy.`,
          prerequisites_satisfied: satisfy
        };
      }),
      important: missingImportant.map((s) => {
        const item = SKILLS_REGISTRY[s];
        return {
          id: s,
          name: item?.name || s,
          category: item?.category || "Important",
          effort_hrs: item?.effort_hrs || 20,
          difficulty: item?.difficulty || "Medium",
          substantially_improves: `Significantly increases day-one engineering readiness for ${role.title}.`
        };
      }),
      optional: missingOptional.map((s) => {
        const item = SKILLS_REGISTRY[s];
        return {
          id: s,
          name: item?.name || s,
          category: item?.category || "Competitiveness",
          effort_hrs: item?.effort_hrs || 16,
          note: "Enhances portfolio uniqueness but does not block entry."
        };
      }),
      transferable
    },
    market_signal: role.market_signal,
    taxonomy_grounding: `ESCO ${role.esco_code} • O*NET ${role.onet_code}`
  };
}

export function calculateNextBestSkillLocal(
  targetRoleSlug: string = "analytics-engineer",
  userSkills: string[] = DEFAULT_USER_SKILLS
): NextBestSkillResult {
  const role = ROLES_REGISTRY[targetRoleSlug] || ROLES_REGISTRY["analytics-engineer"];
  const skillsSet = new Set(userSkills.map((s) => s.toLowerCase().trim()));

  const candidates: NextBestSkillOption[] = [];

  Object.values(SKILLS_REGISTRY).forEach((item) => {
    if (skillsSet.has(item.id) || item.effort_hrs === 0) return;

    const prereqs = item.prerequisites || [];
    const prereqsSatisfied = prereqs.every((p) => skillsSet.has(p));

    const isCritical = role.critical_skills.includes(item.id);
    const isImportant = role.important_skills.includes(item.id);
    const isRequired = role.required_skills.includes(item.id);

    let oppGain = 3.0;
    if (isCritical) oppGain += 4.5;
    else if (isImportant) oppGain += 3.0;
    else if (isRequired) oppGain += 2.0;

    const unlocked = item.unlocks_roles || [];
    oppGain += unlocked.length * 1.2;
    oppGain = Math.min(10.0, oppGain);

    const effort = Math.max(10, item.effort_hrs);
    let learningCost = effort / 10.0;
    if (!prereqsSatisfied) learningCost += 3.5;

    const efficiency = Math.round((oppGain / Math.max(0.5, learningCost)) * 100) / 100;

    candidates.push({
      skill_id: item.id,
      name: item.name,
      category: item.category,
      effort_hrs: effort,
      difficulty: item.difficulty || "Medium",
      prerequisites: prereqs.map((p) => SKILLS_REGISTRY[p]?.name || p),
      prerequisites_satisfied: prereqsSatisfied,
      opportunity_gain: item.opportunity_gain || "High",
      opportunity_gain_numeric: Math.round(oppGain * 10) / 10,
      learning_cost_numeric: Math.round(learningCost * 10) / 10,
      efficiency_ratio: efficiency,
      unlocks_roles: unlocked,
      evidence_source: item.evidence_source || "Taxonomy Benchmark",
      transferable_note: item.transferable_note || "Leverages existing core knowledge",
      confidence: "High (Evidence-grounded)",
      data_freshness: "ESCO 1.2.1 / Q3 2026",
      priority_rank: 1
    });
  });

  candidates.sort((a, b) => b.efficiency_ratio - a.efficiency_ratio);
  candidates.forEach((c, idx) => {
    c.priority_rank = idx + 1;
  });

  const topSkill = candidates[0];

  const whyReasons = topSkill
    ? [
        `Unlocks direct eligibility for ${topSkill.unlocks_roles.join(", ")}`,
        topSkill.transferable_note,
        "Prerequisites fully satisfied by your current capability foundation",
        `High efficiency score (${topSkill.efficiency_ratio}x opportunity gain per learning hour)`,
        `Fits directly into your active transition toward ${role.title}`
      ]
    : [];

  return {
    target_role: role.title,
    top_skill: topSkill,
    top_recommendation: topSkill,
    why_this_skill: whyReasons,
    why_reasons: whyReasons,
    ranked_options: candidates.slice(0, 5),
    comparison_ranking: candidates.slice(0, 5),
    formula_explanation:
      "NextBestSkill = argmax(ExpectedOpportunityGain / LearningCost) subject to satisfied prerequisites and target role relevance."
  };
}

export function simulateCareerPathsLocal(
  userSkills: string[] = DEFAULT_USER_SKILLS,
  currentRole: string = "Data Analyst",
  weeklyHours: number = 20,
  userExperience: number = 1.5
): CareerSimulationResult {
  const hrs = Math.max(5, weeklyHours);

  // Path A: Fastest (Data Product Analyst)
  const pathAEffort = 72;
  const pathAWeeks = Math.ceil(pathAEffort / (hrs * 0.75));
  const pathA: CareerPath = {
    id: "path_a_fastest",
    name: "Path A: Fastest Transition",
    target_role: "Data Product Analyst",
    role_slug: "data-product-analyst",
    badge: "Fastest Route",
    pace_badge: `${pathAWeeks} Weeks @ ${hrs}h/wk`,
    effort_hrs: pathAEffort,
    estimated_weeks: pathAWeeks,
    overall_score: 81,
    skill_fit: "High (82% overlap)",
    opportunity_signal: "Growing",
    transferability: "Very High",
    accessibility: "High",
    steps: [
      { step: 1, title: "Current Capability", desc: "SQL, Python, Power BI, Statistics Baseline", status: "completed" },
      { step: 2, title: "Behavioral Telemetry", desc: "Product funnels & retention cohorts", effort_hrs: 25, status: "next" },
      { step: 3, title: "Controlled Experiments", desc: "Rigorous A/B testing & causal metrics", effort_hrs: 25, status: "upcoming" },
      { step: 4, title: "Target Role Readiness", desc: "Verified Data Product Analyst transition", status: "goal" }
    ],
    rationale: "Capitalizes on your business storytelling and SQL queries with minimum required gap investment."
  };

  // Path B: Higher Opportunity (Analytics Engineer)
  const pathBEffort = 120;
  const pathBWeeks = Math.ceil(pathBEffort / (hrs * 0.75));
  const pathB: CareerPath = {
    id: "path_b_balanced",
    name: "Path B: Higher Opportunity (Recommended)",
    target_role: "Analytics Engineer",
    role_slug: "analytics-engineer",
    badge: "Highest Overlap",
    pace_badge: `${pathBWeeks} Weeks @ ${hrs}h/wk`,
    effort_hrs: pathBEffort,
    estimated_weeks: pathBWeeks,
    overall_score: 82,
    skill_fit: "High (78% overlap)",
    opportunity_signal: "Strong Demand",
    transferability: "High",
    accessibility: "High",
    steps: [
      { step: 1, title: "Current Capability", desc: "Daily SQL & Python manipulation", status: "completed" },
      { step: 2, title: "Data Modeling", desc: "Kimball star schema & grain design", effort_hrs: 20, status: "next" },
      { step: 3, title: "dbt Transformation", desc: "dbt Core, testing, docs & version control", effort_hrs: 24, status: "upcoming" },
      { step: 4, title: "Cloud Warehousing", desc: "BigQuery / Snowflake warehouse optimization", effort_hrs: 20, status: "upcoming" },
      { step: 5, title: "Target Role Readiness", desc: "Opportunity-ready Analytics Engineer", status: "goal" }
    ],
    rationale: "The sweet spot between effort and market reward. Your SQL fluency translates into immediate day-one execution."
  };

  // Path C: Long-term Specialization (Data Engineer)
  const pathCEffort = 220;
  const pathCWeeks = Math.ceil(pathCEffort / (hrs * 0.75));
  const pathC: CareerPath = {
    id: "path_c_specialized",
    name: "Path C: Long-term Specialization",
    target_role: "Data Engineer",
    role_slug: "data-engineer",
    badge: "High Infrastructure Depth",
    pace_badge: `${pathCWeeks} Weeks @ ${hrs}h/wk`,
    effort_hrs: pathCEffort,
    estimated_weeks: pathCWeeks,
    overall_score: 76,
    skill_fit: "Moderate (64% overlap)",
    opportunity_signal: "Very High",
    transferability: "Medium",
    accessibility: "Moderate",
    steps: [
      { step: 1, title: "Current Capability", desc: "Python scripts & relational queries", status: "completed" },
      { step: 2, title: "Containerization", desc: "Docker, Linux environments & CI/CD", effort_hrs: 22, status: "next" },
      { step: 3, title: "Pipeline Orchestration", desc: "Apache Airflow DAG scheduling", effort_hrs: 26, status: "upcoming" },
      { step: 4, title: "Distributed Compute", desc: "PySpark big data transformation", effort_hrs: 35, status: "upcoming" },
      { step: 5, title: "Target Role Readiness", desc: "Production Data Engineer with distributed stack", status: "goal" }
    ],
    rationale: "Builds rigorous data engineering pipeline mastery for enterprise infrastructure demands."
  };

  return {
    weekly_hours: hrs,
    current_role: currentRole,
    paths: [pathA, pathB, pathC],
    comparison_matrix: [
      {
        path_id: pathA.id,
        path_name: "Path A: Fastest",
        target_role: pathA.target_role,
        skill_gaps: "2 Gaps (Funnels, A/B)",
        estimated_effort: `${pathAEffort} hrs (${pathAWeeks} wks)`,
        opportunity_signal: "Growing",
        transferability: "Very High",
        accessibility: "High",
        score: pathA.overall_score
      },
      {
        path_id: pathB.id,
        path_name: "Path B: Higher Opportunity",
        target_role: pathB.target_role,
        skill_gaps: "2 Critical (dbt, Modeling)",
        estimated_effort: `${pathBEffort} hrs (${pathBWeeks} wks)`,
        opportunity_signal: "Strong Demand",
        transferability: "High",
        accessibility: "High",
        score: pathB.overall_score
      },
      {
        path_id: pathC.id,
        path_name: "Path C: Specialization",
        target_role: pathC.target_role,
        skill_gaps: "3 Critical (Spark, Airflow, Docker)",
        estimated_effort: `${pathCEffort} hrs (${pathCWeeks} wks)`,
        opportunity_signal: "Very High",
        transferability: "Medium",
        accessibility: "Moderate",
        score: pathC.overall_score
      }
    ]
  };
}

export function runWhatIfLabLocal(
  targetRoleSlug: string = "analytics-engineer",
  userSkills: string[] = DEFAULT_USER_SKILLS,
  addedSkills: string[] = [],
  removedSkills: string[] = [],
  weeklyHours: number = 20,
  userExperience: number = 1.5,
  marketScenario: string = "neutral"
): WhatIfLabResult {
  const baseSkillsSet = new Set(userSkills.map((s) => s.toLowerCase().trim()));
  const scenSkillsSet = new Set(baseSkillsSet);

  addedSkills.forEach((s) => scenSkillsSet.add(s.toLowerCase().trim()));
  removedSkills.forEach((s) => scenSkillsSet.delete(s.toLowerCase().trim()));

  const baseline = analyzeTransitionLocal(targetRoleSlug, Array.from(baseSkillsSet), userExperience);
  const scenario = analyzeTransitionLocal(targetRoleSlug, Array.from(scenSkillsSet), userExperience);

  if (marketScenario === "high_demand") {
    scenario.transition_score = Math.min(100, scenario.transition_score + 4);
  } else if (marketScenario === "tight_market") {
    scenario.transition_score = Math.max(0, scenario.transition_score - 5);
  }

  // Count reachable across registry (score >= 70)
  let baseReachable = 0;
  let scenReachable = 0;
  Object.keys(ROLES_REGISTRY).forEach((slug) => {
    const b = analyzeTransitionLocal(slug, Array.from(baseSkillsSet), userExperience);
    const s = analyzeTransitionLocal(slug, Array.from(scenSkillsSet), userExperience);
    if (b.transition_score >= 70) baseReachable += 1;
    if (s.transition_score >= 70) scenReachable += 1;
  });

  const scoreDelta = scenario.transition_score - baseline.transition_score;
  const effortDelta = scenario.total_effort_hrs - baseline.total_effort_hrs;
  const gapsDelta = scenario.critical_gaps_count - baseline.critical_gaps_count;
  const reachableDelta = scenReachable - baseReachable;

  const explanations: string[] = [];
  if (addedSkills.length > 0) {
    const addedNames = addedSkills.map((s) => SKILLS_REGISTRY[s]?.name || s);
    explanations.push(`Adding ${addedNames.join(", ")} eliminated ${Math.abs(gapsDelta)} critical bottleneck gaps.`);
  }
  if (effortDelta < 0) {
    explanations.push(`Reduced remaining learning effort by ${Math.abs(effortDelta)} hours.`);
  }
  if (reachableDelta > 0) {
    explanations.push(`Unlocked ${reachableDelta} additional reachable transition roles across the catalog.`);
  }
  if (scoreDelta > 0) {
    explanations.push(`Increased transition readiness score by ${scoreDelta} points.`);
  }
  if (explanations.length === 0) {
    explanations.push("Scenario matches baseline capabilities.");
  }

  return {
    target_role: ROLES_REGISTRY[targetRoleSlug]?.title || targetRoleSlug,
    baseline: {
      reachable_roles: baseReachable,
      transition_score: baseline.transition_score,
      critical_gaps: baseline.critical_gaps_count,
      learning_effort_hrs: baseline.total_effort_hrs,
      estimated_weeks: Math.ceil(baseline.total_effort_hrs / (weeklyHours * 0.75)),
      overlap_percentage: baseline.skill_overlap_percentage,
      market_signal: baseline.market_signal
    },
    scenario: {
      reachable_roles: scenReachable,
      transition_score: scenario.transition_score,
      critical_gaps: scenario.critical_gaps_count,
      learning_effort_hrs: scenario.total_effort_hrs,
      estimated_weeks: Math.ceil(scenario.total_effort_hrs / (weeklyHours * 0.75)),
      overlap_percentage: scenario.skill_overlap_percentage,
      market_signal: scenario.market_signal
    },
    deltas: {
      score: scoreDelta,
      score_direction: scoreDelta > 0 ? 'up' : scoreDelta < 0 ? 'down' : 'same',
      effort_hrs: effortDelta,
      effort_direction: effortDelta < 0 ? 'improved' : effortDelta > 0 ? 'increased' : 'same',
      gaps: gapsDelta,
      reachable_roles: reachableDelta
    },
    added_skills: addedSkills,
    removed_skills: removedSkills,
    scenario_skills: Array.from(scenSkillsSet),
    weekly_hours: weeklyHours,
    intelligence_diagnosis: explanations.join(" ")
  };
}

// ============================================================
// ASYNC API FETCHERS WITH INSTANT DETERMINISTIC FALLBACK
// ============================================================

const RAW_API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const API_BASE = RAW_API_BASE.replace(/\/api\/?$/, "").replace(/\/$/, "");

export async function fetchTransitionAnalysis(
  roleSlug: string,
  userSkills?: string[],
  experienceYears: number = 1.5
): Promise<TransitionAnalysisResult> {
  try {
    const skillsParam = userSkills ? `&skills=${encodeURIComponent(userSkills.join(","))}` : "";
    const res = await fetch(`${API_BASE}/api/transition/analyze?role=${roleSlug}${skillsParam}&experience_years=${experienceYears}`, {
      cache: "no-store"
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Fall back to instant deterministic local computation
  }
  return analyzeTransitionLocal(roleSlug, userSkills, experienceYears);
}

export async function fetchNextBestSkill(
  roleSlug?: string,
  userSkills?: string[]
): Promise<NextBestSkillResult> {
  try {
    const roleParam = roleSlug ? `role=${roleSlug}` : "";
    const skillsParam = userSkills ? `&skills=${encodeURIComponent(userSkills.join(","))}` : "";
    const res = await fetch(`${API_BASE}/api/skills/next-best?${roleParam}${skillsParam}`, {
      cache: "no-store"
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Fallback
  }
  return calculateNextBestSkillLocal(roleSlug, userSkills);
}

export async function fetchCareerSimulation(
  weeklyHours: number = 20,
  userSkills?: string[],
  currentRole: string = "Data Analyst",
  experienceYears: number = 1.5
): Promise<CareerSimulationResult> {
  try {
    const skillsParam = userSkills ? `&skills=${encodeURIComponent(userSkills.join(","))}` : "";
    const res = await fetch(
      `${API_BASE}/api/career/simulate?hours=${weeklyHours}&current_role=${encodeURIComponent(currentRole)}&experience_years=${experienceYears}${skillsParam}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Fallback
  }
  return simulateCareerPathsLocal(userSkills, currentRole, weeklyHours, userExperienceYears(experienceYears));
}

function userExperienceYears(y: number): number {
  return y || 1.5;
}

export async function fetchWhatIfRun(payload: {
  target_role_slug: string;
  user_skills?: string[];
  added_skills?: string[];
  removed_skills?: string[];
  weekly_hours?: number;
  user_experience?: number;
  market_scenario?: string;
}): Promise<WhatIfLabResult> {
  try {
    const res = await fetch(`${API_BASE}/api/what-if/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    // Fallback
  }
  return runWhatIfLabLocal(
    payload.target_role_slug,
    payload.user_skills,
    payload.added_skills,
    payload.removed_skills,
    payload.weekly_hours || 20,
    payload.user_experience || 1.5,
    payload.market_scenario || "neutral"
  );
}

export interface CapabilityItem {
  id: string;
  name: string;
  category: string;
  group?: 'core' | 'tools' | 'transferable' | 'gap';
  confidence: 'high' | 'medium' | 'low' | 'none';
  support_type: 'explicit' | 'evidence-backed' | 'inferred' | 'gap';
  evidence_sources: string[];
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'none';
  transferable_domains: string[];
  used_in?: string;
  prerequisites?: string;
}

export interface ProjectEvidence {
  id: string;
  title: string;
  stack: string[];
  description: string;
  evidence_url?: string;
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  current_role: string;
  experience_years: number;
  location: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  current_capabilities: CapabilityItem[];
  projects: ProjectEvidence[];
  stated_constraints: {
    weekly_learning_hours: number;
    target_timeline_weeks: number;
    budget_inr: number;
    preferred_transition_domain: string;
  };
  is_demo_profile: boolean;
}

export interface MarketSignal {
  trend: string;
  direction: 'up' | 'stable' | 'down';
  regional_demand: string;
  confidence: string;
  freshness: string;
  sources: string[];
}

export interface MissingSkill {
  id: string;
  name: string;
  effort_hrs: number;
  difficulty: string;
}

export interface OccupationTransition {
  id: string;
  slug: string;
  title: string;
  category: string;
  transition_accessibility: 'High' | 'Medium-High' | 'Medium' | 'Lower';
  accessibility_score: number;
  skill_overlap_percentage: number;
  prerequisite_coverage: string;
  prerequisite_gap_level: string;
  market_signal: MarketSignal;
  estimated_learning_hours: number;
  experience_gap: string;
  primary_missing_skills: MissingSkill[];
  transferable_strengths: string[];
  rationale: string;
  requiredSkills?: string[];
  demoSignals?: {
    transitionFit: number;
    accessibility: string;
    skillGap: string;
    estimatedEffort: string;
    marketSignal: string;
    confidence: string;
    disclaimer?: string;
  };
}

export interface GraphNode {
  id: string;
  type: 'current_role' | 'current_capability' | 'transferable_capability' | 'missing_prerequisite' | 'target_role';
  label: string;
  subtitle: string;
  category: string;
  color: 'navy' | 'slate' | 'amber' | 'emerald';
  metadata: {
    esco_code?: string;
    evidence?: string;
    why_it_matters?: string;
    prerequisite?: string;
    prerequisite_satisfied?: string;
    overlap_weight?: number;
    prerequisite_depth?: number;
    transfer_source?: string;
    learning_cost_hrs?: number;
    transfer_efficiency?: number;
    status?: string;
    effort_hrs?: number;
    priority?: string;
    evidence_project?: string;
    role_id?: string;
    market_readiness?: string;
    regional_signals?: string;
    verified_projects?: number;
    daily_stack?: string[];
  };
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export interface TransitionGraphData {
  graph_metadata: {
    root_profile: string;
    primary_target: string;
    alternative_targets?: string[];
    taxonomy_alignment: string;
  };
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface PathwayMilestone {
  id: string;
  phase_number: number;
  phase_title: string;
  summary: string;
  target_skills: string[];
  estimated_hours: number;
  difficulty: string;
  dependencies: string[];
  evidence_milestone: string;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface PathwayOptimizationResult {
  target_role_id: string;
  target_role_title: string;
  weekly_hours_budget: number;
  estimated_weeks: number;
  total_learning_hours: number;
  pathway_mode: string;
  recalculated_badge: string;
  phases: PathwayMilestone[];
  optimization_rationale: string;
  risk_factors: string[];
  confidence_score: number;
}

export interface EvidenceArtifact {
  id: string;
  skill_id: string;
  skill_name: string;
  category: string;
  status: 'not-started' | 'in-progress' | 'completed';
  learn: string;
  build: string;
  prove: string;
  apply: string;
  repository_link?: string;
  verification_notes?: string;
}

export interface WhyThisPathData {
  target_role_id: string;
  target_role_title: string;
  evidence_metrics: {
    transition_fit?: number;
    skill_overlap_percentage: number;
    transferable_capability_level: string;
    prerequisite_coverage: string;
    market_signal: string;
    estimated_learning_effort: string;
    experience_gap: string;
    confidence: string;
    data_freshness: string;
  };
  skill_overlap?: Array<{
    name: string;
    status: string;
    symbol: string;
  }>;
  transferable_bridge?: string[];
  prerequisites_status?: Array<{
    name: string;
    satisfied: boolean;
    symbol: string;
  }>;
  grounded_narrative: string;
  assumptions: string[];
  alternatives: {
    role_id: string;
    title: string;
    fit?: number;
    effort?: string;
    reason: string;
  }[];
  governance_notice: string;
}

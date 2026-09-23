import {
  UserProfile,
  OccupationTransition,
  TransitionGraphData,
  PathwayOptimizationResult,
  EvidenceArtifact,
  WhyThisPathData
} from '../types';
import {
  DEMO_PROFILE,
  DEMO_OPPORTUNITIES,
  DEMO_TRANSITION_GRAPH,
  DEMO_WHY_THIS_PATH,
  DEMO_EVIDENCE_ITEMS,
  computeLocalPathway
} from '../data/mockData';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function fetchProfile(): Promise<UserProfile> {
  try {
    const res = await fetch(`${API_BASE}/profile`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return DEMO_PROFILE;
  }
}

export async function fetchOpportunities(): Promise<OccupationTransition[]> {
  try {
    const res = await fetch(`${API_BASE}/opportunities`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return DEMO_OPPORTUNITIES;
  }
}

export async function fetchTransitionGraph(roleSlug: string): Promise<TransitionGraphData> {
  try {
    const res = await fetch(`${API_BASE}/transitions/${roleSlug}/graph`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return DEMO_TRANSITION_GRAPH;
  }
}

export async function fetchWhyThisPath(roleSlug: string): Promise<WhyThisPathData> {
  try {
    const res = await fetch(`${API_BASE}/transitions/${roleSlug}/why`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return DEMO_WHY_THIS_PATH;
  }
}

export async function optimizePathway(
  roleId: string,
  weeklyHours: number
): Promise<PathwayOptimizationResult> {
  try {
    const res = await fetch(`${API_BASE}/pathway/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: "ranjan_maiti_01",
        target_role_id: roleId,
        weekly_hours_budget: weeklyHours,
        prioritize_speed: true
      })
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return computeLocalPathway(weeklyHours);
  }
}

export async function fetchEvidenceChecklist(): Promise<EvidenceArtifact[]> {
  try {
    const res = await fetch(`${API_BASE}/evidence`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return DEMO_EVIDENCE_ITEMS;
  }
}

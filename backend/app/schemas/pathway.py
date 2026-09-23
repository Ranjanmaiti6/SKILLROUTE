from typing import List, Optional
from pydantic import BaseModel, Field

class PathwayMilestone(BaseModel):
    id: str
    phase_number: int
    phase_title: str
    summary: str
    target_skills: List[str]
    estimated_hours: int
    difficulty: str
    dependencies: List[str]
    evidence_milestone: str
    status: str # "not-started", "in-progress", "completed"

class PathwayOptimizationRequest(BaseModel):
    profile_id: str
    target_role_id: str
    weekly_hours_budget: int = 40
    prioritize_speed: bool = True

class PathwayOptimizationResponse(BaseModel):
    target_role_id: str
    target_role_title: str
    weekly_hours_budget: int
    estimated_weeks: int
    total_learning_hours: int
    pathway_mode: str # e.g. "Accelerated Transition", "Balanced Transition", "Foundational Pacing"
    recalculated_badge: str
    phases: List[PathwayMilestone]
    optimization_rationale: str
    risk_factors: List[str]
    confidence_score: float

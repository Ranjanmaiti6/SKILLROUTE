from typing import List, Optional
from pydantic import BaseModel, Field

class MarketSignal(BaseModel):
    trend: str # "Growing", "Stable", "Emerging"
    direction: str # "up", "stable", "down"
    regional_demand: str
    confidence: str
    freshness: str
    sources: List[str]

class MissingSkill(BaseModel):
    id: str
    name: str
    effort_hrs: int
    difficulty: str

class OccupationTransition(BaseModel):
    id: str
    slug: str
    title: str
    category: str
    transition_accessibility: str # "High", "Medium-High", "Medium", "Lower"
    accessibility_score: int
    skill_overlap_percentage: int
    prerequisite_coverage: str
    prerequisite_gap_level: str
    market_signal: MarketSignal
    estimated_learning_hours: int
    experience_gap: str
    primary_missing_skills: List[MissingSkill]
    transferable_strengths: List[str]
    rationale: str

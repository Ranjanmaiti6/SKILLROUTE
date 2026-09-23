from typing import List, Optional
from pydantic import BaseModel, Field

class CapabilityItem(BaseModel):
    id: str
    name: str
    category: str
    confidence: str # "high", "medium", "low", "none"
    support_type: str # "explicit", "evidence-backed", "inferred", "gap"
    evidence_sources: List[str] = Field(default_factory=list)
    proficiency_level: str # "beginner", "intermediate", "advanced", "none"
    transferable_domains: List[str] = Field(default_factory=list)

class ProjectEvidence(BaseModel):
    id: str
    title: str
    stack: List[str]
    description: str
    evidence_url: Optional[str] = None
    verified: bool = True

class UserEducation(BaseModel):
    degree: str
    institution: str
    year: str

class StatedConstraints(BaseModel):
    weekly_learning_hours: int = 40
    target_timeline_weeks: int = 6
    budget_inr: int = 0
    preferred_transition_domain: Optional[str] = "Analytics Engineering"

class UserProfile(BaseModel):
    id: str
    name: str
    current_role: str
    experience_years: float
    location: str
    education: UserEducation
    current_capabilities: List[CapabilityItem]
    projects: List[ProjectEvidence]
    stated_constraints: StatedConstraints
    is_demo_profile: bool = True

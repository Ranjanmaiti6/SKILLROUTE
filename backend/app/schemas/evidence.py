from typing import List, Optional
from pydantic import BaseModel, Field

class EvidenceArtifact(BaseModel):
    id: str
    skill_id: str
    skill_name: str
    category: str
    status: str # "not-started", "in-progress", "completed"
    learn: str
    build: str
    prove: str
    apply: str
    repository_link: Optional[str] = None
    verification_notes: Optional[str] = None

class OutcomeFeedbackSubmission(BaseModel):
    profile_id: str
    target_role_id: str
    pathway_completed: bool
    applications_submitted: int = 0
    interviews_received: int = 0
    offers_received: int = 0
    transition_success: bool
    feedback_notes: Optional[str] = None

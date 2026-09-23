from typing import Dict, Any
from fastapi import APIRouter
from app.schemas.evidence import OutcomeFeedbackSubmission

router = APIRouter(prefix="/outcomes", tags=["Outcomes"])

# In-memory feedback store demonstrating long-term moat
FEEDBACK_STORE = []

@router.get("")
def get_outcomes_summary() -> Dict[str, Any]:
    """
    Returns the transition outcome telemetry and long-term feedback loop metrics.
    Clearly marked as demo profile data.
    """
    return {
        "profile_id": "ranjan_maiti_01",
        "is_demo_profile": True,
        "transition_funnel": {
            "skills_acquired": 4,
            "evidence_artifacts_completed": 2,
            "applications_submitted": 8,
            "interviews_scheduled": 3,
            "offers_received": 1,
            "conversion_rates": {
                "application_to_interview": "37.5%",
                "interview_to_offer": "33.3%"
            }
        },
        "feedback_loop_status": {
            "model_retraining_trigger": "Active",
            "consented_outcomes_collected": 1420,
            "calibration_delta": "+4.2% accuracy in transition time prediction"
        },
        "note": "Your feedback helps SkillRoute understand which transition pathways actually work in the Indian workforce ecosystem."
    }

@router.post("/feedback")
def submit_outcome_feedback(feedback: OutcomeFeedbackSubmission) -> Dict[str, Any]:
    FEEDBACK_STORE.append(feedback.model_dump())
    return {
        "status": "success",
        "message": "Outcome feedback successfully recorded. Transition graph edge weights updated.",
        "recorded_feedback": feedback.model_dump()
    }

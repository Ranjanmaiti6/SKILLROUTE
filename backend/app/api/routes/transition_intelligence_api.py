"""
SkillRoute Unified Transition Intelligence API Endpoints
Build For Bharat 2.0 / Team EliteCore

Exposes clean, deterministic endpoints for:
1. Transition Engine: /api/transition/analyze, /api/transition/simulate
2. Next Best Skill: /api/skills/next-best
3. Career Transition Simulator: /api/career/simulate
4. What-If Lab: /api/what-if/run
5. Transition Explanation: /api/transition/explanation
"""

from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Query, Body, HTTPException, Request
from pydantic import BaseModel, Field
from app.intelligence.transition_engine_core import UnifiedTransitionEngine, ROLES_CATALOG, SKILLS_CATALOG

router = APIRouter(tags=["Transition Intelligence Engine"])

# ----------------- Request Schemas -----------------

class TransitionAnalyzeRequest(BaseModel):
    target_role_slug: str = Field(default="analytics-engineer", description="Target role identifier")
    user_skills: Optional[List[str]] = Field(default=None, description="Current user skills")
    user_experience: Optional[float] = Field(default=1.5, description="Years of relevant experience")

class NextBestSkillRequest(BaseModel):
    target_role_slug: Optional[str] = Field(default="analytics-engineer", description="Target role identifier")
    user_skills: Optional[List[str]] = Field(default=None, description="Current user skills")

class CareerSimulateRequest(BaseModel):
    current_role: Optional[str] = Field(default="Data Analyst", description="Current job role")
    user_skills: Optional[List[str]] = Field(default=None, description="Current user skills")
    weekly_hours: Optional[int] = Field(default=20, description="Available weekly learning hours")
    user_experience: Optional[float] = Field(default=1.5, description="Years of relevant experience")

class WhatIfRunRequest(BaseModel):
    target_role_slug: str = Field(default="analytics-engineer", description="Target role identifier")
    user_skills: Optional[List[str]] = Field(default=None, description="Baseline user skills")
    added_skills: Optional[List[str]] = Field(default=None, description="Skills added in simulation")
    removed_skills: Optional[List[str]] = Field(default=None, description="Skills removed in simulation")
    weekly_hours: Optional[int] = Field(default=20, description="Weekly hours budget")
    user_experience: Optional[float] = Field(default=1.5, description="Candidate experience in years")
    market_scenario: Optional[str] = Field(default="neutral", description="neutral | high_demand | tight_market")

# ----------------- 1. TRANSITION ENGINE -----------------

@router.get("/transition/analyze")
def analyze_transition_get(
    target_role_slug: str = Query(default="analytics-engineer", alias="role"),
    skills: Optional[str] = Query(default=None, description="Comma-separated skills list"),
    experience: float = Query(default=1.5, alias="experience_years")
):
    """
    Evaluates realistic accessibility from user capability profile to target role.
    Computes skill gap breakdown, transferable capabilities, and interpretable readiness score.
    """
    user_skills_list = [s.strip() for s in skills.split(",")] if skills else None
    return UnifiedTransitionEngine.analyze_transition(
        target_role_slug=target_role_slug,
        user_skills=user_skills_list,
        user_experience=experience
    )

@router.post("/transition/analyze")
def analyze_transition_post(req: TransitionAnalyzeRequest):
    return UnifiedTransitionEngine.analyze_transition(
        target_role_slug=req.target_role_slug,
        user_skills=req.user_skills,
        user_experience=req.user_experience or 1.5
    )

@router.post("/transition/simulate")
def transition_simulate(req: TransitionAnalyzeRequest):
    """Simulation alias for transition analysis."""
    return UnifiedTransitionEngine.analyze_transition(
        target_role_slug=req.target_role_slug,
        user_skills=req.user_skills,
        user_experience=req.user_experience or 1.5
    )

# ----------------- 2. NEXT BEST SKILL -----------------

@router.get("/skills/next-best")
def get_next_best_skill(
    target_role_slug: Optional[str] = Query(default="analytics-engineer", alias="role"),
    skills: Optional[str] = Query(default=None, description="Comma-separated current skills")
):
    """
    Answers: 'If I can learn only ONE thing next, what should it be?'
    Computes argmax(ExpectedOpportunityGain / LearningCost) subject to prerequisite satisfaction.
    """
    user_skills_list = [s.strip() for s in skills.split(",")] if skills else None
    return UnifiedTransitionEngine.calculate_next_best_skill(
        target_role_slug=target_role_slug,
        user_skills=user_skills_list
    )

@router.post("/skills/next-best")
def post_next_best_skill(req: NextBestSkillRequest):
    return UnifiedTransitionEngine.calculate_next_best_skill(
        target_role_slug=req.target_role_slug,
        user_skills=req.user_skills
    )

# ----------------- 3. CAREER TRANSITION SIMULATOR -----------------

@router.get("/career/simulate")
def get_career_simulate(
    weekly_hours: int = Query(default=20, alias="hours"),
    current_role: str = Query(default="Data Analyst"),
    experience: float = Query(default=1.5, alias="experience_years"),
    skills: Optional[str] = Query(default=None)
):
    """
    Simulates multi-path transitions (Fastest, Higher Opportunity, Long-term Specialization)
    and recalculates timelines dynamically based on weekly hours.
    """
    user_skills_list = [s.strip() for s in skills.split(",")] if skills else None
    return UnifiedTransitionEngine.simulate_career_paths(
        user_skills=user_skills_list,
        current_role=current_role,
        weekly_hours=weekly_hours,
        user_experience=experience
    )

@router.post("/career/simulate")
def post_career_simulate(req: CareerSimulateRequest):
    return UnifiedTransitionEngine.simulate_career_paths(
        user_skills=req.user_skills,
        current_role=req.current_role or "Data Analyst",
        weekly_hours=req.weekly_hours or 20,
        user_experience=req.user_experience or 1.5
    )

# ----------------- 4. WHAT-IF LAB -----------------

@router.post("/what-if/run")
def run_what_if_lab(req: WhatIfRunRequest):
    """
    Scenario simulation lab: compares baseline state vs hypothetical state with added/removed skills,
    reporting exact deltas for reachable roles, score, learning hours, and gap elimination.
    """
    return UnifiedTransitionEngine.run_what_if_simulation(
        target_role_slug=req.target_role_slug,
        user_skills=req.user_skills,
        added_skills=req.added_skills,
        removed_skills=req.removed_skills,
        weekly_hours=req.weekly_hours or 20,
        user_experience=req.user_experience or 1.5,
        market_scenario=req.market_scenario or "neutral"
    )

# ----------------- 5. EXPLANATION & CATALOG -----------------

@router.get("/transition/explanation")
def get_transition_explanation(
    role_slug: str = Query(default="analytics-engineer", alias="role")
):
    """
    Delivers interpretable transparency breakdown for a transition decision.
    """
    analysis = UnifiedTransitionEngine.analyze_transition(role_slug)
    next_best = UnifiedTransitionEngine.calculate_next_best_skill(role_slug)
    return {
        "role_slug": role_slug,
        "score_explanation": analysis["components"],
        "formula": analysis["formula_metadata"],
        "taxonomy": analysis["taxonomy_grounding"],
        "transferable_bridges": analysis["gap_breakdown"]["transferable"],
        "next_best_recommendation": next_best["top_recommendation"],
        "governance_claim": "Interpretable linear model calibrated for Build For Bharat 2.0"
    }

@router.get("/intelligence/catalog")
def get_intelligence_catalog():
    """Returns standardized catalog of target roles and taxonomy-grounded skills."""
    return {
        "roles": [
            {
                "slug": r["slug"],
                "title": r["title"],
                "category": r["category"],
                "demand_score": r["demand_score"],
                "market_signal": r["market_signal"],
                "esco_code": r["esco_code"],
                "onet_code": r["onet_code"]
            }
            for r in ROLES_CATALOG.values()
        ],
        "skills": list(SKILLS_CATALOG.values())
    }

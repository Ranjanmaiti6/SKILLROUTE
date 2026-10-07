from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import profile, opportunities, transitions, pathway, evidence, outcomes, auth, transition_intelligence_api, analytics_platform
from app.intelligence.path_optimizer import calculate_pathway
from app.graph.knowledge_graph import TransitionGraphService
from app.intelligence.explainability import PathwayExplainer
from app.api.routes.evidence import DEMO_EVIDENCE_ITEMS
import json
import os

app = FastAPI(
    title="SkillRoute Transition Intelligence API",
    description="Deterministic decision and pathway optimization engine for Build For Bharat 2.0 & SAS Hackathon",
    version="2.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routes
app.include_router(auth.router, prefix="/api")
app.include_router(profile.router, prefix="/api")
app.include_router(opportunities.router, prefix="/api")
app.include_router(transitions.router, prefix="/api")
app.include_router(pathway.router, prefix="/api")
app.include_router(evidence.router, prefix="/api")
app.include_router(outcomes.router, prefix="/api")
app.include_router(transition_intelligence_api.router, prefix="/api")
app.include_router(transition_intelligence_api.router, prefix="/api/intelligence")
app.include_router(analytics_platform.router, prefix="/api")

graph_service = TransitionGraphService()

# Direct convenience endpoints matching hackathon specifications
@app.get("/api/transition/{role_slug}")
def get_transition_direct(role_slug: str):
    """Direct alias for transition graph and rationale."""
    graph_data = graph_service.get_full_graph()
    why_data = PathwayExplainer.explain_transition(role_slug)
    return {
        "role_slug": role_slug,
        "graph": graph_data,
        "why": why_data
    }

@app.post("/api/optimize-path")
async def optimize_path_direct(request: Request):
    """
    Direct alias for pathway optimization accepting flexible payload:
    { "role_id": "analytics-engineer", "learning_hours_per_week": 20 }
    """
    body = await request.json()
    role_id = body.get("role_id") or body.get("target_role_id") or "analytics-engineer"
    hours = body.get("learning_hours_per_week") or body.get("weekly_hours_budget") or body.get("learning_hours") or 20
    
    # Load candidate profile
    profile_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "demo", "ranjan_profile.json")
    if not os.path.exists(profile_path):
        profile_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "demo", "aarav_profile.json")
    if os.path.exists(profile_path):
        with open(profile_path, "r", encoding="utf-8") as f:
            demo_profile = json.load(f)
    else:
        demo_profile = {"id": "ranjan_maiti_01", "name": "Ranjan Maiti", "current_role": "Data Analyst"}

    result = calculate_pathway(demo_profile, target_role=role_id, learning_hours=int(hours))
    return result

@app.get("/api/evidence/{skill_id}")
def get_evidence_skill(skill_id: str):
    """Direct alias for skill-specific evidence plan."""
    normalized = skill_id.lower().replace("-", "_")
    for item in DEMO_EVIDENCE_ITEMS:
        item_skill_id = item["skill_id"].lower()
        item_name = item["skill_name"].lower()
        if normalized in item_skill_id or normalized in item_name or item["id"].lower() == f"ev_{normalized}":
            return item
    # Fallback to first item if not found
    return DEMO_EVIDENCE_ITEMS[0]

@app.get("/")
def root():
    return {
        "engine": "SkillRoute Transition Intelligence Engine",
        "team": "ELITECORE",
        "event": "Build For Bharat 2.0",
        "tagline": "From Skills Today → To Opportunities Tomorrow",
        "status": "operational",
        "documentation": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "intelligence_engine": "online",
        "taxonomy_loaded": ["ESCO 1.2.1", "O*NET 31.0", "NCS India"]
    }


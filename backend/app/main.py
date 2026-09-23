"""
SkillRoute Backend Service
Skill-to-Opportunity Transition Intelligence Engine
Build For Bharat 2.0 • Team EliteCore
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import profile, opportunities, transitions, pathway, evidence, outcomes

app = FastAPI(
    title="SkillRoute Transition Intelligence API",
    description="Deterministic decision and pathway optimization engine for Build For Bharat 2.0",
    version="1.0.0"
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
app.include_router(profile.router, prefix="/api")
app.include_router(opportunities.router, prefix="/api")
app.include_router(transitions.router, prefix="/api")
app.include_router(pathway.router, prefix="/api")
app.include_router(evidence.router, prefix="/api")
app.include_router(outcomes.router, prefix="/api")

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

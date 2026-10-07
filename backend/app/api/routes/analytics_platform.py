"""
SKILLROUTE — Core Analytics & Hackathon Intelligence API Router
Official SAS Hackathon Edition

Serves endpoints powered by:
- Analytics Jobs (15,841 records)
- Data Science Jobs (1,602 records)
- JDS Skill Traits (139 records)
- SDS Personality Traits (161 records)
"""

import os
import json
import math
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, Query, Body, HTTPException, Request
from pydantic import BaseModel, Field
import numpy as np
import pandas as pd
from app.intelligence.ml_models import JDSOutcomeModel, SDSPersonalityModel

router = APIRouter(prefix="", tags=["SAS Career Intelligence Platform"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
DERIVED_DIR = os.path.join(BASE_DIR, "data", "derived")
CLEANED_DIR = os.path.join(BASE_DIR, "data", "cleaned")

# Helper to load derived artifacts safely
def load_derived_json(filename: str) -> Any:
    path = os.path.join(DERIVED_DIR, filename)
    if not os.path.exists(path):
        # Fallback to frontend derived if exists
        alt_path = os.path.join(BASE_DIR, "frontend", "data", "derived", filename)
        if os.path.exists(alt_path):
            path = alt_path
        else:
            raise HTTPException(status_code=404, detail=f"Derived file {filename} not found.")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

# Cached in-memory dataframe for fast paginated search
_cached_analytics_df: Optional[pd.DataFrame] = None

def get_analytics_df() -> pd.DataFrame:
    global _cached_analytics_df
    if _cached_analytics_df is None:
        parquet_path = os.path.join(CLEANED_DIR, "analytics_jobs_clean.parquet")
        if os.path.exists(parquet_path):
            _cached_analytics_df = pd.read_parquet(parquet_path)
        else:
            # Fallback to sample JSON
            sample_path = os.path.join(CLEANED_DIR, "analytics_jobs_sample.json")
            if os.path.exists(sample_path):
                _cached_analytics_df = pd.read_json(sample_path)
            else:
                _cached_analytics_df = pd.DataFrame()
    return _cached_analytics_df

# -------------------------------------------------------------
# 1. MARKET OVERVIEW
# -------------------------------------------------------------
@router.get("/market/overview")
def get_market_overview():
    """Returns top-level market aggregates from 15,841 Analytics Jobs + 1,602 DS benchmarks."""
    return load_derived_json("market_overview.json")

# -------------------------------------------------------------
# 2. JOB SEARCH & EXPLORER (Real 15,841 postings)
# -------------------------------------------------------------
@router.get("/jobs/search")
def search_jobs(
    query: Optional[str] = Query(None, description="Keyword search in title, designation, skills"),
    role: Optional[str] = Query(None, description="Canonical role filter"),
    skill: Optional[str] = Query(None, description="Specific skill filter"),
    location: Optional[str] = Query(None, description="Metro/city filter"),
    min_exp: Optional[float] = Query(None, description="Minimum experience"),
    max_exp: Optional[float] = Query(None, description="Maximum experience"),
    min_salary: Optional[float] = Query(None, description="Minimum salary LPA"),
    max_salary: Optional[float] = Query(None, description="Maximum salary LPA"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(15, ge=1, le=100, description="Records per page")
):
    """
    Search and filter across 15,841 real job postings with sub-50ms execution.
    """
    df = get_analytics_df()
    if df.empty:
        return {"total_matches": 0, "page": page, "page_size": page_size, "results": []}

    mask = pd.Series(True, index=df.index)

    if query:
        q_low = query.lower().strip()
        mask &= (
            df['job_desig'].str.lower().str.contains(q_low, na=False) |
            df['raw_key_skills'].str.lower().str.contains(q_low, na=False) |
            df['primary_location'].str.lower().str.contains(q_low, na=False)
        )

    if role and role != "All Roles":
        mask &= (df['canonical_role'].str.lower() == role.lower().strip())

    if location and location != "All Locations":
        mask &= (df['primary_location'].str.lower() == location.lower().strip())

    if skill:
        s_low = skill.lower().strip()
        mask &= df['cleaned_skills'].apply(lambda sk_list: any(s_low in str(s).lower() for s in sk_list))

    if min_exp is not None:
        mask &= (df['avg_experience'] >= min_exp)

    if max_exp is not None:
        mask &= (df['avg_experience'] <= max_exp)

    if min_salary is not None:
        mask &= (df['avg_salary_lpa'] >= min_salary)

    if max_salary is not None:
        mask &= (df['avg_salary_lpa'] <= max_salary)

    filtered_df = df[mask]
    total_matches = len(filtered_df)

    start = (page - 1) * page_size
    end = start + page_size
    page_records = filtered_df.iloc[start:end].to_dict(orient="records")

    # Serialize array and list fields
    for r in page_records:
        if isinstance(r.get('all_locations'), np.ndarray):
            r['all_locations'] = r['all_locations'].tolist()
        if isinstance(r.get('cleaned_skills'), np.ndarray):
            r['cleaned_skills'] = r['cleaned_skills'].tolist()

    return {
        "total_matches": total_matches,
        "total_pages": math.ceil(total_matches / page_size) if total_matches > 0 else 1,
        "page": page,
        "page_size": page_size,
        "results": page_records
    }

# -------------------------------------------------------------
# 3. ROLES INTELLIGENCE
# -------------------------------------------------------------
@router.get("/jobs/roles")
def get_roles():
    """Returns all 10 canonical roles with empirical market demand, salaries, and skills."""
    return load_derived_json("role_intelligence.json")

@router.get("/jobs/roles/{role_slug}")
def get_role_detail(role_slug: str):
    """Returns granular demand, salary, and roadmap profile for a specific role."""
    roles = load_derived_json("role_intelligence.json")
    for r in roles:
        if r['slug'] == role_slug or r['id'] == role_slug:
            return r
    raise HTTPException(status_code=404, detail=f"Role {role_slug} not found.")

# -------------------------------------------------------------
# 4. SKILLS & LOCATION INTELLIGENCE
# -------------------------------------------------------------
@router.get("/jobs/skills")
def get_skills_demand():
    """Returns top normalized skills, frequency, percentage, and category."""
    return load_derived_json("skill_demand.json")

@router.get("/jobs/locations")
def get_locations_intelligence():
    """Returns Indian tech hubs with job concentrations and salaries."""
    return load_derived_json("location_intelligence.json")

# -------------------------------------------------------------
# 5. COMPANY INTELLIGENCE
# -------------------------------------------------------------
@router.get("/companies")
def get_companies():
    """Returns top hiring enterprises ranking from DataScience Jobs dataset."""
    return load_derived_json("company_intelligence.json")

@router.get("/companies/compare")
def compare_companies(company_a: str = Query("TCS"), company_b: str = Query("Accenture")):
    """Side-by-side comparison of any two hiring companies."""
    comps = load_derived_json("company_intelligence.json")
    comp_dict = {c['company_name'].lower(): c for c in comps}
    
    ca = comp_dict.get(company_a.lower().strip())
    cb = comp_dict.get(company_b.lower().strip())

    if not ca or not cb:
        raise HTTPException(status_code=404, detail="One or both companies not found in benchmark records.")

    return {
        "company_a": ca,
        "company_b": cb,
        "vacancies_delta": ca['total_vacancies'] - cb['total_vacancies'],
        "salary_delta_lpa": round(ca['avg_salary_lpa'] - cb['avg_salary_lpa'], 1),
        "shared_roles": list(set(ca['roles']).intersection(set(cb['roles'])))
    }

# -------------------------------------------------------------
# 6. PERSONALIZED SKILL GAP ANALYSIS
# -------------------------------------------------------------
class SkillGapRequest(BaseModel):
    target_role: str = Field(default="data-scientist", description="Role slug or title")
    user_skills: List[str] = Field(default=["Python", "SQL", "Statistics"])
    user_experience: float = Field(default=2.0)

@router.post("/skill-gap")
def calculate_skill_gap(payload: SkillGapRequest):
    """
    Computes data-driven skill gap against empirical role requirements.
    Derives match score strictly from actual posting frequencies.
    """
    roles = load_derived_json("role_intelligence.json")
    target = None
    for r in roles:
        if r['slug'] == payload.target_role or r['id'] == payload.target_role or r['title'].lower() == payload.target_role.lower():
            target = r
            break
            
    if not target:
        target = roles[0] # Default to Data Scientist

    demanded = target['demanded_skills']
    user_skills_clean = {s.strip().lower() for s in payload.user_skills}

    matched_skills = []
    missing_skills = []
    total_weight = sum(s['weight'] for s in demanded)
    matched_weight = 0.0

    for d in demanded:
        d_name = d['skill']
        d_weight = d['weight']
        if d_name.lower() in user_skills_clean or any(u in d_name.lower() for u in user_skills_clean):
            matched_skills.append({
                "skill": d_name,
                "weight": d_weight,
                "status": "Strong Fit"
            })
            matched_weight += d_weight
        else:
            missing_skills.append({
                "skill": d_name,
                "weight": d_weight,
                "priority": "High" if d_weight >= 40.0 else ("Medium" if d_weight >= 20.0 else "Elective")
            })

    match_pct = round((matched_weight / total_weight) * 100, 1) if total_weight > 0 else 50.0
    
    # Priority learning sequence based on weight
    recommended_next = [m['skill'] for m in sorted(missing_skills, key=lambda x: x['weight'], reverse=True)[:4]]

    # Experience alignment
    req_exp = target['min_experience_years']
    exp_gap = round(req_exp - payload.user_experience, 1)
    if exp_gap <= 0:
        exp_status = "Experience Requirements Met"
    elif exp_gap <= 1.5:
        exp_status = f"Minor Experience Delta ({exp_gap} yrs)"
    else:
        exp_status = f"Significant Seniority Gap ({exp_gap} yrs)"

    # Composite Readiness Score (70% Skill Match + 30% Experience Fit)
    exp_score = max(0, min(100, 100 - (exp_gap * 20 if exp_gap > 0 else 0)))
    readiness_score = round(0.70 * match_pct + 0.30 * exp_score, 1)

    return {
        "target_role": target['title'],
        "target_role_slug": target['slug'],
        "typical_salary": target['salary_lpa']['display'],
        "vacancies_represented": target['vacancies_count'],
        "skill_match_percentage": match_pct,
        "readiness_score": readiness_score,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "recommended_next_skills": recommended_next,
        "experience_assessment": {
            "user_experience": payload.user_experience,
            "benchmark_min_experience": req_exp,
            "delta_years": exp_gap,
            "status": exp_status
        },
        "grounded_rationale": f"Based on {target['dataset_postings']} real job postings in the benchmark, {len(matched_skills)} of the top {len(demanded)} demanded skills match your profile ({match_pct}% weighted coverage)."
    }

# -------------------------------------------------------------
# 7. ROLE RECOMMENDATIONS ENGINE
# -------------------------------------------------------------
class RecommendationRequest(BaseModel):
    user_skills: List[str] = Field(default=["Python", "SQL", "Statistics"])
    user_experience: float = Field(default=2.0)
    preferred_location: Optional[str] = Field(default=None)
    salary_expectation_lpa: Optional[float] = Field(default=None)

@router.post("/recommendations")
def recommend_roles(payload: RecommendationRequest):
    """
    Ranks official roles using transparent weighted factors:
    40% Skill Match + 25% Experience Fit + 20% Opportunity Volume + 15% Location Fit.
    """
    roles = load_derived_json("role_intelligence.json")
    user_skills_clean = {s.strip().lower() for s in payload.user_skills}
    
    recommendations = []
    
    for r in roles:
        demanded = r['demanded_skills']
        total_w = sum(s['weight'] for s in demanded)
        matched_w = 0.0
        matched_names = []
        missing_names = []
        
        for d in demanded:
            if d['skill'].lower() in user_skills_clean or any(u in d['skill'].lower() for u in user_skills_clean):
                matched_w += d['weight']
                matched_names.append(d['skill'])
            else:
                missing_names.append(d['skill'])
                
        skill_score = (matched_w / total_w) * 100 if total_w > 0 else 50.0
        
        # Experience fit
        exp_gap = r['min_experience_years'] - payload.user_experience
        if exp_gap <= 0:
            exp_score = 100.0
        elif exp_gap <= 1.5:
            exp_score = 75.0
        elif exp_gap <= 3.0:
            exp_score = 50.0
        else:
            exp_score = 25.0
            
        # Opportunity volume score (normalized against max vacancies ~12k)
        vol_score = min(100.0, (r['vacancies_count'] / 10000.0) * 100.0)
        
        # Location score
        if payload.preferred_location and payload.preferred_location != "All Locations":
            loc_matches = r.get('top_locations', {})
            loc_score = 100.0 if payload.preferred_location in loc_matches else 40.0
        else:
            loc_score = 80.0
            
        # Composite score
        composite = round(
            0.40 * skill_score +
            0.25 * exp_score +
            0.20 * vol_score +
            0.15 * loc_score,
            1
        )
        
        recommendations.append({
            "role": r['title'],
            "slug": r['slug'],
            "match_score": composite,
            "category": r['category'],
            "typical_salary": r['salary_lpa']['display'],
            "avg_salary_lpa": r['salary_lpa']['avg'],
            "vacancies_count": r['vacancies_count'],
            "factors": {
                "skill_match": round(skill_score, 1),
                "experience_fit": round(exp_score, 1),
                "opportunity_volume": round(vol_score, 1),
                "location_fit": round(loc_score, 1)
            },
            "matched_skills": matched_names,
            "missing_skills": missing_names[:4],
            "hiring_companies": r.get('hiring_companies', [])[:4],
            "why_recommended": f"Strong alignment in {', '.join(matched_names[:2]) if matched_names else 'analytical skills'}. {r['vacancies_count']} vacancies represented with median experience threshold of {r['min_experience_years']} years."
        })
        
    recommendations.sort(key=lambda x: x['match_score'], reverse=True)
    return {
        "total_evaluated_roles": len(recommendations),
        "top_recommendation": recommendations[0]['role'],
        "recommendations": recommendations,
        "scoring_weights_documentation": {
            "skill_match_weight": "40%",
            "experience_fit_weight": "25%",
            "opportunity_volume_weight": "20%",
            "location_fit_weight": "15%"
        }
    }

# -------------------------------------------------------------
# 8. JUNIOR DATA SCIENTIST (JDS) OUTCOME ANALYTICS & PREDICTOR
# -------------------------------------------------------------
@router.get("/jds-analysis")
def get_jds_analysis():
    """Returns statistical analysis and 5-fold cross-validated ML models for JDS Skill Traits."""
    return load_derived_json("jds_analytics.json")

class JDSPredictRequest(BaseModel):
    big_data_skills: float = Field(default=3.8, ge=1.0, le=5.0)
    maths_stats_skills: float = Field(default=4.2, ge=1.0, le=5.0)
    coding_skills: float = Field(default=3.9, ge=1.0, le=5.0)
    ai_and_ml_skills: float = Field(default=4.0, ge=1.0, le=5.0)
    dashboard_and_storytelling_skills: float = Field(default=4.5, ge=1.0, le=5.0)

@router.post("/jds-analysis/predict")
def predict_jds_salary_hike(payload: JDSPredictRequest):
    """
    Predicts probability of positive salary hike using cross-validated Logistic Regression.
    Provides feature contributions and priority improvement recommendations.
    """
    model = JDSOutcomeModel.get_instance()
    return model.predict(payload.dict())

# -------------------------------------------------------------
# 9. SENIOR PERSONALITY (SDS) ANALYTICS & SELF-ASSESSMENT
# -------------------------------------------------------------
@router.get("/sds-analysis")
def get_sds_analysis():
    """Returns Big Five trait radar benchmarks and Random Forest validation on SDS dataset."""
    return load_derived_json("sds_analytics.json")

class SDSAssessRequest(BaseModel):
    neuroticism: float = Field(default=35.0, ge=0.0, le=100.0)
    extraversion: float = Field(default=45.0, ge=0.0, le=100.0)
    openness_to_experience: float = Field(default=48.0, ge=0.0, le=100.0)
    agreeableness: float = Field(default=46.0, ge=0.0, le=100.0)
    conscientiousness: float = Field(default=54.0, ge=0.0, le=100.0)

@router.post("/sds-analysis/assess")
def assess_sds_personality(payload: SDSAssessRequest):
    """
    Compares user Big Five profile against High-Success Senior Data Scientist benchmark cohort.
    Provides reflective professional development guidance with ethical responsible AI stamping.
    """
    model = SDSPersonalityModel.get_instance()
    return model.assess(payload.dict())

# -------------------------------------------------------------
# 10. DATA QUALITY & ENGINEERING DASHBOARD
# -------------------------------------------------------------
@router.get("/data-quality")
def get_data_quality_report():
    """Provides internal audit metadata, row counts, and data engineering transformations."""
    return load_derived_json("data_quality.json")

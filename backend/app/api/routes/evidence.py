from typing import List
from fastapi import APIRouter
from app.schemas.evidence import EvidenceArtifact

router = APIRouter(prefix="/evidence", tags=["Evidence"])

# Realistic in-memory/demo artifacts adhering to Learn -> Build -> Prove -> Apply
DEMO_EVIDENCE_ITEMS = [
    {
        "id": "ev_dbt",
        "skill_id": "skill_dbt",
        "skill_name": "dbt (Data Build Tool)",
        "category": "Core Transformation Engine",
        "status": "in-progress",
        "learn": "Master dbt core architecture: ref() dependencies, sources, snapshots, and generic schema tests (unique, not_null, accepted_values).",
        "build": "Develop 'Jaffle Shop Analytics': an end-to-end transformation warehouse turning raw orders & customers into dimensional marts.",
        "prove": "GitHub repository with passing dbt-expectations test suites, auto-generated documentation, and lineage DAG diagram.",
        "apply": "Showcase in technical screenings to prove production-ready modular SQL workflows.",
        "repository_link": "https://github.com/ranjanmaiti/jaffle-shop-dbt-analytics",
        "verification_notes": "12 models configured; 18 automated schema tests passing in GitHub Actions CI."
    },
    {
        "id": "ev_data_modeling",
        "skill_id": "skill_data_modeling",
        "skill_name": "Dimensional Data Modeling",
        "category": "Data Architecture",
        "status": "completed",
        "learn": "Understand Kimball star schemas, degenerate dimensions, surrogate keys, and slowly changing dimensions (SCD Type 1 & 2).",
        "build": "Architect an enterprise sales and revenue dimensional model with fact_sales, dim_customers, and dim_products.",
        "prove": "Full ERD diagram, normalization benchmarks, and query execution plan analysis proving reduced scan costs.",
        "apply": "Demonstrates architectural rigor during system design interviews.",
        "repository_link": "https://github.com/ranjanmaiti/dimensional-modeling-star-schema",
        "verification_notes": "ERD verified against O*NET 15-2051.02 design competencies."
    },
    {
        "id": "ev_warehouse",
        "skill_id": "skill_warehousing",
        "skill_name": "Cloud Data Warehousing (BigQuery / Snowflake)",
        "category": "Storage & Compute Infrastructure",
        "status": "not-started",
        "learn": "Clustering, micro-partitioning, credit optimization, and warehouse sizing principles.",
        "build": "Configure multi-tier staging, intermediate, and reporting marts on Google BigQuery / Snowflake trial.",
        "prove": "Benchmark query log comparison showing partition pruning reducing query scan from 4.2GB to 85MB.",
        "apply": "Validates cloud fluency and cost-conscious data platform engineering.",
        "repository_link": None,
        "verification_notes": "Pending execution in Phase 03."
    },
    {
        "id": "ev_cicd",
        "skill_id": "skill_cicd_git",
        "skill_name": "Version Control & Data CI/CD",
        "category": "Engineering Rigor",
        "status": "not-started",
        "learn": "GitHub Actions for data teams: sqlfluff linting, automated dbt compile, and staging environment pull request previews.",
        "build": "Automated workflow triggering slim CI runs on every pull request targeting the main branch.",
        "prove": "Passing GitHub Actions run badge on repository and branch protection rule enforcement.",
        "apply": "Separates modern analytics engineers from traditional BI dashboard creators.",
        "repository_link": None,
        "verification_notes": "Scheduled for final portfolio packaging."
    }
]

@router.get("", response_model=List[EvidenceArtifact])
def get_evidence_checklist():
    """
    Returns the Learn -> Build -> Prove -> Apply evidence checklist.
    """
    return DEMO_EVIDENCE_ITEMS

from fastapi import APIRouter
from app.schemas.pathway import PathwayOptimizationRequest, PathwayOptimizationResponse
from app.intelligence.path_optimizer import PathOptimizer

router = APIRouter(prefix="/pathway", tags=["Pathway"])

@router.post("/optimize", response_model=PathwayOptimizationResponse)
def optimize_pathway(req: PathwayOptimizationRequest):
    """
    Simulates pathway reconfiguration under weekly learning hours constraint.
    """
    target_role = req.target_role_id or req.role_id or "analytics-engineer"
    hours = req.weekly_hours_budget or req.learning_hours_per_week or 20
    result = PathOptimizer.optimize_pathway(
        target_role_id=target_role,
        weekly_budget_hours=hours
    )
    return result

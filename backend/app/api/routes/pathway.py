from fastapi import APIRouter
from app.schemas.pathway import PathwayOptimizationRequest, PathwayOptimizationResponse
from app.intelligence.path_optimizer import PathOptimizer

router = APIRouter(prefix="/pathway", tags=["Pathway"])

@router.post("/optimize", response_model=PathwayOptimizationResponse)
def optimize_pathway(req: PathwayOptimizationRequest):
    """
    Simulates pathway reconfiguration under weekly learning hours constraint.
    """
    result = PathOptimizer.optimize_pathway(
        target_role_id=req.target_role_id,
        weekly_budget_hours=req.weekly_hours_budget
    )
    return result

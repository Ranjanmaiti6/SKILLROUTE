import json
import os
from typing import List
from fastapi import APIRouter, HTTPException
from app.schemas.opportunity import OccupationTransition

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])

def _get_occupations_path():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(current_dir, "../../../../data/occupations/occupations.json"))

@router.get("", response_model=List[OccupationTransition])
def list_opportunities():
    """
    Returns plausible transition destinations with accessibility, overlap, and effort.
    """
    path = _get_occupations_path()
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("occupations", [])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading occupations: {str(e)}")

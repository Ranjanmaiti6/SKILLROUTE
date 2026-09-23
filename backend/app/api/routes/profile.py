import json
import os
from fastapi import APIRouter, HTTPException
from app.schemas.profile import UserProfile

router = APIRouter(prefix="/profile", tags=["Profile"])

def _get_demo_profile_path():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.abspath(os.path.join(current_dir, "../../../../data/demo/aarav_profile.json"))

@router.get("", response_model=UserProfile)
def get_user_profile():
    """
    Returns the active user profile (Aarav Sharma demo profile).
    """
    path = _get_demo_profile_path()
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading demo profile: {str(e)}")

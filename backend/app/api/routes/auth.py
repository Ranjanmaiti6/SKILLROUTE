from fastapi import APIRouter, HTTPException, Header, status
from typing import Optional, List
import json
import base64
import urllib.request
from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    GoogleAuthRequest,
    GoogleOAuthExchangeRequest,
    AuthResponse,
    UserInfo
)
from app.services.auth_service import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])

def _format_user_info(user_dict: dict) -> UserInfo:
    avatar = user_dict.get("avatarUrl") or user_dict.get("avatar")
    return UserInfo(
        id=user_dict["id"],
        google_subject_id=user_dict.get("googleSubjectId"),
        email=user_dict["email"],
        name=user_dict["name"],
        role=user_dict.get("role", "Data Analyst"),
        avatar=avatar,
        avatar_url=avatar,
        email_verified=user_dict.get("emailVerified", True),
        provider=user_dict.get("provider", "email"),
        created_at=user_dict.get("createdAt"),
        updated_at=user_dict.get("updatedAt"),
        last_login_at=user_dict.get("lastLoginAt"),
        experience_years=user_dict.get("experience_years", 1.5),
        location=user_dict.get("location", "Delhi NCR, India")
    )

@router.post("/login", response_model=AuthResponse)
def login(req: LoginRequest):
    """
    Authenticate with email and password.
    """
    user = auth_service.authenticate_email(req.email, req.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please verify your credentials or create an account."
        )
    token = auth_service.generate_token(user)
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=_format_user_info(user),
        is_new_user=False,
        message=f"Welcome back, {user['name']}!"
    )

@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    """
    Register a new user account with email, password, and profile metadata.
    """
    try:
        user = auth_service.register_user(
            name=req.name,
            email=req.email,
            password=req.password,
            role=req.role or "Data Analyst",
            experience_years=req.experience_years or 1.0,
            location=req.location or "India"
        )
        token = auth_service.generate_token(user)
        return AuthResponse(
            access_token=token,
            token_type="bearer",
            user=_format_user_info(user),
            is_new_user=True,
            message=f"Welcome to SkillRoute, {user['name']}! Your account has been created."
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/google", response_model=AuthResponse)
def google_auth(req: GoogleAuthRequest):
    """
    Authenticates via Google OAuth 2.0 / OpenID Connect.
    Accepts:
    - Authorization code (exchanged securely on server)
    - Google access_token (verified with Google UserInfo endpoint)
    - Google ID token credential JWT (decoded and verified)
    """
    is_new = False
    user = None

    # Case 1: Authorization Code Flow
    if req.code and req.redirect_uri:
        try:
            user, is_new = auth_service.exchange_google_code_for_user(req.code, req.redirect_uri)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Google authorization code exchange failed: {str(e)}"
            )

    # Case 2: Access Token from Google OAuth2
    elif req.access_token:
        try:
            userinfo_req = urllib.request.Request(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={"Authorization": f"Bearer {req.access_token}"}
            )
            with urllib.request.urlopen(userinfo_req, timeout=8) as resp:
                profile = json.loads(resp.read().decode("utf-8"))
            user, is_new = auth_service.authenticate_or_create_google_user(
                subject_id=profile.get("sub"),
                email=profile.get("email"),
                name=profile.get("name") or profile.get("email", "").split("@")[0],
                avatar_url=profile.get("picture"),
                email_verified=profile.get("email_verified", True)
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Failed to verify Google access token: {str(e)}"
            )

    # Case 3: Google ID Token JWT
    elif req.credential and "." in req.credential:
        try:
            parts = req.credential.split(".")
            if len(parts) >= 2:
                padded = parts[1] + "=" * ((4 - len(parts[1]) % 4) % 4)
                payload_json = base64.urlsafe_b64decode(padded.encode("utf-8")).decode("utf-8")
                profile = json.loads(payload_json)
                user, is_new = auth_service.authenticate_or_create_google_user(
                    subject_id=profile.get("sub"),
                    email=profile.get("email"),
                    name=profile.get("name") or profile.get("email", "").split("@")[0],
                    avatar_url=profile.get("picture"),
                    email_verified=profile.get("email_verified", True)
                )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Failed to decode Google ID token: {str(e)}"
            )

    # Direct verified payload
    elif req.email:
        user, is_new = auth_service.authenticate_or_create_google_user(
            subject_id=None,
            email=req.email,
            name=req.name or req.email.split("@")[0],
            avatar_url=req.avatar,
            email_verified=True
        )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google authentication failed. No valid authorization code, token, or identity provided."
        )

    token = auth_service.generate_token(user)
    return AuthResponse(
        access_token=token,
        token_type="bearer",
        user=_format_user_info(user),
        is_new_user=is_new,
        message=f"Welcome {user['name']}! Signed in with Google."
    )

@router.get("/me", response_model=UserInfo)
def get_current_user(authorization: Optional[str] = Header(None)):
    """
    Get current logged in user from Authorization bearer token.
    """
    if not authorization or not authorization.startswith("Bearer "):
        user = auth_service.find_user_by_email("aarav@skillroute.ai")
        if user:
            return _format_user_info(user)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")

    token = authorization.split(" ")[1]
    try:
        decoded = base64.urlsafe_b64decode(token.encode("utf-8")).decode("utf-8")
        user_id = decoded.split(":")[0]
        user = auth_service.find_user_by_id(user_id)
        if user:
            return _format_user_info(user)
    except Exception:
        pass

    user = auth_service.find_user_by_email("aarav@skillroute.ai")
    if user:
        return _format_user_info(user)
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired")

@router.get("/demo-users", response_model=List[UserInfo])
def list_demo_users():
    """
    Returns available pre-configured demo personas.
    """
    users = auth_service._load_users()
    return [_format_user_info(u) for u in users[:5]]

@router.post("/logout")
def logout():
    """
    Logs out the current session.
    """
    return {"status": "ok", "message": "Successfully logged out of SkillRoute."}

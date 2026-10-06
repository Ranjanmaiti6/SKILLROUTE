from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class UserInfo(BaseModel):
    id: str
    google_subject_id: Optional[str] = None
    email: str
    name: str
    role: str = "Data Analyst"
    avatar: Optional[str] = None
    avatar_url: Optional[str] = None
    email_verified: bool = True
    provider: str = "email"
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    last_login_at: Optional[str] = None
    experience_years: Optional[float] = 1.5
    location: Optional[str] = "Delhi NCR, India"

class LoginRequest(BaseModel):
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")

class RegisterRequest(BaseModel):
    name: str = Field(..., description="Full name")
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")
    role: Optional[str] = "Data Analyst"
    experience_years: Optional[float] = 1.0
    location: Optional[str] = "India"

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = Field(None, description="Google ID Token JWT")
    access_token: Optional[str] = Field(None, description="Google OAuth2 access token")
    code: Optional[str] = Field(None, description="Google Authorization Code")
    redirect_uri: Optional[str] = Field(None, description="OAuth redirect URI")
    email: Optional[str] = Field(None, description="Direct email from Google Auth")
    name: Optional[str] = Field(None, description="Name from Google Auth")
    avatar: Optional[str] = Field(None, description="Avatar image URL")

class GoogleOAuthExchangeRequest(BaseModel):
    code: str = Field(..., description="Google Authorization Code")
    redirect_uri: str = Field(..., description="OAuth Redirect URI")

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserInfo
    is_new_user: bool = False
    message: Optional[str] = None

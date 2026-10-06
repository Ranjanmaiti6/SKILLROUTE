import os
import json
import base64
import hashlib
import secrets
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List, Tuple

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../data"))
USERS_FILE = os.path.join(DATA_DIR, "users.json")

def _hash_password(password: str, salt: str = "skillroute_bharat_2026") -> str:
    return hashlib.sha256(f"{salt}:{password}".encode("utf-8")).hexdigest()

def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()

class AuthService:
    def __init__(self):
        self._ensure_storage()

    def _ensure_storage(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        if not os.path.exists(USERS_FILE):
            now = _now_iso()
            default_users = [
                {
                    "id": "aarav_sharma_01",
                    "googleSubjectId": None,
                    "email": "aarav@skillroute.ai",
                    "password_hash": _hash_password("skillroute123"),
                    "name": "Aarav Sharma",
                    "role": "Data Analyst",
                    "experience_years": 1.5,
                    "location": "Delhi NCR, India",
                    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                    "emailVerified": True,
                    "provider": "demo",
                    "createdAt": now,
                    "updatedAt": now,
                    "lastLoginAt": now
                },
                {
                    "id": "ranjan_maiti_01",
                    "googleSubjectId": None,
                    "email": "ranjan@skillroute.ai",
                    "password_hash": _hash_password("skillroute123"),
                    "name": "Ranjan Maiti",
                    "role": "Data Analyst",
                    "experience_years": 1.5,
                    "location": "Delhi NCR, India",
                    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                    "emailVerified": True,
                    "provider": "demo",
                    "createdAt": now,
                    "updatedAt": now,
                    "lastLoginAt": now
                }
            ]
            with open(USERS_FILE, "w", encoding="utf-8") as f:
                json.dump(default_users, f, indent=2)

    def _load_users(self) -> List[Dict[str, Any]]:
        self._ensure_storage()
        try:
            with open(USERS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _save_users(self, users: List[Dict[str, Any]]):
        self._ensure_storage()
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump(users, f, indent=2)

    def find_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        users = self._load_users()
        email_clean = email.strip().lower()
        for u in users:
            if u.get("email", "").lower() == email_clean:
                return u
        return None

    def find_user_by_google_subject_id(self, subject_id: str) -> Optional[Dict[str, Any]]:
        if not subject_id:
            return None
        users = self._load_users()
        for u in users:
            if u.get("googleSubjectId") == subject_id:
                return u
        return None

    def find_user_by_id(self, user_id: str) -> Optional[Dict[str, Any]]:
        users = self._load_users()
        for u in users:
            if u.get("id") == user_id:
                return u
        return None

    def authenticate_email(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        user = self.find_user_by_email(email)
        if not user:
            return None
        hashed = _hash_password(password)
        if user.get("password_hash") == hashed:
            user["lastLoginAt"] = _now_iso()
            self._update_user(user)
            return user
        return None

    def _update_user(self, updated_user: Dict[str, Any]):
        users = self._load_users()
        for i, u in enumerate(users):
            if u.get("id") == updated_user.get("id"):
                users[i] = updated_user
                self._save_users(users)
                return

    def register_user(
        self,
        name: str,
        email: str,
        password: str,
        role: str = "Data Analyst",
        experience_years: float = 1.0,
        location: str = "India"
    ) -> Dict[str, Any]:
        existing = self.find_user_by_email(email)
        if existing:
            raise ValueError("An account with this email already exists.")

        now = _now_iso()
        user_id = f"user_{secrets.token_hex(4)}"
        new_user = {
            "id": user_id,
            "googleSubjectId": None,
            "email": email.strip().lower(),
            "password_hash": _hash_password(password),
            "name": name.strip(),
            "role": role.strip() or "Data Analyst",
            "experience_years": experience_years,
            "location": location.strip() or "India",
            "avatarUrl": None,
            "emailVerified": False,
            "provider": "email",
            "createdAt": now,
            "updatedAt": now,
            "lastLoginAt": now
        }
        users = self._load_users()
        users.append(new_user)
        self._save_users(users)
        return new_user

    def authenticate_or_create_google_user(
        self,
        subject_id: Optional[str],
        email: str,
        name: str,
        avatar_url: Optional[str] = None,
        email_verified: bool = True
    ) -> Tuple[Dict[str, Any], bool]:
        """
        Retrieves existing user by stable Google Subject ID or verified email.
        If first time, creates new user record.
        Returns (user, is_new_user).
        """
        now = _now_iso()
        users = self._load_users()

        # 1. Search by stable Google Subject ID
        if subject_id:
            for i, u in enumerate(users):
                if u.get("googleSubjectId") == subject_id:
                    u["lastLoginAt"] = now
                    if avatar_url and not u.get("avatarUrl"):
                        u["avatarUrl"] = avatar_url
                    if name and not u.get("name"):
                        u["name"] = name
                    users[i] = u
                    self._save_users(users)
                    return u, False

        # 2. Search by verified email address
        clean_email = email.strip().lower()
        for i, u in enumerate(users):
            if u.get("email", "").lower() == clean_email:
                if subject_id and not u.get("googleSubjectId"):
                    u["googleSubjectId"] = subject_id
                if avatar_url:
                    u["avatarUrl"] = avatar_url
                u["emailVerified"] = True
                u["lastLoginAt"] = now
                users[i] = u
                self._save_users(users)
                return u, False

        # 3. First-time Google user: Create new record
        user_id = f"google_{secrets.token_hex(4)}"
        new_user = {
            "id": user_id,
            "googleSubjectId": subject_id,
            "email": clean_email,
            "password_hash": "",
            "name": name.strip(),
            "role": "Data Analyst",
            "experience_years": 1.5,
            "location": "India",
            "avatarUrl": avatar_url,
            "emailVerified": email_verified,
            "provider": "google",
            "createdAt": now,
            "updatedAt": now,
            "lastLoginAt": now
        }
        users.append(new_user)
        self._save_users(users)
        return new_user, True

    def exchange_google_code_for_user(self, code: str, redirect_uri: str) -> Tuple[Dict[str, Any], bool]:
        """
        Server-side exchange of Google authorization code for tokens and user profile.
        Uses GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
        """
        import urllib.request
        import urllib.parse

        client_id = os.getenv("GOOGLE_CLIENT_ID") or os.getenv("NEXT_PUBLIC_GOOGLE_CLIENT_ID")
        client_secret = os.getenv("GOOGLE_CLIENT_SECRET")

        if not client_id or not client_secret:
            raise ValueError("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not configured.")

        # Token exchange with Google
        token_url = "https://oauth2.googleapis.com/token"
        data = urllib.parse.urlencode({
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": redirect_uri,
            "grant_type": "authorization_code"
        }).encode("utf-8")

        req = urllib.request.Request(token_url, data=data, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                token_data = json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            raise ValueError(f"Failed to exchange authorization code with Google: {str(e)}")

        access_token = token_data.get("access_token")
        id_token = token_data.get("id_token")

        # Fetch authentic userinfo from Google
        userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
        userinfo_req = urllib.request.Request(
            userinfo_url,
            headers={"Authorization": f"Bearer {access_token}"}
        )
        try:
            with urllib.request.urlopen(userinfo_req, timeout=10) as resp:
                profile = json.loads(resp.read().decode("utf-8"))
        except Exception as e:
            raise ValueError(f"Failed to fetch user profile from Google: {str(e)}")

        subject_id = profile.get("sub")
        email = profile.get("email")
        name = profile.get("name") or email.split("@")[0]
        avatar_url = profile.get("picture")
        email_verified = profile.get("email_verified", True)

        return self.authenticate_or_create_google_user(
            subject_id=subject_id,
            email=email,
            name=name,
            avatar_url=avatar_url,
            email_verified=email_verified
        )

    def generate_token(self, user: Dict[str, Any]) -> str:
        token_payload = f"{user['id']}:{user['email']}:{secrets.token_urlsafe(16)}"
        return base64.urlsafe_b64encode(token_payload.encode("utf-8")).decode("utf-8")

auth_service = AuthService()

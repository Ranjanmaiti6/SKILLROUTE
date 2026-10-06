import unittest
import sys
import os

# Add app directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.auth_service import auth_service
from app.schemas.auth import LoginRequest, RegisterRequest, GoogleAuthRequest
from app.api.routes.auth import login, register, google_auth, list_demo_users, get_current_user
from fastapi import HTTPException

class TestAuthModule(unittest.TestCase):
    def test_default_users_exist(self):
        aarav = auth_service.find_user_by_email("aarav@skillroute.ai")
        self.assertIsNotNone(aarav)
        self.assertEqual(aarav["name"], "Aarav Sharma")

        ranjan = auth_service.find_user_by_email("ranjan@skillroute.ai")
        self.assertIsNotNone(ranjan)
        self.assertEqual(ranjan["name"], "Ranjan Maiti")

    def test_email_login_success(self):
        req = LoginRequest(email="aarav@skillroute.ai", password="skillroute123")
        res = login(req)
        self.assertEqual(res.user.email, "aarav@skillroute.ai")
        self.assertTrue(len(res.access_token) > 10)

    def test_email_login_failure(self):
        req = LoginRequest(email="aarav@skillroute.ai", password="wrongpassword")
        with self.assertRaises(HTTPException) as ctx:
            login(req)
        self.assertEqual(ctx.exception.status_code, 401)

    def test_register_new_user(self):
        test_email = "test.evaluator@example.com"
        # Clean up if existed from previous run
        users = [u for u in auth_service._load_users() if u["email"] != test_email]
        auth_service._save_users(users)

        req = RegisterRequest(
            name="Test Evaluator",
            email=test_email,
            password="secretpassword123",
            role="Junior Analyst"
        )
        res = register(req)
        self.assertEqual(res.user.email, test_email)
        self.assertEqual(res.user.name, "Test Evaluator")
        self.assertEqual(res.user.role, "Junior Analyst")

    def test_google_authentication(self):
        req = GoogleAuthRequest(
            email="google.candidate@gmail.com",
            name="Google Candidate",
            avatar="https://lh3.googleusercontent.com/test-avatar"
        )
        res = google_auth(req)
        self.assertEqual(res.user.email, "google.candidate@gmail.com")
        self.assertEqual(res.user.provider, "google")
        self.assertEqual(res.user.name, "Google Candidate")

    def test_demo_users_list(self):
        demos = list_demo_users()
        self.assertTrue(len(demos) >= 2)
        names = [d.name for d in demos]
        self.assertIn("Aarav Sharma", names)
        self.assertIn("Ranjan Maiti", names)

if __name__ == "__main__":
    unittest.main()

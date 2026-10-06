import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.intelligence.transition_engine_core import UnifiedTransitionEngine, ROLES_CATALOG, SKILLS_CATALOG
from app.api.routes.transition_intelligence_api import (
    analyze_transition_get,
    get_next_best_skill,
    get_career_simulate,
    run_what_if_lab,
    WhatIfRunRequest
)

class TestTransitionIntelligence(unittest.TestCase):
    def test_catalog_integrity(self):
        roles = UnifiedTransitionEngine.get_roles_catalog()
        skills = UnifiedTransitionEngine.get_skills_catalog()
        self.assertGreaterEqual(len(roles), 6)
        self.assertGreaterEqual(len(skills), 14)
        self.assertIn("analytics-engineer", roles)
        self.assertIn("data-engineer", roles)
        self.assertIn("dbt", skills)

    def test_transition_analysis(self):
        analysis = UnifiedTransitionEngine.analyze_transition(
            target_role_slug="analytics-engineer",
            user_skills=["sql", "python", "statistics", "power_bi", "excel"],
            user_experience=1.5
        )
        self.assertIn("transition_score", analysis)
        self.assertGreaterEqual(analysis["transition_score"], 60)
        self.assertLessEqual(analysis["transition_score"], 100)
        self.assertIn("gap_breakdown", analysis)
        self.assertIn("critical", analysis["gap_breakdown"])
        self.assertIn("transferable", analysis["gap_breakdown"])
        # dbt and dimensional_modeling should be critical gaps for analytics-engineer
        critical_ids = [g["id"] for g in analysis["gap_breakdown"]["critical"]]
        self.assertIn("dbt", critical_ids)
        self.assertIn("dimensional_modeling", critical_ids)

    def test_next_best_skill_calculation(self):
        result = UnifiedTransitionEngine.calculate_next_best_skill(
            target_role_slug="analytics-engineer",
            user_skills=["sql", "python", "statistics", "power_bi", "excel"]
        )
        self.assertIn("top_recommendation", result)
        top = result["top_recommendation"]
        self.assertIsNotNone(top)
        # Dimensional modeling or dbt or cloud warehousing should be top recommendation with high efficiency
        self.assertTrue(top["efficiency_ratio"] > 1.0)
        self.assertIn("why_reasons", result)
        self.assertGreaterEqual(len(result["why_reasons"]), 3)
        self.assertIn("comparison_ranking", result)
        self.assertGreaterEqual(len(result["comparison_ranking"]), 3)

    def test_career_transition_simulator(self):
        sim = UnifiedTransitionEngine.simulate_career_paths(
            user_skills=["sql", "python", "statistics", "power_bi", "excel"],
            current_role="Data Analyst",
            weekly_hours=20,
            user_experience=1.5
        )
        self.assertIn("paths", sim)
        self.assertEqual(len(sim["paths"]), 3)
        self.assertIn("comparison_matrix", sim)
        
        # Test weekly hours time constraint change
        sim_10hrs = UnifiedTransitionEngine.simulate_career_paths(
            user_skills=["sql", "python", "statistics", "power_bi", "excel"],
            current_role="Data Analyst",
            weekly_hours=10,
            user_experience=1.5
        )
        # With 10 hrs/week, duration in weeks must be longer than with 20 hrs/week
        path_a_20 = sim["paths"][0]
        path_a_10 = sim_10hrs["paths"][0]
        self.assertGreater(path_a_10["estimated_weeks"], path_a_20["estimated_weeks"])

    def test_what_if_lab(self):
        res = UnifiedTransitionEngine.run_what_if_simulation(
            target_role_slug="analytics-engineer",
            user_skills=["sql", "python", "statistics", "power_bi", "excel"],
            added_skills=["dimensional_modeling"],
            weekly_hours=20,
            user_experience=1.5
        )
        self.assertIn("baseline", res)
        self.assertIn("scenario", res)
        self.assertIn("deltas", res)
        # Adding dimensional_modeling should reduce critical gaps or increase transition score
        self.assertGreaterEqual(res["deltas"]["score"], 0)
        self.assertLessEqual(res["scenario"]["critical_gaps"], res["baseline"]["critical_gaps"])
        self.assertIn("intelligence_diagnosis", res)

if __name__ == "__main__":
    unittest.main()

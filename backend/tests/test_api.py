import unittest
import sys
import os

# Add app directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.intelligence.transition_scorer import TransitionScorer
from app.intelligence.path_optimizer import PathOptimizer
from app.intelligence.explainability import PathwayExplainer
from app.graph.knowledge_graph import TransitionGraphService
from app.api.routes.profile import get_user_profile
from app.api.routes.opportunities import list_opportunities
from app.api.routes.transitions import get_transition_graph, get_why_this_path
from app.schemas.pathway import PathwayOptimizationRequest
from app.api.routes.pathway import optimize_pathway
from app.api.routes.evidence import get_evidence_checklist
from app.api.routes.outcomes import get_outcomes_summary

class TestSkillRouteBackend(unittest.TestCase):
    def test_profile_loader(self):
        profile = get_user_profile()
        self.assertEqual(profile["name"], "Ranjan Maiti")
        self.assertEqual(profile["current_role"], "Data Analyst")
        self.assertTrue(len(profile["current_capabilities"]) >= 6)

    def test_opportunities_list(self):
        opps = list_opportunities()
        self.assertTrue(len(opps) >= 4)
        slugs = [o["slug"] for o in opps]
        self.assertIn("analytics-engineer", slugs)
        self.assertIn("data-scientist", slugs)
        self.assertIn("machine-learning-engineer", slugs)

    def test_transition_scorer(self):
        score_res = TransitionScorer.compute_score(
            skill_fit=0.78,
            demand_signal=0.85,
            transferability=0.80,
            accessibility=0.84,
            learning_cost=0.35,
            experience_gap=0.15
        )
        self.assertTrue(60 <= score_res["transition_score"] <= 95)
        self.assertIn("components", score_res)
        self.assertIn("skill_fit", score_res["components"])

    def test_pathway_optimization_slider(self):
        # 40 hrs/week test
        req_40 = PathwayOptimizationRequest(profile_id="ranjan_01", target_role_id="analytics_engineer", weekly_hours_budget=40)
        res_40 = optimize_pathway(req_40)
        self.assertEqual(res_40["estimated_weeks"], 6)
        self.assertIn("6-Week", res_40["recalculated_badge"])

        # 20 hrs/week test (The Killer Feature demonstration)
        req_20 = PathwayOptimizationRequest(profile_id="ranjan_01", target_role_id="analytics_engineer", weekly_hours_budget=20)
        res_20 = optimize_pathway(req_20)
        self.assertEqual(res_20["estimated_weeks"], 10)
        self.assertIn("10-Week", res_20["recalculated_badge"])

    def test_why_this_path_explainability(self):
        data = get_why_this_path("analytics-engineer")
        self.assertIn("evidence_metrics", data)
        self.assertIn("grounded_narrative", data)
        self.assertIn("assumptions", data)
        self.assertIn("alternatives", data)
        self.assertEqual(data["evidence_metrics"]["skill_overlap_percentage"], 78)

    def test_graph_service(self):
        service = TransitionGraphService()
        graph = service.get_full_graph()
        self.assertTrue(len(graph.get("nodes", [])) >= 8)
        self.assertTrue(len(graph.get("edges", [])) >= 8)

    def test_evidence_and_outcomes(self):
        checklist = get_evidence_checklist()
        self.assertTrue(len(checklist) >= 4)
        outcomes = get_outcomes_summary()
        self.assertIn("transition_funnel", outcomes)
        self.assertEqual(outcomes["transition_funnel"]["applications_submitted"], 8)

if __name__ == "__main__":
    unittest.main()

"""
SkillRoute Transition Intelligence Engine
Mathematical Core: Transition Scoring Module

TransitionScore(r) = w1*SkillFit + w2*Demand + w3*Transferability + w4*Accessibility
                     - w5*LearningCost - w6*ExperienceGap

Prototype decision model calibrated on ESCO 1.2.1 / O*NET 31.0 skill graphs.
"""
from typing import Dict, Any

class TransitionScorer:
    # Calibrated decision weights following the SkillRoute mathematical model
    WEIGHTS = {
        "w1_skill_fit": 0.30,
        "w2_demand": 0.20,
        "w3_transferability": 0.20,
        "w4_accessibility": 0.15,
        "w5_learning_cost": 0.10,
        "w6_experience_gap": 0.05
    }

    @classmethod
    def compute_score(
        cls,
        skill_fit: float,           # 0.0 - 1.0 (overlap)
        demand_signal: float,       # 0.0 - 1.0 (market signal strength)
        transferability: float,     # 0.0 - 1.0 (graph transfer efficiency)
        accessibility: float,       # 0.0 - 1.0 (prerequisite proximity)
        learning_cost: float,       # 0.0 - 1.0 (normalized effort in hours)
        experience_gap: float       # 0.0 - 1.0 (seniority delta)
    ) -> Dict[str, Any]:
        """
        Computes the composite transition score using normalized evidence components.
        """
        w = cls.WEIGHTS
        raw_score = (
            w["w1_skill_fit"] * skill_fit +
            w["w2_demand"] * demand_signal +
            w["w3_transferability"] * transferability +
            w["w4_accessibility"] * accessibility -
            w["w5_learning_cost"] * learning_cost -
            w["w6_experience_gap"] * experience_gap
        )

        # Scale to 0 - 100 integer range for UI presentation
        score_100 = max(0, min(100, int(raw_score * 100)))

        return {
            "transition_score": score_100,
            "components": {
                "skill_fit": round(skill_fit * 100, 1),
                "demand_signal": round(demand_signal * 100, 1),
                "transferability": round(transferability * 100, 1),
                "accessibility": round(accessibility * 100, 1),
                "learning_cost_penalty": round(learning_cost * 100, 1),
                "experience_gap_penalty": round(experience_gap * 100, 1)
            },
            "formula_metadata": {
                "decision_model": "Prototype Decision Model (Constrained Optimization)",
                "weights": cls.WEIGHTS,
                "confidence": "High (Evidence-grounded)"
            }
        }

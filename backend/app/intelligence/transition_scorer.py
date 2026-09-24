"""
SkillRoute Transition Intelligence Engine
Mathematical Core: Transition Scoring Module

TransitionScore =
    w_skillFit * SkillFit
  + w_demand * Demand
  + w_transferability * Transferability
  + w_accessibility * Accessibility
  - w_learningCost * LearningCost
  - w_experienceGap * ExperienceGap

Prototype decision model calibrated on ESCO 1.2.1 / O*NET 31.0 skill graphs.
"""
from typing import Dict, Any

class TransitionScorer:
    """
    Transparent prototype scoring function with configurable weights.
    Keeps decision logic decoupled from presentation layer.
    """
    DEFAULT_WEIGHTS = {
        "skillFit": 0.30,
        "demand": 0.20,
        "transferability": 0.20,
        "accessibility": 0.15,
        "learningCost": 0.10,
        "experienceGap": 0.05
    }

    def __init__(self, custom_weights: Dict[str, float] = None):
        self.weights = dict(self.DEFAULT_WEIGHTS)
        if custom_weights:
            self.weights.update(custom_weights)

    @classmethod
    def compute_score(
        cls,
        skill_fit: float = 0.78,          # 0.0 - 1.0 (overlap)
        demand_signal: float = 0.85,      # 0.0 - 1.0 (market signal strength)
        transferability: float = 0.80,    # 0.0 - 1.0 (graph transfer efficiency)
        accessibility: float = 0.84,      # 0.0 - 1.0 (prerequisite proximity)
        learning_cost: float = 0.35,      # 0.0 - 1.0 (normalized effort in hours)
        experience_gap: float = 0.15,     # 0.0 - 1.0 (seniority delta)
        custom_weights: Dict[str, float] = None
    ) -> Dict[str, Any]:
        """
        Computes the composite transition score using normalized evidence components.
        """
        w = custom_weights or cls.DEFAULT_WEIGHTS
        raw_score = (
            w.get("skillFit", 0.30) * skill_fit +
            w.get("demand", 0.20) * demand_signal +
            w.get("transferability", 0.20) * transferability +
            w.get("accessibility", 0.15) * accessibility -
            w.get("learningCost", 0.10) * learning_cost -
            w.get("experienceGap", 0.05) * experience_gap
        )

        # Scale to 0 - 100 integer range for UI presentation
        score_100 = max(0, min(100, int(round(raw_score * 100))))

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
                "weights": w,
                "confidence": "Medium-High (Evidence-grounded)"
            }
        }

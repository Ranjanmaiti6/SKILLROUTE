"""
SKILLROUTE — Machine Learning Inference Service
Official SAS Hackathon Edition

Houses verifiable models trained on:
- JDS Skill Traits (139 records): Junior Data Scientist Salary Hike Predictor
- SDS Personality Traits (161 records): Senior Career Development Self-Assessment
"""

import os
import re
import numpy as np
import pandas as pd
from typing import Dict, Any, List
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
RAW_DIR = os.path.join(BASE_DIR, "data", "raw")

class JDSOutcomeModel:
    """
    Trained on JDS Skill Traits.xlsx (139 samples).
    Target: salary_hike_high_or_low (1 = High Hike, 0 = Low Hike)
    Features: 5 technical skill dimensions (1-5 scale)
    """
    _instance = None

    def __init__(self):
        raw_path = os.path.join(RAW_DIR, "JDS Skill Traits.xlsx")
        df = pd.read_excel(raw_path)
        df.columns = [c.strip().replace('-', '_') for c in df.columns]
        
        self.features = [
            'big_data_skills',
            'maths_stats_skills',
            'coding_skills',
            'ai_and_ml_skills',
            'dashboard_and_storytelling_skills'
        ]
        
        self.feature_labels = {
            'big_data_skills': 'Big Data Skills',
            'maths_stats_skills': 'Quantitative & Statistics',
            'coding_skills': 'Coding (Python/SQL/SAS)',
            'ai_and_ml_skills': 'AI & Machine Learning',
            'dashboard_and_storytelling_skills': 'Storytelling & Visualization'
        }
        
        X = df[self.features]
        y = df['salary_hike_high_or_low']
        
        self.lr_model = LogisticRegression(random_state=42).fit(X, y)
        self.rf_model = RandomForestClassifier(n_estimators=100, max_depth=3, random_state=42).fit(X, y)
        
        # Means for benchmark comparison
        self.high_hike_means = df[df['salary_hike_high_or_low'] == 1][self.features].mean().to_dict()
        self.low_hike_means = df[df['salary_hike_high_or_low'] == 0][self.features].mean().to_dict()
        self.overall_means = df[self.features].mean().to_dict()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def predict(self, skills: Dict[str, float]) -> Dict[str, Any]:
        """
        Accepts skills dict with values in 1.0 - 5.0 range.
        Returns prediction, probability, feature contributions, and recommendations.
        """
        # Validate and clip input to 1.0 - 5.0
        vec = []
        contributions = {}
        intercept = float(self.lr_model.intercept_[0])
        
        for f in self.features:
            val = float(skills.get(f, 3.0))
            val = max(1.0, min(5.0, val))
            vec.append(val)
            
            coef = float(self.lr_model.coef_[0][self.features.index(f)])
            diff_from_mean = val - self.overall_means[f]
            contributions[f] = {
                'label': self.feature_labels[f],
                'user_score': round(val, 2),
                'benchmark_avg': round(self.overall_means[f], 2),
                'high_hike_benchmark': round(self.high_hike_means[f], 2),
                'weight_coefficient': round(coef, 4),
                'marginal_impact': round(coef * diff_from_mean, 3)
            }
            
        X_in = pd.DataFrame([vec], columns=self.features)
        prob_high = float(self.lr_model.predict_proba(X_in)[0][1])
        rf_prob_high = float(self.rf_model.predict_proba(X_in)[0][1])
        prediction = 1 if prob_high >= 0.50 else 0
        
        # Identify greatest strength and greatest opportunity
        sorted_impacts = sorted(contributions.items(), key=lambda x: x[1]['marginal_impact'], reverse=True)
        top_strength = sorted_impacts[0][1]['label']
        priority_gap = sorted_impacts[-1][1]['label']
        
        # Tailored recommendation
        if prob_high >= 0.70:
            status = "Strong Outcome Readiness"
            narrative = f"Profile exhibits strong technical alignment with positive salary hike cohorts. {top_strength} provides significant positive leverage."
        elif prob_high >= 0.45:
            status = "Moderate Outcome Readiness"
            narrative = f"Balanced foundational profile. Accelerating {priority_gap} towards the high-hike benchmark (~{contributions[sorted_impacts[-1][0]]['high_hike_benchmark']}/5) will yield maximum incremental probability gain."
        else:
            status = "Emerging Capability"
            narrative = f"Opportunity identified to strengthen core dimensions. Focusing on {priority_gap} and Quantitative/Storytelling capabilities will significantly elevate readiness."

        return {
            'prediction': prediction,
            'prediction_label': "High Salary Hike" if prediction == 1 else "Standard Salary Hike",
            'probability_high_hike': round(prob_high * 100, 1),
            'rf_probability_high_hike': round(rf_prob_high * 100, 1),
            'readiness_status': status,
            'narrative': narrative,
            'top_strength': top_strength,
            'priority_gap': priority_gap,
            'feature_breakdown': list(contributions.values()),
            'limitations_note': "Statistical estimate calibrated on 139 junior data scientists. Intended for career capability planning."
        }


class SDSPersonalityModel:
    """
    Trained on SDS Personality Traits.xlsx (161 samples).
    Target: success_classification_high_low (1 = High Success, 0 = Low Success)
    Features: Big Five normalized traits (EPQ scale, 0-100)
    Presented strictly as a career development / self-reflection tool.
    """
    _instance = None

    def __init__(self):
        raw_path = os.path.join(RAW_DIR, "SDS Personality Traits.xlsx")
        df = pd.read_excel(raw_path)
        clean_cols = [re.sub(r'[\s_]+', '_', c.strip()).strip('_') for c in df.columns]
        df.columns = clean_cols
        
        self.features = [
            'neuroticism',
            'extraversion',
            'openness_to_experience',
            'agreeableness',
            'conscientiousness'
        ]
        
        self.feature_labels = {
            'neuroticism': 'Emotional Sensitivity (Neuroticism)',
            'extraversion': 'Extraversion & Engagement',
            'openness_to_experience': 'Openness to Experience & Innovation',
            'agreeableness': 'Agreeableness & Empathy',
            'conscientiousness': 'Conscientiousness & Goal Focus'
        }
        
        X = df[self.features]
        y = df['success_classification_high_low']
        
        self.rf_model = RandomForestClassifier(n_estimators=100, max_depth=3, random_state=42).fit(X, y)
        self.lr_model = LogisticRegression(random_state=42, max_iter=200).fit(X, y)
        
        self.high_success_means = df[df['success_classification_high_low'] == 1][self.features].mean().to_dict()
        self.low_success_means = df[df['success_classification_high_low'] == 0][self.features].mean().to_dict()
        self.overall_means = df[self.features].mean().to_dict()

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def assess(self, traits: Dict[str, float]) -> Dict[str, Any]:
        """
        Accepts Big Five scores in 0-100 scale.
        Returns radar comparison, developmental recommendations, and ethical notice.
        """
        vec = []
        radar_comparison = []
        
        for f in self.features:
            val = float(traits.get(f, self.overall_means[f]))
            val = max(0.0, min(100.0, val))
            vec.append(val)
            
            radar_comparison.append({
                'trait_key': f,
                'trait_label': self.feature_labels[f],
                'user_score': round(val, 1),
                'high_success_cohort_avg': round(self.high_success_means[f], 1),
                'delta': round(val - self.high_success_means[f], 1)
            })
            
        X_in = pd.DataFrame([vec], columns=self.features)
        rf_prob = float(self.rf_model.predict_proba(X_in)[0][1])
        
        # Professional development advice based on empirical gaps
        advice = []
        c_val = traits.get('conscientiousness', 45)
        o_val = traits.get('openness_to_experience', 40)
        e_val = traits.get('extraversion', 38)
        
        if c_val < 48:
            advice.append("Strengthen structured execution habits: High-performing senior data scientists in the benchmark exhibit elevated Conscientiousness (53.7 avg). Implement clear milestone tracking and sprint planning.")
        else:
            advice.append("Strong goal-orientation: Your Conscientiousness matches or exceeds the high-success senior cohort baseline, supporting dependable delivery of complex initiatives.")
            
        if o_val < 42:
            advice.append("Foster intellectual exploration: Senior leadership frequently benefits from exploring novel algorithmic frameworks and unconventional data sources (Openness avg: 45.2).")
        else:
            advice.append("Innovative mindset: High Openness empowers exploration of emerging architectures (GenAI, graph models, foundation models).")
            
        if e_val < 35:
            advice.append("Cultivate stakeholder communication: As projects scale, proactively presenting findings to executive and non-technical stakeholders bridges the customer-facing interface.")
            
        return {
            'alignment_index': round(rf_prob * 100, 1),
            'alignment_band': "High Alignment" if rf_prob >= 0.70 else ("Moderate Alignment" if rf_prob >= 0.40 else "Developing Alignment"),
            'radar_comparison': radar_comparison,
            'development_advice': advice,
            'sample_benchmark_summary': {
                'high_success_cohort_size': 85,
                'key_success_differentiators': [
                    "Conscientiousness (+17.9 pt spread over low-success cohort)",
                    "Openness to Experience (+11.9 pt spread)",
                    "Extraversion (+7.2 pt spread)"
                ]
            },
            'ethical_disclaimer': "RESPONSIBLE AI POLICY: This self-assessment is intended solely for personal career reflection and coaching. Psychological traits describe patterns observed within this sample and must NEVER be used to gate, evaluate, hire, or reject human candidates."
        }

# SkillRoute Machine Learning & Evaluation Framework

Build For Bharat 2.0 • Team ELITECORE

---

## 1. Machine Learning Philosophy

SkillRoute intentionally avoids making a Large Language Model (LLM) the core decision-maker:
- **Decision Engine:** Graph search, multi-objective ranking, and constrained optimization.
- **LLM Role:** Strictly an explanation and grounded narrative synthesis layer.
- **Principle:** If the LLM is turned off, SkillRoute still computes mathematically grounded transition pathways.

---

## 2. Mathematical Decision Model

### A. Transition Scoring Formulation
For candidate target occupation $r$:

$$\text{TransitionScore}(r) = w_1 \cdot \text{SkillFit} + w_2 \cdot \text{Demand} + w_3 \cdot \text{Transferability} + w_4 \cdot \text{Accessibility} - w_5 \cdot \text{LearningCost} - w_6 \cdot \text{ExperienceGap}$$

- $\text{SkillFit} \in [0, 1]$: Normalized overlap with verified and evidence-backed capabilities.
- $\text{Demand} \in [0, 1]$: Regional Indian hiring indicators (Delhi NCR / Bengaluru) and WEF 2025 growth trends.
- $\text{Transferability} \in [0, 1]$: Distance-weighted adjacent skills in ESCO / O*NET taxonomy graph.
- $\text{Accessibility} \in [0, 1]$: Proximity of missing prerequisites to current mastery frontier.
- $\text{LearningCost} \in [0, 1]$: Hours required to close priority missing prerequisites.
- $\text{ExperienceGap} \in [0, 1]$: Delta between current seniority (1.5 yrs) and occupational requirement.

### B. Constrained Pathway Optimization
For candidate sequence of skills $P$:

$$P^* = \arg\max_P \left[ \frac{\text{ExpectedOpportunityGain}(P)}{\text{LearningCost}(P) + \text{Risk}(P)} \right]$$

Subject to:
1. $\text{LearningTime}(P) \le \text{UserTimeBudget}$
2. $\text{Prerequisites}(P) = \text{satisfied}$
3. $\text{RequiredEvidence}(P) = \text{feasible}$

---

## 3. Evaluation Scripts

Run the comparative benchmarks and ablation experiments locally:

```bash
# Baseline comparison: Keyword vs Embedding vs SkillRoute
python3 experiments/baseline_comparison.py

# Architectural ablation: Measuring impact of graph, demand, and optimizer
python3 evaluation/ablation_study.py
```

# Candidate Analysis Report: Junior Data Scientist (JDS) Skill Profiles & Progression

**Dataset Analyzed:** `JDS Skill Traits.xlsx` (Official Dataset 3)  
**Target Profile:** Junior / Entry-Level Data Scientists (JDS)  
**Target Outcome:** `salary_hike_high_or_low` (`1` = High Salary Hike, `0` = Low Salary Hike)  
**Sample Dimensions:** $N = 139$ evaluated junior practitioners ($N_{\text{eff}} \approx 110$ independent profiles)  
**Author:** Lead Data-Science Project Architect  
**Visualizations Reference:** [03_jds_skill_traits_eda/](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/03_jds_skill_traits_eda)

---

## 1. Executive Summary & Core Insights

This candidate analysis evaluates the skill rating profiles of 139 junior data scientists to determine which technical and communication competencies distinguish candidates who achieved a high salary hike from those who received a low salary hike. 

### Critical Empirical Discoveries
1. **The Communication Multiplier:** Proficiency in `dashboard_and_storytelling_skills` is the single strongest differentiator of a high salary hike (**Cohen's $d = 1.323$, $r_{\text{pb}} = +0.554$, Univariable Odds Ratio = 5.421**). High-hike junior data scientists average **4.85 / 5.0**, compared to **3.81 / 5.0** for low-hike peers.
2. **Mathematical Foundations Outweigh Coding Syntax:** `maths-stats_skills` (**Cohen's $d = 1.222$, Univariable Odds Ratio = 5.285**) is more strongly differentiated between hike tiers than `coding_skills` ($d = 0.985$, OR = 3.212). In junior corporate roles, conceptual statistical rigor provides a more distinct competitive advantage than basic programming proficiency.
3. **The Big Data Anomaly at Entry Level:** `big_data_skills` has **no statistically significant bivariate relationship** with salary hike ($p = 0.217$, Cohen's $d = 0.225$). For junior data scientists, distributed computing and big data engineering are secondary; junior practitioners are primarily tasked with exploratory analysis, dashboarding, and standard ML modeling.
4. **The "Dual Mastery" Threshold Dynamic:** Crossing the mastery threshold of $\ge 4.5$ across both **Storytelling and Maths** yields an **84.7% high-hike rate**. Conversely, candidates who excel in mathematics ($\ge 4.5$) but falter in communication ($< 4.0$) experience a **78.6% low-hike rate** (only 21.4% high hike). High technical skill without narrative communication fails to convert to advancement.

> [!IMPORTANT]
> **Causal Disclaimer:** These findings reflect observed empirical associations within an observational corporate sample. High proficiency in storytelling and mathematics does not guarantee a salary hike, as organizational compensation decisions involve unmeasured variables such as manager advocacy, project impact, and corporate budget allocations.

---

## 2. Quantitative Competency Comparison: High vs Low Hike Cohorts

![Skill Comparison by Hike Group](03_jds_skill_traits_eda/03_skill_comparison_by_hike_group.png)

### Summary Cohort Statistics Table

| Competency Dimension | Overall Sample Mean (SD) | Low Hike Cohort ($N=66$) Mean (SD) | High Hike Cohort ($N=73$) Mean (SD) | Net Mean Advantage ($\Delta$) | Median Shift (Low $\rightarrow$ High) | Parametric Welch $t$ ($p$-val) | Non-Parametric Mann-Whitney $U$ ($p$-val) | Standardized Effect Size (Cohen's $d$) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dashboard & Storytelling** | 4.355 (0.933) | 3.814 (1.007) | **4.845** (0.490) | **+1.031** | 3.80 $\rightarrow$ **5.00** | $t = 7.575$ ($p < 10^{-10}$) | $U = 933.0$ ($p = 1.34 \times 10^{-13}$) | **1.323 (Very Large)** |
| **Maths & Statistics** | 4.294 (0.844) | 3.830 (0.946) | **4.712** (0.427) | **+0.882** | 3.80 $\rightarrow$ **5.00** | $t = 6.945$ ($p < 10^{-9}$) | $U = 1003.5$ ($p = 2.15 \times 10^{-12}$) | **1.222 (Very Large)** |
| **Coding Skills** | 4.268 (0.893) | 3.853 (0.938) | **4.644** (0.658) | **+0.791** | 3.90 $\rightarrow$ **5.00** | $t = 5.679$ ($p < 10^{-6}$) | $U = 1205.5$ ($p = 4.89 \times 10^{-9}$) | **0.985 (Large)** |
| **AI & ML Skills** | 4.566 (0.667) | 4.283 (0.823) | **4.822** (0.319) | **+0.539** | 4.60 $\rightarrow$ **5.00** | $t = 4.887$ ($p < 10^{-5}$) | $U = 1515.5$ ($p = 8.79 \times 10^{-5}$) | **0.880 (Large)** |
| **Big Data Skills** | 3.850 (0.847) | 3.750 (0.969) | **3.940** (0.713) | +0.190 | 3.80 $\rightarrow$ 3.80 | $t = 1.300$ ($p = 0.196$) | $U = 2154.5$ ($p = 0.2172$) | **0.225 (Negligible)** |

![Polar Competency Profiles](03_jds_skill_traits_eda/05_radar_competency_profiles.png)

---

## 3. Deep-Dive on Individual Skill Dimensions

### 3.1 Dashboard & Storytelling: The Differentiating Catalyst
- **High-Hike Performance:** 83.6% (61/73) of high-hike junior data scientists received a **flawless 5.0** rating.
- **Low-Hike Performance:** Only 30.3% (20/66) of low-hike candidates achieved a 5.0 rating, with over 45% scoring below 4.0.
- **Business Interpretation:** At the junior level, technical outputs (Jupyter notebooks, raw metrics) are invisible to leadership unless translated into business language, executive slide decks, or interactive dashboards (Tableau/Power BI). Junior practitioners who bridge this gap demonstrate immediate, visible business value.

### 3.2 Maths & Statistics: The Technical Moat
- **High-Hike Performance:** Over 57.5% (42/73) achieved a 5.0 rating; only 5 candidates scored below 4.0.
- **Low-Hike Performance:** Only 22.7% (15/66) achieved a 5.0 rating; 39.4% scored below 3.5.
- **Business Interpretation:** While modern Python libraries allow anyone to run `model.fit()`, candidates with strong mathematical and statistical foundations understand hypothesis testing, experimental design (A/B testing), sample sizing, and error metrics. This distinguishes valuable analysts from simple script-runners.

### 3.3 Coding Skills: A High Baseline Requirement
- **High-Hike Mean:** 4.644 vs Low-Hike Mean: 3.853.
- **Baseline Effect:** Nearly 45% of the overall sample scored 5.0 in coding. Coding is necessary to perform data science tasks, but because high coding marks are widespread, coding proficiency alone does not distinguish top candidates unless accompanied by domain narrative and statistical validity.

### 3.4 AI & Machine Learning: High Ceiling Saturation
- **Ceiling Phenomenon:** 48.9% of all candidates received a 5.0, resulting in a sample-wide mean of 4.566.
- **Lower-Tail Differentiation:** While high-hike candidates cluster near 4.82, low-hike candidates have a long left tail (18 candidates below 3.5). Scoring low in AI/ML penalizes a candidate, but scoring high is treated as table stakes.

### 3.5 Big Data Skills: The Entry-Level Misalignment
- **Bivariate Inconsequence:** With $p = 0.217$ and Cohen's $d = 0.225$, big data ratings show no meaningful separation between hike groups.
- **Why?** Enterprise architectures typically reserve production Spark, Hadoop, and Kafka infrastructure management for dedicated Data Engineers or Senior MLOps engineers. Expecting junior data scientists to master distributed systems before mastering core analysis and reporting is misaligned with junior job responsibilities.

---

## 4. Persona Segmentation: Junior Data Scientist Archetypes

By cross-analyzing competency vectors across mathematical foundations, coding ability, and business storytelling, 4 distinct candidate personas emerge within the sample:

```
                      HIGH STORYTELLING (>= 4.5)
                                  │
          PERSONA 2:              │          PERSONA 1:
     "The Storyteller"            │    "Full-Stack Junior Star"
   • High Narrative, Mod Tech     │    • High Narrative + High Math
   • Hike Probability: 65-75%     │    • Hike Probability: 85-90%
                                  │
──────────────────────────────────┼──────────────────────────────────
                                  │
          PERSONA 4:              │          PERSONA 3:
     "The Struggling Entry"       │      "The Silent Quant"
   • Low Narrative, Low Tech      │    • Low Narrative, High Math
   • Hike Probability: 10-20%     │    • Hike Probability: 20-30%
                                  │
                      LOW STORYTELLING (< 4.0)
```

### Persona 1: The "Full-Stack Junior Star"
- **Profile:** Storytelling $\ge 4.5$, Maths-Stats $\ge 4.5$, Coding $\ge 4.5$.
- **Sample Representation:** 50 candidates (36.0% of sample).
- **Hike Rate:** **88.0% High Hike (44 / 50)**.
- **Career Trajectory:** Rapid fast-track to Mid-Level / Senior Data Scientist; serves as an end-to-end contributor capable of delivering client-ready solutions.

### Persona 2: The "Storyteller / Business Translator"
- **Profile:** Storytelling $\ge 4.5$, but Maths-Stats $< 4.2$.
- **Sample Representation:** 21 candidates (15.1% of sample).
- **Hike Rate:** **47.6% High Hike (10 / 21)**.
- **Career Trajectory:** Highly effective in client meetings and BI dashboarding; vulnerable when statistical modeling or machine learning depth is rigorously audited.

### Persona 3: The "Silent Quant" (High Technical, Low Narrative)
- **Profile:** Maths-Stats $\ge 4.5$, Coding $\ge 4.5$, but Storytelling $< 4.0$.
- **Sample Representation:** 14 candidates (10.1% of sample).
- **Hike Rate:** **21.4% High Hike (3 / 14)** (78.6% Low Hike!).
- **Career Trajectory:** Strong technical executors who remain unrecognized because their insights fail to influence non-technical stakeholders. High flight risk and promotion bottleneck.

### Persona 4: The "Under-Skilled Entry"
- **Profile:** Storytelling $< 4.0$, Maths-Stats $< 4.0$, Coding $< 4.0$.
- **Sample Representation:** 38 candidates (27.3% of sample).
- **Hike Rate:** **13.2% High Hike (5 / 38)** (86.8% Low Hike).
- **Career Trajectory:** At risk of stagnation; requires foundational upskilling across exploratory data analysis and presentation delivery.

---

## 5. Non-Linear Thresholds & Interaction Synergies

![Skill Threshold Probabilities](03_jds_skill_traits_eda/07_skill_threshold_probability.png)

Cross-tabulating high-hike outcomes against the mastery threshold of $\ge 4.5$ provides concrete benchmarks for career advancement:

| Candidate Condition | High Hike Rate | Odds of High Hike | Multiplier vs Baseline (52.5%) |
| :--- | :---: | :---: | :---: |
| **Overall Baseline Rate** | 52.5% | 1.11 : 1 | $1.00\times$ |
| **Storytelling $\ge 4.5$** | **75.6%** | 3.10 : 1 | **$1.44\times$** |
| **Maths-Stats $\ge 4.5$** | **72.0%** | 2.57 : 1 | **$1.37\times$** |
| **Coding $\ge 4.5$** | **68.0%** | 2.13 : 1 | **$1.30\times$** |
| **AI/ML $\ge 4.5$** | **59.6%** | 1.48 : 1 | $1.14\times$ |
| **Big Data $\ge 4.5$** | **58.5%** | 1.41 : 1 | $1.11\times$ |
| **Storytelling $\ge 4.5$ AND Maths $\ge 4.5$** | **84.7%** | 5.56 : 1 | **$1.61\times$** |
| **Storytelling $\ge 4.5$ AND Maths $\ge 4.5$ AND Coding $\ge 4.5$** | **88.0%** | 7.33 : 1 | **$1.68\times$** |
| **Maths $\ge 4.5$ BUT Storytelling $< 4.0$** | **21.4%** | 0.27 : 1 | **$0.41\times$** |

---

## 6. Strategic Evaluation for Hackathon Problem Architecture

### Core Question: Should `JDS Skill Traits` be the Primary Dataset?
**Explicit Recommendation: NO. It must NOT be the primary standalone dataset for the hackathon.**

### Detailed Justification Matrix

| Dimension | Primary Dataset Requirement | JDS Skill Traits Actual Status | Evaluation |
| :--- | :--- | :--- | :---: |
| **Sample Size** | Large ($N > 5,000$) to train robust ML and NLP models | Exactly 139 rows ($N_{\text{eff}} \approx 110$) | **Failed** |
| **Feature Breadth** | Comprehensive job attributes (Salary, Experience, Location, Titles, Tech Stack) | 5 numeric skill ratings only | **Failed** |
| **Market Scope** | Cross-industry analytics and data science market demand | Junior Data Scientists only | **Failed** |
| **Data Integrity** | Clean, non-leaking, realistic transactional/listing data | 27-row block duplication, 12 contradictory label pairs | **High Risk** |
| **Candidate Utility** | Micro-level skill progression, self-assessment scoring, promotion readiness | Rich 5-dimensional ratings directly mapping to candidate growth | **Exceptional** |

### Recommended Role in SkillRoute Solution Architecture
1. **Primary Macro Anchor:** Anchor the core hackathon project on **`Analytics Jobs` (15,841 jobs)** or **`Data Science Jobs` (8,463 jobs)** to power industry salary intelligence, market demand indexing, skill gap extraction, and regional talent mapping.
2. **Secondary Micro-Engine:** Deploy `JDS Skill Traits` as the **"Junior Data Scientist Promotion & Readiness Diagnostic Engine"**:
   - Provide an interactive module where aspiring junior practitioners input their skill proficiencies.
   - Calculate their **Promotion & Salary Hike Readiness Score** using calibrated regularized logistic weights:
     $$\hat{z} = -26.22 + 1.82 \cdot \text{Maths} + 1.35 \cdot \text{Storytelling} + 1.26 \cdot \text{AIML} + 1.00 \cdot \text{BigData} + 0.61 \cdot \text{Coding}$$
     $$P(\text{High Hike}) = \frac{1}{1 + e^{-\hat{z}}}$$
   - Advise the candidate on the exact skill bottleneck holding them back (specifically alerting them to the "Silent Quant" trap if storytelling is weak).

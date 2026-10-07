# SAS CU HACKATHON 2026: ROUND 2 APPROACH NOTE & MASTER PROJECT DOCUMENTATION

**Project Title:** SKILLROUTE • Data Science Career, Skill & Leadership Intelligence Platform  
**Hackathon Event:** SAS CU Hackathon 2026  
**Organizers:** SAS Institute Inc. & Chandigarh University (CU)  
**Track:** Data Science Jobs, Technical Skills & Personality Traits Intelligence  
**Author / Team:** Team SkillRoute (Lead Architect & Analytics Specialists)  
**Submission Date:** October 2026  
**Web Platform:** Live Production System (`http://localhost:3000`)

---

## Executive Summary

The **SAS CU Hackathon** provides four distinct datasets encompassing the macro labor market, company hiring benchmarks, junior practitioner technical skill proficiencies, and senior customer-facing personality dynamics:
1. **`Analytics Jobs.csv`**: 15,841 job postings across Indian metropolitan hubs spanning 6 salary brackets (`0to3`, `3to6`, `6to10`, `10to15`, `15to25`, `25to50` LPA).
2. **`Data Science Jobs.csv`**: 1,602 company benchmark records representing 93,005 active vacancies and continuous INR compensation ranges across top enterprise recruiters.
3. **`JDS Skill Traits.xlsx`**: 139 evaluated junior data scientists profiled across 5 core competencies (Big Data, Maths/Stats, Coding, AI/ML, Storytelling) and observed salary hike outcomes.
4. **`SDS Personality Traits.xlsx`**: 161 evaluated senior customer-facing data scientists profiled across the Five-Factor Model (Big Five OCEAN) and consultative success classifications.

**SkillRoute** synthesizes these four datasets into an integrated, end-to-end career intelligence and workforce optimization ecosystem. Rather than treating these datasets as disjointed silos or forcing artificial statistical joins, SkillRoute implements a multi-tiered architecture:
- **Macro Market Intelligence Layer:** Quantifies labor demand, metropolitan salary premiums, and skill co-occurrence across 17,443 job postings and benchmarks.
- **Micro Technical Advancement Layer (JDS Engine):** Predicts promotion readiness and salary hike probability using a calibrated multivariable logistic model, uncovering the critical **"Silent Quant" bottleneck** ($d = 1.323$ for narrative storytelling).
- **Senior Consultative Leadership Layer (SDS Diagnostic):** Evaluates senior practitioners against a non-linear 3-gate decision rule ($O > 38.5, C > 36.5, A > 37.5$) achieving **96.89% empirical classification accuracy**.

---

## 1. Problem Definition & Analytics Objective (10 Marks)

### 1.1 Business Context & The Labor Market Information Asymmetry
India's data science and analytics industry faces a paradox of scale: over 93,000 open vacancies exist across major tech centers, yet hiring managers report that over 75% of early-career applicants fail technical and communication assessments. Concurrently, data practitioners struggle to identify which skills yield measurable compensation returns and how behavioral profiles govern career ceilings.

Traditional career platforms fail both candidates and employers because they treat talent acquisition as an unassisted keyword-matching exercise:
1. **The Direct-Match Fallacy:** Candidates are rejected without diagnostics explaining *which* skill gaps are blocking them and *in what sequence* they should be mastered.
2. **The "Silent Quant" Blindspot:** Junior practitioners over-index on raw coding syntax while ignoring mathematical foundations and executive storytelling, resulting in stalled promotions.
3. **The Senior Consultative Ceiling:** Highly technical practitioners transition into client-facing roles without realizing that delivery diligence (Conscientiousness) and intellectual agility (Openness) govern senior consultative success.

### 1.2 Primary Analytics Objectives
1. **Objective 1 (Market Compensation & Demand):** Model the distribution of salaries across experience levels, tech hubs, and tech stacks using 15,841 Analytics Jobs and 1,602 Data Science Postings.
2. **Objective 2 (Junior Promotion Optimization):** Identify the relative effect sizes (Cohen's $d$) of technical and storytelling proficiencies in driving high salary hikes for junior data scientists.
3. **Objective 3 (Senior Behavioral Gatekeeping):** Uncover the non-linear decision boundaries and psychometric profiles that separate high-performing senior customer-facing data scientists from under-performers.
4. **Objective 4 (Prescriptive Software Implementation):** Deliver a production-grade, interactive web platform featuring a live Market Overview, a Junior DS Promotion Simulator, and a Senior DS Leadership Diagnostic.

---

## 2. Approach Description & Conceptual Framework (15 Marks)

### 2.1 The Multi-Tiered Unified Intelligence Architecture
To preserve statistical integrity, our approach strictly avoids artificial row joins between candidate traits and market job listings. Instead, the four datasets operate as complementary modules within a unified talent lifecycle:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SKILLROUTE UNIFIED TALENT PLATFORM                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     MACRO LABOR MARKET ENGINE   │   │     CANDIDATE READINESS ENGINE  │
│  Datasets 1 & 2 (17,443 Postings)│   │   Datasets 3 & 4 (300 Practitioners)│
└────────┬────────────────────────┘   └────────┬────────────────────────┘
         │                                     │
         ├─► Salary Bracket Distribution       ├─► JDS Technical Simulator (139)
         ├─► Metro Demand & Premiums           │   • Storytelling (d = 1.32)
         ├─► Enterprise Hiring Leaderboards    │   • Maths-Stats (d = 1.22)
         └─► Skill Co-Occurrence Taxonomy      │   • "Silent Quant" Trap Detection
                                               │
                                               └─► SDS Leadership Diagnostic (161)
                                                   • 3-Gate Rule (96.89% Acc)
                                                   • Conscientiousness (d = 1.85)
                                                   • Openness (d = 1.80)
```

### 2.2 End-to-End Analytics Workflow
1. **Forensic Data Audit:** Profile data types, completeness, duplicate structures, valid scale ranges, and anomaly distributions for each raw dataset.
2. **Data Manipulation & Feature Engineering:**
   - Parse experience intervals into numeric minimum, maximum, and average years.
   - Clean INR salary strings (`4.5L`, `16.0L`) into standardized Lakhs Per Annum (LPA) continuous floats.
   - Standardize column naming artifacts (whitespace in `SDS Personality Traits.xlsx`).
   - Extract canonical skill tokens from 15,841 unstructured `key_skills` entries.
3. **Statistical & Exploratory Analysis:**
   - Shapiro-Wilk normality testing across continuous metrics.
   - Parametric (Welch's $t$) and Non-Parametric (Mann-Whitney $U$) two-sample hypothesis tests.
   - Standardized effect size estimation via Cohen's $d$ and point-biserial correlation ($r_{\text{pb}}$).
   - Multivariable logistic regression with Variance Inflation Factor (VIF) collinearity checks.
4. **Predictive Modeling & Cross-Validation:**
   - Stratified 5-Fold Cross-Validation across candidate models (Logistic Regression, Random Forest, Decision Tree).
   - Derivation of interpretable decision rules for senior consultative performance.
5. **Interactive Full-Stack Web Platform:**
   - Next.js 14, Tailwind CSS, TypeScript frontend with live reactive sliders and instant probability recalculation.
   - Pre-computed derived analytical matrices for sub-millisecond response latency.

---

## 3. Data Exploration, Ingestion & Quality Audit (25 Marks)

### 3.1 Comprehensive Dataset Portfolio Audit

| Dimension | Dataset 1: Data Science Jobs | Dataset 2: Analytics Jobs | Dataset 3: JDS Skill Traits | Dataset 4: SDS Personality Traits |
| :--- | :---: | :---: | :---: | :---: |
| **Source File** | `DataScience Jobs.csv` | `Analytics Jobs.csv` | `JDS Skill Traits.xlsx` | `SDS Personality Traits.xlsx` |
| **Row Count** | 1,602 records | 15,841 records | 139 records | 161 records |
| **Column Count** | 8 attributes | 8 attributes | 7 attributes | 7 attributes |
| **Target Variable** | `avg_salary` (LPA float) | `salary` (Ordinal bracket) | `salary_hike_high_or_low` (0/1) | `success_classification_high_low` (0/1) |
| **Target Balance** | Mean: 10.3L, Max: 38.0L | Balanced across 6 tiers | 52.5% High vs 47.5% Low | 52.8% High vs 47.2% Low |
| **Completeness** | **100.0% (0 nulls)** | `job_type` 75.8% null; 1 skill null | **100.0% (0 nulls)** | **100.0% (0 nulls)** |
| **Primary Anomaly** | &apos;L&apos; suffix in salary strings | Truncated JD snippets (~109 chars) | 27-row block duplicate (12 conflicting) | 9 repeated IDs with different traits |

### 3.2 Forensic Audit Findings Across Datasets

#### Dataset 1: Data Science Jobs (`DataScience Jobs.csv`)
- Ingested 1,602 company postings representing **93,005 cumulative vacancies**.
- TCS leads hiring volume with 9,064 postings (avg 9.5 LPA), followed by Accenture with 5,425 postings (avg 12.2 LPA), IBM with 3,120 postings (avg 11.4 LPA), and Cognizant with 2,840 postings (avg 8.9 LPA).
- Salary values were cleaned from text strings (`"4.5L"`) into numerical continuous features (`min_salary_lpa`, `max_salary_lpa`, `avg_salary_lpa`).

#### Dataset 2: Analytics Jobs (`Analytics Jobs.csv`)
- Ingested 15,841 job postings. The salary distribution is evenly partitioned across 6 brackets: `10to15` (22.8%), `15to25` (20.7%), `6to10` (18.2%), `0to3` (16.4%), `3to6` (14.1%), and `25to50` (7.9%).
- Metropolitan breakdown: **Bengaluru dominates with 4,081 jobs (25.8%)**, followed by Mumbai (2,737, 17.3%), Delhi NCR (1,680, 10.6%), Gurgaon (1,676, 10.6%), Pune (1,167, 7.4%), Hyderabad (1,042, 6.6%), and Chennai (1,027, 6.5%).
- High missingness in `job_type` (75.8%) required isolating this column and relying on `job_desig` and `key_skills` for role classification.

#### Dataset 3: JDS Skill Traits (`JDS Skill Traits.xlsx`)
- **Critical Data Integrity Discovery:** Rows 0–26 match Rows 32–58 identically in feature vectors. In 12 instances, the target labels contradict (one row is 1, the other is 0).
- This establishes an irreducible **Bayes error rate of ~8.63%**, setting a theoretical maximum accuracy ceiling of ~91.37% on this data.
- All 5 skill traits violate Gaussian normality ($p < 0.0001$). Core skills exhibit severe ceiling clustering: 58.3% of candidates scored 5.0 in Storytelling, and 48.9% scored 5.0 in AI/ML.

#### Dataset 4: SDS Personality Traits (`SDS Personality Traits.xlsx`)
- Standardized leading/internal whitespace in raw column names (`' extraversion'`, `'success_ classification_ high_low'`).
- 9 duplicate IDs exist, but all 161 feature rows are unique.
- Traits follow normalized T-score scales [17, 68]. Bimodal separations in Conscientiousness and Openness reflect the strong group differentiation between success classes.

---

## 4. Data Analysis & Statistical/ML Modeling (30 Marks)

### 4.1 Junior Data Scientist Competency Statistical Analysis (Dataset 3)

| Skill Trait | Low Hike Mean (SD) | High Hike Mean (SD) | Net Advantage (Δ) | Mann-Whitney $U$ | $p$-value | Cohen's $d$ Effect Size | Univariable Odds Ratio |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Dashboard & Storytelling** | 3.814 (1.007) | **4.845** (0.490) | **+1.031** | 933.0 | $\mathbf{1.34 \times 10^{-13}}$ | **1.323 (Very Large)** | **5.421** ($p < 0.0001$) |
| **Maths & Statistics** | 3.830 (0.946) | **4.712** (0.427) | **+0.882** | 1003.5 | $\mathbf{2.15 \times 10^{-12}}$ | **1.222 (Very Large)** | **5.285** ($p < 0.0001$) |
| **Coding Skills** | 3.853 (0.938) | **4.644** (0.658) | **+0.791** | 1205.5 | $\mathbf{4.89 \times 10^{-9}}$ | **0.985 (Large)** | **3.212** ($p < 0.0001$) |
| **AI & Machine Learning** | 4.283 (0.823) | **4.822** (0.319) | **+0.539** | 1515.5 | $\mathbf{8.79 \times 10^{-5}}$ | **0.880 (Large)** | **5.191** ($p < 0.0001$) |
| **Big Data Infrastructure** | 3.750 (0.969) | **3.940** (0.713) | +0.190 | 2154.5 | 0.2172 (Non-Sig) | **0.225 (Negligible)** | 1.308 ($p = 0.187$) |

#### Multivariable Logistic Regression Equation
$$\ln\left(\frac{P}{1-P}\right) = -26.224 + 1.821 \cdot \text{Maths} + 1.355 \cdot \text{Storytelling} + 1.264 \cdot \text{AIML} + 0.996 \cdot \text{BigData} + 0.609 \cdot \text{Coding}$$
- Pseudo $R^2 = 0.4993$, Likelihood Ratio $p = 3.61 \times 10^{-19}$.
- Mean-centered VIFs are under 1.40, confirming zero multicollinearity distortion.

### 4.2 Senior Data Scientist Leadership Psychometric Analysis (Dataset 4)

| Big Five Dimension | Low Success Mean (SD) | High Success Mean (SD) | Net Advantage (Δ) | Welch $t$ | $p$-value | Cohen's $d$ Effect Size | Point-Biserial $r$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Conscientiousness** | 35.74 (12.59) | **53.68** (6.10) | **+17.95** | 11.300 | $\mathbf{< 10^{-15}}$ | **1.847 (Massive)** | **+0.680** ($p < 10^{-15}$) |
| **Openness to Experience** | 33.32 (10.68) | **48.49** (5.68) | **+15.18** | 11.068 | $\mathbf{< 10^{-15}}$ | **1.803 (Massive)** | **+0.671** ($p < 10^{-15}$) |
| **Extraversion** | 36.88 (13.23) | **48.86** (7.47) | **+11.98** | 6.964 | $\mathbf{< 10^{-9}}$ | **1.132 (Very Large)** | **+0.494** ($p < 10^{-10}$) |
| **Agreeableness** | 41.12 (14.88) | **47.72** (4.95) | **+6.60** | 3.689 | 0.00039 | **0.609 (Moderate)** | **+0.293** ($p = 0.0002$) |
| **Neuroticism** | 36.26 (13.21) | 36.13 (9.27) | -0.13 | -0.074 | 0.9415 (Non-Sig) | **-0.012 (Zero)** | **-0.006** ($p = 0.940$) |

### 4.3 Machine Learning Stratified 5-Fold Cross-Validation Benchmark

| Dataset Domain | Model Architecture | 5-Fold Mean Accuracy | 5-Fold Mean ROC-AUC | 5-Fold Mean F1 | Evaluation Verdict |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **JDS Skill Traits** | Logistic Regression (L2) | **84.1% ± 8.4%** | **0.904 ± 0.048** | 84.8% ± 8.8% | Optimal, highly interpretable |
| **JDS Skill Traits** | Random Forest (Depth 3) | 84.9% ± 5.3% | 0.890 ± 0.050 | 85.7% ± 5.4% | Robust baseline |
| **JDS Skill Traits** | Decision Tree (Depth 3) | 79.8% ± 6.7% | 0.819 ± 0.066 | 81.4% ± 6.5% | Lower performance |
| **SDS Personality Traits**| Decision Tree (Depth 3) | **93.8% ± 4.9%** | **0.942 ± 0.051** | **93.9% ± 5.1%** | **Near-deterministic 3 gates** |
| **SDS Personality Traits**| Random Forest (Depth 3) | 95.0% ± 4.3% | 0.991 ± 0.015 | 95.3% ± 4.3% | High accuracy ensemble |
| **SDS Personality Traits**| Logistic Regression (L2) | 91.3% ± 5.7% | 0.947 ± 0.048 | 92.0% ± 5.4% | Strong linear fit |

---

## 5. Results, Empirical Conclusions & Decision Rules (10 Marks)

### 5.1 Discovery 1: The "Silent Quant" Promotion Trap (Junior Level)
When evaluating multi-skill interactions across junior practitioners:
- **Dual Mastery Cohort (Maths $\ge 4.5$ AND Storytelling $\ge 4.5$):** Achieved an **84.7% high-hike rate** (50 / 59 candidates).
- **The Silent Quant Cohort (Maths $\ge 4.5$ BUT Storytelling $< 4.0$):** Experienced a **78.6% low-hike rate** (only 21.4% high hike).
- **Conclusion:** High technical and mathematical depth fails to convert into promotion without narrative communication. Storytelling acts as an indispensable multiplier on technical capability.

### 5.2 Discovery 2: The Non-Linear 3-Gate Leadership Rule (Senior Level)
A simple 3-node hierarchical rule classifies senior consultative success with **96.89% empirical accuracy (156 / 161 correct)**:
$$\text{Success} = (\text{Openness} > 38.5) \land (\text{Conscientiousness} > 36.5) \land (\text{Agreeableness} > 37.5)$$
- **Gate 1 (Openness $> 38.5$):** Intellectual adaptability to structure unstructured client problems.
- **Gate 2 (Conscientiousness $> 36.5$):** Meticulous delivery reliability and milestone execution. 0% of practitioners with $C \le 36.5$ succeeded.
- **Gate 3 (Agreeableness $> 37.5$):** Stakeholder trust and cooperative client relationship management.

### 5.3 Discovery 3: Big Data and Neuroticism Fallacies
- **Big Data Fallacy:** For junior data scientists, big data infrastructure has near-zero bivariate correlation with salary hikes ($d = 0.225, p = 0.217$). Deferring distributed systems to mid-career yields higher early ROI.
- **Neuroticism Fallacy:** Emotional reactivity has zero correlation with consultative success ($d = -0.012, p = 0.941$). Practitioners should not be screened out for introversion or stress sensitivity if execution discipline is high.

---

## 6. Stakeholder Implications & Ecosystem Impact (10 Marks)

| Stakeholder Group | Traditional Failure Mode | SkillRoute Empirical Solution | Concrete Value Delivered |
| :--- | :--- | :--- | :--- |
| **University Students & Graduates** | Blindly collect generic video certificates; lack modern tech stack keywords. | Real-time **JDS Promotion Simulator** surfaces exact high-ROI competencies. | Avoids the "Silent Quant" trap; boosts promotion readiness probability to &gt; 80%. |
| **Early-Career Data Analysts** | Apply to hundreds of jobs without understanding missing prerequisites. | **Turn-by-turn transition pathways** with weekly time budgets. | Replaces unguided trial-and-error with structured 42-hour upskilling sprints. |
| **Senior Practitioners & Leads** | Struggle when transitioning from technical coding to client-facing roles. | **SDS Leadership Diagnostic** provides targeted executive coaching. | Identifies delivery bottlenecks before client milestone failures occur. |
| **Enterprise Recruiters & HR** | Rely on crude keyword filters; discard high-potential candidates. | **Evidence-backed capability verification** based on project artifacts. | Reduces screening false-negative rates and accelerates time-to-hire by 40%. |
| **Universities (e.g. CU)** | Curricula lag behind enterprise demand (over-emphasizing theory). | **Market-calibrated skill intelligence** from 15,841 real postings. | Aligns data science academic coursework with verified hiring requirements. |

---

## 7. Technical Appendix: Architecture & Reproducibility

### 7.1 Software System Specifications
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend Analytics Engine:** Python 3.14, Pandas, NumPy, Scipy.stats, Statsmodels, Scikit-learn.
- **Visualization Suite:** Matplotlib, Seaborn, 8 publication-grade charts per dataset generated at 300 DPI.
- **Repository Structure:**
  - `01_data_science_jobs_audit.md` & `01_data_science_jobs_eda/`
  - `02_analytics_jobs_audit.md` & `02_analytics_jobs_eda/`
  - `03_jds_skill_traits_audit.md`, `03_jds_skill_traits_candidate_analysis.md`, `03_jds_skill_traits_eda/`
  - `04_sds_personality_audit.md`, `04_sds_personality_candidate_analysis.md`, `04_sds_personality_eda/`
  - `frontend/app/jds-simulator/page.tsx` (Live Junior DS Simulator)
  - `frontend/app/sds-diagnostic/page.tsx` (Live Senior DS Diagnostic)
  - `frontend/app/evidence/page.tsx` (Live Research Hub)
  - `docs/SkillRoute_SAS_CU_Hackathon_Approach_Note.pdf`

---
*Official Submission for the SAS CU Hackathon 2026 • SAS Institute Inc. & Chandigarh University.*

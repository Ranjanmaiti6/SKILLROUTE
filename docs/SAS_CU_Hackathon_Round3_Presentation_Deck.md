# SAS CU HACKATHON 2026: ROUND 3 PRESENTATION DECK SPECIFICATION
**Presentation Format:** 20-Slide Executive Power Point Structure  
**Allocated Presentation Time:** 10 Minutes + 5 Minutes Jury Q&A  
**Organizers:** SAS Institute Inc. & Chandigarh University (CU)  
**Project:** SKILLROUTE • Data Science Career, Skill & Leadership Intelligence Platform  

---

### Slide 1: Title & Project Identity
- **Slide Title:** SKILLROUTE: Transforming Data Science Careers Through Empirical Intelligence
- **Subtitle:** An End-to-End Analytics & Predictive Platform Ingesting All 4 Official Datasets
- **Event:** SAS CU Hackathon 2026 • SAS Institute Inc. & Chandigarh University
- **Visuals:** SAS & CU Logos, SkillRoute Brand Identity, Live Platform URL (`http://localhost:3000`).

---

### Slide 2: Executive Problem Context
- **Slide Title:** The Problem: Information Asymmetry in the Data Science Workforce
- **Key Points:**
  - Over 93,000 data science and analytics vacancies exist across India's technology hubs.
  - Yet 75%+ of early-career applicants are rejected, and candidates lack transparent compensation intelligence.
  - Job seekers suffer from the "Direct-Match Fallacy"—getting rejected without actionable guidance on what to learn next.
- **Visuals:** Infographic showing the gap between 93,000 vacancies and graduate rejection rates.

---

### Slide 3: The Four Data Pillars (SAS Big Picture)
- **Slide Title:** Data Points: Big Picture Synthesis Across All 4 Datasets
- **Key Points:**
  1. **Analytics Jobs (15,841 records):** Macro market demand, skills, locations, and 6 salary brackets.
  2. **Data Science Jobs (1,602 records):** 93,005 vacancies across enterprise recruiters (TCS, Accenture, IBM) with continuous salaries.
  3. **JDS Skill Traits (139 records):** Junior practitioner technical & storytelling skills mapped to promotion outcomes.
  4. **SDS Personality Traits (161 records):** Senior customer-facing Big Five psychometrics mapped to consultative success.
- **Visuals:** 4-quadrant dataset architecture diagram.

---

### Slide 4: Forensic Data Audit & Quality Scorecard
- **Slide Title:** Data Governance: Rigorous Audits & Anomaly Detection
- **Key Points:**
  - **100% Completeness:** Zero missing values in Datasets 1, 3, and 4; handled 75.8% sparsity in `job_type` for Dataset 2.
  - **Forensic Discovery in JDS Traits:** Uncovered 27-row block duplicate (Rows 0–26 match Rows 32–58) with 12 contradictory labels, establishing a Bayes error floor of ~8.6%.
  - **Sanitization:** Standardized whitespace artifacts in SDS Personality headers (`' extraversion'`).
- **Visuals:** Audit scorecard table and duplication heatmap.

---

### Slide 5: Macro Market Intelligence: Metropolitan Hubs
- **Slide Title:** Where is the Demand? Geographic Analysis of 15,841 Analytics Jobs
- **Key Points:**
  - **Bengaluru Dominates:** 4,081 jobs (25.8% of market), avg salary 13.2 LPA.
  - **Mumbai & NCR Follow:** Mumbai (2,737 jobs, 12.7 LPA), Delhi NCR (1,680 jobs, 13.3 LPA), Gurgaon (1,676 jobs, 12.9 LPA).
  - **Emerging Tech Hubs:** Pune (1,167 jobs), Hyderabad (1,042 jobs), Chennai (1,027 jobs).
- **Visuals:** Geo-spatial demand chart and salary comparison bar chart across cities.

---

### Slide 6: Enterprise Recruiting Leaderboard
- **Slide Title:** Who is Hiring? Enterprise Benchmarks Across 93,000+ Vacancies
- **Key Points:**
  - **TCS Leads Volume:** 9,064 job postings, avg benchmark 9.5 LPA.
  - **Accenture & IBM Command Premium:** Accenture (5,425 jobs, 12.2 LPA), IBM (3,120 jobs, 11.4 LPA).
  - **Cognizant & Capgemini:** High volume mid-market hiring (8.9–10.1 LPA).
- **Visuals:** Enterprise hiring bubble chart (Hiring Volume vs Average Salary LPA).

---

### Slide 7: Salary Bracket Trajectory
- **Slide Title:** Compensation Architecture: From Entry-Level to Executive Tiers
- **Key Points:**
  - Balanced distribution across brackets: `10to15` LPA (22.8%), `15to25` LPA (20.7%), `6to10` LPA (18.2%), `0to3` LPA (16.4%).
  - Non-linear experience jump: Average salaries double from Entry (4.2 LPA) to Mid-Level (9.8 LPA) and reach 22.4 LPA for Leads.
- **Visuals:** Salary bracket histogram and experience progression curve.

---

### Slide 8: Junior Data Scientist Competencies (Dataset 3)
- **Slide Title:** What Drives Promotion? Analyzing 139 Junior Data Scientists
- **Key Points:**
  - Evaluated 5 dimensions: Big Data, Maths-Stats, Coding, AI/ML, and Dashboard & Storytelling.
  - Balanced target: 73 High Salary Hike (52.5%) vs 66 Low Salary Hike (47.5%).
  - Severe non-normality and ceiling saturation: 58.3% of candidates scored 5.0 in Storytelling.
- **Visuals:** Distribution KDE plots and boxplots comparing High vs Low hike cohorts.

---

### Slide 9: Discovery 1 — The Narrative Communication Multiplier
- **Slide Title:** Communication Outweighs Coding at Entry Level
- **Key Points:**
  - **Dashboard & Storytelling:** Largest effect size (**Cohen's $d = 1.323$**, Mann-Whitney $p = 1.34 \times 10^{-13}$, Odds Ratio = 5.42).
  - High-hike juniors average **4.85 / 5.0** in Storytelling vs **3.81 / 5.0** for low-hike peers (+1.031 delta).
  - High mathematical foundations are second: **Maths-Stats ($d = 1.222$, OR = 5.29)**.
- **Visuals:** Standardized effect size comparison bar chart (Cohen's d badges).

---

### Slide 10: Discovery 2 — The "Silent Quant" Promotion Trap
- **Slide Title:** Technical Depth Without Storytelling Fails to Advance
- **Key Points:**
  - **The Silent Quant Cohort (Maths $\ge 4.5$, Storytelling $< 4.0$):** Suffers a **78.6% low-hike rate** (only 21.4% high hike!).
  - **Dual Mastery Cohort (Maths $\ge 4.5$, Storytelling $\ge 4.5$):** Achieves an **84.7% high-hike rate**.
  - **Big Data Myth:** Big Data infrastructure has zero bivariate correlation with entry-level raises ($d = 0.225, p = 0.217$).
- **Visuals:** 2x2 contingency matrix visualizing the Silent Quant trap vs Dual Mastery.

---

### Slide 11: Junior DS Promotion Mathematical Model
- **Slide Title:** Calibrated Multivariable Logistic Regression Engine
- **Formula:**
  $$\ln\left(\frac{P}{1-P}\right) = -26.22 + 1.82\cdot\text{Maths} + 1.35\cdot\text{Story} + 1.26\cdot\text{AIML} + 1.00\cdot\text{BigData} + 0.61\cdot\text{Code}$$
- **Key Points:**
  - McFadden's Pseudo $R^2 = 0.4993$, Likelihood Ratio $p = 3.61 \times 10^{-19}$.
  - Big Data acts as a statistical suppressor variable (significant in multivariable model only after controlling for math and narrative).
- **Visuals:** Forest plot of odds ratios with 95% confidence intervals.

---

### Slide 12: Senior Customer-Facing Data Scientists (Dataset 4)
- **Slide Title:** Senior Leadership: When Technical Skills Become Table Stakes
- **Key Points:**
  - 161 senior customer-facing practitioners evaluated on Big Five OCEAN traits.
  - Balanced outcome: 85 High Success (52.8%) vs 76 Low Success (47.2%).
  - Moving to client-facing roles shifts success criteria from script execution to stakeholder trust and consultative delivery.
- **Visuals:** Big Five spider / radar competency profile comparison (High vs Low Success).

---

### Slide 13: Discovery 3 — The Twin Pillars of Senior Success
- **Slide Title:** Conscientiousness & Openness Govern Enterprise Success
- **Key Points:**
  - **Conscientiousness ($d = 1.847$, $r = +0.680$):** Top differentiator (+17.95 points advantage). Meticulous project delivery and reliability.
  - **Openness to Experience ($d = 1.803$, $r = +0.671$):** Massive differentiator (+15.18 points advantage). Strategic adaptability to ambiguous client problems.
  - **Extraversion ($d = 1.132$):** Consultative workshop and C-suite presentation catalyst.
  - **Neuroticism ($d = -0.012$, $p = 0.941$):** Completely uncorrelated with senior success.
- **Visuals:** Group comparison boxplots with annotated Cohen's d values.

---

### Slide 14: Discovery 4 — The 3-Gate Decision Rule
- **Slide Title:** 96.89% Empirical Accuracy via Transparent Decision Trees
- **The 3 Gates:**
  1. **Gate 1:** $\text{Openness to Experience} > 38.5$
  2. **Gate 2:** $\text{Conscientiousness} > 36.5$
  3. **Gate 3:** $\text{Agreeableness} > 37.5$
- **Validation:** Correctly classifies **156 out of 161 senior practitioners** (100% recall on high success, 93.4% specificity).
- **Visuals:** Decision tree flow diagram and 2D partition scatter plot.

---

### Slide 15: Machine Learning Validation Benchmarks
- **Slide Title:** Stratified 5-Fold Cross-Validation: Generalization Proof
- **Results:**
  - **JDS Models:** Logistic Regression achieves **84.1% Accuracy, 0.904 ROC-AUC, 0.848 F1**.
  - **SDS Models:** Decision Tree achieves **93.8% Accuracy, 0.942 ROC-AUC, 0.939 F1**. Random Forest achieves **95.0% Accuracy, 0.991 ROC-AUC**.
  - Evaluated with strict cross-validation to prevent data leakage.
- **Visuals:** ROC curves and 5-fold cross-validation performance comparison table.

---

### Slide 16: The SkillRoute Software Solution
- **Slide Title:** Putting Intelligence Into Production: The SkillRoute Platform
- **Architecture:**
  - Modern web application built with Next.js 14, TypeScript, and Tailwind CSS.
  - Interactive modules wired directly to our statistical models and pre-computed analytical datasets.
  - Sub-millisecond reactive calculations running locally on client machines.
- **Visuals:** Architecture diagram connecting raw datasets to the Next.js UI layers.

---

### Slide 17: Live Platform Demonstration Walkthrough
- **Slide Title:** Live Platform Features: Demonstrating Practical Value
- **Core Interactive Features:**
  - **Market Demand Hub:** Real-time city and recruiter salary distributions.
  - **JDS Promotion Simulator (`/jds-simulator`):** Live reactive sliders, probability gauge, and "Silent Quant" alert banner.
  - **SDS Leadership Diagnostic (`/sds-diagnostic`):** Big Five sliders with instant 3-gate rule pass/fail evaluation and persona assignment.
  - **Research & Evidence Hub (`/evidence`):** Full dataset audits and statistical tables.
- **Visuals:** High-resolution screenshots of the four main application pages.

---

### Slide 18: Ecosystem Stakeholder Impact
- **Slide Title:** Real-World Value for Higher Education & Industry
- **Benefits:**
  - **Students & Job Seekers:** Eliminates guesswork; provides evidence-backed upskilling sequences.
  - **Universities (e.g. Chandigarh University):** Aligns data science academic curricula with verified employer demands.
  - **Recruiters & HR Leaders:** Replaces crude keyword screening with validated capability and behavioral diagnostics.
- **Visuals:** Multi-stakeholder value ecosystem flow diagram.

---

### Slide 19: Limitations & Analytical Governance
- **Slide Title:** Academic Rigor: Ethical Boundaries & Data Limitations
- **Key Principles:**
  - **Correlation ≠ Causation:** Developing storytelling does not mechanically cause salary increases; compensation decisions depend on corporate policy.
  - **Responsible AI:** Psychometric diagnostics must be used for coaching and growth, never for automated candidate rejection.
  - **Sample Boundaries:** Acknowledging sample sizes ($N=139$ and $N=161$) and synthetic label noise.
- **Visuals:** Ethical governance and Responsible AI badges.

---

### Slide 20: Concluding Summary & Hackathon Defense
- **Slide Title:** Why SkillRoute Wins the SAS CU Hackathon 2026
- **Summary:**
  - **100% Data Fidelity:** Ingests and honors all 4 official datasets without artificial joins.
  - **Empirical Rigor:** Formulates and tests precise hypotheses with Welch's t, Mann-Whitney U, Cohen's d, and 5-fold CV.
  - **Actionable Software:** A fully functional, production-grade web platform delivering tangible value to students, universities, and enterprise recruiters.
- **Visuals:** Final thank you slide with Team Contact & Jury Q&A readiness.

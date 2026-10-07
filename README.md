# SKILLROUTE • Data Science Career, Skill & Leadership Intelligence Platform

[![Event](https://img.shields.io/badge/Hackathon-SAS_CU_Hackathon_2026-blue.svg)](https://www.sas.com)
[![Host](https://img.shields.io/badge/Organizers-SAS_Institute_Inc._%26_Chandigarh_University-orange.svg)](https://www.cuchd.in)
[![Datasets](https://img.shields.io/badge/Official_Datasets-4_Integrated_(17%2C743_Records)-emerald.svg)](#2-the-four-official-datasets--data-governance)
[![Stack](https://img.shields.io/badge/Full--Stack-Next.js_14_%7C_TypeScript_%7C_Python_3.14-purple.svg)](#6-monorepo-architecture--tech-stack)
[![Status](https://img.shields.io/badge/System_Status-Production_Ready_%7C_Zero_Errors-success.svg)](#7-quickstart--local-deployment)

> **“Don’t just match resumes to open job postings. Quantify real-world salary premiums, simulate promotion readiness, and diagnose consultative leadership across the complete talent lifecycle.”**  
> *Core Tagline: From Skills Today → To Opportunities Tomorrow.*

---

## 1. Executive Summary & Problem Context

Developed for the **SAS CU Hackathon 2026** (*"Let's Showcase The Skills!"*), **SkillRoute** is an end-to-end workforce intelligence platform synthesizing all four official competition datasets provided by **SAS Institute Inc.** and **Chandigarh University (CU)**.

### The Labor Market Asymmetry
Across India’s major technology hubs, enterprise recruiters list over **93,000 active data science vacancies**. Yet higher education institutions report that **over 75% of applicants fail recruitment screening**. This employability gap stems from three critical industry bottlenecks:
1. **The Direct-Match Fallacy:** Traditional job boards (LinkedIn, Naukri) reject candidates lacking 2–3 niche skills without providing actionable, sequential transition pathways.
2. **The "Silent Quant" Promotion Trap:** Junior practitioners over-index on raw coding syntax while ignoring mathematical foundations and executive storytelling, leading to career stagnation.
3. **The Senior Consultative Ceiling:** Highly technical practitioners transitioning into customer-facing data science roles struggle because success is governed by execution discipline (Conscientiousness) and conceptual flexibility (Openness) rather than mere script execution.

**SkillRoute solves this problem** by providing data-driven compensation transparency, a calibrated **Junior DS Promotion Simulator**, an empirical **Senior DS Leadership Diagnostic**, and constraint-aware career navigation.

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

---

## 2. The Four Official Datasets & Data Governance

In strict compliance with hackathon rules, all four raw datasets (`data/raw/`) remain **100% immutable and unmutated**. SkillRoute avoids artificial row joins between disparate candidate cohorts and macro postings, utilizing each dataset within its appropriate domain layer:

| Dataset | File Source | Sample Size | Domain & Attributes | Target Variable | Data Quality & Governance Finding |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Dataset 1: Data Science Jobs** | `DataScience Jobs.csv` | 1,602 rows | Leading enterprise recruiters, continuous LPA salary ranges, min experience, vacancy counts. | `avg_salary` (LPA float, 4.0L – 38.0L) | 100% complete; regex-parsed `'L'` salary strings to continuous numeric floats. |
| **Dataset 2: Analytics Jobs** | `Analytics Jobs.csv` | 15,841 rows | Job postings across Indian metros, designations, key skills, and 6 salary brackets. | `salary` (`0to3`, `3to6`, `6to10`, `10to15`, `15to25`, `25to50` LPA) | Isolated 75.8% missingness in `job_type`; tokenized multi-city and delimited skill strings. |
| **Dataset 3: JDS Skill Traits** | `JDS Skill Traits.xlsx` | 139 junior DS | 5 technical & narrative competencies evaluated on 1.0–5.0 scale based on corporate tests. | `salary_hike_high_or_low` (52.5% High / 47.5% Low) | Forensically discovered 27-row block duplicate (12 contradictory labels); established ~8.6% Bayes floor. |
| **Dataset 4: SDS Personality Traits** | `SDS Personality Traits.xlsx` | 161 senior DS | Five-Factor Model (Big Five OCEAN) psychometric scores [17, 68] in client-facing roles. | `success_classification_high_low` (52.8% High / 47.2% Low) | Cleaned leading whitespace in column names (`' extraversion'`); discovered 9 repeated IDs with different traits. |

---

## 3. Core Empirical Discoveries & Mathematical Models

### Discovery 1: Narrative Storytelling Outweighs Coding at Entry Level
In our empirical analysis of 139 junior data scientists (Dataset 3), **Dashboard & Storytelling** is the single strongest differentiator of a high salary hike:
- **Standardized Effect Size:** **Cohen's $d = 1.323$ (Very Large)**, Mann-Whitney $U = 933.0$ ($p = 1.34 \times 10^{-13}$), Univariable Odds Ratio = **5.421**.
- High-hike junior practitioners average **4.85 / 5.0** in Storytelling vs **3.81 / 5.0** for low-hike peers (+1.031 delta).
- **Maths & Statistics** is the second strongest differentiator (**Cohen's $d = 1.222$**, Odds Ratio = **5.285**), establishing conceptual mathematical rigor as a stronger promotion moat than programming syntax ($d = 0.985$).

### Discovery 2: The "Silent Quant" Promotion Bottleneck
Cross-tabulating multi-skill interactions revealed a severe non-linear bottleneck:
- **Dual Mastery Cohort (Maths $\ge 4.5$ AND Storytelling $\ge 4.5$):** Achieves an **84.7% high-hike rate** (50 / 59 candidates).
- **The "Silent Quant" Cohort (Maths $\ge 4.5$ BUT Storytelling $< 4.0$):** Suffers a **78.6% low-hike rate** (only 21.4% high hike!).
- **Big Data Myth:** Big Data infrastructure has near-zero bivariate correlation with junior salary hikes ($d = 0.225, p = 0.217$).

#### Calibrated Multivariable Logistic Promotion Model:
$$\ln\left(\frac{P}{1-P}\right) = -26.224 + 1.821 \cdot \text{Maths} + 1.355 \cdot \text{Story} + 1.264 \cdot \text{AIML} + 0.996 \cdot \text{BigData} + 0.609 \cdot \text{Coding}$$
*(Pseudo $R^2 = 0.4993$, Likelihood Ratio $p = 3.61 \times 10^{-19}$. Mean-centered VIFs < 1.40).*

### Discovery 3: Conscientiousness & Openness Govern Senior Consultative Success
Analyzing 161 customer-facing senior data scientists (Dataset 4) proved that technical competence becomes table stakes, while behavioral discipline drives senior success:
- **Conscientiousness:** **Cohen's $d = 1.847$ (Massive)**, Point-Biserial $r = +0.680$ ($p < 10^{-15}$). High-success leads average **53.7 / 66** vs **35.7** for low-success leads.
- **Openness to Experience:** **Cohen's $d = 1.803$ (Massive)**, Point-Biserial $r = +0.671$ ($p < 10^{-15}$). High-success leads average **48.5 / 65** vs **33.3** for low-success leads.
- **Neuroticism Non-Factor:** Emotional sensitivity has zero statistical correlation with performance (**$d = -0.012, p = 0.941$**).

### Discovery 4: The 3-Gate Decision Rule (96.89% Empirical Accuracy)
A simple 3-node hierarchical rule correctly classifies **156 out of 161 senior practitioners**:
$$\text{Success} = (\text{Openness} > 38.5) \land (\text{Conscientiousness} > 36.5) \land (\text{Agreeableness} > 37.5)$$
- **100% Sensitivity:** All 85 successful senior data scientists satisfy all three gates simultaneously.
- **0% of practitioners with Conscientiousness $\le 36.5$ succeeded**, proving execution diligence is a mandatory gatekeeper.

---

## 4. Machine Learning Benchmarking (Stratified 5-Fold CV)

All models were evaluated under strict Stratified 5-Fold Cross-Validation to guarantee out-of-sample generalization:

| Dataset | Model Architecture | Accuracy (Mean ± SD) | ROC-AUC (Mean ± SD) | F1-Score (Mean ± SD) | Precision / Recall | Overfitting Assessment |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **JDS Skill Traits** | **Logistic Regression (L2)** | **84.1% ± 8.4%** | **0.904 ± 0.048** | **84.8% ± 8.8%** | 83.0% / 87.5% | Optimal, highly interpretable |
| **JDS Skill Traits** | Random Forest (Depth 3) | 84.9% ± 5.3% | 0.890 ± 0.050 | 85.7% ± 5.4% | 84.5% / 87.8% | Stable ensemble baseline |
| **JDS Skill Traits** | Decision Tree (Depth 3) | 79.8% ± 6.7% | 0.819 ± 0.066 | 81.4% ± 6.5% | 78.7% / 85.0% | Conservative threshold splits |
| **SDS Personality Traits**| **Decision Tree (Depth 3)** | **93.8% ± 4.9%** | **0.942 ± 0.051** | **93.9% ± 5.1%** | 94.2% / 94.1% | **100% explainable 3 gates** |
| **SDS Personality Traits**| **Random Forest (Depth 3)** | **95.0% ± 4.3%** | **0.991 ± 0.015** | **95.3% ± 4.3%** | 94.3% / 96.5% | Captures non-linear gates |
| **SDS Personality Traits**| Logistic Regression (L2) | 91.3% ± 5.7% | 0.947 ± 0.048 | 92.0% ± 5.4% | 90.1% / 94.1% | L2 manages quasi-separation |

---

## 5. Interactive Web Platform Walkthrough

SkillRoute is deployed as a fully functional Next.js 14 web application on [`http://localhost:3000`](http://localhost:3000):

| Route | Feature Module | Datasets Powered | User Capabilities & Key Visuals |
| :--- | :--- | :---: | :--- |
| **`/`** | **Landing Page** | All 4 Datasets | High-impact overview of SAS CU Hackathon submission, dataset badges, and direct module quick-links. |
| **`/dashboard`** | **Market Overview** | Datasets 1 & 2 | Interactive city demand heatmaps (Bengaluru, Mumbai, Delhi NCR), enterprise recruiter leaderboards, and salary distributions. |
| **`/jds-simulator`** | **Junior DS Promotion Simulator** | Dataset 3 | Real-time reactive sliders (1.0–5.0), instant high-hike probability gauge, and live **"Silent Quant" bottleneck alert**. |
| **`/sds-diagnostic`** | **Senior DS Leadership Diagnostic** | Dataset 4 | Big Five OCEAN sliders (17–68), instant **3-Gate Rule Pass/Fail checklist**, and executive persona classification. |
| **`/evidence`** | **Research & Evidence Hub** | All 4 Datasets | Interactive 5-tab research center: dataset audits, group difference tables, Cohen's d badges, and 5-fold CV curves. |
| **`/career-simulator`**| **Career Pathway Simulator** | Datasets 1 & 2 | Constrained optimization modeling reachable career transitions under candidate weekly study budgets. |
| **`/opportunities`** | **Market Opportunities** | Datasets 1 & 2 | Filterable vacancy explorer across top enterprises (TCS, Accenture, IBM, Cognizant). |

---

## 6. Monorepo Architecture & Tech Stack

```
skillroute/
├── frontend/             # Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Lucide
│   ├── app/              # Routes: /, /dashboard, /jds-simulator, /sds-diagnostic, /evidence, /career-simulator
│   ├── components/       # AppShell, Sliders, DecisionGauges, TransitionGraph, EvidenceCards
│   ├── data/derived/     # Pre-computed analytics from all 4 datasets (JDS, SDS, Market, Locations)
│   ├── types/            # Strict TypeScript interfaces
│   └── lib/              # Transition intelligence & auth contexts
│
├── backend/              # Python FastAPI REST microservice
│   ├── app/
│   │   ├── intelligence/ # Scorer, PathOptimizer, Explainability
│   │   ├── api/routes/   # REST endpoints
│   │   └── schemas/      # Pydantic v2 schemas
│   └── tests/            # Automated test suite
│
├── data/
│   ├── raw/              # 4 Immutable Official Competition Datasets
│   │   ├── Analytics Jobs.csv         # 15,841 job postings
│   │   ├── DataScience Jobs.csv       # 1,602 company benchmark records
│   │   ├── JDS Skill Traits.xlsx      # 139 junior data scientists
│   │   └── SDS Personality Traits.xlsx# 161 senior data scientists
│   ├── cleaned/          # Standardized CSV copies with audited transformations
│   └── derived/          # Machine learning metrics and role taxonomies
│
├── docs/                 # Official SAS CU Hackathon Documentation
│   ├── SkillRoute_SAS_CU_Hackathon_Approach_Note.pdf      # Round 2 Approach Note (100 Marks)
│   ├── SkillRoute_SAS_CU_Hackathon_Executive_Summary.pdf  # 4-Page Executive Defense Manual
│   ├── SKILLROUTE_FULL_PROJECT_DOCUMENTATION.md          # Master Markdown Documentation
│   └── SAS_CU_Hackathon_Round3_Presentation_Deck.md      # Round 3 Power Point Specification (20 Slides)
│
├── scripts/              # Data processing and PDF compilation engines
│   ├── build_data_pipeline.py            # End-to-end data processing & ML benchmarking
│   ├── generate_sas_hackathon_pdf.py     # ReportLab Approach Note generator
│   └── generate_4page_summary_pdf.py     # ReportLab Executive Summary generator
│
├── README.md             # Master GitHub Readme
└── docker-compose.yml    # Multi-container orchestration
```

---

## 7. Quickstart & Local Deployment

### Prerequisites
- **Node.js 18+** (tested on Node v20 & v22)
- **Python 3.10+** (tested on Python 3.14)
- **Git**

### 1. Clone & Setup Repository
```bash
git clone https://github.com/your-username/skillroute.git
cd skillroute
```

### 2. Launch Frontend (Next.js 14)
```bash
cd frontend
npm install
npm run dev
```
Open **[`http://localhost:3000`](http://localhost:3000)** in your browser.

### 3. Launch Backend (Optional Python FastAPI Service)
```bash
cd ../backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Interactive Swagger documentation available at: `http://localhost:8000/docs`

> **Deterministic Offline Demo Mode:** If the backend is not started, the Next.js frontend automatically operates on its pre-computed derived analytical matrices (`frontend/data/derived/`), guaranteeing 100% demo uptime and sub-millisecond response latency during jury defense.

---

## 8. Official Hackathon Deliverables

For the hackathon jury, the complete submission package includes:
- **Round 2 Approach Note (Total 100 Marks):** Comprehensive multi-page PDF formatted to single-spaced Times Roman specifications: [`docs/SkillRoute_SAS_CU_Hackathon_Approach_Note.pdf`](docs/SkillRoute_SAS_CU_Hackathon_Approach_Note.pdf).
- **Executive Defense Summary:** High-density 4-page executive brief: [`docs/SkillRoute_SAS_CU_Hackathon_Executive_Summary.pdf`](docs/SkillRoute_SAS_CU_Hackathon_Executive_Summary.pdf).
- **Round 3 Presentation Deck (Total 100 Marks):** Complete 20-slide executive storyline specification: [`docs/SAS_CU_Hackathon_Round3_Presentation_Deck.md`](docs/SAS_CU_Hackathon_Round3_Presentation_Deck.md).
- **Individual Dataset Audits:**
  - [01_data_science_jobs_audit.md](01_data_science_jobs_audit.md) & [Visualizations](01_data_science_jobs_eda/)
  - [02_analytics_jobs_audit.md](02_analytics_jobs_audit.md) & [Visualizations](02_analytics_jobs_eda/)
  - [03_jds_skill_traits_audit.md](03_jds_skill_traits_audit.md), [Candidate Analysis](03_jds_skill_traits_candidate_analysis.md) & [Visualizations](03_jds_skill_traits_eda/)
  - [04_sds_personality_audit.md](04_sds_personality_audit.md), [Candidate Analysis](04_sds_personality_candidate_analysis.md) & [Visualizations](04_sds_personality_eda/)

---

## 9. Responsible AI & Analytical Governance

1. **Non-Causal Association:** All models and effect sizes are strictly reported as empirical correlations within observed corporate samples. Developing storytelling or conscientiousness does not mechanically cause promotion, as organizational decisions depend on unmeasured budget constraints and manager discretion.
2. **Ethical Psychometric Deployment:** Personality diagnostics must be utilized exclusively for formative executive coaching, personal development, and mentorship pairing—never for automated candidate gatekeeping or hiring rejection.
3. **Data Integrity Transparency:** Forensic identification of the 27-row block duplication in Dataset 3 and whitespace formatting in Dataset 4 are openly documented, establishing rigorous academic honesty.

---

## 10. Contributors & Submission Authority

- **Lead Product Architect & Analytics:** Team SkillRoute
- **Event:** SAS CU Hackathon 2026
- **Host Institutions:** SAS Institute Inc. & Chandigarh University (CU)
- **License:** MIT License • Open for Academic & Workforce Research

*Copyright © 2026 Team SkillRoute • SAS CU Hackathon 2026. All rights reserved.*

# SAS CU Hackathon — Project Context & Architectural Blueprint

**Hackathon:** SAS CU Hackathon  
**Organizers:** SAS Institute Inc. & Chandigarh University (CU)  
**Authoritative Source Documents:**
1. *Data Description Doc.pdf*
2. *Problem Context Brief, SAS VFL Demos, Guidelines Dos and Donts.pdf*

---

## 1. Executive Summary & Problem Context

The SAS CU Hackathon centers around the data science and analytics workforce ecosystem:
> *"The problem is around data science related jobs, skills and personality traits of the data scientists. You may think of myriad of analysis including data management, visualizations, patterns, statistical or data mining analysis with a definitive objective to bring out best information out of available data."*

The core challenge bridges three interconnected dimensions:
1. **Job Market Dynamics (Macro Level):** Volume of opportunities, salary distributions, experience requirements, geographical hubs, and hiring enterprise demand.
2. **Technical Skill Capabilities (Micro Level - Junior Data Scientists):** Core technical competencies (Big Data, Math/Stats, Coding, AI/ML, Storytelling) and their observed relationship with professional advancement (salary hikes / promotions).
3. **Behavioral & Personality Dimensions (Individual Development Level - Senior Data Scientists):** Big Five personality traits (OCEAN / CANOE model) characterizing senior, customer-facing data scientists and their correlation with organizational success levels.

---

## 2. Evaluation Criteria & Scoring Framework

The competition follows a two-round scored evaluation leading to final team selection:

### Round 2: Approach Note (Total: 100 Marks | Final Weight: 70%)
*Deliverable Format:* Word document, 20–25 pages (excluding Appendix), Times New Roman, 12pt, single spacing.

| Evaluation Section | Marks | Key Assessment Focus |
| :--- | :---: | :--- |
| **Problem Definition / Analytics Objective** | **10** | Problem identification skills, scope, analytical depth, and coverage of the chosen domain problem. |
| **Approach Description** | **15** | End-to-end workflow, conceptual motivations, and technical rationale for adopting the chosen methodology. |
| **Data Exploration & Preparation** | **25** | Identification of real data issues, data manipulation, derivation of meaningful features, data consolidation, exploratory analysis, and data preparation strategies. |
| **Data Analysis & Modeling** | **30** | Statistical/non-statistical analytical execution, descriptive and predictive modeling, data mining, machine learning rigor, and model interpretability. |
| **Results & Conclusions** | **10** | Synthesis of findings, logical linkage between data analysis and original problem statement, and solution summary. |
| **Implications** | **10** | Actionable implications of the findings for relevant stakeholders (industry, professionals, educators, workforce planners). |

### Round 3: Jury Presentation (Total: 100 Marks | Final Weight: 30%)
*Deliverable Format:* PowerPoint presentation (15–25 slides), 10-minute presentation + 3–5 minutes Jury Q&A.

| Evaluation Section | Marks | Key Assessment Focus |
| :--- | :---: | :--- |
| **Presentation & Communication Skills** | **25** | Delivery, confidence, audience connection, and articulation. |
| **Usage of Graphics / Visuals** | **10** | Impactful visual analytics, evidence-backed graphs, charts proving/disproving hypotheses. |
| **Slide Management** | **5** | Sequencing, information density, time distribution. |
| **Overall Presentation Storyline** | **20** | Logical progression from problem identification to definitive conclusions. |
| **Concluding Slides** | **15** | Definitive conclusions and strategic takeaways. |
| **Q & A by Jury** | **25** | Assertiveness, alertness, depth of domain understanding. |

**Final Ranking:** $\text{Total Score} = (0.70 \times \text{Round 2 Marks}) + (0.30 \times \text{Round 3 Marks})$ (Top 3 Teams Awarded).

---

## 3. Technology Strategy & Environment

The hackathon is explicitly **Technology Agnostic**:
- **Supported Environments:** Python, SAS (SAS Viya / SAS VFL, SAS Visual Analytics, SAS Model Studio), R, Julia, Scala.
- **SAS Viya for Learners (VFL):** Data can be uploaded to VFL for Visual Analytics dashboards and SAS Model Studio modeling.
- **Python / Modern Full-Stack:** Fully supported for custom data pipelines, statistical modeling, machine learning, and interactive intelligence dashboards.
- **Strict Constraint:** Microsoft Excel may only be used for preliminary inspection and is formally discouraged for primary analytical deliverables.

---

## 4. Potential Analytical Objectives Supported by the Official Documents

*(Note: Per hackathon instructions, the final problem statement should be formulated thoughtfully after inspecting the actual raw data.)*

The official documents support several viable analytical directions:

### Objective A: Comprehensive Job Market & Compensation Intelligence
- Analyze supply-demand imbalances across analytics and data science roles.
- Model compensation trajectories as a function of experience, role specialization, company tier, and geographic cluster.
- Identify top recruiting enterprise clusters and hiring concentrations.

### Objective B: Empirical Skill Demand & Capability Taxonomy
- Extract, clean, and cluster key technical and functional skills from job postings.
- Identify core foundational skills vs. role-differentiating technical capabilities.
- Quantify skill co-occurrence and evaluate market premium associated with specific skill combinations.

### Objective C: Junior Data Scientist Outcome & Advancement Modeling
- Investigate the statistical relationship between the 5 measured technical dimensions (Big Data, Math/Stats, Coding, AI/ML, Storytelling) and salary hike outcomes.
- Train robust, cross-validated classification models (Logistic Regression, Decision Trees, Random Forests) to identify key advancement drivers.
- Formulate data-backed training and capability development roadmaps for entry-level professionals.

### Objective D: Senior Data Scientist Behavioral Profiles & Ethical Career Reflection
- Analyze the Big Five personality distributions of senior, client-facing practitioners.
- Compare behavioral dimensions across organizational success tiers.
- Formulate a self-reflection and professional coaching framework (strictly maintaining ethical guidelines against employment screening usage).

### Objective E: Integrated Talent-to-Opportunity Transition Engine (SKILLROUTE Core)
- Connect market role requirements $\rightarrow$ demanded skills $\rightarrow$ individual capability assessment $\rightarrow$ empirical skill gap analysis $\rightarrow$ optimized transition pathway.
- Combine macro market intelligence with micro individual developmental insights.

---

## 5. Proposed Project Directory Structure

```
skillroute/
├── data/
│   ├── raw/                  # STRICTLY READ-ONLY official hackathon datasets
│   │   ├── Analytics Jobs.csv
│   │   ├── DataScience Jobs.csv
│   │   ├── JDS Skill Traits.xlsx
│   │   ├── SDS Personality Traits.xlsx
│   │   ├── Data Description Doc.pdf
│   │   └── Problem Context Brief.pdf
│   ├── cleaned/              # Cleaned datasets (standardized, typed, imputations logged)
│   │   ├── analytics_jobs_cleaned.parquet / .csv
│   │   ├── datascience_jobs_cleaned.csv
│   │   ├── jds_traits_cleaned.csv
│   │   └── sds_traits_cleaned.csv
│   └── derived/              # Precomputed aggregates, features, and model metrics
│       ├── market_aggregates.json
│       ├── role_profiles.json
│       ├── skill_frequencies.json
│       ├── jds_model_results.json
│       ├── sds_model_results.json
│       └── data_quality_audit.json
│
├── backend/                  # Analytical Services & REST APIs (FastAPI)
│   ├── app/
│   │   ├── api/routes/       # Modular API endpoints
│   │   ├── intelligence/     # Statistical engines, ML models, transition scorers
│   │   ├── schemas/          # Data contracts & validation (Pydantic v2)
│   │   └── main.py           # Application entrypoint
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Presentation & Intelligence Dashboard (Next.js / Tailwind CSS)
│   ├── app/                  # Application pages (Dashboard, Market, Roles, Skills, ML Analytics, Quality)
│   ├── components/           # UI cards, chart widgets, interactive simulators
│   ├── lib/                  # Data service client & offline sync fallback
│   └── package.json
│
├── notebooks/                # Exploratory Data Analysis & Statistical Modeling Notebooks
│   ├── 01_eda_job_market.ipynb
│   ├── 02_jds_skill_outcome_modeling.ipynb
│   └── 03_sds_personality_analysis.ipynb
│
├── scripts/                  # Automated pipeline and validation scripts
│   ├── run_pipeline.py
│   └── validate_data_integrity.py
│
├── docs/                     # Hackathon Approach Note & Final Deliverables
│   ├── project_context.md    # This document
│   ├── dataset_inventory.md  # Official dataset inventories & schemas
│   ├── project_rules.md      # Hackathon Dos & Don'ts and project constraints
│   ├── approach_note_draft.md# 20-25 page Approach Note scaffolding
│   └── data_dictionary.md   # Complete field-by-field dictionary
│
├── README.md                 # Project README with setup & execution instructions
└── docker-compose.yml        # Reproducible deployment configuration
```

# SAS CU Hackathon — Official Project Rules & Methodological Guardrails

**Event:** SAS CU Hackathon  
**Authority:** Official Briefing Documents (*Problem Context Brief* & *Data Description Doc*) + Project Architect Guidelines.

---

## 1. Official Hackathon Rules (Do's and Don'ts)

Per Slide 25 of the authoritative Hackathon Guidelines (*Important Note - Do's & Don'ts*):

1. **Excel Discouraged:** Microsoft Excel may be utilized strictly for initial data viewing and preliminary inspection. Relying on Excel for core analytical models, data manipulation, or final dashboarding is formally discouraged. Professional analytical platforms (SAS / Python / R) must be used.
2. **Data Transfer Prohibition:** No e-mail access or data transfers to the outside world during night or day. All analytical execution must remain within the project environment.
3. **Professional Conduct:** Unfair means, indiscipline, non-cooperation, or disrespectful conduct toward other teams will lead to immediate disqualification.
4. **Cross-Team Independence:** Cross-team collaboration or sharing of solutions is strictly prohibited.
5. **System & Software Integrity:** Any damage or misuse of lab systems, software instances, or compute environments will not be tolerated.
6. **Integrity with Mentors & Jury:** No attempt to influence mentors or jury members inside or outside the premises.
7. **Adherence to Timelines:** Manage time and compute resources judiciously. Allocate sufficient time to the initial formulation of the problem statement.
8. **Finality of Jury Decisions:** The decision of the evaluation jury is final and binding; no appeals or repeals are permitted.

---

## 2. Strict Project Architect Guardrails

To ensure absolute methodological integrity and maximum scoring under Round 2 (100 Marks) and Round 3 (100 Marks), the following architectural guardrails are enforced:

### A. Data Integrity & Preservation
- **Preserve Raw Files:** NEVER overwrite, mutate, edit, or delete any file in `data/raw/`. Raw datasets remain strictly immutable as the baseline source of truth.
- **Separate Data Layers:** Maintain three distinct layers:
  $$\text{data/raw/} \longrightarrow \text{data/cleaned/} \longrightarrow \text{data/derived/}$$
- **No File Deletion:** Do not delete existing repository files or infrastructure components arbitrarily.
- **Explicit Missingness Reporting:** When values, columns, or metadata are absent, explicitly document their missingness, sparsity percentage, and imputation rationale. Never silently mask missing data.

### B. Analytical & Modeling Guardrails
- **No Fabricated Data or Predictions:** NEVER insert mock JSON, hardcoded prediction percentages, or synthetic analytics into official analytics views. Every KPI, chart, and metric must trace directly back to verified data processing.
- **No Artificial Cross-Dataset Joins:** The four datasets represent separate analytical populations:
  - *Data Science Jobs (1,602 rows):* Company-level vacancies and compensation.
  - *Analytics Jobs (15,841 rows):* Job posting descriptions and skill requirements.
  - *JDS Skill Traits (139 rows):* Junior data scientist technical assessment sample.
  - *SDS Personality Traits (161 rows):* Senior practitioner psychometric sample.  
  **Do NOT force artificial foreign keys or synthetic joins between these unrelated tables.** Analyze each dataset within its legitimate context and synthesize findings conceptually.
- **No Fabricated Temporal Insights:** The job postings represent a 2024–25 cross-sectional sample without transaction date/time stamps. **Do NOT generate artificial monthly trends, weekly graphs, or "emerging this month" time-series forecasts.**
- **No Pre-Mature Conclusions:** Analytical conclusions must derive strictly from empirical evidence (descriptive statistics, distributions, correlations, cross-validation metrics) after full data inspection.
- **Small Dataset Validation Discipline:** JDS ($N=139$) and SDS ($N=161$) are compact samples. Modeling must use **Stratified K-Fold Cross-Validation**, report standard errors, and avoid claiming overfitted production-grade generalization.

### C. Responsible AI & Ethical Boundaries
- **Strict Prohibition on Personality Hiring Gating:** The SDS Personality dataset must be presented **exclusively as a self-assessment, reflective development, and coaching tool**.
- **No Employment Screening by Trait:** Personality model outputs must NEVER be positioned as automated tools for hiring, rejecting, or promoting human candidates.
- **Statistical Nuance in Language:** Maintain rigorous distinction between *correlation*, *observed sample association*, and *causation*. Use language such as *"associated with in the sample"* rather than *"guarantees outcome"*.

### D. Identity & Project Scope
- **No Demo Account Hardcoding:** Do not use demo persona accounts (such as Ranjan Maiti or Aarav/Aatharv) as the official project identity.
- **Alignment with Hackathon Purpose:** Anchor the project squarely within the SAS CU Hackathon problem statement: understanding analytics jobs, technical skill progression, and senior practitioner development.
- **Phased Execution:** Do NOT start training production models or lock the final problem statement until the uploaded raw datasets have undergone thorough exploratory inspection.

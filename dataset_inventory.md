# SAS CU Hackathon — Official Dataset Inventory & Data Dictionaries

**Reference Source:** *Data Description Doc.pdf* & *Problem Context Brief, SAS VFL Demos, Guidelines Dos and Donts.pdf*  
**Scope:** 4 Official Datasets provided for the SAS CU Hackathon.

---

## 1. High-Level Dataset Inventory

| Dataset Identifier | File Name | Approximate Expected Rows | Description & Coverage Period | Target Variable (if any) |
| :--- | :--- | :---: | :--- | :--- |
| **Dataset 1** | `Data Science Jobs.csv` | ~1,600 | Company-level job postings in Data Science across leading employers (2024–25). Includes company name, job title, experience, salary ranges, and vacancy counts. | None (Exploratory / Benchmark) |
| **Dataset 2** | `Analytics Jobs.csv` | ~15,800 | Granular job market postings in the analytics space (2024–25). Contains designation, experience intervals, descriptions, skill requirements, geographical locations, and offered salaries. | None (Market Mining / Skill Extraction) |
| **Dataset 3** | `JDS Skill Traits.xlsx` | ~140 | Evaluated technical skill profiles of junior/entry-level data scientists from a corporate training-cum-evaluation program, with career advancement outcomes. | `salary_hike_high_or_low` (Binary: 1=High, 0=Low) |
| **Dataset 4** | `SDS Personality Traits.xlsx` | ~160 | Trait analysis data of senior, customer-facing data scientists based on the Big Five Personality Model (OCEAN / EPQ). Maps traits to internal success levels. | `success_ classification_ high_low` (Binary: 1=High, 0=Low) |

---

## 2. Dataset 1: Data Science Jobs

- **File Name:** `Data Science Jobs.csv` (or `DataScience Jobs.csv`)
- **Approximate Volume:** ~1,600 rows, 8 columns
- **Purpose:** Macro-level benchmark analysis of employer hiring volume, salary brackets by company, role titles, and minimum experience thresholds.

### Data Dictionary

| Column Name | Official Brief Description | Inferred / Expected Type | Analytical Purpose & Considerations |
| :--- | :--- | :--- | :--- |
| `reference_no` | Row identification number or ID | Integer / Identifier | Unique posting / company observation identifier. |
| `company_name` | Name of the recruiting company | Text / Categorical | Employer demand ranking, company comparison, hiring concentration analysis. |
| `job_title` | Title of the job | Text / Categorical | Standardized data science role titles (e.g., Data Scientist, Data Engineer, Senior Data Scientist, Data Architect). |
| `min_experience` | Minimum required experience | Numeric (Years) | Experience gating threshold for recruiting candidates. |
| `avg_salary` | Average salary offered across the job postings for the company | String / Numeric (e.g., "7.8L") | Benchmark compensation measure. Requires parsing from string units (Lakhs per annum). |
| `min_salary` | Minimum salary offered across the job postings for the company | String / Numeric (e.g., "4.5L") | Lower bound of compensation bracket. |
| `max_salary` | Maximum salary offered across the job postings for the company | String / Numeric (e.g., "16.0L") | Upper bound of compensation bracket. |
| `num_of_jobs` | Number of postings by the company | Numeric (Integer count) | Weighting factor representing total vacancy volume per company-role pair. |

---

## 3. Dataset 2: Analytics Jobs

- **File Name:** `Analytics Jobs.csv`
- **Approximate Volume:** ~15,800 rows, 8 columns
- **Purpose:** Primary job market micro-data. Utilized for role discovery, skill demand frequency, experience requirements, geographic concentration, and skill gap identification.

### Data Dictionary

| Column Name | Official Brief Description | Inferred / Expected Type | Analytical Purpose & Considerations |
| :--- | :--- | :--- | :--- |
| `s_no` | Row identification number or ID | Integer / Identifier | Serial number / record identifier. |
| `experience` | Years of experience required for the job | Text Interval (e.g., "2-5 yrs") | Experience intervals. Requires extraction into `min_experience`, `max_experience`, and `avg_experience`. |
| `job_description` | Typical description of the job | Free Text | Unstructured textual responsibilities. May contain missing values or boilerplate descriptions. |
| `job_desig` | Designation or position of the job role | Text / Categorical | Detailed job title. Highly diverse; requires mapping into canonical role families. |
| `job_type` | Type or classification of the job | Categorical | Employment arrangement (e.g., Full Time, Part Time, Contract). High sparsity observed in initial checks. |
| `key_skills` | Key skills required for the job | Delimited String (e.g., "Python, SQL, ML") | Core feature for skill extraction. Needs parsing, splitting, synonym canonicalization, and deduplication. |
| `location` | Geo location of the job requirement | Text (e.g., "Bengaluru, Chennai") | Job geographical location. Can contain multi-city strings; requires normalization to metro clusters. |
| `salary` | Salary offered | Categorical Interval (e.g., "6to10", "10to15") | Binned salary brackets in Lakhs INR per annum. |

---

## 4. Dataset 3: JDS Skill Traits (Junior Data Scientists)

- **File Name:** `JDS Skill Traits.xlsx`
- **Approximate Volume:** ~140 rows, 7 columns
- **Target Variable:** `salary_hike_high_or_low` (1 = High, 0 = Low)
- **Measurement Scale:** Measured technical competencies on a **1–5 scale** summarized from multi-stage assessments, training-cum-evaluations, and feedback.
- **Purpose:** Analyze technical capabilities associated with positive salary progression for entry-level and junior practitioners.

### Data Dictionary

| Column Name | Official Brief Description | Metric Scale | Analytical Purpose |
| :--- | :--- | :---: | :--- |
| `id` | Row identification number or ID | Identifier | Junior data scientist candidate ID. |
| `big_data_skills` | Average score on data skills, summarized on a scale of 1–5 based on multiple tests, training cum evaluations and feedback. | 1.0 – 5.0 Continuous | Evaluates big data frameworks, data wrangling, and pipeline execution. |
| `maths-stats_skills` | Average score on quantitative, maths and statistics skills, summarized on a scale of 1–5 based on multiple tests, training cum evaluations and feedback. | 1.0 – 5.0 Continuous | Evaluates statistical theory, probability, hypothesis testing, and quantitative rigor. |
| `coding_skills` | Average score on coding skills on SAS, Python, SQL and so on, summarized on a scale of 1–5 based on multiple tests, training cum evaluations and feedback. | 1.0 – 5.0 Continuous | Evaluates programming syntax, algorithms, and query proficiency across SAS, Python, and SQL. |
| `ai_and_ml_skills` | Average score on newer concepts of artificial intelligence and machine learning, summarized on a scale of 1–5 based on multiple tests, training cum evaluations and feedback. | 1.0 – 5.0 Continuous | Evaluates predictive modeling, classical machine learning algorithms, and modern AI concepts. |
| `dashboard_and_storytelling_skills` | Average score on visualization, reporting and storytelling, summarized on a scale of 1–5 based on multiple tests, training cum evaluations and feedback. | 1.0 – 5.0 Continuous | Evaluates BI reporting, dashboarding, executive communication, and data storytelling. |
| `salary_hike_high_or_low` | A binary variable for performance-based salary hike: **1 = High**, **0 = Low** | Binary (0 / 1) | **Target Variable:** Used for group comparison, odds ratio analysis, and cross-validated predictive classification. |

---

## 5. Dataset 4: SDS Personality Traits (Senior Data Scientists)

- **File Name:** `SDS Personality Traits.xlsx`
- **Approximate Volume:** ~160 rows, 7 columns
- **Target Variable:** `success_ classification_ high_low` (1 = High, 0 = Low)
- **Measurement Scale:** Normalized psychometric scores based on **The Big Five Personality Model (OCEAN / CANOE)** and Eysenck Personality Questionnaire (EPQ). Higher numbers represent higher levels of the measured dimension.
- **Purpose:** Profile behavioral characteristics of senior, customer-facing data scientists and derive reflective career development insights.

### Data Dictionary

| Column Name | Official Brief Description | Metric Scale | Analytical Interpretation |
| :--- | :--- | :---: | :--- |
| `id` | Row identification number or ID | Identifier | Senior practitioner candidate ID. |
| `neuroticism` | Measures neuroticism—a fundamental trait characterized by chronic tendency to experience negative emotions (anxiety, depression, anger, self-doubt). | Normalized Score | Lower scores generally reflect higher emotional stability and composure under executive pressure. |
| `extraversion` | Measures extraversion—spectrum of social engagement ranging from high energy, outgoing, assertive (extraverted) to quiet, reserved, solitary (introverted). | Normalized Score | Evaluates interpersonal assertiveness and client-facing communication appetite. |
| `openness_to_experience` | Measures level of creativity, curiosity, and willingness to embrace new ideas, unconventional thinking, and novel experiences. | Normalized Score | Evaluates intellectual exploration, algorithmic innovation, and research adaptability. |
| `agreeableness` | Measures tendency to be compassionate, cooperative, trusting, and empathetic rather than suspicious or antagonistic. | Normalized Score | Evaluates cross-functional teamwork, empathy, and collaborative stakeholder partnership. |
| `conscientiousness` | Measures tendency to be organized, responsible, hardworking, goal-directed, and disciplined. | Normalized Score | Evaluates execution rigor, delivery reliability, and structured project leadership. |
| `success_ classification_ high_low` | Presents high and low classification of success levels within the organization: **1 = High**, **0 = Low** | Binary (0 / 1) | **Target Variable:** Used for cohort comparison, radar profile visualization, and reflective professional development. |

---

## 6. Official Data Considerations & Inherent Limitations

Per Slide 12 of the official Hackathon briefing (*Data : Key Considerations*), the following ground truths apply:

1. **Self-Reported / Public / Masked Nature:** Postings and trait evaluations represent real-world, public, or masked corporate samples.
2. **Textual Noise & Misspellings:** Text fields (`key_skills`, `location`, `job_desig`) contain non-standard spelling, abbreviations, and informal tags.
3. **Outliers:** Salary and experience representations may exhibit extreme values requiring robust non-parametric statistics (medians, IQR).
4. **Normalized Trait Metrics:** Trait dimensions are provided in normalized score representations; models must not assume standard normal distribution without empirical verification.
5. **No Temporal Dimension:** The datasets represent a 2024–25 cross-sectional sample without transaction timestamps or monthly indices. **No time-series, month-over-month trends, or weekly forecasts should ever be fabricated.**
6. **Independence of Datasets:** The four datasets represent separate analytical lenses. **Artificial, ungrounded joins between disparate tables (e.g., joining individual job postings to personality traits) are strictly prohibited.**

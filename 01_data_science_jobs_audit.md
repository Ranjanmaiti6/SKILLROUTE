# Data Audit Report: Data Science Jobs Dataset

**File Audited:** `DataScience Jobs.csv` (Official Dataset 1)  
**Audit Date:** October 2026  
**Auditor:** Lead Data-Science Project Architect  
**Authoritative Reference:** *Data Description Doc.pdf* (Page 1–2) & *Problem Context Brief, SAS VFL Demos, Guidelines Dos and Donts.pdf*

---

## 1. File Identification & Dimensions

- **Exact File Name:** `DataScience Jobs.csv` (referenced in documentation as *Data Science Jobs*)
- **File Format:** Comma-Separated Values (CSV), UTF-8 text encoding
- **File Size on Disk:** ~96.4 KB (96,390 bytes)
- **Total Record Count (Rows):** **1,602** records (excluding 1 header row)
- **Total Attribute Count (Columns):** **8** attributes
- **Header Integrity:** Exactly 1 clean header row with 8 comma-delimited column names.

---

## 2. Column Inventory & Data Description Document Reconciliation

| # | Actual Column Name in File | Column Name in Data Description Doc | Match Status | Official Brief Description |
| :-: | :--- | :--- | :---: | :--- |
| 1 | `reference_no` | `reference_no` | **Exact Match** | Row identification number or ID |
| 2 | `company_name` | `company_name` | **Exact Match** | Name of the recruiting company |
| 3 | `job_title` | `job_title` | **Exact Match** | Title of the job |
| 4 | `min_experience` | `min_experience` | **Exact Match** | Minimum required experience |
| 5 | `avg_salary` | `avg_salary` | **Exact Match** | Average salary offered across the job postings for the company |
| 6 | `min_salary` | `min_salary` | **Exact Match** | Minimum salary offered across the job postings for the company |
| 7 | `max_salary` | `max_salary` | **Exact Match** | Maximum salary offered across the job postings for the company |
| 8 | `num_of_jobs` | `num_of_jobs` | **Exact Match** | Number of posting by the company |

**Reconciliation Verdict:** 100% schema alignment. All 8 columns exactly match the official data dictionary specifications with identical naming and ordering.

---

## 3. Data Types & Storage Structure

| Column Name | Raw Data Type | Semantic / Intended Type | Example Raw Value | Transformation Needed in Cleaning Phase |
| :--- | :--- | :--- | :--- | :--- |
| `reference_no` | `int64` | Identifier / Reference Code | `7834` | Retain as integer identifier. |
| `company_name` | `object` (string) | Categorical (Nominal) | `"TCS"` | Strip whitespace; flag anonymized entries. |
| `job_title` | `object` (string) | Categorical (Ordinal/Nominal) | `"Data Scientist"` | Validate canonical role taxonomy (10 categories). |
| `min_experience` | `int64` | Numeric (Ratio / Discrete) | `2` | Verify non-negativity; use in seniority models. |
| `avg_salary` | `object` (string) | Numeric Continuous (LPA) | `"7.8L"` | Strip `"L"` unit string; convert to `float64` LPA. |
| `min_salary` | `object` (string) | Numeric Continuous (LPA) | `"4.5L"` | Strip `"L"` unit string; convert to `float64` LPA. |
| `max_salary` | `object` (string) | Numeric Continuous (LPA) | `"16.0L"` | Strip `"L"` unit string; convert to `float64` LPA. |
| `num_of_jobs` | `int64` | Numeric (Discrete Count / Weight) | `841` | Validate $x \ge 1$; use as opportunity frequency weight. |

---

## 4. Completeness & Missing Values Audit

| Column Name | Missing Count | Missing Percentage | Null Representation | Impact Assessment |
| :--- | :---: | :---: | :---: | :--- |
| `reference_no` | 0 | 0.00% | None | Complete across all 1,602 rows. |
| `company_name` | 0 | 0.00% | None | Complete; no empty strings or whitespace-only cells. |
| `job_title` | 0 | 0.00% | None | Complete; all 1,602 rows map to defined titles. |
| `min_experience` | 0 | 0.00% | None | Complete; integer values from 0 to 21. |
| `avg_salary` | 0 | 0.00% | None | Complete; 100% formatted as `X.XL`. |
| `min_salary` | 0 | 0.00% | None | Complete; 100% formatted as `X.XL`. |
| `max_salary` | 0 | 0.00% | None | Complete; 100% formatted as `X.XL`. |
| `num_of_jobs` | 0 | 0.00% | None | Complete; integer counts from 3 to 4,200. |

**Completeness Verdict:** The dataset contains **0 missing cells (100% matrix completeness)**. No imputation is necessary for structural values.

---

## 5. Duplicate Rows & Key Integrity Analysis

1. **Exact Full-Row Duplicates:** **0 rows**. Every row in the CSV is distinct across all 8 fields.
2. **Duplicate Reference Numbers (`reference_no`):**
   - **Total Unique `reference_no` Values:** 1,460 out of 1,602 rows.
   - **Duplicated `reference_no` Occurrences:** 142 reference numbers appear multiple times, spanning **276 rows** (17.2% of the dataset).
   - **Crucial Diagnostic:** Inspection confirms that `reference_no` is **NOT a unique row primary key**. Distinct companies and distinct job titles share the same `reference_no` (e.g., `reference_no = 1024` belongs to both `Exl India` for *Business Analyst* and `IHS Markit` for *Senior Data Analyst*; `reference_no = 1093` belongs to both `Shell` for *Data Scientist* and `WNS` for *Senior Data Analyst*).
3. **Natural Composite Primary Key:**
   - The composite pair `(company_name, job_title)` was evaluated for uniqueness:
   $$\text{Unique Pairs} = 1,602 \quad \Longleftrightarrow \quad \text{Total Rows} = 1,602$$
   - **Duplicate Pairs:** **0**. Each row strictly represents a unique employer-role posting observation.

---

## 6. Logical Consistency & Boundary Validation

| Rule Checked | Expected Condition | Violations Found | Notes & Diagnostic Observations |
| :--- | :---: | :---: | :--- |
| **Salary Monotonicity** | $\text{min\_salary} \le \text{max\_salary}$ | **0** | Verified: 100% of rows satisfy lower bound $\le$ upper bound. |
| **Mean Salary Bound** | $\text{min\_salary} \le \text{avg\_salary} \le \text{max\_salary}$ | **0** | Verified: Stated average is strictly between min and max across all records. |
| **Salary Degeneracy** | $\text{min\_salary} == \text{max\_salary}$ | **3** | Exactly 3 postings have zero salary spread: Ganit Business Solutions (Data Analyst: 6.0L), Galytix Analytics (Data Analyst: 6.0L), Maveric Systems (Data Architect: 19.0L). |
| **Experience Validity** | $\text{min\_experience} \ge 0$ | **0** | Verified: No negative experience values. Range: [0, 21]. |
| **Vacancy Validity** | $\text{num\_of_jobs} \ge 1$ | **0** | Verified: No zero or negative vacancies. Minimum: 3 jobs. |

---

## 7. Numerical Distribution & Descriptive Statistics

*(Salaries converted to numeric Lakhs per Annum / LPA for statistical computation)*

| Metric | `min_experience` (Years) | `min_salary_lpa` (LPA) | `avg_salary_lpa` (LPA) | `max_salary_lpa` (LPA) | `salary_spread_lpa` (LPA) | `num_of_jobs` (Vacancies) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Count** | 1,602 | 1,602 | 1,602 | 1,602 | 1,602 | 1,602 |
| **Mean** | **2.80** | **8.63** | **13.23** | **19.14** | **10.51** | **58.06** |
| **Std Dev** | 2.35 | 5.80 | 7.84 | 11.15 | 8.01 | 169.04 |
| **Minimum** | 0.00 | 0.20 | 1.40 | 2.00 | 0.00 | 3.00 |
| **1st Percentile** | 0.00 | 1.10 | 1.90 | 2.60 | 0.80 | 4.00 |
| **25% (Q1)** | 1.00 | 4.50 | 7.70 | 12.00 | 5.30 | 9.00 |
| **50% (Median)** | **2.00** | **7.50** | **11.60** | **17.00** | **8.90** | **17.00** |
| **75% (Q3)** | 4.00 | 11.60 | 17.28 | 24.00 | 13.00 | 46.75 |
| **95% Percentile** | 7.00 | 20.00 | 28.30 | 39.95 | 25.10 | 210.35 |
| **99% Percentile** | 10.00 | 27.00 | 39.69 | 51.00 | 42.00 | 692.99 |
| **Maximum** | **21.00** | **55.00** | **82.00** | **102.00** | **91.00** | **4,200.00** |
| **IQR** | 3.00 | 7.10 | 9.58 | 12.00 | 7.70 | 37.75 |
| **Skewness** | +1.76 | +1.55 | +1.74 | +2.40 | +3.78 | +12.80 |
| **Kurtosis** | +5.60 | +4.09 | +7.42 | +12.74 | +27.04 | +251.07 |

---

## 8. Outlier Detection (Tukey's 1.5 $\times$ IQR Rule)

- **`num_of_jobs` Outliers:** **164 records (10.2%)** exceed the upper fence ($Q_3 + 1.5 \times \text{IQR} = 103.6$ jobs). Highly skewed by mass IT services recruiters (e.g., TCS Business Analyst: 4,200 jobs; Accenture Business Analyst: 1,900 jobs; Genpact: 1,700 jobs).
- **`avg_salary_lpa` Outliers:** **39 records (2.4%)** exceed the upper fence (31.54 LPA). Top outliers represent senior roles in leading tech firms (e.g., Flipkart Senior Data Scientist: 82.0L; Emirates Airlines Senior Data Engineer: 68.3L; Uber Senior Data Engineer: 66.3L; Microsoft Senior Data Scientist: 56.4L).
- **`max_salary_lpa` Outliers:** **40 records (2.5%)** exceed 42.0 LPA, peaking at 102.0L (ADP Data Architect) and 100.0L (Flipkart & Microsoft Senior Data Scientist).
- **`min_experience` Outliers:** **39 records (2.4%)** exceed 8.5 years, peaking at 21 years (Hitachi Data Architect) and 16 years (T-Systems Data Architect).

---

## 9. Categorical Structure & Inconsistencies

### Job Title Breakdown (Exactly 10 Canonical Roles)
| Job Title | Record Count | Stated Vacancy Volume | % of Total Vacancies | Median Min Exp | Mean Avg Salary |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Business Analyst** | 188 | 32,843 | 35.31% | 2.0 yrs | 8.95 LPA |
| **Data Analyst** | 187 | 18,095 | 19.46% | 1.0 yrs | 5.71 LPA |
| **Senior Business Analyst** | 187 | 14,115 | 15.18% | 4.0 yrs | 13.17 LPA |
| **Data Scientist** | 188 | 9,051 | 9.73% | 2.0 yrs | 13.53 LPA |
| **Data Engineer** | 188 | 8,044 | 8.65% | 1.0 yrs | 11.81 LPA |
| **Senior Data Analyst** | 187 | 3,825 | 4.11% | 3.0 yrs | 9.57 LPA |
| **Senior Data Engineer** | 183 | 3,411 | 3.67% | 4.0 yrs | 19.00 LPA |
| **Senior Data Scientist** | 185 | 2,129 | 2.29% | 4.0 yrs | 22.29 LPA |
| **Machine Learning Engineer** | 59 | 964 | 1.04% | 1.0 yrs | 9.85 LPA |
| **Data Architect** | 50 | 528 | 0.57% | 10.0 yrs | 25.09 LPA |
| **Total / Overall** | **1,602** | **93,005** | **100.00%** | **2.0 yrs** | **13.23 LPA** |

### Company Name Quality & Masked Entries
- **Unique Companies:** **642 distinct employers**.
- **Case Sensitivity & Whitespace:** Clean; no casing or whitespace collisions detected.
- **Masked / Anonymized Placeholders Identified:**
  - `ABC`: 3 records (130 vacancies)
  - `Confidential`: 3 records (73 vacancies)
  - `N+A`: 3 records (89 vacancies)
  - `Xyz Company`: 2 records (60 vacancies)
  - `Freelance Consultants`: 3 records (62 vacancies)
  - `Data Entry`: 1 record (38 vacancies)  
  *Finding:* Confirms the official guidance warning that data contains public, self-reported, and masked entries.

---

## 10. Generated Exploratory Visualizations (`01_data_science_jobs_eda/`)

The following high-resolution charts were generated and saved in the [`01_data_science_jobs_eda/`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/01_data_science_jobs_eda) directory:

1. **`01_salary_distribution_by_role.png`:** Boxplot and violin distribution comparing average salary distributions across the 10 job titles (ordered by median salary), highlighting mean markers and interquartile ranges.
2. **`02_experience_vs_salary_scatter.png`:** Scatter plot mapping minimum required experience against average salary (LPA) across roles, with an empirical trend line ($r = 0.59$).
3. **`03_top_companies_by_vacancies.png`:** Bar chart ranking the top 15 hiring companies by aggregate vacancy count (`num_of_jobs`), illustrating extreme hiring concentration.
4. **`04_role_demand_volume.png`:** Dual-axis visualization showing total vacancy volume alongside the number of distinct hiring companies per role.
5. **`05_salary_spread_distribution.png`:** Frequency histogram and KDE curve of salary spreads ($\text{max\_salary} - \text{min\_salary}$), highlighting compensation uncertainty.
6. **`06_correlation_heatmap.png`:** Pearson correlation matrix between all numerical attributes (`min_experience`, salary metrics, and `num_of_jobs`).

---

## 11. Variable Utility Mapping

| Analytical Dimension | Candidate Features in this Dataset | Primary Value & Analytical Purpose |
| :--- | :--- | :--- |
| **Job Demand Analysis** | `num_of_jobs`, `job_title`, `company_name` | Quantifies market demand volume per role, hiring concentration across employers, and role availability. |
| **Salary Analysis** | `min_salary`, `avg_salary`, `max_salary`, derived `salary_spread` | Establishes compensation baselines, compensation variance by role seniority, and company wage premiums. |
| **Experience Analysis** | `min_experience`, `job_title` | Reveals minimum entry barriers across roles and quantifies the experience-to-compensation gradient. |
| **Company / Title Analysis**| `company_name`, `job_title`, `num_of_jobs`, `avg_salary` | Benchmarks employer hiring strategy (mass IT recruiter vs. specialized tech boutique) and supports company comparison. |

---

## 12. Top 10 Data-Quality Findings

1. **Matrix Completeness:** 100% complete across all 1,602 rows and 8 columns with 0 null or missing values.
2. **Non-Unique `reference_no`:** `reference_no` is **not** a unique row ID (142 duplicate values across 276 rows), appearing to function as an internal tracking code rather than a primary key.
3. **Composite Uniqueness:** The compound key `(company_name, job_title)` is strictly unique across all 1,602 rows with zero duplicates.
4. **Monotonic Salary Validity:** Across 100% of rows, $\text{min\_salary} \le \text{avg\_salary} \le \text{max\_salary}$ strictly holds. No negative or inverted ranges exist.
5. **Salary Unit Standardization:** All salary values in the raw CSV are suffixed with `"L"` (Lakhs per annum), requiring character stripping for numerical computation.
6. **Degenerate Salary Spreads:** Exactly 3 rows exhibit $\text{min\_salary} == \text{max\_salary} == \text{avg\_salary}$ (zero spread fixed pay).
7. **Masked / Generic Employers:** Presence of anonymized placeholders (`ABC`, `Confidential`, `N+A`, `Xyz Company`, `Data Entry`) accounting for 452 total vacancies.
8. **Heavy Right-Skew in Vacancies:** `num_of_jobs` exhibits extreme right-skew ($\text{skewness} = +12.80$, $\text{kurtosis} = +251.07$), with a median of 17 jobs and a maximum of 4,200 jobs.
9. **Senior Experience Outliers:** `min_experience` ranges up to 21 years for Data Architects, but 75% of postings require $\le 4$ years.
10. **Clean Role Taxonomy:** Exactly 10 clean, standardized job titles exist with zero typographical variants or casing mismatches.

---

## 13. Top 10 Analytical Findings (Observed Associations, Not Causation)

1. **Massive Hiring Concentration in Business & Data Analysis:** Business Analyst (32,843 vacancies) and Data Analyst (18,095 vacancies) collectively represent **54.8%** of all market vacancies in the sample.
2. **Salary Hierarchy by Role Specialization:** Average compensation monotonically escalates from Data Analyst (5.71L) $\rightarrow$ Business Analyst (8.95L) $\rightarrow$ Senior Data Analyst (9.57L) $\rightarrow$ ML Engineer (9.85L) $\rightarrow$ Data Engineer (11.81L) $\rightarrow$ Senior Business Analyst (13.17L) $\rightarrow$ Data Scientist (13.53L) $\rightarrow$ Senior Data Engineer (19.00L) $\rightarrow$ Senior Data Scientist (22.29L) $\rightarrow$ Data Architect (25.09L).
3. **Moderate Positive Experience-to-Salary Elasticity:** Stated minimum experience correlates moderately positively with average salary ($r = +0.593$) and minimum salary ($r = +0.643$).
4. **Volume vs. Compensation Inverse Relationship:** Stated job volume (`num_of_jobs`) correlates negatively with average salary ($r = -0.155$), reflecting the divergence between mass entry-level hiring and boutique high-compensation roles.
5. **Top Recruiter Market Domination:** The top 5 companies (TCS, Accenture, Cognizant, Wipro, IBM) account for **23,348 vacancies (25.1% of the entire sample vacancy volume)**.
6. **Wide Compensation Uncertainty in Senior Roles:** Salary spread ($\text{max} - \text{min}$) averages 10.51 LPA across the dataset, but widens dramatically for Senior Data Scientists (up to 91 LPA spread at Innova Solutions and 81.4 LPA at Kyndryl).
7. **Entry-Level Accessibility:** Data Analyst and Data Engineer roles exhibit a median minimum experience requirement of only **1.0 year**, making them the most accessible entry pathways.
8. **High Barriers for Architectural Roles:** Data Architect postings demand a median minimum experience of **10.0 years** with average compensation of 25.09 LPA.
9. **ML Engineer Representation Gap:** Machine Learning Engineer has only 59 records and 964 vacancies in this dataset, indicating either high role specialization or consolidation under generic "Data Scientist" titles.
10. **Employer Salary Variance:** Within the same title (*Data Scientist*), average compensation ranges from 4.5 LPA (Innodatatics) to 33.6 LPA (Apple), reflecting substantial organizational compensation differentials.

---

## 14. 5 Business / Career Questions This Dataset Can Help Answer

1. **What is the empirical market premium for seniority across data disciplines?**  
   Quantifies the salary delta between junior and senior tiers (e.g., Data Analyst at 5.71L vs. Senior Data Analyst at 9.57L; Data Scientist at 13.53L vs. Senior Data Scientist at 22.29L).
2. **Which roles offer the highest volume of entry-level opportunities?**  
   Evaluates where candidates with $\le 2$ years of experience can target the greatest number of open vacancies.
3. **How do hiring volumes and compensation packages compare between service-based conglomerates and product tech firms?**  
   Enables company-to-company benchmarking (e.g., TCS vs. Amazon vs. Flipkart).
4. **What is the typical salary negotiation bracket for each job title?**  
   Provides empirical minimum, median, and maximum salary bands to inform realistic compensation expectations.
5. **Which career paths represent the most lucrative transition from entry-level analysis?**  
   Compares the compensation trajectory of transitioning from Data Analyst toward Data Engineering vs. Data Science.

---

## 15. Limitations of This Dataset

1. **Absence of Temporal Data:** No timestamp, month, or year column exists beyond the broad "2024–25" scope. Trend lines, monthly growth, and time-series forecasting cannot be performed.
2. **Lack of Geographic Context:** This dataset does not specify city, state, or remote work arrangements (geographic analysis relies on `Analytics Jobs.csv`).
3. **Absence of Specific Skill Requirements:** The dataset lists job titles but does not contain individual technical skill keywords (skills analysis relies on `Analytics Jobs.csv`).
4. **Aggregated / Company-Level Grain:** Each row represents an aggregated posting summary by company and title rather than an individual micro-level job listing.
5. **Self-Reported / Masked Sample:** Includes anonymized company names and masked aggregations that represent an illustrative industry sample rather than an exhaustive census of all nationwide opportunities.

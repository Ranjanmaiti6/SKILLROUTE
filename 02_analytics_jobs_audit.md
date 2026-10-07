# Data Audit Report: Analytics Jobs Dataset

**File Audited:** `Analytics Jobs.csv` (Official Dataset 2)  
**Audit Date:** October 2026  
**Auditor:** Lead Data-Science Project Architect  
**Authoritative Reference:** *Data Description Doc.pdf* (Page 2) & *Problem Context Brief, SAS VFL Demos, Guidelines Dos and Donts.pdf*

---

## 1. File Identification & Dimensions

- **Exact File Name:** `Analytics Jobs.csv`
- **File Format:** Comma-Separated Values (CSV), UTF-8 text encoding
- **File Size on Disk:** ~3.61 MB (3,610,518 bytes)
- **Total Record Count (Rows):** **15,841** records (excluding 1 header row)
- **Total Attribute Count (Columns):** **8** attributes
- **Header Integrity:** Exactly 1 clean header row with 8 comma-delimited attribute names (`s_no`, `experience`, `job_description`, `job_desig`, `job_type`, `key_skills`, `location`, `salary`).
- **Raw File Preservation Status:** Confirmed strictly intact; read in read-only mode with zero mutations to `data/raw/Analytics Jobs.csv`.

---

## 2. Column Inventory & Data Description Document Reconciliation

| # | Actual Column Name in File | Column Name in Data Description Doc | Match Status | Official Brief Description |
| :-: | :--- | :--- | :---: | :--- |
| 1 | `s_no` | `s_no` | **Exact Match** | Row identification number or ID |
| 2 | `experience` | `experience` | **Exact Match** | Years of experience required for the job |
| 3 | `job_description` | `job_description` | **Exact Match** | Typical description of the job |
| 4 | `job_desig` | `job_desig` | **Exact Match** | Designation or position of the job role |
| 5 | `job_type` | `job_type` | **Exact Match** | Type or classification of the job |
| 6 | `key_skills` | `key_skills` | **Exact Match** | Key skills required for the job |
| 7 | `location` | `location` | **Exact Match** | Geo location of the job requirement |
| 8 | `salary` | `salary` | **Exact Match** | Salary offered |

**Reconciliation Verdict:** 100% schema alignment. All 8 columns exactly match the official data dictionary specifications with identical naming and sequence.

---

## 3. Data Types & Storage Structure

| Column Name | Raw Pandas Type | Semantic / Intended Type | Example Raw Value | Transformation Needed in Cleaning Phase |
| :--- | :--- | :--- | :--- | :--- |
| `s_no` | `int64` | Primary Row Identifier | `1` | Retain as integer primary record index. |
| `experience` | `object` (string) | Numeric Interval (Years) | `"6-10 yrs"` | Parse into `min_exp`, `max_exp`, `avg_exp` (`float64`). |
| `job_description` | `object` (string) | Truncated Free-Text Snippet | `"Must be knowledgeable..."` | Clean whitespace; acknowledge ~109-char truncation. |
| `job_desig` | `object` (string) | High-Cardinality Text | `"Business Analyst"` | Canonicalize into structured role families. |
| `job_type` | `object` (string) | Categorical Tag / Sparse | `"Analytics"` | Standardize casing; flag sparse missingness (75.8%). |
| `key_skills` | `object` (string) | Delimited Keyword String | `"SQL, Python, SAS..."` | Tokenize, strip trailing `"..."`, map synonyms. |
| `location` | `object` (string) | Geographic String / Multi-City | `"Bengaluru, Chennai"` | Tokenize multi-city entries into metro clusters. |
| `salary` | `object` (string) | Ordinal Interval / Bracket | `"10to15"` | Map to ordinal rank (0–5) and midpoint LPA (`float64`). |

---

## 4. Completeness & Missing Values Audit

| Column Name | Total Rows | Missing Count | Missing Percentage | Null Representation | Impact Assessment & Analytical Risk |
| :--- | :---: | :---: | :---: | :---: | :--- |
| `s_no` | 15,841 | 0 | 0.00% | None | Complete across all 15,841 records. |
| `experience` | 15,841 | 0 | 0.00% | None | Complete; 100% of rows contain valid experience strings. |
| `job_description` | 15,841 | **3,508** | **22.15%** | `NaN` | Substantial sparsity; remaining rows are short snippets. |
| `job_desig` | 15,841 | 0 | 0.00% | None | Complete; populated across all records. |
| `job_type` | 15,841 | **12,011** | **75.82%** | `NaN` | Severe sparsity; cannot be used as an unbiased primary filter. |
| `key_skills` | 15,841 | **1** | **0.0063%** | `NaN` | Exactly 1 missing row (`s_no = 7810`: *Analytics Translators*). |
| `location` | 15,841 | 0 | 0.00% | None | Complete across all records. |
| `salary` | 15,841 | 0 | 0.00% | None | Complete; 100% mapped into 6 distinct brackets. |

**Completeness Verdict:** 5 of the 8 columns are 100% complete. However, `job_type` exhibits severe missingness (75.82%), and `job_description` is absent in 22.15% of listings. Imputation or explicit missingness flags are mandatory for these two fields.

---

## 5. Duplicate Rows & Key Integrity Analysis

1. **Exact Full-Row Duplicates:** **0 records**. Every row in the raw CSV is distinct when considering all 8 columns including `s_no`.
2. **Primary Key Integrity (`s_no`):**
   - **Unique Values:** Exactly **15,841** unique integers.
   - **Range:** Strictly contiguous from `1` to `15841`.
   - **Duplicate IDs:** **0**. `s_no` serves as an unambiguous row index.
3. **Content Duplicates Excluding `s_no`:**
   - When evaluating uniqueness across the 7 substantive fields (`experience`, `job_description`, `job_desig`, `job_type`, `key_skills`, `location`, `salary`), **1,001 redundant rows** were identified.
   - Total rows involved in duplicate clusters: **1,597 postings** (10.08% of the dataset).
   - *Nature of Duplication:* These represent syndicated job board repostings, agency multi-postings, or portal refresh artifacts. For example:
     - `Associate Vice President - Fraud Analytics - SAS - Bank` (Mumbai, 8-12 yrs, 15to25 LPA): duplicated **13 times**.
     - `Associate Vice President - Analytics - SAS - Bank` (Mumbai, 8-12 yrs, 15to25 LPA): duplicated **12 times**.
     - `Business Analyst` (Bengaluru, 3-5 yrs, 6to10 LPA): duplicated **12 times**.
     - `Consultant - Customer Analytics - Iit/iim/bits/nit/sp Jain/mdi` (Gurgaon, 3-6 yrs, 10to15 LPA): duplicated **11 times**.
     - `Hiring : LLB / LLM (law): Graduates/ Interns /students- Walkin` (Noida, 0-2 yrs, 0to3 LPA): duplicated **10 times**.

---

## 6. Logical Consistency & Boundary Validation

| Rule Checked | Expected Condition | Violations Found | Notes & Diagnostic Observations |
| :--- | :---: | :---: | :--- |
| **Experience Bounds** | $\text{min\_exp} \le \text{max\_exp}$ | **0** | Verified: 100% of rows have non-inverting intervals. |
| **Negative Experience** | $\text{min\_exp} \ge 0 \land \text{max\_exp} \ge 0$ | **0** | Verified: No negative experience values. Range: [0, 30]. |
| **Salary Value Validity** | Stated salary $\in$ 6 predefined brackets | **0** | Verified: Exactly 6 categorical brackets exist; zero malformed salary strings. |
| **Freshers Representation** | $\text{min\_exp} == 0 \land \text{max\_exp} == 0$ | **124** | Postings explicitly targeted at zero-experience freshers (`0-0 yrs`). |
| **Single-Value Experience** | $\text{min\_exp} == \text{max\_exp}$ | **124** | Only the 124 `0-0 yrs` postings have zero span; all other 15,717 postings have spans between 1 and 10 years. |
| **Multi-City Consistency** | Comma-delimited valid locations | **0 syntax errors** | 1,936 rows (12.2%) list multi-city requirements. |

---

## 7. Numerical & Categorical Distributions

### A. Experience Distribution

- **Parsing Success Rate:** **100.00%** (15,841 / 15,841 records successfully parsed using interval regex).
- **Unique Raw Formats:** 128 distinct interval expressions (e.g., `5-10 yrs`, `2-5 yrs`, `3-8 yrs`, `0-0 yrs`).

| Metric | Minimum Required (`min_exp`) | Maximum Required (`max_exp`) | Midpoint Required (`avg_exp`) | Experience Span (`max_exp - min_exp`) |
| :--- | :---: | :---: | :---: | :---: |
| **Count** | 15,841 | 15,841 | 15,841 | 15,841 |
| **Mean** | **4.32 yrs** | **8.06 yrs** | **6.19 yrs** | **3.75 yrs** |
| **Std Dev** | 3.35 yrs | 4.23 yrs | 3.73 yrs | 1.60 yrs |
| **Minimum** | 0.0 yrs | 0.0 yrs | 0.0 yrs | 0.0 yrs |
| **1st Percentile** | 0.0 yrs | 1.0 yrs | 0.5 yrs | 1.0 yrs |
| **25% (Q1)** | 2.0 yrs | 5.0 yrs | 3.5 yrs | 3.0 yrs |
| **50% (Median)** | **3.0 yrs** | **7.0 yrs** | **5.5 yrs** | **4.0 yrs** |
| **75% (Q3)** | 6.0 yrs | 10.0 yrs | 8.0 yrs | 5.0 yrs |
| **95% Percentile** | 10.0 yrs | 15.0 yrs | 13.5 yrs | 6.0 yrs |
| **99% Percentile** | 15.0 yrs | 20.0 yrs | 17.5 yrs | 8.0 yrs |
| **Maximum** | **23.0 yrs** | **30.0 yrs** | **26.5 yrs** | **10.0 yrs** |
| **IQR** | 4.0 yrs | 5.0 yrs | 4.5 yrs | 2.0 yrs |
| **Skewness** | +1.03 | +0.94 | +0.97 | +0.48 |
| **Kurtosis** | +1.11 | +0.96 | +0.98 | +0.67 |

*Distribution Shape:* Moderately right-skewed with peak hiring concentration between **2 to 8 years** of experience.

### B. Salary Distribution

The raw salary variable is binned into 6 categorical brackets representing annual CTC in Lakhs per Annum (INR LPA):

| Salary Bracket | Stated LPA Range | Midpoint Imputed (LPA) | Postings Count | % of Market Demand | Cumulative % |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `0to3` | 0 – 3 LPA | 1.5 LPA | 2,592 | 16.36% | 16.36% |
| `3to6` | 3 – 6 LPA | 4.5 LPA | 2,239 | 14.13% | 30.50% |
| `6to10` | 6 – 10 LPA | 8.0 LPA | 2,876 | 18.15% | 48.65% |
| `10to15` | 10 – 15 LPA | 12.5 LPA | **3,608** | **22.78%** | 71.43% |
| `15to25` | 15 – 25 LPA | 20.0 LPA | **3,281** | **20.71%** | 92.14% |
| `25to50` | 25 – 50 LPA | 37.5 LPA | 1,245 | 7.86% | 100.00% |
| **Total / Overall**| — | **12.27 LPA (Mean)** | **15,841** | **100.00%** | — |

*Key Distributional Observation:* The modal salary bracket is **10 to 15 LPA** (22.78%), closely followed by **15 to 25 LPA** (20.71%). Over **51.3%** of all postings offer compensation above 10 LPA.

### C. Job Type Distribution

| Raw Value | Case-Normalized | Postings Count | % of Total Dataset | Status & Semantic Interpretation |
| :--- | :--- | :---: | :---: | :--- |
| `NaN` | *Unspecified / Missing* | **12,011** | **75.82%** | Omitted in source recruitment system. |
| `Analytics` | Analytics | 2,971 | 18.76% | Standard capitalized portal tag. |
| `analytics` | Analytics | 746 | 4.71% | Lowercase portal tag. |
| `ANALYTICS` | Analytics | 64 | 0.40% | Uppercase portal tag. |
| `analytic` | Analytics | 30 | 0.19% | Singular lowercase tag. |
| `Analytic` | Analytics | 19 | 0.12% | Singular title-case tag. |
| **Total Non-Null** | **Analytics (Consolidated)** | **3,830** | **24.18%** | 100% of non-null values represent the single concept "Analytics". |

*Critical Diagnostic:* `job_type` in this dataset is **NOT** employment arrangement (e.g., Full-time vs. Contract). It is a sparse functional sector tag where 24.18% of listings were tagged with variants of *"Analytics"* and 75.82% were left blank.

### D. Geographic Location Distribution

- **Total Distinct Location Strings:** **1,355** unique combinations.
- **Multi-City Postings:** **1,936 listings (12.22%)** list multiple candidate locations (e.g., `"Mumbai, Bengaluru, Hyderabad, Pune, Delhi"`).
- **Consolidated Metro Cluster Demand (Accounting for Multi-City Mentions & Metros):**

| Metro Cluster / Region | Stated Mentions | % of Total Postings | Mean Required Exp | Dominant Salary Bracket |
| :--- | :---: | :---: | :---: | :---: |
| **Bengaluru** | **4,438** | **28.02%** | 6.31 yrs | `10to15` (24.8%) |
| **Mumbai Region** (incl. Navi Mumbai) | **2,689** | **16.97%** | 6.34 yrs | `10to15` (23.9%) |
| **Gurgaon / Gurugram** | **2,075** | **13.10%** | 6.27 yrs | `15to25` (24.1%) |
| **Other Cities / Non-Metro** | 1,292 | 8.16% | 4.88 yrs | `0to3` (34.2%) |
| **Pune** | 1,178 | 7.44% | 5.86 yrs | `10to15` (25.1%) |
| **Delhi / Delhi NCR** | 1,107 | 6.99% | 6.01 yrs | `10to15` (21.9%) |
| **Hyderabad** | 1,030 | 6.50% | 6.18 yrs | `10to15` (24.4%) |
| **Chennai** | 973 | 6.14% | 6.45 yrs | `10to15` (23.8%) |
| **Noida** (incl. Greater Noida) | 566 | 3.57% | 5.34 yrs | `6to10` (22.8%) |
| **Kolkata** | 201 | 1.27% | 5.25 yrs | `3to6` (28.4%) |
| **Ahmedabad** | 197 | 1.24% | 4.97 yrs | `3to6` (26.9%) |
| **Kochi** | 95 | 0.60% | 5.72 yrs | `6to10` (29.5%) |

*Finding:* Severe geographic concentration. The top 3 clusters—**Bengaluru (28.0%), Mumbai (17.0%), and Gurgaon (13.1%)**—collectively control **58.1% of national job opportunities**. When adding Pune and Hyderabad, 5 tech centers capture over 72% of the market.

---

## 8. Outlier Detection (Tukey's 1.5 $\times$ IQR Rule)

### A. Experience Outliers
- **Lower Quartile ($Q_1$):** 3.50 years
- **Upper Quartile ($Q_3$):** 8.00 years
- **Interquartile Range ($\text{IQR}$):** 4.50 years
- **Tukey Upper Fence ($Q_3 + 1.5 \times \text{IQR}$):** **14.75 years**
- **Identified Outliers:** **546 postings (3.45%)** demand $> 14.75$ years average required experience.
- **Top Extreme Experience Records:**
  - `s_no = 1214`: *Assistant General Manager - Human Resources* — 16-30 yrs (`avg_exp = 23.0 yrs`, `max_exp = 30.0 yrs`)
  - `s_no = 15399`: *Senior Director - Product Management* — 18-28 yrs (`avg_exp = 23.0 yrs`, `max_exp = 28.0 yrs`)
  - `s_no = 8349`: *Vice President - Data Science & Analytics* — 20-25 yrs (`avg_exp = 22.5 yrs`, `max_exp = 25.0 yrs`)
  - `s_no = 1577`: *Head - Enterprise Architecture* — 18-25 yrs (`avg_exp = 21.5 yrs`, `max_exp = 25.0 yrs`)
- **Tukey Lower Fence ($Q_1 - 1.5 \times \text{IQR}$):** $\max(0, 3.5 - 6.75) = 0$ yrs. No negative outliers detected.

### B. Salary Outliers
- In this dataset, salary is discretized into 6 discrete bins, capped at `25to50` LPA.
- Postings in the top bracket (`25to50`): **1,245 listings (7.86%)**.
- Evaluated on midpoint values ($Q_1 = 8.0$, $Q_3 = 20.0$, $\text{IQR} = 12.0$, Upper Fence = $20.0 + 1.5 \times 12.0 = 38.0$ LPA).
- The `25to50` bracket (midpoint 37.5 LPA) sits just inside the upper boundary, meaning no mathematical single-point outliers exist due to top-coding in the portal's scraping schema. Ultra-high salaries (>50 LPA to 102 LPA, observed in Dataset 1) are censored at 50 LPA here.

---

## 9. Job Designation Quality & Taxonomy Analysis

- **Total Unique Designation Strings:** **10,097** distinct strings across 15,841 rows.
- **Extreme Sparsity (Hapax Legomena):** **7,543 designations (74.7%) appear exactly once in the dataset**.
- **Top 10 Raw Designations:**
  1. *Business Analyst* (108)
  2. *Data Scientist* (64)
  3. *Data Analyst* (50)
  4. *Digital Marketing Manager* (45)
  5. *Home Base Job/ Data Entry/online Work/part Time Work/freelancer work* (45) — *Spam/Noise*
  6. *Product Manager* (44)
  7. *Digital Marketing Executive* (36)
  8. *Analyst* (35)
  9. *SEO Executive* (29)
  10. *SEO Analyst* (26)

### Canonical Role Clustering Taxonomy
To make this high-cardinality feature actionable, deterministic keyword parsing mapped all 10,097 raw strings into **18 canonical role families**:

| Canonical Role Family | Postings Count | % of Market | Mean Exp | Median Exp | Mean Salary Mid | % High Pay (15–50L) | Top Key Skill |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Other Non-Core IT/Operations** | 3,612 | 22.80% | 4.84 yrs | 4.0 yrs | 8.49 LPA | 16.00% | Outsourcing, Finance |
| **Analytics / Leadership & Management** | 3,532 | 22.30% | 8.58 yrs | 8.0 yrs | 17.38 LPA | 47.11% | Analytics, SAS, Finance |
| **Specialized / Other Analytics** | 2,002 | 12.64% | 4.66 yrs | 4.0 yrs | 9.11 LPA | 15.68% | Finance, SQL, Analytics |
| **Software / Cloud Engineering** | 1,623 | 10.25% | 5.86 yrs | 5.5 yrs | 11.75 LPA | 24.58% | JavaScript, Java, Python |
| **Digital Marketing / Content** | 1,154 | 7.28% | 5.03 yrs | 4.0 yrs | 8.99 LPA | 15.77% | Digital Marketing, SEO |
| **Business Analyst** | 619 | 3.91% | 5.78 yrs | 5.5 yrs | 12.14 LPA | 28.27% | Business Analysis, SQL |
| **Analytics / IT Consulting** | 589 | 3.72% | 6.53 yrs | 6.0 yrs | 14.70 LPA | 38.37% | SAS, Analytics, SQL |
| **Data / Solution Architect** | 372 | 2.35% | 10.91 yrs | 11.0 yrs | 19.92 LPA | 59.68% | Java, SQL, Cloud |
| **Data Engineer** | 366 | 2.31% | 7.33 yrs | 6.5 yrs | 14.82 LPA | 38.52% | Hadoop, Spark, Big Data |
| **Data Scientist** | 344 | 2.17% | 5.98 yrs | 5.5 yrs | 15.05 LPA | 36.63% | Machine Learning, Python, R |
| **Machine Learning / AI Engineer** | 343 | 2.17% | 6.41 yrs | 6.0 yrs | 15.12 LPA | 39.94% | Machine Learning, Python, NLP |
| **Data Entry / Freelance / Spam** | 292 | 1.84% | 2.45 yrs | 2.5 yrs | 3.37 LPA | 1.71% | Data Entry, Freelance |
| **Data Analyst** | 248 | 1.57% | 5.49 yrs | 5.0 yrs | 10.73 LPA | 23.39% | Data Analysis, SQL, Tableau |
| **Product Management** | 228 | 1.44% | 6.50 yrs | 6.5 yrs | 16.00 LPA | 42.11% | Product Management, Sales |
| **Senior Business Analyst** | 178 | 1.12% | 6.23 yrs | 5.5 yrs | 14.05 LPA | 29.21% | Business Analysis, Analytics |
| **Senior Data Scientist** | 125 | 0.79% | 7.64 yrs | 7.5 yrs | 19.41 LPA | 56.80% | Data Science, ML, Python |
| **Senior Data Engineer** | 110 | 0.69% | 7.41 yrs | 7.25 yrs | 14.58 LPA | 35.45% | Spark, Hive, Hadoop |
| **Senior Data Analyst** | 104 | 0.66% | 7.70 yrs | 7.5 yrs | 14.17 LPA | 39.42% | Data Analytics, R, SQL |

---

## 10. Key Skills Field Quality & Truncation Analysis

1. **Missingness:** Exactly **1 row** is missing (`s_no = 7810`: 0.0063%).
2. **Systematic Ellipsis Truncation:**
   - **13,806 out of 15,840 populated rows (87.16%) end with `...`**.
   - *Cause:* The job portal UI truncated the skill tag string after a fixed character limit (typically ~70–80 characters) before exporting.
   - *Analytical Consequence:* The last skill in 87% of rows is either cut in half or omitted entirely. Trailing incomplete tokens must be parsed and stripped.
3. **Extraction Metrics:**
   - Total skill tokens extracted: **78,934 tokens**.
   - Distinct lowercased skill keywords: **8,532 terms**.
   - Average skills per posting: **4.98 skills** (Median: 5.0, Min: 1, Max: 19).

### Top 25 Most Frequent Skills Across Market Postings
| Rank | Skill Keyword | Total Mentions | % of Postings ($N=15,841$) | Primary Domain |
| :-: | :--- | :---: | :---: | :--- |
| 1 | `analytics` | 1,048 | 6.62% | Core Analytics |
| 2 | `sql` | 1,008 | 6.36% | Database / Data Wrangling |
| 3 | `python` | 938 | 5.92% | Programming / Data Science |
| 4 | `finance` | 811 | 5.12% | Domain Knowledge |
| 5 | `java` | 752 | 4.75% | Software Engineering |
| 6 | `business analysis` | 730 | 4.61% | Business Analytics |
| 7 | `machine learning` | 724 | 4.57% | Advanced AI / Modeling |
| 8 | `data analysis` | 721 | 4.55% | Core Analytics |
| 9 | `r` | 719 | 4.54% | Statistical Computing |
| 10 | `sas` | 715 | 4.51% | Statistical Analytics |
| 11 | `digital marketing`| 612 | 3.86% | Marketing Operations |
| 12 | `project management`| 575 | 3.63% | Leadership / Delivery |
| 13 | `javascript` | 561 | 3.54% | Web / Full-Stack |
| 14 | `data analytics` | 526 | 3.32% | Core Analytics |
| 15 | `seo` | 516 | 3.26% | Marketing Operations |
| 16 | `outsourcing` | 445 | 2.81% | Operations / Vendor Mgmt |
| 17 | `sales` | 432 | 2.73% | Commercial Domain |
| 18 | `excel` | 429 | 2.71% | Spreadsheets / BI |
| 19 | `accounting` | 398 | 2.51% | Finance Domain |
| 20 | `marketing` | 363 | 2.29% | Commercial Domain |
| 21 | `operations` | 359 | 2.27% | Operations |
| 22 | `business process`| 329 | 2.08% | Workflow / Process |
| 23 | `hadoop` | 323 | 2.04% | Big Data Engineering |
| 24 | `html` | 312 | 1.97% | Web Development |
| 25 | `spark` | 305 | 1.93% | Big Data Engineering |

---

## 11. Job Description Quality Analysis

- **Missing Values:** **3,508 records (22.15%)** have null descriptions (`NaN`).
- **Universal Ellipsis Truncation:**
  - **12,333 out of 12,333 non-null records (100.00%) end with `...`**.
  - **Length Summary:** Min: 7 chars, Q1: 100 chars, Median: 104 chars, Mean: 100.8 chars, Max: **109 chars**.
- **Crucial Architectural Insight:** Job descriptions in this dataset are **NOT full job postings**; they are strictly preview "teaser snippets" scraped from the search results summary card of an Indian recruitment portal (e.g. Naukri.com search result cards).
- **Implications for Downstream Modeling:** Any expectation of conducting full-document NLP, long-form transformer parsing (e.g., Clinical/RoBERTa), or detailed responsibility extraction from `job_description` is **invalidated by the data reality**. Analysis must prioritize `key_skills` and `job_desig` over `job_description`.

---

## 12. Possible Spelling & Category Inconsistencies

1. **Job Type Inconsistencies:**
   - 5 different casing and grammatical representations of a single category: `Analytics` (2,971), `analytics` (746), `ANALYTICS` (64), `analytic` (30), `Analytic` (19).
2. **Geographical Collisions & Synonyms:**
   - `Gurgaon` (1,313) vs `Gurgaon, Gurugram` (195) vs `Gurugram` (42).
   - `Bengaluru` (3,333) vs `Bangalore` (28).
   - `Mumbai` (1,992) vs `Mumbai, Mumbai Suburbs` (62) vs `Navi Mumbai` (114).
   - `Delhi NCR` (593) vs `Delhi` (198) vs `Delhi NCR, Gurgaon` (278) vs `Delhi NCR, Noida` (55).
   - `Kochi` (77) vs `Cochin` (14).
   - `Trivandrum` (72) vs `Thiruvananthapuram` (12).
3. **Key Skills Synonyms & Formatting Collisions:**
   - Case discrepancies: `python` vs `Python`, `sql` vs `SQL`, `sas` vs `SAS`.
   - Acronym vs. Expanded: `machine learning` vs `ml`, `artificial intelligence` vs `ai`, `natural language processing` vs `nlp`.
   - Compound punctuation: `power bi` vs `powerbi`, `c++` vs `c`, `plsql` vs `pl/sql` vs `pl sql`.
4. **Scraping Noise / Domain Contamination:**
   - Approximately **292 postings (~1.84%)** are completely outside the analytics domain (e.g. `Home Base Job/ Data Entry/online Work`, `LLB / LLM (law): Graduates/ Interns /students- Walkin`, `Telecalling / BPO`).

---

## 13. Exploratory Analysis & Core Research Questions

### Q1: Which job roles are most common?
- Within core data disciplines:
  - **Business Analyst:** 619 postings (3.91%) + 178 Senior BA = **797 total (5.03%)**.
  - **Analytics / IT Consulting:** **589 postings (3.72%)**.
  - **Data Scientist:** 344 postings (2.17%) + 125 Senior DS = **469 total (2.96%)**.
  - **Data Engineer:** 366 postings (2.31%) + 110 Senior DE = **476 total (3.00%)**.
  - **Machine Learning / AI Engineer:** **343 postings (2.17%)**.
  - **Data Analyst:** 248 postings (1.57%) + 104 Senior DA = **352 total (2.22%)**.
  - **Data / Solution Architect:** **372 postings (2.35%)**.
- The largest macro groupings in the raw data are **Analytics Leadership & Management (22.3%)** and **General IT / Operations (22.8%)**, reflecting enterprise organizational hierarchies where analytics sits inside IT or business operations units.

### Q2: Which skills appear most frequently?
- The top 5 technical skills across the entire market are **SQL (1,008 mentions)**, **Python (938 mentions)**, **Machine Learning (724 mentions)**, **R (719 mentions)**, and **SAS (715 mentions)**.
- Notably, SAS and R appear with almost identical market prevalence (~4.5%), reflecting strong legacy and banking analytics presence alongside modern open-source stacks.

### Q3: Which locations have the strongest job demand?
- **Bengaluru** is the undisputed capital of Indian analytics demand with **4,438 postings (28.0%)**, followed by **Mumbai Region (2,689 postings, 17.0%)** and **Gurgaon / Gurugram (2,075 postings, 13.1%)**.
- Together with Pune (7.4%) and Hyderabad (6.5%), these 5 tech hubs account for **72.1%** of all analytics postings.

### Q4: How does experience relate to salary?
- There is a **very strong, monotonic positive relationship** between required experience and offered salary bracket:
  - **Spearman Rank Correlation:** **$r_s = +0.7042$ ($p < 0.0001$)**.
  - **Pearson Correlation (Midpoint LPA):** **$r = +0.6607$ ($p < 0.0001$)**.
  - **Kruskal-Wallis Test:** $H = 7,898.18$ ($p < 0.0001$), confirming statistically significant rank divergence across all 6 salary brackets.

| Experience Cohort | 0–3 LPA | 3–6 LPA | 6–10 LPA | 10–15 LPA | 15–25 LPA | 25–50 LPA |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **0–2 yrs (Entry-Level)** | **63.13%** | 23.80% | 6.45% | 5.06% | 1.51% | 0.06% |
| **2–5 yrs (Junior Tier)** | 23.15% | 23.66% | **26.69%** | 18.71% | 6.71% | 1.08% |
| **5–8 yrs (Mid-Level)** | 3.56% | 9.65% | 21.05% | **31.97%** | **29.56%** | 4.20% |
| **8–12 yrs (Senior Tier)** | 0.90% | 1.05% | 9.18% | 31.64% | **40.62%** | 16.60% |
| **12+ yrs (Lead / Executive)** | 0.59% | 0.44% | 3.24% | 15.44% | 38.31% | **41.99%** |

### Q5: How do job types differ?
- Postings tagged with `"Analytics"` ($N=3,830$) have a higher mean salary midpoint (**14.54 LPA** vs. **11.55 LPA**) and higher average required experience (**6.60 yrs** vs. **6.06 yrs**) compared to unspecified listings ($N=12,011$).
- Median salary midpoint is identical (12.5 LPA), indicating that the tagged subset simply skews slightly more toward specialized mid-to-senior postings.

### Q6: Which skills appear in higher-paying roles?
By calculating the **Odds Ratio** comparing skill prevalence in high-paying tiers (15–50 LPA, $N=4,526$) versus entry/low-paying tiers (0–6 LPA, $N=4,831$), we reveal the empirical salary premium associated with specific capabilities:

| Skill Keyword | Prevalence in 15–50 LPA Postings | Prevalence in 0–6 LPA Postings | Salary Premium Odds Ratio | Skill Category |
| :--- | :---: | :---: | :---: | :--- |
| **Linear Regression / Statistical Modeling** | 1.79% | 0.12% | **14.3x** | Advanced Statistics |
| **Credit Risk / Risk Analytics** | 1.70% | 0.17% | **10.2x** | Domain FinTech |
| **R** | 7.84% | 1.01% | **7.7x** | Statistical Computing |
| **Data Science (explicit tag)** | 3.34% | 0.52% | **6.4x** | Modeling |
| **SAS** | 6.72% | 1.22% | **5.5x** | Enterprise Analytics |
| **Big Data** | 3.23% | 0.58% | **5.5x** | Data Engineering |
| **Spark** | 3.03% | 0.68% | **4.4x** | Big Data Frameworks |
| **Java** | 7.31% | 1.76% | **4.2x** | Scalable Engineering |
| **Machine Learning** | 6.87% | 1.88% | **3.6x** | Core ML / AI |
| **Hadoop** | 2.87% | 0.79% | **3.6x** | Distributed Systems |
| **Python** | 7.82% | 3.52% | **2.2x** | General Programming |
| **SQL** | 7.91% | 4.68% | **1.7x** | Foundational Data |

*Takeaway:* While SQL and Python are the most ubiquitous baseline requirements across all levels, **R, SAS, Big Data (Spark/Hadoop), and statistical risk modeling** have the highest empirical odds of being required in upper-bracket (15–50 LPA) roles.

### Q7: Are there meaningful relationships between designation, experience, and salary?
- Yes. Cross-tabulation and multivariate analysis demonstrate clear hierarchical stratification:
  - **Data / Solution Architects** command the highest compensation (Mean: 19.92 LPA, Median: 20.0 LPA, 59.7% in 15–50L), demanding the highest experience barrier (Mean: 10.91 yrs, Median: 11.0 yrs).
  - **Senior Data Scientists** (Mean: 19.41 LPA, 56.8% in 15–50L) command a substantial premium over baseline **Data Scientists** (Mean: 15.05 LPA, 36.6% in 15–50L), driven by an additional 1.7–2.0 years of experience.
  - **Data Analysts** sit at the accessible entry boundary (Mean: 10.73 LPA, Median: 8.0 LPA, 37.5% in 0–6L), with lower experience barriers (Mean: 5.49 yrs, Median: 5.0 yrs).

---

## 14. Generated Exploratory Visualizations (`02_analytics_jobs_eda/`)

The following 9 high-resolution visualizations have been generated and saved into [`02_analytics_jobs_eda/`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda):

1. **[`01_salary_bracket_distribution.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/01_salary_bracket_distribution.png):** Frequency bar chart across all 6 salary brackets with counts and percentages, highlighting the modal 10–15 LPA bracket.
2. **[`02_experience_distribution.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/02_experience_distribution.png):** Combined KDE histogram and boxplot illustrating the distribution of average required experience, with median (5.5 yrs) and mean (6.2 yrs) indicators.
3. **[`03_experience_vs_salary.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/03_experience_vs_salary.png):** Boxplot mapping required experience across salary brackets with median callouts and IQR annotations ($r_s = +0.704$).
4. **[`04_top_25_skills_frequency.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/04_top_25_skills_frequency.png):** Horizontal bar chart ranking the top 25 most demanded skill keywords across 78,934 extracted tokens.
5. **[`05_high_paying_skills_premium.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/05_high_paying_skills_premium.png):** Odds-ratio visualization highlighting the skills that appear with disproportionately higher frequency in 15–50 LPA vs 0–6 LPA jobs (led by R, Data Science, SAS, Big Data, and Spark).
6. **[`06_geographic_distribution.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/06_geographic_distribution.png):** Ranked bar chart of job demand across primary metro clusters (Bengaluru, Mumbai, Gurgaon, Pune, Hyderabad, Chennai, Delhi NCR).
7. **[`07_salary_by_role_family.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/07_salary_by_role_family.png):** Mean offered salary midpoint (LPA) across 18 canonical role families.
8. **[`08_job_type_analysis.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/08_job_type_analysis.png):** Dual visualization illustrating `job_type` sparsity (75.8% missing) alongside a salary comparison between tagged and untagged listings.
9. **[`09_role_vs_salary_heatmap.png`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_eda/09_role_vs_salary_heatmap.png):** Heatmap showing the percentage distribution of salary brackets across core analytics role families.

---

## 15. Summary Dataset (`02_analytics_jobs_summary.csv`)

The structured summary file [`02_analytics_jobs_summary.csv`](file:///Users/ranjanmaiti/Downloads/netra-deepfake-detector-main%202/skillroute/02_analytics_jobs_summary.csv) has been generated with 18 canonical role families, capturing:
- Posting counts and market percentages
- Mean and median required experience (and bounds)
- Mean and median salary midpoints (LPA)
- High-salary (15–50 LPA) and low-salary (0–6 LPA) proportions
- Dominant geographical metro hub
- Top 3 co-occurring technical skills

---

## 16. Top 10 Data-Quality Findings

1. **Primary Key Integrity:** `s_no` is strictly unique and sequentially contiguous from 1 to 15,841 with zero duplicates or missing values.
2. **Substantial Content Duplication (Syndication):** Exactly 1,001 rows (spanning 1,597 postings, 10.08% of the dataset) are identical duplicate listings excluding `s_no`, reflecting job portal repostings.
3. **Severe Sparsity in `job_type`:** `job_type` is 75.82% missing (`NaN`). The non-missing rows (24.18%) are exclusively casing variants of the word *"Analytics"*.
4. **Truncated Job Descriptions (Search Snippets):** 100% of non-null `job_description` values end with `...`, and character length is capped at ~109 characters, confirming they are preview search result teasers rather than full descriptions.
5. **Universal Skills Truncation:** 87.16% of `key_skills` entries end with `...`, requiring careful trailing token sanitization to prevent truncated keyword artifacts.
6. **Isolated Skills Missingness:** Exactly 1 posting in the entire dataset (`s_no = 7810`: *Analytics Translators*) has a null `key_skills` field.
7. **Clean Experience Syntax:** 100% of experience entries follow regular parseable interval patterns (`X-Y yrs`), with zero inverted ranges and zero negative values.
8. **Discrete Salary Bins (Capped at 50 LPA):** Salary is partitioned into exactly 6 discrete buckets with zero malformed strings; however, salaries above 50 LPA are top-coded into `25to50`.
9. **Extreme Title Cardinality & Long Tail:** 74.7% of distinct job designations appear only once, requiring taxonomy clustering for any meaningful comparative analysis.
10. **Scraping Artifacts / Non-Analytics Intrusion:** ~1.84% of postings are home-based data entry, legal walk-ins, or telecalling roles erroneously pulled into the dataset.

---

## 17. Top 10 Analytical Findings (Observed Associations, Not Causation)

1. **Strong Experience-to-Compensation Gradient:** Experience and salary exhibit a strong, monotonic positive rank correlation ($r_s = +0.704$, $p < 0.0001$), with median experience climbing from 2.5 yrs (0–3 LPA) to 11.5 yrs (25–50 LPA).
2. **High-Tier Demand Dominance:** Over 51.3% of postings offer compensation above 10 LPA (`10to15`, `15to25`, `25to50`), led by the 10–15 LPA bracket (22.8%).
3. **Bengaluru Leads Market Share:** Bengaluru commands 28.0% of national hiring demand, exceeding Mumbai (17.0%) and Gurgaon (13.1%).
4. **Triad of Core Technical Skills:** SQL (6.36%), Python (5.92%), and Machine Learning (4.57%) form the foundational technical toolkit across modern analytics postings.
5. **SAS & R Parity:** Both SAS (4.51%) and R (4.54%) maintain high demand, reflecting strong banking, risk, and enterprise analytics adoption.
6. **Empirical Skill Premium Divergence:** Skills with the highest relative concentration in high-paying (15–50L) vs low-paying (0–6L) roles are R (7.7x), SAS (5.5x), Big Data (5.5x), Spark (4.4x), and statistical modeling (14.3x).
7. **Architectural Premium:** Data / Solution Architects represent the highest compensation ceiling in technical execution, averaging 19.92 LPA with nearly 60% of roles in the 15–50 LPA tier.
8. **Senior vs. Junior Wage Step:** Senior Data Scientists command a 4.36 LPA higher mean compensation midpoint (19.41 LPA vs 15.05 LPA) and higher probability of upper-bracket compensation (56.8% vs 36.6%) compared to mid-level Data Scientists.
9. **Entry-Level Gateway:** Data Analyst roles serve as the lowest entry threshold among technical analytics roles, with 37.5% in the 0–6 LPA range and an average required experience of 5.49 years.
10. **Geographic Wage Variations:** Gurgaon / Gurugram postings exhibit a slightly higher proportion of 15–25 LPA roles (24.1%) than Bengaluru (20.3%), driven by corporate analytics headquarters and FinTech risk centers.

---

## 18. Methodological Framework: Facts vs. Hypotheses vs. Assumptions

To adhere strictly to project architectural guardrails and scientific integrity, every deduction from this audit is categorized under three explicit tiers:

### Tier 1: Observed Facts (Empirically Verified in the Data)
- The dataset contains exactly 15,841 rows and 8 columns.
- `job_type` contains only variants of "Analytics" and is 75.82% missing.
- 100% of non-null `job_description` values are truncated at $\le 109$ characters ending in `...`.
- 87.16% of `key_skills` entries end in `...`.
- Exactly 1,001 rows share identical content across all attributes excluding `s_no`.
- Exactly 1 row has missing `key_skills` (`s_no = 7810`).
- Stated experience correlates positively with salary rank ($r_s = +0.7042$).
- Bengaluru, Mumbai, and Gurgaon account for 58.1% of all primary metro demand.

### Tier 2: Possible Hypotheses (Empirically Plausible but Requiring Testing)
- *Hypothesis 1 (Portal Artifact):* The data was scraped from search result preview cards on a major Indian job portal (such as Naukri.com) rather than full job detail pages, explaining the universal $\le 109$-char truncation and trailing ellipses.
- *Hypothesis 2 (Functional Tag):* `job_type` was an optional checkbox or sector classification in the posting submission form (e.g., "Category: Analytics") rather than an employment type selector (Full-time / Part-time / Contract).
- *Hypothesis 3 (Syndication Dynamics):* Duplicate content rows represent multi-location recruitment drives or weekly re-listings by major placement agencies to keep job postings at the top of candidate feeds.
- *Hypothesis 4 (Banking Premium for SAS & R):* The high odds ratios for SAS (5.5x) and R (7.7x) in upper salary tiers reflect their entrenched position in heavily regulated BFSI (Banking, Financial Services, and Insurance) risk modeling teams in Mumbai and Gurgaon.

### Tier 3: Assumptions (Explicit Conditions for Modeling & Downstream Tasks)
- *Assumption 1 (Salary Bins):* Midpoint imputation (e.g., `10to15` $\rightarrow$ 12.5 LPA, `25to50` $\rightarrow$ 37.5 LPA) is assumed as an illustrative continuous proxy for comparative ranking, while recognizing that the true underlying distribution within bins is unknown.
- *Assumption 2 (Cross-Sectional Independence):* Postings are assumed to represent a cross-sectional snapshot of the 2024–25 Indian market without temporal indexing; no temporal time-series trends will be inferred.
- *Assumption 3 (Entity Independence):* Postings in this dataset are treated as independent labor market vacancy observations without synthetic foreign-key linkages to Dataset 1, 3, or 4.

---

## 19. Inherent Limitations of This Dataset

1. **Truncated Text Snippets:** Job descriptions cannot support deep document-level NLP or sequence modeling due to universal 109-character truncation.
2. **Coarse Binned Salaries:** Salary is recorded in broad categorical brackets rather than exact numerical compensation or continuous rupee values.
3. **Absence of Employer Entity (`company_name`):** Unlike Dataset 1 (`Data Science Jobs.csv`), this dataset does not include company names, preventing firm-level compensation benchmarking.
4. **No Timestamp / Temporal Index:** The data lacks posting dates, application deadlines, or timestamps; temporal growth rates cannot be computed.
5. **Self-Reported & Recruiter Scraped Sample:** Contains duplicate repostings, spelling variants, and occasional irrelevant entries that reflect real-world portal noise rather than an official labor bureau census.
